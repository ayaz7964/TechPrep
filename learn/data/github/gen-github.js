const fs = require('fs');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: (description||'').replace(/'/g,"\\'") }; }
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

function compactTopic(id, title, diff, mins, tldr, layman, deeps, qas, svg, codes, mcqs) {
  addTopic(id, title, diff, mins, tldr, layman, deeps, '', qas, svg, codes, mcqs);
}

/* GitHub Basics */
compactTopic('github-basics', 'GitHub Basics', 'beginner', 15,
  ['GitHub is a web-based platform for version control using Git, providing hosting, collaboration, and social coding features.', 'Core features: repositories, pull requests, issues, actions, pages, wikis, discussions.', 'GitHub adds a web UI, access control, and collaboration tools on top of Git.'],
  'GitHub is like a social network for code. It hosts your Git repositories in the cloud, lets you collaborate with others, review changes, track bugs, and automate workflows. Think of it as Google Drive for developers, but much more powerful.',
  [d('Repository Features', 'Public repos (open source), private repos, internal repos. README.md auto-displayed on repo page. License files, contributing guidelines, issue/PR templates. Repository topics and descriptions for discoverability. GitHub Pages for hosting.'),
   d('Collaboration Model', 'Fork + Pull Request model (open source). Shared repository model (teams). Code owners for auto-requesting reviews (CODEOWNERS file). Branch protection rules. Required status checks.'),
   d('GitHub Ecosystem', 'GitHub Actions (CI/CD), GitHub Pages (hosting), GitHub Packages (registry), GitHub Codespaces (cloud IDE), GitHub Mobile, GitHub CLI (gh), GitHub Desktop, GitHub API, GitHub Marketplace.')],
  [q('What is GitHub?', 'A web-based Git repository hosting service with collaboration features like PRs, issues, and Actions.'),
   q('What is the fork + PR model?', 'Fork a repo to your account, make changes, submit a pull request to the original repo for review and merge.'),
   q('What are GitHub Pages?', 'Free static site hosting directly from a GitHub repository.')],
  R(10,35,140,25,'#0070f3','','Repositories','Host Git repos') +
  R(10,65,140,25,'#28a745','','Pull Requests','Review & merge') +
  R(10,95,140,25,'#ffc107','','Actions','CI/CD automation') +
  R(10,125,140,25,'#dc3545','','Issues','Bug tracking') +
  R(160,35,140,25,'#e83e8c','','Pages','Static hosting') +
  R(160,65,140,25,'#6610f2','','Wiki','Documentation') +
  R(160,95,140,25,'#17a2b8','','Discussions','Community') +
  T(240,175,'GitHub: Web-based Git platform with collaboration, CI/CD, hosting, and social coding.',9,'#666','middle'),
  [e('GitHub CLI', 'Interact with GitHub from terminal.', codeBlock(['gh repo create my-project', 'gh pr create --title "My PR"', 'gh issue list']))],
  [m('What is the fork + PR model used for?', ['Personal projects', 'Open source contributions', 'Enterprise deployment', 'Database management'], 1, 'The fork + PR model is the standard way to contribute to open source projects on GitHub.')]
);

/* Repositories */
compactTopic('github-repos', 'GitHub Repositories', 'beginner', 15,
  ['A GitHub repository is a container for a Git project, including all files, history, and collaboration settings.', 'Repo settings: visibility (public/private/internal), README, .gitignore, license, topics, description.', 'Key files: README.md, LICENSE, CONTRIBUTING.md, .gitignore, CODEOWNERS, issue/PR templates.'],
  'A GitHub repo is like a project folder with superpowers. Beyond storing code, it has settings for who can see it, how to contribute, what license applies, automated testing, and even a website. The README is the front page that greets visitors.',
  [d('Repository Settings', 'Visibility: public (anyone), private (invited only), internal (enterprise). Features: Issues, Projects, Wiki, Discussions, Sponsorships. Branch protection rules. Webhooks. Deploy keys. Secrets (Actions). Pages configuration.'),
   d('Repository Files', 'README.md: project documentation (rendered as homepage). CONTRIBUTING.md: contribution guidelines. CODE_OF_CONDUCT.md: behavior rules. LICENSE: open source license. .github/: templates and workflows directory. FUNDING.yml: sponsor links.')],
  [q('What are the three visibility levels?', 'Public (anyone), Private (invited only), Internal (org members, GitHub Enterprise).'),
   q('What is the purpose of README.md?', 'It is the front page of the repository, showing documentation, setup instructions, and project info.')],
  R(10,35,140,25,'#0070f3','','Public','Anyone can see') +
  R(10,65,140,25,'#28a745','','Private','Invited only') +
  R(10,95,140,25,'#ffc107','','Internal','Org members') +
  R(160,35,200,25,'#e83e8c','','README.md','Front page of repo') +
  T(240,140,'GitHub Repositories: Containers for Git projects with visibility, settings, and collaboration features.',9,'#666','middle'),
  [e('Create Repo', 'CLI and web commands.', codeBlock(['gh repo create my-project --public', 'gh repo create --private my-project']))],
  [m('What is the default branch name on GitHub?', ['master', 'main', 'default', 'primary'], 1, 'GitHub\'s default branch name is main (changed from master in 2020).')]
);

/* Pull Requests */
compactTopic('github-pull-requests', 'Pull Requests', 'intermediate', 20,
  ['A Pull Request (PR) proposes changes from one branch to another, enabling code review and discussion before merging.', 'PR workflow: create branch, make changes, push, open PR, review, approve, merge.', 'PR features: diff view, inline comments, review requests, checks/status, merge methods.'],
  'A Pull Request is like saying "I made these changes, please review and add them to the main project." It\'s a formal request with a diff showing exactly what changed, space for discussion, automated checks, and approval workflow before the changes are merged.',
  [d('PR Lifecycle', 'Draft PR: work in progress, not ready for review. Open PR: ready for review. Review: reviewers leave comments and approve/reject. Merge: changes are incorporated. Close: PR is closed without merging. Reopen: closed PR can be reopened.'),
   d('Merge Methods', 'Merge commit: creates a merge commit (preserves all history). Squash and merge: combines all PR commits into one. Rebase and merge: rebases commits onto base branch (linear history). Configure per-repository or per-PR.'),
   d('PR Best Practices', 'Small, focused PRs (200-400 lines max). Descriptive title and description. Link to issues (Fixes #123). Request specific reviewers. Add labels (bug, feature, enhancement). Keep PR up to date with base branch. Respond to review comments promptly.')],
  [q('What is a Pull Request?', 'A proposal to merge changes from one branch into another, with code review and discussion capabilities.'),
   q('What are the three merge methods?', 'Merge commit, Squash and merge, Rebase and merge.'),
   q('What is a draft PR?', 'A PR marked as work in progress, not yet ready for review.')],
  R(10,35,140,25,'#0070f3','','Create Branch','Feature work') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Open PR','Propose changes') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Code Review','Review & discuss') +
  R(10,65,140,25,'#dc3545','','Merge','Combine changes') +
  R(10,95,140,25,'#e83e8c','','Deploy','Ship to production') +
  T(240,150,'Pull Requests: Propose, review, and merge code changes. Central to GitHub collaboration.',9,'#666','middle'),
  [e('Create PR via CLI', 'Open PR from terminal.', codeBlock(['gh pr create --title "Add login" --body "Implements user login flow"', 'gh pr review --approve', 'gh pr merge --squash']))],
  [m('What is the recommended PR size?', ['1000+ lines', '200-400 lines', '50 lines max', 'As large as possible'], 1, 'Small, focused PRs (200-400 lines) are easier to review and less likely to introduce bugs.')]
);

