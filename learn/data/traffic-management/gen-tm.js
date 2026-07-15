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

/* =================== 1: Reverse Proxy =================== */
addTopic('tm-reverse-proxy', 'Reverse Proxy', 'intermediate', 20,
  ['A reverse proxy sits in front of backend servers, accepting client requests and forwarding them to the appropriate backend.',
   'Clients interact only with the reverse proxy, never directly with backend servers — this adds a layer of abstraction and security.',
   'Common reverse proxies: Nginx, HAProxy, Traefik, Envoy, Apache HTTP Server, Caddy.',
   'Benefits: load balancing, SSL termination, caching, compression, security filtering, rate limiting, and hiding internal topology.'
  ],
  'A reverse proxy is like a company receptionist. Visitors (clients) talk to the receptionist instead of wandering into offices. The receptionist directs them to the right department (backend server). The receptionist can also screen visitors (security), take messages (caching), and handle the mailroom (SSL termination).',
  [
    d('Forward vs Reverse Proxy', 'Forward proxy: represents the client (hides client identity). Reverse proxy: represents the server (hides server topology). Forward proxies are client-side; reverse proxies are server-side. A forward proxy helps clients access blocked content; a reverse proxy protects and optimizes backend servers.'),
    d('SSL Termination', 'The reverse proxy handles TLS/SSL decryption, relieving backend servers of cryptographic overhead. Backend servers communicate with the proxy via plain HTTP on internal networks. Benefits: centralized certificate management, reduced CPU load on backends, easier certificate rotation.'),
    d('Caching and Compression', 'Reverse proxy can cache frequently requested responses (static assets, API responses). Cache hit = instant response without hitting backend. Compression (gzip, brotli) reduces bandwidth. Cache invalidation strategies: TTL-based, purge on update, versioned URLs.'),
    d('Security Features', 'DDoS protection: rate limiting, connection limits. Web Application Firewall (WAF): filter malicious requests. IP allow/block lists. Hide internal IP addresses (server headers). Request filtering (block SQL injection, XSS patterns). Access logging and monitoring.')
  ],
  'A reverse proxy is the front door to your backend infrastructure — it handles SSL, caching, load balancing, and security filtering. Position it as the single entry point for all client traffic. Configure it to terminate TLS, cache static content, and route requests to healthy backends. Essential for any production deployment.',
  [
    q('What is a reverse proxy?', 'A server that sits in front of backend servers, forwarding client requests to them and returning the responses.'),
    q('What is the difference between forward and reverse proxy?', 'Forward proxy hides the client (client-side). Reverse proxy hides the server (server-side).'),
    q('What is SSL termination?', 'The reverse proxy handles TLS decryption so backend servers communicate over plain HTTP internally.'),
    q('What are common reverse proxy software?', 'Nginx, HAProxy, Traefik, Envoy, Apache HTTP Server, Caddy.'),
    q('How does a reverse proxy improve security?', 'Hides internal topology, filters malicious requests, rate limits, terminates SSL, provides WAF capabilities.'),
    q('How can a reverse proxy improve performance?', 'Caching responses, compressing data, connection pooling, load balancing, and offloading SSL.'),
    q('What is the difference between reverse proxy and API gateway?', 'API gateway adds API-specific features (routing, auth, rate limiting, API versioning) on top of reverse proxy capabilities.'),
    q('Can a reverse proxy cache dynamic content?', 'Yes, with proper cache headers (Cache-Control, ETag). Dynamic content caching requires careful invalidation strategies.'),
    q('What is proxy buffering?', 'The proxy reads the entire response from the backend before sending it to the client. Improves slow client performance.'),
    q('How does a reverse proxy handle WebSockets?', 'Requires specific configuration to upgrade connections. Nginx: proxy_set_header Upgrade $http_upgrade.')
  ],
  R(10,35,100,25,"#0070f3","","Client","Browser/App") +
  A(110,48,140,48) +
  R(150,35,160,25,"#28a745","","Reverse Proxy","Nginx / HAProxy / Traefik") +
  A(310,48,340,48) + A(150,60,150,80) + A(150,90,150,110) +
  R(350,35,130,25,"#dc3545","","Backend 1","App Server") +
  R(350,70,130,25,"#ffc107","","Backend 2","App Server") +
  R(350,105,130,25,"#e83e8c","","Backend 3","App Server") +
  R(10,70,130,25,"#6610f2","","SSL Termination","TLS offload") +
  R(10,105,130,25,"#17a2b8","","Caching + WAF","Performance + Security") +
  T(240,155,"Reverse Proxy: Single entry point handling SSL, caching, security, and routing to backend servers.",9,"#666","middle"),
  [
    e('Nginx Reverse Proxy Config', 'Basic reverse proxy setup.', codeBlock([
      'server {',
      '  listen 80;',
      '  server_name api.example.com;',
      '',
      '  location / {',
      '    proxy_pass http://localhost:3000;',
      '    proxy_set_header Host $host;',
      '    proxy_set_header X-Real-IP $remote_addr;',
      '    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;',
      '    proxy_set_header X-Forwarded-Proto $scheme;',
      '',
      '    proxy_buffering on;',
      '    proxy_buffer_size 4k;',
      '    proxy_buffers 8 4k;',
      '  }',
      '}'
    ]), 'Nginx reverse proxy forwarding to a Node.js backend with proper headers.'),
    e('Traefik Reverse Proxy (Docker)', 'Dynamic reverse proxy config.', codeBlock([
      'services:',
      '  traefik:',
      '    image: traefik:v3.0',
      '    command:',
      '      - "--providers.docker=true"',
      '      - "--entrypoints.web.address=:80"',
      '      - "--entrypoints.websecure.address=:443"',
      '    ports:',
      '      - "80:80"',
      '      - "443:443"',
      '    volumes:',
      '      - "/var/run/docker.sock:/var/run/docker.sock"',
      '',
      '  whoami:',
      '    image: traefik/whoami',
      '    labels:',
      '      - "traefik.http.routers.whoami.rule=Host(`app.example.com`)"',
      '      - "traefik.http.routers.whoami.entrypoints=web"'
    ]), 'Traefik auto-discovers services via Docker labels for dynamic reverse proxying.'),
    e('Caddy Reverse Proxy with Auto HTTPS', 'Simplest reverse proxy.', codeBlock([
      'api.example.com {',
      '  reverse_proxy localhost:3000',
      '',
      "  # Auto HTTPS via Let's Encrypt",
      '  # Caddy handles TLS automatically',
      '',
      '  # Additional options:',
      '  # reverse_proxy /api/* localhost:3000',
      '  # reverse_proxy /static/* localhost:4000',
      '  # header /api Access-Control-Allow-Origin *',
      '}',
      '',
      '# Caddyfile is the simplest reverse proxy config',
      '# Caddy automatically obtains and renews TLS certs'
    ]), "Caddy provides the simplest reverse proxy configuration with automatic HTTPS."),
    e('HAProxy Reverse Proxy Config', 'High-performance reverse proxy.', codeBlock([
      'global',
      '  maxconn 4096',
      '',
      'defaults',
      '  mode http',
      '  timeout connect 5s',
      '  timeout client 30s',
      '  timeout server 30s',
      '',
      'frontend web_frontend',
      '  bind *:80',
      '  bind *:443 ssl crt /etc/ssl/certs/example.pem',
      '  default_backend app_servers',
      '',
      'backend app_servers',
      '  balance roundrobin',
      '  server app1 10.0.0.1:3000 check',
      '  server app2 10.0.0.2:3000 check',
      '  server app3 10.0.0.3:3000 check'
    ]), 'HAProxy reverse proxy with SSL termination and multiple backend servers.'),
    e('Reverse Proxy Caching (Nginx)', 'Cache configuration.', codeBlock([
      'proxy_cache_path /var/cache/nginx levels=1:2',
      '  keys_zone=my_cache:10m max_size=1g',
      '  inactive=60m use_temp_path=off;',
      '',
      'server {',
      '  location /api/ {',
      '    proxy_cache my_cache;',
      '    proxy_cache_key "$scheme$request_method$host$request_uri";',
      '    proxy_cache_valid 200 5m;',
      '    proxy_cache_valid 404 1m;',
      '    proxy_cache_use_stale error timeout updating;',
      '    add_header X-Cache-Status $upstream_cache_status;',
      '',
      '    proxy_pass http://backend;',
      '  }',
      '}'
    ]), 'Nginx reverse proxy caching with cache status header and stale-while-revalidate.')
  ],
  [
    m('What does a reverse proxy hide?', ['Client identity', 'Server topology', 'User passwords', 'IP addresses of clients'], 1, 'A reverse proxy hides backend server topology from clients.'),
    m('What is SSL termination?', ['Starting SSL handshake', 'Offloading TLS decryption to the proxy', 'Ending SSL connections', 'Certificate generation'], 1, 'SSL termination means the proxy handles TLS decryption, offloading it from backend servers.'),
    m('Which is a reverse proxy?', ['Squid', 'Nginx', 'Shadowsocks', 'OpenVPN'], 1, 'Nginx is commonly used as a reverse proxy. Squid is a forward proxy.'),
    m('What header tells the backend the original client IP?', ['X-Forwarded-For', 'X-Real-IP', 'Both A and B', 'Host'], 2, 'Both X-Forwarded-For and X-Real-IP convey the original client IP.'),
    m('What is proxy buffering?', ['Storing files on disk', 'Reading entire response before sending to client', 'Encrypting data', 'Compressing responses'], 1, 'Proxy buffering reads the full response from the backend before forwarding to the client.'),
    m("Which reverse proxy supports automatic HTTPS?", ['Nginx', 'HAProxy', 'Caddy', 'Apache'], 2, "Caddy automatically obtains and renews TLS certificates via Let's Encrypt.")
  ]
);

/* =================== 2: Forward Proxy =================== */
addTopic("tm-forward-proxy", "Forward Proxy", "intermediate", 15,
  ["A forward proxy sits between client devices and the internet, forwarding client requests to destination servers.",
   "Clients configure their browser/application to use the forward proxy. The destination server sees the proxy's IP, not the client's.",
   "Common uses: bypassing geo-restrictions, content filtering (schools/offices), anonymity, caching frequently accessed content.",
   "Forward proxies can be transparent (no client config) or explicit (client must configure proxy settings)."
  ],
  'A forward proxy is like a personal assistant who makes phone calls for you. When you want to call a business, your assistant dials and says "I\'m calling on behalf of [your name]" — the business knows the assistant\'s number, not yours. The assistant can also screen calls (filter content) and take notes (cache).',
  [
    d("Forward vs Reverse Proxy", "Forward proxy: acts on behalf of the client, hides client identity from the destination server. Reverse proxy: acts on behalf of the server, hides server topology from the client. Forward proxy is client-configured; reverse proxy is server-configured."),
    d("Transparent vs Explicit Proxy", "Transparent proxy: intercepts traffic without client configuration (often at network gateway). Client is unaware. Used for content filtering in organizations. Explicit proxy: client must configure proxy IP and port in browser or OS settings. Used for anonymity and bypassing restrictions."),
    d("Use Cases", "Bypass geo-restrictions: access content blocked in certain countries. Content filtering: block malicious or inappropriate websites (schools, corporate networks). Anonymity: hide client IP (combined with VPN). Bandwidth savings: cache frequently accessed content. Access control: restrict internet access to authorized users."),
    d("Security Considerations", "Forward proxies see all traffic (decrypted if using MITM TLS). Must be secured to prevent abuse (open proxy = anyone can use it). Authentication required for corporate proxies. Logging and monitoring of all traffic. Certificate authority installation needed for TLS interception.")
  ],
  "Forward proxies act on behalf of clients. They provide anonymity, content filtering, and caching. Unlike reverse proxies (server-side), forward proxies are client-side tools. Configure forward proxies at the network gateway for transparent filtering or in browser settings for explicit use.",
  [
    q("What is a forward proxy?", "A server that sits between client devices and the internet, forwarding client requests on their behalf."),
    q("What is the difference between forward and reverse proxy?", "Forward proxy represents the client (hides client). Reverse proxy represents the server (hides server)."),
    q("What is a transparent proxy?", "A proxy that intercepts traffic without client configuration — often used at network gateways."),
    q("What is an explicit proxy?", "A proxy that requires client configuration (browser/OS settings)."),
    q("What is an open proxy?", "A forward proxy accessible to anyone without authentication — a security risk."),
    q("How does a forward proxy provide anonymity?", "The destination server sees the proxy's IP address, not the client's original IP."),
    q("What is proxy chaining?", "Using multiple proxies in sequence for increased anonymity. Each proxy only knows the previous and next hop."),
    q("What is SOCKS proxy?", "A protocol that proxies any TCP/UDP traffic at a lower level than HTTP proxies. Used for torrents, SSH tunneling."),
    q("How do organizations filter content with proxies?", "Configure transparent proxy at network gateway. Proxy checks URLs against blocklists and blocks malicious sites."),
    q("What is MITM TLS proxy?", "Forward proxy that decrypts TLS traffic by acting as a certificate authority — requires client trust.")
  ],
  R(10,35,100,25,"#0070f3","","Client","Browser") +
  A(110,48,140,48) +
  R(150,35,160,25,"#28a745","","Forward Proxy","Squid / SOCKS / VPN") +
  A(310,48,340,48) +
  R(350,35,130,25,"#dc3545","","Internet","Destination Servers") +
  R(10,70,130,25,"#ffc107","","Anonymity","Hide client IP") +
  R(10,105,130,25,"#e83e8c","","Filtering","Block malicious sites") +
  R(10,140,130,25,"#6610f2","","Caching","Faster repeat access") +
  T(240,180,"Forward Proxy: Client-side proxy that forwards requests to the internet — anonymity, filtering, caching.",9,"#666","middle"),
  [
    e("Squid Forward Proxy Config", "Traditional forward proxy.", codeBlock([
      "# /etc/squid/squid.conf",
      "http_port 3128",
      "",
      "# Allow access from local network",
      "acl localnet src 10.0.0.0/8",
      "acl localnet src 192.168.0.0/16",
      "http_access allow localnet",
      "http_access deny all",
      "",
      "# Caching settings",
      "cache_dir ufs /var/spool/squid 100 16 256",
      "cache_mem 256 MB",
      "maximum_object_size 4 MB",
      "",
      "# Block specific sites",
      "acl blocked_sites dstdomain facebook.com twitter.com",
      "http_access deny blocked_sites"
    ]), "Squid forward proxy configuration for local network with caching and site blocking."),
    e("PAC File for Proxy Configuration", "Automatic proxy configuration.", codeBlock([
      "// proxy.pac — Proxy Auto-Config file",
      "function FindProxyForURL(url, host) {",
      "  // Direct for local network",
      "  if (isPlainHostName(host) ||",
      '      dnsDomainIs(host, ".local")) {',
      '    return "DIRECT";',
      "  }",
      "",
      "  // Use proxy for external sites",
      '  if (shExpMatch(host, "*.example.com")) {',
      '    return "PROXY proxy.example.com:8080";',
      "  }",
      "",
      "  // Bypass proxy for streaming",
      '  if (shExpMatch(url, "*netflix*")) {',
      '    return "DIRECT";',
      "  }",
      "",
      "  // Default: use proxy",
      '  return "PROXY 10.0.0.1:3128";',
      "}"
    ]), "PAC file for automatic forward proxy configuration based on URL patterns."),
    e("SOCKS5 Proxy via SSH", "Simple SOCKS5 proxy tunnel.", codeBlock([
      "# Create SOCKS5 proxy tunnel via SSH",
      "ssh -D 1080 -C -N user@remote-server.com",
      "",
      "# -D 1080: SOCKS5 dynamic port forwarding",
      "# -C: compression",
      "# -N: no remote commands (tunnel only)",
      "",
      "# Configure browser:",
      "# Settings > Network > Proxy > SOCKS5",
      "# Host: localhost, Port: 1080",
      "",
      "# For all traffic (HTTP + DNS via SOCKS5):",
      "# In Firefox: network.proxy.socks_remote_dns = true"
    ]), "SSH SOCKS5 tunnel provides a quick encrypted forward proxy for browsing."),
    e("Forward Proxy with Auth (Squid)", "Authenticated proxy access.", codeBlock([
      "# Squid with basic authentication",
      "auth_param basic program /usr/lib/squid/basic_ncsa_auth",
      "auth_param basic children 5",
      "auth_param basic realm Squid Proxy",
      "auth_param basic credentialsttl 2 hours",
      "",
      "acl authenticated proxy_auth REQUIRED",
      "http_access allow authenticated",
      "http_access deny all",
      "",
      "# Create user credentials",
      "# htpasswd -c /etc/squid/passwords alice",
      "",
      "# Rate limit per user",
      "delay_pools 1",
      "delay_class 1 individual",
      "delay_access 1 allow authenticated",
      "delay_parameters 1 8000/8000"
    ]), "Squid forward proxy with basic authentication and per-user rate limiting."),
    e("Transparent Proxy with iptables", "Intercept traffic without client config.", codeBlock([
      "# Redirect HTTP traffic to Squid transparent proxy",
      "iptables -t nat -A PREROUTING -i eth0 -p tcp",
      "  --dport 80 -j REDIRECT --to-port 3128",
      "",
      "# Redirect HTTPS (needs SSL bump in Squid)",
      "iptables -t nat -A PREROUTING -i eth0 -p tcp",
      "  --dport 443 -j REDIRECT --to-port 3129",
      "",
      "# Enable IP forwarding",
      "sysctl -w net.ipv4.ip_forward=1",
      "",
      "# Squid config for transparent mode",
      "# http_port 3128 intercept",
      "# http_port 3129 intercept ssl-bump"
    ]), "Transparent proxy intercepts traffic at network level without browser configuration.")
  ],
  [
    m("What does a forward proxy hide?", ["Server identity", "Client identity", "Both", "Neither"], 1, "A forward proxy hides the client's identity from the destination server."),
    m("What is the difference between forward and reverse proxy?", ["Forward hides client, reverse hides server", "Forward hides server, reverse hides client", "They are the same", "Depends on configuration"], 0, "Forward proxy represents the client; reverse proxy represents the server."),
    m("What is a transparent proxy?", ["Proxy requiring config", "Proxy that intercepts without client config", "Proxy that encrypts traffic", "Proxy that caches only"], 1, "Transparent proxy intercepts traffic at the network level without client configuration."),
    m("What is Squid?", ["A reverse proxy", "A forward proxy/caching proxy", "A load balancer", "An API gateway"], 1, "Squid is a forward proxy and caching proxy commonly used in corporate networks."),
    m("What port does SOCKS5 use by convention?", ["3128", "1080", "8080", "443"], 1, "SOCKS5 traditionally uses port 1080."),
    m("What is an open proxy?", ["Free proxy", "Proxy without authentication", "Transparent proxy", "Reverse proxy"], 1, "An open proxy allows anyone to use it without authentication — a significant security risk.")
  ]
);

