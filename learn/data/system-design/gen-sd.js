const fs = require('fs');

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

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 200, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

/* =================== TOPIC 1: System Design Interview =================== */
addTopic('sd-interview', 'System Design Interview', 'advanced', 30,
  ['System design interviews evaluate your ability to design large-scale distributed systems — architecture, scalability, trade-offs.',
   'Key skills: breaking down ambiguous problems, defining requirements, estimating scale, designing data models, and discussing trade-offs.',
   'Common topics: URL shorteners, chat systems, social feeds, payment systems, recommendation engines, and rate limiters.',
   'Focus on: functional/non-functional requirements, data flow, API design, database choice, caching, sharding, and fault tolerance.'
  ],
  'The system design interview is like being asked to design a new city from scratch. You need to figure out how many people will live there (scale), where to put roads (data flow), how to handle rush hour (load), and what happens if a power plant fails (fault tolerance). The interviewer wants to see your thought process, not just the final blueprint.',
  [
    d('Framework: The 4-Step Approach', 'Step 1: Understand requirements (functional + non-functional, ask clarifying questions). Step 2: High-level design (system components, data flow diagram). Step 3: Deep dive on key components (database design, API contracts, scaling strategy). Step 4: Discuss trade-offs and bottlenecks. Always start with requirements — do not jump to solutions.'),
    d('Functional vs Non-Functional Requirements', 'Functional: what the system does (create tweet, read feed, follow user). Non-functional: how well it does it (latency < 200ms, 99.99% uptime, handle 1B users). Non-functional requirements drive architectural decisions — latency requirements determine caching strategy, scale determines sharding needs.'),
    d('Scale Estimation', 'Traffic: DAU (daily active users), requests per second (QPS), peak vs average. Storage: data per user, growth rate, retention period. Bandwidth: data in/out per second. Example: Twitter — 500M tweets/day, ~6000 writes/sec peak, 300M DAU, each tweet ~250 bytes, ~150GB new data daily.'),
    d('Database Selection', 'Relational (PostgreSQL): ACID, joins, structured data. NoSQL (Cassandra): high write throughput, time-series, denormalized. Document (MongoDB): flexible schema, JSON documents. Graph (Neo4j): relationship-heavy queries. Key-value (Redis): caching, session store, real-time. Multi-model: use the right DB for each component.'),
    d('Discussing Trade-Offs', 'Every decision has trade-offs — demonstrate awareness. Consistency vs availability (CAP theorem). Read-optimized vs write-optimized. Strong consistency vs eventual consistency. Monolith vs microservices. SQL vs NoSQL. Synchronous vs asynchronous. Cache everything vs cache selectively. Trade-off discussions show seniority.')
  ],
  'The system design interview tests your ability to think at scale. Follow a structured framework: requirements → high-level design → deep dive → trade-offs. Focus on the key bottlenecks and address them explicitly. Always discuss trade-offs. Practice with common questions. Be prepared to estimate scale and choose appropriate technologies.',
  [
    q('What is the first step in a system design interview?', 'Clarify requirements — functional and non-functional. Ask questions before proposing solutions.'),
    q('What are non-functional requirements?', 'System qualities: latency, availability, durability, consistency, scalability, security. They drive architectural decisions.'),
    q('How do you estimate scale?', 'DAU → QPS → storage/day → total storage → bandwidth. Use reasonable assumptions and show your math.'),
    q('What is the difference between vertical and horizontal scaling?', 'Vertical: bigger machines (limits, single point of failure). Horizontal: more machines (scalable, requires load balancer).'),
    q('When would you choose SQL over NoSQL?', 'SQL: ACID requirements, complex queries, frequent schema changes, joins. NoSQL: high write throughput, flexible schema, time-series data.'),
    q('What is the CAP theorem?', 'Consistency, Availability, Partition Tolerance — you can only have two of three in a distributed system.'),
    q('Why is caching important in system design?', 'Reduces latency, decreases database load, handles traffic spikes. Cache frequently accessed data at multiple levels (CDN, app, DB).'),
    q('What is a single point of failure?', 'A component whose failure causes system-wide failure. Eliminate with redundancy, load balancing, failover mechanisms.'),
    q('How do you handle database sharding?', 'Horizontal partitioning by key (user_id, geo, hash). Challenges: resharding, hotspot mitigation, cross-shard queries.'),
    q('What should you do at the end of a design discussion?', 'Summarize bottlenecks, discuss trade-offs, propose improvements. Show awareness of what could go wrong.')
  ],
  R(10,35,110,25,'#0070f3','','Requirements','Clarify + estimate') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','High-Level','Components + flow') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Deep Dive','DB, API, scaling') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Trade-offs','Discuss choices') +
  R(10,105,110,25,'#e83e8c','','Scale','Estimate QPS + storage') +
  R(10,140,110,25,'#6610f2','','Bottlenecks','DB, cache, network') +
  R(290,35,190,155,'#17a2b8','','System Design Interview','Framework: Requirements → High-Level → Deep Dive → Trade-offs. Show thinking, not perfection.') +
  T(240,220,'System Design Interview: Structured approach to designing large-scale distributed systems.',9,'#666','middle'),
  [
    e('Scale Estimation Template', 'Quick math for interviews.', codeBlock([
      '// Twitter-like: 500M tweets/day',
      'const DAU = 300_000_000; // 300M daily users',
      'const WRITES_PER_DAY = 500_000_000;',
      'const QPS = WRITES_PER_DAY / 86400; // ~5800 writes/sec',
      'const PEAK_QPS = QPS * 2; // ~11600 peak writes/sec',
      'const TWEET_SIZE_BYTES = 280 + 32 + 16; // text + id + ts',
      'const DAILY_STORAGE_GB = (WRITES_PER_DAY * TWEET_SIZE_BYTES) / (1024**3);',
      "console.log(`Storage/day: ~${DAILY_STORAGE_GB.toFixed(1)} GB`);"
    ]), 'Quick scale estimation for system design interviews — DAU, QPS, storage calculations.'),
    e('API Contract Example (REST)', 'Define endpoints early.', codeBlock([
      '// POST /api/tweet',
      '// Request: { content: string, mediaIds?: string[] }',
      '// Response: { id: string, createdAt: timestamp }',
      '',
      '// GET /api/feed?userId=x&cursor=y&limit=20',
      '// Response: { tweets: Tweet[], nextCursor: string }',
      '',
      '// POST /api/follow',
      '// Request: { followerId: string, followeeId: string }',
      '// Response: { success: boolean }',
      '',
      '// Key decisions:',
      '// - Cursor-based pagination (not offset)',
      '// - Asynchronous tweet creation (write behind)',
      '// - Fan-out on write for active users'
    ]), 'API contract examples for system design — define endpoints with request/response shapes early.'),
    e('High-Level Architecture Diagram', 'Component breakdown.', codeBlock([
      '// Components:',
      '// 1. Load Balancer (NLB/ALB) → distribute traffic',
      '// 2. Web/API Servers (auto-scaled)',
      '// 3. Cache Layer (Redis/Memcached)',
      '// 4. Database (Primary + Replicas + Shards)',
      '// 5. Blob Storage (S3) for media/files',
      '// 6. Message Queue (Kafka) for async processing',
      '// 7. CDN for static assets and media',
      '',
      '// Data Flow:',
      '// Client → LB → API Server → Cache → DB',
      '// API Server → Queue → Workers → DB',
      '// Client → CDN ← Blob Storage'
    ]), 'High-level architecture components and data flow for a scalable system.'),
    e('Database Schema Design', 'Tables for a Twitter-like system.', codeBlock([
      'CREATE TABLE users (',
      '  id BIGSERIAL PRIMARY KEY,',
      '  username VARCHAR(50) UNIQUE NOT NULL,',
      '  created_at TIMESTAMP DEFAULT NOW()',
      ');',
      '',
      'CREATE TABLE tweets (',
      '  id BIGSERIAL PRIMARY KEY,',
      '  user_id BIGINT REFERENCES users(id),',
      '  content VARCHAR(280) NOT NULL,',
      '  created_at TIMESTAMP DEFAULT NOW()',
      ');',
      '',
      'CREATE TABLE follows (',
      '  follower_id BIGINT REFERENCES users(id),',
      '  followee_id BIGINT REFERENCES users(id),',
      '  created_at TIMESTAMP DEFAULT NOW(),',
      '  PRIMARY KEY (follower_id, followee_id)',
      ');',
      '',
      'CREATE INDEX idx_tweets_user_created',
      '  ON tweets(user_id, created_at DESC);'
    ]), 'Database schema design for a social media system with proper indexes.'),
    e('Trade-Offs Matrix', 'Compare design choices.', codeBlock([
      '// SQL vs NoSQL:',
      '// SQL - ACID, joins, schema enforcement',
      '// NoSQL - horizontal scaling, flexible schema',
      '// Decision: SQL for user/tweet data, NoSQL for feed',
      '',
      '// Cache strategies:',
      '// Cache-aside: app checks cache first',
      '// Write-through: write cache + DB simultaneously',
      '// Write-behind: write cache, async DB write',
      '',
      '// Sharding strategies:',
      '// Range-based: simple but hotspots',
      '// Hash-based: even distribution but resharing hard',
      '// Consistent hashing: minimal resharing',
      '',
      '// Consistency:',
      '// Strong: read your writes, higher latency',
      '// Eventual: fast but stale reads possible'
    ]), 'Trade-offs matrix for common system design decisions — SQL vs NoSQL, caching, sharding, consistency.')
  ],
  [
    m('What is the first step in system design?', ['Draw architecture', 'Clarify requirements', 'Choose database', 'Estimate cost'], 1, 'Always start by clarifying functional and non-functional requirements.'),
    m('What drives architectural decisions?', ['Team preference', 'Non-functional requirements', 'Database choice', 'Budget'], 1, 'Non-functional requirements (latency, scale, consistency) drive architecture.'),
    m('What is horizontal scaling?', ['Bigger machines', 'More machines', 'Faster network', 'Better software'], 1, 'Horizontal scaling adds more machines to distribute load.'),
    m('What does CAP stand for?', ['Consistency, Availability, Partition Tolerance', 'Cache, API, Protocol', 'Compute, Availability, Performance', 'Capacity, Access, Protocol'], 0, 'CAP theorem: Consistency, Availability, Partition Tolerance — pick two.'),
    m('What is a single point of failure?', ['A failing component', 'A component whose failure breaks the system', 'A slow component', 'A backup component'], 1, 'SPOF: one component whose failure causes system-wide outage.'),
    m('Why discuss trade-offs in interviews?', ['To show depth', 'To demonstrate awareness of pros and cons', 'To fill time', 'To confuse the interviewer'], 1, 'Discussing trade-offs shows senior-level thinking and awareness.')
  ]
);

