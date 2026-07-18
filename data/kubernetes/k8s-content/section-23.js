var { topic } = require('./helpers');

module.exports = [

  // Ingress Controller
  topic('k8s-ingress-controller', 'Ingress Controller', 'intermediate', 15,
    'An Ingress Controller fulfills Ingress resources, providing L7 HTTP/HTTPS routing. Unlike other controllers, Ingress Controller is not built-in — you must deploy one: NGINX, Traefik, HAProxy, AWS ALB, GCE. It watches Ingress resources and configures the underlying load balancer.',
    [
      'Not built-in — must be deployed separately',
      'Watches Ingress resources and configures routing',
      'Options: NGINX, Traefik, HAProxy, AWS ALB, GCE, Contour',
      'Handles TLS termination, path/host routing, rate limiting'
    ],
    [
      { heading: 'How It Works', text: 'Ingress Controller runs as a Deployment or DaemonSet. It watches Ingress resources via the Kubernetes API. When an Ingress is created/updated, the controller generates config (e.g., nginx.conf) and reloads. Routes external traffic by host/path to Services.' },
      { heading: 'Controller Comparison', text: 'NGINX: most popular, feature-rich, Lua plugins. Traefik: automatic Let\'s Encrypt, service mesh integration. HAProxy: high performance, TCP/UDP support. AWS/GCE ALB: cloud-native, integrates with cloud WAF.' }
    ],
    [
      { question: 'What is an Ingress Controller?', answer: 'Deployed component that fulfills Ingress resources with L7 routing.' },
      { question: 'Is it built-in?', answer: 'No. Must be deployed separately (NGINX, Traefik, etc.).' },
      { question: 'How does it work?', answer: 'Watches Ingress API, generates config (nginx.conf), reloads.' },
      { question: 'Popular options?', answer: 'NGINX Ingress, Traefik, HAProxy, AWS ALB, GCE.' }
    ],
    [
      { question: 'Ingress Controller is?', options: ['Built-in', 'Deployed separately', 'Optional addon'], answer: 1 },
      { question: 'Most popular?', options: ['Traefik', 'NGINX', 'HAProxy', 'AWS ALB'], answer: 1 },
      { question: 'Generates config for?', options: ['kube-proxy', 'Underlying LB / nginx.conf', 'CoreDNS'], answer: 1 },
      { question: 'Auto HTTPS?', options: ['NGINX', 'Traefik (built-in ACME)', 'HAProxy'], answer: 1 }
    ],
    [
      { title: 'Install NGINX Ingress', useCase: 'Deploy controller', code: 'kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml', description: 'Deploys NGINX Ingress Controller.' },
      { title: 'Check Controller Status', useCase: 'Verify deployment', code: 'kubectl get pods -n ingress-nginx', description: 'Shows controller Pod status.' }
    ]
  ),

  // NGINX Ingress
  topic('k8s-nginx-ingress', 'NGINX Ingress', 'intermediate', 15,
    'NGINX Ingress Controller is the most popular choice, using NGINX as the reverse proxy. Features: path/host routing, TLS termination, rate limiting, authentication, canary, custom annotations. Configures nginx.conf dynamically.',
    [
      'Most popular Ingress Controller using NGINX reverse proxy',
      'Annotations for customization: rewrite, cors, rate-limit, auth',
      'Supports TCP/UDP Services via --tcp-services-configmap',
      'Canary deployments via nginx.ingress.kubernetes.io/canary'
    ],
    [
      { heading: 'Annotations', text: 'Rewrite: nginx.ingress.kubernetes.io/rewrite-target. CORS: enable-cors, cors-* headers. Rate limit: limit-rps, limit-connections. Auth: basic-auth, oauth, oidc. SSL: force-ssl-redirect, ssl-passthrough. Session: affinity (cookie).' },
      { heading: 'Canary with NGINX', text: 'Annotations: canary: "true", canary-weight (0-100), canary-by-header, canary-by-cookie. Weighted traffic split between primary and canary backends without replica manipulation.' }
    ],
    [
      { question: 'What is NGINX Ingress?', answer: 'Most popular Ingress Controller using NGINX as reverse proxy.' },
      { question: 'How to customize?', answer: 'Annotations on the Ingress resource.' },
      { question: 'Canary support?', answer: 'Via canary annotations for weighted traffic splitting.' },
      { question: 'TCP/UDP Services?', answer: 'Via --tcp-services-configmap and --udp-services-configmap.' }
    ],
    [
      { question: 'Rewrite annotation?', options: ['rewrite-target', 'url-rewrite', 'path-rewrite'], answer: 0 },
      { question: 'Canary weight annotation?', options: ['canary-weight', 'traffic-weight', 'canary-traffic'], answer: 0 },
      { question: 'Rate limit annotation?', options: ['limit-rps', 'rate-limit', 'throttle'], answer: 0 },
      { question: 'Session affinity uses?', options: ['Header', 'Cookie', 'IP'], answer: 1 }
    ],
    [
      { title: 'Create NGINX Ingress', useCase: 'Route with host', code: 'kubectl create ingress web --rule="example.com/*=web:80"', description: 'Routes example.com to web service.' },
      { title: 'Rewrite Rule', useCase: 'Path rewrite', code: 'kubectl annotate ingress web nginx.ingress.kubernetes.io/rewrite-target=/', description: 'Rewrites paths.' }
    ]
  ),

  // Traefik
  topic('k8s-traefik', 'Traefik', 'intermediate', 15,
    'Traefik is a modern HTTP reverse proxy with built-in service mesh features. Supports automatic Let\'s Encrypt, middleware for rate limiting, circuit breaking, and authentication. Uses custom CRDs (IngressRoute, Middleware) instead of annotations.',
    [
      'Modern reverse proxy with automatic ACME/Let\'s Encrypt',
      'Custom CRDs: IngressRoute, Middleware, TLSOption',
      'Dashboard for monitoring routes and health',
      'Built-in metrics (Prometheus, OpenTelemetry)'
    ],
    [
      { heading: 'Architecture', text: 'Traefik runs as Deployment or DaemonSet. Discovers services via the Kubernetes API. IngressRoute CRD defines routing (host, path, middleware chain). Middleware CRD defines auth, rate limiting, headers, circuit breaking.' },
      { heading: 'Features', text: 'Automatic Let\'s Encrypt provisioning and renewal. TCP/UDP routing. Weighted round-robin between services. Middleware chain: auth -> rate-limit -> headers -> circuit-breaker -> forward. Dashboard with real-time metrics.' }
    ],
    [
      { question: 'What is Traefik?', answer: 'Modern reverse proxy with built-in ACME, middleware, and CRD-based routing.' },
      { question: 'Routing CRD?', answer: 'IngressRoute (host/path rules with middleware chain).' },
      { question: 'Middleware?', answer: 'CRD for auth, rate limiting, headers, circuit breaking.' },
      { question: 'Traefik vs NGINX?', answer: 'Traefik: CRD-based, auto ACME, service mesh. NGINX: annotation-based, more plugins.' }
    ],
    [
      { question: 'Traefik uses?', options: ['Annotations only', 'CRDs (IngressRoute)', 'ConfigMaps'], answer: 1 },
      { question: 'Auto TLS via?', options: ['cert-manager', 'Built-in ACME', 'Manual secrets'], answer: 1 },
      { question: 'Middleware is a?', options: ['Annotation', 'CRD', 'ConfigMap entry'], answer: 1 },
      { question: 'Traefik dashboard?', options: ['Built-in', 'Separate tool', 'Not available'], answer: 0 }
    ],
    [
      { title: 'Install Traefik', useCase: 'Deploy ingress controller', code: 'helm repo add traefik https://helm.traefik.io/traefik;\nhelm install traefik traefik/traefik', description: 'Installs Traefik via Helm.' },
      { title: 'Create IngressRoute', useCase: 'Route traffic', code: 'kubectl apply -f ingress-route.yaml', description: 'Creates Traefik IngressRoute CRD.' }
    ]
  ),

  // HAProxy
  topic('k8s-haproxy', 'HAProxy', 'intermediate', 15,
    'HAProxy Ingress Controller provides high-performance L4/L7 load balancing. Known for extreme performance and low resource usage. Supports TCP, HTTP, and HTTPS proxying with advanced ACL-based routing.',
    [
      'High-performance L4/L7 load balancer',
      'ACL-based routing for complex rules',
      'TCP proxying for non-HTTP workloads',
      'Stats page for real-time monitoring'
    ],
    [
      { heading: 'Configuration', text: 'ConfigMap-based routing rules. HAProxy configuration template with Go template syntax. ACLs for complex rule matching (path, header, method, source IP). Stick tables for session persistence.' },
      { heading: 'Use Cases', text: 'High-throughput HTTP routing. Database proxy (read/write splitting). TCP/UDP load balancing for non-HTTP protocols. WebSocket support with native connection handling.' }
    ],
    [
      { question: 'What is HAProxy Ingress?', answer: 'High-performance L4/L7 ingress with ACL-based routing.' },
      { question: 'Configuration method?', answer: 'ConfigMap with HAProxy template and ACL rules.' },
      { question: 'HAProxy strength?', answer: 'Extreme performance, low resource usage, TCP proxying.' },
      { question: 'Use case?', answer: 'High-throughput HTTP, database proxy, non-HTTP TCP traffic.' }
    ],
    [
      { question: 'HAProxy config via?', options: ['Annotations', 'ConfigMap', 'CRDs'], answer: 1 },
      { question: 'HAProxy strength vs NGINX?', options: ['More features', 'Higher performance', 'Easier config'], answer: 1 },
      { question: 'ACL stands for?', options: ['Access Control List', 'Application Class Library', 'Active Connection Limit'], answer: 0 },
      { question: 'Stick tables used for?', options: ['Routing', 'Session persistence', 'Rate limiting'], answer: 1 }
    ],
    [
      { title: 'Install HAProxy', useCase: 'Deploy ingress', code: 'kubectl apply -f https://raw.githubusercontent.com/haproxy-ingress/haproxy-ingress/master/deploy/operator/deploy.yaml', description: 'Installs HAProxy Ingress.' },
      { title: 'Create Ingress', useCase: 'Route with HAProxy', code: 'kubectl create ingress my-app --rule="app.example.com/*=my-svc:80" --annotation kubernetes.io/ingress.class=haproxy', description: 'Creates Ingress for HAProxy.' }
    ]
  ),

  // TLS
  topic('k8s-ingress-tls', 'TLS', 'intermediate', 10,
    'TLS termination in Ingress enables HTTPS for services. Ingress serves TLS certificates, terminating encryption and forwarding decrypted traffic to backends. Certificate provisioning automated via cert-manager.',
    [
      'TLS termination at Ingress Controller',
      'Certificate stored in kubernetes.io/tls Secret',
      'spec.tls.hosts + secretName per domain',
      'cert-manager automates Let\'s Encrypt certificates'
    ],
    [
      { heading: 'TLS Configuration', text: 'spec.tls: [{ hosts: ["example.com"], secretName: example-tls }]. Secret must be in same namespace. Certificate chain should include intermediates. Multiple TLS entries for different certs per host.' },
      { heading: 'Best Practices', text: 'Use cert-manager for auto-renewal. Minimum TLS 1.2. Restrict cipher suites via controller annotations. HSTS annotation for security headers. HTTP-to-HTTPS redirect (force-ssl-redirect).' }
    ],
    [
      { question: 'How is TLS configured in Ingress?', answer: 'spec.tls with hosts and secretName referencing TLS Secret.' },
      { question: 'What does Ingress controller do with TLS?', answer: 'Terminates TLS, decrypts, forwards plain HTTP to backend.' },
      { question: 'What is cert-manager?', answer: 'Automates certificate issuance and renewal from Let\'s Encrypt, Venafi, etc.' },
      { question: 'Minimum TLS version?', answer: 'TLS 1.2 recommended. Configured via controller flags or annotations.' }
    ],
    [
      { question: 'TLS field in Ingress?', options: ['spec.tls', 'spec.https', 'spec.ssl'], answer: 0 },
      { question: 'TLS Secret type?', options: ['Opaque', 'kubernetes.io/tls', 'tls'], answer: 1 },
      { question: 'cert-manager CRD for cert?', options: ['Certificate', 'CertRequest', 'TLSOrder'], answer: 0 },
      { question: 'Force HTTPS annotation?', options: ['force-ssl-redirect', 'https-only', 'ssl-force'], answer: 0 }
    ],
    [
      { title: 'Create TLS Ingress', useCase: 'Enable HTTPS', code: 'kubectl create ingress secure --rule="example.com/*=web:80,tls=my-tls-cert"', description: 'Creates ingress with TLS.' },
      { title: 'Install cert-manager', useCase: 'Auto certificates', code: 'kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml', description: 'Installs cert-manager.' }
    ]
  ),

  // SSL Certificates
  topic('k8s-ssl-certificates', 'SSL Certificates', 'intermediate', 10,
    'SSL certificate management in Kubernetes involves creation, storage, renewal, and revocation. Use TLS Secrets for storage, cert-manager for automation, and proper certificate chain configuration.',
    [
      'Stored as kubernetes.io/tls Secrets (tls.crt + tls.key)',
      'cert-manager automates Let\'s Encrypt (ACME protocol)',
      'ClusterIssuer for cluster-wide certificate issuers',
      'Certificates auto-renew before expiry (30 days default)'
    ],
    [
      { heading: 'cert-manager Issuers', text: 'Issuer (namespace-scoped) vs ClusterIssuer (cluster-wide). ACME issuers: Let\'s Encrypt (staging/prod), HTTP01 (HTTP challenge), DNS01 (DNS record challenge). Self-signed, CA, Vault issuers also supported.' },
      { heading: 'Certificate Resource', text: 'Certificate CRD: secretName, issuerRef, commonName, dnsNames, duration, renewBefore. cert-manager watches, provisions, stores as TLS Secret, and renews before expiry.' }
    ],
    [
      { question: 'How are SSL certs stored?', answer: 'As kubernetes.io/tls Secrets with tls.crt and tls.key.' },
      { question: 'What automates certificates?', answer: 'cert-manager with Issuer/ClusterIssuer and Certificate CRDs.' },
      { question: 'cert-manager issuer types?', answer: 'ACME (Let\'s Encrypt), CA, SelfSigned, Vault.' },
      { question: 'Renewal window?', answer: '30 days before expiry (renewBefore field in Certificate).' }
    ],
    [
      { question: 'cert-manager CRD for issuer?', options: ['Issuer', 'ClusterIssuer', 'Both'], answer: 2 },
      { question: 'ACME challenge types?', options: ['HTTP01,DNS01', 'TLS01,HTTP01', 'DNS01,TLS01'], answer: 0 },
      { question: 'Certificate field for names?', options: ['dnsNames', 'domains', 'hosts'], answer: 0 },
      { question: 'ClusterIssuer scope?', options: ['Namespace', 'Cluster-wide', 'Region'], answer: 1 }
    ],
    [
      { title: 'Create ClusterIssuer', useCase: 'Let\'s Encrypt prod issuer', code: 'kubectl apply -f cluster-issuer.yaml', description: 'Creates Let\'s Encrypt ClusterIssuer.' },
      { title: 'Create Certificate', useCase: 'Request cert from issuer', code: 'kubectl apply -f certificate.yaml', description: 'Requests and stores TLS Secret.' }
    ]
  ),

  // Host Routing
  topic('k8s-host-routing', 'Host Routing', 'intermediate', 10,
    'Host routing directs traffic based on the HTTP Host header, enabling multiple domains on a single Ingress. Each host can have different backend services and TLS configurations.',
    [
      'Routes traffic by HTTP Host header',
      'Multiple hosts per Ingress, each with different rules',
      'Wildcard hosts: *.example.com',
      'Host precedence: exact match > wildcard > catch-all'
    ],
    [
      { heading: 'Configuration', text: 'spec.rules[].host: "api.example.com". Multiple rules for multiple hosts. Wildcard: "*.example.com" matches all subdomains. Default backend: routes unmatched hosts.' },
      { heading: 'Host Precedence', text: 'Exact host match first (api.example.com). Then wildcard match (*.example.com). Then default backend (catch-all). Rules evaluated in order. Highest specificity wins.' }
    ],
    [
      { question: 'What is host routing?', answer: 'Routing traffic based on HTTP Host header.' },
      { question: 'Host field in Ingress?', answer: 'spec.rules[].host: domain name for routing.' },
      { question: 'Wildcard format?', answer: '*.example.com matches any subdomain.' },
      { question: 'Precedence order?', answer: 'Exact > wildcard > default backend.' }
    ],
    [
      { question: 'Host routing uses?', options: ['URL path', 'HTTP Host header', 'Query parameter'], answer: 1 },
      { question: 'Wildcard prefix?', options: ['*', '?.', 'wild.'], answer: 0 },
      { question: 'Catch-all config?', options: ['defaultBackend', 'catchAll', 'fallback'], answer: 0 },
      { question: 'Precedence winner?', options: ['Exact', 'Wildcard', 'Default'], answer: 0 }
    ],
    [
      { title: 'Multi-host Ingress', useCase: 'Route multiple domains', code: 'kubectl create ingress multi --rule="api.example.com/*=api:80" --rule="www.example.com/*=web:80"', description: 'Routes two hosts to different services.' }
    ]
  ),

  // Path Routing
  topic('k8s-path-routing', 'Path Routing', 'intermediate', 10,
    'Path routing directs traffic based on URL path prefixes or exact matches. Enables splitting a single domain across multiple services: /api/* -> backend, /web/* -> frontend.',
    [
      'Routes by URL path: /api/*, /web/*, /static/*',
      'Path types: Prefix (default), Exact, ImplementationSpecific',
      'Longest matching prefix wins',
      'RewriteTarget annotation for path stripping'
    ],
    [
      { heading: 'Path Types', text: 'Prefix: matches path prefix (/api matches /api, /api/v1, /api/v2). Exact: exact match only (/api only matches /api). ImplementationSpecific: controller-defined.' },
      { heading: 'Path Rewriting', text: 'NGINX: nginx.ingress.kubernetes.io/rewrite-target: / strips prefix. Example: /api/users rewritten to /users. Use capture groups for complex rewrites.' }
    ],
    [
      { question: 'What is path routing?', answer: 'Directing traffic based on URL path.' },
      { question: 'Path types?', answer: 'Prefix (default), Exact, ImplementationSpecific.' },
      { question: 'Path matching precedence?', answer: 'Longest matching prefix wins.' },
      { question: 'Path rewrite annotation?', answer: 'nginx.ingress.kubernetes.io/rewrite-target.' }
    ],
    [
      { question: 'Default path type?', options: ['Exact', 'Prefix', 'ImplementationSpecific'], answer: 1 },
      { question: 'Prefix matches?', options: ['Exact string only', 'Path prefix', 'Regex pattern'], answer: 1 },
      { question: 'Precedence rule?', options: ['First match', 'Longest match', 'Shortest match'], answer: 1 },
      { question: 'Rewrite target strips?', options: ['Domain', 'Path prefix', 'Query params'], answer: 1 }
    ],
    [
      { title: 'Path-based Ingress', useCase: 'Route by path', code: 'kubectl create ingress path-ing --rule="example.com/api/*=api:80" --rule="example.com/web/*=web:80"', description: 'Routes /api to api service, /web to web service.' },
      { title: 'Rewrite Target', useCase: 'Strip path prefix', code: 'kubectl annotate ingress path-ing nginx.ingress.kubernetes.io/rewrite-target=/', description: 'Strips prefix and rewrites to /.' }
    ]
  )
];