/* Code Reviews */
compactTopic('github-code-reviews', 'Code Reviews', 'intermediate', 20,
  ['Code reviews are systematic examinations of code changes by other developers before merging.', 'GitHub review features: inline comments, line-specific feedback, suggested changes, approval/rejection.', 'Review types: single comment (general), approve (looks good), request changes (must fix).'],
  'Code review is like having a colleague proofread your work before submitting it. They can comment on specific lines, suggest improvements, catch bugs, and approve or request changes. It\'s a quality gate that catches issues early and spreads knowledge across the team.',
  [d('Review Workflow', 'Open PR → Request reviewers → Reviewers get notified → Reviewer examines diff → Leave comments/approve/reject → Author addresses feedback → Re-review if needed → Merge. Review assignments: manual, CODEOWNERS auto-assign, team reviews.'),
   d('Review Types', 'Approve: changes are ready to merge. Comment: general feedback without blocking. Request changes: must be addressed before merge. Dismiss: admin can dismiss a review. Re-request review: after addressing feedback.'),
   d('Best Practices', 'Review within 24 hours. Be specific and constructive. Explain why, not just what. Use "nit" for minor style suggestions. Approve with confidence or request changes. Automate style/lint checks. Review in small batches. Focus on logic, not formatting.')],
  [q('What are the three review types?', 'Approve, Comment, Request Changes.'),
   q('What is CODEOWNERS?', 'A file that defines individuals or teams responsible for code in specific paths, auto-requesting their review.'),
   q('What is a "nit" in code review?', 'A minor, non-blocking suggestion (e.g., style preference, naming).')],
  R(10,35,140,25,'#0070f3','','Author','Opens PR') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Reviewer','Examines diff') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Feedback','Comments/suggestions') +
  R(10,65,140,25,'#dc3545','','Author','Addresses feedback') +
  R(10,95,140,25,'#e83e8c','','Merge','Changes approved') +
  T(240,150,'Code Reviews: Systematic examination of code changes. Quality gate and knowledge sharing.',9,'#666','middle'),
  [e('Review PR via CLI', 'Review and approve.', codeBlock(['gh pr checkout 42', 'gh pr review --approve', 'gh pr review -r "Please fix typo"']))],
  [m('What does CODEOWNERS do?', ['Tracks code ownership', 'Auto-requests reviews from specific users/teams', 'Prevents commits', 'Generates reports'], 1, 'CODEOWNERS auto-assigns review requests to individuals or teams responsible for specific files/directories.')]
);

/* Branch Protection */
compactTopic('github-branch-protection', 'Branch Protection Rules', 'intermediate', 20,
  ['Branch protection rules enforce workflows on specific branches, preventing direct pushes and requiring PR reviews.', 'Require pull request reviews before merging. Require status checks to pass. Require up-to-date branches. Restrict who can push.', 'Best practice: protect main/develop branches. Never allow direct commits to protected branches.'],
  'Branch protection is like a security guard for your main branch. It enforces rules: "Nobody can push directly. All changes must go through a PR. At least one person must approve. All tests must pass. The branch must be up to date." This prevents accidents and ensures quality.',
  [d('Protection Rules', 'Require PR review: 1+ approvals required. Dismiss stale reviews: outdated approvals removed when new commits pushed. Require approval of most recent reviewable push. Require status checks: CI/tests must pass. Require branches up to date. Require conversation resolution. Include administrators.'),
   d('Advanced Rules', 'Require signed commits. Require linear history (no merge commits). Require deployment success (GitHub Deployments). Lock branch: make read-only. Restrict push access: specific users/teams. Allow force pushes: restrict to specific users. Allow deletions.'),
   d('Status Checks', 'CI checks: GitHub Actions, Jenkins, Travis. Context labels: "continuous-integration/jenkins". Required checks must pass before merge. Checks can be: pending (running), success, failure, error, cancelled. A failed check blocks merging.')],
  [q('What does branch protection enforce?', 'Rules like required PR reviews, passing status checks, up-to-date branches, and restricted push access.'),
   q('Can admins bypass branch protection?', 'By default, Include Administrators applies protection rules to admins too (can be disabled).'),
   q('What happens if a required status check fails?', 'The merge button is disabled until the check passes.')],
  R(10,35,140,25,'#0070f3','','Require PR Review','1+ approvals') +
  R(10,65,140,25,'#28a745','','Status Checks','CI must pass') +
  R(10,95,140,25,'#ffc107','','Up-to-Date','Branch must be current') +
  R(10,125,140,25,'#dc3545','','Restrict Push','Specific users only') +
  T(240,175,'Branch Protection: Enforce workflows on branches. Prevent direct pushes. Require reviews and checks.',9,'#666','middle'),
  [e('Branch Protection (API)', 'Configure via GitHub CLI.', codeBlock(['gh api repos/:owner/:repo/branches/main/protection --method PUT --input protection.json']))],
  [m('What happens when a required status check fails?', ['PR is automatically closed', 'Merge button is disabled', 'Branch is deleted', 'PR can still be merged'], 1, 'Failed required status checks disable the merge button until they pass.')]
);