/* =================== 3: API Gateway =================== */
addTopic("tm-api-gateway", "API Gateway", "intermediate", 20,
  ["An API Gateway is a single entry point for all client requests that handles routing, composition, and cross-cutting concerns.",
   "It sits between clients and microservices, providing: request routing, authentication, rate limiting, logging, caching, and response transformation.",
   "Popular API Gateways: Kong, AWS API Gateway, NGINX Plus, Apigee, Zuul (Netflix), Traefik, Ambassador, KrakenD.",
   "API Gateways reduce client complexity — clients talk to one endpoint instead of many microservices directly."
  ],
  'An API Gateway is like a mall directory and concierge desk combined. Shoppers (clients) don\'t need to know each store\'s location. They ask the concierge ("I need shoes") and the concierge directs them to the right store, checks if they have a membership card (auth), and even bundles items from multiple stores (composition).',
  [
    d("API Gateway vs Reverse Proxy", "Both sit in front of servers and route requests. API Gateway adds API-specific features: authentication/authorization, rate limiting per API key, request/response transformation, API versioning, circuit breaking, service discovery integration, and API analytics. Reverse proxy is more general-purpose."),
    d("Request Routing and Composition", "Route requests to appropriate microservices based on path, headers, or query params. Aggregate responses from multiple services (backend for frontend pattern). Transform request/response formats (XML to JSON, protocol translation). Serve different API versions with different backend targets."),
    d("Cross-Cutting Concerns", "Authentication: validate JWT, API keys, OAuth tokens before requests reach services. Rate limiting: per client, per endpoint, per plan. Logging: structured request/response logging. Caching: cache responses to reduce backend load. Monitoring: metrics, tracing, alerting."),
    d("API Gateway Patterns", "Gateway Routing: simple proxy to services. Gateway Aggregation: combine multiple service responses. Gateway Offloading: handle auth, SSL, rate limiting at gateway. Backend for Frontend (BFF): separate gateway per client type (web, mobile, IoT) with tailored responses.")
  ],
  "An API Gateway is the central control point for your microservices API. It handles auth, rate limiting, routing, and aggregation — keeping services simple and clients happy. Choose based on your stack: Kong (open source, plugin-rich), AWS API Gateway (serverless), Traefik (cloud-native/Kubernetes).",
  [
    q("What is an API Gateway?", "A single entry point for APIs that handles routing, authentication, rate limiting, aggregation, and other cross-cutting concerns."),
    q("What is the difference between API Gateway and reverse proxy?", "API Gateway adds API-specific features (auth, rate limiting per key, transformation, versioning) on top of reverse proxy functionality."),
    q("What is request aggregation?", "The gateway combines responses from multiple microservices into a single response to reduce client requests."),
    q("What is Backend for Frontend (BFF)?", "Separate API Gateway per client type — each BFF provides an API tailored to a specific client's needs."),
    q("What features can an API Gateway offload?", "Authentication, SSL termination, rate limiting, caching, request validation, logging, metrics."),
    q("What is Kong?", "An open-source API Gateway built on NGINX with a plugin architecture for auth, rate limiting, logging, etc."),
    q("What is a service mesh vs API Gateway?", "Service mesh handles inter-service communication (East-West). API Gateway handles external-to-service communication (North-South)."),
    q("How does an API Gateway handle versioning?", "Route based on URL path (/v1/, /v2/) or header (Accept: application/vnd.api+json;version=2)."),
    q("What is a gateway timeout?", "When a backend service takes too long to respond, the gateway returns 504 Gateway Timeout."),
    q("How does an API Gateway scale?", "Horizontally — multiple gateway instances behind a load balancer. Stateless configuration (database-backed).")
  ],
  R(10,35,100,25,"#0070f3","","Clients","Web / Mobile / IoT") +
  A(110,48,140,48) +
  R(150,35,180,25,"#28a745","","API Gateway","Kong / AWS / Traefik") +
  A(330,48,360,48) + A(150,60,150,80) + A(150,90,150,110) + A(150,120,150,140) +
  R(370,35,110,25,"#dc3545","","Auth Service","JWT / OAuth") +
  R(370,70,110,25,"#ffc107","","Users Service","CRUD") +
  R(370,105,110,25,"#e83e8c","","Orders Service","Transactions") +
  R(370,140,110,25,"#6610f2","","Products Service","Catalog") +
  R(10,70,130,25,"#17a2b8","","Auth + Rate Limit","Cross-cutting") +
  R(10,105,130,25,"#0070f3","","Aggregation","Compose responses") +
  T(240,180,"API Gateway: Single entry point routing to microservices with auth, rate limiting, and aggregation.",9,"#666","middle"),
  [
    e("Kong API Gateway Config", "Declarative Kong configuration.", codeBlock([
      '_format_version: "3.0"',
      "services:",
      "  - name: user-service",
      "    url: http://users-api:3000",
      "    routes:",
      "      - name: user-routes",
      '        paths: ["/users"]',
      '        methods: ["GET", "POST"]',
      "",
      "  - name: order-service",
      "    url: http://orders-api:3001",
      "    routes:",
      "      - name: order-routes",
      '        paths: ["/orders"]',
      "        plugins:",
      "          - name: rate-limiting",
      "            config:",
      "              minute: 60",
      "              policy: local",
      "          - name: key-auth"
    ]), "Kong declarative configuration with services, routes, and plugin policies."),
    e("Express API Gateway (express-gateway)", "Node.js API Gateway.", codeBlock([
      "# gateway.config.yml",
      "http:",
      "  port: 8080",
      "apiEndpoints:",
      "  api:",
      "    host: localhost",
      '    paths: ["/api/*"]',
      "serviceEndpoints:",
      "  userService:",
      '    urls: ["http://localhost:3001"]',
      "  orderService:",
      '    urls: ["http://localhost:3002"]',
      "policies:",
      "  - proxy",
      "  - rate-limiter",
      "pipelines:",
      "  default:",
      "    apiEndpoints:",
      "      - api",
      "    policies:",
      "      - rate-limiter:",
      "          config:",
      "            rateLimitBy: ip",
      "            max: 100",
      "      - proxy:",
      "          - action:",
      "              serviceEndpoint: userService",
      "              changeOrigin: true"
    ]), "Express Gateway configuration with rate limiting and proxy policies."),
    e("AWS API Gateway Terraform", "Cloud API Gateway setup.", codeBlock([
      'resource "aws_api_gateway_rest_api" "api" {',
      '  name = "MyAPI"',
      "}",
      "",
      'resource "aws_api_gateway_resource" "users" {',
      '  rest_api_id = aws_api_gateway_rest_api.api.id',
      '  parent_id   = aws_api_gateway_rest_api.api.root_resource_id',
      '  path_part   = "users"',
      "}",
      "",
      'resource "aws_api_gateway_method" "users_get" {',
      '  rest_api_id   = aws_api_gateway_rest_api.api.id',
      '  resource_id   = aws_api_gateway_resource.users.id',
      '  http_method   = "GET"',
      '  authorization = "COGNITO_USER_POOLS"',
      '  authorizer_id = aws_api_gateway_authorizer.cognito.id',
      "}"
    ]), "AWS API Gateway with Cognito authentication and Lambda integration."),
    e("API Gateway Rate Limiting (Kong Plugin)", "Per-client rate limits.", codeBlock([
      "plugins:",
      "  - name: rate-limiting",
      "    service: user-service",
      "    config:",
      "      second: null",
      "      minute: 30",
      "      hour: 1000",
      "      policy: redis  # cluster-friendly",
      "      fault_tolerant: true",
      "      hide_client_headers: false",
      "      redis_host: redis-cluster",
      "      redis_port: 6379",
      "",
      "  - name: key-auth  # require API key",
      "    service: user-service",
      "    config:",
      '      key_names: ["X-API-Key"]',
      "      hide_credentials: true"
    ]), "Kong rate limiting with Redis backend for distributed rate limit tracking."),
    e("KrakenD API Gateway", "High-performance gateway config.", codeBlock([
      "// KrakenD with aggregation endpoint",
      'const krakendConfig = {',
      '  version: 3,',
      '  endpoints: [{',
      '    endpoint: "/user-details/{id}",',
      "    method: \"GET\",",
      '    backend: [',
      '      { url_pattern: "/users/{id}", host: ["http://user-svc:3000"] },',
      '      { url_pattern: "/orders?user_id={id}", host: ["http://order-svc:3001"], group: "orders" }',
      "    ],",
      '    output_encoding: "json"',
      "  }],",
      '  extra_config: {',
      '    "github_com/devopsfaith/krakend/ratelimit": { max: 50, strategy: "ip" }',
      "  }",
      "}"
    ]), "KrakenD aggregation endpoint combining user and order data from separate services.")
  ],
  [
    m("What is the primary role of an API Gateway?", ["Database management", "Single entry point for APIs", "Code compilation", "File storage"], 1, "API Gateway is a single entry point routing requests to appropriate microservices."),
    m("What does BFF stand for?", ["Backend For Frontend", "Best Friend Forever", "Buffer Forward Function", "Binary File Format"], 0, "Backend For Frontend — separate API Gateway per client type."),
    m("Which API Gateway is built on NGINX?", ["Traefik", "Kong", "Zuul", "KrakenD"], 1, "Kong is built on NGINX with a plugin architecture."),
    m("What pattern combines multiple service responses?", ["Gateway Routing", "Gateway Aggregation", "Gateway Offloading", "Edge Gateway"], 1, "Gateway Aggregation combines multiple service responses into one."),
    m("What is North-South traffic?", ["Service-to-service", "External-to-service", "Database traffic", "Cache traffic"], 1, "North-South traffic enters from outside the cluster (external client to service)."),
    m("What does an API Gateway NOT typically do?", ["Authentication", "Rate limiting", "Data storage", "Request transformation"], 2, "API Gateways handle routing and cross-cutting concerns, not persistent data storage.")
  ]
);

/* =================== 4: Load Balancing =================== */
addTopic("tm-load-balancing", "Load Balancing", "intermediate", 20,
  ["Load balancing distributes incoming network traffic across multiple backend servers to ensure no single server is overwhelmed.",
   "Improves availability (redundancy), scalability (add/remove servers), and performance (distribute load).",
   "Algorithms: Round Robin, Least Connections, IP Hash, Weighted Round Robin, Random, Least Response Time.",
   "Load balancers can be hardware (F5 BIG-IP), software (Nginx, HAProxy), or cloud (AWS ELB, GCP LB)."
  ],
  "Load balancing is like having multiple checkout lanes at a supermarket. Instead of one long line, the store manager directs customers to the shortest line (Least Connections) or sends each customer to the next available lane (Round Robin). If one checkout lane closes, customers are redirected to others.",
  [
    d("Load Balancing Algorithms", "Round Robin: requests distributed sequentially. Least Connections: sends to server with fewest active connections. IP Hash: hashes client IP to determine server (session persistence). Weighted: servers with higher capacity get more traffic. Least Response Time: sends to fastest-responding server. Random: simple but less balanced."),
    d("Layer 4 vs Layer 7 Load Balancing", "Layer 4 (Transport): routes based on IP and TCP/UDP ports. Faster, less resource intensive. Cannot inspect HTTP headers. Layer 7 (Application): routes based on HTTP headers, cookies, paths. Slower but more intelligent routing. Modern LBs often support both."),
    d("Health Checks", "Active: LB periodically pings backend servers (HTTP GET /health, TCP connect). Passive: LB monitors actual request success/failure rates. Servers failing health checks are removed from rotation. Health check configuration: interval, timeout, unhealthy threshold, healthy threshold."),
    d("Sticky Sessions (Session Persistence)", "Ensures a client's requests always go to the same backend server. Methods: cookie-based (LB sets cookie), IP Hash, URL-encoded session ID. Important for stateful applications. Not needed for stateless applications (store session in Redis). Inconsistent with load balancing goals — minimizes redundancy.")
  ],
  "Load balancing is essential for high availability and scalability. Choose Layer 4 for raw performance (TCP/UDP), Layer 7 for intelligent routing (HTTP). Always configure health checks. Use sticky sessions only when necessary (stateless apps don't need them). Round Robin is a good default algorithm.",
  [
    q("What is load balancing?", "Distributing incoming traffic across multiple backend servers to improve availability, scalability, and performance."),
    q("What is Round Robin?", "Requests are distributed sequentially across servers in order. Simple and fair distribution."),
    q("What is Least Connections?", "Sends new requests to the server with the fewest active connections. Best when request durations vary."),
    q("What is the difference between L4 and L7 load balancing?", "L4 routes based on IP/port (faster). L7 routes based on HTTP content (smarter)."),
    q("What are health checks?", "Periodic checks that verify backend servers are healthy. Unhealthy servers are removed from rotation."),
    q("What is a load balancer VIP?", "Virtual IP — the single IP address clients connect to, which the load balancer maps to backend servers."),
    q("What is a weighted load balancing?", "Servers are assigned weights. Higher-weight servers receive proportionally more traffic."),
    q("What is active-passive load balancing?", "One server handles traffic; the passive server takes over only if the active fails."),
    q("What is active-active load balancing?", "All servers handle traffic simultaneously. True load distribution."),
    q("What is DNS load balancing?", "Multiple A records for a domain — DNS returns different IPs to different clients. Simple but no health checks.")
  ],
  R(10,35,100,25,"#0070f3","","Client","Traffic") +
  A(110,48,140,48) +
  R(150,35,170,25,"#28a745","","Load Balancer","HAProxy / Nginx / ELB") +
  A(320,48,350,48) + A(150,60,150,80) + A(150,90,150,110) + A(150,120,150,140) +
  R(360,35,120,25,"#dc3545","","Server 1","Healthy") +
  R(360,75,120,25,"#ffc107","","Server 2","Healthy") +
  R(360,115,120,25,"#e83e8c","","Server 3","Unhealthy removed") +
  R(10,70,130,25,"#6610f2","","Algorithm","Round Robin / Least Conn") +
  R(10,105,130,25,"#17a2b8","","Health Checks","Auto-remove failures") +
  T(240,175,"Load Balancing: Distribute traffic across servers. Algorithms, health checks, L4 vs L7.",9,"#666","middle"),
  [
    e("HAProxy Load Balancer Config", "L4 + L7 load balancing.", codeBlock([
      "global",
      "  maxconn 4096",
      "",
      "defaults",
      "  mode http",
      "  timeout connect 5s",
      "  timeout client 30s",
      "  timeout server 30s",
      "",
      "frontend web",
      "  bind *:80",
      "  default_backend apps",
      "",
      "backend apps",
      "  balance roundrobin",
      "  option httpchk GET /health",
      "  server app1 10.0.0.1:3000 check inter 5s",
      "  server app2 10.0.0.2:3000 check inter 5s",
      "  server app3 10.0.0.3:3000 check inter 5s"
    ]), "HAProxy load balancer with Round Robin, health checks."),
    e("Nginx Load Balancing", "Upstream configuration.", codeBlock([
      "http {",
      "  upstream backend {",
      "    least_conn;  # algorithm: least connections",
      "    server 10.0.0.1:3000 weight=3;",
      "    server 10.0.0.2:3000;",
      "    server 10.0.0.3:3000 backup;  # passive backup",
      "  }",
      "",
      "  server {",
      "    listen 80;",
      "    location / {",
      "      proxy_pass http://backend;",
      "      proxy_next_upstream error timeout;",
      "      proxy_set_header Host $host;",
      "    }",
      "  }",
      "}"
    ]), "Nginx upstream load balancing with Least Connections, weights, and backup server."),
    e("AWS ALB with Target Group", "Cloud load balancer.", codeBlock([
      'resource "aws_lb" "alb" {',
      '  name            = "my-alb"',
      '  internal        = false',
      '  load_balancer_type = "application"',
      '  security_groups = [aws_security_group.lb.id]',
      '  subnets         = aws_subnet.public[*].id',
      "}",
      "",
      'resource "aws_lb_target_group" "tg" {',
      '  name     = "app-targets"',
      '  port     = 80',
      '  protocol = "HTTP"',
      '  vpc_id   = aws_vpc.main.id',
      "",
      '  health_check {',
      '    path                = "/health"',
      '    interval            = 30',
      '    timeout             = 5',
      '    healthy_threshold   = 2',
      '    unhealthy_threshold = 3',
      "  }",
      "}"
    ]), "AWS Application Load Balancer with target group and health check configuration."),
    e("Node.js Cluster (Built-in LB)", "Multi-process Node.js.", codeBlock([
      "const cluster = require('cluster');",
      "const os = require('os');",
      "",
      "if (cluster.isMaster) {",
      "  const numCPUs = os.cpus().length;",
      "  console.log(`Master ${process.pid} spawning ${numCPUs} workers`);",
      "",
      "  for (let i = 0; i < numCPUs; i++) {",
      "    cluster.fork();",
      "  }",
      "",
      "  cluster.on('exit', (worker) => {",
      "    console.log(`Worker ${worker.process.pid} died. Forking...`);",
      "    cluster.fork();  // auto-restart",
      "  });",
      "} else {",
      "  // Worker: runs application",
      "  const app = require('./app');",
      "  app.listen(3000);",
      "}"
    ]), "Node.js cluster module distributes requests across worker processes (Round Robin on Linux)."),
    e("Consistent Hashing LB", "Minimize cache misses on resharding.", codeBlock([
      "const crypto = require('crypto');",
      "",
      "class ConsistentHash {",
      "  constructor(nodes, replicas = 100) {",
      "    this.ring = {};",
      "    this.keys = [];",
      "    for (const node of nodes) {",
      "      for (let i = 0; i < replicas; i++) {",
      "        const hash = this._hash(`${node}:${i}`);",
      "        this.ring[hash] = node;",
      "        this.keys.push(hash);",
      "      }",
      "    }",
      "    this.keys.sort((a, b) => a - b);",
      "  }",
      "",
      "  _hash(key) {",
      "    return parseInt(crypto.createHash('md5')",
      "      .update(key).digest('hex').slice(0, 8), 16);",
      "  }",
      "",
      "  getNode(key) {",
      "    const hash = this._hash(key);",
      "    const idx = this.keys.findIndex(k => k >= hash);",
      "    return this.ring[this.keys[idx % this.keys.length]];",
      "  }",
      "}"
    ]), "Consistent hashing minimizes redistribution when servers are added or removed.")
  ],
  [
    m("What does a load balancer distribute?", ["Code", "Traffic across servers", "Data storage", "User sessions"], 1, "Load balancers distribute incoming network traffic across backend servers."),
    m("What algorithm sends to the server with fewest connections?", ["Round Robin", "Least Connections", "IP Hash", "Random"], 1, "Least Connections sends new requests to the server with the fewest active connections."),
    m("What layer does HTTP header-based routing use?", ["Layer 2", "Layer 4", "Layer 7", "Layer 3"], 2, "Layer 7 (Application) load balancing routes based on HTTP headers, cookies, URLs."),
    m("What removes unhealthy servers from rotation?", ["Rate limiting", "Health checks", "SSL termination", "Weight adjustment"], 1, "Health checks periodically verify server health and remove unhealthy servers."),
    m("What is a backup server in load balancing?", ["Always handles traffic", "Handles traffic only when others fail", "Has highest weight", "Is never used"], 1, "A backup server is passive — it handles traffic only when primary servers are unavailable."),
    m("What technique minimizes cache misses during server changes?", ["Round Robin", "Consistent hashing", "Sticky sessions", "Weighted distribution"], 1, "Consistent hashing minimizes the number of keys that need remapping when servers are added/removed.")
  ]
);

/* =================== 5: Traffic Routing =================== */
addTopic("tm-traffic-routing", "Traffic Routing", "intermediate", 15,
  ["Traffic routing directs incoming requests to the appropriate backend service based on rules and conditions.",
   "Routes can be based on: URL path, HTTP method, headers, query parameters, client IP, user agent, or custom conditions.",
   "Enables: blue-green deployments, canary releases, A/B testing, multi-tenant routing, and geographical routing.",
   "Implementations: API Gateways (Kong, AWS), service mesh (Istio, Linkerd), ingress controllers (Nginx Ingress, Traefik)."
  ],
  "Traffic routing is like a city's traffic management system. Instead of every car going to the same road, traffic lights and signs (routing rules) direct delivery trucks to the industrial area, commuters to residential zones, and emergency vehicles to the nearest hospital — all based on the vehicle's characteristics (headers, URL, origin).",
  [
    d("Routing Rules and Conditions", "Path-based: /api/users ? user service, /api/orders ? order service. Method-based: GET ? read replica, POST ? write master. Header-based: X-Region header ? specific regional deployment. Query-based: ?version=v2 ? v2 service. Client IP: whitelist/blacklist. Weight-based: 90% v1, 10% v2."),
    d("Route Matching Priority", "Most specific path wins. Pattern: /users/:id matches before /users/*. Regex routes evaluate in order — first match wins. Exact match > prefix match > regex match. Headers and query params evaluated after path match. Default/fallback route catches unmatched requests."),
    d("Dynamic vs Static Routing", "Static: routing rules defined at startup, require restart to change. Simple, predictable. Dynamic: routing rules can be changed at runtime without restart (e.g., via API or database). Enables progressive delivery, feature flags, and A/B testing without redeployment."),
    d("Routing in Microservices", "API Gateway handles external ? internal routing (North-South). Service mesh handles internal ? internal routing (East-West). Service discovery integrates with routing for dynamic backend selection. Circuit breakers and retries are part of routing resilience.")
  ],
  "Traffic routing is the brain of your architecture — directing each request to the right service. Combine path, header, and weight-based rules for flexible deployments. Use dynamic routing for progressive delivery (canary, blue-green). Service mesh enables sophisticated internal routing for microservices.",
  [
    q("What is traffic routing?", "Directing incoming requests to appropriate backend services based on rules and conditions."),
    q("What types of routing rules exist?", "Path-based, header-based, query-based, method-based, weight-based, IP-based, and custom conditions."),
    q("What is weight-based routing?", "Distributing traffic across services by percentage weights — used for canary deployments and A/B testing."),
    q("What is the difference between static and dynamic routing?", "Static: rules fixed at startup. Dynamic: rules can change at runtime without restart."),
    q("What is North-South vs East-West routing?", "North-South: external to internal (API Gateway). East-West: internal service to service (Service Mesh)."),
    q("What is the specific-over-generic rule?", "More specific routes take priority over generic ones. /users/:id matches before /users/*."),
    q("What is header-based routing used for?", "A/B testing (X-Experiment header), multi-tenant (X-Tenant-ID), API versioning (Accept header)."),
    q("How does service discovery integrate with routing?", "Router queries service registry to find healthy backend instances. Enables dynamic scaling."),
    q("What is a fallback route?", "A default route that catches requests not matching any specific rule — returns 404 or redirects."),
    q("What is the difference between routing and load balancing?", "Routing determines which service to send to. Load balancing distributes within that service's instances.")
  ],
  R(10,35,100,25,"#0070f3","","Client","Incoming request") +
  A(110,48,140,48) +
  R(150,35,170,25,"#28a745","","Traffic Router","Gateway / Service Mesh / Ingress") +
  A(320,48,350,48) + A(150,60,150,80) + A(150,82,150,105) + A(150,108,150,130) +
  R(360,35,120,25,"#dc3545","","Path /api/users","Users Service") +
  R(360,75,120,25,"#ffc107","","Header X-v2","Canary v2") +
  R(360,115,120,25,"#e83e8c","","Weight 10%","A/B Test") +
  R(10,70,130,25,"#6610f2","","Rules Engine","Path + Header + Weight") +
  R(10,105,130,25,"#17a2b8","","Service Registry","Discover backends") +
  T(240,175,"Traffic Routing: Direct requests to services based on path, headers, weights, and conditions.",9,"#666","middle"),
  [
    e("Nginx Ingress Routing Rules", "Kubernetes ingress routing.", codeBlock([
      "apiVersion: networking.k8s.io/v1",
      "kind: Ingress",
      "metadata:",
      "  name: app-ingress",
      "spec:",
      "  rules:",
      "  - host: api.example.com",
      "    http:",
      "      paths:",
      "      - path: /users",
      "        pathType: Prefix",
      "        backend:",
      "          service:",
      "            name: user-service",
      "            port:",
      "              number: 80",
      "      - path: /orders",
      "        pathType: Prefix",
      "        backend:",
      "          service:",
      "            name: order-service",
      "            port:",
      "              number: 80"
    ]), "Kubernetes Ingress routes path-based traffic to different backend services."),
    e("Header-Based Routing (Traefik)", "Route by HTTP header.", codeBlock([
      "# Traefik dynamic routing config",
      "http:",
      "  routers:",
      "    stable:",
      '      rule: "Host(`app.example.com`) && Headers(`X-Release`, `stable`)"',
      "      service: app-v1",
      "    canary:",
      '      rule: "Host(`app.example.com`) && Headers(`X-Release`, `canary`)"',
      "      service: app-v2",
      "    default:",
      '      rule: "Host(`app.example.com`)"',
      "      service: app-v1",
      "",
      "  services:",
      "    app-v1:",
      "      loadBalancer:",
      '        servers:',
      '          - url: "http://10.0.0.1:3000"',
      "    app-v2:",
      "      loadBalancer:",
      '        servers:',
      '          - url: "http://10.0.0.2:3000"'
    ]), "Header-based routing with Traefik — direct traffic based on X-Release header value."),
    e("Weight-Based Routing (Istio)", "Canary traffic splitting.", codeBlock([
      "apiVersion: networking.istio.io/v1beta1",
      "kind: VirtualService",
      "metadata:",
      "  name: app-routing",
      "spec:",
      "  hosts:",
      "  - app-service",
      "  http:",
      "  - route:",
      "    - destination:",
      "        host: app-service",
      "        subset: v1",
      "      weight: 90",
      "    - destination:",
      "        host: app-service",
      "        subset: v2",
      "      weight: 10",
      "---",
      "apiVersion: networking.istio.io/v1beta1",
      "kind: DestinationRule",
      "metadata:",
      "  name: app-subsets",
      "spec:",
      "  host: app-service",
      "  subsets:",
      "  - name: v1",
      "    labels:",
      "      version: v1",
      "  - name: v2",
      "    labels:",
      "      version: v2"
    ]), "Istio VirtualService splits traffic 90/10 between two versions of a service."),
    e("Query-Based Routing (Express)", "Route by query parameter.", codeBlock([
      "app.use((req, res, next) => {",
      "  const version = req.query['api-version'];",
      "",
      "  if (version === 'v2') {",
      "    // Rewrite path to v2 handler",
      "    req.url = '/v2' + req.path;",
      "  }",
      "  next();",
      "});",
      "",
      "app.get('/v1/users', v1Handler);",
      "app.get('/v2/users', v2Handler);"
    ]), "Query-parameter-based routing to support API versioning."),
    e("Dynamic Routing with Redis", "Change routes without restart.", codeBlock([
      "// Route store in Redis",
      "async function getRoute(path) {",
      '  const route = await redis.hget("routes", path);',
      "  return route ? JSON.parse(route) : null;",
      "}",
      "",
      "// Dynamic route middleware",
      "app.use(async (req, res, next) => {",
      "  const route = await getRoute(req.path);",
      "  if (route) {",
      "    req.targetService = route.service;",
      "    req.targetPort = route.port;",
      "    // Proxy to dynamic target",
      "    return proxy.web(req, res, {",
      "      target: `http://${route.service}:${route.port}`",
      "    });",
      "  }",
      "  next();  // fall through to static routes",
      "});",
      "",
      "// Update route at runtime:",
      'redis.hset("routes", "/api/users", JSON.stringify({',
      '  service: "user-svc-v2",',
      "  port: 3000",
      "}));"
    ]), "Redis-backed dynamic routing — update routes at runtime without application restart.")
  ],
  [
    m("What is path-based routing?", ["Routing by HTTP method", "Routing by URL path", "Routing by client IP", "Routing by response time"], 1, "Path-based routing directs requests based on the URL path component."),
    m("What is weight-based routing used for?", ["Load balancing", "Canary deployments", "SSL termination", "Caching"], 1, "Weight-based routing distributes traffic by percentage for canary releases and A/B testing."),
    m("What is North-South traffic?", ["Service to service", "External to internal", "Cluster to database", "Cache to app"], 1, "North-South refers to external client traffic entering the system."),
    m("What enables dynamic routing?", ["Config file", "Runtime rule store", "Code recompile", "Docker restart"], 1, "Dynamic routing uses a runtime data store (Redis, database, API) for live rule updates."),
    m("What is the most specific route matching rule?", ["Longest path wins", "Regex match first", "First defined wins", "Last defined wins"], 0, "Most specific (longest) path match takes priority."),
    m("Which tool is used for service mesh routing?", ["Nginx", "Istio", "HAProxy", "AWS ELB"], 1, "Istio provides sophisticated East-West traffic routing for service mesh architectures.")
  ]
);