/* =================== TOPIC 2: Scalability =================== */
addTopic('sd-scalability', 'Scalability', 'advanced', 25,
  ['Scalability is the ability of a system to handle increasing load by adding resources (horizontal) or upgrading existing resources (vertical).',
   'Horizontal scaling: adding more machines/servers to distribute load. Requires load balancers and stateless design.',
   'Vertical scaling: upgrading existing machines (more CPU, RAM, disk). Simpler but has hard limits (max machine size).',
   'Key scalability patterns: sharding, replication, caching, asynchronous processing, connection pooling, and database read replicas.'
  ],
  'Scalability is like a restaurant kitchen. Vertical scaling is getting a bigger stove and more counter space. Horizontal scaling is hiring more chefs and adding more cooking stations. A restaurant that only scales vertically cannot serve more than the biggest stove allows. One that scales horizontally can keep adding stations.',
  [
    d('Vertical Scaling (Scale Up)', 'Add more power to existing servers: more CPU cores, RAM, faster disks, better network. Pros: simple, no code changes, easier management. Cons: hard limit (max server specs), downtime during upgrade, single point of failure, expensive at high end (diminishing returns).'),
    d('Horizontal Scaling (Scale Out)', 'Add more servers to the pool. Pros: theoretically unlimited, commodity hardware (cheaper), fault-tolerant (lose one node, others continue). Cons: requires load balancer, stateless application design, distributed system complexity (data consistency, coordination).'),
    d('Database Scaling', 'Read replicas: offload reads to replica DBs (eventual consistency). Sharding: split data across multiple DB instances by key (user_id, geo). CQRS: separate read and write models/DBs. Caching: reduce DB reads with Redis/Memcached. Connection pooling: reuse DB connections to handle more concurrent users.'),
    d('Load Balancing', 'Distributes incoming traffic across multiple servers. Algorithms: round-robin, least connections, IP hash (sticky sessions), weighted distribution. Layer 4 (transport): faster, routes by IP/port. Layer 7 (application): smarter, routes by URL/headers/cookies. Health checks: remove unhealthy servers from rotation.'),
    d('Stateless Design', 'Server should not store session/state locally. Store state in shared external stores: Redis, database, or client-side (cookies/JWT). Stateless servers can be freely added/removed by auto-scaling groups. Any request can go to any server. Simplifies deployment, rollback, and failure handling.')
  ],
  'Scalability is about handling growth. Start with simple vertical scaling, then move to horizontal as needed. Design stateless from the start. Use caching aggressively. Plan for database scaling early — it is the hardest to retrofit. Always consider cost vs benefit: the engineering cost of scaling should be proportional to the problem.',
  [
    q('What is scalability?', 'The ability of a system to handle increasing load by adding resources.'),
    q('What is the difference between vertical and horizontal scaling?', 'Vertical: bigger machines (limited, expensive). Horizontal: more machines (unlimited, complex).'),
    q('What is required for horizontal scaling?', 'Load balancer, stateless app design, shared storage, distributed system patterns.'),
    q('What is a database read replica?', 'A secondary database that handles read queries, reducing load on the primary write database.'),
    q('What is CQRS?', 'Command Query Responsibility Segregation — separate models and databases for reads and writes.'),
    q('How does caching improve scalability?', 'Reduces database load, decreases response times, handles traffic spikes without scaling every layer.'),
    q('What is the CAP theorem?', 'Distributed systems trade-off: Consistency, Availability, Partition Tolerance — choose two.'),
    q('What is auto-scaling?', 'Automatically adding/removing servers based on metrics (CPU utilization, request count, queue depth).'),
    q('Why is stateless design important for scalability?', 'Stateless servers can be freely added/removed. Any request can go to any server.'),
    q('What is connection pooling?', 'Reusing database connections instead of opening/closing per request. Significantly improves throughput.')
  ],
  R(10,35,110,25,'#0070f3','','Vertical','Scale up (bigger)') +
  R(10,65,110,25,'#28a745','','Horizontal','Scale out (more)') +
  R(10,95,110,25,'#ffc107','','Load Balancer','Distribute traffic') +
  R(10,125,110,25,'#dc3545','','Caching','Reduce DB load') +
  R(10,155,110,25,'#e83e8c','','Sharding','Split data') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Scalability','Handle growth: vertial → horizontal, stateless, cache, shard, replicate.') +
  T(240,220,'Scalability: Ability to handle growing load. Horizontal + vertical + caching + sharding.',9,'#666','middle'),
  [
    e('Horizontal Scaling with NGINX', 'Load balancer config.', codeBlock([
      'http {',
      '  upstream backend {',
      '    least_conn; # least connections algo',
      '    server app1.example.com weight=3;',
      '    server app2.example.com;',
      '    server app3.example.com backup;',
      '  }',
      '',
      '  server {',
      '    listen 80;',
      '    location / {',
      '      proxy_pass http://backend;',
      '      proxy_set_header Host $host;',
      '      proxy_set_header X-Real-IP $remote_addr;',
      '    }',
      '  }',
      '}'
    ]), 'NGINX load balancing configuration for horizontal scaling with health checks.'),
    e('Stateless Express App', 'Session in Redis, not memory.', codeBlock([
      "const session = require('express-session');",
      'const RedisStore = require(\'connect-redis\').default;',
      '',
      "// Stateless: session in Redis, not local memory",
      "app.use(session({",
      "  store: new RedisStore({ client: redisClient }),",
      "  secret: process.env.SESSION_SECRET,",
      "  resave: false,",
      "  saveUninitialized: false",
      "}));",
      '',
      "// Any server can handle any request",
      "// Add/remove servers freely",
      "// Session persists across server changes"
    ]), 'Stateless application design with externalized session storage in Redis.'),
    e('Read Replicas (PostgreSQL)', 'Offload reads from primary.', codeBlock([
      '// Configure read replicas in connection string',
      '// Primary: writes go here',
      '// Replicas: reads distributed across them',
      '',
      'const { Pool } = require(\'pg\');',
      '',
      'const primary = new Pool({',
      "  connectionString: 'postgres://primary:5432/db'",
      '});',
      '',
      'const replicaPool = new Pool({',
      "  connectionString: 'postgres://replica1:5432/db',",
      '  // Add more replicas to connection string',
      '});',
      '',
      'async function getReadConnection() {',
      '  // Randomly pick a replica',
      '  return replicaPool;',
      '}',
      '',
      '// Use primary for writes, replica for reads',
      'const result = await (isWrite ? primary : replica)',
      '  .query("SELECT * FROM posts WHERE id = $1", [id]);'
    ]), 'Read replicas offload read queries from the primary database to improve throughput.'),
    e('Auto-Scaling with PM2', 'Scale Node.js across CPU cores.', codeBlock([
      '// pm2.config.js',
      'module.exports = {',
      '  apps: [{',
      "    name: 'api',",
      "    script: 'server.js',",
      "    instances: 'max', // use all CPU cores",
      "    exec_mode: 'cluster',",
      '    env: {',
      "      NODE_ENV: 'production'",
      '    }',
      '  }]',
      '};',
      '',
      '// Start: pm2 start pm2.config.js',
      '// Monitor: pm2 monit',
      '// Scale: pm2 scale api +3',
      '',
      '// Cloud auto-scaling (AWS ASG):',
      '// - CloudWatch metric: CPU > 70%',
      '// - Add instance to target group',
      '// - Deploy via CodeDeploy / rolling update'
    ]), 'PM2 cluster mode and cloud auto-scaling groups for horizontal scaling of Node.js apps.'),
    e('Database Connection Pooling', 'Handle many concurrent requests.', codeBlock([
      'const { Pool } = require(\'pg\');',
      '',
      'const pool = new Pool({',
      '  max: 20, // max connections in pool',
      '  idleTimeoutMillis: 30000,',
      '  connectionTimeoutMillis: 2000,',
      '  maxUses: 7500, // recycle connections',
      '});',
      '',
      '// Without pooling: one connection per request',
      '// With pooling: connections are reused',
      '// 20 connections handle 1000+ concurrent requests',
      '',
      "app.get('/api/posts', async (req, res) => {",
      '  const result = await pool.query(',
      '    "SELECT * FROM posts ORDER BY created_at DESC"',
      '  );',
      '  res.json(result.rows);',
      '  // connection auto-returns to pool',
      '});'
    ]), 'Connection pooling reuses database connections, dramatically improving throughput under load.')
  ],
  [
    m('What is horizontal scaling?', ['Using bigger servers', 'Adding more servers', 'Faster hard drives', 'Better networking'], 1, 'Horizontal scaling adds more machines to distribute the load.'),
    m('What is required for horizontal scaling?', ['Shared state', 'Stateless design', 'Local storage', 'Fixed IPs'], 1, 'Stateless app design is required — any server must handle any request.'),
    m('What does CQRS separate?', ['Frontend and backend', 'Read and write models', 'Database and cache', 'HTTP and HTTPS'], 1, 'CQRS separates read and write models for optimized scaling.'),
    m('What limits vertical scaling?', ['Cost', 'Maximum server specs', 'Licensing', 'Team size'], 1, 'Vertical scaling hits hard limits — there is a maximum size server available.'),
    m('What is auto-scaling based on?', ['Time of day', 'Metrics like CPU/request count', 'Manual triggers only', 'Random intervals'], 1, 'Auto-scaling uses metrics (CPU, request count, queue depth) to adjust capacity.'),
    m('Where should session state live in a horizontally scaled app?', ['Local server memory', 'Shared store like Redis', 'Filesystem', 'Environment variables'], 1, 'Session state must be externalized (Redis, DB) for stateless horizontal scaling.')
  ]
);

/* =================== TOPIC 3: Microservices Architecture =================== */
addTopic('sd-microservices', 'Microservices Architecture', 'advanced', 25,
  ['Microservices is an architectural style where a single application is built as a collection of small, loosely coupled, independently deployable services.',
   'Each service owns its own domain, data store, and deployment pipeline. Services communicate via APIs (REST/gRPC) or asynchronous messaging.',
   'Benefits: independent scaling, technology diversity, smaller codebases, faster deployments, fault isolation (one service failure does not cascade).',
   'Challenges: network latency, data consistency (distributed transactions), service discovery, monitoring, debugging, and testing complexity.'
  ],
  'Microservices is like a food court instead of one giant restaurant. Each stall (service) specializes in one thing: pizza, sushi, tacos. Each has its own kitchen (database) and recipes (codebase). If the pizza stall burns down, the sushi stall still serves customers. But coordinating a meal from multiple stalls is harder than one restaurant.',
  [
    d('Service Boundaries (Domain-Driven Design)', 'Decompose by business capability: bounded contexts. Each microservice should map to one business domain (Users, Orders, Payments, Notifications). Indications a boundary is wrong: services that are always deployed together, shared databases, services that call each other synchronously for every operation.'),
    d('Inter-Service Communication', 'Synchronous: REST (HTTP/JSON) or gRPC (HTTP/2, Protocol Buffers). Simpler, but creates coupling and cascading failures. Asynchronous: message queues (Kafka, RabbitMQ). Decoupled, resilient, but eventually consistent. Choose async for cross-service workflows (order → payment → inventory → shipping).'),
    d('API Gateway Pattern', 'Single entry point for all clients. Routes requests to appropriate services. Handles: authentication, rate limiting, request transformation, aggregation, caching. Simplifies client code (one endpoint instead of N). Can be a bottleneck if not designed for high availability.'),
    d('Service Discovery', 'How services find each other\'s network addresses. Client-side discovery: service queries registry (Consul, etcd, Zookeeper) for address. Server-side discovery: load balancer (AWS ALB, Kubernetes) routes to available instances. Both require health checks and deregistration of failed instances.'),
    d('Data Management in Microservices', 'Database-per-service: each service owns its data store. No shared databases — data is accessed only through the service\'s API. Data consistency: saga pattern for distributed transactions (choreography or orchestration). Eventual consistency is the norm. Event sourcing: store events, reconstruct state.')
  ],
  'Microservices offer significant benefits at scale but introduce substantial complexity. Start with a well-structured monolith and extract microservices as needed. Never start a project with microservices — you do not know the boundaries yet. Invest in DevOps, monitoring, and CI/CD before splitting services. The monolith-first approach is proven.',
  [
    q('What is microservices architecture?', 'An architectural style where an application is built as a collection of small, independent services, each with its own data store and deployment pipeline.'),
    q('What are the benefits of microservices?', 'Independent scaling, technology diversity, smaller codebases, faster deployments, fault isolation.'),
    q('What are the challenges of microservices?', 'Network latency, data consistency, service discovery, monitoring complexity, testing, distributed transactions.'),
    q('What is an API Gateway?', 'A single entry point that routes client requests to the appropriate microservice. Handles auth, rate limiting, aggregation.'),
    q('What is service discovery?', 'The mechanism by which services find each other\'s network addresses. Implemented via Consul, etcd, or Kubernetes DNS.'),
    q('What is database-per-service?', 'Each microservice owns and manages its own database. Other services access data only through the service API.'),
    q('What is the Saga pattern?', 'A sequence of local transactions with compensating actions for rollback. Used for distributed transaction management.'),
    q('What is the difference between choreography and orchestration sagas?', 'Choreography: each service listens for events and acts. Orchestration: a central coordinator manages the saga steps.'),
    q('Should you start a new project with microservices?', 'No. Start with a monolith, establish domain boundaries, extract microservices when the monolith shows pain points.'),
    q('How do microservices communicate?', 'Synchronously via REST/gRPC or asynchronously via message queues (Kafka, RabbitMQ). Prefer async for loose coupling.')
  ],
  R(10,35,110,25,'#0070f3','','Service A','Users') +
  R(10,65,110,25,'#28a745','','Service B','Orders') +
  R(10,95,110,25,'#ffc107','','Service C','Payments') +
  R(10,125,110,25,'#dc3545','','Service D','Notifications') +
  R(130,35,90,55,'#e83e8c','','API GW','Entry point') +
  R(130,95,90,55,'#6610f2','','Message Queue','Async comms') +
  A(120,48,130,48) + A(120,78,130,78) + A(120,108,130,108) + A(120,138,130,138) +
  R(230,35,140,115,'#17a2b8','','Microservices','Small, independent services. Own DB, deploy independently. API GW + message queues.') +
  T(240,220,'Microservices: Loosely coupled services with independent data stores, deployment, and scaling.',9,'#666','middle'),
  [
    e('Express Microservice with DB per Service', 'Service boundaries.', codeBlock([
      '// User Service — owns user data',
      "const userPool = new Pool({",
      "  connectionString: 'postgres://users-db:5432/users'",
      '});',
      '',
      "app.get('/api/users/:id', async (req, res) => {",
      '  const { rows } = await userPool.query(',
      '    "SELECT id, username, email FROM users WHERE id = $1"',
      '    , [req.params.id]',
      '  );',
      "  if (!rows[0]) return res.status(404).end();",
      '  res.json(rows[0]);',
      '});',
      '',
      '// Order Service — uses User Service via API',
      "app.post('/api/orders', async (req, res) => {",
      '  // Call user service to validate user',
      '  const userResp = await fetch(',
      '    `http://user-service/api/users/${req.body.userId}`',
      '  );',
      '  if (!userResp.ok) return res.status(400).end();',
      '  // Create order in orders DB',
      '});'
    ]), 'Database-per-service pattern — each service owns its data and accesses others via API calls.'),
    e('API Gateway Pattern (Express)', 'Single entry point.', codeBlock([
      "const gateway = express();",
      '',
      '// Route to user service',
      "gateway.use('/api/users', (req, res) => {",
      '  req.pipe(request(',
      '    \'http://user-service:3001/api/users\' + req.path',
      '  )).pipe(res);',
      '});',
      '',
      '// Route to order service',
      "gateway.use('/api/orders', (req, res) => {",
      '  req.pipe(request(',
      '    \'http://order-service:3002/api/orders\' + req.path',
      '  )).pipe(res);',
      '});',
      '',
      '// Gateway handles auth, rate limiting',
      "gateway.use('/api/*', authenticate);",
      "gateway.use('/api/*', rateLimiter);",
      '',
      "gateway.listen(80);"
    ]), 'API Gateway routes requests to microservices and handles cross-cutting concerns.'),
    e('Async Communication with Kafka', 'Decoupled services via events.', codeBlock([
      '// Order Service publishes event',
      'async function createOrder(order) {',
      '  await db.query("INSERT INTO orders ...", [order]);',
      '  await producer.send({',
      '    topic: \'order-created\',',
      '    messages: [{ key: order.id,',
      '      value: JSON.stringify(order) }]',
      '  });',
      '}',
      '',
      '// Payment Service consumes event',
      'consumer.on(\'message\', async (msg) => {',
      '  const order = JSON.parse(msg.value);',
      '  await processPayment(order);',
      '  await producer.send({',
      '    topic: \'payment-processed\',',
      '    messages: [{ key: order.id,',
      '      value: JSON.stringify(order) }]',
      '  });',
      '});',
      '',
      '// Each service scales independently'
    ]), 'Asynchronous communication via Kafka — services are decoupled and resilient to failures.'),
    e('Health Check Endpoint', 'Service discovery readiness.', codeBlock([
      "// Each microservice exposes health endpoint",
      "app.get('/health', async (req, res) => {",
      "  const dbOk = await checkDatabase();",
      "  const cacheOk = await checkCache();",
      '  const status = dbOk && cacheOk',
      "    ? 'healthy' : 'unhealthy';",
      '  res.status(dbOk && cacheOk ? 200 : 503).json({',
      '    status,',
      '    version: process.env.VERSION,',
      '    uptime: process.uptime()',
      '  });',
      '});',
      '',
      '// Kubernetes liveness/readiness probes',
      '// livenessProbe: httpGet { path: /health, port: 3000 }',
      '// readinessProbe: httpGet { path: /health, port: 3000 }'
    ]), 'Health check endpoints enable service discovery and Kubernetes auto-healing.'),
    e('Saga Pattern with Orchestrator', 'Distributed transaction.', codeBlock([
      "// Orchestrator manages the saga",
      'class OrderSaga {',
      '  async createOrder(orderData) {',
      '    try {',
      '      await this.validateInventory(orderData);',
      '      await this.reservePayment(orderData);',
      '      await this.createShipment(orderData);',
      '      await this.confirmOrder(orderData);',
      '    } catch (err) {',
      '      await this.compensate(orderData);',
      '    }',
      '  }',
      '',
      '  async compensate(orderData) {',
      "    // Reverse in reverse order",
      '    await this.cancelShipment(orderData);',
      '    await this.refundPayment(orderData);',
      '    await this.releaseInventory(orderData);',
      '    await this.cancelOrder(orderData);',
      '  }',
      '}'
    ]), 'Saga pattern with orchestrator manages distributed transactions with compensating actions.')
  ],
  [
    m('What is the primary benefit of microservices?', ['Faster single-service performance', 'Independent deployability', 'Shared database', 'Monolithic codebase'], 1, 'Each service can be developed, deployed, and scaled independently.'),
    m('What is database-per-service?', ['One DB for all services', 'Each service owns its data store', 'Shared DB with service prefix', 'No databases'], 1, 'Each microservice has its own private database accessed only through its API.'),
    m('What does an API Gateway handle?', ['Only routing', 'Auth, routing, rate limiting, aggregation', 'Database queries', 'Frontend rendering'], 1, 'API Gateway handles cross-cutting concerns: auth, rate limiting, routing, and response aggregation.'),
    m('What is the recommended approach to adopting microservices?', ['Start with microservices', 'Monolith-first, extract later', 'Always use both', 'Hybrid from day one'], 1, 'Start with a well-structured monolith, establish boundaries, and extract microservices when needed.'),
    m('What communication pattern is preferred for cross-service workflows?', ['Synchronous REST', 'Asynchronous messaging', 'Shared database', 'File transfer'], 1, 'Asynchronous messaging via Kafka/RabbitMQ decouples services and improves resilience.'),
    m('What is the Saga pattern for?', ['Load balancing', 'Distributed transactions', 'Service discovery', 'API documentation'], 1, 'Saga pattern manages distributed transactions across microservices with compensating actions.')
  ]
);

