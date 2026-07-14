var { topic } = require('./helpers');

module.exports = [

  // Persistent Volumes
  topic('k8s-storage-pv', 'Persistent Volumes', 'intermediate', 15,
    'Persistent Volumes (PVs) provide cluster-wide storage with lifecycle independent of Pods. Access modes: RWO, ROX, RWX. Reclaim: Retain (manual), Delete (auto). Static (admin creates) or dynamic (StorageClass).',
    [
      'Cluster-wide storage with Pod-independent lifecycle',
      'Access modes: ReadWriteOnce, ReadOnlyMany, ReadWriteMany',
      'Reclaim policies: Retain (manual), Delete (auto-delete)',
      'Static (admin) or dynamic (StorageClass) provisioning'
    ],
    [
      { heading: 'PV Lifecycle', text: 'Phases: Available, Bound, Released, Failed. Dynamic via StorageClass creates PVs on PVC request. Static: admin pre-creates PVs matching PVC requirements.' },
      { heading: 'StorageClass', text: 'Defines provisioner, parameters (disk type, IOPS), reclaimPolicy. volumeBindingMode: Immediate or WaitForFirstConsumer. allowVolumeExpansion enables PVC resizing.' }
    ],
    [
      { question: 'What is a PV?', answer: 'Cluster storage with independent lifecycle. Admin-provisioned or dynamically created.' },
      { question: 'PV access modes?', answer: 'ReadWriteOnce (RWO), ReadOnlyMany (ROX), ReadWriteMany (RWX).' },
      { question: 'PV reclaim policies?', answer: 'Retain (manual), Delete (auto-delete).' },
      { question: 'What is a StorageClass?', answer: 'Template for dynamic PV provisioning with provisioner and parameters.' }
    ],
    [
      { question: 'Multi-node read-write?', options: ['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany'], answer: 2 },
      { question: 'Auto-deletes PV?', options: ['Retain', 'Delete', 'Recycle'], answer: 1 },
      { question: 'Dynamic PV by?', options: ['kube-controller-manager', 'StorageClass provisioner', 'kubelet'], answer: 1 },
      { question: 'PVC-deleted phase?', options: ['Available', 'Bound', 'Released', 'Failed'], answer: 2 }
    ],
    [
      { title: 'Create Static PV', useCase: 'Manual provisioning', code: 'kubectl apply -f pv.yaml', description: 'Creates static PV.' },
      { title: 'Create StorageClass', useCase: 'Dynamic provisioning', code: 'kubectl apply -f storage-class.yaml', description: 'Creates StorageClass.' },
      { title: 'List PVs', useCase: 'View storage resources', code: 'kubectl get pv', description: 'Lists all PVs.' }
    ]
  ),

  // Persistent Volume Claims
  topic('k8s-storage-pvc', 'Persistent Volume Claims', 'intermediate', 15,
    'PVCs are storage requests specifying size, access mode, and StorageClass. Binds to matching PV or triggers dynamic provisioning. Pods reference PVCs as volumes. Data persists beyond Pod deletion.',
    [
      'Storage request: size, access mode, StorageClass',
      'Binds to matching PV or triggers dynamic provisioning',
      'Data persists beyond Pod deletion',
      'volumeClaimTemplates auto-create per-replica PVCs in StatefulSets'
    ],
    [
      { heading: 'PVC Binding', text: 'Matches on storageClassName, access modes, capacity. Selectors for specific PVs. pvc-protection finalizer prevents in-use deletion.' },
      { heading: 'PVC Protection', text: 'kubernetes.io/pvc-protection finalizer prevents deletion while Pods use it. PVC stays Terminating until Pods deleted.' }
    ],
    [
      { question: 'What is a PVC?', answer: 'Storage request binding to matching PV or triggering dynamic provisioning.' },
      { question: 'Pod uses PVC how?', answer: 'volumes[].persistentVolumeClaim.claimName reference.' },
      { question: 'No matching PV?', answer: 'Stays Pending until PV available or dynamic provisioned.' },
      { question: 'PVC protection?', answer: 'Finalizer prevents deletion while Pods use the PVC.' }
    ],
    [
      { question: 'PVC binds to?', options: ['Node', 'Pod', 'PersistentVolume', 'StorageClass'], answer: 2 },
      { question: 'No matching PV?', options: ['Deleted', 'Pending', 'Error'], answer: 1 },
      { question: 'In-use deletion prevented by?', options: ['RBAC', 'pvc-protection finalizer', 'Admission controller'], answer: 1 },
      { question: 'Auto-creates PVCs in StatefulSets?', options: ['statefulSetSpec', 'volumeClaimTemplates', 'storageTemplate'], answer: 1 }
    ],
    [
      { title: 'Create PVC', useCase: 'Request storage', code: 'kubectl create pvc my-pvc --storage-class=fast --access-modes=ReadWriteOnce --storage=5Gi', description: 'Creates PVC request.' },
      { title: 'Use in Deployment', useCase: 'Mount storage', code: 'kubectl set volume deployment/web --add --name=data --mount-path=/data --type=persistentVolumeClaim --claim-name=my-pvc', description: 'Adds PVC volume.' },
      { title: 'Check PVC Status', useCase: 'Verify binding', code: 'kubectl get pvc', description: 'Shows binding status.' }
    ]
  ),

  // Dynamic Provisioning
  topic('k8s-dynamic-provisioning', 'Dynamic Provisioning', 'intermediate', 15,
    'Dynamic provisioning automatically creates PVs when PVCs request storage, using StorageClass-defined provisioners. Eliminates need for manual PV creation. Supports cloud volumes (EBS, PD, Azure Disk), NFS, and many more.',
    [
      'PVs created automatically on PVC request via StorageClass',
      'Provisioner: ebs.csi.aws.com, pd.csi.storage.gke.io, disk.csi.azure.com',
      'volumeBindingMode: Immediate or WaitForFirstConsumer',
      'Default StorageClass via annotation is-default-class'
    ],
    [
      { heading: 'Provisioning Flow', text: 'PVC created -> controller watches -> StorageClass identified -> provisioner creates storage -> PV created -> PVC bound. Immediate: PV created regardless of Pod. WaitForFirstConsumer: delays until Pod scheduled (zone-aware).' },
      { heading: 'Configuration', text: 'StorageClass parameters: type (gp3, io2), zone, fsType (ext4, xfs), iopsPerGB, encrypted. reclaimPolicy: Delete (default) or Retain. allowVolumeExpansion: true enables PVC resize.' }
    ],
    [
      { question: 'What is dynamic provisioning?', answer: 'Automatic PV creation when PVC requests storage via StorageClass.' },
      { question: 'Provisioner?', answer: 'CSI driver like ebs.csi.aws.com, disk.csi.azure.com.' },
      { question: 'WaitForFirstConsumer?', answer: 'Delays provisioning until Pod is scheduled for zone alignment.' },
      { question: 'Default StorageClass?', answer: 'Annotated with is-default-class: "true".' }
    ],
    [
      { question: 'Dynamic PV created by?', options: ['Admin', 'StorageClass provisioner', 'kubelet'], answer: 1 },
      { question: 'WaitForFirstConsumer does?', options: ['Binds immediately', 'Defers to Pod scheduling', 'Skips provisioning'], answer: 1 },
      { question: 'Default reclaimPolicy?', options: ['Retain', 'Delete', 'Recycle'], answer: 1 },
      { question: 'allowVolumeExpansion enables?', options: ['Volume cloning', 'PVC resize', 'Snapshots'], answer: 1 }
    ],
    [
      { title: 'Create Default StorageClass', useCase: 'Set default provisioner', code: 'kubectl annotate storageclass fast storageclass.kubernetes.io/is-default-class=true', description: 'Marks as default.' },
      { title: 'Create PVC with Dynamic', useCase: 'Auto-provision', code: 'kubectl create pvc dynamic-pvc --storage-class=fast --access-modes=ReadWriteOnce --storage=10Gi', description: 'Triggers dynamic PV creation.' }
    ]
  ),

  // CSI Drivers
  topic('k8s-csi-drivers', 'CSI Drivers', 'advanced', 15,
    'Container Storage Interface (CSI) enables storage vendors to develop plugins without modifying Kubernetes core. CSI drivers replace in-tree provisioners. They provide volume provisioning, attachment, mounting, snapshots, and encryption.',
    [
      'Standard interface for storage plugins (CSI spec)',
      'Replace in-tree volume plugins',
      'Features: create/delete, attach/detach, mount/unmount',
      'Supports snapshots, cloning, resize, encryption'
    ],
    [
      { heading: 'CSI Architecture', text: 'External components: Driver DaemonSet (runs on every node for mount), Controller Deployment (for create/delete), attacher (for attach/detach), resizer (for volume resize), snapshotter (for snapshots). CSI Identity, Controller, Node services.' },
      { heading: 'CSI Features', text: 'snapshotting: VolumeSnapshot and VolumeSnapshotContent CRDs. Volume cloning: clone from existing PVC. Volume expansion: resize PVC (requires allowVolumeExpansion). Topology: zone-aware provisioning. Secrets: encrypted volumes.' }
    ],
    [
      { question: 'What is CSI?', answer: 'Standard plugin interface for storage vendors, replacing in-tree provisioners.' },
      { question: 'CSI vs in-tree?', answer: 'CSI: external, vendor-maintained, more features. In-tree: built-in, core-maintained, limited.' },
      { question: 'CSI components?', answer: 'Driver (DaemonSet), Controller (Deployment), attacher, resizer, snapshotter.' },
      { question: 'CSI snapshot feature?', answer: 'VolumeSnapshot CRD for creating/restoring volume snapshots.' }
    ],
    [
      { question: 'CSI replaces?', options: ['In-tree provisioners', 'StorageClasses', 'PVCs'], answer: 0 },
      { question: 'CSI components include?', options: ['Driver only', 'Driver + Controller + sidecars', 'Only sidecars'], answer: 1 },
      { question: 'Volume snapshot CRD?', options: ['VolumeSnapshot', 'Snapshot', 'VolumeBackup'], answer: 0 },
      { question: 'Volume expansion requires?', options: ['allowVolumeExpansion: true', 'expandable: true', 'resize: true'], answer: 0 }
    ],
    [
      { title: 'Install CSI Driver', useCase: 'EBS CSI driver', code: 'kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/ecr"', description: 'Installs EBS CSI driver.' },
      { title: 'Create CSI-backed PVC', useCase: 'Use CSI driver', code: 'kubectl apply -f storageclass-csi.yaml;\nkubectl create pvc csi-pvc --storage-class=ebs-csi --storage=10Gi', description: 'PVC using CSI StorageClass.' }
    ]
  ),

  // Local Storage
  topic('k8s-storage-local', 'Local Storage', 'intermediate', 10,
    'Local storage uses local SSDs or disks attached to individual nodes. Provides high performance but data is tied to the node. Use for high-performance databases, caching, or temporary data where data loss is acceptable.',
    [
      'Uses local node-attached disks (high performance)',
      'Data tied to the node — Pod cannot migrate with data',
      'Requires PV with nodeAffinity for scheduling',
      'Use for high-throughput read-heavy workloads'
    ],
    [
      { heading: 'Local PV', text: 'Static provisioning: admin creates PV with local path and nodeAffinity. Scheduler must ensure Pod runs on the correct node. WaitForFirstConsumer binding mode delays binding until Pod scheduled.' },
      { heading: 'Limitations', text: 'Data tied to node. Node failure = data loss (unless replicated at application level). No dynamic provisioning. Manual recovery needed. Use with StatefulSet and strict node constraints.' }
    ],
    [
      { question: 'What is local storage in K8s?', answer: 'Node-attached disks providing high performance with data locality constraints.' },
      { question: 'How is PV tied to node?', answer: 'nodeAffinity in PV spec ensures correct node scheduling.' },
      { question: 'Use cases?', answer: 'High-performance databases, caching, ephemeral high-throughput data.' },
      { question: 'Limitation?', answer: 'Data tied to node. Node failure = data loss (unless app replicates).' }
    ],
    [
      { question: 'Local PV binding mode?', options: ['Immediate', 'WaitForFirstConsumer', 'Both supported'], answer: 1 },
      { question: 'Local PV is?', options: ['Dynamically provisioned', 'Manually created by admin', 'Auto-discovered'], answer: 1 },
      { question: 'Node failure effect?', options: ['Data persists elsewhere', 'Data lost', 'Data auto-migrates'], answer: 1 },
      { question: 'Recommended for?', options: ['Stateful HA databases', 'High-throughput cache', 'Long-term storage'], answer: 1 }
    ],
    [
      { title: 'Create Local PV', useCase: 'Use node SSD', code: 'kubectl apply -f local-pv.yaml', description: 'Creates PV with nodeAffinity.' },
      { title: 'Create Local PVC', useCase: 'Request local storage', code: 'kubectl apply -f local-pvc.yaml', description: 'PVC binds to local PV.' }
    ]
  ),

  // Cloud Storage
  topic('k8s-storage-cloud', 'Cloud Storage', 'intermediate', 15,
    'Cloud storage integrates managed cloud volumes: AWS EBS, EFS, Azure Disk/File, GCP Persistent Disk, Filestore. Each has different performance, availability, and access mode characteristics. Use CSI drivers for production.',
    [
      'AWS: EBS (RWO, SSD/HDD), EFS (RWX, NFS), FSx (Lustre, Windows)',
      'Azure: Disk (RWO, premium/standard), Files (RWX, SMB)',
      'GCP: Persistent Disk (RWO, pd-ssd/pd-standard), Filestore (RWX)',
      'Use CSI drivers instead of in-tree provisioners'
    ],
    [
      { heading: 'AWS Storage', text: 'EBS: block storage, 1-16 TiB, RWO, encrypted, snapshots. EFS: NFS, RWX, automatic scaling, for shared access. EBS CSI driver: supports volume expansion, snapshots, encrypted volumes.' },
      { heading: 'Azure/GCP Storage', text: 'Azure Disk: RWO, premium SSD, standard HDD, encrypted. Azure Files: SMB 3.0, RWX, for shared access. GCP Persistent Disk: RWO, pd-ssd (high IOPS), pd-standard (HDD), pd-balanced, snapshots, encryption.' }
    ],
    [
      { question: 'Cloud storage types?', answer: 'AWS EBS/EFS, Azure Disk/Files, GCP Persistent Disk/Filestore.' },
      { question: 'Which cloud storage supports RWX?', answer: 'AWS EFS, Azure Files, GCP Filestore (all file/NFS-based).' },
      { question: 'RWO vs RWX?', answer: 'RWO: single node read-write (block). RWX: many nodes (file/NFS).' },
      { question: 'CSI vs in-tree?', answer: 'CSI: more features, vendor-maintained. In-tree: limited, core-maintained.' }
    ],
    [
      { question: 'EBS access mode?', options: ['ReadWriteOnce', 'ReadWriteMany', 'ReadOnlyMany'], answer: 0 },
      { question: 'EFS access mode?', options: ['ReadWriteOnce', 'ReadWriteMany', 'ReadOnlyMany'], answer: 1 },
      { question: 'EBS max size?', options: ['1 TiB', '16 TiB', '64 TiB'], answer: 1 },
      { question: 'Azure Files protocol?', options: ['NFS', 'SMB 3.0', 'iSCSI'], answer: 1 }
    ],
    [
      { title: 'Create EBS PVC', useCase: 'Use CSI with AWS', code: 'kubectl apply -f storageclass-ebs.yaml;\nkubectl create pvc ebs-pvc --storage-class=ebs-csi --storage=20Gi', description: 'Creates PVC from EBS CSI StorageClass.' },
      { title: 'Create EFS PVC', useCase: 'Shared storage', code: 'kubectl apply -f storageclass-efs.yaml', description: 'Creates RWX shared storage.' }
    ]
  )
];
