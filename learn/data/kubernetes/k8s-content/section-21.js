var { topic } = require('./helpers');

module.exports = [

  // Opaque Secret
  topic('k8s-secret-opaque', 'Opaque Secret', 'beginner', 10,
    'Opaque Secrets store arbitrary key-value pairs as base64-encoded data. Most common Secret type for passwords, API keys, tokens. Consumed as env vars or volume mounts. Enable encryption at rest for production.',
    [
      'Default Secret type: Opaque — arbitrary key-value pairs',
      'Values base64-encoded (not encrypted by default)',
      'Consumed as env vars or volume mounts (similar to ConfigMap)',
      'Maximum size: 1 MB (limited by etcd)'
    ],
    [
      { heading: 'Creation', text: 'kubectl create secret generic <name> --from-literal or --from-file. YAML: type: Opaque, data: { key: base64 }, stringData allows plaintext values (kubectl converts to base64).' },
      { heading: 'Consumption', text: 'Env: valueFrom.secretKeyRef.name/key, optional: true. Volume: volumes[].secret.secretName, items[] for specific keys. Default permissions 0400 for secret files.' }
    ],
    [
      { question: 'What is Opaque Secret?', answer: 'Default Secret type for arbitrary key-value sensitive data.' },
      { question: 'How to create?', answer: 'kubectl create secret generic <name> --from-literal or --from-file.' },
      { question: 'What is stringData?', answer: 'YAML field for plaintext values (kubectl converts to base64).' },
      { question: 'Are Opaque Secrets encrypted?', answer: 'Base64-encoded only. Enable encryption at rest for security.' }
    ],
    [
      { question: 'Opaque Secret type string?', options: ['Opaque', 'opaque', 'Generic'], answer: 0 },
      { question: 'Secret size limit?', options: ['100 KB', '1 MB', '10 MB'], answer: 1 },
      { question: 'stringData field?', options: ['Base64 required', 'Plaintext accepted', 'Binary only'], answer: 1 },
      { question: 'File permission default?', options: ['0400', '0644', '0755'], answer: 0 }
    ],
    [
      { title: 'Create Secret', useCase: 'Store credentials', code: 'kubectl create secret generic db-cred --from-literal=username=admin --from-literal=password=s3cret', description: 'Creates Opaque Secret.' },
      { title: 'Use as Volume', useCase: 'Mount secret as file', code: 'kubectl set volume deployment/web --add --name=secret --mount-path=/etc/secret --secret=db-cred', description: 'Mounts Secret as volume.' },
      { title: 'Use as Env', useCase: 'Inject secret as var', code: 'kubectl set env deployment/web --from=secret/db-cred', description: 'Injects Secret keys as env vars.' }
    ]
  ),

  // TLS Secret
  topic('k8s-secret-tls', 'TLS Secret', 'intermediate', 10,
    'TLS Secrets store TLS certificates and private keys for HTTPS termination. Type: kubernetes.io/tls, fields: tls.crt (certificate chain), tls.key (private key). Used by Ingress controllers. cert-manager automates certificate provisioning.',
    [
      'Type: kubernetes.io/tls — TLS cert + key',
      'Required keys: tls.crt (certificate), tls.key (private key)',
      'Used by Ingress spec.tls[].secretName for HTTPS',
      'cert-manager automates Let\'s Encrypt certificate issuance'
    ],
    [
      { heading: 'Certificate Validation', text: 'tls.crt should include full chain: server cert + intermediate CAs. Private key: PEM-encoded, unencrypted (no passphrase). Ingress controller reads from same namespace.' },
      { heading: 'TLS in Ingress', text: 'spec.tls: [{ hosts: [domain], secretName: my-tls }]. Ingress controller terminates TLS, decrypted traffic forwarded to backend. Multiple TLS entries for multiple domains. TLS 1.2+ minimum.' }
    ],
    [
      { question: 'What is TLS Secret?', answer: 'Stores TLS certificate and private key for HTTPS termination.' },
      { question: 'Required keys?', answer: 'tls.crt (certificate chain) and tls.key (private key).' },
      { question: 'How used?', answer: 'Referenced by Ingress spec.tls[].secretName.' },
      { question: 'What is cert-manager?', answer: 'Addon that automates TLS certificate issuance and renewal.' }
    ],
    [
      { question: 'TLS Secret type?', options: ['Opaque', 'kubernetes.io/tls', 'tls'], answer: 1 },
      { question: 'Certificate key name?', options: ['cert.pem', 'tls.crt', 'certificate'], answer: 1 },
      { question: 'Private key must be?', options: ['Encrypted', 'Unencrypted PEM', 'DER format'], answer: 1 },
      { question: 'Ingress TLS field?', options: ['tls.secretName', 'tls.cert', 'https.secret'], answer: 0 }
    ],
    [
      { title: 'Create TLS Secret', useCase: 'From PEM files', code: 'kubectl create secret tls my-tls --key=tls.key --cert=tls.crt', description: 'Creates TLS Secret.' },
      { title: 'Use with Ingress', useCase: 'Enable HTTPS', code: 'kubectl create ingress secure --rule="example.com/*=web:80,tls=my-tls"', description: 'Creates ingress with TLS.' },
      { title: 'View TLS Secret', useCase: 'Check details', code: 'kubectl get secret my-tls -o yaml', description: 'Shows tls.crt and tls.key (base64).' }
    ]
  ),

  // Docker Registry Secret
  topic('k8s-secret-regcred', 'Docker Registry Secret', 'intermediate', 10,
    'Registry Secrets (kubernetes.io/dockerconfigjson) store credentials for private registries (Docker Hub, ECR, GCR, ACR). Used via imagePullSecrets in Pod spec or added to ServiceAccount for automatic use.',
    [
      'Type: kubernetes.io/dockerconfigjson',
      'Referenced in Pod: spec.imagePullSecrets',
      'Can be added to ServiceAccount for all Pods in namespace',
      'ECR needs token refresh (12-hour expiry)'
    ],
    [
      { heading: 'Creating', text: 'kubectl create secret docker-registry regcred --docker-server=<server> --docker-username=<user> --docker-password=<pass>. Or from existing Docker config: --from-file=.dockerconfigjson=<path> --type=kubernetes.io/dockerconfigjson.' },
      { heading: 'Using', text: 'Per-Pod: spec.imagePullSecrets: [{name: regcred}]. Default for namespace: kubectl patch sa default -p \'{"imagePullSecrets":[{"name":"regcred"}]}\'. ECR: needs ecr-credential helper or periodic refresh.' }
    ],
    [
      { question: 'What is dockerconfigjson?', answer: 'Registry credentials for private image authentication.' },
      { question: 'Pod field for registry auth?', answer: 'spec.imagePullSecrets: [{name: regcred}]' },
      { question: 'Add to ServiceAccount?', answer: 'kubectl patch sa default -p \'{"imagePullSecrets":[{"name":"regcred"}]}\'' },
      { question: 'ECR special handling?', answer: '12-hour token expiry. Use ecr-credential helper or cron job.' }
    ],
    [
      { question: 'Registry Secret type?', options: ['Opaque', 'dockerconfigjson', 'registry'], answer: 1 },
      { question: 'Pod field?', options: ['imagePullSecrets', 'registrySecrets', 'containerSecrets'], answer: 0 },
      { question: 'ECR token expiry?', options: ['1 hour', '12 hours', '24 hours'], answer: 1 },
      { question: 'Default for namespace via?', options: ['Namespace config', 'ServiceAccount', 'Cluster admission'], answer: 1 }
    ],
    [
      { title: 'Create Registry Secret', useCase: 'Docker Hub auth', code: 'kubectl create secret docker-registry regcred --docker-username=<user> --docker-password=<pass>', description: 'Creates registry auth Secret.' },
      { title: 'Add to ServiceAccount', useCase: 'Default for namespace', code: 'kubectl patch serviceaccount default -p \'{"imagePullSecrets":[{"name":"regcred"}]}\'', description: 'All Pods get registry access.' }
    ]
  ),

  // Secret Encryption
  topic('k8s-secret-encryption', 'Secret Encryption', 'advanced', 15,
    'Encrypts Secret data in etcd at rest. Without encryption, Secrets are base64-encoded but unencrypted. Providers: aescbc (recommended), aesgcm, secretbox, kms (external HSM/KMS). Configured via EncryptionConfiguration on kube-apiserver.',
    [
      'Encrypts Secret data in etcd (at rest)',
      'Providers: aescbc (recommended), aesgcm, secretbox, kms',
      'Configured via --encryption-provider-config on apiserver',
      'KMS integrates with AWS KMS, Azure Key Vault, GCP KMS'
    ],
    [
      { heading: 'EncryptionConfiguration', text: 'Resources: ["secrets"]. Providers list: first encrypts new data. identity: {} (no encryption). aescbc: {keys: [{name: k1, secret: base64(32 bytes)}]}. kms: {apiVersion: v2, name: myKMS}. Migration requires apiserver restart.' },
      { heading: 'Key Rotation', text: 'Add new key as first provider entry. New Secrets use new key. Old Secrets decrypted with old key. Rewrite: kubectl get secrets -o json | kubectl replace -f -. KMS handles rotation externally.' }
    ],
    [
      { question: 'Does Kubernetes encrypt Secrets by default?', answer: 'No. Base64-encoded only. EncryptionConfiguration required.' },
      { question: 'Recommended provider?', answer: 'aescbc (AES-CBC with PKCS#7 padding).' },
      { question: 'KMS provider benefit?', answer: 'Integration with cloud HSM, automatic key rotation.' },
      { question: 'Force re-encryption?', answer: 'kubectl get secrets --all-namespaces -o json | kubectl replace -f -' }
    ],
    [
      { question: 'Encryption config flag?', options: ['--encryption-config', '--encryption-provider-config', '--encrypt-secrets'], answer: 1 },
      { question: 'Recommended provider?', options: ['identity', 'aescbc', 'secretbox'], answer: 1 },
      { question: 'What stays unencrypted?', options: ['Secret data', 'Secret metadata', 'Both'], answer: 1 },
      { question: 'KMS provider uses?', options: ['gRPC', 'HTTP', 'Unix socket'], answer: 0 }
    ],
    [
      { title: 'Create Encryption Config', useCase: 'Enable at-rest encryption', code: 'kubectl apply -f encryption-config.yaml;\necho "Add --encryption-provider-config to apiserver"', description: 'Creates EncryptionConfiguration.' },
      { title: 'Rewite Secrets', useCase: 'Re-encrypt after key rotation', code: 'kubectl get secrets --all-namespaces -o json | kubectl replace -f -', description: 'Forces re-encryption with first provider.' }
    ]
  ),

  // Secret Management
  topic('k8s-secret-management', 'Secret Management', 'advanced', 15,
    'Secret management covers lifecycle: creation, rotation, revocation, and secure delivery. Best practices: use external secret stores (Vault, AWS Secrets Manager), enable encryption at rest, use RBAC, avoid Secrets in image layers.',
    [
      'External secret stores: Vault, AWS Secrets Manager, Azure Key Vault',
      'Secrets Store CSI Driver mounts external secrets directly into Pods',
      'Enable encryption at rest and RBAC for access control',
      'Avoid secrets in environment variables (use volume mounts)'
    ],
    [
      { heading: 'External Secret Stores', text: 'Secrets Store CSI Driver: mounts from Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager directly into Pods. External Secrets Operator: syncs secrets from external stores to Kubernetes Secrets.' },
      { heading: 'Best Practices', text: 'Use volume mounts instead of env vars (env vars visible in /proc, logs). Enable encryption at rest. Use RBAC: get/list on Secrets. Rotate regularly. Avoid putting secrets in image layers — use imagePullSecrets. Use Sealed Secrets or Helm Secrets for GitOps.' }
    ],
    [
      { question: 'Secret management best practices?', answer: 'External stores, encryption at rest, RBAC, volume mounts, rotation.' },
      { question: 'Secrets Store CSI Driver?', answer: 'Mounts external secrets directly into Pods, keeping them out of etcd.' },
      { question: 'Why volume mounts over env vars?', answer: 'Env vars visible in /proc, logs, crash reports. Volumes have restricted permissions.' },
      { question: 'External Secrets Operator?', answer: 'Syncs secrets from external providers to native Kubernetes Secrets.' }
    ],
    [
      { question: 'CSI Driver mounts?', options: ['Kubernetes Secrets', 'External secrets directly', 'ConfigMaps'], answer: 1 },
      { question: 'Volume mount advantage?', options: ['Faster', 'More secure/restricted perms', 'Auto-update'], answer: 1 },
      { question: 'Sealed Secrets for?', options: ['Encryption at rest', 'GitOps-safe secret storage', 'Auto-rotation'], answer: 1 },
      { question: 'Secret exposure risk?', options: ['Only when deleted', 'In env, logs, /proc', 'Never exposed'], answer: 1 }
    ],
    [
      { title: 'Install CSI Driver', useCase: 'External secret store', code: 'helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts;\nhelm install csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver', description: 'Installs CSI driver for external secrets.' },
      { title: 'Use External Secrets Operator', useCase: 'Sync from AWS', code: 'kubectl apply -f external-secret.yaml', description: 'Syncs SecretStore to Kubernetes Secret.' }
    ]
  )
];