/* =================== 6: Path Routing =================== */
addTopic("tm-path-routing", "Path Routing", "beginner", 10,
  ["Path routing directs requests to different handlers or services based on the URL path component.",
   "Example: GET /users ? user service, GET /orders ? order service, GET /products ? product service.",
   "It is the most common and intuitive routing strategy — the URL path tells you what resource is being requested.",
   "Path routing is supported by every web framework, reverse proxy, API gateway, and ingress controller."
  ],
  "Path routing is like a museum map. The map says Gallery A: Paintings, Gallery B: Sculptures, Cafe. Visitors follow the signs based on what they want to see. Similarly, /users takes you to the users section, /orders to the orders section.",
  [
    d("Static vs Dynamic Paths", "Static: exact path match (/about, /contact). Dynamic: path parameters (/users/:id, /posts/:postId/comments/:commentId). Static paths are simpler and faster. Dynamic paths extract variables from the URL. Most frameworks support both with path parameters using :param or {param} syntax."),
    d("Path Parameters vs Query Parameters", "Path parameters identify a specific resource: /users/42 (user with ID 42). Query parameters filter or modify: /users?status=active&page=2. Path params are required for resource identity. Query params are optional and used for filtering, pagination, sorting."),
    d("Path Routing in Microservices", "API Gateway maps paths to services: /api/users/* ? user-service, /api/orders/* ? order-service. Subdomain routing (users.api.example.com) is an alternative. Path prefix stripping: gateway strips /api/users before forwarding to user-service."),
    d("Wildcard and Catch-All Routes", "Wildcard: /files/* matches /files/any/path. Catch-all: /* matches everything (usually for SPA fallback or 404 handling). Pattern matching: /users/*/settings matches any user's settings page.")
  ],
  "Path routing is the foundation of RESTful API design. Use path parameters for resource identity, query parameters for filtering. In microservices, the API Gateway maps URL paths to backend services. Design paths hierarchically and consistently.",
  [
    q("What is path routing?", "Directing requests based on the URL path component — the most common routing strategy."),
    q("What is a dynamic path parameter?", "A variable part of the URL path that captures a value: /users/:id captures the user ID."),
    q("What is the difference between path and query parameters?", "Path params identify resources (/users/42). Query params filter/modify (/users?status=active)."),
    q("What is a wildcard route?", "A route pattern that matches any path segment: /files/* matches /files/anything."),
    q("How do API Gateways handle path routing?", "Gateway maps paths to services: /api/users ? user-service, optionally stripping the prefix."),
    q("What is a catch-all route?", "A route matching all paths — used as a 404 handler or SPA fallback."),
    q("How does Express.js define path parameters?", "Using colon prefix: app.get('/users/:id', handler)."),
    q("What is the difference between /users and /users/:id?", "/users is a collection resource. /users/:id is a specific resource instance."),
    q("What is path prefix stripping?", "Removing the path prefix before forwarding — /api/users becomes /users when sent to backend."),
    q("Why is consistent path design important?", "Consistent paths (plural nouns, lowercase, hyphens) make APIs intuitive and predictable.")
  ],
  R(10,35,100,25,"#0070f3","","GET /users","List users") +
  A(110,48,140,48) +
  R(150,35,170,25,"#28a745","","Path Router","Match /users ? User Handler") +
  A(320,48,350,48) +
  R(360,35,120,25,"#dc3545","","User Service","Database") +
  R(10,70,160,25,"#ffc107","","/users/:id","Dynamic parameter") +
  R(10,105,160,25,"#e83e8c","","/users/*/settings","Wildcard") +
  R(10,140,160,25,"#6610f2","","/users?status=active","Query param") +
  T(240,185,"Path Routing: Route requests by URL path — static paths, dynamic parameters, wildcards, query params.",9,"#666","middle"),
  [
    e("Express Path Routing", "Path parameters.", codeBlock([
      "app.get('/about', (req, res) => { res.send('About page'); });",
      "app.get('/users/:userId', (req, res) => {",
      "  const id = req.params.userId;",
      "  res.json({ userId: id });",
      "});",
      "app.get('/posts/:postId/comments/:commentId', (req, res) => {",
      "  const { postId, commentId } = req.params;",
      "  res.json({ postId, commentId });",
      "});",
      "app.get('/files/*', (req, res) => {",
      "  const filePath = req.params[0];",
      "  res.sendFile(filePath);",
      "});"
    ]), "Express.js path routing with dynamic parameters, multiple params, and wildcards."),
    e("Nginx Path-Based Routing", "Route by path.", codeBlock([
      "server {",
      "  listen 80;",
      "  location /api/users { proxy_pass http://user-service:3000; }",
      "  location /api/orders { proxy_pass http://order-service:3001; }",
      "  location /api/products { proxy_pass http://product-service:3002; }",
      "  location /static { root /var/www/static; expires 30d; }",
      "}"
    ]), "Nginx path-based routing to different upstream services."),
    e("React Router Path Routing", "Client-side routing.", codeBlock([
      "import { BrowserRouter, Routes, Route } from 'react-router-dom';",
      "function App() { return (",
      "  <BrowserRouter>",
      "    <Routes>",
      '      <Route path="/" element={<Home />} />',
      '      <Route path="/users" element={<UserList />} />',
      '      <Route path="/users/:id" element={<UserDetail />} />',
      '      <Route path="*" element={<NotFound />} />',
      "    </Routes>",
      "  </BrowserRouter>",
      "); }"
    ]), "React Router client-side routing with path parameters and catch-all."),
    e("Kubernetes Ingress Path Routing", "Path-based ingress.", codeBlock([
      "apiVersion: networking.k8s.io/v1",
      "kind: Ingress",
      "metadata:",
      "  name: api-ingress",
      "  annotations:",
      "    nginx.ingress.kubernetes.io/rewrite-target: /$2",
      "spec:",
      "  rules:",
      "  - http:",
      "      paths:",
      "      - path: /api/users(/|$)(.*)",
      "        pathType: ImplementationSpecific",
      "        backend:",
      "          service:",
      "            name: user-service",
      "            port:",
      "              number: 80"
    ]), "Kubernetes Ingress path-based routing with regex path capture."),
    e("FastAPI Path Routing", "Python path routing.", codeBlock([
      "from fastapi import FastAPI",
      "app = FastAPI()",
      '@app.get("/")',
      "async def root(): return {'message': 'Hello'}",
      '@app.get("/users/{user_id}")',
      "async def get_user(user_id: int): return {'user_id': user_id}",
      '@app.get("/search")',
      "async def search(q: str = None, limit: int = 10):",
      "  return {'query': q, 'limit': limit}"
    ]), "FastAPI path routing with type-annotated path parameters.")
  ],
  [
    m("What identifies a specific resource in a URL?", ["Query parameters", "Path parameters", "Headers", "Body"], 1, "Path parameters identify specific resources (/users/42)."),
    m("What syntax does Express use for path parameters?", [":param", "{param}", "<param>", "$param"], 0, "Express uses colon prefix: /users/:id."),
    m("What is a catch-all route used for?", ["Performance", "404 handling", "Authentication", "Caching"], 1, "Catch-all routes handle undefined paths — often used as 404 handlers."),
    m("What is path prefix stripping?", ["Removing query params", "Removing path prefix before forwarding", "Adding path prefix", "Encrypting the path"], 1, "Path prefix stripping removes the API prefix (/api) before proxying."),
    m("Where should filtering parameters go?", ["Path", "Query string", "Headers", "Body"], 1, "Query parameters are used for filtering, pagination, and sorting."),
    m("What does /users/:id/comments/:commentId contain?", ["One param", "Two params", "Three params", "No params"], 1, "Two path parameters: id and commentId.")
  ]
);

/* =================== 7: Host Routing =================== */
addTopic("tm-host-routing", "Host Routing", "beginner", 10,
  ["Host routing directs requests based on the Host header (domain or subdomain).",
   "Example: api.example.com ? API service, app.example.com ? Web App, admin.example.com ? Admin Panel.",
   "Each virtual host can have its own routing rules, SSL certificates, and backend configuration.",
   "Enables multi-tenant architecture where each tenant has a dedicated subdomain."
  ],
  "Host routing is like an office building directory. The building has separate entrances for different companies. Visitors enter through the door labeled with their company name. Similarly, api.example.com goes to the API backend, admin.example.com goes to the admin backend.",
  [
    d("Virtual Hosting", "Single server handles multiple domains. The Host HTTP header tells the server which domain the client requested. Server matches the Host header against configured virtual hosts. Each virtual host has its own document root, SSL cert, and configuration."),
    d("Wildcard Host Routing", "*.example.com matches any subdomain. blog.example.com, shop.example.com, api.example.com all match. Used for multi-tenant SaaS platforms. Tenant-specific subdomains: tenant1.app.example.com, tenant2.app.example.com."),
    d("Host vs Path Routing", "Host routing: different domains ? different backends (api.example.com vs app.example.com). Path routing: same domain, different paths ? different backends (example.com/api vs example.com/app)."),
    d("SSL/TLS and Host Routing", "Each host can have its own SSL certificate. SNI (Server Name Indication) allows the server to present the correct certificate based on the hostname. Required for serving multiple HTTPS domains on the same IP.")
  ],
  "Host routing separates services by domain/subdomain — ideal for multi-tenant SaaS, API/subdomain separation, and microservices. Use SNI for multiple SSL certificates.",
  [
    q("What is host routing?", "Routing requests based on the HTTP Host header — different domains go to different backends."),
    q("What is virtual hosting?", "A single server handling multiple domain names — each domain has its own configuration."),
    q("What is SNI?", "Server Name Indication — a TLS extension that lets the client specify the hostname during the TLS handshake."),
    q("What is a wildcard host?", "A host pattern matching all subdomains: *.example.com matches any subdomain."),
    q("What is the difference between host and path routing?", "Host routing uses different domains (api.example.com). Path routing uses different paths (example.com/api)."),
    q("How is host routing used in multi-tenant SaaS?", "Each tenant gets a subdomain: tenant1.app.example.com routes to tenant1's resources."),
    q("What HTTP header does host routing use?", "The Host header — required in HTTP/1.1, contains the domain name and optional port."),
    q("Can host and path routing be combined?", "Yes. Host routing first (api.example.com), then path routing (/users, /orders)."),
    q("How does SSL work with host routing?", "SNI allows the server to select the correct SSL certificate based on the requested hostname."),
    q("What is the default server in Nginx?", "The default_server — handles requests with no matching Host header.")
  ],
  R(10,35,140,25,"#0070f3","","api.example.com","? API Service") +
  R(10,65,140,25,"#28a745","","app.example.com","? Web App") +
  R(10,95,140,25,"#ffc107","","admin.example.com","? Admin Panel") +
  R(10,125,140,25,"#e83e8c","","*.customers.com","? Multi-Tenant") +
  A(150,48,180,48) + A(150,78,180,78) + A(150,108,180,108) + A(150,138,180,138) +
  R(190,35,160,25,"#17a2b8","","Host Router","Match Host header") +
  A(350,48,380,48) + A(190,60,190,80) + A(190,82,190,105) + A(190,108,190,130) +
  R(390,35,90,25,"#dc3545","","API Backend") +
  R(390,70,90,25,"#6610f2","","Web Backend") +
  R(390,105,90,25,"#e83e8c","","Admin Backend") +
  T(240,170,"Host Routing: Different domains/subdomains route to different backend services.",9,"#666","middle"),
  [
    e("Nginx Virtual Hosts", "Multiple domain routing.", codeBlock([
      "server {",
      "  listen 80;",
      "  server_name api.example.com;",
      "  location / { proxy_pass http://api-backend:3000; }",
      "}",
      "server {",
      "  listen 80;",
      "  server_name app.example.com;",
      "  root /var/www/app;",
      "}",
      "server {",
      "  listen 80 default_server;",
      "  server_name _;",
      "  return 404;",
      "}"
    ]), "Nginx virtual hosts route different domains to different backends."),
    e("Traefik Host-Based Routing", "Dynamic host routing.", codeBlock([
      "http:",
      "  routers:",
      "    api-router:",
      '      rule: "Host(`api.example.com`)"',
      "      service: api-service",
      "    app-router:",
      '      rule: "Host(`app.example.com`)"',
      "      service: app-service",
      "    tenant-router:",
      '      rule: "HostRegex(`{tenant:[a-z]+}.app.example.com`)"',
      "      service: tenant-service"
    ]), "Traefik host-based routing with regex subdomain matching."),
    e("Apache VirtualHost", "Apache host routing.", codeBlock([
      "<VirtualHost *:80>",
      "  ServerName api.example.com",
      "  ProxyPass / http://localhost:3000/",
      "</VirtualHost>",
      "<VirtualHost *:80>",
      "  ServerName app.example.com",
      "  DocumentRoot /var/www/app",
      "</VirtualHost>"
    ]), "Apache VirtualHost routing for multiple domains."),
    e("Multi-Tenant Host Routing (Node.js)", "Subdomain routing.", codeBlock([
      "app.use((req, res, next) => {",
      "  const host = req.headers.host;",
      "  const parts = host.split('.');",
      "  const tenant = parts.length > 2 ? parts[0] : null;",
      "  if (tenant) { req.tenant = tenant; return handleTenantRequest(req, res); }",
      "  next();",
      "});"
    ]), "Dynamic tenant extraction from subdomain for multi-tenant host routing."),
    e("Wildcard DNS + Nginx", "DNS setup.", codeBlock([
      "# DNS: *.example.com ? 192.0.2.1",
      "server {",
      "  listen 80;",
      "  server_name *.example.com;",
      '  if ($host ~ ^(.+)\.example\.com$) { set $subdomain $1; }',
      "  location / {",
      "    proxy_pass http://app-backend:3000;",
      "    proxy_set_header X-Subdomain $subdomain;",
      "  }",
      "}"
    ]), "Wildcard DNS combined with Nginx extracts subdomain for per-tenant routing.")
  ],
  [
    m("What does host routing use to determine destination?", ["URL path", "Host header", "Query string", "Cookie"], 1, "Host routing uses the HTTP Host header."),
    m("What is SNI?", ["Server Node Id", "Server Name Indication", "Secure Network Iface", "Subdomain Name Index"], 1, "SNI lets client specify hostname during TLS handshake."),
    m("What pattern matches all subdomains?", ["*.example.com", "?.example.com", "**/example.com", "#.example.com"], 0, "Wildcard matching all subdomains."),
    m("What is virtual hosting?", ["Cloud hosting", "Single server handling multiple domains", "VM hosting", "DNS hosting"], 1, "One server handles multiple domain names."),
    m("What is the default_server in Nginx?", ["SSL server", "Catch-all server block", "First server", "Last server"], 1, "Handles unmatched Host headers."),
    m("What does multi-tenant SaaS use for isolation?", ["Path routing", "Subdomain routing", "Cookie routing", "IP routing"], 1, "Subdomain routing per tenant.")
  ]
);

/* =================== 8: DNS Routing =================== */
addTopic("tm-dns-routing", "DNS Routing", "intermediate", 15,
  ["DNS routing uses the Domain Name System to direct traffic by returning different IP addresses based on criteria.",
   "Techniques: GeoDNS, Weighted DNS, Latency-based DNS, Failover DNS.",
   "DNS is the first point of routing — before any HTTP request, DNS resolves the domain to an IP address.",
   "Major DNS providers: Route 53 (AWS), Cloudflare DNS, Google Cloud DNS, Azure DNS, NS1."
  ],
  "DNS routing is like a global telephone directory. When you call a company's main number, the operator can route your call to the nearest office based on your area code. Similarly, DNS can return the IP of the nearest server when a user looks up a domain.",
  [
    d("How DNS Routing Works", "User types domain ? DNS resolver queries authoritative DNS server ? DNS returns IP based on routing policy ? client connects to returned IP. DNS responses have TTL (Time to Live). Lower TTL means faster failover but more DNS queries."),
    d("GeoDNS (Geographic Routing)", "Returns different IPs based on client geographic location. Uses GeoIP databases. Use cases: serve content from nearest CDN edge, comply with data sovereignty laws (GDPR), regional content restrictions."),
    d("Weighted DNS Routing", "Multiple A/AAAA records with assigned weights. Used for gradual traffic shifting, A/B testing at DNS level, canary deployments. Not all clients respect weights equally."),
    d("DNS Failover", "Health checks monitor backend servers. If server fails, its DNS record is removed. Failover time depends on health check interval + TTL. Set TTL low (30-60s) for failover domains."),
    d("Latency-Based Routing", "DNS returns the IP with lowest latency for the client. Requires monitoring latency from various regions to each endpoint. AWS Route 53 latency-based routing measures latency between regions.")
  ],
  "DNS routing is the first traffic management layer. Use GeoDNS for regional delivery, weighted DNS for gradual rollouts, low TTL for fast failover. DNS changes propagate slowly due to caching.",
  [
    q("What is DNS routing?", "Using DNS to direct traffic by returning different IPs based on location, latency, weight, or health."),
    q("What is GeoDNS?", "DNS that returns different IPs based on the client's geographic location."),
    q("What is weighted DNS?", "Multiple A records with weights — traffic distributed according to assigned weights."),
    q("What is TTL in DNS?", "Time to Live — how long a DNS response is cached. Lower TTL = faster changes."),
    q("What is DNS failover?", "Automatic removal of DNS records for unhealthy servers."),
    q("What is latency-based routing?", "DNS returns the IP with lowest latency for the client's location."),
    q("What is a CNAME record?", "Alias record mapping a domain to another domain name. Used for CDN integration."),
    q("What is an A record vs AAAA?", "A maps to IPv4. AAAA maps to IPv6."),
    q("What is anycast DNS?", "Multiple servers advertise same IP. Traffic routes to nearest server via BGP."),
    q("What is a DNS health check?", "Periodic checks to verify server health before returning its IP.")
  ],
  R(10,35,130,25,"#0070f3","","Client Query","example.com?") +
  A(140,48,180,48) +
  R(190,35,130,25,"#28a745","","DNS Server","Route 53 / Cloudflare") +
  A(320,48,350,48) + A(190,60,190,80) + A(190,82,190,105) +
  R(360,35,120,25,"#dc3545","","US Server","192.0.2.1") +
  R(360,70,120,25,"#ffc107","","EU Server","203.0.113.1") +
  R(360,105,120,25,"#e83e8c","","Asia Server","198.51.100.1") +
  R(10,70,170,25,"#6610f2","","GeoDNS: US?US IP","Regional routing") +
  R(10,105,170,25,"#17a2b8","","Failover: Remove bad IP","Health checks") +
  T(240,155,"DNS Routing: Direct traffic at DNS level using Geo, latency, weight, and health policies.",9,"#666","middle"),
  [
    e("Route 53 GeoDNS", "Geographic DNS.", codeBlock([
      'resource "aws_route53_record" "app" {',
      '  zone_id = aws_route53_zone.main.zone_id',
      '  name    = "app.example.com"',
      '  type    = "A"',
      '  geo_location { continent_code = "NA" }',
      '  alias {',
      '    name    = aws_lb.us-east-1.dns_name',
      '    zone_id = aws_lb.us-east-1.zone_id',
      '    evaluate_target_health = true',
      "  }",
      '  geo_location { continent_code = "EU" }',
      '  alias {',
      '    name    = aws_lb.eu-west-1.dns_name',
      '    zone_id = aws_lb.eu-west-1.zone_id',
      "  }",
      "}"
    ]), "Route 53 GeoDNS routes NA to us-east-1, EU to eu-west-1."),
    e("Weighted DNS (Route 53)", "Gradual traffic shifting.", codeBlock([
      'resource "aws_route53_record" "v1" {',
      '  zone_id = aws_route53_zone.main.zone_id',
      '  name    = "app.example.com"',
      '  type    = "A"',
      '  set_identifier = "v1"',
      '  weight = 90',
      '  ttl    = 60',
      '  records = ["192.0.2.1"]',
      "}",
      'resource "aws_route53_record" "v2" {',
      '  set_identifier = "v2"',
      '  weight = 10',
      '  records = ["203.0.113.1"]',
      "}"
    ]), "Weighted DNS: 90% v1, 10% v2 with health checks."),
    e("DNS Failover with Cloudflare Workers", "Failover logic.", codeBlock([
      "async function handleRequest(request) {",
      '  const primary = await fetch("http://primary.example.com",',
      "    { signal: AbortSignal.timeout(5000) }",
      "  ).catch(() => null);",
      "  if (primary?.ok) return primary;",
      '  const backup = await fetch("http://backup.example.com");',
      "  if (backup?.ok) return backup;",
      '  return new Response("Unavailable", { status: 503 });',
      "}"
    ]), "Cloudflare Worker failover — try primary, fallback, then static."),
    e("Custom DNS Server (Node.js)", "Simple Geo DNS.", codeBlock([
      "const dns = require('dns').createServer();",
      "const geoRoutes = { US: '192.0.2.1', EU: '203.0.113.1', ASIA: '198.51.100.1' };",
      "dns.on('request', (req, res) => {",
      "  if (req.questions[0].name === 'app.example.com') {",
      "    const region = getGeoRegion(req.address.address);",
      "    const ip = geoRoutes[region] || geoRoutes.US;",
      "    res.answer.push({ name: req.questions[0].name, type: 'A', ttl: 60, data: ip });",
      "  }",
      "  res.send();",
      "});",
      "dns.listen(53);"
    ]), "Custom DNS server returning IP based on client geo-region."),
    e("Route 53 Failover with Health Check", "Auto-failover.", codeBlock([
      'resource "aws_route53_health_check" "primary" {',
      '  fqdn = "primary.example.com"',
      '  port = 443',
      '  type = "HTTPS"',
      '  resource_path = "/health"',
      '  failure_threshold = 3',
      '  request_interval = 30',
      "}",
      'resource "aws_route53_record" "failover" {',
      '  failover_routing_policy = "PRIMARY"',
      '  ttl = 30',
      '  health_check_id = aws_route53_health_check.primary.id',
      "}"
    ]), "Route 53 failover routing with health check.")
  ],
  [
    m("What does DNS stand for?", ["Domain Name Service", "Domain Name System", "Digital Network Service", "Dynamic Name Server"], 1, "DNS = Domain Name System."),
    m("What does TTL determine?", ["Server load", "Cache duration", "Encryption strength", "Record count"], 1, "TTL determines cache duration for DNS responses."),
    m("What is GeoDNS used for?", ["Load balancing", "Regional content delivery", "SSL termination", "API routing"], 1, "GeoDNS returns different IPs based on client location."),
    m("What DNS routing enables A/B testing?", ["GeoDNS", "Weighted DNS", "Latency DNS", "Failover"], 1, "Weighted DNS distributes traffic by percentage."),
    m("What is the main DNS routing trade-off?", ["High CPU", "Propagation delay from caching", "No SSL", "SPOF"], 1, "DNS changes propagate slowly due to caching."),
    m("What DNS record is used for domain aliasing?", ["A", "AAAA", "CNAME", "MX"], 2, "CNAME aliases one domain to another.")
  ]
);

