const fs = require('fs');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: description.replace(/'/g,"\\'") }; }
function d(heading, text) { return { heading: heading.replace(/'/g,"\\'"), text: text.replace(/'/g,"\\'") }; }
function svgW(w, h, title, inner) {
  return '<svg viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:sans-serif">' +
    '<rect x="0" y="0" width="'+w+'" height="'+h+'" rx="8" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>' +
    '<text x="'+(w/2)+'" y="24" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">'+title+'</text>' +
    inner + '</svg>';
}
function R(x,y,w,h,fill,stroke,t1,t2,c1,c2) {
  var box = '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+fill+'" stroke="'+(stroke||fill)+'" stroke-width="1"/>';
  if (t1) box += '<text x="'+(x+w/2)+'" y="'+(y+(t2?16:20))+'" text-anchor="middle" font-size="11" font-weight="bold" fill="'+(c1||'#fff')+'">'+t1+'</text>';
  if (t2) box += '<text x="'+(x+w/2)+'" y="'+(y+28)+'" text-anchor="middle" font-size="9" fill="'+(c2||'#ddd')+'">'+t2+'</text>';
  return box;
}
function A(x1,y1,x2,y2,c) {
  return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||'#666')+'" stroke-width="1.5" marker-end="url(#arrow)"/>';
}
function T(x,y,text,size,color,anchor) {
  return '<text x="'+x+'" y="'+y+'" font-size="'+(size||10)+'" fill="'+(color||'#333')+'" text-anchor="'+(anchor||'start')+'">'+text+'</text>';
}

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 200, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

/* =================== TOPIC 1: What is DevOps =================== */
addTopic('devops-what-is-devops', 'What is DevOps', 'beginner', 15,
  ['DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle.',
   'Goals: faster delivery, higher quality, reduced failure rate, improved collaboration between teams.',
   'DevOps emphasizes automation, continuous delivery, monitoring, and shared ownership of the entire application lifecycle.',
   'DevOps is a cultural and professional movement, not a tool or role — it changes how organizations deliver software.'
  ],
  'DevOps is like a restaurant where the chefs (developers) and waitstaff (operations) work as one team instead of separate groups. The chefs see what customers are saying, and the waitstaff understand how the kitchen works. Together, they serve better food faster and fix problems immediately when they arise.',
  [
    d('The DevOps Philosophy', 'Break down silos between Dev and Ops teams. Shared responsibility for the entire lifecycle from development through production. Automate everything possible. Measure everything. Learn from failures. Iterate rapidly. The Three Ways: Flow (fast left-to-right), Feedback (fast right-to-left), Continuous Learning.'),
    d('Key DevOps Metrics', 'Deployment Frequency: how often you deploy to production. Lead Time: time from commit to production. Change Failure Rate: percentage of deployments causing failures. Mean Time to Recovery (MTTR): time to recover from failures. These four metrics define the DORA DevOps capabilities.'),
    d('CALMS Framework', 'Culture: collaboration, shared responsibility. Automation: eliminate manual processes. Lean: optimize flow, reduce waste. Measurement: data-driven decisions. Sharing: knowledge and feedback across teams. CALMS assesses DevOps maturity in organizations.')
  ],
  'DevOps is a cultural and technical movement to deliver value faster and more reliably. Focus on the Three Ways: flow, feedback, and learning. Automate everything. Measure the four key DORA metrics. Break down team silos. DevOps is not a tool or a role — it is a collaborative approach to software delivery.',
  [
    q('What is DevOps?', 'A set of practices combining Dev and Ops to shorten the development lifecycle and deliver high-quality software continuously.'),
    q('What are the four key DORA metrics?', 'Deployment Frequency, Lead Time, Change Failure Rate, Mean Time to Recovery (MTTR).'),
    q('What is the CALMS framework?', 'Culture, Automation, Lean, Measurement, Sharing — assesses DevOps maturity.'),
    q('Is DevOps a tool or a role?', 'No. DevOps is a cultural and professional movement combining practices, not a specific tool or job title.'),
    q('What are the Three Ways of DevOps?', 'Flow (fast left-to-right), Feedback (fast right-to-left), Continuous Learning and Experimentation.'),
    q('What does DevOps emphasize?', 'Automation, continuous delivery, monitoring, collaboration, and shared ownership.')
  ],
  R(10,35,110,25,'#0070f3','','Dev','Developers build') +
  A(120,48,150,48) +
  R(160,35,110,25,'#dc3545','','Ops','Operations run') +
  A(120,78,150,78) +
  R(10,65,110,25,'#28a745','','Automation','CI/CD pipelines') +
  R(10,95,110,25,'#ffc107','','Monitoring','Metrics & alerts') +
  R(10,125,110,25,'#e83e8c','','Collaboration','Shared ownership') +
  R(10,155,110,25,'#6610f2','','Continuous','Delivery + Learning') +
  R(290,35,190,155,'#17a2b8','','DevOps','Dev + Ops = faster, reliable delivery. Culture, automation, measurement, sharing.') +
  T(240,220,'DevOps: Practices combining Dev and Ops to deliver value faster with higher quality.',9,'#666','middle'),
  [
    e('DevOps Pipeline Overview', 'CI/CD pipeline stages.', codeBlock([
      '# Typical DevOps pipeline stages',
      '# Code → Build → Test → Package → Deploy → Monitor',
      '',
      '# .github/workflows/devops-pipeline.yml',
      'name: DevOps Pipeline',
      'on: [push]',
      'jobs:',
      '  build:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v3',
      '      - name: Install dependencies',
      '        run: npm ci',
      '      - name: Run tests',
      '        run: npm test',
      '      - name: Build',
      '        run: npm run build',
      '      - name: Deploy',
      '        run: ./deploy.sh'
    ]), 'A simple CI/CD pipeline automating the build, test, and deploy process.'),
    e('DevOps Culture Manifesto', 'Cultural principles.', codeBlock([
      '# DevOps cultural principles',
      '# Instead of silos → collaboration',
      '# Instead of manual → automation',
      '# Instead of fear of change → embrace change',
      '# Instead of blame → blameless postmortems',
      '# Instead of big releases → small frequent deploys',
      '# Instead of hero culture → shared ownership',
      '# Instead of separate tools → integrated toolchain',
      '',
      '# Key behaviors:',
      '# - Devs handle their own deployments',
      '# - Ops provides self-service platforms',
      '# - Everyone monitors production',
      '# - Experimentation is encouraged',
      '# - Fail fast, learn faster'
    ]), 'DevOps culture emphasizes collaboration, automation, shared responsibility, and blameless learning.')
  ],
  [
    m('What does DevOps combine?', ['Design and Development', 'Development and Operations', 'Testing and Deployment', 'Security and Compliance'], 1, 'DevOps combines Development (Dev) and Operations (Ops).'),
    m('Which is NOT a DORA metric?', ['Deployment Frequency', 'Lead Time', 'Code Coverage', 'MTTR'], 2, 'Code Coverage is not one of the four DORA metrics.'),
    m('What does CALMS stand for?', ['Culture, Automation, Lean, Measurement, Sharing', 'Code, Analyze, Learn, Monitor, Secure', 'CI/CD, Agile, Lean, Metrics, Security', 'Collaborate, Automate, Log, Monitor, Scale'], 0, 'CALMS = Culture, Automation, Lean, Measurement, Sharing.')
  ]
);

/* =================== TOPIC 2: DevOps Lifecycle =================== */
addTopic('devops-lifecycle', 'DevOps Lifecycle', 'beginner', 15,
  ['The DevOps lifecycle is a continuous loop of phases that governs how software moves from idea to production and back.',
   'Phases: Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Feedback → (back to Plan).',
   'Unlike traditional linear SDLC, the DevOps lifecycle is infinite and continuous, with feedback loops at every stage.',
   'Each phase has specific tools and practices: Jira (Plan), Git (Code), Jenkins/GitHub Actions (Build/Test), Docker/K8s (Deploy), Prometheus (Monitor).'
  ],
  'The DevOps lifecycle is like a perpetual motion machine for software. Imagine a factory that takes raw ideas, turns them into products, ships them, watches how customers use them, and sends improvement notes back to the design team — all automatically, all the time.',
  [
    d('Plan Phase', 'Define requirements, prioritize work, plan sprints. Tools: Jira, Confluence, Trello, Aha!. Practices: user stories, backlog grooming, sprint planning. Output: prioritized, estimated work items ready for development.'),
    d('Code, Build, Test Phase', 'Code: developers write and commit code (Git). Build: compile code, resolve dependencies (Maven, npm, Gradle). Test: automated unit, integration, and security tests (Jest, JUnit, Selenium). This is where CI runs — every commit triggers build + test.'),
    d('Release, Deploy, Operate Phase', 'Release: approve and prepare for production (change management, feature flags). Deploy: push to production (blue-green, canary, rolling). Operate: keep the application running (Kubernetes, Docker, logging).'),
    d('Monitor and Feedback Phase', 'Monitor: track metrics, logs, traces (Prometheus, Grafana, ELK, Datadog). Feedback: alerts, dashboards, incident response, postmortems. Feedback loops back to Plan — improvements feed into the next iteration. Continuous improvement is built into the cycle.')
  ],
  'The DevOps lifecycle is an infinite loop: Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Feedback → back to Plan. Each phase feeds into the next, and feedback loops ensure continuous improvement. Automation is key at every stage.',
  [
    q('What are the phases of the DevOps lifecycle?', 'Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Feedback.'),
    q('How is the DevOps lifecycle different from traditional SDLC?', 'It is continuous (infinite loop), not linear. Feedback loops connect every phase.'),
    q('What happens in the Monitor phase?', 'Track metrics, logs, traces. Set up alerts. Incident response. Gather feedback for improvement.'),
    q('What is the purpose of feedback loops?', 'To continuously improve by feeding observations from later phases back into planning and development.'),
    q('What phase handles CI (Continuous Integration)?', 'Code, Build, Test — every commit triggers automated build and tests.'),
    q('What tools are used in the Monitor phase?', 'Prometheus, Grafana, ELK Stack, Datadog, New Relic, Sentry.')
  ],
  R(10,35,100,25,'#0070f3','','Plan','Requirements') +
  R(115,35,100,25,'#28a745','','Code','Git') +
  R(220,35,100,25,'#ffc107','','Build','Compile') +
  R(325,35,100,25,'#dc3545','','Test','Automated') +
  A(110,48,115,48) + A(215,48,220,48) + A(320,48,325,48) +
  R(10,65,100,25,'#e83e8c','','Release','Approve') +
  R(115,65,100,25,'#6610f2','','Deploy','Push to prod') +
  R(220,65,100,25,'#17a2b8','','Operate','Run') +
  R(325,65,100,25,'#0070f3','','Monitor','Metrics') +
  A(110,78,115,78) + A(215,78,220,78) + A(320,78,325,78) +
  A(425,78,10,48) +  // feedback loop arrow back to Plan
  R(10,100,415,30,'#28a745','','Feedback Loop','Continuous improvement from monitoring back to planning') +
  T(240,170,'DevOps Lifecycle: Infinite loop of Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Feedback.',9,'#666','middle'),
  [
    e('Lifecycle Diagram as Code', 'Mermaid DevOps lifecycle.', codeBlock([
      '```mermaid',
      'graph LR',
      '  Plan --> Code',
      '  Code --> Build',
      '  Build --> Test',
      '  Test --> Release',
      '  Release --> Deploy',
      '  Deploy --> Operate',
      '  Operate --> Monitor',
      '  Monitor -->|Feedback| Plan',
      '```',
      '',
      '# Embedded in documentation',
      '# Shows the infinite loop nature'
    ]), 'Mermaid diagram representing the DevOps lifecycle as an infinite loop.'),
    e('Lifecycle Toolchain Mapping', 'Tools per phase.', codeBlock([
      '# DevOps Lifecycle Toolchain',
      '',
      '# Plan:     Jira, Confluence, Notion, Asana',
      '# Code:     Git, GitHub, GitLab, Bitbucket',
      '# Build:    Jenkins, GitHub Actions, CircleCI',
      '# Test:     Jest, JUnit, Selenium, SonarQube',
      '# Release:  Artifactory, Nexus, feature flags',
      '# Deploy:   Docker, Kubernetes, Terraform, Ansible',
      '# Operate:  K8s, Docker Swarm, ECS, EKS',
      '# Monitor:  Prometheus, Grafana, ELK, Datadog',
      '# Feedback: PagerDuty, OpsGenie, Statuspage'
    ]), 'Mapping of common tools to each phase of the DevOps lifecycle.')
  ],
  [
    m('What is the first phase of the DevOps lifecycle?', ['Code', 'Plan', 'Deploy', 'Monitor'], 1, 'Plan is the first phase — requirements and prioritization before any code is written.'),
    m('How is the DevOps lifecycle different from traditional SDLC?', ['Same thing', 'It is continuous, not linear', 'It has fewer phases', 'It has more phases'], 1, 'The DevOps lifecycle is an infinite continuous loop, unlike the linear traditional SDLC.'),
    m('What connects the Monitor phase back to Plan?', ['Alerts', 'Feedback loops', 'Dashboards', 'Incidents'], 1, 'Feedback loops from monitoring drive improvements back into planning.')
  ]
);

/* =================== TOPIC 3: DevOps Culture =================== */
addTopic('devops-culture', 'DevOps Culture', 'beginner', 15,
  ['DevOps culture is the set of behaviors, values, and practices that enable the DevOps transformation in an organization.',
   'Core values: collaboration, automation, measurement, sharing, trust, blamelessness, and continuous improvement.',
   'DevOps culture replaces "throw it over the wall" mentality with shared ownership of the entire application lifecycle.',
   'Key cultural shifts: devs handle operations, ops influence design, failures are learning opportunities, experimentation is encouraged.'
  ],
  'DevOps culture is like a sports team where everyone plays both offense and defense. In traditional IT, developers throw the ball (code) over the wall to operations who then try to run with it. In DevOps culture, everyone is on the same field, wearing the same jersey, and responsible for both scoring and defending.',
  [
    d('Blameless Postmortems', 'When something fails, the focus is on "what broke" not "who broke it". Root cause analysis of systems and processes, not individuals. Document what happened, why, and what to change. Share learnings broadly. No disciplinary action for honest mistakes. This encourages reporting issues without fear.'),
    d('Shared Ownership', 'Developers are on-call for their code. Operations has input on architecture. Everyone shares the pager. "You build it, you run it" (Amazon principle). Shared ownership means no handoffs. Teams own services end-to-end from development through production.'),
    d('Psychological Safety', 'Team members feel safe to take risks and admit mistakes. Experimentation is encouraged — not all experiments succeed. Failure is treated as a learning opportunity. New ideas are welcomed. Questions are encouraged. This is the foundation of high-performing DevOps teams.'),
    d('Continuous Improvement Culture', 'Kaizen (Japanese: "change for better"). Small incremental improvements daily. Retrospectives after incidents and releases. Regular feedback loops. Metrics-driven improvement. Culture of learning: training, conferences, internal knowledge sharing. Experimentation with new tools and processes.')
  ],
  'DevOps culture is the foundation of all DevOps practices. Without the right culture, tools and automation alone cannot transform an organization. Focus on blamelessness, shared ownership, psychological safety, and continuous improvement. The best DevOps tooling cannot fix a broken culture.',
  [
    q('What is DevOps culture?', 'Behaviors, values, and practices enabling DevOps: collaboration, blamelessness, shared ownership, and continuous improvement.'),
    q('What is a blameless postmortem?', 'An incident review focusing on system/process failures, not individual blame. Learn from failures without punishment.'),
    q('What does "you build it, you run it" mean?', 'Developers are responsible for their code in production, including on-call and incident response.'),
    q('What is psychological safety?', 'Team members feel safe to take risks, admit mistakes, and ask questions without fear of negative consequences.'),
    q('What is Kaizen?', 'Japanese philosophy of continuous improvement through small, incremental changes.'),
    q('Is culture or tools more important in DevOps?', 'Culture. Tools support the culture but cannot replace it. The best tools with a bad culture will fail.')
  ],
  R(10,35,110,25,'#0070f3','','Collaboration','Dev + Ops together') +
  R(10,65,110,25,'#28a745','','Blameless','Fix process, not people') +
  R(10,95,110,25,'#ffc107','','Shared Ownership','Build it, run it') +
  R(10,125,110,25,'#dc3545','','Safety','Experiment freely') +
  R(10,155,110,25,'#e83e8c','','Improvement','Kaizen daily') +
  R(290,35,190,155,'#17a2b8','','DevOps Culture','Collaboration, blamelessness, shared ownership, psychological safety, continuous improvement.') +
  T(240,220,'DevOps Culture: The foundation of all DevOps practices. Trust, safety, collaboration, and learning.',9,'#666','middle'),
  [
    e('Blameless Postmortem Template', 'Structured incident review.', codeBlock([
      '---',
      'title: Postmortem Template',
      '---',
      '',
      '## Summary',
      '- Date: YYYY-MM-DD',
      '- Severity: SEV1/SEV2/SEV3',
      '- Duration: X hours X minutes',
      '- Services affected:',
      '',
      '## What happened',
      '- Timeline of events',
      '- When was it detected',
      '- How was it resolved',
      '',
      '## Root Cause',
      '- Not who, but what and why',
      '',
      '## Action Items',
      '- [ ] Prevent recurrence',
      '- [ ] Improve detection',
      '- [ ] Improve mitigation',
      '',
      '## Lessons Learned',
      '- What went well',
      '- What went wrong',
      '- What to improve',
      '',
      '## Blameless Statement',
      'This was a system/process failure, not a people failure.'
    ]), 'Blameless postmortem template focusing on system causes, not individual blame.'),
    e('Team Working Agreement', 'DevOps culture contract.', codeBlock([
      '# DevOps Team Working Agreement',
      '',
      '1. We deploy to production daily',
      '2. We own our code end-to-end',
      '3. We automate everything we can',
      '4. We share on-call rotation',
      '5. We review code before merging',
      '6. We write tests for every change',
      '7. We monitor what we deploy',
      '8. We respond to alerts within 5 min',
      '9. We run blameless postmortems',
      '10. We improve something every sprint'
    ]), 'Team working agreement codifying DevOps cultural principles into daily practices.')
  ],
  [
    m('What is the focus of blameless postmortems?', ['Who caused the failure', 'What system/process failed', 'Which team to blame', 'How to punish mistakes'], 1, 'Blameless postmortems focus on system and process failures, not individuals.'),
    m('What does "you build it, you run it" mean?', ['Developers only build', 'Developers own code in production', 'Operations runs everything', 'Only senior devs handle production'], 1, 'Developers are responsible for their code from development through production, including on-call.'),
    m('What is the foundation of high-performing DevOps teams?', ['Expensive tools', 'Psychological safety', 'More managers', 'Longer release cycles'], 1, 'Psychological safety — team members feel safe to take risks and admit mistakes — is the foundation of high performance.')
  ]
);

/* =================== TOPIC 4: Agile vs DevOps =================== */
addTopic('devops-agile-vs-devops', 'Agile vs DevOps', 'beginner', 15,
  ['Agile is a software development methodology focused on iterative development, customer collaboration, and responding to change.',
   'DevOps extends Agile by bridging the gap between development and operations, focusing on the entire delivery pipeline.',
   'Agile answers "how do we build software better?" while DevOps answers "how do we deliver and operate it better?"',
   'They are complementary: Agile improves development processes, DevOps extends that to deployment and operations.'
  ],
  'Agile is like improving how a kitchen prepares meals — better recipes, faster chopping, tastier dishes. DevOps is like connecting that kitchen to the dining room with a conveyor belt — meals go from chef to customer instantly, and empty plates come back with feedback notes.',
  [
    d('Agile Principles (Agile Manifesto)', 'Individuals and interactions over processes and tools. Working software over comprehensive documentation. Customer collaboration over contract negotiation. Responding to change over following a plan. Twelve principles including: deliver frequently, welcome changing requirements, business and dev work together daily.'),
    d('DevOps Extensions to Agile', 'Agile stops at "working software" delivered to operations. DevOps continues: deploy to production, monitor, operate, gather feedback, improve. DevOps adds: infrastructure as code, automated deployment, production monitoring, incident response, reliability engineering.'),
    d('Key Differences', 'Agile scope: dev team focused (sprints, standups, retrospectives). DevOps scope: entire value stream (code to production to feedback). Agile metric: velocity. DevOps metric: deployment frequency, MTTR. Agile practices: Scrum, Kanban. DevOps practices: CI/CD, IaC, monitoring.'),
    d('How They Work Together', 'Agile teams plan and build in sprints. DevOps automates the path from commit to production. Agile retrospectives feed into DevOps improvements. DevOps monitoring feeds back into Agile backlog. Combined: faster iterations with reliable deliveries. Best practice: DevOps-enabled Agile teams.')
  ],
  'Agile and DevOps are complementary, not competing. Agile improves how you build; DevOps improves how you deliver and operate. Agile focuses on development teams; DevOps spans the entire organization. Agile without DevOps is slow delivery; DevOps without Agile is automation without direction.',
  [
    q('What is Agile?', 'A software development methodology focused on iterative development, customer collaboration, and responding to change.'),
    q('What does DevOps add beyond Agile?', 'Operations, deployment automation, production monitoring, incident response, and reliability engineering.'),
    q('What is the Agile Manifesto?', 'Four values: individuals/interactions, working software, customer collaboration, responding to change.'),
    q('What is a key difference between Agile and DevOps scope?', 'Agile focuses on dev team; DevOps spans the entire value stream from code to production.'),
    q('What does Agile measure?', 'Velocity (story points per sprint). DevOps measures deployment frequency, lead time, MTTR, change failure rate.'),
    q('Can you do DevOps without Agile?', 'Partially. But Agile provides the iterative development rhythm that DevOps automates and accelerates.')
  ],
  R(10,35,110,25,'#0070f3','','Agile','Build software better') +
  R(10,65,110,25,'#28a745','','Scrum/Kanban','Iterative dev') +
  R(10,95,110,25,'#ffc107','','Velocity','Sprint metrics') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) +
  R(160,35,115,25,'#dc3545','','DevOps','Deliver + operate better') +
  R(160,65,115,25,'#e83e8c','','CI/CD','Automate pipeline') +
  R(160,95,115,25,'#6610f2','','DORA Metrics','Deploy freq, MTTR') +
  R(290,35,190,100,'#17a2b8','','Agile + DevOps','Complementary: Agile builds, DevOps delivers and operates. Together: fast + reliable.') +
  T(240,180,'Agile vs DevOps: Agile improves development; DevOps extends to delivery and operations. Both needed.',9,'#666','middle'),
  [
    e('Agile Sprint with DevOps Pipeline', 'Combined workflow.', codeBlock([
      '# Agile + DevOps combined workflow',
      '',
      '# Sprint Planning (Agile)',
      '# → Backlog refinement, story pointing',
      '',
      '# Daily Development (Agile + DevOps)',
      '# → Code → Commit → CI build → Test → Deploy to staging',
      '',
      '# Sprint Review (Agile)',
      '# → Demo working software',
      '',
      '# Release (DevOps)',
      '# → Approve → Deploy to production via pipeline',
      '',
      '# Monitor (DevOps)',
      '# → Track metrics, errors, user behavior',
      '',
      '# Retrospective (Agile + DevOps)',
      '# → What improved? What broke? What to change next sprint?',
      '',
      '# Feedback Loop',
      '# → Production data → Backlog → Next sprint'
    ]), 'Combined Agile Sprint with DevOps pipeline showing how both methodologies work together.'),
    e('Agile vs DevOps Comparison', 'Side-by-side differences.', codeBlock([
      '+-------------------+-------------------+-------------------+',
      '| Aspect           | Agile             | DevOps            |',
      '+-------------------+-------------------+-------------------+',
      '| Focus            | Development       | Full lifecycle    |',
      '| Team scope       | Dev team          | Dev + Ops + QA    |',
      '| Primary metric   | Velocity          | Deploy frequency  |',
      '| Time horizon     | Sprints (2 wks)   | Continuous        |',
      '| Key practice     | Standups          | Monitoring        |',
      '| Output           | Working software  | Running software  |',
      '| Automation       | Optional          | Essential         |',
      '| Infrastructure   | Dev environment   | Full IaC          |',
      '+-------------------+-------------------+-------------------+'
    ]), 'Side-by-side comparison of Agile and DevOps across key dimensions.')
  ],
  [
    m('What does Agile focus on?', ['Operations', 'Development process', 'Deployment', 'Monitoring'], 1, 'Agile focuses on improving the software development process.'),
    m('What does DevOps add beyond Agile?', ['Better documentation', 'Operations and delivery pipeline', 'Longer sprints', 'More meetings'], 1, 'DevOps extends Agile by adding operations, deployment automation, monitoring, and incident response.'),
    m('What is a key DevOps metric NOT used in Agile?', ['Velocity', 'Story points', 'Deployment frequency', 'Sprint burndown'], 2, 'Deployment frequency is a DORA metric specific to DevOps, not typically tracked in Agile alone.')
  ]
);

/* =================== TOPIC 5: SDLC =================== */
addTopic('devops-sdlc', 'SDLC (Software Development Lifecycle)', 'beginner', 15,
  ['SDLC is the process of planning, creating, testing, and deploying software. It defines the stages software goes through from concept to retirement.',
   'Traditional SDLC models: Waterfall (linear), V-Model, Spiral, Iterative. Modern: Agile, DevOps-enabled SDLC.',
   'SDLC phases: Requirements → Design → Implementation → Testing → Deployment → Maintenance.',
   'DevOps transforms SDLC by making it continuous (not linear), automated (not manual), and feedback-driven at every stage.'
  ],
  'SDLC is like the blueprint for building a house. First you plan (requirements), then you draw (design), then you build (implementation), then you inspect (testing), then you move in (deployment), and you maintain it forever (maintenance). DevOps makes this house-building continuous — like adding rooms while living in it.',
  [
    d('Waterfall Model', 'Sequential: each phase completes before next starts. Requirements → Design → Implementation → Testing → Deployment → Maintenance. No going back. Good for: regulated industries, clear requirements, small projects. Bad for: changing requirements, complex projects. Rarely used alone today.'),
    d('Agile/DevOps SDLC', 'Continuous loop, not linear. Requirements evolve throughout. Design is incremental. Implementation is iterative. Testing is automated and continuous. Deployment is frequent (daily). Maintenance is proactive (monitoring). Feedback feeds back into requirements. This is the modern approach.'),
    d('DevOps-Enabled SDLC Benefits', 'Faster time to market: from months to hours. Higher quality: automated testing catches issues early. Lower risk: small, frequent deployments. Better feedback: monitoring data informs improvements. Lower costs: automation reduces manual effort. Happier teams: less firefighting, more innovation.'),
    d('SDLC Phases in DevOps Context', 'Requirements: user stories, acceptance criteria, compliance needs. Design: architecture reviews, security review, capacity planning. Implementation: Git, pair programming, code reviews. Testing: CI pipeline, unit, integration, e2e, security, performance. Deployment: automated pipeline, blue-green, canary. Maintenance: monitoring, incident response, updates.')
  ],
  'SDLC is the process framework for building software. Traditional models (Waterfall) are linear. Modern DevOps-enabled SDLC is continuous, automated, and feedback-driven. Understanding SDLC helps you see where DevOps practices apply at each stage.',
  [
    q('What is SDLC?', 'Software Development Lifecycle — the process of planning, creating, testing, and deploying software from concept to retirement.'),
    q('What are the traditional SDLC phases?', 'Requirements → Design → Implementation → Testing → Deployment → Maintenance.'),
    q('What is the Waterfall model?', 'A linear SDLC where each phase must complete before the next begins. No going back to previous phases.'),
    q('How does DevOps change SDLC?', 'Makes it continuous (not linear), automated (not manual), and feedback-driven at every stage.'),
    q('What is the Agile/DevOps SDLC?', 'A continuous loop where requirements evolve, development is iterative, testing is automated, and deployment is frequent.'),
    q('What are the benefits of DevOps-enabled SDLC?', 'Faster delivery, higher quality, lower risk, better feedback, lower costs, happier teams.')
  ],
  R(10,35,85,18,'#0070f3','','Requirements','What to build') +
  A(95,44,100,44) +
  R(110,35,75,18,'#28a745','','Design','How to build') +
  A(185,44,190,44) +
  R(200,35,95,18,'#ffc107','','Implementation','Write code') +
  A(295,44,300,44) +
  R(310,35,70,18,'#dc3545','','Testing','Verify quality') +
  A(380,44,385,44) +
  R(10,58,85,18,'#e83e8c','','Deployment','Release to prod') +
  A(95,67,100,67) +
  R(110,58,85,18,'#6610f2','','Maintenance','Monitor + fix') +
  A(195,67,10,44) +
  R(10,85,300,20,'#28a745','','DevOps: Continuous. Automated. Feedback-driven.','') +
  R(10,115,400,30,'#17a2b8','','SDLC + DevOps','Traditional SDLC is linear. DevOps makes it an automated, continuous, feedback-driven loop.') +
  T(240,180,'SDLC: Software Development Lifecycle. DevOps transforms it from linear to continuous.',9,'#666','middle'),
  [
    e('SDLC Phases with DevOps Automation', 'Automation at each phase.', codeBlock([
      '# SDLC Phase → DevOps Automation',
      '',
      '# Requirements → Jira/Notion (tracking)',
      '#   Auto-linking commits to tickets',
      '',
      '# Design → Architecture Decision Records (ADR)',
      '#   Auto-review with linters',
      '',
      '# Implementation → Git Hooks, pre-commit',
      '#   Auto-format, auto-lint on commit',
      '',
      '# Testing → CI Pipeline',
      '#   Auto-run tests on every PR',
      '',
      '# Deployment → CD Pipeline',
      '#   Auto-deploy on merge to main',
      '',
      '# Maintenance → Monitoring + Alerting',
      '#   Auto-alert on error thresholds'
    ]), 'Mapping DevOps automation to each phase of the SDLC.'),
    e('SDLC Model Comparison', 'Waterfall vs Agile vs DevOps.', codeBlock([
      '+-------------------+-------------------+-------------------+',
      '| Aspect           | Waterfall         | Agile             |',
      '| DevOps SDLC      |                   |                   |',
      '+-------------------+-------------------+-------------------+',
      '| Approach         | Linear sequential | Iterative         |',
      '| Continuous loop  |                   |                   |',
      '| Change tolerance | Low (late=bad)    | High (welcome)    |',
      '| Very high        |                   |                   |',
      '| Delivery         | One big release   | Multiple releases |',
      '| Continuous       |                   |                   |',
      '| Testing          | End of cycle      | Every iteration   |',
      '| Automated always |                   |                   |',
      '| Feedback         | Post-release      | Sprint reviews    |',
      '| Real-time monitor |                   |                   |',
      '| Risk             | High (all at end) | Lower (frequent)  |',
      '| Lowest (automated)|                   |                   |',
      '+-------------------+-------------------+-------------------+'
    ]), 'Comparison of Waterfall, Agile, and DevOps SDLC models showing progression toward continuous delivery.')
  ],
  [
    m('What are the traditional SDLC phases?', ['Plan, Do, Check, Act', 'Requirements, Design, Implementation, Testing, Deployment, Maintenance', 'Code, Build, Test, Deploy', 'Dev, Ops, QA, Security'], 1, 'Traditional SDLC phases are Requirements → Design → Implementation → Testing → Deployment → Maintenance.'),
    m('How does DevOps change SDLC?', ['More documentation', 'Continuous and automated instead of linear and manual', 'Fewer phases', 'Slower process'], 1, 'DevOps transforms SDLC into a continuous, automated, feedback-driven process.'),
    m('What is the Waterfall model?', ['Iterative development', 'Sequential phases without going back', 'Continuous delivery', 'Agile framework'], 1, 'Waterfall is a linear sequential model where each phase completes before the next begins.')
  ]
);

/* =================== TOPIC 6: Continuous Integration =================== */
addTopic('devops-ci', 'Continuous Integration', 'intermediate', 20,
  ['Continuous Integration (CI) is the practice of merging all developer working copies to a shared mainline several times a day.',
   'Each merge triggers an automated build and test run to detect integration errors as early as possible.',
   'CI principle: "if it hurts, do it more often" — frequent merging reduces integration pain.',
   'Key CI practices: maintain a single source repository, automate builds, make builds self-testing, keep builds fast, commit to mainline daily.'
  ],
  'CI is like a group of cooks each preparing ingredients (code) at their own stations. Instead of combining everything at the end (and finding out the sauces are incompatible), they mix ingredients into a shared pot every few minutes and taste-test immediately. If something is wrong, only the last addition needs fixing.',
  [
    d('CI Pipeline Stages', 'Trigger: code push to repository (any branch). Stage 1 - Checkout: get latest code. Stage 2 - Install: resolve dependencies (npm install, mvn dependency:resolve). Stage 3 - Build: compile code, package artifacts. Stage 4 - Test: unit tests, integration tests, linting, code coverage. Stage 5 - Report: test results, coverage reports, quality gates.'),
    d('CI Best Practices', 'Commit frequently (several times daily). Keep commits small and focused. Write tests before or with code. Fix broken builds immediately — no one commits on a red build. Use feature flags instead of branches. Run CI on every branch push. Keep build under 10 minutes. Use fast feedback mechanisms (Slack, email).'),
    d('CI vs CD vs CD', 'CI (Continuous Integration): merge and test frequently. CD (Continuous Delivery): CI + automated deployment to staging, manual approval for production. CD (Continuous Deployment): CI + automated deployment all the way to production with no manual gates. CI is prerequisite for both delivery and deployment.'),
    d('CI Tools and Services', 'GitHub Actions, GitLab CI/CD, Jenkins, CircleCI, Travis CI, Bitbucket Pipelines, Azure DevOps, AWS CodePipeline. Key features: webhook triggers, parallel jobs, matrix builds, artifact storage, test reporting, cache management, secret handling.')
  ],
  'CI is the foundation of all DevOps practices. Merge frequently, build automatically, test every change, fix broken builds immediately. Keep builds fast. CI catches integration issues early when they are cheap to fix. Without CI, all other DevOps practices are built on an unstable foundation.',
  [
    q('What is Continuous Integration?', 'Merging code changes frequently (multiple times daily) with automated build and test on each merge.'),
    q('What is the main goal of CI?', 'Detect integration errors early and fix them quickly when they are cheap to resolve.'),
    q('What happens when a CI build fails?', 'The team stops other work and fixes it immediately. Never commit on a broken build.'),
    q('What is the difference between CI and CD?', 'CI = frequent merge + build + test. CD = CI + automated deployment readiness.'),
    q('What makes a good CI pipeline?', 'Fast (< 10 min), reliable, self-testing, clear reporting, triggers on every push.'),
    q('What are common CI tools?', 'GitHub Actions, Jenkins, GitLab CI, CircleCI, Travis CI, Azure DevOps.')
  ],
  R(10,35,100,25,'#0070f3','','Developer A','Commits code') +
  R(10,65,100,25,'#28a745','','Developer B','Commits code') +
  R(10,95,100,25,'#ffc107','','Developer C','Commits code') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) +
  R(150,35,100,85,'#dc3545','','CI Server','Auto-build + auto-test on every merge') +
  R(270,35,100,25,'#e83e8c','','Build','Compile + package') +
  R(270,65,100,25,'#6610f2','','Test','Unit + integration') +
  R(270,95,100,25,'#17a2b8','','Report','Results + artifacts') +
  A(250,48,270,48) + A(250,78,270,78) + A(250,108,270,108) +
  R(390,35,90,85,'#28a745','','Main Branch','Always working, always green') +
  A(370,48,390,48) + A(370,78,390,78) + A(370,108,390,108) +
  T(240,175,'CI: Merge frequently + build + test automatically. Catch integration errors early.',9,'#666','middle'),
  [
    e('Basic CI Pipeline (GitHub Actions)', 'CI on every push.', codeBlock([
      'name: CI Pipeline',
      'on:',
      '  push:',
      '    branches: [main, develop]',
      '  pull_request:',
      '    branches: [main]',
      '',
      'jobs:',
      '  build-and-test:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v3',
      '      - uses: actions/setup-node@v3',
      '        with:',
      '          node-version: 18',
      '      - run: npm ci',
      '      - run: npm run lint',
      '      - run: npm test -- --coverage',
      '      - run: npm run build',
      '      - uses: actions/upload-artifact@v3',
      '        with:',
      '          name: build-output',
      '          path: dist/'
    ]), 'Basic CI pipeline that runs lint, tests, and build on every push and PR.'),
    e('Jenkins CI Pipeline (Jenkinsfile)', 'Declarative CI pipeline.', codeBlock([
      'pipeline {',
      '  agent any',
      '',
      '  stages {',
      "    stage('Checkout') {",
      '      steps { checkout scm }',
      '    }',
      "    stage('Install') {",
      "      steps { sh 'npm ci' }",
      '    }',
      "    stage('Lint') {",
      "      steps { sh 'npm run lint' }",
      '    }',
      "    stage('Test') {",
      '      steps {',
      "        sh 'npm test'",
      "        junit 'reports/*.xml'",
      '      }',
      '    }',
      "    stage('Build') {",
      "      steps { sh 'npm run build' }",
      '    }',
      '  }',
      '  post {',
      '    success {',
      "      archiveArtifacts 'dist/**'",
      '    }',
      '  }',
      '}'
    ]), 'Jenkins declarative pipeline for CI with checkout, install, lint, test, and build stages.')
  ],
  [
    m('What is the main goal of CI?', ['Deploy faster', 'Catch integration errors early', 'Automate everything', 'Reduce costs'], 1, 'CI catches integration errors early when they are cheap and easy to fix.'),
    m('How often should developers commit with CI?', ['Once per week', 'Several times daily', 'Only when feature is complete', 'Once per sprint'], 1, 'CI practices recommend committing to mainline several times each day.'),
    m('What happens when a CI build breaks?', ['Wait for next release', 'Fix it immediately before other work', 'Revert all changes', 'Ignore it'], 1, 'Broken CI builds should be fixed immediately. Never commit code on a broken build.')
  ]
);

/* =================== TOPIC 7: Continuous Delivery =================== */
addTopic('devops-cd', 'Continuous Delivery', 'intermediate', 20,
  ['Continuous Delivery (CD) is the practice of keeping your codebase deployable at any moment by automating the release process.',
   'CD extends CI: after CI builds and tests pass, CD automates deployment to staging environments and prepares the release.',
   'Key difference from Continuous Deployment: CD requires manual approval for production deployment; Continuous Deployment goes all the way automatically.',
   'CD ensures every change that passes CI is potentially releasable — the release decision is a business choice, not a technical hurdle.'
  ],
  'Continuous Delivery is like having a car that is always washed, fueled, and ready to drive. The car (code) is prepared automatically after every checkup (CI). But the actual trip (deployment to production) requires a human to say "let\'s go." The car is always ready — you just need to decide when to leave.',
  [
    d('CD Pipeline Stages after CI', 'CI completes → Artifact stored in repository (Nexus, Artifactory, Docker Hub). Deploy to staging: automated, full environment. Integration tests: automated against staging. Performance tests: load testing, stress testing. Security scan: SAST, DAST, dependency scanning. Release approval: manual or automatic gating. Deploy to production: automated deploy with guardrails.'),
    d('Release Automation', 'Versioning: semantic versioning (major.minor.patch). Changelog: auto-generated from commits. Release notes: auto-generated with links to issues/PRs. Tagging: git tag with version. Artifact promotion: move through environments (dev → staging → prod). Deployment: blue-green, canary, or rolling.'),
    d('CD Best Practices', 'Automate everything after CI. Keep staging identical to production. Use feature flags to decouple deployment from release. Practice "dark launches" — deploy invisible features. Implement smoke tests as deployment verification. Have a rollback plan for every release. Monitor deployment health metrics.'),
    d('CD Prerequisites', 'Comprehensive automated test suite. Fast, reliable CI pipeline. Configuration management (environment-specific configs outside code). Database migration automation. Infrastructure as Code. Monitoring and logging in place. Rollback automation. Feature flags for risky changes.')
  ],
  'Continuous Delivery means your code is always ready to go to production. The CI pipeline proves it works; CD makes it available. A person decides when to press "go." This decouples the technical readiness from the business decision to release.',
  [
    q('What is Continuous Delivery?', 'The practice of keeping codebase always deployable by automating the release process up to production deployment.'),
    q('What is the difference between Continuous Delivery and Continuous Deployment?', 'CD requires manual approval for production deploy. Continuous Deployment is fully automated through production.'),
    q('What happens after CI in a CD pipeline?', 'Artifact stored, deployed to staging, integration tests run, security scanned, release prepared for approval.'),
    q('What is a deployment approval gate?', 'A manual or automated check that must pass before deploying to production. Common in CD (not Continuous Deployment).'),
    q('What is artifact promotion?', 'Moving a verified artifact through environments: dev → staging → production, promoting only after passing each stage.'),
    q('What tools support CD pipelines?', 'Spinnaker, ArgoCD, Jenkins, GitLab CI/CD, GitHub Actions, GoCD, Harness.')
  ],
  R(10,35,110,25,'#0070f3','','CI Complete','Build + test pass') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Artifact Store','Nexus / Docker Hub') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Deploy Staging','Automated deploy') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Integration Tests','+ Security + Perf') +
  A(120,108,150,108) +
  R(10,105,110,25,'#e83e8c','','Release Approval','Manual gate') +
  A(120,118,150,118) +
  R(160,105,110,25,'#17a2b8','','Deploy Prod','Automated + guardrails') +
  R(290,35,190,130,'#28a745','','Continuous Delivery','Always deployable. CI → staging → approval → production. Human decides when to release.') +
  T(240,200,'Continuous Delivery: Keep code always deployable. CI automates quality; CD automates readiness. Human approves release.',9,'#666','middle'),
  [
    e('CD Pipeline with Manual Approval (GitHub Actions)', 'Deploy with environment approval.', codeBlock([
      'name: Continuous Delivery',
      'on:',
      '  push:',
      '    branches: [main]',
      '',
      'jobs:',
      '  ci:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v3',
      '      - run: npm ci && npm test && npm run build',
      '      - uses: actions/upload-artifact@v3',
      '        with:',
      '          name: build',
      '          path: dist/',
      '',
      '  deploy-staging:',
      '    needs: ci',
      '    runs-on: ubuntu-latest',
      '    environment: staging',
      '    steps:',
      '      - run: ./deploy-staging.sh',
      '',
      '  deploy-production:',
      '    needs: deploy-staging',
      '    runs-on: ubuntu-latest',
      '    environment: production',
      '    # Requires manual approval (GitHub Environments)',
      '    steps:',
      '      - run: ./deploy-production.sh'
    ]), 'CD pipeline with CI, staging deploy, and production deploy requiring manual approval via GitHub Environments.'),
    e('Release Readiness Checklist', 'Automated checks before release.', codeBlock([
      '# Release Readiness Checklist (automated)',
      '',
      '# [auto] All CI tests pass?',
      '# [auto] Code coverage >= 80%?',
      '# [auto] Security scan passed?',
      '# [auto] No critical vulnerabilities?',
      '# [auto] Integration tests pass on staging?',
      '# [auto] Performance tests within limits?',
      '# [manual] Product owner approved?',
      '# [manual] Release notes reviewed?',
      '# [auto] Database migrations ready?',
      '# [auto] Rollback plan exists?',
      '# [auto] Feature flags configured?',
      '',
      '# All checks must pass for deployment'
    ]), 'Automated and manual checks as release readiness gates in a CD pipeline.')
  ],
  [
    m('What is the key difference between CD and Continuous Deployment?', ['CD is faster', 'CD requires manual approval for production', 'CD has no testing', 'CD is only for staging'], 1, 'Continuous Delivery has a manual approval gate for production; Continuous Deployment is fully automated.'),
    m('What is artifact promotion?', ['Deleting old artifacts', 'Moving artifacts through environments after validation', 'Creating new artifacts', 'Versioning artifacts'], 1, 'Artifact promotion moves verified builds through dev → staging → production environments.'),
    m('What is a prerequisite for CD?', ['No tests needed', 'Comprehensive automated test suite', 'Manual deployment only', 'Weekly releases'], 1, 'A comprehensive automated test suite is essential for CD to ensure every build is releasable.')
  ]
);