/* =================== TOPIC 4: Monolithic Architecture =================== */
addTopic('sd-monolithic', 'Monolithic Architecture', 'intermediate', 15,
  ['Monolithic architecture is a traditional software model where all components of an application are bundled together as a single, unified codebase and deployment unit.',
   'All features — UI, business logic, data access — are in one codebase, deployed as one process. Simple to develop, test, and deploy initially.',
   'Advantages: simple development (one repo), easy testing (integration tests), straightforward deployment, low latency (in-process calls), no network overhead.',
   'Disadvantages: scales only vertically, tight coupling between components, large codebase complexity, slow deployments, cascading failures, technology lock-in.'
  ],
  'A monolith is like a single-family home. Everything is under one roof: kitchen, bedrooms, bathroom, living room. Simple to build, easy to move around inside. But if you want to expand the kitchen, you might need to remodel the whole house. One leaky pipe can flood everything. Compare to microservices: a town of small buildings, each with a single purpose.',
  [
    d('When a Monolith Makes Sense', 'Small team (1-10 devs), early-stage startup, simple domain (no complex workflows), tight budget, quick time-to-market required. Basecamp famously runs a monolith serving millions. Shopify started monolithic. The key: keep it well-structured with clear internal boundaries (packages/modules).'),
    d('Monolith Scaling Strategies', 'Vertical scaling: bigger server. Cloning: run multiple instances behind a load balancer (shared database). Decomposition: extract high-traffic components into services (modular monolith → microservices). Database scaling: read replicas, caching, connection pooling. Many monoliths can handle significant scale with just cloning + caching.'),
    d('Modular Monolith (Best Practice)', 'Structured as separate modules/packages with clear interfaces. Each module owns its domain. Modules communicate through well-defined APIs (in-process interfaces). Can be extracted to microservices later. Benefits of monolith (simple deployment, in-process calls) with clean separation. The Modular Monolith is the recommended starting architecture.'),
    d('Challenges at Scale', 'Deployment: deploying one small change means deploying the entire app. Scaling: only vertically, or clone entire app (wasteful — you cannot scale just one feature). Reliability: a memory leak in one module crashes the entire process. Onboarding: new devs must understand the entire codebase. Technology: committed to one tech stack.'),
    d('Monolith to Microservices Migration', 'Step 1: identify bounded contexts (domain boundaries). Step 2: extract as separate module with clear API. Step 3: extract as separate service (separate repo, deployment). Step 4: split database. Strategy: Strangler Fig pattern — gradually replace monolith features with microservices. Extract high-value, high-change services first.')
  ],
  'Monolithic architecture is the right choice for most projects, especially early-stage. Start with a well-structured modular monolith. Extract microservices only when you have proven the need: specific scaling bottlenecks, team size requiring independent deployments, or clear domain boundaries. The modular monolith gives you the best of both worlds.',
  [
    q('What is monolithic architecture?', 'An application where all components (UI, business logic, data access) are bundled as a single codebase and deployment unit.'),
    q('What are the advantages of a monolith?', 'Simple development, easy testing, straightforward deployment, low latency (in-process calls), no network overhead.'),
    q('What are the disadvantages?', 'Scales only vertically, large codebase, slow deployments, tight coupling, cascading failures, technology lock-in.'),
    q('What is a modular monolith?', 'A monolith with well-defined internal modules/ packages with clear interfaces. Can be extracted to microservices later.'),
    q('When should you choose a monolith?', 'Small teams, early-stage startups, simple domains, tight budgets, quick time-to-market requirements.'),
    q('How do you scale a monolith?', 'Vertical scaling, cloning (multiple instances + load balancer + shared DB), caching, read replicas.'),
    q('What is the Strangler Fig pattern?', 'Gradually replacing monolithic components with microservices while the monolith continues running.'),
    q('What is the main scaling limitation of a monolith?', 'You cannot scale individual features — the entire application must be cloned.'),
    q('Why is deployment slower in a monolith?', 'One change requires rebuilding and redeploying the entire application, increasing risk and time.'),
    q('What is the recommended starting architecture?', 'Modular monolith — well-structured with clear domain boundaries, extractable to microservices later.')
  ],
  R(10,35,110,25,'#0070f3','','UI','Frontend') +
  R(10,65,110,25,'#28a745','','Business Logic','All rules') +
  R(10,95,110,25,'#ffc107','','Data Layer','DB access') +
  R(10,125,110,25,'#e83e8c','','All-in-one','Single deploy') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) +
  R(160,35,110,25,'#dc3545','','Pro: Simple','Dev + test + deploy') +
  R(160,70,110,25,'#6610f2','','Con: Scales','Vertically only') +
  R(160,105,110,25,'#17a2b8','','Clone + LB','Horizontal option') +
  R(290,35,190,125,'#17a2b8','','Monolithic','Single codebase, single deploy. Simple but limited scaling. Start here, extract later.') +
  T(240,220,'Monolithic Architecture: Single deployable unit. Start here. Extract to microservices only when needed.',9,'#666','middle'),
  [
    e('Modular Monolith Structure', 'Organized by domain.', codeBlock([
      '// src/',
      '// ├── modules/',
      '// │   ├── users/',
      '// │   │   ├── user.controller.js',
      '// │   │   ├── user.service.js',
      '// │   │   └── user.repository.js',
      '// │   ├── orders/',
      '// │   │   ├── order.controller.js',
      '// │   │   ├── order.service.js',
      '// │   │   └── order.repository.js',
      '// │   └── products/',
      '// ├── shared/ (cross-cutting)',
      '// │   ├── middleware/',
      '// │   └── database/',
      '// └── app.js (entry point)',
      '',
      '// Modules communicate through interfaces',
      'const OrderService = require(\'./modules/orders/order.service\');',
      '// Not direct DB access'
    ]), 'Modular monolith structure with clear domain boundaries — ready for microservice extraction.'),
    e('Single Deployment Process', 'Simple CI/CD pipeline.', codeBlock([
      '# Simple deployment: one artifact',
      'npm install',
      'npm test',
      'npm run build',
      '',
      '# Deploy monolith',
      '# Option 1: Copy files to server',
      'rsync -avz ./dist/ user@server:/app',
      'ssh user@server "pm2 restart app"',
      '',
      '# Option 2: Docker',
      'docker build -t myapp:latest .',
      'docker push registry/myapp:latest',
      'kubectl rollout restart deployment/myapp',
      '',
      '# One deployment for entire application',
      '# Simple rollback (previous version)',
      '# Compare to microservices: N deployments'
    ]), 'Monolith deployment is simple — one artifact, one deploy, easy rollback.'),
    e('Monolith Cloning with Load Balancer', 'Scale monolith horizontally.', codeBlock([
      '// app.js — stateless design within monolith',
      "const session = require('express-session');",
      'const RedisStore = require(\'connect-redis\').default;',
      '',
      "app.use(session({",
      "  store: new RedisStore({ client: redis }),",
      "  secret: process.env.SECRET",
      "}));",
      '',
      '// NGINX config for cloning:',
      'upstream monolith {',
      '  server 10.0.1.1:3000;',
      '  server 10.0.1.2:3000;',
      '  server 10.0.1.3:3000;',
      '}',
      '',
      '// All instances share Redis + database',
      '// Simple horizontal scaling for monolith',
      '// Works until DB becomes bottleneck'
    ]), 'Clone monolith instances behind a load balancer with shared Redis and database for horizontal scaling.'),
    e('Strangler Fig Migration Pattern', 'Gradual monolith → microservices.', codeBlock([
      '// Step 1: Route new features to microservice',
      "app.use('/api/v2/orders', (req, res) => {",
      '  // Forward to new order microservice',
      '  proxy.web(req, res, {',
      "    target: 'http://order-service:3002'",
      '  });',
      '});',
      '',
      '// Step 2: Migrate existing routes gradually',
      "const legacyUsers = require('./modules/users');",
      "app.use('/api/v1/users', legacyUsers);",
      '',
      '// Step 3: Once all routes migrated:',
      '// Remove monolith modules',
      '// Decommission monolith',
      '',
      '// Benefits:',
      '// - No big-bang rewrite',
      '// - Continuous delivery',
      '// - Easy rollback per route'
    ]), 'Strangler Fig pattern gradually migrates monolith features to microservices without downtime.'),
    e('Integration Tests in Monolith', 'Easier than microservices.', codeBlock([
      "const request = require('supertest');",
      "const app = require('../app');",
      '',
      "describe('Order Flow', () => {",
      "  it('creates order with user validation', async () => {",
      '    // Create user',
      '    const userRes = await request(app)',
      "      .post('/api/users')",
      "      .send({ name: 'Alice' })",
      '      .expect(201);',
      '',
      '    // Create order (calls user logic in-process)',
      '    const orderRes = await request(app)',
      "      .post('/api/orders')",
      "      .send({ userId: userRes.body.id })",
      '      .expect(201);',
      '',
      '    // In monolith: fast, in-process test',
      '    // In microservices: need running services',
      '  });',
      '});'
    ]), 'Monolith integration tests are faster and simpler — no need to set up multiple service instances.')
  ],
  [
    m('What is a monolithic application?', ['Multiple services', 'Single deployable unit', 'Serverless functions', 'Distributed system'], 1, 'A monolith is a single codebase deployed as one unit.'),
    m('What is the main advantage of a monolith?', ['Horizontal scaling', 'Simplicity in development', 'Technology diversity', 'Fault isolation'], 1, 'Monoliths are simpler to develop, test, and deploy initially.'),
    m('What is a modular monolith?', ['No modules', 'Well-structured internal modules', 'External microservices', 'Distributed database'], 1, 'Modular monolith has clear internal boundaries that can later be extracted as services.'),
    m('How do you scale a monolith?', ['Shard each module', 'Clone + load balancer', 'Split database per module', 'Rewrite in different language'], 1, 'Clone the entire monolith behind a load balancer with shared storage.'),
    m('What is the Strangler Fig pattern?', ['Rewrite from scratch', 'Gradual replacement of features', 'Immediate migration', 'Database migration only'], 1, 'Strangler Fig gradually replaces monolith features with microservices.'),
    m('When should you choose a monolith?', ['100+ dev teams', 'Early-stage startups', 'Complex distributed workflows', 'Global scale required'], 1, 'Monolith is ideal for small teams, early-stage, and simple domains.')
  ]
);