/* =================== 9: Geo Routing =================== */
addTopic("tm-geo-routing", "Geo Routing", "intermediate", 15,
  ["Geo routing directs traffic based on the geographic location of the client.",
   "Uses GeoIP databases (MaxMind, ip2location) to map IPs to countries, regions, or cities.",
   "Benefits: lower latency, data sovereignty compliance (GDPR), regional content, disaster avoidance.",
   "Methods: GeoDNS, GeoIP load balancing, CDN edge routing, Anycast."
  ],
  "Geo routing is like a global pizza chain. When you order online, the website detects your location and routes you to the nearest store for faster delivery (lower latency). The menu shows local prices and specials (regional content).",
  [
    d("GeoIP Databases", "MaxMind GeoIP2: industry standard, ~99.8% country accuracy. ip2location: alternative. City-level accuracy ~80-90%. Databases need regular updates. Self-hosted or API-based. Privacy considerations: GDPR compliance for IP storage."),
    d("Anycast Routing", "Multiple servers advertise the same IP via BGP. Traffic routes to nearest server based on BGP path length. Used by CDNs. No DNS-level config needed. Fast failover. Requires router infrastructure."),
    d("Geo Routing with CDNs", "CDN edge nodes cache content at hundreds of locations worldwide. Users routed to nearest edge via GeoDNS or Anycast. Reduces latency by 50-80% for global audiences."),
    d("Data Sovereignty and Compliance", "Data must stay within borders (GDPR in EU, PIPL in China). Geo routing ensures EU user data processed in EU. Route EU users to EU-hosted servers. Block access from restricted regions.")
  ],
  "Geo routing is essential for global applications. Use GeoDNS for simple region-based routing, Anycast for automatic optimal routing, CDNs for content delivery. Consider data sovereignty laws.",
  [
    q("What is geo routing?", "Directing traffic based on the geographic location of the client."),
    q("What is GeoIP?", "Technology mapping an IP address to a geographic location."),
    q("What is Anycast?", "Multiple servers advertising the same IP — BGP routes to nearest."),
    q("What is GeoDNS?", "DNS returning different IPs based on client geographic location."),
    q("How do CDNs use geo routing?", "Route users to nearest edge node via GeoDNS or Anycast."),
    q("Why is geo routing important for GDPR?", "Ensures EU user data processed and stored within EU."),
    q("What is GeoIP accuracy?", "Country ~99%+, City ~80-90%. Varies by region."),
    q("What is the difference between GeoDNS and Anycast?", "GeoDNS: different IPs per region. Anycast: same IP globally, BGP routes."),
    q("What is MaxMind?", "Leading provider of GeoIP databases."),
    q("How does geo routing improve latency?", "Sends users to geographically closest server.")
  ],
  R(10,35,110,25,"#0070f3","","US Client","192.0.2.1") +
  R(10,65,110,25,"#28a745","","EU Client","203.0.113.1") +
  R(10,95,110,25,"#ffc107","","Asia Client","198.51.100.1") +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) +
  R(160,35,150,25,"#17a2b8","","Geo Router","GeoIP / Anycast / CDN") +
  A(310,48,340,48) + A(160,60,160,80) + A(160,82,160,105) +
  R(350,35,130,25,"#dc3545","","US Server","us-east-1") +
  R(350,70,130,25,"#e83e8c","","EU Server","eu-west-1") +
  R(350,105,130,25,"#6610f2","","Asia Server","ap-southeast-1") +
  T(240,165,"Geo Routing: Send users to nearest region — lower latency, compliance, regional content.",9,"#666","middle"),
  [
    e("GeoIP Middleware (Node.js)", "Detect location.", codeBlock([
      "const geoip = require('geoip-lite');",
      "app.use((req, res, next) => {",
      "  const geo = geoip.lookup(req.ip);",
      "  if (geo) { req.geo = { country: geo.country, region: geo.region, city: geo.city }; }",
      "  next();",
      "});",
      "app.get('/api/data', (req, res) => {",
      "  if (req.geo?.country === 'DE') return res.redirect('https://eu-api.example.com');",
      "  res.json({ region: 'default' });",
      "});"
    ]), "GeoIP middleware detects client location and routes accordingly."),
    e("CloudFront Geo Restriction", "CDN geo blocking.", codeBlock([
      'resource "aws_cloudfront_distribution" "cdn" {',
      '  restrictions {',
      '    geo_restriction {',
      '      restriction_type = "whitelist"',
      '      locations = ["US", "CA", "GB", "DE"]',
      "    }",
      "  }",
      "}"
    ]), "CloudFront geo-restriction limits access to specified countries."),
    e("Anycast with BGP", "Anycast routing.", codeBlock([
      "# Same IP advertised from multiple locations",
      "# US East: AS64512 announces 203.0.113.0/24",
      "# EU West: AS64512 announces 203.0.113.0/24",
      "# BGP shortest path determines location",
      "# Benefits: auto load distribution, fast failover, DDoS absorption"
    ]), "Anycast uses BGP to route clients to nearest server location."),
    e("Multi-Region Deployment with Geo Routing", "Global setup.", codeBlock([
      "# Route 53 geo routing policy:",
      "#   US, Canada ? us-east-1 ALB",
      "#   Europe ? eu-west-1 ALB",
      "#   Asia ? ap-southeast-1 ALB",
      "#   Default ? us-east-1 ALB",
      "# Database per region with cross-region replication"
    ]), "Multi-region architecture with Route 53 geo routing."),
    e("Geofencing with GeoIP", "Block restricted regions.", codeBlock([
      "const BLOCKED = ['XX', 'YY', 'ZZ'];",
      "app.use((req, res, next) => {",
      "  if (req.geo?.country && BLOCKED.includes(req.geo.country)) {",
      "    return res.status(403).json({ error: 'Not available in your region' });",
      "  }",
      "  next();",
      "});"
    ]), "Geofencing blocks or restricts content based on geographic region.")
  ],
  [
    m("What maps IPs to geographic locations?", ["DNS", "GeoIP", "HTTP", "SSL"], 1, "GeoIP databases map IPs to locations."),
    m("What is Anycast?", ["DNS with multiple IPs", "Same IP from multiple locations", "DNS load balancing", "IP encryption"], 1, "Same IP advertised from multiple locations."),
    m("What is primary benefit of geo routing?", ["Lower latency", "Higher security", "Better SEO", "Lower cost"], 0, "Reduces latency by sending users to closest server."),
    m("Leading GeoIP database?", ["ip2location", "MaxMind GeoIP", "Google Maps", "Whois"], 1, "MaxMind GeoIP is industry leading."),
    m("Which regulation drives geo routing?", ["PCI DSS", "GDPR", "HIPAA", "SOC 2"], 1, "GDPR requires EU data processing within EU."),
    m("How do CDNs route users to nearest edge?", ["GeoDNS or Anycast", "Proxy servers", "Load balancers", "VPN"], 0, "CDNs use GeoDNS or Anycast.")
  ]
);

/* =================== 10: Traffic Splitting =================== */
addTopic("tm-traffic-splitting", "Traffic Splitting", "intermediate", 15,
  ["Traffic splitting divides incoming traffic between two or more backend versions based on configurable percentages.",
   "Common uses: canary releases, A/B testing, blue-green deployments, gradual migrations.",
   "Splitting can be at: DNS level, load balancer, service mesh, or application level.",
   "Unlike load balancing (distribution for capacity), traffic splitting is about routing to different versions for testing."
  ],
  "Traffic splitting is like a water pipe with two valves. 90% flows to House A (old version) and 10% to House B (new version). You can gradually turn Valve A down and Valve B up. If House B reports no leaks, you eventually send 100% to B.",
  [
    d("Traffic Splitting vs Load Balancing", "Load balancing: distributing load across identical servers. Traffic splitting: directing portions to different versions for testing. Load balancing uses Round Robin. Traffic splitting uses weighted percentages. Can be combined."),
    d("Header/Cookie-Based Splitting", "More precise: route specific users based on headers or cookies. Example: X-Canary header ? canary. Cookie hash ? deterministic. Enables consistent user experience (same user always sees same version)."),
    d("Traffic Mirroring (Shadowing)", "Send a copy of traffic to new version without affecting response. Mirrored traffic is dark — responses ignored. Used for testing with production traffic. No risk to users. Supported by Istio, Envoy, NGINX."),
    d("Gradual Rollout Strategies", "Start 1% ? monitor ? 5% ? monitor ? 25% ? 50% ? 100%. Auto-rollback if error rate exceeds threshold. Canary analysis compares metrics between old and new.")
  ],
  "Traffic splitting enables safe, gradual rollouts. Start small (1-5%), monitor aggressively, increase gradually. Use header/cookie-based splitting for deterministic routing. Traffic mirroring lets you test with production data risk-free.",
  [
    q("What is traffic splitting?", "Dividing traffic between different versions by configurable percentages."),
    q("Difference between splitting and load balancing?", "Splitting: different versions for testing. Balancing: identical servers for capacity."),
    q("What is traffic mirroring?", "Sending a copy of production traffic to a new version without affecting live response."),
    q("What is a typical canary sequence?", "1% ? 5% ? 25% ? 50% ? 100% with monitoring and auto-rollback."),
    q("How does header-based splitting work?", "Requests with specific headers routed to canary version."),
    q("What is a gradual rollout?", "Slowly increasing traffic percentage to new version while monitoring."),
    q("What is automated rollback?", "If error rate exceeds threshold, traffic auto-redirected to stable version."),
    q("Can traffic splitting be used for A/B testing?", "Yes. Route 50% to A and 50% to B, compare metrics."),
    q("What is sticky canary?", "A user routed to canary stays on canary for subsequent requests."),
    q("What tools support traffic splitting?", "Istio, Envoy, NGINX, HAProxy, AWS App Mesh, Linkerd, Kong.")
  ],
  R(10,35,120,25,"#0070f3","","All Traffic","100%") +
  A(130,48,160,48) +
  R(170,35,140,25,"#28a745","","Traffic Splitter","90 / 10 split") +
  A(310,48,340,48) + A(170,60,170,80) +
  R(350,35,130,25,"#dc3545","","Stable v1","90%") +
  R(350,70,130,25,"#ffc107","","Canary v2","10%") +
  R(10,70,150,25,"#e83e8c","","Gradual: 1%?5%?50%?100%","Progressive") +
  R(10,105,150,25,"#6610f2","","Auto-rollback on errors","Safety") +
  T(240,175,"Traffic Splitting: Route portions of traffic to different versions for canary and A/B testing.",9,"#666","middle"),
  [
    e("Istio VirtualService Splitting", "Weight-based canary.", codeBlock([
      "apiVersion: networking.istio.io/v1beta1",
      "kind: VirtualService",
      "spec:",
      "  hosts: [myapp-service]",
      "  http:",
      "  - match:",
      "    - headers:",
      "        x-canary:",
      '          exact: "true"',
      "    route:",
      "    - destination: { host: myapp-service, subset: v2 }",
      "  - route:",
      "    - destination: { host: myapp-service, subset: v1 }",
      "      weight: 90",
      "    - destination: { host: myapp-service, subset: v2 }",
      "      weight: 10"
    ]), "Istio VirtualService splits 90/10 with header-based override."),
    e("Envoy Traffic Splitting", "Weighted clusters.", codeBlock([
      "route_config:",
      "  virtual_hosts:",
      "  - name: backend",
      '    domains: ["*"]',
      "    routes:",
      "    - match: { prefix: "/" }",
      "      route:",
      "        weighted_clusters:",
      "          clusters:",
      "          - name: myapp-v1",
      "            weight: 90",
      "          - name: myapp-v2",
      "            weight: 10"
    ]), "Envoy weighted cluster routing splits traffic 90/10."),
    e("NGINX Split Clients", "Mirror and split.", codeBlock([
      "http {",
      '  split_clients "${remote_addr}${http_user_agent}" $variant {',
      '    10%   "canary";',
      '    *     "stable";',
      "  }",
      "  server {",
      "    location / {",
      "      proxy_pass http://stable-backend;",
      "      mirror /mirror;",
      "    }",
      "    location /mirror { internal; proxy_pass http://canary-backend; }",
      "  }",
      "}"
    ]), "NGINX mirror and split_clients for canary testing."),
    e("Flagger Automated Canary", "Progressive delivery.", codeBlock([
      "apiVersion: flagger.app/v1beta1",
      "kind: Canary",
      "spec:",
      "  targetRef:",
      "    apiVersion: apps/v1",
      "    kind: Deployment",
      "    name: myapp",
      "  analysis:",
      "    interval: 1m",
      "    threshold: 5",
      "    maxWeight: 50",
      "    stepWeight: 10",
      "    metrics:",
      "    - name: request-success-rate",
      "      threshold: 99"
    ]), "Flagger automates canary with metrics-based traffic promotion."),
    e("Custom Traffic Split Middleware", "App-level splitting.", codeBlock([
      "app.use((req, res, next) => {",
      "  const userId = req.user?.id || req.ip;",
      "  const hash = crypto.createHash('md5').update(String(userId)).digest('hex');",
      "  const userPercent = parseInt(hash.slice(0,4), 16) % 100;",
      "  req.useCanary = userPercent < parseInt(process.env.CANARY_PERCENT || '0');",
      "  next();",
      "});"
    ]), "Application-level splitting with consistent user hashing.")
  ],
  [
    m("Purpose of traffic splitting?", ["Increasing capacity", "Testing new versions safely", "Improving security", "Reducing costs"], 1, "Routes traffic to different versions for safe testing."),
    m("What is traffic mirroring?", ["Duplicating traffic to secondary version", "Reflecting traffic", "Caching traffic", "Blocking traffic"], 0, "Copy of live traffic to new version without affecting responses."),
    m("Typical canary starting percentage?", ["50%", "1-5%", "100%", "25%"], 1, "Canary starts at 1-5% for safe testing."),
    m("Difference splitting vs load balancing?", ["Different versions vs identical servers", "Same thing", "External vs internal", "HTTP vs TCP"], 0, "Splitting targets different versions; balancing identical servers."),
    m("Provides automated canary analysis?", ["Flagger", "Docker", "Kubernetes", "Helm"], 0, "Flagger automates canary with metrics-based promotion."),
    m("How to ensure user sees same version?", ["Random routing", "Consistent hashing", "Round Robin", "Least Connections"], 1, "User ID hash ensures same version for same user.")
  ]
);