/* GitHub Issues */
compactTopic('github-issues', 'GitHub Issues', 'beginner', 15,
  ['GitHub Issues track bugs, feature requests, tasks, and discussions related to a repository.', 'Each issue has: title, description, assignees, labels, milestone, project, comments, and reactions.', 'Issues integrate with PRs, projects, and can be automated via Actions and GitHub Apps.'],
  'GitHub Issues is like a to-do list and bug tracker combined. You create cards for things that need to be done — bug reports, feature requests, questions. Each card can be assigned to someone, labeled, put in a milestone, and linked to a specific PR that fixes it.',
  [d('Issue Components', 'Labels: bug, enhancement, question, help wanted, good first issue (customizable). Milestones: group issues for a release/version. Assignees: who is working on it. Projects: kanban board organization. Issue templates: bug report, feature request, custom forms.'),
   d('Issue Best Practices', 'Search before creating (avoid duplicates). Use descriptive titles. Follow issue templates. Link related issues (#123). Reference commits/PRs. Use labels for categorization. Close with reason. Automate with Actions.'),
   d('Issue References', 'Fixes #123 — auto-closes issue when PR merges. Resolves, Closes, Fixes are keywords. Refs #123 — links without closing. Mention @user for attention. Commit message: "Fixes #123: description" auto-closes.')],
  [q('What are GitHub Issues?', 'Items for tracking bugs, feature requests, tasks, and discussions within a repository.'),
   q('How to auto-close an issue with a PR?', 'Include "Fixes #123" or "Closes #123" in the PR description or commit message.'),
   q('What is a milestone in Issues?', 'A way to group issues and PRs for a specific release or sprint.')],
  R(10,35,110,25,'#0070f3','','Open Issue','Report bug/feature') +
  A(120,48,140,48) +
  R(150,35,110,25,'#28a745','','Add Labels','Categorize') +
  R(150,65,110,25,'#ffc107','','Assign','Who owns it') +
  R(150,95,110,25,'#dc3545','','Milestone','Track progress') +
  R(10,65,110,25,'#e83e8c','','PR Fixes #123','Auto-close on merge') +
  T(240,150,'GitHub Issues: Track bugs, features, and tasks. Integrate with PRs and projects for full workflow management.',9,'#666','middle'),
  [e('Create Issue via CLI', 'Create and list issues.', codeBlock(['gh issue create --title "Bug: login fails" --label bug', 'gh issue list --assignee @me']))],
  [m('What keyword auto-closes an issue when a PR merges?', ['Refs #123', 'Fixes #123', 'See #123', 'Issue #123'], 1, '"Fixes #123" (or "Closes"/"Resolves") auto-closes the referenced issue when the PR merges.')]
);