/* =================== TOPIC 8: Continuous Deployment =================== */
addTopic('devops-continuous-deployment', 'Continuous Deployment', 'advanced', 20,
  ['Continuous Deployment is the practice of automatically deploying every change that passes the CI/CD pipeline to production without manual intervention.',
   'Every commit that passes all automated tests, security scans, and quality gates is automatically released to users.',
   'This requires extreme confidence in the automated pipeline: tests, monitoring, rollback, and feature flags must be rock-solid.',
   'Continuous Deployment is the most advanced stage of CI/CD maturity — achieved only by organizations with mature DevOps practices.'
  ],
  'Continuous Deployment is like a self-driving car that takes itself to the garage for maintenance automatically. The mechanic (automated pipeline) checks everything, fixes issues, and puts the car back on the road — all without anyone making a phone call. You just wake up to a better car every morning.',
  [
    d('Continuous Deployment Pipeline', 'Commit → CI (build + test) → Security scan → Deploy to staging → Integration tests → Deploy to production → Smoke tests → Monitor. NO manual approval. Entire process in minutes. Every step has automated rollback if checks fail. Feature flags control feature exposure, not deployment.'),
    d('Safety Mechanisms for Continuous Deployment', 'Feature flags: deploy invisible code, enable for users gradually. Canary releases: deploy to 1% of users, gradually increase. Automated rollback: revert if error rate spikes. Deployment freeze: block deploys during sensitive periods. Ring deployment: deploy to internal users → beta → 1% → 10% → 100%. Circuit breakers: stop deployment if metrics go red.'),
    d('Prerequisites for Continuous Deployment', 'Comprehensive test suite (unit, integration, e2e, security, performance). Mature monitoring and alerting. Automated rollback capability. Feature flag infrastructure. Blameless culture for deployment failures. Small, frequent commits. Staging/prod parity. Database change automation. Zero-downtime deployment strategy.'),
    d('Companies Using Continuous Deployment', 'Netflix: thousands of deployments daily via Spinnaker. Amazon: deploys every 11.7 seconds on average. Etsy: 50+ deployments per day. Facebook: multiple daily deploys. Google: trunk-based development with automated deployment. These companies invest heavily in testing, monitoring, and rollback automation.')
  ],
  'Continuous Deployment is the pinnacle of automation — every commit that passes your pipeline goes to production automatically. It requires extreme confidence in your testing, monitoring, and rollback capabilities. Feature flags decouple deployment from release. Start with CD for low-risk services, expand gradually.',
  [
    q('What is Continuous Deployment?', 'Every change that passes the automated pipeline is deployed to production without manual intervention.'),
    q('How is Continuous Deployment different from Continuous Delivery?', 'Continuous Deployment has no manual approval gate. CD goes to prod automatically. Delivery requires human approval.'),
    q('What safety mechanisms are needed for Continuous Deployment?', 'Feature flags, canary releases, automated rollback, ring deployment, circuit breakers, deployment freezes.'),
    q('What is a prerequisite for Continuous Deployment?', 'Comprehensive tests, mature monitoring, automated rollback, feature flags, blameless culture, small frequent commits.'),
    q('What companies practice Continuous Deployment?', 'Netflix, Amazon, Etsy, Facebook, Google. They deploy many times daily with confidence.'),
    q('How do you start with Continuous Deployment?', 'Start with low-risk services, implement feature flags, build automated rollback, monitor everything, expand gradually.')
  ],
  R(10,35,110,25,'#0070f3','','Commit','Code pushed') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','CI','Auto build + test') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Security Scan','Auto pass/fail') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Staging Tests','Integration + perf') +
  A(120,108,150,108) +
  R(10,105,110,25,'#e83e8c','','Production','Auto deploy') +
  R(10,135,110,25,'#6610f2','','Smoke Tests','Verify + monitor') +
  A(120,118,150,118) + A(120,148,150,148) +
  R(290,35,190,130,'#dc3545','','Continuous Deployment','No manual gates. Every commit → production automatically. Requires extreme pipeline confidence.') +
  T(240,200,'Continuous Deployment: Fully automated from commit to production. Maximum velocity, maximum trust in pipeline.',9,'#666','middle'),
  [
    e('Continuous Deployment Flow', 'Fully automated pipeline.', codeBlock([
      '# Continuous Deployment: No manual approval',
      '',
      'name: Continuous Deployment',
      'on:',
      '  push:',
      '    branches: [main]',
      '',
      'jobs:',
      '  test-and-build:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - run: npm ci && npm test && npm run build',
      '',
      '  deploy-canary:',
      '    needs: test-and-build',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - run: ./deploy-canary.sh # 1% traffic',
      '      - run: ./smoke-test.sh',
      '      - run: ./monitor-metrics.sh',
      '',
      '  deploy-full:',
      '    needs: deploy-canary',
      '    # Auto-promotes if canary healthy',
      '    steps:',
      '      - run: ./deploy-full.sh # 100% traffic',
      '',
      '  post-deploy:',
      '    needs: deploy-full',
      '    steps:',
      '      - run: ./run-smoke-tests.sh',
      '      - run: ./notify-team.sh'
    ]), 'Continuous Deployment pipeline with canary, auto-promotion, and post-deploy verification — no manual gates.'),
    e('Simple Deploy Script with Rollback', 'Safeguard for auto-deploy.', codeBlock([
      '#!/bin/bash',
      '# deploy-with-rollback.sh',
      '',
      'APP="my-service"',
      'VERSION=$1',
      'ROLLBACK_VERSION=$(cat previous-version.txt)',
      '',
      'echo "Deploying $APP version $VERSION..."',
      '',
      '# Deploy new version',
      'kubectl set image deployment/$APP $APP=$APP:$VERSION',
      '',
      '# Wait for rollout',
      'kubectl rollout status deployment/$APP --timeout=5m',
      '',
      '# Check health endpoint',
      'if curl -f http://myapp.com/health; then',
      '  echo "Deploy successful!"',
      '  echo $VERSION > previous-version.txt',
      'else',
      '  echo "Health check failed! Rolling back..."',
      '  kubectl rollout undo deployment/$APP',
      '  exit 1',
      'fi'
    ]), 'Automated deployment script with health check and automatic rollback on failure.')
  ],
  [
    m('What is the key difference between Continuous Deployment and Continuous Delivery?', ['Deployment frequency', 'Manual approval gate', 'Test coverage', 'Build speed'], 1, 'Continuous Deployment has no manual approval gate — every passing change goes to production automatically.'),
    m('What is essential for safe Continuous Deployment?', ['Long release cycles', 'Feature flags + automated rollback', 'Manual testing', 'Weekly deployments'], 1, 'Feature flags and automated rollback are essential safety mechanisms for Continuous Deployment.'),
    m('What is a ring deployment?', ['Deploying to all users at once', 'Gradually expanding deployment from internal to 100% of users', 'Deploying only on weekends', 'Manual deployment in phases'], 1, 'Ring deployment rolls out gradually: internal → beta → 1% → 10% → 100% of users.')
  ]
);