/* =================== TOPIC 5: Load Balancing =================== */
addTopic('sd-load-balancing', 'Load Balancing', 'intermediate', 20,
  ['Load balancing distributes incoming network traffic across multiple servers to ensure no single server bears too much load.',
   'Types: Layer 4 (transport — TCP/UDP, faster, routes by IP/port) and Layer 7 (application — HTTP/HTTPS, smarter, routes by URL/headers/cookies).',
   'Algorithms: round-robin, least connections, IP hash (sticky sessions), weighted distribution, random, least response time.',
   'Health checks: periodic probes to detect and remove unhealthy servers from the pool. Active (HTTP/TCP checks) and passive (observing error rates).'
  ],
  'A load balancer is like a smart receptionist at a busy office with multiple customer service reps. When customers arrive, the receptionist sends them to the rep with the shortest line (least connections), or alternates between reps (round-robin). If a rep starts making mistakes (health check fails), the receptionist stops sending customers to them.',
  [
    d('Layer 4 (Transport) Load Balancing', 'Operates at TCP/UDP level. Routes traffic based on IP address and port. Does not inspect packet contents (faster). Examples: AWS NLB, HAProxy in TCP mode. Best for: low-latency requirements, non-HTTP protocols, TLS termination at backend. Pros: faster, simpler. Cons: no content-aware routing.'),
    d('Layer 7 (Application) Load Balancing', 'Operates at HTTP/HTTPS level. Inspects request content: URL path, headers, cookies, HTTP method. Examples: AWS ALB, NGINX, HAProxy in HTTP mode. Best for: microservices routing, A/B testing, rate limiting by URL. Pros: smart routing. Cons: higher overhead (terminates TLS, parses HTTP).'),
    d('Load Balancing Algorithms', 'Round-robin: distributes evenly, simple. Least connections: send to server with fewest active connections (accounts for varying request durations). IP hash: hash of client IP determines server (sticky sessions without cookie). Weighted: servers with higher capacity get more traffic. Least response time: send to fastest responder.'),
    d('Health Checks and Auto-Remediation', 'Active: LB sends periodic HTTP/TCP probe to each server. Success = server stays in pool. Failure = server removed. Passive: LB monitors error rates (5xx responses). If threshold exceeded, server temporarily removed. Graceful degradation: stop sending new connections, let existing finish (drain mode).'),
    d('Sticky Sessions (Session Affinity)', 'Ensures a client\'s requests always go to the same server. Methods: cookie-based (LB sets cookie mapping client → server), IP hash (client IP → server). Necessary for stateful apps without shared session store. Best practice: design stateless so sticky sessions are unnecessary — simpler operations and failover.')
  ],
  'Load balancing is fundamental to scalability and availability. Use Layer 7 for HTTP APIs (smart routing, microservices). Use Layer 4 for raw performance (TCP, gaming, streaming). Always configure health checks. Prefer stateless designs to eliminate the need for sticky sessions. Choose the algorithm based on your traffic patterns.',
  [
    q('What is load balancing?', 'Distributing incoming network traffic across multiple servers to prevent overload on any single server.'),
    q('What is the difference between Layer 4 and Layer 7 load balancing?', 'L4: routes by IP/port (faster, TCP/UDP). L7: routes by content (URL, headers, cookies, HTTP-aware).'),
    q('What is round-robin load balancing?', 'Requests are distributed sequentially across servers. Simple but does not account for current load.'),
    q('What is the least connections algorithm?', 'Sends each request to the server with the fewest currently active connections. Accounts for varying request durations.'),
    q('What is a health check?', 'A periodic probe (HTTP/TCP) to verify a server is healthy. Unhealthy servers are removed from the pool.'),
    q('What is sticky session?', 'Ensuring a client always routes to the same server. Achieved via cookies or IP hash. Best avoided through stateless design.'),
    q('What is weight in weighted load balancing?', 'A server with higher weight receives proportionally more traffic. Useful when servers have different capacities.'),
    q('What is DNS load balancing?', 'Multiple A records for one domain — DNS returns different IPs. Simple but no health checks (DNS caching).'),
    q('What is a reverse proxy vs load balancer?', 'Often used interchangeably. Reverse proxy can also terminate TLS, cache content, compress responses.'),
    q('What is the difference between active and passive health checks?', 'Active: LB probes servers periodically. Passive: LB monitors real traffic error rates.')
  ],
  R(10,35,110,25,'#0070f3','','Clients','Users + apps') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Load Balancer','L4 or L7') +
  A(160,60,160,80) + A(160,100,160,120) + A(160,140,160,160) +
  R(10,70,110,25,'#ffc107','','Server 1','App instance') +
  R(10,105,110,25,'#dc3545','','Server 2','App instance') +
  R(10,140,110,25,'#e83e8c','','Server N','App instance') +
  R(290,35,190,145,'#17a2b8','','Load Balancing','Distribute traffic across servers. L4 (fast) or L7 (smart). Health checks, algorithms, sticky sessions.') +
  T(240,210,'Load Balancing: Distribute traffic, health checks, algorithms (round-robin, least connections, IP hash).',9,'#666','middle'),
  [
    e('NGINX Layer 7 Load Balancer', 'HTTP load balancing.', codeBlock([
      'http {',
      '  upstream backend {',
      '    least_conn;',
      '    server app1:3000 weight=5;',
      '    server app2:3000 weight=3;',
      '    server app3:3000 backup;',
      '',
      '    # Health check (NGINX Plus)',
      '    # health_check interval=5s fails=3 passes=2;',
      '  }',
      '',
      '  server {',
      '    listen 443 ssl;',
      '    location /api/ {',
      '      proxy_pass http://backend;',
      '      proxy_set_header X-Real-IP $remote_addr;',
      '    }',
      '    location /static/ {',
      '      # Serve directly from disk',
      '      root /var/www/static;',
      '    }',
      '  }',
      '}'
    ]), 'NGINX Layer 7 HTTP load balancer with weighted least-connections algorithm.'),
    e('Express Rate Limiting (per IP)', 'Prevent overload.', codeBlock([
      'const rateLimit = require(\'express-rate-limit\');',
      '',
      '// Per-IP rate limiting — works with LB',
      '// Trust LB proxy headers for real IP',
      "app.set('trust proxy', 1);",
      '',
      'const limiter = rateLimit({',
      '  windowMs: 60 * 1000, // 1 minute',
      '  max: 100,',
      "  keyGenerator: (req) => req.ip, // real client IP",
      '  message: { error: \'Too many requests\' }',
      '});',
      '',
      "app.use('/api', limiter);",
      '',
      '// Trust proxy required for correct IP detection',
      '// behind a load balancer'
    ]), 'Rate limiting works with load balancers when trust proxy is configured for correct client IP detection.'),
    e('Health Check Endpoint for LB', 'Active health probe.', codeBlock([
      "// Designed for LB health checks",
      "app.get('/health', (req, res) => {",
      '  // Check critical dependencies',
      '  const healthy = db.pool.totalCount > 0',
      '    && redis.status === \'ready\'',
      "    && os.loadavg()[0] < 2; // CPU check",
      '',
      '  if (healthy) {',
      "    res.status(200).json({ status: 'ok' });",
      '  } else {',
      "    res.status(503).json({ status: 'unhealthy' });",
      '  }',
      '});',
      '',
      '// LB probes every 5 seconds',
      '// If 503: remove from pool',
      '// If 200 again: add back to pool'
    ]), 'Health check endpoint for load balancer probes — checks database, cache, and system health.'),
    e('HAProxy Configuration', 'High-performance TCP/HTTP proxy.', codeBlock([
      'global',
      '  maxconn 10000',
      '  log 127.0.0.1 local0',
      '',
      'defaults',
      '  mode http',
      '  timeout connect 5000ms',
      '  timeout client 50000ms',
      '  timeout server 50000ms',
      '',
      'frontend http-in',
      '  bind *:80',
      '  default_backend servers',
      '',
      'backend servers',
      '  balance roundrobin',
      '  option httpchk GET /health',
      '  server app1 10.0.1.1:3000 check',
      '  server app2 10.0.1.2:3000 check',
      '  server app3 10.0.1.3:3000 check backup',
      '',
      '  # Sticky session via cookie',
      '  # cookie SRV insert indirect nocache',
      '  # server app1 10.0.1.1:3000 check cookie s1'
    ]), 'HAProxy configuration with health checks, round-robin balancing, and optional sticky sessions.'),
    e('DNS Load Balancing', 'Simple multi-A record approach.', codeBlock([
      '// DNS zone: myapp.com',
      '// Multiple A records for same name',
      'myapp.com. IN A 10.0.1.1',
      'myapp.com. IN A 10.0.1.2',
      'myapp.com. IN A 10.0.1.3',
      '',
      '// DNS returns IPs in different order',
      '// Client picks first IP (or random)',
      '',
      '// TTL controls caching',
      '// Short TTL (60s): faster failover',
      '// Long TTL (300s+): caching efficiency',
      '',
      '// Limitations:',
      '// - No health checks',
      '// - DNS caching ignores failures',
      '// - Clients may use stale IPs',
      '// Best for: simple distribution',
      '// Best paired with: proper LB behind VIP'
    ]), 'DNS load balancing is simple but lacks health checks — best paired with a proper load balancer.')
  ],
  [
    m('What layer does HTTP load balancing operate at?', ['Layer 3', 'Layer 4', 'Layer 7', 'Layer 2'], 2, 'Layer 7 (Application) load balancing inspects HTTP content for smart routing.'),
    m('What is the least connections algorithm?', ['Random server', 'Server with fewest active connections', 'Fastest response time', 'Round-robin'], 1, 'Least connections sends traffic to the server with the fewest active connections.'),
    m('What is a health check?', ['Server log review', 'Periodic probe to verify server health', 'User survey', 'Backup creation'], 1, 'Health checks periodically test if servers are healthy and remove failed ones from rotation.'),
    m('What is sticky session?', ['Session encryption', 'Client always goes to same server', 'Session deletion', 'Shared session store'], 1, 'Sticky session ensures a client\'s requests always route to the same server.'),
    m('What is the difference between L4 and L7 LB?', ['L4 is faster, L7 is smarter', 'L7 is faster, L4 is smarter', 'No difference', 'L4 only for UDP'], 0, 'L4 routes by IP/port (faster). L7 routes by HTTP content (smarter routing).'),
    m('What does a load balancer do when a server fails health check?', ['Keeps sending traffic', 'Removes server from pool', 'Notifies admin only', 'Restarts the server'], 1, 'Failed health checks remove the server from the active pool until it recovers.')
  ]
);