/* =================== 11: Canary Routing =================== */
addTopic("tm-canary-routing", "Canary Routing", "advanced", 20,
  ["Canary routing gradually exposes a new service version to a small subset of users before full rollout.",
   'Named after "canary in a coal mine" — if canary shows problems, rollout is stopped or rolled back.',
   "Key components: traffic splitting, monitoring/observability, automated analysis, automatic rollback.",
   "Platforms: Kubernetes (Flagger, Argo Rollouts), service mesh (Istio, Linkerd), cloud (AWS CodeDeploy)."
  ],
  'Canary routing is like testing a new restaurant recipe on a few customers first. You serve the new dish to 5% of tables. If they love it and no one gets sick (no errors), you increase to 25%, then 50%, then the full menu. If someone complains, you immediately stop and switch back.',
  [
    d("Canary Analysis Metrics", "Error rate: 5xx should not increase. Latency: p50, p95, p99 should not degrade. CPU/Memory: no spikes. Business metrics: conversion rate, revenue. Compare canary vs baseline. Statistical significance needed."),
    d("Progressive Delivery Pipeline", "Build ? Deploy canary (1%) ? Smoke tests ? Analyze ? Auto-promote if healthy ? 25% ? Analyze ? 50% ? 100%. Each stage has gates. Auto-rollback if any gate fails."),
    d("A/B Testing vs Canary", "A/B: compare business metrics (conversion). Usually 50/50. Runs days/weeks. Canary: progressive rollout for safety. Starts small (1%). Primary metric is system health. Minutes to hours."),
    d("Canary Challenges", "Stateful services: backward-compatible DB schema. Enough traffic for statistical significance. Real-time monitoring. Coordinating across microservices. Session affinity for consistent user experience.")
  ],
  "Canary routing is the safest deployment strategy. Start at 1%, monitor metrics, auto-promote or rollback. Requires traffic splitting, real-time metrics, automated analysis, and rollback. Combine with feature flags. Ensure backward-compatible DB changes.",
  [
    q("What is canary routing?", "Gradually exposing a new version to a small subset of users for validation."),
    q("Why called canary?", "From 'canary in a coal mine' — early warning system for problems."),
    q("Typical canary starting percentage?", "1-5% of traffic."),
    q("What metrics are monitored?", "Error rate, latency (p50/p95/p99), CPU/memory, business metrics."),
    q("What triggers auto-rollback?", "Error rate above threshold, latency degradation, resource spikes."),
    q("What is progressive delivery?", "Automated staged rollout with analysis gates at each step."),
    q("Canary vs A/B testing difference?", "Canary: safety-focused, small start. A/B: business-focused, often 50/50."),
    q("What is Flagger?", "Kubernetes operator automating canary with Istio/Linkerd."),
    q("What is Argo Rollouts?", "Kubernetes controller providing canary and blue-green strategies."),
    q("Why must DB changes be backward compatible?", "Old and new versions run simultaneously — both must work with schema.")
  ],
  R(10,35,130,25,"#0070f3","","All Traffic","100%") +
  A(140,48,180,48) +
  R(190,35,140,25,"#dc3545","","Canary Controller","Flagger / Argo") +
  A(330,48,370,48) + A(190,60,190,80) + A(190,82,190,105) +
  R(380,35,100,25,"#28a745","","Stable v1","90%") +
  R(380,70,100,25,"#ffc107","","Canary v2","10%") +
  R(10,70,170,25,"#e83e8c","","Metrics: errors<1%, latency<500ms","Analysis") +
  R(10,105,170,25,"#6610f2","","Auto-promote: 10%?25%?50%?100%","Progressive") +
  R(10,140,170,25,"#17a2b8","","Auto-rollback: revert to 0% canary","Safety") +
  T(240,180,"Canary Routing: Gradually shift traffic to new version — monitor, auto-rollback on failure.",9,"#666","middle"),
  [
    e("Flagger Canary (Kubernetes)", "Automated with Istio.", codeBlock([
      "apiVersion: flagger.app/v1beta1",
      "kind: Canary",
      "spec:",
      "  targetRef:",
      "    apiVersion: apps/v1",
      "    kind: Deployment",
      "    name: frontend",
      "  service:",
      "    port: 80",
      "    hosts: [app.example.com]",
      "  analysis:",
      "    interval: 30s",
      "    threshold: 5",
      "    maxWeight: 50",
      "    stepWeight: 5",
      "    metrics:",
      "    - name: request-success-rate",
      "      thresholdRange:",
      "        min: 99"
    ]), "Flagger canary with metrics-based auto-promotion or rollback."),
    e("Argo Rollouts Canary", "Analysis template.", codeBlock([
      "apiVersion: argoproj.io/v1alpha1",
      "kind: Rollout",
      "spec:",
      "  strategy:",
      "    canary:",
      "      steps:",
      "      - setWeight: 10",
      "      - pause: { duration: 5m }",
      "      - setWeight: 25",
      "      - pause: { duration: 5m }",
      "      - setWeight: 50",
      "      - pause: { duration: 5m }",
      "      - setWeight: 100"
    ]), "Argo Rollouts with step-based canary and pauses for metrics."),
    e("Canary Analysis Template (Argo)", "Prometheus metrics.", codeBlock([
      "apiVersion: argoproj.io/v1alpha1",
      "kind: AnalysisTemplate",
      "spec:",
      "  metrics:",
      "  - name: success-rate",
      "    interval: 30s",
      "    count: 10",
      "    failureLimit: 3",
      "    provider:",
      "      prometheus:",
      "        query: >",
      "          sum(rate(http_requests_total{",
      '            service="{{args.service-name}}",',
      '            status!~"5.*"',
      "          }[1m]))",
      "          /",
      "          sum(rate(http_requests_total{",
      '            service="{{args.service-name}}"',
      "          }[1m]))"
    ]), "Argo AnalysisTemplate queries Prometheus for success rate."),
    e("K8s Canary with Labels", "Service mesh canary.", codeBlock([
      "apiVersion: apps/v1",
      "kind: Deployment",
      "metadata:",
      "  name: frontend-v2",
      "  labels:",
      "    app: frontend",
      "    version: v2",
      "spec:",
      "  replicas: 1",
      "  selector:",
      "    matchLabels:",
      "      app: frontend",
      "      version: v2",
      "  template:",
      "    metadata:",
      "      labels:",
      "        app: frontend",
      "        version: v2"
    ]), "Canary deployment with label-based versioning for service mesh routing."),
    e("Canary Rollback Script", "Manual rollback.", codeBlock([
      "#!/bin/bash",
      "# 1. Stop canary traffic",
      "kubectl patch virtualservice myapp -p '{\"spec\":...}'",
      "# 2. Scale down canary",
      "kubectl scale deploy frontend-v2 --replicas=0",
      "# 3. Restore stable version",
      "kubectl set image deploy/frontend app=myapp:stable",
      "echo 'Canary reverted'"
    ]), "Manual canary rollback script — redirects traffic and scales down.")
  ],
  [
    m("Primary purpose of canary routing?", ["Improving performance", "Safe deployment validation", "Reducing server count", "Cost savings"], 1, "Validates new versions safely by gradual exposure."),
    m("Typical canary starting percentage?", ["50%", "1-5%", "100%", "25%"], 1, "Starts at 1-5% to minimize impact."),
    m("Critical canary metric?", ["Server count", "Error rate", "Database size", "User count"], 1, "Error rate is primary canary health metric."),
    m("Automates canary on Kubernetes?", ["Docker Compose", "Flagger / Argo Rollouts", "Helm", "kubectl"], 1, "Flagger and Argo Rollouts automate canary deployments."),
    m("What happens when canary fails?", ["Deployment continues", "Auto-rollback to stable", "Error is ignored", "System restarts"], 1, "Auto-rollback redirects traffic back to stable."),
    m("Requirement for DB during canaries?", ["No changes", "Backward compatible", "Must be rolled back", "Only additions"], 1, "Schema must work with both old and new versions.")
  ]
);

/* =================== 12: Blue Green Routing =================== */
addTopic("tm-blue-green-routing", "Blue Green Routing", "advanced", 20,
  ["Blue-green deployment runs two identical environments (Blue and Green) — only one serves live traffic at a time.",
   "Deploy new version to inactive environment ? smoke tests ? switch traffic ? old becomes standby.",
   "Instant switch via load balancer/router update. Rollback is immediate — just switch back.",
   "Key difference from canary: instant full switch vs gradual. Blue-green is simpler but costs double infrastructure."
  ],
  "Blue-green is like two identical bridges to an island. Bridge Blue is open while Bridge Green is under construction. When Green is ready, you switch the traffic lights: Green opens, Blue closes. If Green has problems, instantly switch back to Blue. Drivers never experience delays.",
  [
    d("Blue-Green Architecture", "Blue: current production, 100% traffic. Green: new environment, identical infra. Traffic switch: update DNS, LB, or router. Green becomes active, Blue becomes standby. Both fully provisioned."),
    d("Database Considerations", "Schema changes must be backward compatible. Share single database. Or dual DB with sync. Best: separate schema changes before deployment."),
    d("Blue-Green vs Canary", "Blue-green: instant full switch, two full environments (costly), simple rollback. Canary: gradual, subset of instances, more complex rollback, better for real-traffic testing."),
    d("Deployment Steps", "1. Deploy to Green (inactive). 2. Smoke tests against Green. 3. Health check. 4. Switch router from Blue to Green. 5. Monitor. 6. If issues: switch back. 7. Keep Blue for rollback period.")
  ],
  "Blue-green provides instant switch and immediate rollback. Best for stateless apps. Costly due to double infrastructure. Database changes need special care. Rollback is simple traffic flip.",
  [
    q("What is blue-green deployment?", "Two identical environments with one serving live traffic — switch for zero-downtime deployment."),
    q("Main advantage?", "Instant rollback — switch back to old environment immediately."),
    q("Main disadvantage?", "Cost — two fully provisioned environments needed."),
    q("How is traffic switch performed?", "Updating load balancer, DNS, or router to point to new environment."),
    q("How do database migrations work?", "Schema changes must be backward compatible. Both environments share or work with same DB."),
    q("Blue-green vs canary difference?", "Blue-green: instant full switch. Canary: gradual shift with subset of instances."),
    q("When avoid blue-green?", "When schema changes aren't backward compatible or double cost is prohibitive."),
    q("How long keep old environment?", "Hours to days — long enough to verify stability, then decommission."),
    q("What is the router flip?", "The moment traffic switches from Blue to Green — should take milliseconds."),
    q("What testing before switch?", "Smoke tests against Green environment directly — health, functionality, integration.")
  ],
  R(10,35,130,70,"#0070f3","","Blue (Active)","Serving 100%\nv1") +
  A(140,70,180,70) +
  R(190,35,150,70,"#28a745","","Router / LB","Switch point") +
  A(340,70,380,70) +
  R(390,35,90,70,"#dc3545","","Green (Standby)","v2 ready") +
  R(10,120,130,55,"#ffc107","","Switch ?","Flip to Green") +
  R(150,120,130,55,"#e83e8c","","Blue becomes","Standby") +
  T(240,200,"Blue Green: Two identical environments. One active, one standby. Switch for zero-downtime.",9,"#666","middle"),
  [
    e("AWS ECS Blue-Green with CodeDeploy", "AWS blue-green.", codeBlock([
      'resource "aws_codedeploy_deployment_group" "bluegreen" {',
      '  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"',
      '  deployment_style {',
      '    deployment_option = "WITH_TRAFFIC_CONTROL"',
      '    deployment_type   = "BLUE_GREEN"',
      "  }",
      '  blue_green_deployment_config {',
      '    deployment_ready_option { action_on_timeout = "CONTINUE_DEPLOYMENT" }',
      '    terminate_blue_instances_on_deployment_success {',
      '      action = "TERMINATE"',
      '      termination_wait_time_in_minutes = 60',
      "    }",
      "  }",
      "}"
    ]), "AWS CodeDeploy blue-green deployment with traffic control."),
    e("Kubernetes Blue-Green via Services", "K8s blue-green.", codeBlock([
      "# Blue service (active)",
      "apiVersion: v1",
      "kind: Service",
      "metadata:",
      "  name: myapp",
      "spec:",
      "  selector:",
      "    app: myapp",
      "    version: blue",
      "",
      "# Deploy Green version",
      "kubectl apply -f deployment-green.yaml",
      "# Smoke test: kubectl exec ... curl green-service",
      "# Switch: update service selector to green",
      "kubectl patch service myapp -p '{\"spec\":{\"selector\":{\"version\":\"green\"}}}'"
    ]), "Kubernetes blue-green by updating service selector labels."),
    e("Nginx Blue-Green Switch", "Nginx routing.", codeBlock([
      "# Blue active, Green standby",
      "upstream backend {",
      "  server blue-server:3000; # active",
      "  # server green-server:3000; # standby (commented)",
      "}",
      "",
      "# To switch: update upstream and reload",
      "# sed -i 's/blue-server/green-server/' /etc/nginx/conf.d/app.conf",
      "# nginx -s reload"
    ]), "Nginx blue-green switch by updating upstream and reloading."),
    e("Database Migration for Blue-Green", "Backward-compatible schema.", codeBlock([
      "# Step 1: Add new columns (nullable/default)",
      "ALTER TABLE users ADD COLUMN display_name VARCHAR(100);",
      "ALTER TABLE users ADD COLUMN preferences JSONB DEFAULT '{}';",
      "",
      "# Step 2: Old code ignores new columns - works",
      "# Step 3: Deploy new code (works with new columns)",
      "# Step 4: Switch traffic to Green",
      "# Step 5: Backfill data in new columns",
      "# Step 6: (Later) Make columns NOT NULL if needed"
    ]), "Backward-compatible schema changes for safe blue-green deployments."),
    e("Terraform Blue-Green with ALB", "Infrastructure as code.", codeBlock([
      'resource "aws_lb_target_group" "blue" { name = "blue-tg" }',
      'resource "aws_lb_target_group" "green" { name = "green-tg" }',
      "",
      'resource "aws_lb_listener_rule" "main" {',
      '  listener_arn = aws_lb_listener.front_end.arn',
      '  action {',
      '    type = "forward"',
      '    target_group_arn = aws_lb_target_group.blue.arn',
      "  }",
      '  condition { path_pattern { values = ["/*"] } }',
      "}",
      "# Switch by updating listener rule to point to green"
    ]), "Terraform blue-green with ALB target group switching.")
  ],
  [
    m("What is blue-green deployment?", ["Gradual rollout", "Two identical environments, switch traffic", "Single environment", "Rolling update"], 1, "Two environments with instant traffic switch."),
    m("Main blue-green advantage?", ["Lower cost", "Instant rollback", "Better performance", "Simpler code"], 1, "Instant rollback by switching back."),
    m("Main disadvantage?", ["Slower deployments", "Double infrastructure cost", "Complex rollback", "No testing"], 1, "Two fully provisioned environments needed."),
    m("How is traffic switched?", ["Code change", "Load balancer/router update", "Database update", "Client update"], 1, "Update load balancer, DNS, or router."),
    m("Blue-green vs canary?", ["Same thing", "Instant switch vs gradual", "Canary is simpler", "Blue-green is cheaper"], 1, "Blue-green: instant. Canary: gradual."),
    m("Database requirement?", ["No changes", "Backward compatible", "New database", "Read-only"], 1, "Schema must work with both versions.")
  ]
);
addTopic("tm-session-affinity","Session Affinity","intermediate",15,["Session affinity (sticky sessions) ensures all requests from a client during a session go to the same backend server.","Useful for stateful applications where session data is stored locally on the server.","Implemented via: cookie-based (JSESSIONID), IP hash, header-based affinity.","Trade-off: reduces load balancing effectiveness â€” some servers get more load than others."],"Session affinity is like a patient seeing the same doctor at a clinic. After your first visit, the receptionist always sends you to Dr. Smith (the same doctor) so they remember your history. This is helpful but means Dr. Smith might get more patients than Dr. Jones.",[d("What is Session Affinity","Session affinity ensures a client's requests go to the same backend server for the duration of their session. This is typically done by creating a mapping between the client (via cookie, IP, or header) and a specific server. The mapping has a TTL after which it expires and a new server may be selected."),d("Cookie-Based Affinity","Load balancer sets a cookie (e.g., AWS ALB's AWSALB) with the target server encoded. Client sends cookie on subsequent requests. Load balancer reads cookie and routes to the same server. Cookie TTL determines stickiness duration."),d("IP Hash Affinity","Client IP is hashed to determine the target server. Same IP = same hash = same server. No cookie needed. Problem: many users behind one NAT (corporate) all hash to the same server. Not recommended for most use cases."),d("Header-Based Affinity","Uses a custom header (X-Client-ID, X-User-ID) for stickiness. Application sets the header once. More granular than IP hash. Works even when clients change IPs (mobile users)."),d("Session Affinity vs Distributed Sessions","Session affinity: simpler, server stores session locally, server crash loses session. Distributed sessions: session stored in external store (Redis, memcached), any server can handle request, no affinity needed. Prefer distributed sessions for resilience.")],"Session affinity is a simple approach for state management â€” use cookie-based affinity for most cases. Set reasonable cookie TTL (hours). Prefer distributed sessions (Redis) for resilience over server-local sessions.",[q("What is session affinity?","All requests from a client go to the same backend server during a session."),q("How does cookie-based affinity work?","Load balancer sets a cookie identifying the backend. Client sends cookie on subsequent requests."),q("Problem with IP hash?","Users behind same NAT all hash to same server â€” uneven load distribution."),q("What is JSESSIONID?","A cookie used by Java servlets for session affinity."),q("Session affinity vs distributed sessions?","Affinity: simple, server-local state. Distributed: external store (Redis), any server can handle."),q("When to avoid session affinity?","When high availability is critical â€” server crash loses all sessions on that server."),q("What TTL for affinity cookie?","Hours typically. Too short: affinity breaks mid-session. Too long: can't rebalance."),q("What is a session?","A sequence of requests from the same client within a time window."),q("How do cloud LBs implement affinity?","AWS ALB: stickiness cookie. GCP LB: cookie-based. Azure: ARR affinity cookie."),q("Does session affinity work with WebSockets?","Yes, but WebSocket connections are typically long-lived and naturally stick to one server.")],R(10,35,130,25,"#0070f3","","Client A","First request","","")+A(140,48,180,48,"")+R(190,35,160,25,"#28a745","","Load Balancer","Sticky? â†’ Hash IP â†’ Server 2","","")+A(350,48,380,48,"")+R(390,35,90,25,"#dc3545","","Server 1","No affinity","","")+R(390,70,90,25,"#ffc107","","Server 2","Client A â†’ stick","","")+R(10,70,170,25,"#e83e8c","","Cookie: AWSALB=server2","Cookie-based","","")+R(10,105,170,25,"#6610f2","","IP Hash: 192.168.1.5â†’srv2","IP-based","","")+T(240,160,"Session Affinity: Route same client to same server for session continuity.","9","#666","middle"),[e("NGINX IP Hash","IP-based affinity.",codeBlock(["upstream backend {","  ip_hash;","  server backend1:3000;","  server backend2:3000;","  server backend3:3000;","}","","server { location / { proxy_pass http://backend; } }"]),"NGINX ip_hash ensures same client IP goes to same backend."),e("AWS ALB Sticky Sessions","Cookie-based affinity.",codeBlock(["resource \"aws_lb_target_group\" \"app\" {","  name = \"app-tg\"","  port = 80","  protocol = \"HTTP\"","  stickiness {","    type = \"lb_cookie\"","    cookie_duration_seconds = 86400","    enabled = true","  }","}"]),"AWS ALB target group with cookie-based stickiness enabled."),e("HAProxy Cookie Affinity","Cookie-based.",codeBlock(["backend app","  balance roundrobin","  cookie SERVERID insert indirect nocache","  server web1 10.0.1.1:80 check cookie s1","  server web2 10.0.2.1:80 check cookie s2"]),"HAProxy inserts a cookie to track which server handled the request."),e("Node.js Session Affinity Middleware","Header-based.",codeBlock(["app.use((req, res, next) => {","  const userId = req.headers[\"x-user-id\"];","  if (userId) {","    const serverIdx = hashCode(userId) % serverCount;","    req.targetServer = servers[serverIdx];","  }","  next();","});"]),"Application-level affinity based on user ID header hash."),e("Traefik Stickiness","Cookie-based.",codeBlock(["http:","  services:","    app:","      loadBalancer:","        stickiness:","          cookie:","            name: traefik-session","            httpOnly: true"]),"Traefik sticky sessions via cookie configuration.")],[m("What is session affinity?",["Routing all client requests to same server","Distributing across all servers","Health checking","SSL termination"],0,"Session affinity keeps a client on one server."),m("How does cookie-based affinity work?",["Server sets cookie with backend ID","Client IP hashes","Header routing","Random assignment"],0,"Cookie stores target server ID."),m("Problem with IP hash affinity?",["Too many cookies","NAT causes uneven distribution","Slow performance","No SSL support"],1,"Users behind one NAT all go to same server."),m("What is JSESSIONID?",["Java session cookie","IP hash","Load balancer config","SSL cert"],0,"Java servlet session cookie."),m("When to prefer distributed sessions?",["Single server","High availability needed","Small apps","Static sites"],1,"Distributed sessions survive server crashes."),m("What is the main trade-off of session affinity?",["Better security","Uneven load distribution","Faster performance","Lower cost"],1,"Some servers get more load than others.")])

addTopic("tm-sticky-sessions","Sticky Sessions","intermediate",15,["Sticky sessions (session persistence) bind a user's session to a specific backend server for the session duration.","Essential for stateful applications that store session data in-memory on the server.","Common methods: application-controlled cookies, load balancer cookies, IP-based persistence.","Alternative: external session stores (Redis, Memcached) that decouple sessions from servers."],"Sticky sessions are like coat check at a theater. When you check your coat, they give you a ticket stub (cookie) with a number. When you return, they look at your ticket and give you back YOUR coat (session data) from the correct bin (server).",[d("Application-Controlled Cookies","The application sets a session cookie (e.g., session_id=abc123) and stores session data locally on the server that handled the request. Subsequent requests with the same cookie must go to the same server where the session data lives. Simple but fragile."),d("Load Balancer Sticky Cookies","The load balancer intercepts the response, replaces the application cookie or adds its own (AWSALB, SERVERID). On subsequent requests, the LB reads the cookie and routes to the correct backend. Transparent to the application."),d("Consistent Hash Stickiness","Uses a hash ring to map session IDs to servers. Consistent hashing minimizes remapping when servers are added/removed. Only a fraction of sessions move (1/n). Used by HAProxy, Envoy, Redis Cluster."),d("Sticky Sessions Best Practices","Use sticky cookies over IP hash. Set reasonable cookie TTL. Implement graceful drain: mark server as draining, let active sessions finish, then stop routing new sessions to it. Monitor stickiness ratio (target: 100% for sticky services).")],"Sticky sessions are a pragmatic solution for stateful apps. Use load balancer cookie stickiness for simplicity, consistent hashing for resilience. Always plan for server failures â€” have a session recovery strategy. For critical systems, use external session stores instead.",[q("What are sticky sessions?","A mechanism to route all requests from a user session to the same backend server."),q("Difference from session affinity?","They are often used interchangeably. Sticky sessions typically refer to cookie-based persistence."),q("What is a consistent hash?","Hash ring mapping â€” minimizes session redistribution when servers change."),q("How to drain a server gracefully?","Mark as draining â€” stop new sessions, let existing sessions complete."),q("What is the alternative to sticky sessions?","External session store (Redis, Memcached) â€” no stickiness needed."),q("Why is IP hash problematic?","NAT: many users share one IP â†’ all go to same server."),q("What happens if the sticky server crashes?","Session data is lost â€” user must re-authenticate or restart the session."),q("What is the sticky cookie name in AWS ALB?","AWSALB (AppCookieStickinessPolicy)."),q("How does HAProxy implement stickiness?","cookie SERVERID insert indirect nocache â€” injects a cookie tracking the server."),q("What is session replication?","Replicating session data across all servers â€” enables any-server routing without stickiness.")],R(10,35,130,25,"#0070f3","","Client","Cookie: srv=web2","","")+A(140,48,180,48,"")+R(190,35,160,25,"#28a745","","Load Balancer","Reads cookie â†’ web2","","")+A(350,48,380,48,"")+R(390,35,90,25,"#dc3545","","web1","empty","","")+R(390,70,90,25,"#ffc107","","web2","session data","","")+R(10,70,170,25,"#e83e8c","","Cookie-based: AWSALB","LB injects","","")+R(10,105,170,25,"#6610f2","","Consistent Hash: hash(sessionID)","Minimal remapping","","")+T(240,155,"Sticky Sessions: Cookie-based routing ensures user returns to the same server for their session.","9","#666","middle"),[e("HAProxy Sticky Session Cookie","Cookie injection.",codeBlock(["backend app","  cookie SRV insert indirect nocache maxidle 30m","  server app1 10.0.1.1:80 check cookie app1","  server app2 10.0.2.1:80 check cookie app2","","# Client gets: Set-Cookie: SRV=app1; path=/"]),"HAProxy injects SRV cookie to maintain stickiness."),e("AWS ALB Sticky Session Config","Cloud LB stickiness.",codeBlock(["resource \"aws_lb_target_group\" \"example\" {","  stickiness {","    enabled = true","    type = \"lb_cookie\"","    cookie_duration_seconds = 3600","  }","}","","# Cookie name: AWSALB","# One hour stickiness duration"]),"AWS ALB stickiness with lb_cookie type."),e("Consistent Hash with Envoy","Maglev consistent hash.",codeBlock(["route_config:","  virtual_hosts:","  - name: backend","    domains: [\"*\"]","    routes:","    - match: { prefix: \"/\" }","      route:","        hash_policy:","        - cookie:","            name: session_id","            ttl: 120s","        cluster: app_cluster"]),"Envoy consistent hash based on session_id cookie."),e("Application-Level Sticky Session (Node + Redis)","App-managed.",codeBlock(["app.use((req, res, next) => {","  var sid = req.cookies.session_id;","  if (!sid) {","    sid = uuid.v4();","    res.cookie(\"session_id\", sid);","  }","  redis.get(\"session:\" + sid, (err, data) => {","    req.session = JSON.parse(data || \"{}\");","    next();","  });","});"]),"Application manages session cookie, stores data in Redis (no LB stickiness needed).")],[m("What do sticky sessions use?",["Cookies","IP routing","DNS","SSL"],0,"Sticky sessions use cookies for persistence."),m("What happens when sticky server fails?",["Session migrates","Session data lost","Another server takes over","Session is cached"],1,"Session data is lost when the sticky server fails."),m("What is consistent hashing for?",["Faster routing","Minimal session remapping","Better security","SSL termination"],1,"Consistent hash minimizes session moves on server changes."),m("How to drain a server?",["Restart server","Mark as draining","Delete server","Remove cookie"],1,"Draining lets existing sessions finish, stops new sessions."),m("Alternative to sticky sessions?",["Round robin","External session store","DNS routing","IP hash"],1,"External store like Redis decouples sessions from servers."),m("What is session replication?",["Copy session to all servers","Delete session","Cache session","Encrypt session"],0,"Replicate session data across all servers for fault tolerance.")])