/* =================== TOPIC 9: Infrastructure as Code =================== */
addTopic('devops-iac', 'Infrastructure as Code (IaC)', 'intermediate', 25,
  ['Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through machine-readable definition files, not manual processes.',
   'IaC brings version control, code review, automated testing, and repeatability to infrastructure management.',
   'Two approaches: declarative (desired state — Terraform, CloudFormation) and imperative (step-by-step — Ansible, Chef, Puppet).',
   'Key benefits: consistency (no configuration drift), speed (minutes vs days), reproducibility (same config = same environment), versioned infrastructure.'
  ],
  'IaC is like having a recipe card for your entire server setup instead of a chef who remembers how they made it last time. Want the exact same setup for staging and production? Use the same recipe. Server crashed at 3 AM? Run the recipe on a new machine. Everything is documented, repeatable, and version-controlled.',
  [
    d('Declarative vs Imperative IaC', 'Declarative (Terraform, CloudFormation, Pulumi): you define the desired end state — "I want 3 EC2 instances with this config." The tool figures out how to get there. Imperative (Ansible, Chef, Puppet, Shell): you define the steps — "Create instance, install nginx, copy config, restart service." Declarative is generally preferred for cloud infrastructure.'),
    d('IaC Best Practices', 'Store configs in version control (Git). Use modules/abstractions to avoid duplication. Parameterize environments (dev/staging/prod configs). Never hardcode secrets — use vault/parameter store. Test infrastructure changes in CI. Use state locking to prevent concurrent modifications. Plan before apply (terraform plan).'),
    d('Terraform Workflow', 'Write .tf files → terraform init (download providers) → terraform plan (preview changes) → terraform apply (make changes) → terraform destroy (tear down). Terraform maintains state file tracking real-world resources. Remote state (S3, Terraform Cloud) enables team collaboration.'),
    d('Configuration Drift', 'When actual infrastructure differs from defined config. Causes: manual changes, failed deployments, expired resources. Detection: terraform plan shows drift. Drift management: reconcile by updating config or importing existing resources. Periodic "drift detection" runs in CI.'),
    d('Immutable vs Mutable Infrastructure', 'Mutable: modify existing servers in place (Ansible, Chef). Risk of configuration drift over time. Immutable: never modify running servers — replace them (AMI, containers). Terraform + auto-scaling groups enable immutable infrastructure. Immutable is preferred for reliability and consistency.')
  ],
  'IaC is essential for DevOps. Use declarative tools (Terraform) for cloud infrastructure. Store everything in Git. Never make manual changes to infrastructure. Use modules. Implement CI/CD for infrastructure changes. Plan before apply. Treat infrastructure with the same rigor as application code.',
  [
    q('What is Infrastructure as Code?', 'Managing and provisioning infrastructure through machine-readable definition files instead of manual processes.'),
    q('What is the difference between declarative and imperative IaC?', 'Declarative: define desired state (Terraform). Imperative: define steps (Ansible). Declarative is preferred.'),
    q('What is Terraform?', 'A declarative IaC tool by HashiCorp for provisioning cloud infrastructure across providers (AWS, Azure, GCP).'),
    q('What is configuration drift?', 'When actual infrastructure differs from defined configuration files. IaC helps detect and prevent drift.'),
    q('What is immutable infrastructure?', 'Never modify servers in place — replace them with new instances from a known image. More reliable than mutable.'),
    q('What is Terraform state?', 'A file tracking real-world resources, enabling Terraform to map config to actual infrastructure.')
  ],
  R(10,35,110,25,'#0070f3','','Define','main.tf files') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Version Control','Git') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','CI/CD','Test infra changes') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Provision','Terraform apply') +
  R(10,105,110,25,'#e83e8c','','State','Track resources') +
  R(10,135,110,25,'#6610f2','','Drift Check','Plan in CI') +
  R(290,35,190,135,'#17a2b8','','Infrastructure as Code','Automated, versioned, repeatable infrastructure. Declarative configs. No manual changes.') +
  T(240,205,'IaC: Manage infrastructure through code. Versioned, automated, consistent. Terraform, Ansible, CloudFormation.',9,'#666','middle'),
  [
    e('Basic Terraform Configuration', 'AWS EC2 instance.', codeBlock([
      'terraform {',
      '  required_providers {',
      '    aws = {',
      '      source  = "hashicorp/aws"',
      '      version = "~> 5.0"',
      '    }',
      '  }',
      '}',
      '',
      'provider "aws" {',
      '  region = "us-east-1"',
      '}',
      '',
      'resource "aws_instance" "app_server" {',
      '  ami           = "ami-0c55b159cbfafe1f0"',
      '  instance_type = "t2.micro"',
      '',
      '  tags = {',
      '    Name = "MyAppServer"',
      '  }',
      '}'
    ]), 'Basic Terraform configuration provisioning an AWS EC2 instance declaratively.'),
    e('Ansible Playbook (Imperative IaC)', 'Configure a web server.', codeBlock([
      '---',
      '- name: Configure web server',
      '  hosts: webservers',
      '  become: yes',
      '  tasks:',
      '    - name: Install nginx',
      '      apt:',
      '        name: nginx',
      '        state: present',
      '    - name: Copy config',
      '      template:',
      '        src: nginx.conf.j2',
      '        dest: /etc/nginx/nginx.conf',
      '      notify: restart nginx',
      '    - name: Start nginx',
      '      service:',
      '        name: nginx',
      '        state: started',
      '        enabled: yes',
      '  handlers:',
      '    - name: restart nginx',
      '      service:',
      '        name: nginx',
      '        state: restarted'
    ]), 'Ansible playbook imperatively describing steps to configure an nginx web server.')
  ],
  [
    m('What does IaC stand for?', ['Infrastructure as Code', 'Integration as Code', 'Interface as Code', 'Infrastructure and Configuration'], 0, 'IaC = Infrastructure as Code.'),
    m('What is the difference between declarative and imperative IaC?', ['Worse performance', 'Declarative = desired state; Imperative = steps to reach state', 'Declarative = steps; Imperative = desired state', 'No difference'], 1, 'Declarative IaC (Terraform) defines the desired state. Imperative IaC (Ansible) defines the steps.'),
    m('What is configuration drift?', ['Improving configuration', 'When actual infrastructure differs from defined config', 'Configuration file changes', 'Automatic configuration'], 1, 'Configuration drift is when actual infrastructure state differs from the defined IaC configuration.')
  ]
);

