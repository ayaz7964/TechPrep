var { topic } = require('./helpers');

module.exports = [

  // NGINX Basics
  topic('k8s-nginx-basics', 'NGINX Basics', 'beginner', 10,
    'NGINX is a high-performance web server, reverse proxy, and load balancer. In Kubernetes, it is commonly deployed as an Ingress Controller or as a sidecar proxy. Key features: static file serving, reverse proxy, SSL termination, load balancing, caching, and rate limiting.',
    [
      'High-performance web server and reverse proxy',
      'Event-driven, non-blocking architecture',
      'Used as Ingress Controller, sidecar, or standalone web server',
      'Configuration via nginx.conf (or annotations in Ingress)'
    ],
    [
      { heading: 'NGINX Architecture', text: 'Master process: reads config, spawns workers, manages processes. Worker processes: event-driven, handle connections. Each worker handles thousands of connections using epoll (Linux) or kqueue (FreeBSD). No threading per connection = low memory footprint.' },
      { heading: 'Kubernetes Deployment', text: 'As Deployment: standalone nginx serving web content. As DaemonSet: NGINX Ingress Controller on every node. As sidecar: alongside app containers. Configuration: via ConfigMap for files, or Ingress annotations for routing rules.' }
    ],
    [
      { question: 'What is NGINX?', answer: 'High-performance web server, reverse proxy, and load balancer.' },
      { question: 'NGINX architecture?', answer: 'Master process + event-driven worker processes (epoll/kqueue).' },
      { question: 'Kubernetes uses?', answer: 'Ingress Controller, sidecar proxy, web server.' },
      { question: 'NGINX vs Apache?', answer: 'NGINX: event-driven, lower memory. Apache: process/thread-based.' }
    ],
    [
      { question: 'NGINX workers use?', options: ['Threads per connection', 'Event-driven (epoll/kqueue)', 'Process per connection'], answer: 1 },
      { question: 'Master process role?', options: ['Handle requests', 'Read config + manage workers', 'Cache content'], answer: 1 },
      { question: 'NGINX in K8s as?', options: ['Ingress Controller only', 'Web server, proxy, ingress', 'DNS server'], answer: 1 },
      { question: 'Config file?', options: ['nginx.conf', 'httpd.conf', 'apache.conf'], answer: 0 }
    ],
    [
      { title: 'Deploy NGINX', useCase: 'Web server', code: 'kubectl create deployment nginx --image=nginx --replicas=2', description: 'Deploys NGINX web server.' },
      { title: 'Expose NGINX', useCase: 'Access web server', code: 'kubectl expose deployment nginx --port=80 --type=LoadBalancer', description: 'Exposes NGINX externally.' },
      { title: 'Custom NGINX Config', useCase: 'Custom nginx.conf', code: 'kubectl create configmap nginx-config --from-file=nginx.conf;\nkubectl set volume deployment nginx --add --name=config --mount-path=/etc/nginx/nginx.conf --sub-path=nginx.conf --configmap=nginx-config', description: 'Mounts custom config.' }
    ]
  ),

  // Reverse Proxy
  topic('k8s-nginx-reverse-proxy', 'Reverse Proxy', 'intermediate', 15,
    'NGINX reverse proxy forwards client requests to backend servers, providing load balancing, caching, SSL termination, and header manipulation. In Kubernetes, the Ingress Controller acts as a reverse proxy for cluster services.',
    [
      'Forwards client requests to backend servers',
      'Load balancing between backends (round robin, least_conn, ip_hash)',
      'SSL termination, header manipulation, caching',
      'Kubernetes Ingress Controller = reverse proxy with dynamic config'
    ],
    [
      { heading: 'Reverse Proxy Directives', text: 'proxy_pass http://backend; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; proxy_redirect off; proxy_buffering on; proxy_cache my_cache;' },
      { heading: 'Kubernetes Integration', text: 'NGINX Ingress Controller generates reverse proxy configuration from Ingress resources. Upstream backends are ClusterIP Services. Dynamic reload without dropping connections. Health checks via nginx.ingress.kubernetes.io/server-snippet.' }
    ],
    [
      { question: 'Reverse proxy function?', answer: 'Forwards client requests to backend servers with load balancing and SSL.' },
      { question: 'Common proxy headers?', answer: 'X-Real-IP, X-Forwarded-For, X-Forwarded-Proto, Host.' },
      { question: 'NGINX Ingress as reverse proxy?', answer: 'Yes — generates proxy config from Ingress resources.' },
      { question: 'proxy_pass directive?', answer: 'Specifies backend server URL to forward requests to.' }
    ],
    [
      { question: 'Reverse proxy does?', options: ['Serve files', 'Forward to backends', 'DNS resolution'], answer: 1 },
      { question: 'X-Forwarded-For preserves?', answer: 'Client original IP through proxies.' },
      { question: 'NGINX Ingress backends?', options: ['Pod IPs direct', 'ClusterIP Services', 'External DNS'], answer: 1 },
      { question: 'proxy_bufferring?', options: ['On by default', 'Off by default', 'Requires setting'], answer: 0 }
    ]
  ),

  // Load Balancer
  topic('k8s-nginx-load-balancer', 'Load Balancer', 'intermediate', 15,
    'NGINX provides HTTP and TCP/UDP load balancing with multiple algorithms. Upstream blocks define backend server groups. Methods: round-robin (default), least_conn, ip_hash, random, hash. Health checks detect and remove unhealthy backends.',
    [
      'Upstream block defines backend server group',
      'Methods: round-robin, least_conn, ip_hash, random, hash',
      'Passive health checks: max_fails, fail_timeout',
      'Active health checks via ngx_http_healthcheck_module (NGINX Plus)'
    ],
    [
      { heading: 'Load Balancing Methods', text: 'round-robin (default): distributes evenly. least_conn: sends to backend with fewest connections. ip_hash: client IP-based persistence. hash: custom key (IP, URL, query parameter). random: random with two choices. Weighted: server weight=N for capacity skew.' },
      { heading: 'Health Checks', text: 'Passive: NGINX marks backend as failed after max_fails (default 1) within fail_timeout (default 10s). Active (NGINX Plus): periodic health checks against specific endpoints. slow_start: gradually add weight to recovered backends.' }
    ],
    [
      { question: 'NGINX upstream?', answer: 'Backend server group definition for load balancing.' },
      { question: 'Default LB method?', answer: 'round-robin (even distribution).' },
      { question: 'ip_hash does?', answer: 'Client IP-based sticky sessions.' },
      { question: 'Passive health check parameters?', answer: 'max_fails (bad responses before fail) and fail_timeout (timeout).' }
    ],
    [
      { question: 'NGINX default method?', options: ['least_conn', 'round-robin', 'ip_hash', 'hash'], answer: 1 },
      { question: 'Sticky sessions via?', options: ['round-robin', 'ip_hash', 'least_conn', 'random'], answer: 1 },
      { question: 'max_fails default?', options: ['0', '1', '3', '5'], answer: 1 },
      { question: 'fail_timeout default?', options: ['5s', '10s', '30s', '60s'], answer: 1 }
    ]
  ),

  // SSL/TLS
  topic('k8s-nginx-ssl', 'SSL/TLS', 'intermediate', 15,
    'NGINX provides SSL/TLS termination, certificate management, and HTTPS configuration. Supports TLS 1.2/1.3, modern cipher suites, HSTS, OCSP stapling, and mutual TLS (client certificates).',
    [
      'SSL termination: decrypts HTTPS before forwarding to backend',
      'TLS 1.2 minimum, TLS 1.3 supported',
      'HSTS: Strict-Transport-Security header',
      'OCSP stapling improves certificate validation performance'
    ],
    [
      { heading: 'SSL Configuration', text: 'listen 443 ssl http2; ssl_certificate /etc/nginx/ssl/tls.crt; ssl_certificate_key /etc/nginx/ssl/tls.key; ssl_protocols TLSv1.2 TLSv1.3; ssl_ciphers HIGH:!aNULL:!MD5; ssl_prefer_server_ciphers on; ssl_session_cache shared:SSL:10m; ssl_session_timeout 10m;' },
      { heading: 'Hardening', text: 'HSTS: add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always. OCSP: ssl_stapling on; ssl_stapling_verify on; resolver 8.8.8.8;. Mutual TLS: ssl_client_certificate, ssl_verify_client on. Drop old TLS versions and weak ciphers.' }
    ],
    [
      { question: 'What is SSL termination?', answer: 'Decrypting HTTPS traffic at the proxy, forwarding HTTP to backend.' },
      { question: 'Minimum TLS version?', answer: 'TLS 1.2 (default in modern configs).' },
      { question: 'HSTS header purpose?', answer: 'Forces browsers to always use HTTPS for the domain.' },
      { question: 'OCSP stapling?', answer: 'Server checks certificate revocation status and caches result.' }
    ],
    [
      { question: 'SSL directive?', options: ['ssl_certificate', 'ssl_cert', 'tls_cert'], answer: 0 },
      { question: 'HSTS header?', options: ['X-HTTPS', 'Strict-Transport-Security', 'Force-HTTPS'], answer: 1 },
      { question: 'TLS 1.3 support?', options: ['Yes', 'No', 'NGINX Plus only'], answer: 0 },
      { question: 'ssl_prefer_server_ciphers?', options: ['Client chooses', 'Server chooses', 'Both'], answer: 1 }
    ]
  ),

  // HTTPS
  topic('k8s-nginx-https', 'HTTPS', 'intermediate', 10,
    'HTTPS configuration in NGINX involves enabling SSL, redirecting HTTP to HTTPS, and configuring secure defaults. HTTP-to-HTTPS redirect uses return 301 or rewrite. HSTS ensures browsers always use HTTPS.',
    [
      'Listen on port 443 with SSL, redirect port 80 to 443',
      'HTTP-to-HTTPS: return 301 https://$host$request_uri',
      'HSTS: Strict-Transport-Security header',
      'In Kubernetes: Ingress TLS section + cert-manager'
    ],
    [
      { heading: 'HTTP to HTTPS Redirect', text: 'server { listen 80; server_name example.com; return 301 https://$server_name$request_uri; }. Or use: if ($scheme != "https") { return 301 https://$host$request_uri; }. In NGINX Ingress: nginx.ingress.kubernetes.io/force-ssl-redirect: "true".' },
      { heading: 'In-Kubernetes HTTPS', text: 'Ingress TLS: spec.tls with secretName. cert-manager: Certificate CRD with ClusterIssuer. NGINX Ingress auto-configures HTTPS from TLS Secrets. HTTP-to-HTTPS redirect via annotation. HSTS via nginx.ingress.kubernetes.io/hsts.' }
    ],
    [
      { question: 'HTTP to HTTPS redirect?', answer: 'return 301 https://$host$request_uri on port 80.' },
      { question: 'Kubernetes HTTPS?', answer: 'Ingress TLS section referencing a TLS Secret.' },
      { question: 'NGINX Ingress HTTPS redirect?', answer: 'force-ssl-redirect: "true" annotation.' },
      { question: 'HSTS in NGINX Ingress?', answer: 'hsts annotation (enabled by default).' }
    ],
    [
      { question: 'HTTPS port?', options: ['80', '443', '8443'], answer: 1 },
      { question: 'Redirect code?', options: ['200', '301', '302', '307'], answer: 1 },
      { question: 'HTTPS in K8s requires?', options: ['TLS Secret + Ingress TLS', 'Only Ingress', 'Only Secret'], answer: 0 },
      { question: 'HSTS max-age unit?', options: ['Minutes', 'Days', 'Seconds'], answer: 2 }
    ],
    [
      { title: 'Force HTTPS in Ingress', useCase: 'HTTP->HTTPS redirect', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/force-ssl-redirect="true"', description: 'Redirects HTTP to HTTPS.' },
      { title: 'Enable HSTS', useCase: 'Security header', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/hsts="true"', description: 'Enables HSTS.' }
    ]
  ),

  // URL Rewrite
  topic('k8s-nginx-url-rewrite', 'URL Rewrite', 'intermediate', 10,
    'NGINX URL rewriting modifies request URIs before proxying. Supports regex capture groups, flags (last, break, redirect, permanent), and conditional rewrites. In Kubernetes Ingress, use rewrite-target annotation for path stripping.',
    [
      'rewrite directive: regex replacement with flags',
      'Flags: last (exit, re-evaluate), break (exit), redirect (302), permanent (301)',
      'Capture groups: $1, $2, etc.',
      'Ingress: rewrite-target annotation for path stripping'
    ],
    [
      { heading: 'Rewrite Syntax', text: 'rewrite ^/api/(.*) /$1 break; — strips /api prefix. rewrite ^/old-path/(.*) /new-path/$1 permanent; — permanent redirect. rewrite ^ https://$server_name$request_uri? permanent; — HTTPS redirect. Flags: last (try next location), break (stop), redirect (302 temp), permanent (301).' },
      { heading: 'Ingress Path Rewriting', text: 'NGINX Ingress: nginx.ingress.kubernetes.io/rewrite-target: /$2. Ingress path: /api(/|$)(.*). This captures /api/users to /users, stripping /api prefix. Use capture groups ($1, $2) in both path and rewrite-target.' }
    ],
    [
      { question: 'NGINX rewrite?', answer: 'Modifies request URI using regex replacement.' },
      { question: 'Rewrite flags?', answer: 'last (exit + re-evaluate), break (exit), redirect (302), permanent (301).' },
      { question: 'Capture group syntax?', answer: '(regex) -> $1, $2, $3 in replacement.' },
      { question: 'Ingress path rewrite?', answer: 'rewrite-target annotation strips path prefixes.' }
    ],
    [
      { question: 'Rewrite flag not valid?', options: ['last', 'break', 'redirect', 'continue'], answer: 3 },
      { question: 'Permanent redirect status?', options: ['302', '301', '307'], answer: 1 },
      { question: 'Rewrite stops processing?', options: ['last (re-evaluates)', 'break (stops)', 'Both'], answer: 2 },
      { question: 'Ingress rewrite annotation?', options: ['rewrite-target', 'uri-rewrite', 'path-rewrite'], answer: 0 }
    ],
    [
      { title: 'Add Rewrite Rule', useCase: 'Strip /api prefix', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/rewrite-target="/$2"', description: 'Rewrites /api/users to /users.' },
      { title: 'Use Capture Groups', useCase: 'Complex rewrites', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/server-snippet="rewrite ^/app/(.*) /$1 break;"', description: 'Custom rewrite in server context.' }
    ]
  ),

  // Compression
  topic('k8s-nginx-compression', 'Compression', 'intermediate', 10,
    'NGINX gzip compression reduces bandwidth by compressing responses before sending to clients. Configurable for MIME types, minimum length, and compression level. Reduces transfer size by 60-80% for text-based responses (HTML, CSS, JS, JSON).',
    [
      'gzip on; enables response compression',
      'gzip_types: text/html, text/css, application/javascript, application/json',
      'gzip_min_length: 1000 (bytes, minimum size to compress)',
      'gzip_comp_level: 1-9 (1=fast, 9=best)'
    ],
    [
      { heading: 'Compression Configuration', text: 'gzip on; gzip_vary on; gzip_proxied any; gzip_comp_level 6; gzip_min_length 256; gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml; gzip_disable "msie6";' },
      { heading: 'Brotli Compression', text: 'brotli (ngx_brotli) provides better compression than gzip (20-30% smaller). Install ngx_brotli module. brotli on; brotli_types same as gzip; brotli_comp_level 6;. For NGINX Ingress: add via ConfigMap with enable-brotli: "true".' }
    ],
    [
      { question: 'NGINX compression?', answer: 'gzip on — compresses text responses to reduce bandwidth.' },
      { question: 'Compression level range?', answer: '1-9. 1=fast/least, 9=slow/best compression.' },
      { question: 'gzip_min_length?', answer: 'Minimum response size in bytes before compressing (default 20).' },
      { question: 'gzip_types?', answer: 'MIME types to compress. Default: text/html only.' }
    ],
    [
      { question: 'Compression reduces?', options: ['Bandwidth ~60-80%', 'CPU usage', 'Latency'], answer: 0 },
      { question: 'High compression costs?', options: ['More bandwidth', 'More CPU', 'More memory'], answer: 1 },
      { question: 'Brotli vs gzip?', options: ['Weaker', 'Better compression 20-30%', 'Same'], answer: 1 },
      { question: 'gzip_vary?', options: ['Adds Vary header', 'Changes level', 'Increases speed'], answer: 0 }
    ],
    [
      { title: 'Enable Compression', useCase: 'Reduce bandwidth', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/configuration-snippet="gzip on; gzip_types text/plain text/css application/json;"', description: 'Enables gzip for ingress.' },
      { title: 'Enable Brotli', useCase: 'Better compression', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/enable-brotli="true"', description: 'Enables Brotli compression.' }
    ]
  ),

  // Caching
  topic('k8s-nginx-caching', 'Caching', 'intermediate', 10,
    'NGINX caching stores responses from backends and serves them directly for subsequent requests, reducing backend load and improving response times. Cache keys based on URL, query params, and headers. Cache purging, bypass, and validation supported.',
    [
      'proxy_cache_path defines cache storage location and size',
      'proxy_cache <zone> enables cache for a location',
      'proxy_cache_key defines cache key ($scheme$host$request_uri)',
      'Cache purging via proxy_cache_purge (NGINX Plus) or third-party module'
    ],
    [
      { heading: 'Cache Configuration', text: 'proxy_cache_path /data/nginx/cache levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m use_temp_path=off; proxy_cache my_cache; proxy_cache_key "$scheme$request_method$host$request_uri"; proxy_cache_valid 200 302 60m; proxy_cache_valid 404 1m; proxy_cache_use_stale error timeout updating;' },
      { heading: 'Cache Bypass and Purging', text: 'Bypass: proxy_cache_bypass $cookie_nocache $arg_nocache; with cookie/param. Invalidate: Cache-Control: max-age=0 or no-cache header. Purge (NGINX Plus): proxy_cache_purge with PURGE method. Microcaching: cache for short TTL (1s) to absorb traffic spikes.' }
    ],
    [
      { question: 'NGINX caching?', answer: 'Stores backend responses and serves them directly for repeated requests.' },
      { question: 'Cache key default?', answer: '$scheme$host$request_uri (scheme, host, URI + query).' },
      { question: 'Cache storage defined by?', answer: 'proxy_cache_path directive (path, zone, size, inactive).' },
      { question: 'Cache bypass?', answer: 'proxy_cache_bypass with cookie or query param.' }
    ],
    [
      { question: 'Cache zone directive?', options: ['proxy_cache', 'proxy_cache_path', 'cache_zone'], answer: 0 },
      { question: 'Cache key includes?', options: ['URI only', 'Scheme + host + URI', 'Host + path'], answer: 1 },
      { question: 'Cache valid for status?', options: ['proxy_cache_valid', 'cache_valid', 'cache_status'], answer: 0 },
      { question: 'Microcaching TTL?', options: ['1s', '60s', '3600s'], answer: 0 }
    ]
  ),

  // Rate Limiting
  topic('k8s-nginx-rate-limiting', 'Rate Limiting', 'intermediate', 15,
    'NGINX rate limiting controls the rate of requests from a client to prevent abuse and protect backends. Uses leaky bucket algorithm. Configured per IP, per URI, or custom key. In Kubernetes Ingress, use limit-rps annotation.',
    [
      'limit_req_zone defines shared memory zone for rate tracking',
      'limit_req zone=my_limit burst=20 nodelay; applies rate limit',
      'leaky bucket algorithm: burst absorbs spikes, nodelay drops excess',
      'Ingress: limit-rps (requests/sec) and limit-connections annotations'
    ],
    [
      { heading: 'Rate Limit Configuration', text: 'limit_req_zone $binary_remote_addr zone=my_limit:10m rate=10r/s; server { location /api/ { limit_req zone=my_limit burst=20 nodelay; } }. burst=20: allow up to 20 excess requests. nodelay: process burst immediately (not delayed). Without nodelay: excess requests delayed.' },
      { heading: 'Advanced Limiting', text: 'Per-URI: limit_req_zone $request_uri. Per-header: $http_x_api_key. Connection limiting: limit_conn_zone $binary_remote_addr zone=addr:10m; limit_conn addr 10; (max 10 concurrent connections). Dry-run: limit_req_dry_run on; for testing.' }
    ],
    [
      { question: 'Rate limiting algorithm?', answer: 'Leaky bucket — hard limit with optional burst absorption.' },
      { question: 'limit_req_zone defines?', answer: 'Shared memory zone: key, size, rate (requests per second/minute).' },
      { question: 'burst parameter?', answer: 'Number of excess requests allowed before throttling.' },
      { question: 'nodelay effect?', answer: 'Process burst immediately instead of delaying (still counted).' }
    ],
    [
      { question: 'Rate limit zone directive?', options: ['limit_req', 'limit_req_zone', 'rate_limit'], answer: 1 },
      { question: 'Rate unit?', options: ['r/s', 'r/m', 'Both'], answer: 2 },
      { question: 'Connection limit directive?', options: ['limit_conn', 'limit_connections', 'conn_limit'], answer: 0 },
      { question: 'Ingress RPS annotation?', options: ['limit-rps', 'rate-limit', 'throttle'], answer: 0 }
    ],
    [
      { title: 'Ingress Rate Limit', useCase: 'Limit requests to service', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/limit-rps="10"', description: 'Limits to 10 requests/sec.' },
      { title: 'Connection Limit', useCase: 'Max concurrent connections', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/limit-connections="100"', description: 'Limits to 100 connections.' }
    ]
  ),

  // Static File Hosting
  topic('k8s-nginx-static-files', 'Static File Hosting', 'beginner', 10,
    'NGINX efficiently serves static files (HTML, CSS, JS, images) directly from disk. Its event-driven architecture handles thousands of concurrent connections with minimal overhead. Perfect for SPAs, documentation sites, and static assets.',
    [
      'Serve static files directly with sendfile + tcp_nopush',
      'root directive sets file root directory',
      'Expires headers for browser caching',
      'try_files for SPA client-side routing support'
    ],
    [
      { heading: 'Static File Configuration', text: 'root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } — SPA support. sendfile on; tcp_nopush on; — optimized file delivery. expires 30d; add_header Cache-Control "public, immutable"; — long-term caching.' },
      { heading: 'Kubernetes Deployment', text: 'Build static files into NGINX image: FROM nginx:alpine; COPY dist /usr/share/nginx/html. Or mount via volume: nginx with ConfigMap/PVC. Ingress routing to NGINX Service. CDN integration: CloudFront/CloudFlare as caching layer in front.' }
    ],
    [
      { question: 'NGINX static file serving?', answer: 'Efficient delivery of HTML, CSS, JS, images using sendfile.' },
      { question: 'root directive?', answer: 'Base directory for serving files (default /usr/share/nginx/html).' },
      { question: 'try_files for SPA?', answer: 'try_files $uri $uri/ /index.html — falls back to index.html for client-side routing.' },
      { question: 'Cache control?', answer: 'expires 30d; add_header Cache-Control "public, immutable".' }
    ],
    [
      { question: 'Static file optimization?', options: ['sendfile', 'tcp_nopush', 'Both'], answer: 2 },
      { question: 'SPA fallback file?', options: ['index.html', '404.html', 'app.js'], answer: 0 },
      { question: 'expires directive?', options: ['Cache-Control header', 'Expiry date', 'Both'], answer: 2 },
      { question: 'NGINX alpine image size?', options: ['~200MB', '~25MB', '~1GB'], answer: 1 }
    ],
    [
      { title: 'Deploy SPA with NGINX', useCase: 'Host React/Angular app', code: 'kubectl create deployment spa --image=nginx:alpine;\nkubectl set volume deployment spa --add --name=static --mount-path=/usr/share/nginx/html --configmap=spa-content', description: 'Deploys NGINX serving static content.' },
      { title: 'Expose Static Site', useCase: 'Access via Ingress', code: 'kubectl create ingress spa --rule="example.com/*=spa:80"', description: 'Routes to static NGINX server.' }
    ]
  ),

  // NGINX Ingress Controller
  topic('k8s-nginx-ingress-controller', 'NGINX Ingress Controller', 'advanced', 20,
    'The NGINX Ingress Controller is the most popular Kubernetes Ingress implementation. It uses NGINX as the reverse proxy and dynamically generates nginx.conf from Ingress resources. Supports annotations for advanced features: rate limiting, auth, canary, rewrites, CORS, and more.',
    [
      'Most popular Ingress Controller (CNCF project)',
      'Dynamically generates nginx.conf from Ingress resources',
      'Wide annotation support for advanced features',
      'Supports TCP/UDP, canary, auth, rate limiting'
    ],
    [
      { heading: 'Architecture', text: 'Deployment with --publish-service for LoadBalancer. Watches Ingress, Service, Secret resources. Generates nginx.conf template with Lua scripting. Reloads NGINX on config changes (hot reload). ConfigMap for global config (log format, proxy settings, SSL ciphers).' },
      { heading: 'Advanced Features', text: 'TCP/UDP Services: --tcp-services-configmap and --udp-services-configmap for non-HTTP traffic. Canary: canary-weight, canary-by-header, canary-by-cookie. Auth: basic-auth, oauth, oidc, external-auth. Custom errors: default-backend-service. Custom snippets: configuration-snippet, server-snippet.' }
    ],
    [
      { question: 'How does NGINX Ingress work?', answer: 'Dynamic nginx.conf generation from Ingress resources with hot reload.' },
      { question: 'Popular annotations?', answer: 'rewrite-target, force-ssl-redirect, limit-rps, canary, enable-cors.' },
      { question: 'TCP/UDP support?', answer: 'Via --tcp-services-configmap and --udp-services-configmap flags.' },
      { question: 'Hot reload?', answer: 'Generates new config and reloads NGINX without dropping connections.' }
    ],
    [
      { question: 'NGINX Ingress watches?', options: ['Ingress only', 'Ingress, Service, Secret', 'All resources'], answer: 1 },
      { question: 'Global config via?', options: ['ConfigMap', 'Annotations', 'CRDs'], answer: 0 },
      { question: 'Canary annotation?', options: ['canary', 'canary-weight', 'Both'], answer: 2 },
      { question: 'Error responses from?', options: ['NGINX default', 'default-backend Service', 'ConfigMap'], answer: 1 }
    ],
    [
      { title: 'Install NGINX Ingress', useCase: 'Deploy controller', code: 'kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml', description: 'Deploys NGINX Ingress Controller.' },
      { title: 'View Controller Config', useCase: 'Check global settings', code: 'kubectl get configmap -n ingress-nginx ingress-nginx-controller -o yaml', description: 'Shows NGINX global configuration.' },
      { title: 'Check Controller Logs', useCase: 'Debug ingress issues', code: 'kubectl logs -n ingress-nginx -l app.kubernetes.io/component=controller', description: 'Shows controller logs.' }
    ]
  )
];