/* GitHub Actions Basics */
compactTopic('github-actions-basics', 'GitHub Actions Basics', 'intermediate', 25,
  ['GitHub Actions is a CI/CD and automation platform built into GitHub, using YAML workflow files.', 'Workflows: automated processes triggered by events (push, PR, schedule). Jobs: groups of steps running on the same runner. Steps: individual commands or actions.', 'Actions are reusable units of automation shared via the Marketplace.'],
  'GitHub Actions is like having a robot assistant that automatically does tasks when things happen in your repo. When you push code, it can run tests. When someone opens a PR, it can check code quality. When you create a release, it can deploy. You configure everything in YAML files.',
  [d('Workflow Structure', '.github/workflows/*.yml: workflow files. name: workflow name. on: trigger events (push, pull_request, schedule, workflow_dispatch). jobs: define jobs with runner (ubuntu-latest, windows-latest). steps: run actions or shell commands. Uses: actions/checkout@v4 (check out code), actions/setup-node@v4 (setup Node).'),
   d('Trigger Events', 'push, pull_request, schedule (cron), workflow_dispatch (manual), release, issues, discussion, page_build, repository_dispatch. Filter by branches: on: push: branches: [main]. Paths: paths: [src/**]. Activity types: types: [opened, synchronize, reopened].'),
   d('Runners', 'GitHub-hosted: Ubuntu, Windows, macOS. Self-hosted: run on your own infrastructure. Runner groups for access control. Labels for selecting runner types. Matrix strategy: test across multiple OS/versions simultaneously.')],
  [q('What is GitHub Actions?', 'A CI/CD and automation platform built into GitHub, configured via YAML workflow files.'),
   q('Where are workflow files stored?', 'In .github/workflows/ directory as .yml files.'),
   q('What is a runner?', 'A virtual machine or container that executes workflow jobs. Can be GitHub-hosted or self-hosted.')],
  R(10,35,140,25,'#0070f3','','Event','Push / PR / Schedule') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Workflow','.github/workflows/*.yml') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Runner','Executes jobs') +
  R(10,65,140,25,'#dc3545','','Job','Group of steps') +
  R(10,95,140,25,'#e83e8c','','Step','Action or command') +
  T(240,150,'GitHub Actions: Event-driven automation. Trigger workflows on push, PR, schedule, and more.',9,'#666','middle'),
  [e('Basic Workflow', 'CI workflow example.', codeBlock(['name: CI', 'on: [push, pull_request]', 'jobs:', '  test:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '      - run: npm install && npm test']))],
  [m('Where are GitHub Actions workflow files located?', ['.github/workflows/', 'actions/', 'workflows/', 'config/'], 0, 'Workflow files are stored in the .github/workflows/ directory as .yml files.')]
);

/* GitHub Actions Advanced */
compactTopic('github-actions-advanced', 'GitHub Actions Advanced', 'advanced', 30,
  ['Advanced Actions features: matrix builds, caching, artifacts, environments, custom actions, reusable workflows.', 'Matrix strategy runs jobs across multiple OS/versions in parallel. Caching speeds up dependencies. Artifacts share files between jobs.'],
  'Advanced Actions is like having a full factory automation system. You can run tests on Windows, Mac, and Linux simultaneously (matrix), save downloaded packages so they don\'t re-download every time (caching), pass build results between stages (artifacts), and create your own custom robots (custom actions).',
  [d('Matrix Strategy', 'matrix.os: [ubuntu-latest, windows-latest, macos-latest]. matrix.node: [16, 18, 20]. Creates NxM job combinations. Exclude specific combinations: exclude: - os: windows node: 16. Include for additional configurations.'),
   d('Caching', 'actions/cache@v4: cache dependencies by hash of lockfile. Keys: key: ${{ runner.os }}-node-${{ hashFiles(\'**/package-lock.json\') }}. Restore keys for partial matches. Cache npm, pip, Maven, Gradle, Docker layers.'),
   d('Artifacts and Environments', 'actions/upload-artifact@v4: share build outputs between jobs. actions/download-artifact@v4: download in later jobs. Environments: deployment environments with protection rules. Review required before deployment to production environment.'),
   d('Custom Actions and Reusable Workflows', 'Docker container action: Dockerfile with custom logic. JavaScript action: Node.js action. Composite action: combine multiple steps. Reusable workflows: call one workflow from another using workflow_call trigger.')],
  [q('What is a matrix build?', 'Testing across multiple OS and version combinations in parallel, generating NxM job combinations.'),
   q('How does caching work in Actions?', 'actions/cache saves and restores files (like node_modules) based on a key derived from lockfile hash.'),
   q('What are reusable workflows?', 'Workflows that can be called from other workflows, avoiding duplication.')],
  R(10,35,140,25,'#0070f3','','Matrix','Multi-OS + versions') +
  R(10,65,140,25,'#28a745','','Cache','Speed up deps') +
  R(10,95,140,25,'#ffc107','','Artifacts','Share files between jobs') +
  R(10,125,140,25,'#dc3545','','Environments','Deploy with approval') +
  T(240,175,'Advanced Actions: Matrix builds, caching, artifacts, environments, custom actions, reusable workflows.',9,'#666','middle'),
  [e('Matrix Workflow', 'Test across OS and Node versions.', codeBlock(['jobs:', '  test:', '    strategy:', '      matrix:', '        os: [ubuntu-latest, windows-latest]', '        node: [16, 18, 20]', '    runs-on: ${{ matrix.os }}', '    steps:', '      - uses: actions/setup-node@v4', '        with:', '          node-version: ${{ matrix.node }}']))],
  [m('What is the purpose of actions/cache?', ['Store build artifacts', 'Speed up workflows by caching dependencies', 'Cache Git history', 'Store environment variables'], 1, 'actions/cache speeds up workflows by saving and restoring dependencies (like node_modules) based on a cache key.')]
);

/* GitHub Pages */
compactTopic('github-pages', 'GitHub Pages', 'beginner', 15,
  ['GitHub Pages is a free static site hosting service that serves HTML, CSS, and JavaScript files directly from a GitHub repository.', 'Types: user/organization site (username.github.io), project site (username.github.io/repo).', 'Supports Jekyll static site generator, custom domains, and HTTPS.'],
  'GitHub Pages is like free website hosting included with every repo. Push HTML files to a specific branch (gh-pages) or folder (docs/), and GitHub serves them as a website. Perfect for project documentation, portfolios, and personal blogs.',
  [d('Site Types', 'User/Org: username.github.io — one per account, from main branch. Project: username.github.io/repo — from gh-pages branch or /docs folder. Custom domain: configure CNAME or A record in repo settings. Enforce HTTPS: automatically enabled for GitHub subdomains, optional for custom domains.'),
   d('Building with Jekyll', 'Jekyll is a static site generator integrated with Pages. Gemfile and _config.yml for configuration. Markdown posts in _posts/. Themes: remote_theme in config. GitHub Actions can also deploy to Pages (modern approach).')],
  [q('What are the two types of GitHub Pages sites?', 'User/Organization site (username.github.io) and Project site (username.github.io/repo).'),
   q('Can GitHub Pages use a custom domain?', 'Yes — configure a CNAME or A record in repo Settings > Pages.'),
   q('What static site generator is built-in?', 'Jekyll — processes Markdown and layouts automatically.')],
  R(10,35,140,25,'#0070f3','','Push Code','HTML/CSS/JS files') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','GitHub Pages','Serves as website') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Live Site','yourname.github.io') +
  T(240,110,'GitHub Pages: Free static hosting from your repository. Supports Jekyll and custom domains.',9,'#666','middle'),
  [e('Deploy to Pages', 'GitHub Actions workflow for Pages.', codeBlock(['- name: Deploy to Pages', '  uses: actions/deploy-pages@v4']))],
  [m('Where are project Pages files served from?', ['main branch', 'gh-pages branch or /docs folder', 'master branch', 'build/ folder'], 1, 'Project Pages are served from the gh-pages branch or the /docs folder in the main branch.')]
);