/* =================== TOPIC 10: Configuration Management =================== */
addTopic('devops-config-mgmt', 'Configuration Management', 'intermediate', 20,
  ['Configuration Management is the practice of maintaining systems in a desired, consistent state through automated tools and processes.',
   'It ensures all servers, applications, and services are configured consistently across environments.',
   'Tools: Ansible, Puppet, Chef, SaltStack. Each uses a different model (push vs pull, agent vs agentless).',
   'Key concept: desired state configuration — define what the system should look like; the tool makes it so.'
  ],
  'Configuration management is like having a building superintendent who follows a detailed checklist every day. Instead of checking each room manually, they have an automated system that ensures every room has the right temperature, lights, and locks. If something is wrong, the system fixes it automatically.',
  [
    d('Push vs Pull Model', 'Push (Ansible, Salt SSH): control node pushes config to managed nodes. No agent required on managed nodes. Simpler setup. Better for smaller environments. Pull (Puppet, Chef, Salt Minion): agents on managed nodes periodically pull config from master. Scales better for large environments. Agents report status back.'),
    d('Idempotency in Configuration Management', 'Running the same config multiple times produces the same result. Only changes what needs changing. If a package is already installed, skip. If a service is already running, do nothing. This is the core principle of configuration management tools. Makes automation safe to run repeatedly.'),
    d('Configuration Drift Prevention', 'Drift: servers in a fleet become different over time due to manual changes, failed updates, or partial deployments. Prevention: run config management periodically (cron, pull interval). Automatically remediate drift. Alert on unreconcilable differences. Use immutable infrastructure where possible.'),
    d('Ansible (Most Popular)', 'Agentless: uses SSH/WinRM. Push model. YAML playbooks. Large module library. No central server overhead. Good for: configuration management, application deployment, ad-hoc tasks. Simple learning curve. Idempotent by design. Popular for cloud automation.')
  ],
  'Configuration management keeps your infrastructure consistent and compliant. Ansible is the most accessible tool (agentless, YAML). Use idempotent configurations. Run CM regularly to prevent drift. Combine with IaC: Terraform provisions, CM configures.',
  [
    q('What is Configuration Management?', 'Maintaining systems in a desired, consistent state through automated tools. Ensuring all servers are configured the same.'),
    q('What is the difference between push and pull CM models?', 'Push (Ansible): control node pushes config to servers. Pull (Puppet): agents pull config from master.'),
    q('What does idempotent mean in configuration management?', 'Running the same config multiple times produces the same result — only changes what needs changing.'),
    q('What is configuration drift?', 'Servers becoming different over time due to manual changes or partial updates. CM prevents and remediates drift.'),
    q('What is the most popular configuration management tool?', 'Ansible — agentless, push-based, YAML playbooks, large ecosystem.'),
    q('What is the difference between IaC and CM?', 'IaC provisions infrastructure (servers, networks). CM configures software on that infrastructure. Both are needed.')
  ],
  R(10,35,110,25,'#0070f3','','Define','Desired state YAML') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Push (Ansible)','Control → nodes via SSH') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Pull (Puppet)','Agents → master') +
  R(10,100,110,25,'#dc3545','','Idempotent','Safe to repeat') +
  R(10,130,110,25,'#e83e8c','','Drift Remediation','Auto-fix differences') +
  R(290,35,190,130,'#17a2b8','','Config Management','Consistent, automated server configuration. Ansible, Puppet, Chef. Idempotent, drift-free.') +
  T(240,200,'Configuration Management: Maintain consistent server configurations with automated, idempotent tools like Ansible.',9,'#666','middle'),
  [
    e('Ansible Playbook: Web Server Setup', 'Idempotent configuration.', codeBlock([
      '---',
      '- name: Configure web servers',
      '  hosts: all',
      '  vars:',
      '    app_port: 3000',
      '    log_level: info',
      '',
      '  tasks:',
      '    - name: Ensure nginx is installed',
      '      apt:',
      '        name: nginx',
      '        state: present',
      '',
      '    - name: Ensure nginx is running',
      '      service:',
      '        name: nginx',
      '        state: started',
      '        enabled: yes',
      '',
      '    - name: Deploy app config',
      '      template:',
      '        src: app.conf.j2',
      '        dest: /etc/myapp/config.json',
      '      notify: restart myapp',
      '',
      '  handlers:',
      '    - name: restart myapp',
      '      systemd:',
      '        name: myapp',
      '        state: restarted'
    ]), 'Ansible playbook for idempotent web server configuration with templates and handlers.'),
    e('Ansible Ad-hoc Commands', 'Quick configuration tasks.', codeBlock([
      '# Check all servers are reachable',
      'ansible all -i inventory.ini -m ping',
      '',
      '# Check disk space on all servers',
      'ansible all -i inventory.ini -m shell -a "df -h"',
      '',
      '# Ensure a package is installed everywhere',
      'ansible all -i inventory.ini -m apt -a "name=htop state=present" -b',
      '',
      '# Copy a file to all servers',
      'ansible all -i inventory.ini -m copy -a "src=/local/file dest=/remote/file"',
      '',
      '# Check nginx status on web servers',
      'ansible webservers -i inventory.ini -m service -a "name=nginx state=started"'
    ]), 'Ansible ad-hoc commands for quick configuration tasks across server fleets.')
  ],
  [
    m('What does idempotent mean?', ['Fast execution', 'Same result regardless of how many times you run it', 'Requires root access', 'Only runs once'], 1, 'Idempotent means running the same configuration multiple times produces the same result.'),
    m('What is the difference between push and pull CM?', ['Push is slower', 'Push sends config from server; pull agents fetch from master', 'No difference', 'Push requires agents'], 1, 'Push model (Ansible) sends config from control node. Pull model (Puppet) has agents fetch from master.'),
    m('Which is the most popular CM tool?', ['Chef', 'Puppet', 'Ansible', 'SaltStack'], 2, 'Ansible is the most popular configuration management tool, known for being agentless and easy to learn.')
  ]
);

/* =================== TOPIC 11: Immutable Infrastructure =================== */
addTopic('devops-immutable-infra', 'Immutable Infrastructure', 'advanced', 20,
  ['Immutable infrastructure is a pattern where servers are never modified after deployment. When changes are needed, new servers are built from a common image.',
   'Instead of patching or upgrading running servers (mutable), you replace them entirely with new instances running the updated image.',
   'Benefits: no configuration drift, consistent environments, easy rollback (switch to old image), simplified debugging (known state).',
   'Enabling technologies: container images (Docker), AMIs (AWS machine images), virtual machine snapshots, auto-scaling groups, blue-green deployments.'
  ],
  'Immutable infrastructure is like replacing a lightbulb instead of repairing it. When a bulb burns out (needs a change), you don\'t fix the filament — you screw in a brand new bulb. Every bulb is identical, factory-made. Your servers are the same: when anything needs to change, you provision a fresh one.',
  [
    d('Immutable vs Mutable', 'Mutable: SSH into server, update config, restart service. Over time, servers become snowflakes (unique, undocumented differences). Immutable: build new image with changes, deploy new instances, terminate old ones. Every instance is identical to the image. No drift. Predictable. Debugging is easier because you know the exact state.'),
    d('Building Immutable Images', 'Step 1: Start with base image (OS + security patches). Step 2: Install dependencies and application. Step 3: Configure settings baked into image. Step 4: Create golden image (AMI, Docker image). Step 5: Deploy instances from image. Never SSH into running instances. Never hotfix.'),
    d('Immutable Infrastructure with Containers', 'Docker containers are the ultimate expression of immutability. Dockerfile defines exact image contents. Image is built once, deployed everywhere. No differences between dev, staging, production. Registry stores image versions. Rollback is switching to previous image tag. Kubernetes manages immutable container deployments.'),
    d('Challenges and Solutions', 'Challenge: stateful services (databases). Solution: externalize state to managed services (RDS), persistent volumes. Challenge: hotfix urgency. Solution: quick image build pipeline, feature flags. Challenge: configuration. Solution: bake config into image or use env vars at deploy time. Challenge: cost. Solution: immutable is often cheaper (no snowflake management).')
  ],
  'Immutable infrastructure is a cornerstone of modern DevOps. Treat servers as disposable — never modify them in place. Use Docker images or AMIs. Combine with auto-scaling and blue-green deployments. Externalize state. The result: no drift, easy rollbacks, and perfect consistency.',
  [
    q('What is immutable infrastructure?', 'Servers are never modified after deployment. Changes mean replacing the entire server from a new image.'),
    q('What is the difference between immutable and mutable infrastructure?', 'Mutable: modify servers in place. Immutable: replace servers entirely for any change.'),
    q('What are the benefits of immutable infrastructure?', 'No configuration drift, consistent environments, easy rollback, simplified debugging.'),
    q('How do containers relate to immutable infrastructure?', 'Containers are inherently immutable — the image defines exact contents; any change requires a new image.'),
    q('What is a golden image?', 'A master image (AMI, VM snapshot) used as the basis for all instances in immutable infrastructure.'),
    q('How do you handle databases with immutable infrastructure?', 'Externalize state to managed services (RDS) or persistent volumes — keep data outside ephemeral compute.')
  ],
  R(10,35,110,25,'#0070f3','','Build Image','Golden AMI / Docker') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Deploy','New instances from image') +
  R(10,65,110,25,'#ffc107','','Running','Never SSH, never patch') +
  R(10,95,110,25,'#dc3545','','Change Needed','Build new image version') +
  A(120,78,150,78) + A(120,108,150,108) +
  R(160,65,110,25,'#e83e8c','','Replace','New instances') +
  R(10,125,110,25,'#6610f2','','Terminate','Old instances removed') +
  R(290,35,190,120,'#17a2b8','','Immutable Infrastructure','Never modify servers. Replace with new images. No drift. Easy rollback. Containers + AMIs.') +
  T(240,190,'Immutable Infrastructure: Replace, never modify. Build golden images, deploy new instances, terminate old ones.',9,'#666','middle'),
  [
    e('Dockerfile for Immutable App Image', 'Deterministic container build.', codeBlock([
      '# Dockerfile — immutable application image',
      'FROM node:18-alpine AS base',
      'WORKDIR /app',
      'COPY package*.json ./',
      'RUN npm ci --only=production',
      '',
      'FROM base AS build',
      'COPY . .',
      'RUN npm run build',
      '',
      'FROM nginx:alpine AS production',
      'COPY --from=build /app/dist /usr/share/nginx/html',
      'COPY nginx.conf /etc/nginx/conf.d/default.conf',
      'EXPOSE 80',
      'HEALTHCHECK --interval=30s CMD wget -qO- http://localhost/ || exit 1'
    ]), 'Multi-stage Dockerfile building an immutable production image — no runtime modifications allowed.'),
    e('Packer: Build Golden AMI', 'Automated machine image creation.', codeBlock([
      '# packer.pkr.hcl — build immutable AMI',
      'packer {',
      '  required_plugins {',
      '    amazon = {',
      '      version = ">= 1.0.0"',
      '      source  = "github.com/hashicorp/amazon"',
      '    }',
      '  }',
      '}',
      '',
      'source "amazon-ebs" "webapp" {',
      '  ami_name      = "myapp-{{timestamp}}")',
      '  instance_type = "t2.micro"',
      '  region        = "us-east-1"',
      '  source_ami_filter {',
      '    filters = {',
      '      name = "amzn2-ami-hvm-*-x86_64-gp2"',
      '    }',
      '  }',
      '  communicator = "ssh"',
      '  ssh_username = "ec2-user"',
      '}',
      '',
      'build {',
      '  sources = ["source.amazon-ebs.webapp"]',
      '  provisioner "shell" {',
      '    inline = [',
      '      "sudo yum update -y",',
      '      "sudo yum install -y nginx",',
      '      "sudo systemctl enable nginx"',
      '    ]',
      '  }',
      '}'
    ]), 'Packer builds immutable AMIs by starting from a base image, provisioning, and creating a golden image.')
  ],
  [
    m('What is the key principle of immutable infrastructure?', ['Servers are patched regularly', 'Servers are replaced, never modified', 'Servers are backed up daily', 'Servers are manually configured'], 1, 'Immutable infrastructure replaces servers entirely rather than modifying them in place.'),
    m('What is a benefit of immutable infrastructure?', ['More complex debugging', 'No configuration drift', 'Higher costs', 'Slower deployments'], 1, 'No configuration drift — every instance is identical to the golden image it was built from.'),
    m('How do containers relate to immutability?', ['Containers are mutable by default', 'Container images are immutable — any change requires a new image', 'Containers cannot be immutable', 'Only Docker supports immutability'], 1, 'Container images are inherently immutable. Any change requires building a new image version.')
  ]
);

