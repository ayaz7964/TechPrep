// Generates topics-data.js for ALL new categories
const fs = require('fs');
const path = require('path');
const padTopics = require('./pad-topics');

var top = {
  cdn: [
    ['cdn-fundamentals','CDN Fundamentals','beginner',20],
    ['cdn-edge-servers','Edge Servers','beginner',15],
    ['cdn-edge-locations','Edge Locations','beginner',15],
    ['cdn-origin-server','Origin Server','beginner',15],
    ['cdn-cache-hit','Cache Hit','beginner',10],
    ['cdn-cache-miss','Cache Miss','beginner',10],
    ['cdn-cache-invalidation','Cache Invalidation','intermediate',20],
    ['cdn-cache-control-headers','Cache-Control Headers','intermediate',20],
    ['cdn-ttl','TTL (Time To Live)','beginner',15],
    ['cdn-dynamic-content','Dynamic Content','intermediate',20],
    ['cdn-static-content','Static Content','beginner',10],
    ['cdn-image-optimization','Image Optimization','intermediate',20],
    ['cdn-compression','Compression','intermediate',15],
    ['cdn-brotli','Brotli','intermediate',15],
    ['cdn-gzip','Gzip','beginner',10],
    ['cdn-http-2','HTTP/2','intermediate',20],
    ['cdn-http-3','HTTP/3','advanced',20],
    ['cdn-security','CDN Security','intermediate',20],
    ['cdn-geo-routing','Geo Routing','intermediate',15],
    ['cdn-geo-blocking','Geo Blocking','intermediate',15],
    ['cdn-ddos-protection','DDoS Protection','advanced',25],
    ['cdn-waf-integration','WAF Integration','advanced',20],
    ['cdn-signed-urls','Signed URLs','advanced',20],
    ['cdn-signed-cookies','Signed Cookies','advanced',20],
    ['cdn-cloudflare','Cloudflare CDN','intermediate',20],
    ['cdn-aws-cloudfront','AWS CloudFront','intermediate',25],
    ['cdn-azure-cdn','Azure CDN','intermediate',20],
    ['cdn-google-cloud-cdn','Google Cloud CDN','intermediate',20],
    ['cdn-fastly','Fastly','intermediate',20],
    ['cdn-akamai','Akamai','advanced',20]
  ],
  'traffic-management': [
    ['tm-reverse-proxy','Reverse Proxy','intermediate',20],
    ['tm-forward-proxy','Forward Proxy','intermediate',15],
    ['tm-api-gateway','API Gateway','intermediate',20],
    ['tm-load-balancing','Load Balancing','intermediate',20],
    ['tm-traffic-routing','Traffic Routing','intermediate',15],
    ['tm-path-routing','Path Routing','beginner',10],
    ['tm-host-routing','Host Routing','beginner',10],
    ['tm-dns-routing','DNS Routing','intermediate',15],
    ['tm-geo-routing','Geo Routing','intermediate',15],
    ['tm-traffic-splitting','Traffic Splitting','intermediate',15],
    ['tm-canary-routing','Canary Routing','advanced',20],
    ['tm-blue-green-routing','Blue Green Routing','advanced',20],
    ['tm-session-affinity','Session Affinity','intermediate',15],
    ['tm-sticky-sessions','Sticky Sessions','intermediate',15],
    ['tm-circuit-breaker','Circuit Breaker','advanced',20],
    ['tm-retry-policies','Retry Policies','intermediate',15],
    ['tm-failover','Failover','advanced',20],
    ['tm-disaster-recovery','Disaster Recovery','advanced',25],
    ['tm-active-active','Active-Active','advanced',20],
    ['tm-active-passive','Active-Passive','advanced',20],
    ['tm-health-checks','Health Checks','intermediate',15],
    ['tm-heartbeat','Heartbeat','intermediate',10],
    ['tm-latency-routing','Latency Based Routing','advanced',15],
    ['tm-weighted-routing','Weighted Routing','intermediate',15]
  ],
  'api-gateway': [
    ['ag-kong','Kong','intermediate',20],
    ['ag-nginx-gateway','NGINX API Gateway','intermediate',20],
    ['ag-ambassador','Ambassador','intermediate',15],
    ['ag-traefik','Traefik','intermediate',15],
    ['ag-aws-api-gateway','AWS API Gateway','intermediate',20],
    ['ag-rate-limiting','Rate Limiting','intermediate',15],
    ['ag-authentication','Authentication','intermediate',15],
    ['ag-authorization','Authorization','intermediate',15],
    ['ag-api-keys','API Keys','beginner',10],
    ['ag-jwt-validation','JWT Validation','intermediate',15],
    ['ag-oauth','OAuth','advanced',20],
    ['ag-logging','Logging','beginner',10],
    ['ag-metrics','Metrics','beginner',10]
  ],
  monitoring: [
    ['mon-fundamentals','Monitoring Fundamentals','beginner',15],
    ['mon-metrics','Metrics','beginner',15],
    ['mon-logging','Logging','beginner',10],
    ['mon-tracing','Tracing','intermediate',20],
    ['mon-alerting','Alerting','intermediate',15],
    ['mon-dashboards','Dashboards','beginner',10],
    ['mon-prometheus','Prometheus','intermediate',25],
    ['mon-grafana','Grafana','intermediate',20],
    ['mon-loki','Loki','intermediate',15],
    ['mon-elasticsearch','Elasticsearch','intermediate',20],
    ['mon-kibana','Kibana','intermediate',15],
    ['mon-fluentd','Fluentd','intermediate',15],
    ['mon-fluent-bit','Fluent Bit','intermediate',15],
    ['mon-jaeger','Jaeger','advanced',20],
    ['mon-zipkin','Zipkin','advanced',20],
    ['mon-opentelemetry','OpenTelemetry','advanced',25]
  ],
  logging: [
    ['log-centralized','Centralized Logging','intermediate',15],
    ['log-structured','Structured Logging','intermediate',15],
    ['log-aggregation','Log Aggregation','intermediate',15],
    ['log-rotation','Log Rotation','beginner',10],
    ['log-levels','Log Levels','beginner',10],
    ['log-shipping','Log Shipping','intermediate',15]
  ],
  mern: [
    ['mern-architecture','MERN Architecture','intermediate',20],
    ['mern-setup','MERN Stack Setup','beginner',15],
    ['mern-rest-api','REST API with MERN','intermediate',25],
    ['mern-authentication','MERN Authentication','intermediate',20],
    ['mern-file-upload','File Upload in MERN','intermediate',15],
    ['mern-deployment','MERN Deployment','advanced',20],
    ['mern-state-management','MERN State Management','intermediate',20],
    ['mern-real-time','Real-Time with Socket.io','intermediate',20],
    ['mern-testing','MERN Testing','advanced',20],
    ['mern-performance','MERN Performance','advanced',15],
    ['mern-security','MERN Security','advanced',20],
    ['mern-graphql','MERN + GraphQL','advanced',25],
    ['mern-docker','MERN with Docker','intermediate',20],
    ['mern-ci-cd','MERN CI/CD Pipeline','advanced',20],
    ['mern-monitoring','MERN Monitoring','intermediate',15]
  ],
  'system-design': [
    ['sd-interview','System Design Interview','advanced',30],
    ['sd-scalability','Scalability','advanced',25],
    ['sd-microservices','Microservices Architecture','advanced',25],
    ['sd-monolithic','Monolithic Architecture','intermediate',15],
    ['sd-load-balancing','Load Balancing','intermediate',20],
    ['sd-caching','Caching Strategies','intermediate',20],
    ['sd-database-sharding','Database Sharding','advanced',25],
    ['sd-database-replication','Database Replication','intermediate',20],
    ['sd-cdn','Content Delivery Network','intermediate',15],
    ['sd-message-queues','Message Queues','intermediate',20],
    ['sd-event-driven','Event-Driven Architecture','advanced',20],
    ['sd-cap-theorem','CAP Theorem','advanced',15],
    ['sd-consistency-patterns','Consistency Patterns','advanced',20],
    ['sd-bloom-filters','Bloom Filters','advanced',15],
    ['sd-consistent-hashing','Consistent Hashing','advanced',20],
    ['sd-rate-limiting','Rate Limiting','intermediate',15],
    ['sd-circuit-breaker','Circuit Breaker Pattern','advanced',15],
    ['sd-leader-election','Leader Election','advanced',15],
    ['sd-distributed-transactions','Distributed Transactions','advanced',25],
    ['sd-id-generation','ID Generation','intermediate',15],
    ['sd-url-shortener','Design URL Shortener','advanced',20],
    ['sd-pastebin','Design Pastebin','advanced',20],
    ['sd-chat-system','Design Chat System','advanced',25],
    ['sd-design-twitter','Design Twitter Feed','advanced',30]
  ],
  devops: [
    ['devops-culture','DevOps Culture','beginner',15],
    ['devops-cloud-computing','Cloud Computing','beginner',15],
    ['devops-aws-ec2','AWS EC2','intermediate',20],
    ['devops-aws-s3','AWS S3','intermediate',20],
    ['devops-aws-lambda','AWS Lambda','intermediate',20],
    ['devops-aws-vpc','AWS VPC','intermediate',20],
    ['devops-iac','Infrastructure as Code','intermediate',20],
    ['devops-terraform','Terraform','intermediate',25],
    ['devops-cloudformation','CloudFormation','intermediate',20],
    ['devops-ansible','Ansible','intermediate',20],
    ['devops-puppet','Puppet','intermediate',15],
    ['devops-chef','Chef','intermediate',15],
    ['devops-config-mgmt','Configuration Management','intermediate',15],
    ['devops-containerization','Containerization','intermediate',20],
    ['devops-orchestration','Orchestration','advanced',20],
    ['devops-cloud-migration','Cloud Migration','advanced',20],
    ['devops-hybrid-cloud','Hybrid Cloud','advanced',20],
    ['devops-multi-cloud','Multi-Cloud Strategy','advanced',20],
    ['devops-cost-optimization','Cloud Cost Optimization','intermediate',15],
    ['devops-cloud-security','Cloud Security','advanced',20]
  ],
  git: [
    ['git-workflow','Git Workflows','intermediate',20],
    ['git-branching','Branching Strategies','intermediate',20],
    ['git-merge','Git Merge','intermediate',15],
    ['git-rebase','Git Rebase','intermediate',20],
    ['git-stash','Git Stash','beginner',10],
    ['git-tag','Git Tags','beginner',10],
    ['git-submodule','Git Submodules','intermediate',15],
    ['git-hooks','Git Hooks','intermediate',15],
    ['git-bisect','Git Bisect','advanced',15],
    ['git-revert','Git Revert','intermediate',10],
    ['git-reset','Git Reset','intermediate',15],
    ['git-cherry-pick','Git Cherry-Pick','intermediate',15],
    ['git-pull-request','Pull Requests','beginner',15],
    ['git-code-review','Code Review','intermediate',15],
    ['git-ci-cd-pipeline','CI/CD Pipeline','intermediate',20],
    ['git-ci-cd-tools','CI/CD Tools','intermediate',15],
    ['git-build-automation','Build Automation','intermediate',20],
    ['git-test-automation','Test Automation','intermediate',20],
    ['git-deployment-automation','Deployment Automation','advanced',20],
    ['git-release-mgmt','Release Management','intermediate',15]
  ],
  dsa: [
    ['dsa-arrays','Arrays','beginner',20],
    ['dsa-linked-lists','Linked Lists','beginner',20],
    ['dsa-stacks','Stacks','beginner',15],
    ['dsa-queues','Queues','beginner',15],
    ['dsa-hash-tables','Hash Tables','intermediate',20],
    ['dsa-trees','Trees','intermediate',20],
    ['dsa-binary-trees','Binary Trees','intermediate',20],
    ['dsa-bst','Binary Search Trees','intermediate',20],
    ['dsa-heaps','Heaps','intermediate',20],
    ['dsa-graphs','Graphs','advanced',25],
    ['dsa-dfs','DFS (Depth-First Search)','intermediate',20],
    ['dsa-bfs','BFS (Breadth-First Search)','intermediate',20],
    ['dsa-dynamic-programming','Dynamic Programming','advanced',30],
    ['dsa-recursion','Recursion','intermediate',20],
    ['dsa-backtracking','Backtracking','advanced',25],
    ['dsa-greedy','Greedy Algorithms','intermediate',20],
    ['dsa-divide-conquer','Divide and Conquer','intermediate',20],
    ['dsa-sorting','Sorting Algorithms','intermediate',20],
    ['dsa-searching','Searching Algorithms','intermediate',15],
    ['dsa-two-pointers','Two Pointers','intermediate',15],
    ['dsa-sliding-window','Sliding Window','intermediate',15],
    ['dsa-prefix-sum','Prefix Sum','intermediate',10],
    ['dsa-bit-manipulation','Bit Manipulation','advanced',20],
    ['dsa-trie','Trie','advanced',20],
    ['dsa-union-find','Union Find','advanced',20],
    ['dsa-topological-sort','Topological Sort','advanced',15],
    ['dsa-shortest-path','Shortest Path','advanced',20],
    ['dsa-min-spanning-tree','Minimum Spanning Tree','advanced',15],
    ['dsa-string-matching','String Matching','advanced',20],
    ['dsa-time-complexity','Time Complexity','beginner',15]
  ],
  oop: [
    ['oop-basics','OOP Basics','beginner',15],
    ['oop-encapsulation','Encapsulation','beginner',15],
    ['oop-inheritance','Inheritance','beginner',15],
    ['oop-polymorphism','Polymorphism','intermediate',15],
    ['oop-abstraction','Abstraction','intermediate',15],
    ['oop-solid','SOLID Principles','intermediate',20],
    ['oop-single-responsibility','Single Responsibility','intermediate',15],
    ['oop-open-closed','Open-Closed Principle','intermediate',15],
    ['oop-liskov','Liskov Substitution','advanced',15],
    ['oop-interface-segregation','Interface Segregation','advanced',15],
    ['oop-dependency-inversion','Dependency Inversion','advanced',15],
    ['oop-design-patterns','Design Patterns','intermediate',20],
    ['oop-singleton','Singleton Pattern','intermediate',15],
    ['oop-factory','Factory Pattern','intermediate',15],
    ['oop-observer','Observer Pattern','intermediate',15],
    ['oop-strategy','Strategy Pattern','intermediate',15],
    ['oop-decorator','Decorator Pattern','intermediate',15],
    ['oop-computer-arch','Computer Architecture','beginner',15],
    ['oop-operating-systems','Operating Systems','intermediate',15],
    ['oop-networking-basics','Networking Basics','intermediate',15]
  ]
};

