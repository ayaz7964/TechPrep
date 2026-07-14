const fs = require('fs');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question, answer }; }
function m(question, options, answer, explanation) { return { question, options, answer, explanation }; }
function e(title, useCase, code, description) { return { title, useCase, code, description: (description||'') }; }
function d(heading, text) { return { heading, text }; }
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

function compactTopic(id, title, diff, mins, tldr, layman, deeps, qas, svg, codes, mcqs) {
  addTopic(id, title, diff, mins, tldr, layman, deeps, '', qas, svg, codes, mcqs);
}

/* 1. Jenkins Architecture */
compactTopic('jenkins-architecture', 'Jenkins Architecture', 'intermediate', 20,
  ['Jenkins is an open-source automation server with a master-agent (controller-agent) architecture.', 'Master (Controller): manages jobs, schedules builds, serves UI, stores configurations. Agents: execute build jobs on separate machines.', 'Jenkins uses a plugin ecosystem with 1800+ plugins for integration with almost any tool.'],
  'Jenkins architecture is like a manager (master) directing workers (agents). The manager assigns tasks, tracks progress, and provides reports. Workers do the actual work on their own machines. The manager stores all blueprints (configs) and history (build logs).',
  [d('Master (Controller)', 'Central coordination point. Schedules builds, monitors agents, serves web UI, stores configuration in XML files. Single point of failure without HA. Typically runs on its own server. JENKINS_HOME directory stores all data.'),
   d('Agents (Nodes)', 'Execute build jobs assigned by master. Can run on different OS, hardware, or containers. Connect to master via TCP (JNLP) or SSH. Each agent has labels for job targeting. Ephemeral agents for cloud/container environments.'),
   d('Plugin Architecture', 'Plugins extend Jenkins functionality. Installed via Plugin Manager. Types: Build tools (Maven, Gradle), SCM (Git, SVN), Pipeline (workflow), Notifications (Slack, Email), Authentication (LDAP, SAML). Plugin dependencies managed automatically.')],
  [q('What are the two main components of Jenkins architecture?', 'Master (controller) manages jobs; agents execute builds on separate machines.'),
   q('What is JENKINS_HOME?', 'The directory where Jenkins stores all configuration, job definitions, build logs, and plugins.'),
   q('How do agents connect to the master?', 'Via TCP (JNLP protocol) or SSH connection.')],
  R(10,35,140,25,'#0070f3','','Jenkins Master','Job management') +
  A(150,48,170,48) +
  R(180,35,100,25,'#28a745','','Agent 1','Linux builds') +
  R(180,65,100,25,'#ffc107','','Agent 2','Windows builds') +
  R(180,95,100,25,'#dc3545','','Agent 3','macOS builds') +
  T(240,140,'Jenkins Architecture: Master manages jobs, agents execute builds. Plugin ecosystem. JENKINS_HOME stores all config.',9,'#666','middle'),
  [e('Jenkins CLI', 'Basic Jenkins commands.', codeBlock(['java -jar jenkins.war', 'http://localhost:8080', 'cat ~/.jenkins/config.xml']))],
  [m('What is JENKINS_HOME?', ['Jenkins installation directory', 'Configuration and data storage directory', 'Plugin directory', 'Log directory'], 1, 'JENKINS_HOME stores all Jenkins configuration, jobs, build logs, and plugins.')]
);

/* 2. Jenkins Installation */
compactTopic('jenkins-installation', 'Jenkins Installation', 'beginner', 15,
  ['Jenkins can be installed via: native packages (apt, yum), WAR file, Docker, or Kubernetes.', 'Prerequisites: Java 11 or 17 (LTS versions). At least 2GB RAM, 50GB disk for production.', 'Initial setup: unlock with admin password, install suggested plugins, create first admin user.'],
  'Installing Jenkins is like setting up your own CI/CD server. You download it, install Java, run it, and go through setup wizard. Windows also has an installer. Docker is the quickest method: one command to start Jenkins with all dependencies.',
  [d('Installation Methods', 'Docker: docker run -p 8080:8080 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts. Native: apt install jenkins (Ubuntu) or yum install jenkins (RHEL). WAR: java -jar jenkins.war (any OS). Kubernetes: Helm chart (jenkinsci/jenkins).'),
   d('Post-Install Setup', 'Access at http://localhost:8080. Unlock password: cat /var/jenkins_home/secrets/initialAdminPassword. Install suggested plugins. Create admin user. Configure Jenkins URL. Plugin manager for additional plugins.'),
   d('System Requirements', 'Minimum: 256MB RAM, 1GB disk (not for production). Recommended: 2GB+ RAM, 50GB+ disk, multi-core CPU. Java: OpenJDK 11 or 17 LTS. Port: 8080 (default, configurable). Reverse proxy: Nginx or Apache for production.')],
  [q('What is the prerequisite for Jenkins?', 'Java 11 or 17 (OpenJDK).'),
   q('How to unlock Jenkins on first startup?', 'Read the initial admin password from /var/jenkins_home/secrets/initialAdminPassword.'),
   q('What is the quickest way to start Jenkins?', 'Docker: docker run jenkins/jenkins:lts.')],
  R(10,35,140,25,'#0070f3','','Install Java','OpenJDK 11/17') +
  R(10,65,140,25,'#28a745','','Run Jenkins','docker run or java -jar') +
  R(10,95,140,25,'#ffc107','','Setup Wizard','Unlock + admin user') +
  T(240,140,'Jenkins Installation: Java prerequisite, Docker/native/WAR, initial setup wizard. LTS version recommended.',9,'#666','middle'),
  [e('Docker Install', 'Quickest Jenkins setup.', codeBlock(['docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts']))],
  [m('What port does Jenkins use by default?', ['80', '443', '8080', '3000'], 2, 'Jenkins runs on port 8080 by default (configurable via --httpPort).')]
);

/* 3. Jenkins Dashboard */
compactTopic('jenkins-dashboard', 'Jenkins Dashboard', 'beginner', 10,
  ['The Jenkins Dashboard is the main web interface showing job statuses, build history, and system health.', 'Key sections: Build Queue, Build Executor Status, recent jobs, People, Build History, Manage Jenkins.', 'Dashboard is customizable with plugins, views, and dashboard portlets.'],
  'The Jenkins dashboard is like a control room for your CI/CD operations. You can see: which jobs are running, which failed, system resource usage, build queue, and recent activity. It is the central place to manage everything Jenkins.',
  [d('Dashboard Sections', 'Build Queue: pending jobs waiting for executor. Build Executor Status: currently running builds. My Views: personalized job lists. People: users with access. Build History: recent builds across all jobs. Manage Jenkins: system configuration, plugin management, node management.'),
   d('Views', 'All: shows every job (default). My View: personalized view of specific jobs. List View: manually selected jobs. Dashboard View: customizable with portlets. Build Pipeline View: sequential pipeline visualization. Nested views for organization.'),
   d('Job Status Icons', 'Blue ball: successful build. Yellow ball: unstable (test failures but build succeeded). Red ball: failed build. Grey ball: pending/not built. Weather icon: build trend (sunny = good, stormy = failing). Animated spinning icon: currently building.')],
  [q('What does a red ball mean in Jenkins?', 'A failed build.'),
   q('What is a View in Jenkins?', 'A filtered/customized list of jobs.'),
   q('Where do you configure Jenkins settings?', 'Manage Jenkins link on the dashboard.')],
  R(10,35,110,25,'#0070f3','','Build Queue','Pending jobs') +
  R(10,65,110,25,'#28a745','','Build History','Recent builds') +
  R(10,95,110,25,'#ffc107','','Job Status','Blue=OK, Red=Failed') +
  T(240,140,'Jenkins Dashboard: Central UI showing job status, queue, executors, history. Manage Jenkins for all configuration.',9,'#666','middle'),
  [e('Dashboard URL', 'Access Jenkins UI.', codeBlock(['http://localhost:8080']))],
  [m('What does a yellow ball in Jenkins dashboard mean?', ['Build succeeded', 'Build unstable (test failures)', 'Build pending', 'Build cancelled'], 1, 'A yellow ball means the build succeeded but has test failures (unstable).')]
);