/* GitHub Wikis */
compactTopic('github-wikis', 'GitHub Wikis', 'beginner', 10,
  ['GitHub Wikis provide a space for collaborative documentation within a repository.', 'Wikis are separate Git repositories (with their own history) that can be edited via the web UI or cloned locally.', 'Supports Markdown, reStructuredText, and other markup formats. Sidebar and footer for navigation.'],
  'A GitHub Wiki is like a mini-wikipedia for your project. It\'s a separate Git repo for documentation that anyone with access can edit. You can clone it, edit locally, push changes, and use the web editor — just like regular code.',
  [d('Wiki Features', 'Separate Git repo (repo.wiki.git). Markdown support. Sidebar (_Sidebar.md) for navigation. Footer (_Footer.md) for page footer. Revision history for each page. Create, edit, delete pages via web UI. Clone locally: git clone https://github.com/user/repo.wiki.git.'),
   d('When to Use Wiki vs README', 'README: quickstart, installation, basic usage (front page). Wiki: comprehensive documentation, guides, FAQs, API docs. Consider: GitHub Pages for more control, GitHub Discussions for Q&A.')],
  [q('What is a GitHub Wiki?', 'A collaborative documentation space for a repository, stored as a separate Git repo.'),
   q('How is the Wiki repo cloned?', 'git clone https://github.com/user/repo.wiki.git')],
  R(10,35,140,25,'#0070f3','','Wiki Repo','repo.wiki.git') +
  R(10,65,140,25,'#28a745','','_Sidebar.md','Navigation') +
  R(10,95,140,25,'#ffc107','','Pages','Markdown docs') +
  T(240,140,'GitHub Wikis: Collaborative documentation. Separate Git repo. Markdown support. Sidebar & footer navigation.',9,'#666','middle'),
  [e('Clone Wiki', 'Edit wiki locally.', codeBlock(['git clone https://github.com/user/repo.wiki.git', 'cd repo.wiki', 'echo "# Home" > Home.md', 'git add . && git commit -m "Update home"']))],
  [m('How is a GitHub Wiki stored?', ['As part of the main repo', 'As a separate Git repository', 'In a database', 'In the cloud'], 1, 'Each Wiki is a separate Git repository at repo.wiki.git, with its own commit history.')]
);

/* GitHub Security */
compactTopic('github-security', 'GitHub Security', 'intermediate', 20,
  ['GitHub provides security features to protect code, dependencies, and the supply chain.', 'Dependabot: automated dependency updates and security alerts. Secret scanning: detect committed secrets. Code scanning: identify vulnerabilities.'],
  'GitHub Security is like having a team of security guards for your code. Dependabot watches your dependencies and alerts you about known vulnerabilities. Secret scanning checks for accidentally committed passwords or API keys. Code scanning analyzes code for security flaws.',
  [d('Dependabot', 'Dependabot alerts: notifies about vulnerable dependencies. Dependabot security updates: automatically creates PRs to fix vulnerabilities. Dependabot version updates: keeps dependencies up to date. Configured via dependabot.yml. Supports npm, pip, Maven, Docker, GitHub Actions, and more.'),
   d('Secret Scanning', 'Detects supported secrets: AWS keys, GitHub tokens, npm tokens, Slack tokens, etc. Custom patterns for organization-specific secrets. Push protection: blocks commits containing secrets. Alerts: notifies when secrets are detected.'),
   d('Code Scanning', 'Powered by CodeQL and third-party tools. CodeQL: semantic code analysis engine. Identifies: SQL injection, XSS, path traversal, command injection, insecure crypto. Runs on each push or on schedule. Results shown in Security tab and PR checks.'),
   d('Security Overview', 'Dependency graph: visualize dependencies and their vulnerabilities. Advisory database: GitHub Security Advisories. Private vulnerability reporting: researchers report privately. Security policies: SECURITY.md for reporting instructions.')],
  [q('What is Dependabot?', 'An automated tool that monitors dependencies, alerts about vulnerabilities, and creates PRs to update them.'),
   q('What does secret scanning detect?', 'Committed secrets like API keys, tokens, passwords from known providers.'),
   q('What is CodeQL?', 'A semantic code analysis engine for identifying security vulnerabilities in code.')],
  R(10,35,140,25,'#0070f3','','Dependabot','Auto-update deps') +
  R(10,65,140,25,'#28a745','','Secret Scanning','Find leaked secrets') +
  R(10,95,140,25,'#ffc107','','Code Scanning','CodeQL analysis') +
  R(10,125,140,25,'#dc3545','','Push Protection','Block secrets in commits') +
  T(240,175,'GitHub Security: Dependabot, secret scanning, code scanning, and supply chain security features.',9,'#666','middle'),
  [e('Dependabot Config', 'dependabot.yml example.', codeBlock(['version: 2', 'updates:', '  - package-ecosystem: "npm"', '    directory: "/"', '    schedule:', '      interval: "weekly"']))],
  [m('What does Dependabot do?', ['Delete vulnerable code', 'Monitor and auto-update dependencies', 'Scan for secrets', 'Analyze code quality'], 1, 'Dependabot monitors dependencies for vulnerabilities and automatically creates PRs to update them.')]
);

