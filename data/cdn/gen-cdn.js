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

/* =================== TOPIC 1: CDN Fundamentals =================== */
addTopic('cdn-fundamentals', 'CDN Fundamentals', 'beginner', 20,
  ['A CDN (Content Delivery Network) is a distributed network of servers that delivers web content to users based on their geographic location.',
   'CDNs reduce latency by caching content on edge servers closer to end users, minimizing the distance data must travel.',
   'Key benefits: faster page loads, reduced bandwidth costs, increased content availability and redundancy, improved security against DDoS attacks.',
   'CDNs handle both static content (images, CSS, JS) and dynamic content (API responses, HTML pages) through various optimization techniques.'
  ],
  'A CDN is like a chain of neighborhood grocery stores instead of one giant supermarket downtown. Instead of everyone traveling to the city center for milk, you walk to your local store. The store keeps the popular items stocked locally, and if you need something rare, it fetches it from the central warehouse. Everyone gets their milk faster.',
  [
    d('How CDNs Work', 'When a user requests content, the CDN routes the request to the nearest edge server. If the edge server has the content cached, it serves it directly (cache hit). If not, it fetches from the origin server, caches it, and serves it. This reduces latency by 50-80% for users far from the origin.'),
    d('CDN Architecture Components', 'Origin server: the source of truth where original content lives. Edge servers: distributed cache nodes at Points of Presence (PoPs) worldwide. Request routing: DNS-based or Anycast routing directs users to the nearest edge. Caching layer: stores copies of content with configurable TTLs.'),
    d('CDN Benefits Beyond Speed', 'DDoS mitigation: CDNs absorb large traffic spikes across their distributed infrastructure. SSL/TLS termination: edge servers handle encryption, reducing load on origin. Traffic analytics: detailed insights into global traffic patterns. Origin offload: caches can serve 90%+ of traffic, dramatically reducing origin server load.'),
    d('CDN vs Web Hosting', 'A CDN is not a replacement for web hosting. The origin server still hosts the authoritative content. The CDN sits in front as a caching and acceleration layer. Web hosting stores your site; a CDN accelerates delivery of that site globally. Many cloud providers offer integrated hosting + CDN solutions (e.g., AWS S3 + CloudFront).'),
    d('Global Reach and Scaling', 'Major CDNs have 100-300+ PoPs worldwide. Cloudflare: 330+ cities in 120+ countries. Akamai: 4100+ locations. AWS CloudFront: 600+ PoPs. This global footprint ensures consistent performance regardless of user location. CDNs automatically scale to handle traffic spikes without provisioning additional origin capacity.')
  ],
  'A CDN is a globally distributed network of proxy servers that caches content closer to users, reducing latency, offloading origin servers, and providing DDoS protection. It is essential for modern web applications serving a global audience.',
  [
    q('What is a CDN?', 'A Content Delivery Network — a distributed network of servers that delivers web content to users based on their geographic location.'),
    q('What are the main benefits of using a CDN?', 'Reduced latency, lower bandwidth costs, increased availability, improved security (DDoS mitigation), and origin server offloading.'),
    q('How does a CDN reduce latency?', 'By caching content on edge servers closer to users, reducing the physical distance data must travel.'),
    q('What is the difference between an edge server and an origin server?', 'The origin server is the source of truth; edge servers are distributed cache nodes that store copies of content closer to users.'),
    q('What is origin offload?', 'When a CDN serves cached content, reducing the number of requests that reach the origin server — often 90%+ of requests.'),
    q('Does a CDN replace web hosting?', 'No. A CDN is a caching and acceleration layer in front of your origin server. You still need an origin server.'),
    q('What is a Point of Presence (PoP)?', 'A physical location where the CDN has edge servers. More PoPs means better global coverage.'),
    q('How does a CDN protect against DDoS?', 'By absorbing attack traffic across its distributed infrastructure, preventing it from overwhelming the origin server.'),
    q('What types of content can a CDN accelerate?', 'Both static (images, CSS, JS) and dynamic (API responses, HTML) content.'),
    q('What is Anycast routing?', 'A networking technique where multiple servers share the same IP address; traffic routes to the nearest server automatically.')
  ],
  R(10,35,110,25,'#0070f3','','Origin Server','Source of truth') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','Edge Servers','Distributed cache') +
  A(290,48,320,48) +
  R(330,35,150,25,'#ffc107','','End Users','Nearest edge') +
  R(10,70,110,25,'#e83e8c','','DNS Routing','Nearest PoP') +
  R(10,100,110,25,'#dc3545','','Caching','TTL-based') +
  R(10,130,110,25,'#6610f2','','DDoS Shield','Absorb attacks') +
  R(10,160,110,25,'#17a2b8','','Analytics','Traffic insights') +
  A(120,83,150,83) + A(120,113,150,113) + A(120,143,150,143) + A(120,173,150,173) +
  R(160,70,310,140,'#17a2b8','','CDN (Content Delivery Network)','Distributed network that accelerates content delivery by caching at edge servers near users.') +
  T(240,225,'CDN Fundamentals: Global network of edge servers caching content closer to users for faster, more reliable delivery.',9,'#666','middle'),
  [
    e('CDN Cache Configuration (CloudFront)', 'Setting up a basic CloudFront distribution.', codeBlock([
      'aws cloudfront create-distribution \\',
      '  --origin-domain-name mybucket.s3.amazonaws.com \\',
      '  --default-root-object index.html \\',
      '  --enabled \\',
      '  --default-cache-behavior \\',
      '    "TargetOriginId=myOrigin,',
      '     ViewerProtocolPolicy=redirect-to-https,',
      '     MinTTL=0,DefaultTTL=86400,MaxTTL=31536000,',
      '     AllowedMethods=[GET,HEAD],',
      '     CachedMethods=[GET,HEAD],',
      '     ForwardedValues={QueryString=false}"',
      '  --price-class PriceClass_All'
    ]), 'AWS CLI command to create a CloudFront distribution with standard caching settings.'),
    e('CDN Headers (Response Headers)', 'Common CDN-related response headers.', codeBlock([
      '# Server response headers showing CDN usage',
      'HTTP/1.1 200 OK',
      'Content-Type: text/html',
      'Content-Length: 4523',
      'Cache-Control: public, max-age=3600',
      'x-cache: HIT from cloudfront',
      'x-amz-cf-pop: JFK50-P1',
      'x-amz-cf-id: abc123def456',
      'Age: 234',
      'Via: 1.1 varnish-v4',
      'CF-Cache-Status: HIT',
      'CF-Ray: 4a5b6c7d8e9f-JFK'
    ]), 'Response headers indicating CDN activity — the x-cache, Age, and CF-Cache-Status headers show caching behavior.'),
    e('CDN with Nginx Reverse Proxy Cache', 'Using Nginx as a caching layer.', codeBlock([
      'proxy_cache_path /var/cache/nginx levels=1:2',
      '  keys_zone=mycache:10m max_size=1g',
      '  inactive=60m use_temp_path=off;',
      '',
      'server {',
      '  listen 80;',
      '  server_name cdn.example.com;',
      '',
      '  location / {',
      '    proxy_cache mycache;',
      '    proxy_cache_valid 200 302 60m;',
      '    proxy_cache_valid 404 1m;',
      '    proxy_cache_use_stale error timeout updating;',
      '    add_header X-Cache-Status $upstream_cache_status;',
      '',
      '    proxy_pass http://origin-server:8080;',
      '    proxy_set_header Host $host;',
      '    proxy_set_header X-Real-IP $remote_addr;',
      '  }',
      '}'
    ]), 'Nginx configured as a caching reverse proxy with cache status headers.'),
    e('CDN Integration with HTML', 'Loading resources via CDN.', codeBlock([
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '  <!-- CSS via CDN -->',
      '  <link rel="stylesheet"',
      '    href="https://cdn.example.com/css/app.abc123.css">',
      '',
      '  <!-- Font via CDN -->',
      '  <link rel="stylesheet"',
      '    href="https://fonts.cdnfonts.com/css/inter">',
      '</head>',
      '<body>',
      '  <!-- Image via CDN -->',
      '  <img src="https://cdn.example.com/img/hero.webp"',
      '       alt="Hero" loading="lazy">',
      '',
      '  <!-- JS via CDN -->',
      '  <script',
      '    src="https://cdn.example.com/js/bundle.xyz789.js"',
      '    defer></script>',
      '</body>',
      '</html>'
    ]), 'HTML page loading all static assets through a CDN for optimal performance.'),
    e('Flush CDN Cache (CloudFront)', 'Invalidating cached content.', codeBlock([
      '# Invalidate specific paths',
      'aws cloudfront create-invalidation \\',
      '  --distribution-id E123456789ABCD \\',
      '  --paths "/images/*" "/css/*"',
      '',
      '# Invalidate entire distribution',
      'aws cloudfront create-invalidation \\',
      '  --distribution-id E123456789ABCD \\',
      '  --paths "/*"',
      '',
      '# Note: invalidation costs money ($0.005 per path)',
      '# Use versioned filenames to avoid invalidations:',
      '#   style.abc123.css instead of style.css',
      '#   script.xyz789.js instead of script.js'
    ]), 'CloudFront invalidation commands to purge cached content.'),
    e('CDN Performance Testing with Curl', 'Measure CDN response times.', codeBlock([
      '# Check cache headers and response time',
      'curl -s -o /dev/null -w "\\n',
      '  HTTP Code: %{http_code}\\n',
      '  DNS Lookup: %{time_namelookup}s\\n',
      '  Connect: %{time_connect}s\\n',
      '  TLS Handshake: %{time_appconnect}s\\n',
      '  TTFB: %{time_starttransfer}s\\n',
      '  Total: %{time_total}s\\n',
      '  Speed: %{speed_download} B/s\\n" \\',
      '  -H "Cache-Control: no-cache" \\',
      '  https://cdn.example.com/image.jpg',
      '',
      '# Compare with direct origin access',
      'curl -s -o /dev/null -w "Time: %{time_total}s"',
      '  https://origin.example.com/image.jpg'
    ]), 'Curl commands to measure CDN performance and compare with direct origin access.')
  ],
  [
    m('What does CDN stand for?', ['Content Distribution Network', 'Content Delivery Network', 'Central Data Network', 'Cache Distribution Node'], 1, 'CDN = Content Delivery Network.'),
    m('What is the primary purpose of a CDN?', ['Store backups', 'Reduce latency by caching content near users', 'Host websites', 'Manage databases'], 1, 'CDNs primarily reduce latency by caching content on edge servers closer to users.'),
    m('What is a Point of Presence (PoP)?', ['A DNS record type', 'A physical location with edge servers', 'A compression algorithm', 'A caching policy'], 1, 'A PoP is a physical location where a CDN has edge servers.'),
    m('How does a CDN protect against DDoS?', ['By blocking all traffic', 'By absorbing attacks across distributed infrastructure', 'By rate limiting only', 'By shutting down the server'], 1, 'CDNs absorb DDoS traffic across their globally distributed network.'),
    m('What does origin offload mean?', ['Removing the origin server', 'Serving cached content reduces origin load', 'Offloading data to tape storage', 'Migrating to a new host'], 1, 'Origin offload means the CDN serves most requests, reducing load on the origin server.'),
    m('Which header indicates a cache hit?', ['Cache-Control', 'x-cache: HIT', 'Content-Type', 'Accept-Encoding'], 1, 'Headers like x-cache: HIT or CF-Cache-Status: HIT indicate a cache hit from the CDN.'),
    m('What is Anycast routing?', ['Traffic goes to a random server', 'Multiple servers share one IP, traffic routes to nearest', 'Traffic is broadcast to all servers', 'DNS-based routing only'], 1, 'Anycast allows multiple servers to share the same IP, automatically routing to the nearest one.'),
    m('Does a CDN replace web hosting?', ['Yes', 'No, it is an acceleration layer', 'Only for static sites', 'Only for video streaming'], 1, 'A CDN is an acceleration layer in front of an origin server, not a replacement for hosting.'),
    m('What is a common method to avoid cache invalidation?', ['Delete the cache daily', 'Use versioned filenames (fingerprinting)', 'Disable caching', 'Increase TTL forever'], 1, 'Versioned filenames (like style.abc123.css) allow permanent caching and avoid the need for invalidation.'),
    m('What percentage of traffic can a CDN typically offload?', ['About 10%', 'About 50%', '90% or more', '100%'], 2, 'CDNs can offload 90%+ of traffic from origin servers for cacheable content.')
  ]
);

/* =================== TOPIC 2: Edge Servers =================== */
addTopic('cdn-edge-servers', 'Edge Servers', 'beginner', 15,
  ['Edge servers are the distributed cache nodes in a CDN that store and serve content to end users from locations close to them.',
   'They are deployed at Points of Presence (PoPs) worldwide — physical data centers with compute, storage, and networking equipment.',
   'Edge servers handle: content caching, SSL termination, request routing, compression, image optimization, and security filtering.',
   'Modern edge servers also support serverless computing (edge functions/workers) allowing code execution at the edge.'
  ],
  'Edge servers are like local food trucks stationed in different neighborhoods. Instead of everyone driving to the central restaurant (origin server), each neighborhood has its own truck stocked with popular menu items. If your neighborhood truck doesn\'t have what you want, it calls the central kitchen to get it and adds it to its menu for next time.',
  [
    d('Edge Server Architecture', 'Each edge server runs a caching engine (Varnish, Nginx, Apache Traffic Server) configured with origin addresses and caching rules. They maintain a local disk/memory cache, connection pools to origins, and health-checking mechanisms. Modern edge servers use SSD storage for fast content retrieval.'),
    d('Request Flow Through Edge', '1. User DNS lookup resolves to nearest edge PoP. 2. Edge server receives HTTP request. 3. Checks local cache. 4. Cache hit: serve immediately. 5. Cache miss: forward to origin (or parent cache tier), cache response, serve to user. 6. Response headers include x-cache: HIT/MISS and Age header.'),
    d('Edge Cache Tiering', 'Multi-tier caching: edge (L1) to regional (L2) to origin. L1 edge servers cache popular content. Misses go to L2 regional cache (larger, serves a region). L2 misses go to origin. This reduces origin load while keeping edge storage efficient. CloudFront, Akamai, and Fastly all use multi-tier architectures.'),
    d('Edge Compute (Workers/Functions)', 'CDNs like Cloudflare Workers, Fastly Compute@Edge, and CloudFront Functions allow running JavaScript/WASM at the edge. Use cases: A/B testing, geo-based redirects, authentication checks, header modification, API aggregation — all served from the edge without touching the origin.'),
    d('Edge Server Hardware', 'Typical edge servers: high-core-count CPUs, 256GB-1TB RAM, multiple NVMe SSDs (2-8TB), 10-100Gbps network interfaces. They sit in carrier-neutral data centers with direct peering to ISPs. Power redundancy (dual power feeds), multiple network uplinks, and hardware security modules (HSMs) for key storage.')
  ],
  'Edge servers are the distributed nodes in a CDN that cache and serve content from locations close to end users. They handle caching, SSL, compression, security filtering, and increasingly support serverless compute workloads at the network edge.',
  [
    q('What is an edge server?', 'A distributed cache node in a CDN deployed at Points of Presence worldwide that serves content to nearby users.'),
    q('Where are edge servers located?', 'At Points of Presence (PoPs) — physical data centers distributed globally.'),
    q('What is multi-tier caching?', 'A hierarchical cache architecture: edge (L1) to regional (L2) to origin. Reduces origin load while keeping edge storage efficient.'),
    q('What is edge compute?', 'Running code (JavaScript/WASM) on edge servers for A/B testing, geo-redirects, authentication, and API aggregation.'),
    q('What is a cache hit vs miss at the edge?', 'Hit: edge server has content cached and serves it directly. Miss: edge must fetch from origin or parent cache tier.'),
    q('What are common caching engines used on edge servers?', 'Varnish Cache, Nginx, Apache Traffic Server, and custom proprietary engines.'),
    q('What is the Age header?', 'Indicates how many seconds the cached response has been stored on the edge server since it was fetched from the origin.'),
    q('What hardware do edge servers use?', 'High-core CPUs, 256GB-1TB RAM, NVMe SSDs, 10-100Gbps networking, redundant power and network.'),
    q('What is origin shielding?', 'A dedicated edge tier that aggregates requests to the origin, preventing cache stampedes.'),
    q('How do edge servers handle SSL?', 'They terminate SSL/TLS connections, decrypt requests, and re-encrypt when forwarding to origin (or use HTTPS throughout).')
  ],
  R(10,35,110,25,'#0070f3','','User Request','DNS to nearest') +
  A(120,48,150,48) +
  R(160,35,140,25,'#28a745','','Edge Server (L1)','Check cache') +
  A(300,48,330,48) + A(310,60,310,80) +
  R(340,35,140,25,'#ffc107','','Cache Hit?','Serve to user') +
  R(10,75,110,25,'#dc3545','','Cache Miss','Fetch from L2') +
  A(120,88,150,88) +
  R(160,75,140,25,'#e83e8c','','Regional Cache (L2)','Larger cache pool') +
  A(300,88,330,88) +
  R(340,75,140,25,'#6610f2','','Origin Server','Source of truth') +
  T(240,180,'Edge Servers: Distributed cache nodes at PoPs worldwide that serve content from locations close to users.',9,'#666','middle'),
  [
    e('Edge Server Cache Status Check', 'Using curl to see CDN edge behavior.', codeBlock([
      '# Check if a CDN is being used and cache status',
      'curl -I https://cdn.example.com/style.css',
      '',
      '# Look for these headers:',
      '# x-cache: HIT from cloudfront',
      '# x-cache: Miss from cloudfront',
      '# CF-Cache-Status: HIT',
      '# CF-Cache-Status: MISS',
      '# CF-Cache-Status: DYNAMIC',
      '# Age: 1234 (seconds since cached)',
      '# x-served-by: cache-jfk1234'
    ]), 'Use curl to check cache status headers from edge servers.'),
    e('CloudFront Regional Edge Caches', 'Configuring multi-tier caching.', codeBlock([
      '# By default CloudFront uses regional edge caches',
      '# They are automatically enabled',
      '',
      '# Regional caches sit between edge locations',
      '# and your origin server',
      '',
      '# When an edge location misses:',
      '# 1. Edge fetches from regional cache',
      '# 2. Regional cache serves if it has content',
      '# 3. Regional cache fetches from origin if needed',
      '',
      '# Benefits:',
      '# - Reduces load on origin server',
      '# - Improves cache hit ratio',
      '# - Lowers egress costs',
      '# - No additional configuration needed'
    ]), 'CloudFront automatically uses regional edge caches as a middle tier between edge locations and origin.'),
    e('Edge Worker (Cloudflare Workers)', 'Running code at the CDN edge.', codeBlock([
      '// Cloudflare Worker - runs on every edge server',
      'export default {',
      '  async fetch(request) {',
      '    const url = new URL(request.url);',
      '    const country = request.cf.country;',
      '',
      '    // Geo-based redirect at edge',
      '    if (country === "GB" &&',
      '        url.pathname.startsWith("/us/")) {',
      '      return Response.redirect(',
      '        "https://uk.example.com" + url.pathname.replace("/us/", "/uk/")',
      '      );',
      '    }',
      '',
      '    // Cache API response at edge',
      '    const cache = caches.default;',
      '    let response = await cache.match(request);',
      '    if (!response) {',
      '      response = await fetch(request);',
      '      if (response.status === 200) {',
      '        const headers = new Headers(response.headers);',
      '        headers.set("Cache-Control", "public, max-age=3600");',
      '        response = new Response(response.body, {',
      '          headers, status: response.status',
      '        });',
      '        ctx.waitUntil(cache.put(request, response.clone()));',
      '      }',
      '    }',
      '    return response;',
      '  }',
      '}'
    ]), 'Cloudflare Worker running geolocation logic at the edge server without hitting the origin.'),
    e('Varnish Edge Cache Configuration', 'Open-source edge caching engine.', codeBlock([
      '# Varnish Cache Configuration (default.vcl)',
      'vcl 4.1;',
      '',
      'backend origin {',
      '  .host = "origin.example.com";',
      '  .port = "8080";',
      '}',
      '',
      'sub vcl_recv {',
      '  # Remove cookies for static files',
      '  if (req.url ~ "\\.(css|js|png|jpg|webp|woff2)$") {',
      '    unset req.http.Cookie;',
      '  }',
      '',
      '  # Cache GET and HEAD only',
      '  if (req.method != "GET" && req.method != "HEAD") {',
      '    return (pass);',
      '  }',
      '}',
      '',
      'sub vcl_backend_response {',
      '  # Set longer TTL for static assets',
      '  if (bereq.url ~ "\\.(css|js|png|jpg)$") {',
      '    set beresp.ttl = 24h;',
      '  }',
      '}',
      '',
      'sub vcl_deliver {',
      '  # Add cache status header',
      '  if (obj.hits > 0) {',
      '    set resp.http.X-Cache = "HIT";',
      '  } else {',
      '    set resp.http.X-Cache = "MISS";',
      '  }',
      '}'
    ]), 'Varnish configuration for edge server caching with cache status headers.'),
    e('Fastly Edge Dictionary', 'Edge data store for lookups.', codeBlock([
      '# Fastly VCL using edge dictionary for config',
      '',
      '# Create a dictionary in Fastly UI:',
      '# Name: redirect_map',
      '# Items:',
      '#   /old-page -> /new-page',
      '#   /about -> /company/about',
      '#   /contact -> /get-in-touch',
      '',
      'sub vcl_recv {',
      '  # Look up redirect in edge dictionary',
      '  declare local var.target STRING;',
      '  set var.target = table.lookup(',
      '    redirect_map, req.url.path, ""',
      '  );',
      '',
      '  if (var.target != "") {',
      '    # Perform redirect at edge - no origin hit',
      '    error 750 var.target;',
      '  }',
      '}',
      '',
      'sub vcl_error {',
      '  if (obj.status == 750) {',
      '    set obj.status = 302;',
      '    set obj.http.Location = obj.response;',
      '    return (deliver);',
      '  }',
      '}'
    ]), 'Fastly edge dictionaries allow low-latency data lookups at the edge server.')
  ],
  [
    m('What is an edge server?', ['A database server', 'A distributed CDN cache node near users', 'A DNS server', 'An email server'], 1, 'Edge servers are CDN cache nodes located near end users.'),
    m('Where are edge servers deployed?', ['In the origin data center', 'At Points of Presence worldwide', 'On user devices', 'In a single location'], 1, 'Edge servers are deployed at PoPs worldwide.'),
    m('What is multi-tier caching?', ['Multiple cache types', 'A hierarchical cache: edge to regional to origin', 'Caching multiple file types', 'Parallel cache servers'], 1, 'Multi-tier caching uses a hierarchy of edge (L1) and regional (L2) caches before the origin.'),
    m('What is edge compute?', ['Database queries at the edge', 'Running code on edge servers (workers/functions)', 'Caching compute results', 'Load balancing'], 1, 'Edge compute allows running code like Cloudflare Workers on edge servers.'),
    m('What header indicates a cache hit?', ['Cache-Control', 'Age', 'X-Cache: HIT', 'Content-Length'], 2, 'Headers like X-Cache: HIT or CF-Cache-Status: HIT show a cache hit at the edge.'),
    m('What is origin shielding?', ['Encrypting origin data', 'A cache tier that aggregates requests to origin', 'Firewall for origin', 'Backup origin server'], 1, 'Origin shielding uses a dedicated cache tier to aggregate requests and protect the origin.')
  ]
);

/* =================== TOPIC 3: Edge Locations =================== */
addTopic('cdn-edge-locations', 'Edge Locations', 'beginner', 15,
  ['Edge locations are the physical data center sites where CDN edge servers are deployed — the geographic Points of Presence (PoPs).',
   'Major CDNs have hundreds to thousands of edge locations worldwide. Cloudflare has 330+ cities, AWS CloudFront has 600+ PoPs, Akamai has 4100+ locations.',
   'More edge locations means shorter distances between users and content, resulting in lower latency and faster load times.',
   'Edge locations are strategically placed in major internet hubs with direct peering to ISPs and internet exchanges for optimal connectivity.'
  ],
  'Edge locations are like Amazon fulfillment centers. Amazon doesn\'t ship every package from one central warehouse — they have fulfillment centers near major cities. If you live in Chicago, your package comes from a nearby warehouse, not from across the country. More fulfillment centers means faster delivery for everyone.',
  [
    d('Strategic Placement', 'Edge locations are placed in major metropolitan areas with high population density, near internet exchange points (IXPs), and in carrier-neutral data centers. Providers peer directly with major ISPs to minimize network hops. Locations are chosen based on traffic patterns, latency measurements, and population distribution.'),
    d('Coverage Maps', 'CDNs publish their edge location maps. Cloudflare: 330+ cities across 120+ countries. AWS CloudFront: 600+ PoPs across 90+ cities. Fastly: 60+ PoPs. Smaller CDNs may have 20-50 PoPs. Global coverage is not uniform — North America, Europe, and Asia have dense coverage; Africa and South America have fewer locations.'),
    d('How Locations Impact Performance', 'Each additional edge location reduces the average distance between users and content. Metric: 95th percentile latency. Adding a PoP in a region can reduce latency from 200ms to 20ms for users in that region. CDNs use real-time monitoring to optimize traffic routing across edge locations.'),
    d('Edge Location Selection', 'When a user requests content, the CDN selects the best edge location based on: geographic proximity (lowest latency), current server load, cache availability, and origin health. If the nearest edge location is overloaded, traffic is routed to the next closest. This dynamic routing improves reliability.'),
    d('Regional Coverage Differences', 'North America: dense coverage with PoPs in every major city. Europe: excellent coverage across all countries. Asia Pacific: good coverage in developed countries, expanding in developing markets. Middle East and Africa: limited coverage, often served from European PoPs. South America: coverage in major cities, expanding.')
  ],
  'Edge locations are the physical data center sites (PoPs) where CDN edge servers are deployed. More locations mean lower latency for users worldwide. CDNs strategically place them near internet exchanges and major population centers for optimal performance.',
  [
    q('What are edge locations?', 'Physical data center sites where CDN edge servers are deployed — also called Points of Presence (PoPs).'),
    q('How many edge locations does a typical CDN have?', 'Varies widely: Cloudflare 330+, CloudFront 600+, Akamai 4100+. Smaller CDNs may have 20-50.'),
    q('Why do more edge locations improve performance?', 'More locations mean shorter distances between users and content, reducing latency.'),
    q('Where are edge locations typically placed?', 'In major metropolitan areas near internet exchange points and carrier-neutral data centers.'),
    q('How does a CDN select which edge location to use?', 'Based on geographic proximity, current server load, cache availability, and origin health.'),
    q('What is an internet exchange point (IXP)?', 'A physical infrastructure where ISPs and CDNs connect to exchange traffic directly.'),
    q('Which continent has the most CDN edge locations?', 'North America and Europe have the densest coverage; Africa and South America have fewer.'),
    q('What happens if the nearest edge location is overloaded?', 'Traffic is automatically routed to the next closest available edge location.'),
    q('What metric measures CDN performance improvement?', '95th percentile latency reduction — adding a local PoP can reduce latency from 200ms to 20ms.'),
    q('Do all CDNs have the same number of edge locations?', 'No — it varies greatly. More locations generally means better performance but higher cost.')
  ],
  R(10,35,110,25,'#0070f3','','User in NY','Requests content') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','NY Edge PoP','Nearest location') +
  A(290,48,320,48) +
  R(330,35,150,25,'#ffc107','','User in Sydney','Far from NY PoP') +
  R(10,70,110,25,'#dc3545','','Sydney User','High latency >200ms') +
  A(120,83,150,83) +
  R(160,70,130,25,'#e83e8c','','No Sydney PoP','Served from Singapore or LA') +
  R(10,100,110,25,'#6610f2','','Ideal: Sydney PoP','Latency <20ms') +
  R(160,100,310,25,'#17a2b8','','More Edge Locations = Lower Latency','Strategically placed near users for optimal delivery.') +
  T(240,195,'Edge Locations: Physical PoPs worldwide where CDN servers live — more locations = faster content delivery.',9,'#666','middle'),
  [
    e('Listing CloudFront Edge Locations', 'Programmatic access to edge locations.', codeBlock([
      '# AWS CloudFront global edge locations (partial list)',
      '# North America:',
      '#   Ashburn, VA (x1-e) | Atlanta, GA (x1-f)',
      '#   Chicago, IL (x1-g) | Dallas, TX (x1-h)',
      '#   Los Angeles, CA (x1-l) | Miami, FL (x1-m)',
      '#   New York, NY (x1-n) | Seattle, WA (x1-s)',
      '#   San Jose, CA (x1-r) | Toronto, CA (x1-c)',
      '',
      '# Europe:',
      '#   Amsterdam, NL (x2-a) | Berlin, DE (x2-b)',
      '#   Frankfurt, DE (x2-f) | London, GB (x2-l)',
      '#   Madrid, ES (x2-m) | Milan, IT (x2-i)',
      '#   Paris, FR (x2-p) | Stockholm, SE (x2-s)',
      '',
      '# Asia Pacific:',
      '#   Hong Kong (x3-h) | Mumbai, IN (x3-m)',
      '#   Osaka, JP (x3-o) | Seoul, KR (x3-s)',
      '#   Singapore (x3-g) | Sydney, AU (x3-y)',
      '#   Tokyo, JP (x3-t)'
    ]), 'Partial list of AWS CloudFront edge locations showing global distribution.'),
    e('Checking Edge Location from Response Headers', 'Identifying which PoP served the request.', codeBlock([
      '# Check which edge location served your request',
      'curl -I https://d123.cloudfront.net/image.jpg',
      '',
      '# Look for the x-amz-cf-pop header:',
      '# x-amz-cf-pop: JFK50-P1',
      '#   JFK = New York (airport code)',
      '#   50 = specific edge location ID',
      '#   P1 = point of presence identifier',
      '',
      '# Cloudflare shows:',
      '# CF-Ray: 4a5b6c7d8e9f-JFK',
      '#   The last 3 letters = edge location code',
      '',
      '# Fastly shows:',
      '# x-served-by: cache-jfk1234-JFK'
    ]), 'Response headers reveal which specific edge location handled the request.'),
    e('Latency Test to Different CDNs', 'Compare edge location performance.', codeBlock([
      '# Compare latency to different CDN edge locations',
      '# using mtr or ping from different regions',
      '',
      '# Test from US East',
      'ping -c 5 d1g1p1e8n0a1.cloudfront.net',
      '',
      '# Test from Europe (use a tool or VPS)',
      '# ping cloudflare.com - routes to nearest edge',
      '',
      '# Use curl to measure TTFB',
      'curl -s -o /dev/null -w "TTFB: %{time_starttransfer}s \\n" \\',
      '  -H "Cache-Control: no-cache" \\',
      '  https://cdn.example.com/',
      '',
      '# Key metric: time_starttransfer = Time To First Byte',
      '# Lower TTFB = closer edge location'
    ]), 'Commands to measure latency and identify which edge location serves your requests.'),
    e('CloudFront Origin Request Policy', 'Forwarding client location to origin.', codeBlock([
      '# CloudFront adds headers that reveal edge location',
      '# These headers are automatically added:',
      '',
      '# CloudFront-Viewer-Country: US',
      '# CloudFront-Viewer-City: New York',
      '# CloudFront-Viewer-ASN: 14618',
      '# CloudFront-Viewer-Latitude: 40.7128',
      '# CloudFront-Viewer-Longitude: -74.0060',
      '',
      '# Configure in CloudFront behavior settings:',
      '# Forward these headers to origin',
      '# Origin reads them for geo-personalization',
      '',
      '# The x-amz-cf-pop header in response',
      '# shows which edge location served:',
      '# x-amz-cf-pop: JFK50-P1'
    ]), 'CloudFront forwards viewer location headers from the edge location to the origin server.'),
    e('CDN PoP Coverage Map File', 'JSON-based coverage configuration.', codeBlock([
      '// CDN edge location data structure',
      'const edgeLocations = {',
      '  "north-america": {',
      '    "us-east": ["IAD", "JFK", "ATL", "MIA"],',
      '    "us-west": ["LAX", "SFO", "SEA", "PHX"],',
      '    "us-central": ["ORD", "DFW", "DEN"],',
      '    "canada": ["YYZ", "YVR"]',
      '  },',
      '  "europe": {',
      '    "western": ["LHR", "AMS", "CDG", "FRA"],',
      '    "nordic": ["ARN", "CPH", "OSL"],',
      '    "southern": ["MAD", "MIL", "FCO"]',
      '  },',
      '  "asia-pacific": {',
      '    "east-asia": ["NRT", "ICN", "HKG", "TPE"],',
      '    "southeast": ["SIN", "KUL", "BKK"],',
      '    "oceania": ["SYD", "AKL"]',
      '  }',
      '};',
      '',
      '// Each code represents a physical PoP',
      '// IAD = Ashburn, VA; LHR = London; NRT = Tokyo'
    ]), 'JSON structure showing CDN edge location distribution by region.')
  ],
  [
    m('What is an edge location?', ['A database server location', 'A physical PoP where CDN servers are deployed', 'A user device', 'A DNS server'], 1, 'Edge locations are physical data centers where CDN edge servers live.'),
    m('What determines the best edge location for a user?', ['Random selection', 'Geographic proximity and server load', 'Alphabetical order', 'User preference'], 1, 'The closest edge location with available capacity handles the request.'),
    m('Which CDN has the most edge locations?', ['Cloudflare', 'Fastly', 'Akamai', 'Azure CDN'], 2, 'Akamai has 4100+ locations, the most of any CDN.'),
    m('What is an IXP?', ['Internet exchange point for direct ISP peering', 'Internal XML processor', 'Indexed data format', 'Input eXchange Protocol'], 0, 'Internet exchange points allow ISPs and CDNs to exchange traffic directly.'),
    m('What header shows which edge location served the request?', ['Cache-Control', 'x-amz-cf-pop', 'Content-Type', 'Accept-Encoding'], 1, 'Headers like x-amz-cf-pop show which specific edge location handled the request.')
  ]
);

/* =================== TOPIC 4: Origin Server =================== */
addTopic('cdn-origin-server', 'Origin Server', 'beginner', 15,
  ['The origin server is the authoritative source of original content — the primary server where the website or application is hosted.',
   'The CDN pulls content from the origin server when it is not cached at the edge. The origin is the fallback for cache misses.',
   'Origin servers can be: web servers (Nginx, Apache), cloud storage (S3 bucket, Google Cloud Storage), or application servers.',
   'Best practices: configure appropriate Cache-Control headers on the origin, implement health checks, use origin shielding, and ensure the origin can handle CDN fetch traffic.'
  ],
  'The origin server is the central kitchen in a restaurant chain. Local branches (edge servers) keep popular dishes ready to serve. But if someone orders something unusual, the branch calls the central kitchen to prepare it fresh. The central kitchen is the source of truth for all recipes and ingredients — without it, no branch can make anything new.',
  [
    d('Origin Server Responsibilities', 'The origin hosts the authoritative version of all content. When a CDN edge misses the cache, it makes a request to the origin. The origin responds with the content and Cache-Control headers that tell the CDN how long to cache it. The origin must be available, fast, and correctly configured for CDN usage.'),
    d('Types of Origin Servers', 'Web servers (Nginx, Apache, Caddy): serve dynamic and static content. Cloud storage (AWS S3, GCS, Azure Blob): serve static files directly. Application servers (Node.js, Python/WSGI, Ruby/Puma): generate dynamic responses. Load balancers (ELB, HAProxy): distribute traffic across multiple origin instances.'),
    d('Origin Health and Monitoring', 'CDNs continuously monitor origin health through health checks (HTTP GET to a configured path). If the origin is unhealthy, the CDN serves stale content from cache (stale-while-revalidate) or routes to a backup origin. Configure origin timeout, connection attempts, and health check intervals.'),
    d('Origin Shielding', 'A dedicated cache tier that sits between edge servers and the origin. All edge location misses go through the shield, which caches content and serves subsequent requests without hitting the origin. Prevents cache stampede (thundering herd) where many edges all miss simultaneously and overwhelm the origin.'),
    d('Origin Cache-Control Configuration', 'The origin sets TTL via Cache-Control headers. public: any cache can store. private: only browser cache (not CDN). max-age: seconds to cache. s-maxage: CDN-specific TTL (overrides max-age). stale-while-revalidate: serve stale while fetching fresh. must-revalidate: must check origin after expiry. Correct configuration is critical for CDN performance.')
  ],
  'The origin server is the authoritative source of content that the CDN pulls from. It must be properly configured with Cache-Control headers, health checks, and sufficient capacity to handle CDN fetch traffic. Origin shielding prevents cache stampedes and reduces origin load.',
  [
    q('What is an origin server?', 'The authoritative source server where original content is hosted — the CDN pulls content from it on cache misses.'),
    q('What types of servers can be origins?', 'Web servers (Nginx, Apache), cloud storage (S3, GCS), application servers (Node.js), and load balancers.'),
    q('What is origin shielding?', 'A dedicated cache tier between edge servers and the origin that aggregates requests to prevent cache stampedes.'),
    q('What is a cache stampede (thundering herd)?', 'When many edge servers all miss cache simultaneously and overwhelm the origin with requests.'),
    q('What headers control CDN caching from origin?', 'Cache-Control: max-age, s-maxage, public, private, stale-while-revalidate, must-revalidate.'),
    q('What happens when the origin is unhealthy?', 'CDN serves stale cached content (stale-while-revalidate) or routes to a backup origin.'),
    q('What is the purpose of CDN health checks?', 'To continuously monitor origin availability and route traffic away from unhealthy origins.'),
    q('What is the difference between public and private Cache-Control?', 'public allows CDN caching; private restricts caching to the browser only.'),
    q('How does s-maxage differ from max-age?', 's-maxage overrides max-age for shared caches (CDNs) while max-age applies to browser caches.'),
    q('Should an origin serve gzip-compressed content to CDNs?', 'Yes, it reduces transfer time between origin and edge servers, improving cache fill performance.')
  ],
  R(10,35,110,25,'#0070f3','','User Browser','Requests content') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','CDN Edge','Cache check') +
  A(290,48,320,48) + A(170,65,170,85) +
  R(300,35,110,25,'#ffc107','','Origin Shield','Request aggregator') +
  A(410,48,440,48) +
  R(450,35,30,25,'#dc3545','','Origin','Auth content') +
  R(160,75,130,25,'#e83e8c','','Cache HIT','Serve from edge') +
  R(160,105,130,25,'#6610f2','','Cache MISS','Fetch from origin') +
  T(240,195,'Origin Server: The authoritative source of content. CDN fetches from origin on cache misses.',9,'#666','middle'),
  [
    e('Nginx Origin CORS Configuration', 'Setting up CORS headers for CDN origin.', codeBlock([
      'server {',
      '  listen 8080;',
      '  server_name origin.example.com;',
      '',
      '  # Cache-Control for different content types',
      '  location /static/ {',
      '    root /var/www;',
      '    add_header Cache-Control "public, max-age=31536000, immutable";',
      '    expires 1y;',
      '  }',
      '',
      '  location /api/ {',
      '    proxy_pass http://app-server:3000;',
      '    # Dynamic content: short cache or no cache',
      '    add_header Cache-Control "no-cache, private";',
      '  }',
      '',
      '  # CORS for CDN access',
      '  location / {',
      '    add_header Access-Control-Allow-Origin "*";',
      '    add_header Access-Control-Allow-Methods "GET, HEAD, OPTIONS";',
      '    add_header Access-Control-Max-Age 86400;',
      '  }',
      '}'
    ]), 'Nginx origin configuration with Cache-Control and CORS headers for CDN delivery.'),
    e('S3 Bucket as CDN Origin', 'Configuring S3 as CloudFront origin.', codeBlock([
      '# Create S3 bucket with public read access policy',
      'aws s3api create-bucket \\',
      '  --bucket my-cdn-origin-bucket \\',
      '  --region us-east-1',
      '',
      '# Block public access (if using OAI)',
      'aws s3api put-public-access-block \\',
      '  --bucket my-cdn-origin-bucket \\',
      '  --public-access-block-configuration',
      '  "BlockPublicAcls=true,IgnorePublicAcls=true,',
      '   BlockPublicPolicy=true,RestrictPublicBuckets=true"',
      '',
      '# Create Origin Access Identity (OAI)',
      'aws cloudfront get-cloud-front-origin-access-identity',
      '',
      '# Bucket policy to allow CloudFront only',
      'echo \'{',
      '  "Version": "2012-10-17",',
      '  "Statement": [{',
      '    "Effect": "Allow",',
      '    "Principal": {',
      '      "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E12345"',
      '    },',
      '    "Action": "s3:GetObject",',
      '    "Resource": "arn:aws:s3:::my-cdn-origin-bucket/*"',
      '  }]',
      '}\' > policy.json',
      'aws s3api put-bucket-policy --bucket my-cdn-origin-bucket --policy file://policy.json'
    ]), 'S3 bucket configured as a private origin for CloudFront using Origin Access Identity.'),
    e('Origin Health Check Configuration', 'Setting up CDN health checks.', codeBlock([
      '# CloudFront origin health check configuration',
      '# Configured in origin settings:',
      '',
      '# Origin Domain: origin.example.com',
      '# Origin Path: /health',
      '# Connection Attempts: 3',
      '# Connection Timeout: 10 seconds',
      '# Response Timeout: 30 seconds',
      '# Keep Alive: 5 seconds',
      '',
      '# Health check response (origin side):',
      '# GET /health',
      '# Response: 200 OK',
      '# Body: {"status": "healthy"}',
      '',
      '# If health check fails N times:',
      '# CDN marks origin as unhealthy',
      '# Serves stale content from cache',
      '# Retries health check periodically',
      '',
      '# Example Nginx health endpoint:',
      'location /health {',
      '  access_log off;',
      '  return 200 "healthy\\n";',
      '  add_header Content-Type text/plain;',
      '}'
    ]), 'CDN origin health check configuration with Nginx health endpoint example.'),
    e('Origin Cache Stampede Prevention', 'Using origin shielding to prevent overload.', codeBlock([
      '# Problem: Cache Stampede (Thundering Herd)',
      '# When cache expires, many edge locations',
      '# simultaneously request the same content from origin',
      '# This overwhelms the origin server',
      '',
      '# Solution 1: Origin Shielding (CloudFront)',
      '# Regional edge cache aggregates requests',
      '# Only one request goes to origin per region',
      '# Automatically enabled in CloudFront',
      '',
      '# Solution 2: stale-while-revalidate',
      '# Serve stale content while async refresh happens',
      '# Cache-Control: public, max-age=3600,',
      '#   stale-while-revalidate=86400',
      '',
      '# Solution 3: Request collapsing (Fastly)',
      '# Fastly automatically collapses simultaneous',
      '# requests for the same URL to a single origin request',
      '',
      '# Solution 4: Use a CDN with shield tier',
      '# CloudFront regional cache, Fastly shielding,',
      '# Varnish shield nodes'
    ]), 'Techniques to prevent cache stampedes from overwhelming the origin server.'),
    e('Multiple Origin Setup (CloudFront)', 'Configuring multiple origins for failover.', codeBlock([
      '# CloudFront origin group with failover',
      'aws cloudfront create-origin-group \\',
      '  --distribution-id E123456789ABCD \\',
      '  --origin-group-config \\',
      '    "FailoverCriteria={StatusCodes=[500,502,503,504]},',
      '     Members={OriginItems=[',
      '       {OriginId=primaryOrigin},',
      '       {OriginId=secondaryOrigin}',
      '     ]}"',
      '',
      '# Primary origin: app-server-primary.example.com',
      '# Secondary origin: app-server-secondary.example.com',
      '# If primary returns 5xx, CloudFront automatically',
      '# retries the request against the secondary origin',
      '',
      '# This provides high availability',
      '# even if one origin goes down'
    ]), 'CloudFront origin groups provide automatic failover between multiple origins.')
  ],
  [
    m('What is the origin server in a CDN?', ['The CDN cache server', 'The authoritative source of original content', 'The DNS resolver', 'The load balancer'], 1, 'The origin server is the authoritative source of original content.'),
    m('What is origin shielding?', ['Encrypting origin traffic', 'A cache tier that aggregates origin requests', 'Blocking certain origins', 'Origin server firewall'], 1, 'Origin shielding aggregates edge requests to prevent cache stampedes.'),
    m('What does s-maxage do?', ['Overrides max-age for CDN caches', 'Sets browser cache time', 'Defines compression level', 'Controls SSL settings'], 0, 's-maxage overrides max-age specifically for shared caches (CDNs).'),
    m('What is a cache stampede?', ['Fast cache hits', 'Many edges miss cache simultaneously and overload origin', 'Cache warming runs', 'Cache memory overflow'], 1, 'A cache stampede occurs when many edge servers miss cache at the same time.'),
    m('What happens if the origin is unhealthy?', ['Site goes down', 'CDN serves stale cached content', 'CDN stops working', 'Users see error page'], 1, 'CDNs can serve stale content when the origin is unhealthy (stale-while-revalidate).'),
    m('Which Cache-Control value restricts caching to the browser only?', ['public', 'private', 'no-store', 'must-revalidate'], 1, 'Cache-Control: private means only browser caches can store the content, not CDNs.')
  ]
);

/* =================== TOPIC 5: Cache Hit =================== */
addTopic('cdn-cache-hit', 'Cache Hit', 'beginner', 10,
  ['A cache hit occurs when the CDN edge server has the requested content in its cache and can serve it directly without contacting the origin server.',
   'Cache hits result in the fastest response times because content is served from the edge server\'s local memory or SSD storage.',
   'The cache hit ratio (CHR) is a key CDN performance metric — the percentage of requests served from cache vs total requests.',
   'Higher cache hit ratios mean better performance, lower origin load, and reduced bandwidth costs.'
  ],
  'A cache hit is like finding the milk you need already in your neighborhood store\'s refrigerator. You grab it and pay immediately — no waiting. You don\'t need to call the central warehouse to order it. The store already knew people would want milk and kept it stocked.',
  [
    d('Cache Hit Indicators', 'Response headers indicate cache hits: x-cache: HIT (CloudFront/x-amz-cf-pop), CF-Cache-Status: HIT (Cloudflare), X-Cache: HIT (Fastly/Varnish), X-Cache-Status: HIT (Nginx). The Age header shows how many seconds ago the content was fetched from the origin.'),
    d('Factors Affecting Cache Hits', 'TTL settings (longer TTL = more hits). Cache capacity (more storage = more content cached). Content popularity (Pareto principle: 20% of content gets 80% of hits). Cache key design (including query strings reduces hit rate). Cache warming strategy (pre-fill cache during off-peak).'),
    d('Cache Hit Ratio Calculation', 'CHR = (Cache Hits / Total Requests) * 100. A good CHR is 90-95% for static content and 50-80% for mixed content. CDNs report CHR in their dashboards. Improving CHR by 1% can save significant origin bandwidth and reduce latency.'),
    d('Improving Cache Hit Ratio', 'Increase TTL for stable content. Use cache warming (pre-fetch popular content). Optimize cache keys (avoid unnecessary query string variations). Implement tiered caching. Use stale-while-revalidate to serve stale content while refreshing in background. Version static assets with fingerprints.'),
    d('Cache Hit Metrics Monitoring', 'Key metrics: CHR (overall), CHR per URL pattern, CHR per geographic region, hit bytes vs miss bytes, origin offload percentage. Monitor via CDN provider dashboards, real-time logs, and third-party monitoring tools (Datadog, Grafana). Alert on sudden CHR drops which may indicate configuration issues.')
  ],
  'A cache hit means the CDN served content from its edge cache without contacting the origin. High cache hit ratios mean faster responses, lower origin load, and reduced costs. Monitor CHR and optimize TTLs, cache keys, and cache warming to maximize hits.',
  [
    q('What is a cache hit?', 'When the CDN edge server has content cached and serves it directly without contacting the origin.'),
    q('How is a cache hit indicated in HTTP headers?', 'Headers like x-cache: HIT, CF-Cache-Status: HIT, or X-Cache: HIT in the response.'),
    q('What is cache hit ratio (CHR)?', 'The percentage of requests served from cache vs total requests. A key CDN performance metric.'),
    q('What is a good cache hit ratio for static content?', '90-95% or higher. Mixed content may achieve 50-80%.'),
    q('What does the Age header indicate?', 'How many seconds ago the cached content was originally fetched from the origin server.'),
    q('How can you increase cache hit ratio?', 'Increase TTL, use cache warming, optimize cache keys, version assets, use tiered caching, and stale-while-revalidate.'),
    q('What is the Pareto principle in CDN caching?', 'About 20% of content generates 80% of cache hits. Focus caching efforts on popular content.'),
    q('How does query string affect cache hits?', 'Each unique query string creates a separate cache entry, reducing hit ratio. Normalize query strings in cache keys.'),
    q('What is cache warming?', 'Pre-fetching and caching content during off-peak hours to ensure it is available when users request it.'),
    q('What causes a sudden drop in cache hit ratio?', 'TTL changes, cache configuration updates, origin changes, cache purging, or traffic pattern shifts.')
  ],
  R(10,35,110,25,'#0070f3','','User Request','Resource URL') +
  A(120,48,150,48) +
  R(160,35,120,25,'#28a745','','Edge Cache','Check cache') +
  A(280,48,310,48) +
  R(320,35,140,25,'#ffc107','','Cache HIT?','Serve immediately') +
  R(10,70,110,25,'#e83e8c','','Cache MISS','Fetch from origin') +
  A(120,83,150,83) +
  R(160,70,120,25,'#dc3545','','Origin Server','Generate response') +
  A(280,83,310,83) +
  R(10,105,110,25,'#6610f2','','Serve to User','Low latency (<10ms)') +
  R(160,105,120,25,'#17a2b8','','Cache + Store','Update cache') +
  T(240,190,'Cache Hit: Content served from edge cache without contacting origin — fastest possible response.',9,'#666','middle'),
  [
    e('Check Cache Status with Curl', 'Verifying cache hits.', codeBlock([
      '# Check if a URL is served from CDN cache',
      'curl -I https://cdn.example.com/style.css',
      '',
      '# Example output showing cache hit:',
      '# HTTP/2 200',
      '# content-type: text/css',
      '# cache-control: public, max-age=31536000',
      '# x-cache: Hit from cloudfront',
      '# age: 72834',
      '# cf-cache-status: HIT',
      '',
      '# x-cache: Hit = CloudFront edge cache hit',
      '# age: 72834 = content has been cached',
      '#         for 72,834 seconds (~20 hours)',
      '# cf-cache-status: HIT = Cloudflare cache hit'
    ]), 'Using curl to verify CDN cache hits through response headers.'),
    e('CloudFront Cache Statistics', 'Viewing CHR in CloudWatch.', codeBlock([
      '# CloudFront cache hit metrics via AWS CLI',
      'aws cloudwatch get-metric-statistics \\',
      '  --namespace AWS/CloudFront \\',
      '  --metric-name HitRatio \\',
      '  --dimensions Name=DistributionId,Value=E123456789ABCD',
      '  --start-time 2024-01-01T00:00:00Z \\',
      '  --end-time 2024-01-02T00:00:00Z \\',
      '  --period 3600 \\',
      '  --statistics Average',
      '',
      '# View cache hit metrics by behavior',
      'aws cloudfront get-distribution \\',
      '  --id E123456789ABCD \\',
      '  --query "Distribution.DistributionConfig"',
      '',
      '# Check total requests and hits',
      'aws cloudfront get-distribution-statistics \\',
      '  --distribution-id E123456789ABCD'
    ]), 'AWS CLI commands to check CloudFront cache hit ratio metrics.'),
    e('Nginx Cache Hit Status with Upstream', 'Nginx caching proxy status.', codeBlock([
      'server {',
      '  listen 80;',
      '  server_name cdn.example.com;',
      '',
      '  location / {',
      '    proxy_cache mycache;',
      '    proxy_pass http://origin;',
      '',
      '    # Show cache status in response header',
      '    add_header X-Cache-Status $upstream_cache_status;',
      '',
      '    # Values:',
      '    # HIT — served from cache',
      '    # MISS — not in cache, fetched from origin',
      '    # EXPIRED — cache expired, revalidated',
      '    # STALE — served stale, origin unavailable',
      '    # UPDATING — cache update in progress',
      '    # BYPASS — cache bypassed (proxy_cache_bypass)',
      '  }',
      '}',
      '',
      '# Test:',
      '# curl -I https://cdn.example.com/test.jpg',
      '# X-Cache-Status: HIT'
    ]), 'Nginx proxy cache configuration with $upstream_cache_status showing cache hit/miss.'),
    e('Cache Hit Ratio Calculation Script', 'Calculating CHR from logs.', codeBlock([
      '# Parse CDN access logs to calculate CHR',
      '#!/bin/bash',
      '# Sample log format:',
      '# TIME | URL | CACHE_STATUS | BYTES',
      '',
      '# Count total requests',
      'TOTAL=$(wc -l < cdn-access.log)',
      '',
      '# Count cache hits',
      'HITS=$(grep -c "HIT" cdn-access.log)',
      '',
      '# Calculate ratio',
      'CHR=$(echo "scale=2; $HITS * 100 / $TOTAL" | bc)',
      'echo "Total requests: $TOTAL"',
      'echo "Cache hits: $HITS"',
      'echo "Cache Hit Ratio: $CHR%"',
      '',
      '# Breakdown by URL pattern',
      'echo "\\nBy content type:"',
      'grep -oE "\\.(css|js|png|jpg|html)" cdn-access.log \\',
      '  | sort | uniq -c | sort -rn'
    ]), 'Bash script to calculate cache hit ratio from CDN access logs.'),
    e('Fastly Cache Hit Dashboard via API', 'Programmatic CHR monitoring.', codeBlock([
      '# Fastly API to get cache hit ratio',
      'curl -H "Fastly-Key: $FASTLY_API_TOKEN" \\',
      '  "https://api.fastly.com/stats/service/$SERVICE_ID" \\',
      '  "?by=hour&from=2h ago&to=now"',
      '',
      '# Response includes:',
      '# {',
      '#   "status": "success",',
      '#   "data": [{',
      '#     "requests": 1234567,',
      '#     "hits": 1111111,',
      '#     "miss": 123456,',
      '#     "hit_ratio": 0.90,',
      '#     "bandwidth": 45000000000,',
      '#     "status_200": 1100000',
      '#   }]',
      '# }',
      '',
      '# Python script for alerting on low CHR:',
      'import requests, os',
      'resp = requests.get(',
      '  "https://api.fastly.com/stats/service/$SID",',
      '  headers={"Fastly-Key": os.environ["FASTLY_API_KEY"]}',
      ')',
      'chr = resp.json()["data"][0]["hit_ratio"]',
      'if chr < 0.80:',
      '  print(f"ALERT: CHR dropped to {chr:.2%}")'
    ]), 'Fastly API-based cache hit ratio monitoring with Python alerting.')
  ],
  [
    m('What is a cache hit?', ['Content fetched from origin', 'Content served from CDN cache', 'Cache miss retry', 'Cache invalidation'], 1, 'A cache hit is when content is served directly from the CDN cache without contacting the origin.'),
    m('What does the Age header indicate?', ['Content age in seconds since origin fetch', 'User age', 'Cache TTL remaining', 'Request duration'], 0, 'The Age header shows how long the cached content has been stored on the edge server.'),
    m('What is a good cache hit ratio for static content?', ['30-40%', '50-60%', '90-95%', '100%'], 2, 'A good CHR for static content is 90-95%.'),
    m('Which header indicates a cache hit?', ['Content-Type', 'Cache-Control', 'x-cache: Hit', 'Accept-Encoding'], 2, 'Headers like x-cache: Hit or CF-Cache-Status: HIT indicate a cache hit.'),
    m('What improves cache hit ratio?', ['Lower TTL', 'Longer TTL and cache warming', 'Disabling cache', 'Adding unique query params'], 1, 'Longer TTL and cache warming improve the cache hit ratio.'),
    m('How does versioned filenames affect caching?', ['Reduces hits', 'Enables permanent caching, improving hits', 'No effect', 'Prevents caching'], 1, 'Versioned filenames (fingerprints) enable immutable/permanent caching, improving hit ratio.')
  ]
);

/* =================== TOPIC 6: Cache Miss =================== */
addTopic('cdn-cache-miss', 'Cache Miss', 'beginner', 10,
  ['A cache miss occurs when the requested content is not found in the CDN edge server\'s cache, requiring the server to fetch it from the origin.',
   'Cache misses result in higher latency because the request must travel from the edge to the origin (or parent cache tier) before the content can be served.',
   'Cache misses are expected on first requests, after cache expiration, or after cache invalidation. The response is then cached for subsequent requests.',
   'Minimizing cache misses is key to CDN performance. Strategies include longer TTLs, cache warming, and optimizing cache key configuration.'
  ],
  'A cache miss is like going to your neighborhood store for milk and finding the dairy section empty. The clerk has to call the central warehouse and have them deliver it. You wait a few minutes. The good news: next time you come for milk, it will be in stock because the store learned to keep it on hand.',
  [
    d('Why Cache Misses Happen', 'First request (cold cache): nobody has requested this content before. TTL expired: the cached content\'s time-to-live has elapsed. Cache eviction: the edge server ran out of storage and removed less popular content. Cache invalidation: content was explicitly purged. Cache key mismatch: URL variations that don\'t hit the same cache entry.'),
    d('Cache Miss Penalty', 'A cache miss adds significant latency: edge to origin round trip. For a US user hitting a European origin, this could add 100-300ms. The miss penalty includes DNS resolution of origin, TCP connection, SSL handshake, origin processing time, and response transfer. The cache fill response is then stored for future hits.'),
    d('Cold Start / First Request', 'The first user to request a piece of content after deployment experiences a cache miss (cold start). This user sees higher latency. Cache warming pre-fetches content to avoid cold starts for real users. For new deployments, consider pre-loading critical assets in the CDN cache.'),
    d('Cache Miss vs Cache Hit Performance', 'Cache hit: response in 1-10ms (from edge server memory/SSD). Cache miss: response in 50-500ms (requires origin round trip). The difference is dramatic — a cache miss can be 10-50x slower. This is why maximizing cache hit ratio is critical for CDN performance.'),
    d('Monitoring Cache Misses', 'Track miss rate, miss latency (time to fill from origin), top missed URLs, miss reasons (first byte, expired, evicted). High miss rate on popular content indicates configuration problems. CDN dashboards show miss breakdowns. Alert on spikes in cache miss rate that indicate issues.')
  ],
  'A cache miss means the CDN had to fetch content from the origin, adding latency. Misses happen on first requests, after TTL expiry, or after invalidation. Minimize misses with optimal TTLs, cache warming, and proper cache key configuration. Monitor miss rates to identify optimization opportunities.',
  [
    q('What is a cache miss?', 'When requested content is not in the CDN edge cache and must be fetched from the origin server.'),
    q('Why do cache misses increase latency?', 'Because the request must travel from the edge server to the origin, adding round-trip time.'),
    q('What are common causes of cache misses?', 'First request (cold cache), TTL expiry, cache eviction, invalidation, and cache key mismatch.'),
    q('What is a cold start in CDN caching?', 'The first user request after content is deployed — the cache is empty, so it is always a miss.'),
    q('What is the typical latency difference between hit and miss?', 'Cache hit: 1-10ms. Cache miss: 50-500ms (10-50x slower).'),
    q('How can you reduce cache misses?', 'Longer TTLs, cache warming, optimizing cache keys, larger cache allocations, and tiered caching.'),
    q('What is cache eviction?', 'When the edge server removes older or less popular content to make room for new content.'),
    q('What does the x-cache: Miss header mean?', 'The CDN edge server did not have the content cached and had to fetch it from the origin or parent cache.'),
    q('How does cache key configuration affect misses?', 'Including query string parameters in the cache key creates separate entries for each variation, potentially causing misses.'),
    q('What is cache fill?', 'The process of fetching content from the origin and storing it in the edge cache after a cache miss.')
  ],
  R(10,35,110,25,'#0070f3','','User Request','Resource URL') +
  A(120,48,150,48) +
  R(160,35,120,25,'#28a745','','Edge Cache','Check cache') +
  A(280,48,310,48) +
  R(320,35,140,25,'#dc3545','','Cache MISS!','Fetch from origin') +
  A(320,60,320,80) + A(310,65,280,65) +
  R(160,75,120,25,'#ffc107','','Fetch from Origin','Requires round trip') +
  A(280,88,310,88) +
  R(320,75,140,25,'#e83e8c','','Store in Cache','Cache fill') +
  A(410,88,440,88) +
  R(10,110,110,25,'#6610f2','','Serve to User','Higher latency (50-500ms)') +
  T(240,190,'Cache Miss: Content not in edge cache. Must be fetched from origin, increasing latency. Subsequent requests will hit.',9,'#666','middle'),
  [
    e('Identifying Cache Misses with Curl', 'Check cache miss headers.', codeBlock([
      '# Force a cache miss to see the full flow',
      'curl -I https://cdn.example.com/image.jpg',
      '',
      '# Look for miss indicators:',
      '# x-cache: Miss from cloudfront',
      '# cf-cache-status: MISS',
      '# x-cache-status: MISS',
      '# age: 0 (just fetched, no age yet)',
      '',
      '# The first request will be a miss,',
      '# the second should be a hit:',
      'curl -I https://cdn.example.com/image.jpg',
      '# x-cache: Hit from cloudfront',
      '# age: 5 (cached for 5 seconds)',
      '',
      '# Simulate a cold request with no-cache:',
      'curl -s -o /dev/null -w "Time: %{time_total}s \\n" \\',
      '  -H "Cache-Control: no-cache" \\',
      '  https://cdn.example.com/image.jpg'
    ]), 'Using curl to observe cache miss headers and measure the difference between first and second request.'),
    e('Cache Miss Analysis from CDN Logs', 'Parsing logs to understand misses.', codeBlock([
      '# CloudFront log format (tab-separated)',
      '# Fields: date time x-edge-location sc-bytes c-ip cs-method',
      '#         cs-host cs-uri-stem sc-status cs-referer',
      '#         cs-user-agent cs-uri-query cs-cookie',
      '#         x-edge-result-type x-edge-request-id',
      '#         x-host-header cs-protocol cs-bytes',
      '#         time-taken x-forwarded-for',
      '',
      '# x-edge-result-type = Hit, Miss, RefreshHit,',
      '#                      Redirect, ClientError, ServerError',
      '',
      '# Parse miss URLs from CloudFront logs',
      'Get-Content cloudfront.log |',
      '  Where-Object { $_ -match "\\tMiss\\t" } |',
      '  ForEach-Object { ($_ -split "\\t")[7] } |',
      '  Sort-Object | Get-Unique | Select-Object -First 10',
      '',
      '# Top 10 most frequently missed URLs',
      'Get-Content cloudfront.log |',
      '  Where-Object { $_ -match "\\tMiss\\t" } |',
      '  ForEach-Object { ($_ -split "\\t")[7] } |',
      '  Group-Object | Sort-Object Count -Descending |',
      '  Select-Object -First 10'
    ]), 'Parsing CloudFront log format to identify most frequently missed URLs.'),
    e('Cache Warming Script', 'Pre-fetch content to avoid cold starts.', codeBlock([
      '#!/usr/bin/env node',
      '// Cache warming script',
      '// Run after deployment to pre-fill CDN cache',
      '',
      'const https = require("https");',
      '',
      'const urlsToWarm = [',
      '  "https://cdn.example.com/css/app.css",',
      '  "https://cdn.example.com/js/bundle.js",',
      '  "https://cdn.example.com/img/hero.webp",',
      '  "https://cdn.example.com/fonts/inter.woff2"',
      '];',
      '',
      'async function warmUrl(url) {',
      '  return new Promise((resolve, reject) => {',
      '    const start = Date.now();',
      '    https.get(url, (res) => {',
      '      let data = "";',
      '      res.on("data", chunk => data += chunk);',
      '      res.on("end", () => {',
      '        const ms = Date.now() - start;',
      '        const cache = res.headers["x-cache"];',
      '        console.log(`${url} -> ${cache} (${ms}ms, ${data.length} bytes)`);',
      '        resolve({ url, cache, ms });',
      '      });',
      '    });',
      '  });',
      '}',
      '',
      '(async () => {',
      '  console.log(`Warming ${urlsToWarm.length} URLs...`);',
      '  const results = await Promise.all(urlsToWarm.map(warmUrl));',
      '  const misses = results.filter(r => r.cache?.includes("Miss"));',
      '  console.log(`Done. ${misses.length} initial misses (now cached).`);',
      '})();'
    ]), 'Node.js cache warming script that pre-fetches assets to populate CDN cache after deployment.'),
    e('Understanding TTL-Based Cache Miss Flow', 'How TTL expiration triggers misses.', codeBlock([
      '# Timeline of cache life:',
      '',
      '# T=0s: User A requests /data.json',
      '#        Cache MISS -> fetch from origin',
      '#        Cache-Control: max-age=3600',
      '#        Stored in edge for 1 hour',
      '',
      '# T=5s: User B requests /data.json',
      '#        Cache HIT -> served from edge',
      '#        Age: 5',
      '',
      '# T=3600s: Cache expires',
      '#         User C requests /data.json',
      '#         Cache MISS (stale) -> revalidate or refetch',
      '#         If origin returns 304 Not Modified,',
      '#           cache refreshes TTL (soft miss)',
      '#         If origin returns 200,',
      '#           cache replaces content (hard miss)',
      '',
      '# T=3601s: User D requests /data.json',
      '#        Cache HIT (fresh TTL)'
    ]), 'Timeline showing how TTL expiration causes cache misses and how the cache refreshes.'),
    e('Preventing Cache Misses with Service Workers', 'Cache-first strategy in SW.', codeBlock([
      '// Service Worker with cache-first strategy',
      '// Prevents CDN cache misses from affecting UX',
      '',
      'self.addEventListener("fetch", (event) => {',
      '  event.respondWith(cacheFirst(event.request));',
      '});',
      '',
      'async function cacheFirst(request) {',
      '  const cache = await caches.open("cdn-cache-v1");',
      '  const cached = await cache.match(request);',
      '',
      '  if (cached) {',
      '    // Cache hit at browser level too',
      '    return cached;',
      '  }',
      '',
      '  try {',
      '    const response = await fetch(request);',
      '    if (response.status === 200) {',
      '      cache.put(request, response.clone());',
      '    }',
      '    return response;',
      '  } catch (err) {',
      '    // Even if CDN misses and fails,',
      '    // we serve stale cache if available',
      '    return cached || new Response("Offline", { status: 503 });',
      '  }',
      '}'
    ]), 'Service Worker cache-first strategy as an additional layer to handle CDN cache misses gracefully.')
  ],
  [
    m('What is a cache miss?', ['Content served from cache', 'Content not in cache, fetched from origin', 'Cache invalidation', 'Cache memory full'], 1, 'A cache miss requires fetching content from the origin.'),
    m('What is a common cause of cache misses?', ['Very long TTL', 'First request (cold cache)', 'High cache hit ratio', 'Small file size'], 1, 'First requests always cause a cache miss (cold start).'),
    m('What is the latency difference between hit and miss?', ['Same latency', 'Hit is 10-50x faster', 'Miss is faster', 'Both vary equally'], 1, 'Cache hits (1-10ms) are 10-50x faster than cache misses (50-500ms).'),
    m('What is cache eviction?', ['Adding content to cache', 'Removing old content to free space', 'Increasing TTL', 'Enabling compression'], 1, 'Cache eviction removes less popular content when storage is full.'),
    m('How can cache warming help?', ['Slows down the cache', 'Pre-fetches content to avoid cold starts', 'Reduces TTL', 'Encrypts cached content'], 1, 'Cache warming pre-fetches content so real users never experience a cold cache miss.'),
    m('What header shows the content is a cache miss?', ['x-cache: Hit', 'x-cache: Miss', 'Cache-Control: private', 'Content-Encoding: gzip'], 1, 'Headers like x-cache: Miss or CF-Cache-Status: MISS indicate a cache miss.')
  ]
);

/* =================== TOPIC 7: Cache Invalidation =================== */
addTopic('cdn-cache-invalidation', 'Cache Invalidation', 'intermediate', 20,
  ['Cache invalidation is the process of removing or updating content stored in CDN edge caches before its TTL expires.',
  'Invalidation is needed when content changes on the origin but the CDN still serves the old cached version to users.',
  'Methods: path-based purge (specific URLs), wildcard purge (pattern matching), tag-based invalidation (groups of content), and versioned filenames (avoid invalidation entirely).',
  'There is an old saying: "There are only two hard things in computer science: cache invalidation and naming things." — Phil Karlton.'
  ],
  'Cache invalidation is like recalling a batch of product packaging when you realize the ingredient list has an error. You have to go to every store (edge server) and remove all the old boxes. The tricky part: you need to know which boxes are in which stores, and you must replace them before customers see outdated information.',
  [
    d('Invalidation Methods', 'Exact path: /images/banner.jpg — invalidates one file. Wildcard: /images/* — invalidates all images. Directory: /css/ — invalidates all CSS files. Tag-based: invalidate by content tags like "v2.0-release". API-based: through CDN provider APIs. Some providers charge per invalidation path or have monthly limits.'),
    d('Versioned Filename Strategy (Cache Busting)', 'Instead of invalidating old cache, serve different filenames for updated content: style.abc123.css instead of style.css. The old content remains cached (no users request it). The new filename automatically gets its own cache entries. This is the most efficient approach — zero invalidation cost, zero cache miss penalty for updated content.'),
    d('CDN Invalidation Policies', 'CloudFront: free first 1000 paths/month, $0.005/path after. Fastly: instant purge, no charge (with limits). Cloudflare: unlimited purges via API, UI, or tag. Akamai: instant invalidation or CP code-based. Varnish: PURGE HTTP method (if configured). Most CDNs propagate invalidation within seconds globally.'),
    d('Purge Propagation Time', 'Invalidation must propagate to all edge servers worldwide. CloudFront: typically <60 seconds. Fastly: <150ms for instant purge. Cloudflare: <30 seconds. Akamai: <10 seconds. During propagation, some users may still receive the old content (eventual consistency). This is why versioned filenames are preferred.'),
    d('Tag-Based Invalidation', 'Assign content tags during cache (e.g., Cache-Tag: v2.0, product-123). Invalidate all content with a specific tag in one API call. Useful for: invalidating all pages related to a product update, all blog posts, or all content from a deployment. Supported by: Fastly (Surrogate-Key), Cloudflare (Cache-Tag), CloudFront (tags with Lambda@Edge).')
  ],
  'Cache invalidation removes or updates cached content before TTL expires. Methods include path-based purge, wildcards, and tag-based invalidation. The best strategy is to avoid invalidation entirely by using versioned filenames, which make old cache entries unreferenced and naturally expire.',
  [
    q('What is cache invalidation?', 'The process of removing or updating content in CDN caches before its TTL expires.'),
    q('Why is cache invalidation difficult?', 'Because cached content is distributed across hundreds of edge servers worldwide and must be coordinated.'),
    q('What is the best alternative to cache invalidation?', 'Versioned filenames (cache busting) — serve different filenames for updated content, avoiding the need to invalidate.'),
    q('How does tag-based invalidation work?', 'Assign tags to content during caching, then invalidate all content with a specific tag in one API call.'),
    q('How long does propagation take?', 'CloudFront: ~60s, Fastly: <150ms, Cloudflare: <30s, Akamai: <10s.'),
    q('What is the CloudFront invalidation cost?', 'First 1000 paths per month free, $0.005 per path after that.'),
    q('What is the PURGE HTTP method?', 'A non-standard HTTP method supported by some CDNs (like Varnish and Fastly) to trigger cache invalidation.'),
    q('What is eventual consistency in cache invalidation?', 'During propagation, some edge servers may still serve old content while others have already invalidated it.'),
    q('What are Surrogate-Keys?', 'Fastly\'s tag-based invalidation mechanism — set Surrogate-Key response header, then purge by key.'),
    q('Can you invalidate content on Cloudflare?', 'Yes, via UI, API, or Cache-Tag headers. Options: purge everything, by URL, by hostname, or by tag.')
  ],
  R(10,35,110,25,'#0070f3','','Content Updates','New version deployed') +
  A(120,48,150,48) +
  R(160,35,130,25,'#dc3545','','Option 1: Invalidate','Purge old cache paths') +
  A(290,48,320,48) +
  R(330,35,140,25,'#28a745','','Option 2: Versioned URLs','style.abc123.css') +
  R(10,70,110,25,'#ffc107','','Wildcard Purge','/images/*') +
  R(10,100,110,25,'#e83e8c','','Tag Purge','Cache-Tag: v2.0') +
  R(10,130,110,25,'#6610f2','','Propagation','Seconds globally') +
  A(120,83,150,83) + A(120,113,150,113) + A(120,143,150,143) +
  R(160,70,150,100,'#17a2b8','','Cache Invalidation','Removing stale cache before TTL. Use versioned filenames to avoid the need entirely.') +
  T(240,195,'Cache Invalidation: Removing cached content before TTL expires. Best avoided via versioned filenames.',9,'#666','middle'),
  [
    e('CloudFront Cache Invalidation (CLI)', 'Invalidating specific paths.', codeBlock([
      '# Invalidate specific file',
      'aws cloudfront create-invalidation \\',
      '  --distribution-id E123456789ABCD \\',
      '  --paths "/css/style.css"',
      '',
      '# Invalidate wildcard pattern',
      'aws cloudfront create-invalidation \\',
      '  --distribution-id E123456789ABCD \\',
      '  --paths "/images/*" "/js/*"',
      '',
      '# Invalidate entire distribution',
      'aws cloudfront create-invalidation \\',
      '  --distribution-id E123456789ABCD \\',
      '  --paths "/*"',
      '',
      '# Check invalidation status',
      'aws cloudfront get-invalidation \\',
      '  --distribution-id E123456789ABCD \\',
      '  --id I1234567890ABCDEF'
    ]), 'AWS CLI commands for CloudFront cache invalidation with wildcard support.'),
    e('Fastly Instant Purge via API', 'Fastly\'s near-instant invalidation.', codeBlock([
      '# Fastly purge by URL (instant)',
      'curl -X PURGE https://cdn.example.com/style.css \\',
      '  -H "Fastly-Key: $FASTLY_API_TOKEN"',
      '',
      '# Fastly purge by surrogate key (tag)',
      'curl -X POST "https://api.fastly.com/service/$SID/purge/product-123" \\',
      '  -H "Fastly-Key: $FASTLY_API_TOKEN"',
      '',
      '# Fastly purge all service content',
      'curl -X POST "https://api.fastly.com/service/$SID/purge_all" \\',
      '  -H "Fastly-Key: $FASTLY_API_TOKEN"',
      '',
      '# Set surrogate key in origin response:',
      '# Surrogate-Key: product-123 product-category-456'
    ]), 'Fastly purge API calls including URL, tag-based (surrogate key), and full purge.'),
    e('Versioned Filenames with Webpack', 'Automatic cache busting with build tools.', codeBlock([
      '// webpack.config.js',
      'module.exports = {',
      '  output: {',
      '    filename: "[name].[contenthash:8].js",',
      '    // Output: main.4a5b6c7d.js',
      '    // Content hash changes when file content changes',
      '    path: path.resolve(__dirname, "dist"),',
      '  },',
      '  plugins: [',
      '    // Generates HTML with versioned script references',
      '    new HtmlWebpackPlugin({',
      '      template: "./src/index.html",',
      '    }),',
      '  ],',
      '  // For images and fonts:',
      '  module: {',
      '    rules: [{',
      '      test: /\\.(png|jpg|webp|svg)$/,',
      '      type: "asset/resource",',
      '      generator: {',
      '        filename: "img/[name].[contenthash:8][ext]"',
      '      }',
      '    }]',
      '  }',
      '};',
      '',
      '# Result: myimg.abc123.jpg',
      '# Old: myimg.xyz789.jpg (still cached, but not used)',
      '# New content gets new URL = automatic cache busting'
    ]), 'Webpack configuration for automatic content-hash-based versioned filenames (cache busting).'),
    e('Cloudflare Cache Purge API', 'Programmatic cache purging.', codeBlock([
      '# Cloudflare purge by URLs (max 30/day free)',
      'curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d \'{"files":["https://example.com/style.css",',
      '              "https://example.com/script.js"]}\'',
      '',
      '# Cloudflare purge everything',
      'curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d \'{"purge_everything":true}\'',
      '',
      '# Cloudflare purge by tags (requires Cache-Tag header)',
      'curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d \'{"tags":["tag-v2-release"]}\''
    ]), 'Cloudflare API cache purging by URL, everything, or tags.'),
    e('Nginx Cache Purge Module', 'Invalidating Nginx cache.', codeBlock([
      '# Nginx with ngx_cache_purge module',
      '',
      'location ~ /purge(/.*) {',
      '  allow 127.0.0.1;',
      '  allow 10.0.0.0/8;',
      '  deny all;',
      '',
      '  proxy_cache_purge mycache "$1$is_args$args";',
      '}',
      '',
      '# Usage: curl -X PURGE http://cdn.local/purge/style.css',
      '# This removes /style.css from the cache',
      '',
      '# Or use proxy_cache_key to match:',
      'proxy_cache_key "$scheme$host$request_uri";',
      'proxy_cache_purge mycache "$scheme$host$1$is_args$args";',
      '',
      '# Test:',
      '# curl -I http://cdn.local/style.css',
      '# X-Cache-Status: HIT',
      '# curl -X PURGE http://cdn.local/purge/style.css',
      '# curl -I http://cdn.local/style.css',
      '# X-Cache-Status: MISS'
    ]), 'Nginx cache purge module configuration for invalidating cached content.')
  ],
  [
    m('What is the most efficient cache invalidation strategy?', ['Path-based purge', 'Versioned filenames', 'Wildcard purge', 'Tag-based purge'], 1, 'Versioned filenames avoid invalidation entirely — old content is never requested again.'),
    m('What is the CloudFront invalidation cost?', ['Free unlimited', 'First 1000 free, then $0.005/path', '$0.01 per path', 'Free up to 10000 paths'], 1, 'CloudFront offers 1000 free invalidations per month, then charges $0.005 per path.'),
    m('Which CDN offers near-instant purge (<150ms)?', ['CloudFront', 'Fastly', 'Cloudflare', 'Akamai'], 1, 'Fastly offers near-instant purge, typically completing in under 150 milliseconds.'),
    m('What are Surrogate-Keys used for?', ['Content compression', 'Tag-based cache invalidation', 'SSL termination', 'Load balancing'], 1, 'Surrogate-Keys enable tag-based invalidation in Fastly.'),
    m('What is the saying about cache invalidation?', ['"Cache is king"', '"There are only two hard things in computer science: cache invalidation and naming things"', '"Invalidate early"', '"Never invalidate cache"'], 1, 'Phil Karlton famously said this about the difficulty of cache invalidation.'),
    m('What does a content hash-based filename prevent?', ['Compression errors', 'Need for cache invalidation', 'SSL issues', 'DNS problems'], 1, 'Content hash filenames change when content changes, so old cached versions are never requested again.')
  ]
);

/* =================== TOPIC 8: Cache-Control Headers =================== */
addTopic('cdn-cache-control-headers', 'Cache-Control Headers', 'intermediate', 20,
  ['Cache-Control headers are HTTP response headers that tell browsers, CDNs, and proxies how to cache content.',
  'Directives include: max-age (seconds to cache), s-maxage (CDN-specific TTL), public/private (who can cache), no-cache (revalidate before use), no-store (never cache).',
  'Cache-Control is the primary mechanism for controlling CDN caching behavior. Incorrect configuration leads to either stale content or poor cache hit ratios.',
  'Additional directives: stale-while-revalidate (serve stale while refreshing), immutable (content never changes), must-revalidate (must check origin after expiry).'
  ],
  'Cache-Control headers are like expiration dates and storage instructions on food products. "Refrigerate after opening" is like "private" (only browser cache). "Best before 7 days" is like "max-age=604800". "Freeze for longer storage" is like "s-maxage=31536000" for CDN. Labels tell different storage locations (pantry, fridge, freezer) how long to keep each item.',
  [
    d('Core Cache-Control Directives', 'public: any cache (browser, CDN, proxy) can store. private: only browser cache can store (not CDN). no-cache: must revalidate with origin before using cached copy. no-store: never cache at all. max-age=<seconds>: maximum time to cache. s-maxage=<seconds>: overrides max-age for shared caches (CDNs).'),
    d('s-maxage vs max-age', 'max-age applies to all caches (browser + CDN). s-maxage overrides max-age specifically for shared caches (CDNs and proxies). Browser uses max-age. CDN uses s-maxage (if present) or falls back to max-age. Example: max-age=3600, s-maxage=86400 means browser caches 1 hour, CDN caches 1 day.'),
    d('Stale Content Directives', 'stale-while-revalidate=<seconds>: serve stale cached content while asynchronously fetching fresh version. Prevents cache misses from impacting users. stale-if-error=<seconds>: serve stale content if origin is unreachable. These directives dramatically improve perceived performance and reliability.'),
    d('immutable Directive', 'immutable tells the browser that the content will never change on that URL. The browser can skip revalidation entirely. Used with versioned filenames (e.g., style.abc123.css). Combined with max-age=31536000, the browser will never recheck the origin for 1 year. This is the highest-performance configuration.'),
    d('Cache-Control Precedence', 'More specific directives override general ones: s-maxage overrides max-age for CDN. no-cache overrides public/private. must-revalidate overrides stale-while-revalidate. The most restrictive directive wins. When in doubt, CDN providers document their specific Cache-Control handling behavior.')
  ],
  'Cache-Control headers are the primary mechanism for controlling CDN and browser caching. Use s-maxage to set CDN-specific TTLs, stale-while-revalidate for resilience, and immutable with versioned filenames for optimal performance. Test header configuration with curl before deploying.',
  [
    q('What is the Cache-Control header?', 'An HTTP response header that controls how browsers, CDNs, and proxies cache content.'),
    q('What is the difference between public and private?', 'public allows any cache (CDN, browser) to store content. private restricts caching to the browser only.'),
    q('What does no-cache mean?', 'The content must revalidate with the origin before every use. It can be cached, but must be checked first.'),
    q('What does s-maxage do?', 'Overrides max-age specifically for shared caches (CDNs and proxies). Browser ignores s-maxage.'),
    q('What is stale-while-revalidate?', 'A directive that allows serving stale cached content while asynchronously fetching an updated version.'),
    q('What does the immutable directive do?', 'Tells the browser the content never changes on that URL — skip revalidation entirely.'),
    q('Can you use public and private together?', 'No, they are mutually exclusive. public is the default when max-age is set.'),
    q('What happens if no Cache-Control header is set?', 'Browsers and CDNs use heuristic caching — typically cache if response is 200 and method is GET. Behavior varies.'),
    q('What is the difference between no-cache and no-store?', 'no-cache: can cache but must revalidate. no-store: never cache at all.'),
    q('How do you test Cache-Control headers?', 'Use curl -I to view response headers. Check Cache-Control, Age, and x-cache headers.')
  ],
  R(10,35,110,25,'#0070f3','','public','Any cache can store') +
  R(10,65,110,25,'#28a745','','private','Browser only') +
  R(10,95,110,25,'#ffc107','','max-age=3600','Cache for 1 hour') +
  R(10,125,110,25,'#dc3545','','s-maxage=86400','CDN caches 1 day') +
  R(10,155,110,25,'#e83e8c','','immutable','Never revalidate') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Cache-Control Directives','HTTP headers that control caching behavior across browsers, CDNs, and proxies.') +
  T(240,220,'Cache-Control: max-age, s-maxage, public/private, stale-while-revalidate, immutable — control caching behavior.',9,'#666','middle'),
  [
    e('Cache-Control for Different Content Types', 'Optimal cache header configurations.', codeBlock([
      '# Static assets (versioned) — cache forever',
      '# Cache-Control: public, max-age=31536000, immutable',
      '# For: style.abc123.css, main.xyz789.js',
      '',
      '# Static assets (unversioned) — cache moderately',
      '# Cache-Control: public, max-age=86400',
      '# For: logo.png, favicon.ico',
      '',
      '# HTML pages — short cache with revalidation',
      '# Cache-Control: public, max-age=0, must-revalidate',
      '# For: index.html, /about',
      '',
      '# API responses — no browser cache, CDN cache short',
      '# Cache-Control: no-cache, s-maxage=60',
      '# Browser: always revalidate',
      '# CDN: cache for 60 seconds',
      '',
      '# Dynamic content — never cache',
      '# Cache-Control: no-store, private',
      '# For: /api/user/profile, /cart',
      '',
      '# User-specific content',
      '# Cache-Control: private, max-age=300',
      '# Only browser caches for 5 minutes'
    ]), 'Recommended Cache-Control configurations for different content types and use cases.'),
    e('Setting Cache-Control in Nginx', 'Configuring headers on the origin.', codeBlock([
      'server {',
      '  listen 8080;',
      '  server_name origin.example.com;',
      '',
      '  # Versioned static assets (fingerprinted)',
      '  location ~* \\.(css|js)$ {',
      '    root /var/www/dist;',
      '    expires 1y;',
      '    add_header Cache-Control "public, immutable";',
      '    add_header Cache-Tag "static-assets";',
      '  }',
      '',
      '  # Images',
      '  location ~* \\.(png|jpg|jpeg|gif|webp|svg)$ {',
      '    root /var/www/images;',
      '    expires 30d;',
      '    add_header Cache-Control "public, max-age=2592000";',
      '  }',
      '',
      '  # HTML (no browser cache, CDN cache short)',
      '  location ~* \\.html$ {',
      '    root /var/www;',
      '    add_header Cache-Control "no-cache, s-maxage=60";',
      '  }',
      '',
      '  # API — never cache private data',
      '  location /api/ {',
      '    proxy_pass http://app:3000;',
      '    add_header Cache-Control "private, no-store";',
      '  }',
      '}'
    ]), 'Nginx configuration with Cache-Control headers for various content types.'),
    e('Verifying Cache-Control with Curl', 'Testing header configuration.', codeBlock([
      '# Check all cache-related headers',
      'curl -I https://cdn.example.com/style.abc123.css',
      '',
      '# Example output:',
      '# HTTP/2 200',
      '# content-type: text/css',
      '# cache-control: public, max-age=31536000, immutable',
      '# expires: Wed, 15 Jul 2026 12:00:00 GMT',
      '# last-modified: Tue, 14 Jul 2025 10:00:00 GMT',
      '# etag: "abc123def456"',
      '# age: 123456',
      '# x-cache: Hit from cloudfront',
      '# cf-cache-status: HIT',
      '',
      '# max-age=31536000 = 1 year cache',
      '# immutable = no revalidation needed',
      '# age: 123456 = cached on edge for 123456 seconds',
      '# x-cache: Hit = served from CloudFront edge'
    ]), 'Using curl to verify Cache-Control headers and CDN caching behavior.'),
    e('Cache-Control with Express (Node.js)', 'Setting headers from application code.', codeBlock([
      'const express = require("express");',
      'const app = express();',
      '',
      '// Middleware to set cache headers based on path',
      'app.use((req, res, next) => {',
      '  // Versioned assets: cache forever',
      '  if (/\.[a-f0-9]{8,}\.(css|js)$/.test(req.path)) {',
      '    res.setHeader("Cache-Control",',
      '      "public, max-age=31536000, immutable");',
      '  }',
      '  // Images: cache 30 days',
      '  else if (/\.(png|jpg|webp)$/.test(req.path)) {',
      '    res.setHeader("Cache-Control",',
      '      "public, max-age=2592000");',
      '  }',
      '  // API responses: no browser cache, CDN cache short',
      '  else if (req.path.startsWith("/api/")) {',
      '    res.setHeader("Cache-Control",',
      '      "no-cache, s-maxage=60");',
      '  }',
      '  // Default HTML',
      '  else {',
      '    res.setHeader("Cache-Control",',
      '      "public, max-age=0, must-revalidate");',
      '  }',
      '  next();',
      '});'
    ]), 'Express.js middleware setting Cache-Control headers based on file type patterns.'),
    e('stale-while-revalidate Pattern', 'Resilient caching with background refresh.', codeBlock([
      '# Cache-Control with stale-while-revalidate',
      '# max-age=60: cache for 1 minute',
      '# stale-while-revalidate=86400: for the next 24 hours,',
      '#   serve stale content while asynchronously refreshing',
      '',
      '# Header:',
      '# Cache-Control: public, max-age=60,',
      '#   stale-while-revalidate=86400',
      '',
      '# Timeline:',
      '# T=0: Fetch content, cache (max-age=60)',
      '# T=30: Request -> HIT (fresh)',
      '# T=61: TTL expired, content is stale',
      '# T=61: Request -> SERVE STALE + background refresh',
      '#        User gets instant response from cache',
      '#        Server asynchronously fetches new content',
      '#        Cache is updated with fresh content',
      '# T=90: Request -> HIT (fresh again)',
      '',
      '# Benefits:',
      '# - No cache miss penalty for users',
      '# - Origin load is smoothed (not bursty)',
      '# - Content is always eventually fresh'
    ]), 'Explanation of stale-while-revalidate pattern with timeline showing how it eliminates cache miss penalties.')
  ],
  [
    m('What does s-maxage control?', ['Browser cache time', 'CDN/Proxy cache time', 'Server processing time', 'DNS cache time'], 1, 's-maxage overrides max-age for shared caches (CDNs and proxies).'),
    m('What is the difference between no-cache and no-store?', ['Same thing', 'no-cache: revalidate before use; no-store: never cache', 'no-cache: never cache; no-store: revalidate', 'Both prevent all caching'], 1, 'no-cache allows caching but requires revalidation. no-store prohibits caching entirely.'),
    m('What does the immutable directive do?', ['Content can be modified', 'Content never changes on that URL', 'Cache cannot be changed', 'Content is encrypted'], 1, 'immutable tells the browser the content will never change on that URL.'),
    m('Which caching issue does stale-while-revalidate solve?', ['Cache corruption', 'Cache miss latency penalty', 'Cache size limits', 'Cache key conflicts'], 1, 'stale-while-revalidate eliminates the user-facing latency penalty of cache misses.'),
    m('What Cache-Control value prevents CDN caching?', ['public', 'private', 'max-age=3600', 's-maxage=3600'], 1, 'Cache-Control: private prevents CDNs and proxies from caching the content.'),
    m('What is the default behavior without Cache-Control?', ['No caching', 'Heuristic caching (varies by browser/CDN)', 'Cache forever', 'Error'], 1, 'Without Cache-Control, browsers and CDNs use heuristic caching based on status code and other headers.')
  ]
);

/* =================== TOPIC 9: TTL (Time To Live) =================== */
addTopic('cdn-ttl', 'TTL (Time To Live)', 'beginner', 15,
  ['TTL (Time To Live) defines how long a CDN edge server should keep cached content before considering it stale and re-fetching from the origin.',
  'TTL is set via the Cache-Control max-age directive (in seconds) from the origin server. Example: max-age=3600 means cache for 1 hour.',
  'Longer TTLs improve cache hit ratios and reduce origin load but risk serving stale content. Shorter TTLs ensure freshness but reduce cache efficiency.',
  'CDNs typically have configurable minimum, default, and maximum TTL settings that override or constrain the origin-provided TTL.'
  ],
  'TTL is like the expiration date on a yogurt container. The manufacturer (origin) stamps a best-before date (TTL). The store (CDN edge) keeps the yogurt on the shelf until that date. After the date passes, the store throws it out and gets fresh stock from the warehouse. If the date is far in the future (long TTL), the store checks less often. If it is close (short TTL), the store checks frequently for fresher stock.',
  [
    d('How TTL Works in CDNs', 'When the origin responds with Cache-Control: max-age=3600, the CDN stores the content and sets a timer for 3600 seconds. For subsequent requests within that window, the content is served from cache (HIT). After 3600 seconds, the content is stale and the CDN re-fetches from origin on the next request. The CDN may also have MinTTL and MaxTTL boundaries.'),
    d('Default vs Min vs Max TTL', 'CDNs like CloudFront have three settings: Minimum TTL (MinTTL): shortest time to cache regardless of origin header. Default TTL: used when origin doesn\'t set max-age. Maximum TTL (MaxTTL): longest time to cache regardless of origin header. These create boundaries: final TTL = clamp(origin_max_age, MinTTL, MaxTTL).'),
    d('Choosing TTL Values', 'Static versioned assets (style.abc123.css): 1 year (31536000 seconds) with immutable. Static unversioned: 1-30 days. Blog posts: 1-7 days. News articles: minutes to hours. API responses: 0-60 seconds. HTML pages: 0-300 seconds. The Pareto principle applies — 80% of TTL benefit comes from setting long TTLs on the 20% of content that is most cacheable.'),
    d('TTL and Content Freshness', 'Trade-off: longer TTL = better performance, worse freshness. For a blog, 1-hour TTL means some readers may see a 1-hour-old page after an edit. For stock prices, a 1-second TTL is too stale. Solution: separate cacheable and non-cacheable content. Use s-maxage for different CDN vs browser TTLs. Use versioned filenames to effectively get "infinite" TTL.'),
    d('TTL and Cache Invalidation', 'Long TTLs mean content stays cached longer — when you need to update content, you must either wait for TTL expiry or use cache invalidation. Versioned filenames let you use infinite TTL (1 year) without invalidation issues — old filename becomes unreferenced, new filename gets its own cache. This is the ideal approach for static assets.')
  ],
  'TTL defines how long CDNs cache content. Longer TTLs = better performance but potentially stale content. Use versioned filenames for infinite TTL on static assets. Set shorter TTLs for dynamic content. CDNs clamp origin TTLs with Min/Max TTL settings. Balance freshness and performance based on content type.',
  [
    q('What is TTL in CDN context?', 'Time To Live — how long a CDN caches content before considering it stale and re-fetching from origin.'),
    q('How is TTL set?', 'Via the Cache-Control: max-age=<seconds> response header from the origin server.'),
    q('What happens when TTL expires?', 'The cached content becomes stale. The next request triggers a re-fetch from the origin (cache miss).'),
    q('What are MinTTL, DefaultTTL, and MaxTTL?', 'CDN-imposed boundaries that override or constrain the origin-provided TTL within these limits.'),
    q('What TTL should you use for versioned static assets?', '1 year (31536000 seconds) with the immutable directive.'),
    q('What is the trade-off with long TTLs?', 'Better cache hit ratio and performance vs. serving potentially stale content.'),
    q('How do versioned filenames relate to TTL?', 'They allow effectively infinite TTL because the old filename is never requested again when content changes.'),
    q('What TTL is appropriate for HTML pages?', '0-300 seconds (short) or no-cache with must-revalidate. HTML changes frequently and needs freshness.'),
    q('What TTL is appropriate for API responses?', 'Depends on the data. Stock prices: 0 seconds. Weather: 300 seconds. Blog posts: 3600 seconds.'),
    q('What is the default TTL if no max-age is set?', 'CDN provider-specific. CloudFront: 24 hours. Cloudflare: varies. Nginx proxy: none (no caching by default).')
  ],
  R(10,35,110,25,'#0070f3','','Origin Response','max-age=3600') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','CDN Edge','TTL Timer: 3600s') +
  A(290,48,320,48) +
  R(330,35,140,25,'#ffc107','','Cache HIT','While TTL valid') +
  R(10,70,110,25,'#dc3545','','TTL Expired','3600s elapsed') +
  A(120,83,150,83) +
  R(160,70,130,25,'#e83e8c','','Stale Content','Re-fetch from origin') +
  R(10,100,110,25,'#6610f2','','Versioned URLs','Infinite TTL effect') +
  R(160,100,130,25,'#17a2b8','','No Invalidation','Old URL unused') +
  T(240,185,'TTL (Time To Live): How long content is cached before re-fetching. Longer = better performance, but potentially stale.',9,'#666','middle'),
  [
    e('Setting TTL via Cache-Control on Origin', 'Configuring TTL values.', codeBlock([
      '# Different TTL configurations for different needs',
      '',
      '# Cache for 1 hour:',
      '# Cache-Control: public, max-age=3600',
      '',
      '# Cache for 24 hours:',
      '# Cache-Control: public, max-age=86400',
      '',
      '# Cache for 1 year (static versioned assets):',
      '# Cache-Control: public, max-age=31536000, immutable',
      '',
      '# Short cache with revalidation:',
      '# Cache-Control: public, max-age=0, must-revalidate',
      '',
      '# CDN caches longer than browser:',
      '# Cache-Control: public, max-age=3600, s-maxage=86400',
      '# Browser: 1 hour, CDN: 1 day',
      '',
      '# Stale while revalidate pattern:',
      '# Cache-Control: public, max-age=60,',
      '#   stale-while-revalidate=86400'
    ]), 'Common TTL value configurations for different content types and caching strategies.'),
    e('CloudFront TTL Configuration', 'Setting Min/Default/Max TTL in CloudFront.', codeBlock([
      '# CloudFront cache behavior TTL settings',
      '# These override origin Cache-Control headers:',
      '',
      '# Minimum TTL: 0 seconds',
      '# Respect origin max-age as-is, down to 0',
      '',
      '# Default TTL: 86400 seconds (24 hours)',
      '# Used when origin does NOT send max-age',
      '# If origin sends max-age, that takes precedence',
      '',
      '# Maximum TTL: 31536000 seconds (1 year)',
      '# Caps origin max-age to 1 year max',
      '# Even if origin sends max-age=99999999,',
      '# CloudFront will only cache for 1 year',
      '',
      '# CLI command to configure:',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --default-cache-behavior \\',
      '    "MinTTL=0,DefaultTTL=3600,MaxTTL=31536000"'
    ]), 'CloudFront TTL configuration showing Min, Default, and Max TTL boundaries.'),
    e('TTL Debugging with Curl', 'Inspecting TTL-related headers.', codeBlock([
      '# Check current TTL and cache age',
      'curl -I https://cdn.example.com/image.jpg',
      '',
      '# Key headers for TTL analysis:',
      '#',
      '# cache-control: max-age=3600',
      '#   Total TTL set by origin = 3600 seconds',
      '#',
      '# age: 1234',
      '#   Content has been cached for 1234 seconds',
      '#   Remaining TTL = 3600 - 1234 = 2366 seconds',
      '#',
      '# x-cache: Hit from cloudfront',
      '#   It is a cache hit (within TTL window)',
      '#',
      '# Calculate when cache will expire:',
      '# Expires = Date when max-age was set + max-age',
      '# Or check "expires" header directly'
    ]), 'Using curl headers to analyze TTL status and remaining cache time.'),
    e('TTL Strategy by Content Type', 'Recommended TTL values for different types.', codeBlock([
      '// Recommended TTL strategy by content type',
      'const ttlConfig = {',
      '  "versioned-assets": {',
      '    // style.abc123.css, main.xyz789.js',
      '    ttl: 31536000, // 1 year',
      '    immutable: true,',
      '    reason: "Content never changes on same URL"',
      '  },',
      '  "unversioned-assets": {',
      '    // logo.png, favicon.ico',
      '    ttl: 2592000, // 30 days',
      '    immutable: false,',
      '    reason: "Rarely changes, long cache OK"',
      '  },',
      '  "blog-posts": {',
      '    // /blog/hello-world',
      '    ttl: 3600, // 1 hour',
      '    immutable: false,',
      '    reason: "May be edited, balance freshness"',
      '  },',
      '  "api-public-data": {',
      '    // /api/products, /api/posts',
      '    ttl: 60, // 1 minute',
      '    immutable: false,',
      '    reason: "Frequently updated, CDN cache only"',
      '  },',
      '  "api-user-data": {',
      '    // /api/user/profile',
      '    ttl: 0, // never',
      '    private: true,',
      '    reason: "User-specific, never cache on CDN"',
      '  }',
      '};'
    ]), 'JavaScript object showing recommended TTL strategy for different content categories.'),
    e('Nginx Proxy Cache TTL Configuration', 'Server-side TTL settings.', codeBlock([
      'proxy_cache_path /var/cache/nginx levels=1:2',
      '  keys_zone=mycache:10m max_size=10g',
      '  inactive=60m use_temp_path=off;',
      '',
      'server {',
      '  location / {',
      '    proxy_cache mycache;',
      '',
      '    # Override origin TTL with proxy_cache_valid',
      '    proxy_cache_valid 200 302 60m;  # 1 hour',
      '    proxy_cache_valid 404 1m;        # 1 minute',
      '    proxy_cache_valid any 10m;       # default 10 min',
      '',
      '    # Ignore origin Cache-Control',
      '    proxy_ignore_headers Cache-Control Expires;',
      '',
      '    # Use custom cache key with TTL consideration',
      '    proxy_cache_key "$scheme$host$uri";',
      '',
      '    proxy_pass http://origin:8080;',
      '  }',
      '}'
    ]), 'Nginx proxy cache TTL configuration with proxy_cache_valid overriding origin headers.')
  ],
  [
    m('What does TTL stand for?', ['Transfer Time Limit', 'Time To Live', 'Total Transfer Length', 'Time To Load'], 1, 'TTL = Time To Live — how long content is cached.'),
    m('How is TTL typically set?', ['DNS configuration', 'Cache-Control: max-age header', 'Server port setting', 'SSL certificate'], 1, 'TTL is set via the Cache-Control max-age header in seconds.'),
    m('What happens when TTL expires?', ['Content is deleted from disk', 'Content becomes stale, next request re-fetches', 'Server restarts', 'Cache size doubles'], 1, 'After TTL expiry, the next request triggers a cache miss and re-fetch from origin.'),
    m('What TTL should versioned assets use?', ['1 hour', '1 day', '1 year with immutable', '0 seconds'], 2, 'Versioned assets should use 1 year TTL with immutable for optimal caching.'),
    m('What does MinTTL do in CloudFront?', ['Sets minimum cache duration regardless of origin headers', 'Sets maximum cache duration', 'Default TTL when origin has none', 'Disables caching'], 0, 'MinTTL is the minimum time CloudFront caches content, overriding shorter origin TTLs.'),
    m('What is the trade-off with longer TTL?', ['Better performance vs. potential stale content', 'More origin load vs. fresh content', 'Lower CHR vs. faster updates', 'More cost vs. better performance'], 0, 'Longer TTL improves performance but risks serving stale content to users.')
  ]
);

/* =================== TOPIC 10: Dynamic Content =================== */
addTopic('cdn-dynamic-content', 'Dynamic Content', 'intermediate', 20,
  ['Dynamic content is content that changes per user, session, or context — personalized pages, API responses, shopping carts, real-time data.',
   'Dynamic content is harder to cache because it varies by user, authentication state, location, or time. Incorrect caching can leak user data between sessions.',
   'CDNs accelerate dynamic content through: edge computing (workers), dynamic TTL (short), surrogate keys, connection optimization (TLS, keep-alive), and route optimization.',
   'Techniques: edge-side includes (ESI), personalized edge caching (vary by cookie/header), streaming responses via chunked transfer encoding, and smart routing to nearest origin.'
  ],
  'Dynamic content is like a custom-made sandwich. Unlike pre-made sandwiches (static content) that you grab from the cooler, a custom sandwich is made fresh based on your specific order. The CDN can\'t pre-make your sandwich because it doesn\'t know what you\'ll order. However, the CDN can speed up the ordering process and the route from kitchen to you.',
  [
    d('Why Dynamic Content is Hard to Cache', 'Dynamic content is user-specific (personalized dashboards), session-specific (shopping cart contents), time-sensitive (stock prices), or dependent on authentication state. Each variation would need a separate cache entry, making caching inefficient. Cache keys must include cookies, headers, or authentication tokens to isolate user data.'),
    d('Dynamic Content Acceleration Techniques', 'TLS connection reuse: CDN maintains persistent connections to origin, reducing connection overhead. TCP optimization: optimized congestion control algorithms reduce latency. Route optimization: CDN uses real-time internet health data to find the best path to origin. Preconnect: CDN establishes early connections to speed up dynamic requests.'),
    d('Edge Computing for Dynamic Content', 'Cloudflare Workers, Fastly Compute@Edge, and CloudFront Functions can generate dynamic responses at the edge without hitting the origin. Use cases: A/B testing (serve variant based on cookie), personalization (modify HTML based on geolocation), API aggregation (combine multiple API responses), authentication (validate JWT at edge).'),
    d('Caching Dynamic Content (Selectively)', 'Cache personalized content with Vary header (Vary: Cookie, Authorization). Use short TTLs (30-60 seconds) for semi-dynamic content. Cache fragments via Edge Side Includes (ESI). Use surrogate keys to invalidate groups. Cache API responses with user-specific cache keys. Only cache if the benefit outweighs the complexity.'),
    d('Dynamic vs Static Content Separation', 'Best practice: separate dynamic and static content on different URL patterns. Static: /static/, /assets/, /images/. Dynamic: /api/, /app/, /dashboard/. This allows different CDN configurations (TTL, cache policies, origin groups) for each. Many CDNs support path-based behavior configuration.')
  ],
  'Dynamic content is personalized or time-sensitive and harder to cache than static content. CDNs accelerate it through edge computing, connection optimization, and smart routing. Use selective caching with Vary headers and short TTLs for semi-dynamic content. Separate dynamic and static URL patterns for optimal CDN configuration.',
  [
    q('What is dynamic content in CDN context?', 'Content that changes per user, session, or context — personalized pages, API responses, real-time data.'),
    q('Why is dynamic content hard to cache?', 'Because it varies by user, auth state, time, or location — each variation needs a separate cache entry.'),
    q('How does edge computing help with dynamic content?', 'By running code (workers) at the edge to generate or modify dynamic responses without hitting the origin.'),
    q('What is the Vary header used for?', 'To tell CDNs to cache different versions based on request headers like Cookie, Authorization, or Accept-Language.'),
    q('What is dynamic TTL?', 'A TTL that varies based on content type, URL pattern, or response headers — short TTL for dynamic content.'),
    q('What is ESI (Edge Side Includes)?', 'A technology that allows composing dynamic content from cached fragments at the edge.'),
    q('How do CDNs accelerate uncacheable dynamic content?', 'Through TLS reuse, TCP optimization, route optimization, and preconnect to reduce latency.'),
    q('Should dynamic and static content use the same CDN configuration?', 'No — separate URL patterns allow different caching rules, TTLs, and origin behaviors.'),
    q('What is a common pattern for caching API responses?', 'Short TTL (30-60 seconds), Vary on Authentication header, cache key includes user/device ID.'),
    q('How does Surrogate-Key help with dynamic content?', 'It allows selective invalidation of related dynamic content without purging everything.')
  ],
  R(10,35,110,25,'#0070f3','','Static Content','Cache long TTL') +
  R(10,65,110,25,'#dc3545','','Dynamic Content','Per-user, uncacheable') +
  A(120,48,150,48) + A(120,78,150,78) +
  R(160,35,230,70,'#17a2b8','','CDN Edge Acceleration','Edge workers, TLS reuse, route optimization, selective caching with Vary header.') +
  R(10,100,110,25,'#28a745','','Edge Workers','Generate at edge') +
  R(10,130,110,25,'#ffc107','','Selective Cache','Vary: Cookie, TTL=60s') +
  R(10,160,110,25,'#e83e8c','','Route Optimization','Smart path to origin') +
  A(120,113,150,113) + A(120,143,150,143) + A(120,173,150,173) +
  T(240,195,'Dynamic Content: Personalized, hard-to-cache content accelerated via edge compute, connection optimization, and selective caching.',9,'#666','middle'),
  [
    e('Selective Caching with Vary Header', 'Caching dynamic content safely.', codeBlock([
      '# Cache different versions based on Cookie',
      '# Origin response header:',
      'Vary: Cookie',
      '',
      '# Or more specifically:',
      'Vary: X-User-ID, X-Region',
      '',
      '# Effect on CDN:',
      '# Separate cache entries per cookie value',
      '# Each unique cookie = separate cached response',
      '# Use carefully — too many variations reduce CHR',
      '',
      '# Better approach: extract only relevant cookie',
      '# From origin (Python/Flask example):',
      'from flask import request',
      "region = request.cookies.get('region', 'default')",
      "response.headers['Vary'] = 'Cookie'",
      "",
      '# Warning: Vary: * means never cache',
      '# Avoid using Vary with high-cardinality values'
    ]), 'Using the Vary header to cache different versions of dynamic content based on cookies or headers.'),
    e('CloudFront Function for A/B Testing', 'Edge-based dynamic modification.', codeBlock([
      '// CloudFront Function — runs at edge',
      '// Modifies response based on experiment cookie',
      '',
      'function handler(event) {',
      '  var request = event.request;',
      '  var headers = request.headers;',
      '  var cookie = headers.cookie;',
      '',
      '  // Default origin path',
      '  request.uri = "/v1/index.html";',
      '',
      '  // Check experiment cookie',
      '  if (cookie && cookie.value.includes("variant=B")) {',
      '    request.uri = "/v2/index.html";',
      '  }',
      '',
      '  return request;',
      '}',
      '',
      '# This runs at every edge location',
      '# Zero latency added — no origin call needed',
      '# Dynamic routing based on user cookie'
    ]), 'CloudFront Function at the edge for A/B testing — dynamically routes users without origin round trip.'),
    e('Fastly VCL for Dynamic Request Routing', 'Edge logic for dynamic content.', codeBlock([
      '# Fastly VCL: Route dynamic requests to nearest origin',
      '',
      '# Define multiple backends (origins)',
      'backend us_east { .host = "us-origin.example.com"; }',
      'backend eu_west { .host = "eu-origin.example.com"; }',
      'backend asia { .host = "asia-origin.example.com"; }',
      '',
      '# Geo-based routing at edge',
      'sub vcl_recv {',
      '  # Dynamic API requests — route geographically',
      '  if (req.url.path ~ "^/api/") {',
      '    if (req.http.Fastly-Geo-Country ~ "(US|CA)") {',
      '      set req.backend = us_east;',
      '    } else if (req.http.Fastly-Geo-Country',
      '               ~ "(GB|DE|FR|NL)") {',
      '      set req.backend = eu_west;',
      '    } else {',
      '      set req.backend = asia;',
      '    }',
      '',
      "    # Don't cache API responses",
      '    return (pass);',
      '  }',
      '',
      '  # Static content — cache at edge',
      '  if (req.url.path ~ "^/static/") {',
      '    return (lookup);',
      '  }',
      '}'
    ]), 'Fastly VCL geo-routing dynamic requests to the nearest origin server while caching static content.'),
    e('Edge Worker for API Aggregation', 'Combining multiple API calls at edge.', codeBlock([
      '// Cloudflare Worker — aggregate APIs at edge',
      '// Reduces multiple client requests to one edge call',
      '',
      'export default {',
      '  async fetch(request) {',
      '    const url = new URL(request.url);',
      '',
      '    if (url.pathname === "/api/dashboard") {',
      '      // Fetch multiple APIs in parallel from edge',
      '      const [user, orders, recommendations] =',
      '        await Promise.all([',
      '          fetch("https://api.example.com/user"),',
      '          fetch("https://api.example.com/orders"),',
      '          fetch("https://api.example.com/recommend")',
      '        ]);',
      '',
      '      // Combine at edge — single client response',
      '      const dashboard = {',
      '        user: await user.json(),',
      '        orders: await orders.json(),',
      '        recommendations: await recommendations.json()',
      '      };',
      '',
      '      return new Response(JSON.stringify(dashboard), {',
      '        headers: {"Content-Type": "application/json"}',
      '      });',
      '    }',
      '',
      '    return fetch(request); // pass through',
      '  },',
      '}'
    ]), 'Edge worker aggregating multiple API calls into a single response, reducing client-side latency.'),
    e('Private Cache for Dynamic Content', 'Ensuring dynamic content is not cached by CDN.', codeBlock([
      '# Option 1: Set Cache-Control to private/no-store',
      '# Cache-Control: private, no-store',
      '# CDN will never cache this response',
      '# Browser will not cache either',
      '',
      '# Option 2: Set Cache-Control to no-cache',
      '# Cache-Control: no-cache',
      '# Browser may cache but must revalidate',
      '# CDN should not cache (varies by provider)',
      '',
      '# Option 3: Set s-maxage=0',
      '# Cache-Control: public, max-age=3600, s-maxage=0',
      '# Browser caches 1 hour,',
      '# CDN does not cache at all (s-maxage=0)',
      '',
      '# Option 4: Custom header to bypass CDN cache',
      '# X-Accel-Expires: 0  (for Nginx-based CDNs)'
    ]), 'Methods to ensure dynamic content is never cached by the CDN while allowing selective browser caching.')
  ],
  [
    m('What is dynamic content in CDN context?', ['Content that never changes', 'Content that varies by user/session/context', 'Only video content', 'Only HTML content'], 1, 'Dynamic content varies by user, session, time, or context.'),
    m('Why is caching dynamic content challenging?', ['It is too large', 'It varies by user/context creating many cache entries', 'It is encrypted', 'It expires too fast'], 1, 'Each variation of dynamic content needs a separate cache entry, making caching inefficient.'),
    m('What does the Vary header do?', ['Changes the content encoding', 'Tells CDN to cache different versions based on request headers', 'Varies the TTL dynamically', 'Changes the origin server'], 1, 'Vary tells CDNs to cache different versions based on request headers like Cookie or Authorization.'),
    m('What is an Edge Worker used for?', ['Cleaning edge cache', 'Running code at edge for dynamic responses', 'Managing DNS records', 'Compressing images'], 1, 'Edge Workers run custom code at CDN edge locations for dynamic content generation.'),
    m('What is ESI?', ['Edge Side Includes — dynamic content assembly from cached fragments', 'Extra Server Infrastructure', 'Elastic Server Integration', 'Edge Security Interface'], 0, 'ESI allows composing dynamic content from cached fragments at the edge.'),
    m('What CDN feature helps with selective dynamic content caching?', ['Cache-Control: private', 's-maxage with Vary header', 'Increasing TTL', 'Disabling cache entirely'], 1, 'Using s-maxage with Vary header allows selective caching of dynamic content with user-specific variations.')
  ]
);

/* =================== TOPIC 11: Static Content =================== */
addTopic('cdn-static-content', 'Static Content', 'beginner', 10,
  ['Static content refers to files that do not change frequently and can be cached for long periods — images, CSS, JavaScript, fonts, PDFs, and videos.',
   'Static content is the easiest to optimize with CDNs because it is identical for every user and rarely changes between requests.',
   'Best practices: use versioned filenames (style.abc123.css) with immutable caching, long TTLs (1 year), and aggressive CDN caching with public Cache-Control.',
   'Static assets typically account for 70-90% of a website\'s total page weight, making their optimization critical for overall performance.'
  ],
  'Static content is like pre-packaged snack bags in a vending machine. Everyone gets the same chips in the same packaging. The vending machine (CDN) can be stocked with thousands of bags, and they don\'t spoil for a long time. Once stocked, the machine serves them instantly without needing to call the factory. No customization, no expiration worries.',
  [
    d('Types of Static Content', 'Images: JPEG, PNG, WebP, AVIF, SVG. Stylesheets: CSS (often versioned). Scripts: JavaScript (bundled, minified, versioned). Fonts: WOFF2, WOFF, TTF. Media: MP4, WebM, PDF documents. Archives: ZIP files, installers. API responses that are public and rarely changing (JSON/XML).'),
    d('Optimal Caching for Static Content', 'Set Cache-Control: public, max-age=31536000, immutable for versioned assets. For unversioned but rarely changed: public, max-age=2592000 (30 days). Use content hashes in filenames (Webpack, Vite, esbuild output). Serve from CDN with origin shield. Enable compression (Brotli > Gzip). Use HTTP/2 or HTTP/3 for multiplexing.'),
    d('Static Content Optimization Techniques', 'Minification: remove whitespace, comments. Bundling: combine multiple files into fewer requests. Tree-shaking: remove unused code. Image optimization: WebP/AVIF, responsive images (srcset), lazy loading. Font subsetting: include only needed characters. Critical CSS inlining for above-the-fold content.'),
    d('Fingerprinting / Versioning', 'Content hash in filename: style.4a5b6c7d.css. When content changes, the hash changes, creating a new URL. Old file remains cached but is never requested. No invalidation needed. Build tools: Webpack [contenthash], Vite [hash], esbuild [hash].'),
    d('CDN Impact on Static Content', 'Static content benefits most from CDN: 90%+ cache hit ratio achievable. Origin offload for static content can exceed 95%. Bandwidth savings are significant. Page load time improvements of 40-60% for first visits, 80%+ for repeat visits. Global users see consistent fast load times regardless of location.')
  ],
  'Static content (images, CSS, JS, fonts) is ideal for CDN caching. Use versioned filenames with immutable, long TTL caching. Optimize with compression, minification, and responsive images. Static assets typically account for 70-90% of page weight, and CDN optimization can improve load times by 60% or more.',
  [
    q('What is static content?', 'Files that do not change frequently and are identical for every user — images, CSS, JS, fonts, PDFs.'),
    q('What percentage of page weight is typically static content?', '70-90% of total page weight.'),
    q('What is the optimal Cache-Control for versioned static assets?', 'Cache-Control: public, max-age=31536000, immutable (1 year, never revalidate).'),
    q('What is content fingerprinting?', 'Adding a content hash to the filename (style.abc123.css) so the URL changes when content changes.'),
    q('What is the benefit of versioned filenames?', 'Old cache is never requested again after update — eliminates need for cache invalidation.'),
    q('What is the typical cache hit ratio for static content on a CDN?', '90-95% or higher.'),
    q('What compression should be used for static content?', 'Brotli (preferred) or Gzip. Enable at CDN level and serve pre-compressed files when possible.'),
    q('How much can a CDN improve static content load times?', '40-60% for first visits, 80%+ for repeat visits compared to direct origin access.'),
    q('What is tree-shaking?', 'Removing unused code from JavaScript bundles to reduce file size.'),
    q('What image formats are best for static content delivery?', 'WebP and AVIF offer superior compression compared to JPEG and PNG.')
  ],
  R(10,35,110,25,'#0070f3','','CSS files','style.abc123.css') +
  R(10,65,110,25,'#28a745','','JS files','bundle.xyz789.js') +
  R(10,95,110,25,'#ffc107','','Images','WebP/AVIF/JPEG') +
  R(10,125,110,25,'#dc3545','','Fonts','WOFF2, variable') +
  R(10,155,110,25,'#e83e8c','','Media','MP4, WebM') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Static Content CDN','Versioned filenames, immutable cache, long TTL (1 year), compression, 95%+ CHR.') +
  T(240,220,'Static Content: Images, CSS, JS, fonts — ideal for CDN with versioned filenames, long TTL, and aggressive caching.',9,'#666','middle'),
  [
    e('HTML Template with Versioned Static Assets', 'Loading versioned assets via CDN.', codeBlock([
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title>My App</title>',
      '',
      '  <!-- Versioned CSS with long-term CDN caching -->',
      '  <link rel="stylesheet"',
      '    href="https://cdn.example.com/css/app.4a5b6c7d.css">',
      '  <link rel="stylesheet"',
      '    href="https://cdn.example.com/css/vendor.1a2b3c4d.css">',
      '',
      '  <!-- Preconnect to CDN for faster asset loading -->',
      '  <link rel="preconnect" href="https://cdn.example.com">',
      '  <link rel="dns-prefetch" href="https://cdn.example.com">',
      '',
      '  <!-- Preload critical assets -->',
      '  <link rel="preload"',
      '    href="https://cdn.example.com/fonts/inter.woff2"',
      '    as="font" type="font/woff2" crossorigin>',
      '</head>',
      '<body>',
      '  <!-- Responsive image with srcset -->',
      '  <img',
      '    src="https://cdn.example.com/img/hero-640.webp"',
      '    srcset="',
      '      https://cdn.example.com/img/hero-640.webp 640w,',
      '      https://cdn.example.com/img/hero-1280.webp 1280w,',
      '      https://cdn.example.com/img/hero-1920.webp 1920w"',
      '    sizes="(max-width: 640px) 100vw, 50vw"',
      '    loading="lazy"',
      '    alt="Hero image">',
      '',
      '  <!-- Versioned JavaScript -->',
      '  <script',
      '    src="https://cdn.example.com/js/bundle.xyz789.js"',
      '    defer></script>',
      '</body>',
      '</html>'
    ]), 'HTML template with versioned static assets loaded from CDN, preconnect hints, and responsive images.'),
    e('Webpack Config for Content Hash Filenames', 'Automatic versioned filenames.', codeBlock([
      '// webpack.config.js',
      'const path = require("path");',
      'const HtmlWebpackPlugin = require("html-webpack-plugin");',
      '',
      'module.exports = {',
      '  entry: "./src/index.js",',
      '  output: {',
      '    path: path.resolve(__dirname, "dist"),',
      '    filename: "js/[name].[contenthash:8].js",',
      '    chunkFilename: "js/[id].[contenthash:8].chunk.js",',
      '    assetModuleFilename: "assets/[hash:8][ext]",',
      '    publicPath: "https://cdn.example.com/",',
      '    clean: true,',
      '  },',
      '  plugins: [',
      '    new HtmlWebpackPlugin({',
      '      template: "./src/index.html",',
      '      inject: true,',
      '    }),',
      '  ],',
      '  optimization: {',
      '    splitChunks: {',
      '      chunks: "all",',
      '      cacheGroups: {',
      '        vendor: {',
      '          test: /[\\\\/]node_modules[\\\\/]/,',
      '          name: "vendor",',
      '          chunks: "all",',
      '        },',
      '      },',
      '    },',
      '  },',
      '  module: {',
      '    rules: [{',
      '      test: /\\.(png|jpg|webp|svg)$/,',
      '      type: "asset",',
      '      parser: {',
      '        dataUrlCondition: {',
      '          maxSize: 8 * 1024,',
      '        },',
      '      },',
      '    },],',
      '  },',
      '};'
    ]), 'Webpack configuration generating content-hash-based filenames for automatic CDN cache busting.'),
    e('Serving Pre-compressed Static Assets from CDN', 'Brotli and Gzip compression.', codeBlock([
      '# CloudFront: Enable Brotli compression',
      '# In CloudFront distribution settings:',
      '#   Supported HTTP Versions: HTTP/2, HTTP/3',
      '#   Compression: Automatically compress objects',
      '',
      '# Nginx origin with pre-compressed files:',
      'server {',
      '  location /static/ {',
      '    root /var/www;',
      '    gzip_static on;',
      '    gunzip on;',
      '    add_header Content-Encoding br;',
      '  }',
      '}',
      '',
      '# Pre-compress at build time:',
      '#!/bin/bash',
      'find dist -type f \\( -name "*.css" -o -name "*.js"',
      '  -o -name "*.html" -o -name "*.svg" \\) | while read f; do',
      '  gzip -k -f -9 "$f"',
      '  brotli -k -f -q 11 "$f"',
      'done'
    ]), 'Pre-compressing static assets with Brotli and Gzip for efficient CDN delivery.'),
    e('CDN Cache Configuration for Static Content (Nginx)', 'Optimizing static content caching.', codeBlock([
      'server {',
      '  listen 80;',
      '  server_name cdn.example.com;',
      '',
      '  location ~* \\.(css|js)$ {',
      '    root /var/www/static;',
      '    expires 1y;',
      '    add_header Cache-Control "public, max-age=31536000, immutable";',
      '    gzip_static on;',
      '    brotli_static on;',
      '  }',
      '',
      '  location ~* \\.(png|jpg|jpeg|gif|webp|avif|svg)$ {',
      '    root /var/www/images;',
      '    expires 30d;',
      '    add_header Cache-Control "public, max-age=2592000";',
      '  }',
      '',
      '  location ~* \\.(woff2?|ttf|eot)$ {',
      '    root /var/www/fonts;',
      '    expires 1y;',
      '    add_header Cache-Control "public, max-age=31536000";',
      '    add_header Access-Control-Allow-Origin "*";',
      '  }',
      '}'
    ]), 'Nginx CDN configuration optimized for static content with long TTLs and compression.'),
    e('Lighthouse Performance Budget for Static Content', 'Setting targets for static content optimization.', codeBlock([
      'module.exports = {',
      '  ci: {',
      '    collect: {',
      '      url: ["https://example.com"],',
      '      numberOfRuns: 3,',
      '    },',
      '    assert: {',
      '      assertions: {',
      '        "total-byte-weight": ["error", {',
      '          maxNumericValue: 500 * 1024,',
      '        }],',
      '        "uses-optimized-images": "error",',
      '        "uses-webp-images": "error",',
      '        "offscreen-images": "error",',
      '        "render-blocking-resources": ["error", {',
      '          maxNumericValue: 0,',
      '        }],',
      '        "unminified-css": "error",',
      '        "unminified-javascript": "error",',
      '        "uses-responsive-images": "error",',
      '      },',
      '    },',
      '  },',
      '};'
    ]), 'Lighthouse CI configuration enforcing performance budgets for static content optimization.')
  ],
  [
    m('What types of content are considered static?', ['API responses, user profiles', 'Images, CSS, JS, fonts (unchanging per user)', 'Live chat messages', 'Stock ticker data'], 1, 'Static content includes images, CSS, JavaScript, fonts.'),
    m('What percentage of page weight is static content?', ['10-20%', '30-40%', '70-90%', '100%'], 2, 'Static content typically makes up 70-90% of a page\'s total weight.'),
    m('What is the optimal TTL for versioned static assets?', ['1 hour', '1 week', '1 year with immutable', 'Never cache'], 2, 'Versioned assets should use 1 year TTL with the immutable directive.'),
    m('What is content fingerprinting?', ['Adding user fingerprints', 'Adding content hash to filenames', 'Fingerprint authentication', 'Image optimization'], 1, 'Content fingerprinting adds a hash of the file content to the filename for automatic cache busting.'),
    m('What is the typical cache hit ratio for static content on CDN?', ['50%', '70%', '90-95%', '99%'], 2, 'Static content typically achieves 90-95%+ cache hit ratios on CDNs.'),
    m('What is the best compression for static text assets?', ['Brotli', 'Gzip', 'Deflate', 'Zstandard'], 0, 'Brotli offers better compression ratios than Gzip for text-based static assets.')
  ]
);

/* =================== TOPIC 12: Image Optimization =================== */
addTopic('cdn-image-optimization', 'Image Optimization', 'intermediate', 20,
  ['Image optimization reduces file sizes while maintaining visual quality, improving page load times and reducing bandwidth costs.',
   'Modern formats (WebP, AVIF) offer 25-50% better compression than JPEG/PNG with similar quality. Serve the best format based on browser support.',
   'CDN image optimization features: on-the-fly resizing, format conversion, quality adjustment, cropping, compression, and responsive image generation.',
   'Images account for ~50% of a typical webpage\'s total weight. Optimization is the single highest-impact performance improvement you can make.'
  ],
  'Image optimization is like packing a suitcase. A JPEG is a bulky suitcase that fits everything but weighs a ton. WebP is a modern vacuum-compression bag that fits the same clothes in half the space. AVIF is like using a vacuum sealer — even smaller. The CDN image optimizer is your packing assistant that chooses the right bag and squishes everything perfectly.',
  [
    d('Image Formats Compared', 'JPEG: lossy, 8-bit, good for photos, no transparency. PNG: lossless, up to 48-bit, transparency, good for graphics. GIF: 256 colors, animation. WebP: lossy/lossless, 24-bit, transparency, animation, 25-35% smaller than JPEG. AVIF: lossy/lossless, HDR, 12-bit, transparency, 50% smaller than JPEG. SVG: vector, resolution-independent, code-based.'),
    d('CDN Image Processing Features', 'Resize: generate exact dimensions needed. Format conversion: auto-serve WebP/AVIF based on Accept header. Quality: adjust compression level (q=50-85). Crop: smart cropping with focal point detection. Compress: remove metadata. Strip EXIF: remove camera data. Blur: for placeholders. Watermark: overlay branding. All at the edge cache.'),
    d('Responsive Images with srcset', 'Use HTML srcset and sizes attributes to serve different image sizes based on viewport. CDN generates 3-5 variants at different widths. Browser selects the best size. Combined with CDN: single upload, multiple cached variants. Example sizes: 480w, 768w, 1024w, 1920w.'),
    d('Image CDNs vs General CDNs', 'Specialized image CDNs (Imgix, Cloudinary, ImageKit): extensive transformation APIs, real-time processing, AI-based compression. General CDNs (CloudFront, Cloudflare, Fastly): basic resizing/format conversion via Workers or Lambda@Edge. Choose based on needs.'),
    d('Lazy Loading and Preloading', 'Native lazy loading: loading=lazy attribute defers off-screen images. Intersection Observer: custom lazy loading with fade-in effects. Critical images: preload above-the-fold images with <link rel=preload>. Blur-up placeholders: tiny blurred version shown while full image loads.')
  ],
  'Image optimization reduces file size 25-80% through modern formats (WebP, AVIF), CDN-based resizing, quality adjustment, and responsive image techniques. Images are ~50% of page weight, making this the highest-impact optimization.',
  [
    q('What percentage of page weight do images account for?', 'Approximately 50% of a typical webpage\'s total weight.'),
    q('What are the best modern image formats?', 'WebP (25-35% smaller than JPEG) and AVIF (50% smaller than JPEG).'),
    q('How does a CDN optimize images?', 'Through on-the-fly resizing, format conversion (WebP/AVIF), quality adjustment, compression, and cropping at the edge.'),
    q('What is the srcset attribute used for?', 'To serve different image sizes based on viewport width, combined with CDN-generated variants.'),
    q('What is the difference between WebP and AVIF?', 'AVIF offers ~50% better compression than JPEG; WebP offers 25-35%. AVIF supports HDR and 12-bit color.'),
    q('What is lazy loading?', 'Deferring off-screen image loading until the user scrolls near them. Native with loading=lazy.'),
    q('What EXIF data should be stripped from images?', 'Camera model, GPS location, date/time, and device information to improve privacy and reduce file size.'),
    q('How does format conversion work at the CDN?', 'CDN checks the Accept header for image/webp or image/avif support and converts accordingly.'),
    q('What is an image CDN?', 'A specialized CDN focused on image transformation — Imgix, Cloudinary, ImageKit.'),
    q('What is blur-up image loading?', 'Showing a tiny blurred placeholder image while the full-resolution image loads from CDN.')
  ],
  R(10,35,110,25,'#0070f3','','Original Image','PNG 500KB') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','CDN Optimizer','Resize, convert, compress') +
  A(290,48,320,48) + A(170,65,170,85) +
  R(330,35,140,25,'#ffc107','','WebP','200KB (60% smaller)') +
  R(10,70,110,25,'#dc3545','','AVIF','125KB (75% smaller)') +
  R(10,100,110,25,'#e83e8c','','Responsive','srcset variants') +
  R(10,130,110,25,'#6610f2','','Lazy Loading','loading=lazy') +
  R(160,70,310,130,'#17a2b8','','Image Optimization at CDN','Format conversion (WebP/AVIF), resizing, compression, responsive images — all at the edge.') +
  T(240,225,'Image Optimization: Modern formats (WebP, AVIF), CDN processing, responsive images, and lazy loading.',9,'#666','middle'),
  [
    e('CloudFront Image Optimization with Lambda@Edge', 'On-the-fly image transformation.', codeBlock([
      'const sharp = require("sharp");',
      '',
      'exports.handler = async (event) => {',
      '  const request = event.Records[0].cf.request;',
      '  const headers = request.headers;',
      '  if (!request.uri.match(/\\.(jpg|jpeg|png)$/)) {',
      '    return request;',
      '  }',
      '  const accept = headers["accept"];',
      '  if (accept && accept[0].value.includes("webp")) {',
      '    request.uri = request.uri.replace(/\\.(jpg|jpeg|png)$/, ".webp");',
      '  }',
      '  return request;',
      '};'
    ]), 'Lambda@Edge function that converts images to WebP format at the CDN edge based on browser support.'),
    e('Cloudflare Image Resizing via Workers', 'CDN image transformations.', codeBlock([
      'export default {',
      '  async fetch(request) {',
      '    const url = new URL(request.url);',
      '    if (url.pathname.match(/\\.(jpg|png)$/)) {',
      '      const width = url.searchParams.get("w") || 800;',
      '      const quality = url.searchParams.get("q") || 80;',
      '      const format = url.searchParams.get("fmt") || "webp";',
      '      const resizingUrl =',
      '        `/cdn-cgi/image/width=${width},quality=${quality},format=${format}`',
      '        + url.pathname;',
      '      return fetch(new URL(resizingUrl, request.url));',
      '    }',
      '    return fetch(request);',
      '  },',
      '}'
    ]), 'Cloudflare Worker leveraging Image Resizing for on-the-fly format conversion.'),
    e('Nginx Image Filter Module', 'Server-side image optimization.', codeBlock([
      'server {',
      '  listen 80;',
      '  server_name images.example.com;',
      '  location /uploads/ {',
      '    root /var/www;',
      '    image_filter resize 800 600;',
      '    image_filter_jpeg_quality 85;',
      '    image_filter_webp_quality 80;',
      '    image_filter_buffer 20M;',
      '    proxy_cache mycache;',
      '    proxy_cache_valid 200 24h;',
      '  }',
      '}'
    ]), 'Nginx image_filter module for server-side image resizing and quality adjustment.'),
    e('Responsive Images with Srcset (HTML)', 'Serving multiple image sizes via CDN.', codeBlock([
      '<img',
      '  src="https://cdn.example.com/img/photo-800.webp"',
      '  srcset="',
      '    https://cdn.example.com/img/photo-400.webp 400w,',
      '    https://cdn.example.com/img/photo-800.webp 800w,',
      '    https://cdn.example.com/img/photo-1200.webp 1200w,',
      '    https://cdn.example.com/img/photo-1920.webp 1920w"',
      '  sizes="(max-width: 400px) 100vw, (max-width: 800px) 80vw, 50vw"',
      '  loading="lazy" decoding="async"',
      '  alt="Optimized photo">',
      '<picture>',
      '  <source srcset="https://cdn.example.com/img/photo.avif 1x" type="image/avif">',
      '  <source srcset="https://cdn.example.com/img/photo.webp 1x" type="image/webp">',
      '  <img src="https://cdn.example.com/img/photo.jpg" alt="Fallback" loading="lazy">',
      '</picture>'
    ]), 'Responsive images with srcset and picture element for optimal CDN-served formats.'),
    e('Image Compression Benchmark Script', 'Comparing format effectiveness.', codeBlock([
      '#!/usr/bin/env node',
      'const sharp = require("sharp");',
      'const fs = require("fs");',
      'async function benchmark(inputPath) {',
      '  const formats = [',
      '    { name: "JPEG (q80)", ext: "jpg", opts: { quality: 80 } },',
      '    { name: "WebP (q80)", ext: "webp", opts: { quality: 80 } },',
      '    { name: "AVIF (q50)", ext: "avif", opts: { quality: 50 } },',
      '    { name: "PNG", ext: "png", opts: {} },',
      '  ];',
      '  const original = fs.statSync(inputPath).size;',
      '  console.log(`Original: ${(original / 1024).toFixed(1)}KB\\n`);',
      '  for (const fmt of formats) {',
      '    const output = inputPath.replace(/\\.\\w+$/, `.${fmt.ext}`);',
      '    await sharp(inputPath).toFormat(fmt.ext.replace("jpg", "jpeg"), fmt.opts).toFile(output);',
      '    const size = fs.statSync(output).size;',
      '    const savings = ((original - size) / original * 100).toFixed(1);',
      '    console.log(`${fmt.name}: ${(size / 1024).toFixed(1)}KB (${savings}% smaller)`);',
      '  }',
      '}',
      'benchmark(process.argv[2]);'
    ]), 'Node.js script to benchmark image format sizes and compression effectiveness.')
  ],
  [
    m('What percentage of page weight is images?', ['10%', '25%', '50%', '75%'], 2, 'Images account for approximately 50% of a typical webpage\'s total weight.'),
    m('Which modern format offers the best compression?', ['JPEG', 'PNG', 'WebP', 'AVIF'], 3, 'AVIF offers approximately 50% better compression than JPEG.'),
    m('What does the srcset attribute do?', ['Sets multiple sources for script loading', 'Serves different image sizes based on viewport', 'Sets image source fallback order', 'Configures CDN image optimization'], 1, 'srcset tells the browser which image sizes are available for different viewport widths.'),
    m('What CDN feature converts images to WebP?', ['DDoS protection', 'Format conversion based on Accept header', 'Cache invalidation', 'Load balancing'], 1, 'CDNs convert images based on the Accept header from the browser indicating WebP/AVIF support.'),
    m('What is an image CDN example?', ['CloudFront', 'Imgix', 'Fastly', 'Akamai'], 1, 'Imgix is a specialized image CDN focused on real-time image transformation.'),
    m('What does loading=lazy do?', ['Loads image immediately', 'Defers off-screen image loading', 'Applies image filter', 'Converts image format'], 1, 'loading=lazy defers loading of off-screen images until the user scrolls near them.')
  ]
);

/* =================== TOPIC 13: Compression =================== */
addTopic('cdn-compression', 'Compression', 'intermediate', 15,
  ['Compression reduces the size of content transferred over the network, improving load times and reducing bandwidth costs for CDN delivery.',
   'Text-based content (HTML, CSS, JS, JSON, XML, SVG) compresses extremely well — typically 70-90% size reduction.',
   'Two main compression algorithms: Gzip (widely supported, older) and Brotli (better ratios, modern, preferred). Both are supported by all major CDNs.',
   'CDNs can compress content on-the-fly or serve pre-compressed files. Pre-compression at build time is most efficient for static assets.'
  ],
  'Compression is like vacuum-sealing your clothes for a trip. A fluffy winter jacket (uncompressed HTML file) takes up half your suitcase. Vacuum-seal it (compress with Gzip or Brotli) and it\'s a flat pancake taking 10% of the space. At your destination, you unseal it (browser decompresses) and it\'s back to normal.',
  [
    d('How Compression Works', 'Client sends Accept-Encoding header listing supported algorithms (br, gzip, deflate). Server/CDN selects best supported algorithm, compresses the response, adds Content-Encoding header (br for Brotli, gzip for Gzip). Client decompresses automatically.'),
    d('Gzip Compression', 'Based on DEFLATE algorithm. Compression levels 1-9 (level 6 default). Good balance of speed and compression. Typical reduction: 70-80% for text. Widely supported since HTTP/1.1.'),
    d('Brotli Compression', 'Developed by Google. Compression levels 0-11. Levels 1-4 fast, levels 5-11 higher compression. Level 11 typically 20-30% better than Gzip level 9. Supported by all modern browsers (95%+).'),
    d('Pre-compression Strategy', 'Pre-compress static files at build time: generate .gz and .br versions. Nginx gzip_static/brotli_static serves pre-compressed files directly — zero CPU overhead. CDN caches compressed versions.'),
    d('Compression Configuration at CDN', 'CloudFront: automatic compression (Brotli preferred). Cloudflare: Auto Minify + Brotli compression. Fastly: Vary based on Accept-Encoding. Nginx CDN: gzip on, brotli on. Avoid double compression on already compressed data.')
  ],
  'Compression reduces transferred content size by 70-90% for text-based assets. Brotli is preferred over Gzip for 20-30% better ratios. Pre-compress static assets at build time. Let CDN handle compression for dynamic content.',
  [
    q('What is HTTP compression?', 'Reducing the size of content transferred using algorithms like Gzip and Brotli.'),
    q('What is the difference between Gzip and Brotli?', 'Brotli offers 20-30% better compression than Gzip, especially for text.'),
    q('How does compression work in HTTP?', 'Client sends Accept-Encoding header. Server compresses and adds Content-Encoding header.'),
    q('What content benefits most from compression?', 'Text-based content: HTML, CSS, JS, JSON, XML, SVG — up to 70-90% reduction.'),
    q('What content should NOT be compressed?', 'Already compressed formats: JPEG, PNG, WebP, MP4, WebM, ZIP, PDF.'),
    q('What is pre-compression?', 'Generating compressed (.gz, .br) files at build time and serving them directly.'),
    q('What is the Accept-Encoding header?', 'An HTTP request header listing compression algorithms the client supports.'),
    q('What is the Content-Encoding header?', 'An HTTP response header indicating which compression algorithm was applied.'),
    q('Does CloudFront support Brotli?', 'Yes, CloudFront supports Brotli compression automatically when enabled.'),
    q('What is the most common Nginx compression config?', 'gzip on; gzip_types text/css application/javascript; gzip_comp_level 6;')
  ],
  R(10,35,110,25,'#0070f3','','Browser Request','Accept-Encoding: br, gzip') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','CDN Edge','Select best algorithm') +
  A(290,48,320,48) + A(170,65,170,85) +
  R(330,35,140,25,'#ffc107','','Compressed','Content-Encoding: br') +
  R(10,75,110,25,'#dc3545','','Pre-compressed','.br, .gz at build') +
  R(10,105,110,25,'#e83e8c','','On-the-fly','Dynamic at edge') +
  R(10,135,110,25,'#6610f2','','No Compression','JPEG, MP4, WebP') +
  A(120,88,150,88) + A(120,118,150,118) + A(120,148,150,148) +
  R(160,75,150,100,'#17a2b8','','Compression at CDN','Brotli preferred. Pre-compress static. 70-90% size reduction.') +
  T(240,210,'Compression: Brotli and Gzip reduce text content 70-90%. Pre-compress static assets.',9,'#666','middle'),
  [
    e('Nginx Gzip and Brotli Configuration', 'Enabling compression on origin/CDN.', codeBlock([
      'http {',
      '  gzip on;',
      '  gzip_comp_level 6;',
      '  gzip_min_length 256;',
      '  gzip_types text/plain text/css application/javascript application/json text/xml image/svg+xml;',
      '  gzip_proxied any;',
      '  gzip_vary on;',
      '  gzip_static on;',
      '',
      '  brotli on;',
      '  brotli_comp_level 6;',
      '  brotli_static on;',
      '  brotli_types text/plain text/css application/javascript application/json text/xml image/svg+xml;',
      '}'
    ]), 'Nginx configuration for both Gzip and Brotli compression with pre-compressed file support.'),
    e('Pre-compression Build Script', 'Generating compressed files at build time.', codeBlock([
      '#!/bin/bash',
      'BUILD_DIR="./dist"',
      'find "$BUILD_DIR" -type f \\( -name "*.html" -o -name "*.css" -o -name "*.js"',
      '  -o -name "*.json" -o -name "*.svg" \\) | while read -r file; do',
      '  if [ ! -f "${file}.br" ] || [ "$file" -nt "${file}.br" ]; then',
      '    brotli -k -f -q 11 "$file"',
      '  fi',
      '  if [ ! -f "${file}.gz" ] || [ "$file" -nt "${file}.gz" ]; then',
      '    gzip -k -f -9 "$file"',
      '  fi',
      'done',
      'echo "Pre-compression complete."'
    ]), 'Build-time pre-compression script generating .br and .gz files for all static text assets.'),
    e('CloudFront Compression Settings', 'Enabling compression in CDN.', codeBlock([
      '# In CloudFront distribution settings:',
      '# Under "Compress objects automatically" select Yes.',
      '# CloudFront will use Brotli if supported, fallback to Gzip.',
      '# Files must be > 1000 bytes. Already compressed formats skipped.',
      '',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --default-cache-behavior "Compress=true"'
    ]), 'CloudFront automatic compression configuration.'),
    e('Curl Test for Compression', 'Verifying compression is working.', codeBlock([
      'curl -H "Accept-Encoding: br" -I https://cdn.example.com/style.css',
      '# Response: Content-Encoding: br',
      'curl -H "Accept-Encoding: gzip" -I https://cdn.example.com/style.css',
      '# Response: Content-Encoding: gzip',
      'curl -s -o /dev/null -w "Size: %{size_download} bytes\\n" -H "Accept-Encoding: identity" https://cdn.example.com/style.css',
      'curl -s -o /dev/null -w "Size: %{size_download} bytes\\n" -H "Accept-Encoding: br" https://cdn.example.com/style.css'
    ]), 'Curl commands to verify compression headers and compare compressed vs uncompressed sizes.'),
    e('Cloudflare Auto Minify and Compression', 'Cloudflare compression features.', codeBlock([
      '# Cloudflare Auto Minify:',
      '# Speed -> Optimization -> Auto Minify',
      '# Toggle: HTML, CSS, JavaScript',
      '',
      '# Cloudflare Brotli compression is automatic',
      '# Falls back to Gzip for non-Brotli clients',
      '',
      '# Cloudflare Polish (image compression):',
      '# Speed -> Optimization -> Polish',
      '# Options: Lossless or Lossy'
    ]), 'Cloudflare compression and minification features for optimal content delivery.')
  ],
  [
    m('What algorithm offers the best compression for text?', ['Gzip', 'Brotli', 'Deflate', 'Zstandard'], 1, 'Brotli offers 20-30% better compression than Gzip for text.'),
    m('What header indicates the client supports compression?', ['Content-Encoding', 'Accept-Encoding', 'Transfer-Encoding', 'Cache-Control'], 1, 'Accept-Encoding lists supported compression algorithms.'),
    m('What should NOT be compressed?', ['HTML', 'CSS', 'JSON', 'JPEG'], 3, 'Already compressed formats like JPEG should not be re-compressed.'),
    m('What is pre-compression?', ['Compressing on every request', 'Generating compressed files at build time', 'Compressing images only', 'Edge-level compression'], 1, 'Pre-compression generates .gz and .br files at build time.'),
    m('What does Content-Encoding indicate?', ['Which compression algorithm was applied', 'What client supports', 'Content type', 'Cache policy'], 0, 'Content-Encoding indicates the compression algorithm applied to the response.'),
    m('What is gzip_static in Nginx?', ['Forces dynamic compression', 'Serves pre-compressed .gz files', 'Enables Gzip at OS level', 'Disables Gzip'], 1, 'gzip_static serves pre-compressed .gz files without re-compressing.')
  ]
);

/* =================== TOPIC 14: Brotli =================== */
addTopic('cdn-brotli', 'Brotli', 'intermediate', 15,
  ['Brotli is a compression algorithm developed by Google that offers 20-30% better compression ratios than Gzip for web content.',
   'Brotli uses a pre-defined dictionary of common HTML/CSS/JS strings, making it especially effective for small web files.',
   'Compression levels: 0 (fastest) to 11 (slowest, best compression). Level 4-6 recommended for on-the-fly, level 11 for pre-compressed.',
   'Brotli is supported by all modern browsers (95%+ global coverage). All major CDNs support Brotli.'
  ],
  'Brotli is like a multilingual translator who also knows common phrases. Gzip compresses your sentence word-by-word. Brotli recognizes common phrases like "margin: 0; padding: 0;" and replaces them with shorthand codes. The more common phrases it knows, the shorter the message becomes.',
  [
    d('How Brotli Achieves Better Compression', 'Brotli uses a 120KB static dictionary of common substrings found in HTML, CSS, and JavaScript. It also employs context modeling and large sliding windows (up to 16MB). These make Brotli particularly effective for small web files where Gzip struggles with overhead.'),
    d('Brotli Compression Levels', 'Levels 0-4: fast compression, suitable for on-the-fly. Levels 5-9: moderate speed. Levels 10-11: highest compression, CPU-intensive, best for pre-compressed static files. Level 11 achieves 5-15% better compression than level 6 but takes 10x longer to compress. Decompression is fast at all levels.'),
    d('Brotli vs Gzip Comparison', 'Compression ratio: Brotli level 4 ~ Gzip level 6. Brotli level 11: 20-30% better than Gzip level 9. Compress speed: Gzip is faster. Decompress speed: Brotli is comparable or faster. File size example: 100KB JS — Gzip: ~30KB, Brotli: ~22KB.'),
    d('Brotli at the CDN Edge', 'CDNs can compress on-the-fly with Brotli or serve pre-compressed .br files. CloudFront: automatic Brotli. Cloudflare: Brotli enabled by default. Fastly: Brotli via VCL. Set Content-Encoding: br and Vary: Accept-Encoding for cache separation.'),
    d('Brotli for APIs', 'Brotli is excellent for JSON API responses. A 500KB JSON response compresses to ~50KB with Brotli (vs ~70KB with Gzip). Faster mobile API calls, reduced bandwidth costs. Always check Accept-Encoding and fallback to Gzip for older clients.')
  ],
  'Brotli is Google\'s compression algorithm offering 20-30% better ratios than Gzip. It excels at compressing web content due to its built-in dictionary. Use level 11 for pre-compressed static assets, level 4-6 for on-the-fly. Supported by all modern browsers and major CDNs.',
  [
    q('What is Brotli?', 'A compression algorithm developed by Google offering 20-30% better compression than Gzip for web content.'),
    q('What makes Brotli more effective than Gzip?', 'A built-in dictionary of common HTML/CSS/JS strings and context modeling.'),
    q('What are Brotli compression levels?', '0 (fastest) to 11 (best compression). Level 4-6 for on-the-fly, level 11 for pre-compressed.'),
    q('What improvement does Brotli offer over Gzip?', '20-30% better compression ratios at equivalent quality levels.'),
    q('Is Brotli supported by all browsers?', 'Yes, by all modern browsers — approximately 95%+ global coverage.'),
    q('What Content-Encoding value does Brotli use?', 'Content-Encoding: br'),
    q('What is the best Brotli level for pre-compressed static files?', 'Level 11 — highest compression, done at build time.'),
    q('Does CloudFront support Brotli?', 'Yes, CloudFront supports automatic Brotli compression when enabled.'),
    q('What header must be set for pre-compressed Brotli?', 'Content-Encoding: br and Vary: Accept-Encoding'),
    q('Can Brotli be used for API responses?', 'Yes, it is excellent for JSON — typically 25-35% better than Gzip for API payloads.')
  ],
  R(10,35,110,25,'#0070f3','','Original', 'HTML 20KB') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Gzip','Level 9: 5KB') +
  A(270,48,300,48) +
  R(310,35,170,25,'#dc3545','','Brotli','Level 11: 3.5KB') +
  R(10,70,110,25,'#e83e8c','','Dictionary','120KB common strings') +
  R(10,100,110,25,'#6610f2','','Context Model','Predictive compression') +
  R(10,130,110,25,'#ffc107','','16MB Window','Larger sliding window') +
  A(120,83,150,83) + A(120,113,150,113) + A(120,143,150,143) +
  R(160,70,320,100,'#17a2b8','','Brotli Compression','20-30% better than Gzip. Built-in dictionary. Level 11 for pre-compress. CDN edge support.') +
  T(240,200,'Brotli: Google\'s compression algorithm with 20-30% better ratios than Gzip.',9,'#666','middle'),
  [
    e('Build Script: Brotli Pre-compression', 'Pre-compress all static assets with Brotli 11.', codeBlock([
      '#!/bin/bash',
      'DIST="./dist"',
      'find "$DIST" -type f \\( -name "*.html" -o -name "*.css" -o -name "*.js"',
      '  -o -name "*.json" -o -name "*.svg" \\) -exec sh -c \'',
      '  brotli -k -f -q 11 "$1"',
      '\' _ {} \\;',
      'echo "Brotli pre-compression complete."'
    ]), 'Build script pre-compressing all static text assets with Brotli level 11.'),
    e('Nginx Brotli Module Configuration', 'Serving Brotli pre-compressed files.', codeBlock([
      'http {',
      '  server {',
      '    listen 80;',
      '    server_name cdn.example.com;',
      '    location /static/ {',
      '      root /var/www;',
      '      brotli_static on;',
      '      brotli on;',
      '      brotli_comp_level 6;',
      '      brotli_types text/css application/javascript application/json;',
      '    }',
      '    gzip on;',
      '    gzip_static on;',
      '    gzip_vary on;',
      '  }',
      '}'
    ]), 'Nginx configuration serving pre-compressed Brotli files with Gzip fallback.'),
    e('Brotli vs Gzip Size Comparison Script', 'Compare compression ratios.', codeBlock([
      '#!/usr/bin/env node',
      'const zlib = require("zlib");',
      'const fs = require("fs");',
      'const file = process.argv[2];',
      'const content = fs.readFileSync(file);',
      'const gzipped = zlib.gzipSync(content, { level: 9 });',
      'const brotlied = zlib.brotliCompressSync(content, {',
      '  params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 }',
      '});',
      'const gzipRatio = ((1 - gzipped.length / content.length) * 100).toFixed(1);',
      'const brRatio = ((1 - brotlied.length / content.length) * 100).toFixed(1);',
      'const improvement = ((gzipped.length - brotlied.length) / gzipped.length * 100).toFixed(1);',
      'console.log(`Gzip: ${gzipRatio}%, Brotli: ${brRatio}%, Improvement: ${improvement}%`);'
    ]), 'Node.js script comparing Brotli vs Gzip compression ratios.'),
    e('CDN Brotli Verification with Curl', 'Check if CDN is serving Brotli.', codeBlock([
      'curl -s -I -H "Accept-Encoding: br" https://cdn.example.com/style.css',
      '# Expect: content-encoding: br',
      'curl -s -I -H "Accept-Encoding: gzip" https://cdn.example.com/style.css',
      '# Expect: content-encoding: gzip',
      'curl -s -o /dev/null -w "Time: %{time_total}s, Size: %{size_download}B\\n" -H "Accept-Encoding: br" https://cdn.example.com/bundle.js',
      'curl -s -o /dev/null -w "Time: %{time_total}s, Size: %{size_download}B\\n" -H "Accept-Encoding: identity" https://cdn.example.com/bundle.js'
    ]), 'Curl commands to verify Brotli compression headers from the CDN edge.'),
    e('CloudFront Brotli Configuration (AWS CLI)', 'Enabling Brotli on CloudFront.', codeBlock([
      'aws cloudfront get-distribution-config --id E123456789ABCD --query "DistributionConfig" > config.json',
      '# Edit config.json: set "Compress": true in DefaultCacheBehavior',
      'aws cloudfront update-distribution --id E123456789ABCD --if-match "ETAG_VALUE" --distribution-config file://config.json',
      '# CloudFront will now compress with Brotli when client sends Accept-Encoding: br'
    ]), 'AWS CLI steps to enable Brotli compression on CloudFront.')
  ],
  [
    m('What is Brotli?', ['A caching algorithm', 'A compression algorithm by Google', 'A CDN provider', 'A JS framework'], 1, 'Brotli is a compression algorithm developed by Google.'),
    m('How much better is Brotli than Gzip?', ['5-10%', '20-30%', '50%', 'Same'], 1, 'Brotli offers 20-30% better compression ratios than Gzip.'),
    m('What is the highest Brotli compression level?', ['5', '9', '10', '11'], 3, 'Brotli level 11 provides the highest compression ratio.'),
    m('What Content-Encoding does Brotli use?', ['gzip', 'deflate', 'br', 'brotli'], 2, 'Brotli uses Content-Encoding: br.'),
    m('What makes Brotli effective for web content?', ['Larger windows only', 'Built-in dictionary of common web strings', 'Faster decompression only', 'Hardware acceleration'], 1, 'Brotli\'s built-in dictionary of common web strings makes it effective.'),
    m('Is Brotli supported by major CDNs?', ['No', 'Only Cloudflare', 'Yes, all major CDNs', 'Only Fastly'], 2, 'All major CDNs support Brotli compression.')
  ]
);

/* =================== TOPIC 15: Gzip =================== */
addTopic('cdn-gzip', 'Gzip', 'beginner', 10,
  ['Gzip is a file compression algorithm widely used for HTTP content compression, reducing file sizes by 70-80% for text-based content.',
   'Based on the DEFLATE algorithm, Gzip has been the standard HTTP compression method since HTTP/1.1.',
   'Gzip compression levels: 1 (fastest, least compression) to 9 (slowest, best compression). Level 6 is the default and recommended balance.',
   'While Brotli is superior, Gzip has universal support — every browser, server, and HTTP client supports Gzip.'
  ],
  'Gzip is like the original vacuum-seal bag. It\'s been around forever, works everywhere, and everyone knows how to use it. It reduces your files to about 25% of their original size. A newer bag (Brotli) might be slightly better, but Gzip works in every suitcase (browser) ever made.',
  [
    d('How Gzip Compression Works', 'Gzip uses DEFLATE combining LZ77 (finds repeated sequences) and Huffman coding (shorter codes for frequent bytes). Decompression reconstructs original data exactly (lossless). Content is compressed before sending and decompressed by the browser automatically.'),
    d('Gzip Compression Levels', 'Level 1: fastest, ~50% reduction. Level 6: default, ~70-75% reduction (good balance). Level 9: slowest, ~75-80% reduction. Beyond level 6, diminishing returns — level 9 is only ~2% better but takes 3-4x longer to compress.'),
    d('Gzip in CDN Context', 'CDNs compress on-the-fly or serve pre-compressed .gz files. Static pre-compression at build time is more efficient. CDNs cache compressed versions separately (Vary: Accept-Encoding). Most CDNs prioritize Brotli when supported, falling back to Gzip.'),
    d('Gzip Limitations', 'Less efficient than Brotli for small files. Not effective on already-compressed data. Single-threaded compression. 32KB sliding window limits long-range duplicate detection.'),
    d('Gzip vs Brotli Trade-offs', 'Gzip: universal support, faster compression, good enough (70-80% reduction). Brotli: 20-30% better ratio, slower compression, 95%+ browser support. Serve Brotli to modern browsers, Gzip as fallback.')
  ],
  'Gzip is the universal standard for HTTP compression, supported by every browser and server. While Brotli offers better ratios, Gzip remains essential as a fallback. Compression levels 6-9 provide 70-80% size reduction. Pre-compress .gz files at build time for optimal CDN performance.',
  [
    q('What is Gzip?', 'A compression algorithm for HTTP content, reducing text file sizes by 70-80%.'),
    q('What algorithm does Gzip use?', 'DEFLATE — combining LZ77 and Huffman coding.'),
    q('What are Gzip compression levels?', '1 (fastest) to 9 (best compression). Level 6 is the default.'),
    q('What is the typical compression ratio for text?', '70-80% reduction for HTML, CSS, JS, JSON.'),
    q('Does every browser support Gzip?', 'Yes, universal support across every browser and HTTP client.'),
    q('What Content-Encoding does Gzip use?', 'Content-Encoding: gzip'),
    q('What is gzip_static in Nginx?', 'A module that serves pre-compressed .gz files without re-compressing.'),
    q('What should NOT be Gzip compressed?', 'Already compressed formats: JPEG, PNG, MP4, ZIP, PDF.'),
    q('What header ensures proper cache separation for compressed content?', 'Vary: Accept-Encoding'),
    q('What is the default Gzip level in most servers?', 'Level 6 — good balance of speed and compression.')
  ],
  R(10,35,110,25,'#0070f3','','Browser','Accept-Encoding') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','CDN Edge','Check header') +
  A(290,48,320,48) +
  R(330,35,140,25,'#ffc107','','Gzip','Content-Encoding: gzip') +
  R(10,70,110,25,'#dc3545','','Pre-compressed','.gz at build') +
  R(10,100,110,25,'#e83e8c','','On-the-fly','Dynamic content') +
  R(10,130,110,25,'#6610f2','','Fallback','Brotli unsupported') +
  A(120,83,150,83) + A(120,113,150,113) + A(120,143,150,143) +
  R(160,70,150,100,'#17a2b8','','Gzip Compression','Universal support. 70-80% reduction. Level 6 default. Pre-compress or CDN edge.') +
  T(240,200,'Gzip: Universal HTTP compression standard. Supported by every browser and CDN.',9,'#666','middle'),
  [
    e('Enabling Gzip in Nginx', 'Server-side Gzip configuration.', codeBlock([
      'http {',
      '  gzip on;',
      '  gzip_comp_level 6;',
      '  gzip_min_length 256;',
      '  gzip_proxied any;',
      '  gzip_vary on;',
      '  gzip_static on;',
      '  gzip_types text/plain text/css text/xml text/javascript application/javascript application/json image/svg+xml;',
      '  gzip_disable "msie6";',
      '}'
    ]), 'Nginx Gzip configuration with pre-compressed file support.'),
    e('Pre-compressing with Gzip', 'Build-time pre-compression.', codeBlock([
      'gzip -k -9 style.css',
      '# Creates style.css.gz alongside style.css',
      '',
      'find ./dist -type f \\( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" -o -name "*.svg" \\) -exec gzip -k -9 {} \\;',
      '',
      '# Check savings:',
      'for f in $(find ./dist -name "*.html" | head -5); do',
      '  orig=$(stat -c%s "$f")',
      '  gz=$(stat -c%s "${f}.gz" 2>/dev/null)',
      '  echo "$(basename $f): $(( (orig-gz)*100/orig ))% reduction"',
      'done'
    ]), 'Pre-compressing static files with Gzip level 9 at build time.'),
    e('Express.js Gzip Middleware', 'Server-side compression for dynamic responses.', codeBlock([
      'const express = require("express");',
      'const compression = require("compression");',
      'const app = express();',
      'app.use(compression({',
      '  level: 6,',
      '  threshold: 256,',
      '  filter: (req, res) => {',
      '    const type = res.getHeader("Content-Type");',
      '    if (type && !type.match(/text|json|javascript|xml/)) return false;',
      '    return compression.filter(req, res);',
      '  },',
      '}));',
      'app.get("/api/data", (req, res) => {',
      '  res.json({ message: "This will be Gzip compressed", data: "x".repeat(10000) });',
      '});',
      'app.listen(3000);'
    ]), 'Express.js compression middleware for Gzip compression of dynamic responses.'),
    e('Apache Gzip Configuration (mod_deflate)', 'Apache compression setup.', codeBlock([
      '<IfModule mod_deflate.c>',
      '  SetOutputFilter DEFLATE',
      '  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml',
      '  SetEnvIfNoCase Request_URI \\.(?:gif|jpe?g|png|webp|mp4|zip|gz)$ no-gzip dont-vary',
      '  Header append Vary Accept-Encoding env=!dont-vary',
      '</IfModule>'
    ]), 'Apache mod_deflate configuration for Gzip compression.'),
    e('Curl Test for Gzip', 'Verify Gzip compression.', codeBlock([
      '# Check if Gzip is enabled',
      'curl -I -H "Accept-Encoding: gzip" https://cdn.example.com/style.css',
      '# Look for: Content-Encoding: gzip',
      '',
      '# Compare sizes',
      'curl -s -o /dev/null -w "Uncompressed: %{size_download} bytes\\n" -H "Accept-Encoding: identity" https://cdn.example.com/page.html',
      'curl -s -o /dev/null -w "Gzip: %{size_download} bytes\\n" -H "Accept-Encoding: gzip" https://cdn.example.com/page.html'
    ]), 'Curl commands to test Gzip compression and compare sizes.')
  ],
  [
    m('What is Gzip?', ['Image format', 'Compression algorithm based on DEFLATE', 'CDN provider', 'JavaScript library'], 1, 'Gzip is a compression algorithm based on DEFLATE.'),
    m('What is the default Gzip level?', ['1', '6', '9', '11'], 1, 'Gzip default is level 6 — good balance of speed and ratio.'),
    m('What Content-Encoding does Gzip use?', ['br', 'deflate', 'gzip', 'compress'], 2, 'Gzip uses Content-Encoding: gzip.'),
    m('What is gzip_static?', ['Dynamic compression', 'Serves pre-compressed .gz files', 'Enables Brotli', 'Caches compressed files'], 1, 'gzip_static serves pre-compressed .gz files directly.'),
    m('Does every browser support Gzip?', ['Yes, universal', 'Only modern', 'Only Chrome', 'Only mobile'], 0, 'Gzip has universal support across all browsers.'),
    m('What should you NOT Gzip?', ['HTML', 'CSS', 'JPEG', 'JSON'], 2, 'Already-compressed formats like JPEG should not be Gzipped.')
  ]
);

/* =================== TOPIC 16: HTTP/2 =================== */
addTopic('cdn-http-2', 'HTTP/2', 'intermediate', 20,
  ['HTTP/2 is a major revision of the HTTP protocol that improves performance through multiplexing, header compression, server push, and binary framing.',
   'Key features: multiplexed streams (multiple requests over single TCP connection), HPACK header compression, server push, stream prioritization, and binary protocol.',
   'HTTP/2 eliminates head-of-line blocking (where one slow request blocks others) and reduces connection overhead (from 6+ TCP connections to 1).',
   'CDNs benefit significantly from HTTP/2: multiplexing improves cache fill performance and header compression reduces overhead.'
  ],
  'HTTP/2 is like upgrading from a single-lane road to a multi-lane highway with a carpool lane. HTTP/1.1 forced you to open 6 separate roads to send 6 cars (requests). HTTP/2 is one wide road where all cars travel simultaneously. It compresses the license plates (headers) so each car is smaller.',
  [
    d('Binary Framing Layer', 'HTTP/2 is binary (not text). All communication is broken into frames (HEADERS, DATA, SETTINGS, PRIORITY). Frames from different streams are multiplexed over a single TCP connection. Binary format is more efficient to parse and less error-prone.'),
    d('Multiplexing and HOL Blocking', 'HTTP/1.1: one request per connection, 6-8 parallel connections. If one connection is slow, it blocks the queue. HTTP/2: all requests share one TCP connection. If one stream is slow, other streams continue unaffected.'),
    d('HPACK Header Compression', 'HTTP/1.1 sends headers as plaintext (800 bytes+ per request). HTTP/2 uses HPACK: static table, dynamic table, and Huffman encoding. Typical reduction: 85-90% header size.'),
    d('Server Push', 'Server can proactively send resources before the client requests them. Being deprecated in Chrome. Preload links (<link rel="preload">) are recommended instead.'),
    d('HTTP/2 and CDNs', 'All major CDNs support HTTP/2. CDNs terminate HTTP/2 with clients and may use HTTP/1.1 or HTTP/2 to origin. Benefits: improved cache fill, reduced connection overhead, better mobile performance.')
  ],
  'HTTP/2 improves performance through multiplexing, HPACK header compression, and binary framing. It eliminates HTTP/1.1\'s head-of-line blocking and reduces connection overhead. All major CDNs support HTTP/2.',
  [
    q('What is HTTP/2?', 'A major HTTP protocol revision with multiplexing, HPACK compression, and binary framing.'),
    q('What is multiplexing?', 'Multiple request/response streams over a single TCP connection.'),
    q('What is head-of-line blocking?', 'In HTTP/1.1, one slow request on a connection blocks subsequent requests on that connection.'),
    q('What is HPACK?', 'HTTP/2 header compression — reduces header size by 85-90%.'),
    q('What is server push?', 'Server proactively sends resources before the client requests them. Being deprecated.'),
    q('How does HTTP/2 improve CDN performance?', 'Multiplexing speeds up cache fill, reduces connection overhead.'),
    q('Is HTTP/2 binary or text?', 'Binary — all frames are binary, more efficient to parse.'),
    q('How many TCP connections does HTTP/2 use?', 'One connection per origin (vs 6-8 in HTTP/1.1).'),
    q('Did HTTP/2 change HTTP semantics?', 'No — methods, status codes, headers, and URLs remain the same.'),
    q('What is ALPN?', 'TLS extension that negotiates HTTP/2 during the TLS handshake.')
  ],
  R(10,35,110,25,'#0070f3','','HTTP/1.1','6 connections') +
  R(10,65,110,25,'#28a745','','HTTP/2','1 connection') +
  A(120,48,150,48) + A(120,78,150,78) +
  R(160,35,320,55,'#17a2b8','','HTTP/2 Benefits','Multiplexing: single TCP connection. HPACK: 85-90% header compression. Binary framing.') +
  R(160,100,120,25,'#dc3545','','Multiplexing','No HOL blocking') +
  R(160,130,120,25,'#ffc107','','HPACK','Header compression') +
  R(160,160,120,25,'#e83e8c','','Server Push','Proactive push') +
  T(240,210,'HTTP/2: Multiplexing, HPACK, binary framing. Single TCP connection per origin.',9,'#666','middle'),
  [
    e('HTTP/2 Server Configuration (Nginx)', 'Enabling HTTP/2 on Nginx.', codeBlock([
      'server {',
      '  listen 443 ssl http2;',
      '  server_name cdn.example.com;',
      '  ssl_certificate /etc/ssl/certs/example.pem;',
      '  ssl_certificate_key /etc/ssl/private/example.key;',
      '  ssl_protocols TLSv1.2 TLSv1.3;',
      '  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;',
      '  ssl_prefer_server_ciphers on;',
      '  add_header Strict-Transport-Security "max-age=63072000" always;',
      '  location / { root /var/www; }',
      '}'
    ]), 'Nginx HTTP/2 configuration with SSL/TLS requirements.'),
    e('Verifying HTTP/2 with Curl', 'Check HTTP version.', codeBlock([
      'curl -s -I --http2 https://cdn.example.com/',
      '# HTTP/2 200',
      '',
      'curl -s -I --http1.1 https://cdn.example.com/',
      '# HTTP/1.1 200 OK',
      '',
      'echo "=== HTTP/2 ==="',
      'curl -w "Connect: %{time_connect}s TTFB: %{time_starttransfer}s Total: %{time_total}s\\n" -o /dev/null -s --http2 https://cdn.example.com/',
      'echo "=== HTTP/1.1 ==="',
      'curl -w "Connect: %{time_connect}s TTFB: %{time_starttransfer}s Total: %{time_total}s\\n" -o /dev/null -s --http1.1 https://cdn.example.com/'
    ]), 'Curl commands to verify HTTP/2 support and compare performance.'),
    e('CloudFront HTTP/2 Configuration', 'Enabling HTTP/2 on CloudFront.', codeBlock([
      'aws cloudfront get-distribution --id E123456789ABCD --query "Distribution.DistributionConfig.HttpVersion"',
      '# Should be "http2" or "http2and3"',
      '',
      'aws cloudfront update-distribution --id E123456789ABCD --http-version http2',
      '# CloudFront HTTP/2 is enabled by default for new distributions'
    ]), 'AWS CLI commands to check and configure HTTP/2 support on CloudFront.'),
    e('HTTP/2 Multiplexing Visualization', 'Performance comparison.', codeBlock([
      '# HTTP/1.1: 100 requests across 6 connections',
      '# Connection 1: req1 -> req2 -> req3 ... (blocking)',
      '# Connection 2: req1 -> req2 -> req3 ... (blocking)',
      '# ... up to 6 connections total',
      '',
      '# HTTP/2: 100 requests over 1 connection',
      '# |--- req1 ---|',
      '# |--- req2 ---|  (all in parallel)',
      '# |--- req3 ---|',
      '# Single TCP connection, multiplexed streams'
    ]), 'Visual comparison of HTTP/1.1 vs HTTP/2 request handling.'),
    e('HTTP/2 Connection Coalescing', 'Multiple domains sharing one connection.', codeBlock([
      '# When cdn.example.com and static.example.com',
      '# resolve to the same CDN edge IP, the browser',
      '# can reuse the same HTTP/2 connection for both.',
      '',
      '# SSL certificate must cover both hostnames:',
      '# Subject: *.example.com',
      '',
      '# Reduces connection overhead by 50-80%'
    ]), 'HTTP/2 connection coalescing allows multiple domains to share one CDN connection.')
  ],
  [
    m('What is the key advantage of HTTP/2?', ['Encryption by default', 'Multiplexing over single connection', 'New status codes', 'Larger bodies'], 1, 'HTTP/2 multiplexes multiple streams over a single TCP connection.'),
    m('What is HPACK?', ['HTTP/2 header compression', 'Hardware packet accelerator', 'HTTP toolkit', 'Protocol for API calls'], 0, 'HPACK compresses HTTP/2 headers by 85-90%.'),
    m('How many TCP connections does HTTP/2 use?', ['6', '8', '1', '2'], 2, 'HTTP/2 uses one TCP connection per origin.'),
    m('What problem does multiplexing solve?', ['Slow server response', 'Head-of-line blocking', 'DNS delay', 'SSL overhead'], 1, 'Multiplexing eliminates head-of-line blocking.'),
    m('Is HTTP/2 binary or text?', ['Text', 'Binary', 'Both', 'XML'], 1, 'HTTP/2 uses a binary framing layer.'),
    m('What is ALPN?', ['TLS extension for HTTP/2 negotiation', 'Compression algorithm', 'Cache invalidation', 'Load balancing'], 0, 'ALPN negotiates HTTP/2 during the TLS handshake.')
  ]
);

/* =================== TOPIC 17: HTTP/3 =================== */
addTopic('cdn-http-3', 'HTTP/3', 'advanced', 20,
  ['HTTP/3 is the latest HTTP protocol version, built on QUIC (Quick UDP Internet Connections) instead of TCP, offering significant performance improvements.',
   'Key improvements: zero-RTT connection establishment, no head-of-line blocking at transport layer, built-in encryption, connection migration, and improved loss recovery.',
   'Unlike HTTP/2 (TCP-based), HTTP/3 runs over QUIC (UDP-based), eliminating TCP head-of-line blocking where a lost packet blocks ALL streams.',
   'HTTP/3 is particularly beneficial for mobile users (connection migration) and high-latency or lossy connections.'
  ],
  'HTTP/3 is like upgrading from a train (TCP) to independent drones (QUIC/UDP). With the train, if one track is blocked (lost packet), the entire train stops. With drones, each package flies independently. If one drone is delayed, the others keep going. Drones already know your address (0-RTT) and can switch bases if you move (connection migration).',
  [
    d('QUIC Protocol (Foundation)', 'QUIC is a transport protocol on UDP. It integrates TLS 1.3 directly, provides stream multiplexing without HOL blocking, includes forward error correction, and has built-in connection migration. Standardized as RFC 9000.'),
    d('0-RTT Connection Establishment', 'HTTP/3 can send data on the first packet (0-RTT) for returning clients. Client remembers previous connection parameters. Reconnects without a handshake. HTTP/1.1: 3 round trips. HTTP/3: 0 for returning visitors.'),
    d('No Transport-Level HOL Blocking', 'HTTP/2 solved HTTP-level HOL blocking but has TCP-level HOL blocking. A lost TCP packet blocks ALL HTTP/2 streams. QUIC isolates streams — a lost packet only affects its stream. For 2-5% packet loss, HTTP/3 can be 15-30% faster.'),
    d('Connection Migration', 'When a mobile user switches from WiFi to cellular, TCP connections must be re-established. QUIC uses a Connection ID — when IP changes, the connection survives. Transformative for mobile users.'),
    d('HTTP/3 Adoption and CDN Support', 'All major CDNs support HTTP/3: CloudFront, Cloudflare (enabled by default), Fastly, Akamai. All modern browsers support HTTP/3. ~30-40% of web traffic uses HTTP/3 as of 2025.')
  ],
  'HTTP/3 (QUIC over UDP) eliminates transport-layer HOL blocking, enables 0-RTT connection reuse, and supports connection migration. It is a significant evolution over HTTP/2, especially for lossy networks and mobile connections.',
  [
    q('What is HTTP/3?', 'The latest HTTP protocol built on QUIC (UDP) instead of TCP, with 0-RTT, no HOL blocking, and connection migration.'),
    q('What is QUIC?', 'Quick UDP Internet Connections — a transport protocol standardized as RFC 9000.'),
    q('What is 0-RTT?', 'Zero Round Trip Time — returning clients send data immediately without a handshake.'),
    q('How does HTTP/3 eliminate HOL blocking?', 'QUIC isolates streams so a lost packet only affects one stream, not all.'),
    q('What is connection migration?', 'QUIC connections survive IP changes (WiFi to cellular) using a Connection ID.'),
    q('What protocol does QUIC use instead of TCP?', 'UDP (User Datagram Protocol).'),
    q('Is encryption mandatory in HTTP/3?', 'Yes, TLS 1.3 is integrated into QUIC, making encryption mandatory.'),
    q('What makes HTTP/3 better for mobile?', 'Connection migration allows seamless WiFi to cellular switching.'),
    q('Which major CDNs support HTTP/3?', 'CloudFront, Cloudflare, Fastly, Akamai all support HTTP/3.'),
    q('What header advertises HTTP/3 support?', 'Alt-Svc: h3=":443"; ma=86400')
  ],
  R(10,35,110,25,'#0070f3','','HTTP/1.1','TCP, 3 RTT') +
  R(10,65,110,25,'#28a745','','HTTP/2','TCP, 2 RTT') +
  R(10,95,110,25,'#dc3545','','HTTP/3','QUIC/UDP, 0-1 RTT') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) +
  R(160,35,320,95,'#17a2b8','','HTTP/3 Evolution','TCP -> QUIC/UDP. 0-RTT, no HOL blocking, connection migration, built-in TLS 1.3.') +
  R(160,140,140,25,'#ffc107','','Mobile','Seamless network switch') +
  R(160,165,140,25,'#e83e8c','','Lossy Networks','30% faster with loss') +
  T(240,210,'HTTP/3: QUIC/UDP. 0-RTT, no HOL blocking, connection migration, mandatory encryption.',9,'#666','middle'),
  [
    e('Enabling HTTP/3 on CloudFront', 'CloudFront HTTP/3 configuration.', codeBlock([
      '# Via AWS Management Console:',
      '# Distribution -> Edit -> Supported HTTP Versions',
      '# Select "HTTP/2 and HTTP/3"',
      '',
      '# Via AWS CLI:',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --http-version http2and3 \\',
      '  --if-match "ETAG_VALUE"',
      '',
      '# Requirements:',
      '# - HTTPS only (viewer protocol)',
      '# - TLSv1.2 or TLSv1.3',
      '',
      '# Verify with curl:',
      'curl -s -I --http3 https://d123.cloudfront.net/'
    ]), 'AWS CLI and console configuration for enabling HTTP/3 on CloudFront.'),
    e('Cloudflare HTTP/3 Enablement', 'HTTP/3 is enabled by default.', codeBlock([
      '# Cloudflare HTTP/3 is enabled by default for all plans',
      '',
      '# Verify via Dashboard:',
      '# Network tab -> HTTP/3 (with QUIC) -> On',
      '',
      '# Verify via API:',
      'curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/http3" \\',
      '  -H "Authorization: Bearer $TOKEN"',
      '',
      '# Response should show "value": "on"'
    ]), 'Cloudflare HTTP/3 configuration — enabled by default.'),
    e('Nginx HTTP/3 Configuration', 'Enabling HTTP/3 on Nginx.', codeBlock([
      'server {',
      '  listen 443 quic reuseport;',
      '  listen 443 ssl http2;',
      '  server_name cdn.example.com;',
      '  ssl_certificate /etc/ssl/certs/example.pem;',
      '  ssl_certificate_key /etc/ssl/private/example.key;',
      '  ssl_protocols TLSv1.2 TLSv1.3;',
      '  ssl_early_data on;',
      '  add_header Alt-Svc \'h3=":443"; ma=86400\';',
      '  quic_retry on;',
      '  location / { root /var/www/static; }',
      '}'
    ]), 'Nginx HTTP/3 (QUIC) configuration with HTTP/2 fallback.'),
    e('Verify HTTP/3 with Curl', 'Testing HTTP/3 support.', codeBlock([
      '# Requires curl built with quiche/HTTP/3 support',
      'curl -s -I --http3 https://cdn.example.com/',
      '# Response: HTTP/3 200',
      '',
      'echo "=== HTTP/3 ==="',
      'curl -w "\\nConnect: %{time_connect}s\\nTTFB: %{time_starttransfer}s\\nTotal: %{time_total}s\\n" -o /dev/null -s --http3 https://cdn.example.com/',
      'echo "=== HTTP/2 ==="',
      'curl -w "\\nConnect: %{time_connect}s\\nTTFB: %{time_starttransfer}s\\nTotal: %{time_total}s\\n" -o /dev/null -s --http2 https://cdn.example.com/'
    ]), 'Curl commands with HTTP/3 to compare connection times.'),
    e('HTTP/3 Alt-Svc Header', 'How servers advertise HTTP/3.', codeBlock([
      '# Server sends Alt-Svc header to advertise HTTP/3:',
      'Alt-Svc: h3=":443"; ma=86400',
      '',
      '# h3 = HTTP/3 over QUIC',
      '# :443 = UDP port 443',
      '# ma=86400 = cache for 24 hours',
      '',
      '# Browser then attempts QUIC connection',
      '# Falls back to TCP if QUIC fails',
      '# Future requests use HTTP/3 directly'
    ]), 'The Alt-Svc header mechanism for HTTP/3 discovery and upgrade.')
  ],
  [
    m('What transport does HTTP/3 use?', ['TCP', 'UDP (via QUIC)', 'SCTP', 'WebSocket'], 1, 'HTTP/3 uses QUIC over UDP.'),
    m('What is 0-RTT?', ['Zero data', 'Faster setup', 'Zero round trips for returning clients', 'No encryption'], 2, '0-RTT allows returning clients to send data immediately.'),
    m('What does HTTP/3 fix that HTTP/2 still has?', ['Slow responses', 'TCP HOL blocking', 'Large headers', 'No encryption'], 1, 'HTTP/2 has TCP-level HOL blocking; HTTP/3 eliminates it.'),
    m('What is connection migration?', ['Server migration', 'Connection survives IP changes', 'Content migration', 'User migration'], 1, 'QUIC connections survive IP changes via Connection ID.'),
    m('Is encryption mandatory in HTTP/3?', ['No', 'Yes, TLS 1.3 built-in', 'Only for POST', 'Optional'], 1, 'TLS 1.3 is integrated into QUIC.'),
    m('What header advertises HTTP/3?', ['Cache-Control', 'Alt-Svc', 'Content-Type', 'Accept-Encoding'], 1, 'Alt-Svc: h3=":443"; ma=86400 advertises HTTP/3.')
  ]
);

/* =================== TOPIC 18: CDN Security =================== */
addTopic('cdn-security', 'CDN Security', 'intermediate', 20,
  ['CDN security encompasses DDoS mitigation, WAF, SSL/TLS, bot management, and access control features provided at the edge.',
   'CDNs act as a security shield by sitting between users and the origin, absorbing attacks and filtering malicious traffic.',
   'Key features: DDoS protection, Web Application Firewall (SQLi, XSS), SSL/TLS termination, geo-blocking, rate limiting, and bot detection.',
   'CDN security is defense in depth — multiple layers protect against different attack vectors simultaneously.'
  ],
  'CDN security is like having a private security team at your building entrance instead of just a lock on your apartment door. The team checks everyone coming in, stops known troublemakers (DDoS), checks for weapons (WAF), and only lets appropriate people through to your door.',
  [
    d('DDoS Protection', 'CDNs absorb volumetric DDoS attacks across thousands of servers. Layer 3/4 attacks: absorbed by network infrastructure. Layer 7 attacks: detected via rate limiting, behavioral analysis, and challenges. Cloudflare can absorb 2+ Tbps attacks.'),
    d('Web Application Firewall (WAF)', 'CDN WAF inspects HTTP requests for SQL injection, XSS, path traversal, command injection. Managed rule sets (OWASP Top 10). Custom rules for application-specific threats. Logging and alerting for blocked requests.'),
    d('SSL/TLS Termination at Edge', 'CDN terminates TLS from users, decrypts, re-encrypts to origin. Offloads CPU from origin. Supports modern TLS versions (1.3). Manages certificates centrally. Full end-to-end encryption available.'),
    d('Bot Management', 'CDNs distinguish legitimate users from bots via JS challenges, CAPTCHA, behavioral analysis, IP reputation, and browser fingerprinting. Googlebot allowed through. Suspicious traffic challenged or blocked.'),
    d('Access Control Features', 'Geo-blocking: block traffic by country. IP whitelisting/blacklisting. Signed URLs/cookies for time-limited access. Token authentication. HTTP basic auth at edge. All enforced before origin.')
  ],
  'CDN security provides defense in depth: DDoS absorption, WAF, SSL/TLS termination, bot management, and access control. The CDN shields the origin by filtering malicious traffic at the edge.',
  [
    q('What security features do CDNs provide?', 'DDoS mitigation, WAF, SSL/TLS, bot management, geo-blocking, rate limiting, signed URLs.'),
    q('How does a CDN protect against DDoS?', 'By absorbing attack traffic across its globally distributed infrastructure.'),
    q('What is a CDN WAF?', 'A Web Application Firewall that inspects HTTP requests for malicious patterns.'),
    q('How does SSL termination work at CDN?', 'CDN terminates TLS from users, decrypts, re-encrypts when forwarding to origin.'),
    q('What is geo-blocking?', 'Blocking or allowing traffic from specific geographic regions at the CDN edge.'),
    q('What are signed URLs?', 'Time-limited URLs with cryptographic signatures for temporary content access.'),
    q('How do CDNs handle bot management?', 'JS challenges, CAPTCHA, behavioral analysis, IP reputation, rate limiting.'),
    q('What is rate limiting?', 'Restricting requests from an IP/path/region within a time window.'),
    q('Can a CDN prevent SQL injection?', 'Yes, through WAF rules inspecting request bodies and parameters.'),
    q('What is origin cloaking?', 'Hiding the origin server IP so attackers cannot directly target it.')
  ],
  R(10,35,110,25,'#0070f3','','Layer 3/4','DDoS') +
  R(10,65,110,25,'#28a745','','Layer 7','WAF, rate limit') +
  R(10,95,110,25,'#ffc107','','SSL/TLS','Edge termination') +
  R(10,125,110,25,'#dc3545','','Bot Mgmt','Challenges') +
  R(10,155,110,25,'#e83e8c','','Access Ctrl','Geo-block, signed URLs') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','CDN Security Shield','Defense in depth at the edge: DDoS, WAF, SSL, bot management, access control.') +
  T(240,220,'CDN Security: DDoS, WAF, SSL/TLS, bot management, geo-blocking, signed URLs.',9,'#666','middle'),
  [
    e('CloudFront Security Headers via Lambda@Edge', 'Adding security headers.', codeBlock([
      'exports.handler = async (event) => {',
      '  const response = event.Records[0].cf.response;',
      '  const headers = response.headers;',
      '  headers["strict-transport-security"] = [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubdomains; preload" }];',
      '  headers["x-content-type-options"] = [{ key: "X-Content-Type-Options", value: "nosniff" }];',
      '  headers["x-frame-options"] = [{ key: "X-Frame-Options", value: "DENY" }];',
      '  headers["x-xss-protection"] = [{ key: "X-XSS-Protection", value: "1; mode=block" }];',
      '  headers["referrer-policy"] = [{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }];',
      '  return response;',
      '};'
    ]), 'Lambda@Edge adding security headers to all CDN responses.'),
    e('Cloudflare WAF Custom Rule', 'Creating WAF rules.', codeBlock([
      '# Block SQL injection via API:',
      'curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d \'{"action": "block", "expression": "(lower(http.request.uri.path) contains \\"select\\")", "description": "Block SQLi", "enabled": true}\'',
      '',
      '# Rate limiting login:',
      'curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rate_limits" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d \'{"threshold": 5, "period": 60, "action": "block", "match": {"request": {"url": "https://example.com/login"}}}\''
    ]), 'Cloudflare WAF and rate limiting rules via API.'),
    e('Fastly VCL Security (Rate Limiting)', 'Edge security with VCL.', codeBlock([
      'sub vcl_recv {',
      '  if (ratecounter.rate_limit_count(req.url.path, "1 minute", 30) > 30) {',
      '    error 429 "Rate limit exceeded";',
      '  }',
      '  if (req.http.Fastly-Geo-Country == "XX") {',
      '    error 403 "Region blocked";',
      '  }',
      '}',
      'sub vcl_error {',
      '  if (obj.status == 429) {',
      '    set obj.status = 429;',
      '    set obj.response = "Too Many Requests";',
      '    set obj.http.Retry-After = "60";',
      '    return (deliver);',
      '  }',
      '}'
    ]), 'Fastly VCL for rate limiting and geo-blocking at the edge.'),
    e('SSL/TLS Configuration (CloudFront)', 'End-to-end encryption.', codeBlock([
      '# Viewer protocol: redirect HTTP to HTTPS',
      'aws cloudfront update-distribution --id E123456789ABCD --default-cache-behavior "ViewerProtocolPolicy=redirect-to-https"',
      '',
      '# Origin protocol: HTTPS only',
      'aws cloudfront update-distribution --id E123456789ABCD --origins "DomainName=origin.example.com,Id=myOrigin,OriginProtocolPolicy=https-only"',
      '',
      '# Minimum TLS version: TLSv1.2_2021',
      '# Custom SSL via ACM',
      'aws acm import-certificate --certificate file://cert.pem --private-key file://key.pem'
    ]), 'CloudFront SSL/TLS configuration for end-to-end encryption.'),
    e('Signed URL with CloudFront', 'Protecting content with signed URLs.', codeBlock([
      'const crypto = require("crypto");',
      'const expiration = Math.floor(Date.now() / 1000) + 3600;',
      'const policy = JSON.stringify({',
      '  Statement: [{',
      '    Resource: "https://d123.cloudfront.net/private/*",',
      '    Condition: { DateLessThan: { "AWS:EpochTime": expiration } }',
      '  }]',
      '});',
      'const signature = crypto.createSign("RSA-SHA1").update(policy).sign(privateKey, "base64");',
      'const signedUrl = `https://d123.cloudfront.net/private/file.pdf?Expires=${expiration}&Signature=${encodeURIComponent(signature)}&Key-Pair-Id=${keyPairId}`;'
    ]), 'CloudFront signed URL generation for private content access.')
  ],
  [
    m('What is the primary DDoS protection mechanism of CDNs?', ['Blocking all traffic', 'Absorbing attacks across distributed infrastructure', 'Rate limiting only', 'Server shutdown'], 1, 'CDNs absorb DDoS attacks across their globally distributed network.'),
    m('What does a CDN WAF protect against?', ['DDoS only', 'SQL injection, XSS, and other web attacks', 'DNS attacks', 'Physical attacks'], 1, 'WAF protects against web application attacks like SQLi and XSS.'),
    m('What is origin cloaking?', ['Hiding origin IP', 'Encrypting origin data', 'Backing up origin', 'Load balancing'], 0, 'Origin cloaking hides the origin server IP from attackers.'),
    m('What are signed URLs used for?', ['Public content', 'Time-limited access to protected content', 'DDoS mitigation', 'SSL termination'], 1, 'Signed URLs provide time-limited access to protected content.'),
    m('What is geo-blocking?', ['Blocking all traffic', 'Blocking traffic by geographic region', 'Geographic routing', 'Location analytics'], 1, 'Geo-blocking restricts traffic based on geographic region.'),
    m('What is defense in depth?', ['Single security layer', 'Multiple security layers', 'Deep encryption', 'Physical security'], 1, 'CDN security uses multiple layers (DDoS, WAF, SSL, bot mgmt) for defense in depth.')
  ]
);

/* =================== TOPIC 19: Geo Routing =================== */
addTopic('cdn-geo-routing', 'Geo Routing', 'intermediate', 15,
  ['Geo routing directs user requests to the nearest CDN edge server based on geographic location, minimizing latency.',
   'Methods: DNS-based routing (geo DNS returns IP of nearest PoP) and Anycast routing (multiple PoPs share IP, BGP routes to nearest).',
   'Geo routing considers: geographic distance, server load, network conditions, cache availability, and origin health.',
   'Advanced geo routing uses real-time internet weather data to dynamically route around congestion and outages.'
  ],
  'Geo routing is like a GPS navigation system that directs you to the nearest gas station instead of one across town. When you need directions, the system checks where you are, finds all nearby stations, considers traffic (server load), and sends you to the best one. If one station is crowded, it routes you to the next closest.',
  [
    d('DNS-Based Geo Routing', 'DNS server returns different IP addresses based on the client\'s resolver location. Uses GeoIP databases to map IPs to regions. Simple to implement. Updates can be slow (DNS TTL). Less precise than Anycast. Used by: Akamai, Azure CDN, legacy CDNs.'),
    d('Anycast Routing', 'Multiple edge servers share the same IP address. BGP (Border Gateway Protocol) automatically routes traffic to the nearest server announcing that IP. Fast failover (if one PoP goes down, BGP converges to next nearest). More precise and resilient. Used by: Cloudflare, Fastly, CloudFront.'),
    d('Geo Routing Factors', 'Latency: primary metric (measured via RTT). Server load: avoid overloaded edge servers. Cache availability: prefer edge with cached content. Origin health: route around unhealthy origins. Network conditions: avoid congested paths. Cost: some routes may be cheaper. Custom rules: route specific content to specific regions.'),
    d('Real-Time Traffic Steering', 'Advanced CDNs use real-time monitoring to detect network congestion, packet loss, and latency spikes. Traffic is dynamically rerouted to avoid problem areas. Fastly uses real-time data to steer traffic around internet weather events. Cloudflare Argo Smart Routing optimizes paths in real-time.'),
    d('Geo Routing for Origin Traffic', 'CDNs can also route requests to the nearest origin server (multi-region origins). User in Europe -> nearest European edge -> nearest European origin. Requires origin servers in multiple regions. Benefits: lower latency for dynamic cache misses, compliance (data sovereignty).')
  ],
  'Geo routing directs users to the nearest CDN edge server using DNS-based or Anycast routing. Anycast is preferred for its precision and fast failover. Advanced routing considers server load, cache state, and real-time network conditions. Multi-region origin routing further reduces latency for dynamic content.',
  [
    q('What is geo routing?', 'Directing user requests to the nearest CDN edge server based on geographic location.'),
    q('What are the two main geo routing methods?', 'DNS-based routing (geo DNS) and Anycast routing (shared IP with BGP).'),
    q('How does DNS-based geo routing work?', 'DNS returns different IP addresses based on the client resolver\'s geographic location.'),
    q('How does Anycast routing work?', 'Multiple PoPs share the same IP address; BGP routes traffic to the nearest one.'),
    q('What is the advantage of Anycast over DNS routing?', 'Faster failover, more precise routing, and automatic load distribution.'),
    q('What factors does geo routing consider?', 'Latency, server load, cache availability, origin health, and network conditions.'),
    q('What is traffic steering?', 'Dynamically routing traffic based on real-time network conditions and performance data.'),
    q('What is multi-region origin routing?', 'Routing requests to the nearest origin server for lower latency on cache misses.'),
    q('Which CDNs use Anycast routing?', 'Cloudflare, Fastly, and CloudFront use Anycast for edge routing.'),
    q('What is Argo Smart Routing?', 'Cloudflare\'s real-time traffic optimization that finds faster paths across the internet.')
  ],
  R(10,35,110,25,'#0070f3','','User in EU','Requests content') +
  R(10,65,110,25,'#28a745','','User in US','Requests content') +
  R(10,95,110,25,'#ffc107','','User in Asia','Requests content') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) +
  R(160,35,310,100,'#17a2b8','','Geo Routing (Anycast + DNS)','Routes each user to nearest edge PoP based on location, load, cache, and network health.') +
  R(10,140,110,25,'#dc3545','','Factors','Latency, load, cache') +
  R(160,140,140,25,'#e83e8c','','Anycast','Shared IP, BGP routed') +
  R(160,170,140,25,'#6610f2','','DNS Geo','Region-based IP') +
  T(240,210,'Geo Routing: Directing users to nearest CDN edge via Anycast or DNS-based geo routing for lowest latency.',9,'#666','middle'),
  [
    e('Anycast Routing with BGP', 'How Anycast distributes traffic.', codeBlock([
      '# Multiple edge PoPs announce the same IP block',
      '# via BGP to the internet routing table.',
      '',
      '# PoP1 (New York):',
      '#   router bgp 65001',
      '#   network 203.0.113.0/24',
      '',
      '# PoP2 (London):',
      '#   router bgp 65002',
      '#   network 203.0.113.0/24',
      '',
      '# When a user in NY resolves cdn.example.com,',
      '# traffic goes to PoP1 (closest BGP announcement).',
      '# If PoP1 goes down, BGP converges to PoP2.',
      '# Converge time: typically <30 seconds.'
    ]), 'BGP configuration for Anycast routing across multiple edge PoPs.'),
    e('CloudFront Geo Restriction', 'Geographic access control.', codeBlock([
      '# CloudFront geo restriction (whitelist/blacklist)',
      '',
      '# Whitelist: only allow these countries',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --geo-restriction \\',
      '    "RestrictionType=whitelist,Locations=[US,CA,GB]"',
      '',
      '# Blacklist: block these countries',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --geo-restriction \\',
      '    "RestrictionType=blacklist,Locations=[XX]"',
      '',
      '# Geo restriction uses MaxMind GeoIP database',
      '# Applied at edge locations before content is served'
    ]), 'CloudFront geo restriction for allowing or blocking countries.'),
    e('Fastly Geo-Based VCL Routing', 'Geo routing with Fastly VCL.', codeBlock([
      'backend us_origin { .host = "us-origin.example.com"; }',
      'backend eu_origin { .host = "eu-origin.example.com"; }',
      'backend asia_origin { .host = "asia-origin.example.com"; }',
      '',
      'sub vcl_recv {',
      '  if (req.http.Fastly-Geo-Country ~ "(US|CA|MX)") {',
      '    set req.backend = us_origin;',
      '  } else if (req.http.Fastly-Geo-Country ~ "(GB|DE|FR|NL|IT|ES)") {',
      '    set req.backend = eu_origin;',
      '  } else if (req.http.Fastly-Geo-Country ~ "(JP|KR|SG|AU|NZ)") {',
      '    set req.backend = asia_origin;',
      '  } else {',
      '    set req.backend = us_origin;',
      '  }',
      '}'
    ]), 'Fastly VCL geo-routing requests to the nearest origin backend.'),
    e('Cloudflare Argo Smart Routing', 'Real-time traffic optimization.', codeBlock([
      '# Cloudflare Argo Smart Routing:',
      '# - Learns optimal paths across the internet',
      '# - Avoids congested routes in real-time',
      '# - Typically 30% faster on average',
      '# - Enabled via Dashboard: Speed -> Optimization -> Argo',
      '',
      '# How it works:',
      '# 1. Cloudflare edge nodes share latency data',
      '# 2. Argo builds a real-time internet map',
      '# 3. Traffic is routed through optimal intermediary nodes',
      '# 4. Paths adapt to changing network conditions',
      '',
      '# Benefits:',
      '# - Lower latency for uncached content',
      '# - Better performance for dynamic requests',
      '# - Automatic failover around outages'
    ]), 'Cloudflare Argo Smart Routing for real-time traffic optimization.'),
    e('Multi-Region Origin with Route53', 'DNS-based origin geo routing.', codeBlock([
      '# AWS Route 53 geo routing policy for origins',
      '',
      '# Create latency-based routing to multiple origins:',
      '# Record: origin.example.com',
      '# Type: A - Latency routing',
      '',
      '# Region: us-east-1',
      '#   Value: 203.0.113.10 (us-origin)',
      '#   Region: us-east-1',
      '',
      '# Region: eu-west-1',
      '#   Value: 203.0.113.20 (eu-origin)',
      '#   Region: eu-west-1',
      '',
      '# Region: ap-southeast-1',
      '#   Value: 203.0.113.30 (asia-origin)',
      '#   Region: ap-southeast-1',
      '',
      '# CloudFront origins: point to Route53 alias',
      '# Users resolve to nearest origin via latency routing'
    ]), 'Route 53 latency-based routing for multi-region origin deployment.')
  ],
  [
    m('What are the two main geo routing methods?', ['DNS-based and Anycast', 'HTTP and HTTPS', 'TCP and UDP', 'IPv4 and IPv6'], 0, 'The two main methods are DNS-based geo routing and Anycast routing.'),
    m('How does Anycast routing work?', ['Different IP per PoP', 'Multiple PoPs share one IP, BGP routes to nearest', 'DNS returns different IPs', 'HTTP redirects'], 1, 'Anycast shares one IP across multiple PoPs; BGP routes to the nearest.'),
    m('What is the advantage of Anycast over DNS routing?', ['Slower updates', 'Faster failover and more precise', 'More complex', 'Less reliable'], 1, 'Anycast provides faster failover and more precise routing than DNS-based.'),
    m('What is Argo Smart Routing?', ['Cloudflare DNS service', 'Real-time traffic path optimization', 'CDN caching product', 'Compression algorithm'], 1, 'Argo Smart Routing optimizes traffic paths in real-time.'),
    m('What factors affect geo routing decisions?', ['Only distance', 'Latency, load, cache, network health', 'Only server load', 'Only cache availability'], 1, 'Geo routing considers latency, server load, cache state, and network health.'),
    m('What is multi-region origin routing?', ['Multiple CDN providers', 'Routing to nearest origin server', 'Multiple DNS providers', 'Multiple SSL certificates'], 1, 'Multi-region origin routes to the nearest origin server for lower latency.')
  ]
);

/* =================== TOPIC 20: Geo Blocking =================== */
addTopic('cdn-geo-blocking', 'Geo Blocking', 'intermediate', 15,
  ['Geo blocking restricts content access based on the user\'s geographic location. Used for licensing compliance, regional content restrictions, and security.',
   'CDNs implement geo blocking at the edge, rejecting requests from blocked regions before they reach the origin, reducing origin load and attack surface.',
   'Implementation: GeoIP database lookup at the edge, comparison against allow/deny lists, and appropriate HTTP response (403, redirect, or custom block page).',
   'Accuracy and limitations: GeoIP databases are ~99% accurate at country level but less precise for cities. VPNs/proxies can bypass geo blocking.'
  ],
  'Geo blocking is like a bouncer at a club that checks your ID to see if you\'re from a allowed region. If your ID shows a blocked country, you\'re turned away at the door before you even enter. The bouncer (CDN edge) doesn\'t even bother telling the DJ (origin) about you.',
  [
    d('GeoIP Database and Accuracy', 'CDNs use GeoIP databases (MaxMind, IP2Location) to map IP addresses to countries. Country-level accuracy: ~99%. City-level: ~80-90%. Databases updated monthly. Some CDNs (Cloudflare) have their own proprietary GeoIP data. VPN/Proxy detection can identify evaders.'),
    d('Whitelist vs Blacklist Approach', 'Whitelist: only allow traffic from specific countries (strictest, best for security). Blacklist: block specific countries while allowing all others (common for licensing). Global allow with country exceptions: most flexible but requires careful rule ordering.'),
    d('Edge Implementation', 'Geo blocking happens at CDN edge before origin. No origin load from blocked requests. Low latency (checked locally at edge). HTTP response customization: 403 Forbidden, redirect to different page, custom block page, or captcha challenge.'),
    d('Use Cases', 'Licensing compliance: media/streaming rights by region. Regulatory compliance: GDPR (EU data stay in EU), data sovereignty laws. Security: block high-threat regions. Content localization: serve different content per region. Pricing: region-specific pricing for digital goods.'),
    d('Bypass Techniques and Mitigations', 'VPNs, proxies, and Tor can bypass geo blocking. CDNs detect known VPN/proxy IPs. Threat intelligence feeds flag suspicious proxies. Challenge unsupported IPs with captcha. Combine geo blocking with other security measures (rate limiting, WAF).')
  ],
  'Geo blocking restricts content access by geographic region at the CDN edge. It uses GeoIP databases, supports whitelist/blacklist, and can be bypassed by VPNs. CDNs can detect and block many proxies to improve effectiveness.',
  [
    q('What is geo blocking?', 'Restricting content access based on the user\'s geographic location.'),
    q('How does a CDN implement geo blocking?', 'GeoIP database lookup at edge, comparing against allow/deny lists.'),
    q('What HTTP status does geo blocking typically return?', '403 Forbidden (can be customized to redirect or block page).'),
    q('What is the difference between whitelist and blacklist?', 'Whitelist allows only listed countries; blacklist blocks listed countries.'),
    q('How accurate is country-level GeoIP?', '~99% accurate at country level.'),
    q('What are common use cases for geo blocking?', 'Licensing, compliance, security, content localization, pricing.'),
    q('Can VPNs bypass geo blocking?', 'Yes, but CDNs detect and can block known VPN/proxy IPs.'),
    q('Where does geo blocking happen in the request flow?', 'At the CDN edge, before reaching the origin.'),
    q('What is GDPR-related geo blocking?', 'Keeping EU user data within EU regions for compliance.'),
    q('What databases do CDNs use for geo blocking?', 'MaxMind GeoIP, IP2Location, or proprietary (Cloudflare).')
  ],
  R(10,35,110,25,'#0070f3','','User','Attempts access') +
  R(160,35,160,25,'#28a745','','GeoIP Database','Maps IP to country') +
  R(160,65,160,25,'#ffc107','','Decision','Allowed or blocked?') +
  R(10,135,110,25,'#28a745','','Allowed','Pass through to origin') +
  R(10,165,110,25,'#dc3545','','Blocked','403 / redirect / captcha') +
  A(120,48,150,48) + A(320,48,150,48) + A(320,78,150,78) + A(120,148,150,148) + A(120,178,150,178) +
  R(160,100,160,50,'#17a2b8','','Geo Blocking Logic','Whitelist? Blacklist? VPN detected? Custom rules?') +
  T(240,215,'Geo Blocking: Restrict content by geography at edge. GeoIP + whitelist/blacklist + VPN detection.',9,'#666','middle'),
  [
    e('CloudFront Geo Restriction via Console', 'Setting up geo blocking.', codeBlock([
      '# AWS Console:',
      '# CloudFront -> Distribution -> Restrictions -> Geo Restriction',
      '',
      '# Option 1: Whitelist (Allow List)',
      '# Select countries to ALLOW traffic from',
      '# All other countries get 403 Forbidden',
      '',
      '# Option 2: Blacklist (Block List)',
      '# Select countries to BLOCK traffic from',
      '# All other countries are allowed',
      '',
      '# Geo restriction is applied per distribution',
      '# Uses MaxMind GeoIP database',
      '# Cannot customize block response page natively'
    ]), 'CloudFront console geo restriction setup with whitelist/blacklist options.'),
    e('Cloudflare Geo Blocking via WAF', 'Geo blocking with Cloudflare WAF.', codeBlock([
      '# Block traffic from specific countries:',
      '',
      '# Dashboard: Security -> WAF -> Custom Rules',
      '# Expression: (ip.geoip.country in {"XX" "YY" "ZZ"})',
      '# Action: Block',
      '',
      '# Or via API:',
      'curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d \'{"action": "block", "expression": "(ip.geoip.country in {\\"XX\\" \\"YY\\"})", "description": "Geo Block"}\'',
      '',
      '# Cloudflare uses its own GeoIP (more accurate)',
      '# Can combine with IP reputation scoring'
    ]), 'Cloudflare WAF geo blocking with country-specific rules.'),
    e('Fastly Geo Blocking in VCL', 'Geo blocking with Fastly VCL.', codeBlock([
      'sub vcl_recv {',
      '  # Block high-threat regions',
      '  if (req.http.Fastly-Geo-Country ~ "(XX|YY|ZZ)") {',
      '    error 403 "Access denied from your region";',
      '  }',
      '',
      '  # Only allow US traffic for licensed content',
      '  if (req.url ~ "^/licensed/" && req.http.Fastly-Geo-Country != "US") {',
      '    error 403 "Content not available in your region";',
      '  }',
      '',
      '  # Custom block page (serve from Fastly)',
      '  if (req.http.Fastly-Geo-Country == "XX") {',
      '    set req.url = "/blocked.html";',
      '    error 900 "Blocked";',
      '  }',
      '}',
      'sub vcl_error {',
      '  if (obj.status == 900) {',
      '    set obj.status = 403;',
      '    return (deliver);',
      '  }',
      '}'
    ]), 'Fastly VCL geo blocking with custom block pages and selective blocking.'),
    e('Akamai Geo Blocking via Property Manager', 'Geo blocking with Akamai.', codeBlock([
      '# Akamai Property Manager:',
      '# Add behavior -> Access Control ->',
      '# "Deny Access Based on Country"',
      '',
      '# Configuration:',
      '# - Select Deny or Allow behavior',
      '# - Country list (multi-select)',
      '# - Response: 403 Forbidden or custom',
      '',
      '# Match criteria:',
      '# - Country code from GeoIP',
      '# - Can combine with other criteria',
      '#   (path, device, cookie)',
      '',
      '# Also available via Akamai API (PAPI)',
      '# Can use EdgeWorkers for complex logic'
    ]), 'Akamai Property Manager geo blocking configuration.'),
    e('VPN/Proxy Detection with Geo Blocking', 'Detecting geo-block bypass attempts.', codeBlock([
      '# Cloudflare VPN/Proxy detection:',
      '# Field: cf.edge.server_ip_type',
      '# Values: "vpn", "proxy", "tor", "hosting"',
      '# Available in WAF expressions',
      '',
      '# WAF rule: Block VPN + blocked country',
      'expression: ',
      '  (ip.geoip.country eq "XX") or ',
      '  (cf.edge.server_ip_type eq "vpn")',
      '',
      '# Rate limiting proxy users:',
      '# If IP type is proxy, apply stricter limits',
      '# e.g., 5 req/min instead of 100 req/min',
      '',
      '# Drawback: false positives for legitimate users',
      '# traveling or using corporate VPNs'
    ]), 'VPN and proxy detection to strengthen geo blocking effectiveness.')
  ],
  [
    m('What is geo blocking?', ['Blocking all traffic', 'Restricting content by geographic location', 'Blocking IP addresses', 'Blocking content types'], 1, 'Geo blocking restricts content by the user\'s geographic location.'),
    m('Where does geo blocking happen?', ['At the origin server', 'At the CDN edge', 'At the DNS server', 'At the client browser'], 1, 'Geo blocking happens at the CDN edge before reaching the origin.'),
    m('What is the accuracy of country-level GeoIP?', ['~50%', '~80%', '~99%', '~60%'], 2, 'Country-level GeoIP is approximately 99% accurate.'),
    m('What does a whitelist geo block do?', ['Allows all countries', 'Allows only listed countries', 'Blocks only listed countries', 'Allows all traffic'], 1, 'A whitelist only allows traffic from specified countries.'),
    m('How can users bypass geo blocking?', ['Using a different browser', 'Using VPNs/proxies', 'Clearing cookies', 'Disabling JavaScript'], 1, 'Users commonly use VPNs or proxies to bypass geo blocking.'),
    m('What is GDPR-related geo blocking?', ['Blocking EU users', 'Keeping EU data within EU regions', 'Blocking all traffic', 'Allowing EU users'], 1, 'GDPR-related geo blocking keeps EU user data within EU regions.')
  ]
);

/* =================== TOPIC 21: DDoS Protection =================== */
addTopic('cdn-ddos-protection', 'DDoS Protection', 'advanced', 25,
  ['CDNs protect against Distributed Denial of Service (DDoS) attacks by absorbing and filtering malicious traffic across their globally distributed infrastructure.',
   'DDoS attack types: volumetric (bandwidth exhaustion), protocol (SYN flood, DNS amplification), and application layer (HTTP flood, slow loris).',
   'CDN DDoS mitigation layers: network edge (packet filtering), load balancers (traffic distribution), application-aware inspection (WAF, rate limiting).',
   'CDNs can absorb attacks up to multiple Tbps by distributing traffic across thousands of edge servers, each handling a fraction of the attack.'
  ],
  'DDoS protection by a CDN is like having a thousand fire stations across the country instead of just one. When arsonists start fires everywhere (DDoS attack), instead of one station getting overwhelmed, each station handles the fires in its neighborhood. A few extra sprinklers (rate limiting) and fire inspectors (WAF) at each station also help.',
  [
    d('Volumetric (Layer 3/4) Attacks', 'Goal: saturate bandwidth. Types: UDP floods, ICMP floods, amplification (DNS, NTP, SSDP). CDN mitigation: absorbs at network edge, null-routes attacking IPs, uses Anycast to distribute traffic. Cloudflare absorbed 2.5 Tbps+ attacks.'),
    d('Protocol (Layer 3/4) Attacks', 'Goal: exhaust server/network resources. Types: SYN floods, ACK floods, fragmented packet attacks. CDN mitigation: SYN cookies, connection tracking, TCP stack hardening. Fastly and Cloudflare handle millions of SYNs per second.'),
    d('Application Layer (Layer 7) Attacks', 'Goal: crash application server. Types: HTTP floods, slow loris, slow POST, cache-busting attacks. CDN mitigation: rate limiting, WAF inspection, challenge pages (JS challenge, captcha), behavioral analysis. Most dangerous because hardest to distinguish from legitimate traffic.'),
    d('Always-On vs On-Demand Protection', 'Always-on: CDN continuously scrubs all traffic. On-demand: traffic is redirected to scrubbing center only during attacks (may have 1-5 minute switchover). CDNs typically offer always-on for basic protection; premium plans add on-demand for large attacks.'),
    d('CDN DDoS Response Flow', '1) Traffic arrives at closest edge. 2) Layer 3/4 filters drop obvious attacks. 3) Connection tracking ensures valid TCP. 4) Rate limiting per IP/region/ASN. 5) WAF inspects HTTP requests. 6) Behavioral analysis identifies attack patterns. 7) Challenge pages verify humans.')
  ],
  'CDN DDoS protection uses layered defense: network edge absorbs volumetric, protocol filtering handles SYN/UDP floods, WAF and rate limiting mitigate application attacks. Always-on scrubbing and Anycast distribution enable multi-Tbps attack absorption.',
  [
    q('What is a DDoS attack?', 'Distributed Denial of Service — multiple systems flood a target with traffic to overwhelm it.'),
    q('How do CDNs protect against DDoS?', 'Distribute traffic across global edge network, filter at multiple layers.'),
    q('What are the three DDoS attack types?', 'Volumetric (Layer 3/4), Protocol, Application (Layer 7).'),
    q('What is a SYN flood?', 'Attack sends many TCP SYN requests without completing the handshake, exhausting server resources.'),
    q('What is an HTTP flood?', 'Sending many legitimate-looking HTTP requests to overwhelm the application server.'),
    q('What is always-on DDoS protection?', 'Traffic is continuously scrubbed by the CDN for all traffic all the time.'),
    q('What is on-demand DDoS protection?', 'Traffic routed to scrubbing centers only during an active attack.'),
    q('What is a challenge page?', 'A JS challenge or captcha that verifies the visitor is human, not a bot.'),
    q('What was the largest DDoS attack absorbed by a CDN?', 'Cloudflare absorbed a 2.5+ Tbps attack in 2023.'),
    q('What is the downside of always-on DDoS protection?', 'Potential latency added from inspection, even when no attack is happening.')
  ],
  R(10,35,80,25,'#dc3545','','Attacker','Botnet') +
  R(10,65,80,25,'#dc3545','','Attacker','SYN flood') +
  R(10,95,80,25,'#dc3545','','Attacker','HTTP flood') +
  A(90,48,140,48) + A(90,78,140,78) + A(90,108,140,108) +
  R(150,35,160,25,'#0070f3','','Layer 3/4','Packet filter') +
  R(150,65,160,25,'#0070f3','','Layer 7','WAF + rate limit') +
  R(150,95,160,25,'#0070f3','','Behavioral','Challenge page') +
  A(310,48,340,48) + A(310,78,340,78) + A(310,108,340,108) +
  R(350,35,120,90,'#28a745','','CDN Edge','Distributed absorption across thousands of servers') +
  A(470,80,490,80) +
  R(500,35,100,90,'#17a2b8','','Origin','Protected') +
  T(280,205,'DDoS Protection: Layered filtering at CDN edge absorbs multi-Tbps attacks and shields origin.',9,'#666','middle'),
  [
    e('Cloudflare DDoS Overview & Settings', 'Cloudflare DDoS protection configuration.', codeBlock([
      '# Cloudflare DDoS protection is automatic',
      '# and included on all plans',
      '',
      '# Dashboard: Security -> DDoS',
      '# Settings:',
      '# - DDoS Attack Alerts (Webhooks/Email)',
      '# - DDoS Override (mitigation sensitivity)',
      '# - Advanced DDoS Rules',
      '',
      '# Custom DDoS rule via API:',
      'curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ddos_rules" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d \'{"action": "block", "expression": "(http.request.method eq \\"GET\\")", "sensitivity": "high"}\'',
      '',
      '# DDoS alerts:',
      '# - HTTP DDoS Attack Alert',
      '# - Layer 3/4 DDoS Attack Alert',
      '# - Advanced DDoS Attack Alert'
    ]), 'Cloudflare DDoS protection settings and custom rules configuration.'),
    e('AWS Shield + CloudFront DDoS Protection', 'AWS DDoS protection for CloudFront.', codeBlock([
      '# AWS Shield Standard (Free)',
      '# - Automatic with CloudFront and Route53',
      '# - Protects against L3/L4 attacks',
      '# - Up to 5 Gbps protection',
      '',
      '# AWS Shield Advanced ($3,000/month)',
      '# - Enhanced DDoS protection',
      '# - 24/7 DRT access',
      '# - Financial protection (cost reimbursement)',
      '# - Real-time metrics and visibility',
      '# - Up to 500 Gbps+ protection',
      '',
      '# Enabling Shield Advanced for CloudFront:',
      'aws shield create-protection --name "cdn-distribution" \\',
      '  --resource-arn "arn:aws:cloudfront::123456789:distribution/E123456789ABCD"',
      '',
      '# Shield Advanced also provides:',
      '# - Application Layer (L7) DDoS mitigation',
      '# - Health-based detection',
      '# - Custom mitigation rules'
    ]), 'AWS Shield Standard and Advanced DDoS protection for CloudFront distributions.'),
    e('Rate Limiting for HTTP Floods', 'Rate limiting to mitigate Layer 7 attacks.', codeBlock([
      '# Cloudflare Rate Limiting:',
      '# Dashboard: Security -> WAF -> Rate Limiting Rules',
      '# Rule: Block if > 100 requests from same IP in 1 minute',
      '',
      '# Via API:',
      'curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rate_limits" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -d \'{"threshold": 100, "period": 60, "action": "block", "match": {"request": {"url": "https://example.com/login"}}}\'',
      '',
      '# Fastly:',
      'if (ratecounter.rate_limit_count(req.url.path, "10 seconds") > 50) {',
      '  error 429 "Too many requests";',
      '}',
      '',
      '# NGINX:',
      'limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;'
    ]), 'Rate limiting rules for mitigating HTTP flood DDoS attacks.'),
    e('Challenge Page (JS Challenge)', 'Bot verification via challenge.', codeBlock([
      '# Cloudflare JS Challenge:',
      '# Security -> Settings -> Challenge Passage',
      '',
      '# JS Challenge works:',
      '# 1. CDN returns interstitial HTML page',
      '# 2. Browser executes JavaScript challenge',
      '# 3. If solved, visitor gets cf_clearance cookie',
      '# 4. Cookie valid for challenge passage period',
      '# 5. Permanent access (no more challenges)',
      '',
      '# Non-JS environments (API clients):',
      '# Cannot solve JS challenge -> blocked',
      '# API clients should use rate limiting instead',
      '',
      '# Alternative: CAPTCHA challenge',
      '# - Manual verification for sensitive endpoints',
      '# - Higher security but worse user experience',
      '# - Turnstile: Cloudflare\'s privacy-first captcha'
    ]), 'JS Challenge page mechanism for verifying human visitors during DDoS events.'),
    e('DDoS Incident Response with CDN', 'Responding to a DDoS attack.', codeBlock([
      '# 1. Detect: Monitor CDN analytics for traffic spikes',
      'curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/analytics/dashboard" | jq ".result.totals.http_requests"',
      '',
      '# 2. Activate DDoS override (if needed)',
      'curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ddos_override" -d \'{"action": "block"}\'',
      '',
      '# 3. Enable "I\'m Under Attack" mode (Cloudflare)',
      'curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/security_level" -d \'{"value": "under_attack"}\'',
      '',
      '# 4. Rate limit aggressively',
      '# 5. Block attacking IPs/ASNs/regions',
      '# 6. Contact CDN support for escalation',
      '# 7. Monitor:',
      'curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/security/events" | jq ".result" | head -20'
    ]), 'DDoS incident response commands using CDN APIs to mitigate active attacks.')
  ],
  [
    m('What are the three types of DDoS attacks?', ['SQL injection, XSS, CSRF', 'Volumetric, Protocol, Application', 'GET, POST, PUT', 'Internal, external, lateral'], 1, 'DDoS attacks are categorized as volumetric, protocol, and application layer.'),
    m('How does a CDN absorb volumetric DDoS attacks?', ['By blocking all traffic', 'By distributing traffic across global edge servers', 'By rate limiting only', 'By disabling the site'], 1, 'CDN distributes attack traffic across thousands of edge servers.'),
    m('What is an HTTP flood?', ['Many DNS queries', 'Many legitimate-looking HTTP requests', 'Many SYN packets', 'Many UDP packets'], 1, 'An HTTP flood sends many HTTP requests to overwhelm the application.'),
    m('What is a challenge page?', ['Login page', 'JS/CAPTCHA verification page', 'Error page', 'Homepage'], 1, 'A challenge page verifies the visitor is human, not a bot.'),
    m('What is always-on DDoS protection?', ['Protection only during attacks', 'Continuous traffic scrubbing', 'Manual mitigation', 'No protection'], 1, 'Always-on scrubs all traffic continuously.'),
    m('What is AWS Shield Advanced?', ['Free DDoS protection', 'Premium DDoS protection for AWS', 'WAF service', 'CDN service'], 1, 'AWS Shield Advanced is a premium DDoS protection service.')
  ]
);

/* =================== TOPIC 22: WAF Integration =================== */
addTopic('cdn-waf-integration', 'WAF Integration', 'intermediate', 20,
  ['A Web Application Firewall (WAF) integrated with a CDN inspects HTTP traffic at the edge, blocking malicious requests before they reach the origin.',
   'WAF protects against: SQL injection, XSS (Cross-Site Scripting), path traversal, command injection, CSRF, file inclusion, and OWASP Top 10 threats.',
   'CDN WAF integrates seamlessly with CDN caching and routing — malicious requests are blocked at the edge, while legitimate traffic is cached and served normally.',
   'Modern CDN WAFs use managed rule sets (OWASP, vendor-specific), custom rules, rate limiting, and machine learning for anomaly detection.'
  ],
  'WAF integrated with a CDN is like having a security checkpoint at the entrance of a building, not just at each office door. The security guard checks for weapons, suspicious packages, and known threats before anyone enters. If someone looks suspicious, they are stopped at the entrance, never reaching the offices (origin).',
  [
    d('WAF at Edge vs Origin', 'Edge WAF: inspects at CDN edge, blocks before origin. Zero origin load from blocked requests. Lower latency (no origin trip). Origin WAF: inspects at application server. More context-aware but consumes origin resources. CDN WAF is the industry standard.'),
    d('Managed Rule Sets', 'Pre-built rule sets maintained by CDN vendor. OWASP Top 10 rules (CRS - Core Rule Set). Vendor-specific: Cloudflare Managed, AWS Managed, Fastly Signal Sciences. Regular rule updates from vendor. Customizable (paranoia levels, anomaly thresholds).'),
    d('Custom WAF Rules', 'User-defined rules for application-specific threats. Match on: URI, headers, body, cookies, IP, country, device. Actions: block, challenge, log, rate limit, bypass. Use regex or DSL (VCL, Lua). Priority ordering matters. Rule testing and dry-run modes available.'),
    d('WAF Logging and Analytics', 'Comprehensive logging of blocked/allowed requests. Attack analytics dashboard. Top attack vectors, sources, and targets. Real-time alerts for spikes in blocked traffic. Logs stored for compliance (SIEM integration via log streaming).'),
    d('WAF Performance Considerations', 'Edge WAF adds minimal latency (microseconds to low milliseconds). Rule count and complexity affect performance. Heavy regex can slow processing. WAF bypass for static cached resources (images, CSS) reduces unnecessary inspection. Parallel vs sequential rule evaluation.')
  ],
  'CDN WAF inspects HTTP traffic at the edge against managed and custom rules, blocking SQLi, XSS, and OWASP Top 10 threats before they reach origin. It offers managed rule sets, custom rules, rate limiting, ML-based detection, and comprehensive logging.',
  [
    q('What does WAF stand for?', 'Web Application Firewall.'),
    q('What attacks does WAF protect against?', 'SQL injection, XSS, path traversal, command injection, OWASP Top 10.'),
    q('Where is the WAF in a CDN architecture?', 'At the CDN edge, inspecting traffic before it reaches the origin.'),
    q('What is a managed rule set?', 'Pre-built WAF rules maintained by the CDN vendor (e.g., OWASP CRS).'),
    q('What is a custom WAF rule?', 'User-defined rule for application-specific threats using match criteria and actions.'),
    q('What is WAF paranoia level?', 'Configurable sensitivity level in OWASP CRS (1-4, higher = more strict).'),
    q('What is WAF bypass?', 'Skipping WAF inspection for certain paths or resource types for performance.'),
    q('How does WAF impact latency?', 'Minimal (microseconds to low milliseconds) when processing at edge.'),
    q('What is OWASP CRS?', 'Open Web Application Security Project Core Rule Set — standard WAF rules.'),
    q('Can WAF block legitimate traffic?', 'Yes, false positives are possible. Tuning with log/traffic analysis is essential.')
  ],
  R(10,35,110,25,'#dc3545','','User','Sends request') +
  R(350,35,110,25,'#dc3545','','Malicious User','SQL injection payload') +
  A(120,48,150,48) + A(460,48,150,48) +
  R(160,35,180,50,'#0070f3','','CDN Edge WAF','Inspect: URI, headers, body, cookies. Check: managed rules, custom rules, rate limits.') +
  A(340,60,400,60) +
  R(410,35,80,50,'#ffc107','','WAF Action','Allowed? Block? Challenge?') +
  A(490,60,510,60) + A(490,60,160,85) +
  R(150,95,170,25,'#28a745','','Origin (Protected)','Legitimate traffic only') +
  R(160,130,170,25,'#dc3545','','Blocked (at edge)','403 Forbidden') +
  T(240,180,'WAF Integration: Edge-based Web Application Firewall blocks OWASP Top 10 threats before reaching origin.',9,'#666','middle'),
  [
    e('Cloudflare WAF Managed Rules', 'Enabling Cloudflare managed WAF rules.', codeBlock([
      '# Dashboard: Security -> WAF -> Managed Rules',
      '',
      '# Enable OWASP CRS:',
      '# - Paranoia Level: 1 (low) to 4 (high)',
      '# - Anomaly Threshold: 5-100 (lower = strict)',
      '# - Recommended: Level 2, threshold 10',
      '',
      '# Enable Cloudflare Managed Ruleset:',
      '# - Contains rules for common attacks',
      '# - Updated automatically by Cloudflare',
      '# - Log mode first to identify false positives',
      '',
      '# Via API:',
      'curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_custom" \\',
      '  -H "Authorization: Bearer $TOKEN" \\',
      '  -d \'{"rules": [{"action": "block", "expression": "(http.request.uri.path contains \\"admin\\")"}]\''
    ]), 'Cloudflare managed WAF rules including OWASP CRS with configurable paranoia levels.'),
    e('AWS WAF with CloudFront', 'Integrating AWS WAF with CloudFront.', codeBlock([
      '# Create Web ACL:',
      'aws wafv2 create-web-acl --name "cdn-acl" --scope CLOUDFRONT \\',
      '  --default-action "Allow={}" \\',
      '  --rules \'[',
      '    {',
      '      "Name": "AWS-AWSManagedRulesCommonRuleSet",',
      '      "Priority": 0,',
      '      "Statement": { "ManagedRuleGroupStatement": {',
      '        "VendorName": "AWS", "Name": "AWSManagedRulesCommonRuleSet"',
      '      }},',
      '      "OverrideAction": { "None": {} }',
      '    }',
      '  ]\'',
      '',
      '# Associate with CloudFront:',
      'aws cloudfront associate-web-acl --distribution-id E123456789ABCD \\',
      '  --web-acl-id "arn:aws:wafv2:us-east-1:123456789:global/webacl/cdn-acl/abc123"',
      '',
      '# AWS WAF managed rule groups:',
      '# - CommonRuleSet (SQLi, XSS, LFI)',
      '# - AdminProtection (admin area access)',
      '# - KnownBadInputs (probe patterns)',
      '# - AmazonIPReputationList (bot/spam IPs)'
    ]), 'AWS WAF with CloudFront using managed rule groups for comprehensive protection.'),
    e('Custom WAF Rule (Cloudflare)', 'Creating custom WAF rules.', codeBlock([
      '# Custom rule: Block requests with suspicious query strings',
      'expression: ',
      '  (starts_with(lower(http.request.uri.query), "select") or ',
      '   starts_with(lower(http.request.uri.query), "union") or ',
      '   starts_with(lower(http.request.uri.query), "drop") or ',
      '   starts_with(lower(http.request.uri.query), "delete"))',
      'action: block',
      '',
      '# Custom rule: Challenge login page from unknown IPs',
      'expression: ',
      '  (http.request.uri.path eq "/login") and ',
      '  (not ip.src in {"203.0.113.0/24" "10.0.0.0/8"})',
      'action: managed_challenge',
      '',
      '# Test custom rules in Log mode first!',
      '# Monitor Security Events before enabling Block'
    ]), 'Custom WAF rules for SQL injection detection and login page protection.'),
    e('Fastly Signal Sciences WAF', 'Fastly WAF (Signal Sciences) integration.', codeBlock([
      '# Fastly WAF (Signal Sciences) features:',
      '# - ML-based attack detection',
      '# - Custom rules and signals',
      '# - Agent-based or edge-based deployment',
      '# - Covers OWASP Top 10 + API security',
      '',
      '# VCL integration example:',
      'sub vcl_recv {',
      '  if (req.http.Fastly-SigSci-Attack) {',
      '    error 403 "Blocked by WAF";',
      '  }',
      '}',
      '',
      '# Custom signal:',
      '# Dashboard -> WAF -> Custom Signals',
      '# Signal: high_rate_login_attempts',
      '# Condition: >20 POST to /login in 1 min',
      '# Action: block for 5 minutes',
      '',
      '# Signal Sciences agent-side:',
      '# Installed on origin, sends telemetry to Fastly',
      '# Edge blocks based on agent + edge signals'
    ]), 'Fastly Signal Sciences WAF with ML detection and custom signals.'),
    e('WAF Logging and Analysis', 'Monitoring WAF events.', codeBlock([
      '# Cloudflare Security Events:',
      '# Dashboard: Security -> Events',
      '# Filter by action: block, challenge, log',
      '# View top attack sources, paths, payloads',
      '',
      '# Log streaming to SIEM:',
      '# Dashboard: Analytics & Logs -> Logpush',
      '# Destination: S3, Datadog, Splunk, Sumo Logic',
      '',
      '# AWS WAF logging:',
      'aws wafv2 put-logging-configuration \\',
      '  --logging-configuration \'{"ResourceArn": "arn:aws:wafv2:...", "LogDestinationConfigs": ["arn:aws:firehose:..."]}\'',
      '',
      '# Analyze logs:',
      'curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/security/events" \\',
      '  | jq ".result[] | select(.action == \"blocked\") | .ray_id, .source, .rule_id"',
      '',
      '# Set up alerts for WAF blocks exceeding threshold'
    ]), 'WAF logging and analysis with SIEM integration for monitoring blocked traffic.')
  ],
  [
    m('What does a WAF protect against?', ['Only DDoS', 'SQL injection, XSS, and OWASP Top 10', 'Only brute force', 'Only bot traffic'], 1, 'WAF protects against SQLi, XSS, and other OWASP Top 10 threats.'),
    m('Where is the WAF located in a CDN?', ['At the origin server', 'At the CDN edge', 'At the client browser', 'At the DNS server'], 1, 'CDN WAF is at the edge, inspecting traffic before origin.'),
    m('What is OWASP CRS?', ['Caching rule system', 'Core Rule Set for WAF', 'Content routing service', 'Certificate revocation system'], 1, 'OWASP CRS is the Core Rule Set for WAF.'),
    m('What is WAF paranoia level?', ['Server location', 'Sensitivity level (1-4)', 'Cache level', 'Security level'], 1, 'Paranoia level controls WAF sensitivity from 1 (low) to 4 (high).'),
    m('What should you do before enabling custom WAF rules?', ['Enable immediately', 'Test in log mode first', 'Disable other rules', 'Contact support'], 1, 'Always test custom rules in log mode before enabling blocking.'),
    m('What is a WAF bypass?', ['Skipping WAF for certain paths', 'Bypassing origin', 'Bypassing cache', 'Bypassing DNS'], 0, 'WAF bypass skips inspection for specific paths or resource types.')
  ]
);

/* =================== TOPIC 23: Signed URLs =================== */
addTopic('cdn-signed-urls', 'Signed URLs', 'intermediate', 15,
  ['Signed URLs provide time-limited, authenticated access to private content. They are URLs with a cryptographic signature, expiration time, and optional IP/country restrictions.',
   'A signed URL grants temporary access to a specific resource (or path prefix). The CDN validates the signature and expiration before serving the content.',
   'Use cases: streaming paywalled video, private file downloads, software package distribution, pay-per-view content, and any time-limited access scenario.',
   'Popular CDNs supporting signed URLs: CloudFront, Cloudflare, Fastly, Akamai. Google Cloud CDN, Azure CDN. Implementation varies slightly but the concept is universal.'
  ],
  'A signed URL is like a VIP ticket with an expiry time. The ticket includes a special stamp (signature) that proves it\'s authentic. When you show the ticket at the venue (CDN), the bouncer checks the stamp and the date. If it\'s valid and not expired, you\'re let in. Anyone who could forge the stamp is kept out.',
  [
    d('How Signed URLs Work', '1) Private key held by content provider. 2) Policy created (resource, expiration, optional conditions). 3) Policy signed with private key. 4) Signature appended to URL as query parameter. 5) CDN validates signature with public key. 6) Serves or denies content.'),
    d('Policy and Conditions', 'Policy (JSON document) specifies: Resource URL or path prefix. Expiration time (absolute epoch). Optional: IP range allowed, date range, user agent pattern. Policy is base64-encoded and signed.'),
    d('Key Pair Management', 'CloudFront: uses key pairs (public/private). Cloudflare: uses token keys. Fastly: platform-managed or custom keys. Key rotation: regularly rotate private keys. Secure storage: HSM or secrets manager. Multiple key pairs for different access levels.'),
    d('Signed URL vs Signed Cookie', 'Signed URL: per-file, granular. Signed Cookie: session-based, covers paths. Signed URL: good for direct file links. Signed Cookie: good for HTML pages with embedded resources (downloading multiple files).'),
    d('Security Best Practices', 'Short expiration times (minutes to hours, not days). Lock to specific IP if possible (adds security for stolen URLs). Use HTTPS to prevent URL interception. Rotate keys regularly. Monitor access logs for abuse. Rate limit signed URL requests.')
  ],
  'Signed URLs provide time-limited, authenticated access to private CDN content. A cryptographic signature is appended as a query parameter. The CDN validates the signature, expiration, and optional conditions before serving the content.',
  [
    q('What is a signed URL?', 'A time-limited URL with a cryptographic signature for authenticated content access.'),
    q('What does a signed URL contain?', 'Resource URL, expiration time, cryptographic signature, optional conditions.'),
    q('How does the CDN validate a signed URL?', 'It verifies the signature using the public key and checks expiration/conditions.'),
    q('What is a policy in signed URLs?', 'A JSON document specifying the resource, expiration, and conditions for access.'),
    q('What is the difference between signed URL and signed cookie?', 'Signed URL = per-file; Signed Cookie = session-based, covers paths.'),
    q('What security best practices apply to signed URLs?', 'Short expiration, IP locking, HTTPS, key rotation, access monitoring.'),
    q('Which CDNs support signed URLs?', 'CloudFront, Cloudflare, Fastly, Akamai, Google Cloud CDN, Azure CDN.'),
    q('What is key pair management?', 'Managing public/private keys used to sign and validate signed URLs.'),
    q('When should you use signed URLs?', 'For direct file downloads, streaming video, paywalled content, software packages.'),
    q('What happens if a signed URL expires?', 'The CDN returns a 403 Forbidden response.')
  ],
  R(10,35,110,25,'#0070f3','','Client','Gets signed URL from app server') +
  R(10,65,110,25,'#28a745','','App Server','Creates policy, signs with private key') +
  R(10,95,110,25,'#ffc107','','Client','Requests content with signed URL') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) +
  R(160,35,160,75,'#17a2b8','','CDN Edge','Validates signature with public key. Checks expiration + conditions.') +
  A(320,70,350,55) + A(320,70,350,85) +
  R(360,40,100,25,'#28a745','','200 OK','Serves content') +
  R(360,70,100,25,'#dc3545','','403','Denied') +
  T(240,200,'Signed URLs: Cryptographic time-limited access. App signs, CDN validates. 200 OK or 403.',9,'#666','middle'),
  [
    e('CloudFront Signed URL Generation (Node.js)', 'Generating CloudFront signed URLs.', codeBlock([
      'const crypto = require("crypto");',
      'const fs = require("fs");',
      '',
      'const privateKey = fs.readFileSync("./pk-ABC123456789.pem", "utf8");',
      'const keyPairId = "ABC123456789";',
      'const resource = "https://d123.cloudfront.net/private/video.mp4";',
      '',
      '// Create policy',
      'const expiration = Math.floor(Date.now() / 1000) + 3600; // 1 hour',
      'const policy = JSON.stringify({',
      '  Statement: [{',
      '    Resource: resource,',
      '    Condition: { DateLessThan: { "AWS:EpochTime": expiration } }',
      '  }]',
      '});',
      '',
      '// Sign policy',
      'const signer = crypto.createSign("RSA-SHA1");',
      'signer.update(policy);',
      'const signature = signer.sign(privateKey, "base64");',
      '',
      '// Build signed URL',
      'const signedUrl = `${resource}?Expires=${expiration}&Signature=${encodeURIComponent(signature)}&Key-Pair-Id=${keyPairId}`;',
      'console.log("Signed URL:", signedUrl);'
    ]), 'CloudFront signed URL generation using RSA-SHA1 and a custom policy with expiration.'),
    e('CloudFront Signed URL with IP Restriction', 'Adding IP restriction to signed URLs.', codeBlock([
      'const clientIP = "203.0.113.50";',
      'const expiration = Math.floor(Date.now() / 1000) + 3600;',
      '',
      '// Policy with IP restriction',
      'const policy = JSON.stringify({',
      '  Statement: [{',
      '    Resource: "https://d123.cloudfront.net/private/*",',
      '    Condition: {',
      '      DateLessThan: { "AWS:EpochTime": expiration },',
      '      IpAddress: { "AWS:SourceIp": `${clientIP}/32` }',
      '    }',
      '  }]',
      '});',
      '',
      '// Sign as before...',
      '// The signed URL only works from 203.0.113.50',
      '// If URL is intercepted, different IP = 403'
    ]), 'CloudFront signed URL with IP restriction to prevent URL sharing.'),
    e('Cloudflare Signed URL (Token Authentication)', 'Cloudflare token-based signed URLs.', codeBlock([
      '# Dashboard: Speed -> Optimization ->',
      '# Token Authentication -> Enable',
      '',
      '# Generate token with token key:',
      '# Use Cloudflare Worker or app server',
      '',
      '# Example token generation (Node.js):',
      'const crypto = require("crypto");',
      'const tokenKey = "your_token_key";',
      'const path = "/private/video.mp4";',
      'const expires = Math.floor(Date.now() / 1000) + 3600;',
      'const tokenBody = `${expires}${path}`;',
      'const token = crypto.createHmac("sha256", tokenKey).update(tokenBody).digest("hex");',
      '',
      '# URL format:',
      '# /cdn-cgi/media/expires=${expires}/token=${token}/${path}',
      '',
      '# Validation:',
      '# Cloudflare derives the same token and compares',
      '# Rejects if expired or invalid token'
    ]), 'Cloudflare token authentication for signed URLs using HMAC-SHA256.'),
    e('Fastly Signed URL with VCL', 'Fastly signed URL implementation.', codeBlock([
      '# Fastly has a "Signed Fetch" feature',
      '# Surrogate key + base64 encoded policy',
      '',
      '# VCL to validate signed fetch:',
      'sub vcl_recv {',
      '  if (req.url ~ "^/private/") {',
      '    # Require signed fetch header',
      '    if (!req.http.Fastly-Signed-Fetch) {',
      '      error 403 "Signed fetch required";',
      '    }',
      '    # Optionally validate custom signature in query string',
      '    if (!req.url.qs == "") {',
      '      set req.http.X-Expires = querystring.get(req.url, "expires");',
      '      if (std.time(now, 0) > std.time(req.http.X-Expires, 0)) {',
      '        error 410 "Expired";',
      '      }',
      '    }',
      '  }',
      '}'
    ]), 'Fastly signed URL with VCL validation and expiration checking.'),
    e('CloudFront Signed URL Using AWS CLI', 'Generating signed URLs with AWS CLI.', codeBlock([
      '# Requires CloudFront key pair configured',
      '# Key pair ID: K123456789ABC',
      '# Private key file: pk-K123456789ABC.pem',
      '',
      '# Generate signed URL with cloudfront-signer (Python):',
      'pip install cloudfront-signer',
      '',
      'from cloudfront_signer import CloudFrontSigner',
      'import rsa',
      '',
      'with open("pk-K123456789ABC.pem", "rb") as f:',
      '    private_key = rsa.PrivateKey.load_pkcs1(f.read())',
      '',
      'signer = CloudFrontSigner("K123456789ABC", lambda m: rsa.sign(m, private_key, "SHA-1"))',
      'url = signer.generate_signed_url(',
      '    {"url": "https://d123.cloudfront.net/private/file.pdf", "date_less_than": "2025-12-31"})',
      'print(f"Signed URL: {url}")'
    ]), 'CloudFront signed URL generation using Python cloudfront-signer library.')
  ],
  [
    m('What is a signed URL?', ['A public URL', 'A time-limited authenticated URL', 'A cached URL', 'A compressed URL'], 1, 'A signed URL is time-limited with cryptographic authentication.'),
    m('What happens when a signed URL expires?', ['Content is compressed', 'CDN returns 403', 'CDN returns 404', 'CDN redirects'], 1, 'An expired signed URL returns a 403 Forbidden.'),
    m('What algorithm does CloudFront use for signed URLs?', ['HMAC-SHA256', 'RSA-SHA1', 'AES256', 'MD5'], 1, 'CloudFront uses RSA-SHA1 for signing.'),
    m('What is a signed URL policy?', ['URL format', 'JSON doc with resource, expiration, conditions', 'Cache policy', 'Security policy'], 1, 'A policy is a JSON document specifying resource, expiration, and conditions.'),
    m('What is the difference between signed URL and signed cookie?', ['Same thing', 'Signed URL = per-file; Signed Cookie = session-based', 'Cookie is faster', 'URL is more secure'], 1, 'Signed URL is per-file, signed cookie is session-based covering paths.'),
    m('What type of key does signed URL use?', ['Symmetric key', 'Asymmetric key pair (public/private)', 'Session key', 'Temporary key'], 1, 'Signed URLs use asymmetric key pairs for signing and validation.')
  ]
);

/* =================== TOPIC 24: Signed Cookies =================== */
addTopic('cdn-signed-cookies', 'Signed Cookies', 'intermediate', 15,
  ['Signed cookies allow session-based access to private CDN content. Unlike signed URLs (per-file), signed cookies provide access to multiple resources within a path.',
   'A signed cookie is set by the application server containing a policy and signature. The CDN reads the cookie and validates it before serving any content request.',
   'Use cases: websites serving multiple private files (PDFs, images, videos), member-only content galleries, subscription services, paywalled content sites.',
   'CloudFront is the primary CDN supporting signed cookies. Other CDNs use token authentication (Cloudflare) or edge worker logic to implement equivalent functionality.'
  ],
  'A signed cookie is like a backstage pass at a concert that gives you access to all areas you\'re allowed in. Instead of showing a separate ticket for each room (signed URL), you show your all-access pass once (cookie), and it lets you into every authorized area.',
  [
    d('How Signed Cookies Work', '1) User authenticates with app server. 2) App server creates policy (resource path, expiration, conditions). 3) Policy signed with private key. 4) Response includes Set-Cookie header with signed cookie. 5) User\'s browser sends cookie with all subsequent requests. 6) CDN validates cookie, serves or denies content.'),
    d('Cookie Format (CloudFront)', 'Three cookies: CloudFront-Policy (base64 policy), CloudFront-Signature (signature), CloudFront-Key-Pair-Id (key pair ID). All cookies set for domain .d123.cloudfront.net. Path set to /private/. Cookies are HTTP-only (not accessible via JS).'),
    d('Signed Cookie vs Signed URL Comparison', 'Signed Cookie: session-based, covers multiple files, good for pages with embedded resources. Signed URL: per-file, granular, good for direct download links. Signed Cookie: fewer URL tokens to manage. Signed URL: easier to share (single URL). Use signed cookies for secure websites, signed URLs for APIs/downloads.'),
    d('Security Considerations', 'Cookies sent with every request: ensure path restriction limits scope. Expiration should be short (matching session duration). Use Secure and HttpOnly flags. Consider SameSite attribute. Cookies can be stolen via XSS — combine with Content-Security-Policy.'),
    d('Implementation Steps (CloudFront)', 'Generate policy JSON. Base64-encode policy (URL-safe). Sign policy with RSA-SHA1 using private key. Base64-encode signature. Set three cookies in response. Configure CloudFront to trust cookies (forward cookies or whitelist CloudFront-* cookies).')
  ],
  'Signed cookies provide session-based CDN authentication. The app server sets cookies with an encrypted policy and signature. The CDN validates these cookies before serving any private content, enabling seamless access to multiple files in a session.',
  [
    q('What is a signed cookie?', 'A cookie containing a signed policy for session-based CDN content access.'),
    q('How does a signed cookie differ from signed URL?', 'Signed cookie covers multiple files (session), signed URL is per-file.'),
    q('What cookies does CloudFront use for signed cookies?', 'CloudFront-Policy, CloudFront-Signature, CloudFront-Key-Pair-Id.'),
    q('When should you use signed cookies?', 'When serving multiple private files in a web page (images, PDFs, videos).'),
    q('How does the CDN validate a signed cookie?', 'It reads the cookie, decodes the policy, verifies the signature, checks expiration.'),
    q('What flags should signed cookies have?', 'Secure, HttpOnly, and appropriate Path/SameSite attributes.'),
    q('Can signed cookies be stolen?', 'Yes, via XSS. Protect with CSP, HttpOnly, and short expiration.'),
    q('Which CDNs support signed cookies natively?', 'CloudFront. Other CDNs use token auth or edge workers.'),
    q('What path should signed cookies use?', 'The path prefix of the private content (e.g., /private/).'),
    q('What happens when the cookie expires?', 'The CDN returns 403; user needs to re-authenticate with the app server.')
  ],
  R(10,35,110,25,'#0070f3','','User','Logs in to app') +
  R(10,65,110,25,'#28a745','','App Server','Authenticates, creates signed cookie') +
  A(120,48,150,48) + A(120,78,150,78) +
  R(160,35,160,50,'#17a2b8','','User Browser','Stores CloudFront-Policy, -Signature, -Key-Pair-Id cookies') +
  A(320,60,360,48) + A(320,60,360,72) +
  R(370,35,100,50,'#ffc107','','CDN Edge','Validates cookies with public key. Checks expiration.') +
  A(470,60,490,48) + A(470,60,490,72) +
  R(500,25,90,50,'#28a745','','Content','200 OK for all requests') +
  R(500,75,90,25,'#dc3545','','403','Denied') +
  T(240,200,'Signed Cookies: Session-based CDN auth. Single cookie set allows access to multiple private files.',9,'#666','middle'),
  [
    e('CloudFront Signed Cookie Setup (Node.js)', 'Generating CloudFront signed cookies.', codeBlock([
      'const crypto = require("crypto");',
      'const fs = require("fs");',
      '',
      'const privateKey = fs.readFileSync("./pk-ABC123456789.pem", "utf8");',
      'const keyPairId = "ABC123456789";',
      'const resource = "https://d123.cloudfront.net/private/*";',
      'const expiration = Math.floor(Date.now() / 1000) + 3600;',
      '',
      '// Create policy',
      'const policy = JSON.stringify({',
      '  Statement: [{',
      '    Resource: resource,',
      '    Condition: { DateLessThan: { "AWS:EpochTime": expiration } }',
      '  }]',
      '});',
      '',
      '// Base64 encode policy (URL safe)',
      'const encodedPolicy = Buffer.from(policy).toString("base64")',
      '  .replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, "");',
      '',
      '// Sign',
      'const signer = crypto.createSign("RSA-SHA1");',
      'signer.update(policy);',
      'const signature = signer.sign(privateKey, "base64")',
      '  .replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, "");',
      '',
      '// Set-Cookie headers (sent as response to authenticated request)',
      '// Set-Cookie: CloudFront-Policy=${encodedPolicy}; Domain=.d123.cloudfront.net; Path=/private/; Secure; HttpOnly',
      '// Set-Cookie: CloudFront-Signature=${signature}; Domain=.d123.cloudfront.net; Path=/private/; Secure; HttpOnly',
      '// Set-Cookie: CloudFront-Key-Pair-Id=${keyPairId}; Domain=.d123.cloudfront.net; Path=/private/; Secure; HttpOnly'
    ]), 'CloudFront signed cookie generation with three cookies for private content access.'),
    e('Express.js Signed Cookie Middleware', 'Signed cookies in an Express app.', codeBlock([
      'const crypto = require("crypto");',
      'const fs = require("fs");',
      '',
      'const privateKey = fs.readFileSync("./pk-ABC123456789.pem");',
      'const keyPairId = "ABC123456789";',
      '',
      'function setCloudFrontCookies(req, res, next) {',
      '  if (!req.user) return res.status(401).send("Login required");',
      '  const resource = "https://d123.cloudfront.net/private/*";',
      '  const expiration = Math.floor(Date.now() / 1000) + 3600;',
      '  const policy = JSON.stringify({',
      '    Statement: [{ Resource: resource, Condition: { DateLessThan: { "AWS:EpochTime": expiration } } }]',
      '  });',
      '  const b64 = (s) => Buffer.from(s).toString("base64").replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/, "");',
      '  const signer = crypto.createSign("RSA-SHA1");',
      '  signer.update(policy);',
      '  const sig = b64(signer.sign(privateKey, "base64"));',
      '  res.setHeader("Set-Cookie", [',
      '    `CloudFront-Policy=${b64(policy)}; Domain=.d123.cloudfront.net; Path=/private/; Secure; HttpOnly`,',
      '    `CloudFront-Signature=${sig}; Domain=.d123.cloudfront.net; Path=/private/; Secure; HttpOnly`,',
      '    `CloudFront-Key-Pair-Id=${keyPairId}; Domain=.d123.cloudfront.net; Path=/private/; Secure; HttpOnly`',
      '  ]);',
      '  next();',
      '}',
      '',
      'app.get("/login", authenticateUser, setCloudFrontCookies, (req, res) => {',
      '  res.redirect("/private/dashboard.html");',
      '});'
    ]), 'Express.js middleware generating CloudFront signed cookies after user authentication.'),
    e('CloudFront Cookie Forwarding', 'Configuring CloudFront to forward cookies.', codeBlock([
      '# CloudFront must forward the signed cookies',
      '# to validate them at the edge.',
      '',
      '# Option 1: Forward all cookies',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --default-cache-behavior "ForwardedValues={Cookies={Forward=all}}"',
      '',
      '# Option 2: Whitelist CloudFront cookies (recommended)',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --default-cache-behavior "ForwardedValues={Cookies={Forward=whitelist,WhitelistedNames=[CloudFront-Policy,CloudFront-Signature,CloudFront-Key-Pair-Id]}}"',
      '',
      '# Important: Whitelist approach is more secure',
      '# Only CloudFront cookies are forwarded to origin',
      '# All other cookies are stripped from requests'
    ]), 'CloudFront cookie forwarding configuration for signed cookie validation.'),
    e('Cloudflare Signed Cookie Equivalent (Token)', 'Implementing signed cookies on Cloudflare.', codeBlock([
      '# Cloudflare does not have native signed cookies,',
      '# but you can implement using Workers:',
      '',
      '// Service Worker for token validation',
      'addEventListener("fetch", event => {',
      '  event.respondWith(handleRequest(event.request));',
      '})',
      '',
      'async function handleRequest(request) {',
      '  const cookie = request.headers.get("Cookie") || "";',
      '  const tokenMatch = cookie.match(/cf_token=([^;]+)/);',
      '  if (!tokenMatch) return new Response("Forbidden", { status: 403 });',
      '  const token = tokenMatch[1];',
      '  const tokenKey = "your_hmac_key";',
      '  const [expires, hash] = token.split(".");',
      '  if (Date.now() / 1000 > parseInt(expires)) {',
      '    return new Response("Expired", { status: 403 });',
      '  }',
      '  const expected = await crypto.subtle.sign("HMAC", tokenKey, new TextEncoder().encode(expires));',
      '  // Validate hash...',
      '  return fetch(request);',
      '}'
    ]), 'Cloudflare Worker implementing signed cookie equivalent via HMAC token validation.'),
    e('Signed Cookie Security Best Practices', 'Securing signed cookies.', codeBlock([
      '# 1. Set Secure flag (HTTPS only)',
      'Set-Cookie: CloudFront-Policy=...; Secure; HttpOnly',
      '',
      '# 2. Set HttpOnly (not accessible via JavaScript)',
      'Set-Cookie: CloudFront-Signature=...; HttpOnly',
      '',
      '# 3. Restrict Path',
      'Set-Cookie: CloudFront-Key-Pair-Id=...; Path=/private/',
      '',
      '# 4. Consider SameSite=Lax or Strict',
      'Set-Cookie: CloudFront-Policy=...; SameSite=Lax',
      '',
      '# 5. Short expiration (match session TTL)',
      '# 6. Use CSP headers to prevent XSS',
      'Content-Security-Policy: default-src \'self\'',
      '',
      '# 7. Rotate key pairs periodically',
      '# 8. Monitor CloudFront access logs for unusual patterns'
    ]), 'Security best practices for signed cookies including flags, CSP, and key rotation.')
  ],
  [
    m('What is a signed cookie?', ['A cookie with user preferences', 'Session-based CDN auth cookie', 'A session token', 'An encrypted cookie'], 1, 'Signed cookie provides session-based CDN authentication.'),
    m('What cookies does CloudFront use for signed cookies?', ['CloudFront-ID, CloudFront-Token', 'CloudFront-Policy, -Signature, -Key-Pair-Id', 'AWS-Session, AWS-Token', 'CF-User, CF-Auth'], 1, 'CloudFront uses three cookies: Policy, Signature, Key-Pair-Id.'),
    m('When should you use signed cookies over signed URLs?', ['For single file downloads', 'When serving multiple files in a page', 'For API calls', 'For public content'], 1, 'Use signed cookies when serving multiple private files in a web page.'),
    m('What flags should signed cookies use?', ['Only Expires', 'Secure, HttpOnly, Path', 'Only Domain', 'Only SameSite'], 1, 'Signed cookies should use Secure, HttpOnly, and Path flags.'),
    m('How does the CDN validate a signed cookie?', ['Sends to origin', 'Validates signature and expiration at edge', 'Forwards to DNS', 'Checks with IAM'], 1, 'The CDN validates the signed cookie at the edge using the public key.'),
    m('Can signed cookies be stolen?', ['No, they\'re secure', 'Yes, via XSS', 'No, they\'re encrypted', 'Only via physical access'], 1, 'Signed cookies can be stolen via XSS; protect with HttpOnly and CSP.')
  ]
);

/* =================== TOPIC 25: Cloudflare =================== */
addTopic('cdn-cloudflare', 'Cloudflare', 'beginner', 15,
  ['Cloudflare is a leading CDN, DNS, DDoS protection, and security platform. Founded in 2009, it serves over 20% of all websites globally.',
   'Unique features: Anycast network with 310+ edge PoPs, reverse proxy architecture, integrated WAF, DDoS mitigation, Workers (serverless), and Argo Smart Routing.',
   'All Cloudflare plans include: CDN caching, SSL/TLS, DDoS protection, DNS management, WAF (basic rules on free plan), and analytics.',
   'Cloudflare operates a reverse proxy model — it terminates traffic at the edge, inspects it, and forwards to origin. This provides both performance and security benefits.'
  ],
  'Cloudflare is the "do-it-all" security and performance platform for websites. Think of it as a security guard (DDoS/WAF), fast delivery driver (CDN), and building manager (DNS) all in one. It stands in front of your server, handling visitors efficiently and keeping troublemakers out.',
  [
    d('Anycast Network Architecture', 'Cloudflare uses Anycast — all 310+ PoPs share the same IP addresses. BGP routes users to the nearest PoP. This provides natural load balancing and DDoS absorption. Traffic is always routed to the fastest available PoP.'),
    d('Reverse Proxy Model', 'Cloudflare terminates all user connections at the edge. TLS is decrypted at edge. WAF inspects at edge. Only safe/legitimate requests are proxied to origin. Origin IP is hidden from visitors. Origin only sees Cloudflare IPs.'),
    d('Cloudflare Workers (Serverless)', 'Serverless compute at the 310+ edge PoPs. JavaScript/WASM execution at edge. Intercept and modify requests/responses. Use cases: A/B testing, API gateways, JWT validation, custom auth, edge redirects, image optimization. Sub-millisecond startup.'),
    d('Security Suite', 'DDoS: automatic, unlimited, absorbs multi-Tbps attacks. WAF: managed rules (OWASP, Cloudflare), custom rules, rate limiting, bot management. SSL/TLS: flexible (end-to-end, flexible, full, strict). Zero Trust: Cloudflare Access replaces VPNs. Page Shield: monitors 3rd-party scripts.'),
    d('Performance Features', 'Argo Smart Routing: finds fastest internet path (30% avg improvement). Railgun: WAN compression for dynamic content. Mirage: smart image loading for mobile. Polish: server-side image optimization. Brotli compression. Early Hints (103). HTTP/3 enabled by default.')
  ],
  'Cloudflare is a reverse proxy CDN with Anycast network, integrated security (DDoS, WAF, SSL), serverless Workers, and performance optimizations. It serves 20%+ of websites with features across all plans, from free to enterprise.',
  [
    q('What makes Cloudflare unique?', 'Anycast network, reverse proxy model, serverless Workers, all-in-one platform.'),
    q('How many PoPs does Cloudflare have?', '310+ PoPs globally on Anycast network.'),
    q('What is Cloudflare\'s business model?', 'Freemium: free plan with basic features, paid plans for advanced features.'),
    q('What is a Cloudflare Worker?', 'Serverless JavaScript/WASM execution at CDN edge.'),
    q('What is Argo Smart Routing?', 'Real-time traffic optimization finding faster internet paths.'),
    q('What does "orange-clouded" mean?', 'Proxied through Cloudflare (vs gray-clouded = DNS-only).'),
    q('What is Cloudflare Access?', 'Zero Trust replacement for VPNs, authenticating users before they reach applications.'),
    q('What is Railgun?', 'WAN compression technology for dynamic content (deprecated, replaced by Argo).'),
    q('Does Cloudflare support HTTP/3?', 'Yes, HTTP/3 is enabled by default on all plans.'),
    q('What is the Cloudflare Global Network?', 'The worldwide network of 310+ edge data centers providing CDN, DNS, and security services.')
  ],
  R(10,35,110,25,'#0070f3','','Visitor','Browser request') +
  R(10,65,110,25,'#ffc107','','DNS','Cloudflare DNS') +
  A(120,48,150,48) + A(120,78,150,78) +
  R(160,35,160,50,'#e83e8c','','Cloudflare Edge','Anycast PoP. Reverse proxy. WAF, DDoS, SSL, Workers, Cache, Argo.') +
  A(320,60,360,48) + A(320,60,360,72) +
  R(370,35,100,50,'#28a745','','Origin Server','Only receives filtered, safe traffic from Cloudflare IPs. Origin IP hidden.') +
  T(240,200,'Cloudflare: Anycast CDN with reverse proxy, DDoS, WAF, Workers, Argo, and HTTP/3. All-in-one platform.',9,'#666','middle'),
  [
    e('Cloudflare DNS Setup', 'Configuring DNS records on Cloudflare.', codeBlock([
      '# Dashboard: DNS -> Records',
      '',
      '# Orange cloud (proxied): traffic goes through Cloudflare',
      '# Gray cloud (DNS only): direct connection',
      '',
      '# A Record (proxied - recommended)',
      '# Type: A   Name: @   Content: 203.0.113.10   Proxy: Proxied',
      '',
      '# CNAME Record (proxied)',
      '# Type: CNAME   Name: www   Content: example.com   Proxy: Proxied',
      '',
      '# CNAME Record (DNS only for subdomain without CDN)',
      '# Type: CNAME   Name: api   Content: api.example.com   Proxy: DNS only',
      '',
      '# Verify:',
      'nslookup example.com',
      '# Should return Cloudflare IPs (104.x.x.x, 172.x.x.x)'
    ]), 'Cloudflare DNS record configuration with proxied vs DNS-only settings.'),
    e('Cloudflare Page Rules', 'Creating page rules for routing/caching.', codeBlock([
      '# Dashboard: Rules -> Page Rules',
      '',
      '# Rule 1: Always HTTPS',
      '# URL: *.example.com/*',
      '# Setting: Always Use HTTPS -> On',
      '',
      '# Rule 2: Cache everything for images',
      '# URL: *.example.com/wp-content/uploads/*',
      '# Settings: Cache Level -> Cache Everything',
      '#           Edge Cache TTL -> 1 month',
      '#           Browser Cache TTL -> 1 day',
      '',
      '# Rule 3: Bypass cache for admin',
      '# URL: *.example.com/admin/*',
      '# Settings: Cache Level -> Bypass',
      '#           Disable Performance -> On',
      '',
      '# Note: Up to 3 page rules on free plan'
    ]), 'Cloudflare Page Rules for HTTPS, caching, and admin bypass configuration.'),
    e('Cloudflare Workers (Hello World)', 'Deploying a Cloudflare Worker.', codeBlock([
      '# wrangler.toml',
      'name = "hello-worker"',
      'main = "src/index.js"',
      'compatibility_date = "2024-01-01"',
      '',
      '// src/index.js',
      'export default {',
      '  async fetch(request, env, ctx) {',
      '    const url = new URL(request.url);',
      '    const country = request.cf.country;',
      '    return new Response(`',
      '      <h1>Hello from Cloudflare!</h1>',
      '      <p>You visiting from: ${country}</p>',
      '      <p>Edge: ${request.cf.colo}</p>',
      '      <p>City: ${request.cf.city}</p>',
      '    `, { headers: { "content-type": "text/html" } });',
      '  }',
      '}',
      '',
      '# Deploy:',
      'npx wrangler deploy'
    ]), 'Simple Cloudflare Worker returning visitor geolocation and edge information.'),
    e('Cloudflare SSL/TLS Configuration', 'Configuring SSL modes.', codeBlock([
      '# Dashboard: SSL/TLS -> Overview',
      '',
      '# SSL modes:',
      '# 1. Off: no encryption (not recommended)',
      '# 2. Flexible: edge-to-browser TLS, origin HTTP',
      '# 3. Full: edge-to-browser TLS, origin TLS (self-signed OK)',
      '# 4. Full (strict): origin must have valid CA-signed cert',
      '',
      '# Recommended: Full (strict) for maximum security',
      '',
      '# Edge certificates:',
      '# Cloudflare provides free SSL certs (wildcard * .example.com)',
      '# Automatic certificate management',
      '# Renews automatically',
      '',
      '# Minimum TLS Version:',
      '# Dashboard: Edge Certificates -> Minimum TLS Version',
      '# Recommended: TLS 1.2 or TLS 1.3'
    ]), 'Cloudflare SSL/TLS modes and certificate management configuration.'),
    e('Cloudflare Cache Configuration', 'Configuring caching behavior.', codeBlock([
      '# Dashboard: Caching -> Configuration',
      '',
      '# Cache Level:',
      '# - No query string: cache regardless of query string',
      '# - Ignore query string: same as above',
      '# - Standard: cache based on query string',
      '# - Cache Everything: force cache all static content',
      '',
      '# Browser Cache TTL: 4 hours (default)',
      '# Edge Cache TTL: respects origin Cache-Control',
      '',
      '# Purge Cache:',
      '# - Purge Individual Files',
      '# - Purge Everything',
      '# - Custom Purge (by hostname, prefix, tag)',
      '',
      '# Custom Cache Key:',
      '# Cache by: scheme, host, URI, headers, cookie, query string',
      '',
      '# Tiered Cache:',
      '# - Upper tier caches from origin',
      '# - Lower tiers cache from upper tier',
      '# - Reduces origin load'
    ]), 'Cloudflare caching configuration including cache levels, TTL, and purging.')
  ],
  [
    m('What type of network does Cloudflare use?', ['TCP network', 'Anycast network', 'P2P network', 'Mesh network'], 1, 'Cloudflare uses an Anycast network.'),
    m('What does orange cloud mean in Cloudflare DNS?', ['DNS only', 'Traffic proxied through Cloudflare', 'Disabled', 'SSL only'], 1, 'Orange cloud means traffic is proxied through Cloudflare.'),
    m('What are Cloudflare Workers?', ['Load balancers', 'Serverless edge compute in JavaScript/WASM', 'DNS servers', 'Cache servers'], 1, 'Workers are serverless functions at the edge.'),
    m('What is Argo Smart Routing?', ['Static path routing', 'Real-time traffic optimization', 'DNS routing', 'Cache routing'], 1, 'Argo finds optimal internet paths in real-time.'),
    m('What SSL mode requires valid origin cert?', ['Flexible', 'Full', 'Full (strict)', 'Off'], 2, 'Full (strict) requires a CA-signed certificate on the origin.'),
    m('Is HTTP/3 available on Cloudflare?', ['No', 'Yes, by default', 'Only on enterprise', 'Only for paid plans'], 1, 'HTTP/3 is enabled by default on all Cloudflare plans.')
  ]
);

/* =================== TOPIC 26: AWS CloudFront =================== */
addTopic('cdn-aws-cloudfront', 'AWS CloudFront', 'beginner', 15,
  ['Amazon CloudFront is a fast content delivery network (CDN) service by AWS. It integrates deeply with other AWS services (S3, EC2, ALB, Lambda@Edge, AWS WAF, Shield).',
   'Key features: 450+ edge PoPs, regional edge caches, Lambda@Edge for compute at edge, origin shield, real-time logs, field-level encryption, and continuous deployment support.',
   'CloudFront is pay-as-you-go with no upfront fees. Pricing varies by region (tiered pricing). Data transfer out to internet is the primary cost driver.',
   'CloudFront is deeply integrated with the AWS ecosystem, making it the preferred CDN for workloads already running on AWS.'
  ],
  'AWS CloudFront is like Amazon\'s global delivery network, deeply linked with the entire Amazon ecosystem (S3, EC2, Lambda). If your website is on AWS, CloudFront is the delivery truck that takes your warehouse goods (S3) and drives them to local depots (edge locations) near your customers.',
  [
    d('Global Infrastructure', '450+ edge locations (PoPs) in 90+ cities. Regional edge caches (larger capacity, lower egress costs in some regions). Origin shield: additional caching layer to reduce origin load. 13 regional edge cache locations worldwide.'),
    d('Lambda@Edge', 'Serverless compute at CloudFront edge. Node.js and Python. Triggers: viewer-request, viewer-response, origin-request, origin-response. Use cases: A/B testing, URL rewrites, header modification, authentication, image transformation. Max 5-second execution. 128-3008 MB memory.'),
    d('Security Integration', 'AWS WAF: managed rules, custom rules, rate limiting, bot control. AWS Shield: Standard (free), Advanced ($3k/mo, enhanced protection). Field-level encryption: encrypt sensitive data at edge. Signed URLs and cookies: time-limited access. Origin access control (OAC): secure S3 origins.'),
    d('Origin Options', 'S3 bucket (static content, OAC ensures private access). EC2/ALB (dynamic content, custom apps). HTTP/HTTPS origin (external servers). Media Services (MediaPackage, MediaStore for video). Multi-origin with path pattern routing. Origin groups for failover.'),
    d('Pricing and Cost Optimization', 'Regional tiered pricing: US/Europe (cheapest), South America/Australia (most expensive). Free tier: 1TB/month for 12 months. Cost factors: data transfer out, request count (HTTP/HTTPS), regional edge cache. Savings: use reserved capacity pricing for predictable traffic.')
  ],
  'AWS CloudFront is a global CDN with deep AWS integration. Features include Lambda@Edge, AWS WAF/Shield, 450+ edge PoPs, origin shield, signed URLs, and flexible origin options. Pricing is pay-as-you-go with regional tiering.',
  [
    q('What is AWS CloudFront?', 'AWS\'s global content delivery network (CDN) service.'),
    q('How many edge locations does CloudFront have?', '450+ edge locations in 90+ cities globally.'),
    q('What is Lambda@Edge?', 'Serverless compute at CloudFront edge locations for request/response modification.'),
    q('How does CloudFront integrate with S3?', 'S3 as origin with Origin Access Control (OAC) for secure private access.'),
    q('What is Origin Shield?', 'Additional caching layer that reduces load on the origin server.'),
    q('What is AWS Shield?', 'DDoS protection service — Standard (free) or Advanced ($3k/month).'),
    q('How does CloudFront pricing work?', 'Pay-as-you-go with regional tiered pricing. Free tier: 1TB/month.'),
    q('What is field-level encryption?', 'Encrypting sensitive data fields at the CloudFront edge.'),
    q('What are CloudFront origin groups?', 'Group of origins for failover — primary + secondary origin.'),
    q('What is CloudFront OAC?', 'Origin Access Control — restricts S3 access to only CloudFront.')
  ],
  R(10,35,110,25,'#0070f3','','User','Browser') +
  R(10,65,110,25,'#ffc107','','Edge PoP','450+ locations') +
  R(10,95,110,25,'#e83e8c','','Regional Cache','13 globally') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) +
  R(160,35,160,50,'#17a2b8','','Lambda@Edge','Compute at edge: Node.js, Python') +
  R(160,95,160,25,'#28a745','','Origin Shield','Cache layer') +
  A(320,60,370,48) + A(320,60,370,72) + A(320,108,370,108) +
  R(380,35,100,80,'#dc3545','','AWS WAF','+ Shield') +
  R(380,130,100,25,'#6610f2','','S3/EC2/ALB','Origin') +
  T(240,200,'CloudFront: AWS CDN with Lambda@Edge, WAF/Shield, 450+ PoPs, S3/EC2/ALB origins, OAC.',9,'#666','middle'),
  [
    e('Creating a CloudFront Distribution', 'AWS CLI creation of CloudFront distribution.', codeBlock([
      '# Create CloudFront distribution for S3 origin:',
      'aws cloudfront create-distribution \\',
      '  --distribution-config \'{',
      '    "CallerReference": "my-distribution-1",',
      '    "Origins": {',
      '      "Quantity": 1,',
      '      "Items": [{',
      '        "Id": "myS3Origin",',
      '        "DomainName": "my-bucket.s3.amazonaws.com",',
      '        "S3OriginConfig": { "OriginAccessIdentity": "" }',
      '      }]',
      '    },',
      '    "DefaultCacheBehavior": {',
      '      "TargetOriginId": "myS3Origin",',
      '      "ViewerProtocolPolicy": "redirect-to-https",',
      '      "AllowedMethods": { "Quantity": 2, "Items": ["GET", "HEAD"] }',
      '    },',
      '    "Enabled": true,',
      '    "PriceClass": "PriceClass_100"',
      '  }\'',
      '',
      '# PriceClass: PriceClass_100 (US/Europe only, cheapest)',
      '#            PriceClass_200 (most regions)',
      '#            PriceClass_All (all edge locations)'
    ]), 'AWS CLI command to create a CloudFront distribution for an S3 origin.'),
    e('Lambda@Edge for URL Rewrites', 'Adding Lambda@Edge to CloudFront.', codeBlock([
      '// lambda-edge-url-rewrite.js',
      'exports.handler = async (event) => {',
      '  const request = event.Records[0].cf.request;',
      '  const uri = request.uri;',
      '',
      '  // Rewrite /articles/123 to /index.html?article=123',
      '  const match = uri.match(/^\\/articles\\/(\\d+)$/);',
      '  if (match) {',
      '    request.uri = "/index.html";',
      '    request.querystring = `article=${match[1]}`;',
      '  }',
      '',
      '  // Add security headers',
      '  request.headers["x-forwarded-for"] = [{',
      '    key: "X-Forwarded-For",',
      '    value: request.clientIp',
      '  }];',
      '',
      '  return request;',
      '};',
      '',
      '# Deploy to us-east-1 (required) and associate with CloudFront',
      'aws lambda create-function --function-name url-rewrite --runtime nodejs18.x --handler index.handler --zip-file fileb://function.zip'
    ]), 'Lambda@Edge function for URL rewriting and header modification at CloudFront edge.'),
    e('CloudFront with S3 Origin (Static Site)', 'Static site hosting with CloudFront.', codeBlock([
      '# 1. Create S3 bucket (must match domain name)',
      'aws s3 mb s3://www.example.com --region us-east-1',
      '',
      '# 2. Upload static files',
      'aws s3 sync ./build/ s3://www.example.com/',
      '',
      '# 3. Create CloudFront OAC',
      'aws cloudfront create-origin-access-control \\',
      '  --origin-access-control-config \'{"Name":"my-oac","Description":"","SigningProtocol":"sigv4","SigningBehavior":"always","OriginAccessControlOriginType":"s3"}\'',
      '',
      '# 4. Create distribution (enable OAC)',
      '# 5. Update S3 bucket policy to allow CloudFront',
      'aws s3api put-bucket-policy --bucket www.example.com --policy \'{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"cloudfront.amazonaws.com"},"Action":"s3:GetObject","Resource":"arn:aws:s3:::www.example.com/*","Condition":{"StringEquals":{"AWS:SourceArn":"arn:aws:cloudfront::123456789:distribution/E123456789ABCD"}}}]}\'',
      '',
      '# 6. Set Route53 alias to CloudFront domain'
    ]), 'Complete setup of static site with S3 + CloudFront + OAC.'),
    e('CloudFront Origin Failover', 'Configuring origin groups for failover.', codeBlock([
      '# Create origin group with primary + secondary:',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --distribution-config \'{',
      '    "OriginGroups": {',
      '      "Quantity": 1,',
      '      "Items": [{',
      '        "Id": "my-origin-group",',
      '        "FailoverCriteria": { "StatusCodes": { "Quantity": 4, "Items": [500,502,503,504] } },',
      '        "Members": {',
      '          "Quantity": 2,',
      '          "Items": [',
      '            { "OriginId": "primary-us-east-1" },',
      '            { "OriginId": "secondary-eu-west-1" }',
      '          ]',
      '        }',
      '      }]',
      '    }',
      '  }\'',
      '',
      '# When primary returns 5xx, CloudFront automatically',
      '# fails over to the secondary origin.',
      '# Seamless for end users.'
    ]), 'CloudFront origin group for automatic failover with status code monitoring.'),
    e('CloudFront Real-Time Logs', 'Setting up real-time log streaming.', codeBlock([
      '# Enable real-time log configuration:',
      'aws cloudfront create-realtime-log-config \\',
      '  --name "cdn-logs" \\',
      '  --sampling-rate 100 \\',
      '  --end-point \'{',
      '    "StreamType": "Kinesis",',
      '    "KinesisStreamConfig": {',
      '      "RoleArn": "arn:aws:iam::123456789:role/cloudfront-logs",',
      '      "StreamArn": "arn:aws:kinesis:us-east-1:123456789:stream/cdn-logs"',
      '    }',
      '  }\' \\',
      '  --fields "timestamp, c-ip, sc-status, cs-uri-stem, cs-user-agent, x-edge-location, cs-referer, sc-content-type, sc-content-len"',
      '',
      '# Attach to distribution behavior:',
      'aws cloudfront update-distribution \\',
      '  --id E123456789ABCD \\',
      '  --default-cache-behavior "RealtimeLogConfigArn=arn:aws:cloudfront::123456789:realtime-log-config/cdn-logs"'
    ]), 'CloudFront real-time log configuration with Kinesis stream for monitoring.')
  ],
  [
    m('What is AWS CloudFront?', ['AWS DNS service', 'AWS CDN service', 'AWS compute service', 'AWS storage service'], 1, 'CloudFront is AWS\'s content delivery network service.'),
    m('How many edge locations does CloudFront have?', ['100', '250', '450+', '1000+'], 2, 'CloudFront has 450+ edge locations in 90+ cities.'),
    m('What is Lambda@Edge?', ['AWS Lambda for edge compute', 'AWS Lambda for serverless', 'Edge caching', 'Edge DNS'], 0, 'Lambda@Edge runs serverless functions at CloudFront edge locations.'),
    m('What is CloudFront OAC?', ['Origin Access Control for S3', 'Origin authentication', 'Access control list', 'Origin audit'], 0, 'OAC restricts S3 access to CloudFront only.'),
    m('What is Origin Shield?', ['DDoS protection', 'Additional caching layer', 'WAF service', 'DNS service'], 1, 'Origin Shield is an additional caching layer.'),
    m('What does PriceClass_100 mean?', ['100 edge locations', 'US and Europe only (cheapest)', 'All locations', '100 cheapest locations'], 1, 'PriceClass_100 uses only US/Europe edge locations.')
  ]
);

/* =================== TOPIC 27: Azure CDN =================== */
addTopic('cdn-azure-cdn', 'Azure CDN', 'beginner', 15,
  ['Azure CDN is Microsoft\'s content delivery network service, integrated with Azure services. It offers multiple product tiers: Azure CDN Standard (Microsoft), Standard (Akamai), Standard/Premium (Verizon).',
   'Key features: global edge network (Microsoft: 200+ PoPs, Akamai: 2500+, Verizon: 150+), integration with Azure services (Blob Storage, Web Apps, Media Services), custom rules engine, and DDoS protection.',
   'Azure CDN supports dynamic site acceleration (DSA), media streaming optimization, large file optimization, and HTTPS custom domains with managed certificates.',
   'Pricing is pay-as-you-use with regional tiering. Each tier has different features, performance characteristics, and pricing.'
  ],
  'Azure CDN is like Microsoft\'s answer to fast content delivery, offering a choice of delivery partners: Microsoft\'s own integrated network, Akamai\'s massive global network, or Verizon\'s reliable infrastructure. You choose your delivery fleet based on your needs and budget.',
  [
    d('Azure CDN Product Tiers', 'Microsoft Standard: 200+ PoPs, integrated with Azure, rules engine. Akamai Standard: 2500+ PoPs, best for media streaming, DSA. Verizon Standard: 150+ PoPs, large file optimization. Verizon Premium: advanced rules engine, analytics, custom reporting.'),
    d('Rules Engine (Verizon Premium, Microsoft)', 'URL redirects, rewrites, header modification, cache behavior overrides, compression controls, protocol restrictions. Order-based rule processing. Conditions: URL path, query string, request header, request method, device type, country code.'),
    d('Dynamic Site Acceleration (DSA)', 'Route optimization for dynamic/noncacheable content. TCP optimizations, route prefetch, performance monitoring. Available on Akamai tier. Reduces latency for dynamic content by 10-30% via optimized routing.'),
    d('Azure Integration', 'Azure Blob Storage origin: direct CDN integration. Azure Web Apps: CDN with custom domain, HTTPS. Azure Media Services: streaming endpoints. CDN endpoint management through Azure Portal, CLI, PowerShell, ARM templates.'),
    d('Security Features', 'Geo-filtering: restrict by country. Token authentication: time-limited access. HTTPS: custom domains with Free TLS/SSL (Microsoft-managed or bring your own). DDoS protection: Azure DDoS Basic included. WAF: available with Azure Front Door (modern alternative).')
  ],
  'Azure CDN offers three tiers (Microsoft, Akamai, Verizon) integrated with Azure services. Features include rules engine, DSA, geo-filtering, token auth, and HTTPS custom domains. Choose tier based on feature needs, performance, and budget.',
  [
    q('What are the tiers of Azure CDN?', 'Microsoft Standard, Akamai Standard, Verizon Standard, Verizon Premium.'),
    q('How many PoPs does Azure CDN Microsoft tier have?', '200+ PoPs globally.'),
    q('What is DSA in Azure CDN?', 'Dynamic Site Acceleration for optimizing non-cacheable dynamic content.'),
    q('What is the Azure CDN rules engine?', 'Rules for URL redirect, header modification, cache override (Verizon Premium/Microsoft).'),
    q('What Azure services can be CDN origins?', 'Blob Storage, Web Apps, Media Services, Cloud Services.'),
    q('How does geo-filtering work?', 'Allowing or blocking traffic based on country code at the CDN edge.'),
    q('What is token authentication?', 'Time-limited access with cryptographic tokens (Verizon tier).'),
    q('Does Azure CDN support custom domain HTTPS?', 'Yes, with managed TLS/SSL certificates (free).'),
    q('What is Azure Front Door?', 'Modern global load balancer + CDN + WAF (successor to traditional CDN).'),
    q('What is the largest Azure CDN network?', 'Akamai tier with 2500+ PoPs globally.')
  ],
  R(10,35,110,25,'#0070f3','','Tier: Microsoft','200+ PoPs, Rules engine') +
  R(10,65,110,25,'#28a745','','Tier: Akamai','2500+ PoPs, DSA') +
  R(10,95,110,25,'#ffc107','','Tier: Verizon','150+ PoPs, Premium') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) +
  R(160,35,140,75,'#17a2b8','','Azure CDN','Rules engine, geo-filtering, token auth, DSA, HTTPS custom domains.') +
  A(300,70,350,50) + A(300,70,350,90) +
  R(360,35,100,70,'#dc3545','','Azure Origins','Blob Storage, Web Apps, Media Services') +
  T(240,195,'Azure CDN: Three tiers (Microsoft, Akamai, Verizon) with rules engine, DSA, geo-filtering, token auth, Azure integration.',9,'#666','middle'),
  [
    e('Creating Azure CDN Endpoint (Portal)', 'Azure CDN setup via Portal.', codeBlock([
      '# 1. Create CDN profile:',
      '#    Azure Portal -> CDN profiles -> Create',
      '#    Name: my-cdn-profile',
      '#    Pricing tier: Standard Microsoft / Standard Akamai / Standard Verizon',
      '#    Resource group: my-rg',
      '',
      '# 2. Create endpoint:',
      '#    CDN profile -> + Endpoint',
      '#    Name: my-endpoint',
      '#    Origin type: Storage / Web App / Custom origin',
      '#    Origin hostname: myblob.blob.core.windows.net',
      '#    Origin path: /static',
      '#    Optimized for: General web delivery / Video on demand / Large file / Dynamic site acceleration',
      '',
      '# 3. Endpoint URL: my-endpoint.azureedge.net',
      '#    Custom domain: cdn.example.com',
      '#    HTTPS: Enable (free managed TLS)'
    ]), 'Azure CDN profile and endpoint creation through Azure Portal with origin configuration.'),
    e('Azure CDN with Blob Storage (CLI)', 'Azure CLI CDN setup.', codeBlock([
      '# Create storage account (origin)',
      'az storage account create --name mystoragecdn --resource-group my-rg --sku Standard_LRS --allow-blob-public-access true',
      '',
      '# Enable static website',
      'az storage blob service-properties update --account-name mystoragecdn --static-website --404-document 404.html --index-document index.html',
      '',
      '# Create CDN profile',
      'az cdn profile create --name my-cdn-profile --resource-group my-rg --sku Standard_Microsoft',
      '',
      '# Create CDN endpoint',
      'az cdn endpoint create --name my-endpoint --profile-name my-cdn-profile --resource-group my-rg --origin mystoragecdn.blob.core.windows.net --origin-host-header mystoragecdn.blob.core.windows.net',
      '',
      '# Enable custom domain HTTPS',
      'az cdn custom-domain enable-https --endpoint-name my-endpoint --profile-name my-cdn-profile --resource-group my-rg --name www-example-com'
    ]), 'Azure CLI commands for CDN with Blob Storage static website origin.'),
    e('Azure CDN Rules Engine (Microsoft)', 'Creating cache rules.', codeBlock([
      '# Rule: Cache all images for 30 days',
      '# Via Azure Portal: CDN Endpoint -> Rules Engine -> Add Rule',
      '',
      '# Rule name: "cache-images-long"',
      '# Order: 1',
      '',
      '# If: Url Path Extension',
      '#   Value: .jpg',
      '#   Operator: Contains',
      '',
      '# Conditions (optional):',
      '#   Country Code: Not "CN"',
      '',
      '# Actions:',
      '#   Cache expiration: Override',
      '#   Set cache duration: 30 days',
      '#   Set cache behavior: Override origin',
      '',
      '# Save and the rule is processed at edge',
      '# Multiple rules are evaluated in order (lowest number first)',
      '# Rules engine is available on Microsoft and Verizon Premium tiers'
    ]), 'Azure CDN Microsoft tier rules engine configuration for image caching.'),
    e('Azure CDN Geo-Filtering', 'Restricting content by country.', codeBlock([
      '# Geo-filtering via Azure Portal:',
      '# CDN Endpoint -> Geo-filtering -> Add Rule',
      '',
      '# Rule: Allow traffic only from US and Canada',
      '# Action: Allow',
      '# Country codes: US, CA',
      '# Path: /protected/*',
      '',
      '# Rule: Block all other countries',
      '# Action: Block',
      '# Country codes: *',
      '# Path: /protected/*',
      '',
      '# Via CLI:',
      'az cdn endpoint update --name my-endpoint --profile-name my-cdn-profile --resource-group my-rg --set geoFilters=\'[{"relativePath":"/protected/*","action":"Allow","countryCodes":["US","CA"]}]\'',
      '',
      '# Geo-filtering is available on Verizon Premium',
      '# and Microsoft Standard tiers'
    ]), 'Azure CDN geo-filtering rules for allowing/blocking countries at edge.'),
    e('Azure CDN Token Authentication', 'Time-limited access with tokens.', codeBlock([
      '# Token authentication is available on Verizon Premium tier',
      '# Steps:',
      '',
      '# 1. Generate encryption key (32 chars)',
      '# 2. Configure token auth in Azure Portal:',
      '#    Endpoint -> Token Authentication -> Configure',
      '#    Primary key: your-32-char-key',
      '#    Algorithm: SHA256',
      '',
      '# 3. Generate token URL:',
      '#    Token format:',
      '#    https://cdn.example.com/file.pdf?ec_expire=1712345678&ec_key=your-key&ec_hash=base64hash',
      '',
      '# 4. Server generates token (C# example):',
      '// string token = TokenAuth.GenerateToken(',
      '//     "your-32-char-key",',
      '//     "/file.pdf",',
      '//     DateTime.UtcNow.AddHours(1));',
      '',
      '# 5. CDN validates:',
      '#    - Hash matches (tamper check)',
      '#    - Expiration not passed',
      '#    - Returns 403 if invalid'
    ]), 'Azure CDN token authentication for time-limited content access on Verizon Premium.')
  ],
  [
    m('What are the three Azure CDN tiers?', ['Basic, Standard, Premium', 'Microsoft, Akamai, Verizon', 'Free, Pro, Enterprise', 'Lite, Standard, Pro'], 1, 'Azure CDN tiers are Microsoft, Akamai, and Verizon.'),
    m('Which tier has the most PoPs?', ['Microsoft (200+)', 'Akamai (2500+)', 'Verizon (150+)', 'Equal'], 1, 'Akamai tier has 2500+ PoPs globally.'),
    m('What is DSA in Azure CDN?', ['Data storage accelerator', 'Dynamic Site Acceleration', 'Direct server access', 'Data security appliance'], 1, 'DSA is Dynamic Site Acceleration for non-cacheable content.'),
    m('Which Azure service is commonly used with CDN?', ['Azure Functions', 'Blob Storage', 'Azure DevOps', 'Azure AD'], 1, 'Azure Blob Storage is commonly used as CDN origin.'),
    m('What does geo-filtering do?', ['Block by IP', 'Block by country', 'Block by user agent', 'Block by device'], 1, 'Geo-filtering restricts content by country code.'),
    m('What is Azure Front Door?', ['Older CDN product', 'Modern CDN + WAF + global load balancer', 'DNS service', 'Firewall service'], 1, 'Azure Front Door is the modern successor combining CDN, WAF, and global load balancing.')
  ]
);

/* =================== TOPIC 28: Google Cloud CDN =================== */
addTopic('cdn-gcp-cdn', 'Google Cloud CDN', 'beginner', 15,
  ['Google Cloud CDN (Cloud CDN) uses Google\'s global infrastructure to deliver content with low latency. It integrates with Google Cloud Load Balancing and Google Kubernetes Engine.',
   'Key features: 200+ edge PoPs on Google\'s network, integration with HTTP(S) Load Balancer, Cloud Storage origins, signed URLs/cookies, and WAF integration via Cloud Armor.',
   'Cloud CDN is designed for applications hosted on Google Cloud (Compute Engine, GKE, Cloud Storage) and uses Google\'s private fiber network for content delivery.',
   'Pricing: pay-as-you-go with per-GB egress and per-request charges. Cache egress is cheaper than origin egress. No upfront fees or commitments.'
  ],
  'Google Cloud CDN is like having Google\'s private highway system deliver your content. Instead of taking public roads (public internet), your content travels on Google\'s own fiber network from the origin to the edge PoP, then the final mile to the user. It\'s only for content starting within Google Cloud, making it the fastest option for GCP-hosted apps.',
  [
    d('Google\'s Global Network', '200+ edge PoPs in 80+ countries. 100,000+ miles of fiber optic cable. Google\'s network carries 40%+ of internet traffic. Private Tier 1 network means fewer hops. Low latency via B4 SDN network fabric and Google\'s global backbone.'),
    d('Cloud CDN Architecture', 'Cloud CDN is built on Google Cloud HTTP(S) Load Balancer. It\'s enabled as a checkbox, not a separate product. Integration with: Cloud Storage (cache buckets), Compute Engine (instance groups), GKE (container-native load balancing), and App Engine. Cache hits served from edge; misses go to origin via Google backbone.'),
    d('Signed URLs and Cookies', 'Cloud CDN supports signed URLs and signed cookies for time-limited, authenticated access. Uses HMAC-SHA1 or HMAC-SHA256 keys. Keys managed in Cloud Console or via Cloud KMS. Policy includes: URL prefix, expiration, IP ranges.'),
    d('Cloud Armor (WAF + DDoS)', 'Cloud Armor integrates with Cloud CDN for edge security. WAF: OWASP rules, SQLi/XSS detection, custom rules. DDoS: automatic L3/L4 protection, configurable L7 protection. Rate limiting: per IP, region, or header. Geo-based access control.'),
    d('Cache Modes and Policies', 'Cache modes: Use origin headers (respect Cache-Control), Force cache all (ignore Set-Cookie), Force cache all with origin headers override. Cache keys: protocol, host, query string parameters, headers. Negative caching (for error responses, 404, 500). TTL: minimum/maximum overrides.'),
    d('Optimization Features', 'Cache bypass on cookie: for personalized content. Cache hit ratio optimization via query parameter normalization. Compression: Cloud CDN compresses responses with gzip/brotli. Request collapsing: multiple same requests collapsed to one origin call. Negative caching: cache 404/500 responses to reduce origin load.')
  ],
  'Google Cloud CDN leverages Google\'s private fiber network for fast content delivery. Integrated with HTTP(S) Load Balancer, Cloud Storage, and GKE. Supports signed URLs/cookies, Cloud Armor WAF/DDoS, cache modes for flexibility, and request collapsing for efficient caching.',
  [
    q('What is Google Cloud CDN?', 'Google\'s CDN built on their global network, integrated with GCP load balancers.'),
    q('How many edge PoPs does Cloud CDN have?', '200+ globally on Google\'s private network.'),
    q('What is unique about Google\'s network?', 'Private Tier 1 fiber network — content stays on Google backbone.'),
    q('What is Cloud Armor?', 'Google\'s WAF and DDoS protection service integrated with Cloud CDN.'),
    q('What origins does Cloud CDN support?', 'Cloud Storage, Compute Engine, GKE, App Engine, HTTP(S) Load Balancer.'),
    q('What is request collapsing?', 'Multiple same requests collapsed to one origin call at the same edge.'),
    q('What algorithms does Cloud CDN signing use?', 'HMAC-SHA1 and HMAC-SHA256.'),
    q('What is cache bypass on cookie?', 'Skip cache for requests with specific cookies (personalized content).'),
    q('Does Cloud CDN support compression?', 'Yes, gzip and brotli compression at edge.'),
    q('How is Cloud CDN priced?', 'Pay-as-you-go: per-GB egress + per-request fees. Cache egress cheaper than origin.')
  ],
  R(10,35,110,25,'#0070f3','','User','Browser') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','CDN Edge','200+ PoPs on Google fiber') +
  A(290,48,320,48) +
  R(330,35,130,25,'#e83e8c','','Cloud Armor','WAF + DDoS protection') +
  A(460,48,480,48) +
  R(490,35,100,25,'#ffc107','','LB','HTTP(S) Load Balancer') +
  A(590,48,320,70) +
  R(160,75,130,25,'#17a2b8','','Cloud Storage','Bucket origin') +
  R(300,75,130,25,'#dc3545','','GKE/Compute','Instance group origin') +
  R(440,75,130,25,'#6610f2','','App Engine','App origin') +
  T(240,195,'Google Cloud CDN: Google private fiber network + Cloud Armor WAF + Load Balancer + GCP origins.',9,'#666','middle'),
  [
    e('Enabling Cloud CDN via gcloud', 'Setup Cloud CDN on a backend service.', codeBlock([
      '# 1. Create an external HTTP(S) Load Balancer',
      '#    (or use existing one)',
      '',
      '# 2. Create backend bucket (Cloud Storage origin)',
      'gcloud compute backend-buckets create my-backend-bucket \\',
      '  --gcs-bucket-name=my-bucket --enable-cdn',
      '',
      '# Or enable CDN on existing backend service:',
      'gcloud compute backend-services update my-service \\',
      '  --enable-cdn --cache-mode=FORCE_CACHE_ALL',
      '',
      '# Cache modes:',
      '#   USE_ORIGIN_HEADERS (default, respects Cache-Control)',
      '#   FORCE_CACHE_ALL (cache everything, ignore Set-Cookie)',
      '#   FORCE_CACHE_ALL_ORIGIN_HEADERS (cache all, respect origin headers)',
      '',
      '# 3. Create URL map and target proxy',
      'gcloud compute url-maps create my-url-map \\',
      '  --default-backend-bucket=my-backend-bucket'
    ]), 'gcloud commands to enable Cloud CDN on a backend bucket or service.'),
    e('Cloud CDN Signed URL Generation', 'Generate HMAC-signed URLs for Cloud CDN.', codeBlock([
      '# 1. Create signing key:',
      'gcloud compute backend-services add-signed-url-key my-service \\',
      '  --key-name my-key --key-file ./cdn.key',
      '',
      '# 2. Generate random HMAC key (32 bytes):',
      'openssl rand 32 > cdn.key',
      '',
      '# 3. Generate signed URL (Python example):',
      'import base64, hashlib, hmac, time',
      '',
      'key = open("cdn.key", "rb").read()',
      'url_prefix = "https://cdn.example.com/private/"',
      'expires = int(time.time()) + 3600',
      '',
      '# Create signature input:',
      'sign_input = f"{url_prefix}{expires}"',
      '',
      '# Sign with HMAC-SHA256:',
      'sig = hmac.new(key, sign_input.encode(), hashlib.sha256).digest()',
      'sig_b64 = base64.urlsafe_b64encode(sig).rstrip(b"=").decode()',
      '',
      '# Signed URL:',
      'signed_url = f"{url_prefix}?Expires={expires}&KeyName=my-key&Signature={sig_b64}"'
    ]), 'Cloud CDN signed URL generation with HMAC-SHA256 and gcloud key setup.'),
    e('Cloud Armor WAF Policy', 'Create Cloud Armor security policy.', codeBlock([
      '# Create security policy:',
      'gcloud compute security-policies create my-waf-policy',
      '',
      '# Add rule: Block SQL injection',
      'gcloud compute security-policies rules create 1000 \\',
      '  --action=deny-403 \\',
      '  --security-policy=my-waf-policy \\',
      '  --expression=\'evaluatePreconfiguredWaf("sqli-canary")',
      '',
      '# Add rule: Rate limit per IP (100 req/min)',
      'gcloud compute security-policies rules create 500 \\',
      '  --action=rate-based-ban \\',
      '  --security-policy=my-waf-policy \\',
      '  --rate-limit-threshold-count=100 \\',
      '  --rate-limit-threshold-interval-sec=60 \\',
      '  --conform-action=allow \\',
      '  --exceed-action=deny-429 \\',
      '  --expression=\'true\' \\',
      '',
      '# Attach to backend service:',
      'gcloud compute backend-services update my-service \\',
      '  --security-policy=my-waf-policy'
    ]), 'Cloud Armor WAF policy with SQL injection and rate limiting rules attached to backend service.'),
    e('Cloud CDN Cache Invalidation', 'How to purge cached content.', codeBlock([
      '# Invalidate specific URLs:',
      'gcloud compute url-maps invalidate-cdn-cache my-url-map \\',
      '  --path "/images/*" --async',
      '',
      '# Invalidate multiple paths:',
      'for path in "/images/*" "/css/*" "/js/*"; do',
      '  gcloud compute url-maps invalidate-cdn-cache my-url-map --path "$path" --async',
      'done',
      '',
      '# Invalidate all cached content (host-wide):',
      'gcloud compute url-maps invalidate-cdn-cache my-url-map \\',
      '  --path "/*"',
      '',
      '# Cache invalidation limits:',
      '# - 1000 invalidations per URL map per month (free)',
      '# - Additional invalidations are billed',
      '# - Invalidation propagates to all edges within minutes'
    ]), 'Cloud CDN cache invalidation commands for purging cached content.'),
    e('Cloud CDN Request Collapsing', 'How request collapsing reduces origin load.', codeBlock([
      '# Request collapsing is enabled by default on Cloud CDN',
      '',
      '# Scenario: 100 users request the same uncached resource',
      '# Without collapsing: 100 requests hit the origin',
      '# With collapsing: 1 request hits the origin',
      '',
      '# How it works:',
      '# 1. First request for resource arrives at edge',
      '# 2. Edge forwards to origin (cache miss)',
      '# 3. While waiting for origin, additional same requests arrive',
      '# 4. Edge waits for first request to complete',
      '# 5. All 100 users get response from the single origin call',
      '',
      '# Benefits:',
      '# - Reduces origin load significantly',
      '# - Improves overall latency for subsequent users',
      '# - No additional configuration needed'
    ]), 'Cloud CDN request collapsing mechanism for reducing origin load on cache misses.')
  ],
  [
    m('What is Google Cloud CDN built on?', ['Cloud Functions', 'HTTP(S) Load Balancer', 'Cloud Run', 'Cloud Storage'], 1, 'Cloud CDN is built on the HTTP(S) Load Balancer.'),
    m('How is Google\'s network unique?', ['Largest CDN', 'Private Tier 1 fiber network', 'Cheapest CDN', 'Oldest CDN'], 1, 'Google\'s private fiber network reduces hops and latency.'),
    m('What is Cloud Armor?', ['Cloud storage', 'WAF + DDoS protection', 'Load balancer', 'DNS service'], 1, 'Cloud Armor provides WAF and DDoS protection for Cloud CDN.'),
    m('What signing algorithms does Cloud CDN support?', ['RSA-SHA1', 'HMAC-SHA1 and HMAC-SHA256', 'AES256', 'MD5'], 1, 'Cloud CDN uses HMAC-SHA1 or HMAC-SHA256 for signed URLs.'),
    m('What is request collapsing?', ['Serving stale content', 'Merging same requests to one origin call', 'Compressing requests', 'Caching requests'], 1, 'Request collapsing merges multiple same requests into one origin call.'),
    m('What is a cache mode?', ['Cache layer', 'How CDN decides what to cache', 'Cache location', 'Cache size'], 1, 'Cache modes control caching behavior (respect origin, force cache, etc).')
  ]
);

/* =================== TOPIC 29: Fastly =================== */
addTopic('cdn-fastly', 'Fastly', 'intermediate', 15,
  ['Fastly is a high-performance CDN known for its programmable edge via Varnish Configuration Language (VCL) and edge compute platform (Compute@Edge).',
   'Key features: instant cache purge (full cache in <150ms), VCL-based edge logic, Compute@Edge (Rust/JS), image optimization, real-time analytics, and DDoS protection.',
   'Fastly\'s architecture is based on a modified Varnish cache, giving customers unprecedented control over request/response processing at the edge.',
   'Fastly is preferred for dynamic content, API acceleration, and use cases requiring fine-grained edge logic control.'
  ],
  'Fastly is like a programmable delivery drone. While other CDNs give you preset routes and options, Fastly lets you write your own flight instructions (VCL) for every package. Want boxes to fly differently at night? Want special handling for fragile items? You can program it all yourself.',
  [
    d('VCL (Varnish Configuration Language)', 'Fastly\'s core differentiator. Subroutines: vcl_recv (incoming request), vcl_fetch (from origin), vcl_deliver (to client), vcl_error (error handling), vcl_hash (cache key), vcl_pass (skip cache), vcl_pipe (streaming), vcl_log (logging), vcl_synth (synthetic response). Full traffic manipulation flexibility.'),
    d('Instant Purge', 'Cache invalidation across all edge nodes in <150 milliseconds (typically 30-50ms). Soft purge: mark stale, serve stale while fetching new. Hard purge: remove from cache immediately. Purge by URL, surrogate key (tag-based), or service-wide. Streaming purge validation.'),
    d('Compute@Edge', 'Serverless at edge with Rust (primary), JavaScript, AssemblyScript, Go. Compiles to WebAssembly. Sub-millisecond cold starts. Access to Fastly cache. Use cases: API gateways, authentication, image processing, A/B testing. Faster than Lambda@Edge for Rust workloads.'),
    d('Image Optimization', 'Server-side image transformation at edge. Resize, crop, format conversion (WebP, AVIF), quality adjustment, compression. Sentinels: detect optimal image format from browser Accept header. DPR handling (device pixel ratio). Real-time transformation via URL parameters.'),
    d('DDoS and Security', 'DDoS: automatic L3/L4 mitigation, L7 rate limiting, software load balancers absorb attacks. WAF: Signal Sciences (Fastly acquired) — ML-based. TLS: custom certificates, automated renewal. Access control: IP blacklist/whitelist, basic auth at edge. Secret Store: secure key management.')
  ],
  'Fastly is a programmable CDN with VCL-based edge logic, instant cache purge (<150ms), Compute@Edge (WebAssembly), image optimization, and real-time analytics. It offers deep configurability for dynamic content and API acceleration.',
  [
    q('What is Fastly known for?', 'Programmable edge with VCL, instant purge, Compute@Edge.'),
    q('What is VCL?', 'Varnish Configuration Language — Fastly\'s edge programming language.'),
    q('How fast is Fastly\'s cache purge?', '<150ms (typically 30-50ms) across all edge nodes.'),
    q('What is Compute@Edge?', 'Fastly\'s serverless edge compute platform using WebAssembly (Rust, JS, Go).'),
    q('What is a surrogate key?', 'Tags for cache objects allowing tag-based purging.'),
    q('What is soft purge?', 'Marking cache as stale but serving while fetching fresh content.'),
    q('What is Sentinel in image optimization?', 'Feature detecting optimal image format from browser Accept header.'),
    q('What WAF does Fastly offer?', 'Signal Sciences (acquired by Fastly) — ML-based WAF.'),
    q('What is Fastly\'s origin?', 'Former Varnish developers, founded 2011.'),
    q('What is Fastly\'s Instant Purge API?', 'API to purge cache by URL, key, or service in <150ms.')
  ],
  R(10,35,110,25,'#0070f3','','User','Request') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','Edge Node','VCL processing') +
  A(290,48,320,48) +
  R(330,35,130,25,'#ffc107','','Compute@Edge','WebAssembly') +
  A(460,48,480,48) +
  R(490,35,100,25,'#dc3545','','Origin','Dynamic content') +
  T(240,180,'Fastly: Programmable CDN with VCL, instant purge (<150ms), Compute@Edge (WASM), Signal Sciences WAF.',9,'#666','middle'),
  [
    e('Fastly VCL Cache Override', 'Custom caching logic with VCL.', codeBlock([
      'sub vcl_recv {',
      '  # Cache API responses for 1 hour',
      '  if (req.url ~ "^/api/") {',
      '    set req.ttl = 3600s;',
      '    set req.grace = 86400s;',
      '  }',
      '',
      '  # Bypass cache for admin',
      '  if (req.url ~ "^/admin/") {',
      '    set req.http.X-Cache-Type = "pass";',
      '    return(pass);',
      '  }',
      '',
      '  # Remove cookies from static assets (better caching)',
      '  if (req.url ~ "\\.(css|js|png|jpg|svg|woff2)$") {',
      '    unset req.http.Cookie;',
      '  }',
      '}',
      '',
      'sub vcl_deliver {',
      '  # Add debug headers',
      '  if (fastly.ff.visits_this_service == 0) {',
      '    set resp.http.X-Cache = "MISS";',
      '  } else {',
      '    set resp.http.X-Cache = "HIT";',
      '  }',
      '}'
    ]), 'Fastly VCL for custom cache TTL, admin bypass, cookie stripping, and debug headers.'),
    e('Fastly Surrogate Key Purging', 'Tag-based cache purging.', codeBlock([
      '# Backend sets Surrogate-Key headers:',
      'surrogate_key: "article:123 category:tech author:456"',
      '',
      '# Client receives header (hidden via VCL):',
      '# set resp.http.Surrogate-Key = req.http.Surrogate-Key;',
      '',
      '# Purge by key via API:',
      'curl -X POST "https://api.fastly.com/service/$SERVICE_ID/purge/article:123" \\',
      '  -H "Fastly-Key: $API_TOKEN"',
      '',
      '# Purge multiple keys:',
      'curl -X POST "https://api.fastly.com/service/$SERVICE_ID/purge" \\',
      '  -H "Fastly-Key: $API_TOKEN" \\',
      '  -H "Surrogate-Key: article:123 category:tech"',
      '',
      '# Purge all:',
      'curl -X POST "https://api.fastly.com/service/$SERVICE_ID/purge_all" \\',
      '  -H "Fastly-Key: $API_TOKEN"'
    ]), 'Fastly surrogate key purging for tag-based cache invalidation.'),
    e('Compute@Edge (Rust)', 'Basic Compute@Edge service.', codeBlock([
      '// Cargo.toml',
      '[package]',
      'name = "hello-fastly"',
      'version = "0.1.0"',
      '',
      '[dependencies]',
      'fastly = "^0.10"',
      '',
      '// src/main.rs',
      'use fastly::{{Request, Response}};',
      '',
      '#[fastly::main]',
      'fn main(req: Request) -> Response {',
      '    let country = req.get_client_ip_addr();',
      '    let path = req.get_path();',
      '',
      '    // Redirect based on user agent',
      '    let ua = req.get_header_str("User-Agent").unwrap_or("");',
      '    if ua.contains("Mobile") {',
      '        return Response::from_status(302)',
      '            .with_header("Location", format!("/mobile{path}"));',
      '    }',
      '',
      '    // Fetch from origin or generate synthetic response',
      '    let backend = format!("backend_{}", req.get_url().host_str().unwrap_or("default"));',
      '    let beresp = req.send(backend).unwrap();',
      '    beresp',
      '}'
    ]), 'Fastly Compute@Edge in Rust with redirects and backend forwarding.'),
    e('Fastly Image Optimization', 'On-the-fly image transformation.', codeBlock([
      '# Image optimization via URL parameters:',
      '# /image.jpg?width=400&height=300&format=webp&quality=80',
      '',
      '# VCL to enable image optimization:',
      'sub vcl_recv {',
      '  if (req.url ~ "\\.(jpg|jpeg|png|gif|webp)$") {',
      '    set req.http.X-Fastly-Imageopto-Auto = "webp";',
      '    set req.http.X-Fastly-Imageopto-Resize = "400x300";',
      '  }',
      '}',
      '',
      '# OR use query parameters:',
      '# ?width=400 (max width)',
      '# ?height=300 (max height)',
      '# ?format=webp|jpeg|png|avif (format conversion)',
      '# ?quality=1-100 (compression quality)',
      '# ?crop=1600,900 (crop dimensions)',
      '',
      '# Auto format selection via Sentinel:',
      '# Browser sends Accept: image/avif,image/webp',
      '# Fastly serves best format automatically'
    ]), 'Fastly image optimization with VCL and URL parameter configuration.'),
    e('Fastly Real-Time Log Streaming', 'Streaming logs to external destinations.', codeBlock([
      '# Create logging endpoint via API:',
      'curl -X POST "https://api.fastly.com/service/$SERVICE_ID/version/$VERSION/logging/s3" \\',
      '  -H "Fastly-Key: $API_TOKEN" \\',
      '  -d \'{',
      '    "name": "cdn-logs",',
      '    "bucket_name": "my-cdn-logs",',
      '    "domain": "s3.us-east-1.amazonaws.com",',
      '    "path": "/cdn/",',
      '    "format": "%{now:%Y-%m-%dT%H:%M:%S%z}t\\t%h\\t%m\\t%U\\t%s\\t%D",',
      '    "period": 3600,',
      '    "gzip_level": 3',
      '  }\'',
      '',
      '# Log format variables:',
      '# %h — client IP',
      '# %m — request method',
      '# %U — URL path',
      '# %s — status code',
      '# %D — response time (microseconds)',
      '# %{Cookie}i — request header',
      '',
      '# Supported destinations:',
      '# S3, GCS, Azure Blob, BigQuery, Elasticsearch,',
      '# Splunk, Datadog, Sumo Logic, New Relic, Kafka'
    ]), 'Fastly real-time log streaming configuration to S3 with format customization.')
  ],
  [
    m('What is Fastly known for?', ['Cheapest CDN', 'Programmable edge with VCL', 'Largest CDN', 'Free CDN'], 1, 'Fastly is known for its programmable VCL-based edge.'),
    m('How fast is Fastly\'s cache purge?', ['1 second', '<150ms', '5 minutes', 'Instant'], 1, 'Fastly purges cache in <150ms across all edges.'),
    m('What is VCL?', ['Fast, Very CLI', 'Varnish Configuration Language', 'Very Complex Logic', 'Virtual Cache Layer'], 1, 'VCL is Varnish Configuration Language.'),
    m('What is Compute@Edge?', ['Edge computing with VCL', 'WebAssembly-based serverless at edge', 'Edge cache', 'Edge DNS'], 1, 'Compute@Edge runs WebAssembly at the edge using Rust/JS/Go.'),
    m('What is a surrogate key?', ['Backup cache', 'Tag for cache object purging', 'SSL key', 'API key'], 1, 'Surrogate keys are tags used for targeted cache purging.'),
    m('What WAF did Fastly acquire?', ['Cloudflare WAF', 'Signal Sciences', 'AWS WAF', 'PerimeterX'], 1, 'Fastly acquired Signal Sciences for ML-based WAF.')
  ]
);

/* =================== TOPIC 30: Akamai =================== */
addTopic('cdn-akamai', 'Akamai', 'intermediate', 15,
  ['Akamai is one of the largest and most established CDN providers, founded in 1998 at MIT. It has the most globally distributed edge platform with 4000+ PoPs in 135+ countries.',
   'Key features: 4000+ edge servers, enterprise-grade security (Kona Site Defender, DDoS), media delivery optimization (Adaptive Media Delivery), Image & Video Manager, and sophisticated traffic management.',
   'Akamai operates a massively distributed network with servers embedded within ISPs, providing superior last-mile performance. It is the CDN of choice for large enterprises and media companies.',
   'Akamai uses a DNS-based routing system (not Anycast) with real-time mapping to direct users to the optimal edge server.'
  ],
  'Akamai is the "veteran" of the CDN world. Think of it as a delivery network with the largest number of local depots (4000+ PoPs), many tucked inside neighborhoods (ISPs). When a package needs delivering, it checks real-time traffic, road conditions, and depot capacity to choose the best route.',
  [
    d('Akamai Intelligent Edge Platform', '4000+ PoPs in 135+ countries, embedded in 1600+ ISPs. DNS-based traffic management with real-time mapping. Proprietary SureRoute technology optimizes paths. Edge servers are at the last mile, reducing final latency.'),
    d('Traffic Management', 'DNS-based (not Anycast): Akamai\'s authoritative DNS returns optimal edge server IP. Factors: geographic distance, server load, network health, cache availability. FastDNS: managed authoritative DNS. Global Traffic Management (GTM): load balancing across origins.'),
    d('Security (Kona Site Defender)', 'WAF: OWASP CRS, custom rules, positive security model. DDoS: L3/L4/L7 mitigation, edge-based scrubbing. Bot Manager: categorize bots (good/bad), challenge suspicious. Web App Protector: client-side integrity (detect tampering/automation). API Security: protect API endpoints.'),
    d('Media Delivery Solutions', 'Adaptive Media Delivery: optimized video streaming, adaptive bitrate. Broadcast Operations Control Center (BOCC): 24/7 monitoring. Media Services Live: live streaming. Download Delivery: large file optimization. Multi-CDN support.'),
    d('Image & Video Manager', 'Server-side media transformation. Resize, crop, rotate, format (WebP, AVIF), compression. Policy-based: define transformations as named policies. On-the-fly: transform via URL parameters. Responsive images: auto-generate multiple sizes. Device detection: optimal format per device.'),
    d('Property Manager (Configuration)', 'Akamai\'s configuration interface. Rules-based behaviors: cache, origin, security, performance. Rule trees with match criteria (path, header, cookie, device, geolocation). Behaviors: modify requests, responses at edge. Versioned configuration with activation workflow.')
  ],
  'Akamai is the largest CDN with 4000+ edge PoPs in 135+ countries. Uses DNS-based routing with real-time mapping. Enterprise security via Kona Site Defender. Optimized for media delivery. Image & Video Manager for transformations. Property Manager for rule-based configuration.',
  [
    q('How many PoPs does Akamai have?', '4000+ PoPs in 135+ countries, embedded in 1600+ ISPs.'),
    q('What is unique about Akamai\'s routing?', 'DNS-based routing with real-time mapping (not Anycast).'),
    q('What is Kona Site Defender?', 'Akamai\'s enterprise security suite with WAF, DDoS, bot management.'),
    q('What is Akamai\'s Image & Video Manager?', 'Server-side media transformation with policy-based and on-the-fly options.'),
    q('What is Property Manager?', 'Akamai\'s rule-based configuration interface for CDN behaviors.'),
    q('What is SureRoute?', 'Akamai\'s proprietary route optimization technology for dynamic content.'),
    q('What is Adaptive Media Delivery?', 'Akamai\'s optimized video streaming with adaptive bitrate support.'),
    q('What is the BOCC?', 'Broadcast Operations Control Center — 24/7 media monitoring.'),
    q('How does Akamai handle traffic management?', 'DNS-based: authoritative DNS returns optimal edge server based on real-time mapping.'),
    q('What is Bot Manager?', 'Akamai\'s bot detection and management — categorizes good/bad bots.')
  ],
  R(10,35,110,25,'#0070f3','','User','Browser') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','DNS Mapping','Real-time: Akamai authoritative DNS') +
  A(290,48,320,48) +
  R(330,35,130,25,'#ffc107','','Optimal Edge','4000+ PoPs, 135 countries, embedded in ISPs') +
  A(460,48,320,70) +
  R(160,75,130,25,'#dc3545','','Kona Site Defender','WAF + DDoS + Bot Manager') +
  R(300,75,130,25,'#e83e8c','','Media Optim','Adaptive Media Delivery') +
  R(440,75,130,25,'#6610f2','','Image Manager','Policy-based + on-the-fly') +
  T(240,195,'Akamai: 4000+ PoPs, DNS-based routing, Kona security, media delivery, image/video optimization.',9,'#666','middle'),
  [
    e('Akamai Property Manager Rule', 'Creating cache rules in Property Manager.', codeBlock([
      '# Akamai Property Manager (web console):',
      '# Create a new property or edit existing',
      '',
      '# Rule: Cache static assets for 30 days',
      '# Match: Path matches (*.css, *.js, *.jpg, *.png, *.svg)',
      '# Behavior: Caching ->',
      '#   "Cache HTTP error responses": 10s',
      '#   "Caching": "Force Freshness"',
      '#   "Max Age": "30 days"',
      '#   "Enable Must-Revalidate": true',
      '',
      '# Rule: Origin server configuration',
      '# Behavior: Origin Server ->',
      '#   "Origin Server Hostname": origin.example.com',
      '#   "Forward Host Header": origin.example.com',
      '#   "SSL Verify": true',
      '',
      '# Rule: Compress responses',
      '# Behavior: Response Compression ->',
      '#   "Compress": true',
      '#   "Content Types": text/*, application/json, application/javascript'
    ]), 'Akamai Property Manager rules for caching, origin, and compression configuration.'),
    e('Akamai Image Manager Policy', 'Define image transformation policy.', codeBlock([
      '# Akamai Image Manager Policy (JSON):',
      '{',
      '  "policy": "my-image-policy",',
      '  "breakpoints": [320, 640, 1024, 1920],',
      '  "output": {',
      '    "format": "best",  // auto-select WebP/AVIF',
      '    "quality": 85,',
      '    "compression": "auto"',
      '  },',
      '  "transformations": [',
      '    { "type": "resize", "width": "{{breakpoint}}", "height": "{{breakpoint * 0.75}}" },',
      '    { "type": "crop", "width": 1920, "height": 1080, "gravity": "center" }',
      '  ]',
      '}',
      '',
      '# Apply in Property Manager:',
      '# Behavior: Image & Video Manager ->',
      '#   "Apply to": Png, Jpg, Gif, Webp',
      '#   "Image Policy": my-image-policy',
      '#   "Video Policy": my-video-policy (optional)',
      '',
      '# On-the-fly URL:',
      '# /image.jpg?imwidth=400&imformat=webp'
    ]), 'Akamai Image Manager policy definition for automatic responsive image transformations.'),
    e('Akamai API (PAPI) Configuration', 'Managing Akamai via API.', codeBlock([
      '# Akamai Property Manager API (PAPI):',
      '',
      '# List properties:',
      'curl -s "https://akab-xxxx.luna.akamaiapis.net/papi/v1/properties?contractId=ctr_X&groupId=grp_X" \\',
      '  -H "Authorization: Bearer $AKAMAI_TOKEN"',
      '',
      '# Get property version:',
      'curl -s "https://akab-xxxx.luna.akamaiapis.net/papi/v1/properties/prp_X/versions/latest" \\',
      '  -H "Authorization: Bearer $AKAMAI_TOKEN"',
      '',
      '# Update property rule tree:',
      'curl -X PUT "https://akab-xxxx.luna.akamaiapis.net/papi/v1/properties/prp_X/versions/2/rules" \\',
      '  -H "Authorization: Bearer $AKAMAI_TOKEN" \\',
      '  -H "Content-Type: application/json" \\',
      '  -d @updated-rules.json',
      '',
      '# Activate property:',
      'curl -X POST "https://akab-xxxx.luna.akamaiapis.net/papi/v1/properties/prp_X/activations" \\',
      '  -H "Authorization: Bearer $AKAMAI_TOKEN" \\',
      '  -d \'{"network": "STAGING", "version": 2, "note": "Activating v2"}\''
    ]), 'Akamai Property Manager API for listing, updating, and activating CDN configurations.'),
    e('Akamai Kona WAF Rule', 'Configuring Akamai WAF rules.', codeBlock([
      '# Kona Site Defender WAF configuration:',
      '# Security Center -> WAF -> Custom Rules',
      '',
      '# Rule: Block SQL injection in URL',
      '# Rule Name: "Block SQLi in URI"',
      '# Match: URL Path contains (select|union|drop|delete|insert)',
      '# Action: Deny with 403',
      '# Log: true',
      '',
      '# Rule: Rate limit login',
      '# Rule Name: "Rate Limit Login"',
      '# Match: URL Path = /login',
      '# Rate: 10 requests per minute per IP',
      '# Action: Deny with 429',
      '# Challenge: CAPTCHA (optional)',
      '',
      '# Rule: Geo-allow (whitelist country)',
      '# Match: Country = US',
      '# Action: Allow',
      '',
      '# Bot Manager categories:',
      '# - Allow: Googlebot, Bingbot (verified bots)',
      '# - Monitor: unknown search engines',
      '# - Deny: scrapers, bad bots, suspicious'
    ]), 'Akamai Kona Site Defender WAF custom rules for SQL injection, rate limiting, and geo-filtering.'),
    e('Akamai Multi-CDN Configuration', 'Setting up multiple CDNs with Akamai.', codeBlock([
      '# Akamai supports multi-CDN via "CDN Interconnect"',
      '# and "Multi-CDN" feature (for premium customers)',
      '',
      '# Strategy: Primary = Akamai, failover = secondary CDN',
      '# Akamai monitors secondary CDN health',
      '# Traffic shifts based on performance',
      '',
      '# Multi-CDN configuration:',
      '# Property Manager -> Add Behavior -> Multi-CDN',
      '# Secondary providers: CloudFront, Cloudflare, Fastly',
      '# Criteria: latency, availability, cost, capacity',
      '',
      '# OR use DNS-based multi-CDN:',
      '# Route53/CNS with health checks',
      '# example.com CNAME to:',
      '#   akamai.example.com (Akamai)',
      '#   cloudfront.example.com (CloudFront)',
      '# Traffic splits based on DNS latency/health',
      '',
      '# Benefits: higher availability, geographic optimization,',
      '# vendor negotiation leverage, disaster recovery'
    ]), 'Akamai multi-CDN configuration options for redundancy and geographic optimization.')
  ],
  [
    m('How many PoPs does Akamai have?', ['200+', '1000+', '4000+', '10000+'], 2, 'Akamai has 4000+ PoPs in 135+ countries.'),
    m('What routing method does Akamai use?', ['Anycast', 'DNS-based with real-time mapping', 'BGP Anycast', 'HTTP redirects'], 1, 'Akamai uses DNS-based routing not Anycast.'),
    m('What is Kona Site Defender?', ['A CDN caching service', 'Akamai\'s security suite', 'A media player', 'A DNS service'], 1, 'Kona Site Defender is Akamai\'s enterprise security suite.'),
    m('What is Akamai\'s unique positioning?', ['Cheapest CDN', 'Largest edge network, enterprise focus', 'Best for startups', 'Open source CDN'], 1, 'Akamai is the largest CDN focused on enterprise customers.'),
    m('What is Property Manager?', ['Server management', 'CDN configuration interface', 'Property listing', 'Load balancer'], 1, 'Property Manager is Akamai\'s rule-based configuration interface.'),
    m('What is Image & Video Manager?', ['Media player', 'Server-side transformation service', 'Video editor', 'Streaming protocol'], 1, 'Image & Video Manager is for server-side media transformation.')
  ]
);

// ---- GENERATE ----
var dataDir = __dirname;

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["cdn"] = TOPICS_DATA["cdn"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["cdn"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated CDN topics: ' + Object.keys(topics).length);


