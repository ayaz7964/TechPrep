var { topic } = require('./helpers');

module.exports = [

  // ReplicaSet
  topic('k8s-replicaset', 'ReplicaSet', 'beginner', 10,
    'A ReplicaSet ensures a specified number of Pod replicas are running. It is the self-healing mechanism — if a Pod crashes or is deleted, the ReplicaSet creates a replacement. Deployments manage ReplicaSets for declarative updates.',
    [
      'Maintains stable set of replica Pods',
      'Uses label selectors (matchLabels, matchExpressions) to manage Pods',
      'Deployments create and manage ReplicaSets',
      'Self-healing: replaces failed or deleted Pods'
    ],
    [
      { heading: 'Selector Types', text: 'Equality-based: matchLabels (app=nginx). Set-based: matchExpressions with In, NotIn, Exists, DoesNotExist operators. All selected Pods must match the selector. Only one ReplicaSet should manage those Pods.' },
      { heading: 'Ownership & Deployments', text: 'Deployments create ReplicaSets with unique hashes. Rolling updates create new RS (scale up) while old RS scales down. Rollback: scale old RS back up, new RS down.' }
    ],
    [
      { question: 'What is a ReplicaSet?', answer: 'Ensures specified number of Pod replicas running. Self-healing.' },
      { question: 'How does RS find Pods?', answer: 'Label selectors: matchLabels (exact) and matchExpressions (set-based).' },
      { question: 'Why not use ReplicaSet directly?', answer: 'Deployments provide declarative updates, rollbacks, pause/resume.' },
      { question: 'Delete ReplicaSet with cascade?', answer: 'Managed Pods are deleted (unless --cascade=orphan).' }
    ],
    [
      { question: 'ReplicaSet selectors?', options: ['matchLabels only', 'matchLabels and matchExpressions', 'matchNames'], answer: 1 },
      { question: 'Scale RS command?', options: ['kubectl scale', 'kubectl resize', 'kubectl update'], answer: 0 },
      { question: 'Deployment creates RS with?', options: ['Random name', 'Unique hash', 'Ordinal index'], answer: 1 },
      { question: 'Cascade delete?', options: ['Deletes Pods too', 'Orphans Pods', 'Only if --cascade specified'], answer: 0 }
    ],
    [
      { title: 'Scale ReplicaSet', useCase: 'Change replica count', code: 'kubectl scale replicaset my-rs --replicas=5', description: 'Scales to 5 replicas.' },
      { title: 'Check ReplicaSet Status', useCase: 'Verify counts', code: 'kubectl get replicaset', description: 'Shows Desired, Current, Ready.' },
      { title: 'Delete ReplicaSet', useCase: 'Remove with Pods', code: 'kubectl delete replicaset my-rs', description: 'Deletes RS and Pods.' }
    ]
  ),

  // Deployment
  topic('k8s-deployment', 'Deployment', 'beginner', 10,
    'A Deployment provides declarative updates for Pods via ReplicaSets. Most common workload controller. Supports rolling updates, rollbacks, scaling, and pause/resume. The default strategy is RollingUpdate with maxSurge and maxUnavailable.',
    [
      'Declarative updates for Pods via ReplicaSets',
      'Default strategy: RollingUpdate (maxSurge=25%, maxUnavailable=25%)',
      'kubectl rollout undo for rollbacks',
      'Pause/resume for staged rollouts'
    ],
    [
      { heading: 'Rolling Update', text: 'RollingUpdate replaces Pods incrementally. maxSurge (25%): extra Pods above desired. maxUnavailable (25%): Pods that can be down. Recreate: kills all before creating new (downtime).' },
      { heading: 'Rollbacks', text: 'Each template change creates a new revision (ControllerRevision). kubectl rollout undo reverts. --to-revision for specific version. revisionHistoryLimit (default 10).' }
    ],
    [
      { question: 'What is a Deployment?', answer: 'Declarative update controller for Pods via ReplicaSets.' },
      { question: 'Default update strategy?', answer: 'RollingUpdate with maxSurge=25%, maxUnavailable=25%.' },
      { question: 'View rollout status?', answer: 'kubectl rollout status deployment/<name>' },
      { question: 'How to rollback?', answer: 'kubectl rollout undo deployment/<name>' }
    ],
    [
      { question: 'Deployment creates?', options: ['Pod', 'ReplicaSet', 'DaemonSet'], answer: 1 },
      { question: 'Default maxSurge?', options: ['10%', '25%', '50%'], answer: 1 },
      { question: 'Rollout revisions stored in?', options: ['ConfigMap', 'ControllerRevision', 'Secret'], answer: 1 },
      { question: 'Pause command?', options: ['kubectl rollout pause', 'kubectl pause', 'kubectl stop'], answer: 0 }
    ],
    [
      { title: 'Create Deployment', useCase: 'Deploy an app', code: 'kubectl create deployment nginx --image=nginx:1.25 --replicas=3', description: 'Creates Deployment with 3 replicas.' },
      { title: 'Update Image', useCase: 'Trigger rollout', code: 'kubectl set image deployment/nginx nginx=nginx:1.26', description: 'Triggers rolling update.' },
      { title: 'Rollback', useCase: 'Undo bad release', code: 'kubectl rollout undo deployment/nginx', description: 'Rolls back to previous revision.' }
    ]
  ),

  // StatefulSet
  topic('k8s-statefulset', 'StatefulSet', 'intermediate', 15,
    'A StatefulSet manages stateful applications with stable, unique network identities and persistent storage. Pods get ordinal indices (pod-0, pod-1). volumeClaimTemplates create per-replica PVCs. Requires Headless Service.',
    [
      'Stable network identity with ordinal index (pod-0, pod-1)',
      'volumeClaimTemplates: per-replica persistent storage',
      'Ordered deployment: pod-0 first, then pod-1, etc.',
      'Headless Service required for stable DNS identities'
    ],
    [
      { heading: 'Ordinal Identity', text: 'Each Pod gets hostname from StatefulSet name + ordinal (web-0, web-1). Headless Service creates SRV records per Pod. On rescheduling, Pod retains name and mounts same PVC.' },
      { heading: 'Ordered Operations', text: 'podManagementPolicy: OrderedReady (default, sequential) or Parallel. OnUpdate strategy: RollingUpdate (default) or OnDelete. Partition parameter for canary updates (ordinal >= partition).' }
    ],
    [
      { question: 'What is a StatefulSet?', answer: 'Manages stateful apps with stable identity and persistent storage per replica.' },
      { question: 'How are Pods identified?', answer: 'Ordinal index (pod-0, pod-1). Sticky across rescheduling.' },
      { question: 'Required Service type?', answer: 'Headless Service (clusterIP: None).' },
      { question: 'What is volumeClaimTemplate?', answer: 'Template for per-replica PVCs.' }
    ],
    [
      { question: 'Stable identity via?', options: ['Random hash', 'Ordinal index', 'Label selector'], answer: 1 },
      { question: 'Required Service?', options: ['ClusterIP', 'Headless', 'LoadBalancer'], answer: 1 },
      { question: 'Default podManagementPolicy?', options: ['Parallel', 'OrderedReady', 'Random'], answer: 1 },
      { question: 'Scale-down removes?', options: ['Random Pod', 'Highest ordinal', 'Lowest ordinal'], answer: 1 }
    ],
    [
      { title: 'Scale StatefulSet', useCase: 'Add replicas', code: 'kubectl scale statefulset web --replicas=5', description: 'Scales to 5 replicas in order.' },
      { title: 'Check Pod DNS', useCase: 'Verify stable identity', code: 'kubectl run test --image=busybox --rm -it -- nslookup web-0.web-svc', description: 'Shows stable DNS.' }
    ]
  ),

  // DaemonSet
  topic('k8s-daemonset', 'DaemonSet', 'intermediate', 15,
    'A DaemonSet runs one Pod per Node. As Nodes join, Pods are added. As Nodes are removed, Pods are garbage collected. Used for log collection (Fluentd), monitoring (Node Exporter), networking (kube-proxy, Calico), and storage (CSI).',
    [
      'One Pod per Node, auto-added on Node join',
      'Scheduling: nodeSelector, affinity, taints/tolerations',
      'RollingUpdate strategy for updating DaemonSets',
      'Used for cluster infrastructure: monitoring, logging, networking'
    ],
    [
      { heading: 'Scheduling', text: 'Default: runs on every Node. nodeSelector restricts. Affinity: advanced selection. Tolerations: allow scheduling on control-plane nodes. updateStrategy: RollingUpdate (default) with maxSurge=1, maxUnavailable=1.' },
      { heading: 'Use Cases', text: 'Logging: Fluentd/Filebeat per node. Monitoring: Prometheus Node Exporter. Networking: Calico, Flannel, kube-proxy as DaemonSets. Storage: CSI driver daemons. Device plugins: GPU, FPGA.' }
    ],
    [
      { question: 'What is a DaemonSet?', answer: 'Runs one Pod per Node. Pods added/removed as Nodes join/leave.' },
      { question: 'Which nodes run the Pod?', answer: 'All matching nodes (nodeSelector, affinity, tolerations).' },
      { question: 'Use cases?', answer: 'Monitoring, logging, networking, storage, device plugins.' },
      { question: 'Default update strategy?', answer: 'RollingUpdate (or OnDelete).' }
    ],
    [
      { question: 'DaemonSet runs on?', options: ['One node', 'All matching nodes', 'Control plane'], answer: 1 },
      { question: 'Use case?', options: ['Web servers', 'Node monitoring', 'Databases'], answer: 1 },
      { question: 'Default update strategy?', options: ['Recreate', 'RollingUpdate', 'OnDelete'], answer: 1 },
      { question: 'Needs toleration for?', options: ['Worker nodes', 'Control plane nodes', 'All nodes'], answer: 1 }
    ],
    [
      { title: 'List DaemonSets', useCase: 'View cluster daemons', code: 'kubectl get daemonsets --all-namespaces', description: 'Lists all DaemonSets.' },
      { title: 'Check DaemonSet Status', useCase: 'Verify node coverage', code: 'kubectl describe daemonset fluentd', description: 'Shows desired/current/ready.' }
    ]
  ),

  // CronJob
  topic('k8s-cronjob', 'CronJob', 'beginner', 10,
    'A CronJob runs Jobs on a schedule using cron expressions. Supports concurrency policies (Allow, Forbid, Replace), starting deadlines, and history limits. Creates a Job object for each scheduled execution.',
    [
      'Runs Jobs on recurring schedule (cron expression)',
      'concurrencyPolicy: Allow (default), Forbid, Replace',
      'startingDeadlineSeconds: grace for missed schedules',
      'successfulJobsHistoryLimit (3) and failedJobsHistoryLimit (1)'
    ],
    [
      { heading: 'Schedule Format', text: 'Standard 5-field cron: minute hour day month weekday. Extended with timeZone field. Special entries: @yearly, @monthly, @weekly, @daily, @hourly.' },
      { heading: 'Job Tracking', text: 'Each execution creates a Job object. suspended: true pauses scheduling. If CronJob misses schedule by startingDeadlineSeconds, Job is skipped.' }
    ],
    [
      { question: 'What is a CronJob?', answer: 'Runs Jobs on schedule using cron expressions.' },
      { question: 'Forbid concurrency policy?', answer: 'Skips new run if previous Job is still running.' },
      { question: 'startingDeadlineSeconds?', answer: 'Grace period for missed schedules.' },
      { question: 'How are executions tracked?', answer: 'Each execution creates a Job object.' }
    ],
    [
      { question: 'Forbid concurrency?', options: ['Allow', 'Forbid', 'Replace'], answer: 1 },
      { question: 'Default successfulJobsHistoryLimit?', options: ['1', '3', '5', '10'], answer: 1 },
      { question: 'CronJob creates?', options: ['Pods', 'Jobs', 'Deployments'], answer: 1 },
      { question: 'Suspend scheduling?', options: ['suspended: true', 'paused: true', 'disabled: true'], answer: 0 }
    ],
    [
      { title: 'Create CronJob', useCase: 'Schedule a task', code: 'kubectl create cronjob hello --image=busybox --schedule="*/5 * * * *" -- sh -c "date"', description: 'Runs every 5 minutes.' },
      { title: 'Suspend CronJob', useCase: 'Pause executions', code: 'kubectl patch cronjob hello -p \'{"spec":{"suspend":true}}\'', description: 'Suspends future runs.' }
    ]
  ),

  // Ingress
  topic('k8s-ingress', 'Ingress', 'intermediate', 15,
    'Ingress exposes HTTP/HTTPS routes from outside the cluster to Services. An Ingress Controller must be deployed (NGINX, Traefik, etc.). Supports host/path routing, TLS termination, and default backends.',
    [
      'L7 (HTTP/HTTPS) routing to Services',
      'Requires Ingress controller (not built-in)',
      'Host-based and path-based routing rules',
      'TLS termination with Secrets'
    ],
    [
      { heading: 'Routing Rules', text: 'Host-based: api.example.com routes to api Service. Path-based: /api/* routes to backend. Longest matching path wins. Wildcard hosts (*.example.com) supported.' },
      { heading: 'TLS Termination', text: 'spec.tls: [{ hosts: ["example.com"], secretName: example-tls }]. Secret must be in same namespace. cert-manager automates Let\'s Encrypt certificates.' }
    ],
    [
      { question: 'What is Ingress?', answer: 'L7 routing rules for HTTP/HTTPS traffic to Services.' },
      { question: 'Ingress vs LoadBalancer?', answer: 'Ingress: L7, host/path routing, TLS. LoadBalancer: L4.' },
      { question: 'Default backend?', answer: 'Fallback Service for unmatched requests.' },
      { question: 'Ingress controller examples?', answer: 'NGINX, Traefik, HAProxy, AWS ALB, GCE.' }
    ],
    [
      { question: 'Ingress layer?', options: ['L4', 'L7', 'L3'], answer: 1 },
      { question: 'Ingress without controller?', options: ['Works', 'Does not work', 'Limited'], answer: 1 },
      { question: 'Default backend serves?', options: ['Matched hosts', 'Unmatched requests', 'All traffic'], answer: 1 },
      { question: 'TLS source?', options: ['ConfigMap', 'Secret', 'Ingress annotation'], answer: 1 }
    ],
    [
      { title: 'Create Ingress', useCase: 'Expose service', code: 'kubectl create ingress my-ingress --rule="example.com/*=my-svc:80"', description: 'Creates simple Ingress rule.' },
      { title: 'Add TLS', useCase: 'Enable HTTPS', code: 'kubectl create ingress secure --rule="example.com/*=my-svc:80,tls=my-tls"', description: 'Adds TLS termination.' }
    ]
  ),

  // Network Policy
  topic('k8s-network-policy', 'Network Policy', 'intermediate', 15,
    'Network Policy specifies how Pods communicate. It is a Pod-level firewall controlling ingress and egress based on labels, IP blocks, and ports. Requires a CNI plugin supporting Network Policy (Calico, Cilium).',
    [
      'Pod-level firewall for ingress and egress traffic',
      'Selectors: podSelector, namespaceSelector, ipBlock',
      'Requires CNI with Network Policy support',
      'Default: all traffic allowed. Adding a policy restricts.'
    ],
    [
      { heading: 'Policy Rules', text: 'podSelector targets Pods. Ingress rules: from (ipBlock, namespaceSelector, podSelector) with ports. Egress rules: to destinations with ports. policyTypes: ["Ingress", "Egress"]. Empty from/to = all allowed.' },
      { heading: 'Default Deny Patterns', text: 'Deny all ingress: empty podSelector: {} with no ingress rules. Deny all egress: empty podSelector with no egress rules. Allow specific: add targeted from/to rules.' }
    ],
    [
      { question: 'What is Network Policy?', answer: 'Pod-level firewall controlling ingress/egress traffic.' },
      { question: 'When does it take effect?', answer: 'Only with CNI plugin supporting it (Calico, Cilium).' },
      { question: 'Default behavior?', answer: 'All traffic allowed. Adding any policy restricts to defined rules.' },
      { question: 'How to isolate a namespace?', answer: 'Default-deny policy with podSelector: {} and no ingress rules.' }
    ],
    [
      { question: 'Network Policy requires?', options: ['kube-proxy', 'CNI with policy support', 'Ingress controller'], answer: 1 },
      { question: 'Default traffic?', options: ['All denied', 'All allowed', 'Mixed'], answer: 1 },
      { question: 'Not a valid peer?', options: ['podSelector', 'namespaceSelector', 'nodeSelector', 'ipBlock'], answer: 2 },
      { question: 'Allow specific namespace?', options: ['namespaceSelector with matchLabels', 'ipBlock', 'Both'], answer: 0 }
    ],
    [
      { title: 'Deny All Ingress', useCase: 'Isolate Pods', code: 'kubectl apply -f deny-all.yaml', description: 'Default-deny ingress policy.' },
      { title: 'Allow Specific', useCase: 'Allow from frontend', code: 'kubectl apply -f allow-frontend.yaml', description: 'Allows ingress from frontend Pods.' },
      { title: 'View Policies', useCase: 'List rules', code: 'kubectl get networkpolicies', description: 'Lists all NetworkPolicies.' }
    ]
  ),

  // Service Account
  topic('k8s-service-account', 'Service Account', 'intermediate', 10,
    'A Service Account provides identity for Pods to authenticate with the Kubernetes API. Each namespace has a default SA. Tokens mounted as volumes. Used with RBAC for fine-grained permissions.',
    [
      'Identity for Pods to authenticate with Kubernetes API',
      'Each namespace has a default Service Account',
      'Token mounted at /var/run/secrets/kubernetes.io/serviceaccount',
      'Used with RBAC (Role, RoleBinding, ClusterRole, ClusterRoleBinding)'
    ],
    [
      { heading: 'Token Management', text: 'Original: SA creates Secret with long-lived JWT. TokenRequest API: time-bound, audience-scoped tokens. Projected volumes: automated distribution (default 1 hour expiry). automountServiceAccountToken: false disables auto-mounting.' },
      { heading: 'RBAC Integration', text: 'Role/ClusterRole grants permissions. RoleBinding links SA to Role in namespace. ClusterRoleBinding for cluster-scoped. serviceAccountName in Pod spec assigns SA.' }
    ],
    [
      { question: 'What is a Service Account?', answer: 'Identity for Pod authentication to Kubernetes API.' },
      { question: 'Mount path?', answer: '/var/run/secrets/kubernetes.io/serviceaccount' },
      { question: 'Default SA name?', answer: '"default" in each namespace.' },
      { question: 'Assign to Pod?', answer: 'serviceAccountName field in Pod spec.' }
    ],
    [
      { question: 'SA token path?', options: ['/etc/kubernetes', '/var/run/secrets/kubernetes.io/serviceaccount', '/secrets'], answer: 1 },
      { question: 'Default SA?', options: ['default', 'kubernetes', 'admin'], answer: 0 },
      { question: 'SA scope?', options: ['Cluster', 'Namespace', 'Node'], answer: 1 },
      { question: 'Pod field?', options: ['serviceAccount', 'serviceAccountName', 'accountName'], answer: 1 }
    ],
    [
      { title: 'Create SA', useCase: 'Create Pod identity', code: 'kubectl create serviceaccount my-sa', description: 'Creates SA with token Secret.' },
      { title: 'Assign to Pod', useCase: 'Use custom identity', code: 'kubectl run pod --image=nginx --serviceaccount=my-sa', description: 'Assigns SA to Pod.' },
      { title: 'View SA', useCase: 'List SAs', code: 'kubectl get serviceaccounts', description: 'Lists all ServiceAccounts.' }
    ]
  ),

  // ResourceQuota
  topic('k8s-resource-quota', 'ResourceQuota', 'intermediate', 10,
    'ResourceQuota limits aggregate resource consumption per Namespace. Prevents a namespace from exhausting cluster resources. Limits: compute (CPU, memory), storage (PVCs), and object counts (Pods, Services).',
    [
      'Namespace-level aggregate resource limits',
      'Compute: requests.cpu, requests.memory, limits.cpu, limits.memory',
      'Object counts: count/pods, count/services, count/configmaps',
      'Scopes: BestEffort, NotTerminating, Terminating'
    ],
    [
      { heading: 'Quota Scopes', text: 'BestEffort: Pods with only BestEffort QoS. NotBestEffort: Burstable or Guaranteed. Terminating: activeDeadlineSeconds >= 0. NotTerminating: no deadline. scopeSelector for AND logic.' },
      { heading: 'Enforcement', text: 'Validated on resource creation. Exhausted = 403 Forbidden. Must exist before resources to enforce.' }
    ],
    [
      { question: 'What is ResourceQuota?', answer: 'Namespace-level aggregate resource and object count limits.' },
      { question: 'Exhausted quota?', answer: '403 Forbidden on resource creation.' },
      { question: 'BestEffort scope?', answer: 'Applies to Pods without resource requests/limits.' },
      { question: 'Limited resources?', answer: 'CPU, memory, storage, PVCs, object counts.' }
    ],
    [
      { question: 'BestEffort scope?', options: ['NotTerminating', 'BestEffort', 'Terminating'], answer: 1 },
      { question: 'Exhausted quota returns?', options: ['200 OK', '403 Forbidden', '429 Too Many'], answer: 1 },
      { question: 'Count of Pods uses?', options: ['count/pods', 'podsCount', 'count: pods'], answer: 0 },
      { question: 'Quota scope?', options: ['Cluster', 'Namespace', 'Node'], answer: 1 }
    ],
    [
      { title: 'Create ResourceQuota', useCase: 'Limit namespace', code: 'kubectl create quota my-quota --hard=cpu=4,memory=8Gi,pods=10', description: 'Creates compute and Pod count limits.' },
      { title: 'View Quota', useCase: 'Check usage', code: 'kubectl get resourcequotas', description: 'Shows limits and current usage.' }
    ]
  ),

  // LimitRange
  topic('k8s-limit-range', 'LimitRange', 'intermediate', 10,
    'LimitRange sets default, minimum, and maximum resource constraints per container/Pod in a namespace. Complement to ResourceQuota (aggregate). Applies at resource creation time. Immutable existing Pods.',
    [
      'Default / min / max resource constraints per namespace',
      'Default requests/limits for containers without explicit values',
      'Applies at creation time only',
      'Complementary to ResourceQuota'
    ],
    [
      { heading: 'Limit Types', text: 'Container: default (limits), defaultRequest, min, max, maxLimitRequestRatio. Pod: min/max for Pod-level resources. maxLimitRequestRatio=3 means request=1, limit <= 3.' },
      { heading: 'Enforcement', text: 'Admission controller validates new containers. Exceeds max or below min = rejected. No limits and no default = no enforcement. Existing Pods not checked.' }
    ],
    [
      { question: 'What is a LimitRange?', answer: 'Default, min, max resource constraints per container/Pod in namespace.' },
      { question: 'When does it apply?', answer: 'At creation time. Existing resources unchanged.' },
      { question: 'vs ResourceQuota?', answer: 'LimitRange: per-container. ResourceQuota: aggregate namespace.' },
      { question: 'maxLimitRequestRatio?', answer: 'Max ratio of limit to request for compute resources.' }
    ],
    [
      { question: 'LimitRange applies?', options: ['At creation only', 'Continuously', 'On schedule'], answer: 0 },
      { question: 'Type for containers?', options: ['Pod', 'Container', 'Node'], answer: 1 },
      { question: 'Default field?', options: ['request', 'default', 'limit'], answer: 1 },
      { question: 'Updated LimitRange affects?', options: ['Existing Pods', 'New Pods only', 'Both'], answer: 1 }
    ],
    [
      { title: 'Create LimitRange', useCase: 'Set defaults', code: 'kubectl apply -f limit-range.yaml', description: 'Creates default CPU/memory per container.' },
      { title: 'View LimitRanges', useCase: 'Check constraints', code: 'kubectl get limitranges', description: 'Shows defined limits.' }
    ]
  )
];