/* GitHub CLI & Desktop */
compactTopic('github-cli', 'GitHub CLI & Desktop', 'beginner', 15,
  ['GitHub CLI (gh) brings GitHub to the terminal, enabling repo management, PRs, issues, Actions, and more without leaving the command line.', 'GitHub Desktop provides a visual Git client for those who prefer GUI over command line.', 'Both tools complement the web interface for different workflows.'],
  'GitHub CLI is like having GitHub in your terminal. Create repos, open PRs, review code, run Actions — all without opening a browser. GitHub Desktop is a visual app that makes Git easier with a graphical interface for commits, branches, and syncing.',
  [d('GitHub CLI (gh)', 'gh repo create: create repos. gh pr create: open PRs. gh pr review: review PRs. gh issue list/view/create. gh run list/watch: monitor Actions. gh release create: create releases. gh auth login: authenticate. Supports HTTPS and SSH. Tab completion available.'),
   d('GitHub Desktop', 'Visual diff viewer. Branch management. Commit with staging areas. Sync with remote. External editor integration (VS Code, IntelliJ). Conflict resolution UI. Repository cloning. Keyboard shortcuts. Available for Windows, macOS.'),
   d('Authentication', 'gh auth login: authenticate via browser or token. Token scopes: repo (private repos), workflow (Actions), admin:org (org management). SSH key setup: Settings > SSH and GPG keys. Personal Access Tokens (classic vs fine-grained).')],
  [q('What is the GitHub CLI command to create a PR?', 'gh pr create --title "Title" --body "Description"'),
   q('What is GitHub Desktop?', 'A visual Git client application for managing repositories without using the command line.'),
   q('How do you authenticate gh CLI?', 'gh auth login — supports browser-based OAuth and personal access token authentication.')],
  R(10,35,140,25,'#0070f3','','gh CLI','Terminal GitHub') +
  R(10,65,140,25,'#28a745','','Desktop','Visual Git client') +
  R(10,95,140,25,'#ffc107','','Web UI','Browser interface') +
  T(240,140,'GitHub CLI & Desktop: Access GitHub from terminal (gh) or visual app (Desktop) alongside the web interface.',9,'#666','middle'),
  [e('GitHub CLI Commands', 'Common gh commands.', codeBlock(['gh repo create my-project --private', 'gh pr create --fill', 'gh run list --limit 5', 'gh release create v1.0.0 --notes "Initial release"']))],
  [m('What does gh auth login do?', ['Creates a new GitHub account', 'Authenticates the CLI with GitHub', 'Logs out the current user', 'Generates an SSH key'], 1, 'gh auth login authenticates the GitHub CLI with your GitHub account via browser or token.')]
);

/* GitHub Organizations */
compactTopic('github-orgs', 'GitHub Organizations', 'intermediate', 15,
  ['GitHub Organizations are shared accounts for managing teams, repositories, and permissions at scale.', 'Org features: teams, roles, repository permissions, audit logs, SAML/SSO, billing management.', 'Best for companies and open source projects with multiple collaborators.'],
  'A GitHub Organization is like a company headquarters for code. Instead of having repos under individual accounts, they live under the org. You can group people into teams, give different permissions to different repos, see audit logs of who did what, and manage billing centrally.',
  [d('Organization Structure', 'Owners: full admin access. Members: belong to the org. Outside collaborators: access specific repos only. Teams: groups with shared permissions. Parent teams for hierarchy. Repo roles: Read, Triage, Write, Maintain, Admin.'),
   d('Security Features', 'SAML/SSO: single sign-on integration. OAuth app access policy. IP allow list. Audit log: 180-day retention (enterprise: longer). Required 2FA enforcement. Dependabot alerts. Secret scanning.'),
   d('Enterprise Features', 'Enterprise Managed Users: create/manage user accounts. Custom repository roles. Global branch protection rules. Enterprise audit log. Automatic user provisioning (SCIM).')],
  [q('What is a GitHub Organization?', 'A shared account for managing teams, repos, and permissions across multiple people/projects.'),
   q('What are the base roles in an org?', 'Owner (full access), Member (belongs to org), Outside Collaborator (repo-specific access).'),
   q('What is SAML SSO in GitHub?', 'Single Sign-On integration allowing users to authenticate via their company identity provider.')],
  R(10,35,140,25,'#0070f3','','Organization','Shared account') +
  R(10,65,140,25,'#28a745','','Teams','Group permissions') +
  R(10,95,140,25,'#ffc107','','Repos','Owned by org') +
  R(10,125,140,25,'#dc3545','','Members','Users with roles') +
  T(240,170,'GitHub Organizations: Manage teams, repos, permissions at scale. SAML SSO, audit logs, role-based access.',9,'#666','middle'),
  [e('Org CLI', 'Manage org via CLI.', codeBlock(['gh org list', 'gh api orgs/my-org/members']))],
  [m('What is an Outside Collaborator?', ['A user who left the org', 'A user with access to specific repos but not org membership', 'A bot account', 'An enterprise admin'], 1, 'Outside collaborators can access specific repositories without being members of the organization.')]
);

/* GitHub Gists */
compactTopic('github-gists', 'GitHub Gists', 'beginner', 10,
  ['Gists are simple, shareable code snippets that can be created from any GitHub account.', 'Public gists appear in search and Discover; secret gists are hidden (URL-only access).', 'Gists support: multiple files, revisions, embedding, cloning as Git repos, comments, and forking.'],
  'A Gist is like a sticky note for code. Need to share a quick code snippet with someone? Paste it in a Gist. It gets its own URL, syntax highlighting, and can be embedded in blog posts. Secret gists are private by obscurity (only people with the URL can see them).',
  [d('Gist Features', 'Markdown support (.md files render). Embed in websites via script tag. Clone as Git repo: git clone https://gist.github.com/hash.git. Revisions: full edit history. Comments: discussion on snippets. Forks: others can fork your gist.'),
   d('Use Cases', 'Sharing code snippets in discussions/forums. Pastebin alternative. Quick configuration sharing. Code examples for documentation. Bug reproduction code. Mini project templates. API request examples.'),
   d('Gist vs Repository', 'Gist: simple, single/multi-file snippets, no PRs, no issues, no Actions, no wiki. Repository: full project, PRs, issues, Actions, wiki, Pages, security features. Use gists for sharing small code examples; use repos for projects.')],
  [q('What is a GitHub Gist?', 'A simple way to share code snippets with syntax highlighting, version history, and embedding.'),
   q('What is the difference between public and secret gist?', 'Public: visible in search, Discover, trending. Secret: URL-only access, not searchable (but not encrypted).'),
   q('Can gists be cloned?', 'Yes — each gist is a Git repository that can be cloned (https://gist.github.com/hash.git).')],
  R(10,35,140,25,'#0070f3','','Create Gist','Paste code snippet') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Share URL','Send to others') +
  R(10,65,140,25,'#ffc107','','Embed','<script> tag') +
  R(10,95,140,25,'#dc3545','','Clone','Git repo') +
  T(240,140,'GitHub Gists: Simple code snippets. Public or secret. Embed, clone, fork, comment. Perfect for sharing small code examples.',9,'#666','middle'),
  [e('Create Gist via CLI', 'Quick snippet sharing.', codeBlock(['gh gist create index.js --public', 'gh gist list', 'gh gist view <id>']))],
  [m('Are secret gists truly private?', ['Yes, fully encrypted', 'No, URL-only (not searchable but not encrypted)', 'Only enterprise users', 'Only for paid accounts'], 1, 'Secret gists are not truly private — they are accessible by anyone with the URL and not encrypted. Do not put secrets in gists.')]
);