/* 4. Jenkins Jobs */
compactTopic('jenkins-jobs', 'Jenkins Jobs', 'beginner', 15,
  ['A Jenkins job is a configurable task that performs work: building code, running tests, deploying applications.', 'Job types: Freestyle (general purpose), Pipeline (Jenkinsfile-based), Multibranch Pipeline (auto-per-branch), Folder, and more.', 'Jobs are stored as XML config files in JENKINS_HOME/jobs/.'],
  'A Jenkins job is like a recipe for something Jenkins should do: "Check out code from GitHub, run npm install, run tests, and if tests pass, deploy to production." Jobs can be triggered manually, on a schedule, or by code changes.',
  [d('Job Configuration', 'General: project name, description, parameters, throttle builds. Source Code Management: Git, SVN, or none. Build Triggers: schedule, SCM polling, webhook, upstream. Build Environment: delete workspace, timestamps, SSH agent. Build Steps: run shell, invoke Maven/Gradle, etc. Post-build Actions: archive artifacts, publish test reports, deploy, notify.'),
   d('Job Types', 'Freestyle: simple, configure via UI. Pipeline: define as code (Jenkinsfile). Multibranch Pipeline: auto-creates jobs per branch. Folder: organize jobs. Organization Folder: scan GitHub/GitLab for repos.'),
   d('Job Statuses', 'Not Built: never run. Scheduled: waiting for executor. Building: currently running. Success: completed without errors. Unstable: passed but has test failures. Failed: build or test errors. Aborted: manually cancelled. Disabled: will not run.')],
  [q('What is a Jenkins job?', 'A configurable task that performs CI/CD operations like building, testing, and deploying.'),
   q('How are jobs stored?', 'As XML configuration files in JENKINS_HOME/jobs/ directory.'),
   q('What job type should be used for modern CI/CD?', 'Pipeline jobs (declarative Jenkinsfile in SCM).')],
  R(10,35,110,25,'#0070f3','','Job Config','General + SCM + Triggers + Steps + Post-build') +
  T(240,80,'Jenkins Jobs: Configurable tasks. Freestyle (simple), Pipeline (as code), Multibranch (per-branch). XML-stored.',9,'#666','middle'),
  [e('Job Config (XML)', 'Basic job configuration.', codeBlock(['<project>', '  <description>My Pipeline</description>', '</project>']))],
  [m('What file format does Jenkins use to store jobs?', ['JSON', 'YAML', 'XML', 'Properties'], 2, 'Jobs are stored as XML configuration files in JENKINS_HOME/jobs/.')]
);

/* 5. Freestyle Jobs */
compactTopic('jenkins-freestyle', 'Freestyle Jobs', 'beginner', 15,
  ['Freestyle jobs are the simplest Jenkins job type — configured entirely through the web UI with general-purpose build steps.', 'Best for: simple builds, quick setup, UI-friendly configuration, non-developer users.', 'Limitations: no Pipeline-as-Code, limited branching, harder to version-control.'],
  'A Freestyle job is like following a simple checklist: Check out code (SCM), Build (run shell command), Test (run more commands), and Report (archive artifacts). Everything is configured visually in the UI — no coding required. Great for simple tasks.',
  [d('Freestyle Configuration', 'General: name, description, discard old builds. SCM: Git repository URL, credentials, branch. Build Triggers: schedule, SCM polling, webhook. Build Environment: timestamps, withAnt, withMaven. Build Steps: Execute shell, Invoke Maven, Invoke Gradle, Windows Batch. Post-build: archive, publish test results, deploy, email.'),
   d('Use Cases', 'Simple build scripts. Scheduled tasks (cleanup, reports). Quick prototypes and experiments. Teams preferring UI configuration. Integration tests with simple steps. Freestyle + plugin = basic pipeline.'),
   d('Limitations', 'No Pipeline-as-Code (config not in SCM). Single branch only (no multi-branch). Limited conditional logic. Harder to reproduce. Build steps not reusable. For modern CD, prefer Pipeline jobs.')],
  [q('What is a Freestyle job?', 'A simple Jenkins job configured entirely through the web UI.'),
   q('When to use Freestyle vs Pipeline?', 'Freestyle for simple tasks and quick setup. Pipeline for complex, production CI/CD with Pipeline-as-Code.'),
   q('What is a key limitation of Freestyle jobs?', 'No Pipeline-as-Code — the job configuration is not stored in source control.')],
  R(10,35,140,25,'#0070f3','','UI Config','Fill in the form') +
  R(10,65,140,25,'#28a745','','Build Steps','Execute shell') +
  R(10,95,140,25,'#ffc107','','Post-Build','Archive + notify') +
  T(240,140,'Freestyle Jobs: Simple UI-based jobs. Good for quick tasks. Limited branching. Pipeline jobs recommended for CD.',9,'#666','middle'),
  [e('Freestyle Shell Step', 'Execute shell command build step.', codeBlock(['# Build and test', 'npm ci', 'npm run build', 'npm test']))],
  [m('What is the main limitation of Freestyle jobs?', ['Difficult to configure', 'No Pipeline-as-Code', 'No build triggers', 'Expensive'], 1, 'Freestyle jobs cannot define the pipeline as code. The configuration is only in JENKINS_HOME, not in SCM.')]
);

/* 6. Pipeline Jobs */
compactTopic('jenkins-pipeline', 'Pipeline Jobs', 'intermediate', 20,
  ['Pipeline jobs define CI/CD processes as code using a Jenkinsfile (Declarative or Scripted syntax).', 'Key advantages: Pipeline-as-Code (version-controlled), durable (survives restarts), supports complex workflows.', 'Pipeline syntax: Declarative (structured, easier) or Scripted (Groovy-based, flexible).'],
  'A Pipeline job is like writing a blueprint for your entire CI/CD process. Instead of clicking through UI forms, you write code in a Jenkinsfile that lives in your repo. This means the pipeline is version-controlled, reviewable, and reproducible.',
  [d('Pipeline Concepts', 'Node: machine where work executes (master or agent). Stage: logical phase of pipeline (Build, Test, Deploy). Step: single task (shell command, build tool). Pipeline: entire workflow definition. SCM: Jenkinsfile stored with code. Durable: pipeline state saved on restart.'),
   d('Declarative Pipeline', 'pipeline { agent any; stages { stage(\'Build\') { steps { ... } } } }. Structured and opinionated. Fixed syntax with predefined sections. Easier to learn. Best for most projects.'),
   d('Scripted Pipeline', 'node { stage(\'Build\') { ... } }. Full Groovy flexibility. Complex conditional logic. Custom functions and loops. More control but harder to maintain. Use for advanced use cases.')],
  [q('What is a Jenkins Pipeline job?', 'A job that defines the CI/CD process as code in a Jenkinsfile.'),
   q('What are the two Jenkinsfile syntaxes?', 'Declarative (structured) and Scripted (flexible Groovy).'),
   q('What makes Pipeline jobs durable?', 'Pipeline state is persisted to disk — survives master restarts and agent disconnections.')],
  R(10,35,140,25,'#0070f3','','Jenkinsfile','Pipeline as Code') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Pipeline','Build -> Test -> Deploy') +
  T(240,80,'Pipeline Jobs: CI/CD as Code in Jenkinsfile. Declarative (easy) or Scripted (flexible). Durable across restarts.',9,'#666','middle'),
  [e('Declarative Pipeline Skeleton', 'Minimal Pipeline job.', codeBlock(['pipeline {', '    agent any', '    stages {', '        stage(\'Build\') {', '            steps { sh \'npm ci\' }', '        }', '        stage(\'Test\') {', '            steps { sh \'npm test\' }', '        }', '    }', '}']))],
  [m('What is the Jenkinsfile?', ['A configuration plugin', 'The Pipeline as Code file stored in SCM', 'A Dockerfile alternative', 'A test report'], 1, 'The Jenkinsfile is the Pipeline-as-Code file stored in the repository root.')]
);

/* 7. Multibranch Pipeline */
compactTopic('jenkins-multibranch', 'Multibranch Pipeline', 'intermediate', 20,
  ['Multibranch Pipeline automatically creates a separate Pipeline job for each branch in a repository.', 'Jenkins scans the repo, discovers branches with Jenkinsfiles, and creates corresponding Pipeline jobs.', 'Each branch pipeline runs independently, enabling per-branch CI/CD and PR validation.'],
  'Multibranch Pipeline is like having a CI/CD pipeline for every branch automatically. Create a new branch, push a Jenkinsfile, and Jenkins creates a pipeline for it. Merge the branch, and Jenkins cleans up. Perfect for trunk-based development with feature branches.',
  [d('Discovery', 'SCM scan: Jenkins scans the repository for branches containing Jenkinsfile. Branch indexing: runs periodically or on webhook. Creates job per branch. Updates job list on new/deleted branches. Handles: feature branches, pull requests, tags.'),
   d('Branch Properties', 'Each branch has its own: build history, artifacts, test results, logs. Branch naming strategies: exact match, wildcard, regex. PR branches: automatically detected (GitHub, GitLab, Bitbucket). Suppress automatic SCM triggering for specific branches.'),
   d('Best Practices', 'Use Multibranch for all projects instead of single-branch Freestyle. Consistent pipeline across branches. PR pipelines validate before merge. Delete branch pipelines on merge (job cleanup). Use organization folder for multi-repo scanning.')],
  [q('What is Multibranch Pipeline?', 'Auto-creates Pipeline jobs per branch when a Jenkinsfile is detected.'),
   q('How does Multibranch discover branches?', 'Periodic SCM scanning detects branches with Jenkinsfiles.'),
   q('What happens when a branch is merged and deleted?', 'Jenkins can auto-delete the corresponding pipeline job.')],
  R(10,35,140,25,'#0070f3','','Repo Scan','Find branches with Jenkinsfile') +
  A(150,48,170,48) +
  R(180,35,100,25,'#28a745','','main','Auto-created job') +
  R(180,65,100,25,'#ffc107','','feature/login','Auto-created job') +
  R(180,95,100,25,'#dc3545','','feature/pay','Auto-created job') +
  T(240,140,'Multibranch Pipeline: Auto-detect branches with Jenkinsfiles. Per-branch CI/CD. PR validation. Cleanup on merge.',9,'#666','middle'),
  [e('Multibranch Config', 'Jenkinsfile in repo root.', codeBlock(['// Jenkinsfile in repository root', 'pipeline {', '    agent any', '    stages {', '        stage(\'Build\') { steps { sh \'npm ci\' } }', '    }', '}']))],
  [m('What triggers Multibranch Pipeline creation for a branch?', ['Any branch is created', 'Branch contains a Jenkinsfile', 'Push to any branch', 'Manual creation'], 1, 'Multibranch scans for branches that contain a Jenkinsfile in the repository root.')]
);

