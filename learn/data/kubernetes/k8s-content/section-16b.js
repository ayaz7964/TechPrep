var { topic } = require('./helpers');

module.exports = [

  // Job
  topic('k8s-job', 'Job', 'beginner', 10,
    'A Job creates Pods that run a finite task to completion. Used for batch processing, migrations, backups, and workloads that terminate. Tracks completions with configurable retries, timeouts, and parallelism.',
    [
      'Runs Pods to successful completion then stops',
      'completions (default 1) and parallelism (default 1) control execution',
      'backoffLimit (default 6) retries with exponential backoff',
      'activeDeadlineSeconds sets hard time limit'
    ],
    [
      { heading: 'Configuration', text: 'Non-parallel (completions=1, parallelism=1). Parallel fixed count (completions=N). Work queue pattern (completions=1, parallelism=N). restartPolicy must be OnFailure or Never.' },
      { heading: 'Failure Handling', text: 'Failed Pods retried with exponential backoff up to backoffLimit. ttlSecondsAfterFinished auto-deletes completed Jobs. Without it, Jobs remain indefinitely.' }
    ],
    [
      { question: 'What is a Job?', answer: 'Creates Pods running finite tasks to completion. For batch processing, migrations, backups.' },
      { question: 'What is backoffLimit?', answer: 'Retries before failure (default 6). Exponential backoff starting at 10 seconds.' },
      { question: 'What is activeDeadlineSeconds?', answer: 'Hard time limit — exceeded Jobs are marked Failed and Pods terminated.' },
      { question: 'Completions vs parallelism?', answer: 'completions: total Pod completions needed. parallelism: max concurrent Pods.' }
    ],
    [
      { question: 'Job completes when?', options: ['All Pods running', 'Specified completions exit 0', 'First Pod exits 0'], answer: 1, explanation: 'Complete when specified Pods exit with code 0.' },
      { question: 'Default backoffLimit?', options: ['2', '4', '6', '10'], answer: 2, explanation: 'Default 6 retries.' },
      { question: 'Adds scheduling to Jobs?', options: ['Deployment', 'DaemonSet', 'CronJob', 'StatefulSet'], answer: 2, explanation: 'CronJob adds cron scheduling.' },
      { question: 'Job restart policies?', options: ['Always', 'OnFailure or Never', 'UnlessStopped'], answer: 1, explanation: 'OnFailure and Never.' }
    ],
    [
      { title: 'Create Job', useCase: 'Run batch task', code: 'kubectl create job pi --image=perl:5.34 -- perl -Mbignum=bpi -wle "print bpi(2000)"', description: 'Calculates pi to 2000 digits.' },
      { title: 'View Job Status', useCase: 'Check completion', code: 'kubectl get jobs\nkubectl logs job/pi', description: 'Shows Job status and logs.' },
      { title: 'Create CronJob', useCase: 'Periodic task', code: 'kubectl create cronjob hello --image=busybox --schedule="*/1 * * * *" -- sh -c "date; echo Hello"', description: 'Runs every minute.' }
    ]
  ),

  // Namespace
  topic('k8s-namespace', 'Namespace', 'beginner', 10,
    'A Namespace partitions a cluster into virtual clusters for multi-tenancy, isolation, and resource management. Names provide scope for names, RBAC, and resource quotas. Four defaults: default, kube-system, kube-public, kube-node-lease.',
    [
      'Virtual clusters within a physical cluster',
      'Resource names unique per namespace, reusable across namespaces',
      'Cluster-scoped: Nodes, PVs, ClusterRoles, StorageClasses',
      'Support ResourceQuota and LimitRange for resource governance'
    ],
    [
      { heading: 'Isolation', text: 'Names isolate: names (no conflicts), RBAC (per-namespace roles), quotas, DNS (service.namespace.svc.cluster.local). Network isolation needs NetworkPolicy.' },
      { heading: 'Resource Quotas', text: 'ResourceQuota: aggregate limits (CPU, memory, object counts). LimitRange: default/min/max per container. Prevent resource starvation.' }
    ],
    [
      { question: 'What is a Namespace?', answer: 'Virtual cluster providing scope and isolation for resources.' },
      { question: 'Resources NOT namespaced?', answer: 'Nodes, PVs, Namespaces, ClusterRoles, StorageClasses, CRDs.' },
      { question: 'Cross-namespace Service access?', answer: '<service>.<namespace>.svc.cluster.local.' },
      { question: 'Namespace deletion effect?', answer: 'All resources in the namespace are deleted.' }
    ],
    [
      { question: 'NOT namespaced?', options: ['Pod', 'Service', 'Node', 'ConfigMap'], answer: 2, explanation: 'Nodes are cluster-scoped.' },
      { question: 'Default namespaces count?', options: ['1', '2', '4', '5'], answer: 2, explanation: 'Four default namespaces.' },
      { question: 'ResourceQuota enforces?', options: ['Per-container', 'Per-namespace aggregate', 'Cluster-wide'], answer: 1, explanation: 'Per-namespace aggregate limits.' },
      { question: 'Cross-namespace DNS?', options: ['<svc>.<ns>.svc.cluster.local', '<ns>.<svc>.svc.cluster.local'], answer: 0, explanation: '<service>.<namespace>.svc.cluster.local' }
    ],
    [
      { title: 'Create Namespace', useCase: 'Environment isolation', code: 'kubectl create namespace dev\nkubectl get namespaces', description: 'Creates and lists namespaces.' },
      { title: 'Set Namespace Context', useCase: 'Default namespace', code: 'kubectl config set-context --current --namespace=dev', description: 'Changes default namespace.' },
      { title: 'Apply ResourceQuota', useCase: 'Limit resources', code: 'kubectl create quota dev-quota --namespace=dev --hard=pods=10,cpu=4,memory=8Gi', description: 'Sets dev namespace limits.' }
    ]
  ),

  // Service
  topic('k8s-service', 'Service', 'beginner', 10,
    'A Service provides stable network endpoints for Pods. Since Pods have changing IPs, Services give fixed virtual IPs and DNS names. Types: ClusterIP (internal), NodePort (external on node IP), LoadBalancer (cloud LB), ExternalName (DNS alias). kube-proxy implements routing on every node.',
    [
      'Stable virtual IP and DNS decoupling from ephemeral Pod IPs',
      'Types: ClusterIP (default), NodePort (30000-32767), LoadBalancer (cloud), ExternalName (DNS CNAME)',
      'Label selectors discover Pod backends via EndpointSlices',
      'DNS: <service>.<namespace>.svc.cluster.local via CoreDNS'
    ],
    [
      { heading: 'Service Types', text: 'ClusterIP: internal virtual IP. NodePort: static port on every node. LoadBalancer: provisions cloud LB. Headless (clusterIP: None): returns all Pod IPs directly for StatefulSet.' },
      { heading: 'Traffic Routing', text: 'Random distribution to Ready Pods. SessionAffinity: ClientIP for stickiness. ExternalTrafficPolicy: Cluster (may SNAT) or Local (preserves source IP, routes to local Pods only).' }
    ],
    [
      { question: 'What is a Service?', answer: 'Stable IP/DNS decoupling clients from Pod IPs, routing to healthy backends.' },
      { question: 'Service types?', answer: 'ClusterIP, NodePort, LoadBalancer, ExternalName, Headless.' },
      { question: 'How does a Service find Pods?', answer: 'Label selectors. Controller watches Pods, updates EndpointSlices.' },
      { question: 'NodePort port range?', answer: '30000-32767 by default.' }
    ],
    [
      { question: 'Default Service type?', options: ['NodePort', 'ClusterIP', 'LoadBalancer', 'ExternalName'], answer: 1, explanation: 'ClusterIP is default.' },
      { question: 'NodePort default range?', options: ['1024-65535', '30000-32767', '20000-30000'], answer: 1, explanation: '30000-32767.' },
      { question: 'Provisions cloud LB?', options: ['ClusterIP', 'NodePort', 'LoadBalancer', 'ExternalName'], answer: 2, explanation: 'LoadBalancer provisions cloud LB.' },
      { question: 'Headless DNS returns?', options: ['Single VIP', 'All ready Pod IPs', 'Cloud LB hostname'], answer: 1, explanation: 'Returns IPs of all ready Pods.' }
    ],
    [
      { title: 'Create ClusterIP Service', useCase: 'Internal exposure', code: 'kubectl expose deployment web --port=80 --target-port=8080', description: 'Exposes Deployment internally.' },
      { title: 'Create NodePort', useCase: 'External access', code: 'kubectl expose deployment web --type=NodePort --port=80', description: 'Exposes externally via node port.' },
      { title: 'Test Service DNS', useCase: 'Verify discovery', code: 'kubectl run test --image=busybox --rm -it -- nslookup web-service', description: 'Tests DNS resolution.' }
    ]
  ),

  // ConfigMap
  topic('k8s-configmap', 'ConfigMap', 'beginner', 10,
    'A ConfigMap stores non-confidential config as key-value pairs, decoupling configuration from container images. Change settings without rebuilding images. Consumed as env vars, command args, or mounted files. Volume mounts auto-update; env vars require Pod restart.',
    [
      'Decouples configuration from container images',
      'Consumed as env vars, volume mounts, or command args',
      'Created from literals, files, env files, or YAML',
      'Volume mounts auto-update; env vars static after Pod start'
    ],
    [
      { heading: 'Consumption', text: 'Env vars: valueFrom.configMapKeyRef. Volumes: each key = file. optional: true allows missing keys. SubPath mounts individual files.' },
      { heading: 'Updates', text: 'Mounted volumes auto-update (~1 min kubelet sync). Env vars static after Pod start. Immutable ConfigMaps (immutable: true) improve performance.' }
    ],
    [
      { question: 'What is a ConfigMap?', answer: 'Non-sensitive config as key-value pairs, decoupled from images.' },
      { question: 'Consumption methods?', answer: 'Env vars, volume mounts, command args.' },
      { question: 'Volume mount update behavior?', answer: 'Auto-updated (kubelet sync delay).' },
      { question: 'Env var update behavior?', answer: 'Static after Pod start. Pods must be restarted.' }
    ],
    [
      { question: 'NOT for ConfigMap?', options: ['Config files', 'Env vars', 'Passwords', 'App settings'], answer: 2, explanation: 'Sensitive data needs Secrets.' },
      { question: 'Create from key=value?', options: ['--from-file', '--from-literal', '--from-env-file'], answer: 1, explanation: '--from-literal flag.' },
      { question: 'Env vars updated on ConfigMap change?', options: ['Yes, immediately', 'No, only at Pod start', 'Yes, after sync'], answer: 1, explanation: 'Env vars are not updated dynamically.' },
      { question: 'optional: true does what?', options: ['Allows deletion', 'Allows missing keys without error', 'Skips validation'], answer: 1, explanation: 'Allows Pod start with missing ConfigMap key.' }
    ],
    [
      { title: 'Create ConfigMap', useCase: 'Store config', code: 'kubectl create configmap app-config --from-literal=LOG_LEVEL=info --from-literal=MAX_CONN=100', description: 'Creates ConfigMap from literals.' },
      { title: 'Use as Env Vars', useCase: 'Inject config', code: 'kubectl set env deployment/web --from=configmap/app-config', description: 'Injects ConfigMap as env vars.' },
      { title: 'Mount as Volume', useCase: 'Config files in Pod', code: 'kubectl set volume deployment/web --add --name=config --mount-path=/etc/config --configmap=app-config', description: 'Mounts ConfigMap as volume.' }
    ]
  ),

  // Secret
  topic('k8s-secret', 'Secret', 'beginner', 10,
    'A Secret stores sensitive data: passwords, API keys, TLS certs. Base64-encoded (not encrypted by default). Enable encryption at rest for production. Types: Opaque, TLS, Docker registry. Consumed as env vars or volume mounts.',
    [
      'Stores sensitive data with base64 encoding',
      'Types: Opaque (generic), kubernetes.io/tls, kubernetes.io/dockerconfigjson',
      'Enable encryption at rest for production security',
      'Secrets Store CSI Driver integrates external secret stores'
    ],
    [
      { heading: 'Security', text: 'Encryption at rest via EncryptionConfiguration (providers: aescbc, kms, secretbox). RBAC controls access. Volume mounts with restricted permissions (defaultMode: 0400) over env vars.' },
      { heading: 'External Secrets', text: 'Secrets Store CSI Driver mounts from Vault, AWS Secrets Manager, Azure Key Vault directly into Pods, keeping secrets out of etcd.' }
    ],
    [
      { question: 'What is a Secret?', answer: 'Stores sensitive data with base64 encoding, optional encryption at rest.' },
      { question: 'Are Secrets encrypted by default?', answer: 'No. Base64-encoded but not encrypted. Enable encryption at rest.' },
      { question: 'Common Secret types?', answer: 'Opaque (generic), kubernetes.io/tls, kubernetes.io/dockerconfigjson.' },
      { question: 'Secrets Store CSI Driver?', answer: 'Mounts secrets from external providers into Pods, avoiding etcd storage.' }
    ],
    [
      { question: 'Secret encoding?', options: ['AES', 'base64', 'SHA-256', 'Plaintext'], answer: 1, explanation: 'Base64-encoded.' },
      { question: 'TLS Secret type?', options: ['Opaque', 'kubernetes.io/tls', 'kubernetes.io/dockerconfigjson'], answer: 1, explanation: 'kubernetes.io/tls.' },
      { question: 'Enable encryption at rest?', options: ['kubectl encrypt', '--encryption-provider-config', 'set secret.encrypted: true'], answer: 1, explanation: 'API Server --encryption-provider-config.' },
      { question: 'Create Opaque Secret?', options: ['kubectl create secret generic', 'kubectl create secret tls', 'kubectl create secret docker-registry'], answer: 0, explanation: 'kubectl create secret generic.' }
    ],
    [
      { title: 'Create Secret', useCase: 'Store credentials', code: 'kubectl create secret generic db-cred --from-literal=username=admin --from-literal=password=s3cret', description: 'Creates Opaque Secret.' },
      { title: 'Create TLS Secret', useCase: 'SSL certificates', code: 'kubectl create secret tls my-tls --key=tls.key --cert=tls.crt', description: 'Creates TLS Secret for Ingress.' },
      { title: 'Create Registry Secret', useCase: 'Private registry auth', code: 'kubectl create secret docker-registry regcred --docker-username=<user> --docker-password=<pass>', description: 'Creates Docker registry Secret.' }
    ]
  ),

  // Persistent Volume
  topic('k8s-persistent-volume', 'Persistent Volume', 'intermediate', 15,
    'A PersistentVolume (PV) is cluster storage with lifecycle independent of Pods. Abstracted from consumption via PVCs. Access modes: RWO, ROX, RWX. Reclaim: Retain, Delete, Recycle. Statically or dynamically provisioned.',
    [
      'Cluster-wide storage with Pod-independent lifecycle',
      'Access modes: ReadWriteOnce, ReadOnlyMany, ReadWriteMany',
      'Reclaim policies: Retain (manual), Delete (auto-delete), Recycle (deprecated)',
      'Static (admin creates) or dynamic (StorageClass provisions)'
    ],
    [
      { heading: 'PV Lifecycle', text: 'Phases: Available, Bound, Released, Failed. Dynamic via StorageClass creates PVs on PVC request. Static: admin pre-creates PVs matching PVC requirements.' },
      { heading: 'StorageClass', text: 'Defines provisioner, parameters (disk type, IOPS), reclaimPolicy. volumeBindingMode: Immediate or WaitForFirstConsumer. allowVolumeExpansion enables PVC resizing.' }
    ],
    [
      { question: 'What is a PV?', answer: 'Cluster storage with independent lifecycle. Admin-provisioned or dynamically created.' },
      { question: 'PV access modes?', answer: 'ReadWriteOnce (RWO), ReadOnlyMany (ROX), ReadWriteMany (RWX).' },
      { question: 'PV reclaim policies?', answer: 'Retain (manual), Delete (auto-delete), Recycle (deprecated).' },
      { question: 'What is a StorageClass?', answer: 'Defines provisioner, parameters, and reclaim policy for dynamic PV provisioning.' }
    ],
    [
      { question: 'Multiple nodes read-write?', options: ['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany'], answer: 2, explanation: 'ReadWriteMany allows multi-node read-write.' },
      { question: 'Auto-deletes PV?', options: ['Retain', 'Delete', 'Recycle'], answer: 1, explanation: 'Delete policy auto-removes PV and storage.' },
      { question: 'Dynamic PV provisioning by?', options: ['kube-controller-manager', 'StorageClass provisioner', 'kubelet'], answer: 1, explanation: 'StorageClass provisioner creates PVs.' },
      { question: 'PVC-deleted phase?', options: ['Available', 'Bound', 'Released', 'Failed'], answer: 2, explanation: 'Released phase.' }
    ],
    [
      { title: 'Create Static PV', useCase: 'Manual provisioning', code: 'kubectl apply -f pv.yaml', description: 'Creates static PV.' },
      { title: 'Create StorageClass', useCase: 'Dynamic provisioning', code: 'kubectl apply -f storage-class.yaml', description: 'Creates StorageClass.' },
      { title: 'List PVs', useCase: 'View resources', code: 'kubectl get pv\nkubectl get pvc', description: 'Lists all PVs and PVCs.' }
    ]
  ),

  // Persistent Volume Claim
  topic('k8s-persistent-volume-claim', 'Persistent Volume Claim', 'intermediate', 15,
    'A PVC is a storage request specifying size, access mode, and StorageClass. Binds to matching PV or triggers dynamic provisioning. Pods reference PVCs as volumes. Data persists beyond Pod deletion. StatefulSets use volumeClaimTemplates for per-replica PVCs.',
    [
      'Storage request: size, access mode, StorageClass',
      'Binds to matching PV or triggers dynamic provisioning',
      'Data persists beyond Pod deletion',
      'volumeClaimTemplates auto-create per-replica PVCs in StatefulSets'
    ],
    [
      { heading: 'PVC Binding', text: 'Matches on storageClassName, access modes, capacity. Selectors for specific PVs. pvc-protection finalizer prevents in-use deletion. Resizing requires allowVolumeExpansion: true.' },
      { heading: 'PVC Protection', text: 'kubernetes.io/pvc-protection finalizer prevents deletion while Pods use it. PVC enters Terminating until Pods deleted.' }
    ],
    [
      { question: 'What is a PVC?', answer: 'Storage request that binds to matching PV or triggers dynamic provisioning.' },
      { question: 'Pod uses PVC how?', answer: 'volumes[].persistentVolumeClaim.claimName reference.' },
      { question: 'No matching PV?', answer: 'Stays Pending until matching PV available or dynamic provisioning.' },
      { question: 'PVC protection?', answer: 'Finalizer prevents deletion while Pods use the PVC.' }
    ],
    [
      { question: 'PVC binds to?', options: ['Node', 'Pod', 'PersistentVolume', 'StorageClass'], answer: 2, explanation: 'Binds to PersistentVolume.' },
      { question: 'No matching PV?', options: ['Deleted', 'Pending', 'Error'], answer: 1, explanation: 'Stays Pending.' },
      { question: 'In-use deletion prevented by?', options: ['RBAC', 'pvc-protection finalizer', 'Admission controller'], answer: 1, explanation: 'pvc-protection finalizer.' },
      { question: 'Auto-creates PVCs in StatefulSets?', options: ['statefulSetSpec', 'volumeClaimTemplates', 'storageTemplate'], answer: 1, explanation: 'volumeClaimTemplates.' }
    ],
    [
      { title: 'Create PVC', useCase: 'Request storage', code: 'kubectl create pvc my-pvc --storage-class=fast --access-modes=ReadWriteOnce --storage=5Gi', description: 'Creates PVC request.' },
      { title: 'Use in Pod', useCase: 'Mount storage', code: 'kubectl set volume deployment/web --add --name=data --mount-path=/data --type=persistentVolumeClaim --claim-name=my-pvc', description: 'Adds PVC volume to Deployment.' },
      { title: 'Check PVC Status', useCase: 'Verify binding', code: 'kubectl get pvc\nkubectl describe pvc my-pvc', description: 'Shows binding status.' }
    ]
  ),

  // Storage Class
  topic('k8s-storage-class', 'Storage Class', 'intermediate', 10,
    'A StorageClass template enables dynamic PV provisioning. Defines provisioner (CSI driver), parameters (disk type, IOPS), and reclaim policy. Default class is auto-used by PVCs without storageClassName. Multiple classes define different storage tiers.',
    [
      'Template for dynamic PV provisioning with provisioner and parameters',
      'Default class via annotation storageclass.kubernetes.io/is-default-class',
      'volumeBindingMode: Immediate or WaitForFirstConsumer (topology-aware)',
      'allowVolumeExpansion enables PVC resize; CSI drivers replace in-tree provisioners'
    ],
    [
      { heading: 'Parameters', text: 'Provisioner: ebs.csi.aws.com, disk.csi.azure.com, pd.csi.storage.gke.io. Parameters: type (gp3, io2), fsType (ext4, xfs), iopsPerGB, encrypted. allowedTopologies restricts zones.' },
      { heading: 'Binding Modes', text: 'Immediate: PV created on PVC create. WaitForFirstConsumer: delays until Pod scheduling for zone alignment. Default class requires annotation.' }
    ],
    [
      { question: 'What is a StorageClass?', answer: 'Defines storage tier with provisioner, parameters, reclaim policy for dynamic PV provisioning.' },
      { question: 'PVC uses StorageClass how?', answer: 'Via storageClassName field. Default class used if not specified.' },
      { question: 'Default StorageClass?', answer: 'Annotated with storageclass.kubernetes.io/is-default-class: "true".' },
      { question: 'Immediate vs WaitForFirstConsumer?', answer: 'Immediate binds on PVC create. WaitForFirstConsumer delays for topology-aware provisioning.' }
    ],
    [
      { question: 'Default annotation?', options: ['kubernetes.io/default-storage', 'storageclass.kubernetes.io/is-default-class', 'kubernetes.io/storage-class-default'], answer: 1, explanation: 'storageclass.kubernetes.io/is-default-class.' },
      { question: 'allowVolumeExpansion enables?', options: ['Volume cloning', 'PVC resizing', 'Volume snapshots'], answer: 1, explanation: 'Enables PVC resize.' },
      { question: 'Zone-aware binding mode?', options: ['Immediate', 'WaitForFirstConsumer', 'TopologyAware'], answer: 1, explanation: 'WaitForFirstConsumer.' },
      { question: 'Replaces in-tree provisioners?', options: ['External provisioners', 'CSI drivers', 'Storage plugins'], answer: 1, explanation: 'CSI drivers.' }
    ],
    [
      { title: 'Create StorageClass', useCase: 'Define tier', code: 'kubectl apply -f sc.yaml', description: 'Creates StorageClass.' },
      { title: 'Set Default', useCase: 'Make default class', code: 'kubectl annotate storageclass fast storageclass.kubernetes.io/is-default-class=true', description: 'Marks as default.' },
      { title: 'List Classes', useCase: 'View available tiers', code: 'kubectl get storageclass', description: 'Lists all StorageClasses.' }
    ]
  )
];
