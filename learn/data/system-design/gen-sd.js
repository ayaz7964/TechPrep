const fs = require('fs');

function codeBlock(l) { return l.join('\n'); }
function q(a,b) { return {question:a.replace(/'/g,"\\'"),answer:b.replace(/'/g,"\\'")}; }
function m(a,b,c,d) { return {question:a.replace(/'/g,"\\'"),options:b,answer:c,explanation:d.replace(/'/g,"\\'")}; }
function e(a,b,c,d) { return {title:a.replace(/'/g,"\\'"),useCase:b.replace(/'/g,"\\'"),code:c,description:d.replace(/'/g,"\\'")}; }
function d(a,b) { return {heading:a.replace(/'/g,"\\'"),text:b.replace(/'/g,"\\'")}; }
function svgW(w,h,t,i) {
  return '<svg viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:sans-serif">' +
    '<rect x="0" y="0" width="'+w+'" height="'+h+'" rx="8" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>' +
    '<text x="'+(w/2)+'" y="24" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">'+t+'</text>' + i + '</svg>';
}
function R(x,y,w,h,f,s,t1,t2,c1,c2) {
  var b='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+f+'" stroke="'+(s||f)+'" stroke-width="1"/>';
  if(t1) b+='<text x="'+(x+w/2)+'" y="'+(y+(t2?16:20))+'" text-anchor="middle" font-size="11" font-weight="bold" fill="'+(c1||'#fff')+'">'+t1+'</text>';
  if(t2) b+='<text x="'+(x+w/2)+'" y="'+(y+28)+'" text-anchor="middle" font-size="9" fill="'+(c2||'#ddd')+'">'+t2+'</text>';
  return b;
}
function A(x1,y1,x2,y2,c){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||'#666')+'" stroke-width="1.5" marker-end="url(#arrow)"/>';}
function T(x,y,t,s,c,a){return '<text x="'+x+'" y="'+y+'" font-size="'+(s||10)+'" fill="'+(c||'#333')+'" text-anchor="'+(a||'start')+'">'+t+'</text>';}

var topics={},topicList=[];
function addTopic(id,t,diff,m,tldr,layman,deep,intAns,questions,svgInner,codeEx,mcq){
  var o={id:id,title:t,difficulty:diff,estimatedMinutes:m,tldr:tldr,laymanDefinition:layman,deepDive:deep,interviewAnswer:intAns,interviewQuestions:questions,diagramSvg:svgW(500,200,t,svgInner),codeExamples:codeEx,mcqQuestions:mcq};
  topics[id]=o;
  topicList.push({id:id,title:t,difficulty:diff,estimatedMinutes:m,file:id+'.json'});
}

/* ==== TOPIC 1: System Design Interview ==== */
addTopic('sd-interview','System Design Interview','advanced',30,
['System design interviews evaluate your ability to architect large-scale distributed systems handling millions of users.',
'The 4-step framework: 1) Understand requirements (functional + non-functional), 2) High-level design (components + data flow), 3) Deep dive (scale, bottlenecks, trade-offs), 4) Wrap-up (summary + improvements).',
'Key metrics to discuss: DAU (daily active users), QPS (queries per second), storage estimates, bandwidth, cache hit ratio, latency SLAs.',
'Common design problems: URL shortener, chat system, Twitter feed, pastebin, rate limiter, key-value store, file sharing, web crawler, proximity service, news feed.'
],
'A system design interview is like being an architect asked to design a skyscraper. You start with requirements (how many floors, occupants, budget), sketch basic structure (foundation, core, floors), then detail key systems (elevators, HVAC, plumbing), and finally optimize for constraints (wind resistance, energy efficiency).',
[
d('Framework','1) Requirements: functional (features) + non-functional (scale, latency, availability). 2) High-level: draw boxes (LB, app servers, DB, cache, CDN, queues) with data flow arrows. 3) Deep dive: pick 1-2 components, estimate scale (QPS, storage, bandwidth), discuss trade-offs (SQL vs NoSQL, consistency vs availability). 4) Wrap: summarize design, list improvements.'),
d('Estimations','DAU → QPS: if 100M DAU, 50% use daily, 10 actions each = 500M actions/day = ~5800 QPS avg, peak 2-3x = ~15K QPS. Storage: if each action stores 1KB, daily = 500GB, yearly = 180TB. Bandwidth: 15K QPS × 1KB = 15MB/s = 120Mbps. Cache: 80% read cache hit = 80% fewer DB reads.'),
d('Key Trade-Offs','SQL vs NoSQL: SQL for ACID, relationships; NoSQL for scale, flexible schema. Consistency vs Availability: CP systems (HBase, MongoDB) vs AP systems (Cassandra, DynamoDB). Synchronous vs Async: sync for immediate consistency; async for decoupling, resilience. Sharding vs Replication: shard for write scale, replicate for read scale + HA.'),
d('Common Mistakes','Jumping to details too early. Not clarifying requirements. Ignoring read/write ratio. Not estimating scale. Single point of failure. Forgetting caching, CDN, async processing. Not discussing trade-offs. Not mentioning monitoring, alerting, rollback strategies.')
],
'System design interviews test structured thinking. Always start by clarifying requirements, estimate scale, then propose a high-level design. Deep dive on 1-2 components discussing trade-offs explicitly. Know your numbers (QPS, storage, bandwidth). Practice the framework until it becomes second nature.',
[
q('What is the 4-step framework for system design?','Requirements, High-level design, Deep dive (scale + trade-offs), Wrap-up.'),
q('How to estimate QPS from DAU?','DAU × actions per user per day / 86400 seconds. Peak = 2-3x average.'),
q('What should you clarify first?','Functional requirements (features) and non-functional requirements (scale, latency, availability).'),
q('SQL vs NoSQL trade-off?','SQL: ACID, joins, migrations. NoSQL: horizontal scale, flexible schema, eventual consistency.'),
q('What is CAP theorem?','Consistency, Availability, Partition tolerance — pick 2. In distributed systems, P is required, so choose CP or AP.'),
q('Why discuss read/write ratio?','Read-heavy: cache, CDN, read replicas. Write-heavy: queues, batch processing, NoSQL.'),
q('What are single points of failure?','Single LB, single DB, single app server. Eliminate with redundancy, HA pairs, replicas.'),
q('How to estimate storage?','QPS write × data per write × retention period. Include replication factor.'),
q('What is the deep dive phase?','Pick critical components, calculate scale specifics, discuss trade-offs and alternatives.'),
q('How to wrap up a design?','Summarize architecture, list improvements (monitoring, CI/CD, disaster recovery, future scaling).')
],
R(10,35,160,25,'#0070f3','','Client','Users')+
A(170,48,200,48)+
R(210,35,100,25,'#28a745','','Load Balancer','Nginx/ELB')+
A(310,48,340,48)+A(210,60,210,80)+
R(10,70,100,25,'#ffc107','','App Servers','Stateless')+
A(110,83,140,83)+
R(150,70,100,25,'#dc3545','','Cache','Redis/Memc')+
A(250,83,280,83)+A(150,90,150,110)+
R(10,105,100,25,'#e83e8c','','DB','Primary')+
A(110,118,140,118)+
R(150,105,100,25,'#6610f2','','Replica','Read-only')+
R(10,140,100,25,'#17a2b8','','CDN','Static assets')+
R(290,35,190,155,'#17a2b8','','System Design','Requirements → High-level → Deep dive → Wrap-up. Estimate QPS, storage, bandwidth. Discuss trade-offs.'),
T(240,220,'System Design Interview: Structured 4-step framework. Estimate scale, discuss trade-offs.',9,'#666','middle'),
[
e('QPS and Storage Estimation','Calculate scale.',codeBlock([
'// 100M DAU, 50% daily active, 10 actions each',
'const DAU = 100_000_000;',
'const actionsPerUser = 10;',
'const dailyActions = DAU * 0.5 * actionsPerUser; // 500M',
'const avgQPS = dailyActions / 86400; // ~5800',
'const peakQPS = avgQPS * 3; // ~17400',
'const storagePerAction = 1024; // 1KB',
'const dailyStorage = dailyActions * storagePerAction; // 500GB',
'const yearlyStorage = dailyStorage * 365; // ~180TB',
'const bandwidthMbps = peakQPS * storagePerAction * 8 / 1e6; // ~140Mbps'
]),'Scale estimation formulas for system design interviews.'),
e('High-Level Architecture Diagram','Typical web architecture.',codeBlock([
'Client → CDN (static)',
'Client → DNS → Load Balancer (ELB/nginx)',
'  LB → App Servers (auto-scaling group)',
'    App → Cache (Redis cluster)',
'    App → DB (Primary + Read Replicas)',
'    App → Queue (SQS/RabbitMQ)',
'      Worker → DB (async processing)',
'    App → Search (Elasticsearch)',
'  Monitoring: CloudWatch, Prometheus, Grafana',
'  Alerts P99 > 500ms, Error Rate > 1%'
]),'Typical high-level architecture for a scalable web service.'),
e('SQL vs NoSQL Decision','Database selection.',codeBlock([
'// Use SQL (PostgreSQL):',
'// - Complex queries, joins, aggregations',
'// - ACID transactions (financial systems)',
'// - Structured data with relationships',
'// - Strong consistency required',
'// Use NoSQL (Cassandra/DynamoDB):',
'// - Horizontal scale, high write throughput',
'// - Flexible schema, evolving data models',
'// - Key-value or document access patterns',
'// - Eventual consistency acceptable',
'// - Global distribution (multi-region)'
]),'Decision guide for SQL vs NoSQL based on requirements.'),
e('System Design Checklist','Key concerns to address.',codeBlock([
'[ ] Requirements: features + scale estimations',
'[ ] Single points of failure? Redundancy?',
'[ ] Read-heavy → cache, CDN, read replicas',
'[ ] Write-heavy → queue, batch, NoSQL',
'[ ] Data partitioning: hash-based sharding?',
'[ ] Consistency model: strong vs eventual?',
'[ ] How to handle traffic spikes? Auto-scaling?',
'[ ] Monitoring: latency, errors, saturation',
'[ ] Disaster recovery: backup, multi-region?',
'[ ] Security: auth, rate limiting, encryption?'
]),'Checklist of concerns to address in system design.')
],
[
m('First step in system design interview?',['Start coding','Clarify requirements','Draw diagram','Estimate cost'],1,'Always start by clarifying requirements.'),
m('How to estimate QPS?',['DAU*actions/86400','DAU*3600','DAU/86400','DAU*actions'],0,'DAU × actions per user ÷ 86400 seconds.'),
m('CAP theorem: Distributed systems require?',['Consistency','Availability','Partition tolerance','All three'],2,'Partition tolerance is mandatory in distributed systems.'),
m('SQL vs NoSQL for complex joins?',['NoSQL','SQL','Both equal','Neither'],1,'SQL handles joins natively.'),
m('Read-heavy system should use?',['Cache + read replicas','Write queue','More app servers','Load balancer'],0,'Cache + read replicas for read-heavy.'),
m('What to do in deep dive phase?',['Discuss trade-offs','Draw more boxes','Write code','Estimate cost'],0,'Deep dive = scale details + trade-offs.')
]
);

/* ==== TOPIC 2: Scalability ==== */
addTopic('sd-scalability','Scalability','advanced',25,
['Scalability is a system\'s ability to handle growing load by adding resources — measured in requests per second, users, or data volume.',
'Vertical scaling (scale up): add more power to existing machine (CPU, RAM, SSD). Easier but has hardware limits and no fault tolerance.',
'Horizontal scaling (scale out): add more machines. Requires load balancing, stateless design, distributed data — harder but provides near-limitless scale and fault tolerance.',
'Key scalability patterns: sharding, replication, caching, async processing, CDN, microservices, auto-scaling, connection pooling, database indexing.'
],
'Scalability is like a restaurant kitchen. Vertical scaling = getting a bigger stove (still one chef). Horizontal scaling = adding more chefs with more stoves (but now you need recipes to coordinate, same as distributed systems need coordination). The second approach feeds more customers but is harder to manage.',
[
d('Vertical vs Horizontal','Vertical: upgrade hardware — faster CPU, more RAM, SSD. Simple, no code changes. Limits: single machine max capacity, single point of failure. Cost grows exponentially at high end. Horizontal: add commodity servers. Virtually unlimited, fault-tolerant. Requires: load balancer, stateless app, distributed data, service discovery.'),
d('Stateless Architecture','Session data stored externally (Redis, DB), not in app server. Any request can go to any server — enables easy horizontal scaling and rolling deployments. Stateful: sticky sessions (session affinity) — complicates scaling, server failure loses session. Always prefer stateless for scalability.'),
d('Database Scaling','Read replicas: scale reads by adding replicas, LB reads across them. Writes still go to primary. Sharding: split data across multiple DBs by shard key. Distributes write load. Vertical: bigger DB server (hard limit). NoSQL: designed for horizontal scale (Cassandra, DynamoDB, MongoDB).'),
d('Auto-Scaling','Scale out/in based on metrics: CPU > 70%, request queue depth, latency. Cloud: AWS ASG, K8s HPA. Warm pool: keep min instances ready. Cooldown: wait after scale event. Predictive: ML-based scaling for known traffic patterns. Step scaling: add instances in steps.')
],
'Scalability requires stateless design, horizontal scaling for apps, and a data strategy (sharding + replication + caching). Start monolithic, split only when needed. Measure before scaling — profile bottlenecks first. Auto-scale in cloud, use CDN for static, cache aggressively, async for slow operations.',
[
q('Vertical vs horizontal scaling?','Vertical: bigger machine. Horizontal: more machines. Horizontal is preferred for large scale.'),
q('Why stateless design matters?','Any server handles any request — enables horizontal scale, rolling deployments, fault tolerance.'),
q('How to scale a database?','Read replicas (read scale), sharding (write scale), caching (reduce load), vertical (simpler, limited).'),
q('What is auto-scaling?','Automatically add/remove instances based on metrics (CPU, queue depth, latency).'),
q('What is the CAP theorem relationship?','Scaling distributed systems forces CP or AP trade-off — cannot have both strong consistency and availability during partitions.'),
q('What is connection pooling?','Reuse DB connections instead of creating per request. Reduces overhead, prevents connection exhaustion.'),
q('How does caching help scalability?','Reduces DB load, lowers latency for hot data. Cache-aside, write-through, write-behind.'),
q('What is the bottleneck in most systems?','Database writes, followed by DB reads, then compute. Profiling reveals actual bottleneck.'),
q('What is the fallacies of distributed computing?','Network is reliable, latency is zero, bandwidth is infinite, network is secure, topology doesn\'t change, one admin, transport cost is zero, network is homogeneous.'),
q('How to scale to millions of users?','CDN for static, cache for reads, async queues for writes, shard DB, microservices, auto-scaling, multi-region.')
],
R(10,35,100,25,'#0070f3','','Users','1M DAU')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','CDN','Static cache')+
A(250,48,280,48)+A(150,60,150,80)+
R(10,70,100,25,'#ffc107','','Load Balancer','Distribute')+
A(110,83,140,83)+A(110,83,10,105)+
R(150,70,80,25,'#dc3545','','App','Server 1')+
R(240,70,80,25,'#dc3545','','App','Server N')+
A(250,83,280,83)+A(150,90,150,110)+
R(10,105,100,25,'#e83e8c','','Cache','Redis/Memc')+
A(110,118,140,118)+A(250,118,280,118)+
R(150,105,80,25,'#6610f2','','DB','Primary')+
R(240,105,80,25,'#6610f2','','DB','Replica')+
R(290,35,190,155,'#17a2b8','','Scalability','Horizontal > Vertical. Stateless apps. Cache, CDN, sharding, replicas, auto-scaling.'),
T(240,220,'Scalability: Ability to handle growing load. Horizontal > Vertical. Stateless, cache, shard, auto-scale.',9,'#666','middle'),
[
e('Auto-Scaling Group (AWS ASG)','Scale based on CPU.',codeBlock([
'AWSTemplateFormatVersion: "2010-09-09"',
'Resources:',
'  WebServerGroup:',
'    Type: AWS::AutoScaling::AutoScalingGroup',
'    Properties:',
'      MinSize: "2"',
'      MaxSize: "20"',
'      DesiredCapacity: "4"',
'      LaunchConfigurationName: !Ref WebLC',
'      TargetGroupARNs: [!Ref ALBTargetGroup]',
'  ScaleOutPolicy:',
'    Type: AWS::AutoScaling::ScalingPolicy',
'    Properties:',
'      AutoScalingGroupName: !Ref WebServerGroup',
'      ScalingAdjustment: "2"',
'      Cooldown: "300"',
'  CPUAlarmHigh:',
'    Type: AWS::CloudWatch::Alarm',
'    Properties:',
'      ComparisonOperator: GreaterThanThreshold',
'      Threshold: "70"',
'      EvaluationPeriods: "2"',
'      MetricName: CPUUtilization',
'      Namespace: AWS/EC2'
]),'Auto-scaling group with CPU-based scale-out policy.'),
e('Connection Pool (Node.js)','Reuse connections.',codeBlock([
'const { Pool } = require("pg");',
'const pool = new Pool({',
'  max: 20, // max connections in pool',
'  idleTimeoutMillis: 30000,',
'  connectionTimeoutMillis: 2000,',
'});',
'// Use same pool for all queries',
'async function queryUser(id) {',
'  const res = await pool.query("SELECT * FROM users WHERE id=$1", [id]);',
'  return res.rows[0];',
'}',
'// No need to connect/disconnect per request',
'// Pool handles reuse, overflow queuing'
]),'Connection pooling for database scalability.'),
e('Horizontal Scaling with Docker Swarm','Scale out containers.',codeBlock([
'# docker-compose.yml',
'version: "3.8"',
'services:',
'  api:',
'    image: myapp/api:latest',
'    deploy:',
'      replicas: 5',
'      resources:',
'        limits:',
'          cpus: "0.5"',
'          memory: "512M"',
'      restart_policy:',
'        condition: on-failure',
'    environment:',
'      - REDIS_URL=redis://redis:6379',
'      - DB_URL=postgres://user:pass@db:5432/app',
'  redis:',
'    image: redis:7-alpine',
'  db:',
'    image: postgres:15',
'    deploy:',
'      replicas: 1'
]),'Horizontal scaling with Docker Swarm replicas.'),
e('Stateless Session Store','Externalize session.',codeBlock([
'const session = require("express-session");',
'const RedisStore = require("connect-redis")(session);',
'app.use(session({',
'  store: new RedisStore({ client: redisClient }),',
'  secret: process.env.SESSION_SECRET,',
'  resave: false,',
'  saveUninitialized: false,',
'  cookie: { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }',
'}));',
'// Now any app server can serve any user',
'// Session is in Redis — not in server memory',
'// Scale horizontally without sticky sessions'
]),'Stateless session store enables horizontal scaling.')
],
[
m('Horizontal scaling adds?',['More CPU','More machines','More RAM','Faster disk'],1,'Horizontal = more machines.'),
m('Stateless means?',['No DB','External session store','No cache','Single server'],1,'Session stored externally, not in server.'),
m('Auto-scaling metric example?',['Code size','CPU utilization','Users logged in','File count'],1,'CPU utilization > 70% typical.'),
m('Connection pooling benefit?',['Faster queries','Reuse connections','More secure','Less code'],1,'Reuses connections, reduces overhead.'),
m('CAP trade-off in scaling?',['CP or AP','CA or CP','AP only','CA only'],0,'Partition tolerance is required, so CP or AP.'),
m('Primary DB scaling bottleneck?',['Reads','Writes','Memory','Network'],1,'Writes are usually the bottleneck (single primary).')
]
);

/* ==== TOPIC 3: Microservices Architecture ==== */
addTopic('sd-microservices','Microservices Architecture','advanced',25,
['Microservices decompose an application into small, independently deployable services, each owning its own data and exposing APIs.',
'Each service: small team ownership, independent deployment, own database (database-per-service), communicates via HTTP/gRPC or messaging.',
'Benefits: independent scaling, technology diversity, faster deployments, fault isolation, team autonomy.',
'Challenges: distributed complexity (network latency, data consistency), service discovery, monitoring, testing, eventual consistency management.'
],
'Microservices are like a food court instead of a single restaurant kitchen. Each stall (service) makes its own dish with its own ingredients (database) and recipes (code). Stalls can open/close independently. If the taco stand burns down, pizza still runs. But coordinating a "full meal" across stalls is harder.',
[
d('Key Principles','Database-per-service: each service owns its data, no sharing. API-based communication: REST, gRPC, or events. Independent deployability: deploy without coordinating. Decentralized governance: teams choose tech stack. Design for failure: circuit breakers, retries, timeouts, bulkheads.'),
d('Inter-Service Communication','Synchronous: REST (HTTP) or gRPC (protobuf, streaming). Simple but creates coupling, cascading failures. Asynchronous: message broker (Kafka, RabbitMQ). Decoupled, resilient. Event-driven: services publish events, others subscribe. Eventually consistent.'),
d('Service Discovery','Static: config files (brittle). DNS: SRV records for service lookup. Service registry: Consul, etcd, Zookeeper. Client-side discovery: service queries registry, picks instance. Server-side: LB queries registry. K8s: built-in DNS + endpoints.'),
d('Data Consistency','Saga pattern: sequence of local transactions with compensating actions. Choreography: each service emits events, others react. Orchestration: coordinator tells services what to do. Two-phase commit (2PC): not recommended for microservices (blocking, not available).')
],
'Microservices suit complex, evolving products with multiple teams. Start monolithic, extract services when needed. Database-per-service is key. Use async communication for resilience. Embrace eventual consistency. Invest in DevOps, monitoring, and CI/CD upfront.',
[
q('What defines a microservice?','Small, independently deployable service with its own database, exposing APIs.'),
q('Why database-per-service?','Independent schema evolution, no coupling, each service scales independently.'),
q('Synchronous vs async communication?','Sync: REST/gRPC, simple, coupled. Async: message broker, decoupled, resilient.'),
q('What is service discovery?','How services find each other by name — DNS, Consul, K8s.'),
q('What is the Saga pattern?','Series of local transactions with compensating actions for failure handling.'),
q('What are challenges?','Distributed complexity, data consistency, network latency, testing, monitoring.'),
q('When NOT to use microservices?','Simple CRUD app, small team, early-stage product, low scale requirements.'),
q('What is an API Gateway in microservices?','Single entry point routing to services, handles auth, rate limiting, aggregation.'),
q('What is circuit breaker?','Pattern to detect failures and prevent cascading failures — stops calling failing service.'),
q('How to handle distributed tracing?','Correlation ID passed across services, collected with OpenTelemetry → Jaeger/Zipkin.')
],
R(10,35,100,25,'#0070f3','','Client','App/Mobile')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','API Gateway','Entry point')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,80,25,'#ffc107','','Service','Users')+
R(100,70,80,25,'#dc3545','','Service','Orders')+
R(190,70,80,25,'#e83e8c','','Service','Payments')+
R(280,70,80,25,'#6610f2','','Service','Inventory')+
R(10,105,100,25,'#17a2b8','','DB per Service','Decoupled')+
A(40,130,40,160)+R(10,140,60,25,'#6f42c1','','Queue','Kafka')+
R(290,35,190,155,'#17a2b8','','Microservices','Small, independent services. DB-per-service. Async communication. Saga for transactions.'),
T(240,220,'Microservices: Independently deployable services with their own databases. Async communication, Saga pattern.',9,'#666','middle'),
[
e('Express Microservice','Simple REST service.',codeBlock([
'const express = require("express");',
'const app = express();',
'app.use(express.json());',
'// Health check endpoint',
'app.get("/health", (req, res) => res.json({ status: "ok", service: "orders" }));',
'// API endpoint',
'app.get("/api/orders/:id", async (req, res) => {',
'  const order = await db.query("SELECT * FROM orders WHERE id=$1", [req.params.id]);',
'  if (!order) return res.status(404).json({ error: "Not found" });',
'  res.json(order);',
'});',
'app.listen(3000, () => console.log("Orders service on :3000"));'
]),'Simple microservice with health check.'),
e('Service Discovery with Consul','Register and discover.',codeBlock([
'// Register service',
'const consul = require("consul")();',
'consul.agent.service.register({',
'  name: "orders-service",',
'  address: "10.0.1.42",',
'  port: 3000,',
'  check: { http: "http://10.0.1.42:3000/health", interval: "10s" }',
'}, () => {});',
'// Discover service',
'async function callOrderService(orderId) {',
'  const services = await consul.catalog.service.nodes("orders-service");',
'  const svc = services[0]; // pick first healthy instance',
'  const url = `http://${svc.Address}:${svc.ServicePort}/api/orders/${orderId}`;',
'  return fetch(url).then(r => r.json());',
'}'
]),'Service registration and discovery with Consul.'),
e('Saga Pattern (Choreography)','Event-driven saga.',codeBlock([
'// Order Service emits event',
'const event = { type: "OrderCreated", orderId: 123, userId: 42, amount: 99.99 };',
'kafkaProducer.send({ topic: "orders", messages: [{ value: JSON.stringify(event) }] });',
'// Payment Service subscribes',
'consumer.on("message", async (msg) => {',
'  const event = JSON.parse(msg.value);',
'  if (event.type === "OrderCreated") {',
'    try {',
'      await processPayment(event);',
'      kafkaProducer.send({ topic: "payments", messages: [{ value: JSON.stringify({ type: "PaymentProcessed", orderId: event.orderId }) }] });',
'    } catch (err) {',
'      kafkaProducer.send({ topic: "payments", messages: [{ value: JSON.stringify({ type: "PaymentFailed", orderId: event.orderId }) }] });',
'    }',
'  }',
'});'
]),'Choreography-based Saga with Kafka events and compensating actions.'),
e('Circuit Breaker with Opossum','Fault tolerance.',codeBlock([
'const circuitBreaker = require("opossum");',
'async function callPaymentService(payment) {',
'  const response = await fetch("http://payment-service/api/pay", {',
'    method: "POST", body: JSON.stringify(payment),',
'    headers: { "Content-Type": "application/json" }',
'  });',
'  if (!response.ok) throw new Error("Payment failed");',
'  return response.json();',
'}',
'const breaker = new circuitBreaker(callPaymentService, {',
'  timeout: 5000, errorThresholdPercentage: 50, resetTimeout: 30000',
'});',
'// When >50% fail, circuit opens for 30s',
'breaker.fallback(() => ({ status: "deferred", message: "Payment queued" }));',
'const result = await breaker.fire(payment);'
]),'Circuit breaker prevents cascading failures between microservices.')
],
[
m('Database-per-service principle?',['Shared DB','Each service owns its DB','Single DB for all','No DB needed'],1,'Each microservice has its own database.'),
m('Saga pattern handles?',['Caching','Distributed transactions','Load balancing','Service discovery'],1,'Manages distributed transactions with compensating actions.'),
m('What does circuit breaker prevent?',['Slow queries','Cascading failures','Data loss','Memory leaks'],1,'Prevents cascading failures across services.'),
m('Asynchronous communication uses?',['HTTP','gRPC','Message broker','WebSocket'],2,'Message broker (Kafka, RabbitMQ) for async.'),
m('When to start with microservices?',['Always','After monolithic proves boundaries','Never','Only for startups'],1,'Extract microservices from monolith when boundaries are clear.'),
m('API Gateway role?',['Database access','Single entry point for routing','Caching','Logging'],1,'API Gateway is the single entry point for client requests.')
]
);

/* ==== TOPIC 4: Monolithic Architecture ==== */
addTopic('sd-monolithic','Monolithic Architecture','intermediate',15,
['A monolith is a single deployable application where all features share one codebase, database, and deployment unit.',
'Simpler to develop, test, deploy, and operate than microservices. No network overhead, no distributed complexity.',
'Challenges: scales as a whole (waste resources), becomes entangled over time, slows development as team grows, technology lock-in.',
'Best for: startups, small teams, simple CRUD apps, early-stage products. Many successful companies started monolithic then split.'
],
'A monolith is like a single-family home. Everything under one roof — kitchen, bedrooms, bathroom, living room. Easy to build and live in. But when your family grows (team expands), everyone trips over each other. You can\'t renovate the kitchen without disturbing the bedroom. Eventually you might build separate units (microservices).',
[
d('Monolith Structure','Single codebase: all features in one project. Single database: all tables in one DB. Single deployment: one artifact (WAR, JAR, Docker). Shared memory: in-process function calls (fast). Request lifecycle enters, processes, and responds within same process.'),
d('When Monolith Works','Small team (< 10 devs). Simple domain (CRUD, CMS, blog). Early product stage (validating market). Low traffic requirements. Time to market is critical. Team co-located. No need for polyglot technology. Monolith is underrated for 90% of projects.'),
d('Monolith to Microservices Migration','Strangler Fig pattern: gradually replace monolith features with microservices. Route requests to new or old. Extract bounded contexts. Create seams. Feature flags. Parallel run. Database decomposition last — hardest step.'),
d('Modular Monolith Alternative','Compromise: separate code into modules/packages with clear interfaces, single deployment. Benefits of monorepo + modularity. Easier to extract services later. Strict module boundaries enforced by build tools (public API, internal implementation).')
],
'Monolith is the right starting point for most projects. Don\'t start with microservices — you don\'t know your service boundaries yet. Keep it modular, use good engineering practices. Extract to microservices only when the monolith\'s pain exceeds the microservices complexity cost.',
[
q('What is a monolith?','Single deployable application with all features in one codebase, one database, one deployment unit.'),
q('What are advantages?','Simple development, no network overhead, easy testing, fast deployment, atomic operations.'),
q('Disadvantages?','Scales as whole, code entanglement, slow development as team grows, tech lock-in.'),
q('When to use monolith?','Small teams, early-stage, simple domains, time to market priority, low scale requirements.'),
q('What is the Strangler Fig pattern?','Gradually replace monolith features with microservices feature by feature.'),
q('What is a modular monolith?','Separate modules with clear interfaces but single deployment — best of both worlds.'),
q('When to migrate to microservices?','Team > 10-15 devs, deployment bottlenecks, need independent scaling, clear domain boundaries.'),
q('What is a bounded context?','Domain-driven design concept — clear boundary around a subdomain with its own model and language.'),
q('What is the biggest migration challenge?','Database decomposition — splitting monolith DB into service-specific databases.'),
q('Can a monolith scale?','Yes — vertical scaling, caching, read replicas, CDN. Handles millions of users in many cases.')
],
R(10,35,100,25,'#0070f3','','Client','HTTP request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Monolith App','Single process')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Controller','Route request')+
A(110,83,140,83)+
R(150,70,100,25,'#dc3545','','Service','Business logic')+
A(150,90,150,110)+
R(10,105,100,25,'#e83e8c','','Repository','Data access')+
A(110,118,140,118)+
R(150,105,100,25,'#6610f2','','PostgreSQL','Single DB')+
R(290,35,190,155,'#17a2b8','','Monolith','Single codebase + DB + deploy unit. Simple dev, horizontal scale limited. Extract services when team grows.'),
T(240,220,'Monolithic Architecture: Single deployable unit. Simple dev but scales as one piece. Extract services when needed.',9,'#666','middle'),
[
e('Express Monolith Structure','Single app structure.',codeBlock([
'myapp/',
'├── package.json',
'├── server.js              # Entry point',
'├── config/',
'│   └── index.js           # DB, Redis, env config',
'├── models/',
'│   ├── User.js',
'│   └── Order.js',
'├── routes/',
'│   ├── auth.js',
'│   ├── users.js',
'│   └── orders.js',
'├── controllers/',
'│   ├── authController.js',
'│   ├── userController.js',
'│   └── orderController.js',
'├── services/',
'│   ├── authService.js',
'│   ├── paymentService.js',
'│   └── emailService.js',
'├── middleware/',
'│   ├── auth.js',
'│   └── validation.js',
'└── db/',
'    ├── migrations/',
'    └── seeds/'
]),'Folder structure for a modular monolithic Node.js app.'),
e('Modular Monolith with Express Router','Separate modules, single deploy.',codeBlock([
'// server.js — single entry point',
'const express = require("express");',
'const app = express();',
'// Mount modules as routers',
'app.use("/api/users", require("./modules/users"));',
'app.use("/api/orders", require("./modules/orders"));',
'app.use("/api/products", require("./modules/products"));',
'app.listen(3000);',
'// modules/users/index.js',
'const router = require("express").Router();',
'const userService = require("./userService");',
'router.get("/:id", async (req, res) => {',
'  res.json(await userService.getById(req.params.id));',
'});',
'module.exports = router;'
]),'Modular monolith — separate route modules, single deployment.'),
e('Strangler Fig Pattern Migration','Gradual extraction.',codeBlock([
'// Existing monolith route',
'app.use("/api/orders", legacyOrderRouter);',
'// New microservice endpoint',
'app.use("/api/v2/orders", async (req, res) => {',
'  // Proxy to new microservice',
'  const response = await fetch("http://orders-svc:3000/api/orders" + req.path, {',
'    method: req.method,',
'    body: JSON.stringify(req.body),',
'    headers: { "Content-Type": "application/json" }',
'  });',
'  res.status(response.status).json(await response.json());',
'});',
'// Nginx can also split traffic:',
'// location /api/orders { proxy_pass http://monolith; }',
'// location /api/v2/orders { proxy_pass http://orders-svc; }'
]),'Strangler Fig — route new requests to microservices while old still runs.'),
e('Scaling a Monolith','Vertical + cache + replicas.',codeBlock([
'# docker-compose.yml for scaled monolith',
'version: "3.8"',
'services:',
'  app:',
'    build: .',
'    ports: ["3000"]',
'    deploy:',
'      replicas: 3  # scale horizontally',
'    environment:',
'      - REDIS_URL=redis://redis:6379',
'      - DATABASE_URL=postgres://user:pass@db:5432/app',
'  redis:',
'    image: redis:7-alpine',
'  db:',
'    image: postgres:15',
'    deploy:',
'      replicas: 1  # primary',
'  db-replica:',
'    image: postgres:15',
'    deploy:',
'      replicas: 2  # read replicas',
'    environment:',
'      - REPLICATION=true'
]),'Horizontal scaling of stateless monolith with read replicas.')
],
[
m('Monolith vs microservices?',['Monolith simpler for small teams','Microservices always better','Same complexity','Monolith can\'t scale'],0,'Monolith is simpler for small teams and early stage.'),
m('Strangler Fig pattern?',['Refactor all at once','Gradual feature replacement','Delete old code','Duplicate everything'],1,'Gradually replace monolith features with microservices.'),
m('Modular monolith?',['No modules','Modules, single deployment','Multiple deployments','No database'],1,'Separate modules with clear interfaces, single deploy.'),
m('Scale monolith horizontally?',['Impossible','Yes, stateless + LB','Only vertically','Only in cloud'],1,'Yes, with stateless design and load balancer.'),
m('Biggest microservices migration challenge?',['Code rewrite','Database decomposition','Team training','Deployment config'],1,'Database decomposition is the hardest step.'),
m('Monolith recommended for?',['Large teams','Startups','High scale','Global apps'],1,'Startups and small teams benefit most.')
]
);

/* ==== TOPIC 5: Load Balancing ==== */
addTopic('sd-load-balancing','Load Balancing','intermediate',20,
['A load balancer distributes incoming traffic across multiple backend servers to ensure availability, scalability, and fault tolerance.',
'Algorithms: Round Robin (simple, equal distribution), Least Connections (send to least busy), IP Hash (stickiness), Weighted (unequal capacity), Random.',
'Types: Layer 4 (TCP/UDP — faster, no content awareness), Layer 7 (HTTP/HTTPS — content-aware routing, SSL termination, headers).',
'Health checks: active (periodic ping/HTTP) and passive (monitor response failures). Draining: stop sending to server before removal.'
],
'A load balancer is like a restaurant host who seats customers at available tables. Round Robin: "next table in rotation." Least Connections: "the nearly empty section." IP Hash: "same waiter serves same table every time." Health check: "that table is dirty, skip it." Without the host, one section gets overwhelmed while another is empty.',
[
d('Load Balancing Algorithms','Round Robin: distributes sequentially — simple but ignores server load. Least Connections: sends to server with fewest active connections — good for variable request times. IP Hash: hashes client IP to select server — enables session stickiness. Weighted: servers get proportion of traffic based on capacity. Random: statistically same as RR.'),
d('Layer 4 vs Layer 7','L4 (TCP): operates at transport layer, forwards packets based on IP + port. Faster, less CPU, no content inspection. Cannot do content-based routing (path, headers, cookies). L7 (HTTP/HTTPS): operates at application layer, terminates SSL, inspects content. Can route by URL path, host header, cookies. More features, more resource intensive.'),
d('Health Checks and Failover','Active: LB pings /health endpoint every N seconds (e.g., 5s interval, 2s timeout, 3 failures = unhealthy). Passive: LB monitors response status (e.g., 3 consecutive 5xx = unhealthy). Graceful shutdown: server tells LB to drain before stopping. Failover: traffic automatically routed to healthy servers.'),
d('Sticky Sessions (Session Affinity)','LB routes same client to same server. Uses: cookie (LB sets cookie with server ID), IP hash (client IP → server), header (custom header value). Problem: uneven load distribution, server failure loses sessions. Better: use external session store (Redis) and stateless design.')
],
'Use L4 LB for simple TCP traffic, L7 for HTTP APIs needing content-based routing. Prefer round-robin or least-connections for algorithms. Always configure health checks. Avoid sticky sessions — use stateless design with external session store. Use DNS load balancing as the first level, then LB per region.',
[
q('What does a load balancer do?','Distributes incoming traffic across multiple backend servers for availability and scalability.'),
q('L4 vs L7 load balancer?','L4: TCP level, fast, no content awareness. L7: HTTP level, can route by path/headers/cookies.'),
q('Round Robin vs Least Connections?','RR: sequential, equal distribution. LC: sends to least busy server.'),
q('What is a health check?','Periodic check (ping/HTTP) to verify server is healthy. Unhealthy servers are removed from rotation.'),
q('What is draining?','Stop sending new connections to server being removed, let existing requests finish.'),
q('Why avoid sticky sessions?','Uneven load, loss on server failure. Use external session store (Redis) instead.'),
q('What is IP Hash?','Algorithm that maps client IP to server — ensures same client goes to same server.'),
q('What is DNS load balancing?','Multiple A records for same domain, DNS round-robins. Simple first level of LB.'),
q('What is weighted load balancing?','Servers receive traffic proportional to their capacity (weight).'),
q('What is a reverse proxy?','Sits in front of servers, can do LB, caching, SSL termination, compression (e.g., Nginx, HAProxy).')
],
R(10,35,100,25,'#0070f3','','Client','Request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Load Balancer','Distribute')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,80,25,'#ffc107','','Server','Instance 1')+
R(100,70,80,25,'#dc3545','','Server','Instance 2')+
R(190,70,80,25,'#e83e8c','','Server','Instance N')+
R(10,105,100,25,'#6610f2','','Health Check','/health')+
R(150,105,100,25,'#17a2b8','','Algorithm','RR/LC/IP Hash')+
R(290,35,190,155,'#17a2b8','','Load Balancing','L4 (TCP) or L7 (HTTP). RR, LC, IP Hash. Health checks, draining. Stateless design preferred over sticky sessions.'),
T(240,220,'Load Balancing: Distribute traffic across servers. L4/L7, RR/LC algorithms, health checks.',9,'#666','middle'),
[
e('Nginx L7 Load Balancer','HTTP load balancing.',codeBlock([
'http {',
'  upstream backend {',
'    least_conn;  # or: round_robin(default), ip_hash, weight',
'    server api1.example.com weight=3 max_fails=3 fail_timeout=30s;',
'    server api2.example.com weight=2;',
'    server api3.example.com backup;  # backup only',
'  }',
'  server {',
'    listen 443 ssl;',
'    server_name api.myapp.com;',
'    location / {',
'      proxy_pass http://backend;',
'      proxy_set_header X-Real-IP $remote_addr;',
'      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;',
'      proxy_next_upstream error timeout invalid_header http_500;',
'    }',
'  }',
'}'
]),'Nginx L7 HTTP load balancer with least_conn and health checks.'),
e('HAProxy L4 Load Balancer','TCP load balancing.',codeBlock([
'global',
'  log /dev/log local0',
'  maxconn 4096',
'defaults',
'  log global',
'  mode tcp',
'  timeout connect 5000ms',
'  timeout client 50000ms',
'  timeout server 50000ms',
'frontend api_frontend',
'  bind *:443',
'  default_backend api_backend',
'backend api_backend',
'  balance roundrobin',
'  option tcp-check',
'  server api1 10.0.1.10:3000 check inter 5s fall 3 rise 2',
'  server api2 10.0.1.11:3000 check inter 5s fall 3 rise 2',
'  server api3 10.0.1.12:3000 check inter 5s fall 3 rise 2'
]),'HAProxy L4 TCP load balancer with health checks.'),
e('Health Check Endpoint','Express health check.',codeBlock([
'app.get("/health", async (req, res) => {',
'  const health = {',
'    status: "ok", timestamp: new Date().toISOString(),',
'    uptime: process.uptime(),',
'    memory: process.memoryUsage(),',
'  };',
'  try {',
'    await db.query("SELECT 1");',
'    health.db = "connected";',
'  } catch (err) {',
'    health.db = "error";',
'    health.status = "degraded";',
'  }',
'  try {',
'    await redis.ping();',
'    health.redis = "connected";',
'  } catch (err) {',
'    health.redis = "error";',
'    health.status = "degraded";',
'  }',
'  const statusCode = health.status === "ok" ? 200 : 503;',
'  res.status(statusCode).json(health);',
'});'
]),'Comprehensive health check endpoint for load balancer.'),
e('DNS Load Balancing with Route53','Multi-region.',codeBlock([
'# AWS Route53 DNS routing',
'# Simple routing: multiple A records',
'api.example.com. A 10.0.1.10',
'api.example.com. A 10.0.1.11',
'api.example.com. A 10.0.1.12',
'# Weighted routing:',
'api.example.com. A 10.0.1.10 weight 50',
'api.example.com. A 10.0.1.11 weight 30',
'api.example.com. A 10.0.1.12 weight 20',
'# Latency-based:',
'api.example.com. A 10.0.1.10 region us-east-1',
'api.example.com. A 10.0.2.10 region eu-west-1',
'api.example.com. A 10.0.3.10 region ap-southeast-1'
]),'DNS load balancing with AWS Route53 weighted and latency-based routing.')
],
[
m('L4 load balancer operates at?',['Application layer','Transport layer','Network layer','Session layer'],1,'L4 operates at TCP/UDP transport layer.'),
m('Which algorithm has session stickiness?',['Round Robin','Least Connections','IP Hash','Weighted'],2,'IP Hash maps client IP to same server.'),
m('What does a health check do?',['Balance traffic','Verify server health','Cache content','Encrypt traffic'],1,'Verifies server is healthy before sending traffic.'),
m('Purpose of draining?',['Speed up','Let requests finish before removal','Reset connections','Cache warmup'],1,'Allow existing requests to complete.'),
m('Why stateless over sticky sessions?',['More secure','Better load distribution + fault tolerance','Faster','Cheaper'],1,'Even load distribution, survive server failure.'),
m('What is proxy_next_upstream?',['Nginx retry on failure','HAProxy config','Round robin variant','Caching directive'],0,'Nginx retries failed request on next upstream.')
]
);

/* ==== TOPIC 6: Caching Strategies ==== */
addTopic('sd-caching','Caching Strategies','intermediate',20,
['Caching stores frequently accessed data in a fast, temporary storage layer to reduce latency and database load.',
'Key strategies: Cache-Aside (app manages cache — check cache first, miss → DB → populate cache), Read-Through (cache lib auto-populates), Write-Through (write to cache + DB synchronously), Write-Behind (write to cache, async write to DB).',
'Eviction policies: LRU (least recently used), LFU (least frequently used), FIFO, TTL (time-to-live), Random. TTL is most common — prevents stale data.',
'Cache levels: L1 (in-memory, app process — fastest, limited), L2 (distributed, Redis/Memcached — shared across instances), CDN (edge cache for static/geo-distributed).'
],
'Caching is like your kitchen pantry. You keep frequently used ingredients (hot data) in the pantry (cache) instead of going to the supermarket (database) every time you cook. When the pantry runs out (cache miss), you go to the store and restock. Some items expire (TTL) — stale milk is bad. A well-stocked pantry (high hit rate) makes cooking (serving requests) much faster.',
[
d('Cache-Aside (Lazy Loading)','Most common pattern. App checks cache first. Cache hit → return. Cache miss → query DB, store in cache, return. Benefits: only requested data is cached, resilient to cache failure. Drawback: cache miss penalty (3 trips). Use with TTL. Implement with redis.get() → if null, db.query() → redis.set().'),
d('Write-Through vs Write-Behind','Write-Through: write to cache and DB in same transaction. Ensures cache-DB consistency. Higher write latency. Write-Behind: write to cache immediately, DB asynchronously (queue + batch). Faster writes. Risk: data loss if cache fails before DB write. Use Write-Through for critical data, Write-Behind for high-volume.'),
d('Cache Invalidation','The hardest problem in computer science. TTL: simplest — data expires after N seconds. Event-driven: invalidate cache when data changes (publish event → cache delete). Version-based: cache key includes version number. Stale-while-revalidate: serve stale data while refreshing in background.'),
d('Redis Cache Patterns','distributed locking: SETNX for critical sections. Rate limiting: INCR + EXPIRE. Session store: HSET/HGET user sessions. Pub/Sub for cache invalidation events. Sorted sets for leaderboards. HyperLogLog for unique counts (UV). Streams for message queuing. Bloom filter for cache penetration prevention.')
],
'Use cache-aside as default pattern. Set reasonable TTLs. Use Redis for distributed caching. Monitor hit rate — cache is only useful if hit rate > 80%. Cache at multiple levels (in-process + Redis + CDN). Invalidation is hard — prefer TTL + short cache durations. Never cache sensitive data (PII, tokens). Preload cache on deployment (cache warming).',
[
q('What is caching?','Storing frequently accessed data in a fast temporary layer to reduce latency and database load.'),
q('What is cache-aside?','App checks cache first. On miss: query DB, store in cache, return. Most common pattern.'),
q('Write-Through vs Write-Behind?','WT: write to cache + DB synchronously (consistent, slower writes). WB: cache first, DB async (fast writes, risk of loss).'),
q('What is TTL?','Time-to-live — how long data stays in cache before automatic eviction.'),
q('What is cache invalidation?','Removing or updating stale cache data. Hardest problem in computer science.'),
q('What is cache hit ratio?','Percentage of requests served from cache. Target: >80%.'),
q('What keys for eviction?','LRU, LFU, FIFO, TTL, Random. LRU is most common.'),
q('What is cache stampede?','Many requests simultaneously miss cache and hit DB. Prevent with mutex, early recalculation.'),
q('What is Redis?','In-memory data structure store — primary cache for distributed systems.'),
q('What to avoid caching?','PII, passwords, tokens, real-time data (stocks), rapidly changing data.')
],
R(10,35,100,25,'#0070f3','','Client','Request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Cache Check','Key exists?')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Cache HIT','Return cached')+
R(160,70,100,25,'#dc3545','','Cache MISS','Query DB')+
A(160,90,160,110)+
R(160,105,100,25,'#e83e8c','','Database','Storage')+
A(160,125,160,145)+
R(160,140,100,25,'#6610f2','','Populate','Cache + Return')+
R(290,35,190,155,'#17a2b8','','Caching','Cache-Aside: check → miss → DB → populate. TTL, LRU. Redis. Target >80% hit rate.'),
T(240,220,'Caching: Store hot data in fast layer. Cache-Aside pattern. TTL, LRU, Redis. Target >80% hit rate.',9,'#666','middle'),
[
e('Cache-Aside with Redis','Standard caching pattern.',codeBlock([
'async function getUser(id) {',
'  const cacheKey = "user:" + id;',
'  // Check cache',
'  const cached = await redis.get(cacheKey);',
'  if (cached) return JSON.parse(cached); // HIT',
'  // Cache MISS — query database',
'  const user = await db.query("SELECT * FROM users WHERE id=$1", [id]);',
'  if (user) {',
'    // Store in cache with TTL',
'    await redis.setex(cacheKey, 3600, JSON.stringify(user));',
'  }',
'  return user;',
'}'
]),'Cache-Aside pattern: check Redis first, miss → query DB → populate cache.'),
e('Write-Through Cache','Synchronous write to cache + DB.',codeBlock([
'async function updateUser(id, data) {',
'  const cacheKey = "user:" + id;',
'  // Update database',
'  const user = await db.query(',
'    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",',
'    [data.name, data.email, id]',
'  );',
'  // Update cache synchronously',
'  await redis.setex(cacheKey, 3600, JSON.stringify(user));',
'  return user;',
'}',
'// Write-Behind (async DB write):',
'async function updateUserFast(id, data) {',
'  const cacheKey = "user:" + id;',
'  // Update cache immediately',
'  await redis.setex(cacheKey, 3600, JSON.stringify(data));',
'  // Queue DB write for async processing',
'  await queue.send("user_update", { id, data, timestamp: Date.now() });',
'}'
]),'Write-Through (sync) vs Write-Behind (async queue).'),
e('Cache Stampede Prevention','Mutex lock for cache rebuild.',codeBlock([
'async function getExpensiveData(key, ttl, fetchFn) {',
'  const cached = await redis.get(key);',
'  if (cached) return JSON.parse(cached);',
'  // Mutex: only one process rebuilds cache',
'  const lockKey = "lock:" + key;',
'  const lock = await redis.setnx(lockKey, "1", "EX", 10);',
'  if (lock) {',
'    try {',
'      const data = await fetchFn();',
'      await redis.setex(key, ttl, JSON.stringify(data));',
'      return data;',
'    } finally { await redis.del(lockKey); }',
'  } else {',
'    // Wait and retry',
'    await new Promise(r => setTimeout(r, 100));',
'    return getExpensiveData(key, ttl, fetchFn);',
'  }',
'}'
]),'Mutex-based cache stampede prevention.'),
e('Multi-Level Caching','L1 + L2 cache.',codeBlock([
'class MultiLevelCache {',
'  constructor(ttl) {',
'    this.l1 = new Map(); // in-process (fast)',
'    this.ttl = ttl || 60;',
'  }',
'  async get(key) {',
'    // Level 1: in-process Map',
'    const l1Hit = this.l1.get(key);',
'    if (l1Hit && Date.now() - l1Hit.ts < this.ttl * 1000) return l1Hit.data;',
'    // Level 2: Redis (distributed)',
'    const l2Hit = await redis.get(key);',
'    if (l2Hit) {',
'      const data = JSON.parse(l2Hit);',
'      this.l1.set(key, { data, ts: Date.now() }); // populate L1',
'      return data;',
'    }',
'    return null; // miss',
'  }',
'  async set(key, data) {',
'    this.l1.set(key, { data, ts: Date.now() });',
'    await redis.setex(key, this.ttl, JSON.stringify(data));',
'  }',
'}'
]),'Multi-level cache: L1 (in-process) + L2 (distributed Redis).'),
e('Cache Invalidation via Events','Event-driven cache cleanup.',codeBlock([
'// When data changes, publish event',
'async function updateProduct(id, data) {',
'  await db.query("UPDATE products SET ... WHERE id=$1", [id]);',
'  // Invalidate all related cache keys',
'  await redis.del("product:" + id);',
'  await redis.del("products:list");',
'  await redis.publish("cache:invalidate", JSON.stringify({ type: "product", id }));',
'}',
'// Subscribe to invalidation events (all instances)',
'redis.subscribe("cache:invalidate", (msg) => {',
'  const { type, id } = JSON.parse(msg);',
'  cache.l1.delete(type + ":" + id); // clear local cache too',
'});'
]),'Cache invalidation via Redis pub/sub — all instances notified.')
],
[
m('Cache-Aside: what happens on miss?',['Return error','Query DB, populate cache','Query cache again','Use default value'],1,'On cache miss: query DB, populate cache, return.'),
m('TTL stands for?',['Total Time Live','Time-To-Live','Transfer Time Limit','Token Timeout'],1,'Time-To-Live — automatic expiration.'),
m('Write-Through ensures?',['Fast writes','Cache-DB consistency','Async writes','No caching'],1,'Write to cache and DB together for consistency.'),
m('Good cache hit ratio target?',['>50%','>80%','>99%','>30%'],1,'Target >80% hit rate for effective caching.'),
m('What is cache stampede?',['Cache too fast','Multiple misses hit DB simultaneously','Cache too large','Wrong eviction policy'],1,'Simultaneous cache misses overwhelming DB.'),
m('Which is fastest cache level?',['Redis','In-process Map','CDN','Database'],1,'In-process (L1) is fastest — no network call.')
]
);

/* ==== TOPIC 7: Database Sharding ==== */
addTopic('sd-database-sharding','Database Sharding','advanced',25,
['Sharding horizontally partitions data across multiple database instances (shards), each holding a subset of the data.',
'Shard key determines which shard stores which data. Critical choice: must distribute data evenly and match query patterns.',
'Strategies: Range-based (shard by ID range — simple but hot spots), Hash-based (hash key → shard — even distribution), Directory-based (lookup table maps key to shard).',
'Challenges: cross-shard queries (joins, aggregations), resharding (rebalancing when adding shards), distributed transactions, secondary indexes across shards.'
],
'Sharding is like splitting a library\'s books across multiple buildings by first letter. A-D in Building 1, E-K in Building 2, etc. To find a book, you know which building (shard) based on the letter (shard key). But finding all books by "Smith" (cross-shard query) requires visiting every building. Adding Building 5 means reorganizing many books (resharding).',
[
d('Choosing a Shard Key','Goal: even data distribution, match access patterns. User ID: good for user-centric apps — each user\'s data on one shard. Geographic: region-based — good for locality. Time-based: by date — good for time-series but hot spot on current data. Avoid: monotonically increasing keys (hot shard). High-cardinality, evenly distributed keys are best.'),
d('Hash-Based Sharding','shard = hash(shard_key) % N. Even distribution. Problem: adding/removing shards changes N → most data needs rehashing (resharding). Solution: Consistent Hashing — minimizes remapping when N changes. Each shard handles a range of hash space. Virtual nodes for better distribution.'),
d('Range-Based Sharding','shard = key falls in range. User IDs 1-10000 → Shard 1, 10001-20000 → Shard 2. Simple, supports range queries (BETWEEN). Problem: hot spots — new users get higher IDs, new shard gets most writes. Data skew if ranges poorly chosen. Good for time-series with time-based ranges.'),
d('Resharding (Rebalancing)','Adding shards requires moving data. Strategies: 1) Preshard: create more shards than needed initially (e.g., 1024 virtual shards mapped to fewer physical). 2) Double write: write to old + new shards during migration. 3) Offline migration: downtime. 4) Proxy-based: shard proxy handles routing, data migration in background.')
],
'Shard key choice is the most critical design decision. Hash-based for even distribution, consistent hashing for easy resharding. Avoid cross-shard queries — design schema to keep related data on same shard. Pre-shard to avoid resharding pain. Use read replicas for read-heavy shards. Consider ProxySQL or Vitess for query routing.',
[
q('What is database sharding?','Horizontal partitioning — splitting data across multiple database instances.'),
q('What is a shard key?','The key that determines which shard stores a row. Critical for performance and distribution.'),
q('Hash vs range sharding?','Hash: even distribution, no range queries, resharding expensive. Range: simple, supports range queries, risk of hot spots.'),
q('What is consistent hashing?','Hash each shard to a ring. Keys belong to nearest shard. Minimizes data movement on shard add/remove.'),
q('What is the main challenge?','Cross-shard queries — joins, aggregations, transactions across shards are expensive.'),
q('What is resharding?','Adding or removing shards — requires moving data between shards. Difficult to do live.'),
q('What is a hot spot?','One shard receives disproportionate traffic. Caused by poor shard key or popularity skew.'),
q('How to handle transactions across shards?','Distributed transactions (2PC) or Saga pattern. Better: design to avoid cross-shard.'),
q('What are virtual shards?','More virtual shards than physical shards. Flexible mapping — easier resharding.'),
q('What is ProxySQL?','Proxy that routes queries to appropriate shard based on shard key — transparent to app.')
],
R(10,35,100,25,'#0070f3','','Client','Request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Proxy/Driver','Route by shard key')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,80,25,'#ffc107','','Shard 1','Users A-M')+
R(100,70,80,25,'#dc3545','','Shard 2','Users N-Z')+
R(190,70,80,25,'#e83e8c','','Shard N','Range/Hash')+
R(10,105,100,25,'#6610f2','','Config Map','Shard key→Shard')+
R(150,105,100,25,'#17a2b8','','Shard Key','hash(id) % N')+
R(290,35,190,155,'#17a2b8','','Sharding','Horizontal partitioning by shard key. Hash-based or range. Consistent hashing for resharding. Avoid cross-shard.'),
T(240,220,'Sharding: Partition data across DB instances by shard key. Hash for distribution, consistent hashing for resharding.',9,'#666','middle'),
[
e('Hash-Based Sharding (Node.js)','Determine shard from key.',codeBlock([
'const SHARDS = [',
'  { host: "shard1.cluster.com", port: 5432 },',
'  { host: "shard2.cluster.com", port: 5432 },',
'  { host: "shard3.cluster.com", port: 5432 },',
'];',
'function getShard(userId) {',
'  const hash = crypto.createHash("md5").update(String(userId)).digest("hex");',
'  const shardNum = parseInt(hash.slice(0, 8), 16) % SHARDS.length;',
'  return SHARDS[shardNum];',
'}',
'async function getUser(userId) {',
'  const shard = getShard(userId);',
'  const pool = new Pool(shard);',
'  const result = await pool.query("SELECT * FROM users WHERE id=$1", [userId]);',
'  return result.rows[0];',
'}'
]),'Hash-based shard routing with MD5 hash modulo shard count.'),
e('Vitess Shard Configuration','Sharding with Vitess.',codeBlock([
'# Vitess keyspace with 4 shards',
'create keyspace user_ks with',
'  replication_factor: 3',
'  shards: [-40,40-80,80-c0,c0-]  # 4 shards in hex range',
'# Routing table',
'create table users (',
'  id bigint, name varchar(100), email varchar(200),',
'  primary key (id)',
')',
'# VSchema: defines sharding key',
'alter vschema on user_ks.users add vindex hash(id) using hash;'
]),'Vitess shard configuration with hash-based vindex.'),
e('Consistent Hashing Implementation','Minimal remapping on resharding.',codeBlock([
'class ConsistentHashRing {',
'  constructor(virtualNodes = 100) {',
'    this.ring = {};',
'    this.sortedKeys = [];',
'    this.virtualNodes = virtualNodes;',
'  }',
'  addShard(shardId) {',
'    for (let i = 0; i < this.virtualNodes; i++) {',
'      const hash = this._hash(shardId + ":" + i);',
'      this.ring[hash] = shardId;',
'      this.sortedKeys.push(hash);',
'    }',
'    this.sortedKeys.sort((a, b) => a - b);',
'  }',
'  getShard(key) {',
'    const hash = this._hash(key);',
'    const pos = this.sortedKeys.findIndex(k => k >= hash);',
'    const targetHash = pos === -1 ? this.sortedKeys[0] : this.sortedKeys[pos];',
'    return this.ring[targetHash];',
'  }',
'  _hash(key) {',
'    return parseInt(crypto.createHash("md5").update(key).digest("hex").slice(0, 8), 16);',
'  }',
'}'
]),'Consistent hashing ring — minimizes data movement when adding/removing shards.'),
e('Cross-Shard Query with scatter-gather','Query all shards, merge results.',codeBlock([
'async function searchUsersByName(name) {',
'  const results = [];',
'  // Query ALL shards (scatter-gather)',
'  const promises = SHARDS.map(async (shard, i) => {',
'    const pool = new Pool(shard);',
'    const res = await pool.query(',
'      "SELECT * FROM users WHERE name ILIKE $1 LIMIT 100",',
'      ["%" + name + "%"]',
'    );',
'    return res.rows;',
'  });',
'  const shardResults = await Promise.all(promises);',
'  // Merge and sort results',
'  for (const rows of shardResults) results.push(...rows);',
'  return results.sort((a, b) => b.id - a.id).slice(0, 100);',
'}'
]),'Scatter-gather pattern for cross-shard queries — query all, merge results.')
],
[
m('Shard key determines?',['Data format','Which shard stores data','Query speed','Index type'],1,'Shard key → which shard a row belongs to.'),
m('Hash sharding gives?',['Range query support','Even distribution','Hot spots','Simple routing'],1,'Hash distributes data evenly.'),
m('Consistent hashing minimizes?',['Query latency','Data movement on resharding','Storage','CPU usage'],1,'Minimizes data movement when shards change.'),
m('What is a hot spot?',['Fast shard','Overloaded shard','Empty shard','Replica shard'],1,'Shard receiving disproportionate traffic.'),
m('Cross-shard queries are?',['Easy','Expensive (scatter-gather)','Not possible','Automatic'],1,'Cross-shard requires querying all shards.'),
m('Presharding creates?',['More shards than nodes','Fewer shards than nodes','Equal shards and nodes','Dynamic shards'],0,'Create more virtual shards than physical nodes for flexibility.')
]
);

/* ==== TOPIC 8: Database Replication ==== */
addTopic('sd-database-replication','Database Replication','intermediate',20,
['Replication copies data from one database (primary) to one or more replicas to increase read throughput, provide failover, and ensure durability.',
'Types: Single-primary (one primary for writes, many replicas for reads — most common), Multi-primary (multiple write nodes — conflict resolution needed), Cascading (replica can be source for another).',
'Modes: Synchronous (commit waits for replica confirmation — strong consistency, higher latency), Asynchronous (primary commits without waiting — faster, possible data loss on failover).',
'Uses: read scaling (replicas handle SELECTs), high availability (failover if primary fails), disaster recovery (replica in another region), analytics (replica for heavy queries).'
],
'Replication is like a newspaper printing press. The primary press (primary DB) is the master — all articles are finalized here. Copies (replicas) are sent to distribution centers. Most readers get their paper from a local center (read replica) — faster than going to the main press. If the main press breaks down, a distribution center can take over (failover), though there may be a gap in the latest edition (data loss).',
[
d('Single-Primary Replication','One primary for writes, one or more replicas for reads. Primary streams WAL (Write-Ahead Log) to replicas. Replicas apply changes. Reads can go to replicas to offload primary. Application must separate read/write connections. Failover: promote replica to primary (manual or automated).'),
d('Synchronous vs Asynchronous','Synchronous: primary waits for N replicas to confirm write. Strong consistency (no data loss on failover). Higher write latency. Minimum 2 replicas recommended. Asynchronous: primary commits immediately, replica catches up eventually. Fast writes. Possible data loss (seconds of writes) if primary fails before replication.'),
d('Replication Lag','Time between write on primary and appearance on replica. Causes: network latency, replica too slow, high write volume on primary. Effects: stale reads on replicas. Mitigation: read-your-writes consistency (read from primary after write), monitor lag (seconds_behind_master).'),
d('Failover Process','Detection: primary health check fails (no heartbeat, connection timeout). Promotion: pick replica with most up-to-date data. DNS update or VIP move to new primary. Split-brain prevention: STONITH (Shoot The Other Node In The Head) — ensure old primary is down. Automated failover tools: Patroni, Orchestrator, AWS RDS Multi-AZ.')
],
'Use single-primary with async replicas for most workloads. Synchronous for critical data (financial). Monitor replication lag. Use read replicas to offload primary — separate read/write connection paths in code. Test failover process regularly. Aurora and RDS Multi-AZ simplify replication management.',
[
q('What is replication?','Copying data from primary database to replicas for read scaling, HA, and durability.'),
q('Single-primary vs multi-primary?','Single-primary: one write node, many read replicas. Multi-primary: multiple write nodes (conflict resolution needed).'),
q('Synchronous replication?','Primary waits for replica ack before commit. Strong consistency, higher write latency.'),
q('Asynchronous replication?','Primary commits immediately. Fast writes, potential data loss on failover.'),
q('What is replication lag?','Time difference between write on primary and appearance on replica.'),
q('What is failover?','Promoting a replica to primary when the primary fails.'),
q('What is WAL?','Write-Ahead Log — PostgreSQL/Binary log (MySQL) streamed to replicas for replay.'),
q('What is read-your-writes consistency?','After writing, read from primary to ensure you see your own write.'),
q('What is split-brain?','Two nodes both believing they are primary. Prevent with STONITH or quorum.'),
q('What is Patroni?','PostgreSQL HA tool — manages replication, automated failover, and primary election.')
],
R(10,35,100,25,'#0070f3','','Client','Writes')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Primary','Read+Write')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Replica 1','Read-only')+
R(120,70,100,25,'#dc3545','','Replica 2','Read-only')+
R(230,70,100,25,'#e83e8c','','Replica N','Read-only')+
R(10,105,100,25,'#6610f2','','WAL Stream','Async/Sync')+
R(290,35,190,155,'#17a2b8','','Replication','Primary → Replicas. Read scaling, HA, failover. Async (fast) vs Sync (consistent). Monitor lag.'),
T(240,220,'Replication: Copy data from primary to replicas. Scale reads, failover. Sync vs async.',9,'#666','middle'),
[
e('PostgreSQL Streaming Replication','Primary-replica setup.',codeBlock([
'# postgresql.conf (primary)',
'wal_level = replica',
'max_wal_senders = 5',
'wal_keep_size = 1024  # MB',
'# On replica: pg_hba.conf',
'host replication replicator primary_ip/32 md5',
'# On replica: create standby.signal',
'# postgresql.conf (replica)',
'primary_conninfo = host=primary_ip port=5432 user=replicator password=repl_pass',
'hot_standby = on',
'# Promote replica to primary:',
'pg_ctl promote -D /var/lib/postgresql/data'
]),'PostgreSQL streaming replication configuration.'),
e('Read/Write Splitting in App','Separate read and write connections.',codeBlock([
'const { Pool } = require("pg");',
'const pools = {',
'  write: new Pool({ host: "primary.db", port: 5432, database: "app" }),',
'  read: new Pool({ host: "replica.db", port: 5432, database: "app" }),',
'};',
'async function getUser(id, isWrite) {',
'  const pool = isWrite ? pools.write : pools.read;',
'  return pool.query("SELECT * FROM users WHERE id=$1", [id]);',
'}',
'async function createUser(data) {',
'  // Writes always go to primary',
'  const result = await pools.write.query(',
'    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",',
'    [data.name, data.email]',
'  );',
'  // Read-after-write: read from primary',
'  return getUser(result.rows[0].id, true);',
'}'
]),'Read/write splitting in application code.'),
e('MySQL Group Replication','Multi-primary setup.',codeBlock([
'# my.cnf (each node)',
'[mysqld]',
'plugin-load=group_replication.so',
'group_replication_group_name="aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"',
'group_replication_start_on_boot=off',
'group_replication_bootstrap_group=off',
'group_replication_local_address="10.0.1.10:33061"',
'group_replication_group_seeds="10.0.1.10:33061,10.0.1.11:33061,10.0.1.12:33061"',
'group_replication_single_primary_mode=ON',
'# Bootstrap first node:',
'SET GLOBAL group_replication_bootstrap_group=ON;',
'START GROUP_REPLICATION;',
'SET GLOBAL group_replication_bootstrap_group=OFF;'
]),'MySQL Group Replication for multi-primary setups.'),
e('Failover with Patroni (PostgreSQL)','Automated HA.',codeBlock([
'# patroni.yml',
'scope: myapp',
'namespace: /db/',
'name: pg-primary',
'restapi:',
'  listen: 0.0.0.0:8008',
'  connect_address: 10.0.1.10:8008',
'consul:',
'  host: 10.0.1.20:8500',
'postgresql:',
'  listen: 0.0.0.0:5432',
'  connect_address: 10.0.1.10:5432',
'  data_dir: /data/pgdata',
'  pg_hba:',
'    - "host replication replicator 10.0.0.0/8 md5"',
'    - "host all all 0.0.0.0/0 md5"',
'  replication:',
'    username: replicator',
'    password: repl_pass',
'    network: 10.0.0.0/8',
'  parameters:',
'    wal_level: replica',
'    hot_standby: "on"',
'    max_connections: 200'
]),'Patroni configuration for automated PostgreSQL failover.')
],
[
m('Primary database handles?',['Reads only','Writes (and possibly reads)','Backups only','Analytics'],1,'Primary handles writes. Replicas handle reads.'),
m('Synchronous replication ensures?',['Fast writes','No data loss on failover','Lower latency','Less network'],1,'No data loss — primary waits for replica ack.'),
m('Replication lag causes?',['Faster reads','Stale data on replicas','More writes','Better consistency'],1,'Replicas may serve stale data.'),
m('What is failover?',['Adding more data','Promoting replica on primary failure','Restarting DB','Rebuilding indexes'],1,'Promote replica to primary when primary fails.'),
m('Read-your-writes pattern?',['Read from replica after write','Read from primary after write','Read from cache','Write to both'],1,'Read from primary after writing to ensure visibility.'),
m('What is WAL?',['Write-Ahead Log for replication','Database index','Connection pool','Query cache'],0,'Write-Ahead Log streamed to replicas.')
]
);

/* ==== TOPIC 9: Content Delivery Network ==== */
addTopic('sd-cdn','Content Delivery Network','intermediate',15,
['A CDN is a geographically distributed network of proxy servers that deliver content from the edge server closest to the user.',
'Caches static content (images, CSS, JS, videos) at edge locations. Reduces latency, offloads origin servers, handles traffic spikes.',
'Key concepts: origin server, edge/PoP (Point of Presence), pull zone (cache on first request), push zone (pre-upload content), purge (invalidate), TTL (cache duration).',
'DNS-based routing: user DNS resolves to nearest edge server via GeoDNS or Anycast (same IP announced from multiple locations — routed to nearest).'
],
'A CDN is like neighborhood grocery stores vs a single warehouse. Instead of everyone driving to one central warehouse (origin server), groceries are stocked in local stores (edge servers) throughout the city. You walk to your nearest store (low latency). The store restocks from the warehouse as needed (cache pull). Popular items are always on the shelf (high cache hit).',
[
d('How CDN Works','1) User requests image.com/cat.jpg. 2) DNS resolves to nearest CDN edge server. 3) Edge checks cache. 4) Cache HIT → return. 5) Cache MISS → edge requests from origin, caches, returns. 6) Subsequent requests for same URL → HIT. TTL controls how long edge keeps it.'),
d('CDN Caching Strategies','Pull CDN: edge fetches from origin on first request. Simpler, no pre-warming needed. Push CDN: pre-upload content to CDN. Full control, immediate availability, higher cost. Hybrid: push critical assets, pull for long-tail. Cache rules: static assets (long TTL: 1 year with versioned URLs), dynamic content (short TTL or bypass).'),
d('CDN for Dynamic Content','Not just for static. Edge caching for API responses (short TTL). Edge computing (Cloudflare Workers, Lambda@Edge) for dynamic processing at edge. DDoS protection — CDN absorbs attack traffic. SSL termination at edge. Origin shielding — edge reduces load on origin.'),
d('CDN Security','DDoS mitigation: CDN absorbs large-scale attacks. WAF at edge: block malicious requests before reaching origin. Bot management: identify and block bad bots. Token authentication: signed URLs for private content. TLS termination at edge. Origin hiding: only CDN IPs can reach origin.')
],
'Use CDN for all static assets with cache-busted URLs (long TTL). Consider edge computing for low-latency dynamic responses. CloudFront + S3 is a powerful combo. Always set Cache-Control headers. Use signed URLs for private content. Monitor cache hit ratio — purge on content updates.',
[
q('What is a CDN?','Geographically distributed proxy servers delivering content from edge nearest the user.'),
q('How does CDN reduce latency?','Serves from edge server close to user instead of distant origin server.'),
q('What is an edge server/PoP?','CDN server in a Point of Presence — one of many global locations.'),
q('Pull vs Push CDN?','Pull: fetch from origin on first request (lazy). Push: pre-upload content (eager).'),
q('What is cache hit ratio?','Percentage of requests served from CDN cache (vs fetching from origin).'),
q('How does CDN handle dynamic content?','Short TTL caching, edge computing (Lambda@Edge), or bypass to origin.'),
q('What is Anycast?','Same IP announced from multiple locations — traffic routed to nearest.'),
q('What is origin shielding?','CDN aggregates edge requests before hitting origin — reduces origin load.'),
q('How to invalidate CDN cache?','Purge by URL, by pattern, or wait for TTL expiry.'),
q('What is a signed URL?','Time-limited CDN URL for private content access (e.g., S3 presigned URL).')
],
R(10,35,100,25,'#0070f3','','User','Browser')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','DNS','Nearest edge')+
A(150,60,150,80)+
R(10,70,100,25,'#ffc107','','Edge Server','Cache check')+
A(110,83,140,83)+A(250,48,280,48)+
R(150,70,80,25,'#dc3545','','HIT','Return')+
R(240,70,80,25,'#e83e8c','','MISS','Fetch origin')+
R(10,105,100,25,'#6610f2','','Origin','S3/Server')+
R(150,105,100,25,'#17a2b8','','CDN PoP','Global edge')+
R(290,35,190,155,'#17a2b8','','CDN','Distributed edge servers. Cache static, reduce latency, absorb traffic, DDoS protection.'),
T(240,220,'CDN: Deliver content from nearest edge server. Reduce latency, offload origin, DDoS protection.',9,'#666','middle'),
[
e('AWS CloudFront + S3','Static site CDN.',codeBlock([
'# CloudFront distribution with S3 origin',
'AWSTemplateFormatVersion: "2010-09-09"',
'Resources:',
'  CDN:',
'    Type: AWS::CloudFront::Distribution',
'    Properties:',
'      DistributionConfig:',
'        Enabled: true',
'        Origins:',
'          - DomainName: mybucket.s3.amazonaws.com',
'            Id: S3Origin',
'            S3OriginConfig: {}',
'        DefaultCacheBehavior:',
'          TargetOriginId: S3Origin',
'          ViewerProtocolPolicy: redirect-to-https',
'          DefaultTTL: 86400',
'          MaxTTL: 31536000',
'          ForwardedValues:',
'            QueryString: false',
'          Compress: true',
'        PriceClass: PriceClass_All',
'        CustomErrorResponses:',
'          - ErrorCode: 404',
'            ResponseCode: 200',
'            ResponsePagePath: /index.html'
]),'CloudFront + S3 for static site hosting with CDN.'),
e('Cache-Control Headers','Set TTL via headers.',codeBlock([
'// Static assets: long cache, versioned URLs',
'app.use("/static", express.static("public", {',
'  maxAge: "1y",',
'  immutable: true,',
'  setHeaders: (res, path) => {',
'    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");',
'  }',
'}));',
'// API: short or no cache',
'app.get("/api/users/:id", (req, res) => {',
'  res.setHeader("Cache-Control", "public, max-age=60");', // 1 minute
'  res.json({ id: req.params.id, name: "Alice" });',
'});',
'// No cache for dynamic content:',
'// Cache-Control: no-cache, no-store, must-revalidate'
]),'Cache-Control headers for CDN caching behavior.'),
e('Lambda@Edge for Origin Response','Modify CDN response.',codeBlock([
'// Lambda@Edge: origin-response trigger',
'exports.handler = async (event) => {',
'  const response = event.Records[0].cf.response;',
'  const headers = response.headers;',
'  // Add security headers',
'  headers["strict-transport-security"] = [{ key: "Strict-Transport-Security", value: "max-age=31536000" }];',
'  headers["x-content-type-options"] = [{ key: "X-Content-Type-Options", value: "nosniff" }];',
'  headers["x-frame-options"] = [{ key: "X-Frame-Options", value: "DENY" }];',
'  headers["cache-control"] = [{ key: "Cache-Control", value: "public, max-age=86400" }];',
'  // Compress if not already',
'  if (!headers["content-encoding"]) {',
'    headers["content-encoding"] = [{ key: "Content-Encoding", value: "gzip" }];',
'  }',
'  return response;',
'};'
]),'Lambda@Edge to modify CDN responses with security headers.'),
e('Cloudflare Worker for Edge Logic','Dynamic edge processing.',codeBlock([
'// Cloudflare Worker — runs at edge',
'addEventListener("fetch", event => {',
'  event.respondWith(handleRequest(event.request));',
'});',
'async function handleRequest(request) {',
'  const url = new URL(request.url);',
'  // Cache API responses at edge',
'  if (url.pathname.startsWith("/api/")) {',
'    const cacheKey = new Request(url.toString(), request);',
'    const cache = caches.default;',
'    let response = await cache.match(cacheKey);',
'    if (response) return response;',
'    response = await fetch("https://origin.example.com" + url.pathname);',
'    response = new Response(response.body, response);',
'    response.headers.set("Cache-Control", "public, max-age=60");',
'    event.waitUntil(cache.put(cacheKey, response));',
'    return response;',
'  }',
'  // Serve static from edge storage',
'  return fetch("https://storage.example.com" + url.pathname);',
'}'
]),'Cloudflare Worker for edge-side logic and caching.'),
e('Signed URLs for Private Content','Access-controlled CDN.',codeBlock([
'// Generate CloudFront signed URL',
'const cloudfront = new AWS.CloudFront.Signer(KEY_PAIR_ID, PRIVATE_KEY);',
'function getSignedUrl(resourcePath, expiresIn = 3600) {',
'  return new Promise((resolve, reject) => {',
'    cloudfront.getSignedUrl({',
'      url: "https://d123.cloudfront.net/" + resourcePath,',
'      expires: Math.floor(Date.now() / 1000) + expiresIn,',
'    }, (err, url) => err ? reject(err) : resolve(url));',
'  });',
'}',
'// Expiring URL: only valid for 1 hour'
]),'Signed URLs for time-limited private CDN content.')
],
[
m('CDN edge servers are located?',['Single data center','Geographically distributed','Same as origin','User device'],1,'Distributed globally for low latency.'),
m('Pull CDN means?',['Pre-upload content','Cache on first request','Push content','No caching'],1,'Edge fetches from origin on first request.'),
m('What does Anycast provide?',['Faster DNS','Route to nearest edge','SSL termination','Load balancing'],1,'Same IP announces globally → routed to nearest.'),
m('CDN reduces?',['Storage cost','Latency','Bandwidth cost','Development time'],1,'CDN reduces latency by serving from edge.'),
m('What is origin shielding?',['Encrypting origin','Aggregating edge requests to protect origin','Hiding origin IP','Replacing origin'],1,'Edge nodes aggregate requests before hitting origin.'),
m('Signed URLs provide?',['Faster delivery','Access control','Better caching','Compression'],1,'Time-limited access to private content.')
]
);

/* ==== TOPIC 10: Message Queues ==== */
addTopic('sd-message-queues','Message Queues','intermediate',20,
['Message queues enable asynchronous communication between services by decoupling producers (senders) from consumers (receivers) via a buffer.',
'Benefits: decoupling, load leveling (smooth traffic spikes), fault tolerance (queue persists if consumer down), scalability (add consumers), async processing.',
'Key concepts: producer (sends messages), consumer (receives), queue/topic (buffer), broker (server running queue), exchange/routing (directing messages), binding (queue subscription).',
'Models: point-to-point (one message, one consumer — queue), pub/sub (one message, many consumers — topic). At-least-once, at-most-once, exactly-once delivery semantics.'
],
'Message queues are like a restaurant order counter. Customers (producers) place orders and leave. Cooks (consumers) pick orders from the counter when ready. If a cook is slow, orders still pile up safely. If the restaurant gets busy, add more cooks. The counter (queue) decouples ordering from cooking — customers don\'t wait for food preparation.',
[
d('RabbitMQ vs Kafka','RabbitMQ: broker-based, routing flexibility (exchanges, bindings), push-based. Good for task queues, RPC, complex routing. Kafka: log-based, append-only log partitions, pull-based. High throughput, replay capability. Good for event streaming, data pipelines, audit logs.'),
d('Delivery Semantics','At-most-once: send, don\'t retry. Fast, may lose messages. At-least-once: send, retry on failure, consumer idempotent. Standard choice. Exactly-once: deduplication at consumer + transactional producer. Hardest, highest overhead. Most systems use at-least-once with idempotent consumers.'),
d('Message Ordering','Single queue/partition: ordered. Multiple partitions: no global order. Kafka: order within partition by key. RabbitMQ: order in single queue. For ordered processing: route related messages to same partition/queue with same partition key (e.g., order_id).'),
d('Dead Letter Queues','Messages that fail processing go to DLQ after max retries. Analyze DLQ for systemic issues. Redrive: reprocess messages after fixing bug. Monitor DLQ depth — alert if growing. Important for reliability — prevents message loss.')
],
'Use RabbitMQ for complex routing, task distribution, RPC. Use Kafka for high-throughput event streaming, data pipelines, log aggregation. Always configure dead letter queues. Make consumers idempotent (at-least-once). Monitor queue depth and consumer lag. Set message TTL. Handle poison pills (bad messages that keep failing).',
[
q('What is a message queue?','Asynchronous communication buffer — producers send, consumers receive. Decouples services.'),
q('RabbitMQ vs Kafka?','RabbitMQ: broker, routing, push. Kafka: log, high throughput, pull, replay.'),
q('What is at-least-once delivery?','Message may be delivered more than once. Consumer must be idempotent.'),
q('What is a dead letter queue?','Queue for messages that failed processing after max retries.'),
q('What is consumer lag?','How far behind consumers are from the latest message.'),
q('Point-to-point vs pub/sub?','P2P: one consumer gets message. Pub/sub: all subscribers get a copy.'),
q('What is a message broker?','The server/service running the message queue (RabbitMQ, Kafka, SQS).'),
q('What is idempotency?','Processing the same message multiple times has the same effect as once.'),
q('What is a poison pill?','A bad message that causes the consumer to fail repeatedly (goes to DLQ).'),
q('What is backpressure?','When producer is faster than consumer — queue acts as buffer (load leveling).')
],
R(10,35,100,25,'#0070f3','','Producer','Service A')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Queue/Broker','RabbitMQ/Kafka')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Consumer 1','Service X')+
R(120,70,100,25,'#dc3545','','Consumer 2','Service Y')+
R(230,70,100,25,'#e83e8c','','DLQ','Failed msgs')+
R(10,105,100,25,'#6610f2','','Exchange','Routing')+
R(150,105,100,25,'#17a2b8','','Partition','Ordered log')+
R(290,35,190,155,'#17a2b8','','Message Queue','Async decoupling. RabbitMQ (routing) vs Kafka (streaming). At-least-once, idempotent, DLQ.'),
T(240,220,'Message Queues: Async decoupling. RabbitMQ for routing, Kafka for streaming. DLQ, idempotent consumers.',9,'#666','middle'),
[
e('RabbitMQ Producer/Consumer','Send and receive.',codeBlock([
'// Producer',
'const amqp = require("amqplib");',
'async function send() {',
'  const conn = await amqp.connect("amqp://localhost");',
'  const ch = await conn.createChannel();',
'  const queue = "task_queue";',
'  await ch.assertQueue(queue, { durable: true });',
'  ch.sendToQueue(queue, Buffer.from(JSON.stringify({ task: "process_order", id: 123 })),',
'    { persistent: true });',
'  console.log("Sent");',
'}',
'// Consumer',
'const conn = await amqp.connect("amqp://localhost");',
'const ch = await conn.createChannel();',
'await ch.assertQueue("task_queue", { durable: true });',
'ch.prefetch(1); // process one at a time',
'ch.consume("task_queue", async (msg) => {',
'  const data = JSON.parse(msg.content.toString());',
'  try { await processTask(data); ch.ack(msg); }',
'  catch (err) { ch.nack(msg); } // retry or DLQ',
'}, { noAck: false });'
]),'RabbitMQ producer and consumer with manual acknowledgment.'),
e('Kafka Producer/Consumer','High-throughput streaming.',codeBlock([
'// Producer',
'const { Kafka } = require("kafkajs");',
'const kafka = new Kafka({ brokers: ["kafka:9092"] });',
'const producer = kafka.producer();',
'await producer.connect();',
'await producer.send({',
'  topic: "order-events",',
'  messages: [{',
'    key: "order-123",',
'    value: JSON.stringify({ type: "order_created", orderId: 123, amount: 99.99 }),',
'  }],',
'});',
'// Consumer',
'const consumer = kafka.consumer({ groupId: "order-processor" });',
'await consumer.connect();',
'await consumer.subscribe({ topic: "order-events", fromBeginning: true });',
'await consumer.run({',
'  eachMessage: async ({ topic, partition, message }) => {',
'    const event = JSON.parse(message.value.toString());',
'    await processEvent(event);',
'  },',
'});'
]),'Kafka producer and consumer for event streaming.'),
e('AWS SQS with Visibility Timeout','Cloud message queue.',codeBlock([
'const { SQS } = require("@aws-sdk/client-sqs");',
'const sqs = new SQS({ region: "us-east-1" });',
'// Producer',
'async function sendMessage(body) {',
'  return sqs.sendMessage({',
'    QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456/MyQueue",',
'    MessageBody: JSON.stringify(body),',
'    DelaySeconds: 0,',
'  });',
'}',
'// Consumer',
'async function pollMessages() {',
'  const data = await sqs.receiveMessage({',
'    QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456/MyQueue",',
'    MaxNumberOfMessages: 10,',
'    VisibilityTimeout: 30,',
'    WaitTimeSeconds: 20,', // long polling
'  });',
'  for (const msg of data.Messages || []) {',
'    try {',
'      await process(JSON.parse(msg.Body));',
'      await sqs.deleteMessage({ QueueUrl, ReceiptHandle: msg.ReceiptHandle });',
'    } catch (err) { /* will reappear after visibility timeout */ }',
'  }',
'}'
]),'AWS SQS with visibility timeout for reliable message processing.'),
e('Dead Letter Queue Configuration','Handle failed messages.',codeBlock([
'// RabbitMQ DLQ setup',
'const ch = await conn.createChannel();',
'await ch.assertQueue("main_queue", {',
'  durable: true,',
'  arguments: {',
'    "x-dead-letter-exchange": "dlx",',
'    "x-dead-letter-routing-key": "dlq",',
'    "x-message-ttl": 86400000, // 1 day TTL',
'    "x-max-retries": 3,',
'  },',
'});',
'await ch.assertQueue("dlq", { durable: true });',
'await ch.bindQueue("dlq", "dlx", "dlq");',
'// Kafka DLQ: produce failed messages to "order-events-dlq" topic',
'async function processOrDLQ(event, error) {',
'  if (event.retryCount >= 3) {',
'    await producer.send({ topic: "order-events-dlq", messages: [{ value: JSON.stringify({ event, error: error.message }) }] });',
'  } else {',
'    event.retryCount = (event.retryCount || 0) + 1;',
'    await producer.send({ topic: "order-events", messages: [{ value: JSON.stringify(event) }] });',
'  }',
'}'
]),'DLQ configuration for handling failed messages after max retries.')
],
[
m('Message queues provide?',['Synchronous calls','Async decoupling','Direct connections','Faster code'],1,'Asynchronous decoupling between services.'),
m('RabbitMQ uses which model?',['Log-based','Broker-based routing','File-based','Stream-based'],1,'Broker with exchanges and bindings.'),
m('At-least-once requires?',['Faster network','Idempotent consumers','More queues','Less memory'],1,'Consumer must handle duplicate messages.'),
m('Dead letter queue stores?',['All messages','Failed messages','Processed messages','Archived messages'],1,'Messages that failed after max retries.'),
m('Consumer lag indicates?',['Queue depth','How far behind consumer is','Producer speed','Network health'],1,'Difference between latest and consumed offset.'),
m('Idempotency means?',['Unique messages','Same result from duplicate processing','Fast processing','Ordered processing'],1,'Processing same message twice has same effect as once.')
]
);

/* ==== TOPIC 11: Event-Driven Architecture ==== */
addTopic('sd-event-driven','Event-Driven Architecture','advanced',20,
['Event-driven architecture (EDA) is a design pattern where services communicate by producing and consuming events — state changes published as messages.',
'Core components: Event Producers (publish events), Event Bus/Broker (Kafka, EventBridge), Event Consumers (subscribe and react), Event Store (persist event history).',
'Benefits: loose coupling, scalability, real-time processing, audit trail (event store), extensibility (add consumers without modifying producers).',
'Patterns: Event Notification (simple pub/sub), Event-Carried State Transfer (event carries full data), Event Sourcing (event store as source of truth), CQRS (separate read/write models).'
],
'Event-driven architecture is like a city\'s public announcement system. When something happens (sports game ends → fans leave), an announcement (event) goes out. Multiple systems react: traffic lights adjust, subway adds trains, bars prepare for crowds. The game organizers (producer) don\'t need to know about traffic, transit, or bars — they just announce. New listeners can react without contacting the stadium.',
[
d('Event-Driven vs Request-Driven','Request-driven: service A calls service B synchronously (HTTP/gRPC). Tight coupling, A waits for B, cascading failures. Event-driven: A publishes event, B consumes asynchronously. A doesn\'t know about B. Loose coupling, better resilience, but eventual consistency. Choose based on consistency requirements.'),
d('Event Sourcing','Store all state changes as an append-only event log. Current state = fold/reduce over all events. Benefits: complete audit trail, temporal queries (state at any point in time), event replay, debugging. Drawbacks: event schema evolution, query complexity (need snapshots), learning curve.'),
d('CQRS (Command Query Responsibility Segregation)','Separate models for writes (commands) and reads (queries). Write model: validates and persists events (event store). Read model: denormalized projections optimized for queries (materialized views, Elasticsearch). Sync via events. Benefits: optimized read/write independently, scale separately.'),
d('Event Processing Patterns','Simple: consumer processes event immediately. Windowed: aggregate events over time (count per min). Pattern matching: detect sequences (fraud detection). Enrichment: combine with other data. Split: fan-out to multiple consumers. Filter: route based on event attributes.')
],
'Use EDA for loosely coupled, scalable systems. Prefer Kafka for high-throughput event streaming. Event sourcing with CQRS for systems needing audit trails (financial, compliance). Be aware of eventual consistency — not suitable for transactions requiring immediate consistency. Monitor event processing lag.',
[
q('What is event-driven architecture?','Services communicate via events — producers publish, consumers react. Loose coupling.'),
q('Event-driven vs request-driven?','EDA: async, decoupled, eventual consistency. Request-driven: sync, coupled, strong consistency.'),
q('What is event sourcing?','Store all state changes as append-only event log — current state from replaying events.'),
q('What is CQRS?','Separate read and write models — commands (writes) vs queries (reads).'),
q('What is an event bus?','The backbone/broker connecting producers and consumers (Kafka, EventBridge).'),
q('What are benefits of EDA?','Loose coupling, scalability, real-time processing, audit trail, extensibility.'),
q('What are challenges?','Eventual consistency, debugging complexity, event schema evolution, duplicate events.'),
q('What is an idempotent consumer?','Processing same event twice has same effect. Critical for at-least-once delivery.'),
q('What is event replay?','Re-processing historical events to rebuild state or debug.'),
q('What is exactly-once processing?','Each event processed exactly once. Requires idempotent producer + consumer + transactional broker.')
],
R(10,35,100,25,'#0070f3','','Producer','Service A')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Event Bus','Kafka/EventBridge')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,80,25,'#ffc107','','Consumer','Service X')+
R(100,70,80,25,'#dc3545','','Consumer','Service Y')+
R(190,70,80,25,'#e83e8c','','Consumer','Service Z')+
R(10,105,100,25,'#6610f2','','Event Store','Persist all events')+
R(150,105,100,25,'#17a2b8','','Event Stream','Ordered log')+
R(290,35,190,155,'#17a2b8','','Event-Driven','Producers → Event Bus → Consumers. Loose coupling, eventual consistency. Event Sourcing + CQRS.'),
T(240,220,'Event-Driven: Producers publish events to bus. Consumers react. Loose coupling, eventual consistency, event sourcing.',9,'#666','middle'),
[
e('Event Producer and Consumer','Kafka event publishing.',codeBlock([
'// Producer — publishes order events',
'class OrderService {',
'  async createOrder(data) {',
'    const order = await db.query("INSERT INTO orders ... RETURNING *");',
'    const event = {',
'      eventType: "OrderCreated",',
'      timestamp: new Date().toISOString(),',
'      data: { orderId: order.id, userId: data.userId, amount: data.total, items: data.items },',
'      metadata: { version: 1, correlationId: crypto.randomUUID() },',
'    };',
'    await kafkaProducer.send({ topic: "order-events", messages: [{ key: String(order.id), value: JSON.stringify(event) }] });',
'    return order;',
'  }',
'}',
'// Consumer — reacts to order events',
'const consumer = kafka.consumer({ groupId: "inventory-group" });',
'await consumer.run({ eachMessage: async ({ message }) => {',
'  const event = JSON.parse(message.value.toString());',
'  if (event.eventType === "OrderCreated") {',
'    await inventoryService.reserveStock(event.data.items);',
'  }',
'}});'
]),'Event producer and consumer with Kafka — loose coupling through events.'),
e('Event Sourcing with PostgreSQL','Events as source of truth.',codeBlock([
'-- Events table',
'CREATE TABLE events (',
'  id BIGSERIAL PRIMARY KEY,',
'  aggregate_type VARCHAR(50) NOT NULL,  -- "order"',
'  aggregate_id VARCHAR(50) NOT NULL,    -- "order-123"',
'  event_type VARCHAR(50) NOT NULL,      -- "OrderCreated"',
'  event_data JSONB NOT NULL,',
'  version INT NOT NULL,',
'  created_at TIMESTAMP DEFAULT NOW(),',
'  UNIQUE(aggregate_type, aggregate_id, version)',
');',
'-- Append event',
'INSERT INTO events (aggregate_type, aggregate_id, event_type, event_data, version)',
'VALUES ("order", "order-123", "OrderCreated", \'{"userId":42,"amount":99.99}\', 1);',
'-- Rebuild state',
'SELECT event_data FROM events WHERE aggregate_type="order" AND aggregate_id="order-123" ORDER BY version;'
]),'Event sourcing with PostgreSQL — events as source of truth.'),
e('CQRS with Separate Read/Write','Separate read model.',codeBlock([
'// Write model (Command)',
'class OrderCommandHandler {',
'  async createOrder(command) {',
'    // Validate and emit event',
'    const event = { type: "OrderCreated", orderId: command.id, userId: command.userId, amount: command.amount, items: command.items };',
'    await eventStore.append("order", command.id, event);',
'    await eventBus.publish("order-events", event);',
'  }',
'}',
'// Read model (Query) — updated by event consumer',
'class OrderReadModel {',
'  constructor() {',
'    eventBus.subscribe("order-events", async (event) => {',
'      if (event.type === "OrderCreated") {',
'        await db.query("INSERT INTO order_summary (id, user_id, amount, item_count, status) VALUES ($1,$2,$3,$4,$5)",',
'          [event.orderId, event.userId, event.amount, event.items.length, "pending"]);',
'      }',
'    });',
'  }',
'  async getOrders(userId) {',
'    return db.query("SELECT * FROM order_summary WHERE user_id=$1", [userId]);',
'  }',
'}'
]),'CQRS: separate command (write) and query (read) models, synced via events.'),
e('Idempotent Event Consumer','Handle duplicates safely.',codeBlock([
'async function handleEvent(event) {',
'  // Check if already processed (idempotency key)',
'  const processed = await redis.setnx("processed:" + event.id, "1", "EX", 86400);',
'  if (!processed) return; // already processed, skip',
'  // Process event',
'  try {',
'    if (event.type === "PaymentReceived") {',
'      await db.query("UPDATE orders SET status=$1 WHERE id=$2", ["paid", event.orderId]);',
'    }',
'  } catch (err) {',
'    // Release lock on failure — will retry',
'    await redis.del("processed:" + event.id);',
'    throw err;',
'  }',
'}'
]),'Idempotent consumer — prevents duplicate event processing.')
],
[
m('EDA provides?',['Tight coupling','Loose coupling','Synchronous calls','Strong consistency'],1,'Loose coupling via asynchronous events.'),
m('Event sourcing stores?',['Current state only','All state changes as event log','Only errors','Aggregated data'],1,'Append-only log of all state changes.'),
m('CQRS separates?',['Frontend and backend','Read and write models','Database and cache','Producer and consumer'],1,'Separate read (query) and write (command) models.'),
m('Kafka is commonly used as?',['Database','Event bus/broker','Load balancer','Web server'],1,'Event bus/broker for event-driven architectures.'),
m('Main challenge in EDA?',['Performance','Eventual consistency','Storage','Documentation'],1,'Eventual consistency — data may be stale for a period.'),
m('Idempotent consumer prevents?',['Slow processing','Duplicate processing','Memory leaks','Data loss'],1,'Idempotency prevents duplicate event processing issues.')
]
);

/* ==== TOPIC 12: CAP Theorem ==== */
addTopic('sd-cap-theorem','CAP Theorem','advanced',15,
['CAP Theorem states a distributed data system can only provide two of three guarantees: Consistency, Availability, and Partition Tolerance.',
'Consistency (C): all nodes see the same data at the same time. A read returns the most recent write from any node.',
'Availability (A): every request gets a non-error response (without guarantee it contains the latest write). Every node that is not failing serves requests.',
'Partition Tolerance (P): the system continues operating despite network partitions (messages lost or delayed between nodes). In distributed systems, partitions are inevitable — so P is required, meaning you choose between CP and AP.',
'CP systems (Consistency + Partition Tolerance): block writes during partitions, ensure consistency. Examples: HBase, MongoDB (default), Zookeeper, etcd. AP systems (Availability + Partition Tolerance): accept writes during partitions, eventual consistency. Examples: Cassandra, DynamoDB, CouchDB, DNS.',
'PACELC extension: if Partition (P), trade-off between C and A. Else (E — Else), trade-off between Latency (L) and Consistency (C).'
],
'CAP Theorem is like a two-way radio conversation between two people. If the connection breaks (partition), you have a choice: Keep talking (Availability — but other person doesn\'t hear you) or Wait silently until reconnection (Consistency — but nobody can communicate). On the internet, connections break all the time (partitions happen), so you must choose: CP (wait) or AP (keep going, reconcile later).',
[
d('Consistency in CAP','Linearizability: all operations appear atomic, instantaneous, and ordered. After a write completes, all subsequent reads (from any node) return that value. Implemented via quorum (majority confirms) or leader-based replication. Strong consistency costs: higher write latency, reduced availability during partitions.'),
d('Availability in CAP','Every non-failing node serves every request immediately, without guarantee of latest data. Gossip-based protocols (Cassandra), multi-leader (DynamoDB). Eventual consistency: if no new writes, all nodes eventually converge. AP systems provide high write throughput and resilience.'),
d('CAP in Practice','CP systems (HBase, ZK, etcd): during partition, non-quorum nodes reject writes to maintain consistency. Used for coordination, metadata, configuration. AP systems (Cassandra, DynamoDB): accept writes from any node, resolve conflicts via last-write-wins or CRDTs. Used for high-volume, geo-distributed, user-facing apps.'),
d('PACELC Extension','If Partition (P): trade-off C vs A. Else (E — normal operation): trade-off Latency (L) vs Consistency (C). DynamoDB: PA/EL (prefers A over C during partition, L over C normally). MongoDB: PC/EC (prefers consistency, strong consistency by default). Most NoSQL databases choose PA/EL pattern.')
],
'CAP is often misunderstood: you choose between CP and AP because P is non-negotiable in distributed systems. In practice: use CP for metadata/config (Zookeeper, etcd) and AP for user-facing data (Cassandra, DynamoDB). Understand what consistency your application truly needs — most don\'t need strong consistency for all operations.',
[
q('What is CAP Theorem?','Distributed system can only provide 2 of 3: Consistency, Availability, Partition Tolerance.'),
q('Why is Partition Tolerance required?','Network partitions are inevitable in distributed systems — you must handle them.'),
q('What is Consistency in CAP?','All nodes see same data at same time — linearizable reads.'),
q('What is Availability in CAP?','Every request gets a response, not necessarily the latest data.'),
q('CP system example?','HBase, Zookeeper, etcd, MongoDB (default).'),
q('AP system example?','Cassandra, DynamoDB, CouchDB, DNS.'),
q('What is PACELC?','Extension: if Partition → C vs A. Else → Latency vs Consistency.'),
q('What is eventual consistency?','If no new writes, all nodes will eventually agree on data — AP property.'),
q('What is linearizability?','Strongest consistency model — all operations appear atomic and instantaneous.'),
q('Can you have CA in distributed systems?','No — if you don\'t choose P, you can\'t handle partitions, which means you\'re not truly distributed.'),
],
R(10,35,100,25,'#0070f3','','CP','HBase, ZK, etcd')+
R(10,70,100,25,'#28a745','','Consistent','+ Partition')+
R(10,105,100,25,'#ffc107','','Use for','Config, metadata')+
R(160,35,100,25,'#dc3545','','AP','Cassandra, Dynamo')+
R(160,70,100,25,'#e83e8c','','Available','+ Partition')+
R(160,105,100,25,'#6610f2','','Use for','User-facing, geo')+
R(290,35,190,155,'#17a2b8','','CAP Theorem','Pick CP or AP (P is required). CP: consistent, blocked during partition. AP: always available, eventual consistency.'),
T(240,220,'CAP Theorem: Choose CP (Consistency) or AP (Availability). P is required in distributed systems.',9,'#666','middle'),
[
e('CP System: Zookeeper Write','Maintain consistency.',codeBlock([
'// Zookeeper — CP system',
'// Writes need majority (quorum) to succeed',
'ZK client sends write to leader',
'Leader broadcasts to all followers',
'Waits for majority acknowledgement (quorum)',
'Commits write and responds to client',
'// If partition splits 3 nodes into 2+1:',
'// The 2-node side has majority — still works',
'// The 1-node side loses quorum — rejects writes',
'// This ensures consistency (no split-brain)'
]),'Zookeeper CP behavior — requires quorum for writes.'),
e('AP System: DynamoDB Write','Always available.',codeBlock([
'// DynamoDB — AP system',
'// Write can go to any node',
'async function dynamoWrite() {',
'  await dynamo.putItem({',
'    TableName: "Orders",',
'    Item: { orderId: "123", status: "paid", amount: 99.99 },',
'    // Default: eventual consistency',
'    // For strong consistency reads:',
'    ConsistentRead: false,', // true = CP behavior
'  }).promise();',
'}',
'// During partition, write succeeds on available nodes',
'// Conflicts resolved via last-writer-wins (timestamp)',
'// After partition heals, reconciliation reconciles',
'// Read may return stale data (eventual consistency)'
]),'DynamoDB AP behavior — writes always succeed, eventual consistency.'),
e('Quorum-Based Read/Write Tuning','Tune consistency level.',codeBlock([
'// N = replication factor, W = write quorum, R = read quorum',
'// Strong consistency: W + R > N',
'// Example: N=3, W=2, R=2 → strong (2+2 > 3)',
'// Default Cassandra: N=3, W=1, R=1 → eventual',
'// Tune per operation:',
'const query = {',
'  consistency: "QUORUM", // W or R = majority',
'  // consistency: "ONE" (fast, eventual),',
'  // consistency: "ALL" (slow, strong),',
'  // consistency: "ANY" (fastest, may lose)',
'};',
'// Cassandra: QUORUM = (N/2)+1 = 2 of 3',
'// Strong consistency: use QUORUM for both reads and writes'
]),'Quorum-based consistency tuning — W+R > N for strong consistency.')
],
[
m('P stands for?',['Performance','Partition Tolerance','Parallel','Persistence'],1,'Partition Tolerance — network may fail.'),
m('Why is P required?',['It\'s optional','Network partitions happen','Faster performance','Easier to implement'],1,'Partitions are inevitable in distributed systems.'),
m('CP means: during partition',['System is available','Writes may be blocked','All requests succeed','Data is lost'],1,'CP blocks non-quorum writes during partition.'),
m('AP means: during partition',['System accepts writes','System blocks writes','Consistency guaranteed','Partition avoided'],1,'AP accepts writes from any node.'),
m('DynamoDB is?',['CP','AP','CA','P'],1,'DynamoDB is an AP system (eventual consistency).'),
m('Zookeeper is?',['CP','AP','CA','P'],0,'Zookeeper is a CP system (strong consistency).')
]
);

/* ==== TOPIC 13: Consistency Patterns ==== */
addTopic('sd-consistency-patterns','Consistency Patterns','advanced',20,
['Consistency patterns define how and when data changes become visible across distributed nodes — balancing correctness and performance.',
'Strong consistency: after a write, all subsequent reads (from any node) return the updated value. High correctness, lower availability during partitions. Used for financial systems, user accounts.',
'Eventual consistency: if no new writes, all nodes eventually converge. High availability, low latency. Used for social feeds, product catalogs, DNS.',
'Weak consistency: no guarantee of subsequent reads returning updated value. Used for real-time apps (gaming positions), leaderboards, where latest value isn\'t critical.',
'Read-after-write (read-your-writes): after writing, the same client always sees their own write. Important for UX — users should see their submitted data.'
],
'Consistency patterns are like group messaging. Strong consistency = everyone sees messages in the exact order sent, but if someone\'s phone is offline, nobody can send new messages (blocked). Eventual consistency = messages may appear in different orders for different people but eventually everyone agrees. Read-after-write = you always see your own messages immediately, even if others don\'t yet.',
[
d('Strong Consistency (Linearizability)','All operations appear atomic and instantaneous. After write completes, any subsequent read returns that value. Implemented via: single leader with synchronous replication, quorum (W+R > N), or distributed consensus (Paxos/Raft). Used in: Zookeeper, etcd, Spanner. Trade-off: higher latency, reduced availability.'),
d('Eventual Consistency','Given enough time without new updates, all replicas converge to same value. Popular in AP systems (Cassandra, DynamoDB, DNS). Convergence via: gossip protocols, vector clocks, CRDTs. Replica lag depends on network, load, and topology. Many apps function well with eventual consistency — especially read-heavy, user-specific data.'),
d('Consistency Levels in Practice','Cassandra: ONE (fast, eventual), QUORUM (strong with N=3,W=2,R=2), ALL (slowest). DynamoDB: eventual (default), strong (ConsistentRead=true). MongoDB: primary reads (strong), secondary reads (eventual). PostgreSQL: synchronous commit (strong), asynchronous (eventual, lag).'),
d('Consensus Algorithms (Paxos/Raft)','Achieve strong consistency in distributed systems despite failures. Raft: leader-based, term-based. Nodes elect a leader, leader handles all writes, replicates log to followers. Majority (quorum) needed. Used in: etcd (Raft), Zookeeper (Zab — similar to Paxos). Provides safety and liveness.')
],
'Choose consistency based on business requirements. Financial, auth, inventory need strong consistency. User profiles, product data, activity feeds work with eventual consistency. Use read-after-write as minimum UX guarantee. Use conditional writes (optimistic locking) for conflict detection in eventually consistent systems.',
[
q('What is strong consistency?','All nodes return the most recent write. Reads are linearizable.'),
q('What is eventual consistency?','Nodes eventually converge. Reads may return stale data temporarily.'),
q('What is read-after-write?','User always sees their own writes immediately.'),
q('What is a quorum?','Minimum number of nodes that must agree for a read/write to succeed.'),
q('What is Raft?','Consensus algorithm for achieving strong consistency with a leader and log replication.'),
q('What is a CRDT?','Conflict-free Replicated Data Type — data structure that converges without coordination.'),
q('Which pattern for financial systems?','Strong consistency — money must not disappear or double-spend.'),
q('Which pattern for social feeds?','Eventual consistency — stale feed is acceptable, availability is priority.'),
q('What is session consistency?','Read-your-writes within a session. After write, reads within same session see it.'),
q('What is monotonic read consistency?','If a process reads a value, subsequent reads never return older values.')
],
R(10,35,100,25,'#0070f3','','Write','Client')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Leader','Primary')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,80,25,'#ffc107','','Sync Repl','Strong')+
R(100,70,80,25,'#dc3545','','Async Repl','Eventual')+
R(10,105,100,25,'#e83e8c','','Quorum','W+R > N')+
R(150,105,100,25,'#6610f2','','Read','Client')+
R(290,35,190,155,'#17a2b8','','Consistency Patterns','Strong (linearizable) vs Eventual. Quorum, Raft, CRDTs. Choose by business need: financial=strong, feeds=eventual.'),
T(240,220,'Consistency: Strong (linearizable) vs Eventual. Quorum, Raft consensus. Choose by business requirements.',9,'#666','middle'),
[
e('Cassandra Consistency Tuning','Per-query consistency level.',codeBlock([
'// Cassandra — tune per operation',
'const query = "SELECT * FROM users WHERE user_id = ?";',
'const params = ["user123"];',
'// Strong consistency',
'client.execute(query, params, { consistency: types.consistencies.QUORUM });',
'// Eventual consistency (default)',
'client.execute(query, params, { consistency: types.consistencies.ONE });',
'// Tuning formula:',
'// N = replication_factor, W = write_quorum, R = read_quorum',
'// Strong: W + R > N (e.g., N=3, W=2, R=2 → 4 > 3)',
'// Write quorum = majority: floor(N/2) + 1 = 2 of 3',
'// LOCAL_QUORUM for multi-DC (doesn\'t cross DCs)'
]),'Cassandra per-query consistency level tuning.'),
e('Conditional Update with DynamoDB','Optimistic locking.',codeBlock([
'// Conditional write — prevents overwrite conflicts',
'async function updateOrder(orderId, expectedVersion, newStatus) {',
'  try {',
'    await dynamo.updateItem({',
'      TableName: "Orders",',
'      Key: { orderId },',
'      UpdateExpression: "SET #status = :status, version = :newVer",',
'      ConditionExpression: "version = :expectedVer",',
'      ExpressionAttributeNames: { "#status": "status" },',
'      ExpressionAttributeValues: {',
'        ":status": newStatus, ":expectedVer": expectedVersion, ":newVer": expectedVersion + 1',
'      },',
'    }).promise();',
'  } catch (err) {',
'    if (err.code === "ConditionalCheckFailedException") {',
'      throw new Error("Conflict — someone else modified the order");',
'    }',
'  }',
'}'
]),'Conditional update for optimistic concurrency control in DynamoDB.'),
e('Raft Consensus (etcd)','Distributed consensus.',codeBlock([
'# etcd — Raft-based strongly consistent KV store',
'# Write: requires majority',
'etcdctl put /config/database_url "postgres://primary:5432"',
'# Read: linearized (strong)',
'etcdctl get --consistency linearizable /config/database_url',
'# Watch for changes',
'etcdctl watch /config/',
'# Lease (TTL-based key)',
'etcdctl lease grant 60',
'etcdctl put --lease=694d65575a5a5 /lock/service-a ""',
'# Leader election',
'# etcd provides leader election via keys with TTL'
]),'etcd Raft-based strongly consistent key-value store.'),
e('CRDT Example (State-based Counter)','Conflict-free counter.',codeBlock([
'// CRDT: Grow-Only Counter (G-Counter)',
'class GCounter {',
'  constructor(nodeId, state = {}) {',
'    this.nodeId = nodeId;',
'    this.state = state; // { nodeId: count }',
'  }',
'  increment() {',
'    this.state[this.nodeId] = (this.state[this.nodeId] || 0) + 1;',
'  }',
'  value() {',
'    return Object.values(this.state).reduce((a, b) => a + b, 0);',
'  }',
'  merge(other) {',
'    const merged = { ...this.state };',
'    for (const [node, count] of Object.entries(other.state)) {',
'      merged[node] = Math.max(merged[node] || 0, count); // max merges',
'    }',
'    return new GCounter(this.nodeId, merged);',
'  }',
'}'
]),'CRDT example: G-Counter that converges without coordination.')
],
[
m('Strong consistency guarantees?',['Fast reads','Latest write visible to all','Low latency','High availability'],1,'All reads return the most recent write.'),
m('Eventual consistency suitable for?',['Financial systems','Social feeds','User accounts','Auth tokens'],1,'Social feeds — stale data temporarily OK.'),
m('Quorum formula for strong?',['W+R = N','W+R > N','W+R < N','W = R'],1,'W + R > N ensures strong consistency.'),
m('Raft consensus uses?',['Leader and log replication','Gossip protocol','Vector clocks','Quorum only'],0,'Raft uses leader election and replicated log.'),
m('CRDTs provide?',['Strong consistency','Conflict-free convergence','Linearizability','Partition tolerance'],1,'CRDTs converge without conflict resolution.'),
m('DynamoDB default read is?',['Strong','Eventual','Snapshot','Read-after-write'],1,'DynamoDB defaults to eventual consistency.')
]
);

/* ==== TOPIC 14: Bloom Filters ==== */
addTopic('sd-bloom-filters','Bloom Filters','advanced',15,
['A Bloom filter is a space-efficient probabilistic data structure that tests whether an element is a member of a set. Can have false positives but never false negatives.',
'Works by: element is hashed by K hash functions, each setting a bit in a bit array of size M. Query: if any bit is 0, element is definitely NOT in set. If all bits are 1, element MAY be in set (false positive possible).',
'Parameters: M (bit array size), K (number of hash functions), N (expected elements). False positive rate = (1 - e^(-KN/M))^K. More bits = lower rate. Optimal K = (M/N) * ln(2).',
'Cannot delete elements (would clear bits used by other elements). Counting Bloom Filters add counters (not bits) to support deletion.',
'Used for: cache penetration prevention, spell checkers, URL deduplication (web crawlers), blockchain nodes (SPV), weak password detection, database query filtering.'
],
'A Bloom filter is like a hotel\'s "wanted list" clipboard at the front desk. If a name is on the list, the person might be wanted (false positive possible — someone with similar name). If a name is NOT on the list, the person is definitely not wanted (no false negatives). The list is much smaller than a full police database and very fast to check.',
[
d('How Bloom Filters Work','Initialize M-bit array to 0. Add element: hash with K hash functions, set bits at hash positions to 1. Query: hash with same K functions, check bits. All 1 → maybe present (FP). Any 0 → definitely absent. False positive rate: ~1% with M = 10*N, K = 7. Cannot remove.'),
d('Bloom Filter Parameters','M = bit array size (bigger = lower FP rate). N = expected number of elements. K = number of hash functions (optimal = ln(2) * M/N). FP rate = (1 - e^(-KN/M))^K. For 1% FP rate: M/N ≈ 10 bits per element, K ≈ 7. For 0.1%: M/N ≈ 14, K ≈ 10.'),
d('Use Case: Cache Penetration Prevention','Problem: malicious requests for non-existent keys hit DB every time (cache never populated). Solution: Bloom filter before cache check. If key not in Bloom filter → return immediately (definitely not in DB). If key in Bloom filter → check cache/DB normally (might be there). Reduces DB load from cache misses.'),
d('Scalable Bloom Filters','Standard Bloom filter requires knowing N upfront. Scalable Bloom Filters: start with small filter. When FP rate approaches threshold, add a new, larger filter. Query checks all filters. New elements go into newest filter. Trade-off: more memory, slower queries (check all filters).')
],
'Use Bloom filters when: space efficiency is critical, false positives are acceptable (but false negatives are not), and you know the approximate N. Common for cache protection, deduplication, and filtering. For 1% FP rate, allocate ~10 bits per element. Use counting variant if deletion needed.',
[
q('What is a Bloom filter?','Space-efficient probabilistic data structure for set membership. False positives possible, no false negatives.'),
q('What does a Bloom filter guarantee?','If it says NO — element is definitely not in set. If it says YES — element may be in set (false positive possible).'),
q('What are the key parameters?','M (bit array size), K (hash functions), N (expected elements).'),
q('What is false positive rate?','Probability of reporting element in set when it\'s not. Controlled by M/N ratio.'),
q('Can you delete from a Bloom filter?','Standard Bloom: no. Counting Bloom: yes, with counters instead of bits.'),
q('What is cache penetration?','Requests for non-existent keys hitting DB. Bloom filter prevents this.'),
q('What is the optimal K?','K = ln(2) * M/N ≈ 0.7 * (bits per element).'),
q('What are common uses?','Cache protection, URL deduplication, spell checkers, weak password check, blockchain SPV.'),
q('What is a Scalable Bloom Filter?','Grows as elements are added — new filter created when FP rate exceeds threshold.'),
q('How many bits per element for 1% FP?','~10 bits per element gives ~1% false positive rate.')
],
R(10,35,100,25,'#0070f3','','Element x','Test')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Bloom Filter','M bits, K hashes')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','All bits 1?','Maybe present')+
R(160,70,100,25,'#dc3545','','Any bit 0?','Definitely NOT')+
R(10,105,100,25,'#e83e8c','','Hash 1','pos=42')+
R(10,130,100,25,'#6610f2','','Hash K','pos=17')+
R(160,105,100,25,'#17a2b8','','Return quickly','No DB hit')+
R(290,35,190,155,'#17a2b8','','Bloom Filter','Probabilistic membership. No false negatives, FP possible. M bits, K hashes. Cache penetration prevention.'),
T(240,220,'Bloom Filter: Space-efficient membership test. No false negatives, FP possible. Cache penetration prevention.',9,'#666','middle'),
[
e('Bloom Filter Implementation','Simple Bloom filter in Node.js.',codeBlock([
'class BloomFilter {',
'  constructor(size, hashCount) {',
'    this.size = size;',
'    this.hashCount = hashCount;',
'    this.bits = new BitSet(size);',
'  }',
'  _hash(item, seed) {',
'    const h = crypto.createHash("md5").update(item + seed).digest("hex");',
'    return parseInt(h.slice(0, 8), 16) % this.size;',
'  }',
'  add(item) {',
'    for (let i = 0; i < this.hashCount; i++) {',
'      this.bits.set(this._hash(item, i), 1);',
'    }',
'  }',
'  test(item) {',
'    for (let i = 0; i < this.hashCount; i++) {',
'      if (!this.bits.get(this._hash(item, i))) return false;',
'    }',
'    return true; // maybe present',
'  }',
'  // False positive rate: (1 - e^(-hashCount * count / size))^hashCount',
'}'
]),'Simple Bloom filter implementation with MD5-based hash.'),
e('Cache Penetration Prevention','Protect DB from cache misses.',codeBlock([
'class CacheProtection {',
'  constructor(bloomSize, expectedElements) {',
'    const optimalK = Math.round((bloomSize / expectedElements) * Math.LN2);',
'    this.bloom = new BloomFilter(bloomSize, optimalK);',
'    this.cache = new Map();',
'    this.db = new Database();',
'  }',
'  preloadBloom(keys) { keys.forEach(k => this.bloom.add(k)); }',
'  async get(key) {',
'    // Step 1: Bloom filter check',
'    if (!this.bloom.test(key)) return null; // definitely not in DB',
'    // Step 2: Check cache',
'    if (this.cache.has(key)) return this.cache.get(key);',
'    // Step 3: Query DB',
'    const value = await this.db.query(key);',
'    if (value) this.cache.set(key, value);',
'    return value;',
'  }',
'}'
]),'Bloom filter prevents cache penetration — blocks non-existent key lookups before they hit DB.'),
e('Counting Bloom Filter for Deletion','With counter support.',codeBlock([
'class CountingBloomFilter {',
'  constructor(size, hashCount) {',
'    this.size = size;',
'    this.hashCount = hashCount;',
'    this.counters = new Uint8Array(size);',
'  }',
'  add(item) {',
'    for (let i = 0; i < this.hashCount; i++) {',
'      const pos = this._hash(item, i);',
'      if (this.counters[pos] < 255) this.counters[pos]++;',
'    }',
'  }',
'  remove(item) {',
'    for (let i = 0; i < this.hashCount; i++) {',
'      const pos = this._hash(item, i);',
'      if (this.counters[pos] > 0) this.counters[pos]--;',
'    }',
'  }',
'  test(item) {',
'    for (let i = 0; i < this.hashCount; i++) {',
'      if (this.counters[this._hash(item, i)] === 0) return false;',
'    }',
'    return true;',
'  }',
'}'
]),'Counting Bloom filter with counters supporting deletion.'),
e('Scalable Bloom Filter','Grow as needed.',codeBlock([
'class ScalableBloomFilter {',
'  constructor(initialSize, scaleFactor = 2, fpRate = 0.01) {',
'    this.filters = [new BloomFilter(initialSize, optimalK(initialSize, initialSize))];',
'    this.scaleFactor = scaleFactor;',
'    this.fpRate = fpRate;',
'    this.count = 0;',
'  }',
'  add(item) {',
'    const current = this.filters[this.filters.length - 1];',
'    current.add(item); this.count++;',
'    // Check if FP rate would exceed threshold',
'    const fp = Math.pow(1 - Math.exp(-current.hashCount * this.count / current.size), current.hashCount);',
'    if (fp > this.fpRate) {',
'      // Add new larger filter',
'      const newSize = current.size * this.scaleFactor;',
'      this.filters.push(new BloomFilter(newSize, optimalK(newSize, newSize)));',
'      this.count = 0;',
'    }',
'  }',
'  test(item) {',
'    return this.filters.some(f => f.test(item));',
'  }',
'}'
]),'Scalable Bloom filter that grows as elements are added.')
],
[
m('Bloom filter false positive?',['Possible','Impossible','Always','Depends'],0,'False positives are possible, false negatives are not.'),
m('False negative in Bloom filter?',['Possible','Impossible','Common','Depends on size'],1,'No false negatives — if filter says NO, element is definitely absent.'),
m('What does K represent?',['Bits per element','Number of hash functions','Filter size','Element count'],1,'K = number of hash functions.'),
m('Optimal K formula?',['K = M/N','K = ln(2) * M/N','K = N/M','K = M * N'],1,'Optimal K ≈ 0.7 * (bits per element).'),
m('What is counting Bloom filter for?',['Faster queries','Deletion support','Smaller size','Better hashing'],1,'Counters enable element deletion.'),
m('How many bits for 1% FP?',['~5 bits/element','~10 bits/element','~20 bits/element','~50 bits/element'],1,'~10 bits per element for ~1% false positive rate.')
]
);

/* ==== TOPIC 15: Consistent Hashing ==== */
addTopic('sd-consistent-hashing','Consistent Hashing','advanced',20,
['Consistent hashing is a distributed hashing scheme that minimizes data movement when the number of nodes changes — each node handles a range of the hash space.',
'Hash space (e.g., 0 to 2^32-1) arranged as a ring. Nodes are placed on the ring by hashing their identifier. Keys belong to the nearest node clockwise.',
'When a node is added/removed, only keys in the affected range need to move — not all keys. Standard modulo hashing (hash % N) moves almost all keys when N changes.',
'Virtual nodes: each physical node maps to multiple positions on the ring. Better load distribution — handles heterogeneous node capacities and reduces hot spots.',
'Used in: Cassandra, DynamoDB, Riak, Discord, Akamai CDN, distributed caching (Memcached).'
],
'Consistent hashing is like a carousel at a restaurant with multiple chefs. Each chef (node) is responsible for a section of the carousel. When a chef leaves, only their section needs reassignment — neighbors cover it. With standard hashing, if a chef leaves, ALL the food would need to be reassigned to new positions.',
[
d('The Ring','Hash space: 0 to 2^32-1 (or large number) arranged in a ring. Node placement: hash(node_id) → position on ring. Key placement: hash(key) → position on ring → walk clockwise to first node. Each node responsible for range from previous node to itself. Consistent hashing with virtual nodes is the standard approach.'),
d('Adding/Removing Nodes','Add node: hash new node → place on ring. Keys from neighboring node in the counter-clockwise range get reassigned. Only that range moves. Remove node: keys reassigned to next node clockwise. Minimal disruption — only 1/N of keys move on average (vs all keys with modulo hashing).'),
d('Virtual Nodes (VNodes)','Each physical node maps to V virtual positions on the ring (e.g., 100-200 per node). Benefits: better load distribution (each node covers many small ranges), handles heterogeneous capacity (powerful nodes get more vnodes), faster rebalancing (smaller units of movement). Cassandra uses 256 vnodes per node by default.'),
d('Applications','Cassandra: vnodes for data distribution, token ranges. DynamoDB: consistent hashing for partition distribution. CDNs: assign content to edge servers. Distributed caching: Memcached ring for cache key distribution. Discord: sharding with consistent hashing for guild data.')
],
'Use consistent hashing when you need to distribute data across nodes that may change over time. Always use virtual nodes for better distribution. Standard modulo hashing is fine for fixed clusters. Consistent hashing is essential for elastic scaling (auto-scaling, node failures).',
[
q('What is consistent hashing?','Distributed hashing scheme where each node handles a range of hash space. Minimizes data movement on node changes.'),
q('How does the ring work?','Hash space as a ring (0→2^32-1). Nodes and keys placed by hash. Keys belong to nearest clockwise node.'),
q('What happens when a node is removed?','Only keys in that node\'s range reassign to next node. 1/N of keys move (vs all with modulo).'),
q('What are virtual nodes?','Each physical node maps to multiple positions on ring — better distribution, handles capacity differences.'),
q('How is consistent hashing different from modulo?','Modulo (hash % N): N changes → almost all keys remap. Consistent hashing: only 1/N remap.'),
q('What systems use consistent hashing?','Cassandra, DynamoDB, Riak, Discord, Akamai CDN, distributed caches.'),
q('What is a hot spot in consistent hashing?','Node responsible for popular data — receives disproportionate load. Fixed with virtual nodes.'),
q('How many vnodes per Cassandra node?','Default 256 vnodes per physical node.'),
q('What hash function is typically used?','MD5 or SHA-1 hashed to an integer in the ring space (0 to 2^127 or 2^160).'),
q('What is load balancing with consistent hashing?','Same keys always go to same nodes → cache locality, query optimization.')
],
R(10,35,100,25,'#0070f3','','Node A','hash(A)=100')+
R(120,35,100,25,'#28a745','','Node B','hash(B)=300')+
R(230,35,100,25,'#dc3545','','Node C','hash(C)=500')+
A(100,48,120,48)+A(200,48,230,48)+
R(10,70,100,25,'#ffc107','','Key X','hash(X)=200')+
A(55,83,55,95)+
R(120,70,100,25,'#e83e8c','','Key Y','hash(Y)=450')+
A(165,83,165,95)+
R(10,105,100,25,'#6610f2','','Ring','0 → 2^32-1')+
R(120,105,100,25,'#17a2b8','','VNodes','Multiple per node')+
R(290,35,190,155,'#17a2b8','','Consistent Hashing','Ring-based hashing. Only 1/N keys move on node change. VNodes for distribution. Used in Cassandra, DynamoDB, CDNs.'),
T(240,220,'Consistent Hashing: Ring-based hashing minimizes data movement on node changes. VNodes for even distribution.',9,'#666','middle'),
[
e('Consistent Hashing Implementation','Ring with virtual nodes.',codeBlock([
'class ConsistentHashRing {',
'  constructor(vnodes = 150) {',
'    this.vnodes = vnodes;',
'    this.ring = new Map(); // position -> nodeId',
'    this.sortedPositions = [];',
'  }',
'  addNode(nodeId, weight = 1) {',
'    const numVnodes = this.vnodes * weight;',
'    for (let i = 0; i < numVnodes; i++) {',
'      const pos = this._hash(nodeId + ":" + i);',
'      this.ring.set(pos, nodeId);',
'      this.sortedPositions.push(pos);',
'    }',
'    this.sortedPositions.sort((a, b) => a - b);',
'  }',
'  removeNode(nodeId) {',
'    for (let i = 0; i < this.vnodes; i++) {',
'      const pos = this._hash(nodeId + ":" + i);',
'      this.ring.delete(pos);',
'    }',
'    this.sortedPositions = this.sortedPositions.filter(p => this.ring.has(p));',
'  }',
'  getNode(key) {',
'    const hash = this._hash(key);',
'    const pos = this.sortedPositions.find(p => p >= hash) || this.sortedPositions[0];',
'    return this.ring.get(pos);',
'  }',
'  _hash(key) {',
'    const h = crypto.createHash("md5").update(key).digest();',
'    return h.readUInt32BE(0);',
'  }',
'}'
]),'Consistent hashing ring with virtual nodes for distribution.'),
e('Cassandra VNode Configuration','256 vnodes per node.',codeBlock([
'# cassandra.yaml — vnode configuration',
'# Number of tokens (vnodes) per node',
'num_tokens: 256',
'# Or manually specify token ranges:',
'initial_token: 0, 56713727820156410577229101238628035242, 113427455640312821154458202477256070484...',
'# Each token represents a range on the ring',
'# With 256 vnodes:',
'# - Better load distribution',
'# - Faster bootstrap (only 1/256 of data moves)',
'# - Heterogeneous capacity: powerful nodes get more tokens',
'# nodetool status shows token ownership'
]),'Cassandra virtual node (vnode) configuration.'),
e('Distributed Cache with Consistent Hashing','Cache key distribution.',codeBlock([
'const ring = new ConsistentHashRing(100);',
'ring.addNode("cache1.example.com");',
'ring.addNode("cache2.example.com");',
'ring.addNode("cache3.example.com");',
'async function cacheGet(key) {',
'  const node = ring.getNode(key); // which cache server',
'  const client = redisClients[node];',
'  const value = await client.get(key);',
'  return value;',
'}',
'// Benefits:',
'// - Same key always goes to same cache node',
'// - When cache1 fails, only its keys redistribute',
'// - Other cache nodes keep working, cache hit ratio preserved for most keys'
]),'Distributed cache using consistent hashing for key placement.'),
e('Load Distribution Comparison','Modulo vs Consistent Hashing.',codeBlock([
'// Modulo hashing: hash(key) % N',
'// When N changes from 3 to 4:',
'// Key A: hash=5, 5%3=2, 5%4=1 → MOVED',
'// Key B: hash=7, 7%3=1, 7%4=3 → MOVED',
'// Key C: hash=9, 9%3=0, 9%4=1 → MOVED',
'// All 3 keys move! 100% redistribution',
'// Consistent hashing:',
'// Keys on ring, nodes on ring',
'// When node added, only 1/4 of keys move (~25%)',
'// Average: 1/N of keys redistribute (vs 100% for modulo)',
'// With vnodes: rebalancing is smoother'
]),'Modulo hashing moves ALL keys on N change; consistent hashing moves only 1/N.')
],
[
m('What does consistent hashing minimize?',['Query time','Data movement on node change','Storage usage','Network traffic'],1,'Only 1/N of keys move when N changes.'),
m('What happens when a node is removed?',['All keys fail','Only its range reassigns','All keys reassign','System pauses'],1,'Only keys in that range reassign to next node.'),
m('Virtual nodes improve?',['Security','Load distribution','Latency','Consistency'],1,'VNodes distribute load evenly across physical nodes.'),
m('Modulo hashing: when N changes?',['1/N keys move','All keys move','No keys move','Half keys move'],1,'Almost all keys move with modulo hashing.'),
m('Where is consistent hashing used?',['PostgreSQL','Cassandra and DynamoDB','Redis single node','MySQL'],1,'Cassandra, DynamoDB, Riak use consistent hashing.'),
m('What are vnodes?',['Virtual machines','Virtual positions on ring for each node','Voting nodes','Vector nodes'],1,'Each physical node maps to multiple positions on the ring.')
]
);

/* ==== TOPIC 16: Rate Limiting (System Design) ==== */
addTopic('sd-rate-limiting','Rate Limiting','intermediate',15,
['Rate limiting controls request frequency from clients — prevents abuse, ensures fair usage, and protects backend services.',
'Common algorithms: Token Bucket (supports bursts), Leaky Bucket (smooths traffic), Fixed Window (simple, boundary spikes), Sliding Window Log (precise), Sliding Window Counter (efficient + precise).',
'Applied at: API Gateway (global), per-endpoint, per-user, per-IP. HTTP 429 Too Many Requests with Retry-After header.',
'Distributed: Redis INCR + EXPIRE (fixed window), Redis Sorted Sets (sliding window), Lua script (token bucket atomicity). Best: Redis + Lua for atomic operations.',
'Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After.'
],
'Rate limiting is like a highway toll booth with limited capacity. 10 cars per minute can pass through (limit). If you arrive too fast, the gate stays down — "429 — try again in 6 seconds" (Retry-After). VIP lane (higher tier) allows 100 cars. If the toll computer goes down, gates open (fail open) to not block all traffic.',
[
d('Token Bucket Algorithm','Bucket capacity = burst limit. Refill rate = sustained rate. Each request consumes 1 token. Empty bucket = 429. Burst: unused tokens accumulate (up to capacity). Most common — used in Kong, AWS, GitHub. Parameters: capacity (max burst), refill rate (per second). Redis Lua for atomic implementation.'),
d('Fixed Window vs Sliding Window','Fixed Window: count per clock minute. Simple, memory-efficient (1 counter per client). Problem: edge bursts — at boundary, 2x traffic can pass in quick succession. Sliding Window: bounded by time window precision. Sliding Window Counter: sub-windows (1s granularity) — good balance.'),
d('Distributed Rate Limiting','Single server: in-memory counter (fastest, lost on restart). Multi-server: Redis needed for atomic shared counter. Redis INCR + EXPIRE for fixed window. Redis Sorted Sets for sliding window (ZREMRANGEBYSCORE + ZCARD). Lua scripting for token bucket. Consistent hashing to route same client to same server (optional).'),
d('Rate Limiting Strategies','Hard: strict limit, 429 immediately. Soft: allow burst, warn. Elastic: bursts with delay (queue). Tiered: Free (10/min), Pro (100/min), Enterprise (10K/min). Adaptive: adjust limits based on system load. Concurrency limiting: max concurrent requests (not rate).')
],
'Rate limiting is essential for any production API. Use Redis + Lua for distributed token bucket. Set appropriate limits per tier. Always return 429 with Retry-After. Design for fail-open (if rate limiter fails, allow traffic). Monitor rate limit usage to tune limits. Use sliding window for more precise limits.',
[
q('What is rate limiting?','Controlling request frequency to prevent abuse and ensure fair usage.'),
q('What is the Token Bucket algorithm?','Bucket fills at fixed rate (capacity = burst). Each request consumes a token. Supports bursts.'),
q('HTTP status for rate limiting?','429 Too Many Requests with Retry-After header.'),
q('Fixed vs Sliding Window?','Fixed: simple, edge bursts. Sliding: precise, higher memory.'),
q('What Redis commands for rate limiting?','INCR + EXPIRE (fixed window). Sorted Sets ZREMRANGEBYSCORE + ZCARD (sliding).'),
q('What are rate limit headers?','X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After.'),
q('Fail open or closed?','Fail open — if rate limiter fails, allow traffic rather than block everything.'),
q('What is concurrency limiting?','Limiting max simultaneous requests (vs rate = requests per time).'),
q('What is tiered rate limiting?','Different limits per customer tier (free, pro, enterprise).'),
q('What is burst capacity?','Maximum accumulated tokens — allows short traffic spikes above sustained rate.')
],
R(10,35,100,25,'#0070f3','','Client','Request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Rate Limiter','Token Bucket')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Has Token?','Allow')+
R(160,70,100,25,'#dc3545','','No Token','429 Retry-After')+
R(10,105,100,25,'#e83e8c','','Redis','Atomic Lua')+
R(160,105,100,25,'#6610f2','','Backend','Protected')+
R(290,35,190,155,'#17a2b8','','Rate Limiting','Token Bucket/Sliding Window. Redis+Lua. 429+Retry-After. Fail open. Tiered limits.'),
T(240,220,'Rate Limiting: Control request frequency. Token Bucket algorithm. Redis atomic. 429 with Retry-After.',9,'#666','middle'),
[
e('Token Bucket with Redis Lua','Atomic rate limiter.',codeBlock([
'const luaScript = `',
'local key = KEYS[1]',
'local capacity = tonumber(ARGV[1])',
'local refillRate = tonumber(ARGV[2])  -- per second',
'local now = redis.call("TIME")[1]',
'local bucket = redis.call("HMGET", key, "tokens", "lastRefill")',
'local tokens = tonumber(bucket[1]) or capacity',
'local lastRefill = tonumber(bucket[2]) or now',
'local elapsed = math.max(0, now - lastRefill)',
'tokens = math.min(capacity, tokens + elapsed * refillRate)',
'if tokens >= 1 then',
'  redis.call("HSET", key, "tokens", tokens - 1, "lastRefill", now)',
'  redis.call("EXPIRE", key, math.ceil(capacity / refillRate) + 1)',
'  return {1, tokens - 1}',
'else',
'  return {0, tokens}',
'end`;',
'async function checkRateLimit(clientId) {',
'  const result = await redis.eval(luaScript, 1, "ratelimit:" + clientId, 10, 2);',
'  return { allowed: result[1] === 1, remaining: result[2] };',
'}'
]),'Atomic token bucket with Redis Lua script for distributed rate limiting.'),
e('Express Rate Limiting Middleware','Sliding window middleware.',codeBlock([
'const rateLimit = require("express-rate-limit");',
'const RedisStore = require("rate-limit-redis");',
'// Per-endpoint rate limit',
'const apiLimiter = rateLimit({',
'  windowMs: 60 * 1000, // 1 minute window',
'  max: 100, // 100 requests per minute',
'  standardHeaders: true,',
'  legacyHeaders: false,',
'  store: new RedisStore({',
'    sendCommand: (...args) => redis.call(...args),',
'  }),',
'  handler: (req, res) => {',
'    res.status(429).json({',
'      error: "Too many requests",',
'      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),',
'    });',
'  },',
'});',
'app.use("/api/", apiLimiter);'
]),'Express rate limiting middleware with Redis store.'),
e('Tiered Rate Limiting','Per-tier limits.',codeBlock([
'const TIER_LIMITS = {',
'  free: { rps: 1, burst: 5 },',
'  basic: { rps: 10, burst: 50 },',
'  pro: { rps: 100, burst: 500 },',
'  enterprise: { rps: 1000, burst: 5000 },',
'};',
'async function tieredRateLimit(req, res, next) {',
'  const apiKey = req.headers["x-api-key"];',
'  const client = await getClientByApiKey(apiKey);',
'  const limits = TIER_LIMITS[client.tier] || TIER_LIMITS.free;',
'  const result = await checkLimit(client.id, limits.rps, limits.burst);',
'  res.set({',
'    "X-RateLimit-Limit": limits.rps,',
'    "X-RateLimit-Remaining": result.remaining,',
'  });',
'  if (!result.allowed) {',
'    return res.status(429).json({ error: "Rate limit exceeded", tier: client.tier, retryAfter: result.retryAfter });',
'  }',
'  next();',
'}'
]),'Tiered rate limiting with different limits per customer tier.'),
e('Concurrency Limiting','Max concurrent requests.',codeBlock([
'class ConcurrencyLimiter {',
'  constructor(maxConcurrent) {',
'    this.max = maxConcurrent;',
'    this.active = new Set();',
'  }',
'  async acquire(id) {',
'    if (this.active.size >= this.max) {',
'      throw new Error("Too many concurrent requests");',
'    }',
'    this.active.add(id);',
'  }',
'  release(id) { this.active.delete(id); }',
'  wrap(fn) {',
'    return async (...args) => {',
'      const id = Symbol();',
'      await this.acquire(id);',
'      try { return await fn(...args); }',
'      finally { this.release(id); }',
'    };',
'  }',
'}',
'const limiter = new ConcurrencyLimiter(50); // max 50 concurrent'
]),'Concurrency limiting — limits parallel requests, different from rate limiting.')
],
[
m('Token Bucket supports?',['Rate smoothing','Bursts','Precision','Simplicity'],1,'Token bucket supports bursts with capacity.'),
m('HTTP status for rate limit?',['400','429','503','403'],1,'429 Too Many Requests.'),
m('Best distributed storage?',['PostgreSQL','Redis','Local memory','Filesystem'],1,'Redis with Lua for atomic distributed counting.'),
m('What does Retry-After indicate?',['Request limit','When to retry','Error reason','Server load'],1,'Time to wait before retrying.'),
m('Fail open means?',['Block traffic if limiter fails','Allow traffic if limiter fails','Log errors','Retry later'],1,'Allow traffic if rate limiter is unavailable.'),
m('Tiered limits apply?',['Per endpoint','Per customer tier','Per server','Per region'],1,'Different limits per customer plan (free/pro/enterprise).')
]
);

/* ==== TOPIC 17: Circuit Breaker Pattern ==== */
addTopic('sd-circuit-breaker','Circuit Breaker Pattern','advanced',15,
['Circuit Breaker is a design pattern that detects failures and prevents cascading failures by stopping calls to a failing service, allowing it to recover.',
'Three states: CLOSED (normal — calls pass through), OPEN (calls fail immediately — circuit is "tripped"), HALF-OPEN (test state — limited calls pass to check recovery).',
'Metrics: failure count/threshold, failure rate (e.g., 50% of last 100 calls), response time threshold, timeout duration.',
'Transition: CLOSED → OPEN when threshold exceeded. OPEN → HALF-OPEN after reset timeout. HALF-OPEN → CLOSED if test calls succeed. HALF-OPEN → OPEN if test calls fail again.',
'Implemented in: Hystrix (Java, Netflix), Resilience4j, Opossum (Node.js), Polly (.NET).'
],
'A circuit breaker is like an electrical circuit breaker in your home. When too much current flows (failures), the breaker trips (opens circuit), stopping all current. After a cooldown period, you try resetting it (half-open). If the short is fixed, it stays reset (closed). If still faulty, it trips again immediately.',
[
d('Circuit Breaker States','CLOSED: normal operation, calls pass through, failure count tracking. OPEN: calls fail immediately with fallback/error, no network call made. HALF-OPEN: limited test calls allowed after timeout, if successful → CLOSED, if failed → OPEN. State transitions based on configurable thresholds (e.g., 5 failures in 10s window).'),
d('Configuration Parameters','failureThreshold: number/consecutive failures to open. resetTimeout: time before transitioning to HALF-OPEN. successThreshold: successful calls in HALF-OPEN to close. rollingWindow: time window for failure counting. timeout: per-call timeout (separate but related). metricsSlidingWindow: how many calls to track.'),
d('Fallback Strategies','Return cached data (stale but better than error). Default response (empty, "service unavailable"). Queue request for retry later. Degraded functionality (read-only mode). Error response with clear message. Circuit breaker MUST provide fallback — the whole point is graceful degradation.'),
d('Bulkhead Pattern','Related but separate — isolates resources into pools so a failure in one pool doesn\'t take down the whole system. Example: separate connection pool for each downstream service. If service A pool is exhausted, service B calls unaffected. Used together with circuit breaker for robust fault isolation.')
],
'Essential for microservices — prevent cascading failures. Set appropriate thresholds based on normal failure rates. Always provide a fallback. Combine with bulkhead for resource isolation. Monitor circuit breaker state — alert on OPEN state. Test circuit breaker behavior in production (chaos engineering).',
[
q('What is a circuit breaker?','Pattern that prevents cascading failures by stopping calls to failing services.'),
q('What are the three states?','CLOSED (normal), OPEN (fail fast), HALF-OPEN (testing recovery).'),
q('When does CLOSED → OPEN?','When failure threshold is exceeded (count or rate within time window).'),
q('When does OPEN → HALF-OPEN?','After reset timeout expires — allows test calls.'),
q('What is a fallback?','Alternative response when circuit is OPEN — cached data, default value, error message.'),
q('What is bulkhead?','Resource isolation — separate pools per dependency to prevent cascading resource exhaustion.'),
q('Why not just use timeouts?','Timeouts still make the call (waste resources). Circuit breaker avoids the call entirely.'),
q('What is a rolling window?','Time window for tracking failures (e.g., last 100 calls, last 10 seconds).'),
q('What is the Netflix implementation?','Hystrix (now in maintenance mode).'),
q('What health check tests in HALF-OPEN?','Circuit passes limited test calls — if they succeed, it closes.'),
],
R(10,35,100,25,'#0070f3','','CLOSED','Normal')+
A(110,48,140,48)+A(40,65,40,95)+
R(150,35,100,25,'#28a745','','Call service','Pass through')+
R(10,70,100,25,'#ffc107','','Failure > N','Trip!')+
R(10,105,100,25,'#dc3545','','OPEN','Fail fast')+
A(55,120,55,145)+
R(150,105,100,25,'#e83e8c','','Fallback','Cache/default')+
R(10,140,100,25,'#6610f2','','Timeout','Try test')+
R(150,140,100,25,'#17a2b8','','HALF-OPEN','Test call')+
R(290,35,190,155,'#17a2b8','','Circuit Breaker','CLOSED→OPEN (failures) → HALF-OPEN (test) → CLOSED(ok)/OPEN(fail). Fallback, bulkhead.'),
T(240,220,'Circuit Breaker: Prevent cascading failures. Three states, fallback, bulkhead isolation.',9,'#666','middle'),
[
e('Circuit Breaker with Opossum','Node.js implementation.',codeBlock([
'const CircuitBreaker = require("opossum");',
'async function callPaymentService(amount) {',
'  const response = await fetch("http://payment-service:3000/charge", {',
'    method: "POST",',
'    body: JSON.stringify({ amount }),',
'    headers: { "Content-Type": "application/json" },',
'  });',
'  if (!response.ok) throw new Error("Payment failed: " + response.status);',
'  return response.json();',
'}',
'const breaker = new CircuitBreaker(callPaymentService, {',
'  timeout: 5000,', // 5s timeout per call
'  errorThresholdPercentage: 50,', // open if 50% fail
'  resetTimeout: 30000,', // try again after 30s
'  rollingCountTimeout: 10000,', // 10s window
'  name: "payment-service",',
'});',
'breaker.fallback(() => ({ status: "pending", message: "Payment queued — will retry" }));',
'breaker.on("open", () => console.log("Circuit OPEN — payment service DOWN"));',
'breaker.on("halfOpen", () => console.log("Testing payment service..."));',
'const result = await breaker.fire(99.99);'
]),'Opossum circuit breaker with fallback and event monitoring.'),
e('Bulkhead Pattern','Resource isolation.',codeBlock([
'class BulkheadPool {',
'  constructor(name, maxConcurrent, queueSize) {',
'    this.name = name;',
'    this.max = maxConcurrent;',
'    this.queue = [];',
'    this.active = 0;',
'    this.maxQueueSize = queueSize || maxConcurrent;',
'  }',
'  async exec(fn) {',
'    if (this.active >= this.max) {',
'      if (this.queue.length >= this.maxQueueSize) {',
'        throw new Error(this.name + " bulkhead full — rejecting");',
'      }',
'      await new Promise((resolve, reject) => {',
'        this.queue.push(resolve);',
'        setTimeout(() => reject(new Error("Queue timeout")), 5000);',
'      });',
'    }',
'    this.active++;',
'    try { return await fn(); }',
'    finally {',
'      this.active--;',
'      if (this.queue.length > 0) {',
'        const next = this.queue.shift();',
'        next(); // release next queued request',
'      }',
'    }',
'  }',
'}'
]),'Bulkhead pattern — separate resource pools for each downstream service.'),
e('Spring Cloud Circuit Breaker (Java)','Java implementation.',codeBlock([
'@Service',
'public class PaymentService {',
'  @CircuitBreaker(name = "paymentService", fallbackMethod = "fallback")',
'  public PaymentResponse charge(PaymentRequest request) {',
'    return restTemplate.postForObject(',
'      "http://payment-service/charge", request, PaymentResponse.class);',
'  }',
'  public PaymentResponse fallback(PaymentRequest request, Throwable t) {',
'    return new PaymentResponse("pending", "Service unavailable, queued");',
'  }',
'}',
'// application.yml',
'resilience4j.circuitbreaker:',
'  instances:',
'    paymentService:',
'      slidingWindowSize: 100',
'      minimumNumberOfCalls: 10',
'      failureRateThreshold: 50',
'      waitDurationInOpenState: 30s',
'      permittedNumberOfCallsInHalfOpenState: 3',
'      automaticTransitionFromOpenToHalfOpenEnabled: true'
]),'Spring Cloud Circuit Breaker (Resilience4j) with configuration.'),
e('Manual Circuit Breaker Implementation','Simple version.',codeBlock([
'class SimpleCircuitBreaker {',
'  constructor(failureThreshold = 5, resetTimeout = 30000) {',
'    this.state = "CLOSED";',
'    this.failureCount = 0;',
'    this.failureThreshold = failureThreshold;',
'    this.resetTimeout = resetTimeout;',
'    this.lastFailureTime = null;',
'  }',
'  async call(fn, fallback) {',
'    if (this.state === "OPEN") {',
'      if (Date.now() - this.lastFailureTime >= this.resetTimeout) {',
'        this.state = "HALF_OPEN";',
'      } else {',
'        return fallback();',
'      }',
'    }',
'    try {',
'      const result = await fn();',
'      if (this.state === "HALF_OPEN") {',
'        this.state = "CLOSED";',
'        this.failureCount = 0;',
'      }',
'      return result;',
'    } catch (err) {',
'      this.failureCount++;',
'      this.lastFailureTime = Date.now();',
'      if (this.failureCount >= this.failureThreshold) {',
'        this.state = "OPEN";',
'      }',
'      return fallback(err);',
'    }',
'  }',
'}'
]),'Simple circuit breaker implementation illustrating the state machine.')
],
[
m('Circuit breaker prevents?',['Slow responses','Cascading failures','Data loss','Network issues'],1,'Prevents cascading failures across services.'),
m('OPEN state means?',['Normal operation','Calls fail immediately','Testing recovery','Slow mode'],1,'OPEN: calls fail fast without reaching service.'),
m('HALF-OPEN allows?',['All calls','No calls','Limited test calls','Cached calls'],2,'HALF-OPEN: limited test calls to check recovery.'),
m('What triggers CLOSED → OPEN?',['Success threshold','Failure threshold exceeded','Timeout','Manual action'],1,'Failure count or rate exceeds threshold.'),
m('Bulkhead pattern isolates?',['Network','Resources per dependency','Code modules','Deployments'],1,'Separate resource pools per downstream service.'),
m('What is a fallback?',['Primary response','Alternative response on failure','Error log','Retry queue'],1,'Fallback provides degraded response when service is down.')
]
);

/* ==== TOPIC 18: Leader Election ==== */
addTopic('sd-leader-election','Leader Election','advanced',15,
['Leader election is a distributed algorithm that ensures one node is designated as the leader (coordinator) while others act as followers — critical for consensus and coordination.',
'Common algorithms: Bully Algorithm (highest ID node wins), Raft (term-based election with randomized timeouts), Zab (Zookeeper\'s Atomic Broadcast — similar to Paxos).',
'Leader handles: write coordination, lock management, task assignment, state replication. Followers: standby, read-only, replicate leader state, vote in elections.',
'Failure detection: heartbeats (leader sends periodic heartbeats to followers). If followers don\'t receive heartbeat within timeout, they trigger new election. Randomized timeouts prevent split votes.',
'Used in: Zookeeper, etcd, Kafka (controller), MongoDB (primary), Redis Sentinel, Kubernetes controller manager.'
],
'Leader election is like a group project where one person is the coordinator. Everyone knows who the coordinator is. If the coordinator stops responding (phone dead), someone else volunteers after a random delay — first one to volunteer declares themselves the new coordinator. Random delay prevents everyone talking at once.',
[
d('Raft Leader Election','Terms: time divided into terms, each term starts with an election. State: Follower (default), Candidate (election triggered), Leader (elected). Steps: follower times out → becomes candidate → requests votes → gets majority → becomes leader. Receives heartbeat from leader → stays follower. Randomized election timeout (150-300ms) prevents split votes.'),
d('Bully Algorithm','When any process detects leader failure: sends ELECTION message to all higher-ID processes. If no response → declares itself leader. If higher-ID responds → election stops, higher-ID takes over. Highest ID wins — simple but O(N^2) messages. Not as robust as Raft.'),
d('Split-Brain Problem','Two nodes both believe they are leader (network partition separates them). Both accept writes — data diverges. Prevention: quorum (majority needed), STONITH (shoot other node), fencing (revoke access to shared resources), lease-based leadership (TTL on leadership).'),
d('Lease-Based Leadership','Leader holds a lease (TTL-based lock) that expires. Leader must renew lease before expiry. If leader fails, lease expires, another node acquires lease. Zookeeper: ephemeral sequential znode. etcd: lease with TTL. Prevents split-brain — only one node can hold the lease at a time.')
],
'Use Raft-based consensus (etcd, Zookeeper) for leader election in production. They handle failure detection, split-brain prevention, and consistency. Implement leader election yourself only if you can\'t use these systems — it\'s notoriously tricky (many edge cases).',
[
q('What is leader election?','Process of designating one node as coordinator in a distributed system.'),
q('What is Raft?','Consensus algorithm with term-based leader election, randomized timeouts, log replication.'),
q('What causes a new election?','Follower doesn\'t receive heartbeat within election timeout.'),
q('What is split-brain?','Two nodes both believe they are leader — dangerous, must be prevented with quorum.'),
q('What is STONITH?','Shoot The Other Node In The Head — forcefully ensure old leader is dead.'),
q('What is a lease?','Time-bound leadership — leader must renew before expiry.'),
q('How does Zookeeper handle leader election?','Ephemeral sequential znodes — first to create becomes leader.'),
q('What is the Bully Algorithm?','Highest ID process becomes leader. Simple but O(N^2) messages.'),
q('What is fencing?','Preventing old leader from accessing shared resources (revoke permissions, block network).'),
q('Why randomized timeouts?','Prevent simultaneous election triggers — reduces split votes.')
],
R(10,35,100,25,'#0070f3','','Follower','Node 1')+
R(120,35,100,25,'#28a745','','Follower','Node 2')+
R(230,35,100,25,'#dc3545','','Leader','Node 3')+
A(200,48,230,48)+
R(10,70,100,25,'#ffc107','','Heartbeat','Leader→All')+
R(120,70,100,25,'#e83e8c','','Timeout!','No heartbeat')+
A(120,90,120,110)+
R(120,105,100,25,'#6610f2','','Election','Vote request')+
R(230,105,100,25,'#17a2b8','','New Leader','Majority wins')+
R(290,35,190,155,'#17a2b8','','Leader Election','Raft: terms, randomized elections, heartbeats. Prevent split-brain with quorum and fencing.'),
T(240,220,'Leader Election: Designate one coordinator. Raft consensus, heartbeats, split-brain prevention.',9,'#666','middle'),
[
e('Zookeeper Leader Election','Ephemeral sequential znodes.',codeBlock([
'// Zookeeper leader election',
'const zk = new ZooKeeper("localhost:2181");',
'const electionPath = "/election/node-";',
'// Create ephemeral sequential znode',
'const createdPath = await zk.create(electionPath, "worker-1-data",',
'  ZooKeeper.EPHEMERAL | ZooKeeper.SEQUENCE);',
'// Get all election nodes',
'const children = await zk.getChildren("/election", false);',
'children.sort(); // sort by sequence number',
'const mySeq = createdPath.replace(electionPath, "");',
'// If I am the smallest sequence = leader',
'const amLeader = children[0] === "node-" + mySeq;',
'if (amLeader) {',
'  console.log("I am the leader!");',
'} else {',
'  // Watch the node before me',
'  const prevNode = "/election/" + children[children.indexOf("node-" + mySeq) - 1];',
'  const watcher = new Watcher();',
'  watcher.on("delete", () => {',
'    console.log("Previous leader gone — re-electing...");',
'    checkLeader();',
'  });',
'  await zk.wget(prevNode, watcher);',
'}'
]),'Zookeeper leader election with ephemeral sequential znodes.'),
e('etcd Leadership Lease','TTL-based leadership.',codeBlock([
'// etcd leader election with lease',
'const { Etcd3 } = require("etcd3");',
'const client = new Etcd3({ hosts: "localhost:2379" });',
'// Create lease with 10s TTL',
'const lease = await client.lease().grant(10);',
'lease.on("lost", () => {',
'  console.log("Lost leadership — lease expired!");',
'  elect();',
'});',
'// Put key with lease — leader holds this key',
'const leaderKey = "/leader/service-a";',
'try {',
'  await client.put(leaderKey).value("node-1").lease(lease).exec();',
'  // If successful, I am the leader',
'  console.log("Leader elected, holding lease");',
'  // Keep renewing lease',
'  setInterval(async () => {',
'    await lease.keepalive();',
'  }, 5000);',
'} catch (err) {',
'  // Key already exists — someone else is leader',
'  // Watch for leader deletion',
'  const watcher = await client.watch().key(leaderKey).create();',
'  watcher.on("delete", () => elect());',
'}'
]),'etcd lease-based leader election with TTL.'),
e('Raft Election (Simple Simulation)','Raft-like election.',codeBlock([
'class RaftNode {',
'  constructor(id, peers) {',
'    this.id = id; this.state = "FOLLOWER"; this.term = 0;',
'    this.votedFor = null; this.votes = 0;',
'    this.peers = peers; this.leader = null;',
'    this.electionTimeout = 150 + Math.random() * 150;', // 150-300ms
'  }',
'  start() {',
'    this.resetElectionTimer();',
'  }',
'  resetElectionTimer() {',
'    clearTimeout(this.timer);',
'    this.timer = setTimeout(() => this.startElection(), this.electionTimeout);',
'  }',
'  async startElection() {',
'    this.state = "CANDIDATE";',
'    this.term++; this.votedFor = this.id; this.votes = 1;',
'    // Request votes from peers (simplified)',
'    for (const peer of this.peers) {',
'      const granted = await peer.requestVote(this.term, this.id);',
'      if (granted) this.votes++;',
'    }',
'    if (this.votes > this.peers.length / 2) {',
'      this.state = "LEADER"; this.leader = this.id;',
'      this.sendHeartbeat();',
'    } else { this.state = "FOLLOWER"; }',
'  }',
'  receiveHeartbeat(leaderId, term) {',
'    if (term >= this.term) {',
'      this.term = term; this.state = "FOLLOWER";',
'      this.leader = leaderId; this.resetElectionTimer();',
'    }',
'  }',
'}'
]),'Simplified Raft election algorithm — terms, timeouts, vote requests.'),
e('Kafka Controller Election','Kafka-specific leader.',codeBlock([
'# Kafka controller — one broker acts as controller',
'# Manages partition leaders, ISR changes, topic creation',
'# Election via Zookeeper: first broker to create /controller znode',
'# Config:',
'# Controller handles:',
'# - Partition leader election',
'# - Topic creation/deletion',
'# - Broker failure detection',
'# - Replica reassignment',
'# If controller fails (ZNode disappears):',
'# - Remaining brokers compete to create /controller',
'# - First to create becomes new controller',
'# - New controller reads state from ZK and memory'
]),'Kafka controller election via Zookeeper.')
],
[
m('Leader election designates?',['Multiple coordinators','One coordinator','No coordinator','Random node'],1,'One node acts as coordinator/leader.'),
m('Raft uses what to trigger election?',['Timer expiry','Manual trigger','Network failure','High load'],0,'Election timeout triggers election when no heartbeat received.'),
m('Randomized timeouts prevent?',['Fast election','Split votes','Data loss','Network traffic'],1,'Reduces simultaneous election starts.'),
m('Split-brain means?',['Network split','Two leaders','Data conflict','Node failure'],1,'Two nodes both believe they are leader.'),
m('Quorum prevents?',['Slow election','Split-brain','Data loss','Network issues'],1,'Quorum (majority) ensures single leader.'),
m('Fencing prevents?',['Old leader accessing resources','New leader election','Heartbeat failures','Data replication'],0,'Revokes old leader\'s access to shared resources.')
]
);

/* ==== TOPIC 19: Distributed Transactions ==== */
addTopic('sd-distributed-transactions','Distributed Transactions','advanced',25,
['Distributed transactions coordinate operations across multiple databases, services, or queues to maintain consistency.',
'Two approaches: ACID (traditional — 2PC, XA) and BASE/BEST (modern — Saga, eventual consistency). ACID is hard in distributed systems. Saga is more practical.',
'2PC (Two-Phase Commit): Coordinator asks all participants to prepare (phase 1) → if all yes, commit (phase 2). Blocking protocol — if coordinator fails, participants wait (blocked). Not suitable for long-running transactions.',
'Saga: sequence of local transactions with compensating actions. If step fails, run compensating actions for all completed steps. Choreography (events) or Orchestration (coordinator). Eventual consistency.',
'Idempotency: each operation must be safe to retry. Exactly-once processing requires idempotent operations + deduplication.'
],
'Distributed transactions are like online shopping where ordering, payment, and shipping are handled by different companies. Saga = order goes through, if payment fails, cancel order (compensation). 2PC = all companies must commit before any proceeds — if phone line drops, everyone waits frozen. Saga is like booking a trip: book flight → if hotel fails → cancel flight.',
[
d('Two-Phase Commit (2PC)','Phase 1 (Prepare): coordinator asks all participants to prepare — can you commit? Participants write prepare log, respond yes/no. Phase 2 (Commit): if all yes → coordinator sends commit. If any no → coordinator sends abort. Blocking: participant waits for coordinator decision after prepare. Coordinator failure = blocked resources.'),
d('Saga Pattern','Sequence of transactions T1, T2, ..., Tn with compensations C1, C2, ..., Cn. If Tk fails, run Ck-1, ..., C1. Choreography: each service publishes events triggering next step. Orchestration: Saga coordinator tells services what to do. Choreography is simpler (no coordinator), orchestrator has coordination logic in one place.'),
d('Idempotency and Deduplication','Idempotent operation: performing it multiple times has same effect as once. Implementation: idempotency key (client-generated unique key). Server checks if key already processed → skip. Deduplication store: Redis set with TTL, DB unique constraint, in-memory cache. Essential for at-least-once delivery.'),
d('Compensating Transactions','Each step in Saga must have a compensating action that semantically undoes it. Examples: Payment step → compensation is refund. Order step → compensation is cancel order. Email step → compensation is... can\'t unsend email (don\'t make email a Saga step). Compensations must be idempotent too.')
],
'Use 2PC only if strong consistency is mandatory and participants are within same domain (not across organizations). Use Saga for most distributed transactions — eventual consistency is acceptable for most business processes. Always design idempotent operations. Test Saga failure scenarios (chaos engineering).',
[
q('What is 2PC?','Two-Phase Commit — prepare phase + commit/abort phase. Blocking protocol.'),
q('What is the blocking problem in 2PC?','If coordinator fails after prepare, participants wait indefinitely (blocked).'),
q('What is a Saga?','Sequence of local transactions with compensating actions on failure.'),
q('Choreography vs Orchestration Saga?','Choreography: events between services. Orchestration: central coordinator.'),
q('What is a compensating transaction?','Action that semantically undoes a previous transaction (e.g., cancel order).'),
q('Why idempotency?','At-least-once delivery means same message may be processed multiple times. Idempotency prevents side effects.'),
q('What is exactly-once processing?','Each operation processed exactly once. Requires idempotent producer + consumer + deduplication.'),
q('What is XA?','Distributed transaction standard for coordinating DBs, queues, and other resources via 2PC.'),
q('What is the BASE acronym?','Basically Available, Soft state, Eventual consistency — alternative to ACID for distributed systems.'),
q('What is Outbox Pattern?','Write event to local DB within same transaction as business operation. Separate process publishes events from outbox. Ensures atomicity + reliable publication.')
],
R(10,35,100,25,'#0070f3','','Client','Request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Saga Coordinator','Orchestrator')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,80,25,'#ffc107','','Step 1','Order')+
R(100,70,80,25,'#dc3545','','Step 2','Payment')+
R(190,70,80,25,'#e83e8c','','Step 3','Shipping')+
R(10,105,100,25,'#6610f2','','Compensation','Rollback')+
R(150,105,100,25,'#17a2b8','','Event Bus','Choreography')+
R(290,35,190,155,'#17a2b8','','Distributed Transactions','2PC (blocking) vs Saga (eventual consistency). Idempotency, compensating transactions, outbox pattern.'),
T(240,220,'Distributed Transactions: 2PC (strong, blocking) vs Saga (eventual, compensating). Idempotent operations.',9,'#666','middle'),
[
e('Saga Orchestration Pattern','Coordinator manages steps.',codeBlock([
'class SagaOrchestrator {',
'  async createOrder(data) {',
'    const sagaId = crypto.randomUUID();',
'    const steps = [',
'      { name: "createOrder", action: () => orderService.create(data), compensate: () => orderService.cancel(data.id) },',
'      { name: "reservePayment", action: () => paymentService.reserve(data.amount, data.userId), compensate: () => paymentService.release(data.amount, data.userId) },',
'      { name: "updateInventory", action: () => inventoryService.reserve(data.items), compensate: () => inventoryService.release(data.items) },',
'      { name: "sendConfirmation", action: () => emailService.send(data.userId, "Order confirmed"), compensate: () => {} },',
'    ];',
'    const executed = [];',
'    for (const step of steps) {',
'      try {',
'        await step.action();',
'        executed.push(step);',
'        await sagaStore.append(sagaId, { step: step.name, status: "completed" });',
'      } catch (err) {',
'        // Compensate all completed steps in reverse order',
'        for (const done of executed.reverse()) {',
'          await done.compensate();',
'          await sagaStore.append(sagaId, { step: done.name, status: "compensated" });',
'        }',
'        throw new Error("Saga failed — compensated");',
'      }',
'    }',
'  }',
'}'
]),'Saga orchestration with compensating actions on failure.'),
e('Outbox Pattern','Reliable event publication.',codeBlock([
'-- Step 1: Write business data + event in same DB transaction',
'BEGIN;',
'INSERT INTO orders (id, user_id, amount, status) VALUES (123, 42, 99.99, "created");',
'INSERT INTO outbox (id, aggregate_type, aggregate_id, event_type, payload)',
'  VALUES (gen_random_uuid(), "order", 123, "OrderCreated", \'{"orderId":123,"userId":42,"amount":99.99}\');',
'COMMIT;',
'-- Step 2: Background process publishes outbox events',
'const rows = await db.query("SELECT * FROM outbox ORDER BY id LIMIT 100");',
'for (const row of rows) {',
'  try {',
'    await kafkaProducer.send({ topic: "order-events", messages: [{ value: row.payload }] });',
'    await db.query("DELETE FROM outbox WHERE id=$1", [row.id]);',
'  } catch (err) {',
'    // retry on next poll',
'  }',
'}'
]),'Outbox pattern — write event to DB within same transaction, publish separately.'),
e('Idempotency with Idempotency Key','Prevent duplicate processing.',codeBlock([
'// Client sends idempotency key',
'async function createPayment(amount, idempotencyKey) {',
'  const response = await fetch("/api/payments", {',
'    method: "POST",',
'    body: JSON.stringify({ amount }),',
'    headers: { "Idempotency-Key": idempotencyKey },',
'  });',
'  return response.json();',
'}',
'// Server checks idempotency',
'async function handlePayment(req, res) {',
'  const key = req.headers["idempotency-key"];',
'  // Check if already processed',
'  const existing = await redis.get("idempotent:" + key);',
'  if (existing) return res.json(JSON.parse(existing)); // return cached result',
'  // Process payment',
'  const result = await processPayment(req.body);',
'  // Cache result with TTL (e.g., 24h)',
'  await redis.setex("idempotent:" + key, 86400, JSON.stringify(result));',
'  res.json(result);',
'}'
]),'Idempotency key pattern — client retry-safe API.'),
e('Two-Phase Commit (Conceptual)','XA transaction flow.',codeBlock([
'// Conceptual 2PC flow',
'Phase 1 — PREPARE:',
'Coordinator → Participant A: PREPARE',
'Coordinator → Participant B: PREPARE',
'Participant A → Coordinator: YES (or NO)',
'Participant B → Coordinator: YES (or NO)',
'Phase 2 — COMMIT/ABORT:',
'If ALL YES:',
'  Coordinator → All: COMMIT',
'  Participants → Coordinator: ACK',
'If ANY NO:',
'  Coordinator → All: ABORT',
'  Participants → Coordinator: ACK',
'// Blocking problem:',
'// If coordinator crashes after PREPARE responses,',
'// participants hold locks waiting for decision.',
'// Recovery: coordinator must log decisions to durable storage.'
]),'Two-Phase Commit flow — prepare then commit or abort.')
],
[
m('2PC is what type of protocol?',['Non-blocking','Blocking','Eventual','Asynchronous'],1,'2PC is blocking — participants may wait indefinitely.'),
m('Saga pattern provides?',['Strong consistency','Eventual consistency','No consistency','Immediate consistency'],1,'Saga provides eventual consistency with compensation.'),
m('Compensating transaction?',['Retry failed step','Undo completed steps','Log error','Ignore failure'],1,'Compensation semantically undoes a completed step.'),
m('Idempotency key ensures?',['Unique requests','Same result on retry','Fast processing','Ordered processing'],1,'Idempotent operations produce same result when retried.'),
m('Outbox pattern solves?',['Slow queries','Atomic DB write + event publish','Data loss','Network issues'],1,'Ensures DB write and event publication are atomic.'),
m('Saga orchestration uses?',['Events between services','Central coordinator','Database replication','Load balancer'],1,'Orchestrator coordinates all Saga steps.')
]
);

/* ==== TOPIC 20: ID Generation ==== */
addTopic('sd-id-generation','ID Generation','intermediate',15,
['ID generation strategies for distributed systems must produce unique, scalable, and often sortable identifiers across multiple nodes.',
'Requirements: uniqueness (no collisions), scalability (no single bottleneck), monotonicity (increasing for DB index performance), size efficiency, decentralization.',
'Common strategies: UUID v4 (random, 128-bit), UUID v7 (time-ordered, 128-bit), Snowflake (Twitter, 64-bit), ULID (sortable, 128-bit), NanoID (short, URL-safe), DB sequences (auto-increment — single point of failure).',
'Trade-offs: longer IDs are more unique but use more storage. Sortable IDs improve DB index performance. Decentralized generation avoids single bottleneck.'
],
'ID generation is like naming items in a warehouse. Auto-increment = sequential shelf numbers — simple but you need a central manager. UUID = random serial numbers — anyone can generate but longer. Snowflake = warehouse + section + timestamp — fast, sortable, decentralized. For global warehouses, you need IDs that won\'t collide.',
[
d('UUID v4 vs v7','UUID v4: 128 bits (36 chars), random. 122 random bits. 5.3 × 10^36 possible values. No ordering — bad for DB index (B-tree fragmentation). UUID v7: time-ordered prefix, random suffix. Sortable, good for DB indexes. Prefer v7 over v4 for database keys. Both are 128-bit, no central coordination.'),
d('Snowflake ID (Twitter)','64-bit ID: 1 bit sign (0) + 41 bits timestamp (ms, 69-year range) + 10 bits worker ID (1024 nodes) + 12 bits sequence (4096/ms). Fits in 64-bit integer (BIGINT). Time-sortable. Decentralized (each worker generates independently). Requires worker ID assignment and clock synchronization (NTP).'),
d('ULID (Universally Unique Lexicographically Sortable Identifier)','128-bit: 48-bit timestamp (ms) + 80-bit random. Crockford Base32 encoding (26 chars). Case-insensitive, URL-safe, no special chars. Sortable by timestamp. 1.21 × 10^24 ids/sec per generator. Good alternative to UUID — sortable and URL-safe.'),
d('NanoID','Compact, URL-safe, customizable length. Default: 21 chars (64-bit entropy). 2.5 × 10^14 years needed to have 1% collision at 1000 IDs/hour. Faster than UUID (no random bytes, uses crypto). Used in: React Router, Next.js, tRPC, Prisma. Good for short URLs, public IDs.'),
d('DB Sequence Auto-Increment','PostgreSQL SERIAL/BIGSERIAL, MySQL AUTO_INCREMENT. Simple, short, sequential. Problem: single point of failure (sequence generator), cannot generate offline, sequential reveals data volume. For distributed: use sequence ranges (reserve 1-1000 on node A, 1001-2000 on node B).')
],
'Use UUID v7 (time-ordered) for most distributed systems — good balance of uniqueness, sortability, and decentralization. Use Snowflake if 64-bit integer key is required (legacy systems, index performance). Use NanoID for short public IDs. Never use sequential IDs in URLs (security through obscurity is not security, but it helps prevent enumeration attacks).',
[
q('What requirements for distributed IDs?','Unique, scalable, monotonic (sortable), decentralized, size-efficient.'),
q('UUID v4 vs v7?','v4: random, not sortable. v7: time-ordered prefix, sortable, db-friendly.'),
q('What is a Snowflake ID?','64-bit: timestamp + worker ID + sequence. Twitter\'s distributed ID generator.'),
q('Why sortable IDs matter?','Better DB index performance — B-tree inserts are sequential, less page splits.'),
q('What is ULID?','128-bit: timestamp + random, Crockford Base32, sortable, URL-safe.'),
q('What is NanoID?','Compact, URL-safe ID with customizable length. 21 chars default.'),
q('What is the collision probability for UUID?','Extremely low — 122 random bits. Billions of IDs for billions of years.'),
q('What problem with DB auto-increment?','Single point of failure, sequential reveals data volume, can\'t generate offline.'),
q('What is the worker ID in Snowflake?','Identifies the node generating the ID — must be unique per node.'),
q('What is a KSUID?','K-Sortable Unique IDentifier — similar to ULID, 27 chars, timestamp + random payload.')
],
R(10,35,100,25,'#0070f3','','Unique','No duplicates')+
R(10,65,100,25,'#28a745','','Sortable','DB-friendly')+
R(10,95,100,25,'#ffc107','','Decentralized','No bottleneck')+
R(10,125,100,25,'#dc3545','','Compact','Storage efficient')+
R(160,35,60,25,'#e83e8c','','UUID','128-bit')+
R(230,35,60,25,'#6610f2','','Snowflake','64-bit')+
R(160,65,60,25,'#17a2b8','','ULID','128-bit sort')+
R(230,65,60,25,'#6f42c1','','NanoID','Short crypto')+
R(290,35,190,155,'#17a2b8','','ID Generation','UUID v7 (sortable), Snowflake (64-bit), ULID, NanoID. Choose by requirements: sortability, size, decentralization.'),
T(240,220,'ID Generation: UUID v7, Snowflake, ULID, NanoID. Sortable IDs improve DB index performance.',9,'#666','middle'),
[
e('Snowflake ID Generator','64-bit distributed ID.',codeBlock([
'class SnowflakeGenerator {',
'  constructor(workerId, epoch = 1700000000000) {',
'    this.workerId = workerId;',
'    this.epoch = epoch;',
'    this.sequence = 0;',
'    this.lastTimestamp = -1;',
'    this.workerIdBits = 10;',
'    this.sequenceBits = 12;',
'    this.maxWorkerId = (1 << this.workerIdBits) - 1;',
'    this.sequenceMask = (1 << this.sequenceBits) - 1;',
'    this.workerIdShift = this.sequenceBits;',
'    this.timestampShift = this.sequenceBits + this.workerIdBits;',
'  }',
'  nextId() {',
'    let timestamp = Date.now();',
'    if (timestamp < this.lastTimestamp) throw new Error("Clock moved backwards");',
'    if (timestamp === this.lastTimestamp) {',
'      this.sequence = (this.sequence + 1) & this.sequenceMask;',
'      if (this.sequence === 0) timestamp = this.waitNextMs();',
'    } else { this.sequence = 0; }',
'    this.lastTimestamp = timestamp;',
'    return ((BigInt(timestamp - this.epoch) << BigInt(this.timestampShift)) |',
'      (BigInt(this.workerId) << BigInt(this.workerIdShift)) |',
'      BigInt(this.sequence)).toString();',
'  }',
'  waitNextMs() {',
'    let ts = Date.now();',
'    while (ts <= this.lastTimestamp) ts = Date.now();',
'    return ts;',
'  }',
'}'
]),'Snowflake ID generator — timestamp + worker + sequence, 64-bit.'),
e('UUID v7 Generation','Time-ordered UUID.',codeBlock([
'// Node.js — generate UUID v7 (time-ordered)',
'const { v7: uuidv7 } = require("uuid");',
'const id = uuidv7(); // "018f8a1e-8b3c-7a1e-b1e1-123456789abc"',
'// Structure:',
'// timestamp (48 bits) + version (4 bits) + variant (2 bits) + random (74 bits)',
'// Sortable: prefix is Unix timestamp in ms',
'// Unlike UUID v4, v7 IDs sort chronologically',
'// Database index performance: much better than v4',
'// Collision probability: same as v4 (extremely low)'
]),'UUID v7 — time-ordered prefix for DB-friendly sorting.'),
e('NanoID Generation','Short crypto ID.',codeBlock([
'const { nanoid } = require("nanoid");',
'// Default: 21 chars, 64-bit entropy',
'const id = nanoid(); // "V1StGXR8_Z5jdHi6B-myT"',
'// Custom length (e.g., 8 chars for short URL):',
'const shortId = nanoid(8); // "kL7x9qP2"',
'// Custom alphabet (URL-safe):',
'const customId = nanoid.customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_", 12);',
'// Collision:',
'// 21 chars: ~2.5e14 years for 1% collision at 1000 ids/hour',
'// 8 chars: ~5 months for 1% collision at 1000 ids/hour',
'// NanoID is NOT sortable (random)',
'// It is the shortest URL-safe ID'
]),'NanoID — compact crypto-random IDs, customizable length.'),
e('DB Sequence Ranges for Distributed','Offline ID generation.',codeBlock([
'-- Allocate ID ranges to each node',
'CREATE TABLE id_allocator (',
'  node_id INT PRIMARY KEY,',
'  range_start BIGINT,',
'  range_end BIGINT',
');',
'-- Node A allocates range (PostgreSQL)',
'BEGIN;',
'UPDATE id_allocator SET range_start = range_end + 1, range_end = range_end + 1000',
'WHERE node_id = 1',
'RETURNING range_start, range_end;',
'COMMIT;',
'-- Node A can now generate IDs offline: 1001-2000',
'-- When exhausted, allocate next range',
'-- Benefit: no single bottleneck, nodes work offline',
'-- Disadvantage: ID gaps, need to track allocation'
]),'DB sequence ranges — each node gets a batch of IDs to use offline.')
],
[
m('UUID v7 advantage over v4?',['Shorter','Time-sortable','More unique','Faster generation'],1,'UUID v7 is time-ordered — better for DB indexes.'),
m('Snowflake ID size?',['32-bit','64-bit','128-bit','256-bit'],1,'64-bit integer — fits in BIGINT.'),
m('Snowflake ID components?',['Timestamp + worker + sequence','Random only','MAC address + time','Counter + server'],0,'41-bit timestamp + 10-bit worker + 12-bit sequence.'),
m('NanoID default length?',['8 chars','16 chars','21 chars','36 chars'],2,'Default 21 characters (64-bit entropy).'),
m('Auto-increment problem?',['Too long','Single point of failure','Not unique','Slow'],1,'Single bottleneck, reveals data volume.'),
m('Which ID is URL-safe?',['UUID','NanoID','Snowflake','All'],1,'NanoID uses URL-safe alphabet by default.')
]
);

/* ==== TOPIC 21: Design URL Shortener ==== */
addTopic('sd-url-shortener','Design URL Shortener','advanced',20,
['Design a service like TinyURL or Bitly that converts long URLs to short aliases and redirects users when they visit the short URL.',
'Core operations: createShortUrl(longUrl) → short code, getLongUrl(shortCode) → redirect (301/302). Key metrics: 100M DAU, 10M new URLs/day, 1B redirects/day.',
'Encoding: Base62 (a-z, A-Z, 0-9 = 62 chars). 7 chars = 62^7 = 3.5 trillion combinations. MD5 hash + truncate, or distributed counter (Snowflake → Base62 encode).',
'Redirect: 301 (permanent — cached by browser, cheaper) vs 302 (temporary — not cached, allows analytics). Use 301 for most, 302 for analytics tracking.',
'Architecture: Write: App → Counter Service (generate ID) → Base62 encode → Store in DB + Cache. Read: Request → CDN (short URL not cacheable) → App → Cache → DB. If not found → 404.'
],
'A URL shortener is like a phone directory. The short URL (short name) maps to the long URL (phone number). When you dial the short name, the operator (service) looks up the full number and connects you (redirect). The directory is much smaller than the full address book. Popular names (URLs) are memorized (cached).',
[
d('ID Generation for Short URLs','Base62 encoding: 7 chars = 3.5T combinations. Approaches: 1) Distributed counter (Snowflake) → Base62 — sequential, sortable. 2) MD5(longUrl)[:7] — fixed length, collision handling needed (use hash + salt). 3) Pre-generated random keys — KGS (Key Generation Service) pre-generates and gives keys — fast. Prefer KGS or Snowflake for production.'),
d('Redirect: 301 vs 302','301 Moved Permanently: browser caches redirect — subsequent visits skip server. Cheaper (no server hit). 302 Found: browser doesn\'t cache — every visit hits server. Use 301 for standard redirects. Use 302 for analytics tracking (count clicks), then return 301 after logging.'),
d('Caching Strategy','Hot URLs: cache recently created or frequently accessed URLs in Redis (LRU, 24h TTL). Write-through cache: cache on creation. Bloom filter: check before DB query to prevent cache penetration. CDN: not effective for short URL redirects (different per user). Custom analytics: async log to Kafka, batch write to analytics DB.'),
d('Scale and Performance','10M new URLs/day = 115 writes/sec. 1B redirects/day = 11,500 reads/sec (100:1 read/write). Storage: 10M × 500 bytes = 5GB/day → 1.8TB/year. Cache: Redis cluster, 80% hit rate = 9,200 read/sec from cache, 2,300 from DB. DB: Cassandra/DynamoDB for write scale. Cache TTL = 24h for hot URLs.')
],
'Key design decisions: ID generation (KGS or Snowflake + Base62), 301 vs 302 (use 301, 302 for analytics), caching strategy (Redis, Bloom filter for penetration), analytics pipeline (async Kafka → batch write). Don\'t over-engineer — start simple with cache + DB, add analytics later.',
[
q('How to generate short URL keys?','Base62 encode a unique ID from distributed counter (Snowflake), KGS, or MD5 hash.'),
q('301 vs 302 redirect?','301: permanent, cached by browser. 302: temporary, not cached, allows per-click analytics.'),
q('Database for URL shortener?','DynamoDB or Cassandra for write scale. Primary key: short_code. TTL for expiry.'),
q('What is KGS?','Key Generation Service — pre-generates unique random keys for fast allocation.'),
q('How to handle custom aliases?','Separate namespace. Check uniqueness at creation. Append random suffix if taken.'),
q('How to handle URL expiry?','Store expiration timestamp. TTL in DB. Periodic cleanup of expired entries.'),
q('How to cache short URLs?','Redis cache-aside. Bloom filter to prevent cache penetration for non-existent URLs.'),
q('How to track analytics?','Async pipeline: request → Kafka → batch processor → analytics DB (ClickHouse).'),
q('What is Base62 encoding?','a-z (26) + A-Z (26) + 0-9 (10) = 62 characters. 7 chars = 62^7 = 3.5T combinations.'),
q('How to handle collisions?','For hash-based: linear probing (append salt). For counter: never collide (unique input).')
],
R(10,35,100,25,'#0070f3','','Client','POST /shorten')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','App Server','Generate key')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','KGS','Get unique key')+
R(160,70,100,25,'#dc3545','','Cache','Redis store')+
A(10,90,10,110)+R(10,105,100,25,'#e83e8c','','DB','DynamoDB')+
R(160,105,100,25,'#6610f2','','Redirect','301 to long URL')+
R(290,35,190,155,'#17a2b8','','URL Shortener','Base62 encode + KGS. 301 redirect, Redis cache, DynamoDB. Analytics via Kafka.'),
T(240,220,'URL Shortener: Base62 short codes, 301/302 redirect. Redis cache, DynamoDB. KGS for key generation.',9,'#666','middle'),
[
e('URL Shortener (Express)','Core API endpoints.',codeBlock([
'const express = require("express");',
'const app = express();',
'// Create short URL',
'app.post("/api/shorten", async (req, res) => {',
'  const { longUrl, customAlias, ttl } = req.body;',
'  // Get unique key from KGS or hash',
'  const shortCode = customAlias || await keyService.getKey();',
'  const entry = { shortCode, longUrl, createdAt: new Date(), ttl: ttl || 0 };',
'  await db.put({ TableName: "UrlMappings", Item: entry });',
'  await cache.set(shortCode, longUrl, ttl || 86400);',
'  res.json({ shortUrl: "https://short.ly/" + shortCode });',
'});',
'// Redirect',
'app.get("/:code", async (req, res) => {',
'  const code = req.params.code;',
'  // Check cache first',
'  let longUrl = await cache.get(code);',
'  if (!longUrl) {',
'    const item = await db.get({ TableName: "UrlMappings", Key: { shortCode: code } });',
'    if (!item.Item) return res.status(404).send("Not found");',
'    longUrl = item.Item.longUrl;',
'    await cache.set(code, longUrl, 3600);',
'  }',
'  // Log analytics async',
'  analyticsQueue.send({ code, timestamp: Date.now(), ip: req.ip, userAgent: req.headers["user-agent"] });',
'  res.redirect(301, longUrl);',
'});'
]),'URL shortener API — create and redirect with caching.'),
e('Base62 Encoding','Encode numbers to short strings.',codeBlock([
'const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";',
'const BASE = ALPHABET.length; // 62',
'function encode(num) {',
'  let encoded = "";',
'  while (num > 0) {',
'    encoded = ALPHABET[num % BASE] + encoded;',
'    num = Math.floor(num / BASE);',
'  }',
'  return encoded || "a";',
'}',
'function decode(str) {',
'  let num = 0;',
'  for (const char of str) {',
'    num = num * BASE + ALPHABET.indexOf(char);',
'  }',
'  return num;',
'}',
'// Snowflake ID 123456789 → Base62: "8m0Kx"',
'// 6 chars = 62^6 = 56.8B combinations'
]),'Base62 encoding/decoding for short URL codes.'),
e('KGS (Key Generation Service)','Pre-generate keys.',codeBlock([
'class KeyGenerationService {',
'  constructor() {',
'    this.batchSize = 10000;',
'    this.availableKeys = [];',
'  }',
'  async refillKeys() {',
'    const start = await db.getNextKeyRange(this.batchSize);',
'    for (let i = 0; i < this.batchSize; i++) {',
'      this.availableKeys.push(encode(start + i));',
'    }',
'  }',
'  async getKey() {',
'    if (this.availableKeys.length < 1000) {',
'      await this.refillKeys(); // async refill',
'    }',
'    return this.availableKeys.pop();',
'  }',
'  // Pre-generate: run as separate service',
'  // Fill pool with 1M+ keys on startup',
'  // Keys are used and marked as taken in DB',
'  // When low, generate more',
'  // Benefits: fast allocation, no DB write at request time'
]),'Key Generation Service — pre-generated key pool for fast allocation.'),
e('Analytics Pipeline','Async analytics processing.',codeBlock([
'// Log click event (fast, non-blocking)',
'async function logClick(code, req) {',
'  const event = {',
'    code, timestamp: Date.now(),',
'    ip: req.ip, userAgent: req.headers["user-agent"],',
'    referer: req.headers["referer"] || "",',
'    country: geoLookup(req.ip),',
'  };',
'  await kafka.send({ topic: "url-clicks", messages: [{ value: JSON.stringify(event) }] });',
'}',
'// Batch processor',
'const consumer = kafka.consumer({ groupId: "analytics-processor" });',
'await consumer.run({',
'  eachBatch: async ({ batch }) => {',
'    const events = batch.messages.map(m => JSON.parse(m.value.toString()));',
'    // Batch write to analytics DB',
'    const query = "INSERT INTO clicks (code, timestamp, ip, country, referer) VALUES ?";',
'    const values = events.map(e => [e.code, new Date(e.timestamp), e.ip, e.country, e.referer]);',
'    await analyticsDb.query(query, [values]);',
'  },',
'});'
]),'Async analytics pipeline — Kafka → batch write to analytics DB.')
],
[
m('Base62 alphabet size?',['36','52','62','64'],2,'a-z, A-Z, 0-9 = 62 characters.'),
m('301 redirect is?',['Temporary redirect','Permanent, cached by browser','Not cached','Error'],1,'301 Moved Permanently — browser caches it.'),
m('What is KGS?',['Key Generation Service','Kubernetes Service','Key Gateway Service','Knowledge Graph'],0,'Pre-generates keys for fast allocation.'),
m('Read/write ratio for URL shortener?',['1:1','10:1','100:1','1000:1'],2,'~100:1 (1B reads vs 10M writes/day).'),
m('Short URL 7 chars max?',['62^7 combinations','62^6','10^7','2^32'],0,'62^7 = 3.5 trillion combinations.'),
m('What cache strategy?',['Write-through + LRU','Read-only','No cache','TTL only'],0,'Cache-aside with LRU eviction and TTL.')
]
);

/* ==== TOPIC 22: Design Pastebin ==== */
addTopic('sd-pastebin','Design Pastebin','advanced',20,
['Design a service like Pastebin where users can store text (code snippets, logs) and share via a unique URL.',
'Core operations: createPaste(content, options) → short URL, getPaste(id) → view content, list recent pastes. Options: expiry (burn-after-read, TTL), language (syntax highlighting), password protection.',
'Key metrics: 10M pastes/day. 100M reads/day. Average paste size: 10KB. Storage: 10M × 10KB = 100GB/day → 36TB/year. Need compression + object storage.',
'Architecture: Write: App → generate ID → compress content → S3/GCS (object storage) → metadata in DB. Read: App → DB (metadata) → S3 (content) → render (syntax highlighting). Cache for hot pastes.',
'Features: syntax highlighting (Prism/Highlight.js), raw text view, embed as iframe, burn-after-read (one-time view), password protection, expiration.',
'Differentiator: supports custom slugs, folder organization, API access, version history for paid tiers.'
],
'Pastebin is like a public bulletin board. You pin your note (paste) with a unique tag (URL). People read it and it stays until someone removes it (expiry) or it\'s read once and torn down (burn-after-read). The board is searchable by recent posts, and some posts are protected (password). Large posters use compression (whiteboard that folds up).',
[
d('Storage Architecture','Hot pastes (< 24h): SSD + Redis cache. Warm pastes (< 30 days): standard storage. Cold pastes (> 30 days): S3 Glacier/Deep Archive. Object storage (S3/GCS) for paste content. Key = paste_id. Metadata (title, expires_at, password_hash, views) in DynamoDB or PostgreSQL. S3 can store gzipped content.'),
d('ID Generation','Similar to URL shortener: Base62 encoded unique ID. Distributed counter or random key. 7-8 chars sufficient. Custom slugs: check uniqueness. Sequential IDs allowed (not security concern for paste content). Burn-after-read: ID used once, deleted after view.'),
d('Syntax Highlighting','Language detection: file extension, auto-detect (shebang, keywords), or user-specified. Rendering: server-side (highlight.js for SEO) + client-side for dynamic. Common languages: JS, Python, Go, SQL, HTML, CSS, JSON, YAML, Bash. Consider server-side rendering for faster page load.'),
d('Expiry and Cleanup','expires_at field in metadata. Background job: scans for expired pastes, deletes from storage + DB. TTL in DynamoDB (automatic deletion). Burn-after-read: delete after first view (mark as deleted before returning content). Rate-limited to prevent abuse.')
],
'Use object storage (S3) for paste content (saves DB storage costs). Compress before storing. Cache hot pastes in Redis. Background cleanup job for expired pastes. Syntax highlighting on server-side for SEO. Burn-after-read requires careful race condition handling.',
[
q('Where to store paste content?','Object storage (S3/GCS) — cheap, scalable. Metadata in DB.'),
q('How to handle burn-after-read?','Delete paste after first view. Must handle race conditions (mutex).'),
q('How to expire pastes?','expires_at field. Background cleanup job or DB TTL.'),
q('How to do syntax highlighting?','Prism.js or Highlight.js. Server-side for SEO, client-side for dynamic.'),
q('What is the read/write ratio?','~10:1 (100M reads vs 10M writes/day).'),
q('How to estimate storage?','10M pastes × 10KB average = 100GB/day. Compressed: ~30GB/day.'),
q('What content to compress?','Text content — gzip/brotli before S3 storage. Saves ~70% storage.'),
q('How to handle password protection?','Hash password (bcrypt). Store hash in metadata. Prompt before showing content.'),
q('What is raw text view?','Return content as text/plain for curl/wget downloads.'),
q('How to prevent abuse?','Rate limit creation per IP/user. CAPTCHA for anonymous. Max paste size limit.')
],
R(10,35,100,25,'#0070f3','','Client','Create/View')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','App Server','API')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Generate ID','Base62')+
R(160,70,100,25,'#dc3545','','S3 Storage','Compressed')+
R(10,105,100,25,'#e83e8c','','DB (Dynamo)','Metadata')+
R(160,105,100,25,'#6610f2','','Cache (Redis)','Hot pastes')+
R(290,35,190,155,'#17a2b8','','Pastebin','Object storage for content. Syntax highlighting, expiry, burn-after-read. Rate-limited creation.'),
T(240,220,'Pastebin: Object storage for content, syntax highlighting, expiry, burn-after-read.',9,'#666','middle'),
[
e('Create and Get Paste','Core API endpoints.',codeBlock([
'app.post("/api/pastes", async (req, res) => {',
'  const { content, title, language, expiry, password, burnAfterRead } = req.body;',
'  if (content.length > MAX_SIZE) return res.status(413).json({ error: "Too large" });',
'  const id = await keyService.getKey();',
'  const compressed = zlib.gzipSync(content);',
'  await s3.putObject({ Bucket: "pastes", Key: id, Body: compressed, ContentEncoding: "gzip" }).promise();',
'  const paste = { id, title: title || "Untitled", language: language || "auto", expiresAt: calcExpiry(expiry), passwordHash: password ? bcrypt.hashSync(password, 10) : null, burnAfterRead, views: 0, createdAt: new Date() };',
'  await db.put({ TableName: "Pastes", Item: paste });',
'  res.json({ url: "https://paste.example.com/" + id });',
'});',
'app.get("/:id", async (req, res) => {',
'  let paste = await cache.get("paste:" + req.params.id);',
'  if (!paste) {',
'    paste = (await db.get({ TableName: "Pastes", Key: { id: req.params.id } })).Item;',
'    if (paste && Date.now() < new Date(paste.expiresAt).getTime()) {',
'      await cache.setex("paste:" + req.params.id, 3600, JSON.stringify(paste));',
'    }',
'  }',
'  if (!paste || (paste.expiresAt && Date.now() > new Date(paste.expiresAt).getTime())) {',
'    return res.status(404).send("Paste expired or not found");',
'  }',
'  const data = await s3.getObject({ Bucket: "pastes", Key: paste.id }).promise();',
'  const content = zlib.gunzipSync(data.Body).toString();',
'  if (paste.burnAfterRead) { await deletePaste(paste.id); }',
'  res.render("view", { paste, content, highlighted: highlight(content, paste.language) });',
'});'
]),'Pastebin create and view endpoints with S3 storage and caching.'),
e('Background Expiry Cleanup','Expired paste removal.',codeBlock([
'// Background job — runs every 5 minutes',
'async function cleanupExpired() {',
'  const expired = await db.scan({',
'    TableName: "Pastes",',
'    FilterExpression: "expiresAt < :now",',
'    ExpressionAttributeValues: { ":now": Math.floor(Date.now() / 1000) },',
'  }).promise();',
'  for (const paste of expired.Items) {',
'    console.log("Deleting expired paste:", paste.id);',
'    // Delete from S3',
'    await s3.deleteObject({ Bucket: "pastes", Key: paste.id }).promise();',
'    // Delete from DB',
'    await db.delete({ TableName: "Pastes", Key: { id: paste.id } }).promise();',
'    // Delete from cache',
'    await cache.del("paste:" + paste.id);',
'  }',
'  console.log("Cleaned up", expired.Items.length, "expired pastes");',
'}',
'// Run every 5 minutes',
'setInterval(cleanupExpired, 5 * 60 * 1000);'
]),'Background job for expired paste cleanup.'),
e('Syntax Highlighting (Server-side)','Highlight on render.',codeBlock([
'const hljs = require("highlight.js");',
'function detectLanguage(content, filename, specified) {',
'  if (specified && specified !== "auto") return specified;',
'  if (filename) {',
'    const ext = filename.split(".").pop();',
'    const langMap = { js: "javascript", py: "python", go: "go", sql: "sql", sh: "bash", yml: "yaml", json: "json", html: "xml", css: "css" };',
'    if (langMap[ext]) return langMap[ext];',
'  }',
'  const result = hljs.highlightAuto(content);',
'  return result.language || "plaintext";',
'}',
'function highlightCode(content, language) {',
'  try {',
'    if (language === "plaintext") return hljs.highlight(content, { language: "plaintext" }).value;',
'    return hljs.highlight(content, { language }).value;',
'  } catch {',
'    return hljs.highlightAuto(content).value;',
'  }',
'}'
]),'Server-side syntax highlighting with auto-detection.'),
e('Rate Limiting for Paste Creation','Prevent spam.',codeBlock([
'const rateLimit = require("express-rate-limit");',
'const pasteLimiter = rateLimit({',
'  windowMs: 60 * 60 * 1000, // 1 hour',
'  max: 50, // max 50 pastes per hour per IP',
'  message: { error: "Too many pastes. Try again later." },',
'});',
'app.post("/api/pastes", pasteLimiter, async (req, res) => {',
'  if (!req.isAuthenticated && req.body.content.length > 100000) {',
'    return res.status(413).json({ error: "Anonymous users limited to 100KB" });',
'  }',
'  // ... create paste',
'});'
]),'Rate limiting paste creation per IP to prevent abuse.')
],
[
m('Where to store paste content?',['Database (text column)','Object storage (S3)','Local filesystem','Redis'],1,'S3/GCS for cheap, scalable object storage.'),
m('Burn-after-read means?',['Expires after 1 hour','Deleted after first view','Requires password','Public view only'],1,'Content deleted after being viewed once.'),
m('Average paste size estimate?',['1KB','10KB','100KB','1MB'],1,'~10KB average paste size.'),
m('Storage for 10M pastes/day?',['1GB/day','100GB/day','1TB/day','10TB/day'],1,'10M × 10KB = 100GB/day (compressed ~30GB).'),
m('How to handle expiry?',['TTL in DB + background cleanup','Manual deletion','No expiry','Cache TTL only'],0,'DB TTL + background job for cleanup.'),
m('What mitigates abuse?',['No limits','Rate limiting + CAPTCHA + size limits','Encryption','CDN'],1,'Rate limiting, CAPTCHA, and size limits.')
]
);