/* 8. Jenkinsfile */
compactTopic('jenkins-jenkinsfile', 'Jenkinsfile', 'intermediate', 20,
  ['A Jenkinsfile is a text file that defines a Jenkins Pipeline, stored in the root of a repository alongside the source code.', 'It uses Groovy-based syntax and can be either Declarative or Scripted.', 'Jenkinsfile enables Pipeline-as-Code: version-controlled, reviewed in PRs, shared across teams.'],
  'The Jenkinsfile is the single source of truth for your CI/CD pipeline. Instead of clicking in Jenkins UI, you write the pipeline in a file that lives with your code. This means: every change to the pipeline is reviewed, tested, and version-controlled like any other code.',
  [d('Jenkinsfile Syntax', 'Declarative: pipeline { ... } with structured sections. Scripted: node { ... } with full Groovy. Must be valid Groovy syntax. Starts with pipeline (declarative) or node (scripted). File encoding: UTF-8. File permissions: readable by Jenkins process.'),
   d('Jenkinsfile Location', 'Default: Jenkinsfile in repository root. Alternate: override in Multibranch config (e.g., Jenkinsfile.prod). Script Path: configure custom filename/path in job config. Library: shared pipeline library for reusable code.'),
   d('Shared Libraries', 'Global pipeline library shared across repos. @Library(\'my-library\') import in Jenkinsfile. Versioned: load specific tag/branch. Useful for: standard build steps, deployment functions, notification helpers.'),
   d('Best Practices', 'Use Declarative syntax for readability. Keep Jenkinsfile in repo root. Use shared libraries for reusable logic. Test Jenkinsfile changes in PR. Use environment() for config. Keep stages focused.')],
  [q('What is a Jenkinsfile?', 'A text file containing Jenkins Pipeline definition, stored in the repository root.'),
   q('What Groovy syntax is used?', 'Declarative (pipeline { }) or Scripted (node { }).'),
   q('How to reuse pipeline code across projects?', 'Use Shared Libraries: @Library(\'my-library\') _ import shared functions.')],
  R(10,35,140,25,'#0070f3','','Jenkinsfile','Pipeline as Code') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','SCM Repo','Version controlled') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Jenkins','Executes pipeline') +
  T(240,100,'Jenkinsfile: Pipeline definition as code in repo root. Declarative syntax recommended. Shared libraries for reuse.',9,'#666','middle'),
  [e('Simple Jenkinsfile', 'Declarative pipeline.', codeBlock(['pipeline {', '    agent any', '    stages {', '        stage(\'Build\') { steps { sh \'make\' } }', '        stage(\'Test\') { steps { sh \'make test\' } }', '    }', '    post {', '        always { cleanWs() }', '    }', '}']))],
  [m('Where is the Jenkinsfile stored?', ['Jenkins server', 'Repository root in SCM', 'Plugin directory', 'JENKINS_HOME'], 1, 'The Jenkinsfile is stored in the repository root with the source code (Pipeline-as-Code).')]
);

/* 9-13. Pipeline types, stages, agents covered */

/* Quick add for remaining topics */
function jenkinsTopic(id, title, diff, mins, tldr, layman, d1h, d1t, d2h, d2t, q1, a1, q2, a2, svgText, codeTitle, codeBody) {
  compactTopic(id, title, diff, mins,
    [tldr],
    layman,
    [d(d1h, d1t), d(d2h, d2t)],
    [q(q1, a1), q(q2, a2)],
    T(240,100,svgText,9,'#666','middle'),
    [e(codeTitle, '', codeBlock([codeBody]), '')],
    [m('Question?', ['Answer A', 'Answer B', 'Answer C', 'Answer D'], 1, 'Explanation.')]
  );
}

jenkinsTopic('jenkins-declarative', 'Declarative Pipeline', 'intermediate', 15,
  'Declarative Pipeline uses a structured, predefined syntax with pipeline { } block. Easier to learn and write.',
  'Declarative Pipeline is like following a strict template. You fill in the sections: agent, stages, post, environment. The structure is fixed, making it easy to read and maintain.',
  'Structure', 'pipeline { agent any; stages { stage(\'Build\') { steps { sh \'...\' } } }; post { always { ... } } }. Sections: agent (where), stages (what), post (cleanup). Directives: environment, options, parameters, triggers, tools, when.',
  'Key Directives', 'agent: any, none, label, docker, dockerfile. when: conditions for stage execution. environment: key-value pairs. options: pipeline behavior settings. parameters: user input. triggers: automated triggers (cron, pollSCM, upstream). tools: auto-install tools (Maven, JDK).',
  'What is the entry point of a Declarative Pipeline?', 'pipeline { } block.',
  'What directive runs stages conditionally?', 'when { branch \'main\' } runs only on main branch.',
  'Declarative Pipeline: Structured syntax. pipeline { agent, stages, post, environment, options, parameters }.',
  'Declarative Pipeline', 'pipeline { agent any; stages { stage(\'Build\') { steps { echo \'Building...\' } } } }'
);

jenkinsTopic('jenkins-scripted', 'Scripted Pipeline', 'advanced', 20,
  'Scripted Pipeline uses full Groovy syntax with node { } blocks. More flexible but more complex.',
  'Scripted Pipeline is like writing a program. You have full control with if/else, loops, try/catch, and custom functions. It is more powerful but harder to maintain than Declarative.',
  'Structure', 'node { stage(\'Build\') { ... } }. node defines where to run. stage organizes phases. Full Groovy: variables, functions, conditionals. try/catch/finally for error handling. Parallel execution with parallel { }.',
  'Scripted Features', 'def variable = value: Groovy variables. for/each loops. error handling with try/catch. Parallel: parallel { stage(\'A\') { ... } stage(\'B\') { ... } }. timeout and retry steps. Custom functions. Shared library imports.',
  'What block defines execution node in Scripted Pipeline?', 'node { } block.',
  'How to run stages in parallel in Scripted Pipeline?', 'parallel { stage(\'A\') { ... } stage(\'B\') { ... } }.',
  'Scripted Pipeline: Full Groovy flexibility. node, stage, try/catch, parallel. Powerful but more complex.' ,
  'Scripted Pipeline', 'node { stage(\'Build\') { sh \'make\' }; stage(\'Test\') { sh \'make test\' } }'
);

jenkinsTopic('jenkins-pipeline-stages', 'Pipeline Stages', 'beginner', 10,
  'Stages organize the pipeline into logical phases: Build, Test, Deploy, etc. Each stage represents a distinct step in the CI/CD process.',
  'Stages are like chapters in a book. Each chapter (stage) covers one topic: Building the code, Running tests, Deploying. You can see in Jenkins exactly which stage is running and if it passed or failed.',
  'Stage Properties', 'stage(\'Name\') { }. Can contain: steps (required), when (condition), agent (override), environment (override), tools (override), post (stage-level). Stage status shown in Pipeline Stage View plugin.',
  'Stage Best Practices', 'One logical concern per stage. Descriptive names. Fail early: put quick tests in early stages. Use when for conditional execution. Parallel stages within same stage block. post per stage for stage-specific cleanup.',
  'What is a stage in Jenkins Pipeline?', 'A logical phase of the pipeline (Build, Test, Deploy).',
  'What can each stage have?', 'steps, when, agent, environment, tools, post.',
  'Pipeline Stages: Logical phases. Descriptive names. Fail early. when for conditions.' ,
  'Stage with When', 'stage(\'Deploy\') { when { branch \'main\' }; steps { sh \'deploy.sh\' } }'
);

/* 14-18. Agents, Master-Agent, Distributed, Nodes, Plugins */

jenkinsTopic('jenkins-build-agents', 'Build Agents', 'intermediate', 15,
  'Build agents (formerly slaves) are machines that execute Jenkins jobs under the direction of the Jenkins master.',
  'Build agents are like workers in a factory. The master assigns tasks to workers. Each worker can have special skills (labels) like "I can build Windows apps" or "I have GPU for ML." The master sends jobs to the right worker.',
  'Agent Setup', 'Install Jenkins agent on target machine. Connect via: Launch agent by SSH (Linux), Launch agent via Java Web Start (Windows), Launch agent via headless (command line). Specify labels: os=linux, docker=true. Root directory for workspace.',
  'Agent Labels', 'Labels categorize agents: os: os=linux, os=windows. Capacity: gpu=true, high-mem. Purpose: docker-builder, frontend, backend. agent { label \'linux && docker\' } selects matching agent. Labels are case-sensitive.',
  'What is a build agent?', 'A machine that executes Jenkins jobs assigned by the master.',
  'How to target a specific agent?', 'agent { label \'linux && docker\' } in Pipeline or Restrict where this project can be run in Freestyle.',
  'Build Agents: Execute jobs for master. Connected via SSH or JNLP. Labels for targeting.' ,
  'Agent Label in Pipeline', 'pipeline { agent { label \'linux && docker\' }; stages { ... } }'
);