/* =================== TOPIC 6: Caching Strategies =================== */
addTopic('sd-caching', 'Caching Strategies', 'intermediate', 20,
  ['Caching stores frequently accessed data in a fast, temporary storage layer to reduce latency and database load.',
   'Cache levels: client-side (browser cache, local storage), CDN (edge cache), application cache (in-memory: Redis/Memcached), database cache (buffer pool, query cache).',
   'Cache strategies: cache-aside, read-through, write-through, write-behind, refresh-ahead. Each has different consistency and performance characteristics.',
   'Key considerations: TTL/expiration (how long data stays fresh), cache invalidation (updating/removing stale entries), cache miss handling (thundering herd), eviction policies (LRU, LFU, FIFO, TTL).'
  ],
  'Caching is like your kitchen pantry. You keep frequently used items (spices, rice, canned goods) in the pantry (cache) instead of going to the grocery store (database) every time you need them. You restock the pantry periodically. If you run out of pantry space, you remove items you use least (eviction). And you check expiration dates to avoid stale food.',
  [
    d('Cache-Aside (Lazy Loading)', 'Application code checks cache first. On cache miss: load from DB, store in cache, return. Most common pattern. Pros: simple, only caches what is requested. Cons: cache misses add latency (thundering herd on popular items). Miss penalty: three network hops (app → cache → DB → cache → app).'),
    d('Read-Through Cache', 'Cache library (Redis, Memcached) automatically fetches from DB on miss. Application does not know about the database — it talks only to cache. Pros: simpler app code, consistent caching behavior. Cons: cache library must be configured with DB load logic. Less flexible than cache-aside.'),
    d('Write Strategies', 'Write-through: write to cache + DB synchronously. Ensures consistency but adds write latency. Write-behind (write-back): write to cache, asynchronously write to DB. Fast writes, but risk of data loss if cache fails before DB write. Write-around: write directly to DB, invalidate cache — next read will populate cache.'),
    d('Cache Eviction Policies', 'LRU (Least Recently Used): evict oldest accessed item. LFU (Least Frequently Used): evict least accessed item (can cache stale popular items). FIFO (First In, First Out): evict oldest inserted item regardless of access. TTL (Time To Live): evict after fixed time regardless of access. Most caches use LRU + TTL combination.'),
    d('Cache Invalidation (Hardest Problem)', 'Invalidation notifies cache that data has changed and must be refreshed. Methods: TTL-based (accept staleness), event-driven (publish update event → subscribers invalidate), direct invalidation (application explicitly removes/updates cache keys). Cache invalidation is famously one of the two hard things in computer science (with naming and off-by-one errors).')
  ],
  'Caching is critical for performance at scale. Use cache-aside for most scenarios. Set appropriate TTLs — shorter for dynamic data, longer for static. Plan for cache stampedes (thundering herd) with early expiration or locking. Choose eviction policy wisely. Remember: cache invalidation is the hard part — design for it from the start.',
  [
    q('What is caching?', 'Storing frequently accessed data in a fast temporary storage layer to reduce latency and database load.'),
    q('What is cache-aside?', 'Application checks cache first. On miss: query DB, store in cache, return. Most common caching pattern.'),
    q('What is a cache miss?', 'Requested data is not in cache. Must be fetched from the primary data store (slower).'),
    q('What is TTL caching?', 'Time-To-Live — cache entries are automatically evicted after a fixed duration.'),
    q('What is cache invalidation?', 'The process of removing or updating stale cache entries when the underlying data changes.'),
    q('What is the thundering herd problem?', 'Many concurrent requests for the same expired cache key all miss and overload the database simultaneously.'),
    q('What eviction policy does Redis use by default?', 'LRU (Least Recently Used) — evicts the least recently accessed keys when memory is full.'),
    q('What is write-behind caching?', 'Data is written to cache immediately and asynchronously written to the database. Fast but risks data loss.'),
    q('What is a CDN?', 'Content Delivery Network — caches static assets (images, CSS, JS) at edge locations close to users.'),
    q('What is Redis vs Memcached?', 'Redis: rich data types, persistence, replication, pub/sub. Memcached: simpler, multithreaded, no persistence, pure cache.')
  ],
  R(10,35,110,25,'#0070f3','','Client Request','Check cache first') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Cache Hit','Return cached data') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Cache Miss','Query database') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Database','Fetch + store in cache') +
  R(10,105,110,25,'#e83e8c','','Set TTL','Auto-expire') +
  R(10,140,110,25,'#6610f2','','Eviction','LRU / LFU / FIFO') +
  R(290,35,190,135,'#17a2b8','','Caching','Fast data access: cache-aside, TTL, eviction policies, CDN. Reduce DB load dramatically.') +
  T(240,210,'Caching: Reduce latency and database load. Cache-aside, write-through, TTL, LRU eviction.',9,'#666','middle'),
  [
    e('Cache-Aside with Redis (Node.js)', 'Lazy loading pattern.', codeBlock([
      'async function getUser(userId) {',
      '  // Check cache first',
      '  const cached = await redis.get(`user:${userId}`);',
      '  if (cached) {',
      '    return JSON.parse(cached);',
      '  }',
      '',
      '  // Cache miss — query database',
      '  const user = await db.query(',
      '    "SELECT * FROM users WHERE id = $1", [userId]',
      '  );',
      '',
      '  if (user.rows[0]) {',
      '    // Store in cache with TTL',
      '    await redis.setEx(',
      '      `user:${userId}`,',
      '      3600, // 1 hour TTL',
      '      JSON.stringify(user.rows[0])',
      '    );',
      '  }',
      '',
      '  return user.rows[0];',
      '}'
    ]), 'Cache-aside pattern with Redis — check cache, miss queries DB, populates cache with TTL.'),
    e('Cache Invalidation on Update', 'Refresh cache when data changes.', codeBlock([
      'async function updateUser(userId, updates) {',
      '  // Update database',
      '  await db.query(',
      '    "UPDATE users SET name = $1 WHERE id = $2",',
      '    [updates.name, userId]',
      '  );',
      '',
      '  // Invalidate cache (delete old)',
      '  await redis.del(`user:${userId}`);',
      '',
      '  // Option 1: Delete — next read populates',
      '  // Option 2: Update cache immediately',
      '  // await redis.setEx(`user:${userId}`, 3600,',
      '  //   JSON.stringify({ ...oldUser, ...updates }));',
      '}',
      '',
      '// Event-driven invalidation',
      '// User service publishes user:updated event',
      '// Cache service consumes and invalidates'
    ]), 'Cache invalidation on update — delete stale cache entry so next read fetches fresh data.'),
    e('Avoiding Thundering Herd (Mutex)', 'Prevent cache stampede.', codeBlock([
      'async function getPopularPost(postId) {',
      '  const cached = await redis.get(`post:${postId}`);',
      '  if (cached) return JSON.parse(cached);',
      '',
      '  // Lock to prevent thundering herd',
      '  const lockKey = `lock:post:${postId}`;',
      '  const acquired = await redis.setNX(lockKey, \'1\', 5);',
      '',
      '  if (acquired) {',
      '    // Only one process fetches from DB',
      '    const post = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);',
      '    await redis.setEx(`post:${postId}`, 3600, JSON.stringify(post.rows[0]));',
      '    await redis.del(lockKey);',
      '    return post.rows[0];',
      '  }',
      '',
      '  // Other processes wait and retry cache',
      '  await new Promise(r => setTimeout(r, 100));',
      '  return getPopularPost(postId); // retry',
      '}'
    ]), 'Mutex-based locking prevents thundering herd when many requests hit a cache miss simultaneously.'),
    e('Write-Through Cache Strategy', 'Always keep cache fresh.', codeBlock([
      'async function createPost(postData) {',
      '  // Write to database',
      '  const result = await db.query(',
      '    "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",',
      '    [postData.userId, postData.content]',
      '  );',
      '  const post = result.rows[0];',
      '',
      '  // Write to cache (synchronously)',
      '  await redis.setEx(',
      '    `post:${post.id}`,',
      '    3600,',
      '    JSON.stringify(post)',
      '  );',
      '',
      '  // Also update list cache',
      '  const listKey = `user:${postData.userId}:posts`;',
      '  await redis.lPush(listKey, JSON.stringify(post));',
      '  await redis.lTrim(listKey, 0, 100); // keep last 100',
      '',
      '  return post;',
      '}'
    ]), 'Write-through cache updates both DB and cache on every write — consistent but slower writes.'),
    e('Multi-Level Caching (L1 + L2)', 'In-memory + Redis.', codeBlock([
      '// L1: In-memory cache (local to each server)',
      '// L2: Redis (shared across servers)',
      '',
      'const l1Cache = new Map(); // local cache',
      '',
      'async function getData(key) {',
      '  // L1: Check local memory (fastest)',
      '  if (l1Cache.has(key)) {',
      '    return l1Cache.get(key);',
      '  }',
      '',
      '  // L2: Check Redis (shared)',
      '  const data = await redis.get(key);',
      '  if (data) {',
      '    // Populate L1 (short TTL)',
      '    l1Cache.set(key, JSON.parse(data));',
      '    setTimeout(() => l1Cache.delete(key), 60000);',
      '    return JSON.parse(data);',
      '  }',
      '',
      '  // Miss: fetch from DB',
      '  const result = await db.query("...", [key]);',
      '  await redis.setEx(key, 3600, JSON.stringify(result));',
      '  return result;',
      '}'
    ]), 'Multi-level caching: L1 (in-memory) for ultra-fast access, L2 (Redis) for shared caching.')
  ],
  [
    m('What is a cache hit?', ['Data not found in cache', 'Data found in cache', 'Cache is full', 'Cache server is down'], 1, 'A cache hit means the requested data was found in the cache.'),
    m('What is cache-aside?', ['Application writes to cache only', 'App checks cache, on miss queries DB and populates cache', 'Cache auto-fetches from DB', 'Write-back to DB'], 1, 'Cache-aside: app checks cache first, populates on miss.'),
    m('What does TTL stand for?', ['Time To Live', 'Total Transfer Limit', 'Transaction Time Log', 'Table Trigger List'], 0, 'TTL = Time To Live — how long cache entries remain valid.'),
    m('What is the thundering herd problem?', ['Many writes to same key', 'Many concurrent requests for expired cache key overload DB', 'Cache server crash', 'Network congestion'], 1, 'Thundering herd: many simultaneous cache misses hammer the database.'),
    m('What eviction policy does Redis use by default?', ['LFU', 'LRU', 'FIFO', 'Random'], 1, 'Redis defaults to LRU (Least Recently Used) eviction.'),
    m('What is write-behind caching?', ['Synchronous write to cache and DB', 'Async write to DB after writing to cache', 'Only write to DB', 'Only write to cache'], 1, 'Write-behind writes to cache immediately and asynchronously to DB.')
  ]
);

