#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { svgW, R, A, T, Tw } = require('../svg-helpers');
const padTopics = require('../pad-topics');
const content = require('./k8s-content');

const OUTPUT_DIR = __dirname;

var topics = [].concat(content);

// Add practice/CI/CD topic
topics.push({
  id: 'k8s-ci-cd-pipeline',
  title: 'Kubernetes CI/CD Pipeline',
  difficulty: 'advanced',
  estimatedMinutes: 30,
  file: 'k8s-ci-cd-pipeline.json',
  interviewAnswer: 'A Kubernetes CI/CD pipeline automates building, testing, and deploying containerized applications. Tools: Jenkins, GitLab CI, ArgoCD, Helm. GitOps: ArgoCD syncs desired state from Git. Canary/BlueGreen via Flagger or Argo Rollouts.',
  tldr: [
    'CI/CD pipelines build images and deploy to Kubernetes',
    'ArgoCD / Flux enable GitOps: Git repo = desired cluster state',
    'Helm / Kustomize manage Kubernetes manifests as packages',
    'Canary deployments via Flagger or Argo Rollouts with metrics-based promotion'
  ],
  deepDive: [
    { heading: 'Pipeline Stages', text: 'Code commit -> build image -> push registry -> update manifests -> deploy to staging -> run tests -> promote to production (manual or automatic). Image tagging: commit SHA or semantic version for traceability.' },
    { heading: 'GitOps with ArgoCD', text: 'ArgoCD watches Git repo for manifest changes. Syncs desired state to cluster. Auto-heals drift. Supports canary (Argo Rollouts), multi-cluster, SSO. Application CRD defines source repo, target namespace, sync policy.' }
  ],
  interviewQuestions: [
    { question: 'What is GitOps?', answer: 'Git repo is the single source of truth. Tools like ArgoCD sync cluster state to match Git.' },
    { question: 'Helm vs Kustomize?', answer: 'Helm: package manager with templates and values. Kustomize: native Kubernetes overlay patching.' },
    { question: 'How to do canary in CI/CD?', answer: 'Flagger or Argo Rollouts with metrics analysis before full promotion.' },
    { question: 'Image tagging strategy?', answer: 'Commit SHA or semantic version for immutable, traceable deployments.' }
  ],
  mcqQuestions: [
    { question: 'GitOps tool?', options: ['Jenkins', 'ArgoCD', 'GitLab CI'], answer: 1 },
    { question: 'Helm uses?', options: ['Templates + values.yaml', 'Overlay patches', 'Shell scripts'], answer: 0 },
    { question: 'ArgoCD watches?', options: ['Container registry', 'Git repository', 'Jenkins'], answer: 1 },
    { question: 'Flagger does?', options: ['Build images', 'Canary promotion', 'Git operations'], answer: 1 }
  ],
  codeExamples: [
    { title: 'ArgoCD App', useCase: 'GitOps deployment', code: 'argocd app create my-app --repo https://github.com/me/my-app --path k8s --dest-server https://kubernetes.default.svc --dest-namespace default', description: 'Creates ArgoCD Application.' },
    { title: 'Trigger ArgoCD Sync', useCase: 'Manual sync', code: 'argocd app sync my-app', description: 'Syncs ArgoCD app with Git.' }
  ]
});

padTopics(topics);

// Add laymanDefinition and diagramSvg to each topic
/* svgW from shared helpers */
/* svgBox replaced */
for (var i = 0; i < topics.length; i++) {
  var t = topics[i];
  if (!t.laymanDefinition) {
    t.laymanDefinition = t.interviewAnswer || (t.tldr[0] ? t.tldr[0].replace(/<[^>]*>/g, '') : t.title + ' is a key Kubernetes concept.');
  }
  if (!t.diagramSvg) {
    t.diagramSvg = svgW(500, 280, t.title, R(20, 45, 460, 60, '#e8f4f8', '#ccc', t.title) + T(250, 155, t.tldr[0]||'Key Kubernetes concept', 10, '#555', 'middle'));
  }
}

// Convert array to object keyed by topic ID (for TOPICS_DATA lookup)
var topicList = [];
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["kubernetes"] = TOPICS_DATA["kubernetes"] || {};');

for (var i = 0; i < topics.length; i++) {
  var t = topics[i];
  lines.push('TOPICS_DATA["kubernetes"]["' + t.id + '"] = ' + JSON.stringify(t) + ';');
  topicList.push({
    id: t.id,
    title: t.title,
    difficulty: t.difficulty,
    estimatedMinutes: t.estimatedMinutes,
    file: t.file
  });
}

var dataPath = path.join(OUTPUT_DIR, 'topics-data.js');
fs.writeFileSync(dataPath, lines.join('\n'));
console.log('Generated topics-data.js (' + (Buffer.byteLength(lines.join('\n')) / 1024).toFixed(0) + ' KB) with ' + topics.length + ' topics');

var jsonPath = path.join(OUTPUT_DIR, 'topics.json');
fs.writeFileSync(jsonPath, JSON.stringify(topicList, null, 2));
console.log('Generated topics.json with ' + topicList.length + ' topics');
console.log('All done!');

