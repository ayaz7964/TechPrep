#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const padTopics = require('../pad-topics');

const OUTPUT_DIR = __dirname;

var topics = [];

function compactTopic(id, title, difficulty, estimatedMinutes, file, interviewQuestions, tldr, deepDive, keyPoints, interviewQs, mcqs, codeExamples) {
  return {
    id: id,
    title: title,
    difficulty: difficulty,
    estimatedMinutes: estimatedMinutes,
    file: file,
    interviewQuestions: interviewQuestions || [],
    tldr: tldr || [],
    deepDive: deepDive || [],
    keyPoints: keyPoints || '',
    interviewQs: interviewQs || [],
    mcqQuestions: mcqs || [],
    codeExamples: codeExamples || []
  };
}

// ============================================================
// Section 15: Kubernetes Fundamentals (beginner)
// ============================================================

topics.push(compactTopic("k8s-architecture", "Kubernetes Architecture", "beginner", 15, "k8s-architecture.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-cluster", "Cluster", "beginner", 10, "k8s-cluster.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-control-plane", "Control Plane", "beginner", 10, "k8s-control-plane.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-worker-node", "Worker Node", "beginner", 10, "k8s-worker-node.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-apiserver", "kube-apiserver", "intermediate", 15, "k8s-apiserver.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-scheduler", "kube-scheduler", "intermediate", 15, "k8s-scheduler.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-controller-manager", "kube-controller-manager", "intermediate", 15, "k8s-controller-manager.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-etcd", "etcd", "intermediate", 15, "k8s-etcd.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-kubelet", "kubelet", "intermediate", 10, "k8s-kubelet.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-kube-proxy", "kube-proxy", "intermediate", 10, "k8s-kube-proxy.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-container-runtime", "Container Runtime", "intermediate", 10, "k8s-container-runtime.json", [], [], [], "", [], [], []));

// ============================================================
// Section 16: Kubernetes Objects (beginner)
// ============================================================

topics.push(compactTopic("k8s-pod", "Pod", "beginner", 10, "k8s-pod.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-replicaset", "ReplicaSet", "beginner", 10, "k8s-replicaset.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-deployment", "Deployment", "beginner", 10, "k8s-deployment.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-statefulset", "StatefulSet", "intermediate", 15, "k8s-statefulset.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-daemonset", "DaemonSet", "intermediate", 15, "k8s-daemonset.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-job", "Job", "beginner", 10, "k8s-job.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-cronjob", "CronJob", "beginner", 10, "k8s-cronjob.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-namespace", "Namespace", "beginner", 10, "k8s-namespace.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-service", "Service", "beginner", 10, "k8s-service.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-configmap", "ConfigMap", "beginner", 10, "k8s-configmap.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-secret", "Secret", "beginner", 10, "k8s-secret.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-persistent-volume", "Persistent Volume", "intermediate", 15, "k8s-persistent-volume.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-persistent-volume-claim", "Persistent Volume Claim", "intermediate", 15, "k8s-persistent-volume-claim.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-storage-class", "Storage Class", "intermediate", 10, "k8s-storage-class.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-ingress", "Ingress", "intermediate", 15, "k8s-ingress.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-network-policy", "Network Policy", "intermediate", 15, "k8s-network-policy.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-service-account", "Service Account", "intermediate", 10, "k8s-service-account.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-resource-quota", "ResourceQuota", "intermediate", 10, "k8s-resource-quota.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-limit-range", "LimitRange", "intermediate", 10, "k8s-limit-range.json", [], [], [], "", [], [], []));

// ============================================================
// Section 17: Pods (intermediate)
// ============================================================

topics.push(compactTopic("k8s-pod-lifecycle", "Pod Lifecycle", "beginner", 10, "k8s-pod-lifecycle.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-init-containers", "Init Containers", "intermediate", 10, "k8s-init-containers.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-sidecar-containers", "Sidecar Containers", "intermediate", 10, "k8s-sidecar-containers.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-multi-container-pods", "Multi-container Pods", "intermediate", 15, "k8s-multi-container-pods.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-pod-scheduling", "Pod Scheduling", "intermediate", 15, "k8s-pod-scheduling.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-pod-affinity", "Pod Affinity", "advanced", 20, "k8s-pod-affinity.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-anti-affinity", "Anti-Affinity", "advanced", 15, "k8s-anti-affinity.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-taints", "Taints", "intermediate", 15, "k8s-taints.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-tolerations", "Tolerations", "intermediate", 15, "k8s-tolerations.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-pod-priority", "Pod Priority", "intermediate", 10, "k8s-pod-priority.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-pdb", "Pod Disruption Budget", "intermediate", 15, "k8s-pdb.json", [], [], [], "", [], [], []));

