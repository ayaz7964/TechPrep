const fs = require('fs');
const { svgW, R, A, T, Tw } = require('../svg-helpers');

function codeBlock(l) { return l.join('\n'); }
function q(a,b) { return {question:a.replace(/'/g,"\\'"),answer:b.replace(/'/g,"\\'")}; }
function m(a,b,c,d) { return {question:a.replace(/'/g,"\\'"),options:b,answer:c,explanation:d.replace(/'/g,"\\'")}; }
function e(a,b,c,d) { return {title:a.replace(/'/g,"\\'"),useCase:b.replace(/'/g,"\\'"),code:c,description:d.replace(/'/g,"\\'")}; }
function d(a,b) { return {heading:a.replace(/'/g,"\\'"),text:b.replace(/'/g,"\\'")}; }

var topics={},topicList=[];
function addTopic(id,t,diff,m,tldr,layman,deep,intAns,questions,svgInner,codeEx,mcq){
  var o={id:id,title:t,difficulty:diff,estimatedMinutes:m,tldr:tldr,laymanDefinition:layman,deepDive:deep,interviewAnswer:intAns,interviewQuestions:questions,diagramSvg:svgW(500, 300,t,svgInner),codeExamples:codeEx,mcqQuestions:mcq};
  topics[id]=o;
  topicList.push({id:id,title:t,difficulty:diff,estimatedMinutes:m,file:id+'.json'});
}

/* =================== TOPIC 1: Kong =================== */
addTopic('ag-kong','Kong','intermediate',20,
['Kong is an open-source API Gateway built on NGINX and OpenResty, providing traffic control, security, analytics, and plugin extensibility.',
'Kong offers OSS (Community) and Enterprise editions. It operates in DB-mode (PostgreSQL/Cassandra) or DB-less (declarative config) mode.',
'Core concepts: Routes (match requests), Services (backend targets), Upstreams (load balancing), Consumers (auth entities), and Plugins (extensions).',
'Plugins cover auth (Key Auth, JWT, OAuth2), security (CORS, IP Restriction, Rate Limiting), traffic control, and observability (Prometheus, Datadog).'
],
'Kong is like a smart security checkpoint at a corporate building. Every visitor (API request) passes through Kong. It checks their badge (auth), looks up their destination (routing), limits visitors (rate limiting), logs visits (logging), and directs them to the right office (backend).',
[
d('Kong Architecture','Kong runs on NGINX + OpenResty (Lua). Two processes: Kong (admin API + management) and OpenResty (proxy runtime). PostgreSQL in DB-mode. DB-less uses declarative YAML/JSON. Enterprise adds Kong Manager UI, Dev Portal, Vitals analytics.'),
d('Routes, Services, Upstreams','Route: URL matching (paths, hosts, methods). Service: backend API abstraction. Upstream: load balancing group with health checks, circuit breakers, weighted round-robin across multiple targets.'),
d('Kong Plugin System','Plugins run in lifecycle phases: rewrite, access (auth), header_filter, body_filter, log, timer. Custom plugins in Lua. Order: auth first, then rate-limit, transform, log. Precedence: global > consumer > route > service.'),
d('Authentication Plugins','Key Auth: API key in header/query/body. Basic Auth: base64 credentials. JWT: RSA/HMAC validation. OAuth2: authorization code flow. HMAC Auth: request signing. LDAP Auth: enterprise directory. Session: cookie-based.')
],
'Kong is the most popular open-source API gateway. It excels at plugin extensibility and supports DB-mode for dynamic routing and DB-less for GitOps. Use for microservices API management, rate limiting, auth centralization, and observability.',
[
q('What is Kong?','An open-source API Gateway on NGINX/OpenResty with plugin-based extensibility for traffic control, security, and observability.'),
q('What are the two Kong deployment modes?','DB-mode (PostgreSQL for dynamic config) and DB-less mode (declarative YAML/JSON, no database).'),
q('What are Kong Routes, Services, Upstreams?','Route: URL matching rules. Service: backend API abstraction. Upstream: load balancing group with health checks.'),
q('What plugin lifecycle phases does Kong support?','rewrite, access (auth), header_filter, body_filter, log, timer.'),
q('What does Enterprise add over OSS?','Kong Manager UI, Dev Portal, Vitals analytics, and enterprise-grade plugins.'),
q('Can Kong work without a database?','Yes, DB-less mode uses a declarative config file. Config is static until file reload.'),
q('What database does Kong support?','PostgreSQL (recommended) or Cassandra (legacy, deprecated in newer versions).'),
q('What are Kong Consumers?','Entities representing users or applications for auth, rate limiting, and ACL plugin configs.'),
q('What is the plugin order of execution?','Global first, then consumer-level, route-level, then service-level plugins.'),
q('What proxy does Kong use?','NGINX + OpenResty (Lua scripting engine for NGINX).')
],
R(10,35,100,25,'#0070f3','','Client','API Consumer')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Kong','API Gateway')+
A(250,48,280,48)+A(150,60,150,80)+
R(10,70,100,25,'#ffc107','','Route','URL Match')+
A(110,83,140,83)+
R(150,70,100,25,'#dc3545','','Plugins','Auth->RateLimit->Log')+
A(250,83,280,83)+A(150,90,150,110)+
R(10,105,100,25,'#e83e8c','','Service','Backend')+
A(110,118,140,118)+
R(150,105,100,25,'#6610f2','','Upstream','LB+Health')+
R(290,35,190,155,'#17a2b8','','Kong API Gateway','NGINX+OpenResty. Routes,Services,Plugins. DB or DB-less. OSS+Enterprise.'),
T(240,220,'Kong: Open-source API Gateway on NGINX/OpenResty. Plugin-based, DB or DB-less modes.',9,'#666','middle'),
[
e('Kong Declarative Config (DB-less)','Kong config via YAML.',codeBlock([
'# kong.yml — declarative config',
'_format_version: "3.0"',
'services:',
'  - name: user-service',
'    url: http://users-api:3000',
'    routes:',
'      - name: user-route',
'        paths:',
'          - /users',
'        methods:',
'          - GET',
'        plugins:',
'          - name: key-auth',
'          - name: rate-limiting',
'            config:',
'              minute: 60',
'consumers:',
'  - username: my-app',
'    keyauth_credentials:',
'      - key: abc123-secret-key'
]),'Declarative Kong config for DB-less mode — ideal for GitOps.'),
e('Kong Admin API (Create Service)','REST API to configure Kong.',codeBlock([
'# Create a Service',
'curl -s -X POST http://localhost:8001/services \\',
'  -H "Content-Type: application/json" \\',
'  -d \'{"name":"order-service","url":"http://orders-api:4000"}\'',
'# Create a Route',
'curl -s -X POST http://localhost:8001/services/order-service/routes \\',
'  -H "Content-Type: application/json" \\',
'  -d \'{"name":"order-route","paths":["/orders"],"methods":["GET","POST"]}\'',
'# List services',
'curl -s http://localhost:8001/services | jq .'
]),'Kong Admin API for dynamic service and route creation.'),
e('Kong Plugin: Rate Limiting','Rate limiting plugin.',codeBlock([
'# Enable rate limiting on a route',
'curl -s -X POST http://localhost:8001/routes/order-route/plugins \\',
'  -H "Content-Type: application/json" \\',
'  -d \'{"name":"rate-limiting","config":{"minute":30,"hour":1000,"policy":"redis","redis_host":"redis-cluster","redis_port":6379}}\'',
'# Response headers: X-RateLimit-Limit-minute, X-RateLimit-Remaining-minute'
]),'Rate limiting plugin with Redis-backed distributed counting.'),
e('Kong Upstream with Health Checks','Load balancing with health checks.',codeBlock([
'# Create Upstream',
'curl -s -X POST http://localhost:8001/upstreams \\',
'  -H "Content-Type: application/json" \\',
'  -d \'{"name":"orders-upstream","algorithm":"round-robin","healthchecks":{"active":{"type":"http","http_path":"/health","healthy":{"interval":5,"successes":1},"unhealthy":{"interval":5,"http_failures":3}}}}\'',
'# Add targets',
'curl -s -X POST http://localhost:8001/upstreams/orders-upstream/targets \\',
'  -d \'{"target":"10.0.1.10:4000","weight":100}\'',
'curl -s -X POST http://localhost:8001/upstreams/orders-upstream/targets \\',
'  -d \'{"target":"10.0.1.11:4000","weight":50}\''
]),'Kong upstream with active health checks and weighted targets.')
],
[
m('What is Kong built on?',['NGINX+OpenResty','Node.js','Apache HTTPD','Java Netty'],0,'Kong is built on NGINX and OpenResty (Lua scripting).'),
m('Recommended Kong production DB?',['PostgreSQL','MySQL','MongoDB','SQLite'],0,'PostgreSQL is the recommended production database.'),
m('What is a Kong Upstream?',['A backend URL','LB group with health checks','A plugin type','An auth method'],1,'Upstream is a virtual hostname for load balancing.'),
m('What is DB-less mode?',['Declarative config file, no DB','No services allowed','No plugins','Read-only mode'],0,'DB-less uses a declarative YAML/JSON config file.'),
m('Which phase runs auth plugins?',['rewrite','access','header_filter','log'],1,'Auth runs in the access phase.'),
m('What does Enterprise add?',['Kong Manager,Dev Portal,Vitals','More plugins only','NGINX replacement','DB support'],0,'Enterprise adds Kong Manager UI, Dev Portal, Vitals.')
]
);

/* =================== TOPIC 2: NGINX API Gateway =================== */
addTopic('ag-nginx-gateway','NGINX API Gateway','intermediate',20,
['NGINX is a high-performance web server, reverse proxy, and load balancer that can be configured as an API Gateway.',
'Core capabilities: request routing, SSL/TLS termination, rate limiting, authentication, caching, request/response transformation.',
'NGINX uses declarative config: http, server, location, upstream blocks. NGINX Plus adds active health checks, JWT validation, session persistence, key-value store.',
'NGINX excels at rate limiting (leaky bucket), SSL termination, caching (proxy_cache), and request routing with regex location matching.'
],
'NGINX as an API Gateway is like a highly efficient postal sorting facility. Mail (API request) arrives, address checked (URL), postage verified (rate limit), sender ID checked (auth), sorted to correct bin (routing), delivery logged (logging). All processing at lightning speed.',
[
d('NGINX as Reverse Proxy','NGINX receives client requests and forwards to backends via proxy_pass. Benefits: single entry point, backend isolation, centralized SSL termination, response buffering, error handling. Supports WebSocket proxying via upgrade headers.'),
d('Rate Limiting with NGINX','limit_req_zone defines shared memory zone with rate. limit_req applies it. Leaky bucket: burst allows spikes, nodelay returns 503 immediately. Can limit by IP ($binary_remote_addr) or other variables.'),
d('Auth in NGINX','Basic Auth: auth_basic + htpasswd file. Subrequest auth: auth_request to external auth service. JWT (NGINX Plus): auth_jwt + auth_jwt_key_file. Client cert auth: ssl_client_certificate.'),
d('Caching for APIs','proxy_cache_path /data/nginx/cache keys_zone=api_cache:10m levels=1:2 max_size=1g inactive=60m. proxy_cache api_cache; proxy_cache_valid 200 1m; proxy_cache_use_stale error timeout;.')
],
'NGINX is the most performant API Gateway for simple to moderate traffic. It excels at rate limiting, SSL termination, caching, and routing. Config model is powerful but complex. NGINX Plus adds enterprise features. Consider Kong (on NGINX/OpenResty) for complex routing.',
[
q('What is NGINX?','High-performance web server, reverse proxy, and load balancer functioning as an API Gateway.'),
q('How does NGINX handle routing?','Through server blocks (virtual hosts) and location blocks (URL path matching with regex).'),
q('What is proxy_pass?','Directive that forwards requests to a backend server or upstream group.'),
q('How does NGINX rate limiting work?','Define limit_req_zone (shared memory + rate) and apply with limit_req. Leaky bucket algorithm.'),
q('What does NGINX Plus add over OSS?','Active health checks, JWT validation, key-value store, session persistence, extended monitoring.'),
q('How to add auth in NGINX?','Basic Auth (htpasswd), subrequest to auth service, client certificates, or JWT (Plus).'),
q('What is the upstream block for?','Defines backend server group with load balancing (round-robin, least_conn, ip_hash).'),
q('How does NGINX handle SSL?','ssl_certificate and ssl_certificate_key directives. Terminates SSL, proxies over HTTP.'),
q('What is nodelay in rate limiting?','Returns 503 immediately when burst exceeded instead of queuing.'),
q('How does NGINX cache API responses?','Define proxy_cache_path with cache zone, enable with proxy_cache.')
],
R(10,35,100,25,'#0070f3','','Client','HTTP request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','NGINX','Reverse Proxy')+
A(250,48,280,48)+A(150,60,150,80)+
R(10,70,100,25,'#ffc107','','Rate Limit','limit_req')+
A(110,83,140,83)+
R(150,70,100,25,'#dc3545','','Auth','Basic/JWT')+
A(250,83,280,83)+A(150,90,150,110)+
R(10,105,100,25,'#e83e8c','','Cache','proxy_cache')+
A(110,118,140,118)+
R(150,105,100,25,'#6610f2','','Upstream','LB Backend')+
R(290,35,190,155,'#17a2b8','','NGINX API Gateway','High-performance reverse proxy. Rate limiting, auth, caching, SSL termination, load balancing.'),
T(240,220,'NGINX: Ultra-fast reverse proxy and API Gateway. Config-driven rate limiting, auth, caching, load balancing.',9,'#666','middle'),
[
e('Basic NGINX API Gateway Config','Reverse proxy with routing.',codeBlock([
'http {',
'  upstream backend {',
'    server api1.example.com:3000 weight=3;',
'    server api2.example.com:3000;',
'  }',
'  server {',
'    listen 443 ssl;',
'    server_name api.myapp.com;',
'    ssl_certificate /etc/ssl/certs/api.crt;',
'    ssl_certificate_key /etc/ssl/private/api.key;',
'    location /users/ { proxy_pass http://user-service:4000; }',
'    location /orders/ { proxy_pass http://backend; }',
'    location /health { return 200 "OK"; }',
'  }',
'}'
]),'Basic NGINX API Gateway with upstream, SSL, and routing.'),
e('NGINX Rate Limiting','Limit per client IP.',codeBlock([
'http {',
'  limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;',
'  server {',
'    location /api/ {',
'      limit_req zone=api_limit burst=20 nodelay;',
'      limit_req_status 429;',
'      proxy_pass http://backend;',
'    }',
'  }',
'}'
]),'NGINX rate limiting with burst and nodelay.'),
e('JWT Validation (NGINX Plus)','Validate JWT.',codeBlock([
'http {',
'  auth_jwt_key_cache_ttl 600;',
'  server {',
'    location /api/secure/ {',
'      auth_jwt "Secure API" token=$http_authorization;',
'      auth_jwt_key_file /etc/nginx/jwks.json;',
'      proxy_set_header X-User-ID $jwt_payload_sub;',
'      proxy_set_header X-User-Role $jwt_payload_role;',
'      proxy_pass http://backend;',
'    }',
'  }',
'}'
]),'NGINX Plus JWT validation with claim extraction.'),
e('NGINX Response Caching','Cache backend responses.',codeBlock([
'http {',
'  proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m;',
'  server {',
'    location /api/products/ {',
'      proxy_cache api_cache;',
'      proxy_cache_valid 200 302 5m;',
'      proxy_cache_use_stale error timeout updating;',
'      add_header X-Cache-Status $upstream_cache_status;',
'      proxy_pass http://product-service:5000;',
'    }',
'  }',
'}'
]),'NGINX response caching with stale-while-revalidate.'),
e('Basic Auth with htpasswd','Simple auth.',codeBlock([
'# htpasswd -c /etc/nginx/.htpasswd user1',
'server {',
'  location /api/admin/ {',
'    auth_basic "Admin Area";',
'    auth_basic_user_file /etc/nginx/.htpasswd;',
'    proxy_pass http://admin-service:6000;',
'  }',
'}'
]),'Basic Auth and subrequest-based auth pattern.')
],
[
m('What directive forwards requests?',['proxy_bind','proxy_pass','proxy_redirect','proxy_set'],1,'proxy_pass forwards requests to backend.'),
m('What algorithm does NGINX rate limiting use?',['Token bucket','Leaky bucket','Sliding window','Fixed window'],1,'Leaky bucket algorithm.'),
m('What does limit_req_zone define?',['Cache zone','Rate limit zone','SSL zone','Log zone'],1,'Defines shared memory for rate tracking.'),
m('What does auth_basic use?',['Database','htpasswd file','LDAP server','JWT token'],1,'NGINX Basic Auth uses htpasswd file.'),
m('What NGINX Plus feature missing in OSS?',['proxy_pass','Active health checks','SSL termination','Rate limiting'],1,'Active health checks are Plus only.'),
m('What does proxy_cache_valid do?',['Encrypts cache','Sets cache TTL by response code','Limits cache size','Purges cache'],1,'Sets cache duration per response code.')
]
);

/* =================== TOPIC 3: Ambassador =================== */
addTopic('ag-ambassador','Ambassador','intermediate',15,
['Ambassador (CNCF project) is a Kubernetes-native API Gateway built on Envoy Proxy, designed for cloud-native microservices.',
'Ambassador uses declarative config through Kubernetes CRDs — no separate config files needed.',
'Key resources: Mapping (route), Module (global config), Filter (auth/transform), RateLimit, AuthService, TracingService, DevPortal.',
'Ambassador integrates with service meshes and supports gRPC, WebSocket, OpenAPI, and external auth natively.'
],
'Ambassador is like a building concierge in a smart apartment complex (Kubernetes). Instead of a separate rulebook, the concierge reads instructions posted on each apartment door (Kubernetes CRDs). When a delivery arrives (API request), the concierge checks instructions, verifies ID (auth), and routes to the correct apartment.',
[
d('Ambassador Architecture','Runs as a K8s deployment with Envoy Proxy as data plane. Agent watches K8s resources and updates Envoy config via xDS APIs. Key CRDs: Mapping (route rules), Module (HTTP settings), Filter (auth/transform), RateLimitService, AuthService.'),
d('Ambassador Mappings','Mapping CRDs define how requests route to services. Key fields: prefix (URL), host (domain), service (backend), rewrite, method, headers, timeout, cors. Can reference Filters and RateLimits.'),
d('Auth in Ambassador','External auth: AuthService CRD points to external HTTP service, returns 200 (allow) or 401/403 (deny). Built-in Filters: JWT (JWKS-based), OAuth2, Basic Auth. No external service needed for these.'),
d('Rate Limiting','RateLimitService CRD configures an external rate limit service. RateLimit CRD defines label-based limits. Supports per-user, per-IP, per-route domains with configurable limits.')
],
'Ambassador is the best choice for Kubernetes-native environments. Use Mappings for routing, Filters for auth, RateLimits for traffic control. CRD-based config is ideal for GitOps. Works well with service meshes. Strong alternative to Kong for cloud-native.',
[
q('What is Ambassador?','K8s-native API Gateway on Envoy Proxy, using CRDs for declarative config.'),
q('What does a Mapping define?','Route rules: URL prefix, host, backend service, rewrite, methods, timeouts, CORS.'),
q('How does Ambassador handle auth?','Via AuthService (external HTTP) or built-in Filters (JWT, OAuth2, Basic Auth).'),
q('What proxy does Ambassador use?','Envoy Proxy — high-performance C++ proxy from Lyft.'),
q('How does Ambassador configure itself?','Watches K8s CRDs (Mappings, Filters, RateLimits) and updates Envoy via xDS.'),
q('Difference between Ambassador and Kong?','Ambassador is K8s-native (CRD-based). Kong is platform-agnostic with REST admin API.'),
q('What is an AuthService CRD?','Defines external HTTP service that validates auth for incoming requests.'),
q('Can Ambassador route gRPC?','Yes, via the grpc flag in Mappings.'),
q('What is the Filter CRD?','Defines request/response transformations: JWT validation, header mods, OAuth.'),
q('What is DevPortal CRD?','Serves an API documentation portal from OpenAPI specs and markdown.')
],
R(10,35,100,25,'#0070f3','','Client','External')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Ambassador','Envoy Proxy')+
A(250,48,280,48)+A(150,60,150,80)+
R(10,70,100,25,'#ffc107','','Mapping','Route rule')+
A(110,83,140,83)+
R(150,70,100,25,'#dc3545','','AuthService','External auth')+
A(250,83,280,83)+A(150,90,150,110)+
R(10,105,100,25,'#e83e8c','','RateLimit','Traffic control')+
A(110,118,140,118)+
R(150,105,100,25,'#6610f2','','k8s Service','Backend')+
R(290,35,190,155,'#17a2b8','','Ambassador API Gateway','K8s-native on Envoy. CRD-based Mappings, Filters, AuthService, RateLimits.'),
T(240,220,'Ambassador: K8s-native API Gateway on Envoy. Configured via CRDs: Mappings, Filters, AuthService.',9,'#666','middle'),
[
e('Basic Mapping CRD','Route external traffic.',codeBlock([
'apiVersion: getambassador.io/v3alpha1',
'kind: Mapping',
'metadata:',
'  name: user-service-mapping',
'spec:',
'  hostname: "*"',
'  prefix: /api/users/',
'  service: user-service:3000',
'  rewrite: /',
'  timeout_ms: 30000',
'  cors:',
'    origins:',
'    - https://myapp.com',
'    methods: GET, POST, PUT, DELETE'
]),'Ambassador Mapping CRD for routing to a K8s service.'),
e('AuthService (External Auth)','Delegate auth.',codeBlock([
'apiVersion: getambassador.io/v3alpha1',
'kind: AuthService',
'metadata:',
'  name: external-auth',
'spec:',
'  auth_service: auth-service:8000',
'  proto: http',
'  timeout_ms: 5000',
'  allowed_headers:',
'    - Authorization',
'    - Cookie',
'    - X-User-ID'
]),'AuthService delegates auth to an external HTTP service.'),
e('JWT Filter','Built-in JWT validation.',codeBlock([
'apiVersion: getambassador.io/v3alpha1',
'kind: Filter',
'metadata:',
'  name: jwt-filter',
'spec:',
'  JWT:',
'    issuer: https://auth.example.com',
'    audiences:',
'    - my-api',
'    jwksURI: https://auth.example.com/.well-known/jwks.json',
'    forward_token: true',
'---',
'apiVersion: getambassador.io/v3alpha1',
'kind: Mapping',
'metadata:',
'  name: secure-mapping',
'spec:',
'  prefix: /api/secure/',
'  service: secure-service:4000',
'  filters:',
'  - name: jwt-filter'
]),'JWT Filter with JWKS URI for key rotation.'),
e('Rate Limiting CRD','Label-based limits.',codeBlock([
'apiVersion: getambassador.io/v3alpha1',
'kind: RateLimit',
'metadata:',
'  name: user-rate-limit',
'spec:',
'  domain: ambassador',
'  descriptors:',
'    - key: user-label',
'      value: "default"',
'      rate_per_unit: 100',
'      unit: minute',
'---',
'apiVersion: getambassador.io/v3alpha1',
'kind: RateLimitService',
'metadata:',
'  name: ratelimit-svc',
'spec:',
'  service: "edge-stack:8081"',
'  proto: grpc',
'  timeout_ms: 100'
]),'Label-based rate limiting with per-descriptor limits.')
],
[
m('What proxy does Ambassador use?',['NGINX','Envoy','HAProxy','Traefik'],1,'Ambassador uses Envoy Proxy.'),
m('How does Ambassador configure routing?',['Config files','K8s CRDs','Admin API','Env vars'],1,'Ambassador uses K8s CRDs.'),
m('What CRD defines route rules?',['AuthService','Mapping','RateLimit','Module'],1,'Mapping CRD defines route rules.'),
m('What is an AuthService?',['Backend service','External auth validator','Certificate authority','DNS resolver'],1,'AuthService defines an external HTTP auth validator.'),
m('What protocol does RateLimitService use?',['HTTP','gRPC','WebSocket','TCP'],1,'RateLimitService uses gRPC.'),
m('What format does JWT Filter use?',['Local public key','JWKS URI','Base64 secret','Env variable'],1,'JWT Filter uses JWKS URI.')
]
);

/* =================== TOPIC 4: Traefik =================== */
addTopic('ag-traefik','Traefik','intermediate',15,
['Traefik is a cloud-native reverse proxy and API Gateway that auto-discovers services from Docker, Kubernetes, Consul, and more.',
'Key concepts: EntryPoints (ports), Routers (request matching), Middlewares (processing chain), Services (backends).',
'Traefik auto-discovers from Docker labels, K8s Ingress/CRDs, Consul, etcd — no manual config needed.',
'Built-in middlewares: RateLimit, CircuitBreaker, Retry, BasicAuth, ForwardAuth, Headers, IPWhiteList, RedirectRegex, Compress.'
],
'Traefik is like an airport air traffic controller that knows every plane (service). When a flight (API request) comes in, the controller directs it to the correct gate (service). If a gate closes (service failure), traffic reroutes automatically. New planes discovered automatically.',
[
d('Auto Service Discovery','Traefik watches provider APIs: K8s (Ingress/CRD/Service), Docker (container labels), Consul/etcd (KV stores). New service deployed = Traefik auto-creates routers and updates LB — no config reload needed.'),
d('Routers and Middlewares','Router matches by host, path, method, headers, query params. Routes to Service through Middleware chain: RateLimit -> Retry -> ForwardAuth -> AddHeader -> Service. Middlewares reusable across routers.'),
d('TCP and UDP Support','TCP and UDP routing beyond HTTP. TCP routers match by SNI and port. Ideal for databases, gRPC, WebSockets. TCP middlewares: IPWhiteList, RateLimit.'),
d('Dashboard and Metrics','Built-in dashboard at :8080. Routers, services, middlewares, health. Metrics: Prometheus, Datadog, InfluxDB, StatsD, OpenTelemetry. Access logs in JSON or common format.')
],
'Traefik is the easiest API Gateway for auto-discovery environments. Minimal config on K8s or Docker. Clean middleware chain model. Built-in dashboard and metrics. Best for simple to moderate setups; consider Kong for complex enterprise needs.',
[
q('What is Traefik?','Cloud-native reverse proxy with auto-discovery from Docker, K8s, Consul, and more.'),
q('Main concepts?','EntryPoints (ports), Routers (matching), Middlewares (processing), Services (backends).'),
q('How does Traefik discover services?','Auto from Docker labels, K8s CRDs/Ingress, Consul, etcd.'),
q('What is a Middleware?','Request/response processing: rate limiting, auth, headers, redirect, retry, circuit breaker.'),
q('Does Traefik support TCP?','Yes, with SNI matching for databases, gRPC, WebSockets.'),
q('How does Traefik handle SSL?','Automatic Let\'s Encrypt via ACME. Wildcard and custom certs.'),
q('v1 vs v2 difference?','v2: TCP/UDP routing, middleware CRDs, redesigned config.'),
q('Metrics providers?','Prometheus, Datadog, InfluxDB, StatsD, OpenTelemetry.'),
q('Canary deployments?','Yes, via weighted round-robin with traffic splitting.'),
q('Dashboard?','Web UI at :8080 showing routers, services, middlewares, health.')
],
R(10,35,100,25,'#0070f3','','Client','api.myapp.com')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','EntryPoint','Port 443')+
A(150,60,150,80)+
R(10,70,100,25,'#ffc107','','Router','Host+Path match')+
A(110,83,140,83)+
R(150,70,100,25,'#dc3545','','Middlewares','RateLimit->Auth->Retry')+
A(250,83,280,83)+A(150,90,150,110)+
R(10,105,100,25,'#e83e8c','','Service','Backend')+
A(110,118,140,118)+
R(150,105,100,25,'#6610f2','','Discovery','Docker/k8s/Consul')+
R(290,35,190,155,'#17a2b8','','Traefik API Gateway','Auto-discovery. EntryPoints,Routers,Middlewares,Services. Let\'s Encrypt, dashboard.'),
T(240,220,'Traefik: Cloud-native reverse proxy with auto-discovery. Routers+Middlewares+Services.',9,'#666','middle'),
[
e('Traefik Docker Labels','Docker label config.',codeBlock([
'version: "3.8"',
'services:',
'  whoami:',
'    image: traefik/whoami',
'    labels:',
'      - "traefik.enable=true"',
'      - "traefik.http.routers.whoami.rule=Host(`api.myapp.com`) && PathPrefix(`/whoami`)"',
'      - "traefik.http.routers.whoami.entrypoints=web-secure"',
'      - "traefik.http.routers.whoami.tls=true"',
'      - "traefik.http.services.whoami.loadbalancer.server.port=80"',
'      - "traefik.http.middlewares.rate-limit.ratelimit.average=100"',
'      - "traefik.http.routers.whoami.middlewares=rate-limit@docker"'
]),'Traefik Docker labels for routing, TLS, rate limiting.'),
e('Traefik K8s IngressRoute','CRD with canary.',codeBlock([
'apiVersion: traefik.io/v1alpha1',
'kind: IngressRoute',
'metadata:',
'  name: api-ingress',
'spec:',
'  entryPoints:',
'    - web-secure',
'  routes:',
'    - kind: Rule',
'      match: Host(`api.myapp.com`) && PathPrefix(`/users`)',
'      services:',
'        - name: user-service',
'          port: 3000',
'          weight: 80',
'        - name: user-service-v2',
'          port: 3000',
'          weight: 20',
'      middlewares:',
'        - name: rate-limit',
'  tls:',
'    certResolver: letsencrypt'
]),'K8s IngressRoute with canary (80/20) traffic split.'),
e('Traefik Static Config (traefik.yml)','Server-level config.',codeBlock([
'entryPoints:',
'  web:',
'    address: ":80"',
'    http:',
'      redirections:',
'        entryPoint:',
'          to: web-secure',
'          scheme: https',
'  web-secure:',
'    address: ":443"',
'providers:',
'  docker:',
'    endpoint: "unix:///var/run/docker.sock"',
'  kubernetesCRD:',
'    enabled: true',
'certificatesResolvers:',
'  letsencrypt:',
'    acme:',
'      email: admin@myapp.com',
'      storage: /certs/acme.json',
'      httpChallenge:',
'        entryPoint: web',
'metrics:',
'  prometheus:',
'    addEntryPointsLabels: true'
]),'Traefik static config with Let\'s Encrypt and auto-discovery.'),
e('ForwardAuth Middleware','External auth.',codeBlock([
'apiVersion: traefik.io/v1alpha1',
'kind: Middleware',
'metadata:',
'  name: forward-auth',
'spec:',
'  forwardAuth:',
'    address: "http://auth-service:8000/validate"',
'    trustForwardHeader: true',
'    authResponseHeaders:',
'      - X-Auth-User',
'      - X-Auth-Role'
]),'ForwardAuth delegates auth to external service.'),
e('Rate Limiting Middleware','Traffic control.',codeBlock([
'apiVersion: traefik.io/v1alpha1',
'kind: Middleware',
'metadata:',
'  name: rate-limit',
'spec:',
'  rateLimit:',
'    average: 100',
'    burst: 200',
'    period: 1m'
]),'Rate limiting middleware.')
],
[
m('What protocol beyond HTTP does Traefik support?',['FTP','TCP and UDP','SMTP','SSH'],1,'Traefik supports TCP and UDP routing.'),
m('How does Traefik discover services?',['Manual config','Auto-discovery','Admin API','DNS lookups'],1,'Auto-discovery from providers.'),
m('Difference between Routers and Services?',['Same thing','Routers match,Services are backends','Routers for TCP only','Services for HTTP only'],1,'Routers match requests; Services are backends.'),
m('What cert resolver does Traefik support?',['Manual only','Let\'s Encrypt ACME','Self-signed only','Cloudflare'],1,'Built-in Let\'s Encrypt ACME.'),
m('What is a Middleware?',['Backend service','Request/response processor','Database driver','Routing protocol'],1,'Processes requests in a chain.'),
m('Can Traefik do canary?',['Yes via weighted services','No','Only with plugins','Enterprise only'],0,'Yes, by assigning weights to services.')
]
);

/* =================== TOPIC 5: AWS API Gateway =================== */
addTopic('ag-aws-api-gateway','AWS API Gateway','intermediate',20,
['AWS API Gateway is a fully managed service for creating, publishing, and securing REST, HTTP, and WebSocket APIs at any scale.',
'Three types: REST API (full-featured, API keys, usage plans, VTL), HTTP API (simpler, cheaper, faster, ideal for Lambda), WebSocket API (real-time).',
'Features: request throttling, API key management, usage plans, VTL mapping templates, caching, CORS, custom domains, CloudWatch logging.',
'Integrates with Lambda (proxy), DynamoDB (direct), Kinesis, SQS, Step Functions, VPC via NLB/ALB (VPC Link).'
],
'AWS API Gateway is like a fully automated airport terminal managed by AWS. You tell them gates (endpoints), who can board (auth), and passenger limits (rate limiting). They handle building, security, maintenance. You focus on flights (backend). Everything scales automatically — pay per passenger.',
[
d('REST vs HTTP vs WebSocket API','REST API: feature-rich, API keys, usage plans, VTL mapping, WAF. HTTP API: simpler, ~70% cheaper, native OIDC/OAuth2, JWT authorizers, CORS auto-config. WebSocket: $connect/$disconnect/$default routes, callback URLs for push.'),
d('API Gateway Authorizers','Cognito User Pools: JWT from AWS Cognito. Lambda Authorizer: custom auth in Lambda. IAM Authorizer: AWS SigV4 signing. JWT Authorizer (HTTP API): validate from OIDC issuer. API Keys: simple key-based.'),
d('Throttling and Usage Plans','Account-level: default 10,000 rps. Usage Plan: per-API limits (rate + burst) tied to API keys. Per-client, per-method, global. 429 Too Many Requests with Retry-After.'),
d('Request/Response Transformation','VTL (Velocity Template Language) mapping templates transform payloads. Convert REST JSON to SOAP XML, filter fields, rename params. HTTP API: use Lambda for transformation.')
],
'AWS API Gateway is best for serverless on AWS. Use HTTP API for Lambda (cheaper, faster). Use REST for advanced features (API keys, usage plans, VTL). Use WebSocket for real-time. Enable caching for read-heavy endpoints. Combine with WAF for DDoS protection.',
[
q('What is AWS API Gateway?','Managed service for creating, publishing, and securing REST, HTTP, and WebSocket APIs.'),
q('Three API types?','REST (full-featured), HTTP (simpler/cheaper), WebSocket (real-time).'),
q('What is a Lambda Authorizer?','Custom auth Lambda that validates tokens and returns IAM policies.'),
q('What is a Usage Plan?','Throttling and quota limits for API consumers identified by API keys.'),
q('How does API Gateway throttle?','Account-level, Usage Plan, and method-level with rate/burst settings.'),
q('What is VTL?','Velocity Template Language for request/response mapping templates.'),
q('Difference between REST and HTTP API?','HTTP API is simpler, ~70% cheaper, OIDC/JWT native, no VTL.'),
q('Can API Gateway integrate with VPC?','Yes, via VPC Link — private integration with NLB/ALB in a VPC.'),
q('How does WebSocket API work?','$connect/$disconnect/$default routes with callback URLs.'),
q('What caching does API Gateway support?','Per-stage caching with configurable TTL (default 300s).')
],
R(10,35,100,25,'#0070f3','','Client','Mobile/Web')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','API Gateway','Managed endpoint')+
A(250,48,280,48)+A(150,60,150,80)+
R(10,70,100,25,'#ffc107','','Auth','Cognito/Lambda/IAM')+
A(110,83,140,83)+
R(150,70,100,25,'#dc3545','','Throttle','Rate+burst limits')+
A(250,83,280,83)+A(150,90,150,110)+
R(10,105,100,25,'#e83e8c','','Transform','VTL mapping')+
A(110,118,140,118)+
R(150,105,100,25,'#6610f2','','Lambda/HTTP','Backend')+
R(290,35,190,155,'#17a2b8','','AWS API Gateway','Managed: REST, HTTP, WebSocket. Cognito/Lambda auth, throttling, usage plans, VTL, caching.'),
T(240,220,'AWS API Gateway: Managed REST, HTTP, WebSocket. Auth, throttling, caching, VTL.',9,'#666','middle'),
[
e('AWS SAM: REST API with Lambda','Serverless API.',codeBlock([
'AWSTemplateFormatVersion: "2010-09-09"',
'Transform: AWS::Serverless-2016-10-31',
'Globals:',
'  Function:',
'    Runtime: nodejs18.x',
'    Timeout: 10',
'Resources:',
'  OrderApi:',
'    Type: AWS::Serverless::Api',
'    Properties:',
'      StageName: prod',
'      Auth:',
'        DefaultAuthorizer: CognitoAuthorizer',
'        Authorizers:',
'          CognitoAuthorizer:',
'            UserPoolArn: !GetAtt UserPool.Arn',
'      Throttle:',
'        BurstLimit: 200',
'        RateLimit: 100',
'  GetOrdersFunction:',
'    Type: AWS::Serverless::Function',
'    Properties:',
'      CodeUri: ./src',
'      Handler: orders.getOrders',
'      Events:',
'        ApiEvent:',
'          Type: Api',
'          Properties:',
'            RestApiId: !Ref OrderApi',
'            Path: /orders',
'            Method: GET'
]),'SAM template for REST API with Cognito auth and throttling.'),
e('AWS CLI: Create HTTP API','CLI API creation.',codeBlock([
'aws apigatewayv2 create-api \\',
'  --name "my-http-api" --protocol-type HTTP \\',
'  --target "arn:aws:lambda:us-east-1:123456:function:my-function"',
'aws apigatewayv2 create-stage --api-id abc123 --stage-name prod --auto-deploy',
'aws apigatewayv2 create-authorizer --api-id abc123 --authorizer-type JWT --name "jwt-auth" \\',
'  --identity-source "\$request.header.Authorization" \\',
'  --jwt-configuration Audience=my-api,Issuer="https://cognito-idp.us-east-1.amazonaws.com/us-east-1_abc123"',
'aws apigatewayv2 create-deployment --api-id abc123 --stage-name prod'
]),'AWS CLI commands for HTTP API with JWT authorizer.'),
e('Lambda Authorizer','Custom auth.',codeBlock([
'exports.handler = async (event) => {',
'  try {',
'    const token = event.authorizationToken.replace("Bearer ", "");',
'    const decoded = jwt.verify(token, process.env.JWT_SECRET);',
'    return {',
'      principalId: decoded.sub,',
'      policyDocument: {',
'        Version: "2012-10-17",',
'        Statement: [{',
'          Action: "execute-api:Invoke",',
'          Effect: "Allow",',
'          Resource: event.methodArn',
'        }],',
'      },',
'      context: { userId: decoded.sub, role: decoded.role },',
'    };',
'  } catch { throw new Error("Unauthorized"); }',
'};'
]),'Lambda Authorizer validates JWT and returns IAM policy.'),
e('VTL Mapping Template','Request transformation.',codeBlock([
'#set(\$inputRoot = \$input.path("\$"))',
'{',
'  "httpMethod": "\$context.httpMethod",',
'  "requestId": "\$context.requestId",',
'  "body": \$input.json("\$"),',
'  "params": {',
'    #foreach(\$param in \$input.params().querystring.keySet())',
'      "\$param": "\$input.params().querystring.get(\$param)"',
'      #if(\$foreach.hasNext),#end',
'    #end',
'  }',
'}'
]),'VTL mapping template transforms request before forwarding.'),
e('CDK Infrastructure','Infra as code.',codeBlock([
'import * as apigw from "aws-cdk-lib/aws-apigateway";',
'import * as lambda from "aws-cdk-lib/aws-lambda";',
'const handler = new lambda.Function(this, "Handler", {',
'  runtime: lambda.Runtime.NODEJS_18_X,',
'  handler: "index.handler",',
'  code: lambda.Code.fromAsset("./src"),',
'});',
'const api = new apigw.LambdaRestApi(this, "OrdersApi", { handler, proxy: false });',
'const orders = api.root.addResource("orders");',
'orders.addMethod("GET");',
'const plan = api.addUsagePlan("UsagePlan", {',
'  name: "Basic",',
'  throttle: { rateLimit: 10, burstLimit: 20 },',
'  quota: { limit: 10000, period: apigw.Period.MONTH },',
'});',
'const key = api.addApiKey("ApiKey");',
'plan.addApiKey(key);'
]),'CDK for API Gateway with usage plan.')
],
[
m('Three AWS API Gateway types?',['REST, HTTP, WebSocket','REST, SOAP, GraphQL','HTTP, TCP, UDP','Public, Private, Hybrid'],0,'REST, HTTP, WebSocket.'),
m('Cheapest API type?',['REST','HTTP','WebSocket','Private'],1,'HTTP API is ~70% cheaper.'),
m('What is a Lambda Authorizer?',['Compute Lambda','Auth returning IAM policy','Token generator','Logging Lambda'],1,'Validates tokens, returns IAM policy.'),
m('What does a Usage Plan control?',['Compute','Throttling and quotas','Memory','DB connections'],1,'Rate limits and request quotas.'),
m('Mapping template language?',['JavaScript','VTL','JSONPath','XSLT'],1,'VTL (Velocity Template Language).'),
m('How to reach VPC resources?',['VPC Peering','VPC Link','Internet Gateway','NAT Gateway'],1,'VPC Link for private integration.')
]
);

/* =================== TOPIC 6: Rate Limiting =================== */
addTopic('ag-rate-limiting','Rate Limiting','intermediate',15,
['Rate limiting controls how many requests a client can make within a time window. Prevents abuse, ensures fair usage, protects backends.',
'Common algorithms: Token Bucket (bursts), Leaky Bucket (smoothes), Fixed Window (simple, edge bursts), Sliding Window Log (precise), Sliding Window Counter (efficient+precise).',
'Applied per client (IP, API key, user ID): global, per-endpoint, or per-user tier. HTTP: 429 Too Many Requests with Retry-After.',
'Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset.'
],
'Rate limiting is like a club with capacity limit. The bouncer counts: "10 per minute". Enter too fast: "Wait 6 seconds" (Retry-After). VIP members get faster entry (higher limits). Token Bucket system: tokens added every second, spend one to enter.',
[
d('Token Bucket Algorithm','Bucket holds N tokens, filled at fixed rate (e.g., 10/sec). Each request consumes one token. Empty bucket = 429. Supports bursts: unused tokens accumulate up to capacity. Most popular — used by Kong, AWS, Stripe, GitHub. Parameters: capacity (burst) + refill rate.'),
d('Fixed vs Sliding Window','Fixed Window: count in wall-clock intervals. Simple but edge bursts at boundaries. Sliding Window Log: track timestamps. Precise but memory-intensive. Sliding Window Counter: sub-windows. Good balance of precision and memory.'),
d('Distributed Rate Limiting','Single server: in-memory (fast, lost on restart). Redis: atomic INCR+EXPIRE for distributed counting. Lua scripting for atomic token bucket. Consistent hashing: route same client to same server. Redis: ~10-50us per check.'),
d('Rate Limiting Strategies','Hard: strict limit, 429 immediately. Soft: allow bursts. Elastic: bursts with delay (queue). Tiered: Free (10 rpm), Pro (100 rpm), Enterprise (10k rpm). Concurrency limiting: max simultaneous requests.')
],
'Rate limiting is essential for API production. Use Redis-based sliding window for distributed systems. Set informative headers. Return 429 with Retry-After. Choose algorithm: Token Bucket for bursty traffic, Sliding Window for precise limits. Always fail open if limiter fails.',
[
q('What is rate limiting?','Controlling requests per time window to prevent abuse and ensure fair usage.'),
q('What HTTP status for rate limiting?','429 Too Many Requests with Retry-After header.'),
q('Common algorithms?','Token Bucket, Leaky Bucket, Fixed Window, Sliding Window Log, Sliding Window Counter.'),
q('What is Token Bucket?','Bucket holds N tokens, filled at fixed rate. Each request consumes a token. Supports bursts.'),
q('Fixed vs Sliding Window?','Fixed: simple but edge bursts. Sliding: more precise at boundaries.'),
q('Best distributed storage?','Redis with atomic INCR/EXPIRE and Lua scripts.'),
q('Rate limit headers?','X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After.'),
q('Concurrency vs rate limiting?','Rate: requests per time. Concurrency: max simultaneous requests.'),
q('What is a usage quota?','Cumulative limit over longer period (e.g., 10k/month).'),
q('Fail open or closed?','Fail open if the rate limiter is down.')
],
R(10,35,100,25,'#0070f3','','Client','Sends request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Rate Limiter','Check limit')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Allowed','Process')+
R(160,70,100,25,'#dc3545','','Denied','429 Too Many')+
R(10,105,100,25,'#e83e8c','','Token Bucket','Refill+capacity')+
R(10,140,100,25,'#6610f2','','Redis','Distributed')+
R(160,105,100,25,'#17a2b8','','Headers','Limit,Remaining,Reset')+
R(290,35,190,155,'#17a2b8','','Rate Limiting','Token Bucket/Sliding Window. Redis-based. 429+Retry-After.'),
T(240,220,'Rate Limiting: Control request rates. Token Bucket/Sliding Window. 429 with Retry-After.',9,'#666','middle'),
[
e('Token Bucket (Node.js+Redis)','Distributed token bucket.',codeBlock([
'class TokenBucket{',
'  constructor(redis,key,capacity,refillRate){',
'    this.redis=redis;this.key=key;this.capacity=capacity;this.refillRate=refillRate;',
'  }',
'  async tryConsume(count){',
'    const script=`local k=KEYS[1] local cap=tonumber(ARGV[1])',
'      local rate=tonumber(ARGV[2]) local now=redis.call("TIME")[1] local cost=tonumber(ARGV[3])',
'      local b=redis.call("HMGET",k,"tokens","lastRefill")',
'      local t=tonumber(b[1])or cap local lr=tonumber(b[2])or now',
'      local elapsed=math.max(0,now-lr)',
'      t=math.min(cap,t+elapsed*rate)',
'      if t>=cost then',
'        redis.call("HSET",k,"tokens",t-cost,"lastRefill",now)',
'        redis.call("EXPIRE",k,math.ceil(cap/rate)+1)',
'        return{1,t-cost}',
'      else return{0,t} end`;',
'    const r=await this.redis.eval(script,1,this.key,this.capacity,this.refillRate,count);',
'    return{allowed:r[1],remaining:r[2]};',
'  }',
'}'
]),'Distributed Token Bucket with Redis Lua atomicity.'),
e('Rate Limiting Middleware (Express)','Sliding window with Redis.',codeBlock([
'const rateLimit=require("express-rate-limit");',
'const RedisStore=require("rate-limit-redis");',
'const limiter=rateLimit({',
'  windowMs:60*1000,max:100,',
'  standardHeaders:true,',
'  store:new RedisStore({sendCommand:(...a)=>redis.sendCommand(a)}),',
'  handler:(req,res)=>{res.status(429).json({error:"Too many requests"})}',
'});',
'app.use("/api/",limiter);'
]),'Express rate limiting with Redis store.'),
e('In-Memory Token Bucket','Single-server implementation.',codeBlock([
'class MemoryTokenBucket{',
'  constructor(capacity,refillRate){',
'    this.capacity=capacity;this.refillRate=refillRate;this.buckets=new Map();',
'  }',
'  consume(key,count){',
'    const now=Date.now();let b=this.buckets.get(key);',
'    if(!b){b={tokens:this.capacity,lastRefill:now};this.buckets.set(key,b);}',
'    const elapsed=(now-b.lastRefill)/1000;',
'    b.tokens=Math.min(this.capacity,b.tokens+elapsed*this.refillRate);b.lastRefill=now;',
'    if(b.tokens>=count){b.tokens-=count;return true;}',
'    return false;',
'  }',
'}'
]),'In-memory token bucket for single-server.'),
e('Rate Limit Headers and Response','Standard headers.',codeBlock([
'class RateLimiterResponse{',
'  static addHeaders(res,limit,remaining,reset){',
'    res.setHeader("X-RateLimit-Limit",limit);',
'    res.setHeader("X-RateLimit-Remaining",remaining);',
'    res.setHeader("X-RateLimit-Reset",Math.ceil(reset/1000));',
'  }',
'  static onLimitExceeded(res,retryAfterMs){',
'    res.setHeader("Retry-After",Math.ceil(retryAfterMs/1000));',
'    res.status(429).json({error:"Rate limit exceeded"});',
'  }',
'}',
'async function rateLimitMW(req,res,next){',
'  const key=req.ip||req.headers["x-api-key"];',
'  const result=await limiter.consume(key);',
'  RateLimiterResponse.addHeaders(res,100,result.remaining,result.reset);',
'  if(!result.allowed) return RateLimiterResponse.onLimitExceeded(res,result.retryAfter);',
'  next();',
'}'
]),'Standard rate limit headers and 429 response.'),
e('Tiered Rate Limiting','Per-tier limits.',codeBlock([
'const TIER_LIMITS={',
'  free:{windowMs:60000,max:10},',
'  basic:{windowMs:60000,max:100},',
'  pro:{windowMs:60000,max:1000},',
'  enterprise:{windowMs:60000,max:10000},',
'};',
'const tieredLimiter=(req,res,next)=>{',
'  const tier=req.user?.tier||"free";',
'  const config=TIER_LIMITS[tier]||TIER_LIMITS.free;',
'  const current=cache.get(key)||0;',
'  if(current>=config.max) return res.status(429).json({error:"Rate limit exceeded",tier});',
'  cache.set(key,current+1,config.windowMs/1000);next();',
'};'
]),'Tiered rate limiting for free/basic/pro/enterprise.')
],
[
m('HTTP status for rate limiting?',['400','429','503','403'],1,'429 Too Many Requests.'),
m('Which algorithm supports bursts?',['Fixed Window','Token Bucket','Leaky Bucket','Sliding Log'],1,'Token Bucket accumulates tokens for bursts.'),
m('Retry-After tells what?',['Limit','When to retry','Remaining','Reset time'],1,'Retry-After indicates when to retry.'),
m('Best distributed storage?',['Local memory','Redis','PostgreSQL','Filesystem'],1,'Redis with atomic operations.'),
m('Rate limiting vs throttling?',['Same','Rate=requests/time,throttle=rate','Throttling stricter','Throttling server-side'],1,'Rate caps total per window; throttle controls speed.'),
m('Fail open or closed?',['Open (allow)','Closed (block)','Depends','Always closed'],0,'Fail open if limiter is down.')
]
);

/* =================== TOPIC 7: Authentication =================== */
addTopic('ag-authentication','Authentication','intermediate',15,
['Authentication (AuthN) in API Gateways verifies the identity of clients making API requests before they reach backend services.',
'Common methods: API Keys (simple), JWT Bearer Tokens (stateless), OAuth2/OIDC (delegated), Basic Auth (legacy), mTLS (mutual TLS).',
'API Gateways centralize authentication — implement once instead of duplicating in every microservice.',
'Gateway validates auth, extracts identity claims, forwards as headers (X-User-ID, X-User-Role) to backends.'
],
'API Gateway authentication is like a single security checkpoint at a corporate building entrance. Instead of each office checking ID separately, the main entrance checks your badge, stamps your hand (headers) with your role. Every office sees you are authorized without rechecking.',
[
d('API Key Authentication','Simplest: client includes key in header (X-API-Key), query param, or body. Gateway checks against stored keys. Keys are long-lived and static. Good for server-to-server, service accounts, developer portals. Less secure than tokens — rotate periodically.'),
d('JWT Bearer Token Auth','Client presents JWT in Authorization: Bearer header. Gateway validates signature (HS256/RS256/ES256), expiration (exp), audience (aud), issuer (iss). Extracts claims (sub, role) into headers. Stateless — no DB lookup. JWKS for key rotation.'),
d('OAuth2 / OIDC Auth','Gateway acts as OAuth2 resource server. Authorization Code flow: redirect to auth server, exchange code for tokens. Client Credentials: server-to-server. OIDC: adds ID token for user identity. Gateway validates access tokens, optionally introspects.'),
d('mTLS (Mutual TLS)','Both client and server present TLS certificates. Gateway validates client cert against trusted CA. Extracts identity from CN/SAN fields. No tokens needed. Strongest auth — used in zero-trust, financial APIs, IoT.')
],
'Centralize authentication at the API Gateway. Choose method by client type: API Keys for services, JWT for web/mobile, OAuth2 for delegated, mTLS for high-security. Forward identity claims as headers. Implement token introspection for opaque tokens.',
[
q('What is authentication in API Gateway?','Verifying API client identity at the gateway before requests reach backend services.'),
q('Common API Gateway auth methods?','API Keys, JWT Bearer, OAuth2/OIDC, Basic Auth, mTLS.'),
q('Why centralize authentication?','Single implementation, consistent security, no per-service auth logic, simplified audit.'),
q('What does JWT validation check?','Signature, expiration (exp), audience (aud), issuer (iss), and optionally other claims.'),
q('How does gateway communicate identity to backends?','Forwarding claims as HTTP headers: X-User-ID, X-User-Role.'),
q('What is mTLS?','Mutual TLS — both client and server present certificates for mutual authentication.'),
q('Difference between API Keys and JWT?','API Keys: static, long-lived. JWT: dynamic, short-lived, contains claims.'),
q('How does OAuth2 work with gateways?','Gateway validates access tokens, optionally introspects, forwards user context.'),
q('What is token introspection?','OAuth2 standard (RFC 7662) for validating opaque tokens via auth server.'),
q('What should gateway do with invalid tokens?','Return 401 Unauthorized immediately, without forwarding to backend.')
],
R(10,35,100,25,'#0070f3','','Client','Request+Creds')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','API Gateway','Validates AuthN')+
A(250,48,280,48)+A(150,60,150,80)+
R(10,70,100,25,'#ffc107','','API Key','Static lookup')+
R(10,100,100,25,'#dc3545','','JWT','Signature+claims')+
R(10,130,100,25,'#e83e8c','','OAuth2','Token validation')+
R(10,160,100,25,'#6610f2','','mTLS','Certificate')+
R(160,70,100,25,'#dc3545','','Backend','Receives user headers')+
R(290,35,190,155,'#17a2b8','','API Gateway Auth','Centralized: API Keys, JWT, OAuth2, mTLS. Forward identity as headers.'),
T(240,220,'Authentication: API Gateway verifies identity. Methods: API Keys, JWT, OAuth2, mTLS.',9,'#666','middle'),
[
e('JWT Validation Middleware','Validate JWT and extract claims.',codeBlock([
'const jwt=require("jsonwebtoken");',
'async function authenticateGateway(req,res,next){',
'  const auth=req.headers.authorization;',
'  if(!auth?.startsWith("Bearer ")) return res.status(401).json({error:"Missing auth"});',
'  const token=auth.split(" ")[1];',
'  try{',
'    const decoded=jwt.verify(token,process.env.JWT_SECRET,{algorithms:["RS256"],audience:"api-gateway"});',
'    req.headers["X-User-ID"]=decoded.sub;',
'    req.headers["X-User-Role"]=decoded.role;',
'    delete req.headers.authorization;',
'    next();',
'  }catch(e){res.status(401).json({error:"Invalid token"})}',
'}'
]),'Gateway JWT validation forwarding claims as headers.'),
e('API Key Authentication','Simple key-based auth.',codeBlock([
'async function authenticateApiKey(req,res,next){',
'  const key=req.headers["x-api-key"]||req.query.api_key;',
'  if(!key) return res.status(401).json({error:"API key required"});',
'  const hash=crypto.createHash("sha256").update(key).digest("hex");',
'  const client=await redis.hgetall("apikey:"+hash);',
'  if(!client) return res.status(401).json({error:"Invalid key"});',
'  req.headers["X-Client-ID"]=client.id;',
'  req.headers["X-Client-Tier"]=client.tier;',
'  next();',
'}'
]),'API key auth with Redis-backed key store.'),
e('OAuth2 Token Introspection','Validate opaque tokens.',codeBlock([
'async function introspectToken(token){',
'  const r=await fetch("https://auth.example.com/introspect",{method:"POST",',
'    headers:{"Content-Type":"application/x-www-form-urlencoded","Authorization":"Basic "+Buffer.from(clientId+":"+clientSecret).toString("base64")},',
'    body:new URLSearchParams({token})});',
'  const data=await r.json();',
'  if(!data.active) throw new Error("Token inactive");',
'  return {sub:data.sub,scope:data.scope,clientId:data.client_id,exp:data.exp};',
'}'
]),'OAuth2 token introspection for opaque access tokens.'),
e('mTLS Authentication','Mutual TLS.',codeBlock([
'const https=require("https");const fs=require("fs");',
'const options={',
'  key:fs.readFileSync("server.key"),',
'  cert:fs.readFileSync("server.crt"),',
'  requestCert:true,rejectUnauthorized:true,',
'  ca:fs.readFileSync("client-ca.crt"),',
'};',
'https.createServer(options,(req,res)=>{',
'  const cert=req.socket.getPeerCertificate();',
'  req.headers["X-Client-CN"]=cert.subject?.CN;',
'  req.headers["X-Client-Fingerprint"]=cert.fingerprint;',
'}).listen(443);'
]),'mTLS with client certificate validation and identity extraction.'),
e('JWKS Key Rotation','Rotate keys without downtime.',codeBlock([
'let cachedKeys=null;let lastFetch=0;',
'async function getJwksKeys(){',
'  if(cachedKeys&&Date.now()-lastFetch<3600000) return cachedKeys;',
'  const r=await fetch("https://auth.example.com/.well-known/jwks.json");',
'  const jwks=await r.json();',
'  cachedKeys=jwks.keys.map(k=>({kid:k.kid,publicKey:jwktopem(k),alg:k.alg}));',
'  lastFetch=Date.now();return cachedKeys;',
'}',
'async function authenticateWithJwks(req,res,next){',
'  const token=extractToken(req);',
'  const decoded=jwt.decode(token,{complete:true});',
'  const kid=decoded?.header?.kid;',
'  const keys=await getJwksKeys();',
'  const key=keys.find(k=>k.kid===kid);',
'  if(!key) return res.status(401).json({error:"Unknown key ID"});',
'  jwt.verify(token,key.publicKey,{algorithms:[key.alg]});',
'  next();',
'}'
]),'JWKS key rotation with cached public key discovery.')
],
[
m('What header for API keys?',['Authorization','X-API-Key','X-Auth-Token','API-Key'],1,'X-API-Key is conventional.'),
m('What is mTLS?',['Password-based','Certificate-based mutual auth','Token-based','Biometric'],1,'Mutual TLS uses client+server certificates.'),
m('How does gateway communicate identity?',['URL params','HTTP headers','Request body','Cookies'],1,'Identity claims forwarded as headers.'),
m('What does JWT not check?',['Signature','Password','Expiration','Audience'],1,'JWT does not check password.'),
m('What is token introspection?',['Decoding JWT','Validating opaque tokens','Encrypting token','Generating token'],1,'Introspection validates opaque tokens via auth server.'),
m('What status for invalid auth?',['403','401','400','404'],1,'401 Unauthorized for invalid/missing auth.')
]
);
/* =================== TOPIC 8: Authorization =================== */
addTopic('ag-authorization','Authorization','intermediate',15,
['Authorization (AuthZ) in API Gateways controls what authenticated users can access � endpoints, operations, and data.',
'Authorization happens AFTER authentication: first verify who you are, then check what you can access.',
'Common models: RBAC (Role-Based), ABAC (Attribute-Based), PBAC (Policy-Based), ReBAC (Relationship-Based).',
'Gateways enforce authorization at entry: allowed HTTP methods, paths, resource ownership, request validation.'
],
'Authorization at the API Gateway is like a building badge system. After front door checks your ID (authN), elevator only lights buttons for floors you can visit.',
[
d('Enforcing Authorization at Gateway','Route-level: which paths/methods a role can access. Claim-checking: validate JWT claims against endpoint requirements. Policy-based: external engine (OPA, Casbin). Backend should also enforce (defense in depth).'),
d('RBAC with API Gateway','Roles have permissions. Gateway checks role from JWT claim (X-User-Role) against route permissions. Example: admin can DELETE /users, user only GET /users/me. 403 Forbidden.'),
d('ABAC with API Gateway','Policy evaluates user attributes (role, dept), resource attributes (type, owner), environment (time, location). Gateway invokes OPA sidecar. More flexible than RBAC.'),
d('AuthZ Flow Through Gateway','1. Client sends request with token. 2. Gateway authenticates. 3. Gateway checks authorization. 4. If allowed, forward with identity headers. 5. Backend performs additional fine-grained checks.')
],
'Gateway authorization is first line of defense, not only one. Coarse-grained at gateway. Fine-grained at service layer. RBAC for simple, ABAC/OPA for complex. 403 for unauthorized.',
[
q('What is authorization in API Gateway?','Controlling what authenticated users can access � endpoints, methods, and resources.'),
q('Difference between authN and authZ?','AuthN: who you are. AuthZ: what you can do. AuthN first.'),
q('HTTP status for authorization failure?','403 Forbidden.'),
q('What is RBAC?','Role-Based Access Control � roles have permissions, users assigned to roles.'),
q('What is ABAC?','Attribute-Based Access Control � decisions based on user, resource, environment attributes.'),
q('What is OPA?','Open Policy Agent � open-source policy engine for unified authorization.'),
q('Should gateway be the only authZ layer?','No � defense in depth: gateway coarse, service fine-grained, DB RLS.'),
q('Principle of least privilege?','Minimum permissions necessary.'),
q('401 vs 403?','401: not authenticated. 403: authenticated but not authorized.'),
q('How does gateway enforce authZ?','Check JWT claims (role, permissions) against endpoint requirements.')
],
R(10,35,100,25,'#0070f3','','Client','AuthZ request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','API Gateway','Check AuthZ')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Allowed','Forward')+
R(160,70,100,25,'#dc3545','','Denied','403 Forbidden')+
R(10,105,100,25,'#e83e8c','','RBAC','Role check')+
R(10,140,100,25,'#6610f2','','ABAC/OPA','Policy engine')+
R(160,105,100,25,'#17a2b8','','Backend','Fine-grained')+
R(290,35,190,155,'#17a2b8','','Authorization','Access control: RBAC, ABAC, OPA. Gateway+service defense in depth. 403.'),
T(240,220,'Authorization: Controlling access after authN. RBAC, ABAC, OPA. 403 for denied.',9,'#666','middle'),
[
e('RBAC Middleware in Gateway','Role-based protection.',codeBlock([
'const PERMISSIONS={',
'  "/api/users":{GET:["admin","manager","user"],POST:["admin"],DELETE:["admin"]},',
'  "/api/orders":{GET:["admin","manager","user"],POST:["admin","manager"]},',
'  "/api/reports":{GET:["admin","manager"]},',
'};',
'function authorize(req,res,next){',
'  const role=req.headers["x-user-role"];',
'  const perm=PERMISSIONS[req.path];',
'  if(!perm) return next();',
'  if(!perm[req.method]?.includes(role)) return res.status(403).json({error:"Insufficient permissions"});',
'  next();',
'}'
]),'RBAC middleware checking role against endpoint permissions.'),
e('OPA Authorization','External policy engine.',codeBlock([
'# OPA policy (Rego)',
'package api.authz',
'default allow = false',
'allow { input.method=="GET" input.path=="/api/users" input.user.role=="admin" }',
'allow { input.method=="GET" input.path=="/api/orders" input.user.role in ["admin","manager","user"] }',
'allow { input.method=="DELETE" startswith(input.path,"/api/users/") input.user.id==split(input.path,"/")[3] }',
'// Gateway calls OPA:',
'async function checkOpaPolicy(req){',
'  const input={method:req.method,path:req.path,user:{id:req.headers["x-user-id"],role:req.headers["x-user-role"]}};',
'  const r=await fetch("http://opa:8181/v1/data/api/authz",{method:"POST",body:JSON.stringify({input})});',
'  const d=await r.json();return d.result;',
'}'
]),'OPA for externalized fine-grained authorization.'),
e('Casbin Authorization','Library-based enforcement.',codeBlock([
'# model.conf: r = sub, obj, act',
'# policy.csv:',
'p, admin, /api/*, (GET)|(POST)|(PUT)|(DELETE)',
'p, manager, /api/orders/*, (GET)|(POST)|(PUT)',
'p, user, /api/orders/*, GET',
'g, alice, admin',
'// Node.js: const allowed = await enforcer.enforce("alice", "/api/users", "DELETE");'
]),'Casbin with ACL/RBAC via model and policy files.')
],
[
m('HTTP status for authZ failure?',['401','403','404','400'],1,'403 Forbidden.'),
m('RBAC vs ABAC?',['RBAC=roles,ABAC=attributes','ABAC simpler','Same thing','Only RBAC for web'],0,'RBAC uses roles; ABAC uses attributes.'),
m('What is OPA?',['Open Payment API','Open Policy Agent','OAuth Adapter','Operation Access'],1,'Open Policy Agent.'),
m('Should gateway be only authZ layer?',['Yes','No, defense in depth','Simple apps only','Depends'],1,'Defense in depth: gateway + service + DB.'),
m('401 vs 403?',['401=not authN,403=not authZ','Same','401=bad request','401=auth,403=limit'],0,'401 missing auth. 403 not permitted.'),
m('Least privilege?',['Maximum access','Minimum permissions','No permissions','Admin for all'],1,'Minimum needed permissions.')
]
);
/* =================== TOPIC 9: API Keys =================== */
addTopic('ag-api-keys','API Keys','beginner',10,
['API Keys are long-lived, static credentials identifying and authenticating API clients for machine-to-machine communication.',
'Passed in headers (X-API-Key), query params, or body. Identify the client, NOT a specific user.',
'Best practices: hash before storing, support rotation, allow multiple keys per client, set expiration, log usage, revoke.',
'Use for: service accounts, third-party integrations, developer portals, public API tiers.'
],
'API Keys are like apartment building mailbox keys. Each service gets a specific key. Lost key = get new one, old one stops working.',
[
d('API Key Generation','crypto.randomBytes(32).toString("hex") = 64-char hex. Prefix: sk_live_abc123. Store SHA-256 hash only. Rotate 90-365 days.'),
d('API Key Validation in Gateway','Extract key, hash it, look up in DB/Redis. Check valid/expired/revoked/scopes. Rate limit by tier. Cache in Redis (short TTL).'),
d('API Key vs JWT','API Key: static, long-lived, identifies client, hash lookup. JWT: dynamic, short-lived, user claims, stateless. Many systems use both.'),
d('API Key Management','Create: generate, hash, store, return once. List: show prefixes only. Revoke: delete/flag hash. Rotate: new key, old grace period.')
],
'Essential for machine-to-machine API access. Generate with crypto randomness, hash before storing, never expose in logs. Support rotation with grace period. Use prefixes. Combine with per-key rate limiting.',
[
q('What is an API Key?','Long-lived, static credential identifying API clients for machine-to-machine communication.'),
q('How should API Keys be stored?','Hashed (SHA-256). Return plaintext once at creation.'),
q('What header for API Keys?','X-API-Key header, also query param or body.'),
q('API Key vs JWT?','API Key: static, identifies client. JWT: dynamic, carries user identity.'),
q('How to revoke?','Delete or flag the hashed key.'),
q('What is key rotation?','Replacing old key with new. Grace period where both work.'),
q('Can API Keys identify a user?','No � they identify applications.'),
q('Recommended format?','Prefix + type + random: sk_live_abc123def456.'),
q('Should API Keys expire?','Yes. Rotate periodically.'),
q('What to log?','Key prefix, endpoint, timestamp, IP, success/failure.')
],
R(10,35,100,25,'#0070f3','','Client','App/Service')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','API Gateway','Validate Key')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','X-API-Key','Header/Query')+
R(10,105,100,25,'#dc3545','','Hash Lookup','SHA-256')+
R(10,140,100,25,'#e83e8c','','Redis Cache','Fast')+
R(160,70,100,25,'#6610f2','','Rate Limit','Per-key')+
R(160,105,100,25,'#17a2b8','','Backend','Processing')+
R(290,35,190,155,'#17a2b8','','API Keys','Static credentials. Hash, rotate, rate-limit. Machine-to-machine auth.'),
T(240,220,'API Keys: Simple static credentials for service-to-service auth. Hash, rotate, rate-limit.',9,'#666','middle'),
[
e('API Key Generation and Storage','Generate and hash keys.',codeBlock([
'const crypto=require("crypto");',
'function generateApiKey(clientId,type="live"){',
'  const random=crypto.randomBytes(32).toString("hex");',
'  const apiKey="sk_"+type+"_"+random;',
'  const hash=crypto.createHash("sha256").update(apiKey).digest("hex");',
'  return{plaintext:apiKey,hash,prefix:apiKey.substring(0,12)};',
'}',
'async function storeApiKey(clientId,keyData){',
'  await db.query("INSERT INTO api_keys (client_id,key_hash,key_prefix,expires_at) VALUES (,,,NOW()+INTERVAL \'365 days\')",[clientId,keyData.hash,keyData.prefix]);',
'}'
]),'API key generation with crypto randomness and hashing.'),
e('API Key Validation Middleware','Validate at gateway.',codeBlock([
'async function apiKeyAuth(req,res,next){',
'  const key=req.headers["x-api-key"]||req.query.api_key;',
'  if(!key) return res.status(401).json({error:"API key required"});',
'  const hash=crypto.createHash("sha256").update(key).digest("hex");',
'  let client=await redis.hgetall("apikey:"+hash);',
'  if(!client){',
'    const r=await db.query("SELECT * FROM api_keys WHERE key_hash= AND (expires_at IS NULL OR expires_at>NOW()) AND revoked=false",[hash]);',
'    client=r.rows[0];',
'    if(!client) return res.status(401).json({error:"Invalid key"});',
'    await redis.hset("apikey:"+hash,{client_id:client.client_id,tier:client.tier});',
'    await redis.expire("apikey:"+hash,300);',
'  }',
'  req.client=client;next();',
'}'
]),'API key validation with Redis cache and DB fallback.'),
e('Key Rotation with Grace Period','Rotate without downtime.',codeBlock([
'async function rotateApiKey(clientId,oldKey){',
'  const oldHash=crypto.createHash("sha256").update(oldKey).digest("hex");',
'  const existing=await db.query("SELECT * FROM api_keys WHERE key_hash= AND client_id=",[oldHash,clientId]);',
'  if(!existing.rows[0]) throw new Error("Invalid old key");',
'  const newKey=generateApiKey(clientId);',
'  await storeApiKey(clientId,newKey);',
'  await db.query("UPDATE api_keys SET expires_at=NOW()+INTERVAL \'7 days\' WHERE key_hash=",[oldHash]);',
'  return{newKey:newKey.plaintext,gracePeriodDays:7};',
'}'
]),'Key rotation with 7-day grace period.'),
e('Per-Key Rate Limiting','Rate limit by key tier.',codeBlock([
'const TIER_LIMITS={free:{rpm:10},basic:{rpm:100},pro:{rpm:1000},enterprise:{rpm:10000}};',
'async function perKeyRateLimit(req,res,next){',
'  const key=req.headers["x-api-key"];',
'  const hash=crypto.createHash("sha256").update(key).digest("hex");',
'  const client=await getClientByKeyHash(hash);',
'  const limits=TIER_LIMITS[client.tier]||TIER_LIMITS.free;',
'  const current=await redis.incr("ratelimit:"+hash+":minute");',
'  if(current===1) await redis.expire("ratelimit:"+hash+":minute",60);',
'  if(current>limits.rpm) return res.status(429).json({error:"Rate limited",tier:client.tier});',
'  res.setHeader("X-RateLimit-Limit",limits.rpm);res.setHeader("X-RateLimit-Remaining",limits.rpm-current);',
'  next();',
'}'
]),'Per-API-key rate limiting with tier-based limits.')
],
[
m('How should API keys be stored?',['Plaintext','SHA-256 hashed','AES encrypted','In logs'],1,'SHA-256 hashed.'),
m('Typical header for API keys?',['Authorization','X-API-Key','X-Auth-Token','API-Key'],1,'X-API-Key.'),
m('Can API keys identify users?',['Yes','No, identify apps','With JWT','Depends'],1,'API keys identify applications.'),
m('What is key rotation?',['Replacing old key with new','Hashing again','Encrypting again','Logging'],0,'Replace old key with new.'),
m('Should API keys expire?',['Yes','No','Free only','Enterprise only'],0,'Yes, rotate periodically.'),
m('Safe to log about keys?',['Full key','Key prefix only','Key hash','Nothing'],1,'Only log prefix.')
]
);
/* =================== TOPIC 10: JWT Validation =================== */
addTopic('ag-jwt-validation','JWT Validation','intermediate',18,
['JWT (JSON Web Token) is a compact, self-contained token format for transmitting claims between parties, commonly used for API authentication.',
'Three parts: Header (alg, typ), Payload (claims), Signature (HMAC or RSA/ECDSA). Base64url encoded, dot-separated.',
'Gateway validates: signature (trusted public key), expiration (exp), not before (nbf), issuer (iss), audience (aud).',
'Best practices: short expiry (15-60min), use RS256/ES256 over HS256, rotate signing keys, blacklist for immediate revocation.'
],
'JWT is like a concert wristband. Has your VIP status, expiry time, and venue. Wristband is signed � can check but not forge. Sold separately with hologram (real one).',
[
d('JWT Structure','Header: {"alg":"RS256","typ":"JWT"}. Payload: {"sub":"user123","role":"admin","exp":1748567890}. Signature: RSA-SHA256(base64urlEncode(header)+"."+base64urlEncode(payload), privateKey).'),
d('Signature Verification at Gateway','Fetch JWKS (JSON Web Key Set) from auth server. Cache keys with kid (key ID) matching. Verify: decode using jwks-rsa+jsonwebtoken. Check: signature, exp, nbf, iss, aud. Reject expired.'),
d('Token Revolution Strategies','JWT cannot be revoked by expiry alone. Solutions: short TTL (15min), token blacklist (Redis), token version DB, refresh tokens. Do not validate remote on every call.'),
d('JWKS (JSON Web Key Set)','Standard endpoint: /.well-known/jwks.json. Contains public keys (modulus n, exponent e for RSA). Gateway caches, rotates automatically. Allows key rotation without downtime.')
],
'JWT validation at gateway is critical: verify signature with JWKS, check claims (exp, nbf, iss, aud), handle revocation (blacklist/short TTL). Prefer RS256 for asymmetric signing. Rotate keys via JWKS. Reject on first failure.',
[
q('What does JWT stand for?','JSON Web Token.'),
q('JWT parts?','Header.Payload.Signature � three base64url-encoded segments.'),
q('What is the exp claim?','Expiration time (Unix timestamp). Must be in the future.'),
q('HS256 vs RS256?','HS256: symmetric (shared secret). RS256: asymmetric (RSA private/public). RS256 preferred.'),
q('What is JWKS?','JSON Web Key Set � endpoint with public keys for verification.'),
q('How to revoke JWT?','Short TTL + token blacklist (Redis). Refresh tokens for long sessions.'),
q('What is kid?','Key ID in JWT header � matches JWKS key for rotation.'),
q('Should JWT be blacklisted immediately on logout?','Yes � blacklist with TTL matching token expiry.'),
q('What claims to validate?','Signature, exp, nbf, iss, aud, optionally sub.'),
q('What is refresh token?','Long-lived token to get new access tokens. Stored securely.')
],
R(10,35,100,25,'#0070f3','','Client','Request+JWT')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','API Gateway','Validate JWT')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','JWKS','Cache keys')+
R(10,105,100,25,'#dc3545','','Signature','Verify RSA')+
R(10,140,100,25,'#e83e8c','','Claims','exp/iss/aud')+
R(160,70,100,25,'#6610f2','','Blacklist','Redis check')+
R(160,105,100,25,'#17a2b8','','Backend','User context')+
R(290,35,190,155,'#17a2b8','','JWT','Self-contained token. RS256. JWKS. Short TTL. Blacklist for revocation.'),
T(240,220,'JWT: Self-contained auth tokens with signature, expiry, claims. Validate signature and claims at gateway.',9,'#666','middle'),
[
e('JWT Verification with JWKS','Verify using public keys.',codeBlock([
'const jwt=require("jsonwebtoken");',
'const jwksClient=require("jwks-rsa");',
'const client=jwksClient({jwksUri:"https://auth.example.com/.well-known/jwks.json"});',
'function getKey(header,callback){',
'  client.getSigningKey(header.kid,(err,key)=>{',
'    if(err) return callback(err);',
'    const signingKey=key.getPublicKey();',
'    callback(null,signingKey);',
'  });',
'}',
'async function validateJwt(req,res,next){',
'  const token=req.headers.authorization?.replace("Bearer ","");',
'  if(!token) return res.status(401).json({error:"Token required"});',
'  jwt.verify(token,getKey,{algorithms:["RS256"],issuer:"https://auth.example.com",audience:"https://api.example.com"},err=>{',
'    if(err) return res.status(401).json({error:"Invalid token",details:err.message});',
'    const decoded=jwt.decode(token);',
'    req.user=decoded;next();',
'  });',
'}'
]),'JWT verification with JWKS-fetched public keys and claim validation.'),
e('Token Blacklist','Revoke tokens before expiry.',codeBlock([
'async function blacklistToken(jti,exp){',
'  const ttl=Math.max(0,exp-Math.floor(Date.now()/1000));',
'  await redis.set("blacklist:"+jti,"true","EX",ttl);',
'}',
'async function checkBlacklist(token){',
'  const decoded=jwt.decode(token);',
'  if(!decoded) return true;',
'  const blocked=await redis.exists("blacklist:"+decoded.jti);',
'  return blocked===1;',
'}',
'async function validateWithBlacklist(req,res,next){',
'  const token=req.headers.authorization?.replace("Bearer ","");',
'  const blacklisted=await checkBlacklist(token);',
'  if(blacklisted) return res.status(401).json({error:"Token revoked"});next();',
'}'
]),'Token blacklist using JTI (JWT ID) with TTL matching expiry.'),
e('Refresh Token Flow','Access + refresh tokens.',codeBlock([
'// Login returns both',
'async function login(req,res){',
'  const accessToken=jwt.sign({sub:user.id,role:user.role},privateKey,',
'    {algorithm:"RS256",expiresIn:"15m",issuer:"https://auth.example.com",audience:"https://api.example.com"});',
'  const refreshToken=crypto.randomBytes(64).toString("hex");',
'  await db.query("INSERT INTO refresh_tokens (user_id,token_hash,expires_at) VALUES (,SHA256(),NOW()+INTERVAL \'7 days\')",[user.id,refreshToken]);',
'  res.json({access_token:accessToken,refresh_token:refreshToken,expires_in:900});',
'}'
]),'Refresh token flow: short-lived access token + long-lived refresh token.'),
e('HS256 vs RS256','Symmetric vs asymmetric.',codeBlock([
'// HS256: Shared secret (symmetric)',
'const token=jwt.sign({sub:"123"},HS256_SECRET,{algorithm:"HS256",expiresIn:"15m"});',
'const decoded=jwt.verify(token,HS256_SECRET); // Same secret on all services',
'// RS256: Private/public key pair (asymmetric)',
'const token=jwt.sign({sub:"123"},privateKey,{algorithm:"RS256"});',
'const decoded=jwt.verify(token,publicKey); // Only auth server has private key'
]),'HS256 shared secret vs RS256 asymmetric. RS256 preferred for microservices.')
],
[
m('JWT parts?',['Header.Payload.Signature','Header.Body.Sig','Head.Payload.Sign','JWT.Part.Token'],0,'Header, Payload, Signature.'),
m('HS256 vs RS256?',['Same','HS256 symmetric, RS256 asymmetric','RS256 symmetric','Both symmetric'],1,'HS256=shared secret, RS256=private/public key.'),
m('What is JWKS?',['JWT Key Sink','JSON Web Key Set','JWK Service','JWT Keystore'],1,'JSON Web Key Set.'),
m('How to revoke JWT?',['Cannot','Blacklist + short TTL','Change algorithm','Delete DB'],1,'Blacklist with Redis + short TTL.'),
m('What claim is expiry?',['exp','iat','nbf','sub'],0,'exp (expiration time).'),
m('What is kid?',['Kids allowed','Key ID','Key Iteration','Kid token'],1,'Key ID for key rotation matching.')
]
);
/* =================== TOPIC 11: OAuth =================== */
addTopic('ag-oauth','OAuth','advanced',20,
['OAuth 2.0 is the industry-standard authorization framework enabling third-party applications to access resources without sharing credentials.',
'Four actors: Resource Owner (user), Client (app), Authorization Server (Auth0/Keycloak), Resource Server (API).',
'Grant types: Authorization Code (web apps), PKCE (SPA/mobile), Client Credentials (M2M), Implicit (deprecated), Device Code, Refresh Token.',
'Gateway acts as Resource Server: validates access tokens, forwards identity to downstream services, enforces scopes.'
],
'OAuth 2.0 is like a hotel valet key system. You (user) give receptionist (auth server) a limited key that valets (apps) can use for specific things (scopes). Valets cannot access rooms, only parking.',
[
d('OAuth Grant Types','Auth Code: user logs in auth server, gets code, exchanges for access token. PKCE: code challenge+verifier for SPAs. Client Credentials: no user, app-to-app. Refresh: get new tokens.'),
d('Gateway as Resource Server','1. Client sends access token. 2. Gateway validates (introspect or verify locally). 3. Checks scopes match endpoint. 4. Forwards identity (X-User-Id, X-Scopes). 5. Backend trusts gateway headers.'),
d('OAuth with Multiple Providers','Gateway can integrate with many IdPs (Auth0, Keycloak, custom). Discovery URL: /.well-known/openid-configuration. JWKS for public keys. Federation via OIDC.'),
d('Token Introspection vs Local Validation','Local: fast, no network, needs JWKS. Introspection: real-time validation, detects revoked tokens immediately, RP call. Gateway caches introspection results short TTL.')
],
'OAuth 2.0 is complex but critical. Use Authorization Code + PKCE for user-facing apps, Client Credentials for M2M. Gateway validates tokens and enforces scopes. Prefer local JWT validation with JWKS for performance; use introspection for high-value operations.',
[
q('What is OAuth 2.0?','Authorization framework for delegated access without sharing credentials.'),
q('Four OAuth actors?','Resource Owner, Client, Authorization Server, Resource Server.'),
q('Grant type for SPAs?','Authorization Code with PKCE (Proof Key for Code Exchange).'),
q('Grant type for M2M?','Client Credentials Grant.'),
q('What is scope?','Permission level for the token: read:orders, write:users.'),
q('Token introspection?','Auth server endpoint to validate and check token status in real time.'),
q('Local validation vs introspection?','Local: fast, cached JWKS, no network. Introspection: real-time, detects revocations.'),
q('OpenID Connect?','Identity layer on top of OAuth 2.0 � adds ID token (JWT with user info).'),
q('What is OIDC discovery?','/.well-known/openid-configuration � auth server metadata.'),
q('Why PKCE for SPAs?','Cannot store client_secret securely; PKCE uses code verifier+challenge.')
],
R(10,35,100,25,'#0070f3','','Client','App')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Auth Server','Login+Token')+
A(150,60,150,80)+A(40,48,10,48)+
R(10,70,100,25,'#ffc107','','Resource Owner','User')+
A(110,82,140,82)+
R(150,70,100,25,'#dc3545','','API Gateway','Val. token')+
A(250,82,280,82)+
R(10,105,100,25,'#e83e8c','','Scopes','Enforce')+
R(160,105,100,25,'#17a2b8','','Backend','Identity')+
R(290,35,190,155,'#17a2b8','','OAuth 2.0','Auth Code + PKCE. Client Credentials. Gateway validates tokens. Scopes.'),
T(240,220,'OAuth 2.0: Industry-standard delegated authorization. Grants: Auth Code+PKCE, Client Credentials. Gateway validates tokens and enforces scopes.',9,'#666','middle'),
[
e('OAuth Client Credentials Flow','M2M authentication.',codeBlock([
'// Client requests access token',
'const response=await fetch("https://auth.example.com/oauth/token",{',
'  method:"POST",',
'  headers:{"Content-Type":"application/x-www-form-urlencoded"},',
'  body:new URLSearchParams({',
'    grant_type:"client_credentials",',
'    client_id:"service-a",',
'    client_secret:"cs_abc123...",',
'    scope:"read:orders write:orders",',
'  }),',
'});',
'const {access_token}=await response.json();',
'// Then use in API calls:',
'fetch("https://api.example.com/orders",{headers:{Authorization:"Bearer "+access_token}});'
]),'Client Credentials Grant for M2M communication.'),
e('Authorization Code with PKCE','Secure SPA flow.',codeBlock([
'// 1. Generate code verifier and challenge (SPA)',
'const verifier=crypto.randomBytes(32).toString("base64url");',
'const challenge=crypto.createHash("sha256").update(verifier).digest("base64url");',
'// 2. Redirect to auth server',
'const authUrl="https://auth.example.com/authorize?"+new URLSearchParams({',
'  response_type:"code",client_id:"spa-client",redirect_uri:"https://app.example.com/callback",',
'  code_challenge:challenge,code_challenge_method:"S256",scope:"openid profile email",',
'});',
'window.location.href=authUrl;',
'// 3. Exchange code (callback)',
'const tokenResponse=await fetch("https://auth.example.com/oauth/token",{',
'  method:"POST",',
'  body:new URLSearchParams({grant_type:"authorization_code",code,code_verifier:verifier,redirect_uri:"https://app.example.com/callback",client_id:"spa-client"}),',
'})'
]),'PKCE flow for SPAs � code verifier ensures only the original app can exchange the code.'),
e('Gateway Token Validation','Validate at gateway.',codeBlock([
'async function oauthGatewayMiddleware(req,res,next){',
'  // Extract token from Authorization header or cookie',
'  let token=req.cookies?.access_token||req.headers.authorization?.replace("Bearer ","");',
'  if(!token) return res.redirect("/login");',
'  // Validate locally or introspect',
'  try{',
'    const decoded=jwt.verify(token,getPublicKey,{algorithms:["RS256"],issuer:"https://auth.example.com"});',
'    req.user={id:decoded.sub,scopes:decoded.scope?.split(" ")||[]};',
'    next();',
'  }catch(err){',
'    // Token invalid/expired � try refresh',
'    const refreshed=await refreshToken(req);',
'    if(refreshed) return;',
'    res.redirect("/login");',
'  }',
'}',
'function requireScope(scope){',
'  return(req,res,next)=>{',
'    if(!req.user?.scopes?.includes(scope)) return res.status(403).json({error:"Insufficient scope"});',
'    next();',
'  };',
'}',
'// Route: app.use("/api/orders",requireToken,requireScope("read:orders"),ordersRouter);'
]),'Gateway validates OAuth tokens and enforces scopes with middleware.'),
e('OAuth with Multiple Providers','Federated OAuth.',codeBlock([
'const PROVIDERS={',
'  google:{discoveryUrl:"https://accounts.google.com/.well-known/openid-configuration",clientId:process.env.GOOGLE_CLIENT_ID,scopes:["openid","profile","email"]},',
'  github:{authorizeUrl:"https://github.com/login/oauth/authorize",tokenUrl:"https://github.com/login/oauth/access_token",clientId:process.env.GH_CLIENT_ID},',
'};',
'async function oauthLogin(req,res){',
'  const provider=PROVIDERS[req.params.provider];',
'  const state=crypto.randomBytes(16).toString("hex");',
'  await redis.set("oauth:state:"+state,JSON.stringify({provider:req.params.provider,redirect:req.query.redirect}),"EX",300);',
'  const url=provider.authorizeUrl+"?"+new URLSearchParams({response_type:"code",client_id:provider.clientId,redirect_uri:"https://api.example.com/oauth/callback",scope:provider.scopes?.join(" "),state,});',
'  res.redirect(url);',
'}'
]),'Multiple OAuth providers with secure state parameter.')
],
[
m('Grant type for SPAs?',['Implicit','Auth Code + PKCE','Client Credentials','Device Code'],1,'Authorization Code with PKCE.'),
m('Grant for M2M?',['Client Credentials','Authorization Code','Implicit','Password'],0,'Client Credentials.'),
m('What is scope?',['Token identifier','Permission level','User ID','Signature'],1,'Permission level.'),
m('Token introspection?',['Real-time validation','Generating token','Encrypting JWT','Signing key'],0,'Real-time token validation.'),
m('OIDC adds what?',['Refresh tokens','ID token (user info)','Client secret','JWKS'],1,'ID token (user identity).'),
m('Why PKCE?',['Faster tokens','Secure SPA (no client secret)','Mobile only','Older standard'],1,'Secure for SPAs without client_secret.')
]
);
/* =================== TOPIC 12: Logging =================== */
addTopic('ag-logging','Logging','beginner',13,
['API Gateway logging records all request/response metadata for debugging, monitoring, auditing, and security analysis.',
'Log at entry (request) and exit (response): method, path, status, latency, client IP, user ID, request ID, errors.',
'Structured JSON logging preferred: single-line, machine-parseable, with correlation IDs for distributed tracing.',
'Best practices: never log sensitive data (passwords, tokens, keys), add request ID per request, log level (debug/info/warn/error), sampling for high traffic.'
],
'API Gateway logging is like an airport security camera. Records who (IP, user id) passed through which gate (path) at what time, how long they took (latency), and whether they had items confiscated (errors). Protects and debugs.',
[
d('Structured Logging in Gateways','Single-line JSON per log event. Fields: timestamp, level, reqId, method, path, status, latency, user, clientIp, userAgent, error. Tools: ELK (Elasticsearch+Logstash+Kibana), Loki+Grafana, Datadog.'),
d('Request Correlation','Unique request ID (X-Request-Id, Trace-Id) generated at gateway, passed to all downstream services. Enables tracing across microservices. Propagated via headers.'),
d('Log Levels and Sampling','Level: debug (development), info (normal ops), warn (anomaly), error (failure). Sampling: log 100% errors, 10% warnings, 1% info. Adaptive sampling for high traffic to control volume.'),
d('Sensitive Data Scrubbing','Before logging: remove Authorization header, X-API-Key, passwords, credit cards, PII. Regex patterns or field allowlist. Mask: "Bearer ***", "sk_***". Audit logs compliance.'),
d('Audit Logging','Tamper-proof log of admin operations: who changed what when. Append-only, hash-chained, stored separately. For SOC2, PCI-DSS, GDPR compliance.')
],
'Critical: structured JSON logs, request correlation IDs, never log sensitive data, sampling for volume control, distributed tracing with Gateway as root trace. Use ELK/Loki. Audit logs for compliance.',
[
q('Why structured logging?','JSON logs are machine-parseable, searchable by field, and work with log aggregators like ELK.'),
q('What is X-Request-Id?','Unique request identifier generated at gateway, propagated to all services for correlation.'),
q('What fields in gateway logs?','timestamp, method, path, status, latency, clientIp, user, reqId, userAgent, error.'),
q('What should NEVER be logged?','Passwords, tokens, API keys, credit cards, SSN, PII.'),
q('What is log sampling?','Logging a percentage of requests to control volume and cost.'),
q('Common log aggregators?','ELK (Elasticsearch/Logstash/Kibana), Loki+Grafana, Datadog, Splunk.'),
q('What is audit logging?','Tamper-proof log of admin operations for compliance (SOC2, PCI-DSS).'),
q('How to propagate trace ID?','X-Request-Id or X-Trace-Id header passed from gateway to services.'),
q('Log format recommendation?','Single-line JSON per event, one log entry per request-response cycle.'),
q('What is log level?','debug/info/warn/error � severity indicator.')
],
R(10,35,100,25,'#0070f3','','Client','Request')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Gateway','Log Entry')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Structured','JSON log')+
R(10,105,100,25,'#dc3545','','Scrub','PII/Secrets')+
R(10,140,100,25,'#e83e8c','','Correlate','Request-Id')+
R(160,70,100,25,'#6610f2','','Aggregator','ELK/Loki')+
R(160,105,100,25,'#17a2b8','','Audit','Compliance')+
R(290,35,190,155,'#17a2b8','','Logging','Structured JSON. Correlation IDs. No secrets. Sampling. ELK/Loki.'),
T(240,220,'Logging: Structured JSON logs with correlation IDs, no secrets. ELK/Loki for aggregation. Essential for debugging and compliance.',9,'#666','middle'),
[
e('Structured Logger Middleware','Log request and response.',codeBlock([
'function requestLogger(req,res,next){',
'  req.reqId=req.headers["x-request-id"]||crypto.randomUUID();',
'  res.setHeader("X-Request-Id",req.reqId);',
'  const start=Date.now();',
'  res.on("finish",()=>{',
'    const latency=Date.now()-start;',
'    const logEntry={',
'      timestamp:new Date().toISOString(),level:"info",reqId:req.reqId,',
'      method:req.method,path:req.path,status:res.statusCode,latency,',
'      clientIp:req.ip,user:req.user?.id||"anonymous",',
'      userAgent:req.headers["user-agent"],',
'      contentLength:res.getHeader("content-length"),',
'    };',
'    const samplingRate=res.statusCode>=500?1.0:res.statusCode>=400?0.1:0.01;',
'    if(Math.random()<samplingRate) console.log(JSON.stringify(logEntry));',
'  });',
'  next();',
'}'
]),'Structured JSON logger with sampling and correlation ID.'),
e('Sensitive Data Scrubbing','Secrets removed from logs.',codeBlock([
'const SENSITIVE_HEADERS=["authorization","x-api-key","cookie","set-cookie","x-session-id"];',
'const SENSITIVE_PATTERNS=[',
'  /\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\\b/g, // credit cards',
'  /(?:password|secret|token|key)=?["\']?[^&\s"\']+/gi,',
'  /Bearer\s+\S+/gi,',
'];',
'function scrubSensitiveData(obj,path=""){',
'  if(typeof obj!=="object"||!obj) return obj;',
'  const scrubbed={};',
'  for(const [key,val] of Object.entries(obj)){',
'    const k=key.toLowerCase();',
'    if(SENSITIVE_HEADERS.includes(k)) scrubbed[key]="[REDACTED]";',
'    else if(typeof val==="object") scrubbed[key]=scrubSensitiveData(val,path+"."+key);',
'    else{',
'      let strVal=String(val);',
'      for(const pattern of SENSITIVE_PATTERNS) strVal=strVal.replace(pattern,"[REDACTED]");',
'      scrubbed[key]=strVal;',
'    }',
'  }',
'  return scrubbed;',
'}'
]),'Scrubbing sensitive data before logging.'),
e('Distributed Tracing with Correlation ID','Trace across services.',codeBlock([
'// Gateway � generate and propagate',
'async function tracingMiddleware(req,res,next){',
'  req.traceId=req.headers["x-trace-id"]||crypto.randomUUID();',
'  req.spanId=crypto.randomUUID().slice(0,8);',
'  res.setHeader("X-Trace-Id",req.traceId);',
'  const originalFetch=global.fetch;',
'  global.fetch=function(url,opts={}){',
'    opts.headers={...opts.headers,"X-Trace-Id":req.traceId,"X-Span-Id":req.spanId};',
'    return originalFetch.call(this,url,opts);',
'  };',
'  next();',
'}',
'// Downstream service � propagate',
'const traceId=req.headers["x-trace-id"]||crypto.randomUUID();',
'logger.info({msg:"Processing request",traceId,spanId:crypto.randomUUID().slice(0,8)});'
]),'Distributed tracing with Trace and Span IDs propagated via headers.'),
e('ELK Integration','Ship logs to Elasticsearch.',codeBlock([
'// Winston logger with Elasticsearch transport',
'const winston=require("winston");',
'require("winston-elasticsearch");',
'const logger=winston.createLogger({',
'  level:"info",format:winston.format.json(),',
'  transports:[',
'    new winston.transports.Console({format:winston.format.combine(winston.format.colorize(),winston.format.simple())}),',
'    new ElasticsearchTransport({',
'      level:"info",clientOpts:{node:"https://elasticsearch:9200",auth:{username:"elastic",password:process.env.ES_PWD}},',
'      index:"api-gateway-logs-"+new Date().toISOString().slice(0,7),',
'    })',
'  ],',
'});',
'logger.info({event:"request",method:req.method,path:req.path,status:200,latency:42});'
]),'Winston logger shipping to Elasticsearch for ELK stack.')
],
[
m('Why structured logging?',['JSON parseable','Human readable','Smaller logs','Faster'],0,'JSON for machine parsing and search.'),
m('What to NEVER log?',['Method','Path','Authorization header','Latency'],2,'Never log tokens/keys/passwords.'),
m('What is X-Request-Id?',['Request identifier','API key','JWT claim','Session ID'],0,'Unique request ID for correlation.'),
m('What is log sampling?',['Log all requests','Percentage logging for volume','Compressing logs','Encrypting logs'],1,'Log subset of requests for volume control.'),
m('Which for distributed tracing?',['X-Request-Id','Correlation ID both','X-Trace-Id','All of the above'],3,'Any works; X-Trace-Id most common.'),
m('What is audit logging?',['All traffic log','Tamper-proof compliance log','Error log','Debug log'],1,'Tamper-proof admin operation log.')
]
);
/* =================== TOPIC 13: Metrics =================== */
addTopic('ag-metrics','Metrics','beginner',14,
['API Gateway metrics are quantitative measurements tracking traffic, latency, errors, and resource usage for monitoring and alerting.',
'Four golden signals: Latency (response time), Traffic (requests/sec), Errors (rate), Saturation (resource usage). RED method: Rate, Errors, Duration.',
'Common metrics: requests per second (RPS), P50/P95/P99 latency, error rate (5xx,4xx), active connections, upstream latency, cache hit rate, rate limit usage.',
'Collect via Prometheus + Grafana or Datadog. Export metrics endpoint (/metrics). Histograms for latency distribution, counters for cumulative, gauges for current.'
],
'API Gateway metrics are like car dashboard gauges. Speed (RPS), RPM (latency), fuel (connections), check engine light (errors). Dashboard lets you drive faster without overheating.',
[
d('Four Golden Signals','Latency: time to serve request (P50/P95/P99). Traffic: requests per second (RPS). Errors: rate of failed requests (5xx,4xx). Saturation: how "full" gateway is (connections, CPU).'),
d('RED Method','Rate: requests per second. Errors: failed requests per second. Duration: distribution of response time. Simplifies monitoring: three metrics capture health.'),
d('Prometheus Metrics Types','Counter: cumulative count (total requests, errors). Gauge: current value (active connections). Histogram: bucketed latency (p50, p95, p99). Summary: quantiles.'),
d('Upstream Metrics','Track each backend service separately. Key: upstream_rps, upstream_latency, upstream_errors. Identify which service is slow. Circuit breaker data.'),
d('Alerting Thresholds','P99 latency > 500ms. Error rate > 1% (5xx). RPS drop > 50%. Active connections > 80% of max. Cache hit rate < 50%. Rate limit threshold breached.')
],
'Monitor four golden signals: Latency, Traffic, Errors, Saturation (USE) or Rate, Errors, Duration (RED). Use Prometheus histograms for latency. Alert on p99>500ms, error rate>1%. Upstream metrics for service-level visibility.',
[
q('Four golden signals?','Latency, Traffic, Errors, Saturation.'),
q('RED method components?','Rate (requests/sec), Errors (failed/sec), Duration (latency).'),
q('P50 vs P99?','P50: median latency. P99: 99th percentile (worst 1%).'),
q('Prometheus metric types?','Counter (cumulative), Gauge (current value), Histogram (bucketed), Summary (quantiles).'),
q('What is RPS?','Requests per second � measure of traffic.'),
q('What to alert based on?','P99 latency, error rate, connection saturation, RPS anomalies.'),
q('Why track upstream metrics?','Identify slow/malfunctioning backend services.'),
q('Grafana vs Prometheus?','Prometheus: metrics storage. Grafana: dashboard visualization.'),
q('Metrics endpoint?','/metrics � Prometheus scrapes this. Usually port 9090.'),
q('What is saturation?','How "full" gateway is: connections, memory, CPU.')
],
R(10,35,100,25,'#0070f3','','Gateway','App metrics')+
A(110,48,140,48)+
R(150,35,100,25,'#28a745','','Prometheus','Scrape')+
A(150,60,150,80)+A(250,48,280,48)+
R(10,70,100,25,'#ffc107','','Counters','Totals')+
R(10,105,100,25,'#dc3545','','Histograms','Latencies')+
R(10,140,100,25,'#e83e8c','','Gauges','Cur. state')+
R(160,70,100,25,'#6610f2','','Grafana','Dashboard')+
R(160,105,100,25,'#17a2b8','','Alerts','Thresholds')+
R(290,35,190,155,'#17a2b8','','Metrics','Four golden signals: Latency, Traffic, Errors, Saturation. Prometheus+Grafana. P50/P95/P99.'),
T(240,220,'Metrics: Four golden signals (Latency, Traffic, Errors, Saturation). Prometheus + Grafana. P50/P95/P99 latency. Alert on p99>500ms.',9,'#666','middle'),
[
e('Prometheus Metrics Middleware','Expose /metrics.' ,codeBlock([
'const promClient=require("prom-client");',
'const register=new promClient.Registry();',
'promClient.collectDefaultMetrics({register});',
'const httpRequestDuration=new promClient.Histogram({',
'  name:"http_request_duration_seconds",help:"Duration of HTTP requests in seconds",',
'  labelNames:["method","path","status"],buckets:[0.01,0.05,0.1,0.25,0.5,1,2.5,5,10],',
'  registers:[register],',
'});',
'const httpRequestsTotal=new promClient.Counter({',
'  name:"http_requests_total",help:"Total number of HTTP requests",',
'  labelNames:["method","path","status"],registers:[register],',
'});',
'const activeConnections=new promClient.Gauge({',
'  name:"active_connections",help:"Number of active connections",registers:[register],',
'});',
'async function metricsMiddleware(req,res,next){',
'  if(req.path==="/metrics"){',
'    res.setHeader("Content-Type",register.contentType);',
'    res.end(await register.metrics());return;',
'  }',
'  activeConnections.inc();',
'  const endTimer=httpRequestDuration.startTimer();res.on("finish",()=>{',
'    endTimer({method:req.method,path:req.route||req.path,status:res.statusCode});',
'    httpRequestsTotal.inc({method:req.method,path:req.route||req.path,status:res.statusCode});',
'    activeConnections.dec();',
'  });next();',
'}'
]),'Prometheus metrics middleware with histogram, counter, gauge.'),
e('Latency Monitoring','Track p50/p95/p99.' ,codeBlock([
'const p50=await promClient.util.getHistogramQuantile(0.5,histogram);',
'const p95=await promClient.util.getHistogramQuantile(0.95,histogram);',
'const p99=await promClient.util.getHistogramQuantile(0.99,histogram);',
'// Or query Prometheus:',
'// histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))',
'// Alert rules:',
'// - alert: HighLatency',
'//   expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 0.5',
'//   for: 5m',
'//   labels: { severity: critical }',
'//   annotations: { summary: "P99 latency > 500ms" }'
]),'Latency monitoring with Prometheus quantile queries and alerting.'),
e('Upstream Health Metrics' ,'Track backend health.' ,codeBlock([
'const upstreamLatency=new promClient.Histogram({',
'  name:"upstream_request_duration_seconds",',
'  help:"Upstream request duration in seconds",',
'  labelNames:["upstream","method","status"],buckets:[0.01,0.05,0.1,0.25,0.5,1,2.5,5,10],',
'  registers:[register],',
'});',
'const upstreamErrors=new promClient.Counter({',
'  name:"upstream_errors_total",help:"Total upstream errors",',
'  labelNames:["upstream","error_type"],registers:[register],',
'});',
'// Use in reverse proxy:',
'async function proxyToUpstream(req,res,target){',
'  const endTimer=upstreamLatency.startTimer();',
'  try{',
'    const response=await fetch(target);',
'    endTimer({upstream:target,method:req.method,status:response.status});',
'    if(!response.ok) upstreamErrors.inc({upstream:target,error_type:"http_"+response.status});',
'    res.status(response.status).send(await response.text());',
'  }catch(err){',
'    upstreamErrors.inc({upstream:target,error_type:"connection"});endTimer({upstream:target,method:req.method,status:0});',
'    res.status(502).send("Bad Gateway");',
'  }',
'}'
]),'Upstream health metrics tracking latency and errors per backend.'),
e('Grafana Dashboard JSON','Example dashboard.' ,codeBlock([
'// Grafana dashboard (JSON model)',
'{',
'  "title":"API Gateway Dashboard","panels":[',
'    {"title":"RPS","type":"graph","targets":[{"expr":"rate(http_requests_total[5m])","legendFormat":"{{method}} {{path}}"}]},',
'    {"title":"P99 Latency","type":"graph","targets":[{"expr":"histogram_quantile(0.99,rate(http_request_duration_seconds_bucket[5m]))","legendFormat":"P99"}]},',
'    {"title":"Error Rate","type":"graph","targets":[{"expr":"rate(http_requests_total{status=~\"5..\"}[5m])/rate(http_requests_total[5m])","legendFormat":"5xx %"}]},',
'    {"title":"Active Connections","type":"graph","targets":[{"expr":"active_connections","legendFormat":"connections"}]},',
'    {"title":"Upstream Health","type":"table","targets":[{"expr":"upstream_errors_total","legendFormat":"{{upstream}}"}]},',
'    {"title":"Rate Limit Usage","type":"graph","targets":[{"expr":"rate_limit_usage_ratio","legendFormat":"{{tier}}"}]}',
'  ],"refresh":"10s"}'
]),'Grafana dashboard JSON for API Gateway metrics.')
],
[
m('Four golden signals?',['Latency, Traffic, Errors, Saturation','CPU,RAM,Disk,Network','GET,POST,PUT,DELETE','JSON,XML,YAML,CSV'],0,'Latency, Traffic, Errors, Saturation.'),
m('RED method?',['Rate, Errors, Duration','Read, Execute, Delete','Route, Endpoint, Data','Run every day'],0,'Rate, Errors, Duration.'),
m('P99 latency meaning?',['Median latency','99th percentile','99ms','99% error'],1,'99th percentile � worst 1% of requests.'),
m('Prometheus histogram used for?',['Counting','Latency distribution','Current values','Logging'],1,'Latency distribution buckets.'),
m('Grafana is for?',['Metrics storage','Dashboards','Alerting','All'],1,'Dashboard visualization.'),
m('Alert on what latency?',['P99 > 500ms','P50 > 100ms','Average','Min latency'],0,'P99 > 500ms typical threshold.')
]
);

var padTopics = require('../pad-topics');
padTopics(topics, topicList, addTopic);

// ---- GENERATE ----
var dataDir = __dirname;

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["api-gateway"] = TOPICS_DATA["api-gateway"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["api-gateway"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated API Gateway topics: ' + Object.keys(topics).length);