/* GitHub Projects */
compactTopic('github-projects', 'GitHub Projects (Beta)', 'intermediate', 20,
  ['GitHub Projects provides a flexible project management tool with tables, boards, and custom views.', 'Project fields: text, number, date, single select, iteration, labels, assignees, reviewers, linked PRs.', 'Automation: built-in workflows for status changes when issues/PRs are updated.'],
  'GitHub Projects is like a smart whiteboard for organizing work. You can create cards (issues/PRs), arrange them in columns (To Do, In Progress, Done), add custom fields (Priority, Sprint), and create different views (table, board, timeline). It automatically updates when issues or PRs change.',
  [d('Project Views', 'Table: spreadsheet-like with custom fields and sorting. Board: kanban columns by status or any field. Timeline: Gantt chart view for scheduling. Roadmap: high-level timeline view. Custom views: save different configurations for different purposes.'),
   d('Fields and Customization', 'System fields: Assignees, Labels, Milestone, Repository, Linked PRs. Custom fields: Text, Number, Date, Single Select, Iteration. Formula fields: calculated values. Group by any field. Sort and filter.'),
   d('Automation', 'Built-in workflows: auto-set status when issue/PR is opened/closed/merged. GitHub Actions: API access for custom automation. Item types: Issues, Pull Requests, Draft Issues (notes).'),
   d('Project Templates', 'Bug triage, feature planning, sprint planning, release tracking, issue triage. Templates auto-configure fields and views for common workflows.')],
  [q('What is GitHub Projects?', 'A flexible project management tool with table, board, timeline views and custom fields.'),
   q('What are the available view types?', 'Table (spreadsheet), Board (kanban), Timeline (Gantt), Roadmap (high-level).'),
   q('Can Projects be automated?', 'Yes — built-in workflows set status based on issue/PR events, plus GitHub Actions for custom automation.')],
  R(10,35,110,25,'#0070f3','','Issues','Work items') +
  R(10,65,110,25,'#28a745','','Project Board','Organize work') +
  R(10,95,110,25,'#ffc107','','Views','Table/Board/Timeline') +
  R(10,125,110,25,'#dc3545','','Automation','Status workflows') +
  T(240,170,'GitHub Projects: Modern project management with flexible views, custom fields, and automation. Track issues and PRs.',9,'#666','middle'),
  [e('Project API', 'Query project data via GraphQL.', codeBlock(['gh project list --owner my-org', 'gh project view 1 --owner my-org']))],
  [m('What view type in GitHub Projects is like a kanban board?', ['Table', 'Board', 'Timeline', 'Roadmap'], 1, 'The Board view arranges items in columns (like a kanban board) based on a selected field such as Status.')]
);

/* GitHub Releases */
compactTopic('github-releases', 'GitHub Releases', 'beginner', 10,
  ['GitHub Releases provide a way to package and distribute specific versions of your software.', 'Each release includes: tag, release notes, binary assets (ZIP/TAR.GZ automatically), and optional additional files.', 'Releases are associated with Git tags and can be marked as Latest, Prerelease, or Draft.'],
  'A GitHub Release is like creating a software package with a label. You pick a commit, tag it as "v1.0", write release notes describing what changed, and optionally attach binary files. GitHub automatically creates ZIP and TAR.GZ archives of the source code at that commit.',
  [d('Release Features', 'Tag-based: automatically creates a Git tag. Release notes: markdown descriptions (can auto-generate from PRs). Assets: upload binaries, installers, packages. Source archives: automatic ZIP/TAR.GZ. Latest release: badge on repo page. Prerelease: mark as beta/RC. Discussion: create discussion for release.'),
   d('Release Automation', 'GitHub Actions: create releases automatically via workflows. softprops/action-gh-release: popular action for release creation. Tag push trigger: on push tags: [v*]. Changelog generation: auto-generate from conventional commits.'),
   d('Semantic Versioning', 'MAJOR.MINOR.PATCH: v1.2.3. Major: breaking changes. Minor: new features (backward compatible). Patch: bug fixes (backward compatible). Pre-release: v1.0.0-beta.1. Build metadata: v1.0.0+build.123.')],
  [q('What is a GitHub Release?', 'A packaged version of software with release notes, source archives, and optional binary assets.'),
   q('What archives does GitHub automatically create for releases?', 'ZIP and TAR.GZ of the source code at the tagged commit.'),
   q('How does semantic versioning work?', 'MAJOR.MINOR.PATCH: breaking changes, new features, bug fixes respectively.')],
  R(10,35,140,25,'#0070f3','','Tag','v1.0.0') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Release Notes','Changelog') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Assets','ZIP / TAR.GZ / Binaries') +
  T(240,110,'GitHub Releases: Package and distribute software versions. Tag, release notes, assets, auto-archives.',9,'#666','middle'),
  [e('Create Release via CLI', 'Release management.', codeBlock(['gh release create v1.0.0 --title "v1.0.0" --notes "Release notes"', 'gh release list', 'gh release download v1.0.0']))],
  [m('What does GitHub automatically create for each release?', ['Docker image', 'ZIP and TAR.GZ archives', 'npm package', 'Debian package'], 1, 'GitHub automatically creates ZIP and TAR.GZ source code archives for every release.')]
);