var TLDR_POOL = [
  '{T} is a fundamental concept in modern infrastructure that enables efficient content delivery and application performance.',
  '{T} plays a critical role in reducing latency, improving reliability, and ensuring scalable operations.',
  'Understanding {T} is essential for building robust, high-performance systems that serve users globally.',
  'Proper implementation of {T} leads to better user experiences, lower operational costs, and improved system resilience.',
  '{T} integrates with other infrastructure components to create a comprehensive service delivery platform.'
];

var DD_POOL = [
  { heading: 'Core Concepts', text: '{T} involves several key principles and patterns that work together to provide reliable service delivery. Understanding these fundamentals is crucial for effective implementation and troubleshooting. The architecture typically follows a layered approach with multiple components working in concert.' },
  { heading: 'Implementation Strategies', text: 'When implementing {T}, consider factors such as scalability, reliability, security, and cost. Start with a clear understanding of requirements, then choose appropriate tools and patterns. Monitor performance and iterate based on real-world usage patterns.' },
  { heading: 'Best Practices', text: 'Follow industry best practices for {T}: automate where possible, implement proper monitoring and alerting, document configurations, plan for failure scenarios, and regularly review and optimize your setup. These practices ensure long-term stability and maintainability.' },
  { heading: 'Common Challenges', text: 'Common challenges with {T} include configuration complexity, performance tuning, debugging distributed issues, managing costs at scale, and keeping up with evolving technologies. Address these through proper planning, testing, and continuous learning.' }
];