jenkinsTopic('jenkins-master-agent', 'Master-Agent Architecture', 'intermediate', 20,
  'Jenkins master-agent architecture separates management (master) from execution (agents) for scalability and security.',
  'The master is the boss that assigns work and tracks progress. Agents are the workers that do the actual building. This separation means: the boss stays responsive while workers do heavy lifting. You can add more workers as needed.',
  'Master Responsibilities', 'Serves web UI. Manages jobs and plugins. Stores configuration (JENKINS_HOME). Schedules builds to agents. Tracks build status and history. Manages credentials. Single point of failure (HA available via plugins).',
  'Agent Responsibilities', 'Checkout source code. Execute build steps. Run tests. Produce artifacts. Communicate status back to master. No configuration stored locally. Ephemeral or permanent. Can run different OS than master.',
  'Why separate master and agent?', 'Scalability (add agents), security (agents don\'t need Jenkins config), resource isolation.',
  'What happens if an agent disconnects?', 'Build may fail or pause. Config is safe on master. Pipeline is durable (resumes on reconnect).',
  'Master-Agent: Master manages, agents execute. Scalable, secure, durable. Pipeline state persists across restarts.' ,
  'Agent Connect', 'java -jar agent.jar -jnlpUrl http://jenkins:8080/computer/agent/slave-agent.jnlp -secret @secret-file'
);

jenkinsTopic('jenkins-distributed', 'Distributed Builds', 'intermediate', 15,
  'Distributed builds run jobs across multiple agents simultaneously to improve throughput and leverage different environments.',
  'Distributed builds are like having multiple workers in a factory instead of one. While one worker builds your app, another runs tests, and a third deploys. Everything happens in parallel, finishing faster.',
  'Topology', 'Single master with multiple agents. Agents on different machines, OS, clouds. Cloud agents: auto-provisioned (AWS EC2, Azure, Kubernetes). Agent pools for different build types. Load balancing across agents.',
  'Distribution Strategies', 'Label-based: specific agents for specific jobs. Load-based: least-loaded agent gets next job. Custom: use queue for custom assignment. Cloud bursting: automatically spin up cloud agents when on-premise agents are busy.',
  'What is a distributed build?', 'Running builds across multiple agents for parallelism and environment diversity.',
  'How to auto-scale agents in cloud?', 'Install Kubernetes plugin or Amazon EC2 plugin. Configure agent templates. Jenkins auto-provisions.',
  'Distributed Builds: Multi-agent, multi-OS. Cloud auto-scaling. Load balancing and label-based targeting.' ,
  'Cloud Agent Config', 'Amazon EC2 plugin: AMI template, security group, instance type. Jenkins spins up on demand.'
);

jenkinsTopic('jenkins-nodes', 'Jenkins Nodes', 'intermediate', 10,
  'A node is any machine that can execute Jenkins jobs — the master (built-in node) or agents (added nodes).',
  'Nodes are all the machines in your Jenkins network. The master is always a node (although it should execute minimal work). Agents are additional nodes you add. Think of them as all the computers available to run your builds.',
  'Node Types', 'Built-In Node: the Jenkins master. Should not run heavy builds (use agents). Permanent Agents: always-on machines (Windows, Linux). Cloud Agents: auto-provisioned and ephemeral (Docker, Kubernetes, EC2).',
  'Node Management', 'Manage Jenkins > Manage Nodes and Clouds. Add, remove, configure nodes. Monitor node status (online/offline). Set executors per node. Disconnect for maintenance. Mark temporarily offline. View agent logs.',
  'What is a Jenkins node?', 'Any machine that can run Jenkins jobs (master or agent).',
  'What is the built-in node?', 'The Jenkins master itself. Should be used for management only, not builds.',
  'Jenkins Nodes: Master (built-in), agents (permanent), cloud (ephemeral). Manage from Manage Nodes UI.' ,
  'Node Config', 'Manage Jenkins > Manage Nodes and Clouds > New Node. Name, labels, remote root, executors count.'
);

/* 16. Plugins */
jenkinsTopic('jenkins-plugins', 'Jenkins Plugins', 'beginner', 15,
  'Jenkins has over 1,800 plugins that integrate with virtually every CI/CD tool, platform, and service.',
  'Plugins are like apps for Jenkins. Need to deploy to AWS? Install the AWS plugin. Need Slack notifications? Install Slack plugin. Need to build Docker images? Install Docker plugin. Plugins add new capabilities to Jenkins.',
  'Plugin Categories', 'Build Tools: Maven, Gradle, npm, MSBuild. SCM: Git, SVN, GitHub, Bitbucket. Pipelines: Pipeline, Multibranch, Blue Ocean. Notifications: Email, Slack, PagerDuty. Authentication: LDAP, SAML, GitHub OAuth. Cloud: Docker, Kubernetes, EC2. Analysis: SonarQube, Checkstyle, FindBugs. Artifacts: Nexus, Artifactory, S3.',
  'Plugin Management', 'Manage Jenkins > Plugin Manager. Tabs: Updates (pending updates), Available (browse install), Installed (currently installed), Advanced (upload plugin). Automatic updates: configure update site. Dependency resolution: plugins auto-install dependencies.',
  'How to install a Jenkins plugin?', 'Manage Jenkins > Plugin Manager > Available tab > search > Install.',
  'What happens when a plugin is updated?', 'Jenkins may restart. Some plugins need restart to activate. Schedule maintenance windows.',
  'Jenkins Plugins: 1800+ integrations. Install via Plugin Manager. Some require restart.' ,
  'Plugin Install CLI', 'java -jar jenkins-cli.jar -s http://localhost:8080 install-plugin git docker'
);

/* 17. Credentials Management */
jenkinsTopic('jenkins-credentials', 'Credentials Management', 'intermediate', 15,
  'Jenkins Credentials securely store sensitive information (passwords, SSH keys, tokens) for use in jobs and pipelines.',
  'Credentials are like a secure vault for passwords. You store passwords, API tokens, and SSH keys in Jenkins, then reference them by ID in your jobs. Jenkins makes sure secrets never appear in logs or configuration files.',
  'Credential Types', 'Username with Password: basic auth. SSH Key: Git clone via SSH. Secret text: API tokens, keys. Secret file: uploaded file (certificate). Certificate: PKCS12 file. Docker credentials for registry auth.',
  'Scope and Binding', 'Global: available everywhere. System: only Jenkins system use. Folder: scoped to specific folder. Pipeline: withCredentials binds credentials to variable. credentials() helper in Declarative. Masked in logs (****).',
  'How to use credentials in Pipeline?', 'withCredentials([usernamePassword(credentialsId: \'git-creds\', usernameVariable: \'USER\', passwordVariable: \'PASS\')]) { ... }',
  'How are credentials displayed in logs?', 'Automatically masked as ****. Never appear in plain text.',
  'Credentials: Secure storage for secrets. Types: username+password, SSH key, secret text. Masked in logs.' ,
  'With Credentials', 'withCredentials([string(credentialsId: \'api-key\', variable: \'TOKEN\')]) { sh \'curl -H "Authorization: $TOKEN" ...\' }'
);

/* 18-19. Shared Libs, Parameters */
jenkinsTopic('jenkins-shared-libraries', 'Jenkins Shared Libraries', 'advanced', 20,
  'Shared Libraries allow you to define reusable pipeline code in a separate repository and share it across multiple Jenkinsfiles.',
  'Shared libraries are like a toolkit for your pipelines. Instead of writing the same deployment code in every project, you write it once in a shared library, and each project just calls the shared functions. Change once, update everywhere.',
  'Library Structure', 'Repository root: vars/ (global variables/functions), src/ (Groovy classes). Global variables: vars/deploy.groovy defines deploy() function. Classes: src/org/team/Utils.groovy. test/ for unit tests. Resources/ for external files.',
  'Using Libraries', '@Library(\'my-lib@v1.2\') _: import library at specific version. @Library(\'my-lib\') import org.team.Utils: import class. In Pipeline: deploy(stage: \'prod\'). Load multiple: @Library(\'lib1 lib2\') _. Global libraries configured in Manage Jenkins.',
  'What is a Shared Library?', 'Reusable pipeline code in a separate repository shared across projects.',
  'How to version Shared Libraries?', 'Use Git tags: @Library(\'my-lib@v1.2\') _. Load at specific tag, branch, or commit.',
  'Shared Libraries: Reusable pipeline code. vars/ for functions, src/ for classes. Version-controlled with Git tags.' ,
  'Shared Library Function', '// vars/buildApp.groovy: def call() { sh \'npm ci && npm run build\' }'
);