// ============================================================
// Section 18: Deployments (intermediate)
// ============================================================

topics.push(compactTopic("k8s-rolling-updates", "Rolling Updates", "intermediate", 15, "k8s-rolling-updates.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-rollback", "Rollback", "intermediate", 10, "k8s-rollback.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-replica-management", "Replica Management", "intermediate", 10, "k8s-replica-management.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-deployment-strategy", "Deployment Strategy", "intermediate", 15, "k8s-deployment-strategy.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-canary-deployment", "Canary Deployment", "advanced", 20, "k8s-canary-deployment.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-blue-green-deployment", "Blue Green Deployment", "advanced", 20, "k8s-blue-green-deployment.json", [], [], [], "", [], [], []));

// ============================================================
// Section 19: Services (intermediate)
// ============================================================

topics.push(compactTopic("k8s-clusterip", "ClusterIP", "beginner", 10, "k8s-clusterip.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nodeport", "NodePort", "beginner", 10, "k8s-nodeport.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-loadbalancer", "LoadBalancer", "intermediate", 10, "k8s-loadbalancer.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-externalname", "ExternalName", "intermediate", 10, "k8s-externalname.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-headless-service", "Headless Service", "intermediate", 15, "k8s-headless-service.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-service-discovery", "Service Discovery", "intermediate", 15, "k8s-service-discovery.json", [], [], [], "", [], [], []));

// ============================================================
// Section 20: ConfigMaps (intermediate)
// ============================================================

topics.push(compactTopic("k8s-configmap-create", "Create ConfigMap", "beginner", 5, "k8s-configmap-create.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-configmap-env", "Environment Variables", "beginner", 5, "k8s-configmap-env.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-configmap-volume", "Mount as Volume", "intermediate", 10, "k8s-configmap-volume.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-configmap-update", "Update ConfigMap", "intermediate", 10, "k8s-configmap-update.json", [], [], [], "", [], [], []));

// ============================================================
// Section 21: Secrets (intermediate)
// ============================================================

topics.push(compactTopic("k8s-secret-opaque", "Opaque Secret", "beginner", 10, "k8s-secret-opaque.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-secret-tls", "TLS Secret", "intermediate", 10, "k8s-secret-tls.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-secret-regcred", "Docker Registry Secret", "intermediate", 10, "k8s-secret-regcred.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-secret-encryption", "Secret Encryption", "advanced", 15, "k8s-secret-encryption.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-secret-management", "Secret Management", "advanced", 15, "k8s-secret-management.json", [], [], [], "", [], [], []));

// ============================================================
// Section 22: Storage (intermediate)
// ============================================================

topics.push(compactTopic("k8s-storage-pv", "Persistent Volumes", "intermediate", 15, "k8s-storage-pv.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-storage-pvc", "Persistent Volume Claims", "intermediate", 15, "k8s-storage-pvc.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-dynamic-provisioning", "Dynamic Provisioning", "intermediate", 15, "k8s-dynamic-provisioning.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-csi-drivers", "CSI Drivers", "advanced", 15, "k8s-csi-drivers.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-storage-local", "Local Storage", "intermediate", 10, "k8s-storage-local.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-storage-cloud", "Cloud Storage", "intermediate", 15, "k8s-storage-cloud.json", [], [], [], "", [], [], []));

// ============================================================
// Section 23: Ingress (intermediate)
// ============================================================

topics.push(compactTopic("k8s-ingress-controller", "Ingress Controller", "intermediate", 15, "k8s-ingress-controller.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-ingress", "NGINX Ingress", "intermediate", 15, "k8s-nginx-ingress.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-traefik", "Traefik", "intermediate", 15, "k8s-traefik.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-haproxy", "HAProxy", "intermediate", 15, "k8s-haproxy.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-ingress-tls", "TLS", "intermediate", 10, "k8s-ingress-tls.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-ssl-certificates", "SSL Certificates", "intermediate", 10, "k8s-ssl-certificates.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-host-routing", "Host Routing", "intermediate", 10, "k8s-host-routing.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-path-routing", "Path Routing", "intermediate", 10, "k8s-path-routing.json", [], [], [], "", [], [], []));

// ============================================================
// Section 24: Scaling (advanced)
// ============================================================