var IQ_POOL = [
  { q: 'What is {T}?', a: '{T} is a key component in modern infrastructure that improves performance, reliability, and scalability of content and application delivery.' },
  { q: 'Why is {T} important?', a: '{T} is important because it directly impacts user experience, operational costs, system reliability, and the ability to serve a global audience effectively.' },
  { q: 'What are the key benefits of {T}?', a: 'Key benefits include improved performance, better reliability, reduced costs, enhanced security, global scalability, and simplified infrastructure management.' },
  { q: 'How does {T} improve performance?', a: '{T} improves performance by reducing latency, optimizing data transfer, distributing load, and caching frequently accessed content closer to users.' },
  { q: 'What tools are commonly used with {T}?', a: 'Common tools include CDN providers like Cloudflare and CloudFront, proxy servers like NGINX and Traefik, monitoring tools like Prometheus and Grafana, and automation tools.' }
];

function makeTopics(catId) {
  const list = top[catId];
  var result = {};
  list.forEach(function(item) {
    var id = item[0], title = item[1], diff = item[2], mins = item[3];
    var t = {
      id: id, title: title, difficulty: diff, estimatedMinutes: mins, file: id + '.json',
      tldr: TLDR_POOL.map(function(s) { return s.replace(/\{T\}/g, title); }),
      laymanDefinition: title + ' is like having a specialized service that optimizes how data moves across the internet. Instead of every request traveling a long distance, it gets handled by the nearest available resource, making everything faster and more reliable.',
      deepDive: DD_POOL.map(function(d) { return { heading: d.heading, text: d.text.replace(/\{T\}/g, title) }; }),
      interviewAnswer: title + ' is a critical infrastructure component that optimizes content delivery, improves application performance, and ensures reliable service for users across geographic locations.',
      interviewQuestions: IQ_POOL.map(function(i) { return { question: i.q.replace(/\{T\}/g, title), answer: i.a.replace(/\{T\}/g, title) }; }),
      diagramSvg: '<svg viewBox="0 0 500 160" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:sans-serif"><rect x="0" y="0" width="500" height="160" rx="8" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/><text x="250" y="24" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">' + title + '</text><rect x="20" y="40" width="460" height="90" rx="4" fill="#e8f4f8" stroke="#ccc" stroke-width="1"/><text x="250" y="85" text-anchor="middle" font-size="11" fill="#555">' + title + ' architecture and workflow diagram</text></svg>',
      codeExamples: [
        { title: 'Basic Configuration', useCase: 'Initial setup', code: '// Basic ' + title + ' configuration\n# This shows the fundamental setup for ' + title, description: 'Basic setup example for getting started with ' + title + '.' },
        { title: 'Common Use Case', useCase: 'Typical implementation', code: '# Common implementation pattern\n# Used in everyday scenarios for ' + title, description: 'Standard use case demonstrating ' + title + ' in action.' }
      ],
      mcqQuestions: [
        { question: 'What is the primary purpose of ' + title + '?', options: ['Improve performance and reliability', 'Increase complexity', 'Reduce functionality', 'Slow down delivery'], answer: 0, explanation: title + ' primarily aims to improve performance and reliability of content delivery.' },
        { question: 'What is the recommended approach for ' + title + '?', options: ['Start simple and iterate', 'Build everything at once', 'Skip testing', 'Avoid planning'], answer: 0, explanation: 'Starting simple and iterating is the best approach for implementing ' + title + '.' },
        { question: 'What should be prioritized in ' + title + '?', options: ['Reliability and consistency', 'Speed only', 'Features over quality', 'Manual processes'], answer: 0, explanation: 'Reliability and consistency are foundational priorities for ' + title + '.' },
        { question: 'What is important for ' + title + ' security?', options: ['Access control and encryption', 'Open access', 'Shared passwords', 'No auditing'], answer: 0, explanation: 'Access control and encryption are fundamental security measures for ' + title + '.' },
        { question: 'How does ' + title + ' improve user experience?', options: ['By reducing latency and improving speed', 'By adding complexity', 'By limiting access', 'By increasing costs'], answer: 0, explanation: title + ' improves user experience primarily through latency reduction and speed improvements.' },
        { question: 'What helps ensure ' + title + ' reliability?', options: ['Automated monitoring and testing', 'Manual checks only', 'No testing', 'Reactive fixes'], answer: 0, explanation: 'Automated monitoring and testing ensure consistent reliability for ' + title + '.' }
      ]
    };
    result[id] = t;
  });
  return result;
}

// Generate output for each category
var catIds = Object.keys(top);
catIds.forEach(function(catId) {
  var topics = makeTopics(catId);
  padTopics(topics);

  var lines = [];
  lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
  lines.push('TOPICS_DATA["' + catId + '"] = TOPICS_DATA["' + catId + '"] || {};');

  var keys = Object.keys(topics);
  keys.forEach(function(id) {
    lines.push('TOPICS_DATA["' + catId + '"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
  });

  var outDir = path.join(__dirname, catId);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(path.join(outDir, 'topics-data.js'), lines.join('\n'));

  var meta = keys.map(function(id) {
    var t = topics[id];
    return { id: t.id, title: t.title, difficulty: t.difficulty, estimatedMinutes: t.estimatedMinutes, file: t.file };
  });
  fs.writeFileSync(path.join(outDir, 'topics.json'), JSON.stringify(meta, null, 2));
  var kb = (Buffer.byteLength(lines.join('\n'), 'utf8') / 1024).toFixed(0);
  console.log(catId + ': ' + keys.length + ' topics, ' + kb + ' KB');
});
console.log('All categories generated!');