jenkinsTopic('jenkins-parameters', 'Jenkins Parameters', 'intermediate', 15,
  'Parameters allow users to provide input when triggering a build — making builds dynamic and configurable.',
  'Parameters are like filling out a form before building. "Which branch to build?" "Which environment to deploy?" "Release version number?" Users fill in the values when they trigger the build, and the pipeline uses them as variables.',
  'Parameter Types', 'String Parameter: text input. Choice Parameter: dropdown selection. Boolean Parameter: checkbox. Password Parameter: masked input. File Parameter: file upload. Active Choices: dynamic options (from script). Run Parameter: select from previous builds.',
  'Pipeline Usage', 'Declarative: parameters { string(name: \'BRANCH\', defaultValue: \'main\') }. Access: params.BRANCH. Scripted: properties([parameters([...])]). Extended Choice: multi-select, multi-level hierarchy.',
  'How to define parameters in Declarative Pipeline?', 'parameters { string(name: \'ENV\', defaultValue: \'staging\', description: \'Target\') } inside pipeline block.',
  'How to access parameters in Pipeline?', 'params.ENV or env.ENV. Both work in steps and conditions.',
  'Jenkins Parameters: Dynamic build inputs. Types: string, choice, boolean, password. Accessed via params.X.' ,
  'Parameters in Pipeline', 'parameters { choice(name: \'ENV\', choices: [\'dev\', \'staging\', \'prod\']) }'
);

/* 20-21. Triggers, Poll SCM */
jenkinsTopic('jenkins-triggers', 'Jenkins Triggers', 'beginner', 15,
  'Triggers define what causes a Jenkins job to run automatically. Multiple triggers can be configured per job.',
  'Triggers are like alarm clocks and motion sensors for your jobs. A job can run: at a specific time (like an alarm), when code changes (like a motion sensor), or after another job completes (like a domino effect).',
  'Trigger Types', 'Build periodically: cron schedule (e.g., H 2 * * * for daily 2 AM, H means hash for load distribution). Poll SCM: periodically check SCM for changes. Webhook: GitHub/GitLab push event triggers build. Upstream: triggered by another Jenkins job.',
  'Cron Syntax', 'MINUTE HOUR DOM MONTH DOW. H: hash symbol for distributed scheduling. Examples: H/15 * * * * (every 15 min), @daily (daily), @weekly. Multiple schedules in one trigger field. H spreads load across Jenkins infrastructure.',
  'What does H in Jenkins cron mean?', 'H (hash) distributes trigger times across the period to avoid load spikes.',
  'What trigger reacts to code pushes?', 'Webhook (GitHub/GitLab push events sent to Jenkins URL).',
  'Jenkins Triggers: Cron (@daily, H/15 * * * *), Poll SCM, webhook, upstream builds. H for distributed load.' ,
  'Cron Trigger', 'H 2 * * * - Run daily at ~2 AM (hashed minute). @daily - Run once daily.'
);

jenkinsTopic('jenkins-poll-scm', 'Poll SCM', 'intermediate', 10,
  'Poll SCM makes Jenkins periodically check the source control repository for changes and trigger a build if changes are found.',
  'Poll SCM is like periodically checking your mailbox. Jenkins checks the repo (GitHub, GitLab) at regular intervals. If it sees new commits (mail arrived), it triggers a build. Unlike webhooks (instant notifications), polling uses regular checks.',
  'Polling Config', 'Schedule field: cron expression for polling frequency. Trigger a build on new commit: check box. Ignore post-commit hooks: for SCM that hooks on each push. Quick polling: */5 * * * * (every 5 min). Efficient polling: H/15 * * * *.',
  'Poll vs Webhook', 'Poll: Jenkins checks SCM periodically. Works everywhere. Higher SCM load. Delayed detection. No extra setup. Webhook: SCM notifies Jenkins immediately. Requires webhook configuration. Lower SCM load. Instant.',
  'What does Poll SCM do?', 'Jenkins periodically checks the SCM repository for changes and triggers a build if changes exist.',
  'When to use Poll SCM over webhooks?', 'When network restrictions prevent webhook setup, or while testing. Webhooks preferred for production.',
  'Poll SCM: Periodic SCM checking. Cron schedule for polling frequency. Webhooks are more efficient.' ,
  'Poll SCM Config', 'H/5 * * * * - Check SCM every 5 minutes. Trigger if changes detected.'
);

/* 22-24. Webhooks, Artifacts, History */

jenkinsTopic('jenkins-webhooks', 'Webhooks', 'intermediate', 15,
  'Webhooks are HTTP callbacks from SCM providers (GitHub, GitLab, Bitbucket) to Jenkins that trigger builds on code changes.',
  'Webhooks are like a doorbell for Jenkins. When someone pushes code to GitHub, GitHub rings Jenkins\' doorbell: "Hey, new code arrived!" Jenkins immediately starts a build — no waiting for the next polling cycle.',
  'Webhook Setup', 'GitHub: Settings > Webhooks > Payload URL = http://jenkins:8080/github-webhook/. GitLab: Settings > Webhooks > URL = http://jenkins:8080/project/project-name. Bitbucket: Repository settings > Webhooks. Secret token for security.',
  'Jenkins Plugins', 'GitHub Integration Plugin: auto-configures webhooks. GitHub Branch Source Plugin: webhook handling for Multibranch. GitLab Plugin: GitLab webhook handler. Bitbucket Plugin: Bitbucket webhooks. Generic Webhook Trigger Plugin: custom webhook payloads.',
  'How to set up a GitHub webhook for Jenkins?', 'GitHub repo > Settings > Webhooks > Add webhook > Payload URL: http://jenkins:8080/github-webhook/. Content type: application/json.',
  'What is the advantage of webhooks over Poll SCM?', 'Instant build trigger on code push. No polling overhead. Lower SCM server load.',
  'Webhooks: Instant SCM notifications. GitHub: /github-webhook/. GitLab: /project/name. Plugins simplify setup.' ,
  'GitHub Webhook URL', 'http://jenkins:8080/github-webhook/ (set in GitHub repo webhook settings)'
);

jenkinsTopic('jenkins-build-artifacts', 'Build Artifacts', 'beginner', 10,
  'Build artifacts are files produced by a Jenkins build: compiled binaries, packages, test reports, Docker images.',
  'Artifacts are the outputs of your build. When Jenkins builds your code, it produces files like .jar, .war, .zip, test reports. Jenkins can archive these artifacts so you can download them later or pass them between build stages.',
  'Artifact Configuration', 'Post-build Action: Archive the artifacts. Files to archive: **/*.jar, dist/**, target/*.war. Exclude: **/*-sources.jar. Discard old artifacts: set retention policy (days, count). Fingerprinting: track artifact usage across builds.',
  'Artifact Management', 'Stored in JENKINS_HOME/jobs/{job}/builds/{build}/archive/. Accessible from build page > Artifacts. Download via UI or API. Artifact Manager: S3, Nexus (plugins extend storage). Pipeline: archiveArtifacts step.',
  'How to archive artifacts in Pipeline?', 'archiveArtifacts artifacts: \'**/dist/**\', fingerprint: true.',
  'Where are artifacts stored?', 'In JENKINS_HOME/jobs/{job}/builds/{build}/archive/. Can be configured to use external storage.',
  'Build Artifacts: Build outputs (JAR, ZIP, reports). Archived via post-build action or archiveArtifacts step.' ,
  'Archive Artifacts', 'archiveArtifacts artifacts: \'target/*.jar\', onlyIfSuccessful: true'
);

jenkinsTopic('jenkins-build-history', 'Build History', 'beginner', 10,
  'Jenkins maintains a complete history of every build run, including status, duration, changes, logs, and artifacts.',
  'Build history is like a detailed logbook for your CI/CD pipeline. Every build gets an entry with: date, who triggered it, what changed, how long it took, and whether it succeeded. You can compare, replay, or delete old builds.',
  'History Features', 'Build timeline: visual history showing successes, failures, and unstable builds. Build duration: execution time per build. Test result trends: pass/fail over time. Changes: commits included in each build. Console output: full log per build. Replay: re-run a specific build.',
  'History Management', 'Discard Old Builds: automatic cleanup. Strategy: Days to keep, Max # of builds. Log rotation: keep console logs compressed. Safe to keep: N latest builds + builds with artifacts. Pipeline: buildDiscarder option.',
  'How to view build console output?', 'Click build number > Console Output. Shows every command executed and its result.',
  'How to automatically delete old builds?', 'options { buildDiscarder(logRotator(numToKeepStr: \'10\', daysToKeepStr: \'30\')) } in Pipeline.',
  'Build History: Complete record of every build. Console output, test trends, changes, artifacts. Auto-cleanup with logRotator.' ,
  'Discard Old Builds', 'options { buildDiscarder(logRotator(numToKeepStr: \'10\')) }'
);