/* =================== TOPIC 7: Database Sharding =================== */
addTopic('sd-database-sharding', 'Database Sharding', 'advanced', 25,
  ['Sharding is a database scaling technique that horizontally partitions data across multiple database instances (shards).',
   'Each shard holds a subset of the data. Together, all shards hold the full dataset. Each shard is an independent database server.',
   'Sharding key determines how data is distributed. Choosing the right sharding key is critical — it affects performance, scalability, and query complexity.',
   'Challenges: resharding (adding/removing shards), hotspot shards, cross-shard queries, distributed joins, global uniqueness, and backup/restore complexity.'
  ],
  'Sharding is like splitting a giant phonebook into multiple smaller books based on the first letter of the last name. "A-F" is one book, "G-M" is another, "N-Z" is a third. If you know the person\'s last name, you know exactly which book to look in. But if you need everyone in a city (cross-shard query), you must check all books.',
  [
    d('Sharding Strategies', 'Range-based: split by key range (user_id 1-1000 on shard 1, 1001-2000 on shard 2). Simple but can create hotspots (new users on one shard). Hash-based: hash(key) % N shards. Even distribution, but resharding requires rehashing all data. Consistent hashing: minimizes data movement on resharding. Directory-based: lookup table maps key to shard (flexible but extra lookup).'),
    d('Choosing a Sharding Key', 'Criteria: high cardinality, even distribution, aligns with query patterns (most queries include this key). For user data: user_id or tenant_id (natural partitioning). For time-series: timestamp range (but can create hot shard for current data). Bad keys: boolean fields, low-cardinality fields, fields not used in queries.'),
    d('Cross-Shard Queries', 'Queries that span multiple shards are expensive — they must be sent to all shards and results aggregated. Avoid if possible. Techniques: duplicate denormalized data on all shards, use secondary indexes (Elasticsearch), accept fan-out queries for rare cases. Design schema so most queries include the shard key.'),
    d('Resharding (Adding/Removing Shards)', 'The hardest sharding challenge. Downtime approach: stop writes, migrate data, restart. Online approach: logical shards (many small shards, fewer physical servers) — add servers and redistribute logical shards. Consistent hashing: only neighboring shards affected. Pre-splitting: create many shards initially, map multiple to each physical server.'),
    d('Distributed ID Generation', 'Global unique IDs across shards needed. Auto-increment fails (unique per shard, not globally). Solutions: UUID (128-bit, no ordering), Snowflake ID (timestamp + worker + sequence — ordered, unique), database sequence (single point of failure), Redis INCR (fast, but extra dependency). Snowflake-style IDs are most common in sharded systems.')
  ],
  'Sharding is a powerful but complex scaling technique. Start with replication and caching before sharding. Choose your sharding key carefully — it is extremely difficult to change later. Use consistent hashing or pre-splitting to ease resharding. Accept that cross-shard queries will be expensive. Design your data model around the sharding key.',
  [
    q('What is database sharding?', 'Horizontal partitioning of data across multiple database instances — each shard holds a subset of data.'),
    q('What is a sharding key?', 'The attribute used to determine which shard stores a given row. Must have high cardinality and even distribution.'),
    q('What is range-based sharding?', 'Data split by key ranges (A-M on shard 1, N-Z on shard 2). Simple but can cause hotspots.'),
    q('What is hash-based sharding?', 'hash(key) % N determines shard. Even distribution but resharding requires rehashing all data.'),
    q('What is consistent hashing?', 'A hashing technique that minimizes data movement when shards are added or removed.'),
    q('What is a cross-shard query?', 'A query that spans multiple shards — requires fan-out to all shards and result aggregation. Expensive.'),
    q('What is a hotspot shard?', 'A shard that receives disproportionately more traffic than others. Common with poor key choice.'),
    q('How do you generate unique IDs across shards?', 'Snowflake ID (timestamp + worker + sequence), UUID, or Redis INCR. Avoid auto-increment.'),
    q('What is the hardest problem with sharding?', 'Resharding — adding or removing shards requires significant data migration.'),
    q('Should you shard early?', 'No. Use replication and caching first. Sharding adds significant complexity. Add when necessary.')
  ],
  R(10,35,110,25,'#0070f3','','Shard Key','user_id % N') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Shard A','user_id % 3 = 0') +
  R(160,65,110,25,'#ffc107','','Shard B','user_id % 3 = 1') +
  R(160,95,110,25,'#dc3545','','Shard C','user_id % 3 = 2') +
  R(10,70,110,25,'#e83e8c','','Router','Map key → shard') +
  R(10,105,110,25,'#6610f2','','Consistent Hash','Min resharing') +
  R(10,140,110,25,'#17a2b8','','Snowflake ID','Globally unique') +
  R(290,35,190,125,'#17a2b8','','Database Sharding','Horizontal partitioning across DBs. Careful key choice, consistent hashing, Snowflake IDs.') +
  T(240,210,'Database Sharding: Horizontal partitioning. Choose key wisely. Consistent hashing. Snowflake IDs.',9,'#666','middle'),
  [
    e('Hash-Based Sharding (Node.js)', 'Simple shard routing.', codeBlock([
      'const SHARD_COUNT = 3;',
      '',
      'function getShard(key) {',
      '  const hash = crypto.createHash(\'md5\')',
      '    .update(String(key)).digest(\'hex\');',
      '  const shardId = parseInt(hash, 16) % SHARD_COUNT;',
      '  return shards[shardId];',
      '}',
      '',
      'const shards = [',
      "  { host: 'shard1-db', port: 5432 },",
      "  { host: 'shard2-db', port: 5432 },",
      "  { host: 'shard3-db', port: 5432 }",
      '];',
      '',
      'async function getUser(userId) {',
      '  const shard = getShard(userId);',
      '  const pool = pools[shard];',
      '  return pool.query("SELECT * FROM users WHERE id = $1", [userId]);',
      '}',
      '',
      '// All queries include shard key',
      '// No cross-shard queries needed'
    ]), 'Hash-based shard routing — deterministic distribution using MD5 hash modulo shard count.'),
    e('Snowflake ID Generator', 'Unique IDs across shards.', codeBlock([
      'class SnowflakeId {',
      '  constructor(workerId) {',
      '    this.epoch = 1609459200000n; // 2021-01-01',
      '    this.workerId = BigInt(workerId);',
      '    this.sequence = 0n;',
      '    this.lastTimestamp = 0n;',
      '  }',
      '',
      '  nextId() {',
      '    let ts = BigInt(Date.now()) - this.epoch;',
      '    if (ts === this.lastTimestamp) {',
      '      this.sequence = (this.sequence + 1n) & 4095n;',
      '      if (this.sequence === 0n) ts++; // wait next ms',
      '    } else {',
      '      this.sequence = 0n;',
      '    }',
      '    this.lastTimestamp = ts;',
      '    return (ts << 22n) | (this.workerId << 12n) | this.sequence;',
      '  }',
      '}',
      '',
      '// 64-bit ID: timestamp(41) + worker(10) + sequence(12)'
    ]), 'Snowflake ID generates 64-bit globally unique, time-ordered IDs without coordination between shards.'),
    e('Consistent Hashing with Virtual Nodes', 'Minimize resharing.', codeBlock([
      'class ConsistentHash {',
      '  constructor(virtualNodes = 100) {',
      '    this.vnodes = virtualNodes;',
      '    this.ring = new Map(); // hash → node',
      '    this.sorted = [];',
      '  }',
      '',
      '  addNode(node) {',
      '    for (let i = 0; i < this.vnodes; i++) {',
      '      const hash = this.hash(`${node}:${i}`);',
      '      this.ring.set(hash, node);',
      '      this.sorted.push(hash);',
      '    }',
      '    this.sorted.sort();',
      '  }',
      '',
      '  getNode(key) {',
      '    const hash = this.hash(key);',
      '    const pos = this.sorted.findIndex(h => h >= hash);',
      '    const nodeHash = pos === -1',
      '      ? this.sorted[0]',
      '      : this.sorted[pos];',
      '    return this.ring.get(nodeHash);',
      '  }',
      '',
      '  hash(key) { /* returns MD5 hash */ }',
      '}',
      '',
      '// Adding/removing a node only affects',
      '// K/N fraction of keys (K keys, N nodes)'
    ]), 'Consistent hashing with virtual nodes minimizes data movement during resharing.'),
    e('Sharded Database Connection Pool', 'Manage multiple shard pools.', codeBlock([
      'const shardConfigs = [',
      "  { host: 'shard0.db', db: 'shard0' },",
      "  { host: 'shard1.db', db: 'shard1' },",
      "  { host: 'shard2.db', db: 'shard2' }",
      '];',
      '',
      'const pools = shardConfigs.map(cfg =>',
      '  new Pool({',
      '    host: cfg.host,',
      '    database: cfg.db,',
      '    max: 10',
      '  })',
      ');',
      '',
      'async function queryShard(shardId, text, params) {',
      '  return pools[shardId].query(text, params);',
      '}',
      '',
      '// For cross-shard queries:',
      'async function queryAllShards(text, params) {',
      '  const results = await Promise.all(',
      '    pools.map(p => p.query(text, params))',
      '  );',
      '  return results.flatMap(r => r.rows);',
      '}',
      '',
      '// Use queryShard for keyed queries',
      '// Use queryAllShards for admin/analytics'
    ]), 'Sharded database connection pools — route single-shard queries quickly, fan-out for cross-shard queries.')
  ],
  [
    m('What is database sharding?', ['Vertical partitioning', 'Horizontal partitioning across DBs', 'Database replication', 'Connection pooling'], 1, 'Sharding horizontally partitions data across multiple database instances.'),
    m('What is the most important decision in sharding?', ['Database vendor', 'Sharding key', 'Server location', 'Backup strategy'], 1, 'The sharding key is the most critical decision — it determines performance and scalability.'),
    m('What is consistent hashing?', ['Always same hash', 'Minimizes data movement on node changes', 'Cryptographic hash', 'Consistency check'], 1, 'Consistent hashing minimizes data rebalancing when adding/removing shards.'),
    m('What is a cross-shard query?', ['Query across databases', 'Query spanning multiple shards', 'Query with joins', 'Query with subquery'], 1, 'Cross-shard queries must fan out to all shards and aggregate results — expensive.'),
    m('What is a hotspot shard?', ['Fast shard', 'Shard receiving disproportionate load', 'Newly added shard', 'Backup shard'], 1, 'Hotspot shard receives much more traffic than others due to poor key distribution.'),
    m('What ID generation is best for sharded systems?', ['Auto-increment', 'Snowflake ID', 'Random UUID', 'Timestamp'], 1, 'Snowflake IDs are time-ordered, globally unique, and work without coordination between shards.')
  ]
);

/* =================== TOPIC 8: Database Replication =================== */
addTopic('sd-database-replication', 'Database Replication', 'intermediate', 20,
  ['Database replication copies data from one database server (primary) to one or more replica servers to improve availability, durability, and read scalability.',
   'Types: single-primary (one primary for writes, multiple read replicas), multi-primary (multiple writable nodes), and cascade replication.',
   'Replication modes: synchronous (write must be confirmed by replica — slower, consistent) and asynchronous (write confirmed immediately — faster, eventual consistency).',
   'Key concepts: failover (promoting replica to primary on failure), replication lag (delay between primary and replica updates), conflict resolution for multi-primary setups.'
  ],
  'Database replication is like a manager and assistants sharing a document. The manager (primary) has the master copy and makes all edits (writes). Assistants (replicas) get copies of every change. If you only need to read, you can ask any assistant. If the manager is sick (failure), one assistant takes over. The assistants might be a few seconds behind the manager (replication lag).',
  [
    d('Single-Primary Replication', 'One primary handles all writes. Replicas handle read queries. Writes must go to primary. MySQL/PostgreSQL built-in replication. Standard setup: primary + 1-3 replicas. Promotes a replica on primary failure. Asynchronous by default — replicas may lag. Synchronous option for zero data loss (higher write latency).'),
    d('Multi-Primary (Active-Active) Replication', 'Multiple nodes accept writes. Each node replicates changes to others. Challenges: conflict resolution (two writes to same row on different nodes). Strategies: last-writer-wins (LWW), CRDTs (conflict-free replicated data types), application-level conflict handling. Used in Cassandra, CouchDB, MySQL Group Replication.'),
    d('Replication Lag and Its Effects', 'Time between a write on primary and its appearance on replicas. Causes: network latency, replica overload, large transactions. Effects: stale reads (user sees old data after write), read-your-writes consistency issues. Solutions: read from primary for critical queries, wait for replica catch-up, use session-level consistency guarantees.'),
    d('Failover and High Availability', 'Automatic failover: monitoring system detects primary failure, promotes replica to primary, updates connection strings. Manual failover: operator promotes replica. Steps: detect failure, verify data consistency, promote replica, redirect traffic. DNS updates and connection pooling auto-heal. Avoid split-brain (two primaries both accepting writes).'),
    d('Replication Topologies', 'Chain: primary → replica1 → replica2 (reduces load on primary). Star: primary → multiple replicas directly. Tree: combinations. Multi-tier: replicas of replicas for geographic distribution (region A primary → region B replica → region B app replicas). Cascading reduces load on primary but increases lag at deeper levels.')
  ],
  'Replication improves read scalability and availability. Start with single-primary + replicas. Use asynchronous replication unless zero data loss is required. Plan for replication lag — read critical data from primary. Implement automatic failover with monitoring. Test failure scenarios regularly (GameDays). Multi-primary adds complexity — avoid unless needed.',
  [
    q('What is database replication?', 'Copying data from a primary database to replicas to improve availability, durability, and read capacity.'),
    q('What is single-primary replication?', 'One primary for writes, multiple replicas for reads. Most common and simplest replication topology.'),
    q('What is replication lag?', 'The delay between a write on the primary and its appearance on replicas. Caused by async replication.'),
    q('What is synchronous replication?', 'Write is confirmed only after all replicas acknowledge it. Slower but zero data loss.'),
    q('What is a failover?', 'Promoting a replica to primary when the current primary fails. Can be manual or automatic.'),
    q('What is split-brain?', 'A dangerous state where two nodes both think they are the primary, accepting conflicting writes.'),
    q('What is multi-primary replication?', 'Multiple nodes accept writes. Higher complexity due to conflict resolution.'),
    q('Why use read replicas?', 'Offload read queries from primary, improving write throughput and read response times.'),
    q('What is cascade replication?', 'A replica of a replica — primary → replica1 → replica2. Reduces load on primary.'),
    q('How do you handle read-your-writes consistency?', 'Read from primary for queries that need immediate consistency, or wait for replica catch-up.')
  ],
  R(10,35,110,25,'#0070f3','','Primary','Writes only') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) +
  R(160,35,110,25,'#28a745','','Replica 1','Reads') +
  R(160,70,110,25,'#ffc107','','Replica 2','Reads') +
  R(160,105,110,25,'#dc3545','','Replica N','Reads') +
  R(10,70,110,25,'#e83e8c','','Synchronous','Zero data loss') +
  R(10,105,110,25,'#6610f2','','Asynchronous','Faster, lag possible') +
  R(10,140,110,25,'#17a2b8','','Failover','Promote replica') +
  R(290,35,190,135,'#17a2b8','','Database Replication','Primary writes, replicas read. Async/sync modes. Failover, lag management, HA.') +
  T(240,210,'Database Replication: Primary for writes, replicas for reads. Async replication, failover, read-your-writes.',9,'#666','middle'),
  [
    e('Read/Write Splitting with pg', 'Route reads to replicas.', codeBlock([
      'const { Pool } = require(\'pg\');',
      '',
      'const primary = new Pool({',
      "  connectionString: 'postgres://primary:5432/db'",
      '});',
      '',
      'const replicas = [',
      "  new Pool({ connectionString: 'postgres://replica1:5432/db' }),",
      "  new Pool({ connectionString: 'postgres://replica2:5432/db' })",
      '];',
      '',
      'function getReplica() {',
      '  return replicas[Math.floor(Math.random() * replicas.length)];',
      '}',
      '',
      "app.get('/api/posts', async (req, res) => {",
      '  // Read from replica',
      '  const result = await getReplica()',
      '    .query("SELECT * FROM posts ORDER BY created_at DESC");',
      '  res.json(result.rows);',
      '});',
      '',
      "app.post('/api/posts', async (req, res) => {",
      '  // Write to primary',
      '  const result = await primary',
      '    .query("INSERT INTO posts (content) VALUES ($1) RETURNING *",',
      '    [req.body.content]);',
      '  res.json(result.rows[0]);',
      '});'
    ]), 'Read/write splitting — route writes to primary, distribute reads across replicas.'),
    e('Read-Your-Writes Consistency', 'Avoid stale reads after write.', codeBlock([
      'async function createAndViewPost(userId, content) {',
      '  // Write to primary',
      '  const { rows } = await primary.query(',
      '    "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",',
      '    [userId, content]',
      '  );',
      '  const post = rows[0];',
      '',
      '  // Wait for replication (optional)',
      '  await waitForReplication(post.id);',
      '',
      '  // Read from primary (not replica)',
      '  // to guarantee read-your-writes',
      '  const fresh = await primary.query(',
      '    "SELECT * FROM posts WHERE id = $1", [post.id]',
      '  );',
      '  return fresh.rows[0];',
      '}',
      '',
      'async function waitForReplication(postId) {',
      '  // Poll replicas until they have the data',
      '  while (true) {',
      '    const replica = getReplica();',
      '    const { rows } = await replica.query(',
      '      "SELECT 1 FROM posts WHERE id = $1", [postId]',
      '    );',
      '    if (rows.length > 0) break;',
      '    await new Promise(r => setTimeout(r, 50));',
      '  }',
      '}'
    ]), 'Read-your-writes consistency ensures users see their own writes immediately.'),
    e('PostgreSQL Streaming Replication Setup', 'Configure primary-replica.', codeBlock([
      '-- On primary: postgresql.conf',
      "wal_level = 'replica'",
      'max_wal_senders = 3',
      'wal_keep_size = 1024  -- MB',
      '',
      '-- On primary: pg_hba.conf',
      'host replication replicator replica_ip/32 trust',
      '',
      '-- Create replication user on primary',
      "CREATE USER replicator WITH REPLICATION PASSWORD 'secret';",
      '',
      '-- On replica: pg_basebackup',
      'pg_basebackup -h primary -D /var/lib/postgresql/data',
      '  -U replicator -P -v --wal-method=stream',
      '',
      '-- On replica: postgresql.conf',
      "primary_conninfo = 'host=primary port=5432 user=replicator password=secret'",
      "hot_standby = 'on'"
    ]), 'PostgreSQL streaming replication setup — primary sends WAL, replica replays.'),
    e('Connection Pool with Failover', 'Auto-detect primary promotion.', codeBlock([
      'class FailoverPool {',
      '  constructor(config) {',
      '    this.primary = new Pool(config.primary);',
      '    this.replicas = config.replicas.map(c => new Pool(c));',
      '    this._currentPrimary = null;',
      '  }',
      '',
      '  async query(isWrite, text, params) {',
      '    try {',
      '      const pool = isWrite ? this.primary : this._getReplica();',
      '      return await pool.query(text, params);',
      '    } catch (err) {',
      '      if (this._isConnectionError(err) && isWrite) {',
      '        return this._handleFailover(text, params);',
      '      }',
      '      throw err;',
      '    }',
      '  }',
      '',
      '  async _handleFailover(text, params) {',
      '    // Promote first replica',
      '    // Update primary pointer',
      '    // Retry query',
      '  }',
      '}'
    ]), 'Connection pool with automatic failover detection and primary promotion handling.')
  ],
  [
    m('What is the primary purpose of read replicas?', ['Write scalability', 'Read scalability and availability', 'Data backup', 'Schema changes'], 1, 'Read replicas offload read queries to improve read performance and availability.'),
    m('What is replication lag?', ['Time to set up replication', 'Delay between primary write and replica read', 'Network latency', 'Database backup time'], 1, 'Replication lag is the delay before a write appears on replicas.'),
    m('What is synchronous replication?', ['Write confirmed after all replicas acknowledge', 'Write confirmed immediately', 'Batch writes', 'Periodic sync'], 0, 'Synchronous replication waits for all replicas before confirming the write.'),
    m('What happens during a failover?', ['Primary restarts', 'Replica is promoted to primary', 'All data is lost', 'Replicas are removed'], 1, 'Failover promotes a replica to become the new primary when the old one fails.'),
    m('What is split-brain?', ['Two nodes both acting as primary', 'Data corruption', 'Network partition', 'Replication lag'], 0, 'Split-brain occurs when two nodes both accept writes thinking they are the primary.'),
    m('What consistency issue arises from replication lag?', ['Write conflicts', 'Stale reads', 'Deadlocks', 'Data loss'], 1, 'Replication lag causes stale reads — reading from a replica that has not yet received the latest write.')
  ]
);

