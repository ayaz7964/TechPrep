var { topic } = require('./helpers');

module.exports = [

  // Create ConfigMap
  topic('k8s-configmap-create', 'Create ConfigMap', 'beginner', 5,
    'Creating a ConfigMap stores configuration as key-value pairs. Methods: --from-literal, --from-file, --from-env-file, or YAML. ConfigMaps are namespace-scoped. Immutable ConfigMaps (v1.21+) reject data changes.',
    [
      'Methods: --from-literal, --from-file, --from-env-file, YAML',
      'Keys must be valid DNS subdomains (alphanumeric, dash, dot)',
      'Values stored as strings (binary needs binaryData field)',
      'Immutable ConfigMaps reject data changes after creation'
    ],
    [
      { heading: 'Creation Methods', text: 'kubectl create configmap: --from-literal key=value, --from-file=path (filename becomes key, content becomes value), --from-env-file=.env (KEY=VALUE format). YAML: apiVersion: v1, kind: ConfigMap, data: { key: value }, binaryData: { key: base64 }.' },
      { heading: 'Size Limits', text: 'ConfigMap size limited by etcd (default 1.5 MiB per resource). Binary data uses binaryData with base64 encoding. Keys max 253 characters.' }
    ],
    [
      { question: 'How to create a ConfigMap?', answer: 'kubectl create configmap <name> --from-literal, --from-file, or YAML.' },
      { question: 'What is immutable ConfigMap?', answer: 'ConfigMap with immutable: true — data cannot be modified after creation.' },
      { question: 'Key naming rules?', answer: 'Valid DNS subdomain: alphanumeric, dashes, dots. Max 253 chars.' },
      { question: 'ConfigMap size limit?', answer: 'Limited by etcd (default 1.5 MiB per resource).' }
    ],
    [
      { question: 'Create from file?', options: ['--from-file', '--from-literal', '--from-env-file'], answer: 0 },
      { question: 'Immutable ConfigMap?', options: ['Can be modified', 'Cannot be modified after creation', 'Read-only at runtime'], answer: 1 },
      { question: 'ConfigMap scope?', options: ['Cluster', 'Namespace', 'Node'], answer: 1 },
      { question: 'Key format?', options: ['Any string', 'DNS subdomain', 'Base64 encoded'], answer: 1 }
    ],
    [
      { title: 'Create from Literal', useCase: 'Simple key-value', code: 'kubectl create configmap app-config --from-literal=LOG_LEVEL=info --from-literal=PORT=3000', description: 'Creates ConfigMap with two entries.' },
      { title: 'Create from File', useCase: 'Config file as value', code: 'kubectl create configmap app-config --from-file=./nginx.conf', description: 'Stores file content as a key.' },
      { title: 'Create Immutable', useCase: 'Prevent changes', code: 'kubectl apply -f configmap-immutable.yaml', description: 'ConfigMap with immutable: true.' }
    ]
  ),

  // Environment Variables
  topic('k8s-configmap-env', 'Environment Variables', 'beginner', 5,
    'ConfigMap data injected as Pod environment variables via valueFrom.configMapKeyRef (specific key) or envFrom.configMapRef (all keys). Env vars are set at Pod startup and NOT updated when ConfigMap changes.',
    [
      'valueFrom.configMapKeyRef: reference specific key',
      'envFrom.configMapRef: inject all keys as env vars',
      'Optional: configMapKeyRef.optional: true allows missing ConfigMap',
      'Env vars set at Pod startup — no dynamic updates'
    ],
    [
      { heading: 'envFrom Prefix', text: 'envFrom with prefix (e.g., prefix: MYAPP_) prepends to all env var names. Multiple envFrom entries merge. Invalid env var names are skipped (event logged). Env from env takes precedence over envFrom.' },
      { heading: 'Precedence', text: 'Evaluated: env entries first, then envFrom. Same-name env: later overwrites earlier. fieldRef (downward API) and resourceFieldRef also allowed. Secret and ConfigMap env vars can be mixed.' }
    ],
    [
      { question: 'How to inject ConfigMap as env?', answer: 'valueFrom.configMapKeyRef for specific key. envFrom.configMapRef for all keys.' },
      { question: 'Dynamic updates?', answer: 'No. Env vars set at Pod startup and static for Pod lifetime.' },
      { question: 'Invalid env var name?', answer: 'Skipped silently — event logged to Pod.' },
      { question: 'Optional ConfigMap?', answer: 'configMapKeyRef.optional: true allows Pod start without ConfigMap.' }
    ],
    [
      { question: 'Inject all keys?', options: ['env', 'envFrom', 'valueFrom'], answer: 1 },
      { question: 'Dynamic updates?', options: ['Yes', 'No', 'With restart only'], answer: 1 },
      { question: 'Optional flag?', options: ['optional: true', 'allowMissing: true', 'skipIfMissing: true'], answer: 0 },
      { question: 'envFrom prefix?', options: ['prefix:', 'prefixEnv:', 'namePrefix:'], answer: 0 }
    ],
    [
      { title: 'Inject Single Key', useCase: 'Specific env var', code: 'kubectl set env deployment/web --from=configmap/app-config LOG_LEVEL', description: 'Injects LOG_LEVEL from ConfigMap.' },
      { title: 'Inject All Keys', useCase: 'All keys as env', code: 'kubectl set env deployment/web --from=configmap/app-config', description: 'All keys become env vars.' },
      { title: 'Test Env Vars', useCase: 'Verify injection', code: 'kubectl exec <pod> -- env | grep LOG_LEVEL', description: 'Shows injected env vars.' }
    ]
  ),

  // Mount as Volume
  topic('k8s-configmap-volume', 'Mount as Volume', 'intermediate', 10,
    'ConfigMap data can be mounted as files in Pods. Each key becomes a filename, value becomes content. Preferred for config files (nginx.conf, app.properties). Unlike env vars, volume mounts auto-update with kubelet sync (~1 min).',
    [
      'Mount ConfigMap keys as files in Pod containers',
      'Items field: select specific keys with custom paths',
      'subPath: mounts individual file (does NOT auto-update)',
      'Volume mounts auto-update (kubelet sync ~1 min delay)'
    ],
    [
      { heading: 'Mount Options', text: 'Full mount: all keys become files. Items: select specific keys, custom paths, file mode. subPath: mount single file (avoids directory overlay). defaultMode: permissions (default 0644).' },
      { heading: 'Update Behavior', text: 'Volume mounts auto-update via symlink swap. kubelet checks ConfigMap periodically (~1 min). Symlink points to updated files atomically. Applications may need SIGHUP or reload. subPath mounts do NOT auto-update.' }
    ],
    [
      { question: 'How to mount ConfigMap as volume?', answer: 'volumes[].configMap with volumeMounts in container spec.' },
      { question: 'Auto-update?', answer: 'Full mounts yes (kubelet sync). subPath does NOT.' },
      { question: 'Items field?', answer: 'Select specific keys, set custom paths and permissions.' },
      { question: 'Permission default?', answer: '0644. Changed with defaultMode field.' }
    ],
    [
      { question: 'Auto-update mount method?', options: ['Full volume mount', 'subPath mount', 'Env var'], answer: 0 },
      { question: 'Items field selects?', options: ['All keys', 'Specific keys', 'All keys with paths'], answer: 1 },
      { question: 'Does NOT auto-update?', options: ['Full mount', 'subPath', 'Symlink mount'], answer: 1 },
      { question: 'Default mode?', options: ['0444', '0644', '0755'], answer: 1 }
    ],
    [
      { title: 'Mount ConfigMap Volume', useCase: 'Mount as config directory', code: 'kubectl set volume deployment/web --add --name=config --mount-path=/etc/config --configmap=app-config', description: 'Mounts all keys to /etc/config.' },
      { title: 'Mount with Items', useCase: 'Select specific keys', code: 'kubectl apply -f cm-volume-items.yaml', description: 'Mounts specific keys with custom names.' },
      { title: 'subPath Mount', useCase: 'Single file mount', code: 'kubectl apply -f cm-subpath.yaml', description: 'Mounts single file without directory overlay.' }
    ]
  ),

  // Update ConfigMap
  topic('k8s-configmap-update', 'Update ConfigMap', 'intermediate', 10,
    'ConfigMaps can be updated via edit, patch, or apply (unless immutable). Volume-mount consumers auto-update (~1 min). Env var consumers require Pod restart. Rolling restart picks up new configs.',
    [
      'kubectl edit, patch, apply to update data',
      'Immutable ConfigMaps reject all modifications',
      'Volume mounts auto-update (~1 min kubelet sync)',
      'Env vars static — require Pod recreation'
    ],
    [
      { heading: 'Update Methods', text: 'kubectl edit configmap, kubectl patch configmap -p \'{"data":{"key":"val"}}\', kubectl apply. For volume mounts, content updates after kubelet sync period.' },
      { heading: 'Triggering Rollout', text: 'kubectl rollout restart deployment restarts Pods for env var updates. ConfigMap changes alone do NOT trigger rollouts. Tools like Reloader (stakater) auto-roll on ConfigMap changes.' }
    ],
    [
      { question: 'How to update a ConfigMap?', answer: 'kubectl edit, patch, or create --dry-run -o yaml | apply.' },
      { question: 'Env vars updated?', answer: 'No. Static. Pods must be restarted.' },
      { question: 'Volume mount updates?', answer: 'Yes, with kubelet sync delay (~1 min).' },
      { question: 'Restart Pods for changes?', answer: 'kubectl rollout restart deployment/<name>.' }
    ],
    [
      { question: 'Immutable ConfigMap?', options: ['Can be updated', 'Cannot be updated', 'Updated on restart'], answer: 1 },
      { question: 'Volume mount update delay?', options: ['Instant', '~1 min', '~5 min'], answer: 1 },
      { question: 'Rollout restart command?', options: ['kubectl restart', 'kubectl rollout restart', 'kubectl redeploy'], answer: 1 },
      { question: 'Env var update requires?', options: ['Pod restart', 'kubectl sync', 'kubelet restart'], answer: 0 }
    ],
    [
      { title: 'Edit ConfigMap', useCase: 'Modify value', code: 'kubectl edit configmap app-config', description: 'Opens editor to modify.' },
      { title: 'Patch ConfigMap', useCase: 'Update key-value', code: 'kubectl patch configmap app-config -p \'{"data":{"LOG_LEVEL":"debug"}}\'', description: 'Patches LOG_LEVEL to debug.' },
      { title: 'Rollout Restart', useCase: 'Pick up changes', code: 'kubectl rollout restart deployment/web', description: 'Restarts Pods for env var changes.' }
    ]
  )
];