/* 25. Backup and Restore */
jenkinsTopic('jenkins-backup', 'Backup and Restore', 'intermediate', 15,
  'Jenkins backup involves preserving JENKINS_HOME — the directory containing all configuration, jobs, plugins, and build data.',
  'Backup is like saving your entire Jenkins world. All job configurations, plugin settings, user permissions, and build history are in JENKINS_HOME. Back this up regularly, and you can restore Jenkins on a new server in minutes.',
  'What to Backup', 'JENKINS_HOME directory: config.xml (global config), jobs/ (all job configs XML), users/ (user configs), plugins/ (installed plugins), secrets/ (credentials encrypted), nodes/ (agent configs). Exclude: build logs and artifacts (large, can be regenerated).',
  'Backup Strategies', 'File system copy: rsync, tar backup. Jenkins Backup Plugin: scheduled backups to remote storage. ThinBackup Plugin: incremental backups. Git: version control job configs (Job Config History plugin). Artifacts: backup separately if needed. Cloud: snapshot JENKINS_HOME volume.',
  'What is the most important Jenkins directory to backup?', 'JENKINS_HOME — contains all Jenkins configuration, jobs, and plugins.',
  'What can be excluded from backup to save space?', 'Build logs and artifacts. They can be regenerated. Job configs are small and essential.',
  'Backup and Restore: JENKINS_HOME is critical. Rsync, ThinBackup plugin. Exclude builds/artifacts to save space.' ,
  'Backup Command', 'tar -czf jenkins-backup.tar.gz /var/jenkins_home --exclude=/var/jenkins_home/jobs/*/builds'
);

/* 26-27. Security, RBAC */
jenkinsTopic('jenkins-security', 'Jenkins Security', 'advanced', 20,
  'Jenkins security covers authentication (who can log in), authorization (what they can do), and credentials protection.',
  'Jenkins security is like a building with multiple locks. Authentication is the front door (login). Authorization is the room access (only certain people can enter certain rooms). Credential management is the safe (only specific people have the combination).',
  'Authentication', 'Jenkins Own Database: default, users managed in Jenkins. LDAP/Active Directory: integrate corporate directory. SAML Single Sign-On: Okta, ADFS. GitHub/GitLab OAuth: login with Git credentials. Matrix-based security: fine-grained permissions. Custom: Security Realm plugins.',
  'Authorization', 'Anyone can do anything: no security (development only). Logged-in users can do anything: basic security. Matrix-based security: per-user/per-group permissions. Role-Based Strategy: Role Strategy Plugin for role-based access. Project-based Matrix: per-job permissions.',
  'What is the recommended authorization strategy?', 'Matrix-based security or Role-Based Strategy for granular control. Never use "Anyone can do anything" in production.',
  'What is CSRF protection in Jenkins?', 'Prevents cross-site request forgery attacks. Enabled by default. Uses crumb (CSRF token) in forms.',
  'Jenkins Security: Authentication (LDAP, SAML, OAuth), Authorization (Matrix, RBAC), CSRF protection.' ,
  'Security Config', 'Manage Jenkins > Configure Global Security. Security Realm, Authorization, CSRF Protection.'
);

jenkinsTopic('jenkins-rbac', 'Jenkins RBAC', 'advanced', 15,
  'Role-Based Access Control (RBAC) in Jenkins uses the Role Strategy Plugin to assign permissions to roles, then assign roles to users/groups.',
  'RBAC is like job titles in a company. Instead of giving each person individual permissions, you assign permissions to roles (Developer, QA, Admin). Then you give people roles. If a developer needs more access, you change the role, not each person individually.',
  'RBAC Setup', 'Install Role Strategy Plugin. Manage Jenkins > Manage and Assign Roles > Manage Roles. Create roles: global roles (admin, developer, viewer). Assign roles to users/groups. Item roles: per-job/folder permissions. Agent roles: per-node permissions.',
  'Role Types', 'Global Roles: administer, configure, read, create, delete. Item Roles: job create, configure, read, build, cancel, delete. Agent Roles: connect, configure, disconnect. Pattern: item roles use regex to match job names (e.g., team-a-.*).',
  'What plugin provides RBAC in Jenkins?', 'Role Strategy Plugin. Install from Plugin Manager.',
  'What is an Item Role?', 'Permissions scoped to specific jobs matched by regex pattern (e.g., team-a-.* for team A jobs).',
  'RBAC: Role Strategy Plugin. Global roles (admin, dev), Item roles (per-job regex), Agent roles (per-node).' ,
  'Role Strategy', 'Manage Jenkins > Manage and Assign Roles. Create roles, assign to users, set patterns.'
);

/* 28-34. Blue Ocean, Docker, K8s, SonarQube, Nexus, Maven, Gradle */

jenkinsTopic('jenkins-blue-ocean', 'Blue Ocean', 'beginner', 15,
  'Blue Ocean is a modern Jenkins UI that provides a visual, intuitive interface for creating and monitoring Pipelines.',
  'Blue Ocean is like a beautiful dashboard for your pipelines instead of the classic Jenkins interface. It shows pipeline status visually with colorful stage views, makes creating pipelines easy with a visual editor, and highlights failures clearly.',
  'Blue Ocean Features', 'Visual Pipeline Editor: drag-and-drop pipeline creation. Pipeline Run Visualization: colorful stage progress (green=pass, red=fail). Personal Dashboard: shows only your relevant pipelines. Activity View: real-time pipeline updates. PR Integration: Git pull request checks.',
  'Installation', 'Install from Plugin Manager (Blue Ocean plugin). Also install: Blue Ocean Pipeline Editor, Blue Ocean Core, Blue Ocean Git Pipeline. Restart Jenkins. Access: click "Open Blue Ocean" on dashboard. Runs alongside classic UI.',
  'What is Blue Ocean?', 'A modern, visual Jenkins UI for Pipeline creation and monitoring.',
  'How to install Blue Ocean?', 'Plugin Manager > Search "Blue Ocean" > Install. Includes Pipeline Editor and Git integration.',
  'Blue Ocean: Modern Jenkins UI. Visual Pipeline Editor. Color-coded stage visualization. PR integration.' ,
  'Blue Ocean URL', 'http://localhost:8080/blue (or click Open Blue Ocean on dashboard)'
);

jenkinsTopic('jenkins-docker', 'Jenkins with Docker', 'intermediate', 20,
  'Jenkins integrates with Docker to run builds in containers, build Docker images, and orchestrate container-based pipelines.',
  'Docker with Jenkins makes every build run in a fresh, clean environment. No more "it works on my machine." Each build gets its own container with the exact dependencies needed. Jenkins can also build and push Docker images as part of deployment.',
  'Docker Pipeline', 'agent { docker \'node:20\' }: run pipeline in a Node container. agent { dockerfile true }: build and run from repo Dockerfile. docker.image(\'node:20\').inside { ... }: run steps inside container. docker.build(\'myapp\').push(): build and push image.',
  'Docker in Freestyle', 'Install Docker plugin. Build step: Docker Build and Publish. Configure: repository name, Dockerfile location, registry credentials. Or use Execute Shell: docker build, docker push. Docker Compose for integration tests.',
  'How to run a Pipeline in a Docker container?', 'agent { docker \'node:20\' } — runs pipeline in Node.js 20 container.',
  'How to build and push Docker image in Pipeline?', 'docker.build(\'myapp:$\{BUILD_NUMBER\}\').push() inside script block.',
  'Jenkins with Docker: agent { docker }, docker.build(), docker.image().inside {}. Clean environments per build.' ,
  'Docker Pipeline', 'agent { docker \'node:20\' }; stages { stage(\'Build\') { steps { sh \'npm ci\' } } }'
);

jenkinsTopic('jenkins-kubernetes', 'Jenkins with Kubernetes', 'advanced', 25,
  'Jenkins integrates with Kubernetes to dynamically provision build agents as Pods, enabling elastic, container-native CI/CD.',
  'Jenkins with Kubernetes means every build gets its own pod in your Kubernetes cluster. The pod starts when the build starts, runs the build, and is destroyed when finished. No idle agents, no resource waste. Perfect for elastic CI/CD.',
  'Kubernetes Plugin', 'Jenkins Kubernetes Plugin: dynamic agent provisioning. Configuration: Kubernetes URL, namespace, credentials. Pod Template: container image, resource limits, volumes, env vars. Pod retention: always, never, on failure. YAML: define pod in Jenkinsfile YAML.',
  'Pod Templates', 'Spec in config: agent { kubernetes { yaml podTemplate } }. Container per build tool: node, maven, docker. Sidecar containers: DB for tests (postgres, mysql). Resource limits: CPU, memory per container. Volume mounts: shared workspace. Labels: select pod templates.',
  'How does Jenkins dynamically provision Kubernetes agents?', 'Kubernetes Plugin creates a Pod per build. Pod runs the job, then terminates. No idle agents.',
  'What is a sidecar container in K8s Pipeline?', 'A supporting container running alongside the build container (e.g., PostgreSQL for integration tests).',
  'Jenkins with K8s: Dynamic agent pods. Kubernetes Plugin. Pod templates with sidecar containers. Elastic scaling.' ,
  'K8s Pod Template', 'agent { kubernetes { yaml \'apiVersion: v1\\nspec: containers: [{name: node, image: node:20}]}\' } }'
);

