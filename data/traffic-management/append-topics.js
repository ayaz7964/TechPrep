// This script generates the remaining topics for gen-tm.js
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'gen-tm.js');

const helpers = `
/* =================== 7: Host Routing =================== */
addTopic("tm-host-routing", "Host Routing", "beginner", 10,
  ["Host routing directs requests based on the Host header (domain or subdomain).",
   "Example: api.example.com → API service, app.example.com → Web App, admin.example.com → Admin Panel.",
   "Each virtual host can have its own routing rules, SSL certificates, and backend configuration.",
   "Enables multi-tenant architecture where each tenant has a dedicated subdomain."
  ],
  "Host routing is like an office building directory. The building has separate entrances for different companies. Visitors enter through the door labeled with their company name. Similarly, api.example.com goes to the API backend, admin.example.com goes to the admin backend.",
  [
    d("Virtual Hosting", "Single server handles multiple domains. The Host HTTP header tells the server which domain the client requested. Server matches the Host header against configured virtual hosts. Each virtual host has its own document root, SSL cert, and configuration."),
    d("Wildcard Host Routing", "*.example.com matches any subdomain. blog.example.com, shop.example.com, api.example.com all match. Used for multi-tenant SaaS platforms. Tenant-specific subdomains: tenant1.app.example.com, tenant2.app.example.com."),
    d("Host vs Path Routing", "Host routing: different domains → different backends (api.example.com vs app.example.com). Path routing: same domain, different paths → different backends (example.com/api vs example.com/app)."),
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
  R(10,35,140,25,"#0070f3","","api.example.com","→ API Service") +
  R(10,65,140,25,"#28a745","","app.example.com","→ Web App") +
  R(10,95,140,25,"#ffc107","","admin.example.com","→ Admin Panel") +
  R(10,125,140,25,"#e83e8c","","*.customers.com","→ Multi-Tenant") +
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
      '      rule: "Host(\`api.example.com\`)"',
      "      service: api-service",
      "    app-router:",
      '      rule: "Host(\`app.example.com\`)"',
      "      service: app-service",
      "    tenant-router:",
      '      rule: "HostRegex(\`{tenant:[a-z]+}.app.example.com\`)"',
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
      "# DNS: *.example.com → 192.0.2.1",
      "server {",
      "  listen 80;",
      "  server_name *.example.com;",
      '  if ($host ~ ^(.+)\\.example\\.com$) { set $subdomain $1; }',
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
    d("How DNS Routing Works", "User types domain → DNS resolver queries authoritative DNS server → DNS returns IP based on routing policy → client connects to returned IP. DNS responses have TTL (Time to Live). Lower TTL means faster failover but more DNS queries."),
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
  R(10,70,170,25,"#6610f2","","GeoDNS: US→US IP","Regional routing") +
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
      "#   US, Canada → us-east-1 ALB",
      "#   Europe → eu-west-1 ALB",
      "#   Asia → ap-southeast-1 ALB",
      "#   Default → us-east-1 ALB",
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
    d("Header/Cookie-Based Splitting", "More precise: route specific users based on headers or cookies. Example: X-Canary header → canary. Cookie hash → deterministic. Enables consistent user experience (same user always sees same version)."),
    d("Traffic Mirroring (Shadowing)", "Send a copy of traffic to new version without affecting response. Mirrored traffic is dark — responses ignored. Used for testing with production traffic. No risk to users. Supported by Istio, Envoy, NGINX."),
    d("Gradual Rollout Strategies", "Start 1% → monitor → 5% → monitor → 25% → 50% → 100%. Auto-rollback if error rate exceeds threshold. Canary analysis compares metrics between old and new.")
  ],
  "Traffic splitting enables safe, gradual rollouts. Start small (1-5%), monitor aggressively, increase gradually. Use header/cookie-based splitting for deterministic routing. Traffic mirroring lets you test with production data risk-free.",
  [
    q("What is traffic splitting?", "Dividing traffic between different versions by configurable percentages."),
    q("Difference between splitting and load balancing?", "Splitting: different versions for testing. Balancing: identical servers for capacity."),
    q("What is traffic mirroring?", "Sending a copy of production traffic to a new version without affecting live response."),
    q("What is a typical canary sequence?", "1% → 5% → 25% → 50% → 100% with monitoring and auto-rollback."),
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
  R(10,70,150,25,"#e83e8c","","Gradual: 1%→5%→50%→100%","Progressive") +
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
      "    - match: { prefix: \"/\" }",
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
      '  split_clients "\${remote_addr}\${http_user_agent}" $variant {',
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
    d("Progressive Delivery Pipeline", "Build → Deploy canary (1%) → Smoke tests → Analyze → Auto-promote if healthy → 25% → Analyze → 50% → 100%. Each stage has gates. Auto-rollback if any gate fails."),
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
  R(10,105,170,25,"#6610f2","","Auto-promote: 10%→25%→50%→100%","Progressive") +
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
   "Deploy new version to inactive environment → smoke tests → switch traffic → old becomes standby.",
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
  R(10,35,130,70,"#0070f3","","Blue (Active)","Serving 100%\\nv1") +
  A(140,70,180,70) +
  R(190,35,150,70,"#28a745","","Router / LB","Switch point") +
  A(340,70,380,70) +
  R(390,35,90,70,"#dc3545","","Green (Standby)","v2 ready") +
  R(10,120,130,55,"#ffc107","","Switch →","Flip to Green") +
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
`;

fs.writeFileSync(filePath, fs.readFileSync(filePath, 'utf8') + helpers);
console.log('Topics 7-12 written');