/* =================== TOPIC 9: Content Delivery Network =================== */
addTopic('sd-cdn', 'Content Delivery Network', 'intermediate', 15,
  ['A CDN is a distributed network of servers (edge nodes) that deliver web content to users based on their geographic location.',
   'Static content: images, CSS, JavaScript, videos, fonts. Cached at edge nodes for fast delivery. Dynamic content can also be accelerated.',
   'Benefits: reduced latency (content from nearby edge), lower origin server load, DDoS protection, improved availability, bandwidth cost savings.',
   'Key concepts: origin server, edge node, point of presence (PoP), cache hit ratio, purge/invalidation, TTL, and geographic routing (GeoDNS).'
  ],
  'A CDN is like having local warehouses for a global store chain. Instead of shipping every product from one central warehouse (origin server), products are stored in local warehouses (edge nodes) close to customers. When you order, it ships from the nearest warehouse. Some products are restocked daily (TTL), and if a warehouse runs out, it gets from the central warehouse (cache miss).',
  [
    d('How CDN Works', '1. User requests content. 2. DNS routes to nearest CDN edge node. 3. Edge checks if content is cached (hit → serve). 4. If miss, edge fetches from origin server, caches it, serves to user. 5. Subsequent requests for same content from nearby users are served from edge cache. TTL controls how long content stays cached.'),
    d('CDN for Static Content', 'Images, JS, CSS, fonts, videos — best for CDN caching. Set long TTLs (1 year) with versioned filenames. Cache invalidation: deploy new version → new filename → old cached version still valid for previous users. CDN serves from edge → fast load times. Recommended: use CDN for all static assets.'),
    d('Dynamic Content Acceleration', 'CDN can also accelerate dynamic content (API responses, HTML). Edge nodes establish optimized connections to origin (TCP optimizations, keep-alive, TLS resumption). May cache dynamic responses with short TTL (seconds) or use cache-aside with CDN\'s own cache layer. Some CDNs support edge computing (Cloudflare Workers, Lambda@Edge) for custom logic.'),
    d('CDN Security Benefits', 'DDoS mitigation: CDN absorbs large attacks across its network before they reach origin. Web Application Firewall (WAF): inspect requests at edge, block malicious traffic. Bot management: identify and block bad bots. SSL/TLS termination at edge. Origin IP hiding: attackers only see CDN, not your server IP.'),
    d('Cache Invalidation and Purge', 'Invalidating cached content when it changes. Methods: purge by URL pattern (CDN API), versioned filenames (automatic invalidation), TTL expiry (wait for revalidation), origin pull with headers (Cache-Control: no-cache). Purge all: expensive, should be rare. Best practice: use versioned filenames for static assets.')
  ],
  'CDN is essential for any global application. Use CDN for all static assets with versioned filenames and long TTLs. Consider CDN for dynamic content acceleration. Leverage CDN security features: DDoS protection, WAF, bot management. Choose CDN provider based on your geographic coverage needs (CloudFront, Cloudflare, Fastly, Akamai).',
  [
    q('What is a CDN?', 'Content Delivery Network — a distributed network of servers that delivers content from locations close to users.'),
    q('How does a CDN reduce latency?', 'Serves content from edge nodes geographically close to users, reducing network round-trip time.'),
    q('What is an origin server?', 'The source server where the original content lives. CDN fetches from origin on cache miss.'),
    q('What is a cache hit ratio?', 'Percentage of requests served from CDN cache without contacting the origin. Higher is better.'),
    q('What is a CDN purge?', 'Forced removal of cached content from CDN edge nodes before TTL expires.'),
    q('What types of content are best for CDN?', 'Static assets: images, CSS, JavaScript, videos, fonts. These rarely change and benefit from long TTLs.'),
    q('How does CDN help with DDoS?', 'CDN absorbs traffic across its distributed network, filtering malicious requests before they reach origin.'),
    q('What is GeoDNS?', 'DNS routing that directs users to the nearest CDN edge node based on their geographic location.'),
    q('What is the difference between push and pull CDN?', 'Push: upload content to CDN proactively. Pull: CDN fetches from origin on first request (more common).'),
    q('How do you invalidate CDN cache?', 'URL purge (API call), versioned filenames (automatic), TTL expiry, origin Cache-Control headers.')
  ],
  R(10,35,110,25,'#0070f3','','User','Browser request') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','CDN Edge','Nearest PoP') +
  A(160,60,160,80) + A(270,48,300,48) +
  R(10,70,110,25,'#ffc107','','Cache Hit','Serve from edge') +
  R(10,105,110,25,'#dc3545','','Cache Miss','Fetch from origin') +
  R(160,100,110,25,'#e83e8c','','Origin Server','Source of truth') +
  R(10,140,110,25,'#6610f2','','TTL + Purge','Cache management') +
  R(290,35,190,135,'#17a2b8','','CDN','Content Delivery Network: edge caching, low latency, DDoS protection. Static + dynamic acceleration.') +
  T(240,210,'CDN: Distributed edge caching for fast content delivery. Static assets, DDoS protection, global reach.',9,'#666','middle'),
  [
    e('Cache-Control Headers for CDN', 'Optimize caching behavior.', codeBlock([
      '// Static assets — long TTL with versioning',
      "res.setHeader('Cache-Control',",
      "  'public, max-age=31536000, immutable'",
      ');',
      '',
      '// Dynamic content — short TTL',
      "res.setHeader('Cache-Control',",
      "  'public, max-age=300, stale-while-revalidate=60'",
      ');',
      '',
      '// Private data — no CDN caching',
      "res.setHeader('Cache-Control',",
      "  'private, no-cache, no-store, must-revalidate'",
      ');',
      '',
      '// Versioned filenames enable long TTL',
      '// bundle.a1b2c3.js — new version → new filename'
    ]), 'Cache-Control headers control how CDN caches different content types with appropriate TTLs.'),
    e('AWS CloudFront with S3 Origin', 'CDN for static assets.', codeBlock([
      '// CloudFront distribution',
      '// Origin: S3 bucket (myapp-static-assets)',
      '// Behaviors:',
      '//   /static/* → S3 origin, TTL 1 year',
      '//   /api/* → API origin, TTL 0 (no cache)',
      '',
      '// S3 bucket policy (public read)',
      '{',
      '  "Version": "2012-10-17",',
      '  "Statement": [{',
      '    "Sid": "PublicReadGetObject",',
      '    "Effect": "Allow",',
      '    "Principal": "*",',
      '    "Action": "s3:GetObject",',
      '    "Resource": "arn:aws:s3:::myapp/*"',
      '  }]',
      '}',
      '',
      '// Upload with versioned name',
      '// s3 cp build/bundle.js s3://myapp/static/bundle.a1b2c3.js'
    ]), 'AWS CloudFront CDN configuration with S3 origin for static asset delivery.'),
    e('Dynamic Content Acceleration (Cloudflare)', 'Cache dynamic API responses.', codeBlock([
      '// Cloudflare Workers for dynamic caching',
      '',
      "addEventListener('fetch', event => {",
      '  event.respondWith(handleRequest(event.request));',
      '});',
      '',
      'async function handleRequest(request) {',
      '  const url = new URL(request.url);',
      '',
      '  // Cache API responses for 30 seconds',
      '  if (url.pathname.startsWith(\'/api/posts\')) {',
      '    const cacheKey = new Request(url, request);',
      '    const cache = caches.default;',
      '    let response = await cache.match(cacheKey);',
      '',
      '    if (!response) {',
      '      response = await fetch(request);',
      '      const headers = {',
      "        'Cache-Control': 'public, max-age=30'",
      '      };',
      '      response = new Response(response.body, { ...response, headers });',
      '      event.waitUntil(cache.put(cacheKey, response.clone()));',
      '    }',
      '',
      '    return response;',
      '  }',
      '',
      '  return fetch(request);',
      '}'
    ]), 'Cloudflare Workers enable custom caching logic at the CDN edge for dynamic content.'),
    e('Purge CDN Cache (API)', 'Programmatic invalidation.', codeBlock([
      '// AWS CloudFront invalidation',
      'const { CloudFrontClient, CreateInvalidationCommand }',
      "  = require('@aws-sdk/client-cloudfront');",
      '',
      'async function purgeCache(paths) {',
      '  const client = new CloudFrontClient({',
      "    region: 'us-east-1'",
      '  });',
      '',
      '  await client.send(new CreateInvalidationCommand({',
      "    DistributionId: 'E12345EXAMPLE',",
      '    InvalidationBatch: {',
      '      Paths: {',
      "        Quantity: paths.length,",
      '        Items: paths',
      '      },',
      "      CallerReference: String(Date.now())",
      '    }',
      '  }));',
      '}',
      '',
      "// purgeCache(['/static/*', '/index.html']);"
    ]), 'Programmatic CDN cache purge via AWS CloudFront API for immediate content invalidation.'),
    e('GeoDNS Routing with Route53', 'Route users to nearest CDN.', codeBlock([
      '// AWS Route53 latency-based routing',
      '// us-east-1 → CloudFront US edge',
      '// eu-west-1 → CloudFront EU edge',
      '// ap-southeast-1 → CloudFront Asia edge',
      '',
      '// DNS config (simplified):',
      '// myapp.com IN A latency us-east-1 → 1.2.3.4',
      '// myapp.com IN A latency eu-west-1 → 5.6.7.8',
      '// myapp.com IN A latency ap-southeast-1 → 9.10.11.12',
      '',
      '// Multiple ISPs → multiple edge IPs',
      '// DNS returns IP with lowest latency',
      '// Automatically routes to nearest edge',
      '',
      '// Cloudflare, Fastly, Akamai handle',
      '// GeoDNS automatically — no config needed'
    ]), 'GeoDNS routing directs users to the nearest CDN edge location based on latency measurements.')
  ],
  [
    m('What does CDN stand for?', ['Content Distribution Network', 'Content Delivery Network', 'Cache Distribution Network', 'Cloud Data Network'], 1, 'CDN = Content Delivery Network — distributed edge servers for fast content delivery.'),
    m('What happens on a CDN cache hit?', ['Content fetched from origin', 'Content served from edge node', 'DNS lookup', 'SSL handshake'], 1, 'On a cache hit, content is served directly from the nearest CDN edge node.'),
    m('What is a CDN purge?', ['Adding content to CDN', 'Removing content from CDN cache', 'CDN server restart', 'CDN billing update'], 1, 'Purge removes cached content from CDN edges before TTL expires.'),
    m('What is the best TTL for versioned static assets?', ['0 seconds', '300 seconds', '1 year', '1 day'], 2, 'Versioned static assets can have very long TTL (1 year) since new versions have new filenames.'),
    m('How does CDN help with DDoS?', ['By blocking all traffic', 'By absorbing traffic across distributed network', 'By rate limiting only', 'By filtering IPs'], 1, 'CDN absorbs DDoS traffic across its global network, preventing it from reaching the origin.'),
    m('What is an origin server?', ['The CDN provider', 'The source server for content', 'The user\'s browser', 'The DNS server'], 1, 'The origin server is where the CDN fetches content on cache misses.')
  ]
);