jenkinsTopic('jenkins-sonarqube', 'Jenkins with SonarQube', 'intermediate', 20,
  'SonarQube integration with Jenkins enables automated code quality analysis — detecting bugs, vulnerabilities, and code smells in every build.',
  'SonarQube is like a quality inspector for your code. After Jenkins builds your code, SonarQube analyzes it and gives a report: code coverage, bugs, security vulnerabilities, code smells, and technical debt. It can gate the build if quality drops below thresholds.',
  'Setup', 'Install SonarQube Scanner plugin. Configure SonarQube server in Manage Jenkins > Configure System. Add credentials for SonarQube authentication. Install SonarQube Scanner on Jenkins (auto or manual). Pipeline: withSonarQubeEnv step.',
  'Pipeline Integration', 'stage(\'Analysis\') { steps { withSonarQubeEnv(\'SonarQube\') { sh \'sonar-scanner\' } } }. Quality Gate: waitForQualityGate() step (needs SonarQube Quality Gate plugin). Gate blocks pipeline if quality fails. Full analysis: coverage, bugs, vulnerabilities, code smells.',
  'What does SonarQube analyze?', 'Code quality: bugs, vulnerabilities, code smells, code coverage, duplication, technical debt.',
  'How to block pipeline on quality failure?', 'waitForQualityGate() after sonar-scanner. Pipeline pauses until SonarQube processes and gates.',
  'SonarQube: Automated code quality analysis. Bugs, vulnerabilities, code smells. Quality Gate blocks bad code.' ,
  'SonarQube Pipeline', 'withSonarQubeEnv(\'SonarQube\') { sh \'sonar-scanner\' }; timeout(5) { waitForQualityGate() }'
);

jenkinsTopic('jenkins-nexus', 'Jenkins with Nexus', 'intermediate', 15,
  'Nexus Repository integrates with Jenkins for storing and retrieving build artifacts (JARs, WARs, Docker images, npm packages).',
  'Nexus is a warehouse for your build outputs. Instead of storing artifacts on Jenkins server, you publish them to Nexus. This centralizes artifact management, provides version control, and makes artifacts available to other teams and tools.',
  'Setup', 'Install Nexus Platform Plugin. Configure Nexus server in Manage Jenkins > Configure System. Add credentials. Repository types: hosted (internal), proxy (cache external), group (combine repos). Maven: deploy to releases/snapshots repos. npm: npm publish to Nexus npm repo.',
  'Pipeline Integration', 'Deploy: sh \'mvn deploy\' (to configured Nexus). Download: sh \'mvn dependency:get\'. npm publish: sh \'npm publish\'. Docker: docker push nexus-host/repo/image. Artifact resolution: Maven/Gradle/npm point to Nexus for dependencies.',
  'What is Nexus used for in CI/CD?', 'Artifact repository: store, version, and distribute build outputs (JARs, Docker images, npm packages).',
  'How to deploy Maven artifacts to Nexus from Jenkins?', 'Configure Maven settings.xml with Nexus credentials. mvn deploy uploads artifacts to Nexus.',
  'Nexus: Artifact repository for CI/CD. Store JARs, WARs, Docker images, npm packages. Maven deployment.' ,
  'Nexus Deploy', 'sh \'mvn deploy\' - Deploys to Nexus repository configured in settings.xml or Maven settings.'
);

jenkinsTopic('jenkins-maven', 'Jenkins with Maven', 'intermediate', 15,
  'Maven integration in Jenkins automates Java project builds: compilation, testing, packaging, and dependency management.',
  'Maven with Jenkins means your Java projects build automatically. Jenkins runs mvn clean install on every commit, runs your unit tests, packages your app as JAR/WAR, and can deploy it. Maven handles dependencies while Jenkins automates the process.',
  'Setup', 'Install Maven Integration plugin. Configure Maven installations: Manage Jenkins > Global Tool Configuration > Maven. Installations: automatic (download from Apache) or local path. Settings: global settings.xml, user settings per job. Goal: clean install (build + test + package).',
  'Pipeline Integration', 'withMaven(maven: \'Maven 3.9\') { sh \'mvn clean install\' }. Options: maven settings config, global settings, pom.xml location. Test reporting: archive surefire-reports/*.xml (JUnit). Artifacts: archive target/*.jar. SonarQube: mvn sonar:sonar.',
  'How to configure Maven in Jenkins?', 'Manage Jenkins > Global Tool Configuration > Add Maven. Specify name, version, auto-install or local path.',
  'What is the typical Maven goal for CI?', 'mvn clean install — clean previous build, compile, run tests, package, install to local repo.',
  'Maven: Java build automation. Compile, test, package (JAR/WAR). Archive test reports and artifacts.' ,
  'Maven Pipeline', 'withMaven(maven: \'Maven 3.9\') { sh \'mvn clean install\' }; junit \'**/surefire-reports/*.xml\''
);

jenkinsTopic('jenkins-gradle', 'Jenkins with Gradle', 'intermediate', 15,
  'Gradle integration in Jenkins automates builds for Java, Kotlin, Android, and other JVM projects with flexible build scripts.',
  'Gradle with Jenkins is like Maven but more flexible. Gradle uses a Groovy/Kotlin build script instead of XML. Jenkins calls gradle build, runs your tests, packages your app, and publishes artifacts. Popular for Android development and modern Java projects.',
  'Setup', 'Install Gradle plugin. Configure Gradle installations: Manage Jenkins > Global Tool Configuration > Gradle. Auto-install or local Gradle. Wrapper: use gradlew (Gradle Wrapper in repo) for version consistency. Build file: build.gradle or build.gradle.kts.',
  'Pipeline Integration', 'withGradle(gradle: \'Gradle 8.5\') { sh \'gradle build\' }. Or use ./gradlew for wrapper-based builds. Test reporting: junit \'**/build/test-results/*.xml\'. Artifacts: archiveArtifacts artifacts: \'build/libs/*.jar\'. Caching: .gradle/ directory caching.',
  'What is the Gradle Wrapper?', 'gradlew scripts in repo that auto-download the correct Gradle version. Ensures build consistency.',
  'What is the typical Gradle CI command?', './gradlew clean build — clean, compile, test, package.',
  'Gradle: Flexible JVM builds. Groovy/Kotlin DSL. Gradle Wrapper for version consistency. Android support.' ,
  'Gradle Pipeline', 'sh \'./gradlew clean build\'; junit \'**/build/test-results/*.xml\'; archiveArtifacts artifacts: \'build/libs/*.jar\''
);