/* =================== TOPIC 12: Shift Left Testing =================== */
addTopic('devops-shift-left', 'Shift Left Testing', 'intermediate', 20,
  ['Shift Left Testing is the practice of moving testing activities earlier in the development lifecycle ("to the left" on the timeline).',
   'Traditional testing happens at the end (right side). Shift Left moves it to the beginning: requirements, design, and development phases.',
   'Goal: catch defects earlier when they are cheaper and faster to fix. A bug found during development costs 10x less than one found in production.',
   'Includes: static analysis, code reviews, unit tests, security scanning in IDE, contract testing, and test-driven development (TDD).'
  ],
  'Shift Left is like checking your ingredients before you start cooking, instead of tasting the dish at the end and realizing the milk is sour. You catch problems at the grocery store (requirements phase) rather than at the dinner table (production). Fixing a bad ingredient is much cheaper than fixing a ruined meal.',
  [
    d('Traditional vs Shift Left', 'Traditional: requirements → design → code → test → deploy. Testing is a final gate before release. Defects found late are expensive. Shift Left: test during requirements (acceptance criteria), design (architecture review), coding (unit tests, TDD), and continuously in CI. Every phase includes quality checks.'),
    d('Shift Left Practices', 'TDD: write tests before code. Static analysis: linters, SonarQube in IDE. Pre-commit hooks: lint, format, secret scanning before commit. CI: run all tests on every push. Contract testing: verify API contracts early. Security scanning: SAST in pipeline. Performance testing: early and often, not just before release.'),
    d('Shift Left Security (DevSecOps)', 'Security is integrated from the start, not bolted on at the end. Practices: threat modeling during design (STRIDE). SAST (Static Application Security Testing) in IDE/CI. Dependency scanning (npm audit, Snyk). Secret scanning (truffleHog). Container scanning (Trivy, Snyk). Policy as code (OPA).'),
    d('Benefits and Metrics', 'Cost of defect: caught in development = $X, caught in production = 10-100X. Time to fix: shorter. Quality: higher. Team morale: better (less firefighting). Metrics: defect escape rate (bugs reaching production), mean time to detect (MTTD), mean time to fix (MTTFix), code coverage trend.')
  ],
  'Shift Left means testing earlier, testing often, and testing in every phase. Catch defects when they are cheapest to fix. Integrate security from the start. Automate everything possible. The earlier you find a bug, the cheaper it is. Make quality everyone\'s responsibility, not just QA.',
  [
    q('What is Shift Left Testing?', 'Moving testing activities earlier in the development lifecycle — testing during requirements, design, and coding phases.'),
    q('Why is Shift Left important?', 'Defects found earlier are exponentially cheaper to fix. A bug in dev costs 10x less than one in production.'),
    q('What is TDD?', 'Test-Driven Development — write failing tests before writing code. Ensures testability and forces good design.'),
    q('What is SAST?', 'Static Application Security Testing — analyzing source code for security vulnerabilities without executing it.'),
    q('What is defect escape rate?', 'The percentage of defects that reach production. Lower is better. A key Shift Left metric.'),
    q('How does Shift Left relate to DevSecOps?', 'Security is integrated from the start (threat modeling, SAST, dependency scanning) rather than being a final gate.')
  ],
  R(10,35,110,25,'#0070f3','','Requirements','Acceptance criteria') +
  R(10,65,110,25,'#28a745','','Design','Architecture review') +
  R(10,95,110,25,'#ffc107','','Development','TDD + static analysis') +
  R(10,125,110,25,'#dc3545','','CI Pipeline','All tests every push') +
  R(10,155,110,25,'#e83e8c','','Production','Defect escape minimized') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#28a745','','SHIFT LEFT','Test earlier. Catch defects when they are cheap. Quality from the start, not the end.') +
  T(240,220,'Shift Left: Move testing earlier in the lifecycle. Find defects when they are cheapest to fix.',9,'#666','middle'),
  [
    e('Pre-commit Hook for Shift Left', 'Catch issues before commit.', codeBlock([
      '#!/bin/bash',
      '# .git/hooks/pre-commit — runs before every commit',
      '',
      'echo "Running pre-commit checks..."',
      '',
      '# Lint check',
      'npm run lint || exit 1',
      '',
      '# Format check',
      'npm run format:check || exit 1',
      '',
      '# Secret scanning',
      'npx truffleHog --regex --entropy=False . || true',
      '',
      '# Run unit tests for changed files',
      'npm test -- --changedSince=HEAD || exit 1',
      '',
      '# Check for TODO/FIXME comments',
      'if git diff --cached | grep -E "TODO|FIXME"; then',
      '  echo "WARNING: Committing TODO/FIXME"',
      'fi',
      '',
      'echo "All checks passed!"'
    ]), 'Pre-commit hook runs lint, format, secret scanning, and tests before each commit — Shift Left in action.'),
    e('CI with Shift Left Practices', 'Comprehensive early testing.', codeBlock([
      'name: Shift Left CI',
      'on: [pull_request]',
      '',
      'jobs:',
      '  quality:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v3',
      '      - run: npm ci',
      '      - name: Static Analysis',
      '        run: npm run lint && npm run lint:security',
      '      - name: Dependency Audit',
      '        run: npm audit --audit-level=high',
      '      - name: Unit Tests + Coverage',
      '        run: npm test -- --coverage --min-coverage=80',
      '      - name: Build Check',
      '        run: npm run build',
      '      - name: Contract Tests',
      '        run: npm run test:contract',
      '      - name: SAST Scan',
      '        uses: github/codeql-action/analyze@v2'
    ]), 'CI pipeline with Shift Left practices: static analysis, dependency audit, unit tests, contract tests, SAST scan.')
  ],
  [
    m('What is the core idea behind Shift Left?', ['Test after deployment', 'Move testing earlier in the lifecycle', 'Test only in production', 'Reduce test automation'], 1, 'Shift Left moves testing activities earlier in the development lifecycle to catch defects sooner.'),
    m('How much more expensive is a bug found in production vs development?', ['Same cost', '2x more expensive', '10-100x more expensive', 'Cheaper in production'], 2, 'A defect found in production can cost 10-100x more to fix than one caught during development.'),
    m('What is SAST?', ['Security testing during runtime', 'Static source code analysis for vulnerabilities', 'Penetration testing', 'User acceptance testing'], 1, 'SAST (Static Application Security Testing) analyzes source code for vulnerabilities without executing it.')
  ]
);

/* =================== TOPIC 13: GitOps =================== */
addTopic('devops-gitops', 'GitOps', 'advanced', 25,
  ['GitOps is an operational framework that uses Git as the single source of truth for declarative infrastructure and applications.',
   'The Git repository contains the entire desired state of the system. Automated process reconciles actual state with desired state.',
   'Principles: declarative config, Git as source of truth, automated reconciliation, pull-based deployment, observability.',
   'Tools: ArgoCD, Flux (Kubernetes), Terraform Cloud, Atlantis. Most commonly used with Kubernetes.'
  ],
  'GitOps is like a house where the blueprint IS the house. You update the blueprint (Git repo), and robot builders (ArgoCD/Flux) immediately make the house match. If someone drills a wrong hole, robots detect and fix it. No one ever touches the actual house directly.',
  [
    d('GitOps Principles', 'Declarative: entire system described declaratively (K8s manifests, Terraform). Versioned: Git history is audit trail. Approved: changes go through PRs and code review. Automated: operator reconciles desired vs actual. Observable: system state visible, drift detected.'),
    d('GitOps vs CI/CD', 'CI/CD pushes changes (push model). GitOps pulls from Git (pull model). In GitOps, the cluster watches Git and self-heals. GitOps is declarative; traditional CI/CD is often imperative. GitOps is better for Kubernetes-native deployments.'),
    d('ArgoCD', 'Kubernetes controller monitoring Git repos and reconciling cluster state. Features: auto-sync, health checks, rollback, SSO, multi-cluster. App of Apps pattern.'),
    d('Disaster Recovery', 'Point a new cluster at the Git repo — GitOps automatically restores the entire desired state. No manual reconfiguration needed. Complete audit trail in Git history.')
  ],
  'GitOps is the standard for Kubernetes deployments. Use ArgoCD or Flux. Pull-based model is more secure. Disaster recovery is trivial — point a new cluster at Git. Never make changes directly to the cluster.',
  [
    q('What is GitOps?', 'Using Git as the single source of truth for declarative infrastructure with automated reconciliation.'),
    q('What is the difference between GitOps and CI/CD?', 'CI/CD pushes to environments. GitOps pulls from Git. GitOps is pull-based and self-healing.'),
    q('What is ArgoCD?', 'A GitOps operator for Kubernetes that monitors Git repos and reconciles cluster state.'),
    q('How does GitOps help with disaster recovery?', 'Point a new cluster at Git — GitOps automatically restores everything.'),
    q('What is a pull-based deployment model?', 'The agent inside the cluster pulls desired state from Git rather than CI pushing to the cluster.')
  ],
  R(10,35,110,25,'#0070f3','','Developer','Pushes to Git') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Git Repo','Source of truth') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','GitOps Operator','ArgoCD / Flux') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Kubernetes','Reconcile state') +
  R(10,105,110,25,'#e83e8c','','Pull Model','Agent pulls from Git') +
  R(10,135,110,25,'#6610f2','','Drift Detect','Auto-heal differences') +
  R(290,35,190,135,'#17a2b8','','GitOps','Git = source of truth. Pull-based. Self-healing. ArgoCD/Flux.') +
  T(240,205,'GitOps: Git is source of truth. Declarative + pull-based + self-healing deployments.',9,'#666','middle'),
  [
    e('ArgoCD Application', 'GitOps app definition.', codeBlock([
      'apiVersion: argoproj.io/v1alpha1',
      'kind: Application',
      'metadata:',
      '  name: myapp',
      '  namespace: argocd',
      'spec:',
      '  project: default',
      '  source:',
      '    repoURL: https://github.com/org/myapp.git',
      '    targetRevision: main',
      '    path: k8s/overlays/production',
      '  destination:',
      '    server: https://kubernetes.default.svc',
      '    namespace: production',
      '  syncPolicy:',
      '    automated:',
      '      prune: true',
      '      selfHeal: true'
    ]), 'ArgoCD Application CRD — defines Git repo source and destination cluster.'),
    e('Flux GitRepository', 'Flux source definition.', codeBlock([
      'apiVersion: source.toolkit.fluxcd.io/v1',
      'kind: GitRepository',
      'metadata:',
      '  name: myapp',
      '  namespace: flux-system',
      'spec:',
      '  interval: 1m',
      '  url: https://github.com/org/myapp.git',
      '  ref:',
      '    branch: main',
      '---',
      'apiVersion: kustomize.toolkit.fluxcd.io/v1',
      'kind: Kustomization',
      'metadata:',
      '  name: myapp',
      'spec:',
      '  interval: 10m',
      '  sourceRef:',
      '    kind: GitRepository',
      '    name: myapp',
      '  path: ./k8s/overlays/production',
      '  prune: true'
    ]), 'Flux GitRepository and Kustomization driving GitOps reconciliation.')
  ],
  [
    m('What is GitOps?', ['Git version control', 'Git as source of truth for declarative infrastructure', 'Git-based project management', 'Git CI/CD'], 1, 'GitOps uses Git as the single source of truth for declarative infrastructure with automated reconciliation.'),
    m('What model does GitOps use?', ['Push model', 'Pull model', 'Hybrid model', 'Manual model'], 1, 'GitOps uses a pull model where agents inside the cluster pull desired state from Git.'),
    m('What is ArgoCD?', ['CI tool', 'GitOps operator for Kubernetes', 'Monitoring tool', 'Container runtime'], 1, 'ArgoCD is a GitOps operator that monitors Git repos and reconciles Kubernetes cluster state.')
  ]
);

/* =================== TOPIC 14: DevSecOps =================== */
addTopic('devops-devsecops', 'DevSecOps', 'intermediate', 20,
  ['DevSecOps integrates security into every phase of the DevOps lifecycle, making security a shared responsibility.',
   '"Shift Left on Security" — security from the start, not bolted on as a final gate.',
   'Practices: threat modeling, secure coding, SAST, DAST, SCA, container scanning, policy as code.',
   'Replaces the traditional "security gate" model with continuous security validation throughout the pipeline.'
  ],
  'DevSecOps is like building a house with a security system installed during construction, not after move-in. Security is part of every step: foundation is secure, walls are reinforced, locks are tested before the roof goes on.',
  [
    d('SAST, DAST, SCA', 'SAST (Static): analyze source code without execution (SonarQube, CodeQL, Semgrep). DAST (Dynamic): test running app (OWASP ZAP, Burp Suite). SCA (Composition): scan dependencies for CVEs (Snyk, npm audit, Trivy). All integrated into CI/CD.'),
    d('Policy as Code', 'Security policies as machine-readable code. OPA (Open Policy Agent) / Rego. Automated, consistent decisions. Examples: "containers must not run as root", "all APIs must have rate limiting", "deployments must have resource limits". Tested and versioned.'),
    d('Container Security', 'Image scanning for CVEs (Trivy, Clair). Build-time: no root user, minimal base images (distroless). Runtime: Falco (behavioral monitoring), AppArmor. Registry: only signed images. Admission control: Kyverno, OPA.')
  ],
  'DevSecOps makes security continuous and automated. Integrate SAST, DAST, SCA in CI/CD. Use policy as code (OPA). Scan containers. Shift security left. Security is everyone\'s responsibility.',
  [
    q('What is DevSecOps?', 'Integrating security into every phase of the DevOps lifecycle as a shared responsibility.'),
    q('What is the difference between SAST and DAST?', 'SAST analyzes source code without execution. DAST tests running applications.'),
    q('What is SCA?', 'Software Composition Analysis — scanning dependencies for known vulnerabilities.'),
    q('What is Policy as Code?', 'Security policies defined as version-controlled, automated code enforced by tools like OPA.')
  ],
  R(10,35,110,25,'#0070f3','','Code','SAST + lint') +
  R(10,65,110,25,'#28a745','','Dependencies','SCA') +
  R(10,95,110,25,'#ffc107','','Build','Container scan') +
  R(10,125,110,25,'#dc3545','','Deploy','OPA policy') +
  R(10,155,110,25,'#e83e8c','','Runtime','Falco monitor') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#dc3545','','DevSecOps','Security in every phase. SAST, DAST, SCA, container scanning, policy as code.') +
  T(240,220,'DevSecOps: Security integrated throughout the pipeline. Automated, continuous, shared responsibility.',9,'#666','middle'),
  [
    e('Security Scanning in CI', 'SAST + SCA + container scan.', codeBlock([
      'name: DevSecOps Pipeline',
      'on: [push, pull_request]',
      'jobs:',
      '  security:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v3',
      '      - name: CodeQL Analysis',
      '        uses: github/codeql-action/analyze@v2',
      '      - name: Dependency Audit',
      '        run: npm audit --audit-level=high',
      '      - name: Snyk Scan',
      '        uses: snyk/actions/node@master',
      '      - name: Trivy Scan',
      '        uses: aquasecurity/trivy-action@master',
      '        with:',
      '          image-ref: "myapp:${{ github.sha }}"'
    ]), 'CI pipeline integrating SAST, SCA, and container scanning for continuous security.'),
    e('OPA Policy (Rego)', 'Kubernetes admission policy.', codeBlock([
      'package kubernetes.admission',
      'deny[msg] {',
      '  input.request.kind.kind == "Pod"',
      '  c := input.request.object.spec.containers[_]',
      '  not c.securityContext.runAsNonRoot',
      '  msg := sprintf("Container %v must runAsNonRoot", [c.name])',
      '}',
      'deny[msg] {',
      '  c := input.request.object.spec.containers[_]',
      '  not c.resources.limits',
      '  msg := sprintf("Container %v needs resource limits", [c.name])',
      '}'
    ]), 'OPA/Rego policies enforcing security rules for Kubernetes admission control.')
  ],
  [
    m('What is DevSecOps?', ['Separate security team', 'Security in every DevOps phase', 'Security only at deployment', 'Manual review'], 1, 'DevSecOps integrates security into every phase of the DevOps lifecycle.'),
    m('What is SAST vs DAST?', ['SAST=running app; DAST=source', 'SAST=source code; DAST=running app', 'Same thing', 'Both test dependencies'], 1, 'SAST analyzes source code statically; DAST tests the running application dynamically.'),
    m('What is SCA?', ['Static code analysis', 'Software Composition Analysis (dependency scanning)', 'System audit', 'Security audit'], 1, 'SCA scans dependencies for known vulnerabilities. Tools: Snyk, npm audit, Trivy.')
  ]
);

