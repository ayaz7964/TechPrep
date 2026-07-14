var { topic } = require('./helpers');

module.exports = [

  // Pod Lifecycle
  topic('k8s-pod-lifecycle', 'Pod Lifecycle', 'beginner', 10,
    'The Pod Lifecycle defines the phases a Pod goes through from creation to termination. Understanding the lifecycle is essential for debugging, writing reliable controllers, and configuring proper health checks.',
    [
      'Phases: Pending, Running, Succeeded, Failed, Unknown',
      'Container states: Waiting (ContainerCreating, CrashLoopBackOff), Running, Terminated',
      'Unknown phase indicates node communication failure',
      'Init containers must complete before main containers start'
    ],
    [
      { heading: 'Phase Details', text: 'Pending: accepted by API, waiting for scheduling, image pull, or init containers. Running: at least one container running or starting/restarting. Succeeded: all containers exited with 0 (Jobs). Failed: at least one container exited non-zero. Unknown: node lost contact with apiserver.' },
      { heading: 'Container Statuses', text: 'Waiting: ContainerCreating (image pull), CrashLoopBackOff (container crashes continuously, backoff 10s, 20s, 40s... max 5min), PodInitializing (init containers). Running: container executing. Terminated: Completed (exit 0), Error (exit non-zero), OOMKilled (memory limit exceeded), ContainerCannotRun.' }
    ],
    [
      { question: 'What are Pod phases?', answer: 'Pending, Running, Succeeded, Failed, Unknown.' },
      { question: 'What does CrashLoopBackOff mean?', answer: 'Container exits repeatedly. Backoff timer increases between restarts.' },
      { question: 'What phase does a Job completion reach?', answer: 'Succeeded — all containers exited code 0.' },
      { question: 'What causes Unknown phase?', answer: 'Node is unreachable from the apiserver (network partition, node failure).' }
    ],
    [
      { question: 'CrashLoopBackOff is a?', options: ['Pod phase', 'Container state reason', 'Node condition'], answer: 1 },
      { question: 'Unknown phase indicates?', options: ['Container error', 'Node unreachable', 'Pod deleted'], answer: 1 },
      { question: 'Running phase means?', options: ['All containers running', 'At least one container running', 'Pod ready'], answer: 1 },
      { question: 'Init containers run?', options: ['After main', 'Before main', 'In parallel'], answer: 1 }
    ],
    [
      { title: 'Watch Pod Events', useCase: 'Monitor changes', code: 'kubectl get pods -w', description: 'Watches Pod status changes in real-time.' },
      { title: 'Inspect Pod Status', useCase: 'Debug issues', code: 'kubectl describe pod my-pod', description: 'Shows detailed container status.' },
      { title: 'Restart Counter', useCase: 'Check crash count', code: 'kubectl get pods --field-selector=status.phase=Running', description: 'Lists Pods in Running phase.' }
    ]
  ),

  // Init Containers
  topic('k8s-init-containers', 'Init Containers', 'intermediate', 10,
    'Init containers run to completion before app containers start. They run sequentially, each must succeed before the next starts. Used for setup: database migrations, waiting for dependencies, file permission setup, configuration generation.',
    [
      'Run to completion before app containers, sequentially',
      'Can use different images and tools than app containers',
      'Share volumes with app containers for data passing',
      'Failed init container causes Pod to restart it'
    ],
    [
      { heading: 'Configuration', text: 'Defined in spec.initContainers with same schema as containers. Each must complete with exit 0. Init containers can use busybox or alpine while app runs Java — reducing app image size.' },
      { heading: 'Use Cases', text: 'Database migration (alembic/prisma migrate before app starts). Wait-for: loop until dependency service is reachable. Permission setup: chown/chmod on shared volumes. Config generation: create config files from templates.' }
    ],
    [
      { question: 'What are init containers?', answer: 'Run to completion before app containers, sequentially, for setup tasks.' },
      { question: 'What happens if init container fails?', answer: 'Pod restarts the init container based on restartPolicy.' },
      { question: 'Why use init containers vs postStart?', answer: 'Init containers run sequentially, complete before app starts. postStart has no completion guarantee.' },
      { question: 'Can init containers have different resources?', answer: 'Yes. They have their own resource requests/limits and image.' }
    ],
    [
      { question: 'Init containers run?', options: ['In parallel', 'Sequentially', 'After app containers'], answer: 1 },
      { question: 'Init container use case?', options: ['Serving requests', 'Database migration', 'Load balancing'], answer: 1 },
      { question: 'Pod phase during init?', options: ['Running', 'Pending ("Init:N")', 'Succeeded'], answer: 1 },
      { question: 'Init container spec field?', options: ['containers', 'initContainers', 'setupContainers'], answer: 1 }
    ],
    [
      { title: 'Check Init Status', useCase: 'Monitor init progress', code: 'kubectl get pod my-pod', description: 'Shows init container phase.' },
      { title: 'View Init Container Logs', useCase: 'Debug init failures', code: 'kubectl logs my-pod -c init-mydb --previous', description: 'Shows logs from previous init attempt.' }
    ]
  ),

  // Sidecar Containers
  topic('k8s-sidecar-containers', 'Sidecar Containers', 'intermediate', 10,
    'Sidecar containers support the main application container, sharing the same Pod lifecycle, network, and storage. Common patterns: logging (fluentd collecting logs), proxy (Envoy/Istio intercepting traffic), and monitoring sidecars.',
    [
      'Helper containers alongside the main container in the same Pod',
      'Share network namespace (localhost) and volumes',
      'Logging: fluentd, filebeat forwarding app logs',
      'Proxying: Istio/Envoy sidecar for service mesh traffic management'
    ],
    [
      { heading: 'Logging Pattern', text: 'Main app writes logs to a shared emptyDir volume. Sidecar reads and forwards to centralized logging (Elasticsearch, CloudWatch). Sidecar can also rotate or compress logs.' },
      { heading: 'Proxy Pattern (Service Mesh)', text: 'Istio injects an Envoy proxy sidecar that intercepts all Pod traffic via iptables rules. Handles mTLS, traffic routing, telemetry, access control. Each Pod gets its own proxy (data plane).' }
    ],
    [
      { question: 'What is a sidecar container?', answer: 'Helper container in the same Pod supporting the main app.' },
      { question: 'How do sidecars communicate with main?', answer: 'Via localhost (shared network) and shared volumes.' },
      { question: 'What is the Istio sidecar?', answer: 'Envoy proxy injected into each Pod for mTLS, routing, telemetry.' },
      { question: 'Sidecar vs init container?', answer: 'Sidecar runs alongside main. Init runs to completion before main starts.' }
    ],
    [
      { question: 'Sidecar is defined in which field?', options: ['initContainers', 'containers (alongside main)', 'sidecars'], answer: 1 },
      { question: 'Istio sidecar uses?', options: ['NGINX', 'Envoy', 'HAProxy'], answer: 1 },
      { question: 'Sidecars share with main?', options: ['Nothing', 'Network and volumes', 'Only volumes'], answer: 1 },
      { question: 'Logging sidecar reads from?', options: ['Stdout', 'Shared volume', 'Direct connection'], answer: 1 }
    ],
    [
      { title: 'View Sidecar Logs', useCase: 'Debug sidecar', code: 'kubectl logs my-pod -c sidecar-container', description: 'Shows sidecar-specific logs.' }
    ]
  ),

  // Multi-container Pods
  topic('k8s-multi-container-pods', 'Multi-container Pods', 'intermediate', 15,
    'Multi-container Pods run multiple containers sharing the same lifecycle, network, and storage. Patterns: sidecar, adapter, ambassador, init. Use when containers are tightly coupled — they must be co-located and co-scheduled.',
    [
      'Multiple containers sharing network, storage, and lifecycle',
      'Patterns: Sidecar, Adapter, Ambassador, Init',
      'Containers communicate via localhost and shared volumes',
      'All containers start/stop together as a unit'
    ],
    [
      { heading: 'Adapter Pattern', text: 'Transforms main container output for external systems. Example: main app writes metrics in Prometheus format, adapter converts to Stackdriver. Benefits: main app stays clean, adapter handles integration.' },
      { heading: 'Ambassador Pattern', text: 'Proxies external connections for the main container. Example: main app connects to localhost:3306, ambassador proxies to remote MySQL. Handles connection pooling, retries, circuit breaking transparently.' }
    ],
    [
      { question: 'What are multi-container Pods?', answer: 'Multiple containers sharing network, storage, lifecycle in one Pod.' },
      { question: 'When to use vs separate Pods?', answer: 'When tightly coupled (proxy, logging). Separate Pods for loosely coupled services.' },
      { question: 'Can containers use different images?', answer: 'Yes. Different OS, language, tool sets in the same Pod.' },
      { question: 'Ambassador pattern use?', answer: 'Proxy external connections with retries and circuit breaking.' }
    ],
    [
      { question: 'What do Pod containers NOT share?', options: ['Network', 'IPC', 'Process namespace by default', 'Storage'], answer: 2 },
      { question: 'Which pattern converts output format?', options: ['Sidecar', 'Adapter', 'Ambassador', 'Init'], answer: 1 },
      { question: 'When NOT to use multi-container?', options: ['Logging sidecar', 'Independent services', 'Proxy ambassador'], answer: 1 },
      { question: 'Containers communicate via?', options: ['Service IP', 'localhost', 'External DNS'], answer: 1 }
    ],
    [
      { title: 'Access Specific Container', useCase: 'Exec into sidecar', code: 'kubectl exec -it multi-pod -c sidecar -- /bin/sh', description: 'Opens shell in one container.' },
      { title: 'View Logs per Container', useCase: 'Debug specific container', code: 'kubectl logs multi-pod -c main-app', description: 'Shows main container logs.' }
    ]
  ),

  // Pod Scheduling
  topic('k8s-pod-scheduling', 'Pod Scheduling', 'intermediate', 15,
    'Pod scheduling assigns Pods to Nodes based on constraints, resources, and policies. The kube-scheduler evaluates Nodes for feasibility and scores them. Key mechanisms: nodeSelector, nodeName, affinity/anti-affinity, taints/tolerations, and priority.',
    [
      'kube-scheduler: Filter (feasible) -> Score (rank) -> Bind',
      'nodeSelector: simple label-based node filtering',
      'nodeName: bypasses scheduler, directly assigns to specific Node',
      'Unschedulable Pod stays Pending with failure events'
    ],
    [
      { heading: 'Scheduling Cycle', text: 'Filter (Predicates): node conditions, resource adequacy, ports, hostname, volume zone. Score (Priorities): ranks by resource availability (LeastRequestedPriority, BalancedResourceAllocation) and spread (SelectorSpreading). Bind: writes Pod to Node binding.' },
      { heading: 'Node Resources', text: 'kubelet reports allocatable resources (capacity - system overhead). Scheduler checks Pod requests <= Node allocatable. Extended resources (GPU, FPGA) managed similarly. Resource fragmentation minimized by balanced scoring.' }
    ],
    [
      { question: 'What is Pod scheduling?', answer: 'Process of assigning Pods to Nodes based on constraints, resources, and scoring.' },
      { question: 'Filter vs Score phase?', answer: 'Filter finds feasible Nodes. Score ranks them to pick the best.' },
      { question: 'What does nodeName do?', answer: 'Directly assigns Pod to a Node, bypassing the scheduler.' },
      { question: 'No feasible Node?', answer: 'Pod stays Pending with scheduling failure events.' }
    ],
    [
      { question: 'Scheduling phase order?', options: ['Score-Filter-Bind', 'Filter-Score-Bind', 'Bind-Filter-Score'], answer: 1 },
      { question: 'Bypasses scheduler?', options: ['nodeSelector', 'nodeName', 'affinity'], answer: 1 },
      { question: 'Unschedulable Pod phase?', options: ['Running', 'Failed', 'Pending'], answer: 2 },
      { question: 'Scheduler is part of?', options: ['kubelet', 'Control Plane', 'Worker Node'], answer: 1 }
    ],
    [
      { title: 'Force to Node', useCase: 'Bypass scheduler', code: 'kubectl run nginx --image=nginx --restart=Never --overrides=\'{"spec":{"nodeName":"worker-1"}}\'', description: 'Directly assigns to worker-1.' },
      { title: 'Check Pending Reason', useCase: 'Debug unscheduled Pod', code: 'kubectl describe pod my-pod | grep -A 5 Events', description: 'Shows scheduling failure events.' }
    ]
  ),

  // Pod Affinity
  topic('k8s-pod-affinity', 'Pod Affinity', 'advanced', 20,
    'Pod affinity attracts Pods to Nodes that already have certain Pods running, co-locating them for performance or data locality. Hard affinity (requiredDuringScheduling) must be satisfied; soft affinity (preferredDuringScheduling) is a preference.',
    [
      'Attracts Pods to Nodes co-located with matching Pods',
      'requiredDuringScheduling: hard constraint',
      'preferredDuringScheduling: soft preference',
      'topologyKey: hostname (same node), zone (same AZ), region'
    ],
    [
      { heading: 'Topology Keys', text: 'kubernetes.io/hostname: same Node. topology.kubernetes.io/zone: same AZ. topology.kubernetes.io/region: same region. Custom topology keys via node labels. Matching Pods in the same topology domain satisfy the rule.' },
      { heading: 'Affinity vs Anti-Affinity', text: 'Pod affinity: co-locate related Pods (cache with database). Pod anti-affinity: spread replicas for HA (don\'t schedule two frontend Pods on same Node). Both use same syntax, topologyKey, and labelSelector.' }
    ],
    [
      { question: 'What is Pod affinity?', answer: 'Attracts Pods to Nodes where matching Pods are running.' },
      { question: 'Required vs Preferred?', answer: 'Required: hard constraint. Preferred: soft preference.' },
      { question: 'What is topologyKey?', answer: 'Node label defining the topology domain (hostname, zone, region).' },
      { question: 'Use case for Pod affinity?', answer: 'Co-locating frontend with cache for low latency.' }
    ],
    [
      { question: 'Affinity topology for same AZ?', options: ['kubernetes.io/hostname', 'topology.kubernetes.io/zone', 'topology.kubernetes.io/region'], answer: 1 },
      { question: 'Soft preference uses?', options: ['requiredDuringScheduling', 'preferredDuringScheduling', 'optionalDuringScheduling'], answer: 1 },
      { question: 'Pod affinity selects Pods via?', options: ['nodeSelector', 'labelSelector', 'nameMatch'], answer: 1 },
      { question: 'Match topology key?', options: ['Any matching Pods', 'All matching Pods', 'Exact one'], answer: 0 }
    ],
    [
      { title: 'Verify Co-location', useCase: 'Check node assignments', code: 'kubectl get pods -o wide | sort -k7', description: 'Shows which nodes each Pod runs on.' },
      { title: 'Troubleshoot Affinity', useCase: 'Debug scheduling', code: 'kubectl describe pod my-pod | tail -20', description: 'Shows scheduling events.' }
    ]
  ),

  // Anti-Affinity
  topic('k8s-anti-affinity', 'Anti-Affinity', 'advanced', 15,
    'Pod anti-affinity spreads Pods across topology domains for high availability. It prevents Pods from being scheduled on the same node (or zone) as other matching Pods. Commonly used to spread replicas across failure domains.',
    [
      'Spreads Pods across topology domains for fault tolerance',
      'requiredDuringScheduling: must not co-schedule with matching Pods',
      'topologyKey: hostname to spread across nodes',
      'Preferred recommended for large clusters to avoid starvation'
    ],
    [
      { heading: 'Required vs Preferred', text: 'requiredDuringScheduling: hard constraint. With hostname topokey and 3 replicas, each gets its own node. If only 2 nodes, third Pod stays Pending. preferredDuringScheduling: scheduler prefers spread but can schedule on same node if necessary.' },
      { heading: 'Considerations', text: 'Anti-affinity can cause Pod starvation (Pending forever). Use preferred for >100 replicas or <10 nodes. Combine with podAffinity for complex topology patterns. Different topologyKey controls spread granularity (node vs zone).' }
    ],
    [
      { question: 'What is Pod anti-affinity?', answer: 'Spreads Pods across topology domains to avoid co-location.' },
      { question: 'When would a Pod stay Pending?', answer: 'Required anti-affinity with too few topology domains to spread across.' },
      { question: 'Anti-affinity use case?', answer: 'Spread replicas across nodes for HA (no two replicas on same node).' },
      { question: 'Preferred vs Required?', answer: 'Preferred: best-effort. Required: hard, may leave Pods Pending.' }
    ],
    [
      { question: 'Anti-affinity spreads Pods across?', options: ['Same node', 'Different topology domains', 'Same zone'], answer: 1 },
      { question: 'Required anti-affinity + 2 nodes + 3 replicas?', options: ['All 3 scheduled', '2 scheduled, 1 Pending', 'None scheduled'], answer: 1 },
      { question: 'Recommended for large clusters?', options: ['required', 'preferred', 'No anti-affinity'], answer: 1 },
      { question: '2 replicas anti-affinity on hostname?', options: ['Same node', 'Different nodes', 'Any node'], answer: 1 }
    ],
    [
      { title: 'Verify Spreading', useCase: 'Check node distribution', code: 'kubectl get pods -l app=web -o wide', description: 'Confirms Pods on different nodes.' },
      { title: 'Switch to Preferred', useCase: 'Softer spreading', code: 'kubectl apply -f deployment-preferred-anti.yaml', description: 'Preference to spread, not required.' }
    ]
  ),

  // Taints
  topic('k8s-taints', 'Taints', 'intermediate', 15,
    'Taints are applied to Nodes and repel Pods without matching tolerations. A taint has key, value, and effect. Effects: NoSchedule (block new), PreferNoSchedule (soft), NoExecute (evict running). Control plane nodes are tainted by default.',
    [
      'Node property repelling Pods without matching tolerations',
      'Effects: NoSchedule, PreferNoSchedule, NoExecute',
      'Control plane: node-role.kubernetes.io/master:NoSchedule',
      'NoExecute evicts existing Pods without toleration'
    ],
    [
      { heading: 'Taint Effects', text: 'NoSchedule: new Pods without toleration not scheduled. PreferNoSchedule: scheduler tries to avoid but may schedule. NoExecute: new Pods rejected AND existing Pods without toleration evicted. Taint-based eviction used for node problems (unreachable, disk pressure).' },
      { heading: 'Management', text: 'kubectl taint nodes node1 key=value:NoSchedule. Remove with key:NoSchedule- or key-. Multiple taints additive. Node conditions (disk-pressure, memory-pressure) add NoSchedule taints automatically.' }
    ],
    [
      { question: 'What is a taint?', answer: 'Node property repelling Pods without matching tolerations.' },
      { question: 'Taint effects?', answer: 'NoSchedule (block new), PreferNoSchedule (soft), NoExecute (evict).' },
      { question: 'NoExecute effect?', answer: 'Pods without toleration are evicted from the node.' },
      { question: 'Control plane taint?', answer: 'node-role.kubernetes.io/master:NoSchedule.' }
    ],
    [
      { question: 'Add taint command?', options: ['kubectl label node', 'kubectl taint node', 'kubectl annotate node'], answer: 1 },
      { question: 'Which evicts running Pods?', options: ['NoSchedule', 'PreferNoSchedule', 'NoExecute'], answer: 2 },
      { question: 'Control plane taint prevents?', options: ['All Pods', 'Workloads without toleration', 'DaemonSets'], answer: 1 },
      { question: 'Disk pressure adds?', options: ['NoSchedule taint', 'PreferNoSchedule', 'Both'], answer: 0 }
    ],
    [
      { title: 'Add Taint', useCase: 'Dedicate node for GPU', code: 'kubectl taint nodes gpu-node gpu=true:NoSchedule', description: 'Taints node for GPU workloads only.' },
      { title: 'Remove Taint', useCase: 'Allow all Pods', code: 'kubectl taint nodes gpu-node gpu=true:NoSchedule-', description: 'Removes the taint.' },
      { title: 'View Taints', useCase: 'Check node taints', code: 'kubectl describe nodes | grep Taints', description: 'Lists all taints.' }
    ]
  ),

  // Tolerations
  topic('k8s-tolerations', 'Tolerations', 'intermediate', 15,
    'Tolerations allow Pods to be scheduled on Nodes with matching taints. Operator: Equal (exact key+value) or Exists (key only). TolerationSeconds limits time tolerating NoExecute. Paired with taints for dedicated hardware or control plane workloads.',
    [
      'Pod property enabling scheduling on tainted Nodes',
      'Equal operator: exact key+value match. Exists: key only',
      'tolerationSeconds: duration before NoExecute eviction',
      'DaemonSets include tolerations for control plane nodes'
    ],
    [
      { heading: 'Toleration Fields', text: 'key, value, operator (Equal or Exists), effect, tolerationSeconds. Exists operator matches any value (just key+effect). Equal requires exact value. effect can match all if omitted. tolerationSeconds: for NoExecute, Pod stays this long before eviction.' },
      { heading: 'Default Tolerations', text: 'Added by kubelet: node.kubernetes.io/not-ready (300s), node.kubernetes.io/unreachable (300s), node.kubernetes.io/memory-pressure (NoSchedule), node.kubernetes.io/disk-pressure (NoSchedule). Pods can override.' }
    ],
    [
      { question: 'What is a toleration?', answer: 'Pod property enabling scheduling on tainted Nodes.' },
      { question: 'Equal vs Exists?', answer: 'Equal = exact key+value. Exists = key matches regardless of value.' },
      { question: 'tolerationSeconds?', answer: 'Duration a Pod tolerates a NoExecute taint before eviction.' },
      { question: 'No tolerance for NoExecute?', answer: 'Immediate eviction from the tainted node.' }
    ],
    [
      { question: 'Toleration operator for any value?', options: ['Equal', 'Exists', 'Any'], answer: 1 },
      { question: 'tolerationSeconds applies to?', options: ['NoSchedule', 'PreferNoSchedule', 'NoExecute'], answer: 2 },
      { question: 'Default toleration for not-ready?', options: ['No', 'Yes, 300s', 'Yes, infinite'], answer: 1 },
      { question: 'DaemonSet toleration for master?', options: ['Exists effect NoSchedule', 'Equal gpu=true', 'Both'], answer: 0 }
    ],
    [
      { title: 'Schedule on Control Plane', useCase: 'Run on master node', code: 'kubectl create deployment debug --image=busybox -- sh -c "sleep 3600"', description: 'May need toleration added via YAML.' },
      { title: 'View Toleration Config', useCase: 'Inspect Pod tolerations', code: 'kubectl describe pod my-pod | grep -A 10 Tolerations', description: 'Shows all tolerations.' }
    ]
  ),

  // Pod Priority
  topic('k8s-pod-priority', 'Pod Priority', 'intermediate', 10,
    'Pod Priority indicates the importance of a Pod. Higher-priority Pods are scheduled first and can preempt (evict) lower-priority Pods when resources are scarce. PriorityClass defines priority values cluster-wide.',
    [
      'PriorityClass defines priority value (higher = more important)',
      'High-priority Pods preempt low-priority to free resources',
      'Built-in: system-node-critical, system-cluster-critical',
      'Preemption respects PodDisruptionBudget'
    ],
    [
      { heading: 'PriorityClass', text: 'Global resource with value (int32), globalDefault (for Pods without priorityClassName), description. Built-in: system-node-critical (2000001000), system-cluster-critical (2000000000). Scheduler respects priority in queue ordering and preemption.' },
      { heading: 'Preemption Logic', text: 'When high-priority Pod cannot schedule, scheduler identifies nodes with lower-priority Pods to evict. Selects node that frees enough resources by evicting lowest-priority Pods. Preempted Pods get graceful termination (30s default).' }
    ],
    [
      { question: 'What is Pod Priority?', answer: 'Relative importance. Higher priority schedules first, can preempt lower.' },
      { question: 'What is PriorityClass?', answer: 'Cluster resource assigning priority value to Pods.' },
      { question: 'Built-in priority classes?', answer: 'system-node-critical (highest), system-cluster-critical.' },
      { question: 'Preemption respects?', answer: 'PodDisruptionBudget during eviction.' }
    ],
    [
      { question: 'Higher priority value = ?', options: ['Less important', 'More important', 'Default'], answer: 1 },
      { question: 'Preemption respects?', options: ['Nothing', 'PodDisruptionBudget', 'ResourceQuota only'], answer: 1 },
      { question: 'Critical Pod priority class name?', options: ['critical', 'system-cluster-critical', 'high-priority'], answer: 1 },
      { question: 'Preempted Pod behavior?', options: ['Immediate kill', 'Graceful termination', 'Force deleted'], answer: 1 }
    ],
    [
      { title: 'Create PriorityClass', useCase: 'Define priority tier', code: 'kubectl apply -f priority-class.yaml', description: 'Creates high-priority class.' },
      { title: 'View PriorityClasses', useCase: 'List all classes', code: 'kubectl get priorityclasses', description: 'Shows values and descriptions.' }
    ]
  ),

  // Pod Disruption Budget
  topic('k8s-pdb', 'Pod Disruption Budget', 'intermediate', 15,
    'PodDisruptionBudget (PDB) limits voluntary disruptions (node drain, cluster upgrades, autoscaling). It ensures a minimum number of replicas remain healthy during planned operations. Does NOT protect against involuntary disruptions (hardware failures).',
    [
      'Limits voluntary disruptions: drain, upgrade, autoscaling down',
      'minAvailable: minimum Pods that must be running',
      'maxUnavailable: maximum Pods that can be unavailable',
      'Drain blocks if PDB would be violated'
    ],
    [
      { heading: 'Configuration', text: 'minAvailable: absolute number or percentage (e.g., 2 or 50%). maxUnavailable: absolute or percentage (mutually exclusive). selector: label query over Pods. PDB status: currentHealthy, desiredHealthy, disruptionsAllowed, expectedPods.' },
      { heading: 'Behavior During Drain', text: 'kubectl drain cordons and evicts Pods. Eviction checks PDB — if disruptionsAllowed > 0, Pod evicted. If PDB would be violated, drain blocks. Force drain bypasses PDB.' }
    ],
    [
      { question: 'What is PDB?', answer: 'Limits voluntary disruptions ensuring minimum running Pods for availability.' },
      { question: 'What does PDB protect against?', answer: 'Voluntary disruptions: node drain, upgrades, autoscaling.' },
      { question: 'minAvailable vs maxUnavailable?', answer: 'minAvailable: minimum running. maxUnavailable: maximum down at once.' },
      { question: 'Does PDB protect against node failure?', answer: 'No. Involuntary disruptions are not covered.' }
    ],
    [
      { question: 'PDB protects against?', options: ['Hardware failures', 'Node drain', 'Pod crashes'], answer: 1 },
      { question: 'Drain blocked when?', options: ['Always succeeds', 'If PDB would be violated', 'Never blocked'], answer: 1 },
      { question: 'PDB status field?', options: ['disruptionsAllowed', 'allowedDisruptions', 'maxDisruptions'], answer: 0 },
      { question: 'Voluntary disruption?', options: ['Node failure', 'Pod crash', 'Cluster upgrade'], answer: 2 }
    ],
    [
      { title: 'Create PDB', useCase: 'Protect app availability', code: 'kubectl create poddisruptionbudget my-pdb --selector=app=web --min-available=2', description: 'Ensures 2 Pods always running.' },
      { title: 'Check PDB Status', useCase: 'Monitor disruptions', code: 'kubectl get pdb', description: 'Shows current health and allowed disruptions.' },
      { title: 'Drain Node', useCase: 'PDB-respecting drain', code: 'kubectl drain worker-1 --ignore-daemonsets', description: 'Drains respecting PDB limits.' }
    ]
  )
];