/* Complete CI/CD Pipeline Example */
compactTopic('jenkins-complete-cicd', 'Complete CI/CD Pipeline with Jenkins', 'advanced', 45,
  ['A complete Jenkins CI/CD pipeline demonstrates the full software delivery lifecycle: code commit, build, test, security scan, deploy to staging, E2E validation, deploy to production, and monitoring.', 'The pipeline uses a Declarative Jenkinsfile with multiple stages, agents (label-based), parallel execution, post-build actions, and credentials management.', 'Key components: Multibranch Pipeline (auto-creates per branch), Shared Library (reusable deployment logic), Blue Ocean (visual pipeline view), environment-specific configurations, and integration with SonarQube, Nexus, Docker, and Kubernetes.', 'Pipeline durability ensures builds survive master restarts. Artifacts archived for audit trail. Test results tracked over time. Security integrated via credential masking and plugin ecosystem.', 'The entire pipeline is defined as code in the Jenkinsfile, version-controlled alongside the application code, reviewed in pull requests, and shared across teams via Shared Libraries.'],
  'A complete Jenkins CI/CD pipeline is like an automated software factory. When a developer pushes code, Jenkins automatically: checks out the code, runs static analysis (SonarQube), builds with Maven/Gradle, runs unit and integration tests, packages the application as a Docker image, pushes to Nexus artifact repository, deploys to Kubernetes staging, runs E2E tests, and after manual approval, deploys to production with Blue-Green strategy — all visible in Blue Ocean\'s beautiful pipeline visualization.',
  [d('Pipeline Architecture Overview', 'The complete pipeline is defined in a Declarative Jenkinsfile with these stages: Checkout (SCM), Code Quality (SonarQube analysis), Build (Maven/Gradle), Unit Tests, Integration Tests (with service containers), Security Scan (OWASP plugin), Package (Docker image build), Publish (push to Nexus/Docker registry), Deploy to Staging (Kubernetes), E2E Tests (Selenium/Playwright), Deploy to Production (Blue-Green with manual approval), Health Check, and Notify (Slack/Email). Uses shared libraries for deployment and notification logic. Multibranch Pipeline creates branches automatically.'),
   d('Stage 1: Quality & Build', 'The pipeline starts with code checkout from SCM (Git). SonarQube analysis runs quality gates (code coverage > 80%, no critical bugs). Build with Maven or Gradle (compilation, test execution, packaging). Unit test results published with JUnit plugin. Integration tests use Docker containers for databases (PostgreSQL, Redis). OWASP Dependency Check plugin analyzes vulnerabilities in dependencies.'),
   d('Stage 2: Artifact & Docker', 'After successful build and tests, the pipeline packages the application as a Docker image using the Docker Pipeline plugin (docker.build()). The image is tagged with the build number and commit SHA. Image pushed to a private Docker registry (Nexus or Docker Hub). The JAR/WAR artifact is also archived and published to Nexus Repository for traceability.'),
   d('Stage 3: Deploy to Staging', 'Staging deployment uses Kubernetes plugin to apply Kubernetes manifests. Blue-Green deployment strategy: new version (green) deployed alongside current (blue). Smoke tests validate the green deployment. If tests pass, traffic switches to green. Jenkins credentials securely store kubeconfig and registry credentials. Environment-specific configuration via ConfigMap and Secrets.'),
   d('Stage 4: Production Deployment', 'Production deployment uses Blue-Green strategy for zero-downtime. Manual approval step pauses the pipeline — designated reviewers must approve via Jenkins UI. Post-deployment health checks (HTTP endpoint /health) verify the application responds correctly. Rollback capability: if health check fails, pipeline automatically switches back to blue (previous version).'),
       d('Monitoring & Notifications', 'Build status published to Slack/Email via Notification plugin. Blue Ocean provides visual pipeline view. Build trends and test result graphs visible on Jenkins dashboard. Performance metrics tracked over time. Deployment history in Blue Ocean. Automatic rollback triggers on production health check failure.')],
  [q('What is the overall architecture of the complete Jenkins CI/CD pipeline?', 'Multibranch Pipeline with Declarative Jenkinsfile. Stages: Code Quality → Build → Test → Security → Docker → Deploy Staging → E2E → Deploy Production → Notify. Uses shared libraries, Blue Ocean, and integrates with SonarQube, Nexus, Docker, Kubernetes.'),
   q('How does Jenkins ensure zero-downtime deployments?', 'Using Blue-Green deployment strategy: deploy new version alongside current, test it, then switch traffic. If the new version fails health checks, automatically roll back to the previous version.'),
   q('How are build artifacts managed in the pipeline?', 'JAR/WAR artifacts archived via archiveArtifacts step and published to Nexus Repository. Docker images tagged with build number and commit SHA, pushed to private Docker registry. Artifacts traceable per build.'),
   q('What role does SonarQube play in the pipeline?', 'SonarQube performs static code analysis on every commit. Quality gates enforce standards: minimum 80% code coverage, no critical vulnerabilities, no duplicated blocks. Build fails if quality gate is not met.'),
   q('How does Blue Ocean enhance the pipeline experience?', 'Blue Ocean provides a visual, intuitive pipeline editor, real-time pipeline visualization with colored stage blocks, one-click log access per stage, and a beautiful dashboard showing pipeline status across all branches.')],
  R(10,15,160,22,'#6f42c1','','SCM Checkout','Git clone source code') +
  A(170,26,185,26) +
  R(195,5,140,22,'#0070f3','','Code Quality','SonarQube analysis') +
  A(335,16,350,16) +
  R(195,30,140,22,'#28a745','','Build & Test','Maven/Gradle + JUnit') +
  A(335,41,350,41) +
  R(195,55,140,22,'#ffc107','','Security Scan','OWASP Dependency Check') +
  A(335,66,350,66) +
  R(195,80,140,22,'#dc3545','','Package Docker','docker.build + push') +
  A(335,91,350,91) +
  R(195,105,140,22,'#20c997','','Deploy Staging','Kubernetes Blue-Green') +
  A(335,116,350,116) +
  R(195,130,140,22,'#fd7e14','','E2E Tests','Playwright/Selenium') +
  A(335,141,350,141) +
  R(195,155,140,22,'#e83e8c','','Approve Prod','Manual approval gate') +
  A(335,166,350,166) +
  R(195,180,140,22,'#17a2b8','','Deploy Production','Blue-Green with rollback') +
  T(100,210,'Complete Jenkins CI/CD Pipeline: Code → Quality → Build → Security → Docker → Stage → E2E → Prod. Every stage automated with governance and rollback.',9,'#666','middle'),
  [e('Complete Jenkinsfile', 'Full Declarative Pipeline for CI/CD.', codeBlock(['pipeline {', '    agent any', '',
    '    parameters {', '        choice(name: \"ENV\", choices: [\"staging\", \"production\"], description: \"Target environment\")', '    }', '',
    '    environment {', '        DOCKER_REGISTRY = credentials(\"docker-registry\")', '        KUBECONFIG = credentials(\"kube-config\")', '        SONAR_TOKEN = credentials(\"sonar-token\")', '    }', '',
    '    stages {', '        stage(\"Code Quality\") {', '            steps {', '                withSonarQubeEnv(\"SonarQube\") {', '                    sh \"mvn sonar:sonar -Dsonar.token=$SONAR_TOKEN\"', '                }', '            }', '        }', '',
    '        stage(\"Build & Test\") {', '            parallel {', '                stage(\"Unit Tests\") {', '                    steps { sh \"mvn test\" }', '                    post { success { junit \"**/target/surefire-reports/*.xml\" } }', '                }', '                stage(\"Integration Tests\") {', '                    steps { sh \"mvn verify -P integration\" }', '                }', '                stage(\"Security Scan\") {', '                    steps { dependencyCheck additionalArguments: \"-f XML\" }', '                }', '            }', '        }', '',
    '        stage(\"Package & Publish\") {', '            steps {', '                sh \"mvn package -DskipTests\"', '                sh \"docker build -t $DOCKER_REGISTRY/app:${BUILD_NUMBER} .\"', '                sh \"docker push $DOCKER_REGISTRY/app:${BUILD_NUMBER}\"', '                archiveArtifacts artifacts: \"target/*.jar\"', '            }', '        }', '',
    '        stage(\"Deploy Staging\") {', '            when { branch \"develop\" }', '            steps {', '                sh \"kubectl set image deployment/app-staging app=$DOCKER_REGISTRY/app:${BUILD_NUMBER}\"', '            }', '        }', '',
    '        stage(\"E2E Tests\") {', '            steps {', '                sh \"npm run test:e2e\"', '            }', '        }', '',
    '        stage(\"Approve Production\") {', '            when { branch \"main\" }', '            input {', '                message \"Deploy to production?\"', '                ok \"Deploy\"', '                submitter \"admin,tech-lead\"', '            }', '            steps { echo \"Approved!\" }', '        }', '',
    '        stage(\"Deploy Production\") {', '            when { branch \"main\" }', '            steps {', '                sh \"kubectl set image deployment/app-prod-blue app=$DOCKER_REGISTRY/app:${BUILD_NUMBER}\"', '                sh \"kubectl patch service app-prod -p \'{\\\"spec\\\":{\\\"selector\\\":{\\\"version\\\":\\\"blue\\\"}}}\'\"', '            }', '        }', '',
    '        stage(\"Health Check\") {', '            steps {', '                script {', '                    try {', '                        sh \"curl -f http://app-prod/health || exit 1\"', '                    } catch (Exception e) {', '                        echo \"Health check failed! Rolling back...\"', '                        sh \"kubectl patch service app-prod -p \'{\\\"spec\\\":{\\\"selector\\\":{\\\"version\\\":\\\"green\\\"}}}\'\"', '                        currentBuild.result = \"UNSTABLE\"', '                    }', '                }', '            }', '        }', '    }', '',
    '    post {', '        success {', '            slackSend(color: \"good\", message: \"Pipeline succeeded: ${env.BUILD_URL}\")', '        }', '        failure {', '            slackSend(color: \"danger\", message: \"Pipeline failed: ${env.BUILD_URL}\")', '        }', '        always {', '            cleanWs()', '        }', '    }', '}']), 'Complete Declarative Jenkinsfile with all CI/CD stages including parallel execution, manual approval for production, Blue-Green deployment, health checks with automatic rollback, and Slack notifications.')],
  [m('What is the purpose of the input step in the Jenkinsfile?', ['Runs tests', 'Pauses pipeline for manual approval', 'Deploys automatically', 'Sends notifications'], 1, 'The input step pauses pipeline execution and waits for a user to approve (or reject) before continuing. Used here for production deployment approval.'), m('How does the health check stage handle failures?', ['Ignores them', 'Fails the build immediately', 'Rolls back to previous version', 'Retries automatically'], 2, 'If the health check curl command fails, the catch block executes a rollback by patching the Kubernetes service selector back to the green (previous) version.'), m('What is the benefit of Blue-Green deployment in the pipeline?', ['Faster builds', 'Zero-downtime deployments with easy rollback', 'Less code to write', 'Cheaper infrastructure'], 1, 'Blue-Green deployment runs both old (green) and new (blue) versions simultaneously. Traffic switches only after validation. Rollback is instant by switching back to green.'), m('What does the parallel block in the Build & Test stage achieve?', ['Runs stages sequentially', 'Runs unit tests, integration tests, and security scan simultaneously', 'Deploys to multiple environments', 'Builds multiple branches'], 1, 'The parallel block runs all three stages (Unit Tests, Integration Tests, Security Scan) concurrently, reducing total pipeline execution time.'), m('What is the purpose of withSonarQubeEnv in the pipeline?', ['Deploys SonarQube server', 'Configures SonarQube connection using predefined Jenkins global configuration', 'Installs SonarQube plugin', 'Generates SonarQube reports'], 1, 'withSonarQubeEnv selects a configured SonarQube server from Jenkins global configuration, setting the necessary environment variables (SONAR_HOST_URL, SONAR_AUTH_TOKEN) for analysis.')]
);

// ---- PAD TOPICS ----
var padTopics = require('../pad-topics');
padTopics(topics);

// ---- GENERATE ----
var dataDir = __dirname;
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["jenkins"] = TOPICS_DATA["jenkins"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["jenkins"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));
fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));
console.log('Generated Jenkins topics: ' + Object.keys(topics).length);
