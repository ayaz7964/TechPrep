var { topic } = require('./helpers');

module.exports = [

  // Rolling Updates
  topic('k8s-rolling-updates', 'Rolling Updates', 'intermediate', 15,
    'Rolling updates incrementally replace Pods with new ones for zero-downtime deployments. They scale up the new ReplicaSet while scaling down the old one, controlled by maxSurge and maxUnavailable.',
    [
      'Incremental Pod replacement with zero-downtime goal',
      'maxSurge (25% default): extra Pods above desired',
      'maxUnavailable (25% default): Pods that can be down',
      'kubectl rollout status and kubectl rollout undo'
    ],
    [
      { heading: 'Rolling Update Process', text: '1) Create new ReplicaSet with updated template. 2) Scale up new RS (maxSurge determines extra Pods). 3) Scale down old RS (maxUnavailable determines down Pods). 4) Repeat until all old Pods replaced. Image updates, config changes trigger rollouts.' },
      { heading: 'Progress Tracking', text: 'kubectl rollout status deployment/my-deploy shows progress. Conditions: Available (minimum healthy), Progressing (update in progress), ReplicaFailure (partial failure). If rollout hangs (failed image, probe failure), available replicas stall below desired.' }
    ],
    [
      { question: 'What is a rolling update?', answer: 'Incremental Pod replacement strategy for zero-downtime deployments.' },
      { question: 'maxSurge default?', answer: '25% — extra Pods above desired during update.' },
      { question: 'maxUnavailable default?', answer: '25% — Pods that can be unavailable during update.' },
      { question: 'How to monitor rollout?', answer: 'kubectl rollout status deployment/name and rollout history.' }
    ],
    [
      { question: 'Rolling update creates?', options: ['New Deployment', 'New ReplicaSet', 'New Service'], answer: 1 },
      { question: 'Default maxSurge?', options: ['10%', '25%', '50%'], answer: 1 },
      { question: 'Rolling update pauses when?', options: ['Never', 'Probe failure', 'Manual rollout pause'], answer: 2 },
      { question: 'Rollback reverts to?', options: ['Previous ReplicaSet', 'Original YAML', 'Git commit'], answer: 0 }
    ],
    [
      { title: 'Trigger Rolling Update', useCase: 'Deploy new version', code: 'kubectl set image deployment/nginx nginx=nginx:1.26', description: 'Triggers rolling update.' },
      { title: 'Monitor Rollout', useCase: 'Watch progress', code: 'kubectl rollout status deployment/nginx --watch', description: 'Streams update progress.' },
      { title: 'Pause Rollout', useCase: 'Halt update', code: 'kubectl rollout pause deployment/nginx', description: 'Pauses further changes.' }
    ]
  ),

  // Rollback
  topic('k8s-rollback', 'Rollback', 'intermediate', 10,
    'Rollback reverts a Deployment to a previous revision. Kubernetes maintains ControllerRevision objects for each Deployment. Rollbacks scale up the old ReplicaSet and scale down the new one. Only Pod template changes create new revisions.',
    [
      'kubectl rollout undo deployment/<name>',
      '--to-revision flag for specific revision',
      'revisionHistoryLimit controls retained revisions (default 10)',
      'Scaling does NOT create a new revision'
    ],
    [
      { heading: 'Revision History', text: 'Each Pod template change creates a new ControllerRevision. Scaling does NOT create a revision. revisionHistoryLimit (default 10) controls retention. Rollback sets template to previous revision, triggering a new rollout (creates rev N+1).' },
      { heading: 'Rollback Details', text: 'kubectl rollout undo reverts to previous revision. --to-revision=1 goes to initial. Rollback is scale up old RS, scale down new RS. Revision 1 is the initial deployment state.' }
    ],
    [
      { question: 'How to rollback?', answer: 'kubectl rollout undo deployment/<name>.' },
      { question: 'Rollback to specific revision?', answer: 'kubectl rollout undo deployment/<name> --to-revision=N.' },
      { question: 'Does scaling create a revision?', answer: 'No. Only Pod template changes create revisions.' },
      { question: 'revisionHistoryLimit default?', answer: '10 revisions retained.' }
    ],
    [
      { question: 'Rollback command?', options: ['kubectl revert', 'kubectl rollout undo', 'kubectl rollback'], answer: 1 },
      { question: 'Does scaling create revision?', options: ['Yes', 'No'], answer: 1 },
      { question: 'revisionHistoryLimit default?', options: ['3', '10', '20'], answer: 1 },
      { question: 'Rollback creates new revision?', options: ['Yes (creates rev N+1)', 'No (restores old rev directly)'], answer: 0 }
    ],
    [
      { title: 'Rollback to Previous', useCase: 'Undo last change', code: 'kubectl rollout undo deployment/nginx', description: 'Rolls back to previous revision.' },
      { title: 'Rollback to Specific Rev', useCase: 'Target specific revision', code: 'kubectl rollout undo deployment/nginx --to-revision=2', description: 'Rolls back to revision 2.' },
      { title: 'View History', useCase: 'List revisions', code: 'kubectl rollout history deployment/nginx', description: 'Shows all revisions.' }
    ]
  ),

  // Replica Management
  topic('k8s-replica-management', 'Replica Management', 'intermediate', 10,
    'Replica management covers scaling, self-healing, and maintaining desired replica counts. Controllers reconcile actual state to desired state. If Pods crash, replacement created. Scaling adjusts desired count.',
    [
      'Desired vs actual state reconciliation loop',
      'Self-healing: controller replaces failed Pods automatically',
      'Scaling: update replicas field to add/remove Pods',
      'HPA adjusts spec.replicas based on metrics'
    ],
    [
      { heading: 'Reconciliation Loop', text: 'Controller watches (list+watch), caches state (informers). Compares desired replicas to actual Pods matching selector. Creates Pods if too few, deletes if too many. Rate-limited work queue with backoff. Leader election ensures single controller acts.' },
      { heading: 'HPA Integration', text: 'HorizontalPodAutoscaler reads metrics (CPU, memory, custom) and adjusts spec.replicas. Target must be scalable (Deployment, StatefulSet). HPA cycles every 15s with scale-down stabilization window (default 5 min).' }
    ],
    [
      { question: 'What is replica management?', answer: 'Maintaining desired replica count through reconciliation and self-healing.' },
      { question: 'How do controllers maintain state?', answer: 'Reconciliation loop: watch -> compare -> act (create/delete Pods).' },
      { question: 'How does HPA relate?', answer: 'HPA reads metrics and adjusts spec.replicas on the target.' },
      { question: 'What if a Pod crashes?', answer: 'Controller detects and creates a replacement.' }
    ],
    [
      { question: 'Reconciliation is?', options: ['Manual', 'Automated loop', 'Event-driven only'], answer: 1 },
      { question: 'HPA scale-down stabilization default?', options: ['1 min', '5 min', '15 min'], answer: 1 },
      { question: 'Which is NOT a controller?', options: ['Deployment', 'ReplicaSet', 'Service', 'StatefulSet'], answer: 2 },
      { question: 'Scaling adjusts?', options: ['spec.replicas', 'spec.template', 'spec.selector'], answer: 0 }
    ],
    [
      { title: 'Scale Deployment', useCase: 'Change replica count', code: 'kubectl scale deployment nginx --replicas=5', description: 'Scales to 5 replicas.' },
      { title: 'Autoscale', useCase: 'HPA configuration', code: 'kubectl autoscale deployment nginx --cpu-percent=80 --min=3 --max=10', description: 'Creates HPA.' },
      { title: 'Check Replica Status', useCase: 'Verify Pods', code: 'kubectl get pods -l app=nginx', description: 'Lists matching Pods.' }
    ]
  ),

  // Deployment Strategy
  topic('k8s-deployment-strategy', 'Deployment Strategy', 'intermediate', 15,
    'Deployment strategies determine how new Pods replace old ones. RollingUpdate (default, zero-downtime) and Recreate (kill all, then create, causes downtime). Canary and Blue-Green are manual patterns, not built-in strategies.',
    [
      'RollingUpdate: incremental, zero-downtime, default',
      'Recreate: kill all old, then create new, downtime expected',
      'maxSurge/maxUnavailable control RollingUpdate behavior',
      'Canary and Blue-Green are manual patterns'
    ],
    [
      { heading: 'RollingUpdate Details', text: 'maxSurge (default 25%) extra Pods above desired. maxUnavailable (default 25%) Pods that can be down. Round up. Example: 10 replicas, maxSurge=3, maxUnavailable=3. During update: 10-13 total Pods, 7-10 available.' },
      { heading: 'Recreate Strategy', text: 'Kills all existing Pods before creating new ones. Simple, resource-efficient (no extra capacity), but downtime. Suitable for dev/test or batch systems where downtime acceptable. Also for systems with incompatible volumes.' }
    ],
    [
      { question: 'Kubernetes deployment strategies?', answer: 'RollingUpdate (incremental) and Recreate (kill all then create).' },
      { question: 'What strategy causes downtime?', answer: 'Recreate — all old Pods killed before new ones start.' },
      { question: 'Canary deployment?', answer: 'Manual pattern: expose new version to subset of users.' },
      { question: 'How to change strategy?', answer: 'Update spec.strategy.type in Deployment manifest.' }
    ],
    [
      { question: 'Default deployment strategy?', options: ['Recreate', 'RollingUpdate', 'Canary'], answer: 1 },
      { question: 'Recreate causes?', options: ['Zero-downtime', 'Downtime', 'No impact'], answer: 1 },
      { question: 'Canary is?', options: ['Built-in strategy', 'Manual pattern', 'Third-party tool'], answer: 1 },
      { question: 'RollingUpdate parameter?', options: ['strategy', 'maxSurge', 'updateConfig'], answer: 1 }
    ],
    [
      { title: 'Recreate Strategy', useCase: 'Simple update with downtime', code: 'kubectl apply -f deployment-recreate.yaml', description: 'Uses Recreate strategy.' },
      { title: 'Check Strategy', useCase: 'View Deployment strategy', code: 'kubectl get deployment nginx -o yaml | grep strategy', description: 'Shows current strategy.' }
    ]
  ),

  // Canary Deployment
  topic('k8s-canary-deployment', 'Canary Deployment', 'advanced', 20,
    'Canary deployment gradually shifts traffic from old to new version, starting small and ramping up if healthy. In Kubernetes, implemented via multiple Deployments, Service selectors, or Service Mesh traffic splitting.',
    [
      'Gradual traffic shift: small percentage first, then ramp',
      'Two Deployments (stable + canary) sharing one Service',
      'Service Mesh: weight-based splitting (Istio VirtualService)',
      'Flagger and Argo Rollouts automate canary promotion'
    ],
    [
      { heading: 'Service Mesh Canary', text: 'Istio VirtualService routes by weight: v1 90%, v2 10%. Adjust over time. Without mesh: use 2 Deployments, same Service. Canary replicas control traffic proportion (3 stable + 1 canary = 75/25).' },
      { heading: 'Tooling', text: 'Flagger (Weaveworks): automates canary with metrics-based promotion/rollback. Argo Rollouts: CRDs for BlueGreen and Canary with analysis and automated rollback.' }
    ],
    [
      { question: 'What is canary deployment?', answer: 'Gradually shifting traffic to new version, starting small, ramping if healthy.' },
      { question: 'How to implement in plain Kubernetes?', answer: 'Two Deployments sharing a Service. Canary has fewer replicas.' },
      { question: 'Service Mesh advantage?', answer: 'Weight-based traffic splitting without replica count manipulation.' },
      { question: 'When to rollback canary?', answer: 'When error rate, latency, or failure metrics exceed thresholds.' }
    ],
    [
      { question: 'Canary traffic starts?', options: ['Full traffic', 'Small percentage', 'No traffic'], answer: 1 },
      { question: 'Without Service Mesh, canary uses?', options: ['Ingress rules', 'Replica scaling + Service labels', 'DNS weighting'], answer: 1 },
      { question: 'Flagger is?', options: ['Built-in feature', 'Canary automation tool', 'Monitoring tool'], answer: 1 },
      { question: 'Istio canary uses?', options: ['VirtualService weight', 'Replica count', 'Node affinity'], answer: 0 }
    ],
    [
      { title: 'Promote Canary', useCase: 'Scale up canary', code: 'kubectl scale deployment/web-v2 --replicas=3 && kubectl scale deployment/web-v1 --replicas=1', description: 'Promotes canary to majority.' },
      { title: 'Rollback Canary', useCase: 'Remove canary', code: 'kubectl delete deployment web-v2', description: 'Removes canary, routes to v1 only.' }
    ]
  ),

  // Blue Green Deployment
  topic('k8s-blue-green-deployment', 'Blue Green Deployment', 'advanced', 20,
    'Blue-Green runs two identical environments (Blue=current, Green=new). Switches traffic instantly after Green is validated. Old Blue kept for instant rollback. Resource-intensive (double capacity during switch).',
    [
      'Two full environments: Blue (current), Green (new)',
      'Instant switch by updating Service selector',
      'Blue retained for instant rollback',
      'Resource-intensive: double capacity during switch'
    ],
    [
      { heading: 'Implementation', text: 'Two Deployments (app-blue, app-green) with different labels. One Service points to active version via selector. Switch: update Service selector to new version. Blue Deployment retained (scale down or keep minimal). Full validation before switch.' },
      { heading: 'Pros and Cons', text: 'Pros: instant switch, instant rollback, full validation before exposure. Cons: double resource cost during switch, database schema compatibility needed. Argo Rollouts automates this with analysis.' }
    ],
    [
      { question: 'What is Blue-Green?', answer: 'Two environments, instant switch. Blue=current, Green=new.' },
      { question: 'How is switch performed?', answer: 'Update Service selector from blue to green labels.' },
      { question: 'Blue Green vs Canary?', answer: 'Blue Green = instant all-or-nothing. Canary = gradual.' },
      { question: 'Main disadvantage?', answer: 'Double resource cost — both environments fully provisioned.' }
    ],
    [
      { question: 'Blue-Green switch uses?', options: ['Gradual traffic', 'Instant selector update', 'DNS change'], answer: 1 },
      { question: 'Blue-Green cost?', options: ['Same as single', 'Double during switch', 'Triple'], answer: 1 },
      { question: 'Rollback in Blue-Green?', options: ['Redeploy old', 'Switch Service back to blue', 'Rollback command'], answer: 1 },
      { question: 'Argo Rollouts provides?', options: ['Only Canary', 'BlueGreen + Canary', 'Only Recreate'], answer: 1 }
    ],
    [
      { title: 'Blue-Green Switch', useCase: 'Switch to green', code: 'kubectl patch service my-app -p \'{"spec":{"selector":{"version":"green"}}}\'', description: 'Switches traffic to green.' },
      { title: 'Rollback Blue-Green', useCase: 'Revert to blue', code: 'kubectl patch service my-app -p \'{"spec":{"selector":{"version":"blue"}}}\'', description: 'Instantly reverts to blue.' },
      { title: 'Clean Up Old', useCase: 'Remove blue', code: 'kubectl delete deployment app-blue', description: 'Cleans up old deployment.' }
    ]
  )
];