addTopic("tm-circuit-breaker","Circuit Breaker","advanced",20,["Circuit breaker prevents cascading failures by detecting when a downstream service is failing and stopping requests to it.","Three states: CLOSED (normal), OPEN (failing â€” requests blocked), HALF-OPEN (testing if service recovered).","After failures exceed a threshold, circuit opens. After a timeout, it goes half-open. If test request succeeds, it closes; if it fails, it stays open.","Libraries: Hystrix (Netflix), resilience4j (Java), Polly (.NET), Opossum (Node.js), Istio circuit breaker."],"A circuit breaker is like an electrical circuit breaker in your home. When there's a short circuit (too many failures), the breaker 'trips' (opens) and stops the flow. After a while, you try flipping it back on (half-open). If the short is fixed, everything works. If not, it trips again immediately.",[d("CLOSED State","Normal operation. All requests pass through to the downstream service. Failure count is tracked. If failures exceed a threshold (e.g., 5 failures in 10 seconds), the circuit trips to OPEN. Successes reset the failure count."),d("OPEN State","Requests fail immediately without calling the downstream service (fail-fast). A fallback response may be returned. After a timeout (e.g., 30 seconds), transitions to HALF-OPEN to test recovery. This protects the downstream from being overwhelmed."),d("HALF-OPEN State","Limited number of test requests are allowed through. If test requests succeed, circuit transitions to CLOSED. If any fail, circuit goes back to OPEN. The timeout resets, extending the recovery period."),d("Bulkhead Pattern","Isolates resources per service or component. Each service gets a limited thread pool or connection pool. If one service runs out of threads, it doesn't affect others. Prevents one failing service from exhausting all resources."),d("Fallback Strategies","Return cached response. Return default value. Return error to caller. Graceful degradation (disable non-critical features). Queuing requests for later retry. Stale data from last successful response.")],"Circuit breakers are essential for resilient microservices. Set failure threshold based on normal error rates. Configure timeout for recovery testing. Implement meaningful fallbacks. Combine with retries (with backoff) and bulkheads. Monitor circuit state and alert on OPEN circuits.",[q("What is circuit breaker?","Pattern that stops requests to a failing service to prevent cascading failures."),q("Three states?","CLOSED (normal), OPEN (failing), HALF-OPEN (testing)."),q("When does circuit open?","When failures exceed a configured threshold within a time window."),q("What is fallback?","Response returned when circuit is OPEN â€” cached data, default value, or error."),q("What is bulkhead?","Isolates resources per service â€” prevents one failing service from exhausting all threads."),q("What happens in HALF-OPEN?","Limited test requests probe if the service has recovered."),q("What is Hystrix?","Netflix's circuit breaker library (now in maintenance mode)."),q("What is Opossum?","Node.js circuit breaker library."),q("How to prevent thundering herd?","Use exponential backoff for retries after circuit opens."),q("Can circuit breaker be used at network level?","Yes â€” Envoy, Istio, and Linkerd have circuit breaker configurations.")],R(10,35,80,25,"#28a745","","CLOSED","Normal","","")+A(90,48,130,48,"")+R(140,35,140,25,"#0070f3","","Circuit Breaker","Track failures","","")+A(280,48,320,48,"")+R(330,35,90,25,"#dc3545","","Service","5 failures","","")+R(10,70,80,25,"#dc3545","","OPEN","Fail fast","","")+A(90,82,130,82,"")+R(140,70,140,25,"#ffc107","","Trip: 30s timeout","Block requests","","")+R(10,105,80,25,"#e83e8c","","HALF-OPEN","Test","","")+A(90,118,130,118,"")+R(140,105,140,25,"#6610f2","","Test request â†’ OK?","Close or stay open","","")+T(240,155,"Circuit Breaker: CLOSED â†’ OPEN (failure threshold) â†’ HALF-OPEN (timeout, test) â†’ CLOSED or OPEN.","9","#666","middle"),[e("Opossum (Node.js)","Node circuit breaker.",codeBlock(["const CircuitBreaker = require(\"opossum\");","","function callService() {","  return axios.get(\"http://api/users\");","}","","const breaker = new CircuitBreaker(callService, {","  errorThresholdPercentage: 50,","  resetTimeout: 30000,","  volumeThreshold: 10","});","","breaker.fallback(() => ({ cached: true, users: [] }));","breaker.on(\"open\", () => console.log(\"Circuit opened!\"));"]),"Opossum circuit breaker configuration."),e("Istio Circuit Breaker","Service mesh level.",codeBlock(["apiVersion: networking.istio.io/v1beta1","kind: DestinationRule","spec:","  host: my-service","  trafficPolicy:","    connectionPool:","      tcp:","        maxConnections: 100","      http:","        http1MaxPendingRequests: 10","        maxRequestsPerConnection: 10","    outlierDetection:","      consecutive5xxErrors: 5","      interval: 30s","      baseEjectionTime: 30s"]),"Istio circuit breaker via outlier detection and connection pool limits."),e("Hystrix-Like Config (resilience4j)","Java circuit breaker.",codeBlock(["CircuitBreakerConfig config = CircuitBreakerConfig.custom()","  .failureRateThreshold(50)","  .waitDurationInOpenState(Duration.ofSeconds(30))","  .slidingWindowSize(10)","  .build();","","CircuitBreaker cb = CircuitBreaker.of(\"myService\", config);","","Supplier<String> decorated = Decorators.ofSupplier(supplier)","  .withCircuitBreaker(cb)","  .withFallback(e -> \"fallback\")","  .decorate();"]),"resilience4j circuit breaker with fallback."),e("Envoy Circuit Breaker","Proxy-level.",codeBlock(["circuit_breakers:","  thresholds:","  - priority: DEFAULT","    max_connections: 100","    max_pending_requests: 10","    max_requests: 100","    max_retries: 3","  - priority: HIGH","    max_connections: 200"]),"Envoy circuit breaker thresholds per priority level."),e("Python Circuit Breaker (pybreaker)","Python library.",codeBlock(["import pybreaker","","breaker = pybreaker.CircuitBreaker(","  fail_max=5, reset_timeout=30",")","","@breaker","def call_api():","  return requests.get(\"http://api/users\")","","# fallback","def fallback(): return []","result = breaker.call(call_api, fallback)"]),"Python pybreaker circuit breaker decorator.")],[m("What state is normal operation?",["OPEN","CLOSED","HALF-OPEN","BROKEN"],1,"CLOSED is normal operation."),m("What triggers OPEN state?",["Success threshold","Failure threshold exceeded","Timeout expired","Manual reset"],1,"Failure threshold exceeded triggers OPEN."),m("What is bulkhead?",["Resource isolation per service","Circuit state","Fallback data","Retry counter"],0,"Bulkhead isolates resources-per-service."),m("What Node.js circuit breaker library?",["Hystrix","Opossum","Polly","Failsafe"],1,"Opossum is the Node.js circuit breaker."),m("When does circuit go HALF-OPEN?",["After failures","After reset timeout","Immediately","On manual trigger"],1,"After reset timeout, circuit transitions to HALF-OPEN."),m("What is the main goal of circuit breaker?",["Faster requests","Prevent cascading failures","Lower cost","Better UX"],1,"Prevents cascading failures across services.")])

addTopic("tm-retry-policies","Retry Policies","intermediate",15,["Retry policies automatically re-attempt failed requests to improve reliability in distributed systems.","Strategies: immediate retry, fixed interval, incremental backoff, exponential backoff, jitter.","Must consider: idempotency (safe to retry?), retry budget, circuit breaker integration, max retries.","Exponential backoff with jitter is the most widely recommended strategy."],"Retry policies are like trying to call a friend who's in a tunnel. Instead of calling once and giving up, you wait a bit and try again. If the tunnel is long, you wait longer each time (exponential backoff). And you wait a random extra moment (jitter) so you don't all call at the same time.",[d("Immediate Retry","Retry immediately on failure. Simplest strategy. Risks: overwhelming the server (retry storm). Only suitable for idempotent operations with transient errors. Use with low retry count (1-2)."),d("Exponential Backoff","Wait time doubles after each retry: 1s, 2s, 4s, 8s, 16s... Formula: min(MaxDelay, BaseDelay * 2^attempt). Prevents overwhelming the server. Gives the system time to recover."),d("Jitter","Random variation added to the backoff delay to prevent thundering herd problem. When many clients retry simultaneously, jitter spreads out the retries. Full jitter: random(0, baseDelay * 2^attempt). Equal jitter: baseDelay * 2^attempt / 2 + random(0, baseDelay * 2^attempt / 2)."),d("Retry Budget","Limit total retries across all requests. Prevents retry storms. Percentage of total requests allowed for retries (e.g., 20%). If budget exhausted, new requests fail immediately. Enforced by service mesh (Istio) or client-side."),d("Idempotency and Safety","Only retry idempotent operations (GET, PUT, DELETE are idempotent; POST is not). Use idempotency keys for non-idempotent operations. Check for retry-After headers from server (HTTP 429, 503 with Retry-After).")],"Retry with exponential backoff + jitter is standard. Set max retries (3-5). Ensure idempotent operations. Integrate with circuit breaker â€” don't retry when circuit is open. Implement retry budget to prevent cascading failures. Use Retry-After header from server.",[q("What is a retry policy?","Automatic re-attempt of failed requests according to a strategy."),q("What is exponential backoff?","Delay doubles after each retry: 1s, 2s, 4s, 8s..."),q("What is jitter?","Random variation in retry delay to spread out retries from many clients."),q("What is retry storm?","Many clients retrying simultaneously â€” overwhelming the server."),q("What is retry budget?","Limit on total retry attempts as percentage of total requests."),q("What is idempotency?","Operation that can be repeated safely without side effects (GET, PUT, DELETE)."),q("How many retries recommended?","3-5 retries maximum."),q("What is a backoff algorithm?","Formula determining delay between retries (fixed, linear, exponential, etc.)."),q("What is the Retry-After header?","HTTP header indicating how long to wait before retrying (used with 429, 503)."),q("How do circuit breakers relate to retries?","Don't retry when circuit is open â€” let it recover first.")],R(10,35,130,25,"#0070f3","","Client Request","GET /api/data","","")+A(140,48,180,48,"")+R(190,35,140,25,"#28a745","","Retry Handler","Exponential backoff","","")+A(330,48,370,48,"")+R(380,35,100,25,"#dc3545","","Server","503 error","","")+R(10,70,170,25,"#ffc107","","1st retry: wait 1s â†’ 503","Backoff","","")+R(10,105,170,25,"#e83e8c","","2nd retry: wait 2s â†’ 503","Backoff","","")+R(10,140,170,25,"#6610f2","","3rd retry: wait 4s â†’ 200 OK","Success","","")+T(240,185,"Retry Policy: Exponential backoff with jitter â€” automatically retry failed requests.","9","#666","middle"),[e("AWS SDK Retry Config","Client retry.",codeBlock(["const client = new S3Client({","  maxAttempts: 5,","  retryMode: \"adaptive\",","});","","// Adaptive retry: exponential backoff + jitter","// Standard mode: max 3 attempts","// Legacy mode: max 4 attempts"]),"AWS SDK v3 adaptive retry mode with exponential backoff and jitter."),e("Istio Retry Policy","Service mesh retry.",codeBlock(["apiVersion: networking.istio.io/v1beta1","kind: VirtualService","spec:","  hosts: [my-service]","  http:","  - route:","    - destination:","        host: my-service","    retries:","      attempts: 3","      perTryTimeout: 2s","      retryOn: gateway-error,connect-failure,refused-stream"]),"Istio VirtualService retry policy for HTTP errors."),e("Exponential Backoff in Node.js","Custom backoff.",codeBlock(["async function retryWithBackoff(fn, maxRetries=3) {","  for (let i = 0; i < maxRetries; i++) {","    try { return await fn(); }","    catch (err) {","      if (i === maxRetries - 1) throw err;","      const delay = Math.min(1000 * Math.pow(2, i), 10000);","      const jitter = Math.random() * delay;","      await new Promise(r => setTimeout(r, delay + jitter));","    }","  }","}"]),"Custom exponential backoff with jitter in Node.js."),e("Envoy Retry Policy","Proxy-level retry.",codeBlock(["route_config:","  virtual_hosts:","  - name: backend","    routes:","    - match: { prefix: \"/\" }","      route:","        cluster: my-cluster","        retry_policy:","          num_retries: 3","          retry_on: \"5xx,connect-failure\"","          per_try_timeout: 2s"]),"Envoy retry on 5xx and connection failures."),e("Spring Retry with Backoff","Java retry.",codeBlock(["@Retryable(","  value = {ServiceException.class},","  maxAttempts = 5,","  backoff = @Backoff(","    delay = 1000,","    multiplier = 2,","    maxDelay = 10000","  )",")","public User getUser(String id) { ... }"]),"Spring @Retryable with exponential backoff.")],[m("What is exponential backoff?",["Fixed delay","Doubling delay","Random delay","No delay"],1,"Delay doubles after each retry attempt."),m("What problem does jitter solve?",["Slow requests","Thundering herd","Auth failures","DNS issues"],1,"Jitter prevents thundering herd from simultaneous retries."),m("What is retry budget?",["Limit on total retry percentage","Monetary cost limit","Time budget","Server capacity"],0,"Retry budget limits retries to a percentage of total requests."),m("Which operation is safe to retry?",["POST","GET","PATCH","Any"],1,"GET is idempotent â€” safe to retry."),m("Recommended max retries?",["1-2","3-5","10-20","No limit"],1,"3-5 retries is standard."),m("What header indicates retry delay?",["Cache-Control","Retry-After","X-Retry","Backoff"],1,"Retry-After header tells client how long to wait.")])

addTopic("tm-failover","Failover","advanced",20,["Failover automatically switches to a standby/redundant system when the primary system fails.","Types: Active-Passive (standby takes over), Active-Active (all instances handle traffic, degraded if one fails).","Key metrics: RTO (Recovery Time Objective â€” how long to recover), RPO (Recovery Point Objective â€” data loss tolerance).","Failover levels: DNS failover, load balancer failover, database failover, region failover."],"Failover is like having a backup generator for your house. When the main power goes out, the backup generator automatically starts within seconds (RTO). The lights flicker but stay on. You might lose a few seconds of fridge cooling (RPO) but nothing significant.",[d("Health Monitoring","Continuous checks to detect failures before failover triggers. Types: HTTP health checks (200 OK), TCP health checks (port open), custom health endpoints (DB connection, cache). Check interval: 5-30 seconds. Failure threshold: 2-5 consecutive failures."),d("Automatic vs Manual Failover","Automatic: faster (seconds), but risk of false positive. Manual: human judgment, slower (minutes), but more accurate. Hybrid: automatic detection + human confirmation for critical systems."),d("DNS Failover","Health checks remove unhealthy server's DNS record. Low TTL (30-60s) for fast propagation. DNS-based failover is slow (TTL-based). Use for regional failover. Route 53, Cloudflare DNS, Azure DNS support health check-based failover."),d("Database Failover","Primary â†’ replica promotion. Synchronous replication: no data loss (RPO=0) but higher latency. Asynchronous replication: potential data loss (RPO=seconds). Automatic failover tools: Patroni, Stolon, Orchestrator (MySQL), AWS RDS Multi-AZ."),d("Failover Testing","Chaos engineering: deliberately fail components to verify failover works. GameDays: scheduled failure testing. Regular drills for critical systems. Document runbooks for manual failover scenarios. Test both automatic and manual paths.")],"Failover is critical for high availability. Define RTO and RPO based on business requirements. Use health checks to detect failures. Test failover regularly (chaos engineering). Automate where possible but have manual fallback. Document runbooks. Monitor failover events.",[q("What is failover?","Automatic switch to standby system when primary fails."),q("What is RTO?","Recovery Time Objective â€” maximum acceptable downtime."),q("What is RPO?","Recovery Point Objective â€” maximum acceptable data loss."),q("Active-Passive vs Active-Active?","AP: standby takes over. AA: all serve traffic, degraded on failure."),q("What is DNS failover?","Health check removes failed server's DNS record. Slow (TTL-bound)."),q("What is database failover?","Promote replica to primary on primary failure."),q("What is health check?","Periodic probe to verify system is functioning."),q("What is chaos engineering?","Deliberately introducing failures to test system resilience."),q("What is a runbook?","Documented procedure for handling failover and other incidents."),q("How to minimize false positives in auto-failover?","Use multiple health check sources, require consecutive failures, use low thresholds.")],R(10,35,130,25,"#0070f3","","Primary","Active","","")+A(140,48,180,48,"")+R(190,35,160,25,"#28a745","","Health Monitor","5 failures â†’ failover","","")+A(350,48,380,48,"")+R(390,35,100,25,"#dc3545","","Primary","FAILED","","")+R(10,70,170,25,"#ffc107","","â†’ Failover triggered","Switch to standby","","")+R(190,70,160,25,"#e83e8c","","Standby promoted","New primary","","")+A(350,80,380,80,"")+R(390,70,100,25,"#6610f2","","Standby","Now Active","","")+T(240,120,"Failover: Health monitor detects failure â†’ automatic switch to standby system.","9","#666","middle"),[e("AWS RDS Multi-AZ Failover","DB failover.",codeBlock(["resource \"aws_db_instance\" \"main\" {","  engine = \"postgres\"","  multi_az = true","  storage_type = \"gp3\"","  backup_retention_period = 7","  monitoring_interval = 5","}","","# AWS automatically fails over to standby in","# another AZ when primary fails"]),"AWS RDS Multi-AZ provides automatic failover to a standby in another AZ."),e("Route 53 Failover Routing","DNS failover.",codeBlock(["resource \"aws_route53_record\" \"app\" {","  set_identifier = \"primary\"","  failover_routing_policy { type = \"PRIMARY\" }","  health_check_id = aws_route53_health_check.app.id","  ttl = 30","  records = [\"192.0.2.1\"]","}","","# Secondary record","resource \"aws_route53_record\" \"app-secondary\" {","  set_identifier = \"secondary\"","  failover_routing_policy { type = \"SECONDARY\" }","  ttl = 30","  records = [\"203.0.113.1\"]","}"]),"Route 53 failover routing with health check and low TTL."),e("Keepalived VIP Failover","VIP failover.",codeBlock(["vrrp_instance VI_1 {","  state MASTER","  interface eth0","  virtual_router_id 51","  priority 100","  advert_int 1","  virtual_ipaddress {","    192.168.1.100","  }","  track_script {","    chk_nginx","  }","}"]),"Keepalived virtual IP failover between two servers."),e("Kubernetes Pod Failover","K8s self-healing.",codeBlock(["apiVersion: apps/v1","kind: Deployment","spec:","  replicas: 3","  strategy:","    type: RollingUpdate","  template:","    spec:","      containers:","      - name: app","        livenessProbe:","          httpGet:","            path: /healthz","            port: 8080","          initialDelaySeconds: 5","          periodSeconds: 10","        readinessProbe:","          httpGet:","            path: /ready","            port: 8080"]),"Kubernetes liveness and readiness probes for automatic pod failover.")],[m("What does RTO measure?",["Data loss","Recovery time","Network speed","Server count"],1,"RTO = maximum acceptable downtime."),m("What does RPO measure?",["Data loss tolerance","Response time","Operating cost","Server uptime"],0,"RPO = maximum acceptable data loss."),m("What triggers failover?",["Manual command","Health check failure","Time of day","Traffic spike"],1,"Health check failure triggers automatic failover."),m("What is active-passive?",["Both handle traffic","Standby takes over on failure","All servers active","No redundancy"],1,"Standby takes over when primary fails."),m("What is chaos engineering?",["Random server crashes","Deliberate failure testing","Security testing","Performance testing"],1,"Chaos engineering tests resilience by introducing failures."),m("Limitation of DNS failover?",["Too fast","Slow propagation (TTL-bound)","Expensive","Insecure"],1,"DNS failover is slow due to TTL caching.")])

