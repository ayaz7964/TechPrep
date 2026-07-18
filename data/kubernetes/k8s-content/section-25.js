var { topic } = require('./helpers');

module.exports = [

  // Cluster Networking
  topic('k8s-cluster-networking', 'Cluster Networking', 'intermediate', 15,
    'Cluster networking connects all Pods, Services, and Nodes. Every Pod gets a unique IP and can communicate with any other Pod without NAT. Fundamental requirements: all Pods can communicate with all other Pods, all Nodes can communicate with all Pods (and vice versa), no NAT.',
    [
      'Every Pod has a unique IP, all Pods communicate without NAT',
      'CNI plugin implements the network (Calico, Flannel, Cilium)',
      'kube-proxy handles Service-to-Pod routing',
      'CoreDNS provides service discovery'
    ],
    [
      { heading: 'Kubernetes Networking Model', text: 'Pods on same node: communicate via cbr0 bridge (CNI creates virtual ethernet pairs). Pods on different nodes: traffic routed between nodes via CNI overlay (VXLAN, IPIP) or BGP. Service traffic: kube-proxy translates ClusterIP:Port to Pod IP iptables rules.' },
      { heading: 'Network Requirements', text: 'All nodes must have a route to every Pod IP (CNI handles this). No port mapping needed on hosts. Pod-to-Pod communication is direct IP. Node-to-Pod is direct. Services provide stable virtual IPs. Network Policies allow firewall rules.' }
    ],
    [
      { question: 'Kubernetes networking model?', answer: 'Every Pod gets unique IP, all can communicate without NAT.' },
      { question: 'CNI role?', answer: 'Implements Pod networking: IP allocation, routing between nodes.' },
      { question: 'kube-proxy role?', answer: 'Implements Service ClusterIP routing via iptables/IPVS.' },
      { question: 'CoreDNS role?', answer: 'Service discovery — resolves service names to ClusterIPs.' }
    ],
    [
      { question: 'Pod IP scope?', options: ['Node-local', 'Cluster-wide unique', 'Host-only'], answer: 1 },
      { question: 'CNI is?', options: ['Optional', 'Required for Pod networking', 'Only for cloud'], answer: 1 },
      { question: 'Service routing implemented by?', options: ['CNI', 'kube-proxy', 'CoreDNS'], answer: 1 },
      { question: 'NAT Pod-to-Pod?', options: ['Required', 'No NAT', 'Optional'], answer: 1 }
    ],
    [
      { title: 'Check Pod Networking', useCase: 'Verify Pod IPs', code: 'kubectl get pods -o wide', description: 'Shows Pod IPs and nodes.' },
      { title: 'Test Pod Connectivity', useCase: 'Verify cross-node', code: 'kubectl exec pod-a -- ping <pod-b-ip>', description: 'Tests Pod-to-Pod connectivity.' },
      { title: 'Check kube-proxy Mode', useCase: 'View proxy mode', code: 'kubectl get configmap kube-proxy -n kube-system -o yaml | grep mode', description: 'Shows iptables or IPVS mode.' }
    ]
  ),

  // DNS
  topic('k8s-dns', 'DNS', 'intermediate', 10,
    'DNS in Kubernetes provides service discovery through CoreDNS. Pods get A/AAAA records for Services, SRV records for named ports, and reverse DNS lookup. Pod DNS: <pod-ip>.<namespace>.pod.cluster.local.',
    [
      'CoreDNS (replaces kube-dns) provides DNS-based service discovery',
      'Service DNS: <svc>.<ns>.svc.cluster.local',
      'Pod DNS: <pod-ip>.<ns>.pod.cluster.local',
      'SRV records: _<port-name>._<proto>.<svc>.<ns>.svc.cluster.local'
    ],
    [
      { heading: 'CoreDNS Configuration', text: 'ConfigMap: coredns in kube-system. Plugins: kubernetes (service discovery), prometheus (metrics), forward (upstream DNS), loop (detect loops), cache (TTL). Cluster domain: cluster.local (configurable).' },
      { heading: 'DNS Resolution', text: 'Pods /etc/resolv.conf: nameserver <cluster-dns-ip>, search domains: <ns>.svc.cluster.local, svc.cluster.local, cluster.local. So just <svc> works in same namespace. ndots:5 controls when search domains are tried.' }
    ],
    [
      { question: 'Kubernetes DNS implementation?', answer: 'CoreDNS — deployed as Deployment in kube-system.' },
      { question: 'Service DNS format?', answer: '<svc>.<ns>.svc.cluster.local' },
      { question: 'Pod DNS format?', answer: '<pod-ip>.<ns>.pod.cluster.local' },
      { question: 'ndots:5 meaning?', answer: 'If domain has <5 dots, search domains tried first.' }
    ],
    [
      { question: 'Kubernetes DNS pod?', options: ['kube-dns', 'CoreDNS', 'Unbound'], answer: 1 },
      { question: 'Service FQDN?', options: ['svc.ns.svc.cluster.local', 'ns.svc.cluster.local', 'svc.ns.cluster.local'], answer: 0 },
      { question: 'Search domains include?', options: ['ns.svc.cluster.local', 'svc.cluster.local', 'Both'], answer: 2 },
      { question: 'CoreDNS ConfigMap?', options: ['coredns', 'corefile', 'dns-config'], answer: 0 }
    ],
    [
      { title: 'Test DNS Resolution', useCase: 'Verify CoreDNS', code: 'kubectl run test --image=busybox --rm -it -- nslookup kubernetes', description: 'Resolves kubernetes service.' },
      { title: 'Check CoreDNS Config', useCase: 'View DNS config', code: 'kubectl get configmap coredns -n kube-system -o yaml', description: 'Shows CoreDNS Corefile.' },
      { title: 'Check CoreDNS Logs', useCase: 'Debug DNS issues', code: 'kubectl logs -n kube-system -l k8s-app=kube-dns', description: 'Shows DNS query logs.' }
    ]
  ),

  // CoreDNS
  topic('k8s-coredns', 'CoreDNS', 'intermediate', 10,
    'CoreDNS is the default DNS server for Kubernetes, replacing kube-dns. It is a flexible, extensible DNS server written in Go. Configurable via Corefile with plugins for DNS resolution, caching, health checking, Prometheus metrics, and more.',
    [
      'Default cluster DNS (replaces kube-dns)',
      'Configurable via Corefile with plugin chain',
      'Plugins: kubernetes, prometheus, forward, cache, health, loop',
      'Deployed as Deployment (replicas: 2) in kube-system'
    ],
    [
      { heading: 'Corefile Configuration', text: 'Example: .:53 { errors, health {lameduck 5s}, kubernetes cluster.local {pods insecure, ttl 30}, prometheus :9153, forward . /etc/resolv.conf {max_concurrent 1000}, cache 30, loop, reload 30, loadbalance }.' },
      { heading: 'Scaling', text: 'CoreDNS is deployed with 2 replicas by default. For large clusters (>1000 services), increase replicas and CPU limits. Autoscaling: cluster-proportional-autoscaler adjusts replicas based on node/core count.' }
    ],
    [
      { question: 'What is CoreDNS?', answer: 'Default Kubernetes DNS server, extensible via plugins.' },
      { question: 'Configuration format?', answer: 'Corefile with plugin chain (bind, forward, kubernetes, cache).' },
      { question: 'Key plugins?', answer: 'kubernetes (service discovery), forward (upstream), cache (TTL), prometheus (metrics).' },
      { question: 'Default replicas?', answer: '2, auto-scaled for large clusters.' }
    ],
    [
      { question: 'CoreDNS replaces?', options: ['kube-dns', 'Unbound', 'BIND'], answer: 0 },
      { question: 'Corefile format?', options: ['YAML', 'Custom config language', 'JSON'], answer: 1 },
      { question: 'Kubernetes plugin does?', options: ['Service discovery', 'Caching', 'Forwarding'], answer: 0 },
      { question: 'Forward plugin does?', options: ['Upstream DNS', 'Service discovery', 'Metrics'], answer: 0 }
    ],
    [
      { title: 'Edit CoreDNS Config', useCase: 'Customize DNS', code: 'kubectl edit configmap coredns -n kube-system', description: 'Modifies Corefile.' },
      { title: 'Restart CoreDNS', useCase: 'Apply config changes', code: 'kubectl rollout restart -n kube-system deployment/coredns', description: 'Restarts to pick up config.' },
      { title: 'Check CoreDNS Autoscaling', useCase: 'Verify scaling', code: 'kubectl get hpa -n kube-system', description: 'Shows CoreDNS HPA.' }
    ]
  ),

  // CNI
  topic('k8s-cni', 'CNI', 'intermediate', 15,
    'Container Network Interface (CNI) is the standard for configuring container networking. CNI plugins implement Pod IP allocation, network connectivity, and policy enforcement. Common plugins: Calico, Flannel, Cilium, Weave Net, AWS VPC CNI, Azure CNI.',
    [
      'Standard for networking configuration',
      'Responsibilities: IP allocation (IPAM), Pod connectivity, policy',
      'Calico: BGP + NetworkPolicy (most popular)',
      'Flannel: simple overlay (VXLAN, host-gw), no NetworkPolicy'
    ],
    [
      { heading: 'CNI Architecture', text: 'kubelet calls CNI plugin binary for each Pod. Plugin allocates IP (IPAM plugin), creates veth pair, attaches to bridge/overlay. Config in /etc/cni/net.d/. Multus: multiple CNI plugins per Pod. Each plugin implements different capabilities.' },
      { heading: 'Plugin Comparison', text: 'Calico: BGP for routing, full NetworkPolicy, no overlay needed. Flannel: overlay (VXLAN, host-gw), no policy, simple. Cilium: eBPF-based, fast, features like L7 policy, network tracing. AWS VPC CNI: uses VPC IPs, native AWS integration.' }
    ],
    [
      { question: 'What is CNI?', answer: 'Standard for configuring container networking (IP allocation, connectivity).' },
      { question: 'CNI responsibilities?', answer: 'IP allocation (IPAM), Pod network setup, optional policy enforcement.' },
      { question: 'Most popular CNI?', answer: 'Calico (BGP + NetworkPolicy support).' },
      { question: 'Calico vs Flannel?', answer: 'Calico: BGP, NetworkPolicy. Flannel: overlay only, no policy.' }
    ],
    [
      { question: 'kubelet calls CNI?', options: ['For each Pod', 'Once at startup', 'Periodically'], answer: 0 },
      { question: 'Flannel supports?', options: ['NetworkPolicy', 'Simple overlay only', 'BGP routing'], answer: 1 },
      { question: 'Cilium uses?', options: ['iptables', 'eBPF', 'BGP'], answer: 1 },
      { question: 'AWS VPC CNI uses?', options: ['Overlay', 'VPC IPs directly', 'Host networking'], answer: 1 }
    ],
    [
      { title: 'Check CNI Plugin', useCase: 'View installed CNI', code: 'kubectl get pods -n kube-system | grep -E "calico|flannel|cilium|aws-node|azure"', description: 'Shows running CNI plugin.' },
      { title: 'Install Calico', useCase: 'Deploy Calico CNI', code: 'kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/master/manifests/calico.yaml', description: 'Installs Calico.' }
    ]
  ),

  // Calico
  topic('k8s-calico', 'Calico', 'intermediate', 15,
    'Calico is the most popular CNI plugin providing BGP-based networking and full NetworkPolicy support. It uses BGP to route Pod IPs between nodes without encapsulation (or with IPIP for non-routable networks).',
    [
      'BGP-based networking (no overlay by default, high performance)',
      'Full NetworkPolicy support (Kubernetes + extended Calico policies)',
      'IPIP encapsulation for cloud environments without BGP',
      'Supports eBPF mode (Cilium integration) for even better performance'
    ],
    [
      { heading: 'Calico Modes', text: 'BGP: nodes peer and exchange Pod routes directly (no encapsulation). IPIP: packets encapsulated (slight overhead) for environments where BGP not possible. eBPF: using eBPF dataplane for high-performance networking and security.' },
      { heading: 'Calico NetworkPolicy', text: 'Calico extends Kubernetes NetworkPolicy with: GlobalNetworkPolicy (cluster-wide), GlobalNetworkSet (IP whitelists), ordered policy tiers (security, platform, application), deny rules, and action: Log, Allow, Deny, Pass.' }
    ],
    [
      { question: 'What is Calico?', answer: 'Most popular CNI plugin with BGP routing and full NetworkPolicy.' },
      { question: 'Default routing mode?', answer: 'BGP — nodes exchange Pod routes directly without overlay.' },
      { question: 'Calico vs Kubernetes NetworkPolicy?', answer: 'Calico extends with GlobalNetworkPolicy, ordered tiers, Log action.' },
      { question: 'eBPG mode?', answer: 'Replaces iptables with eBPF for higher performance.' }
    ],
    [
      { question: 'Calico routing?', options: ['Overlay only', 'BGP (no overlay by default)', 'Host networking'], answer: 1 },
      { question: 'IPIP mode?', options: ['No encapsulation', 'Encapsulation for BGP-less envs', 'Full mesh'], answer: 1 },
      { question: 'GlobalNetworkPolicy scope?', options: ['Namespace', 'Cluster-wide', 'Node-specific'], answer: 1 },
      { question: 'Calico action types?', options: ['Allow/Deny only', 'Allow/Deny/Log/Pass', 'Allow/Deny/Reject'], answer: 1 }
    ],
    [
      { title: 'Check Calico Status', useCase: 'Verify Calico health', code: 'kubectl get pods -n calico-system;\nkubectl calicoctl get nodes', description: 'Shows Calico components and BGP peers.' },
      { title: 'Calico NetworkPolicy', useCase: 'Extended policy', code: 'kubectl apply -f calico-network-policy.yaml', description: 'Creates Calico GlobalNetworkPolicy.' }
    ]
  ),

  // Flannel
  topic('k8s-flannel', 'Flannel', 'intermediate', 15,
    'Flannel is a simple CNI plugin that provides layer 3 IPv4 network between Pods across nodes. It creates an overlay network (VXLAN, host-gw, or other backends). Simple to set up but lacks NetworkPolicy support.',
    [
      'Simple overlay network for Pod-to-Pod connectivity',
      'Backends: VXLAN (default), host-gw, WireGuard, UDP',
      'No NetworkPolicy support (use Calico or Cilium for policy)',
      'Best for simple clusters or as base with Calico for policy'
    ],
    [
      { heading: 'Flannel Backends', text: 'VXLAN: default, encapsulated overlay, works everywhere. host-gw: no encapsulation, uses host routing tables, best performance but needs direct node connectivity. WireGuard: encrypted overlay. UDP: legacy, low performance.' },
      { heading: 'Flannel Limitations', text: 'No NetworkPolicy support. Single flat network (no multi-network). No traffic encryption (except WireGuard backend). No advanced features like DNS-based policies, L7 filtering. Can be paired with Calico (Calico policy with Flannel networking).' }
    ],
    [
      { question: 'What is Flannel?', answer: 'Simple CNI providing overlay network between Pods.' },
      { question: 'Default backend?', answer: 'VXLAN (encapsulated overlay).' },
      { question: 'Does Flannel support NetworkPolicy?', answer: 'No. Use Calico or Cilium for network policies.' },
      { question: 'host-gw backend?', answer: 'No encapsulation, uses host routing. Fastest but needs direct connectivity.' }
    ],
    [
      { question: 'Flannel default backend?', options: ['host-gw', 'VXLAN', 'WireGuard', 'UDP'], answer: 1 },
      { question: 'Flannel supports?', options: ['NetworkPolicy', 'Simple connectivity only', 'Both'], answer: 1 },
      { question: 'Flannel scope?', options: ['Enterprise', 'Simple clusters', 'Multi-cloud'], answer: 1 },
      { question: 'host-gw needs?', options: ['VXLAN', 'Direct node connectivity', 'BGP'], answer: 1 }
    ],
    [
      { title: 'Install Flannel', useCase: 'Simple networking', code: 'kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml', description: 'Installs Flannel CNI.' },
      { title: 'Check Flannel Config', useCase: 'View backend type', code: 'kubectl -n kube-flannel get cm kube-flannel-cfg -o yaml', description: 'Shows Flannel config (backend, net).' }
    ]
  ),

  // Weave
  topic('k8s-weave', 'Weave', 'intermediate', 15,
    'Weave Net creates a resilient mesh network connecting Pods across nodes. Uses fast data path (based on Linux kernel OVS/DPDK) and provides automatic encryption, DNS-based service discovery, and NetworkPolicy support.',
    [
      'Mesh network with automatic topology discovery',
      'Encrypted traffic (NaCl cryptography)',
      'Built-in DNS-based service discovery (WeaveDNS)',
      'NetworkPolicy support via weave-npc'
    ],
    [
      { heading: 'Weave Architecture', text: 'Weave router on each node creates mesh connections. Fast data path: uses Linux OVS with optional DPDK for acceleration. Packets encapsulated with Weave header. Automatic peer discovery via gossip protocol. No configuration needed for new nodes.' },
      { heading: 'Features', text: 'Encryption: NaCl cryptography with automatic key exchange. Service discovery: WeaveDNS resolves container names. Network policy: weave-npc implements Kubernetes NetworkPolicy. Multi-cloud: works across cloud providers and on-prem.' }
    ],
    [
      { question: 'What is Weave Net?', answer: 'Mesh CNI with automatic discovery, encryption, and network policy.' },
      { question: 'Encryption method?', answer: 'NaCl (Networking and Cryptography library) with automatic key exchange.' },
      { question: 'Peer discovery?', answer: 'Gossip protocol — no configuration needed for new nodes.' },
      { question: 'Fast data path?', answer: 'Linux OVS with optional DPDK acceleration.' }
    ],
    [
      { question: 'Weave encryption?', options: ['None', 'NaCl', 'IPSec'], answer: 1 },
      { question: 'Peer discovery via?', options: ['BGP', 'Gossip', 'DNS'], answer: 1 },
      { question: 'WeaveDNS?', options: ['Built-in', 'Requires CoreDNS', 'Replaces CoreDNS'], answer: 0 },
      { question: 'weave-npc implements?', options: ['Routing', 'NetworkPolicy', 'DNS'], answer: 1 }
    ],
    [
      { title: 'Install Weave', useCase: 'Deploy Weave Net', code: 'kubectl apply -f https://github.com/weaveworks/weave/releases/download/v2.8.1/weave-daemonset-k8s.yaml', description: 'Installs Weave Net.' },
      { title: 'Check Weave Status', useCase: 'View mesh connections', code: 'kubectl exec -n kube-system daemonset/weave-net -- weave status', description: 'Shows Weave peers and connections.' }
    ]
  ),

  // Istio
  topic('k8s-istio', 'Istio', 'advanced', 20,
    'Istio is a service mesh providing traffic management, security, observability, and policy enforcement. Architecture: data plane (Envoy sidecars), control plane (Istiod). Features: mTLS, traffic routing, telemetry, access control, fault injection.',
    [
      'Service mesh: traffic management, security, observability',
      'Data plane: Envoy sidecar proxies injected into Pods',
      'Control plane: Istiod manages configuration and certificates',
      'Features: mTLS, canary, circuit breaking, telemetry (Prometheus, Jaeger, Kiali)'
    ],
    [
      { heading: 'Traffic Management', text: 'VirtualService: routing rules (weight, header, match). DestinationRule: load balancing, circuit breaking, connection pool, TLS settings. Gateway: ingress/egress traffic. ServiceEntry: external services.' },
      { heading: 'Security', text: 'mTLS: automatic encryption between all services (PERMISSIVE or STRICT mode). AuthorizationPolicy: allow/deny rules based on identity, IP, JWT, headers. PeerAuthentication: mTLS mode per namespace. RequestAuthentication: JWT validation.' }
    ],
    [
      { question: 'What is Istio?', answer: 'Service mesh for traffic management, security, and observability.' },
      { question: 'Istio architecture?', answer: 'Data plane (Envoy proxies), control plane (Istiod).' },
      { question: 'Key CRDs?', answer: 'VirtualService, DestinationRule, Gateway, AuthorizationPolicy.' },
      { question: 'How is mTLS configured?', answer: 'PeerAuthentication policy (STRICT or PERMISSIVE mode).' }
    ],
    [
      { question: 'Istio data plane uses?', options: ['NGINX', 'Envoy', 'HAProxy'], answer: 1 },
      { question: 'VirtualService for?', options: ['Certificates', 'Traffic routing', 'Security'], answer: 1 },
      { question: 'PERMISSIVE mode?', options: ['No mTLS', 'mTLS if available, plain otherwise', 'Strict mTLS only'], answer: 1 },
      { question: 'Kiali provides?', options: ['Tracing', 'Service graph visualization', 'Logging'], answer: 1 }
    ],
    [
      { title: 'Install Istio', useCase: 'Deploy service mesh', code: 'istioctl install --set profile=demo -y', description: 'Installs Istio with demo profile.' },
      { title: 'Enable Sidecar Injection', useCase: 'Auto-inject Envoy', code: 'kubectl label namespace default istio-injection=enabled', description: 'Labels namespace for auto sidecar injection.' },
      { title: 'Create VirtualService', useCase: 'Traffic routing', code: 'kubectl apply -f virtual-service.yaml', description: 'Creates Istio routing rules.' }
    ]
  ),

  // Linkerd
  topic('k8s-linkerd', 'Linkerd', 'advanced', 20,
    'Linkerd is a lightweight service mesh known for simplicity and performance. Uses a Rust-based proxy (linkerd-proxy) instead of Envoy. Provides mTLS, traffic splitting, telemetry, and reliability features with minimal resource overhead.',
    [
      'Lightweight service mesh (Rust-based proxy vs Envoy)',
      'Features: mTLS, traffic splitting, telemetry, retries, timeouts',
      'CLI: linkerd check, linkerd viz (dashboard), linkerd inject',
      'Minimal resource overhead (~10MB per proxy)'
    ],
    [
      { heading: 'Linkerd Architecture', text: 'Data plane: linkerd-proxy (Rust) injected as sidecar. Control plane: destination (service discovery), identity (TLS certs), proxy-injector (auto-injection), viz (metrics, dashboard). Uses mutual TLS between proxies.' },
      { heading: 'Traffic Splitting', text: 'ServiceProfiles: define routes with retries, timeouts. TrafficSplit: weighted traffic routing (canary, blue-green). HTTPRoute: per-route policies. Tap: live request inspection for debugging.' }
    ],
    [
      { question: 'What is Linkerd?', answer: 'Lightweight service mesh with Rust-based proxy.' },
      { question: 'Linkerd vs Istio?', answer: 'Linkerd: smaller, simpler, Rust proxy. Istio: more features, Envoy proxy.' },
      { question: 'Linkerd proxy size?', answer: '~10MB, very low resource overhead.' },
      { question: 'TrafficSplit CRD?', answer: 'Weighted traffic routing for canary/blue-green.' }
    ],
    [
      { question: 'Linkerd proxy written in?', options: ['Go', 'Rust', 'C++', 'Java'], answer: 1 },
      { question: 'Linkerd dashboard via?', options: ['linkerd viz', 'linkerd dashboard', 'Kiali'], answer: 0 },
      { question: 'TrafficSplit does?', options: ['Routing by headers', 'Weighted traffic split', 'Circuit breaking'], answer: 1 },
      { question: 'Linkerd identity component?', options: ['Identity', 'Istiod', 'Cert-manager'], answer: 0 }
    ],
    [
      { title: 'Install Linkerd', useCase: 'Deploy service mesh', code: 'linkerd install | kubectl apply -f -', description: 'Installs Linkerd control plane.' },
      { title: 'Check Linkerd Health', useCase: 'Verify installation', code: 'linkerd check', description: 'Runs pre/post-install checks.' },
      { title: 'Inject Sidecars', useCase: 'Add proxy to Deployments', code: 'kubectl get deploy -o yaml | linkerd inject - | kubectl apply -f -', description: 'Injects Linkerd proxy into all Deployments.' }
    ]
  ),

  // Service Mesh
  topic('k8s-service-mesh', 'Service Mesh', 'advanced', 20,
    'A service mesh is a dedicated infrastructure layer for managing service-to-service communication. It provides traffic management, security, observability, and reliability features without modifying application code. Implementations: Istio, Linkerd, Consul Connect, Kuma.',
    [
      'Dedicated infrastructure layer for service communication',
      'Features: mTLS, traffic routing, telemetry, circuit breaking',
      'Sidecar proxy pattern (Envoy, linkerd-proxy)',
      'No application code changes required'
    ],
    [
      { heading: 'Service Mesh Benefits', text: 'Security: automatic mTLS encryption, certificate rotation. Observability: metrics (Prometheus), tracing (Jaeger), service graphs (Kiali). Traffic control: canary, blue-green, circuit breaking, retries, timeout. Policy: access control, rate limiting.' },
      { heading: 'Service Mesh Components', text: 'Data plane: proxies alongside each service (sidecars intercept traffic). Control plane: manages proxy configuration, certificates, telemetry aggregation. Ingress gateway: external traffic entry point. Egress gateway: controlled external traffic exit.' }
    ],
    [
      { question: 'What is a service mesh?', answer: 'Infrastructure layer for service-to-service communication management.' },
      { question: 'Sidecar proxy role?', answer: 'Intercepts all traffic, handles mTLS, routing, telemetry.' },
      { question: 'Control plane role?', answer: 'Manages proxy configuration, certificates, telemetry.' },
      { question: 'Service mesh benefits?', answer: 'Zero-code mTLS, traffic routing, observability, reliability.' }
    ],
    [
      { question: 'Sidecar intercepts?', options: ['Only ingress', 'All traffic', 'Only HTTP'], answer: 1 },
      { question: 'Ingress gateway?', options: ['Internal routing', 'External traffic entry', 'DNS resolution'], answer: 1 },
      { question: 'mTLS provides?', options: ['Encryption only', 'Encryption + identity', 'Identity only'], answer: 1 },
      { question: 'Popular mesh implementation?', options: ['Istio', 'Calico', 'CoreDNS', 'kube-proxy'], answer: 0 }
    ],
    [
      { title: 'Choose Service Mesh', useCase: 'Select based on needs', code: '# Istio: Full-featured, enterprise\n# Linkerd: Lightweight, simple\n# Consul: HashiCorp ecosystem\n# Kuma: CNCF, multi-cluster', description: 'Evaluate features vs complexity.' }
    ]
  )
];
