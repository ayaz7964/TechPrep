var { topic } = require('./helpers');

module.exports = [

  // ClusterIP
  topic('k8s-clusterip', 'ClusterIP', 'beginner', 10,
    'ClusterIP is the default Service type, providing an internal virtual IP reachable within the cluster. Ideal for microservice communication. Traffic distributed to Pod backends via kube-proxy (iptables or IPVS). DNS: service.namespace.svc.cluster.local.',
    [
      'Default Service type — internal virtual IP only',
      'Stable IP for Pod-to-Pod communication',
      'DNS: <service>.<namespace>.svc.cluster.local',
      'Not accessible from outside the cluster'
    ],
    [
      { heading: 'VIP Implementation', text: 'kube-proxy watches Services and EndpointSlices. Modes: iptables (default, random selection), IPVS (faster, more algorithms), userspace (legacy). ClusterIP range set by --service-cluster-ip-range on kube-apiserver.' },
      { heading: 'DNS Resolution', text: 'CoreDNS resolves service.namespace.svc.cluster.local to ClusterIP. Same-namespace: just service name works. Headless Services (clusterIP: None) return Pod IPs instead of VIP.' }
    ],
    [
      { question: 'What is ClusterIP?', answer: 'Default Service type with internal virtual IP for cluster-internal access.' },
      { question: 'How is ClusterIP implemented?', answer: 'kube-proxy with iptables (default) or IPVS.' },
      { question: 'Can ClusterIP be accessed externally?', answer: 'No. Use NodePort, LoadBalancer, or Ingress.' },
      { question: 'Cross-namespace DNS?', answer: '<service>.<namespace>.svc.cluster.local' }
    ],
    [
      { question: 'Default Service type?', options: ['NodePort', 'ClusterIP', 'LoadBalancer'], answer: 1 },
      { question: 'ClusterIP accessible from?', options: ['Outside cluster', 'Inside cluster only', 'Anywhere'], answer: 1 },
      { question: 'kube-proxy default mode?', options: ['IPVS', 'iptables', 'userspace'], answer: 1 },
      { question: 'ClusterIP range configured on?', options: ['kubelet', 'kube-apiserver', 'kube-controller-manager'], answer: 1 }
    ],
    [
      { title: 'Create ClusterIP Service', useCase: 'Expose deployment internally', code: 'kubectl expose deployment web --port=80 --target-port=8080', description: 'Creates ClusterIP Service.' },
      { title: 'Access via DNS', useCase: 'Test DNS resolution', code: 'kubectl run test --image=busybox --rm -it -- nslookup web-service', description: 'Resolves Service DNS.' },
      { title: 'List Services', useCase: 'View cluster services', code: 'kubectl get services', description: 'Shows ClusterIP, ports, endpoints.' }
    ]
  ),

  // NodePort
  topic('k8s-nodeport', 'NodePort', 'beginner', 10,
    'NodePort exposes a Service on a static port (30000-32767) on every Node IP. A ClusterIP is created automatically. Suitable for dev/demos. Not recommended for production — use LoadBalancer or Ingress.',
    [
      'Static port on every Node IP (30000-32767)',
      'ClusterIP created automatically',
      'trafficPolicy: Cluster (any Pod, SNAT) or Local (same node, preserve source IP)',
      'Not recommended for production'
    ],
    [
      { heading: 'Traffic Flow', text: 'External -> NodeIP:NodePort -> kube-proxy iptables -> ClusterIP -> Pod. trafficPolicy: Cluster (default, routes to any Pod, may SNAT) vs Local (routes only to local Pods, preserves source IP). Local may cause uneven load.' },
      { heading: 'Security', text: 'Nodes must be reachable externally (security groups). Consider port scanning risk. Use Ingress Controller + NodePort or LoadBalancer for production.' }
    ],
    [
      { question: 'What is NodePort?', answer: 'Exposes Service on static port (30000-32767) on every Node IP.' },
      { question: 'Default NodePort range?', answer: '30000-32767.' },
      { question: 'Created automatically with NodePort?', answer: 'A ClusterIP Service for internal routing.' },
      { question: 'trafficPolicy Local vs Cluster?', answer: 'Local: routes to same-node Pods, preserves source IP. Cluster: routes to any Pod.' }
    ],
    [
      { question: 'NodePort range?', options: ['1024-65535', '30000-32767', '80-443'], answer: 1 },
      { question: 'NodePort creates?', options: ['Only NodePort', 'ClusterIP + NodePort', 'Only ClusterIP'], answer: 1 },
      { question: 'Local trafficPolicy preserves?', options: ['Destination IP', 'Source IP', 'Neither'], answer: 1 },
      { question: 'NodePort for production?', options: ['Recommended', 'Not recommended', 'Only option'], answer: 1 }
    ],
    [
      { title: 'Create NodePort', useCase: 'External access', code: 'kubectl expose deployment web --type=NodePort --port=80', description: 'Creates NodePort Service.' },
      { title: 'Get NodePort Number', useCase: 'Find assigned port', code: 'kubectl get svc web -o jsonpath="{.spec.ports[0].nodePort}"', description: 'Returns the NodePort number.' },
      { title: 'Access Service', useCase: 'Test external access', code: 'curl http://<node-ip>:<node-port>', description: 'Accesses service via node and port.' }
    ]
  ),

  // LoadBalancer
  topic('k8s-loadbalancer', 'LoadBalancer', 'intermediate', 10,
    'LoadBalancer provisions a cloud load balancer (AWS ELB, Azure LB, GCP TCP LB) with a public IP. Built on NodePort + ClusterIP. Standard for production HTTP/S services, though Ingress is preferred for L7 routing.',
    [
      'Provisions cloud provider load balancer with public IP',
      'Built on NodePort + ClusterIP underneath',
      'Each Service gets its own LB (cost consideration)',
      'Supports internal LB via annotations'
    ],
    [
      { heading: 'Cloud Integration', text: 'cloud-controller-manager provisions LB via cloud API. Annotations: service.beta.kubernetes.io/aws-load-balancer-type (nlb, alb), internal (internal LB). Health check: LB targets nodes; NodePort Service responds.' },
      { heading: 'Limitations', text: 'One LB per Service (costly with many services). No HTTP routing (L4). Use Ingress for L7 + TLS. ExternalTrafficPolicy: Local preserves client IP but may cause imbalanced distribution.' }
    ],
    [
      { question: 'What is LoadBalancer?', answer: 'Provisions cloud LB with public IP for external access.' },
      { question: 'How is it built?', answer: 'On NodePort + ClusterIP. Cloud controller provisions the LB.' },
      { question: 'When LoadBalancer vs Ingress?', answer: 'LoadBalancer for L4 (non-HTTP). Ingress for L7 with routing and TLS.' },
      { question: 'Why careful with many LBs?', answer: 'Each Service gets its own cloud LB, which is costly.' }
    ],
    [
      { question: 'LoadBalancer is L?', options: ['L4 (Transport)', 'L7 (Application)', 'L3 (Network)'], answer: 0 },
      { question: 'Cloud controller provisions?', options: ['Ingress controller', 'Load balancer', 'DNS records'], answer: 1 },
      { question: 'Annotation for AWS NLB?', options: ['nlb-type', 'aws-load-balancer-type', 'elb-type'], answer: 1 },
      { question: 'Cost implication?', options: ['Free', 'One LB per Service', 'Shared LB'], answer: 1 }
    ],
    [
      { title: 'Create LoadBalancer', useCase: 'Expose to internet', code: 'kubectl expose deployment web --type=LoadBalancer --port=80', description: 'Creates cloud LB.' },
      { title: 'Get External IP', useCase: 'Find public endpoint', code: 'kubectl get svc web -o wide', description: 'Shows EXTERNAL-IP.' },
      { title: 'Internal LB', useCase: 'Private load balancer', code: 'kubectl annotate svc web service.beta.kubernetes.io/aws-load-balancer-internal="true"', description: 'Makes LB internal.' }
    ]
  ),

  // ExternalName
  topic('k8s-externalname', 'ExternalName', 'intermediate', 10,
    'ExternalName maps a Service to an external DNS CNAME instead of Pods. No ClusterIP, no selector, no proxying — just a DNS record. Useful for abstracting external dependencies (databases, APIs) behind consistent internal names.',
    [
      'Maps Service name to an external DNS CNAME',
      'No ClusterIP, no Pod selector, no proxying',
      'Provides abstraction for external dependencies',
      'Useful for migrating from external to internal services'
    ],
    [
      { heading: 'How It Works', text: 'spec.type: ExternalName, spec.externalName: <external-dns>. CoreDNS returns CNAME pointing to external DNS. No kube-proxy rules created. Clients resolve Service DNS and get redirected to external service.' },
      { heading: 'Use Cases', text: 'Transition from external DB (RDS) to internal (StatefulSet) — same Service name, change type. External API abstraction. Multi-cloud: abstract cloud-specific endpoints behind ExternalName.' }
    ],
    [
      { question: 'What is ExternalName?', answer: 'DNS CNAME alias for external services, no proxy or ClusterIP.' },
      { question: 'Does ExternalName have a ClusterIP?', answer: 'No. Returns CNAME instead.' },
      { question: 'Use case?', answer: 'Abstract external dependencies behind a consistent Service name.' },
      { question: 'Switch to internal?', answer: 'Change type from ExternalName to ClusterIP and add selector.' }
    ],
    [
      { question: 'ExternalName returns?', options: ['ClusterIP', 'CNAME', 'Pod IPs'], answer: 1 },
      { question: 'ExternalName has?', options: ['Labels', 'Selector', 'ClusterIP', 'None of these'], answer: 3 },
      { question: 'ExternalName field?', options: ['externalDNS', 'externalName', 'cname'], answer: 1 },
      { question: 'ExternalName is for?', options: ['Internal routing', 'External service alias', 'Load balancing'], answer: 1 }
    ],
    [
      { title: 'Create ExternalName', useCase: 'Alias external DB', code: 'kubectl apply -f externalname-svc.yaml', description: 'Maps my-db to RDS endpoint.' },
      { title: 'Test ExternalName', useCase: 'Verify DNS', code: 'kubectl run test --image=busybox --rm -it -- nslookup my-db', description: 'Resolves to external CNAME.' },
      { title: 'Update Target', useCase: 'Change endpoint', code: 'kubectl patch svc my-db -p \'{"spec":{"externalName":"new-db.example.com"}}\'', description: 'Points to new external endpoint.' }
    ]
  ),

  // Headless Service
  topic('k8s-headless-service', 'Headless Service', 'intermediate', 15,
    'A Headless Service (clusterIP: None) returns all ready Pod IPs via DNS instead of a single VIP. Required by StatefulSets for stable network identities. Pod DNS: pod-name.service.namespace.svc.cluster.local.',
    [
      'clusterIP: None — no VIP, no load balancing',
      'DNS returns A records for all ready Pod IPs',
      'Required by StatefulSet for stable identities',
      'SRV records provide port, protocol, hostname'
    ],
    [
      { heading: 'DNS Records', text: 'Standard: DNS returns single ClusterIP. Headless (with selector): returns all ready Pod IPs. Headless (no selector): returns ExternalName or custom endpoints. SRV: _<port>._<proto>.<svc>.<ns>.svc.cluster.local' },
      { heading: 'StatefulSet Integration', text: 'StatefulSet requires Headless Service with same name as serviceName field. Each Pod gets DNS: pod-name.service-name.ns.svc.cluster.local. Ordinal names enable individual Pod addressing (e.g., Cassandra seed nodes).' }
    ],
    [
      { question: 'What is Headless Service?', answer: 'No ClusterIP (clusterIP: None). DNS returns Pod IPs directly.' },
      { question: 'Required by?', answer: 'StatefulSets for stable Pod identities.' },
      { question: 'DNS vs ClusterIP?', answer: 'ClusterIP: one IP. Headless: all ready Pod IPs.' },
      { question: 'SRV records?', answer: 'Yes, provide port, protocol, hostname for each Pod.' }
    ],
    [
      { question: 'Headless uses?', options: ['clusterIP: None', 'clusterIP: ""', 'clusterIP: 0.0.0.0'], answer: 0 },
      { question: 'StatefulSet requires?', options: ['ClusterIP', 'Headless Service', 'LoadBalancer'], answer: 1 },
      { question: 'Headless DNS returns?', options: ['Virtual IP', 'All Pod IPs', 'Service IP'], answer: 1 },
      { question: 'SRV records provide?', options: ['Port + hostname', 'IP + port', 'Pod name'], answer: 0 }
    ],
    [
      { title: 'Create Headless Service', useCase: 'Direct Pod access', code: 'kubectl apply -f headless-svc.yaml', description: 'Creates clusterIP: None Service.' },
      { title: 'Query DNS', useCase: 'List Pod IPs', code: 'kubectl run test --image=busybox --rm -it -- nslookup <service>', description: 'Returns all Pod IPs.' },
      { title: 'Pod DNS', useCase: 'Individual Pod address', code: 'kubectl run test --image=busybox --rm -it -- nslookup my-pod-0.web-svc', description: 'Resolves specific Pod.' }
    ]
  ),

  // Service Discovery
  topic('k8s-service-discovery', 'Service Discovery', 'intermediate', 15,
    'Service Discovery enables applications to find and connect to services. CoreDNS provides DNS-based discovery by default. Environment variables provide legacy discovery. Headless Services enable Pod-level discovery for stateful workloads.',
    [
      'CoreDNS resolves service.namespace.svc.cluster.local',
      'Env vars: <NAME>_SERVICE_HOST and <NAME>_SERVICE_PORT',
      'Headless: DNS returns all Pod IPs for direct access',
      'Env vars only include Services existing at Pod start time'
    ],
    [
      { heading: 'DNS Resolution', text: 'CoreDNS resolves <svc>.<ns>.svc.cluster.local. Pod /etc/resolv.conf includes search domains (ns.svc.cluster.local, svc.cluster.local, cluster.local). Just <svc> works in same namespace.' },
      { heading: 'Environment Variables', text: 'kubelet injects env vars for each Service at Pod start: <NAME>_SERVICE_HOST (IP), <NAME>_SERVICE_PORT (port). Underscored, uppercase, sanitized. Limitation: only Services existing at Pod start.' }
    ],
    [
      { question: 'Kubernetes service discovery?', answer: 'CoreDNS resolves <service>.<ns>.svc.cluster.local. Env vars also injected.' },
      { question: 'Default DNS pod?', answer: 'CoreDNS in kube-system namespace.' },
      { question: 'Env var limitation?', answer: 'Only services existing at Pod start time. Not updated dynamically.' },
      { question: 'Cross-namespace discovery?', answer: '<service>.<namespace>.svc.cluster.local' }
    ],
    [
      { question: 'Kubernetes default DNS?', options: ['kube-dns', 'CoreDNS', 'Unbound'], answer: 1 },
      { question: 'Env vars injected?', options: ['At Pod start only', 'Continuously', 'On request'], answer: 0 },
      { question: 'Same-namespace DNS?', options: ['<svc> only', '<svc>.<ns>', 'Full FQDN'], answer: 0 },
      { question: 'Cross-namespace DNS?', options: ['<svc>', '<svc>.<ns>', '<svc>.<ns>.svc'], answer: 1 }
    ],
    [
      { title: 'Check DNS Resolution', useCase: 'Verify service discovery', code: 'kubectl run test --image=busybox --rm -it -- nslookup kubernetes', description: 'Resolves kubernetes service.' },
      { title: 'View Pod Env Vars', useCase: 'Inspect injected vars', code: 'kubectl exec <pod> -- env | grep -i service', description: 'Shows SERVICE_HOST and SERVICE_PORT.' },
      { title: 'Test Cross-namespace', useCase: 'Access service in other ns', code: 'kubectl run test --image=busybox --rm -it -- wget -qO- http://<svc>.<ns>.svc.cluster.local', description: 'Cross-namespace access.' }
    ]
  )
];