addTopic("tm-disaster-recovery","Disaster Recovery","advanced",25,["Disaster Recovery (DR) is the process of restoring IT infrastructure and systems after a catastrophic failure (natural disaster, cyberattack, human error).","DR strategies: Backup & Restore, Pilot Light, Warm Standby, Multi-Site Active-Active.","Key metrics: RTO (how fast to recover), RPO (how much data can you lose).","DR involves not just technology but also processes, people, and testing."],"Disaster recovery is like having a fire escape plan for your office building. You hope you never need it, but if a fire happens (disaster), everyone knows how to get out safely (RTO) and you have backups of important documents off-site (RPO). You practice the drill twice a year.",[d("Backup & Restore","Cheapest DR strategy. Regularly backup data and configurations to separate location. On disaster, provision new infrastructure + restore from backup. Highest RTO (hours to days) and RPO (up to 24 hours). Suitable for non-critical systems."),d("Pilot Light","Core services (database, DNS) run in DR region with minimal compute. On disaster, scale up compute to full capacity. Data is replicated continuously. RTO: minutes to hours. RPO: seconds to minutes."),d("Warm Standby","DR region runs with scaled-down but fully functional copy of production. All services running but at reduced capacity. On disaster, scale up to full capacity. RTO: minutes. RPO: seconds. More expensive than Pilot Light."),d("Multi-Site Active-Active","Multiple regions run production workloads simultaneously. Traffic routed via DNS/load balancer. Instant failover â€” DR is continuous. Most expensive but lowest RTO (seconds) and RPO (near-zero). Complex: data replication, conflict resolution."),d("DR Testing and Automation","Tabletop exercises: review runbooks with team. Walkthrough: simulate disaster step-by-step. Full failover test: actually fail over to DR site. Automated DR orchestration using tools like AWS Systems Manager, Terraform, or custom scripts.")],"DR strategy is a business decision balancing cost vs recovery speed. Backup & Restore for non-critical. Pilot Light for moderate. Warm Standby for important. Active-Active for critical. Automate DR testing. Document runbooks. Practice regularly. RTO and RPO define your strategy.",[q("What is Disaster Recovery?","Process of restoring systems after a catastrophic failure."),q("What is RTO?","Recovery Time Objective â€” time to restore service."),q("What is RPO?","Recovery Point Objective â€” maximum data loss (time)."),q("Cheapest DR strategy?","Backup & Restore."),q("Most expensive DR strategy?","Multi-Site Active-Active."),q("What is Pilot Light?","Core services running minimal in DR region. Scale up on disaster."),q("What is Warm Standby?","Full services at reduced capacity in DR region. Scale up on disaster."),q("What is a DR runbook?","Documented step-by-step procedure for executing DR."),q("How often should DR be tested?","At least annually. Critical systems: bi-annually or quarterly."),q("What is a tabletop exercise?","Team walks through DR scenario discussing steps without actual failover.")],R(10,35,150,25,"#28a745","","Backup & Restore","$: Hours RTO, 24h RPO","","")+R(10,65,150,25,"#ffc107","","Pilot Light","$$: Minutes RTO, sec RPO","","")+R(10,95,150,25,"#e83e8c","","Warm Standby","$$$: Minutes RTO, sec RPO","","")+R(10,125,150,25,"#dc3545","","Active-Active","$$$$: Seconds RTO, 0 RPO","","")+R(180,35,160,25,"#0070f3","","Disaster Strikes","Region outage / Cyberattack","","")+A(340,48,370,48,"")+R(380,35,100,80,"#6610f2","","DR Region","Failover & restore","","")+T(240,170,"Disaster Recovery: Choose strategy based on RTO/RPO requirements. Test regularly.","9","#666","middle"),[e("AWS DR Strategies Whitepaper","Backup & Restore.",codeBlock(["# 1. Backup: S3 cross-region replication","aws s3 sync s3://primary-bucket s3://dr-bucket","# 2. AMI backups","aws ec2 create-image --instance-id i-123","# 3. RDS snapshots to DR region","aws rds copy-db-snapshot --source-region us-east-1","# 4. On disaster: restore from backup","aws ec2 run-instances --image-id ami-xxx"]),"Backup & Restore DR: copy data to DR region, restore on disaster."),e("Terraform Pilot Light","Pilot Light infra as code.",codeBlock(["module \"pilot_light\" {","  source = \"./modules/pilot-light\"","  primary_region = \"us-east-1\"","  dr_region = \"us-west-2\"","  # Minimal: RDS replica, small EC2, DNS","  db_instance_class = \"db.t3.micro\"","  app_instance_class = \"t3.nano\"","  # Scale up on failover","}","","# Failover: update Terraform variables and apply"]),"Pilot Light: minimal DR infra, scale up on disaster."),e("Active-Active Multi-Region (Route 53 + Aurora)","Active-Active DR.",codeBlock(["# Route 53 latency-based routing","resource \"aws_route53_record\" \"app\" {","  latency_routing_policy { region = \"us-east-1\" }","  set_identifier = \"us-east-1\"","  alias { name = aws_lb.us-east-1.dns_name }","}","","# Aurora Global Database","resource \"aws_rds_cluster\" \"global\" {","  global_cluster_identifier = \"aurora-global\"","  engine = \"aurora-mysql\"","  # Writes to primary, reads from secondary","}"]),"Active-Active with Route 53 latency routing and Aurora Global Database."),e("DR Runbook Template","Documentation.",codeBlock(["# Disaster Recovery Runbook","# Service: Payment API","# RTO: 15 min | RPO: 5 min","","## 1. Detect","  - PagerDuty alert: Service unreachable > 5 min","","## 2. Assess","  - Check AWS Health Dashboard","  - Verify if region-wide outage","","## 3. Failover","  - Run: terraform apply -var=\"region=us-west-2\"","  - Update Route 53 DNS","  - Verify health endpoint","","## 4. Validate","  - Run smoke tests","  - Verify metrics","  - Notify stakeholders"]),"DR runbook template with RTO/RPO, detection, failover steps.")],[m("What is the cheapest DR strategy?",["Active-Active","Backup & Restore","Pilot Light","Warm Standby"],1,"Backup & Restore is cheapest but slowest."),m("What is Pilot Light?",["Full DR infra","Minimal core infra in DR","No DR","Manual failover"],1,"Pilot Light maintains minimal core services in DR region."),m("What does RPO of 0 mean?",["No data loss","Instant recovery","No cost","No testing"],0,"RPO=0 means zero data loss."),m("What is an Active-Active DR cost?",["Lowest","Highest","Moderate","Free"],1,"Active-Active is most expensive DR strategy."),m("What is a tabletop exercise?",["Live failover test","Team discussion of DR scenario","Infrastructure rebuild","Database restore"],1,"Tabletop: team walks through DR scenario verbally."),m("Tool for DR automation?",["AWS Systems Manager","Excel","Manual scripts","Email"],0,"AWS Systems Manager automates DR procedures.")])

addTopic("tm-active-active","Active-Active","advanced",20,["Active-Active (multi-region/multi-site) runs production workloads simultaneously in two or more locations.","All regions actively serve traffic â€” no idle standby. Traffic distributed via DNS/load balancer.","Benefits: full resource utilization, instant failover (no standby), lower latency for global users.","Challenges: data replication, conflict resolution, higher complexity and cost."],"Active-Active is like having two identical grocery stores in different neighborhoods. Both serve customers simultaneously (both active). If one store has a fire, customers just go to the other store (instant failover). Both stores need to have the same inventory (data replication).",[d("Traffic Distribution","DNS-based: Route 53 latency/geo routing distributes traffic. Load balancer-based: Anycast routes to nearest region. Application-level: client SDK picks nearest region. Goal: evenly distribute load across regions."),d("Database Replication","The hardest part of Active-Active. Synchronous: strong consistency, higher latency. Asynchronous: eventual consistency, lower latency. Conflict resolution: last-writer-wins, CRDTs, application-level merging. Aurora Global Database: one writer, multiple readers."),d("Conflict Resolution Strategies","Last Write Wins (LWW): simplest, timestamp-based. May lose data. CRDTs (Conflict-Free Replicated Data Types): automatic merging. Application-level: detect and resolve conflicts in business logic. Use case determines strategy: inventory (CRDT), user profile (LWW), financial (synchronous)."),d("Active-Active vs Active-Passive","Active-Active: all regions serve traffic, full utilization, instant failover, complex data replication. Active-Passive: one active, one standby, lower cost, simpler data replication, slower failover (standby promotion).")],"Active-Active is the gold standard for global HA. Use for critical, latency-sensitive applications. Invest in data replication strategy. Start with Active-Passive for databases, Active-Active for stateless compute. Test conflict resolution paths. Monitor replication lag.",[q("What is Active-Active?","Multiple regions actively serving traffic simultaneously."),q("Main benefit?","Instant failover â€” no standby to activate."),q("Main challenge?","Data replication and conflict resolution."),q("How is traffic distributed?","DNS latency/geo routing, Anycast, client SDK."),q("What is conflict resolution?","Handling concurrent writes to different regions for the same data."),q("What is LWW?","Last Writer Wins â€” simplest conflict resolution (timestamp-based)."),q("What are CRDTs?","Data structures that automatically merge concurrent changes without conflicts."),q("Active-Active vs Active-Passive?","AA: all active, full utilization, complex replication. AP: one active, one standby, simpler."),q("What is Aurora Global Database?","AWS multi-region DB â€” one writer region, multiple reader regions."),q("What is replication lag?","Delay between data being written in one region and available in another.")],R(10,35,100,25,"#0070f3","","US-East","Serving","","")+A(110,48,150,48,"")+R(160,35,170,25,"#28a745","","DNS / Load Balancer","Route 53 / Anycast","","")+A(330,48,370,48,"")+R(380,35,100,25,"#dc3545","","EU-West","Serving","","")+R(10,70,100,25,"#ffc107","","Asia","Serving","","")+A(110,82,150,82,"")+R(160,70,170,25,"#e83e8c","","Data Replication","Aurora Global / CRDTs","","")+A(330,82,370,82,"")+R(380,70,100,25,"#6610f2","","Shared DB","Global data","","")+T(240,120,"Active-Active: All regions serve traffic simultaneously. Data replication keeps them in sync.","9","#666","middle"),[e("Multi-Region Active-Active (Route 53 + ALB)","Traffic distribution.",codeBlock(["resource \"aws_route53_record\" \"app\" {","  latency_routing_policy { region = \"us-east-1\" }","  set_identifier = \"us-east\"","  alias {","    name = aws_lb.us-east.dns_name","    zone_id = aws_lb.us-east.zone_id","    evaluate_target_health = true","  }","}","","resource \"aws_route53_record\" \"app-eu\" {","  latency_routing_policy { region = \"eu-west-1\" }","  set_identifier = \"eu-west\"","  alias {","    name = aws_lb.eu-west.dns_name","    zone_id = aws_lb.eu-west.zone_id","  }","}"]),"Route 53 latency routing distributes traffic to nearest region."),e("Aurora Global Database","Multi-region DB.",codeBlock(["resource \"aws_rds_global_cluster\" \"global\" {","  global_cluster_identifier = \"aurora-global\"","  engine = \"aurora-mysql\"","  database_name = \"myapp\"","}","","# Primary region cluster","resource \"aws_rds_cluster\" \"primary\" {","  global_cluster_identifier = aws_rds_global_cluster.global.id","  engine = \"aurora-mysql\"","  master_username = \"admin\"","}","","# Secondary region cluster","resource \"aws_rds_cluster\" \"secondary\" {","  global_cluster_identifier = aws_rds_global_cluster.global.id","  engine = \"aurora-mysql\"","  source_region = \"us-east-1\"","}"]),"Aurora Global Database: primary for writes, secondary for reads."),e("CRDT Example (Automerge)","Conflict resolution.",codeBlock(["const { from } = require(\"@automerge/automerge\");","","let doc = from({ items: [], counter: 0 });","// User A adds item in US-East","doc = Automerge.change(doc, \"add item\", d => {","  d.items.push(\"apple\");","  d.counter++;","});","// User B adds item in EU-West simultaneously","// CRDT automatically merges both changes","// Both \"apple\" and \"banana\" are in the list","// counter = 2"]),"Automerge CRDT automatically merges concurrent edits without conflicts."),e("Kubernetes Multi-Cluster (KubeFed)","K8s Active-Active.",codeBlock(["apiVersion: types.kubefed.io/v1beta1","kind: FederatedDeployment","spec:","  template:","    spec:","      replicas: 5","  placement:","    clusters:","    - name: us-east","    - name: eu-west","    - name: ap-southeast","  overrides:","  - clusterName: us-east","    replicas: 3","  - clusterName: eu-west","    replicas: 2"]),"KubeFed deploys the same app across multiple Kubernetes clusters.")],[m("What is Active-Active?",["One active one standby","All regions serve traffic","Backup only","Manual failover"],1,"All regions actively serve traffic."),m("Main challenge?",["Cost","Data replication and conflicts","Latency","Security"],1,"Data replication between regions is the main challenge."),m("What is LWW?",["Last Written Word","Last Writer Wins","Long Write Window","Lightweight Write"],1,"Last Writer Wins â€” timestamp-based conflict resolution."),m("What are CRDTs?",["Conflict-free data types","CRUD operations","Cache types","DNS records"],0,"CRDTs automatically merge concurrent changes."),m("How is traffic distributed?",["DNS only","DNS / Anycast / Client SDK","Manual","VPN"],1,"DNS, Anycast, or client SDK distribute traffic."),m("Aurora Global Database has?",["One writer, multiple readers","Multiple writers","Single region only","No replication"],0,"Aurora Global: one primary writer region, multiple reader regions.")])

addTopic("tm-active-passive","Active-Passive","advanced",20,["Active-Passive has one active primary handling traffic and one or more passive standbys waiting to take over.","Standby can be hot (fully running but idle), warm (running but reduced), or cold (stopped, started on failover).","Simpler than Active-Active â€” no conflict resolution, easier data replication.","Trade-off: standby resources are underutilized (cost), failover takes time (standby promotion)."],"Active-Passive is like having a designated driver. One person drives (active) while the other sits in the passenger seat (passive). If the driver gets tired, they switch. This is simpler than both driving simultaneously (Active-Active), but the passenger is idle during the trip.",[d("Hot Standby","Standby is fully running with all resources allocated. Replication is synchronous or near-synchronous. Failover is fastest (seconds to minutes). Highest standby cost. Used by: AWS RDS Multi-AZ, synchronous database replication."),d("Warm Standby","Standby has core services running at reduced capacity. Replication is asynchronous. Scale up on failover. Moderate failover time (minutes). Used by: Pilot Light DR strategy."),d("Cold Standby","Standby has no resources running. Infrastructure must be provisioned on failover. Data backups restored on failover. Slowest failover (hours to days). Cheapest option. Used by: Backup & Restore DR strategy."),d("Failover Process","1. Health monitor detects primary failure. 2. DNS/LB updated to point to standby. 3. Standby promoted to active. 4. If hot: instant. If warm: scale up. If cold: provision and restore. 5. Traffic resumes. 6. Original primary becomes new standby when recovered.")],"Active-Passive is the pragmatic choice for most production systems. Use hot standby for critical services (database), warm standby for DR. Accept standby cost as insurance. Automate failover but test manually. Document promotion procedure.",[q("What is Active-Passive?","One active server, one or more standby servers waiting to take over."),q("What is hot standby?","Standby fully running, synchronous replication, fastest failover."),q("What is warm standby?","Standby running at reduced capacity, async replication, moderate failover time."),q("What is cold standby?","Standby has no resources â€” provision on failover, slowest failover."),q("Active-Passive vs Active-Active?","AP: simpler, one idle, slower failover. AA: full utilization, complex, instant."),q("What is standby promotion?","Process of making the standby the new active server."),q("What is synchronous replication?","Data written to both primary and standby before acknowledging write."),q("What is asynchronous replication?","Primary acknowledges write before data reaches standby."),q("What is split-brain?","Both servers think they're active â€” prevented by fencing/STONITH."),q("What is fencing?","Isolating the failed primary to prevent split-brain.")],R(10,35,130,25,"#0070f3","","Primary (Active)","Traffic â†’","","")+A(140,48,180,48,"")+R(190,35,150,25,"#28a745","","Health Monitor","Failover trigger","","")+A(340,48,380,48,"")+R(390,35,100,25,"#dc3545","","Standby (Passive)","Waiting","","")+R(10,70,130,25,"#ffc107","","Hot: Running, sync","Fast failover","","")+R(150,70,130,25,"#e83e8c","","Warm: Reduced, async","Moderate","","")+R(290,70,130,25,"#6610f2","","Cold: Stopped","Slow failover","","")+T(240,115,"Active-Passive: One server active, standby waits. Failover promotes standby to active.","9","#666","middle"),[e("AWS RDS Multi-AZ (Active-Passive)","DB active-passive.",codeBlock(["resource \"aws_db_instance\" \"main\" {","  engine = \"postgres\"","  multi_az = true","  # Synchronous replication to standby in another AZ","  # AWS manages failover automatically","  backup_retention_period = 7","  monitoring_interval = 5","  # On failover:","  # 1. DNS updated to standby","  # 2. Standby promoted to primary","  # 3. New standby provisioned","}"]),"AWS RDS Multi-AZ: synchronous replication to standby, automatic failover."),e("Keepalived + HAProxy Active-Passive","VIP failover.",codeBlock(["vrrp_instance VI_1 {","  state MASTER        # Primary: MASTER, Standby: BACKUP","  interface eth0","  virtual_router_id 51","  priority 100        # Primary: 100, Standby: 90","  advert_int 1","  virtual_ipaddress {","    192.168.1.100/24  # Virtual IP","  }","  track_script {","    chk_haproxy       # Check HAProxy health","  }","}"]),"Keepalived VRRP: MASTER has virtual IP, BACKUP takes over if MASTER fails."),e("Patroni (PostgreSQL HA)","Postgres active-passive.",codeBlock(["patroni: true,","scope: mydb,","namespace: /service/","postgresql:","  use_pg_rewind: true,","  use_slots: true,","  parameters:","    wal_level: replica,","    hot_standby: \"on\",","restapi:","  listen: \"0.0.0.0:8008\"","etcd:","  hosts: [\"etcd1:2379\", \"etcd2:2379\"]","# Patroni manages automatic failover + replica promotion"]),"Patroni manages PostgreSQL HA with automatic failover via DCS."),e("Terraform Active-Passive Multi-AZ","Infra as code.",codeBlock(["resource \"aws_lb_target_group\" \"primary\" {","  name = \"primary-tg\"","  health_check { enabled = true }","}","","resource \"aws_lb_target_group\" \"standby\" {","  name = \"standby-tg\"","  health_check { enabled = true }","}","","# Listener forwards to primary by default","# On failover, update listener to standby","resource \"aws_lb_listener_rule\" \"main\" {","  action {","    target_group_arn = aws_lb_target_group.primary.arn","  }","}"]),"Terraform-managed active-passive with ALB target groups.")],[m("What is active-passive?",["Both servers active","One active, one standby","No redundancy","Manual only"],1,"One active, one or more standby servers."),m("Fastest standby type?",["Cold","Warm","Hot","None"],2,"Hot standby is fully running with sync replication."),m("Cheapest standby type?",["Cold","Warm","Hot","None"],0,"Cold standby has no running resources."),m("What problem does fencing prevent?",["Data corruption","Split-brain","Slow failover","Network issues"],1,"Fencing prevents split-brain (both servers thinking they're active)."),m("What AWS service provides active-passive for RDS?",["RDS Single-AZ","RDS Multi-AZ","RDS Read Replica","Aurora Serverless"],1,"RDS Multi-AZ provides active-passive with automatic failover."),m("What is VRRP?",["Database protocol","Virtual Router Redundancy Protocol","Security protocol","DNS protocol"],1,"VRRP provides virtual IP failover between servers.")])

addTopic("tm-health-checks","Health Checks","intermediate",15,["Health checks monitor the availability and health of backend servers by sending periodic probes.","Types: TCP (port open), HTTP (200 OK), HTTPS (SSL + HTTP), custom (application-specific endpoint).","Components: check interval, timeout, healthy/unhealthy thresholds, health check endpoint.","Used by: load balancers, service mesh, orchestrators (K8s), DNS failover, circuit breakers."],"Health checks are like a parent checking on their kids every 30 minutes. They knock on the door (probe). If the kid answers 'I'm fine' (HTTP 200), all good. If no answer for 3 tries, they enter the room (remove from rotation). They keep checking even after removal (recovery detection).",[d("Health Check Types","TCP: checks port is open (telnet). Simple, no app logic validation. HTTP: GET /health, expects 200. Validates the HTTP server is running. HTTPS: HTTP + TLS check. Custom: checks specific app logic (DB connection, cache, disk space). HTTP is most common."),d("Health Check Parameters","Interval: how often (5-30s). Timeout: max wait for response (2-5s). Healthy threshold: consecutive successes to mark healthy (2-3). Unhealthy threshold: consecutive failures to mark unhealthy (2-5). Grace period: delay first check after startup."),d("Liveness vs Readiness (K8s)","Liveness: is the app alive? If fails â†’ restart container. Readiness: is the app ready to serve? If fails â†’ remove from Service endpoints. Startup: for slow-starting apps. Liveness checks restart unhealthy apps. Readiness checks route traffic only to ready pods."),d("Health Check Best Practices","Dedicated /health endpoint separate from business logic. Check critical dependencies (DB, cache). Keep it fast (<1s). Log health check failures separately. Set appropriate thresholds â€” too sensitive = flapping, too lenient = slow detection. Use gRPC health check for microservices.")],"Health checks are essential for automated failure detection. Use HTTP health checks with a /health endpoint. Check real dependencies but keep checks fast. Distinguish liveness (restart) from readiness (traffic). Set thresholds to avoid flapping. Monitor health check status and trends.",[q("What is a health check?","Periodic probe to verify a server is functioning correctly."),q("What is a TCP health check?","Checks if a TCP port is open â€” no application logic."),q("What is an HTTP health check?","Makes HTTP request, expects 200 OK â€” validates the web server."),q("What is a custom health check?","Application-specific endpoint checking DB, cache, disk, etc."),q("What is unhealthy threshold?","Consecutive failures before marking server unhealthy."),q("What is K8s liveness probe?","Determines if pod should be restarted."),q("What is K8s readiness probe?","Determines if pod should receive traffic."),q("What is flapping?","Server repeatedly transitioning between healthy/unhealthy."),q("What is a grace period?","Delay before first health check after startup."),q("What is gRPC health check?","gRPC health checking protocol for microservices.")],R(10,35,130,25,"#0070f3","","Probe","GET /health every 10s","","")+A(140,48,180,48,"")+R(190,35,160,25,"#28a745","","Health Checker","200 OK â†’ healthy","","")+A(350,48,380,48,"")+R(390,35,100,25,"#dc3545","","Server","/health endpoint","","")+R(10,70,170,25,"#ffc107","","2 failed: unhealthy","Remove from LB","","")+R(190,70,160,25,"#e83e8c","","3 success: healthy","Add back to LB","","")+T(240,115,"Health Checks: Periodic probes detect failures. Unhealthy servers removed from rotation.","9","#666","middle"),[e("Nginx Health Checks (Active)","Active HTTP checks.",codeBlock(["upstream backend {","  server backend1:3000;","  server backend2:3000;","","  # Active health checks (nginx plus)","  health_check interval=10s fails=3 passes=2;","}","","server {","  location / { proxy_pass http://backend; }","}"]),"Nginx active health checks with interval and threshold configuration."),e("Kubernetes Health Probes","Liveness + Readiness.",codeBlock(["apiVersion: apps/v1","kind: Deployment","spec:","  template:","    spec:","      containers:","      - name: app","        livenessProbe:","          httpGet:","            path: /healthz","            port: 8080","          initialDelaySeconds: 5","          periodSeconds: 10","        readinessProbe:","          httpGet:","            path: /ready","            port: 8080","          periodSeconds: 5","          failureThreshold: 3"]),"K8s liveness (restart) + readiness (traffic) probes."),e("Custom Health Endpoint (Node)","App-level check.",codeBlock(["app.get(\"/health\", async (req, res) => {","  const checks = {","    status: \"healthy\",","    timestamp: new Date().toISOString()","  };","  try {","    await db.query(\"SELECT 1\");","    checks.database = \"ok\";","  } catch (e) {","    checks.database = \"error\";","    checks.status = \"unhealthy\";","  }","  const status = checks.status === \"healthy\" ? 200 : 503;","  res.status(status).json(checks);","});"]),"Custom health endpoint checks database connectivity."),e("AWS NLB Health Check Config","LB health check.",codeBlock(["resource \"aws_lb_target_group\" \"app\" {","  port = 80","  protocol = \"HTTP\"","  health_check {","    enabled = true","    path = \"/health\"","    interval = 30","    timeout = 5","    healthy_threshold = 2","    unhealthy_threshold = 3","    matcher = \"200\"","  }","}"]),"AWS NLB health check configuration.")],[m("What does an HTTP health check do?",["Checks port is open","GET /health expecting 200","Ping server","Check DNS"],1,"HTTP health check sends GET and expects 200 OK."),m("What does unhealthy threshold control?",["How often to check","Failures before marking unhealthy","Timeout duration","Response size"],1,"Consecutive failures before marking unhealthy."),m("K8s liveness probe failure leads to?",["Pod restart","Traffic removal","Scaling up","Alerting"],0,"Liveness failure = restart container."),m("K8s readiness probe failure leads to?",["Pod restart","Traffic removal","Node drain","Pod deletion"],1,"Readiness failure = remove from Service endpoints."),m("What is flapping?",["Pod crashing","Server toggling healthy/unhealthy","Network partition","DNS error"],1,"Flapping = rapid transitions between healthy/unhealthy."),m("Best health check endpoint design?",["Return static page","Check critical dependencies","Return random data","Heavy computation"],1,"Health endpoint should verify critical dependencies.")])