topics.push(compactTopic("k8s-hpa", "Horizontal Pod Autoscaler (HPA)", "advanced", 20, "k8s-hpa.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-vpa", "Vertical Pod Autoscaler (VPA)", "advanced", 20, "k8s-vpa.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-cluster-autoscaler", "Cluster Autoscaler", "advanced", 15, "k8s-cluster-autoscaler.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-scaling-manual", "Manual Scaling", "beginner", 5, "k8s-scaling-manual.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-auto-scaling", "Auto Scaling", "advanced", 15, "k8s-auto-scaling.json", [], [], [], "", [], [], []));

// ============================================================
// Section 25: Networking (advanced)
// ============================================================

topics.push(compactTopic("k8s-cluster-networking", "Cluster Networking", "intermediate", 15, "k8s-cluster-networking.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-dns", "DNS", "intermediate", 10, "k8s-dns.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-coredns", "CoreDNS", "intermediate", 10, "k8s-coredns.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-cni", "CNI", "intermediate", 15, "k8s-cni.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-calico", "Calico", "intermediate", 15, "k8s-calico.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-flannel", "Flannel", "intermediate", 15, "k8s-flannel.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-weave", "Weave", "intermediate", 15, "k8s-weave.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-istio", "Istio", "advanced", 20, "k8s-istio.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-linkerd", "Linkerd", "advanced", 20, "k8s-linkerd.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-service-mesh", "Service Mesh", "advanced", 20, "k8s-service-mesh.json", [], [], [], "", [], [], []));

// ============================================================
// Section 26: Load Balancing (intermediate)
// ============================================================

topics.push(compactTopic("k8s-lb-internal", "Internal Load Balancer", "intermediate", 10, "k8s-lb-internal.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-lb-external", "External Load Balancer", "intermediate", 10, "k8s-lb-external.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-lb-layer4", "Layer 4 Load Balancer", "intermediate", 10, "k8s-lb-layer4.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-lb-layer7", "Layer 7 Load Balancer", "intermediate", 10, "k8s-lb-layer7.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-lb-round-robin", "Round Robin", "beginner", 5, "k8s-lb-round-robin.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-lb-least-connections", "Least Connections", "intermediate", 5, "k8s-lb-least-connections.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-lb-sticky-sessions", "Sticky Sessions", "intermediate", 10, "k8s-lb-sticky-sessions.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-lb-health-checks", "Health Checks", "intermediate", 10, "k8s-lb-health-checks.json", [], [], [], "", [], [], []));

// ============================================================
// Section 27: NGINX (intermediate)
// ============================================================

topics.push(compactTopic("k8s-nginx-basics", "NGINX Basics", "beginner", 10, "k8s-nginx-basics.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-reverse-proxy", "Reverse Proxy", "intermediate", 15, "k8s-nginx-reverse-proxy.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-load-balancer", "Load Balancer", "intermediate", 15, "k8s-nginx-load-balancer.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-ssl", "SSL/TLS", "intermediate", 15, "k8s-nginx-ssl.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-https", "HTTPS", "intermediate", 10, "k8s-nginx-https.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-url-rewrite", "URL Rewrite", "intermediate", 10, "k8s-nginx-url-rewrite.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-compression", "Compression", "intermediate", 10, "k8s-nginx-compression.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-caching", "Caching", "intermediate", 10, "k8s-nginx-caching.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-rate-limiting", "Rate Limiting", "intermediate", 15, "k8s-nginx-rate-limiting.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-static-files", "Static File Hosting", "beginner", 10, "k8s-nginx-static-files.json", [], [], [], "", [], [], []));
topics.push(compactTopic("k8s-nginx-ingress", "NGINX Ingress Controller", "advanced", 20, "k8s-nginx-ingress.json", [], [], [], "", [], [], []));

// ============================================================
// GENERATE
// ============================================================

padTopics(topics);

var data = 'var TOPICS_DATA = TOPICS_DATA || {};\n';
data += 'TOPICS_DATA["kubernetes"] = ' + JSON.stringify(topics, null, 2) + ';\n';

var dataPath = path.join(OUTPUT_DIR, 'topics-data.js');
fs.writeFileSync(dataPath, data);
console.log('Generated topics-data.js (' + (Buffer.byteLength(data) / 1024).toFixed(0) + ' KB) with ' + topics.length + ' topics');

var json = topics.map(function(t) {
  return {
    id: t.id,
    title: t.title,
    difficulty: t.difficulty,
    estimatedMinutes: t.estimatedMinutes,
    file: t.file
  };
});
var jsonPath = path.join(OUTPUT_DIR, 'topics.json');
fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));
console.log('Generated topics.json with ' + json.length + ' topics');
console.log('All done!');