/* =================== TOPIC 15: Platform Engineering =================== */
addTopic('devops-platform-engineering', 'Platform Engineering', 'advanced', 25,
  ['Platform Engineering builds and maintains internal developer platforms (IDPs) providing self-service capabilities for dev teams.',
   'The platform abstracts infrastructure complexity, providing developers golden paths to deploy and manage applications.',
   'Components: CI/CD pipelines, infrastructure automation, service catalog, developer portals (Backstage), observability, security.',
   'DevOps is culture; platform engineering builds tools that enable that culture at scale.'
  ],
  'Platform engineering is like building a supermarket instead of every chef growing their own food. Devs can "pick up" pre-configured services: PostgreSQL, Redis, Kubernetes namespace — all self-service, all compliant.',
  [
    d('Internal Developer Platform (IDP)', 'Self-service layer on top of infrastructure. Components: provisioning (Terraform), CI/CD, service catalog (Backstage), secrets, monitoring, cost tracking. IDP is the product; developers are the customers.'),
    d('Golden Path', 'The recommended, well-supported way to build and deploy services. Standardized tooling, templates, workflows. Reduces decision fatigue. Ensures best practices are followed automatically.'),
    d('Backstage (Spotify)', 'Open-source developer portal. Software catalog, templates (scaffold new services), plugins (CI/CD, monitoring, docs), techdocs. Unifies all dev tools into a single interface.'),
    d('Platform as a Product', 'Treat platform as a product: understand developer pain points, define SLIs/SLOs, gather feedback, iterate. Platform adoption is voluntary — make it better than alternatives.')
  ],
  'Platform engineering builds the internal tools that make DevOps scalable. Treat the platform as a product. Use Backstage for the developer portal. Build golden paths. Abstract complexity. Platform engineering and DevOps are complementary.',
  [
    q('What is Platform Engineering?', 'Building internal developer platforms providing self-service capabilities for development teams.'),
    q('What is an IDP?', 'Internal Developer Platform — a self-service layer on top of infrastructure abstracting complexity for developers.'),
    q('What is a Golden Path?', 'The recommended, standardized way to build and deploy services with best practices built in.'),
    q('What is Backstage?', 'An open-source developer portal platform by Spotify with software catalog, templates, and plugins.'),
    q('What does "platform as a product" mean?', 'Treating the internal platform as a product with users, feedback loops, and continuous improvement.')
  ],
  R(10,35,110,25,'#0070f3','','IDP','Self-service platform') +
  R(10,65,110,25,'#28a745','','Golden Path','Standardized workflows') +
  R(10,95,110,25,'#ffc107','','Backstage','Developer portal') +
  R(10,125,110,25,'#dc3545','','Templates','Scaffold services') +
  R(10,155,110,25,'#e83e8c','','Catalog','All services tracked') +
  R(290,35,190,155,'#6610f2','','Platform Engineering','Build IDPs. Self-service golden paths. Platform as a product. Backstage. DevOps at scale.') +
  T(240,220,'Platform Engineering: Building IDPs for self-service, golden paths, and DevOps at scale.',9,'#666','middle'),
  [
    e('Backstage Software Template', 'Scaffold a new service.', codeBlock([
      'apiVersion: scaffolder.backstage.io/v1beta3',
      'kind: Template',
      'metadata:',
      '  name: node-service',
      '  title: Node.js Microservice',
      'spec:',
      '  owner: platform-team',
      '  parameters:',
      '    - title: Service Details',
      '      required: [name, owner]',
      '      properties:',
      '        name:',
      '          title: Service Name',
      '          type: string',
      '        owner:',
      '          title: Team',
      '          type: string',
      '  steps:',
      '    - id: template',
      '      name: Scaffold',
      '      action: fetch:template',
      '      input:',
      '        url: ./templates/node-service',
      '        values:',
      '          name: ${{ parameters.name }}',
      '    - id: publish',
      '      name: Publish to GitHub',
      '      action: publish:github',
      '      input:',
      '        repoUrl: github.com?owner=${{ parameters.owner }}'
    ]), 'Backstage template scaffolding a new Node.js microservice with CI/CD and catalog registration.'),
    e('Platform Mission Statement', 'IDP vision.', codeBlock([
      '# Internal Developer Platform — Mission',
      '## Vision',
      'Developers build, deploy, and operate services without leaving their IDE.',
      '## Principles',
      '- Self-service over tickets',
      '- Golden paths over unlimited flexibility',
      '- Automation over manual processes',
      '- Observability as default',
      '- Security baked in',
      '## Success Metrics',
      '- Onboard new service: < 1 hour',
      '- Dev satisfaction: NPS > 50',
      '- Platform uptime: 99.99%'
    ]), 'Platform team mission defining IDP vision, principles, and success metrics.')
  ],
  [
    m('What is Platform Engineering?', ['Managing cloud infra', 'Building IDPs for self-service', 'Writing app code', 'Managing DBs'], 1, 'Platform Engineering builds Internal Developer Platforms providing self-service capabilities.'),
    m('What is a Golden Path?', ['Most secure path', 'Standardized way to build/deploy', 'Migration strategy', 'Testing approach'], 1, 'A Golden Path is the recommended, standardized workflow for building and deploying services.'),
    m('What is Backstage?', ['CI/CD tool', 'Open-source developer portal by Spotify', 'Monitoring tool', 'Container runtime'], 1, 'Backstage is an open-source developer portal for software catalog, templates, and self-service.')
  ]
);

/* =================== TOPIC 16: SRE =================== */
addTopic('devops-sre', 'SRE (Site Reliability Engineering)', 'advanced', 30,
  ['SRE applies software engineering principles to operations and infrastructure problems.',
   'Originated at Google (2003). SRE teams are software engineers who design and build operational systems.',
   'Core concepts: SLOs, SLIs, error budgets, toil elimination, automation, blameless postmortems.',
   'SRE differs from traditional Ops: SREs are engineers who code, not sysadmins. They automate themselves out of manual work.'
  ],
  'SRE is like having an engineer who builds self-cleaning houses instead of a janitor. The SRE writes software that monitors, fixes, and improves the house automatically. If something breaks, they build a robot to fix it forever.',
  [
    d('SLOs, SLIs, Error Budgets', 'SLI: quantitative measure (latency p99, error rate). SLO: target value (p99 < 200ms, 99.9% availability). Error Budget: allowable unreliability (100% - SLO). If budget is available, deploy risky changes. If depleted, stop deployments until reliability improves.'),
    d('Toil Elimination', 'Toil: manual, repetitive, automatable ops work (restarts, manual deploys, non-urgent alerts). SREs spend < 50% on toil. Rest is engineering to eliminate toil. Every toil task gets an automation ticket.'),
    d('Blameless Postmortems', 'Focus on what happened and why, not who. No blame. Action items are system improvements. Postmortems shared broadly. Culture of learning from failure.'),
    d('SRE vs DevOps', 'SRE: specific role/team with SLOs and error budgets. DevOps: broader cultural movement. SRE implements DevOps principles with specific practices. Google: "SRE is what happens when you ask a software engineer to design an operations team."')
  ],
  'SRE applies engineering to ops. Define SLOs and error budgets. Automate toil. Blameless postmortems. < 50% time on toil. Reliability is a feature — manage it like one.',
  [
    q('What is SRE?', 'Site Reliability Engineering — applying software engineering to operations and infrastructure.'),
    q('What is an SLO?', 'Service Level Objective — target value for a reliability metric (e.g., 99.9% availability).'),
    q('What is an error budget?', 'Allowable unreliability (100% - SLO). If depleted, deployments stop until reliability improves.'),
    q('What is toil?', 'Manual, repetitive, automatable ops work. SREs spend < 50% time on toil.'),
    q('What is the difference between SRE and DevOps?', 'SRE is a specific role with SLOs/error budgets. DevOps is a broader cultural movement.')
  ],
  R(10,35,110,25,'#0070f3','','SLI','Latency, error rate') +
  R(10,65,110,25,'#28a745','','SLO','99.9% availability') +
  R(10,95,110,25,'#ffc107','','Error Budget','0.1% = 8.7h/year') +
  R(10,125,110,25,'#dc3545','','Automation','Kill toil') +
  R(10,155,110,25,'#e83e8c','','Postmortem','Blameless learning') +
  R(290,35,190,155,'#6610f2','','SRE','Software engineering for ops. SLOs, error budgets, toil elimination, blameless.') +
  T(240,220,'SRE: Engineering applied to operations. SLO-driven, error budgets, automation, blameless postmortems.',9,'#666','middle'),
  [
    e('SLO Monitoring Rules (Prometheus)', 'SLI-based alerting.', codeBlock([
      'groups:',
      '  - name: slo-alerts',
      '    rules:',
      '      - record: job:latency:p99',
      '        expr: histogram_quantile(0.99,',
      '          rate(http_duration_seconds_bucket[5m]))',
      '      - record: job:error_budget_burn',
      '        expr: (1 - job:availability:ratio) / (1 - 0.999)',
      '      - alert: ErrorBudgetDepleted',
      '        expr: error_budget_burn > 2',
      '        for: 1h',
      '        labels: { severity: critical }',
      '        annotations: { summary: "Budget depleted" }'
    ]), 'Prometheus rules for SLI, error budget burn rate, and SLO-based alerting.'),
    e('Incident Response Runbook', 'SRE incident process.', codeBlock([
      '# Incident Runbook: Service Degraded',
      '## Severity: SEV2',
      '1. ACKNOWLEDGE: Acknowledge alert in PagerDuty',
      '2. TRIAGE: Check Grafana, recent deploys, error logs',
      '3. MITIGATE: Rollback if recent deploy, scale if traffic',
      '4. RESOLVE: Confirm fix, update PagerDuty',
      '5. POSTMORTEM: Schedule within 48h, write timeline',
      '',
      '# Severity levels',
      'SEV1: Critical user-facing outage',
      'SEV2: Major degradation',
      'SEV3: Minor non-urgent issue'
    ]), 'SRE incident response runbook with acknowledge, triage, mitigate, resolve, and postmortem.')
  ],
  [
    m('What does SRE stand for?', ['Site Reliability Engineering', 'Software Release Engineering', 'System Resource Engineering', 'Site Runtime Environment'], 0, 'SRE = Site Reliability Engineering.'),
    m('What is an error budget?', ['Budget for hiring', 'Allowable unreliability (100% - SLO)', 'Infrastructure budget', 'Team budget'], 1, 'Error budget = 100% - SLO. It represents the allowable unreliability.'),
    m('How much time on toil?', ['No limit', '< 50%', '> 80%', 'Exactly 50%'], 1, 'SREs should spend no more than 50% of time on toil; the rest is engineering to eliminate it.')
  ]
);

/* =================== TOPIC 17: Blue-Green Deployment =================== */
addTopic('devops-blue-green', 'Blue-Green Deployment', 'intermediate', 20,
  ['Blue-Green maintains two identical production environments — Blue (current live) and Green (new version).',
   'Traffic routes to Blue. When Green is ready, the router switches all traffic from Blue to Green at once.',
   'Benefits: zero-downtime, instant rollback (switch back to Blue), environment validation before traffic switch.',
   'Challenge: double infrastructure cost, database schema changes need careful handling.'
  ],
  'Blue-Green is like two identical bridges across a river. Traffic uses Blue. You build Green alongside. When Green is tested, switch all traffic instantly. If problems, switch back to Blue. Traffic never stops.',
  [
    d('Architecture', 'Two identical environments. Load balancer controls traffic direction. At switch time, router reconfigures to send all traffic to Green. Old Blue stays ready for rollback.'),
    d('Database Challenges', 'Schema changes must be backward-compatible. Phase migrations: add columns before switch, remove old after. Green connects to same DB or cloned replica. Best: changes compatible with N-1 version.'),
    d('Switch and Rollback', 'Switch: update DNS/load balancer to Green. Instant for internal LBs; DNS has propagation delay (use low TTL). Rollback: switch traffic back to Blue. Blue still running. No redeployment.'),
    d('Kubernetes Blue-Green', 'Two deployments (blue, green) with labels. Service selector switches between them. Tools: Argo Rollouts, Flagger automate traffic switching.')
  ],
  'Blue-Green provides zero-downtime deployments with instant rollback at double infrastructure cost. Database migrations must be backward-compatible. Use for critical services where downtime is unacceptable.',
  [
    q('What is Blue-Green deployment?', 'Two identical environments. One live (Blue), one staging (Green). Traffic switches instantly from Blue to Green.'),
    q('What is the main benefit?', 'Zero-downtime deployments and instant rollback by switching traffic back to Blue.'),
    q('What is the main challenge?', 'Double infrastructure cost during transition. Both environments run simultaneously.'),
    q('How is rollback handled?', 'Switch traffic back to the still-running Blue environment. No redeployment needed.'),
    q('How to handle DB migrations?', 'Backward-compatible schema changes. Phase migrations: add before switch, remove old after.')
  ],
  R(10,35,110,25,'#0070f3','','Blue','Current live (v1)') +
  R(10,65,110,25,'#28a745','','Green','New version (v2)') +
  R(10,95,110,25,'#ffc107','','Load Balancer','Routes traffic') +
  A(120,48,150,48) + A(120,78,150,78) +
  R(160,35,110,25,'#dc3545','','Users','100% Blue') +
  R(160,95,110,25,'#e83e8c','','Switch Green','100% Green') +
  A(120,108,150,108) +
  R(10,130,110,25,'#6610f2','','Rollback','Switch back to Blue') +
  R(290,35,190,130,'#17a2b8','','Blue-Green','Zero-downtime. Double cost. Instant rollback. Backward-compatible DB.') +
  T(240,200,'Blue-Green: Two environments, instant switch. Zero downtime, instant rollback.',9,'#666','middle'),
  [
    e('K8s Blue-Green Service', 'Service selector switching.', codeBlock([
      'apiVersion: v1',
      'kind: Service',
      'metadata:',
      '  name: myapp',
      'spec:',
      '  selector:',
      '    app: myapp',
      '    version: blue  # change to green',
      '  ports:',
      '    - port: 80',
      '---',
      'apiVersion: apps/v1',
      'kind: Deployment',
      'metadata:',
      '  name: myapp-blue',
      'spec:',
      '  replicas: 3',
      '  selector:',
      '    matchLabels:',
      '      app: myapp',
      '      version: blue',
      '  template:',
      '    metadata:',
      '      labels:',
      '        app: myapp',
      '        version: blue',
      '    spec:',
      '      containers:',
      '        - name: app',
      '          image: myapp:1.0.0'
    ]), 'K8s Service + Deployment for Blue-Green. Change selector from blue to green to switch traffic.'),
    e('Argo Rollouts BlueGreen', 'Automated Blue-Green.', codeBlock([
      'apiVersion: argoproj.io/v1alpha1',
      'kind: Rollout',
      'metadata:',
      '  name: myapp-rollout',
      'spec:',
      '  replicas: 5',
      '  strategy:',
      '    blueGreen:',
      '      activeService: myapp-blue',
      '      previewService: myapp-green',
      '      autoPromotionEnabled: false',
      '      prePromotionAnalysis:',
      '        templates:',
      '          - templateName: smoke-test',
      '      scaleDownDelaySeconds: 600',
      '  selector:',
      '    matchLabels:',
      '      app: myapp',
      '  template:',
      '    metadata:',
      '      labels:',
      '        app: myapp',
      '    spec:',
      '      containers:',
      '        - name: app',
      '          image: myapp:2.0.0'
    ]), 'Argo Rollouts BlueGreen strategy with preview service, smoke tests, and delayed scale-down.')
  ],
  [
    m('What is the main benefit of Blue-Green?', ['Lower cost', 'Zero-downtime + instant rollback', 'Faster builds', 'Less testing'], 1, 'Blue-Green provides zero-downtime deployments and instant rollback by switching traffic.'),
    m('What is the main disadvantage?', ['Slower deploys', 'Double infrastructure cost', 'More bugs', 'Less testing'], 1, 'Blue-Green requires two full environments, doubling infrastructure costs during transition.'),
    m('How does Blue-Green handle rollback?', ['Redeploy old version', 'Switch traffic back to Blue', 'Restore DB backup', 'Rebuild Green'], 1, 'Rollback is instant — switch traffic back to the still-running Blue environment.')
  ]
);

