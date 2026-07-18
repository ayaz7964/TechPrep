const fs = require('fs');
const { svgW, R, A, T, Tw } = require('../svg-helpers');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: (description||'').replace(/'/g,"\\'") }; }
function d(heading, text) { return { heading: heading.replace(/'/g,"\\'"), text: text.replace(/'/g,"\\'") }; }

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 300, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

function compactTopic(id, title, diff, mins, tldr, layman, deeps, qas, svg, codes, mcqs) {
  addTopic(id, title, diff, mins, tldr, layman, deeps, '', qas, svg, codes, mcqs);
}

/* Workflow */
compactTopic('github-actions-workflow', 'Workflow', 'beginner', 15,
  ['A GitHub Actions workflow is an automated process defined in YAML that runs on GitHub Actions runners.', 'Workflows are stored in .github/workflows/ as .yml files. Each workflow can contain multiple jobs.', 'Workflows are triggered by events (push, PR, schedule) and consist of jobs that run steps.'],
  'A workflow is like a recipe card that tells GitHub what to do when something happens in your repo. "When someone pushes to main, run tests, build the app, and deploy it." The recipe is written in a YAML file and lives in your repository under .github/workflows/.',
  [d('Workflow Structure', 'name: display name for workflow. on: events that trigger the workflow. jobs: collection of jobs to run. Each job: runs-on (runner type), steps (actions/commands), needs (dependencies), if (conditions). env: environment variables. defaults: default settings for all jobs.'),
   d('Workflow Anatomy', 'A workflow can have multiple jobs. Jobs run in parallel by default, or sequentially using needs. Each job has multiple steps. Steps can be: shell commands (run:) or actions (uses:). Steps share data via environment variables and filesystem. Workflows can be triggered by multiple events.')],
  [q('What is a GitHub Actions workflow?', 'An automated process defined in a YAML file in .github/workflows/ that runs on GitHub Actions runners.'),
   q('Where are workflow files stored?', 'In the .github/workflows/ directory as .yml files.'),
   q('Can a workflow have multiple jobs?', 'Yes. Jobs run in parallel by default or sequentially using the needs keyword.')],
  R(10,35,140,25,'#0070f3','','.github/workflows','YAML files') +
  R(10,65,140,25,'#28a745','','Workflow','Automated process') +
  R(10,95,140,25,'#ffc107','','Jobs','Parallel tasks') +
  R(10,125,140,25,'#dc3545','','Steps','Actions/commands') +
  T(240,170,'Workflow: Automated process in .github/workflows/*.yml. Triggered by events. Contains jobs with steps.',9,'#666','middle'),
  [e('Basic Workflow', 'Minimal workflow YAML.', codeBlock(['name: CI', 'on: [push]', 'jobs:', '  build:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '      - run: echo "Hello!"']))],
  [m('Where are GitHub Actions workflows stored?', ['src/workflows/', '.github/workflows/', 'actions/', 'workflows/'], 1, 'Workflow files must be in .github/workflows/ directory.')]
);

/* Workflow YAML */
compactTopic('github-actions-yaml', 'Workflow YAML Syntax', 'intermediate', 20,
  ['GitHub Actions workflows use YAML (YAML Ain\'t Markup Language) for configuration — a human-readable data serialization format.', 'Key YAML concepts: indentation (spaces, not tabs), key-value pairs, lists, nested objects, multi-line strings.', 'Actions YAML uses specific keywords: name, on, jobs, runs-on, steps, uses, run, with, env, if, needs.'],
  'Workflow YAML is like filling out a structured form for GitHub. Every line has meaning: indentation shows hierarchy, dashes start lists, colons separate keys from values. Getting indentation wrong is the most common mistake — YAML uses spaces, never tabs.',
  [d('YAML Basics', 'Scalars: strings (with/without quotes), numbers, booleans. Lists (arrays): items start with dash and space. Dictionaries (objects): key: value pairs. Nested: indent with 2 spaces. Multi-line: | (literal block) or > (folded block). Comments: #. Anchors: & and * for reusing values.'),
   d('Workflow Keywords', 'name: workflow display name. run-name: workflow run name (dynamic). on: trigger events. env: global environment variables. defaults: default settings. concurrency: cancel/queue control. permissions: job permissions. jobs: map of job IDs. timeout-minutes: max run time.'),
   d('Common Pitfalls', 'Tabs vs spaces (always use spaces). Wrong indentation level. Missing colons. Incorrect boolean values (true/false lowercase in some contexts). Special characters in strings (quote them). Mismatched quotes. Overly long lines.')],
  [q('What is YAML?', 'A human-readable data serialization format used for GitHub Actions workflow configuration.'),
   q('What is the most common YAML mistake?', 'Using tabs instead of spaces for indentation. YAML requires spaces.'),
   q('How to write a multi-line string in YAML?', 'Use | (literal block, preserves newlines) or > (folded block, wraps lines).')],
  R(10,35,140,25,'#0070f3','','name: CI','Workflow name') +
  R(10,65,140,25,'#28a745','','on: [push]','Trigger event') +
  R(10,95,140,25,'#ffc107','','jobs:','Job definitions') +
  R(10,125,140,25,'#dc3545','','  build:','Job ID') +
  R(10,155,140,25,'#e83e8c','','    steps:','Step list') +
  T(240,190,'YAML: Indentation-based format. Spaces only. Syntax: name, on, jobs, steps. Most common error: tabs instead of spaces.',9,'#666','middle'),
  [e('YAML Example', 'Workflow with common syntax.', codeBlock(['name: Deploy', 'on:', '  push:', '    branches: [main]', 'jobs:', '  deploy:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '      - run: npm ci && npm run build']))],
  [m('What indentation is used in YAML?', ['Tabs', 'Spaces (usually 2)', '4 spaces only', 'No indentation'], 1, 'YAML uses spaces for indentation (traditionally 2 spaces). Tabs are NOT allowed.')]
);

/* Events */
compactTopic('github-actions-events', 'Events', 'intermediate', 15,
  ['Events are activities in a repository that trigger workflow runs. Workflows listen for events using the "on" keyword.', 'Event types: webhook events (push, pull_request), scheduled (cron), manual (workflow_dispatch), and external (repository_dispatch).', 'Events carry payload data (github.event context) accessible in workflow steps.'],
  'Events are the triggers that start your workflow — like pressing a button. Push = "someone pushed code." Pull Request = "someone opened a PR." Schedule = "it\'s 3 AM." You can also manually trigger (workflow_dispatch) or let an external system trigger via API (repository_dispatch).',
  [d('Webhook Events', 'push: code pushed. pull_request: PR opened/synchronized/reopened. release: release published. issues: issue opened/closed. discussion: discussion created. workflow_run: another workflow completed. page_build: GitHub Pages build. deployment: deployment created. Many more: 50+ event types.'),
   d('Event Filters', 'Branches: branches: [main, develop]. Tags: tags: [v*]. Paths: paths: [src/**, tests/**]. Activity types: types: [opened, synchronize, closed]. File types: paths-ignore: [*.md, docs/**]. Scheduled: cron syntax (5 fields). Workflow dispatch: manual with inputs.'),
   d('Event Payload', 'github.event object contains event data. github.event_name: event type string. github.ref: branch/tag ref. github.sha: commit SHA. github.actor: who triggered. GitHub context (${{ github }}) vs event context (${{ github.event }}). Payload varies by event type.')],
  [q('What is a workflow event?', 'An activity in a repository that triggers a workflow run, defined using the on keyword.'),
   q('How to trigger workflow on specific branch only?', 'Use branch filter: on: push: branches: [main].'),
   q('What event allows manual workflow triggers?', 'workflow_dispatch — adds a "Run workflow" button in the GitHub UI.')],
  R(10,35,110,25,'#0070f3','','Push','Code pushed') +
  R(10,65,110,25,'#28a745','','Pull Request','PR opened/synced') +
  R(10,95,110,25,'#ffc107','','Schedule','Cron timer') +
  R(10,125,110,25,'#dc3545','','Workflow Dispatch','Manual button') +
  T(240,170,'Events: Activities that trigger workflows. Push, PR, schedule, manual, release, issues, and more.',9,'#666','middle'),
  [e('Event Examples', 'Different event triggers.', codeBlock(['on: [push, pull_request]', 'on:', '  schedule:', '    - cron: "0 2 * * *"', '  workflow_dispatch:', '    inputs:', '      environment:', '        type: choice', '        options: [dev, staging, prod]']))],
  [m('What cron expression runs a workflow daily at midnight?', ['0 0 * * *', '0 12 * * *', '*/5 * * *', '0 0 1 * *'], 0, '"0 0 * * *" means minute 0, hour 0 (midnight), every day, every month, every day of week.')]
);

/* Triggers */
compactTopic('github-actions-triggers', 'Triggers', 'intermediate', 15,
  ['Triggers define WHEN a workflow runs. They are event types optionally combined with activity type, branch, path, and tag filters.', 'A single workflow can have multiple triggers. If ANY trigger event occurs and passes its filters, the workflow runs.', 'Triggers can be combined with concurrency controls to manage workflow run behavior.'],
  'Triggers are the conditions that start your workflow. "Run when: someone pushes to main, OR a PR is opened against develop, OR it\'s 3 AM on weekdays." You can mix and match triggers, and each trigger can have its own filters (only run for specific branches or file paths).',
  [d('Trigger Types', 'Single event: on: push. Multiple events: on: [push, pull_request]. Event with activity: on: pull_request: types: [opened]. Event with filters: on: push: branches: [main] tags: [v*]. Multiple events with filters: use array or nested syntax.'),
   d('Path Filtering', 'paths: [src/**] — only run when files in src/ change. paths-ignore: [*.md] — skip when only markdown changes. Path filters affect only push and pull_request events. Useful for monorepos to run only relevant workflows. Supports glob patterns.'),
   d('Concurrency', 'concurrency: group name for workflow runs. cancel-in-progress: true — cancel previous runs. Useful for: deploy workflows (only latest deploy runs), CI (cancel old commits). Group by branch or environment.')],
  [q('How to trigger workflow on multiple events?', 'Use array syntax: on: [push, pull_request, workflow_dispatch].'),
   q('What does paths-ignore do?', 'Skips workflow execution when changes only match the ignored paths (e.g., documentation-only changes).'),
   q('What does cancel-in-progress do?', 'Automatically cancels any currently running workflow in the same concurrency group before starting a new one.')],
  R(10,35,110,25,'#0070f3','','Event','Push, PR, schedule') +
  A(120,48,140,48) +
  R(150,35,110,25,'#28a745','','Filters','Branch, path, tag') +
  A(260,48,280,48) +
  R(290,35,110,25,'#ffc107','','Run?','Yes or No') +
  T(240,110,'Triggers: Events + optional filters (branch, path, tag). Multiple triggers can be combined. Concurrency controls available.',9,'#666','middle'),
  [e('Multiple Triggers', 'Workflow with event + filters.', codeBlock(['on:', '  push:', '    branches: [main]', '    paths: [src/**]', '  pull_request:', '    branches: [develop]', '  workflow_dispatch:']))],
  [m('What is the purpose of concurrency in workflows?', ['Run more jobs', 'Control workflow execution, cancel duplicates', 'Increase parallelism', 'Reduce costs'], 1, 'Concurrency controls workflow execution, often used to cancel in-progress runs when a new one starts (e.g., cancel old CI on new push).')]
);

/* Jobs */
compactTopic('github-actions-jobs', 'Jobs', 'intermediate', 15,
  ['A job is a unit of work in a workflow that runs on a single runner. Each job consists of multiple steps.', 'Jobs run in parallel by default. Use the needs keyword to create sequential dependencies between jobs.', 'Key job properties: runs-on, steps, needs, if (condition), strategy (matrix), container, services, env, timeout-minutes.'],
  'A job is like a single task in your workflow. "Build the app" is one job. "Run tests" is another job. "Deploy" is a third job. They can run at the same time (parallel) or one after another (sequential). Each job runs on its own virtual machine (runner).',
  [d('Job Properties', 'runs-on: runner type (ubuntu-latest, windows-latest, self-hosted). needs: list of jobs that must complete before this one starts. if: condition to skip/run the job. strategy: matrix configuration. container: run job in a container. services: service containers (DB, Redis). env: job-level environment variables. timeout-minutes: max job duration.'),
   d('Job Dependencies', 'Parallel: jobs with no needs run simultaneously. Sequential: job A needs job B (A waits for B). Dependency graph: A needs [B, C] (A waits for B and C). Multiple levels: C needs B, B needs A. DAG: directed acyclic graph — no circular dependencies.'),
   d('Job Outputs', 'Outputs: job outputs accessible by dependent jobs. Set: echo "::set-output name=key::value" (deprecated) or echo "key=value" >> $GITHUB_OUTPUT. Access: $\{\{ needs.build.outputs.key \}\}. Outputs are strings. Can pass files via artifacts.')],
  [q('What is a job in GitHub Actions?', 'A unit of work that runs on a single runner, consisting of multiple steps.'),
   q('How to make jobs run sequentially?', 'Use needs keyword: job2: needs: [job1].'),
   q('What is the default job execution order?', 'Jobs without needs run in parallel. Jobs with needs wait for their dependencies.')],
  R(10,35,140,25,'#0070f3','','Job A: Build','Runs first (no needs)') +
  R(10,65,140,25,'#28a745','','Job B: Test','Parallel (no needs)') +
  R(10,95,140,25,'#ffc107','','Job C: Deploy','Needs: [A, B]') +
  T(240,140,'Jobs: Units of work on a single runner. Parallel by default. Sequential via needs. Properties: runs-on, steps, needs, if, strategy.',9,'#666','middle'),
  [e('Job Dependencies', 'Parallel + sequential jobs.', codeBlock(['jobs:', '  build:', '    steps: [run: npm ci && npm run build]', '  test:', '    needs: [build]', '    steps: [run: npm test]', '  deploy:', '    needs: [test]', '    steps: [run: npm run deploy]']))],
  [m('What is the default execution mode for jobs without needs?', ['Sequential', 'Parallel', 'Random', 'Manual'], 1, 'Jobs without needs run in parallel simultaneously. Jobs with needs wait for their dependencies.')]
);

/* Steps */
compactTopic('github-actions-steps', 'Steps', 'beginner', 10,
  ['Steps are individual tasks within a job. Each step runs in the same runner (shares the filesystem).', 'Steps can be: shell commands (run:) or pre-built actions (uses:).', 'Steps can access outputs of previous steps, set outputs, and have conditions (if).'],
  'Steps are the individual instructions in your job. "Check out the code" is a step. "Install dependencies" is a step. "Run tests" is a step. Steps are like items on a to-do list — they run in order, one after another, in the same environment.',
  [d('Step Types', 'run: execute shell commands directly in the runner. uses: use a pre-built action (from Marketplace or local repo). Uses format: owner/repo@ref (actions/checkout@v4). name: optional display name. id: step identifier for referencing outputs. working-directory: set working dir for run steps.'),
   d('Step Properties', 'if: condition to run step (e.g., if: failure(), if: success(), if: always()). env: step-level environment variables. continue-on-error: true — step failure doesn\'t fail the job. timeout-minutes: step timeout. shell: override shell (bash, pwsh, python, node).'),
   d('Step Outputs', 'Set: echo "{key}={value}" >> $GITHUB_OUTPUT. Access: $\{\{ steps.step_id.outputs.key \}\}. Steps share filesystem but not environment by default (use export or GITHUB_ENV).')],
  [q('What is a step in GitHub Actions?', 'An individual task in a job — either a shell command (run) or a pre-built action (uses).'),
   q('How to make a step conditional?', 'Use the if property: if: github.ref == \'refs/heads/main\'.'),
   q('How do steps share data?', 'Via the filesystem (same working directory), step outputs ($GITHUB_OUTPUT), or environment files ($GITHUB_ENV).')],
  R(10,35,140,25,'#0070f3','','Step 1: Checkout','actions/checkout@v4') +
  R(10,65,140,25,'#28a745','','Step 2: Install','npm ci') +
  R(10,95,140,25,'#ffc107','','Step 3: Test','npm test') +
  R(10,125,140,25,'#dc3545','','Step 4: Deploy','Deploy action') +
  T(240,170,'Steps: Individual tasks in a job. run: for commands, uses: for actions. Share filesystem. Run sequentially.',9,'#666','middle'),
  [e('Step Examples', 'Different step types.', codeBlock(['steps:', '  - name: Checkout code', '    uses: actions/checkout@v4', '  - name: Install deps', '    run: npm ci', '  - name: Conditional step', '    if: github.ref == \'refs/heads/main\'', '    run: echo "Deploying..."']))],
  [m('What does the continue-on-error property do?', ['Stops the job', 'Continues job even if step fails', 'Retries the step', 'Skips the step'], 1, 'continue-on-error: true allows the job to continue even if this step fails (marks as warning).')]
);

/* Runners */
compactTopic('github-actions-runners', 'Runners', 'intermediate', 15,
  ['Runners are the virtual machines or containers that execute GitHub Actions jobs.', 'GitHub-hosted runners: Ubuntu, Windows, macOS provided by GitHub (free minutes, then pay-as-you-go).', 'Runners are selected using the runs-on keyword in job definitions.'],
  'A runner is the computer that runs your workflow. When a workflow triggers, GitHub spins up a fresh virtual machine (runner), runs your jobs on it, and then destroys it. You can use GitHub\'s computers (GitHub-hosted) or your own (self-hosted).',
  [d('GitHub-Hosted Runners', 'Ubuntu: ubuntu-latest (22.04), ubuntu-24.04, ubuntu-22.04, ubuntu-20.04. Windows: windows-latest (2022), windows-2022, windows-2019. macOS: macos-latest (14), macos-14, macos-13. Each has pre-installed software (Node, Python, Docker, etc.). 2-core CPU, 7GB RAM default (larger sizes available).'),
   d('Runner Sizing', 'Standard: 2-core, 7GB RAM, 14GB SSD. Large (paid): 4-core/16GB, 8-core/32GB, 16-core/64GB. Use larger runners for: resource-intensive builds, Docker builds, parallel test execution. Pricing: per-minute for larger runners (Linux ~$0.008/min for 4-core).'),
   d('Runner Selection', 'runs-on: ubuntu-latest (always latest version). runs-on: [self-hosted, linux, x64, gpu] (label matching for self-hosted). Label groups: OS labels, architecture labels, custom labels. Runner can be selected by multiple labels.')],
  [q('What is a GitHub Actions runner?', 'A virtual machine that executes workflow jobs. GitHub-hosted (managed) or self-hosted (your infrastructure).'),
   q('What OS options are available for GitHub-hosted runners?', 'Ubuntu Linux, Windows Server, macOS.'),
   q('How to select a specific runner size?', 'Runs on standard by default. Use runs-on: ubuntu-latest-4core for larger sizes (paid plans).')],
  R(10,35,140,25,'#0070f3','','Ubuntu','Linux runner') +
  R(10,65,140,25,'#28a745','','Windows','Windows runner') +
  R(10,95,140,25,'#ffc107','','macOS','Mac runner') +
  R(10,125,140,25,'#dc3545','','Self-Hosted','Your hardware') +
  T(240,170,'Runners: VMs executing jobs. GitHub-hosted (Ubuntu, Windows, macOS) or self-hosted. Selected via runs-on.',9,'#666','middle'),
  [e('Runner Selection', 'Choose runner types.', codeBlock(['jobs:', '  build:', '    runs-on: ubuntu-latest', '  test-win:', '    runs-on: windows-latest', '  deploy:', '    runs-on: [self-hosted, production]']))],
  [m('What does runs-on: ubuntu-latest select?', ['Latest Ubuntu version available', 'Ubuntu 20.04', 'A specific commit', 'Any Linux'], 0, 'ubuntu-latest points to the latest stable Ubuntu version provided by GitHub Actions.')]
);

/* Self-Hosted Runner */
compactTopic('github-actions-self-hosted', 'Self-Hosted Runner', 'advanced', 20,
  ['Self-hosted runners are runners you install and manage on your own infrastructure (on-premise or cloud VMs).', 'Benefits: more control (OS, hardware, software), access to internal resources, cost-effective for high usage.', 'Considerations: security (runners execute arbitrary code), maintenance (updates, patching), scaling.'],
  'A self-hosted runner is like having your own computer dedicated to running workflows. Instead of waiting for GitHub\'s machines, you use your own. This gives you full control over what software is installed, how powerful the machine is, and what networks it can access.',
  [d('Setup Process', 'Go to Settings > Actions > Runners > Add runner. Download and run the configure script on your machine. OS: Linux, Windows, macOS. Architecture: x64, ARM64. One runner per machine (but can run multiple runner services). Register with token.'),
   d('Security Considerations', 'Pubic repositories: anyone can fork your repo and run workflows on your runner (dangerous!). Use only with private repos or add appropriate restrictions. Runner isolation: each job should run in clean environment (use ephemeral runners). No sensitive data in open source repos with self-hosted runners.'),
   d('Scaling', 'Elastic scaling: auto-scale runner count based on job queue. Tools: actions-runner-controller (Kubernetes), terraform-aws-github-runner (AWS). Ephemeral runners: one job per runner, then destroyed. Group runners for access control. Organization/enterprise-level runners shared across repos.'),
   d('Runner Groups', 'Organization runner groups: control which repos can use which runners. Enterprise runner groups: shared across organizations. Labels: tag runners with capabilities (gpu, high-mem, windows-gpu). Restrict by repo access.')],
  [q('What is a self-hosted runner?', 'A runner you install on your own infrastructure instead of using GitHub-hosted runners.'),
   q('What is the security risk of self-hosted runners on public repos?', 'Anyone with repo access can execute code on your runner — only use with private repos or with strict controls.'),
   q('What is an ephemeral runner?', 'A runner that runs exactly one job and is destroyed afterward — ensuring a clean environment every time.')],
  R(10,35,140,25,'#0070f3','','Your Server','Install runner agent') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','GitHub','Register & connect') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Execute Jobs','Run workflows') +
  T(240,110,'Self-Hosted Runners: Your infrastructure, full control. Security: use with private repos. Ephemeral for isolation.',9,'#666','middle'),
  [e('Runner Install', 'Add self-hosted runner.', codeBlock(['# Download and configure', './config.sh --url https://github.com/org/repo --token ABC123', './run.sh']))],
  [m('What is the main security concern with self-hosted runners?', ['Cost', 'Performance', 'Anyone with repo access can execute code on your infrastructure', 'Setup complexity'], 2, 'Self-hosted runners on public repos allow anyone with repo access to run arbitrary code on your machine — significant security risk.')]
);

/* Matrix Builds */
compactTopic('github-actions-matrix', 'Matrix Builds', 'intermediate', 20,
  ['Matrix builds run the same job across multiple OS and version combinations simultaneously.', 'Defined via the strategy.matrix keyword. Creates combinations of specified variables.', 'Useful for: testing against multiple OS, language versions, dependency configurations.'],
  'Matrix builds are like running the same test on multiple devices at once. Instead of writing separate jobs, you define a matrix and GitHub creates all combinations automatically.',
  [d('Matrix Configuration', 'strategy: matrix: os: [ubuntu-latest, windows-latest] node: [16, 18, 20]. Creates 6 jobs. Variables referenced as matrix.os and matrix.node. Combine with include and exclude.'),
   d('Exclude and Include', 'exclude removes specific combinations. include adds extra combinations. Use exclude to skip unsupported combos. Use include for special configurations.'),
   d('Matrix Best Practices', 'Maximize coverage. Minimize cost. Fail fast cancels remaining jobs on failure. Dynamic matrix from previous job.'),
   d('Matrix Variables', 'Predefined: matrix.os, matrix.node. Naming: any key name. max-parallel limits concurrent jobs.')],
  [q('What is a matrix build?', 'Running the same job across multiple OS and version combinations in parallel.'),
   q('How to exclude a specific combination?', 'Use strategy.matrix.exclude.'),
   q('What does fail-fast do?', 'Cancels remaining matrix jobs when any job fails.')],
  R(10,35,140,25,'#0070f3','','OS: Ubuntu vs Node 16','Job 1') +
  R(10,65,140,25,'#28a745','','OS: Ubuntu vs Node 18','Job 2') +
  R(10,95,140,25,'#ffc107','','OS: Windows vs Node 16','Job 3') +
  R(10,125,140,25,'#dc3545','','OS: Windows vs Node 18','Job 4') +
  T(240,170,'Matrix Builds: NxM parallel jobs across OS and version combinations.',9,'#666','middle'),
  [e('Matrix Configuration', 'Multi-OS and Node version matrix.', codeBlock(['strategy:', '  matrix:', '    os: [ubuntu-latest, windows-latest]', '    node: [16, 18, 20]']))],
  [m('How many jobs does a 2x3 matrix create?', ['2', '3', '5', '6'], 3, 'A 2x3 matrix creates 6 jobs.')]
);

/* Actions Marketplace */
compactTopic('github-actions-marketplace', 'Actions Marketplace', 'beginner', 15,
  ['The GitHub Marketplace is a public directory of Actions shared by the community and verified publishers.', 'Actions can be: Docker container actions, JavaScript actions, or Composite actions.', 'Using an action: owner/repo@version (e.g., actions/checkout@v4). Always pin to a specific version.'],
  'The Actions Marketplace is like an app store for your workflows. Need to deploy to AWS? There\'s an action for that. Send a Slack notification? There\'s an action for that. Run a Docker container? There\'s an action for that. You browse, find, and use them in your workflows.',
  [d('Action Types', 'Docker container: runs in a Docker container. Supports any language. Slower startup. JavaScript: runs directly on runner (fast). Node.js based. No container overhead. Composite: combines multiple steps into one action. Reusable across workflows.'),
   d('Official Actions', 'GitHub official: actions/checkout (checkout code), actions/setup-node (setup Node.js), actions/cache (dependency caching), actions/upload-artifact, actions/download-artifact. Third-party: AWS, Azure, Google Cloud, Docker, Slack, SonarQube.'),
   d('Action Versions', 'Pinning: actions/checkout@v4 (major version — recommended). @v4.2.0 (specific version). @main (branch — dangerous!). SHA: @a1b2c3d (commit SHA — most secure but not human-readable). Always pin to at least major version for stability.'),
   d('Creating Actions', 'Dockerfile action: Dockerfile in action repo. JavaScript action: action.yml + index.js. Composite action: action.yml with steps. Metadata: action.yml file with name, description, inputs, outputs. Publish to Marketplace.')],
  [q('What are the three types of GitHub Actions?', 'Docker container, JavaScript, and Composite actions.'),
   q('How to reference an action from the Marketplace?', 'owner/repo@version — e.g., actions/checkout@v4.'),
   q('What is the recommended way to pin an action version?', 'Use major version tag (e.g., @v4) for automatic patch updates while avoiding breaking changes.')],
  R(10,35,140,25,'#0070f3','','Official','actions/* by GitHub') +
  R(10,65,140,25,'#28a745','','Verified','Verified publishers') +
  R(10,95,140,25,'#ffc107','','Community','Anyone can publish') +
  R(10,125,140,25,'#dc3545','','Custom','Your own actions') +
  T(240,170,'Actions Marketplace: Directory of reusable actions. Types: Docker, JavaScript, Composite. Pin to @vX for stability.',9,'#666','middle'),
  [e('Using Marketplace Actions', 'Common actions in workflow.', codeBlock(['steps:', '  - uses: actions/checkout@v4', '  - uses: actions/setup-node@v4', '    with:', '      node-version: 20', '  - uses: actions/cache@v4', '    with:', '      path: ~/.npm', '      key: $\{\{ runner.os \}\}-node-$\{\{ hashFiles(\'**/package-lock.json\') \}\}']))],
  [m('What is the recommended way to reference an action?', ['@main (branch)', '@v4 (major version)', 'latest', 'no version'], 1, 'Pinning to a major version tag (e.g., @v4) is recommended — it gets patch updates without breaking changes.')]
);

/* Composite Actions */
compactTopic('github-actions-composite', 'Composite Actions', 'advanced', 20,
  ['Composite actions allow you to combine multiple workflow steps into a single reusable action.', 'Composite actions are defined in an action.yml file with a runs.using: "composite" section.', 'Composite actions can contain: run steps, uses steps (even other composite actions), inputs, outputs.'],
  'A composite action is like creating a macro for your workflow. If you always do the same 5 steps (checkout, install, lint, test, build), you can bundle them into one reusable action. Then any workflow just uses my-actions/setup@v1 instead of repeating all 5 steps.',
  [d('Composite Action Structure', 'action.yml: name, description, inputs (optional), outputs (optional). runs: using: "composite" and steps: keyword. Steps are defined like workflow steps. Uses composite actions can use other actions. Inputs accessible via $\{\{ inputs.name \}\}. Outputs via $\{\{ steps.id.outputs.key \}\} and echo to $GITHUB_OUTPUT.'),
   d('Composite vs Workflow', 'Composite: called from within a job (one step). More flexible, can use inputs/outputs. Workflow: entire pipeline of jobs. Composite actions reduce duplication within a job. Reusable workflows orchestrate across jobs.'),
   d('Best Practices', 'Name composite actions descriptively. Document inputs and outputs. Version with tags. Use shell: bash explicitly in run steps. Keep focused — one responsibility. Test composite actions in isolation. Publish to Marketplace or use local path (./.github/actions/my-action).')],
  [q('What is a composite action?', 'An action that bundles multiple workflow steps into a single reusable unit.'),
   q('Where is a composite action defined?', 'In an action.yml file with runs.using: "composite" at the root or in .github/actions/.'),
   q('How to use a local composite action?', 'uses: ./.github/actions/my-action (relative path from repo root).')],
  R(10,35,140,25,'#0070f3','','Workflow','Calls composite action') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Composite Action','Bundled steps') +
  R(180,65,140,25,'#ffc107','','Step 1: Checkout','Nested step') +
  R(180,95,140,25,'#dc3545','','Step 2: Install','Nested step') +
  T(240,150,'Composite Actions: Bundle multiple steps into one reusable action. Defined in action.yml. Inputs/outputs supported.',9,'#666','middle'),
  [e('Composite action.yml', 'Composite action definition.', codeBlock(['name: "Setup Node App"', 'description: "Checkout, install, lint"', 'inputs:', '  node-version:', '    required: true', '    default: "20"', 'runs:', '  using: "composite"', '  steps:', '    - uses: actions/checkout@v4', '    - uses: actions/setup-node@v4', '      with:', '        node-version: $\{\{ inputs.node-version \}\}', '    - run: npm ci && npm run lint', '      shell: bash']))],
  [m('What keyword defines a composite action?', ['runs.using: "docker"', 'runs.using: "composite"', 'type: composite', 'kind: composite'], 1, 'Composite actions use runs.using: "composite" in action.yml.')]
);

/* Reusable Workflows */
compactTopic('github-actions-reusable', 'Reusable Workflows', 'advanced', 20,
  ['Reusable workflows allow you to call one workflow from another, avoiding duplication across repositories.', 'Called via the uses keyword in a job: uses: owner/repo/.github/workflows/workflow.yml@ref.', 'The called workflow must have on: workflow_call trigger. Inputs and secrets are passed explicitly.'],
  'Reusable workflows are like function calls for your CI/CD. Instead of copying the same CI workflow into every repo in your organization, you define it once and call it from each repo. Changes to the central workflow automatically apply everywhere.',
  [d('Calling Workflow', 'Caller job: uses: org/repo/.github/workflows/ci.yml@v1. Must specify with: for inputs and secrets: inherit or secrets: for secrets. Called workflow: on: workflow_call: inputs: (define inputs) secrets: (define secrets). Called workflow on any branch or tag.'),
   d('Inputs & Secrets', 'Inputs: on: workflow_call: inputs: name: description: required: type: string. Secrets: on: workflow_call: secrets: pass-to-secret: required: true. Pass: with: name: value and secrets: inherit or secrets: MY_SECRET.'),
   d('Limitations', 'Nested calls: max 4 levels deep. Secrets: must be explicitly declared in called workflow. Cannot call workflows from private repos in public repos (unless same owner). Matrix: cannot pass matrix strategy to called workflow (unfold matrix in caller).'),
   d('Use Cases', 'Standard CI pipeline shared across all repos. Deployment workflow called with environment as input. Security scan workflow with shared configuration. Notification workflow for pipeline results.')],
  [q('What are reusable workflows?', 'Workflows that can be called from other workflows using the workflow_call trigger.'),
   q('How to pass secrets to a reusable workflow?', 'Declare in called workflow\'s on.workflow_call.secrets and pass with secrets: inherit or secrets: MY_SECRET.'),
   q('What is the nesting limit for reusable workflows?', 'A maximum of 4 levels of nested workflow calls.')],
  R(10,35,160,25,'#0070f3','','Repo A Workflow','Calls shared CI') +
  A(170,48,190,48) +
  R(200,35,160,25,'#28a745','','Shared CI Workflow','Defined once') +
  R(200,65,160,25,'#ffc107','','Repo B Workflow','Calls shared CI') +
  T(240,130,'Reusable Workflows: Call workflows from other repos. workflow_call trigger. Inputs and secrets passed explicitly.',9,'#666','middle'),
  [e('Call Reusable Workflow', 'Caller workflow.', codeBlock(['jobs:', '  ci:', '    uses: my-org/shared-workflows/.github/workflows/ci.yml@v1', '    with:', '      node-version: 20', '    secrets: inherit']))],
  [m('What trigger is required for reusable workflows?', ['workflow_dispatch', 'workflow_call', 'workflow_run', 'repository_dispatch'], 1, 'Reusable workflows must specify on: workflow_call to be callable from other workflows.')]
);

/* Cache */
compactTopic('github-actions-cache', 'Cache', 'intermediate', 15,
  ['The cache action stores and restores files between workflow runs, speeding up execution by avoiding re-downloads.', 'Common use cases: package manager caches (npm, pip, Maven, Gradle), Docker layers, build outputs.', 'Cache key determines when cache is invalidated. Use hash of lockfile for dependency cache.'],
  'Cache is like a shortcut for your workflow. Instead of downloading all npm packages fresh every time you run a workflow, the cache saves them after the first run and restores them on subsequent runs — as long as your package.json hasn\'t changed.',
  [d('Cache Action', 'actions/cache@v4: path (what to cache), key (unique identifier), restore-keys (fallback). Cache hit: files restored (skips download). Cache miss: downloads and saves for next run. Cache size limit: 10GB per repository. Cache retention: 7 days since last access.'),
   d('Cache Key Strategies', 'Deps: key: $\{\{ runner.os \}\}-npm-$\{\{ hashFiles(\'**/package-lock.json\') \}\}. OS-specific: include runner.os in key. Language-specific: npm vs pip vs Maven. Prefix: project-cache-$\{\{ hash \}\}. Restore-keys: fallback to partial match (same prefix, different hash).'),
   d('Best Practices', 'Cache lockfile-based dependencies only (deterministic). Include OS in key (different binaries per OS). Use restore-keys for partial cache hits. Separate caches for different dependency types. Monitor cache hit rate — low hit rate means cache isn\'t working.'),
   d('Cache Limits', 'Max 10GB per repository. No limit per key. Cache eviction: LRU (least recently used) after 7 days. Multiple caches per job. Cross-branch cache access (same key).')],
  [q('What does the cache action do?', 'Stores and restores files between workflow runs to speed up execution.'),
   q('What is the recommended cache key for npm?', 'key: $\{\{ runner.os \}\}-npm-$\{\{ hashFiles(\'**/package-lock.json\') \}\}.'),
   q('How long does a cache entry persist?', '7 days since last access (LRU eviction). Max 10GB per repository.')],
  R(10,35,140,25,'#0070f3','','First Run','Cache miss, download') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Save Cache','Store ~/.npm') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Next Run','Cache hit, restore') +
  T(240,110,'Cache: Store dependencies between runs. actions/cache@v4. Key based on lockfile hash. 7-day retention, 10GB limit.',9,'#666','middle'),
  [e('Cache Setup', 'Cache npm packages.', codeBlock(['- uses: actions/cache@v4', '  with:', '    path: ~/.npm', '    key: $\{\{ runner.os \}\}-npm-$\{\{ hashFiles(\'**/package-lock.json\') \}\}', '    restore-keys: |', '      $\{\{ runner.os \}\}-npm-']))],
  [m('What invalidates a cache entry?', ['Time elapsed', 'Cache key changes', 'Number of runs', 'Runner type'], 1, 'Cache is invalidated when the cache key changes — typically due to a modified lockfile.')]
);

/* Artifacts */
compactTopic('github-actions-artifacts', 'Artifacts', 'intermediate', 15,
  ['Artifacts are files produced during a workflow run that can be shared between jobs or downloaded after the run completes.', 'Actions: upload-artifact (save files), download-artifact (retrieve files).', 'Use cases: build outputs, test reports, coverage reports, logs, deployment packages.'],
  'Artifacts are like handing off a package between workers on an assembly line. Job A builds the app and hands it off. Job B picks it up and runs tests on it. After the workflow finishes, you can download the package from the GitHub UI.',
  [d('Upload Artifact', 'actions/upload-artifact@v4: name (artifact name), path (files to upload), if-no-files-found (error/warn/ignore), retention-days (override default). Uploads: single files, directories, glob patterns (**/dist/**). Compression: automatically zipped (ZIP).'),
   d('Download Artifact', 'actions/download-artifact@v4: name (specific artifact or all), path (destination), github-token (for cross-workflow). Download all: omit name. Download specific: use name. Merge: multiple uploads with same name merge into one.'),
   d('Artifact Retention', 'Default: 90 days (GitHub default). Per-artifact override: retention-days: 30. Reduce retention for temporary artifacts. Increase for compliance artifacts (audit logs, reports). PR artifacts: deleted when PR is closed.'),
   d('Use Cases', 'Build distribution: upload build artifacts, download in deploy job. Test reports: upload test results as HTML/JUnit, download for analysis. Coverage: upload coverage reports. Logs: upload debug logs for troubleshooting.')],
  [q('What are GitHub Actions artifacts?', 'Files produced during workflow runs that can be shared between jobs or downloaded.'),
   q('How to upload build output to share between jobs?', 'actions/upload-artifact@v4 in build job, actions/download-artifact@v4 in dependent job.'),
   q('What is the default artifact retention period?', '90 days. Can be overridden with retention-days.')],
  R(10,35,140,25,'#0070f3','','Job A: Build','npm run build') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Upload','dist/ folder') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Job B: Deploy','Download & deploy') +
  T(240,110,'Artifacts: Share files between jobs or download after run. upload-artifact/download-artifact. Retention: 90 days default.',9,'#666','middle'),
  [e('Upload & Download', 'Share artifacts between jobs.', codeBlock(['# Job build:', '- uses: actions/upload-artifact@v4', '  with:', '    name: build-output', '    path: dist/', '# Job deploy:', '- uses: actions/download-artifact@v4', '  with:', '    name: build-output']))],
  [m('What compression format do artifacts use?', ['TAR.GZ', 'ZIP', 'RAR', 'No compression'], 1, 'Artifacts are automatically compressed as ZIP files.')]
);

/* Secrets */
compactTopic('github-actions-secrets', 'Secrets', 'intermediate', 15,
  ['Secrets are encrypted environment variables that store sensitive information (API keys, tokens, passwords) for use in workflows.', 'Secrets are stored at repository, environment, or organization level. They are masked in workflow logs.', 'Reference: $\{\{ secrets.SECRET_NAME \}\}. Never hardcode secrets in workflow files.'],
  'Secrets are like locked safes for your passwords. You put the password in the safe (GitHub Secrets), and your workflow can open it and use it without ever showing the password. If someone reads the logs, the secret appears as ***.',
  [d('Secret Levels', 'Repository: Settings > Secrets and variables > Actions. Available to all workflows in repo. Environment: Settings > Environments > Environment > Secrets. Only available in jobs targeting that environment. Organization: Settings > Secrets. Available to selected repos.'),
   d('Using Secrets', 'Access: $\{\{ secrets.MY_SECRET \}\}. In actions: with: password: $\{\{ secrets.PASSWORD \}\}. In scripts: run: echo $\{\{ secrets.TOKEN \}\} | docker login. Masking: automatically hidden in logs (***). Can be used in: environment variables, action inputs, shell commands.'),
   d('Best Practices', 'Never use default values for secrets in workflows. Use environment-level secrets for environment-specific values. Rotate secrets regularly. Remove unused secrets. Use OpenID Connect (OIDC) instead of static secrets for cloud providers. Audit secret usage.'),
   d('Limitations', 'Max 100 secrets per repo. Secret size limit: 48KB. Secrets are not available in forked PRs (security). Use pull_request_target for forked PRs needing secrets. Not available in reusable workflows unless explicitly declared.')],
  [q('What are GitHub Actions secrets?', 'Encrypted environment variables for sensitive data (API keys, tokens) used in workflows.'),
   q('How are secrets protected in logs?', 'They are automatically masked — appearing as *** in log output.'),
   q('Are secrets available in workflows triggered from forks?', 'No — for security reasons, secrets are not passed to workflows triggered by forked repositories.')],
  R(10,35,140,25,'#0070f3','','Repository','Repo-level secrets') +
  R(10,65,140,25,'#28a745','','Environment','Per-environment') +
  R(10,95,140,25,'#ffc107','','Organization','Org-wide secrets') +
  R(10,125,140,25,'#dc3545','','Workflow','$\{\{ secrets.X \}\}') +
  T(240,170,'Secrets: Encrypted sensitive values. Repository, environment, or organization level. Auto-masked in logs. Max 48KB.',9,'#666','middle'),
  [e('Using Secrets', 'Access secrets in workflows.', codeBlock(['steps:', '  - name: Login to Docker', '    run: echo $\{\{ secrets.DOCKER_PASSWORD \}\} | docker login -u $\{\{ secrets.DOCKER_USERNAME \}\} --password-stdin']))],
  [m('What environment provides secrets to workflows from forks?', ['Secrets are NOT available from forks', 'push', 'pull_request_target', 'workflow_dispatch'], 2, 'pull_request_target runs in the context of the base repo (has access to secrets) but is safer than pull_request for forked PRs.')]
);

/* Variables */
compactTopic('github-actions-variables', 'Variables', 'beginner', 10,
  ['Variables are non-sensitive configuration values that can be used across workflows.', 'Unlike secrets, variables are NOT encrypted and are visible in logs and UI.', 'Configuration levels: repository, environment, organization. Reference: $\{\{ vars.VARIABLE_NAME \}\}.'],
  'Variables are like sticky notes with non-secret information for your workflow: "Node version = 20", "Deploy Region = us-east-1", "Slack Channel = #deployments". They are visible to anyone with repo access, so don\'t put passwords in them.',
  [d('Variable Levels', 'Repository: Settings > Secrets and variables > Actions > Variables. Environment: Environment settings > Variables. Organization: Organization settings > Secrets and variables. Organization variables can be limited to specific repos.'),
   d('Using Variables', 'Access: $\{\{ vars.NODE_VERSION \}\}. In run steps: run: node --version $\{\{ vars.NODE_VERSION \}\}. In with: node-version: $\{\{ vars.NODE_VERSION \}\}. Override precedence: environment > repository > organization.'),
   d('Variables vs Secrets', 'Variables: visible, non-sensitive (Node version, region, URLs). Secrets: encrypted, masked (API keys, passwords). Use variables for configuration, secrets for sensitive data. Both support the same levels and override order.')],
  [q('What are GitHub Actions variables?', 'Non-sensitive configuration values available across workflows, visible in logs.'),
   q('What is the difference between vars and secrets?', 'Variables are visible and for non-sensitive config. Secrets are encrypted and masked for sensitive data.'),
   q('What is the variable precedence order?', 'Environment variables override repository variables, which override organization variables.')],
  R(10,35,140,25,'#0070f3','','Organization','Org-wide vars') +
  R(10,65,140,25,'#28a745','','Repository','Repo vars') +
  R(10,95,140,25,'#ffc107','','Environment','Env vars (highest)') +
  T(240,140,'Variables: Non-sensitive config visible in logs. Levels: org → repo → env. Reference: $\{\{ vars.NAME \}\}.',9,'#666','middle'),
  [e('Using Variables', 'Access variables in workflow.', codeBlock(['env:', '  NODE_VERSION: $\{\{ vars.NODE_VERSION \}\}', 'steps:', '  - uses: actions/setup-node@v4', '    with:', '      node-version: $\{\{ env.NODE_VERSION \}\}']))],
  [m('Can variables contain sensitive information?', ['Yes, they are encrypted', 'No, they are visible in logs and UI', 'Only at org level', 'Only at env level'], 1, 'Variables are NOT encrypted and are visible in logs. Use secrets for sensitive data.')]
);

/* Environments */
compactTopic('github-actions-environments', 'Environments', 'intermediate', 20,
  ['Environments in GitHub Actions represent deployment targets (dev, staging, production) with protection rules and configuration.', 'Each environment can have: required reviewers, wait timer, secrets, variables, and deployment branches.', 'Jobs target environments via the environment keyword. Deployments are tracked in the Environment dashboard.'],
  'Environments are like secure rooms for your deployments. You can say: "Only deploy to production after a manager approves. Only deploy from the main branch. Wait 10 minutes before going live." Environments track every deployment with a full history.',
  [d('Environment Features', 'Required reviewers: 1-6 people who must approve before deployment. Wait timer: time delay before environment accepts traffic. Deployment branches: restrict which branches can deploy. Environment secrets/vars: scoped to specific environments. Protection rules are enforced in deployment jobs.'),
   d('Using Environments', 'In job: environment: name: production. With URL: environment: name: production url: https://app.example.com. Deployment URL shown in GitHub UI. Environment variables: $\{\{{ vars.env_name.VAR \}\} syntax (or set in env context).'),
   d('Deployment History', 'Active deployments: currently live. Inactive: previous deployments. Viewable in Environment tab. Each deployment linked to commit, workflow run, and reviewer. Track: who deployed, when, what commit, approval status.')],
  [q('What are GitHub Environments?', 'Deployment targets with protection rules, secrets, and configuration (dev, staging, production).'),
   q('What protection rules can environments have?', 'Required reviewers, wait timer, deployment branch restrictions.'),
   q('How to track deployment history?', 'Environments have a dashboard showing all deployments with commit, reviewer, and timestamp.')],
  R(10,35,110,25,'#0070f3','','Dev','No protections') +
  R(10,65,110,25,'#28a745','','Staging','Branch restriction') +
  R(10,95,110,25,'#ffc107','','Production','Approval required') +
  T(240,140,'Environments: Deployment targets with protection rules. Required reviewers, wait timer, branch restrictions. Full audit history.',9,'#666','middle'),
  [e('Environment Job', 'Target an environment in a job.', codeBlock(['deploy-prod:', '  runs-on: ubuntu-latest', '  environment:', '    name: production', '    url: https://app.example.com', '  steps:', '    - run: ./deploy.sh']))],
  [m('What protection rule can be added to production environment?', ['Secrets', 'Required reviewers', 'Matrix strategy', 'Caching'], 1, 'Required reviewers forces deployments to be approved by specified people before proceeding.')]
);

/* Deployment Protection Rules */
compactTopic('github-actions-deployment-protection', 'Deployment Protection Rules', 'advanced', 15,
  ['Deployment protection rules guard your environments, ensuring only authorized and safe deployments proceed.', 'Types: required reviewers, wait timer, branch protection, custom deployment gates (via GitHub Apps).', 'Rules are configured per-environment and enforced when a job references the environment.'],
  'Deployment protection rules are like security checkpoints for deploying code. Before code reaches production, it must pass through these checkpoints: a manager approves, the branch matches policy, and a mandatory wait timer elapses. This prevents rushed or unauthorized deployments.',
  [d('Required Reviewers', '1-6 GitHub users/teams configured as approvers. When deployment job runs, it pauses and sends notification. Reviewer must approve via GitHub UI or API. Approvals expire after new commits pushed (if configured). Deployment proceeds only after all approvals.'),
   d('Wait Timer', 'Configured in seconds/minutes/hours. Pauses deployment after the approval step. Allows monitoring of previous deployment, manual rollback if needed, cache warmup, gradual rollout. Often combined with canary releases.'),
   d('Deployment Branches', 'Restrict which branches can deploy to an environment. Options: all branches, selected branches (list), protected branches only. Prevents: deploying feature branches to production, deploying unapproved changes.'),
   d('Custom Protection Rules', 'GitHub Apps can provide custom deployment gates. Examples: CI status check, load test results, security scan pass, compliance check, manual validation via external system. Apps approve/reject deployments via Deployment API.')],
  [q('What are deployment protection rules?', 'Gates that control and restrict deployments to environments (approvals, wait timer, branch restrictions).'),
   q('What happens after a required reviewer approves?', 'Deployment proceeds (or continues after wait timer if configured).'),
   q('What are custom protection rules?', 'Deployment gates provided by GitHub Apps — external validation like CI checks, load tests, compliance scans.')],
  R(10,35,140,25,'#0070f3','','Job Triggers','Deploy to prod') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Required Reviewers','Approve?') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Wait Timer','Delay before deploy') +
  R(10,65,140,25,'#dc3545','','Deploy!','Code goes live') +
  T(240,120,'Deployment Protection: Required reviewers, wait timer, branch restrictions, custom gates. Multiple layers of safety.',9,'#666','middle'),
  [e('Protected Environment', 'Environment with protection rules.', codeBlock(['environment:', '  name: production', '  url: https://app.com']))],
  [m('What does a wait timer do in deployment protection?', ['Blocks deployment permanently', 'Pauses deployment for a set time after approval', 'Speeds up deployment', 'Triggers rollback'], 1, 'The wait timer creates a mandatory pause between approval and deployment, allowing monitoring or manual rollback.')]
);

/* Scheduled Workflows */
compactTopic('github-actions-scheduled', 'Scheduled Workflows', 'intermediate', 10,
  ['Scheduled workflows run at specified times using cron syntax, similar to cron jobs on Linux.', 'Configured via on: schedule: - cron: expression. Runs on the default branch (usually main).', 'Common uses: nightly builds, weekly dependency updates, daily report generation, cleanup tasks.'],
  'Scheduled workflows are like setting an alarm clock for your automation. "Run tests every night at 2 AM." "Send a weekly report every Monday." "Check for dependency updates every day." GitHub Actions uses standard cron syntax, the same as Linux cron jobs.',
  [d('Cron Syntax', 'Five fields: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-6, 0=Sunday). Examples: "0 2 * * *" (daily 2 AM). "0 0 * * 1" (weekly Monday midnight). "*/15 * * * *" (every 15 minutes). "0 0 1 * *" (monthly). Max frequency: every 5 minutes.'),
   d('Schedule Behavior', 'Runs on default branch (main). Only runs if workflow file exists on default branch. Uses UTC timezone. Delays possible if high system load. Consecutive runs: if previous run still active, new run may start or wait (configurable).'),
   d('Use Cases', 'Nightly CI: full test suite + integration tests (too slow for per-commit). Dependency updates: check for outdated packages. Report generation: email daily reports, generate documentation. Data processing: ETL jobs, database maintenance. Cleanup: delete old artifacts, close stale issues.')],
  [q('What is a scheduled workflow?', 'A workflow triggered by a cron schedule rather than a code event.'),
   q('What timezone does cron use in GitHub Actions?', 'UTC. Adjust your cron expression for your timezone.'),
   q('What is the minimum cron interval?', 'Every 5 minutes (e.g., */5 * * * *).')],
  R(10,35,140,25,'#0070f3','','Cron Trigger','"0 2 * * *"') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Workflow Runs','Daily at 2 AM UTC') +
  T(240,100,'Scheduled Workflows: Cron-based triggers. on: schedule: - cron: expression. UTC timezone. Min interval: 5 min.',9,'#666','middle'),
  [e('Scheduled Workflow', 'Daily execution at 2 AM.', codeBlock(['name: Nightly CI', 'on:', '  schedule:', '    - cron: "0 2 * * *"', 'jobs:', '  test:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '      - run: npm ci && npm test']))],
  [m('What cron expression runs a workflow every Monday at 9 AM UTC?', ['0 9 * * 1', '0 9 1 * *', '9 0 * * 1', '0 0 * * 1'], 0, '"0 9 * * 1" — minute 0, hour 9, any day of month, any month, Monday (day 1).')]
);

/* Conditional Execution */
compactTopic('github-actions-conditional', 'Conditional Execution', 'intermediate', 15,
  ['Conditional execution controls whether jobs or steps run based on conditions evaluated at runtime.', ['Conditions use the if keyword with expressions. Expressions are evaluated to true/false.', 'Common conditions: branch checks, event type, file changes, previous step status, secrets availability.']],
  ['Conditional execution is like adding "if this, then do that" logic to your workflow. "Only deploy if we\'re on the main branch." "Only run performance tests if the PR affects backend code." "Only alert on failure." You control exactly when things happen.'],
  [d('If Keyword', 'Job level: job_name: if: condition. Step level: step: if: condition. If condition is true: job/step runs. If false: skipped (marked as "skipped" in UI). Functions: success(), failure(), always(), cancelled(). Combine: && (and), || (or), ! (not).'),
   d('Common Conditions', 'Branch: github.ref == \'refs/heads/main\'. Event: github.event_name == \'pull_request\'. File changes: steps.changed-files.outputs.any_changed == \'true\'. Status: failure() (previous step failed). Secrets: github.repository_owner == \'my-org\'.'),
   d('Status Check Functions', 'success(): all previous steps succeeded (default). failure(): any previous step failed. always(): always run (regardless of status). cancelled(): workflow was cancelled. Combined: if: failure() && github.ref == \'refs/heads/main\'.'),
   d('Expression Syntax', '$\{\{ expression \}\}. Literals: strings (\'hello\'), numbers (42), booleans (true/false), null. Operators: ==, !=, <, >, &&, ||, !. Functions: contains(), startsWith(), endsWith(), format(), join(), toJSON(), fromJSON(), hashFiles().')],
  [q('What keyword controls conditional execution?', 'The if keyword at job or step level.'),
   q('What does failure() return?', 'true if any previous step in the job failed.'),
   q('How to always run a step regardless of previous failures?', 'Use if: always() — runs the step even if previous steps failed or the workflow was cancelled.')],
  R(10,35,140,25,'#0070f3','','Push to main?','Deploy') +
  R(10,65,140,25,'#28a745','','Push to feature?','Skip deploy') +
  R(10,95,140,25,'#ffc107','','PR opened?','Notify') +
  R(10,125,140,25,'#dc3545','','Schedule?','Nightly tests') +
  T(240,170,'Conditional Execution: if keyword with expressions. Status functions: success(), failure(), always(), cancelled().',9,'#666','middle'),
  [e('Conditional Steps', 'Run steps conditionally.', codeBlock(['jobs:', '  deploy:', '    if: github.ref == \'refs/heads/main\'', '    runs-on: ubuntu-latest', '    steps:', '      - run: ./deploy.sh', '      - name: Notify on failure', '        if: failure()', '        run: ./notify.sh']))],
  [m('What expression always evaluates to true?', ['success()', 'failure()', 'always()', 'cancelled()'], 2, 'always() returns true regardless of previous step status — use for cleanup tasks that must always run.')]
);

/* Complete CI/CD Pipeline Example */
compactTopic('github-actions-complete-cicd', 'Complete CI/CD Pipeline with GitHub Actions', 'advanced', 45,
  ['A complete CI/CD pipeline in GitHub Actions covers the full lifecycle: code commit, build, test, security scan, deploy, and monitor.', 'The pipeline uses matrix builds for cross-platform testing, caching for speed, secrets for security, and environments for deployment control.', 'Key stages: Checkout, Install dependencies, Lint, Unit tests, Integration tests, Security scan, Build, Upload artifacts, Deploy to staging, E2E tests, Deploy to production, Notify team.', 'Environment protection rules ensure deployments require approval for production. Artifacts pass build outputs between jobs.', 'The entire pipeline is defined in a single .github/workflows/ci-cd.yml file, making it version-controlled, reviewable, and reproducible.'],
  'A complete CI/CD pipeline with GitHub Actions is like an automated factory assembly line for your software. When a developer pushes code, the pipeline automatically: checks code quality, runs tests, builds the application, scans for security issues, deploys to staging for validation, and finally deploys to production with manual approval gates. Every step is visible, auditable, and automated.',
  [d('Pipeline Architecture', 'The pipeline is organized into sequential and parallel jobs connected by the needs keyword. Build and lint run in parallel first. Tests depend on build. Security scan runs in parallel with tests. Deploy to staging depends on tests passing. E2E tests validate the staging deployment. Production deploy awaits manual approval via environment protection rules. Artifacts share build outputs between jobs.'),
   d('Stage 1: Quality & Build', 'On every push and PR: Checkout code with actions/checkout@v4. Install dependencies with npm ci (fast, deterministic). Run linter with npm run lint. Run unit tests with npm test. Build the application. Upload build artifacts with actions/upload-artifact@v4. Cache node_modules with actions/cache@v4 for faster subsequent runs.'),
   d('Stage 2: Testing & Security', 'Integration tests run against real dependencies (service containers for databases). Security scanning with CodeQL or third-party actions. Dependency vulnerability check with npm audit or Dependabot. SAST (Static Application Security Testing) for code vulnerabilities. Secrets scanning to prevent credential leaks.'),
   d('Stage 3: Deployment', 'Staging deployment: automatic on successful tests. Uses environment with branch restriction (develop only). Smoke tests verify the deployment. E2E tests with Playwright or Cypress against staging URL. Production deployment: requires manual approval from designated reviewers via environment protection rules. Deployment URL shown in GitHub UI for easy access.'),
   d('Monitoring & Notifications', 'Slack/Discord/email notifications on pipeline status. Deployment status badges in README. GitHub Deployment dashboard tracks all deployments. Rollback trigger via workflow_dispatch with previous version. Alerts on failure with links to failing step logs.'),
   d('CI/CD Workflow YAML', 'The workflow file defines all jobs with their dependencies. Uses strategy matrix for Node.js versions 18 and 20 on ubuntu-latest. Environment production has required reviewers (2 people) and 10-minute wait timer. Secrets passed via GitHub Secrets for Docker registry, cloud credentials, and notification tokens.')],
  [q('What are the main stages of a complete CI/CD pipeline?', 'Code quality (lint, unit tests), build, security scan, integration tests, deploy to staging, E2E tests, deploy to production, notify team.'),
   q('How are artifacts shared between jobs?', 'Use actions/upload-artifact in the build job and actions/download-artifact in dependent jobs. Artifacts persist across jobs in the same workflow run.'),
   q('What is the purpose of environment protection rules?', 'They enforce governance: required reviewers must approve production deployments, wait timer staggers traffic, and branch restriction limits which branches can deploy.'),
   q('How does the pipeline handle different Node.js versions?', 'Using strategy matrix: matrix.node [18, 20] runs the same job across both versions in parallel.'),
   q('What notifications does the pipeline send?', 'Slack/Discord messages on success, failure, and deployment status. Some teams also send email alerts for production failures.')],
  R(10,20,150,22,'#6f42c1','','Push/PR Code','Trigger event') +
  A(160,31,175,31) +
  R(185,10,140,22,'#0070f3','','Quality','Lint + Unit tests') +
  R(185,35,140,22,'#28a745','','Build','npm ci + build') +
  A(325,21,340,21) +
  R(350,10,140,22,'#ffc107','','Security Scan','CodeQL + audit') +
  A(325,46,340,46) +
  R(185,65,140,22,'#dc3545','','Integration Tests','Service containers') +
  A(325,76,340,76) +
  R(350,65,140,22,'#20c997','','Deploy Staging','Auto on success') +
  A(490,76,505,76) +
  R(185,95,160,22,'#fd7e14','','E2E Tests','Playwright/Cypress') +
  A(345,106,360,106) +
  R(185,125,160,22,'#e83e8c','','Deploy Production','Manual approval') +
  A(345,136,360,136) +
  R(185,155,160,22,'#17a2b8','','Notify','Slack/Email') +
  T(100,195,'Complete CI/CD Pipeline: Quality → Build → Test → Security → Stage → E2E → Production → Notify. Every step automated with governance gates.',9,'#666','middle'),
  [e('Complete Workflow YAML', 'Full CI/CD pipeline definition.', codeBlock(['name: Complete CI/CD Pipeline', '', 'on:', '  push:', '    branches: [main, develop]', '  pull_request:', '    branches: [main]', '', 'env:', '  NODE_VERSION: \"20\"', '', 'jobs:', '  quality:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '      - uses: actions/setup-node@v4', '        with:', '          node-version: $\{\{ env.NODE_VERSION \}\}', '      - uses: actions/cache@v4', '        with:', '          path: ~/.npm', '          key: $\{\{ runner.os \}\}-npm-$\{\{ hashFiles(\"**/package-lock.json\") \}\}', '      - run: npm ci', '      - run: npm run lint', '      - run: npm test', '', '  security:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '      - name: Initialize CodeQL', '        uses: github/codeql-action/init@v3', '      - name: Perform CodeQL Analysis', '        uses: github/codeql-action/analyze@v3', '', '  build:', '    runs-on: ubuntu-latest', '    needs: [quality]', '    steps:', '      - uses: actions/checkout@v4', '      - run: npm ci', '      - run: npm run build', '      - uses: actions/upload-artifact@v4', '        with:', '          name: build-output', '          path: dist/', '', '  test-e2e:', '    runs-on: ubuntu-latest', '    needs: [build]', '    services:', '      postgres:', '        image: postgres:16', '        env:', '          POSTGRES_PASSWORD: test', '    steps:', '      - uses: actions/checkout@v4', '      - run: npm ci', '      - run: npm run test:e2e', '', '  deploy-staging:', '    runs-on: ubuntu-latest', '    needs: [build, security, test-e2e]', '    if: github.ref == \"refs/heads/develop\"', '    environment:', '      name: staging', '      url: https://staging.example.com', '    steps:', '      - uses: actions/download-artifact@v4', '        with:', '          name: build-output', '      - run: ./deploy.sh staging', '', '  deploy-production:', '    runs-on: ubuntu-latest', '    needs: [deploy-staging]', '    if: github.ref == \"refs/heads/main\"', '    environment:', '      name: production', '      url: https://app.example.com', '    steps:', '      - uses: actions/download-artifact@v4', '        with:', '          name: build-output', '      - run: ./deploy.sh production', '', '  notify:', '    runs-on: ubuntu-latest', '    needs: [deploy-production, deploy-staging]', '    if: always()', '    steps:', '      - name: Slack Notification', '        run: |', '          if [ \"$\{\{ job.status \}\}\" = \"success\" ]; then', '            echo \"Deployment succeeded\"', '          else', '            echo \"Deployment failed\"', '          fi']), 'Complete CI/CD workflow demonstrating all stages from code push to production deployment with security scanning and notifications.')],
  [m('What is the purpose of the needs keyword in jobs?', ['Runs all jobs in parallel', 'Defines job dependencies and execution order', 'Skips jobs randomly', 'Duplicates jobs'], 1, 'The needs keyword creates a dependency graph — a job only runs after all its specified dependencies complete successfully. This defines the pipeline execution order.'), m('What is the benefit of using environment protection rules for production?', ['Faster deployments', 'Required approvals prevent unauthorized deployments', 'Reduces server costs', 'Increases test coverage'], 1, 'Environment protection rules ensure governance: required reviewers must approve, which prevents accidental or unauthorized production deployments.'), m('What does the services keyword provide in a job?', ['Installs system packages', 'Runs service containers (like databases) for testing', 'Deploys to cloud', 'Manages secrets'], 1, 'The services keyword runs Docker containers alongside the job, commonly used for databases (PostgreSQL, MySQL) needed during integration tests.'), m('What is the purpose of actions/upload-artifact?', ['Cache dependencies', 'Share build outputs between jobs', 'Deploy to production', 'Run tests'], 1, 'upload-artifact saves files (like build output) that can be downloaded in subsequent jobs using download-artifact, enabling cross-job data sharing.'), m('What happens when a job uses if: always()?', ['Runs only on success', 'Runs regardless of previous job statuses', 'Never runs', 'Runs only on failure'], 1, 'if: always() ensures a job runs no matter what — useful for cleanup and notification steps that must execute even after failures.')]
);

// ---- PAD TOPICS ----
var padTopics = require('../pad-topics');
padTopics(topics);

// ---- GENERATE ----
var dataDir = __dirname;
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["github-actions"] = TOPICS_DATA["github-actions"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["github-actions"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));
fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));
console.log('Generated GitHub Actions topics: ' + Object.keys(topics).length);