/* =================== TOPIC 10: Message Queues =================== */
addTopic('sd-message-queues', 'Message Queues', 'intermediate', 20,
  ['Message queues enable asynchronous communication between services by allowing producers to send messages that are stored until consumers process them.',
   'Producers send messages to a queue. Consumers poll or subscribe to receive messages. The queue acts as a buffer, decoupling producers from consumers.',
   'Common use: decoupling microservices, load leveling (smoothing traffic spikes), task distribution, event-driven architectures, and cross-service workflows.',
   'Key concepts: at-least-once (duplicate, no loss), at-most-once (no duplicate, possible loss), exactly-once (hard to achieve), message ordering, dead-letter queues (failed messages), and message TTL.'
  ],
  'A message queue is like a busy restaurant with a waiter and a kitchen. The waiter (producer) takes orders and puts them on a spindle (queue). The chef (consumer) takes orders off the spindle as they can cook them. If the waiter gets many orders at once, they pile up on the spindle (queue grows) but nothing is lost. If the chef is sick, orders wait until another chef arrives.',
  [
    d('Point-to-Point vs Pub/Sub', 'Point-to-point: one message, one consumer. Multiple consumers compete (worker pool). Used for task distribution. Pub/Sub (publish/subscribe): one message, multiple subscribers each get a copy. Used for event broadcasting (user signed up → send email, update CRM, notify admin). Kafka uses consumer groups for both patterns.'),
    d('Delivery Guarantees', 'At-most-once: message delivered zero or one times (fire and forget). At-least-once: message delivered at least once (may repeat — consumer must handle duplicates via idempotency). Exactly-once: message delivered exactly once — requires coordination between queue and consumer (e.g., Kafka exactly-once semantics, transactional outbox).'),
    d('Message Ordering', 'Total ordering: all messages processed in strict order (single partition/queue — limits throughput). Partial ordering: messages within a partition/key are ordered (Kafka: messages with same key go to same partition). Best effort: ordering not guaranteed (higher throughput). Most systems need per-key ordering (e.g., all events for user_id 42).'),
    d('Dead-Letter Queue (DLQ)', 'A queue for messages that could not be processed successfully. After N retries or TTL expiry, message moves to DLQ. Prevents poison pill messages from blocking the main queue. Operators monitor DLQ to investigate and reprocess failed messages. Essential for production message queue systems.'),
    d('Message Queue vs Event Stream', 'Queue: message consumed once, removed after acknowledgment. Stream (Kafka): messages persist (retention period), consumers track their position, multiple consumer groups can read independently. Streams are better for event sourcing, audit logs, and multiple consumers. Queues are better for task distribution and work queues.')
  ],
  'Message queues are fundamental to building resilient, decoupled distributed systems. Use point-to-point for task distribution, pub/sub for event broadcasting. Always handle duplicates (idempotent consumers). Implement DLQs for failed messages. Choose the right tool: RabbitMQ for traditional queues, Kafka for event streaming and high throughput.',
  [
    q('What is a message queue?', 'A buffer that stores messages between producers and consumers, enabling asynchronous communication.'),
    q('What is the difference between point-to-point and pub/sub?', 'Point-to-point: one message, one consumer. Pub/sub: one message, all subscribers receive a copy.'),
    q('What is at-least-once delivery?', 'Message is delivered one or more times. Consumer must handle duplicates via idempotency.'),
    q('What is exactly-once delivery?', 'Message is delivered exactly once — requires coordination between queue and consumer. Hard to achieve.'),
    q('What is a dead-letter queue?', 'A queue for messages that failed processing after retries — prevents blocking the main queue.'),
    q('What is message ordering?', 'The guarantee that messages are processed in the order they were sent. Usually per-partition/key.'),
    q('What is the difference between RabbitMQ and Kafka?', 'RabbitMQ: traditional queue, flexible routing. Kafka: distributed event streaming, high throughput, persistent log.'),
    q('What is a consumer group?', 'A group of consumers that together consume a topic. Each partition assigned to one consumer in the group.'),
    q('What is idempotency in message processing?', 'Processing the same message multiple times produces the same result — essential for at-least-once delivery.'),
    q('What is backpressure?', 'When producers send messages faster than consumers can process — requires throttling or scaling consumers.')
  ],
  R(10,35,110,25,'#0070f3','','Producer','Sends messages') +
  A(120,48,150,48) +
  R(160,35,100,25,'#28a745','','Message Queue','Buffer / Broker') +
  A(160,60,160,80) + A(160,100,160,120) +
  R(10,70,110,25,'#ffc107','','Consumer 1','Processes') +
  R(10,105,110,25,'#dc3545','','Consumer 2','Processes') +
  R(10,140,110,25,'#e83e8c','','DLQ','Failed messages') +
  R(280,35,200,155,'#17a2b8','','Message Queues','Async decoupling: producers → queue → consumers. At-least-once, DLQ, ordering, idempotency.') +
  T(240,220,'Message Queues: Asynchronous communication between services. Decoupling, buffering, resiliency.',9,'#666','middle'),
  [
    e('RabbitMQ Producer/Consumer (Node.js)', 'Basic queue usage.', codeBlock([
      'const amqp = require(\'amqplib\');',
      '',
      '// Producer',
      'async function sendTask(task) {',
      "  const conn = await amqp.connect('amqp://localhost');",
      '  const ch = await conn.createChannel();',
      '  await ch.assertQueue(\'tasks\', { durable: true });',
      '',
      "  ch.sendToQueue('tasks', Buffer.from(JSON.stringify(task)),",
      '    { persistent: true }',
      '  );',
      '  await ch.close();',
      '}',
      '',
      '// Consumer',
      'async function startWorker() {',
      "  const conn = await amqp.connect('amqp://localhost');",
      '  const ch = await conn.createChannel();',
      '  await ch.assertQueue(\'tasks\', { durable: true });',
      '',
      "  ch.consume('tasks', async (msg) => {",
      '    const task = JSON.parse(msg.content.toString());',
      '    try {',
      '      await processTask(task);',
      "      ch.ack(msg); // acknowledge",
      '    } catch (err) {',
      "      ch.nack(msg); // retry or DLQ",
      '    }',
      '  });',
      '}'
    ]), 'RabbitMQ producer/consumer with durable queues, persistent messages, and manual acknowledgment.'),
    e('Kafka Producer (Node.js)', 'High-throughput event streaming.', codeBlock([
      'const { Kafka } = require(\'kafkajs\');',
      '',
      'const kafka = new Kafka({',
      "  clientId: 'order-service',",
      "  brokers: ['kafka1:9092', 'kafka2:9092']",
      '});',
      '',
      'const producer = kafka.producer();',
      '',
      'async function orderCreated(order) {',
      '  await producer.connect();',
      '  await producer.send({',
      "    topic: 'order-events',",
      '    messages: [{',
      '      key: order.userId, // ensures ordering per user',
      '      value: JSON.stringify(order),',
      '      partition: 0 // or use key-based partitioning',
      '    }]',
      '  });',
      '  await producer.disconnect();',
      '}',
      '',
      '// Consumer subscribes and processes',
      '// Multiple consumer groups for different services'
    ]), 'Kafka producer for high-throughput event streaming with key-based partitioning for ordering.'),
    e('Idempotent Consumer (Deduplication)', 'Handle duplicate messages.', codeBlock([
      'async function processOrder(message) {',
      '  const { orderId, data } = message;',
      '',
      '  // Check if already processed (idempotency key)',
      '  const processed = await redis.get(`processed:${orderId}`);',
      '  if (processed) {',
      "    console.log('Duplicate message, skipping');",
      '    return;',
      '  }',
      '',
      '  // Process the message',
      '  const result = await db.query(',
      '    "INSERT INTO orders (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING RETURNING *",',
      '    [orderId, data]',
      '  );',
      '',
      '  if (result.rows[0]) {',
      '    // Mark as processed (with TTL for cleanup)',
      '    await redis.setEx(`processed:${orderId}`, 86400, \'1\');',
      '  }',
      '}',
      '',
      '// Idempotency ensures processing a message',
      '// multiple times produces the same result'
    ]), 'Idempotent consumer with deduplication — safe for at-least-once delivery semantics.'),
    e('Dead-Letter Queue Pattern', 'Handle failed messages.', codeBlock([
      'const amqp = require(\'amqplib\');',
      '',
      'async function setupQueues() {',
      '  const ch = await connection.createChannel();',
      '',
      '  // Main queue with DLQ',
      '  await ch.assertQueue(\'orders\', {',
      '    durable: true,',
      '    deadLetterExchange: \'\',',
      "    deadLetterRoutingKey: 'orders-dlq'",
      '  });',
      '',
      '  // Dead-letter queue',
      '  await ch.assertQueue(\'orders-dlq\', { durable: true });',
      '',
      '  // Consumer with retry logic',
      "  ch.consume('orders', async (msg) => {",
      '    try {',
      '      await processOrder(msg);',
      '      ch.ack(msg);',
      '    } catch (err) {',
      '      const retries = (msg.properties.headers[\'x-retries\'] || 0) + 1;',
      '      if (retries <= 3) {',
      '        ch.publish(\'\', \'orders\', msg.content, {',
      '          headers: { \'x-retries\': retries },',
      '          expiration: 60000 * Math.pow(2, retries)', // exponential backoff',
      '        });',
      '      }',
      '      ch.ack(msg); // remove from queue, sent to DLQ automatically',
      '    }',
      '  });',
      '}'
    ]), 'Dead-letter queue captures messages that fail after retries — prevents poison pills from blocking processing.'),
    e('Transactional Outbox Pattern', 'Reliable message publishing.', codeBlock([
      'async function createOrder(order) {',
      '  // Write order AND outbox message in same DB transaction',
      '  await db.query(\'BEGIN\');',
      '  try {',
      '    const { rows } = await db.query(',
      '      "INSERT INTO orders (data) VALUES ($1) RETURNING id",',
      '      [order]',
      '    );',
      '',
      '    await db.query(',
      '      "INSERT INTO outbox (aggregate_type, aggregate_id, payload) VALUES ($1, $2, $3)",',
      "      ['order', rows[0].id, JSON.stringify(order)]",
      '    );',
      '',
      '    await db.query(\'COMMIT\');',
      '  } catch (err) {',
      '    await db.query(\'ROLLBACK\');',
      '    throw err;',
      '  }',
      '',
      '  // Background poller publishes outbox messages',
      '  // After successful publish, delete from outbox',
      '}'
    ]), 'Transactional outbox ensures exactly-once message publishing by writing to DB and outbox in the same transaction.')
  ],
  [
    m('What is a message queue?', ['A database', 'A buffer between producers and consumers', 'A load balancer', 'A cache layer'], 1, 'A message queue buffers messages between producers (senders) and consumers (processors).'),
    m('What is at-least-once delivery?', ['Message delivered once', 'Message may be delivered multiple times', 'Message delivered zero times', 'Exactly once'], 1, 'At-least-once may deliver duplicates — consumers must be idempotent.'),
    m('What is a dead-letter queue?', ['Queue for urgent messages', 'Queue for failed messages', 'Queue with no consumers', 'Empty queue'], 1, 'DLQ stores messages that could not be processed after retries.'),
    m('What is the difference between RabbitMQ and Kafka?', ['RabbitMQ is slower', 'RabbitMQ: traditional queue. Kafka: event stream', 'Kafka is a database', 'No difference'], 1, 'RabbitMQ is a traditional message broker. Kafka is a distributed event streaming platform.'),
    m('What ensures idempotent processing?', ['Retry logic', 'Deduplication / processing same message produces same result', 'Faster consumers', 'Message ordering'], 1, 'Idempotency ensures processing the same message multiple times has the same effect as once.'),
    m('What is the transactional outbox pattern?', ['Sending messages via email', 'Writing to DB and message queue in same transaction', 'Outbox for emails only', 'SMS notifications'], 1, 'Transactional outbox ensures reliable message delivery by writing both data and message in one DB transaction.')
  ]
);