/* =================== TOPIC 18: Canary Deployment =================== */
addTopic('devops-canary', 'Canary Deployment', 'intermediate', 20,
  ['Canary deployment gradually rolls out a new version to a small subset of users before expanding to everyone.',
   'Named from "canary in a coal mine" — early detection protects all users.',
   'Traffic increments: 1% → 5% → 10% → 25% → 50% → 100%, with monitoring and auto-rollback at each stage.',
   'Tools: Argo Rollouts, Flagger, Istio, NGINX Plus, AWS CodeDeploy, LaunchDarkly.'
  ],
  'Canary is like testing a new roller coaster on employees first. If 1% enjoy it safely, let 5% ride. Then 25%. Then everyone. If someone gets sick at 5%, stop immediately and fix it before anyone else rides.',
  [
    d('Process', 'Deploy new version alongside old. Start with 1% traffic. Monitor metrics (error rate, latency, business). If healthy: increase to 5%, 10%, 25%, 50%, 100%. If any metric degrades: auto-rollback.'),
    d('Metrics for Analysis', 'Error rate (5xx), latency (p50/p95/p99), CPU/memory, business metrics (conversion, sign-ups). Compare canary vs baseline. Statistically significant difference triggers rollback.'),
    d('Service Mesh Canary (Istio)', 'VirtualService routes traffic by weight percentage. DestinationRule defines subsets. Traffic splitting via weight updates. Istio handles metrics, retries, circuit breaking.'),
    d('Canary vs Blue-Green', 'Canary: gradual, risk-reducing, metrics-driven. Blue-Green: instant switch, simpler. Canary better for high-risk changes. Blue-Green for low-risk, instant-switch acceptable.')
  ],
  'Canary deployments reduce risk by gradual exposure. Start small, monitor metrics, expand if healthy, rollback if not. Use service mesh for fine-grained traffic control. Argo Rollouts and Flagger automate the process.',
  [
    q('What is Canary deployment?', 'Gradually rolling out a new version to a small subset before expanding to everyone.'),
    q('Why "canary"?', 'From "canary in a coal mine" — early group catches problems before affecting everyone.'),
    q('What triggers auto-rollback?', 'Metric degradation: error rate, latency, or business metrics exceeding thresholds.'),
    q('What is the difference between Canary and Blue-Green?', 'Canary is gradual; Blue-Green is instant switch. Canary needs sophisticated traffic routing.')
  ],
  R(10,35,110,25,'#0070f3','','Step 1','Deploy v2 alongside v1') +
  R(10,65,110,25,'#28a745','','Step 2','1% traffic to v2') +
  R(10,95,110,25,'#ffc107','','Step 3','Monitor metrics') +
  R(10,125,110,25,'#dc3545','','Step 4','5%, 10%, 25%...') +
  R(10,155,110,25,'#e83e8c','','Step 5','100% or Rollback') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#ffc107','','Canary','Gradual: 1% → 5% → 100%. Auto-rollback on metric degradation.') +
  T(240,220,'Canary: Gradual rollout with metrics-driven promotion. Start small, expand if healthy.',9,'#666','middle'),
  [
    e('Istio Canary VirtualService', 'Weight-based traffic split.', codeBlock([
      'apiVersion: networking.istio.io/v1beta1',
      'kind: VirtualService',
      'metadata:',
      '  name: myapp',
      'spec:',
      '  hosts: [myapp]',
      '  http:',
      '    - route:',
      '        - destination:',
      '            host: myapp',
      '            subset: v1',
      '          weight: 95',
      '        - destination:',
      '            host: myapp',
      '            subset: v2',
      '          weight: 5',
      '---',
      'apiVersion: networking.istio.io/v1beta1',
      'kind: DestinationRule',
      'metadata:',
      '  name: myapp',
      'spec:',
      '  host: myapp',
      '  subsets:',
      '    - name: v1',
      '      labels: { version: v1 }',
      '    - name: v2',
      '      labels: { version: v2 }'
    ]), 'Istio VirtualService routes 5% traffic to v2 canary, 95% to v1 stable.'),
    e('Argo Rollouts Canary', 'Automated canary steps.', codeBlock([
      'apiVersion: argoproj.io/v1alpha1',
      'kind: Rollout',
      'metadata:',
      '  name: myapp-canary',
      'spec:',
      '  strategy:',
      '    canary:',
      '      steps:',
      '        - setWeight: 5',
      '        - pause: {duration: 5m}',
      '        - setWeight: 25',
      '        - pause: {duration: 5m}',
      '        - setWeight: 100',
      '      analysis:',
      '        templates:',
      '          - templateName: success-rate'
    ]), 'Argo Rollouts canary with stepped weight increases and analysis-driven auto-promotion.')
  ],
  [
    m('What is Canary deployment?', ['Deploy to all at once', 'Gradual rollout to subset first', 'Rollback after release', 'Staging only'], 1, 'Canary gradually rolls out to a small subset before expanding.'),
    m('What triggers auto-rollback?', ['Time elapsed', 'Metric degradation', 'User complaints', 'Manual decision'], 1, 'If metrics (error rate, latency) exceed thresholds, the canary auto-rollbacks.'),
    m('What tool provides service mesh canary?', ['Docker', 'Istio', 'Ansible', 'Terraform'], 1, 'Istio service mesh provides fine-grained weight-based traffic splitting for canary deployments.')
  ]
);

/* =================== TOPIC 19: Rolling Deployment =================== */
addTopic('devops-rolling', 'Rolling Deployment', 'intermediate', 20,
  ['Rolling deployment gradually replaces instances of the previous version with the new version one by one.',
   'Unlike Blue-Green (instant switch) or Canary (subset exposure), rolling updates instances incrementally with no additional environment.',
   'Kubernetes uses rolling updates by default — pods are replaced incrementally with zero downtime.',
   'Benefits: no additional infrastructure cost, zero-downtime, gradual. Challenge: slow rollback (must roll instance by instance).'
  ],
  'Rolling deployment is like changing tires on a moving car. You replace one tire at a time while the car keeps driving. At any moment, most tires are the old ones, but gradually all become new. If the new tires vibrate, you must replace them back one at a time.',
  [
    d('Kubernetes Rolling Update', 'Default deployment strategy. Parameters: maxSurge (extra pods above desired), maxUnavailable (pods that can be down during update). Example: maxSurge=25%, maxUnavailable=25%. New ReplicaSet created. Old scaled down, new scaled up incrementally.'),
    d('Rolling Update Process', '1. New ReplicaSet created with 0 replicas. 2. Old ReplicaSet scaled down by maxUnavailable. 3. New ReplicaSet scaled up by maxSurge. 4. Repeat until all pods are on new version. 5. Old ReplicaSet scaled to 0. Progress monitored via kubectl rollout status.'),
    d('Rolling vs Blue-Green vs Canary', 'Rolling: incremental instance replacement, no extra cost, slow rollback. Blue-Green: two full environments, instant rollback, double cost. Canary: traffic-based percentage, sophisticated routing, auto-rollback on metrics.'),
    d('Rollback', 'kubectl rollout undo deployment/myapp. Reverses the rolling update instance by instance. Slower than Blue-Green rollback. Can specify --to-revision for specific version. History kept (default: 10 revisions).')
  ],
  'Rolling deployment is the default Kubernetes strategy. Zero extra cost, zero downtime, but slow rollback. Best for: stateless services, when you don\'t need instant rollback. Configure maxSurge/maxUnavailable based on capacity requirements.',
  [
    q('What is Rolling deployment?', 'Gradually replacing instances of the old version with the new version one by one.'),
    q('What is the main benefit of Rolling?', 'No additional infrastructure cost — uses the same number of instances, just incrementally updated.'),
    q('What is the main disadvantage?', 'Slow rollback — must reverse the update instance by instance.'),
    q('What is maxSurge in Kubernetes?', 'Maximum number of extra pods that can be created above the desired count during a rolling update.'),
    q('What is maxUnavailable?', 'Maximum number of pods that can be unavailable during a rolling update.'),
    q('How do you rollback a rolling update?', 'kubectl rollout undo deployment/myapp.')
  ],
  R(10,35,110,25,'#0070f3','','v1 (old)','5 running pods') +
  R(10,65,110,25,'#28a745','','v2 (new)','0 pods') +
  R(10,95,110,25,'#ffc107','','Rolling','Replace 1 by 1') +
  A(120,75,150,75) + A(120,108,150,108) +
  R(160,35,150,25,'#dc3545','','Step 1: +1 v2 pod (maxSurge)','') +
  R(160,65,150,25,'#e83e8c','','Step 2: -1 v1 pod (maxUnavail)','') +
  R(160,95,150,25,'#6610f2','','Step 3: Repeat until all v2','') +
  R(10,130,110,25,'#17a2b8','','Rollback','undo instance by instance') +
  R(320,35,160,130,'#28a745','','Rolling Update','Incremental pod replacement. Zero extra cost. Zero downtime. Slow rollback.') +
  T(240,200,'Rolling: Replace instances incrementally. Default in Kubernetes. Zero extra cost, zero downtime.',9,'#666','middle'),
  [
    e('Kubernetes Rolling Update Config', 'Rolling update parameters.', codeBlock([
      'apiVersion: apps/v1',
      'kind: Deployment',
      'metadata:',
      '  name: myapp',
      'spec:',
      '  replicas: 5',
      '  strategy:',
      '    type: RollingUpdate',
      '    rollingUpdate:',
      '      maxSurge: 1',
      '      maxUnavailable: 0',
      '  selector:',
      '    matchLabels:',
      '      app: myapp',
      '  template:',
      '    metadata:',
      '      labels:',
      '        app: myapp',
      '    spec:',
      '      containers:',
      '        - name: app',
      '          image: myapp:2.0.0'
    ]), 'Kubernetes deployment with RollingUpdate strategy. maxSurge=1 creates one extra pod at a time.'),
    e('Rolling Update Commands', 'Manage rolling updates.', codeBlock([
      '# Trigger rolling update (update image)',
      'kubectl set image deployment/myapp',
      '  app=myapp:2.0.0',
      '',
      '# Check rollout status',
      'kubectl rollout status deployment/myapp',
      '',
      '# Pause rollout',
      'kubectl rollout pause deployment/myapp',
      '',
      '# Resume rollout',
      'kubectl rollout resume deployment/myapp',
      '',
      '# Rollback to previous version',
      'kubectl rollout undo deployment/myapp',
      '',
      '# Rollback to specific revision',
      'kubectl rollout undo deployment/myapp',
      '  --to-revision=2',
      '',
      '# View rollout history',
      'kubectl rollout history deployment/myapp'
    ]), 'Commands for managing rolling updates: trigger, monitor, pause, resume, and rollback.')
  ],
  [
    m('What is the main benefit of Rolling deployment?', ['Instant rollback', 'No additional infrastructure cost', 'Double environment', 'Traffic routing'], 1, 'Rolling deployment uses the same number of instances, just updated incrementally — no extra cost.'),
    m('What is the main disadvantage?', ['Higher cost', 'Slow rollback', 'Downtime', 'Complex setup'], 1, 'Rollback is slow — must reverse the update instance by instance, unlike Blue-Green\'s instant switch.'),
    m('What Kubernetes parameter controls extra pods?', ['maxUnavailable', 'maxSurge', 'replicas', 'minReadySeconds'], 1, 'maxSurge controls how many extra pods can be created above the desired count during rolling update.')
  ]
);

/* =================== TOPIC 20: Recreate Deployment =================== */
addTopic('devops-recreate', 'Recreate Deployment', 'beginner', 10,
  ['Recreate deployment terminates all running instances of the old version and then creates instances of the new version.',
   'Simplest deployment strategy — results in downtime because all old pods are killed before new ones start.',
   'Suitable for: development environments, batch jobs, stateful applications where versions cannot run concurrently.',
   'In Kubernetes: strategy type: Recreate. Kills all old pods, then creates new pods.'
  ],
  'Recreate deployment is like renovating a restaurant by closing it completely, demolishing everything, and building a new restaurant from scratch. Customers (traffic) cannot enter during renovation (downtime). It is simple but causes a complete service interruption.',
  [
    d('Recreate Process', '1. All old pods are terminated simultaneously (or gracefully). 2. Wait for all old pods to be completely removed. 3. New pods are created from the new image. 4. Service becomes available again when new pods are ready. Total downtime: termination time + startup time.'),
    d('When to Use Recreate', 'Development/staging environments (downtime acceptable). Batch jobs and workers (no live traffic). Stateful applications where two versions cannot coexist (DB schema incompatible, migration required). Applications needing a clean slate (cache clear, reset connections).'),
    d('Recreate vs Rolling', 'Recreate: downtime, simple, all-at-once replacement. Rolling: zero-downtime, incremental, more complex. Recreate avoids issues of running two versions simultaneously. Choose Recreate when downtime is acceptable and version coexistence is problematic.'),
    d('Graceful Shutdown', 'Kubernetes respects preStop hooks and terminationGracePeriodSeconds. Pod gets SIGTERM, waits for hook, then SIGKILL after grace period. Important for cleanup: close DB connections, finish in-flight requests, flush logs.')
  ],
  'Recreate is the simplest deployment strategy with guaranteed downtime. Use for dev environments or stateful apps that cannot run two versions. Graceful shutdown is critical to prevent data loss. Not suitable for production services requiring high availability.',
  [
    q('What is Recreate deployment?', 'Terminate all old version instances, then create new version instances. Causes downtime.'),
    q('When would you use Recreate?', 'Dev environments, batch jobs, stateful applications where versions cannot coexist.'),
    q('What is the main disadvantage?', 'Downtime — no traffic is served during the transition.'),
    q('What is the main advantage?', 'Simplicity — no need to handle two versions running simultaneously.'),
    q('What is a preStop hook?', 'A command or HTTP request executed before a pod is terminated, for graceful cleanup.'),
    q('What is terminationGracePeriodSeconds?', 'Time Kubernetes waits after SIGTERM before sending SIGKILL (default: 30s).')
  ],
  R(10,35,110,25,'#0070f3','','Old v1','5 running pods') +
  A(120,75,150,75) +
  R(160,35,140,50,'#dc3545','','Step 1: Terminate ALL v1','Downtime starts') +
  A(300,60,310,60) +
  R(320,35,110,50,'#28a745','','Step 2: Create ALL v2','Downtime ends') +
  R(10,95,110,25,'#ffc107','','Downtime','Total: term + startup') +
  R(10,125,110,25,'#e83e8c','','preStop','Graceful cleanup') +
  R(10,155,110,25,'#6610f2','','Use Case','Dev / stateful / batch') +
  R(280,100,150,80,'#17a2b8','','Recreate','Simple. Complete downtime. All old killed, then new created.') +
  T(240,210,'Recreate: Kill all old, create all new. Simple but causes downtime. For dev/stateful apps.',9,'#666','middle'),
  [
    e('Kubernetes Recreate Strategy', 'Recreate deployment config.', codeBlock([
      'apiVersion: apps/v1',
      'kind: Deployment',
      'metadata:',
      '  name: myapp',
      'spec:',
      '  replicas: 3',
      '  strategy:',
      '    type: Recreate',
      '  selector:',
      '    matchLabels:',
      '      app: myapp',
      '  template:',
      '    metadata:',
      '      labels:',
      '        app: myapp',
      '    spec:',
      '      terminationGracePeriodSeconds: 60',
      '      containers:',
      '        - name: app',
      '          image: myapp:2.0.0',
      '          lifecycle:',
      '            preStop:',
      '              exec:',
      '                command:',
      '                  - /bin/sh',
      '                  - -c',
      '                  - "sleep 10 && nginx -s quit"'
    ]), 'Kubernetes Recreate strategy with preStop hook for graceful shutdown and 60s grace period.'),
    e('Graceful Shutdown Script', 'PreStop hook example.', codeBlock([
      '#!/bin/bash',
      '# preStop.sh — graceful shutdown',
      '',
      'echo "Shutting down gracefully..."',
      '',
      '# Stop accepting new connections',
      '# (already done by k8s removing from service)',
      '',
      '# Wait for in-flight requests to complete',
      'sleep 5',
      '',
      '# Close database connections',
      '# psql -c "SELECT pg_terminate_backend(pid)"',
      '',
      '# Flush logs',
      '# kill -USR1 $(cat /var/run/nginx.pid)',
      '',
      '# Stop the application process',
      '# kill -TERM $(cat /var/run/app.pid)',
      '',
      'echo "Shutdown complete"'
    ]), 'Graceful shutdown script for Recreate deployment — drain connections, flush, then terminate.')
  ],
  [
    m('What is the key characteristic of Recreate deployment?', ['Zero downtime', 'Complete downtime', 'Gradual replacement', 'Traffic splitting'], 1, 'Recreate kills all old pods before creating new ones, resulting in complete downtime.'),
    m('When is Recreate appropriate?', ['Production with high traffic', 'Dev environments and stateful apps', 'All scenarios', 'Only with Blue-Green'], 1, 'Recreate is suitable for dev environments, batch jobs, and stateful apps where version coexistence is problematic.'),
    m('What does terminationGracePeriodSeconds control?', ['Pod startup time', 'Time between SIGTERM and SIGKILL', 'Replica count', 'Health check interval'], 1, 'It controls how long Kubernetes waits after SIGTERM before forcefully killing with SIGKILL.')
  ]
);

