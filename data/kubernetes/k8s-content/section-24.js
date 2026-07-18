var { topic } = require('./helpers');

module.exports = [

  // HPA
  topic('k8s-hpa', 'Horizontal Pod Autoscaler (HPA)', 'advanced', 20,
    'HPA automatically scales the number of Pods based on observed metrics (CPU, memory, custom metrics, external metrics). Target must be scalable (Deployment, StatefulSet). Cycles every 15s with configurable stabilization windows.',
    [
      'Automatically adjusts replica count based on metrics',
      'Metrics: CPU, memory, custom (Prometheus), external (SQS, Pub/Sub)',
      'Stabilization window prevents flapping (default 5 min scale-down)',
      'Algorithm: desiredReplicas = ceil(currentReplicas * (currentMetric / desiredMetric))'
    ],
    [
      { heading: 'Metrics Types', text: 'ResourceMetric: uses metrics-server for CPU/memory per Pod. PodMetric: custom per-Pod metrics from Prometheus adapter. ObjectMetric: per-object (Ingress requests/second). ExternalMetric: from external systems (AWS SQS queue depth).' },
      { heading: 'Scaling Algorithm', text: 'desiredReplicas = ceil[currentReplicas * (currentMetricValue / desiredMetricValue)]. Averaging period: default 15s for CPU, 60s for memory. Scale-up is faster, scale-down uses stabilization window. behavior field allows custom policies: stabilizationWindowSeconds, selectPolicy (Max, Min, Disabled).' }
    ],
    [
      { question: 'What is HPA?', answer: 'Automatically scales replicas based on observed metrics.' },
      { question: 'Supported metrics?', answer: 'CPU, memory, custom (Prometheus), external (SQS, Pub/Sub).' },
      { question: 'Scale-down stabilization?', answer: 'Default 5 minutes to prevent flapping.' },
      { question: 'How is desired replicas calculated?', answer: 'ceil(currentReplicas * currentMetric / desiredMetric).' }
    ],
    [
      { question: 'HPA target must be?', options: ['Any resource', 'Scalable (Deployment, StatefulSet)', 'Pod only'], answer: 1 },
      { question: 'Scale-down stabilization default?', options: ['1 min', '3 min', '5 min'], answer: 2 },
      { question: 'HPA requires?', options: ['kubelet', 'metrics-server or adapter', 'CoreDNS'], answer: 1 },
      { question: 'HPA behavior field?', options: ['policies', 'stabilizationWindow', 'Both'], answer: 2 }
    ],
    [
      { title: 'Create HPA', useCase: 'CPU-based autoscaling', code: 'kubectl autoscale deployment web --cpu-percent=50 --min=3 --max=10', description: 'HPA scales web between 3-10 replicas.' },
      { title: 'View HPA Status', useCase: 'Check current metrics', code: 'kubectl get hpa -w', description: 'Watches HPA metrics and target.' },
      { title: 'Custom Metrics HPA', useCase: 'Scale on request rate', code: 'kubectl apply -f hpa-custom.yaml', description: 'HPA with Prometheus custom metric.' }
    ]
  ),

  // VPA
  topic('k8s-vpa', 'Vertical Pod Autoscaler (VPA)', 'advanced', 20,
    'VPA automatically adjusts CPU and memory requests/limits for Pods. It recommends optimal resource allocations and can apply them automatically (with Pod restart). Use for applications with variable resource usage. VPA + HPA are mutually exclusive on the same metric.',
    [
      'Automatically adjusts CPU/memory requests/limits',
      'Modes: Off (recommend), Auto (apply + restart), Initial (only at creation), Recreate (restart on change)',
      'Recommender: updater (evicts Pods), admission controller (sets resources)',
      'Not compatible with HPA on CPU/memory'
    ],
    [
      { heading: 'Components', text: 'Recommender: reads historical/m real metrics, computes recommendations. Updater: evicts Pods with resource recommendations outside threshold. Admission Controller: sets resources on Pod creation. VPA object: target Container, updateMode, resourcePolicy.' },
      { heading: 'Recommendation Types', text: 'lowerBound: minimum safe. target: recommended. uncappedTarget: without limits. upperBound: maximum safe. VPA sets requests to target, limits proportional to requests. Eviction: updater evicts Pods if recommendation deviates by >10% from current.' }
    ],
    [
      { question: 'What is VPA?', answer: 'Automatically adjusts container resource requests and limits.' },
      { question: 'VPA modes?', answer: 'Off, Auto, Initial, Recreate.' },
      { question: 'VPA vs HPA?', answer: 'Mutually exclusive on the same metric. VPA vertical, HPA horizontal.' },
      { question: 'VPA components?', answer: 'Recommender, Updater, Admission Controller.' }
    ],
    [
      { question: 'VPA mode that restarts Pods?', options: ['Off', 'Auto', 'Initial', 'Recreate'], answer: 3 },
      { question: 'VPA + HPA on CPU?', options: ['Compatible', 'Mutually exclusive', 'Recommended'], answer: 1 },
      { question: 'VPA updates resources by?', options: ['Scaling replicas', 'Evicting + resetting resources', 'Changing node size'], answer: 1 },
      { question: 'VPA recommender uses?', options: ['Kubernetes events', 'Historical metrics', 'Node stats'], answer: 1 }
    ],
    [
      { title: 'Install VPA', useCase: 'Enable vertical scaling', code: 'git clone https://github.com/kubernetes/autoscaler.git;\n./autoscaler/vertical-pod-autoscaler/hack/vpa-up.sh', description: 'Installs VPA components.' },
      { title: 'Create VPA', useCase: 'Recommend resources', code: 'kubectl apply -f vpa.yaml', description: 'Creates VPA in Auto mode.' },
      { title: 'View Recommendations', useCase: 'Check target requests', code: 'kubectl describe vpa my-app-vpa', description: 'Shows CPU and memory recommendations.' }
    ]
  ),

  // Cluster Autoscaler
  topic('k8s-cluster-autoscaler', 'Cluster Autoscaler', 'advanced', 15,
    'Cluster Autoscaler automatically adjusts the cluster size (adds/removes nodes) based on Pod scheduling needs. It scales up when Pods cannot be scheduled (resource shortage) and scales down when nodes are underutilized.',
    [
      'Automatically adds/removes nodes based on resource needs',
      'Scale-up: triggers when Pods are Pending (resource shortage)',
      'Scale-down: nodes with <50% utilization for >10 min',
      'Works with cloud node groups (AWS ASG, Azure VMSS, GCP MIG)'
    ],
    [
      { heading: 'Scale-Up', text: 'Pod stays Pending (insufficient resources). CA triggers: identifies which node group needs scaling. Cloud provider creates new node. Node joins cluster, scheduler places Pods. PDB and node taints considered.' },
      { heading: 'Scale-Down', text: 'Node candidates: utilization <50% (CPU+memory) for >10 min, and all Pods schedulable elsewhere. Exceptions: DaemonSet, critical Pods, Pods with PDB, local storage Pods. CA scales down one node at a time.' }
    ],
    [
      { question: 'What is Cluster Autoscaler?', answer: 'Automatically adds/removes nodes based on Pod scheduling needs.' },
      { question: 'Scale-up trigger?', answer: 'Pending Pods due to insufficient resources.' },
      { question: 'Scale-down threshold?', answer: 'Node utilization <50% for >10 minutes.' },
      { question: 'Cloud integration?', answer: 'AWS ASG, Azure VMSS, GCP MIG, etc.' }
    ],
    [
      { question: 'CA scales up when?', options: ['CPU >80%', 'Pods Pending', 'Memory >90%'], answer: 1 },
      { question: 'Scale-down threshold?', options: ['<30%', '<50%', '<70%'], answer: 1 },
      { question: 'DaemonSet Pods?', options: ['Evicted on scale-down', 'Block scale-down', 'Recreated'], answer: 1 },
      { question: 'CA needs?', options: ['kubelet', 'Cloud provider integration', 'CoreDNS'], answer: 1 }
    ],
    [
      { title: 'Deploy CA on AWS', useCase: 'Autoscale nodes', code: 'kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml', description: 'Deploys CA for AWS.' },
      { title: 'Check CA Logs', useCase: 'Monitor scaling actions', code: 'kubectl logs -n kube-system deployment/cluster-autoscaler | tail -50', description: 'Shows scaling events.' }
    ]
  ),

  // Manual Scaling
  topic('k8s-scaling-manual', 'Manual Scaling', 'beginner', 5,
    'Manual scaling adjusts the replica count of a Deployment, StatefulSet, or ReplicaSet using kubectl scale. The controller then creates or removes Pods to match the desired count.',
    [
      'kubectl scale deployment/<name> --replicas=N',
      'Also: kubectl scale statefulset/<name>, replicaset/<name>',
      'HPA can override manual scale if configured',
      'Scaling down: highest ordinal Pods removed'
    ],
    [
      { heading: 'Scale Up/Down', text: 'Scale up: controller creates new Pods matching template. Scale down: controller deletes Pods (high-numbered ordinals for StatefulSet). Rollout restart also refreshes Pods. Scaling does NOT create a new Deployment revision.' },
      { heading: 'HPA Interaction', text: 'If HPA is configured, it will automatically adjust replicas. Manual scale is overridden by HPA on next evaluation cycle (15s). To use manual scale, delete or disable the HPA first.' }
    ],
    [
      { question: 'How to manually scale?', answer: 'kubectl scale deployment/<name> --replicas=N' },
      { question: 'Does scaling create a revision?', answer: 'No. Only Pod template changes create revisions.' },
      { question: 'HPA interaction?', answer: 'HPA overrides manual scale on next cycle.' },
      { question: 'StatefulSet scale-down order?', answer: 'Highest ordinal Pods removed first.' }
    ],
    [
      { question: 'Scale command?', options: ['kubectl scale', 'kubectl resize', 'kubectl replicas'], answer: 0 },
      { question: 'Scaling creates revision?', options: ['Yes', 'No'], answer: 1 },
      { question: 'HPA + manual scale?', options: ['HPA wins', 'Manual wins', 'Conflict error'], answer: 0 },
      { question: 'StatefulSet removes?', options: ['Random Pod', 'Highest ordinal first', 'Lowest ordinal'], answer: 1 }
    ],
    [
      { title: 'Scale Deployment', useCase: 'Increase replicas', code: 'kubectl scale deployment web --replicas=5', description: 'Scales to 5 replicas.' },
      { title: 'Scale Down', useCase: 'Reduce replicas', code: 'kubectl scale deployment web --replicas=2', description: 'Scales down to 2 replicas.' },
      { title: 'Scale StatefulSet', useCase: 'Scale stateful app', code: 'kubectl scale statefulset db --replicas=3', description: 'Scales StatefulSet.' }
    ]
  ),

  // Auto Scaling
  topic('k8s-auto-scaling', 'Auto Scaling', 'advanced', 15,
    'Auto scaling combines HPA (Pod-level), VPA (container resources), and Cluster Autoscaler (node-level) for comprehensive elasticity. Together, they adapt the entire cluster to workload demands automatically.',
    [
      'HPA: Pod count scaling based on metrics',
      'VPA: Container resource adjustments',
      'Cluster Autoscaler: Node count scaling',
      'Best practice: HPA + CA together, VPA on non-HPA workloads'
    ],
    [
      { heading: 'Scaling Layers', text: 'Pod-level: HPA changes replicas. Container-level: VPA changes resources. Node-level: CA adds/removes nodes. CA works with HPA (Pods pending due to resource shortage). VPA and HPA on same metric = conflict (use VPA for sidecars, HPA for main).' },
      { heading: 'Configuration', text: 'HPA: metrics, min/max replicas, behavior (stabilization, policies). CA: min/max size per node group, scale-down delay, unneeded time. VPA: updateMode, resourcePolicy (min/max allowed). Metrics sources: metrics-server, Prometheus adapter.' }
    ],
    [
      { question: 'Kubernetes auto scaling layers?', answer: 'HPA (Pods), VPA (container resources), CA (nodes).' },
      { question: 'HPA + CA together?', answer: 'Yes, they complement each other. CA handles node-level, HPA handles Pod-level.' },
      { question: 'VPA + HPA on same metric?', answer: 'Conflict. VPA adjusts resources, HPA adjusts replicas — incompatible.' },
      { question: 'Metrics-server provides?', answer: 'Resource metrics (CPU/memory) for HPA and VPA recommender.' }
    ],
    [
      { question: 'Auto scaling NOT supported by?', options: ['HPA', 'VPA', 'CA', 'Kubelet'], answer: 3 },
      { question: 'Metrics-server provides?', options: ['Custom metrics', 'Resource metrics', 'External metrics'], answer: 1 },
      { question: 'VPA + HPA on same metric?', options: ['Compatible', 'Incompatible', 'Recommended'], answer: 1 },
      { question: 'CA handles?', options: ['Pod count', 'Node count', 'Container resources'], answer: 1 }
    ],
    [
      { title: 'Full Auto Scaling Setup', useCase: 'Configure all layers', code: 'kubectl autoscale deployment web --cpu-percent=50 --min=3 --max=10;\nkubectl apply -f vpa.yaml;\n# Cluster Autoscaler deployed separately per cloud', description: 'Sets up HPA + VPA for app.' }
    ]
  )
];