/* ==== TOPIC 23: Design Chat System ==== */
addTopic('sd-chat-system','Design Chat System','advanced',25,
['Design a real-time chat system like WhatsApp, Messenger, or Slack supporting 1-on-1 messaging, group chats, and presence indicators.',
'Core features: send/receive messages (real-time), 1-on-1 chat, group chat, presence (online/offline/typing), message history, delivery/read receipts, media sharing.',
'Key metrics: 1B users, 100B messages/day (~1M msg/sec peak). Each message ~1KB. Storage: 100B × 1KB = 100TB/day. Two years: ~73PB.',
'Real-time: WebSocket (persistent connection) for instant delivery. HTTP long-polling fallback. Push notifications when user offline.',
'Architecture: Client → WebSocket LB → Chat Service → Message Queue → DB. Presence Service (Redis pub/sub). Notification Service (APNS/FCM).',
'Group chat: fan-out on write (for small groups) or fan-out on read (for large groups). WhatsApp: fan-out on write. Slack: fan-out on read for large channels.'
],
'A chat system is like a postal service with instant messaging built in. Regular mail (HTTP) for history. A direct phone line (WebSocket) for real-time chat. Postman delivers to your home immediately if you\'re home (online), leaves a notification if you\'re out (push notification). Group chats = party line phone (small group) or announcement board (large channel).',
[
d('Real-Time Communication','WebSocket: persistent TCP connection for bidirectional real-time messaging. Lower overhead than HTTP. Full-duplex. Connection management at scale: WebSocket LB (ELB, HAProxy), sticky sessions or external session store. Fallback: Server-Sent Events (SSE) or long-polling for clients without WebSocket.'),
d('Message Flow (1-on-1)','Sender → WebSocket LB → Chat Service: 1) Validate message. 2) Store in DB (timestamped). 3) Publish to receiver\'s queue/channel. 4) If receiver online → push via WebSocket. 5) If offline → push notification via APNS/FCM. 6) Receiver sends ACK for delivery receipt. 7) Read receipt when message displayed.'),
d('Group Chat Delivery','Small groups (< 100): fan-out on write — write one copy per recipient, each recipient has their own inbox. Large groups (> 100): fan-out on read — write once to group timeline, each member reads their own cursor position. WhatsApp uses fan-out on write (encrypted per recipient). Slack uses fan-out on read for large channels.'),
d('Presence and Typing Indicators','Presence: WebSocket heartbeat (ping/pong every 30s). Last seen: stored in Redis with TTL. Online = active WebSocket connection. Typing indicator: user typing → broadcast to recipient/channel (debounced, e.g., every 2s). Disable after 5s of inactivity. Redis pub/sub to broadcast across chat service instances.'),
d('Message Storage and History','Messages stored in Cassandra/DynamoDB (write-optimized). Partition key: chat_id/recipient_id. Sort key: timestamp (or message_id). Time-series pattern. Retention: unlimited for personal chats, auto-delete for ephemeral. Full-text search: Elasticsearch for message search.')
],
'WebSocket for real-time, WebSocket LB for scale. Fan-out on write for small groups (WhatsApp model). Fan-out on read for large channels (Slack model). Cassandra for message storage (write-optimized). Redis for presence (pub/sub). Push notifications via FCM/APNS. End-to-end encryption (E2EE) for privacy.',
[
q('What protocol for real-time?','WebSocket — persistent, bidirectional, full-duplex TCP connection.'),
q('Fan-out on write vs read?','Write: copy to each recipient (small groups). Read: single copy, each reads (large groups).'),
q('How to store messages?','Cassandra/DynamoDB. Partition: chat_id. Sort: timestamp. Write-optimized.'),
q('How to handle offline delivery?','Store messages in inbox. Push notification (APNS/FCM). Deliver when online.'),
q('How to implement presence?','WebSocket heartbeat. Redis TTL-based online status. Pub/sub for cross-instance.'),
q('How do delivery/read receipts work?','ACK on delivery. Read mark on message display. Both timestamped events.'),
q('How to handle typing indicators?','Debounced events (every 2s). WebSocket broadcast. Timeout after 5s idle.'),
q('What about media sharing?','Upload to S3, send message with media URL + thumbnail. Separate media service.'),
q('How to encrypt messages?','End-to-end: each client has key pair. Message encrypted with recipient\'s public key.'),
q('How to scale WebSocket connections?','WebSocket LB (ELB with proxy protocol). Sticky sessions or external session store.')
],
R(10,35,100,25,'#0070f3','','Client A','WebSocket')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','WS LB','HAProxy')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Chat Service','Validate+Store')+
A(110,83,140,83)+A(10,90,10,110)+
R(150,70,100,25,'#dc3545','','Message Queue','Kafka/SQS')+
R(10,105,100,25,'#e83e8c','','DB','Cassandra')+
A(250,83,280,83)+
R(150,105,100,25,'#6610f2','','Push Notification','FCM/APNS')+
R(10,140,100,25,'#17a2b8','','Redis','Presence+Pub/Sub')+
R(290,35,190,155,'#17a2b8','','Chat System','WebSocket real-time. Fan-out on write (groups). Cassandra storage. Redis presence. Push notifications.'),
T(240,220,'Chat System: WebSocket real-time messaging. Fan-out: write (small groups) or read (large channels). Presence, push, E2EE.',9,'#666','middle'),
[
e('WebSocket Chat Server','Real-time messaging.',codeBlock([
'const WebSocket = require("ws");',
'const server = new WebSocket.Server({ port: 8080 });',
'// Connection map { userId: ws }',
'const connections = new Map();',
'server.on("connection", (ws, req) => {',
'  const userId = authenticateUser(req);',
'  connections.set(userId, ws);',
'  // Broadcast presence',
'  broadcastPresence(userId, "online");',
'  ws.on("message", async (data) => {',
'    const msg = JSON.parse(data);',
'    // Store message',
'    await messageStore.save({',
'      from: userId, to: msg.to,',
'      content: msg.content, timestamp: Date.now(),',
'      type: msg.type || "text",',
'    });',
'    // Deliver to recipient if online',
'    const recipientWs = connections.get(msg.to);',
'    if (recipientWs?.readyState === WebSocket.OPEN) {',
'      recipientWs.send(JSON.stringify({ from: userId, content: msg.content, timestamp: Date.now() }));',
'    } else {',
'      // Push notification',
'      sendPushNotification(msg.to, `New message from ${userId}`);',
'    }',
'  });',
'  ws.on("close", () => {',
'    connections.delete(userId);',
'    broadcastPresence(userId, "offline");',
'  });',
'});'
]),'WebSocket chat server with presence and push notification fallback.'),
e('Message Storage (Cassandra Schema)','Write-optimized messages.',codeBlock([
'CREATE TABLE messages_by_chat (',
'  chat_id TEXT,',
'  message_id TIMEUUID,',  // time-based sort key
'  sender_id TEXT,',
'  content TEXT,',
'  message_type TEXT,',  // text, image, file, system
'  created_at TIMESTAMP,',
'  metadata MAP<TEXT, TEXT>,',
'  PRIMARY KEY (chat_id, message_id)',
') WITH CLUSTERING ORDER BY (message_id DESC)',
'  AND default_time_to_live = 0;',  // no expiry
'-- For user inbox (fan-out on write):',
'CREATE TABLE user_inbox (',
'  user_id TEXT,',
'  message_id TIMEUUID,',
'  from_user TEXT,',
'  chat_id TEXT,',
'  content TEXT,',
'  is_read BOOLEAN,',
'  PRIMARY KEY (user_id, message_id)',
') WITH CLUSTERING ORDER BY (message_id DESC);'
]),'Cassandra schema for chat messages and user inbox.'),
e('Redis Presence Service','Online/offline tracking.',codeBlock([
'class PresenceService {',
'  constructor(redis) {',
'    this.redis = redis;',
'    this.PRESENCE_TTL = 120; // 2 min without heartbeat = offline',
'  }',
'  async heartbeat(userId) {',
'    await this.redis.setex("presence:" + userId, this.PRESENCE_TTL, Date.now().toString());',
'    // Publish to cross-instance channel',
'    await this.redis.publish("presence", JSON.stringify({ userId, status: "online" }));',
'  }',
'  async isOnline(userId) {',
'    const last = await this.redis.get("presence:" + userId);',
'    return last !== null;',
'  }',
'  async getPresence(userId) {',
'    const last = await this.redis.get("presence:" + userId);',
'    if (!last) return { userId, status: "offline", lastSeen: null };',
'    return { userId, status: "online", lastSeen: parseInt(last) };',
'  }',
'  // Subscribe to presence events (all instances)',
'  subscribe(callback) {',
'    this.redis.subscribe("presence", (msg) => {',
'      callback(JSON.parse(msg));',
'    });',
'  }',
'}'
]),'Redis-based presence service with TTL and pub/sub.'),
e('End-to-End Encryption (Concept)','Encrypted messaging.',codeBlock([
'// E2EE key exchange (simplified)',
'// Each client generates RSA/Curve25519 key pair',
'const clientKeys = crypto.generateKeyPairSync("x25519");',
'// When Alice sends to Bob:',
'// 1. Alice gets Bob\'s public key from server',
'const bobPublicKey = await getPublicKey("bob");',
'// 2. Alice encrypts message with Bob\'s public key',
'const encrypted = crypto.publicEncrypt(bobPublicKey, Buffer.from("Hello Bob!"));',
'// 3. Server stores encrypted message — cannot read it',
'await messageStore.save({ from: "alice", to: "bob", content: encrypted.toString("base64"), encrypted: true });',
'// 4. Bob receives and decrypts with his private key',
'const decrypted = crypto.privateDecrypt(bobPrivateKey, Buffer.from(encrypted, "base64"));',
'// Perfect Forward Secrecy: use ephemeral keys (Signal protocol) for better security'
]),'End-to-end encryption — server cannot read message content.')
],
[
m('WebSocket provides what?',['HTTP requests','Persistent bidirectional connection','One-way push','File transfer'],1,'Persistent, bidirectional, full-duplex real-time communication.'),
m('Fan-out on write best for?',['Large groups','Small groups','1-on-1','Broadcast'],1,'Small groups — single write per recipient.'),
m('Cassandra partition key for messages?',['Timestamp','chat_id','user_id','message_id'],1,'Partition by chat_id for efficient retrieval.'),
m('How is presence tracked?',['DB query','Redis with TTL + heartbeat','WebSocket only','Polling'],1,'Redis TTL-based presence with heartbeats.'),
m('What does push notification do?',['Open WebSocket','Alert when offline','Sync messages','Encrypt data'],1,'Notifies offline users of new messages.'),
m('Delivery receipt requires?',['Server ACK','Client ACK on delivery','Auto-ACK','No ACK needed'],1,'Client sends ACK after receiving message.')
]
);