/* GitHub API & Webhooks */
compactTopic('github-api', 'GitHub API & Webhooks', 'advanced', 25,
  ['GitHub provides a comprehensive REST API and GraphQL API for interacting with all GitHub features programmatically.', 'Webhooks allow real-time notifications when events occur in your repository, sending HTTP POST payloads to a configured URL.', 'Both APIs and webhooks enable integration with external services, CI/CD tools, and custom automation.'],
  'The GitHub API lets you programmatically do anything you can do on GitHub: create issues, merge PRs, manage repos, etc. Webhooks are like automated phone calls — GitHub calls your server when something happens (new issue, push, PR). This is how CI/CD services know to start building when you push code.',
  [d('REST API', 'https://api.github.com/ — base URL. Versioned via Accept header or URL path (v3). Endpoints: /repos/:owner/:repo, /issues, /pulls, /actions, /releases. Pagination: Link header (page/per_page params). Rate limiting: 5000 req/hr (authenticated), 60 req/hr (unauthenticated).'),
   d('GraphQL API', 'https://api.github.com/graphql — single endpoint. Query exactly what you need (no over-fetching). Mutations: create/update/delete resources. Nested queries: fetch related data in one request. Rate limiting: based on point cost, not request count. Use GitHub GraphQL Explorer for experimentation.'),
   d('Webhooks', 'Events: push, pull_request, issues, release, etc. Payload: JSON body with event details. Delivery: POST to configured URL with specific headers (X-GitHub-Event, X-Hub-Signature). Secret token for payload verification. Ping event on initial setup. Retry on failure.'),
   d('Authentication', 'Personal Access Token (PAT): classic or fine-grained. OAuth App token: for applications on behalf of users. GitHub App token: installation-based with specific permissions. JWT: for GitHub App authentication. Best practice: use fine-grained PATs with minimal scopes.')],
  [q('What are the two GitHub API types?', 'REST API (api.github.com) and GraphQL API (api.github.com/graphql).'),
   q('What is a webhook?', 'An HTTP POST callback triggered by GitHub events, sending event details to a configured URL.'),
   q('How to authenticate with the GitHub API?', 'Personal Access Token, OAuth token, or GitHub App token. Include in Authorization header.')],
  R(10,35,140,25,'#0070f3','','REST API','api.github.com') +
  R(10,65,140,25,'#28a745','','GraphQL API','Flexible queries') +
  R(10,95,140,25,'#ffc107','','Webhooks','Event callbacks') +
  R(10,125,140,25,'#dc3545','','GitHub CLI','gh tool') +
  T(240,170,'GitHub API & Webhooks: REST and GraphQL APIs for automation. Webhooks for real-time event notifications.',9,'#666','middle'),
  [e('API Examples', 'REST API calls.', codeBlock(['curl -H "Authorization: Bearer TOKEN" https://api.github.com/repos/user/repo', 'gh api repos/:owner/:repo/issues']))],
  [m('What is the rate limit for authenticated REST API requests?', ['60/hr', '1000/hr', '5000/hr', 'Unlimited'], 2, 'Authenticated requests have a rate limit of 5000 requests per hour. Unauthenticated: 60/hr.')]
);

/* GitHub Discussions */
compactTopic('github-discussions', 'GitHub Discussions', 'beginner', 10,
  ['GitHub Discussions provide a collaborative communication forum within a repository, separate from Issues.', 'Discussions are organized by categories (Q&A, Ideas, Show and Tell, General) with optional announcements.', 'Unlike Issues, Discussions are not task-trackable — they are for open-ended conversation and knowledge sharing.'],
  'GitHub Discussions is like a community forum built into your repo. It\'s for questions, ideas, show-and-tell, and general chat — things that aren\'t bug reports or feature requests. The best answers can be marked, creating a knowledge base over time.',
  [d('Discussion Features', 'Categories: Q&A, Ideas, General, Show and Tell, Announcements (configurable). Format: Markdown with formatting, images, links, mentions. Voting: upvote/downvote answers. Answer mark: mark as answer (Q&A category). Pinned: pin important discussions. Lock: lock conversation.'),
   d('Discussions vs Issues', 'Discussions: open-ended conversation, no assignees, no milestone, no project board automation, no fixed workflow. Issues: task-oriented, assignable, trackable, project board integration, automation with Actions. Use Discussions for questions/ideas, Issues for bugs/tasks.')],
  [q('What are GitHub Discussions?', 'A collaborative forum for open-ended conversation, Q&A, ideas, and announcements within a repository.'),
   q('How are Discussions different from Issues?', 'Discussions are for conversation, have categories, and can mark answers. Issues are for tracking bugs and tasks with assignees, milestones, and automation.'),
   q('Can answers be marked in Discussions?', 'Yes, in Q&A categories, you can mark a comment as the answer.')],
  R(10,35,110,25,'#0070f3','','Q&A','Questions') +
  R(10,65,110,25,'#28a745','','Ideas','Feature proposals') +
  R(10,95,110,25,'#ffc107','','Show & Tell','Share work') +
  R(10,125,110,25,'#dc3545','','General','Open chat') +
  T(240,170,'GitHub Discussions: Community forum with categories. Q&A, ideas, announcements. Knowledge base and community engagement.',9,'#666','middle'),
  [e('Discussion CLI', 'Manage discussions via CLI.', codeBlock(['gh api repos/:owner/:repo/discussions']))],
  [m('What category is best for questions in Discussions?', ['General', 'Ideas', 'Q&A', 'Show and Tell'], 2, 'The Q&A category allows marking answers, making it ideal for questions and building a knowledge base.')]
);

// ---- GENERATE ----
var dataDir = __dirname;
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["github"] = TOPICS_DATA["github"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["github"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));
fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));
console.log('Generated GitHub topics: ' + Object.keys(topics).length);