/* =================== TOPIC 21: Feature Flags =================== */
addTopic('devops-feature-flags', 'Feature Flags', 'intermediate', 20,
  ['Feature flags (feature toggles) are a technique that turns functionality on/off without deploying new code.',
   'They decouple deployment from release — you can deploy code that is "dark" (inactive) and release it later by flipping a flag.',
   'Types: release flags, experiment flags, ops flags, permission flags. Each serves a different purpose.',
   'Tools: LaunchDarkly, Split.io, Unleash, Flagsmith, custom implementation with config files or env vars.'
  ],
  'Feature flags are like light switches for your application features. You install the light fixture (deploy code) but keep the switch off. Later, flip the switch (enable flag) to turn on the light without any electrical work. You can also dim (gradually roll out) or turn off instantly if something goes wrong.',
  [
    d('Types of Feature Flags', 'Release flags: toggle incomplete features (trunk-based dev). Experiment flags: A/B testing, canary, percentage rollouts. Ops flags: kill switches, maintenance mode, degrade functionality. Permission flags: control feature access by user tier/role (premium features).'),
    d('Feature Flag Best Practices', 'Use short-lived flags for releases (remove after feature stabilizes). Use long-lived flags for ops (kill switches). Name flags clearly and consistently. Log flag evaluations for debugging. Monitor flag flips (who changed what). Avoid flag-induced tech debt — clean up old flags.'),
    d('Feature Flags vs Branching', 'Feature flags enable trunk-based development — no long-lived branches. Instead of "merge when ready", you deploy continuously and release with flags. Benefits: fewer merge conflicts, continuous integration, instant rollback (flip flag off). Flags are superior to feature branches for most cases.'),
    d('Canary Releases with Flags', 'Flags can enable gradual rollouts: enable for 1% of users, monitor, increase to 10%, 50%, 100%. User targeting: enable for internal users first, then beta, then all. Rollback: disable the flag — instant, no redeployment needed. Combine with deployment strategies for maximum safety.')
  ],
  'Feature flags decouple deployment from release. Deploy continuously, release when ready. Trunk-based development. Instant rollback by flipping a flag. Use short-lived flags for features, long-lived flags for ops. Clean up old flags to avoid tech debt.',
  [
    q('What are feature flags?', 'Technique to turn functionality on/off without deploying new code, decoupling deployment from release.'),
    q('What are the types of feature flags?', 'Release flags, experiment flags, ops flags, permission flags.'),
    q('How do feature flags enable trunk-based development?', 'No long-lived branches. Deploy incomplete features behind flags, enable when ready.'),
    q('What is a kill switch?', 'An ops flag that disables a feature instantly if it causes problems in production (instant rollback).'),
    q('What is a best practice for release flags?', 'Short-lived — remove after the feature is fully rolled out and stable.'),
    q('What is LaunchDarkly?', 'A commercial feature flag platform with targeting, percentage rollouts, and A/B testing capabilities.')
  ],
  R(10,35,110,25,'#0070f3','','Code Deployed','Behind flag = OFF') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Flag System','LaunchDarkly / Unleash') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Flag ON →','Feature active for users') +
  R(10,100,110,25,'#dc3545','','Flag OFF →','Feature hidden/deactivated') +
  R(10,130,110,25,'#e83e8c','','Rollback','Disable flag = instant') +
  R(10,160,110,25,'#6610f2','','Clean Up','Remove flag after stable') +
  R(290,35,190,155,'#17a2b8','','Feature Flags','Decouple deploy from release. Deploy dark, release with flag. Instant rollback. Trunk-based dev.') +
  T(240,220,'Feature Flags: Toggle features without redeploying. Deploy continuously, release when ready.',9,'#666','middle'),
  [
    e('Feature Flag in Code (LaunchDarkly)', 'Simple flag check.', codeBlock([
      'const launchdarkly = require(\'@launchdarkly/node-server-sdk\');',
      '',
      'const client = launchdarkly.init(process.env.LD_SDK_KEY);',
      '',
      "app.get('/api/checkout', async (req, res) => {",
      '  const user = { key: req.userId };',
      '',
      '  // Check if new checkout is enabled for user',
      '  const useNewCheckout = await client.variation(',
      "    'new-checkout-flow', user, false",
      '  );',
      '',
      '  if (useNewCheckout) {',
      '    return handleNewCheckout(req, res);',
      '  }',
      '',
      '  return handleOldCheckout(req, res);',
      '});'
    ]), 'LaunchDarkly feature flag check — routes to new or old checkout flow based on flag.'),
    e('Custom Feature Flag with Config', 'Simple file-based flags.', codeBlock([
      '// flags.json — feature flag configuration',
      '{',
      '  "new-checkout-flow": {',
      '    "enabled": false,',
      '    "users": ["preview_user_1", "preview_user_2"],',
      '    "percentage": 0',
      '  },',
      '  "dark-mode": {',
      '    "enabled": true,',
      '    "users": [],',
      '    "percentage": 100',
      '  },',
      '  "maintenance-mode": {',
      '    "enabled": false  // kill switch',
      '  }',
      '}',
      '',
      '// Check flag in code',
      'function isEnabled(flagName, userId) {',
      '  const flag = flags[flagName];',
      '  if (!flag) return false;',
      '  if (flag.users?.includes(userId)) return true;',
      '  if (flag.enabled) return true;',
      '  return false;',
      '}'
    ]), 'Simple JSON-based feature flag implementation with user targeting and percentage rollout support.')
  ],
  [
    m('What do feature flags decouple?', ['Frontend from backend', 'Deployment from release', 'Testing from building', 'Monitoring from alerting'], 1, 'Feature flags decouple deployment (deploy code) from release (enable for users).'),
    m('What is a kill switch flag?', ['A flag that deletes code', 'An ops flag that instantly disables problematic features', 'A flag that kills processes', 'A security flag'], 1, 'A kill switch is an ops flag that instantly disables a feature if it causes problems.'),
    m('What happens to release flags after stabilization?', ['Keep forever', 'Remove/clean up', 'Convert to ops flag', 'Ignore'], 1, 'Release flags should be short-lived and removed after the feature is fully rolled out and stable.')
  ]
);

/* =================== TOPIC 22: Release Management =================== */
addTopic('devops-release-mgmt', 'Release Management', 'intermediate', 20,
  ['Release management is the process of planning, scheduling, controlling, and deploying software releases across environments.',
   'It ensures releases are delivered predictably, with quality, and with minimal disruption to users.',
   'Key activities: versioning, changelog generation, release planning, environment promotion, deployment coordination, release communication.',
   'Release management bridges development (building) and operations (running) — it is the "release" phase in the DevOps lifecycle.'
  ],
  'Release management is like planning a product launch event. You decide what goes into the launch (features), set the date, prepare the venue (environments), invite attendees (users), rehearse (test), and execute the launch. If something goes wrong, you have a backup plan (rollback).',
  [
    d('Release Process', '1. Feature complete on main branch. 2. CI runs full test suite. 3. Create release branch (git flow) or tag. 4. Bump version (semantic versioning). 5. Generate changelog/release notes. 6. Deploy to staging/QA environment. 7. Integration, regression, and acceptance testing. 8. Release approval (change advisory board or automated). 9. Deploy to production. 10. Monitor for issues. 11. Post-release review.'),
    d('Semantic Versioning (SemVer)', 'MAJOR.MINOR.PATCH. MAJOR: incompatible API changes. MINOR: backward-compatible features. PATCH: backward-compatible bug fixes. Pre-release: 1.0.0-alpha, 1.0.0-beta, 1.0.0-rc.1. Build metadata: 1.0.0+build.123. Follow SemVer strictly for clear dependency management.'),
    d('Release Cadence', 'Fixed schedule: releases every 2 weeks/month (predictable). Continuous: release as soon as ready (DevOps ideal). Hybrid: fixed schedule but urgent fixes released immediately. Choose based on business needs, compliance requirements, and team maturity.'),
    d('Release Gates', 'Quality gates: all tests pass, code coverage threshold, no critical vulnerabilities. Approval gates: manual sign-off from QA, product owner, security. Environment gates: must pass staging before production. Each gate is a checkpoint that can stop the release if criteria not met.'),
    d('Release Automation', 'CI/CD pipeline automates most release steps. Release orchestration tools: Jenkins, Spinnaker, Harness. Artifact management: Nexus, Artifactory, Docker Hub. Changelog: auto-generated from conventional commits (git-cliff, semantic-release). Version bumping: automated by CI.')
  ],
  'Release management ensures predictable, high-quality releases. Use semantic versioning. Automate the release process. Define release gates. Choose a cadence that balances velocity with stability. Communicate release plans and results to stakeholders.',
  [
    q('What is release management?', 'Planning, scheduling, controlling, and deploying software releases across environments.'),
    q('What is Semantic Versioning?', 'MAJOR.MINOR.PATCH versioning. MAJOR: breaking changes. MINOR: new features. PATCH: bug fixes.'),
    q('What is a release gate?', 'A checkpoint that a release must pass before proceeding to the next environment or phase.'),
    q('What is a release cadence?', 'The frequency and schedule of releases — fixed schedule, continuous, or hybrid.'),
    q('What is an artifact repository?', 'A system storing build artifacts (JARs, Docker images, npm packages). Examples: Nexus, Artifactory.'),
    q('What is conventional commits?', 'A commit message convention that enables automated changelog generation and version bumping.')
  ],
  R(10,35,110,18,'#0070f3','','Plan','What goes in release') +
  R(10,58,110,18,'#28a745','','Build','Version + changelog') +
  R(10,81,110,18,'#ffc107','','Test','Staging + QA gates') +
  R(10,104,110,18,'#dc3545','','Approve','Sign-off checks') +
  R(10,127,110,18,'#e83e8c','','Deploy','Production release') +
  R(10,150,110,18,'#6610f2','','Monitor','Verify + rollback?') +
  A(120,44,150,44) + A(120,67,150,67) + A(120,90,150,90) + A(120,113,150,113) + A(120,136,150,136) + A(120,159,150,159) +
  R(160,35,230,150,'#17a2b8','','Release Management','Plan → Build → Test → Approve → Deploy → Monitor. SemVer, gates, automation, cadence.') +
  T(240,215,'Release Management: Predictable, high-quality releases. Planning, automation, and coordination.',9,'#666','middle'),
  [
    e('Release Pipeline (Jenkins)', 'Declarative release pipeline.', codeBlock([
      'pipeline {',
      '  agent any',
      '  stages {',
      "    stage('Version & Changelog') {",
      '      steps {',
      "        sh 'npx semantic-release --dry-run'",
      '      }',
      '    }',
      "    stage('Build & Package') {",
      "      steps { sh 'npm run build' }",
      '    }',
      "    stage('Deploy to Staging') {",
      '      steps {',
      "        sh 'kubectl set image deploy/myapp myapp=$IMAGE_TAG -n staging'",
      '      }',
      '    }',
      "    stage('Integration Tests') {",
      "      steps { sh 'npm run test:integration' }",
      '    }',
      "    stage('Security Scan') {",
      "      steps { sh 'trivy image myapp:$IMAGE_TAG' }",
      '    }',
      "    stage('Approval') {",
      '      input message: "Approve production release?"',
      '    }',
      "    stage('Deploy to Production') {",
      '      steps {',
      "        sh 'kubectl set image deploy/myapp myapp=$IMAGE_TAG -n prod'",
      '      }',
      '    }',
      '  }',
      '}'
    ]), 'Jenkins release pipeline with versioning, builds, staging deploy, tests, approval, and production deploy.'),
    e('Automated Changelog (conventional commits)', 'Generate release notes.', codeBlock([
      '# .cliff.toml — git-cliff configuration',
      '[changelog]',
      'header = "# Changelog"',
      'body = "## [{{ version }}] - {{ timestamp }}"',
      '',
      '[[commit_generators]]',
      'pattern = "^(feat|fix|perf|refactor)\\(?(\\w+)?\\)?:\\s?(.*)"',
      '',
      '[git]',
      'conventional_commits = true',
      '',
      '# Usage: git-cliff -o CHANGELOG.md',
      '# Generates changelog from conventional commits',
      '',
      '# Commit types:',
      '# feat:     New feature (MINOR)',
      '# fix:      Bug fix (PATCH)',
      '# BREAKING: Breaking change (MAJOR)',
      '# chore:    Maintenance (no release)',
      '# docs:     Documentation (no release)'
    ]), 'git-cliff configuration for automated changelog generation from conventional commits.')
  ],
  [
    m('What is release management?', ['Writing code', 'Planning and controlling software releases', 'Managing teams', 'Setting up servers'], 1, 'Release management plans, schedules, controls, and deploys software releases across environments.'),
    m('What does MAJOR version change indicate?', ['Bug fix', 'Breaking/incompatible API changes', 'New backward-compatible feature', 'Documentation update'], 1, 'MAJOR version increments indicate breaking changes that are not backward-compatible.'),
    m('What is a release gate?', ['A security tool', 'A checkpoint a release must pass', 'A deployment tool', 'A code editor'], 1, 'A release gate is a checkpoint that validates quality, security, or approval before proceeding.')
  ]
);

/* =================== TOPIC 23: Change Management =================== */
addTopic('devops-change-mgmt', 'Change Management', 'intermediate', 20,
  ['Change management in DevOps is the process of controlling and managing changes to IT systems, applications, and infrastructure.',
   'Traditional ITIL change management is slow and bureaucratic (Change Advisory Board meetings). DevOps change management emphasizes automation, peer review, and continuous verification.',
   'Key changes in DevOps: pre-approved standard changes (CI/CD), automated policy enforcement, smaller/frequent changes, peer review via PRs, monitoring-based verification.',
   'DevOps change management reduces risk through frequency — small, frequent changes are easier to review, test, and rollback than large, infrequent ones.'
  ],
  'Traditional change management is like getting a committee to approve any change to your house — paint color, new furniture, even changing a lightbulb needs sign-off. DevOps change management is like having building codes (automated policies) — you can repaint your room any time, as long as you follow the rules, and the inspector (CI) checks after you\'re done.',
  [
    d('Traditional vs DevOps Change Management', 'Traditional: CAB (Change Advisory Board) approvals, change windows (weekend nights), large releases, manual procedures, paper trails. DevOps: automated approvals from CI/CD, no change windows (continuous), small frequent releases, PR-based review, infrastructure as code, automated compliance checks.'),
    d('Standard vs Normal Changes', 'Standard: low-risk, pre-approved (config changes, dependency updates, routine deployments). Go through CI/CD automatically. Normal: higher risk, may need manual approval (architecture changes, database schema changes, security policy changes). DevOps philosophy: make as many changes "standard" as possible.'),
    d('Automated Change Management', 'CI/CD pipeline: any change passing pipeline = approved for deployment. Policy as Code: OPA/Kyverno enforce policies automatically. Git: every change is tracked, auditable, and reversible. Peer review: PRs ensure at least one person reviews each change. Monitoring: detects change-related issues automatically.'),
    d('Change Management Best Practices', 'Make changes small and frequent. Automate everything possible. Use peer review for every change. Monitor changes for impact. Document changes in Git (commit messages). Have automated rollback. Track change metrics: deployment frequency, change failure rate, MTTR. Use feature flags for risky changes.'),
    d('Change Failure Rate (DORA Metric)', 'Percentage of changes that result in degraded service or require remediation. Elite performers: 0-5%. Low performers: 16-30%. DevOps change management aims to reduce this through automation, testing, and small changes. Not all changes should be equal — high-risk changes get more scrutiny.')
  ],
  'DevOps change management is about automation, not bureaucracy. Make changes small and frequent. Use PRs for peer review. Let CI/CD be the approval process. Use policy as code for guardrails. Monitor every change. The goal is to enable velocity while maintaining safety through automation.',
  [
    q('What is change management in DevOps?', 'Controlling and managing changes to IT systems with automation, peer review, and continuous verification.'),
    q('How is DevOps change management different from traditional?', 'DevOps: automated, continuous, small changes, PR-based. Traditional: CAB approvals, change windows, large releases.'),
    q('What is a standard change?', 'A low-risk, pre-approved change that can go through CI/CD automatically without manual approval.'),
    q('What is change failure rate?', 'A DORA metric measuring the percentage of changes that cause degraded service or require remediation.'),
    q('How does Git help change management?', 'Every change is tracked, auditable, reversible. Commits document who changed what and why.'),
    q('What is the goal of DevOps change management?', 'Enable velocity while maintaining safety through automation, not slow down changes with bureaucracy.')
  ],
  R(10,35,110,25,'#0070f3','','Standard Changes','Pre-approved, CI/CD') +
  R(10,65,110,25,'#28a745','','Normal Changes','May need approval') +
  R(10,95,110,25,'#ffc107','','Peer Review','PRs for every change') +
  R(10,125,110,25,'#dc3545','','Policy as Code','Automated guardrails') +
  R(10,155,110,25,'#e83e8c','','Monitoring','Detect change impact') +
  R(290,35,190,155,'#6610f2','','Change Management','DevOps: small, frequent, automated, reviewed. Traditional: slow, bureaucratic, large releases.') +
  T(240,220,'Change Management: Controlled, automated changes. Small + frequent = safe. PRs + CI/CD + monitoring.',9,'#666','middle'),
  [
    e('PR-Based Change Approval', 'GitHub branch protection.', codeBlock([
      '# .github/CODEOWNERS — required reviewers',
      '* @team-leads',
      'src/db/* @db-admins',
      'infra/* @platform-team',
      'security/* @security-team',
      '',
      '# GitHub branch protection rules (UI)',
      '# - Require PR for main branch',
      '# - Require at least 1 review',
      '# - Require status checks (CI passes)',
      '# - Require up-to-date branches',
      '# - Require linear history',
      '# - Include administrators',
      '',
      '# These rules ensure every change is:',
      '# 1. Reviewed by peers',
      '# 2. Validated by CI',
      '# 3. Approved by code owners for sensitive files',
      '# 4. Traceable in Git history'
    ]), 'Branch protection rules enforce peer review and CI validation for every code change.'),
    e('Automated Change Logging', 'Track all changes automatically.', codeBlock([
      '# Track changes via Git commits',
      '# Every commit = a recorded change',
      '',
      '# Generate change summary for compliance',
      'git log --oneline --since="2024-01-01"',
      '',
      '# Show all changes to a specific file',
      'git log --oneline -- src/config/database.ts',
      '',
      '# Show who approved each PR',
      'gh pr list --state merged --search "merged:>2024-01-01"',
      '  --json number,title,author,mergedAt,reviews',
      '',
      '# Audit trail for compliance:',
      '# - Who made the change (committer)',
      '# - Who reviewed (PR reviewers)',
      '# - What changed (diff)',
      '# - When (timestamp)',
      '# - Why (commit message)',
      '# - Pipeline status (CI passing)'
    ]), 'Git and GitHub provide complete audit trail for change management compliance.')
  ],
  [
    m('What is a key difference between DevOps and traditional change management?', ['DevOps is slower', 'DevOps uses automation and small frequent changes', 'Traditional is faster', 'No difference'], 1, 'DevOps change management uses automation, small frequent changes, and peer review instead of bureaucratic approvals.'),
    m('What is a standard change?', ['Any change to production', 'Low-risk, pre-approved change', 'Emergency hotfix', 'Database migration'], 1, 'A standard change is low-risk and pre-approved to go through CI/CD without manual approval.'),
    m('What DORA metric is related to change management?', ['Deployment frequency', 'Change failure rate', 'Lead time', 'MTTR'], 1, 'Change failure rate measures the percentage of changes causing degraded service or requiring remediation.')
  ]
);

// ---- GENERATE ----
var dataDir = __dirname;

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["devops-fundamentals"] = TOPICS_DATA["devops-fundamentals"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["devops-fundamentals"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated DevOps Fundamentals topics: ' + Object.keys(topics).length);
