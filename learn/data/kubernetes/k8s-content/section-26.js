var { topic } = require('./helpers');

module.exports = [

  // Internal Load Balancer
  topic('k8s-lb-internal', 'Internal Load Balancer', 'intermediate', 10,
    'An internal load balancer distributes traffic within a VPC or private network, not exposing it to the internet. Used for private microservices, databases, and internal APIs. Cloud providers support internal LBs via annotations.',
    [
      'Private load balancer within VPC (not internet-facing)',
      'AWS: annotation service.beta.kubernetes.io/aws-load-balancer-internal: "true"',
      'Azure: LoadBalancer with internal annotation',
      'GCP: Internal Load Balancer via annotation'
    ],
    [
      { heading: 'Configuration', text: 'AWS: service.beta.kubernetes.io/aws-load-balancer-internal: "true" or "0.0.0.0/0". Internal LB gets private IP from subnet. Azure: LoadBalancer with service.beta.kubernetes.io/azure-load-balancer-internal: "true". GCP: networking.gke.io/load-balancer-type: "Internal".' },
      { heading: 'Use Cases', text: 'Internal microservice communication across separate namespaces. Database access from other services. API gateway for internal services. Service-to-service communication requiring stable internal IP.' }
    ],
    [
      { question: 'What is internal LB?', answer: 'Private load balancer within VPC, not internet-facing.' },
      { question: 'AWS annotation?', answer: 'service.beta.kubernetes.io/aws-load-balancer-internal: "true"' },
      { question: 'Use case?', answer: 'Internal microservices, databases, private APIs.' },
      { question: 'Internal LB gets?', answer: 'Private IP from subnet, not public IP.' }
    ],
    [
      { question: 'Internal LB is?', options: ['Internet-facing', 'VPC-private', 'Both'], answer: 1 },
      { question: 'AWS internal LB annotation?', options: ['internal-lb', 'load-balancer-internal', 'aws-load-balancer-internal'], answer: 2 },
      { question: 'GCP internal LB?', options: ['load-balancer-type: Internal', 'internal: true', 'private: true'], answer: 0 },
      { question: 'Internal LB exposes?', options: ['Public IP', 'Private IP', 'Both'], answer: 1 }
    ],
    [
      { title: 'Create Internal LB', useCase: 'Private load balancer', code: 'kubectl annotate service my-svc service.beta.kubernetes.io/aws-load-balancer-internal="true"', description: 'Makes LB internal.' },
      { title: 'Create Internal LB on Azure', useCase: 'Azure private LB', code: 'kubectl annotate service my-svc service.beta.kubernetes.io/azure-load-balancer-internal="true"', description: 'Makes Azure LB internal.' }
    ]
  ),

  // External Load Balancer
  topic('k8s-lb-external', 'External Load Balancer', 'intermediate', 10,
    'External load balancer exposes Services to the internet via cloud provider LB. It provisions a public IP and distributes external traffic across cluster nodes. Standard for production services that need external access.',
    [
      'Exposes Service to the internet with public IP',
      'Cloud provider provisions and manages the LB',
      'Built on top of NodePort + ClusterIP',
      'ExternalTrafficPolicy: Cluster or Local'
    ],
    [
      { heading: 'How It Works', text: 'Service type=LoadBalancer triggers cloud controller to provision LB. Health checks: cloud provider checks NodePort on each node. If healthy, traffic routed to node. kube-proxy then routes to Pod. ExternalTrafficPolicy=Cluster (default) routes to any Pod. Local routes only to same-node Pods.' },
      { heading: 'Limitations', text: 'One LB per Service (cost). L4 only (TCP/UDP). No HTTP routing, path splitting, or TLS termination. For L7 features, use Ingress. AWS NLB is faster than Classic ELB but also L4.' }
    ],
    [
      { question: 'What is external LB?', answer: 'Cloud-provisioned load balancer with public IP for external access.' },
      { question: 'How is it built?', answer: 'On NodePort + ClusterIP. Cloud controller provisions LB.' },
      { question: 'ExternalTrafficPolicy=Local?', answer: 'Routes to same-node Pods, preserves source IP.' },
      { question: 'When to use Ingress instead?', answer: 'For L7 routing, TLS termination, path/host splitting.' }
    ],
    [
      { question: 'External LB is?', options: ['L4 (TCP/UDP)', 'L7 (HTTP)', 'Both'], answer: 0 },
      { question: 'External LB cost?', options: ['Free', 'One per Service', 'Shared'], answer: 1 },
      { question: 'Preserves source IP?', options: ['Always', 'Only with Local policy', 'Never'], answer: 1 },
      { question: 'AWS NLB is?', options: ['L4', 'L7', 'L3'], answer: 0 }
    ],
    [
      { title: 'Create External LB', useCase: 'Expose to internet', code: 'kubectl expose deployment web --type=LoadBalancer --port=80 --target-port=8080', description: 'Creates cloud LB.' },
      { title: 'Get LB Hostname', useCase: 'Find external endpoint', code: 'kubectl get svc web -o jsonpath="{.status.loadBalancer.ingress[0].hostname}"', description: 'Returns LB DNS name.' }
    ]
  ),

  // Layer 4 Load Balancer
  topic('k8s-lb-layer4', 'Layer 4 Load Balancer', 'intermediate', 10,
    'Layer 4 load balancing operates at the transport layer (TCP/UDP). It forwards traffic based on IP and port, without inspecting HTTP headers. Used for databases, message queues, and any non-HTTP protocol.',
    [
      'Operates at TCP/UDP transport layer',
      'Forwards based on IP:port, no HTTP inspection',
      'Used for: MySQL, Redis, Kafka, gRPC, WebSockets',
      'Lower latency than L7 but less intelligent routing'
    ],
    [
      { heading: 'L4 vs L7', text: 'L4: TCP/UDP forwarding, no header inspection, lower latency, works with any protocol. L7: HTTP/HTTPS aware, header routing, TLS termination, higher latency, HTTP-only.' },
      { heading: 'Kubernetes L4 Options', text: 'Service type LoadBalancer (cloud LB, L4). NodePort (L4). kube-proxy (iptables/IPVS, L4 forwarding). HAProxy Ingress (L4 + L7). NGINX Ingress (primarily L7 with L4 via TCP configmap).' }
    ],
    [
      { question: 'What is L4 load balancing?', answer: 'TCP/UDP transport layer forwarding based on IP:port.' },
      { question: 'L4 vs L7?', answer: 'L4: any protocol, lower latency. L7: HTTP-aware, TLS, path routing.' },
      { question: 'Use cases?', answer: 'MySQL, Redis, Kafka, gRPC, WebSockets.' },
      { question: 'Kubernetes L4 options?', answer: 'LoadBalancer Service, NodePort, kube-proxy.' }
    ],
    [
      { question: 'L4 operates at?', options: ['Application (L7)', 'Transport (L4)', 'Network (L3)'], answer: 1 },
      { question: 'L4 forwarding based on?', options: ['HTTP headers', 'IP + port', 'URL path'], answer: 1 },
      { question: 'L4 works with?', options: ['HTTP only', 'Any TCP/UDP protocol', 'HTTP + WebSocket'], answer: 1 },
      { question: 'L4 latency?', options: ['Higher than L7', 'Lower than L7', 'Same'], answer: 1 }
    ],
    [
      { title: 'Create L4 Service', useCase: 'TCP load balancer', code: 'kubectl expose deployment mysql --type=LoadBalancer --port=3306', description: 'Creates L4 LB for MySQL.' },
      { title: 'NodePort L4', useCase: 'Simple TCP access', code: 'kubectl expose deployment redis --type=NodePort --port=6379', description: 'Creates NodePort for Redis.' }
    ]
  ),

  // Layer 7 Load Balancer
  topic('k8s-lb-layer7', 'Layer 7 Load Balancer', 'intermediate', 10,
    'Layer 7 load balancing operates at the application layer (HTTP/HTTPS). It inspects headers, paths, cookies, and other HTTP attributes. Ingress controllers provide L7 routing in Kubernetes.',
    [
      'Operates at HTTP/HTTPS application layer',
      'Routes based on host, path, headers, cookies, methods',
      'Features: TLS termination, path rewriting, rate limiting',
      'Implemented via Ingress controllers (NGINX, Traefik, HAProxy)'
    ],
    [
      { heading: 'L7 Features', text: 'Content-based routing: by host (api.example.com vs web.example.com), path (/api/* vs /web/*), headers (X-Region: us-east), cookies (session affinity). TLS termination, HTTP-to-HTTPS redirect, path rewriting, authentication (basic, OAuth, JWT), rate limiting, WAF integration.' },
      { heading: 'Ingress vs Service', text: 'Ingress (L7): one external endpoint for many services, host/path routing, TLS, rich features. LoadBalancer Service (L4): one external endpoint per service, basic TCP/UDP, no routing features. Ingress is more cost-effective and feature-rich for HTTP workloads.' }
    ],
    [
      { question: 'What is L7 load balancing?', answer: 'HTTP/HTTPS application layer routing based on headers, paths, cookies.' },
      { question: 'Implemented by?', answer: 'Ingress controllers (NGINX, Traefik, HAProxy).' },
      { question: 'L7 features?', answer: 'Host/path routing, TLS termination, rewriting, auth, rate limiting.' },
      { question: 'Ingress vs LoadBalancer?', answer: 'Ingress: one LB for many services, L7. LoadBalancer: one LB per service, L4.' }
    ],
    [
      { question: 'L7 operates at?', options: ['Application (L7)', 'Transport (L4)', 'Network (L3)'], answer: 0 },
      { question: 'L7 routes on?', options: ['IP:port', 'HTTP headers/path', 'TCP flags'], answer: 1 },
      { question: 'L7 cost vs multiple LBs?', options: ['More expensive', 'Less expensive (one endpoint)', 'Same'], answer: 1 },
      { question: 'L7 works with?', options: ['Any protocol', 'HTTP/HTTPS only', 'TCP only'], answer: 1 }
    ],
    [
      { title: 'Create L7 Ingress', useCase: 'Path-based routing', code: 'kubectl create ingress my-app --rule="example.com/api/*=api:80" --rule="example.com/web/*=web:80"', description: 'L7 routing with Ingress.' },
      { title: 'TLS Termination', useCase: 'HTTPS ingress', code: 'kubectl create ingress secure --rule="example.com/*=web:80,tls=my-tls"', description: 'L7 with TLS termination.' }
    ]
  ),

  // Round Robin
  topic('k8s-lb-round-robin', 'Round Robin', 'beginner', 5,
    'Round Robin is the default load balancing algorithm in Kubernetes (via kube-proxy iptables). Each new connection is randomly routed to one of the available Pod backends with equal probability.',
    [
      'Default algorithm in kube-proxy iptables mode',
      'Each connection randomly forwarded to Pod backend',
      'IPVS mode supports rr (round robin), lc, dh, sh, sed, nq',
      'Equal distribution over time but not per-request'
    ],
    [
      { heading: 'kube-proxy Modes', text: 'iptables (default): random selection from healthy endpoints. IPVS: rr (round robin), lc (least connection), dh (destination hashing), sh (source hashing), sed (shortest expected delay), nq (never queue). IPVS provides more algorithms and better performance at scale.' },
      { heading: 'Limitations', text: 'iptables round robin is random at the connection level, not per-packet. Uneven distribution possible with short-lived connections. IPVS rr provides true round robin. SessionAffinity overrides round robin for stickiness.' }
    ],
    [
      { question: 'Default K8s LB algorithm?', answer: 'Random distribution via iptables (connection-level).' },
      { question: 'IPVS round robin?', answer: 'True round robin distribution between backends.' },
      { question: 'Does iptables provide perfect round robin?', answer: 'No — random selection, can be uneven with short connections.' },
      { question: 'SessionAffinity?', answer: 'Overrides default algorithm for client stickiness.' }
    ],
    [
      { question: 'Default kube-proxy mode?', options: ['iptables (random)', 'IPVS (rr)', 'userspace'], answer: 0 },
      { question: 'IPVS not a supported algorithm?', options: ['rr', 'lc', 'wrr', 'wlc'], answer: 2 },
      { question: 'SessionAffinity uses?', options: ['Cookie', 'ClientIP', 'Header'], answer: 1 },
      { question: 'iptables distribution?', options: ['Perfect round robin', 'Random', 'Least connections'], answer: 1 }
    ],
    [
      { title: 'Check kube-proxy Mode', useCase: 'View proxy algorithm', code: 'kubectl get configmap kube-proxy -n kube-system -o yaml | grep -A 2 mode', description: 'Shows iptables or IPVS mode.' },
      { title: 'Create Session Affinity', useCase: 'Sticky sessions', code: 'kubectl patch svc my-svc -p \'{"spec":{"sessionAffinity":"ClientIP"}}\'', description: 'Enables sticky sessions.' }
    ]
  ),

  // Least Connections
  topic('k8s-lb-least-connections', 'Least Connections', 'intermediate', 5,
    'Least Connections routing sends new connections to the Pod with the fewest active connections. Helps balance load when request processing times vary. Available with IPVS mode (lc algorithm).',
    [
      'Sends new connections to Pod with fewest active connections',
      'IPVS mode: lc (least connection) algorithm',
      'Better for variable-length requests',
      'Not available in iptables mode (random only)'
    ],
    [
      { heading: 'When to Use', text: 'Variable processing times: some requests take 1ms, others 1s. Round robin would overload the Pod that gets the slow request. Least connections ensures each Pod has a fair share of concurrent work.' },
      { heading: 'IPVS Algorithms', text: 'lc: least connection (fewest active). wlc: weighted least connection (consider server weight). sed: shortest expected delay. nq: never queue (fastest first). dh/sed/nq available only in IPVS mode.' }
    ],
    [
      { question: 'What is least connections?', answer: 'Routes to Pod with fewest active connections.' },
      { question: 'When to use?', answer: 'Variable request processing times.' },
      { question: 'Available in which mode?', answer: 'IPVS mode only (not iptables).' },
      { question: 'IPVS algorithm code?', answer: 'lc (least connection).' }
    ],
    [
      { question: 'Least connections uses?', options: ['iptables', 'IPVS (lc)', 'Userspace'], answer: 1 },
      { question: 'Best for?', options: ['Uniform requests', 'Variable-length requests', 'Static content'], answer: 1 },
      { question: 'wlc adds?', options: ['Hashing', 'Weighted consideration', 'Timeout'], answer: 1 },
      { question: 'sed algorithm?', options: ['Shortest expected delay', 'Source hash', 'Destination hash'], answer: 0 }
    ]
  ),

  // Sticky Sessions
  topic('k8s-lb-sticky-sessions', 'Sticky Sessions', 'intermediate', 10,
    'Sticky sessions (session affinity) ensure all requests from a client go to the same backend Pod. Configured via Service spec.sessionAffinity: ClientIP. For HTTP cookie-based affinity, use Ingress annotations.',
    [
      'ClientIP affinity: same client IP -> same Pod',
      'Configured via sessionAffinity: ClientIP on Service',
      'sessionAffinityConfig: timeoutSeconds (default 10800 = 3 hours)',
      'Ingress: cookie-based affinity via annotations'
    ],
    [
      { heading: 'Service-Level Affinity', text: 'sessionAffinity: ClientIP — all requests from same source IP forwarded to same Pod. sessionAffinityConfig.clientIP.timeoutSeconds: timeout for affinity (default 3 hours). Limitations: behind NAT, all users appear as same IP.' },
      { heading: 'Ingress-Level Affinity', text: 'NGINX: nginx.ingress.kubernetes.io/affinity: cookie. Creates a cookie (_affinity) that maps client to backend. Backend changes on Pod deletion or scaling. Traefik: stickiness through TraefikService with sticky sessions.' }
    ],
    [
      { question: 'What are sticky sessions?', answer: 'All client requests go to the same backend Pod.' },
      { question: 'Service-level affinity?', answer: 'sessionAffinity: ClientIP with configurable timeout.' },
      { question: 'NAT limitation?', answer: 'All users behind same NAT appear as same IP.' },
      { question: 'Ingress cookie affinity?', answer: 'nginx.ingress.kubernetes.io/affinity: cookie annotation.' }
    ],
    [
      { question: 'Service sessionAffinity options?', options: ['ClientIP, NodeIP', 'ClientIP, None', 'Cookie, ClientIP'], answer: 1 },
      { question: 'Default timeout?', options: ['1 hour', '3 hours (10800s)', '24 hours'], answer: 1 },
      { question: 'NAT issue?', options: ['Not a problem', 'All users seen as same IP', 'Better affinity'], answer: 1 },
      { question: 'Ingress affinity type?', options: ['ClientIP', 'Cookie', 'Header'], answer: 1 }
    ],
    [
      { title: 'Enable Session Affinity', useCase: 'Sticky Service', code: 'kubectl patch svc my-svc -p \'{"spec":{"sessionAffinity":"ClientIP"}}\'', description: 'Enables client IP affinity.' },
      { title: 'Set Timeout', useCase: 'Custom timeout', code: 'kubectl patch svc my-svc -p \'{"spec":{"sessionAffinityConfig":{"clientIP":{"timeoutSeconds":3600}}}}\'', description: 'Sets 1-hour timeout.' },
      { title: 'Ingress Cookie Affinity', useCase: 'Cookie-based stickiness', code: 'kubectl annotate ingress my-ingress nginx.ingress.kubernetes.io/affinity=cookie', description: 'Enables cookie-based affinity.' }
    ]
  ),

  // Health Checks
  topic('k8s-lb-health-checks', 'Health Checks', 'intermediate', 10,
    'Health checks ensure traffic is only sent to healthy Pods. Kubernetes uses readiness probes (for traffic routing) and liveness probes (for container restart). Cloud LBs use their own health checks against NodePort.',
    [
      'Readiness probe: controls Service traffic routing',
      'Liveness probe: controls container restart',
      'Cloud LB health checks against NodePort',
      'Readiness = traffic, Liveness = restart'
    ],
    [
      { heading: 'Kubernetes Probes', text: 'Readiness: if fails, Pod removed from Service endpoints. Liveness: if fails, container restart. Startup: delays liveness/readiness for slow-starting containers. Probe types: HTTP GET, TCP, gRPC, Exec (command).' },
      { heading: 'Cloud LB Health Checks', text: 'Cloud LB checks NodePort on each node. If node fails health check, removed from LB pool. AWS: ELB health check on NodePort path. GCP: health check on NodePort. ExternalTrafficPolicy=Local: health check reflects Pod health (not just node).' }
    ],
    [
      { question: 'Kubernetes health checks?', answer: 'Readiness probe (traffic routing), liveness probe (restart).' },
      { question: 'Readiness fails -> ?', answer: 'Pod removed from Service endpoints, no traffic routed.' },
      { question: 'Liveness fails -> ?', answer: 'Container restarted by kubelet.' },
      { question: 'Cloud LB health check?', answer: 'Checks NodePort on each node; unhealthy nodes removed.' }
    ],
    [
      { question: 'Readiness controls?', options: ['Restart', 'Traffic routing', 'Image pull'], answer: 1 },
      { question: 'Liveness controls?', options: ['Traffic', 'Restart', 'Scheduling'], answer: 1 },
      { question: 'Probe types?', options: ['HTTP, TCP, Exec', 'HTTP, ICMP, DNS', 'TCP, UDP, HTTP'], answer: 0 },
      { question: 'Startup probe for?', options: ['Slow containers', 'Fast containers', 'Batch jobs'], answer: 0 }
    ],
    [
      { title: 'Add Readiness Probe', useCase: 'Health-based routing', code: 'kubectl set probe deployment/web --readiness --get-url=http://:8080/healthz', description: 'Adds HTTP readiness probe.' },
      { title: 'Add Liveness Probe', useCase: 'Auto-restart on failure', code: 'kubectl set probe deployment/web --liveness --get-url=http://:8080/healthz', description: 'Adds HTTP liveness probe.' },
      { title: 'Check Probe Status', useCase: 'View probe results', code: 'kubectl describe pod web-pod | grep -A 5 -i "readiness|liveness"', description: 'Shows probe configuration and status.' }
    ]
  )
];