addTopic("tm-heartbeat","Heartbeat","intermediate",10,["Heartbeat is a periodic signal between distributed system components to verify they are alive and functioning.","Unlike health checks (probe â†’ response), heartbeat is a continuous stream of 'I'm alive' signals.","Used in: cluster management (Consul, etcd, ZooKeeper), database replication, HA pairs, VRRP.","If heartbeat is missed for a threshold period, the component is assumed dead and action is taken."],"Heartbeat is like a person wearing a medical monitor that beeps every 5 seconds. If the beeping stops, an alert goes to the hospital. The monitor doesn't ask 'are you OK?' â€” it just listens for the regular beep (heartbeat). The absence of beep means something is wrong.",[d("Heartbeat vs Health Check","Health check: active probe + response. Heartbeat: passive continuous signal. Health check is request-reply. Heartbeat is 'I'm alive' broadcast. Heartbeat has lower overhead (no request processing). Health check validates application logic. Both complement each other."),d("Heartbeat in Distributed Consensus","Etcd/Raft: leader sends heartbeat to followers. Followers reset election timer on each heartbeat. If heartbeat missed, follower starts leader election. Heartbeat interval: 50-100ms. Election timeout: 150-300ms. Key for cluster stability."),d("Heartbeat in HA Pairs","Two servers exchange heartbeats over dedicated link (serial cable, dedicated NIC). If primary stops heartbeating, standby takes over. Uses VRRP/CARP for virtual IP failover. Heartbeat includes health status. Split-brain prevention: tie-breaking, STONITH, quorum."),d("Heartbeat Configuration","Interval: how often (1-10s). Miss threshold: how many missed before declaring dead (2-5). Network timeout: max wait for heartbeat packet. Dedicated network: separate from data traffic for reliability. Authentication: prevent fake heartbeats.")],"Heartbeat is essential for cluster coordination and HA pairs. Use dedicated network links for reliability. Set interval low and miss threshold moderate. Combine with health checks for comprehensive monitoring. Understand election timeouts in consensus systems.",[q("What is heartbeat?","Periodic signal between components to verify they are alive."),q("Heartbeat vs health check?","Heartbeat: passive, continuous signal. Health check: active probe + response."),q("What is heartbeat used for?","Cluster coordination, HA pairs, leader election, liveness detection."),q("What happens when heartbeat is missed?","Component is assumed dead. Failover or leader election triggered."),q("What is VRRP?","Virtual Router Redundancy Protocol â€” uses heartbeat for VIP failover."),q("What is an election timeout?","Time after missed heartbeat before new leader election starts."),q("What is split-brain?","Two nodes both think they're the leader â€” prevented by quorum/fencing."),q("What is dedicated heartbeat network?","Separate network link for heartbeats, isolated from data traffic."),q("What is STONITH?","Shoot The Other Node In The Head â€” force-reset the failed node."),q("What is quorum?","Minimum number of nodes needed for cluster decisions.")],R(10,35,130,25,"#0070f3","","Node A (Leader)","Sends heartbeat","","")+A(140,48,200,48,"")+R(210,35,140,25,"#28a745","","Heartbeat Channel","Every 100ms","","")+A(350,48,410,48,"")+R(420,35,70,25,"#dc3545","","Node B","Receives","","")+R(10,70,130,25,"#ffc107","","Missed 3 heartbeats","â†’ Election triggered","","")+R(150,70,140,25,"#e83e8c","","New leader elected","Node B becomes leader","","")+T(240,115,"Heartbeat: Nodes exchange periodic 'I'm alive' signals. Missed heartbeats trigger failover or re-election.","9","#666","middle"),[e("Consul Health Check (Heartbeat)","Service heartbeat.",codeBlock(["# Agent-level heartbeat","check = {","  id: \"service:web\",","  name: \"Web App Heartbeat\",","  ttl: \"10s\",","  notes: \"Service must send heartbeat every 10s\"","}","","# Service sends heartbeat via API","# consul agent -service-id web","# curl -X PUT localhost:8500/v1/agent/check/pass/service:web","# If TTL expires: check is marked as \"critical\""]),"Consul TTL-based heartbeat â€” service must periodically report health via API."),e("Etcd Raft Heartbeat","Leader heartbeat.",codeBlock(["# Etcd automatically sends heartbeats between cluster nodes","# Configuration:","etcd --heartbeat-interval=100 \\","  --election-timeout=1000","","# heartbeat-interval: ms between leader heartbeats","# election-timeout: ms before follower starts election","# Default: 100ms heartbeat, 1000ms election","# Tune for network latency: lower for fast LAN, higher for WAN"]),"Etcd Raft heartbeat interval and election timeout configuration."),e("Linux-HA Heartbeat Configuration","HA pair heartbeat.",codeBlock(["# /etc/ha.d/ha.cf","keepalive 2           # Heartbeat interval (seconds)","deadtime 10           # Miss threshold (seconds)","warntime 5            # Warning threshold","initdead 30           # Startup delay","udpport 694           # UDP port","bcast eth1            # Dedicated heartbeat NIC","node node1.primary","node node2.standby","crm yes"]),"Linux-HA heartbeat configuration with dedicated network interface."),e("Keepalived VRRP Heartbeat","VIP heartbeat.",codeBlock(["vrrp_instance VI_1 {","  state MASTER","  interface eth0","  virtual_router_id 51","  priority 100","  advert_int 1          # Heartbeat every 1s","  authentication {","    auth_type PASS","    auth_pass secret123","  }","  virtual_ipaddress {","    192.168.1.100","  }","}"]),"Keepalived VRRP sends heartbeat advertisements every 1s for VIP failover.")],[m("What is a heartbeat?",["Health check request","Periodic alive signal","Configuration file","Log entry"],1,"Heartbeat is a periodic 'I'm alive' signal."),m("Heartbeat vs health check?",["Same thing","Heartbeat passive, health check active","Opposite","Unrelated"],1,"Heartbeat is passive (signal), health check is active (probe)."),m("What triggers a leader election?",["Heartbeat received","Heartbeat timeout","New node joins","Configuration change"],1,"Missing heartbeats trigger leader election."),m("What is VRRP?",["Database protocol","Virtual IP failover","Container runtime","Load balancer"],1,"VRRP uses heartbeat for virtual IP failover."),m("What is STONITH?",["Shoot The Other Node","Security protocol","Storage protocol","DNS record"],0,"STONITH isolates or resets the failed node."),m("What prevents split-brain?",["Faster network","Quorum and fencing","More heartbeats","Larger cluster"],1,"Quorum and fencing prevent split-brain.")])

addTopic("tm-latency-routing","Latency Based Routing","advanced",15,["Latency-based routing directs traffic to the server/region with the lowest measured latency for each client.","AWS Route 53 latency routing: routes to region with lowest latency based on network measurements.","Benefits: best performance for each user, global load distribution, fault tolerance.","Requires: latency measurement infrastructure, multi-region deployment, global DNS."],"Latency-based routing is like Waze GPS navigation. When you ask for directions, Waze checks real-time traffic on all routes and picks the fastest one for you. Similarly, when a user connects, the system measures which server region responds fastest and routes them there.",[d("How Latency Routing Works (Route 53)","Route 53 maintains latency tables: measured latency between AWS regions and client ISPs. On DNS query, Route 53 evaluates latency to each region and returns the IP of the lowest-latency region. Latency is measured via internal AWS probes. DNS record has TTL (60-300s) to avoid excessive queries."),d("Proximity Routing (GCP)","Google Cloud Traffic Director uses proximity routing. Routes to the closest backend based on geographic distance. Supports load balancing weights. Can define custom distance functions."),d("Latency-Based vs Geo Routing","Geo: routes based on geographic region (client IP â†’ continent/country). Simpler, static rules. Latency: routes based on actual measured performance. Adapts to network conditions. Geo is coarse, latency is accurate."),d("Implementation Requirements","Multi-region deployment of identical stacks. Global database replication (Aurora Global). Shared cache layer (Global Datastore for Redis). Health checks in all regions. DNS with low TTL. Monitor latency changes over time.")],"Latency-based routing optimizes for real user performance. Use Route 53 latency routing for global workloads. Combine with health checks for fault tolerance. Set appropriate TTL (60-300s). Monitor latency changes and adjust. For web apps, pair latency routing with global CDN.",[q("What is latency-based routing?","Route traffic to the server with lowest measured latency for each client."),q("How does Route 53 implement it?","Maintains latency tables between AWS regions and client ISPs."),q("Difference from geo routing?","Geo: static region-based. Latency: dynamic, measured performance."),q("What is proximity routing?","GCP routing based on geographic distance to region."),q("What TTL is appropriate?","60-300 seconds â€” balances freshness vs DNS query volume."),q("What infrastructure is needed?","Multi-region deployment, global DB replication, shared cache."),q("What is a latency table?","Measured latency values between regions and client networks."),q("How does latency routing handle failover?","If lowest-latency region is unhealthy, Route 53 routes to next-best."),q("Can latency routing combine with weights?","Yes â€” weighted latency routing distributes with latency preference."),q("What is a good use case?","Global API endpoints, real-time apps, multi-region web apps.")],R(10,35,130,25,"#0070f3","","Client (US)","measuring latency","","")+A(140,48,180,48,"")+R(190,35,160,25,"#28a745","","Route 53","Latency table â†’ US-East","","")+A(350,48,390,48,"")+R(400,35,90,25,"#dc3545","","US-East","10ms","","")+R(400,70,90,25,"#ffc107","","EU-West","100ms","","")+R(10,70,170,25,"#e83e8c","","Client (EU)","measuring latency","","")+A(180,82,190,82,"")+R(10,105,170,25,"#6610f2","","Latency Table","US: 10ms, EU: 100ms, Asia: 200ms","","")+T(240,140,"Latency Routing: Route 53 measures client latency to each region and routes to fastest.","9","#666","middle"),[e("Route 53 Latency Routing","AWS latency routing.",codeBlock(["resource \"aws_route53_record\" \"app\" {","  latency_routing_policy { region = \"us-east-1\" }","  set_identifier = \"us-east\"","  alias {","    name = aws_lb.us-east.dns_name","    zone_id = aws_lb.us-east.zone_id","    evaluate_target_health = true","  }","}","","resource \"aws_route53_record\" \"app-eu\" {","  latency_routing_policy { region = \"eu-west-1\" }","  set_identifier = \"eu-west\"","  alias {","    name = aws_lb.eu-west.dns_name","    zone_id = aws_lb.eu-west.zone_id","  }","}"]),"Route 53 latency routing distributes to fastest region per client."),e("GCP Traffic Director Proximity","GCP proximity.",codeBlock(["apiVersion: networking.gke.io/v1","kind: Service","metadata:","  name: my-app","  annotations:","    cloud.google.com/l4-rbs: \"enabled\"","spec:","  type: LoadBalancer","  externalTrafficPolicy: Local","  # GCP routes to nearest healthy backend","  # based on geographic proximity"]),"GCP Traffic Director proximity routing to nearest backend."),e("Global Accelerator with Latency","AWS Global Accelerator.",codeBlock(["resource \"aws_global_accelerator\" \"app\" {","  name = \"app-accelerator\"","  attributes {","    flow_logs_enabled = true","  }","}","","# GA uses anycast + AWS backbone","# Automatically routes to nearest healthy endpoint","# Lower latency: 60% improvement over public internet","# Built-in health checks and failover"]),"AWS Global Accelerator uses anycast and AWS backbone for optimal routing."),e("Multi-Region with Latency Routing + CDN","Full global setup.",codeBlock(["# Architecture:","# 1. CloudFront CDN at edge (static + caching)","# 2. Route 53 latency routing to regional ALBs","# 3. Regional ECS/Fargate clusters","# 4. Aurora Global Database (writer in one region)","# 5. Global Datastore for Redis (cross-region replication)","# 6. S3 cross-region replication for assets","","# Benefits:","# - Edge caching (CDN) for static content","# - Latency routing for dynamic API","# - Regional isolation for fault tolerance"]),"Global architecture combining CDN, latency routing, and multi-region compute/database.")],[m("What does latency routing optimize?",["Cost","Performance","Security","Compliance"],1,"Latency routing optimizes for best user performance."),m("How does Route 53 measure latency?",["DNS probes","Internal latency tables","User reports","ICMP pings"],1,"Route 53 maintains internal latency tables."),m("Difference from geo routing?",["Geo is dynamic","Geo is static region-based","Same thing","Geo is faster"],1,"Geo routing uses static rules; latency uses measured performance."),m("What TTL for latency routing?",["3600s","60-300s","1s","86400s"],1,"60-300s balances freshness and DNS query volume."),m("What if fastest region is unhealthy?",["Route to next-best","Return error","Retry","Fallback to geo"],0,"Route 53 routes to next-lowest latency region."),m("What AWS service uses anycast + AWS backbone?",["CloudFront","Global Accelerator","Route 53","Direct Connect"],1,"Global Accelerator uses anycast and AWS backbone for optimal routing.")])

addTopic("tm-weighted-routing","Weighted Routing","intermediate",15,["Weighted routing distributes traffic across multiple backends according to assigned weights (percentages).","Weights define the proportion of traffic each target receives. Total can sum to 100 or any value.","Use cases: canary releases, A/B testing, gradual migrations, multi-region traffic distribution.","Supported by: DNS (Route 53 weighted records), load balancers (weighted target groups), service mesh (Istio, Envoy)."],"Weighted routing is like a school dividing students into classes. 50% go to Class A, 30% to Class B, 20% to Class C. The weights can change each semester. If a new teacher joins, you adjust: 40% A, 30% B, 30% C.",[d("How Weighted Routing Works","Each target gets a weight (integer). Total weight = sum of all weights. Probability of hitting target = target weight / total weight. Random selection weighted by probability. Stateless: each request is independent. For session consistency, combine with session affinity."),d("DNS Weighted Routing (Route 53)","Multiple records with same name/type, different set_identifier and weight. DNS resolver returns weighted random IP. Works at DNS level â€” affected by caching and TTL. Not all clients get exact weights due to DNS caching."),d("Traffic Splitting vs Weighted Routing","Often used interchangeably. Weighted routing is the mechanism. Traffic splitting is the use case. Weighted: assigning proportions to different targets. Canary: specific use case of weighted routing for gradual rollouts."),d("Weighted Routing Best Practices","Use integer weights for simplicity. Monitor actual traffic distribution vs intended (stats). Be aware of DNS caching effects. Combine with health checks. For precise control, use application/LB level not DNS. Gradual weight adjustments.")],"Weighted routing is the foundation for canary releases and A/B testing. Use at DNS level for regional distribution, LB level for canary, service mesh for precise control. Monitor actual vs intended distribution. Start with small weight changes.",[q("What is weighted routing?","Distributing traffic by assigned weights (percentages)."),q("How is target selected?","Random weighted selection: probability = target weight / total weight."),q("What is sum of weights?","Total of all weights. Can be 100 or any value."),q("Use cases?","Canary releases, A/B testing, gradual migrations, regional distribution."),q("DNS weighted routing limitation?","DNS caching affects distribution accuracy."),q("What is a weight?","Integer value determining proportion of traffic to a target."),q("Weighted vs traffic splitting?","Weighted is the mechanism. Traffic splitting is the use case."),q("Can weights change dynamically?","Yes â€” adjust weights to gradually shift traffic."),q("What if one target has weight 0?","It receives no traffic unless all other targets are unhealthy."),q("How to monitor weighted distribution?","Compare actual request counts per target vs expected ratios.")],R(10,35,130,25,"#0070f3","","All Traffic","100 requests/s","","")+A(140,48,180,48,"")+R(190,35,140,25,"#28a745","","Weighted Router","weights: 50 / 30 / 20","","")+A(330,48,370,48,"")+A(190,60,190,80,"")+A(190,82,190,105,"")+R(380,35,100,25,"#dc3545","","Backend A","50% (50 req/s)","","")+R(380,70,100,25,"#ffc107","","Backend B","30% (30 req/s)","","")+R(380,105,100,25,"#e83e8c","","Backend C","20% (20 req/s)","","")+T(240,155,"Weighted Routing: Traffic distributed according to assigned weights. Flexible, precise control.","9","#666","middle"),[e("Route 53 Weighted Routing","DNS weighted records.",codeBlock(["resource \"aws_route53_record\" \"v1\" {","  zone_id = aws_route53_zone.main.zone_id","  name = \"app.example.com\"","  type = \"A\"","  set_identifier = \"v1\"","  weight = 90","  ttl = 60","  records = [\"192.0.2.1\"]","}","","resource \"aws_route53_record\" \"v2\" {","  set_identifier = \"v2\"","  weight = 10","  records = [\"203.0.113.1\"]","}","","# 90% to v1, 10% to v2"]),"Route 53 weighted records: 90% v1, 10% v2."),e("Istio Weighted Routing via VirtualService","Service mesh weights.",codeBlock(["apiVersion: networking.istio.io/v1beta1","kind: VirtualService","spec:","  hosts: [my-service]","  http:","  - route:","    - destination:","        host: my-service","        subset: v1","      weight: 80","    - destination:","        host: my-service","        subset: v2","      weight: 20","    - destination:","        host: my-service","        subset: v3","      weight: 0"]),"Istio weighted routing with subsets."),e("NGINX Weighted Load Balancing","Server weights.",codeBlock(["upstream backend {","  server backend1.example.com weight=5;","  server backend2.example.com weight=3;","  server backend3.example.com weight=2;","}","","# Out of 10 requests:","# backend1: 5, backend2: 3, backend3: 2","# NGINX uses weighted round-robin"]),"NGINX weighted upstream servers."),e("Traefik Weighted Round Robin","WRR service.",codeBlock(["http:","  services:","    app:","      weighted:","        services:","        - name: app-v1","          weight: 80","        - name: app-v2","          weight: 20"]),"Traefik weighted round robin service."),e("Gradual Weight Migration (Script)","Progressive weight shift.",codeBlock(["#!/bin/bash","# Gradual canary: shift 10% every 5 minutes","WEIGHTS=(10 20 30 40 50 60 70 80 90 100)","for w in \"${WEIGHTS[@]}\"; do","  canary_weight=$w","  stable_weight=$((100 - w))","  echo \"Canary: $canary_weight%, Stable: $stable_weight%\"","  # Update Route 53 / Istio weights","  ./update-weights.sh --canary $canary_weight","  sleep 300","done","echo \"Migration complete: 100% canary\""]),"Script for gradual weight-based traffic migration.")],[m("What determines proportion in weighted routing?",["Server speed","Weight value","Response time","CPU load"],1,"Weights determine traffic proportion."),m("Limitation of DNS weighted routing?",["Slow DNS propagation","Caching skews distribution","Not secure","Expensive"],1,"DNS caching causes actual distribution to differ from intended."),m("Weighted routing is ___? ___ is the use case.",["Traffic splitting","Load balancing","Mechanism / Use case","DNS / HTTP"],2,"Weighted routing is the mechanism; traffic splitting is the use case."),m("How to monitor weighted distribution?",["Compare request counts vs expected ratios","Check log files","Ping servers","Check SSL certs"],0,"Monitor actual request distribution vs intended weights."),m("What tool supports weighted routing?",["Istio VirtualService","Docker compose","Cron","Git"],0,"Istio VirtualService supports weighted routing."),m("What weight means a target gets no traffic?",["weight=1","weight=0","weight=-1","weight=100"],1,"weight=0 means no traffic unless all others unhealthy.")])

// ---- GENERATE ----
var dataDir = __dirname;

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["traffic-management"] = TOPICS_DATA["traffic-management"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["traffic-management"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated Traffic Management topics: ' + Object.keys(topics).length);