/* ==== TOPIC 24: Design Twitter Feed ==== */
addTopic('sd-design-twitter','Design Twitter Feed','advanced',30,
['Design a social media news feed like Twitter/Facebook where users post tweets and see a feed of tweets from people they follow.',
'Core features: post tweet, view timeline (home feed), follow/unfollow user, like/retweet/reply, media (images/video), trending topics, search.',
'Key metrics: 500M DAU, 500M tweets/day (~6000/sec peak), each tweet ~1KB. Each user follows ~200 accounts. Fan-out read (pull) vs fan-out write (push) for feed generation.',
'Two feed models: Home Feed (tweets from followed users) — needs real-time updates. Trending Feed (popular topics) — batch computed. Timeline is the core challenge.',
'Two approaches: PULL (fan-out on read): generate feed on demand by merging followed users\' timelines. PUSH (fan-out on write): pre-compute feed for each user when a tweet is posted.'
],
'Twitter feed is like a personalized newspaper. PUSH model = the newspaper is printed and delivered to your door every morning (pre-computed). You open it and read immediately. PULL model = you go to the newsstand and pick from available papers when you want to read. Twitter uses PUSH for regular users (pre-computed feed) and PULL for celebrities (million followers would crush PUSH).',
[
d('Fan-Out on Write (Push)','When user tweets: insert tweet into EACH follower\'s feed timeline. Read: just fetch timeline from cache. Pro: fast reads (O(1)). Con: expensive writes for celebrities (millions of writes per tweet). Twitter: PUSH for users with < 10K followers. Hybrid: PUSH for regular users, PULL for celebrities.'),
d('Fan-Out on Read (Pull)','When user views feed: fetch recent tweets from all followed users, merge, sort, return. Pro: no write amplification. Con: slow reads (merge K lists). K = number of followed users. Good for: celebrities (few writes, many readers), infrequent readers. Hybrid approach: pre-compute for active followers on tweet.'),
d('Timeline Storage and Caching','Timeline: Redis sorted sets (feed:userId, score = tweet timestamp). Pre-computed feed stored for 24h. Tweets themselves in DB/cache. Cache: Redis cluster for hot feeds (active users first page). DB: Cassandra/PostgreSQL for tweet storage. Pagination: cursor-based (tweet ID/timestamp) not offset-based.'),
d('Trending Topics','Batch processing: MapReduce/Spark every 5 minutes. Count hashtags in recent tweets. Normalize by baseline popularity. Demote topics that have been trending too long. Geo-specific trends: separate per region. Real-time: Storm/Flink for streaming trend detection.')
],
'Use hybrid approach: PUSH for regular users (most followers < 10K), PULL for celebrities (millions of followers). Pre-compute feed in Redis sorted sets. Cache aggressively (feed for active users). Use async processing for PUSH (tweet → queue → fan-out workers). Handle celebrity tweets differently (pull on demand).',
[
q('What are the two feed generation models?','PUSH (fan-out on write — pre-compute) and PULL (fan-out on read — on demand).'),
q('Why hybrid approach?','PUSH for regular users (fast reads). PULL for celebrities (avoid millions of writes per tweet).'),
q('How does Twitter feed work?','Pre-computed timeline in Redis. Celebrities use PULL. Real-time tweets mixed in.'),
q('How to store timelines?','Redis sorted sets (score = timestamp). TTL = 24h. Pre-computed for active users.'),
q('How to handle tweet ingestion?','Load balancer → Tweet service → Kafka → Fan-out service + Timeline service + Search index.'),
q('How to paginate feed?','Cursor-based (tweet_id or timestamp). Offset-based pagination is inefficient for real-time feeds.'),
q('How to handle media?','Upload to S3/CDN. Tweet contains media URL + thumbnail. Separate media service.'),
q('How to compute trending topics?','Batch: Spark every 5 min. Count hashtags, normalize, demote stale trends.'),
q('How to rank feed?','Reverse chronological (simplest). ML-based ranking: engagement score, recency, relevance.'),
q('How to handle deletes/edits?','Delete/update from all timelines. Expensive — use tombstone records or soft delete.')
],
R(10,35,100,25,'#0070f3','','User','Post tweet')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','API Gateway','Validate')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Tweet Service','Store tweet')+
R(160,70,100,25,'#dc3545','','Fan-out Worker','Push to followers')+
R(10,105,100,25,'#e83e8c','','DB + Cache','Tweets')+
R(160,105,100,25,'#6610f2','','Timeline Cache','Redis sorted set')+
R(10,140,100,25,'#17a2b8','','Search Index','Elasticsearch')+
R(290,35,190,155,'#17a2b8','','Twitter Feed','Hybrid PUSH/PULL. Redis sorted sets for timeline. Async fan-out. Trending via Spark batch.'),
T(240,220,'Twitter Feed: Hybrid PUSH/PULL. Redis timeline cache, async fan-out, trending batch processing.',9,'#666','middle'),
[
e('Fan-Out on Write Worker','Push tweet to followers.',codeBlock([
'// Fan-out service — called after tweet is stored',
'async function fanOutTweet(tweet, userId) {',
'  // Get followers (from Graph DB / Redis cache)',
'  const followers = await getFollowers(userId);',
'  const followerCount = followers.length;',
'  // If celebrity → skip fan-out (use pull model)',
'  if (followerCount > 10000) {',
'    await redis.set("celebrity_tweet:" + tweet.id, JSON.stringify(tweet), "EX", 86400);',
'    return; // followers will pull on demand',
'  }',
'  // Fan-out: insert tweet into each follower\'s timeline',
'  const pipeline = redis.pipeline();',
'  // Limit to first 1000 active followers for speed',
'  const activeFollowers = await getActiveFollowers(userId, 1000);',
'  for (const followerId of activeFollowers) {',
'    pipeline.zadd("feed:" + followerId, tweet.timestamp, tweet.id);',
'    pipeline.zremrangebyrank("feed:" + followerId, 0, -501);', // keep 500 max
'  }',
'  await pipeline.exec();',
'  // Push remaining via async queue',
'  if (activeFollowers.length < followerCount) {',
'    await queue.send("fanout", { tweetId: tweet.id, followers: followers.slice(1000) });',
'  }',
'}'
]),'Fan-out worker — push tweet to active followers, queue rest.'),
e('Timeline Generation (Read)','Build timeline on request.',codeBlock([
'async function getTimeline(userId, cursor, limit = 20) {',
'  const timelineKey = "feed:" + userId;',
'  // Check pre-computed feed',
'  let tweetIds = await redis.zrevrangebyscore(timelineKey, "+inf", cursor || "+inf", "LIMIT", 0, limit);',
'  const tweets = [];',
'  // If not enough from pre-computed, fetch celebrity tweets',
'  if (tweetIds.length < limit) {',
'    const celebIds = await getFollowedCelebrities(userId);',
'    for (const celebId of celebIds) {',
'      const celebTweets = await redis.zrevrangebyscore("celeb_feed:" + celebId, "+inf", cursor || "+inf", "LIMIT", 0, limit - tweetIds.length);',
'      tweetIds = tweetIds.concat(celebTweets);',
'    }',
'    // Merge and sort all',
'    tweetIds.sort((a, b) => b - a);',
'    tweetIds = tweetIds.slice(0, limit);',
'  }',
'  // Fetch full tweet data from cache/DB',
'  for (const id of tweetIds) {',
'    const tweet = await getTweet(id);',
'    if (tweet) tweets.push(tweet);',
'  }',
'  return { tweets, nextCursor: tweetIds[tweetIds.length - 1] };',
'}'
]),'Timeline generation — pre-computed feed + celebrity pull.'),
e('Tweet Storage (Cassandra)','High-write schema.',codeBlock([
'CREATE TABLE tweets (',
'  tweet_id TIMEUUID,',
'  user_id TEXT,',
'  content TEXT,',
'  media_ids LIST<TEXT>,',
'  hashtags SET<TEXT>,',
'  mentions SET<TEXT>,',
'  reply_to TEXT,',
'  retweet_of TEXT,',
'  created_at TIMESTAMP,',
'  engagement COUNTER,',
'  PRIMARY KEY (user_id, tweet_id)',
') WITH CLUSTERING ORDER BY (tweet_id DESC);',
'-- Index for hashtag search:',
'CREATE MATERIALIZED VIEW tweets_by_hashtag AS',
'  SELECT * FROM tweets WHERE hashtags IS NOT NULL AND tweet_id IS NOT NULL',
'  PRIMARY KEY (hashtag, tweet_id);'
]),'Cassandra tweet storage schema with materialized view for hashtags.'),
e('Trending Topics Computation','Batch processing.',codeBlock([
'// Spark job — runs every 5 minutes',
'val tweets = spark.read.format("cassandra").options(Map("table" -> "tweets", "keyspace" -> "twitter")).load()',
'  .filter($"created_at" > (System.currentTimeMillis() / 1000) - 3600) // last 1 hour',
'val hashtagCounts = tweets',
'  .select(explode($"hashtags").as("hashtag"), $"created_at")',
'  .groupBy($"hashtag", window($"created_at", "5 minutes"))',
'  .count()',
'// Normalize by baseline (average count for this hashtag)',
'val trending = hashtagCounts',
'  .join(baseline, "hashtag")',
'  .withColumn("score", $"count" / ($"baseline" + 1))',
'  .filter($"score" > 1.5)', // only hashtags with >1.5x baseline
'  .orderBy($"score".desc)',
'  .limit(20)',
'// Save trending topics to Redis',
'trending.foreach { row =>',
'  redis.hset("trending", row.hashtag -> row.score.toString)',
'}'
]),'Trending topics computation with Spark — normalized by baseline.')
],
[
m('PUSH model (fan-out on write) benefits?',['Fast writes','Fast reads','Fewer resources','Simpler code'],1,'Reads are O(1) — pre-computed feed.'),
m('PULL model better for?',['Regular users','Celebrities','All users','Group chats'],1,'Celebrities — avoids millions of writes per tweet.'),
m('Twitter uses which hybrid approach?',['PUSH for all','PUSH for regular, PULL for celebrities','PULL for all','Neither'],1,'PUSH for regular users, PULL for celebrities.'),
m('How to store timeline?',['MySQL','Redis sorted set','S3','Local file'],1,'Redis sorted set with timestamp as score.'),
m('Trending topics computed how?',['Real-time every request','Batch (Spark every 5 min)','On tweet creation','Manual'],1,'Batch processing every 5 minutes.'),
m('Fan-out writes per celebrity tweet?',['Few','Millions','Zero','Hundreds'],1,'Millions of writes if fan-out for celebrities — avoided via PULL.')
]
);

var padTopics = require('../pad-topics');
padTopics(topics, topicList, addTopic);

// ---- GENERATE ----
var dataDir = __dirname;

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["system-design"] = TOPICS_DATA["system-design"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["system-design"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated System Design topics: ' + Object.keys(topics).length);


