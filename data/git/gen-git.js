const fs = require('fs');
const { svgW, R, A, T, Tw } = require('../svg-helpers');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: description.replace(/'/g,"\\'") }; }
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

/* =================== TOPIC 1: Git Workflows =================== */
addTopic('git-workflow', 'Git Workflows', 'intermediate', 20,
  ['A Git workflow is a convention for how teams use branches, commits, and merges to collaborate on code.',
   'Common workflows: Git Flow (feature/release/hotfix branches), GitHub Flow (feature branch + PR to main), GitLab Flow (environment branches).',
   'Choose a workflow based on team size, release frequency, and deployment strategy. Simple workflows suit small teams; complex ones suit regulated releases.',
   'Key practices: feature branches for isolated work, pull requests for code review, protected branches for main/stable, and semantic commit messages.'
  ],
  'Git workflows are like kitchen organization systems. Git Flow is a professional kitchen with stations for prep (feature), plating (release), and emergency (hotfix). GitHub Flow is a home kitchen: make your dish (branch), taste it (review), then serve (merge). GitLab Flow is meal-prep: stages for dev, staging, production.',
  [
    d('Git Flow', 'Classic workflow with main, develop, feature, release, and hotfix branches. Feature branches branch from develop. Release branches prepare a release. Hotfix branches fix production from main. Complex but thorough suitable for scheduled releases and maintenance versions.'),
    d('GitHub Flow', 'Simpler: main branch is always deployable. Create feature branches from main. Open PR for review and testing. Merge to main and deploy. No develop branch. No release branches. Suitable for continuous deployment and small teams.'),
    d('GitLab Flow', 'Environment branches: main/staging/production. Feature branches merge to main. Promote commits from main to staging to production via merge or cherry-pick. Supports environment-based promotion. Good for projects with multiple environments and compliance needs.'),
    d('Trunk-Based Development', 'Short-lived feature branches (hours/days). Frequent merges to main (trunk). Feature flags for incomplete work. Less merge conflicts faster CI continuous integration. Requires disciplined team and good test coverage.'),
    d('Choosing a Workflow', 'Git Flow: scheduled releases multiple versions large teams. GitHub Flow: continuous deployment startup/small team SaaS. GitLab Flow: multiple environments compliance gates. Trunk-Based: CI/CD DevOps maturity fast iterations.')
  ],
  'Choose the simplest workflow that meets your needs. Start with GitHub Flow or trunk-based development. Only adopt Git Flow if you need strict release management. The workflow is a tool not a rule adapt it to your team cadence and deployment strategy.',
  [
    q('What is a Git workflow?', 'A convention for how teams use branches commits and merges to collaborate on code.'),
    q('What is Git Flow?', 'A workflow with main develop feature release and hotfix branches. Complex suitable for scheduled releases.'),
    q('What is GitHub Flow?', 'A simpler workflow: feature branches PRs to main deploy after merge. Suitable for continuous deployment.'),
    q('What is trunk-based development?', 'Short-lived feature branches frequent merges to main feature flags. Fast CI fewer merge conflicts.'),
    q('Which workflow is best for SaaS continuous deployment?', 'GitHub Flow or trunk-based development simple fast continuous.'),
    q('What is a hotfix branch?', 'A branch from main to fix a production issue quickly. Merged back to main and develop.'),
    q('What is a release branch?', 'A branch from develop to prepare a release. Only bug fixes and release tasks. Merged to main and develop.'),
    q('What is the main branch?', 'The production-ready branch. Always reflects the current production state. Typically protected.'),
    q('What is a feature branch?', 'A branch for developing a specific feature. Isolated from other changes until merged via PR.'),
    q('Should you use Git Flow or GitHub Flow?', 'Git Flow for scheduled releases and complex projects. GitHub Flow for simple CD pipelines.')
  ],
  R(10,35,90,25,"#0070f3","","Git Flow","Complex") +
  R(10,65,90,25,"#28a745","","GitHub Flow","Simple CD") +
  R(10,95,90,25,"#ffc107","","GitLab Flow","Environments") +
  R(10,125,90,25,"#dc3545","","Trunk-Based","Feature flags") +
  R(10,155,90,25,"#e83e8c","","Main","Deployable") +
  A(100,48,130,48) + A(100,78,130,78) + A(100,108,130,108) + A(100,138,130,138) + A(100,168,130,168) +
  R(140,35,240,155,"#17a2b8","","Git Workflows","Conventions for branching merging and releasing code collaboratively.") +
  T(240,220,"Git Workflows: Git Flow GitHub Flow GitLab Flow Trunk-Based. Choose by team size and release cadence.",9,"#666","middle"),
  [
    e('Git Flow Branch Setup', 'Initialize Git Flow branches.', codeBlock([
      "# Initialize repository",
      "git init",
      "git checkout -b develop  # develop branch from main",
      "",
      "# Feature branch",
      "git checkout -b feature/login develop",
      "# work on feature...",
      "git checkout develop",
      "git merge --no-ff feature/login",
      "",
      "# Release branch",
      "git checkout -b release/v1.0 develop",
      "# bump version fix bugs...",
      "git checkout main",
      "git merge --no-ff release/v1.0",
      "git tag -a v1.0 -m \"Release v1.0\"",
      "git checkout develop",
      "git merge --no-ff release/v1.0",
      "",
      "# Hotfix branch",
      "git checkout -b hotfix/crash-fix main",
      "# fix bug...",
      "git checkout main",
      "git merge --no-ff hotfix/crash-fix",
      "git tag -a v1.0.1 -m \"Hotfix v1.0.1\"",
      "git checkout develop",
      "git merge --no-ff hotfix/crash-fix"
    ]), 'Git Flow branch management with feature release and hotfix branches.'),
    e('GitHub Flow (PR Based)', 'Simple continuous deployment workflow.', codeBlock([
      "# On main branch",
      "git checkout main",
      "git pull origin main",
      "",
      "# Create feature branch",
      "git checkout -b feature/add-payment",
      "",
      "# Work and commit",
      "git add .",
      "git commit -m \"Add payment processing\"",
      "git push -u origin feature/add-payment",
      "",
      "# Open Pull Request on GitHub",
      "# Team reviews CI runs tests",
      "# Merge via PR (squash or merge commit)",
      "",
      "# After merge delete branch",
      "git branch -d feature/add-payment",
      "git push origin --delete feature/add-payment"
    ]), 'GitHub Flow: feature branch PR review merge to main deploy.'),
    e('Trunk-Based with Feature Flags', 'Continuous integration pattern.', codeBlock([
      "# Short-lived branch (hours)",
      "git checkout -b feat-dark-mode",
      "",
      "# Work behind feature flag",
      "// Code: if (featureFlags.isEnabled('dark_mode')) {",
      "//   applyDarkMode();",
      "// }",
      "",
      "git add .",
      "git commit -m \"Add dark mode behind feature flag\"",
      "git checkout main",
      "git pull origin main",
      "git merge feat-dark-mode",
      "git push origin main",
      "",
      "# Enable feature in production gradually",
      "# featureFlags.enable(\"dark_mode\" user_percentage=10)",
      "",
      "# Remove branch remove flag later",
      "git branch -d feat-dark-mode"
    ]), 'Trunk-based development with feature flags for incomplete or experimental features.'),
    e('Merge Strategy: Squash vs Rebase vs Merge', 'Choose based on team practice.', codeBlock([
      "# Merge commit (preserves history)",
      "git checkout main",
      "git merge --no-ff feature-branch",
      "# Creates a merge commit with full branch history",
      "",
      "# Squash (clean linear history)",
      "git merge --squash feature-branch",
      "git commit -m \"Add feature XYZ\"",
      "# Single commit with all changes combined",
      "",
      "# Rebase (linear history without merge commits)",
      "git checkout feature-branch",
      "git rebase main",
      "git checkout main",
      "git merge feature-branch",
      "# Fast-forward clean linear history"
    ]), 'Squash keeps history clean merge preserves context rebase creates linear history.'),
    e('Git Workflow CLI Automation', 'Scripted workflow enforcement.', codeBlock([
      "#!/bin/bash",
      "# Enforce branch naming convention",
      "BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)",
      "",
      "if [[ ! \"$BRANCH_NAME\" =~ ^(feature|bugfix|hotfix|release)/ ]]; then",
      "  echo \"Error: Branch must start with feature/ bugfix/ hotfix/ or release/\"",
      "  exit 1",
      "fi",
      "",
      "# Enforce commit message format",
      "COMMIT_MSG_FILE=$1",
      "COMMIT_MSG=$(cat \"$COMMIT_MSG_FILE\")",
      "",
      "if [[ ! \"$COMMIT_MSG\" =~ ^(feat|fix|docs|chore|refactor|test|ci): ]]; then",
      "  echo \"Error: Commit must start with feat: fix: docs: etc.\"",
      "  exit 1",
      "fi"
    ]), 'Automation scripts enforce branch naming and commit message conventions.')
  ],
  [
    m('What is a Git workflow?', ['Version control software', 'Convention for branching and merging', 'A type of Git command', 'File storage system'], 1, 'A Git workflow defines how teams use branches commits and merges to collaborate.'),
    m('Which workflow has develop release and hotfix branches?', ['GitHub Flow', 'Git Flow', 'Trunk-Based', 'GitLab Flow'], 1, 'Git Flow uses main develop feature release and hotfix branches.'),
    m('What is the simplest workflow for CD?', ['Git Flow', 'GitHub Flow', 'GitLab Flow', 'None'], 1, 'GitHub Flow (feature branch PR to main to deploy) is simplest for continuous deployment.'),
    m('What enables trunk-based development for incomplete features?', ['Long-lived branches', 'Feature flags', 'Separate repositories', 'Manual deployments'], 1, 'Feature flags allow merging incomplete features to main without affecting users.'),
    m('What is a hotfix branch?', ['Branch for new features', 'Branch from main for production fixes', 'Branch for experiments', 'Branch for documentation'], 1, 'Hotfix branches branch from main to fix production issues quickly.'),
    m('What does --no-ff do in git merge?', ['Fast-forward only', 'Forces merge commit even if fast-forward possible', 'No file changes', 'Skip commit hooks'], 1, '--no-ff creates a merge commit to preserve branch history.')
  ]
);

/* =================== TOPIC 2: Branching Strategies =================== */
addTopic('git-branching', 'Branching Strategies', 'intermediate', 20,
  ['Branching strategy defines how teams create name use and delete branches to organize parallel development work.',
   'Key concepts: branch naming conventions (feature/ bugfix/ hotfix/) branch lifecycle (create to work to merge to delete) protected branches.',
   'Good branching reduces merge conflicts enables parallel work supports CI/CD and provides clear audit trail of changes.',
   'Strategies: long-lived branches for environments (develop staging main) and short-lived branches for features and fixes.'
  ],
  'Branching is like a tree of ideas. The trunk (main) is the stable reality. Branches are what if experiments what if we add a login screen what if we fix this bug what if we redesign the UI. Each branch grows independently then gets grafted back to the trunk when ready.',
  [
    d('Branch Naming Conventions', 'Standard prefixes: feature/add-login bugfix/fix-header hotfix/security-patch release/v1.2 chore/update-deps. Separators: slash (/) for category hyphen (-) for description. Include ticket number: feature/JIRA-123-checkout. Consistent naming enables automation (CI triggers branch cleanup).'),
    d('Protected Branches', 'Branches that cannot be directly pushed to. Require PR reviews and passing CI. Typically: main develop staging production. Settings: require pull request require approvals (1-2) dismiss stale reviews require status checks require up-to-date branches include administrators.'),
    d('Short-Lived vs Long-Lived Branches', 'Short-lived: feature branches (hours-days). Merged quickly fewer conflicts faster integration. Long-lived: main develop staging (weeks-months). Represent environments or release trains. Best practice: minimize long-lived branches beyond what environments require.'),
    d('Branch Deletion Strategy', 'Delete feature branches after merge (both local and remote). Git: git branch -d feature-xyz && git push origin --delete feature-xyz. Automate with branch cleanup on PR merge. Exceptions: release branches preserved for LTS support hotfix branches for audit.'),
    d('Git Bisect Friendly History', 'Good branching creates a clean commit graph that git bisect can navigate. Merge commits mark integration points. Linear history (rebase/squash) is easier to bisect. Bad: deeply nested merge bubbles. Good: structured merges at clear boundaries.')
  ],
  'Consistent branching is the foundation of collaborative Git. Use clear naming conventions. Protect main and deployment branches. Delete branches after merge. Prefer short-lived branches. The branching strategy should serve the team delivery cadence not complicate it.',
  [
    q('What is a branching strategy?', 'A convention for naming creating using and deleting branches to organize parallel development.'),
    q('What are protected branches?', 'Branches with restrictions: require PR reviews and CI status checks before merging.'),
    q('What is a good branch naming convention?', 'category/description: feature/login bugfix/fix-header hotfix/security-issue.'),
    q('Should you delete branches after merge?', 'Yes. Delete both local (git branch -d) and remote (git push origin --delete).'),
    q('What is the difference between short-lived and long-lived branches?', 'Short-lived (hours-days): feature branches. Long-lived (weeks-months): main develop staging.'),
    q('What is a release branch?', 'A branch for stabilizing a release. Typically branched from develop merged to main and develop.'),
    q('How do you prevent direct pushes to main?', 'Configure branch protection rules in GitHub/GitLab/Bitbucket. Require PRs and approvals.'),
    q('What is a feature branch?', 'A branch for developing a specific feature branched from develop or main.'),
    q('How do you handle multiple concurrent features?', 'Each feature in its own branch. Merge conflicts resolved during PR/integration.'),
    q('What is the purpose of branch naming conventions?', 'Organization automation (CI/CD triggers) team communication and audit trails.')
  ],
  R(10,35,110,25,"#0070f3","","Branch Naming","feature/login") +
  R(10,65,110,25,"#28a745","","Protected Branch","Requires PR + CI") +
  R(10,95,110,25,"#ffc107","","Short-Lived","Hours to days") +
  R(10,125,110,25,"#dc3545","","Long-Lived","Environments") +
  R(10,155,110,25,"#e83e8c","","Delete After","Clean up merged") +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,"#17a2b8","","Branching Strategies","Naming protection lifecycle and cleanup conventions for collaboration.") +
  T(240,220,"Branching Strategies: Naming conventions branch protection lifecycle management and cleanup practices.",9,"#666","middle"),
  [
    e('Branch Protection (GitHub CLI)', 'Configure protected branch.', codeBlock([
      "# Protect main branch via GitHub API/CLI",
      'gh api repos/:owner/:repo/branches/main/protection \\',
      "  --method PUT \\",
      "  -f required_status_checks.strict=true \\",
      "  -f required_status_checks.contexts[]=\"continuous-integration\" \\",
      "  -f enforce_admins=true \\",
      "  -f required_pull_request_reviews.required_approving_review_count=2 \\",
      '  -f restrictions.users[]="admin-team"',
      "",
      "# Or use GitHub UI: Settings > Branches > Add rule",
      "# Pattern: main develop release/*"
    ]), 'Branch protection enforces PRs reviews and CI checks before merging.'),
    e('Branch Cleanup Script', 'Delete merged branches.', codeBlock([
      "#!/bin/bash",
      "# Delete local branches merged into main",
      'git branch --merged main | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d',
      "",
      "# List remote merged branches",
      'git branch -r --merged origin/main | grep -v "origin/main\|origin/develop"',
      "",
      "# Delete remote merged branches",
      'git branch -r --merged origin/main | grep -v "origin/main\|origin/develop" |',
      "  sed 's/origin\///' | xargs -I {} git push origin --delete {}",
      "",
      "# Automate via CI on PR merge",
      'echo "::warning::Feature branch cleanup recommended"'
    ]), 'Automated cleanup of merged branches keeps the repository tidy.'),
    e('Branch from Issue (GitHub CLI)', 'Create branch linked to issue.', codeBlock([
      "# Create branch from issue",
      "gh issue view 42 --json number title labels",
      "",
      "# Create and switch to feature branch",
      "ISSUE_NUMBER=42",
      "ISSUE_TITLE=$(gh issue view $ISSUE_NUMBER --json title -q .title)",
      "BRANCH_NAME=\"feature/$(echo $ISSUE_TITLE |",
      "  sed 's/[^a-zA-Z0-9]/-/g' |",
      "  tr '[:upper:]' '[:lower:]' | cut -c1-50)\"",
      "",
      'git checkout -b "$BRANCH_NAME" main',
      'git push -u origin "$BRANCH_NAME"',
      "",
      "# Create PR linked to issue",
      "gh pr create --fill --issue $ISSUE_NUMBER"
    ]), 'Automate branch creation from issues with standardized naming.'),
    e('Branching Diagram Generation', 'Visualize branch structure.', codeBlock([
      "# Show branch graph",
      "git log --graph --oneline --all --decorate",
      "",
      "# Pretty graph with aliases",
      'git config --global alias.tree "log --graph --oneline --all --decorate --simplify-by-decoration"',
      "git tree",
      "",
      "# Show branches with last commit",
      "git branch -v",
      "",
      "# Show merged/unmerged branches",
      "git branch --merged main",
      "git branch --no-merged main",
      "",
      "# Visualize with tools:",
      "# gitk --all",
      '# git log --graph --format="%C(auto)%h %d %s"'
    ]), 'Visualize branch structure for audit and understanding.'),
    e('Branch Lifecycle Hooks', 'Automate branch events.', codeBlock([
      "#!/bin/bash",
      "# .git/hooks/post-checkout (on branch switch)",
      "PREV_HEAD=$1",
      "NEW_HEAD=$2",
      "IS_BRANCH_SWITCH=$3",
      "",
      'if [ "$IS_BRANCH_SWITCH" = "1" ]; then',
      "  BRANCH=$(git rev-parse --abbrev-ref HEAD)",
      '  echo "Switched to branch: $BRANCH"',
      "  ",
      "  # Run post-checkout tasks",
      "  if [ -f \"Makefile\" ]; then",
      "    make install-deps 2>/dev/null || true",
      "  fi",
      "fi"
    ]), 'Git hooks automate tasks on branch checkout helping enforce conventions.')
  ],
  [
    m('What is a good branch prefix for a new feature?', ['release/', 'feature/', 'hotfix/', 'bugfix/'], 1, 'feature/ is the standard prefix for feature branches.'),
    m('What does a protected branch require?', ['Direct push', 'Pull request and approvals', 'Email notification', 'Manual backup'], 1, 'Protected branches require PRs reviews and CI checks no direct pushes.'),
    m('When should you delete a branch?', ['Before creating it', 'After merging to main/develop', 'After pushing once', 'Never'], 1, 'Delete branches after they are merged to keep the repository clean.'),
    m('What is a short-lived branch?', ['A branch that lasts months', 'A branch that lasts hours to days', 'A branch never merged', 'A branch for documentation'], 1, 'Short-lived branches (feature branches) are merged within hours to days.'),
    m('How do you prevent pushes to main?', ['Branch protection rules', 'Delete main branch', 'Make repo read-only', 'Use .gitignore'], 0, 'Branch protection rules enforce PR-based workflow on main/develop branches.'),
    m('What does git branch -d do?', ['Creates a branch', 'Deletes a merged branch', 'Renames a branch', 'Lists branches'], 1, 'git branch -d deletes a branch that has been merged (safe delete).')
  ]
);

/* =================== TOPIC 3: Git Merge =================== */
addTopic('git-merge', 'Git Merge', 'intermediate', 15,
  ['Git merge integrates changes from one branch into another combining the development histories of both branches.',
   'Three-way merge: Git finds the common ancestor of two branches and applies changes from both sides. Conflicts arise when the same lines changed differently.',
   'Fast-forward merge: when the target branch has not diverged Git simply moves the pointer forward (no merge commit). Use --no-ff to force a merge commit.',
   'Conflict resolution: manually edit conflicted files mark as resolved with git add and complete the merge with git commit or git merge --continue.'
  ],
  'Git merge is like merging two rivers into one. If both rivers flowed from the same source and one has moved ahead (fast-forward) you just follow the advanced river. If they diverged around an island (branching) you create a new combined channel (merge commit). Sometimes the waters clash that is a merge conflict.',
  [
    d('Three-Way Merge Algorithm', 'Git identifies the merge base (common ancestor commit). It creates two diff hunks: base to branch A and base to branch B. Then applies both diffs to create the result. If both diffs modify the same lines differently you get a conflict. Git uses the longest common subsequence algorithm.'),
    d('Fast-Forward Merge', 'When target branch (main) has not moved since the source branch (feature) was created Git can simply advance main pointer to feature tip. No merge commit. Use git merge --no-ff to always create a merge commit for history preservation.'),
    d('Recursive Merge Strategy', 'Default for non-fast-forward merges. When there are multiple merge bases (common ancestors) Git merges them first to create a virtual ancestor then performs the three-way merge. Handles criss-cross merge scenarios with multiple possible ancestors.'),
    d('Conflict Resolution Strategies', 'Accept ours: keep current branch version (--ours). Accept theirs: keep incoming branch version (--theirs). Manual: edit file remove conflict markers (<<<<<<< ======= >>>>>>>). Merge tools: vimdiff VS Code meld Beyond Compare. After resolving: git add file && git merge --continue.'),
    d('Merge Drivers', 'Custom merge drivers for specific file types. .gitattributes: *.pdf merge=binary. Configured in .git/config. Useful for: lock files compiled outputs auto-generated code. Git also supports: union merge (combine both changes) subtree merge (merge subproject into subdirectory).')
  ],
  'Merging is the core of Git collaboration. Understand the three-way merge algorithm. Use --no-ff to preserve feature branch history. Resolve conflicts carefully test after conflict resolution. Configure merge drivers for binary/specialized files. Practice conflict resolution it becomes easier with experience.',
  [
    q('What is git merge?', 'Integrates changes from one branch into another combining development histories.'),
    q('What is a three-way merge?', 'Merge using common ancestor + two branch tips. Git finds base creates diffs from base to each branch applies both.'),
    q('What is a fast-forward merge?', 'When target branch has not diverged Git simply advances the pointer. No merge commit.'),
    q('What is a merge conflict?', 'When two branches modified the same lines differently. Git cannot automatically resolve. Manual intervention needed.'),
    q('How do you resolve a merge conflict?', 'Edit conflicted files remove >>> <<< markers git add file git merge --continue.'),
    q('What does --no-ff do?', 'Forces a merge commit even when fast-forward is possible. Preserves branch history.'),
    q('What is the merge base?', 'The common ancestor commit of two branches. Git computes diffs from this base.'),
    q('How do you abort a merge?', 'git merge --abort. Returns to pre-merge state.'),
    q('What is a recursive merge?', 'Default strategy for non-FF merges. Handles multiple merge bases by creating a virtual ancestor.'),
    q('What is git mergetool?', 'Launches a visual merge tool (vimdiff VS Code meld) to resolve conflicts interactively.')
  ],
  R(10,35,110,25,"#0070f3","","Branch A","Feature work") +
  R(10,65,110,25,"#28a745","","Branch B","Main branch") +
  A(50,90,50,110) + A(80,90,80,110) +
  R(10,120,75,25,"#ffc107","","Base","Common ancestor") +
  R(95,120,75,25,"#dc3545","","Merge","Three-way combine") +
  R(10,155,160,25,"#e83e8c","","Result","Combined history + merge commit") +
  A(170,48,200,48) + A(170,78,200,78) + A(50,145,50,155) + A(80,145,80,155) +
  R(210,35,170,155,"#17a2b8","","Git Merge","Three-way merge: base + branch A + branch B to merged result. Conflicts need manual resolution.") +
  T(240,220,"Git Merge: Integrate branches via three-way merge. Fast-forward merge commits and conflict resolution.",9,"#666","middle"),
  [
    e('Basic Git Merge Commands', 'Common merge operations.', codeBlock([
      "# Merge feature into main",
      "git checkout main",
      "git pull origin main",
      "git merge feature/login",
      "",
      "# Force merge commit (no fast-forward)",
      "git merge --no-ff feature/login",
      "",
      "# Merge with custom message",
      'git merge --no-ff -m "feat: integrate login feature" feature/login',
      "",
      "# Abort merge",
      "git merge --abort",
      "",
      "# Check merge status",
      "git status",
      "git merge --continue  # after resolving conflicts"
    ]), 'Essential merge commands: merging fast-forward control abort and continue.'),
    e('Resolving Merge Conflicts', 'Manual conflict resolution workflow.', codeBlock([
      "# Attempt merge conflict occurs",
      "git merge feature/login",
      ">> Auto-merge failed; fix conflicts then commit",
      "",
      "# View conflicted files",
      "git status",
      "# both modified: src/auth.js",
      "",
      "# Open file conflict markers:",
      "# <<<<<<< HEAD",
      "#   const timeout = 5000;",
      "# =======",
      "#   const timeout = 10000;",
      "# >>>>>>> feature/login",
      "",
      "# Edit file to resolve",
      "# const timeout = 7500; // compromise",
      "",
      "# Mark as resolved",
      "git add src/auth.js",
      "",
      "# Complete merge",
      "git merge --continue",
      "# or: git commit -m \"Merge feature/login into main\""
    ]), 'Resolve merge conflicts by editing files removing markers and completing the merge.'),
    e('Merge with Strategy Options', 'Advanced merge strategies.', codeBlock([
      "# Our strategy (keep current branch)",
      "git merge -Xours feature/branch",
      "# Keeps current branch version on conflicts",
      "",
      "# Their strategy (keep incoming)",
      "git merge -Xtheirs feature/branch",
      "# Keeps incoming branch version on conflicts",
      "",
      "# Recursive with patience (better diffs)",
      "git merge -Xpatience feature/branch",
      "# Slower but produces cleaner merge results",
      "",
      "# Squash merge (combine all into one commit)",
      "git merge --squash feature/branch",
      'git commit -m "feat: add login feature"',
      "",
      "# Verify merge",
      "git log --oneline --graph -5",
      "git diff --stat main@{1} main"
    ]), 'Advanced merge strategies for specific conflict resolution needs.'),
    e('Merge Queue (GitHub Merge Queue)', 'Automated merge ordering.', codeBlock([
      "# GitHub Merge Queue merges PRs in order",
      "# Ensures each PR passes CI after merging",
      "# with current main not at PR creation time",
      "",
      "# Enable in repo settings:",
      "# Settings > Branches > Branch protection >",
      '# "Require merge queue"',
      "",
      "# Workflow:",
      "# 1. PR approved + CI passes",
      "# 2. Add to merge queue (via UI or label)",
      "# 3. Queue creates a temporary branch",
      "#    merging all queued PRs in order",
      "# 4. CI runs on combined merge",
      "# 5. If passes merged to main"
    ]), 'Merge queues ensure each PR merges cleanly against the latest main state.'),
    e('Automated Merge Conflict Detection (CI)', 'Prevent conflicting PRs.', codeBlock([
      "# CI job: check if PR branch can merge cleanly",
      "",
      "name: Merge Check",
      "on: pull_request",
      "jobs:",
      "  check-merge:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - run: |",
      "          git fetch origin main",
      "          if ! git merge-base --is-ancestor",
      "            origin/main HEAD; then",
      '            echo "Branch needs rebase on main"',
      "            exit 1",
      "          fi",
      "      - run: |",
      "          git merge --no-commit origin/main",
      "          if [ $? -ne 0 ]; then",
      "            git merge --abort",
      '            echo "Merge conflict detected resolve locally"',
      "            exit 1",
      "          fi",
      "          git merge --abort"
    ]), 'CI checks detect merge conflicts early in the PR workflow.')
  ],
  [
    m('What is a three-way merge?', ['Two branches merging directly', 'Merge using common ancestor and two tips', 'Merging three branches at once', 'Deleting old branches'], 1, 'Three-way merge uses the common ancestor and both branch tips to create the merge.'),
    m('What causes a merge conflict?', ['Both branches modified same lines differently', 'A file was deleted', 'The repository is corrupted', 'Git is out of memory'], 0, 'Conflicts occur when the same lines are modified in both branches.'),
    m('What does --no-ff do?', ['No fast-forward', 'Force merge commit', 'No file changes', 'Fast-forward only'], 1, '--no-ff forces a merge commit even when fast-forward is possible.'),
    m('How do you abort a merge?', ['git merge --stop', 'git merge --abort', 'git reset --merge', 'git checkout main'], 1, 'git merge --abort returns to the pre-merge state.'),
    m('What is the default merge strategy?', ['Ours', 'Recursive', 'Octopus', 'Subtree'], 1, 'Recursive is the default strategy for non-fast-forward merges.'),
    m('What does git merge --squash do?', ['Squashes commits into one', 'Deletes the source branch', 'Adds squash game', 'Compresses the repo'], 0, 'Squash merge combines all feature branch commits into a single commit.')
  ]
);

/* =================== TOPIC 4: Git Rebase =================== */
addTopic('git-rebase', 'Git Rebase', 'intermediate', 20,
  ['Git rebase rewrites commit history by applying commits from one branch onto the tip of another creating a linear history.',
   'Unlike merge (creates a merge commit) rebase replays each commit one by one. The result is a clean linear history without merge bubbles.',
   'Interactive rebase (git rebase -i) allows squashing reordering editing dropping and rewording commits. Powerful but dangerous on shared branches.',
   'Golden rule: never rebase commits that have been pushed to a shared branch. Rebase only local/feature branches before merging.'
  ],
  'Rebase is like rewriting the history of a movie. You have a rough cut (your branch) with scenes in a messy order. Interactive rebase lets you reorder scenes combine similar shots (squash) delete unneeded footage and retitle scenes. But once you have shown the movie to others (pushed) changing the order confuses everyone.',
  [
    d('Rebase vs Merge', 'Rebase: linear history no merge commits cleaner log. Rewrites commit SHAs. Merge: preserves branch topology keeps original commit order and SHAs. Rule of thumb: rebase for feature branches before merging merge for shared integration branches.'),
    d('Interactive Rebase Operations', 'pick: use commit as-is. reword: change commit message. edit: stop to amend commit (content or message). squash: combine with previous commit merge messages. fixup: like squash but discard this commit message. drop: remove commit. exec: run shell command. break: stop at this point.'),
    d('Rebase Workflow', 'git checkout feature-branch && git rebase main: takes all feature commits and replays them on top of main current tip. Resolve conflicts per commit. After successful rebase: git checkout main && git merge feature-branch (fast-forward). Result: linear history.'),
    d('Rebase Conflicts', 'Unlike merge (one big conflict resolution) rebase resolves conflicts per commit. Each commit is applied in order. If commit A conflicts: resolve git add git rebase --continue. If stuck: git rebase --abort. If skip: git rebase --skip. Per-commit resolution makes debugging easier.'),
    d('Rebase Recovery (Rebase Dangers)', 'If you accidentally rebase a pushed branch: git rebase --abort (if still in progress). If completed: git reflog to find the old commit git reset --hard ORIG_HEAD or git checkout -b recovery <old-sha>. For shared branches: force push is destructive communicate with team first.')
  ],
  'Use rebase to keep feature branch history clean before merging. Never rebase shared branches. Interactive rebase is a powerful tool for curating commit history. Resolve conflicts per commit during rebase. If unsure use merge it is safer. Reflog is your safety net for recovery.',
  [
    q('What is git rebase?', 'Rewrites commit history by applying commits from one branch onto the tip of another. Creates linear history.'),
    q('What is the difference between rebase and merge?', 'Rebase: linear history rewrites SHAs. Merge: preserves branch topology adds merge commit.'),
    q('What is the golden rule of rebasing?', 'Never rebase commits that have been pushed to a shared branch. Rebase only local feature branches.'),
    q('What is interactive rebase?', 'git rebase -i opens an editor to pick reword edit squash fixup or drop commits.'),
    q('How do you resolve conflicts during rebase?', 'Conflicts are resolved per commit. Fix file git add git rebase --continue. Abort with git rebase --abort.'),
    q('What does squash do in interactive rebase?', 'Combines a commit with the previous one. Both commit messages are merged into one.'),
    q('What does fixup do vs squash?', 'Fixup combines without keeping the commit message. Squash combines and merges messages.'),
    q('How do you recover from a bad rebase?', 'git reflog to find the old commit SHA. git reset --hard <old-sha> or create a branch from it.'),
    q('When should you prefer merge over rebase?', 'For shared branches when you want to preserve exact history or when the rebase would cause excessive conflict resolution.'),
    q('What happens to commit SHAs after rebase?', 'They change. Each commit is a new commit object with a new SHA even if the content is the same.')
  ],
  R(10,35,110,25,"#0070f3","","Feature Branch","Commit A Commit B") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","Main Tip","Latest main") +
  R(10,70,110,25,"#dc3545","","Rebase","Replay commits on main tip") +
  A(120,83,150,83) +
  R(160,70,110,25,"#ffc107","","Linear History","A B on top of main") +
  R(10,105,110,25,"#e83e8c","","Interactive","-i: squash reword drop") +
  R(10,135,110,25,"#6610f2","","Conflict","Resolve per commit") +
  R(10,165,110,25,"#17a2b8","","Merge","Fast-forward after rebase") +
  R(290,35,190,155,"#17a2b8","","Git Rebase","Rewrite commits onto another branch. Clean linear history. Interactive mode for curation.") +
  T(240,220,"Git Rebase: Reapply commits on a new base. Linear history. Interactive commit curation. Never rebase shared branches.",9,"#666","middle"),
  [
    e('Basic Rebase Workflow', 'Rebase feature branch onto main.', codeBlock([
      "# Start on feature branch",
      "git checkout feature/login",
      "",
      "# Rebase onto main",
      "git rebase main",
      ">> Applying: Add login form",
      ">> Applying: Add validation logic",
      ">> Applying: Add OAuth handler",
      "",
      "# If conflict occurs:",
      "# 1. Fix conflicts in file",
      "# 2. git add <file>",
      "# 3. git rebase --continue",
      "# Or: git rebase --abort",
      "",
      "# After successful rebase",
      "git checkout main",
      "git merge feature/login",
      "# Fast-forward merge linear history"
    ]), 'Standard rebase workflow: rebase feature onto main resolve conflicts per commit then merge.'),
    e('Interactive Rebase (Squash Commits)', 'Clean up before PR.', codeBlock([
      "# Rebase last 4 commits interactively",
      "git rebase -i HEAD~4",
      "",
      "# Editor opens:",
      "# pick a1b2c3d Add login form",
      "# pick e4f5g6h Fix typo in login",
      "# pick i7j8k9l Add validation",
      "# pick m0n1o2p Fix validation bug",
      "",
      "# Change to:",
      "# pick a1b2c3d Add login form",
      "# fixup e4f5g6h Fix typo in login",
      "# squash i7j8k9l Add validation",
      "# fixup m0n1o2p Fix validation bug",
      "",
      "# Save and exit. Result: 2 clean commits:",
      "# a1b2c3d Add login form",
      "# i7j8k9l Add validation (with test fixes squashed)"
    ]), 'Interactive rebase squashes fixup commits into meaningful feature commits before PR.'),
    e('Rebase with --onto', 'Rebase onto a different base.', codeBlock([
      "# Scenario: feature-b was branched from feature-a",
      "# But feature-a is not ready; we want feature-b on main",
      "",
      "# Before:",
      "# main -- A -- B",
      "#          \\",
      "#           C -- D (feature-a)",
      "#                 \\",
      "#                  E -- F (feature-b)",
      "",
      "# Rebase feature-b directly onto main",
      "git rebase --onto main feature-a feature-b",
      "",
      "# After:",
      "# main -- A -- B -- E -- F (feature-b)",
      "#          \\",
      "#           C -- D (feature-a)",
      "",
      "# Or shorter:",
      "git checkout feature-b",
      "git rebase --onto main feature-a"
    ]), 'git rebase --onto allows selective rebasing onto a different base branch.'),
    e('Avoid Rebase on Shared Branches', 'Why not to rebase pushed branches.', codeBlock([
      "# What happens when you rebase a shared branch:",
      "",
      "# Alice pulls feature/xyz (commit A B C)",
      "# Alice rebases onto updated main:",
      "git checkout feature/xyz",
      "git rebase main  # A B C (new SHAs!)",
      "git push --force-with-lease",
      "",
      "# Bob already has A B C locally",
      "# Bob pulls: Git sees divergence",
      "# Bob Git says:",
      "# hint: you have divergent branches",
      "",
      "# Bob options (all bad):",
      "# git pull --rebase (rewrites again)",
      "# git reset --hard (loses work)",
      "# Manual fix required",
      "",
      "# SAFE: use merge on shared branches",
      "# OR: team agreement on a single owner"
    ]), 'Rebasing shared branches causes divergence for other developers. Use merge instead.'),
    e('Rebase and Auto-Squash', 'Automatically squash fixup commits.', codeBlock([
      "# Commit fixup commits with --fixup",
      "git commit --fixup a1b2c3d",
      "# Creates \"fixup! Add login form\" commit",
      "",
      "# Later rebase with --autosquash",
      "git rebase -i --autosquash HEAD~10",
      "# Automatically moves fixup commits",
      "# next to their target commits",
      "# and marks them as fixup",
      "",
      "# One-liner:",
      "git commit --fixup <target-sha>",
      "git rebase -i --autosquash <base>",
      "",
      "# Enable automatic autosquash:",
      "git config --global rebase.autosquash true"
    ]), '--fixup and --autosquash automate the squash workflow for related commits.')
  ],
  [
    m('What does rebase do?', ['Creates a merge commit', 'Reapplies commits on a new base', 'Deletes old commits', 'Stages all files'], 1, 'Rebase replays commits from one branch onto the tip of another.'),
    m('What is the golden rule of rebasing?', ['Always rebase main', 'Never rebase shared branches', 'Rebase every hour', 'Only rebase with --force'], 1, 'Never rebase commits that have been pushed to a shared branch.'),
    m('What does interactive rebase allow?', ['Only fast-forward', 'Squash reword drop reorder commits', 'Delete remote branches', 'Create new branches'], 1, 'Interactive rebase (git rebase -i) allows full commit history curation.'),
    m('How do you resolve conflicts during rebase?', ['One big conflict resolution', 'Per commit then git rebase --continue', 'Skip conflicted commits', 'Delete conflicted files'], 1, 'Rebase resolves conflicts per commit fix add continue.'),
    m('What happens to commit SHAs after a rebase?', ['They stay the same', 'They change (new commits)', 'They are deleted', 'They get encrypted'], 1, 'Rebase creates new commit objects with new SHAs even for identical content.'),
    m('What is the difference between squash and fixup?', ['Squash keeps message fixup discards it', 'Fixup keeps message squash discards', 'They are the same', 'Fixup deletes the commit'], 0, 'Squash merges commit messages; fixup discards the squashed commit message.')
  ]
);

/* =================== TOPIC 5: Git Stash =================== */
addTopic('git-stash', 'Git Stash', 'beginner', 10,
  ['Git stash temporarily saves uncommitted changes (modified tracked files and staged changes) so you can work on something else.',
   'Stash takes your working directory and staging area changes and saves them on a stack of unfinished changes. Your working directory becomes clean.',
   'Common use: switching branches without committing half-finished work pulling remote changes or trying a quick experiment.',
   'Stash operations: git stash (save) git stash pop (apply + drop) git stash apply (keep on stack) git stash list git stash drop.'
  ],
  'Git stash is like putting your bookmarks in a drawer while you clean your desk. You are reading chapter 5 (working on feature X) but need to answer the door (switch to urgent bug fix). You put a bookmark (stash) in your book set it aside answer the door then come back and resume from the bookmark.',
  [
    d('What Git Stash Saves', 'Modified tracked files (unstaged changes). Staged changes (the index). Untracked files (with -u or --include-untracked). Ignored files (with -a or --all). New files (created but not tracked). Stash does NOT save: new branches new commits or the working tree for untracked/ignored files unless specified.'),
    d('Stash Stack Management', 'Stashes are stored on a stack (LIFO). Latest stash is stash@{0}. List all: git stash list. Apply specific: git stash apply stash@{2}. Drop: git stash drop stash@{1}. Clear all: git stash clear. Create branch from stash: git stash branch new-branch stash@{0}.'),
    d('Stash Partial Changes', 'Interactive stash: git stash -p (patch mode) lets you select which hunks to stash. Keep staged changes: git stash --keep-index (stashes only unstaged changes). Stash specific file: git stash push -m "wip" -- filename. Create stash from a specific commit: not directly supported (use git format-patch instead).'),
    d('Stash Use Cases', '1. Urgent bug fix: stash feature work switch to main fix bug switch back pop stash. 2. Pull conflicts: stash local changes pull pop stash (may have conflicts). 3. Experiment: stash try approach if fails drop stash if works pop stash. 4. Rebase preparation: stash before rebase if you have uncommitted changes.'),
    d('Stash Limitations and Alternatives', 'Stash is local-only cannot be pushed/shared. Not ideal for long-term storage (use feature branches). Large stashes can be confusing (use descriptive messages: git stash push -m "WIP: login form validation"). Alternative for complex workflows: commit on a temporary branch instead of stashing.')
  ],
  'Stash is perfect for short-term interruptions. Use descriptive messages (git stash push -m "message"). For complex or long-term work-in-progress create a temporary branch instead. Stash has limitations: local-only stack-based no easy diffing between stashes. Practice the difference between pop and apply.',
  [
    q('What is git stash?', 'Temporarily saves uncommitted changes to a stack cleaning the working directory for other tasks.'),
    q('What does git stash save?', 'Modified tracked files and staged changes. Untracked files with -u flag.'),
    q('What is the difference between stash pop and stash apply?', 'Pop: applies and removes from stack. Apply: applies but keeps on stack.'),
    q('How do you list stashes?', 'git stash list. Shows stack with stash@{0} stash@{1} etc.'),
    q('How do you stash untracked files?', 'git stash -u or git stash --include-untracked.'),
    q('What is the most recent stash?', 'stash@{0} (top of the stack).'),
    q('How do you apply a specific stash?', 'git stash apply stash@{2}.'),
    q('How do you clear all stashes?', 'git stash clear. Be careful this is permanent.'),
    q('Can you push a stash to remote?', 'No. Stashes are local-only. Use branches for shared work-in-progress.'),
    q('What is git stash -p?', 'Patch mode interactively select hunks to stash. Useful for partial stashing.')
  ],
  R(10,35,110,25,"#0070f3","","Working Dir","Uncommitted changes") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","Stash Stack","stash@{0} stash@{1}") +
  A(120,75,150,75) +
  R(10,65,110,25,"#dc3545","","Clean Dir","Switch branches") +
  A(120,102,150,102) +
  R(10,95,110,25,"#ffc107","","Pop/Apply","Restore changes") +
  R(10,125,110,25,"#e83e8c","","Drop","Remove from stack") +
  R(10,155,110,25,"#6610f2","","Clear","Remove all stashes") +
  R(290,35,190,155,"#17a2b8","","Git Stash","Temporarily save uncommitted changes. Stack-based. Perfect for interruptions.") +
  T(240,220,"Git Stash: Save uncommitted work temporarily. Switch branches pop later. Stack-based management.",9,"#666","middle"),
  [
    e('Basic Stash Operations', 'Save and restore stashes.', codeBlock([
      "# Save uncommitted changes",
      "git stash",
      "# Working directory is now clean",
      "",
      "# Save with message",
      'git stash push -m "WIP: login validation"',
      "",
      "# Apply most recent stash and remove from stack",
      "git stash pop",
      "",
      "# Apply most recent stash without removing",
      "git stash apply",
      "",
      "# Apply specific stash",
      "git stash apply stash@{1}",
      "",
      "# List all stashes",
      "git stash list",
      "# stash@{0}: WIP: login validation",
      "# stash@{1}: WIP: header fix"
    ]), 'Core stash commands: save pop apply list. Use messages for clarity.'),
    e('Stashing Untracked and All Files', 'Include new/ignored files.', codeBlock([
      "# Stash including untracked files",
      "git stash -u",
      "# or: git stash --include-untracked",
      "",
      "# Stash ALL files (including ignored)",
      "git stash -a",
      "# or: git stash --all",
      "",
      "# Check what a stash contains",
      "git stash show stash@{0}",
      "git stash show -p stash@{0}",
      "",
      "# Example workflow:",
      'echo "config.local" >> .gitignore',
      "git stash -a # saves everything",
      "git stash list"
    ]), 'Use -u for untracked files -a for all files including ignored ones.'),
    e('Stash Branch (Recovery)', 'Create branch from stash.', codeBlock([
      "# If you pop a stash and it conflicts:",
      "git stash pop",
      "# Auto-merge failed to conflicts",
      "",
      "# Better: create a branch from the stash",
      "# This recreates the original commit state",
      "git stash branch recovery-branch stash@{0}",
      "# Creates branch applies stash drops stash",
      "",
      "# Now you have a proper branch to work on",
      "git add .",
      'git commit -m "Restore stashed work"',
      "",
      "# Useful when:",
      "# - Stash conflicts with current branch",
      "# - You forgot what branch the stash was from"
    ]), 'git stash branch creates a branch from a stash for clean recovery.'),
    e('Stash Across Branches', 'Managing multiple contexts.', codeBlock([
      "# On feature/login branch",
      'git stash push -m "half-done login form"',
      "",
      "# Switch to bugfix",
      "git checkout main",
      "git checkout -b bugfix/crash-fix",
      "# Fix the bug...",
      "git add .",
      'git commit -m "fix: prevent crash on empty input"',
      "",
      "# Switch back to feature",
      "git checkout feature/login",
      "",
      "# Restore stashed work",
      "git stash pop",
      "",
      "# If stashed work was on different base",
      "# you may get conflicts (resolve normally)",
      "",
      "# Alternative: apply and keep stash until resolved",
      "git stash apply  # then resolve commit git stash drop"
    ]), 'Stash enables context switching between branches without losing uncommitted work.'),
    e('Interactive Stash (Patch Mode)', 'Selective stashing.', codeBlock([
      "# Interactive stash select hunks",
      "git stash -p",
      "",
      "# Git shows each change hunk:",
      "# diff --git a/src/auth.js b/src/auth.js",
      "# @@ -10 5 +10 8 @@",
      '#  console.log("init");',
      "# +const debug = true;  to proposed change",
      "# Stash this hunk? [y n q a d / j J g e ?]",
      "",
      "# Keep staged changes stash unstaged only",
      "git stash --keep-index",
      "# Staged changes remain in working directory",
      "# Unstaged changes go to stash",
      "",
      "# Stash specific file",
      'git stash push -m "config changes" -- src/config.js'
    ]), 'Patch mode allows stashing specific changes while keeping others in the working directory.')
  ],
  [
    m('What does git stash do?', ['Commits changes', 'Saves changes temporarily', 'Deletes changes', 'Pushes to remote'], 1, 'Stash temporarily saves uncommitted changes on a stack.'),
    m('What is the difference between pop and apply?', ['Pop applies and removes apply keeps', 'Pop keeps apply removes', 'No difference', 'Pop is for remote apply is local'], 0, 'Pop removes from stack after applying; apply keeps it on the stack.'),
    m('How do you stash untracked files?', ['git stash -u', 'git stash --all', 'git stash -p', 'Cannot stash untracked'], 0, 'Use git stash -u or --include-untracked for untracked files.'),
    m('What is stash@{0}?', ['The oldest stash', 'The most recent stash', 'A specific file', 'An error message'], 1, 'stash@{0} is the top (most recent) item on the stash stack.'),
    m('Can you share stashes with your team?', ['Yes via git push', 'No stashes are local', 'Only with GitHub', 'Via email'], 1, 'Stashes are local-only and cannot be pushed to a remote repository.'),
    m('How do you clear all stashes?', ['git stash drop', 'git stash clear', 'git stash remove', 'git stash delete'], 1, 'git stash clear removes all stashes from the stack permanently.')
  ]
);

/* =================== TOPIC 6: Git Tags =================== */
addTopic('git-tag', 'Git Tags', 'beginner', 10,
  ['Git tags are references that point to specific commits typically used to mark release points (v1.0 v2.0 v1.0.1-rc1).',
   'Two types: lightweight (just a pointer to a commit) and annotated (stored as full objects with message author date GPG signature).',
   'Annotated tags are recommended for releases: they include the tagger name email date message and can be GPG-signed for verification.',
   'Tags are not automatically pushed to remote. Must explicitly push: git push origin --tags or git push origin <tag-name>.'
  ],
  'Git tags are like sticky notes on a timeline. You mark important points: Version 1.0 released here Version 1.1 released here. Annotated tags are sticky notes with detailed notes attached. Lightweight tags are just a colored dot. You can go back to any tagged point easily.',
  [
    d('Lightweight vs Annotated Tags', 'Lightweight: git tag v1.0. Just a name pointing to a commit. No metadata. Annotated: git tag -a v1.0 -m "Release v1.0". Stored as a full Git object with message date tagger optional GPG signature. Always use annotated tags for releases.'),
    d('Tag Naming Conventions', 'Semantic versioning: v1.2.3 (major.minor.patch). Pre-release: v1.2.3-rc1 v1.2.3-beta. Version prefix: v (v1.0) or no prefix (1.0). Leading v is conventional. Build metadata: v1.2.3+build.456. Suffix: v1.2.3-lts. Consistency within project is most important.'),
    d('GPG-Signed Tags', 'Annotated tags can be GPG-signed: git tag -s v1.0 -m "Release v1.0". Provides cryptographic verification that the tag was created by you. Verification: git tag -v v1.0. Requires GPG key setup. Signed tags ensure release authenticity.'),
    d('Tag Operations', 'Create: git tag -a v1.0 -m "Release". List: git tag git tag -l "v1.*". Show: git show v1.0. Delete local: git tag -d v1.0. Delete remote: git push --delete origin v1.0. Push: git push origin v1.0 git push origin --tags. Checkout: git checkout v1.0 (detached HEAD).'),
    d('Tags in CI/CD', 'Tags trigger release pipelines. GitHub Actions: on push tags. GitLab CI: only: tags. Semantic versioning from tags: git describe --tags --abbrev=0. Auto-build on tag push. Tags vs branches for releases: tags are immutable branches can move. Always tag after release merge to main.')
  ],
  'Use annotated tags for all releases. Follow semantic versioning (v1.2.3). GPG-sign tags for security. Push tags explicitly they do not auto-push with commits. Tags are immutable references once set they should not be deleted or moved unless absolutely necessary.',
  [
    q('What is a Git tag?', 'A reference pointing to a specific commit typically used to mark release points.'),
    q('What are the two types of Git tags?', 'Lightweight (just a pointer) and Annotated (full object with message author date signature).'),
    q('Which tag type should you use for releases?', 'Annotated tags (-a flag) they include metadata and can be GPG-signed.'),
    q('How do you push tags to remote?', 'git push origin <tag-name> or git push origin --tags (pushes all tags).'),
    q('How do you delete a local tag?', 'git tag -d v1.0'),
    q('How do you delete a remote tag?', 'git push --delete origin v1.0 or git push origin :refs/tags/v1.0'),
    q('What is a GPG-signed tag?', 'An annotated tag signed with a GPG key for cryptographic verification of authenticity.'),
    q('How do you list all tags matching a pattern?', 'git tag -l "v1.*"'),
    q('Can tags be moved?', 'Technically yes (git tag -f) but tags should be treated as immutable. Avoid moving release tags.'),
    q('What happens when you checkout a tag?', 'You enter detached HEAD state. To make changes create a branch from the tag.')
  ],
  R(10,35,110,25,"#0070f3","","Commit A","Base code") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","Commit B","Bug fixes") +
  A(120,78,150,78) +
  R(10,65,110,25,"#ffc107","","Commit C","Features") +
  A(50,90,50,100) +
  R(170,80,100,25,"#dc3545","","Tag: v1.0","Annotated release tag") +
  R(10,110,110,25,"#e83e8c","","Commit D","Hotfix") +
  A(50,135,50,145) +
  R(170,125,100,25,"#6610f2","","Tag: v1.0.1","Patch release") +
  R(290,35,190,155,"#17a2b8","","Git Tags","Immutable markers on commits. Annotated tags for releases. Semantic versioning.") +
  T(240,220,"Git Tags: Mark release points. Annotated tags for releases. Semantic versioning. GPG signing for authenticity.",9,"#666","middle"),
  [
    e('Creating and Managing Tags', 'Annotated and lightweight tags.', codeBlock([
      "# Lightweight tag (just a pointer)",
      "git tag v1.0-light",
      "",
      "# Annotated tag (recommended)",
      'git tag -a v1.0 -m "Release version 1.0"',
      "",
      "# Annotated tag with GPG signature",
      'git tag -s v1.0 -m "Release v1.0 signed"',
      "",
      "# Tag a specific commit (not HEAD)",
      "git tag -a v1.0-rc1 a1b2c3d -m \"RC 1\"",
      "",
      "# Push a specific tag",
      "git push origin v1.0",
      "",
      "# Push all tags",
      "git push origin --tags",
      "",
      "# Verify GPG signature on tag",
      "git tag -v v1.0"
    ]), 'Create push and verify tags. Always use annotated tags for releases.'),
    e('Semantic Versioning with Tags', 'SemVer convention for tags.', codeBlock([
      "# Semantic versioning format",
      "# MAJOR.MINOR.PATCH (e.g. v2.1.3)",
      "",
      "# MAJOR: breaking changes",
      'git tag -a v2.0.0 -m "Breaking: restructured API"',
      "",
      "# MINOR: new features (backward compatible)",
      'git tag -a v1.1.0 -m "Feat: add search functionality"',
      "",
      "# PATCH: bug fixes (backward compatible)",
      'git tag -a v1.0.1 -m "Fix: resolve memory leak"',
      "",
      "# Pre-release suffix",
      'git tag -a v2.0.0-beta.1 -m "Beta release"',
      'git tag -a v2.0.0-rc.1 -m "Release candidate"',
      "",
      "# Get current version from tags",
      "git describe --tags --abbrev=0",
      "# v2.1.3"
    ]), 'Semantic versioning with tags: MAJOR.MINOR.PATCH with pre-release suffixes.'),
    e('Tags in CI/CD Pipeline', 'Automated release on tag push.', codeBlock([
      "# GitHub Actions: release on tag push",
      "name: Release",
      "on:",
      "  push:",
      "    tags:",
      '      - "v*"',
      "jobs:",
      "  build:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - name: Extract version from tag",
      '        run: echo "VERSION=${GITHUB_REF#refs/tags/}" >> $GITHUB_ENV',
      "      - name: Build and publish",
      "        run: |",
      "          npm version from-git --no-git-tag-version",
      "          npm publish"
    ]), 'CI/CD pipeline triggered by tag pushes for automated releases.'),
    e('Auto-Tagging in CI', 'Automatically create release tags.', codeBlock([
      "# Auto-create tag after release merge",
      "#!/bin/bash",
      "# Get current version from package.json",
      "VERSION=$(node -p \"require('./package.json').version\")",
      "",
      "# Check if tag already exists",
      'if git rev-parse "v$VERSION" >/dev/null 2>&1; then',
      '  echo "Tag v$VERSION already exists"',
      "else",
      '  git tag -a "v$VERSION" -m "Release v$VERSION"',
      '  git push origin "v$VERSION"',
      "fi",
      "",
      "# GitHub Actions: auto-tag on main merge",
      "# - run: if git merge-base --is-ancestor HEAD origin/main; then",
      "#         ./scripts/auto-tag.sh",
      "#       fi"
    ]), 'Automated tag creation from package version during CI.'),
    e('Tag-Based Versioning with Git Describe', 'Get current version from tags.', codeBlock([
      "# git describe generates a human-readable version",
      "git describe --tags",
      "# v1.0-5-gabc1234",
      "# ^tag  ^commits since tag  ^current commit",
      "",
      "# Without commit suffix (nearest tag)",
      "git describe --tags --abbrev=0",
      "# v1.0",
      "",
      "# With --match for specific patterns",
      'git describe --tags --match "v[0-9]*"',
      "# v1.0-5-gabc1234",
      "",
      "# In Node.js for versioning",
      "const { execSync } = require('child_process');",
      "const version = execSync('git describe --tags --abbrev=0')",
      "  .toString().trim();",
      "console.log(version); // v1.0"
    ]), 'Git describe generates a unique version string from tags and commit count.')
  ],
  [
    m('What is a Git tag?', ['A branch that moves', 'A reference to a specific commit', 'A type of merge', 'A remote URL'], 1, 'A tag is an immutable reference pointing to a specific commit.'),
    m('What is the difference between lightweight and annotated tags?', ['Lightweight has metadata', 'Annotated has author date message', 'Lightweight is signed', 'No difference'], 1, 'Annotated tags store metadata (message tagger date) and can be signed.'),
    m('How do you create an annotated tag?', ['git tag v1.0', 'git tag -a v1.0 -m "message"', 'git tag --annotate v1.0', 'git tag -m v1.0'], 1, 'Use git tag -a for annotated tags.'),
    m('How do you push a tag to remote?', ['git push', 'git push origin v1.0', 'Tags auto-push', 'git push --all'], 1, 'Tags must be explicitly pushed: git push origin <tag-name>.'),
    m('What command lists all tags?', ['git branch', 'git tag', 'git list', 'git show-tags'], 1, 'git tag lists all tags. Use -l for pattern matching.'),
    m('What is the recommended tag format for releases?', ['v1.0 (annotated)', 'release-1 (lightweight)', 'R1.0', 'just "1"'], 0, 'Use annotated tags with semantic versioning format (v1.2.3).')
  ]
);

/* =================== TOPIC 7: Git Submodules =================== */
addTopic('git-submodule', 'Git Submodules', 'intermediate', 15,
  ['Git submodules allow you to include one Git repository as a subdirectory of another Git repository while keeping their histories separate.',
   'Useful for: shared libraries common components external dependencies you manage or splitting a monolith while maintaining connections.',
   'Submodules track a specific commit in the external repo not a branch. The parent repo pins the submodule version (detached HEAD in submodule).',
   'Challenges: complexity of updates need to manually track submodule commits cloning requires --recurse-submodules switching branches can be tricky.'
  ],
  'Git submodules are like a bookshelf in your house. Your house (parent repo) has a designated spot for a specific book (submodule). The book is a separate entity with its own edition author and content. The bookshelf just says I expect the 3rd edition here. If someone updates the book you must consciously decide to update your shelf reference.',
  [
    d('How Submodules Work', 'Parent repo stores a reference (commit SHA) to the submodule repo in .gitmodules and .git/config. git submodule update checks out the pinned commit in the submodule directory. Submodule is in detached HEAD state. Changes to submodule must be committed separately in both repos.'),
    d('Adding and Cloning Submodules', 'Add: git submodule add https://github.com/user/lib.git lib/. Cloning a project with submodules: git clone --recurse-submodules <url>. If already cloned: git submodule update --init --recursive. The --recursive flag handles nested submodules.'),
    d('Updating Submodules', 'Pull latest from submodule remote branch: cd lib && git pull origin main. Then commit the new submodule reference in parent repo. Or: git submodule update --remote [submodule-name] fetches latest commit from the branch specified in .gitmodules. Always commit the parent reference update.'),
    d('Submodule Workflows', 'Consuming: use submodules at fixed versions update intentionally. Contributing: fork submodule make changes push update parent reference. Developing together: work on parent and submodule simultaneously using --recurse-submodules for git commands. Status: git submodule status shows pinned commit.'),
    d('Submodule Alternatives', 'Package managers: npm pip Maven (better for most dependencies). Git subtree: merges external repo into your repo (no detached HEAD). Git worktree: multiple working directories of same repo. Monorepo: single repo for all code. For most modern projects package managers are preferred over submodules.')
  ],
  'Use submodules sparingly. For most dependencies use a package manager. Submodules add complexity: detached HEAD manual updates clone friction. If you use them document the workflow use --recurse-submodules in CI and consider Git subtree as a simpler alternative for tightly coupled projects.',
  [
    q('What is a Git submodule?', 'A reference to another Git repository embedded as a subdirectory keeping the histories independent.'),
    q('How does a parent repo track a submodule?', 'By storing a specific commit SHA of the submodule repo. The submodule is at a pinned version.'),
    q('How do you clone a repo with submodules?', 'git clone --recurse-submodules <url> or git clone then git submodule update --init --recursive.'),
    q('How do you update a submodule to latest?', 'cd submodule && git pull origin main then commit the updated reference in the parent repo.'),
    q('What state is a submodule in?', 'Detached HEAD it checks out the pinned commit not a branch.'),
    q('What is .gitmodules?', 'A file in the parent repo that stores the mapping of submodule paths to URLs.'),
    q('What is the difference between submodule and subtree?', 'Submodule: separate repo reference. Subtree: merges external code into your repo (no external reference needed).'),
    q('How do you add a submodule?', 'git submodule add <repository-url> <path>'),
    q('Does git submodule update --remote follow a branch?', 'Yes it pulls the latest commit from the branch specified in .gitmodules (default: main/master).'),
    q('What is a common submodule pitfall?', 'Forgetting to push the submodule changes before pushing the parent reference update breaking the parent for others.')
  ],
  R(10,35,110,25,"#0070f3","","Parent Repo","Your application") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","Submodule","External library") +
  R(10,70,110,25,"#dc3545","",".gitmodules","URL + path mapping") +
  R(10,105,110,25,"#ffc107","","Pinned Commit","abc123def456") +
  R(10,140,110,25,"#e83e8c","","Update","New commit ref") +
  R(290,35,190,155,"#17a2b8","","Git Submodules","Embed external repos as subdirectories. Separate histories. Pinned commits.") +
  T(240,220,"Git Submodules: Embed external repos at pinned commits. Useful for shared libraries complex dependencies.",9,"#666","middle"),
  [
    e('Adding and Cloning Submodules', 'Basic submodule operations.', codeBlock([
      "# Add a submodule",
      "git submodule add https://github.com/company/utils.git src/utils",
      "# Creates .gitmodules and clones src/utils",
      "",
      "# Check .gitmodules contents",
      "cat .gitmodules",
      '# [submodule "src/utils"]',
      "#   path = src/utils",
      "#   url = https://github.com/company/utils.git",
      "",
      "# Clone a project with submodules",
      "git clone --recurse-submodules https://github.com/company/app.git",
      "",
      "# If you already cloned without --recurse-submodules",
      "git submodule update --init --recursive"
    ]), 'Adding a submodule and cloning projects that use submodules.'),
    e('Updating Submodules', 'Pull latest from submodule.', codeBlock([
      "# Method 1: manual update",
      "cd src/utils",
      "git checkout main",
      "git pull origin main",
      "cd ../..",
      "git add src/utils",
      'git commit -m "chore: update utils submodule"',
      "",
      "# Method 2: automatic update",
      "git submodule update --remote src/utils",
      "# Fetches latest from branch in .gitmodules",
      "git add src/utils",
      'git commit -m "chore: update utils submodule"',
      "",
      "# Update all submodules at once",
      "git submodule update --remote",
      "git add .",
      'git commit -m "chore: update all submodules"'
    ]), 'Update submodules to their latest commits using manual or --remote approach.'),
    e('Working on Submodule Changes', 'Develop and push submodule changes.', codeBlock([
      "# Work on parent and submodule together",
      "# Start: parent depends on old commit in utils",
      "",
      "cd src/utils",
      "git checkout main",
      "git pull origin main",
      "",
      "# Make changes in submodule",
      'echo "function newFeature() {}" >> index.js',
      "git add .",
      'git commit -m "feat: add newFeature"',
      "git push origin main",
      "",
      "# Go back to parent",
      "cd ../..",
      "git add src/utils",
      'git commit -m "feat: integrate newFeature from utils"',
      "",
      "# IMPORTANT: push parent AFTER submodule push",
      "# Otherwise others get broken parent reference"
    ]), 'Workflow for developing submodule and updating parent reference.'),
    e('Submodule in CI/CD', 'Handle submodules in pipelines.', codeBlock([
      "# GitHub Actions with submodules",
      "name: CI",
      "on: [push]",
      "jobs:",
      "  test:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "        with:",
      "          submodules: recursive",
      "          token: \${{ secrets.GH_PAT }}",
      "      - run: npm ci",
      "      - run: npm test",
      "",
      "# For private submodules use PAT or SSH key:",
      "# - uses: actions/checkout@v3",
      "#   with:",
      "#     submodules: recursive",
      "#     ssh-key: \${{ secrets.SSH_PRIVATE_KEY }}"
    ]), 'CI/CD pipeline configuration for repositories with submodules.'),
    e('Submodule Branch Tracking', 'Follow a specific branch.', codeBlock([
      "# Configure submodule to track a branch",
      "git config -f .gitmodules submodule.src/utils.branch main",
      "",
      "# Or during initial add:",
      "git submodule add -b main https://github.com/company/utils.git src/utils",
      "",
      "# Now update --remote follows the branch",
      "git submodule update --remote src/utils",
      "# Fetches latest commit on main branch",
      "",
      "# .gitmodules will have:",
      '# [submodule "src/utils"]',
      "#   path = src/utils",
      "#   url = https://github.com/company/utils.git",
      "#   branch = main"
    ]), 'Configure submodules to track a branch for automatic updates with --remote.')
  ],
  [
    m('What is a Git submodule?', ['A built-in Git library', 'An embedded repo reference', 'A Git command alias', 'A remote backup'], 1, 'A submodule embeds another Git repository at a pinned commit.'),
    m('How does a parent repo track a submodule?', ['By branch name', 'By commit SHA', 'By tag name', 'By file content hash'], 1, 'The parent repo stores the specific commit SHA of the submodule.'),
    m('How do you clone a repo with submodules?', ['git clone --recursive', 'git clone --all', 'git clone --deep', 'git clone --full'], 0, 'Use git clone --recurse-submodules or git submodule update --init after cloning.'),
    m('What state is a submodule checked out to?', ['On main branch', 'Detached HEAD', 'On develop branch', 'On a tag'], 1, 'Submodules are checked out in detached HEAD state at the pinned commit.'),
    m('What file stores submodule configuration?', ['.gitignore', '.gitmodules', '.gitattributes', 'package.json'], 1, '.gitmodules stores the URL and path mapping for submodules.'),
    m('What is the main risk with submodules?', ['Security vulnerabilities', 'Out-of-sync references breaking builds', 'Slow performance', 'Disk space usage'], 1, 'If submodule changes are pushed before the parent updates its reference others get broken builds.')
  ]
);

/* =================== TOPIC 8: Git Hooks =================== */
addTopic('git-hooks', 'Git Hooks', 'intermediate', 15,
  ['Git hooks are custom scripts that run automatically at specific points in the Git lifecycle (commit push merge etc.).',
   'Client-side hooks: pre-commit pre-push post-commit post-merge (run on developer machine). Server-side hooks: pre-receive post-receive update (run on remote repository).',
   'Typical uses: lint checking before commits test running before push commit message validation code formatting preventing secrets in code.',
   'Hooks are stored in .git/hooks/ but are not tracked by Git (not part of repository). Use tools like Husky to manage and share hooks with the team.'
  ],
  'Git hooks are like airport security checkpoints. Before your commit can board (be saved) it must pass through pre-commit security: luggage check (linting) ID verification (author check) and ticket validation (message format). Pre-push is the final boarding gate: all tests must pass before takeoff.',
  [
    d('Client-Side Hook Types', 'pre-commit: runs before commit message is created. Can abort commit. prepare-commit-msg: runs before editor opens for commit message. commit-msg: runs after message is written (validate format). post-commit: runs after commit (notifications). pre-push: runs before push (tests). post-merge: after merge (install new deps).'),
    d('Server-Side Hook Types', 'pre-receive: runs on remote when push is received. Can reject entire push. update: runs for each branch being pushed. Can reject specific branches. post-receive: runs after push is accepted (CI trigger deploy notifications). Used for policy enforcement code review gates deployment triggers.'),
    d('Pre-Commit Hook Pattern', 'Typically: stash unstaged changes to run linters/formatters on staged files to check for issues to if issues abort with message to restore unstaged changes. Tools: lint-staged runs linters only on staged files. Pre-commit frameworks: husky + lint-staged is the modern standard for Node.js.'),
    d('Commit Message Hooks', 'commit-msg hook validates message format. Enforce: conventional commits (type(scope): message) max line length (72 chars) no WIP ticket reference required. Pattern matching: if [[ ! "$MSG" =~ ^(feat|fix|docs|chore): ]] to reject. Great for maintaining clean commit history.'),
    d('Sharing Hooks with the Team', 'Hooks are in .git/hooks/ (not tracked). Solution: store hooks in .githooks/ directory. Configure core.hooksPath: git config core.hooksPath .githooks. Or use Husky: manages hooks via package.json scripts auto-installs on npm install. For polyglot projects: scripts/hooks/ directory with README or install script.')
  ],
  'Git hooks automate quality checks and enforce team conventions. Use Husky + lint-staged for client-side hooks. Start with pre-commit (linting) and pre-push (tests). Validate commit messages with commit-msg hook. Server-side hooks enforce policies. Keep hooks fast slow hooks frustrate developers.',
  [
    q('What are Git hooks?', 'Custom scripts that run automatically at specific Git lifecycle events (commit push merge).'),
    q('Where are hooks stored?', 'In .git/hooks/ (local not tracked by Git). Can be configured via core.hooksPath.'),
    q('What is a pre-commit hook used for?', 'Running linters formatters and checks before a commit is created. Can abort on failure.'),
    q('What is a pre-push hook used for?', 'Running tests builds or security scans before pushing to remote.'),
    q('How do you share hooks with the team?', 'Use Husky (npm) store hooks in .githooks/ directory or use a hooks management tool.'),
    q('What is the commit-msg hook?', 'Validates the commit message format (length conventional commit compliance ticket reference).'),
    q('What are server-side hooks?', 'pre-receive update post-receive run on the remote repository during push.'),
    q('What is the post-receive hook used for?', 'CI/CD triggers deployment notifications after a push is accepted.'),
    q('What is Husky?', 'A modern tool for managing Git hooks via package.json that auto-installs hooks on npm install.'),
    q('What is the danger of slow hooks?', 'Developers may bypass hooks (git commit --no-verify). Keep hooks fast (<1 second).')
  ],
  R(10,35,110,25,"#0070f3","","pre-commit","Lint + format") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","commit-msg","Validate message") +
  A(160,60,160,80) +
  R(10,70,110,25,"#dc3545","","post-commit","Notification") +
  A(120,83,150,83) +
  R(160,70,110,25,"#ffc107","","pre-push","Run tests") +
  R(10,105,110,25,"#e83e8c","","post-merge","Install deps") +
  R(10,140,110,25,"#6610f2","","Server Hooks","Policy + deploy") +
  R(290,35,190,155,"#17a2b8","","Git Hooks","Automated scripts at Git lifecycle events. Quality gates formatting validation.") +
  T(240,220,"Git Hooks: Automated scripts at commit/push/merge events. Enforce quality conventions and policies.",9,"#666","middle"),
  [
    e('Pre-Commit Hook with Husky + lint-staged', 'Modern lint-on-commit setup.', codeBlock([
      "# package.json",
      "# Install: npm install --save-dev husky lint-staged",
      "",
      "{",
      '  "scripts": {',
      '    "prepare": "husky install"',
      "  },",
      '  "lint-staged": {',
      '    "*.{js ts}": ["eslint --fix" "prettier --write"],',
      '    "*.md": ["prettier --write"]',
      "  },",
      '  "devDependencies": {',
      '    "husky": "^8.0.0",',
      '    "lint-staged": "^13.0.0"',
      "  }",
      "}",
      "",
      "# Create hook:",
      '# npx husky add .husky/pre-commit "npx lint-staged"',
      "",
      "# .husky/pre-commit:",
      "#!/usr/bin/env sh",
      '. "$(dirname "$0")/_/husky.sh"',
      "",
      "npx lint-staged"
    ]), 'Husky + lint-staged setup: auto-format and lint only staged files on commit.'),
    e('Pre-Push Hook (Run Tests)', 'Prevent pushing broken code.', codeBlock([
      "#!/bin/bash",
      "# .husky/pre-push",
      "",
      'echo "Running tests before push..."',
      "",
      "npm test",
      "if [ $? -ne 0 ]; then",
      '  echo "Tests failed. Push aborted."',
      "  exit 1",
      "fi",
      "",
      'echo "All tests passed. Push allowed."',
      "",
      "# To bypass: git push --no-verify",
      "# Use sparingly only in emergencies"
    ]), 'Pre-push hook runs tests and aborts the push if tests fail.'),
    e('Commit Message Validation', 'Enforce conventional commits.', codeBlock([
      "#!/bin/bash",
      "# .husky/commit-msg",
      "",
      "MSG_FILE=\$1",
      'MSG=$(cat "$MSG_FILE")',
      "",
      "# Conventional commit pattern",
      'PATTERN="^(feat|fix|docs|style|refactor|test|chore|ci)(\\\\(.+\\\\))?: .+"',
      "",
      'if [[ ! "$MSG" =~ \$PATTERN ]]; then',
      '  echo "Error: Invalid commit message format"',
      '  echo "Must match: type(scope): description"',
      '  echo "Types: feat fix docs style refactor test chore ci"',
      '  echo "Example: feat(login): add OAuth support"',
      "  exit 1",
      "fi",
      "",
      "# Check line length",
      'MSG_LENGTH=$(echo "$MSG" | wc -c)',
      'if [ "$MSG_LENGTH" -gt 72 ]; then',
      '  echo "Error: Commit message too long (>72 chars)"',
      "  exit 1",
      "fi"
    ]), 'Enforce conventional commit format and line length with commit-msg hook.'),
    e('Prevent Secrets in Commits', 'Block secrets from being committed.', codeBlock([
      "#!/bin/bash",
      "# .husky/pre-commit prevent secrets",
      "",
      "# Check for common secret patterns",
      "SECRET_PATTERNS=(",
      '  "AKIA[0-9A-Z]{16}"  # AWS access key',
      '  "ghp_[a-zA-Z0-9]{36}"  # GitHub PAT',
      '  "-----BEGIN.*PRIVATE KEY-----"  # Private key',
      '  "sk_live_[a-zA-Z0-9]+"  # Stripe live key',
      '  "xox[barp]-[a-zA-Z0-9-]+"  # Slack token',
      ")",
      "",
      "FILES=$(git diff --cached --name-only | grep -v '^\\.env\\.example$')",
      "",
      'for PATTERN in "${SECRET_PATTERNS[@]}"; do',
      '  if git diff --cached -G"$PATTERN" -- "$FILES" | grep -q "$PATTERN"; then',
      '    echo "Error: Potential secret detected in staged files!"',
      '    echo "Pattern: $PATTERN"',
      "    exit 1",
      "  fi",
      "done"
    ]), 'Pre-commit hook scans staged files for API keys tokens and private keys.'),
    e('Post-Merge Hook (Install Dependencies)', 'Auto-install after pull.', codeBlock([
      "#!/bin/bash",
      "# .husky/post-merge",
      "",
      "# Check if package.json changed",
      "CHANGED=$(git diff HEAD@{1} HEAD --name-only)",
      "",
      'if echo "$CHANGED" | grep -q "package.json"; then',
      '  echo "package.json changed installing dependencies"',
      "  npm install",
      "fi",
      "",
      'if echo "$CHANGED" | grep -q "composer.json"; then',
      "  composer install",
      "fi",
      "",
      'if echo "$CHANGED" | grep -q "Gemfile"; then',
      "  bundle install",
      "fi"
    ]), 'Post-merge hook detects dependency file changes and auto-installs.')
  ],
  [
    m('What are Git hooks?', ['Git configuration files', 'Scripts that run at Git events', 'Git command aliases', 'Remote repository settings'], 1, 'Git hooks are scripts triggered by Git lifecycle events.'),
    m('Where are hooks stored locally?', ['In the repository root', 'In .git/hooks/', 'In node_modules/', 'In GitHub settings'], 1, 'Hooks are in .git/hooks/ (not tracked by Git).'),
    m('What is the most common pre-commit use?', ['Deploy to production', 'Run linters on staged files', 'Create a new branch', 'Delete remote branches'], 1, 'Pre-commit hooks typically run linters and formatters on staged changes.'),
    m('What tool manages hooks via package.json?', ['npm', 'Husky', 'Webpack', 'Babel'], 1, 'Husky manages Git hooks through package.json configuration.'),
    m('How do you bypass hooks?', ['git commit --force', 'git commit --no-verify', 'git commit --skip-hooks', 'Cannot bypass'], 1, 'Use --no-verify (or -n) to bypass client-side hooks temporarily.'),
    m('What hook validates commit messages?', ['pre-commit', 'commit-msg', 'prepare-commit-msg', 'post-commit'], 1, 'The commit-msg hook validates the commit message after it is written.')
  ]
);

/* =================== TOPIC 9: Git Bisect =================== */
addTopic('git-bisect', 'Git Bisect', 'advanced', 15,
  ['Git bisect uses binary search to find the specific commit that introduced a bug. It automates the good/bad testing process.',
   'You mark a known good commit (before bug) and a known bad commit (after bug). Bisect checks out commits in the middle for you to test.',
   'Each step: test the current commit (manually or with a script) mark git bisect good or bad. Bisect narrows down until it finds the first bad commit.',
   'Automated: git bisect run <script> runs a script at each step and uses exit code (0 = good 1-127 = bad 125 = skip) to determine result.'
  ],
  'Git bisect is like finding the day your fridge broke by halving your calendar. You know the fridge worked on Jan 1 (good) and it is broken today (bad). Check halfway: Jan 15. If working good half is eliminated. Check Mar 1. If broken bad half. In ~4 steps you find the exact day without checking every single day.',
  [
    d('Binary Search Algorithm', 'Bisect uses true binary search O(log n). 1000 commits to ~10 steps. 10000 commits to ~14 steps. Start: mark one commit good one bad. Git checks out the midpoint. You test and mark good/bad. Bisect halves the range each iteration. It converges to the exact commit that introduced the bug.'),
    d('Manual Bisect Workflow', 'git bisect start to git bisect good <sha> to git bisect bad <sha> to git checks out midpoint to test to git bisect good/bad to repeat to git bisect reset when done. Visualize progress: git bisect visualize shows the remaining commit range in gitk/log.'),
    d('Automated Bisect (git bisect run)', 'Script must return exit code 0 (good) or non-zero (bad) 125 (cannot test skip). Example: git bisect run npm test. Or: git bisect run ./test.sh. The script should be deterministic and quick. Automating bisect makes finding the bad commit effortless.'),
    d('Bisect Strategies', 'Wide range first: mark exact boundaries if known. Step size: bisect automatically computes. Skip commits that cannot be tested: git bisect skip (or exit 125 in script). Resume: git bisect replay <logfile>. Visualize: git bisect log for audit trail.'),
    d('Bisect with Fixed Bug', 'If the bad commit cannot be reproduced (flakey test environment-specific) bisect may give false positives. Best practices: write a deterministic test script. Run the script multiple times at the found commit to confirm. Check merge commits: bisect may point to a merge if the bug entered via merge.')
  ],
  'Git bisect is the most efficient tool for finding the source of a bug. Automate with git bisect run and a test script. Start with a wide range and narrow down. Always git bisect reset when done. For flakey tests mark 125 to skip. Bisect is invaluable for regression debugging.',
  [
    q('What is git bisect?', 'A binary search tool to find the commit that introduced a bug.'),
    q('How does bisect work?', 'Mark a good commit (before bug) and a bad commit (after bug). Git binary searches by checking out midpoints.'),
    q('How many steps for 1000 commits?', 'About 10 steps (log2(1000) ~ 10).'),
    q('What does git bisect run do?', 'Automates bisect with a script. Exit code 0 = good non-zero = bad 125 = skip.'),
    q('How do you exit bisect?', 'git bisect reset. Returns HEAD to the original position.'),
    q('What does exit code 125 mean in bisect run?', 'Cannot test this commit (skip it). Used for flakey tests or broken builds.'),
    q('Can bisect skip commits?', 'Yes: git bisect skip or exit 125 in automated run.'),
    q('How do you see bisect progress?', 'git bisect visualize shows remaining commits in gitk. git bisect log shows the full bisect history.'),
    q('What happens when bisect finds multiple commits?', 'Bisect finds the first bad commit. If there are multiple bad commits in sequence it finds the first one.'),
    q('What is a skip strategy in bisect?', 'If a commit cannot be built/tested skip it. Bisect will choose a different commit in the range.')
  ],
  R(10,35,100,25,"#0070f3","","Good","v1.0 (works)") +
  A(110,48,130,48) +
  R(140,35,100,25,"#28a745","","Midpoint","Test here") +
  A(240,48,260,48) +
  R(270,35,100,25,"#dc3545","","Bad","v1.1 (broken)") +
  R(10,70,130,30,"#ffc107","","Step 2","Narrow range") +
  R(10,110,130,30,"#e83e8c","","Step 3","Further narrow") +
  R(10,150,130,30,"#6610f2","","Found!","First bad commit") +
  R(160,70,220,30,"#17a2b8","","Binary Search: O(log n)","1000 commits to ~10 steps. Test midpoint each iteration.") +
  R(160,115,220,60,"#17a2b8","","Automated: git bisect run <script>","Exit 0 = good 1-127 = bad 125 = skip") +
  T(240,220,"Git Bisect: Binary search for the commit that introduced a bug. Manual or automated with git bisect run.",9,"#666","middle"),
  [
    e('Manual Bisect Workflow', 'Find bug commit step by step.', codeBlock([
      "# Start bisect",
      "git bisect start",
      "",
      "# Mark known good and bad",
      "git bisect good v1.0",
      "git bisect bad HEAD",
      "# Bisecting: 342 revisions left to test",
      "",
      "# Git checks out midpoint test it",
      "# Test manually...",
      "",
      "# If the bug is NOT present:",
      "git bisect good",
      "# Bisecting: 171 revisions left to test",
      "",
      "# If the bug IS present:",
      "git bisect bad",
      "# Bisecting: 85 revisions left to test",
      "",
      "# Repeat until found:",
      "# abc123def456 is the first bad commit",
      "",
      "# Exit bisect mode",
      "git bisect reset"
    ]), 'Manual bisect workflow: mark good/bad commits test midpoints bisect finds the first bad commit.'),
    e('Automated Bisect with Test Script', 'Let bisect run tests automatically.', codeBlock([
      "# Create a test script (test-bug.sh)",
      "#!/bin/bash",
      "npm ci --silent",
      "npx playwright test tests/login.spec.js",
      "# Exit code: 0 = good (bug fixed) non-zero = bad (bug present)",
      "",
      "# Make executable",
      "chmod +x test-bug.sh",
      "",
      "# Run automated bisect",
      "git bisect start",
      "git bisect good v1.0",
      "git bisect bad HEAD",
      "git bisect run ./test-bug.sh",
      "",
      "# Bisect runs the script at each commit",
      "# Output:",
      "# running ./test-bug.sh",
      "# ... test output ...",
      "# abc123def456 is the first bad commit",
      "",
      "git bisect reset"
    ]), 'Automated bisect with git bisect run executes a test script at each commit.'),
    e('Skip Unbuildable Commits', 'Handle commits that cannot be tested.', codeBlock([
      "#!/bin/bash",
      "# test-with-skip.sh exit 125 for unbuildable commits",
      "",
      "if ! npm ci --silent 2>/dev/null; then",
      '  echo "Dependencies cannot be installed skipping"',
      "  exit 125  # tell bisect to skip this commit",
      "fi",
      "",
      "if ! npm run build 2>/dev/null; then",
      '  echo "Build failed skipping"',
      "  exit 125",
      "fi",
      "",
      "npm test",
      "# exit code 0 = good non-zero = bad",
      "",
      "# Run bisect with skip-aware script",
      "git bisect start HEAD v1.0",
      "git bisect run ./test-with-skip.sh"
    ]), 'Use exit 125 to skip commits that cannot be built or tested.'),
    e('Bisect with Merge Commits', 'Handle merge commits in bisect.', codeBlock([
      "# Bisect can point to merge commits",
      "# Use --first-parent to avoid merge islands",
      "",
      "# Bisect following only first parent",
      "git bisect start --first-parent",
      "git bisect good v1.0",
      "git bisect bad HEAD",
      "",
      "# Or skip merge commits manually",
      "git bisect skip",
      "",
      "# Verify the found commit:",
      "git show <bad-commit> --stat",
      "git log --oneline <bad-commit>~1..<bad-commit>",
      "",
      "# Check if the bug was introduced by a merge:",
      "git log --first-parent <bad-commit>~1..<bad-commit>"
    ]), '--first-parent avoids bisecting into merged branches keeping the search linear.'),
    e('Bisect Log and Replay', 'Save and restore bisect state.', codeBlock([
      "# Save the current bisect session",
      "git bisect log > bisect-log.txt",
      "",
      "# Later (or on another machine) replay it",
      "git bisect replay bisect-log.txt",
      "# Re-executes all the good/bad marks",
      "",
      "# View bisect state",
      "git bisect visualize",
      "# Shows remaining commits in gitk",
      "",
      "# Check bisect status",
      "git bisect status",
      "# Shows current bisect state"
    ]), 'Bisect log/replay allows saving and sharing bisect sessions for collaboration.')
  ],
  [
    m('What algorithm does git bisect use?', ['Linear search', 'Binary search', 'Hash lookup', 'Bubble sort'], 1, 'Git bisect uses binary search (O(log n)) to find the first bad commit.'),
    m('How many bisect steps for ~1000 commits?', ['~100', '~50', '~10', '~3'], 2, 'log2(1000) ~ 10 steps. Binary search halves the range each time.'),
    m('How do you automate bisect?', ['git bisect auto', 'git bisect run <script>', 'git bisect auto-run', 'git bisect go'], 1, 'git bisect run automates bisect using a test script.'),
    m('What does exit code 125 mean in bisect run?', ['Good commit', 'Bad commit', 'Skip this commit', 'Abort bisect'], 2, 'Exit 125 tells git bisect to skip the current commit (cannot test).'),
    m('How do you exit bisect mode?', ['git bisect end', 'git bisect reset', 'git bisect stop', 'git bisect quit'], 1, 'git bisect reset exits bisect and returns HEAD to its original position.'),
    m('What is the benefit of bisect over manual searching?', ['Easier to type', 'Logarithmically fewer steps', 'More accurate', 'Works offline'], 1, 'Bisect finds the bad commit in O(log n) steps instead of O(n).')
  ]
);

/* =================== TOPIC 10: Git Revert =================== */
addTopic('git-revert', 'Git Revert', 'intermediate', 10,
  ['Git revert creates a new commit that undoes the changes from a previous commit. The history remains intact no rewriting.',
   'Unlike git reset (moves branch pointer rewrites history) revert is safe for shared branches because it adds a new commit rather than deleting history.',
   'Revert a single commit: git revert <sha>. Revert a range: git revert <old>..<new>. Revert a merge: git revert -m 1 <merge-sha>.',
   'Revert is the recommended way to undo changes on public/shared branches. It preserves the full commit history and is safe for collaboration.'
  ],
  'Git revert is like a time machine that adds a new event to undo a past event rather than erasing the past. If you baked a cake (commit) and it turns out terrible revert adds a remove cake from kitchen event to the timeline. The original bake cake event is still in the history you can see it. Reset would be erasing the memory of baking entirely.',
  [
    d('How Revert Works', 'Revert computes the inverse diff of the target commit and applies it as a new commit. If commit A added 10 lines revert A creates a commit that removes those 10 lines. If commit A removed a file revert A restores it (if no conflicting changes). The original commit remains in history.'),
    d('Reverting a Single Commit', 'git revert <sha>. Opens editor for commit message (default: "Revert <commit-title>"). Works on any commit not just HEAD. No-edit: git revert --no-edit <sha>. No-commit: git revert -n <sha> (stage changes but don commit allows combining multiple reverts).'),
    d('Reverting a Merge Commit', 'Merge commits have two parents. git revert -m 1 <merge-sha> reverts to the state of parent 1 (the branch you were on). -m 2 reverts to parent 2 (the branch you merged). Without -m git refuses to revert a merge (ambiguous).'),
    d('Revert Conflicts', 'If later commits modified the same code revert may conflict. Resolution is like a normal merge conflict: edit git add git revert --continue. Or abort: git revert --abort. To skip a conflicted revert: git revert --skip.'),
    d('Revert vs Reset vs Restore', 'Revert: safe for public history creates new commit. Reset: moves branch pointer rewrites history (use only on local/unpushed branches). Restore: restores working tree/index files (new Git 2.23+). For public/shared branches always use revert.')
  ],
  'Use revert for undoing changes on shared branches it preserves history and is safe for collaboration. Revert works by creating a new commit that undoes the target commit. Handle revert of merge commits with -m to specify the parent. Revert conflicts resolve like normal conflicts. Never use reset on public branches.',
  [
    q('What is git revert?', 'Creates a new commit that undoes the changes from a previous commit. History is preserved.'),
    q('How does revert differ from reset?', 'Revert: new commit safe for shared branches. Reset: moves branch pointer rewrites history.'),
    q('How do you revert a specific commit?', 'git revert <commit-sha>. Opens editor for commit message.'),
    q('How do you revert a merge commit?', 'git revert -m 1 <merge-sha>. -m specifies which parent to revert to.'),
    q('Can revert cause conflicts?', 'Yes if later commits modified the same code. Resolve like a normal conflict.'),
    q('How do you abort a revert?', 'git revert --abort. Returns to pre-revert state.'),
    q('What is the default revert commit message?', '"Revert <original commit title>". The original commit is referenced by SHA.'),
    q('How do you revert without opening an editor?', 'git revert --no-edit <sha>. Uses the default revert message.'),
    q('Can you revert multiple commits at once?', 'Yes: git revert --no-commit <old>..<new> then commit once. Or revert each individually.'),
    q('Why should you use revert instead of reset on public branches?', 'Revert is safe for collaboration (adds history). Reset rewrites history breaking other developers repositories.')
  ],
  R(10,35,100,25,"#0070f3","","Commit A","Original change") +
  A(110,48,130,48) +
  R(140,35,100,25,"#28a745","","Commit B","More changes") +
  A(240,48,260,48) +
  R(10,70,100,25,"#dc3545","","Revert A","UNDO commit A") +
  R(10,100,100,25,"#ffc107","","Commit C","New revert commit") +
  R(10,130,100,25,"#e83e8c","","Safe","History unchanged") +
  R(140,70,250,100,"#17a2b8","","Git Revert","Creates a new commit that undoes a previous commit. Safe for shared branches.") +
  T(240,220,"Git Revert: Undo past commits safely by creating a new inverse commit. Preserves full history.",9,"#666","middle"),
  [
    e('Basic Revert Commands', 'Undo commits safely.', codeBlock([
      "# Revert a single commit",
      "git log --oneline -5",
      "# a1b2c3d Add login form",
      "# e4f5g6h Fix login validation",
      "",
      "git revert a1b2c3d",
      '# Opens editor: Revert "Add login form"',
      "# Creates new commit undoing a1b2c3d",
      "",
      "# Revert without editing message",
      "git revert --no-edit a1b2c3d",
      "",
      "# Revert but do not commit (stage changes)",
      "git revert -n a1b2c3d",
      "# Make additional changes then commit",
      'git commit -m "fix: revert login form and adjust tests"',
      "",
      "# Revert multiple commits (oldest first)",
      "git revert --no-edit a1b2c3d e4f5g6h"
    ]), 'Basic revert commands for undoing specific commits with various options.'),
    e('Reverting a Merge Commit', 'Safely undo a merge.', codeBlock([
      "# Find the merge commit",
      "git log --oneline --merges -5",
      "# m0n1o2p Merge feature/login into main",
      "",
      "# Revert to parent 1 (what main was before merge)",
      "git revert -m 1 m0n1o2p --no-edit",
      "",
      "# Revert to parent 2 (what feature/login was)",
      "git revert -m 2 m0n1o2p",
      "",
      "# Why -m is needed:",
      "# Merge commit has 2 parents:",
      "# Parent 1: main (the branch you were on)",
      "# Parent 2: feature/login (the merged branch)",
      "# -m 1 means undo to main previous state",
      "",
      "# After revert you can re-merge later",
      "# (the reverted merge is still in history)"
    ]), 'Revert merge commits using -m to specify which parent to revert to.'),
    e('Revert With Conflicts', 'Resolve conflicts during revert.', codeBlock([
      "# Revert causes conflict",
      "git revert a1b2c3d",
      "# error: could not revert a1b2c3d...",
      "# hint: after resolving the conflicts",
      '# hint: mark them with "git add"',
      "",
      "# Check status to see conflicted files",
      "git status",
      "# both modified: src/auth.js",
      "",
      "# Open and resolve conflict",
      "# Edit file remove >>> <<< markers",
      "",
      "# Mark as resolved",
      "git add src/auth.js",
      "",
      "# Complete revert",
      "git revert --continue",
      "",
      "# Or abort revert entirely",
      "git revert --abort"
    ]), 'Handle revert conflicts by resolving files and completing the revert.'),
    e('Revert Already Reverted', 'Re-apply a reverted commit.', codeBlock([
      "# Scenario: you reverted a commit",
      "# but now want to re-apply it",
      "",
      "# Option 1: revert the revert",
      "git revert <revert-commit-sha>",
      "# Creates a commit that re-applies the original",
      "",
      "# Option 2: cherry-pick the original commit",
      "git cherry-pick <original-commit-sha>",
      "# Re-applies the original commit on current branch",
      "",
      "# Option 3: rebase and drop the revert",
      "# (only if branch is local/unpushed)",
      "git rebase -i HEAD~5",
      "# Delete the revert commit line"
    ]), 'Revert a revert or cherry-pick to re-apply changes that were previously reverted.'),
    e('Revert and Continue (No-Commit)', 'Combine multiple reverts into one commit.', codeBlock([
      "# Stage multiple reverts without committing",
      "git revert -n a1b2c3d",
      "git revert -n e4f5g6h",
      "git revert -n i7j8k9l",
      "",
      "# All changes are staged but not committed",
      "git status",
      "# Changes staged: 3 reverts applied",
      "",
      "# Combine into a single commit",
      'git commit -m "fix: revert login validation and OAuth changes"',
      "",
      "# Useful for:",
      "# - Reverting a whole feature",
      "# - Atomic revert of multiple related commits",
      "# - Cleaner history than individual revert commits"
    ]), 'Use --no-commit (-n) to stage multiple reverts before committing them together.')
  ],
  [
    m('What does git revert do?', ['Deletes a commit', 'Creates a new commit that undoes changes', 'Moves branch pointer', 'Rewrites history'], 1, 'Revert creates a new inverse commit safe for shared history.'),
    m('How is revert different from reset?', ['Revert rewrites history', 'Revert adds a new commit reset moves pointer', 'They are the same', 'Reset is safer for shared branches'], 1, 'Revert adds history (safe) reset rewrites history (unsafe for shared branches).'),
    m('What flag reverts a merge commit?', ['-m (parent number)', '-p (parent)', '--merge', '-f (force)'], 0, '-m specifies which parent to revert to: -m 1 or -m 2.'),
    m('What happens if a revert causes conflicts?', ['Revert is automatically aborted', 'Resolve conflicts and git revert --continue', 'The commit is skipped', 'Git force-reverts anyway'], 1, 'Handle revert conflicts like merge conflicts: resolve add continue.'),
    m('How do you revert without opening an editor?', ['git revert --silent', 'git revert --no-edit', 'git revert --quiet', 'git revert --auto'], 1, '--no-edit uses the default revert message without opening an editor.'),
    m('Why use revert instead of reset on main?', ['Faster operation', 'History is preserved for collaboration', 'Smaller repository size', 'No conflicts possible'], 1, 'Revert creates a new commit (preserves history) which is safe for shared branches.')
  ]
);

/* =================== TOPIC 11: Git Reset =================== */
addTopic('git-reset', 'Git Reset', 'intermediate', 15,
  ['Git reset moves the current branch pointer backward or forward to a specific commit optionally modifying the staging area and working directory.',
   'Three modes: --soft (only moves HEAD) --mixed (moves HEAD + resets staging area default) --hard (moves HEAD + resets staging + working directory).',
   'Reset is destructive on uncommitted work (--hard) and on commits no longer referenced (dangling commits can be recovered via reflog).',
   'Use reset for local branch cleanup unstaging files and discarding local changes. Never use reset on shared branches (rewrites history).'
  ],
  'Git reset is like adjusting a VCR tape to a specific timestamp. --soft is like moving the tape position (HEAD) but leaving the picture (working dir) and loading tray (staging) untouched. --mixed also ejects the tape (unstages). --hard rewinds ejects and forgets everything after that point like it never happened.',
  [
    d('Reset Modes', '--soft: HEAD now points to target commit. Staging area and working directory are unchanged. All changes from reset point to current state become staged. --mixed (default): HEAD moves staging area matches HEAD working directory unchanged. Changes become unstaged. --hard: HEAD moves staging and working directory match HEAD. Uncommitted changes are lost.'),
    d('Reset vs Checkout', 'git reset moves branch pointers. git checkout switches branches (and can restore files). Reset operates on the current branch. Checkout switches to a different branch. Both can restore specific files but have different effects on HEAD. Reset --hard <commit> is the most dangerous it discards working directory changes.'),
    d('Soft Reset Use Cases', 'Combine multiple commits into one: git reset --soft HEAD~3 then git commit -m "Squashed feature". Uncommit but keep changes staged: git reset --soft HEAD~1. Adjust commit base: reset --soft to a different commit. Safe because working directory is untouched no data loss.'),
    d('Mixed Reset (Default) Use Cases', 'Unstage files: git reset (defaults to --mixed HEAD). Uncommit and unstage: git reset --mixed HEAD~1. Unstage selective: git reset HEAD -- filename. Most common reset for everyday use changes remain in working directory.'),
    d('Hard Reset and Recovery', 'git reset --hard HEAD~3: discards last 3 commits and all uncommitted changes. DANGEROUS. Recovery: git reflog to find the old HEAD SHA. git reset --hard <sha> to restore. Or git checkout -b recovered <sha> to create a branch. Reflog keeps history for ~90 days (git gc prunes it).')
  ],
  'Reset is powerful but dangerous. Use --soft to merge commits. Use --mixed (default) to unstage. Use --hard sparingly. Never reset shared branches. Recovery is possible via reflog but not guaranteed. For undoing shared history use revert. For local changes reset is the right tool.',
  [
    q('What is git reset?', 'Moves the current branch pointer to a specified commit optionally modifying staging and working directory.'),
    q('What are the three reset modes?', '--soft (HEAD only) --mixed (HEAD + staging default) --hard (HEAD + staging + working directory).'),
    q('What does --soft do?', 'Moves HEAD only. Staging and working directory unchanged. Changes become staged.'),
    q('What does --mixed do?', 'Moves HEAD and resets staging area. Working directory unchanged. Changes become unstaged. Default mode.'),
    q('What does --hard do?', 'Moves HEAD resets staging area and overwrites working directory. Uncommitted changes lost.'),
    q('What is the default reset mode?', '--mixed (if no mode specified).'),
    q('Can you recover from git reset --hard?', 'Yes via git reflog. Find the old HEAD SHA and reset to it.'),
    q('Why should you never reset shared branches?', 'Reset rewrites history causing divergence for other developers who have the old history.'),
    q('What is git reset HEAD -- filename?', 'Unstages the file (removes from staging area) but keeps working directory changes.'),
    q('How do you uncommit the last commit but keep changes?', 'git reset --soft HEAD~1 (keeps changes staged) or git reset HEAD~1 (keeps changes unstaged).')
  ],
  R(10,35,110,25,"#0070f3","","Original","Commit A to B to C (HEAD)") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","--soft","HEAD to A changes staged") +
  A(120,78,150,78) +
  R(10,70,110,25,"#dc3545","","--mixed","HEAD to A changes unstaged") +
  A(120,108,150,108) +
  R(10,105,110,25,"#ffc107","","--hard","HEAD to A changes LOST") +
  R(10,140,110,25,"#e83e8c","","Reflog","Recovery possible") +
  R(290,35,190,155,"#17a2b8","","Git Reset","Move branch pointer with 3 modes: --soft --mixed --hard. Dangerous on shared branches.") +
  T(240,220,"Git Reset: Move HEAD pointer. --soft (keep staged) --mixed (unstage) --hard (discard all).",9,"#666","middle"),
  [
    e('Reset Modes Comparison', 'Visual difference between modes.', codeBlock([
      "# Initial state:",
      "# Commit A -- Commit B -- Commit C (HEAD)",
      "# Modified: src/index.js (unstaged)",
      "# Staged: src/utils.js",
      "",
      "# --soft: HEAD to Commit A",
      "git reset --soft HEAD~2",
      "# HEAD to Commit A",
      "# Staged: src/utils.js + src/index.js",
      "# Working: src/index.js (modified)",
      "",
      "# --mixed (default): HEAD to Commit A",
      "git reset --mixed HEAD~1",
      "# HEAD to Commit B",
      "# Staged: (empty)",
      "# Working: src/index.js (modified)",
      "",
      "# --hard: HEAD to Commit A",
      "git reset --hard HEAD~1",
      "# HEAD to Commit B",
      "# Working: clean (index.js changes LOST)"
    ]), 'Comparison of --soft --mixed and --hard reset modes.'),
    e('Soft Reset for Squash Commits', 'Combine multiple commits.', codeBlock([
      "# Before: 3 messy commits",
      "git log --oneline -5",
      "# d3f4g5h fix typo",
      "# b2c3d4e add test",
      "# a1b2c3d add feature",
      "",
      "# Squash into one commit",
      "git reset --soft HEAD~3",
      'git commit -m "feat: add login feature with tests"',
      "",
      "# After: 1 clean commit",
      "git log --oneline -3",
      "# x1y2z3w feat: add login feature with tests",
      "",
      "# All changes from 3 commits are now in 1 commit",
      "# Working directory unchanged safe"
    ]), 'Soft reset combines multiple commits into one without losing changes.'),
    e('Unstage Files with Mixed Reset', 'Remove files from staging.', codeBlock([
      "# Accidentally staged all files",
      "git add .",
      "git status",
      "# Changes staged: 10 files",
      "",
      "# Unstage everything (keep changes)",
      "git reset",
      "# Equivalent to: git reset --mixed HEAD",
      "",
      "# Unstage specific file",
      "git reset HEAD -- src/config.js",
      "",
      "# Now config.js changes are unstaged",
      "# but still in working directory",
      "",
      "# Uncommit last commit but keep changes",
      "git reset HEAD~1",
      "# HEAD moves back 1 changes are unstaged",
      "# Ready to re-commit with corrections"
    ]), 'Mixed reset unstages files while keeping working directory changes intact.'),
    e('Recover from Hard Reset', 'Find lost commits via reflog.', codeBlock([
      "# DANGER: accidentally did hard reset",
      "git reset --hard HEAD~5",
      "# Lost 5 commits and uncommitted work",
      "",
      "# RECOVERY: find the commit",
      "git reflog",
      "# abc123 HEAD@{0}: reset: moving to HEAD~5",
      "# def456 HEAD@{1}: commit: feat: add payment",
      "# ghi789 HEAD@{2}: commit: fix: validation",
      "",
      "# Restore to the lost state",
      "git reset --hard HEAD@{1}",
      "# Or: git reset --hard def456",
      "",
      "# Alternative: create branch first",
      "git checkout -b recovery-branch HEAD@{1}",
      "# Now inspect and merge back to main"
    ]), 'Reflog recovery from accidental hard reset find and restore lost commits.'),
    e('Reset Detached HEAD', 'Fix detached HEAD state.', codeBlock([
      "# You checked out an old commit",
      "git checkout v1.0",
      "# You are in detached HEAD state",
      "",
      "# Make changes and commit",
      'echo "fix" >> README.md',
      "git add .",
      'git commit -m "fix: readme update"',
      "",
      "# Now you want to keep this on a branch",
      "git checkout -b hotfix/v1.0-patch",
      "# OR: create branch without switching",
      "git branch hotfix/v1.0-patch",
      "",
      "# If you want to discard:",
      "git checkout main",
      "# Detached HEAD changes are lost",
      "# (can recover from reflog within ~90 days)"
    ]), 'Create a branch from detached HEAD to save work done outside any branch.')
  ],
  [
    m('What is the default reset mode?', ['--soft', '--mixed', '--hard', '--keep'], 1, '--mixed is the default mode for git reset.'),
    m('What does git reset --soft do?', ['Discards all changes', 'Moves HEAD keeps staging and working dir', 'Resets staging only', 'Deletes files'], 1, '--soft moves HEAD but leaves staging and working directory unchanged.'),
    m('What is the safest reset mode?', ['--hard', '--mixed', '--soft', 'All are equally safe'], 2, '--soft is safest as it only moves HEAD without modifying staging or working directory.'),
    m('How do you recover from git reset --hard?', ['Cannot recover', 'Use git reflog to find lost commits', 'Re-download from remote', 'Recreate from memory'], 1, 'git reflog shows past HEAD positions for recovery.'),
    m('Why never reset shared branches?', ['It is slower', 'It rewrites history breaking other devs', 'It requires internet', 'It costs money'], 1, 'Reset rewrites history. Other developers repos will diverge and require force-sync.'),
    m('What does git reset HEAD -- filename do?', ['Deletes the file', 'Unstages the file', 'Commits the file', 'Stages the file'], 1, 'Resets the file in the staging area to match HEAD (unstages it).')
  ]
);

/* =================== TOPIC 12: Git Cherry-Pick =================== */
addTopic('git-cherry-pick', 'Git Cherry-Pick', 'intermediate', 15,
  ['Git cherry-pick applies a specific commit (or commits) from one branch onto the current branch creating a new commit with the same changes.',
   'Useful for: backporting bug fixes to release branches selectively porting features picking specific changes without merging entire branches.',
   'Cherry-pick creates a new SHA even if the changes are identical it is a copy not a move. The original commit remains in its branch.',
   'Conflicts can occur during cherry-pick resolved similarly to merge/rebase conflicts. Multiple cherry-picks can be combined with -n.'
  ],
  'Cherry-pick is like picking individual apples from a neighbor tree without bringing the whole branch. Your neighbor has a tree (branch) with 10 apples (commits). You see one perfect apple (a bug fix) and want it in your basket. You reach over the fence and pick just that one apple the rest stay on the tree.',
  [
    d('Cherry-Pick Mechanics', 'Cherry-pick computes the diff of the target commit and applies it as a new commit on the current branch. It uses the same three-way merge logic as merge. The commit message is copied (can be modified with -x to append source SHA or -n to skip commit). Author information is preserved by default.'),
    d('Cherry-Pick Use Cases', 'Backport: apply a bug fix from main to a release/v1.0 branch. Hotfix: apply a fix from a development branch to a production hotfix. Selective feature porting: bring specific features without merging the entire branch. Undo/redo: revert a revert by cherry-picking the original commit.'),
    d('Cherry-Pick Multiple Commits', 'git cherry-pick A B C (cherry-pick three commits in order). git cherry-pick A..C (range: commits after A up to and including C). git cherry-pick --stdin < commits.txt (read SHAs from file). Cherry-pick processes commits in order applying each as a separate commit. For conflicts: resolve per commit.'),
    d('Cherry-Pick with -x', 'Adding -x appends "(cherry picked from commit <sha>)" to the commit message. This creates an audit trail showing where the change originated. Recommended for backports and releases. Without -x the new commit has no reference to the original SHA.'),
    d('Cherry-Pick Conflicts', 'If the same code was modified differently in the target branch cherry-pick conflicts. Resolution: edit file git add git cherry-pick --continue. Abort: git cherry-pick --abort. Skip: git cherry-pick --skip. For multiple cherry-picks conflict pauses the sequence resolve and continue for the rest.')
  ],
  'Cherry-pick is essential for selective commit porting. Use -x for audit trail on backports. Conflicts resolve per commit. For multiple cherry-picks fix conflicts and continue. Cherry-pick does NOT move the original commit it creates a copy. For entire branches prefer merge or rebase.',
  [
    q('What is git cherry-pick?', 'Applies a specific commit from one branch onto the current branch creating a new commit copy.'),
    q('When would you use cherry-pick?', 'Backporting bug fixes to release branches selective feature porting hotfix application.'),
    q('Does cherry-pick create a new SHA?', 'Yes. Even if changes are identical it creates a new commit object with a new SHA.'),
    q('What does -x do in cherry-pick?', 'Appends "(cherry picked from commit <sha>)" to the commit message for audit trail.'),
    q('How do you cherry-pick multiple commits?', 'git cherry-pick <sha1> <sha2> <sha3> or git cherry-pick <old>..<new>.'),
    q('How do you resolve cherry-pick conflicts?', 'Edit conflicting files git add git cherry-pick --continue.'),
    q('How do you abort a cherry-pick?', 'git cherry-pick --abort. Returns to pre-cherry-pick state.'),
    q('Can you cherry-pick a merge commit?', 'Yes with -m <parent-number> flag to specify which parent to follow.'),
    q('Is the original author preserved in cherry-pick?', 'Yes by default. Author name email and date are preserved from the original commit.'),
    q('What is the difference between cherry-pick and rebase?', 'Cherry-pick copies specific commits. Rebase replays all commits from one branch onto another.')
  ],
  R(10,35,100,25,"#0070f3","","Branch A","Commits X Y Z") +
  R(10,65,100,25,"#28a745","","Branch B (current)","Commits A B") +
  A(110,48,140,48) + A(110,78,140,78) +
  R(150,35,100,25,"#dc3545","","Pick X","Copy commit X") +
  R(150,65,100,25,"#ffc107","","Pick Z","Copy commit Z") +
  R(150,95,100,25,"#e83e8c","","Result","A B X Z") +
  R(260,35,220,150,"#17a2b8","","Git Cherry-Pick","Selectively apply specific commits from one branch to another. New SHAs preserved.") +
  T(240,220,"Git Cherry-Pick: Apply specific commits from one branch to another. Selective creates copies. Use -x for audit trail.",9,"#666","middle"),
  [
    e('Basic Cherry-Pick', 'Pick a single commit.', codeBlock([
      "# Find the commit to cherry-pick",
      "git log --oneline feature/login",
      "# a1b2c3d Add OAuth login",
      "# b2c3d4e Add validation",
      "# c3d4e5f Add login form",
      "",
      "# Switch to target branch",
      "git checkout release/v1.0",
      "",
      "# Cherry-pick the OAuth commit only",
      "git cherry-pick a1b2c3d",
      "",
      "# With -x for audit trail",
      "git cherry-pick -x a1b2c3d",
      "# Message: Add OAuth login",
      "# (cherry picked from commit a1b2c3d...)",
      "",
      "# Cherry-pick without committing",
      "git cherry-pick -n a1b2c3d",
      "# Stages changes you commit manually"
    ]), 'Basic cherry-pick to apply a single commit to another branch with optional -x.'),
    e('Cherry-Pick Multiple Commits', 'Apply a range of commits.', codeBlock([
      "# Apply multiple specific commits",
      "git cherry-pick a1b2c3d b2c3d4e c3d4e5f",
      "# Applies in order: a1 b2 c3 to 3 new commits",
      "",
      "# Apply a range (after A up to C)",
      "git cherry-pick a1b2c3d..c3d4e5f",
      "# Applies b2 and c3 (exclusive of a1)",
      "",
      "# Apply inclusive range",
      "git cherry-pick a1b2c3d^..c3d4e5f",
      "# Applies a1 b2 and c3 (inclusive of a1)",
      "",
      "# Combine into one commit with -n",
      "git cherry-pick -n a1b2c3d b2c3d4e c3d4e5f",
      'git commit -m "backport: OAuth login fixes"'
    ]), 'Cherry-pick multiple commits by listing SHAs using range syntax or combining with -n.'),
    e('Cherry-Pick a Merge Commit', 'Pick changes from a merge.', codeBlock([
      "# Find the merge commit",
      "git log --oneline --merges -3",
      "# m0n1o2p Merge feature/payment into main",
      "",
      "# Cherry-pick following parent 1 (main side)",
      "git cherry-pick -m 1 -x m0n1o2p",
      "",
      "# Cherry-pick following parent 2 (feature side)",
      "git cherry-pick -m 2 -x m0n1o2p",
      "",
      "# Without -m cherry-pick rejects merge commits",
      "# because it does not know which parent to follow"
    ]), 'Cherry-pick a merge commit by specifying which parent to follow with -m.'),
    e('Cherry-Pick Sequence with Conflict', 'Handle conflicts in sequence.', codeBlock([
      "# Cherry-pick multiple commits",
      "git cherry-pick a1b2c3d b2c3d4e c3d4e5f",
      "",
      "# Conflict on b2c3d4e:",
      "# Fix the conflicted file",
      "git add src/file.js",
      "",
      "# Continue the cherry-pick sequence",
      "git cherry-pick --continue",
      "# b2c3d4e committed; proceeding to c3d4e5f",
      "",
      "# If you want to abort the whole sequence:",
      "git cherry-pick --abort",
      "",
      "# If you want to skip a problematic commit:",
      "git cherry-pick --skip"
    ]), 'Cherry-pick pauses on conflicts and resumes with --continue.'), 
    e('Cherry-Pick Range from Log', 'Select commits interactively.', codeBlock([
      "# Use git log to find commits by date/author",
      'git log --author="John" --oneline -10',
      "# a1b2c3d feat: add payment gateway",
      "# b2c3d4e fix: payment timeout",
      "",
      "# Cherry-pick specific commits by range",
      "git cherry-pick a1b2c3d^..b2c3d4e",
      "",
      "# Or use interactive selection with fzf",
      "# git log --oneline | fzf --multi | awk '{print $1}' | xargs git cherry-pick",
      "",
      "# Cherry-pick from another branch without switching",
      "git cherry-pick main~2 main~1"
    ]), 'Select and cherry-pick commits interactively or by range.')
  ],
  [
    m('What is git cherry-pick?', ['Moves a branch', 'Applies a specific commit to current branch', 'Deletes a commit', 'Merges two branches'], 1, 'Cherry-pick applies a specific commit from one branch onto the current branch.'),
    m('Does cherry-pick create a new SHA?', ['No it reuses the same SHA', 'Yes always creates a new SHA', 'Depends on -x flag', 'Only if conflicts occur'], 1, 'Cherry-pick always creates a new commit object with a new SHA.'),
    m('What does -x do in cherry-pick?', ['Executes a script', 'Appends source SHA to message', 'Extracts changes', 'Excludes files'], 1, '-x appends "(cherry picked from commit <sha>)" for audit trail.'),
    m('How do you cherry-pick a merge commit?', ['Use -m to specify parent', 'Cannot cherry-pick merges', 'Use --merge flag', 'Use -p flag'], 0, 'Use -m <parent-number> to specify which parent to follow.'),
    m('What happens if a cherry-pick conflicts?', ['It aborts automatically', 'It pauses resolve and continue', 'It skips the commit', 'It force-applies'], 1, 'Cherry-pick pauses on conflicts resolve with --continue.'),
    m('Is the original author preserved?', ['No', 'Yes by default', 'Only with -x', 'Only with -a'], 1, 'Cherry-pick preserves author name email and date by default.')
  ]
);

/* =================== TOPIC 13: Pull Requests =================== */
addTopic('git-pull-request', 'Pull Requests', 'beginner', 15,
  ['A Pull Request (PR) is a request to merge changes from one branch into another typically from a feature branch into main.',
   'PRs enable code review discussion and automated CI checks before changes are merged. They are the standard collaboration mechanism in Git platforms.',
   'PR lifecycle: create from branch to add reviewers to run CI to address feedback to approve to merge (squash/rebase/merge) to delete branch.',
   'Best practices: small focused PRs (<400 lines) descriptive titles and descriptions link to issues request specific reviewers and update from target branch.'
  ],
  'A Pull Request is like asking a chef to taste your dish before adding it to the menu. You cook your dish (feature) in a separate kitchen (branch). You bring it to the chef and say Please pull my dish into the menu (main). The chef tastes it (code review) checks the recipe (CI) and either approves or asks for changes (feedback).',
  [
    d('PR Description Best Practices', 'Title: conventional commit format (feat: add payment). Description: what why and how. Include screenshots for UI changes. Link related issues: Closes #123. Checklist for tasks. Template: use PR templates (.github/PULL_REQUEST_TEMPLATE.md) for consistency.'),
    d('Code Review in PRs', 'Purpose: catch bugs improve code quality share knowledge and ensure consistency. Review types: functionality (does it work) design (is it well-structured) style (naming conventions) testing (are tests adequate). Best practices: review within 24 hours focus on logic not formatting be constructive not critical.'),
    d('PR Size and Scope', 'Best PR size: <400 lines changed. Larger PRs are harder to review (cognitive load). Split large features into multiple PRs. Each PR should do ONE thing (single responsibility). Exceptions: refactoring across many files (but explain in description). Use draft PRs for work-in-progress.'),
    d('CI/CD Integration with PRs', 'CI runs on every PR: lint tests build security scan. Status checks must pass before merge. Required checks: minimum test coverage no lint errors no security vulnerabilities. Merge gates: require CI pass require X approvals require up-to-date branch.'),
    d('Merge Methods for PRs', 'Squash merge: all commits become one commit (clean history). Merge commit: preserves all individual commits and branch structure. Rebase merge: rebases commits onto target then fast-forwards (linear history). Choose based on team convention: squash is most common for GitHub Flow.')
  ],
  'PRs are the backbone of collaborative development. Write clear descriptions link to issues and keep PRs small (<400 lines). Review code constructively and promptly. Configure CI checks as merge requirements. Choose a merge method that matches your workflow. Delete branches after merge to keep the repo clean.',
  [
    q('What is a Pull Request?', 'A request to merge changes from one branch into another enabling code review and CI checks.'),
    q('What are the benefits of PRs?', 'Code review knowledge sharing automated CI checks change tracking and collaboration.'),
    q('What is a good PR size?', 'Under 400 lines changed. Smaller PRs are easier to review and less likely to have bugs.'),
    q('What should a PR description include?', 'What changed why it changed how it was tested and links to related issues.'),
    q('What is a draft PR?', 'A PR marked as work-in-progress. Cannot be merged. Used for early feedback.'),
    q('How do you request a PR review?', 'Add reviewers via GitHub/GitLab UI. Use @mentions or auto-assign based on code ownership.'),
    q('What is the recommended CI check for PRs?', 'Lint tests build security scan and minimum test coverage percentage.'),
    q('What merge methods are available?', 'Squash merge merge commit and rebase merge. Squash is most common for clean history.'),
    q('How do you update a PR branch?', 'git merge main or git rebase main in the feature branch then force push.'),
    q('What happens after a PR is merged?', 'The feature branch should be deleted. CI/CD deploys if configured for the target branch.')
  ],
  R(10,35,110,25,"#0070f3","","Create Branch","Feature work") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","Open PR","Describe changes") +
  A(160,60,160,80) +
  R(10,70,110,25,"#dc3545","","CI Checks","Lint test build") +
  A(120,83,150,83) +
  R(160,70,110,25,"#ffc107","","Code Review","Approve changes") +
  R(10,105,110,25,"#e83e8c","","Merge","Squash/merge/rebase") +
  R(10,140,110,25,"#6610f2","","Delete Branch","Clean up") +
  R(290,35,190,155,"#17a2b8","","Pull Requests","Code review and CI before merging. Small focused PRs. Clear descriptions.") +
  T(240,220,"Pull Requests: Request to merge branches. Code review CI checks collaboration. Keep PRs small and focused.",9,"#666","middle"),
  [
    e('Creating a PR (GitHub CLI)', 'Create PR from command line.', codeBlock([
      "# Create a feature branch and push",
      "git checkout -b feat/add-search",
      "git add .",
      'git commit -m "feat: add search functionality"',
      "git push -u origin feat/add-search",
      "",
      "# Create PR",
      "gh pr create --fill --reviewer @team-lead --label enhancement",
      "# --fill: use commit title+body as PR title+body",
      "",
      "# Or with more options:",
      "gh pr create \\",
      '  --title "feat: add search functionality" \\',
      '  --body "Implements full-text search using Elasticsearch" \\',
      "  --base main \\",
      "  --reviewer alice bob \\",
      "  --assignee @me \\",
      "  --label enhancement",
      "",
      "# View PR in browser",
      "gh pr view --web"
    ]), 'Create PRs from CLI using GitHub CLI with reviewers labels and descriptions.'),
    e('PR Description Template', 'Standardized PR descriptions.', codeBlock([
      "# .github/PULL_REQUEST_TEMPLATE.md",
      "",
      "## Description",
      "Brief description of the changes.",
      "",
      "## Type of Change",
      "- [ ] feat: new feature",
      "- [ ] fix: bug fix",
      "- [ ] refactor: code restructuring",
      "- [ ] test: adding tests",
      "- [ ] chore: maintenance",
      "",
      "## How Has This Been Tested?",
      "- [ ] Unit tests",
      "- [ ] Integration tests",
      "- [ ] Manual testing",
      "",
      "## Related Issues",
      "Closes #123",
      "",
      "## Checklist",
      "- [ ] Code follows style guidelines",
      "- [ ] Self-review completed",
      "- [ ] Tests added/passed",
      "- [ ] Documentation updated"
    ]), 'PR template ensures consistent descriptions and helps reviewers understand changes.'),
    e('Automated PR Checks (CI)', 'Required checks before merge.', codeBlock([
      "name: PR Checks",
      "on: pull_request",
      "jobs:",
      "  lint:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - run: npm ci && npm run lint",
      "  test:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - run: npm ci && npm test",
      "  build:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - run: npm ci && npm run build",
      "  security:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - run: npm audit --audit-level=high"
    ]), 'CI pipeline runs lint tests build and security checks on every PR.'),
    e('Auto-Merge PRs', 'Automatically merge when conditions met.', codeBlock([
      "# GitHub: Enable auto-merge on PR",
      "# gh pr merge --auto --squash",
      "",
      "# Or via GitHub UI:",
      "# PR page > Enable auto-merge > Choose method",
      "",
      "# Auto-merge requirements:",
      "# 1. Required reviews approved",
      "# 2. All CI status checks pass",
      "# 3. Branch is up to date with target",
      "# 4. No merge conflicts",
      "",
      "# Once all conditions met GitHub",
      "# automatically merges the PR",
      "",
      "# Useful for:",
      "# - Dependabot PRs (auto-merge minor upgrades)",
      "# - Automated releases",
      "# - Team with fast review turnaround"
    ]), 'Auto-merge reduces manual overhead for PRs that meet all requirements.'),
    e('PR Labels and Milestones', 'Organize and prioritize PRs.', codeBlock([
      "# Create labels for PR management",
      '# gh label create --color 0e8a16 --description "New feature" enhancement',
      '# gh label create --color d73a4a --description "Bug fix" bug',
      '# gh label create --color 0075ca --description "Documentation" docs',
      "",
      "# Common PR labels:",
      "# - enhancement: new features",
      "# - bug: bug fixes",
      "# - breaking-change: requires attention",
      "# - needs-review: ready for review",
      "# - work-in-progress: draft PR",
      "# - dependencies: Dependabot/automated",
      "",
      "# Assign milestone for release tracking",
      '# gh pr edit 42 --milestone "v2.0"',
      "",
      "# View PRs by label",
      "# gh pr list --label enhancement --state open"
    ]), 'Labels and milestones organize PRs by type priority and release target.')
  ],
  [
    m('What is a Pull Request?', ['A server-side Git command', 'A request to merge branches with review', 'A type of Git branch', 'A Git configuration file'], 1, 'A PR requests merging changes from one branch into another with code review and CI.'),
    m('What is a good PR size?', ['Under 50 lines', 'Under 400 lines', 'Over 1000 lines', 'Any size is fine'], 1, 'PRs under 400 lines are easier to review and have fewer bugs.'),
    m('What should a PR description include?', ['Only the title', 'What why and how plus test info', 'No description needed', 'Random text'], 1, 'PR descriptions should explain what changed why and how it was tested.'),
    m('What is a draft PR?', ['Unfinished PR for early feedback', 'A PR ready to merge', 'A closed PR', 'A PR with no description'], 0, 'Draft PRs are work-in-progress and cannot be merged.'),
    m('What merge method keeps the cleanest history?', ['Merge commit', 'Squash merge', 'Rebase merge', 'All are the same'], 1, 'Squash merge combines all commits into one creating the cleanest history.'),
    m('What are required checks in PRs?', ['Optional suggestions', 'CI checks that must pass before merge', 'Personal preferences', 'Browser compatibility tests'], 1, 'Required CI checks must pass before a PR can be merged.')
  ]
);

/* =================== TOPIC 14: Code Review =================== */
addTopic('git-code-review', 'Code Review', 'intermediate', 15,
  ['Code review is the systematic examination of source code by peers to find bugs improve code quality and share knowledge.',
   'Reviews catch bugs early reduce technical debt enforce coding standards and spread domain knowledge across the team.',
   'Types: formal inspection (structured meetings) lightweight (over-the-shoulder) tool-assisted (PR-based comments) and pair programming (real-time).',
   'Best practices: review in small batches focus on logic not formatting be constructive and specific and prioritize understanding over criticism.'
  ],
  'Code review is like having a second chef taste your soup before serving. You taste it and think it is perfect. Another chef tastes it and says Needs more salt. They are not criticizing you they are making the soup better. Everyone learns what good soup tastes like. Over time the whole team makes better soup.',
  [
    d('What to Look for in Code Review', 'Correctness: does the code work as intended. Design: is it well-structured and maintainable. Security: are there vulnerabilities (injection XSS auth issues). Performance: are there obvious inefficiencies. Testing: are tests adequate and meaningful. Documentation: are complex parts explained.'),
    d('Review Etiquette', 'Be respectful: critique the code not the author. Be specific: explain why something is a problem and suggest alternatives. Be timely: review within 24 hours. Focus on what matters: logic > style. Use conventions consistently. Approve when satisfied request changes when needed comment when asking questions.'),
    d('Review Velocity', 'Goal: review within 24 hours. Blocking: PRs waiting for review slows the team. Strategies: designate reviewers per area of expertise use auto-assign rotate reviewers enforce review SLAs. Small PRs are reviewed faster than large ones.'),
    d('Automated vs Human Review', 'Let tools handle: formatting (Prettier) linting (ESLint) type checking (TypeScript) security scanning (Snyk). Humans focus on: logic correctness design decisions edge cases test quality and domain-specific concerns. Automated checks must pass before human review saves time.'),
    d('Security-Focused Code Review', 'Check for: SQL injection (parameterized queries) XSS (output encoding) authentication/authorization flaws (RBAC) CSRF protection insecure data storage (encryption) dependency vulnerabilities (known CVEs) rate limiting and input validation. Security review is critical for auth payment and data handling code.')
  ],
  'Code review is about team improvement not personal criticism. Focus on correctness design and security. Let automated tools handle formatting. Review promptly within 24 hours. Be specific constructive and respectful. Use checklists to ensure consistency. Review is a skill that improves with practice.',
  [
    q('What is code review?', 'Systematic examination of source code by peers to find bugs improve quality and share knowledge.'),
    q('What are the main goals of code review?', 'Catch bugs improve code quality share knowledge enforce standards and reduce technical debt.'),
    q('How quickly should reviews happen?', 'Within 24 hours. Fast reviews keep the team moving and prevent blocked PRs.'),
    q('What should automated tools check?', 'Formatting linting type checking and security scanning. Humans focus on logic and design.'),
    q('What is the difference between commenting and requesting changes?', 'Comment: asking a question or suggesting an option. Request changes: blocking issue that must be addressed.'),
    q('How do you handle disagreement in code review?', 'Discuss respectfully. Use data and evidence. Escalate if necessary. Remember the goal is the best outcome for the project.'),
    q('What is a code review checklist?', 'A list of common items to verify: correctness security testing edge cases error handling documentation.'),
    q('How do you review security in code?', 'Check for injection auth bypass data exposure CSRF and dependency vulnerabilities.'),
    q('What is the optimal PR size for review?', 'Under 400 lines. Larger PRs have exponentially more bugs per line.'),
    q('What is over-the-shoulder review?', 'One developer looks at another developer screen discussing code in real-time. Informal and fast.')
  ],
  R(10,35,110,25,"#0070f3","","Author","Submits PR") +
  A(120,48,150,48) +
  R(160,35,110,25,"#28a745","","Reviewer","Reads code") +
  A(160,60,160,80) +
  R(10,70,110,25,"#dc3545","","Feedback","Comments changes") +
  A(120,83,150,83) +
  R(160,70,110,25,"#ffc107","","Author Updates","Address feedback") +
  R(10,105,110,25,"#e83e8c","","Approve","PR approved") +
  R(10,140,110,25,"#6610f2","","Merge","Changes integrated") +
  R(290,35,190,155,"#17a2b8","","Code Review","Peer review for quality. Focus on logic design and security. Automated tools for formatting.") +
  T(240,220,"Code Review: Peer examination of code. Catch bugs improve quality share knowledge. Review within 24 hours.",9,"#666","middle"),
  [
    e('Code Review Checklist', 'Systematic review process.', codeBlock([
      "# Code Review Checklist",
      "",
      "## Functionality",
      "- Does the code work as described?",
      "- Are edge cases handled?",
      "- Is error handling appropriate?",
      "",
      "## Design",
      "- Is the code well-structured?",
      "- Does it follow SOLID principles?",
      "- Are there appropriate abstractions?",
      "",
      "## Security",
      "- Is user input validated/sanitized?",
      "- Are SQL queries parameterized?",
      "- Is authentication enforced?",
      "- Are secrets properly handled?",
      "",
      "## Testing",
      "- Are tests meaningful?",
      "- Do tests cover edge cases?",
      "- Do tests actually test the change?"
    ]), 'Systematic checklist ensures consistent and thorough code reviews.'),
    e('Review Comments Best Practices', 'How to write good review comments.', codeBlock([
      "# Good: Specific and helpful",
      '# "This endpoint is missing authentication.',
      '# Consider adding the @authenticate middleware',
      '# similar to other endpoints in this controller."',
      "",
      "# Better with suggestion:",
      '# "Suggestion: use Optional chaining to simplify',
      '#  const user = await getUser(id);',
      '#  if (!user) return null;',
      '#  return user.profile.email;',
      '# becomes:',
      '#  return (await getUser(id))?.profile?.email;"',
      "",
      "# Avoid: Vague or personal",
      '# "This is wrong."  (unhelpful)',
      '# "You always do this wrong." (personal)',
      '# "Fix this." (no explanation)',
      "",
      "# Use conventional comments:",
      '# "nitpick: consider renaming for clarity"',
      '# "issue: this will fail if input is null"',
      '# "thought: have you considered using X?"'
    ]), 'Constructive review comments are specific helpful and focus on the code not the author.'),
    e('Auto-Assign Reviewers (CODEOWNERS)', 'Automate reviewer assignment.', codeBlock([
      "# .github/CODEOWNERS",
      "# Automatically assigns reviewers based on file paths",
      "",
      "# Default reviewers for all files",
      "* @team-lead @senior-dev",
      "",
      "# Frontend code reviewers",
      "/src/components/ @frontend-team",
      "/src/styles/ @frontend-team",
      "",
      "# Backend code reviewers",
      "/src/api/ @backend-team",
      "/src/models/ @backend-team",
      "",
      "# Critical files: require specific review",
      "/src/config/security.js @security-officer",
      "/package.json @tech-lead",
      "",
      "# Documentation",
      "*.md @docs-team",
      "",
      "# Infrastructure",
      "/deploy/ @devops-team",
      "Dockerfile @devops-team"
    ]), 'CODEOWNERS auto-assigns reviewers based on changed files ensuring the right people review.'),
    e('Semantic PR Review (AI-Assisted)', 'Enhanced review with automation.', codeBlock([
      "# GitHub Actions: AI code review",
      "name: AI Code Review",
      "on: pull_request",
      "jobs:",
      "  review:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - name: AI Review",
      "        uses: openai/code-review-action@v1",
      "        with:",
      "          openai-api-key: \${{ secrets.OPENAI_API_KEY }}",
      "          github-token: \${{ secrets.GITHUB_TOKEN }}",
      "",
      "# Also use static analysis tools:",
      "# - CodeQL: security analysis",
      "# - SonarQube: code quality",
      "# - DeepSource: automated review",
      "",
      "# These tools find issues before",
      "# human review saving reviewer time"
    ]), 'AI-assisted and static analysis tools augment human review by catching common issues automatically.'),
    e('Reviewing Tests in PR', 'Evaluate test quality during review.', codeBlock([
      "# Questions to ask when reviewing tests:",
      "",
      "# 1. Does the test test the change?",
      "#    (not unrelated functionality)",
      "",
      "# 2. Are edge cases covered?",
      "#    - Empty inputs",
      "#    - Null/undefined values",
      "#    - Maximum values",
      "#    - Network errors",
      "",
      "# 3. Are there integration tests?",
      "#    Unit test: function works in isolation",
      "#    Integration: components work together",
      "",
      "# 4. Are tests deterministic?",
      "#    (no random data that fails intermittently)",
      "",
      "# 5. Is the test readable?",
      "#    AAA pattern: Arrange Act Assert",
      "#    test('should return user when found', () => {",
      "#      // Arrange",
      "#      const id = '123';",
      "#      // Act",
      "#      const result = getUser(id);",
      "#      // Assert",
      "#      expect(result.id).toBe(id);",
      "#    });"
    ]), 'Test review ensures meaningful coverage and reliable CI results.')
  ],
  [
    m('What is code review?', ['Running automated tests', 'Peer examination of source code', 'Writing documentation', 'Deploying to production'], 1, 'Code review is systematic peer examination of code for bugs quality and knowledge sharing.'),
    m('What should automated tools handle?', ['Logic correctness', 'Formatting and linting', 'Design decisions', 'Edge case handling'], 1, 'Automated tools handle formatting linting type checking and security scanning.'),
    m('How fast should reviews happen?', ['Within a week', 'Within 24 hours', 'Within an hour', 'No deadline'], 1, 'Reviews should happen within 24 hours to keep the team moving.'),
    m('What is the optimal PR size for review?', ['Under 100 lines', 'Under 400 lines', 'Under 1000 lines', 'Any size'], 1, 'PRs under 400 lines are optimal for effective review.'),
    m('What does CODEOWNERS do?', ['Tracks code ownership', 'Auto-assigns reviewers', 'Locks files', 'Generates documentation'], 1, 'CODEOWNERS auto-assigns reviewers based on which files are changed in a PR.'),
    m('What should human reviewers focus on?', ['Code formatting', 'Logic design and security', 'Variable naming', 'Comment style'], 1, 'Humans focus on logic correctness design decisions security and domain concerns.')
  ]
);

/* =================== TOPIC 15: CI/CD Pipeline =================== */
addTopic('git-ci-cd-pipeline', 'CI/CD Pipeline', 'intermediate', 20,
  ['CI/CD (Continuous Integration/Continuous Delivery) automates the building testing and deployment of code changes.',
   'Continuous Integration: automatically build and test every code change. Catch bugs early. Every commit to main must be deployable.',
   'Continuous Delivery: automatically deploy to staging/manual approval to production. Continuous Deployment: automatically deploy to production after tests pass.',
   'Core pipeline stages: Source (code push) to Build (compile/bundle) to Test (unit/integration/e2e) to Security Scan to Deploy (staging/production).'
  ],
  'CI/CD is like a car manufacturing assembly line. You put raw materials (code) at one end. The conveyor belt runs automatically: first the frame is assembled (build) then quality checks (tests) then safety inspection (security) then it rolls off ready (deploy). Each station must pass before moving to the next. If a station fails the whole line stops.',
  [
    d('Continuous Integration (CI)', 'Every push triggers automated build and tests. CI servers: GitHub Actions GitLab CI Jenkins CircleCI. CI must be: fast (<10 min) reliable (no flaky tests) and comprehensive (lint test build). Benefits: catch bugs immediately reduce merge conflicts enforce quality gates.'),
    d('Continuous Delivery (CD)', 'CI + automated deployment to staging. Production deployment requires manual approval. Build artifacts are versioned and stored. Rollback capability: deploy previous version if issues. CD ensures every change is potentially releasable. Common in enterprise environments with compliance requirements.'),
    d('Continuous Deployment', 'CI + fully automated deployment to production. Every commit that passes all stages goes live. Requires: high test coverage (>80%) comprehensive monitoring feature flags for gradual rollout and automated rollback. GitOps pattern: Git repository is the single source of truth for deployment state.'),
    d('Pipeline Stages in Detail', '1. Source: checkout code. 2. Install: dependencies (npm ci pip install). 3. Lint: code style (ESLint Prettier). 4. Build: compile bundle (webpack tsc). 5. Test: unit integration e2e. 6. Security: SAST dependency scan container scan. 7. Package: Docker image artifact. 8. Deploy: staging to production.'),
    d('Pipeline Security', 'Secrets management: use CI/CD secrets (GitHub Actions secrets vault). Never hardcode secrets in pipeline config. Signed commits: verify PR commits are signed. SBOM: generate software bill of contents. Supply chain: verify dependency integrity (lock files checksums). Least privilege: CI tokens with minimal permissions.')
  ],
  'CI/CD automates the path from commit to production. Start with CI: build and test every push. Add CD: automate deployment to staging with manual production gate. Evolve to continuous deployment when you have confidence in tests and monitoring. Pipeline security is critical: manage secrets properly and verify supply chain integrity.',
  [
    q('What is CI/CD?', 'Continuous Integration/Continuous Delivery automated build test and deployment pipeline.'),
    q('What is Continuous Integration?', 'Automatically building and testing every code change. Ensures every commit is integrated and verified.'),
    q('What is the difference between CD and Continuous Deployment?', 'CD: automated deploy to staging manual approval for production. Continuous Deployment: fully automated to production.'),
    q('What are the core pipeline stages?', 'Source to Install to Lint to Build to Test to Security to Deploy.'),
    q('What is a build artifact?', 'The packaged output of the build stage: Docker image compiled binary or deployment package.'),
    q('How do you handle secrets in CI/CD?', 'Use CI/CD secrets management (encrypted variables). Never hardcode secrets in pipeline YAML.'),
    q('What is a flaky test?', 'A test that sometimes passes and sometimes fails without code changes. Undermines CI reliability.'),
    q('What is GitOps?', 'A pattern where Git is the single source of truth for deployment state. Changes are made via PRs.'),
    q('What is the benefit of fast CI?', 'Fast feedback. Developers know immediately if their change broke something. Target: <10 minutes.'),
    q('What is a rollback strategy?', 'Ability to revert to a previous deployment version if the current deployment has issues.')
  ],
  R(10,35,100,20,"#0070f3","","Push","Code") +
  R(120,35,80,20,"#28a745","","Build","Compile") +
  R(210,35,80,20,"#ffc107","","Test","Verify") +
  R(300,35,80,20,"#dc3545","","Security","Scan") +
  R(390,35,90,20,"#e83e8c","","Deploy","Release") +
  A(110,45,120,45) + A(200,45,210,45) + A(290,45,300,45) + A(380,45,390,45) +
  R(10,70,470,25,"#17a2b8","","CI/CD Pipeline","Automated build test security scan deploy. Every commit verified.") +
  R(10,105,150,25,"#6610f2","","CI: Build + Test","Fast feedback <10 min") +
  R(170,105,150,25,"#0070f3","","CD: Staging","Manual approval gate") +
  R(330,105,150,25,"#28a745","","Continuous Deploy","Fully automated") +
  R(10,140,470,40,"#17a2b8","","Pipeline: Source to Build to Test to Security to Deploy. Artifacts versioned. Rollback enabled.") +
  T(240,220,"CI/CD Pipeline: Automate build test security and deployment. Fast feedback reliable releases.",9,"#666","middle"),
  [
    e('GitHub Actions CI Pipeline', 'Build and test workflow.', codeBlock([
      "name: CI",
      "on:",
      "  push:",
      "    branches: [main develop]",
      "  pull_request:",
      "    branches: [main]",
      "",
      "jobs:",
      "  build-and-test:",
      "    runs-on: ubuntu-latest",
      "    strategy:",
      "      matrix:",
      "        node: [16 18 20]",
      "",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - uses: actions/setup-node@v3",
      "        with:",
      "          node-version: \${{ matrix.node }}",
      "          cache: 'npm'",
      "      - run: npm ci",
      "      - run: npm run lint",
      "      - run: npm run build",
      "      - run: npm test -- --coverage",
      "      - uses: codecov/codecov-action@v3"
    ]), 'GitHub Actions CI pipeline: lint build test across Node.js versions with caching.'),
    e('Multi-Stage Docker Build', 'Optimized build pipeline.', codeBlock([
      "# Dockerfile with multi-stage build",
      "# Stage 1: Install dependencies",
      "FROM node:20-alpine AS deps",
      "WORKDIR /app",
      "COPY package*.json ./",
      "RUN npm ci --only=production",
      "",
      "# Stage 2: Build",
      "FROM node:20-alpine AS builder",
      "WORKDIR /app",
      "COPY --from=deps /app/node_modules ./node_modules",
      "COPY . .",
      "RUN npm run build",
      "",
      "# Stage 3: Production image",
      "FROM node:20-alpine AS runner",
      "WORKDIR /app",
      "ENV NODE_ENV production",
      "COPY --from=builder /app/dist ./dist",
      "COPY --from=deps /app/node_modules ./node_modules",
      "EXPOSE 3000",
      'CMD ["node" "dist/server.js"]'
    ]), 'Multi-stage Docker build produces smaller secure production images.'),
    e('Pipeline with Deployment Gates', 'Staged deployment with approvals.', codeBlock([
      "name: Deploy",
      "on:",
      "  push:",
      "    branches: [main]",
      "",
      "jobs:",
      "  test:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - run: npm ci && npm test",
      "",
      "  deploy-staging:",
      "    needs: [test]",
      "    runs-on: ubuntu-latest",
      "    environment: staging",
      "    steps:",
      "      - run: ./deploy.sh staging",
      "",
      "  e2e-tests:",
      "    needs: [deploy-staging]",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - run: npm run test:e2e -- --url https://staging.example.com",
      "",
      "  deploy-production:",
      "    needs: [e2e-tests]",
      "    runs-on: ubuntu-latest",
      "    environment: production",
      "    steps:",
      "      - run: ./deploy.sh production"
    ]), 'Staged deployment with environment gates: test to staging to e2e to production.'),
    e('CI/CD Secrets Management', 'Secure pipeline configuration.', codeBlock([
      "# GitHub Actions: set secrets via CLI or UI",
      "# gh secret set DOCKER_PASSWORD",
      "# gh secret set AWS_ACCESS_KEY_ID",
      "# gh secret set SLACK_WEBHOOK_URL",
      "",
      "# Use secrets in workflow:",
      "steps:",
      "  - name: Login to Docker Hub",
      "    uses: docker/login-action@v2",
      "    with:",
      "      username: \${{ secrets.DOCKER_USERNAME }}",
      "      password: \${{ secrets.DOCKER_PASSWORD }}",
      "",
      "  - name: Configure AWS",
      "    run: |",
      "      aws configure set aws_access_key_id",
      "        \${{ secrets.AWS_ACCESS_KEY_ID }}",
      "      aws configure set aws_secret_access_key",
      "        \${{ secrets.AWS_SECRET_ACCESS_KEY }}",
      "",
      "# NEVER hardcode secrets in YAML:",
      "# BAD: password: mypassword123",
      "# GOOD: password: \${{ secrets.PASSWORD }}"
    ]), 'Secrets management in CI/CD: encrypted variables never hardcoded in pipeline config.'),
    e('Rollback Strategy in Pipeline', 'Automated rollback on failure.', codeBlock([
      "name: Deploy with Rollback",
      "on: push branches: [main]",
      "jobs:",
      "  deploy:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - run: |",
      "          # Save current version for rollback",
      "          PREV_VERSION=\$(cat version.txt)",
      "          echo \"PREV_VERSION=\$PREV_VERSION\" >> \$GITHUB_ENV",
      "",
      "      - run: ./deploy.sh",
      "",
      "      - name: Health Check",
      "        run: |",
      "          for i in {1..12}; do",
      '            STATUS=\$(curl -s -o /dev/null -w "%{http_code}" https://app.example.com/health)',
      "            if [ \"\$STATUS\" = \"200\" ]; then",
      "              echo \"Health check passed\"",
      "              exit 0",
      "            fi",
      "            sleep 5",
      "          done",
      "          echo \"Health check failed rolling back\"",
      "          ./rollback.sh \$PREV_VERSION",
      "          exit 1"
    ]), 'Health check with automatic rollback on deployment failure.')
  ],
  [
    m('What does CI stand for?', ['Code Integration', 'Continuous Integration', 'Computer Interface', 'Code Inspection'], 1, 'CI = Continuous Integration: automatically building and testing every code change.'),
    m('What is the difference between CD and Continuous Deployment?', ['Same thing', 'CD deploys to staging Continuous Deployment goes to production', 'CD is manual', 'Continuous Deployment is slower'], 1, 'CD typically has a manual production gate; Continuous Deployment is fully automated.'),
    m('What is a build artifact?', ['Source code', 'The packaged output of the build stage', 'A git commit', 'A test result'], 1, 'A build artifact is the output: Docker image binary or deployment package.'),
    m('How should secrets be handled in CI/CD?', ['Hardcoded in YAML', 'Encrypted CI/CD secrets', 'In the source code', 'In documentation'], 1, 'Secrets must use encrypted CI/CD secret variables never hardcoded.'),
    m('What is a flaky test?', ['A consistently passing test', 'A test that intermittently fails', 'An untested feature', 'A slow test'], 1, 'Flaky tests pass/fail unpredictably undermining CI reliability.'),
    m('What is the recommended CI time target?', ['< 1 minute', '< 10 minutes', '< 1 hour', '< 1 day'], 1, 'Fast CI (<10 minutes) provides quick feedback to developers.')
  ]
);

/* =================== TOPIC 16: CI/CD Tools =================== */
addTopic('git-ci-cd-tools', 'CI/CD Tools', 'intermediate', 15,
  ['CI/CD tools automate the software delivery pipeline from code commit to production deployment.',
   'Popular tools: GitHub Actions (integrated with GitHub) GitLab CI/CD (integrated with GitLab) Jenkins (self-hosted extensible) CircleCI (cloud-based fast).',
   'Selection criteria: integration with your Git platform ease of use scalability pricing and plugin ecosystem.',
   'Modern trends: GitHub Actions dominates for GitHub-hosted projects due to tight integration and large marketplace of actions.'
  ],
  'CI/CD tools are like different brands of coffee machines. GitHub Actions is a Nespresso: integrated easy clean pods (actions). Jenkins is a professional espresso machine: powerful customizable but requires expertise to maintain. CircleCI is a pour-over: fast good results but needs more setup. Choose the one that fits your kitchen (team) and coffee (project).',
  [
    d('GitHub Actions', 'Integrated CI/CD for GitHub repos. YAML-based workflows. Extensive marketplace: 10,000+ actions. Free for public repos. Matrix builds: test across OS/node versions. Self-hosted runners available. Key features: environment protection rules artifact storage and workflow reuse.'),
    d('GitLab CI/CD', 'Integrated with GitLab. .gitlab-ci.yml configuration. Auto DevOps: pre-configured pipelines. Built-in container registry and Kubernetes integration. Review Apps: ephemeral environments per MR. Unique: security scanning (SAST DAST) and container scanning built-in.'),
    d('Jenkins', 'Self-hosted highly extensible Java-based CI/CD. Massive plugin ecosystem (1000+). Pipeline as Code (Jenkinsfile with Declarative or Scripted syntax). Master/agent architecture. Great for complex enterprise needs. Challenges: maintenance overhead plugin compatibility Java dependency.'),
    d('CircleCI', 'Cloud-first CI/CD focused on speed. Orbs: reusable configuration packages. Resource classes: customize CPU/memory per job. SSH debug mode. Parallelism: split tests across containers. Cache: intelligent dependency caching. Pricing based on credits (compute time).'),
    d('Tool Selection Guidance', 'Use GitHub Actions if you are on GitHub. Use GitLab CI/CD if you are on GitLab. Use Jenkins if you need self-hosted or have complex enterprise requirements. Use CircleCI for performance-optimized cloud CI. Avoid: running your own CI server unless you have dedicated DevOps resources.')
  ],
  'Choose the CI/CD tool that integrates best with your Git platform and team. GitHub Actions is the most popular choice for GitHub projects. Avoid maintaining your own CI server unless necessary. Focus on pipeline reliability and speed over feature count. A simple fast pipeline is better than a complex slow one.',
  [
    q('What is the most popular CI/CD tool for GitHub?', 'GitHub Actions tightly integrated with a large marketplace of pre-built actions.'),
    q('What is Jenkins?', 'A self-hosted extensible CI/CD server with a massive plugin ecosystem. Requires maintenance.'),
    q('What are GitHub Actions?', 'YAML-based CI/CD workflows integrated into GitHub with a marketplace of reusable actions.'),
    q('What are GitLab CI/CD orbs?', 'Reusable configuration packages for CircleCI. Similar to GitHub Actions but for CircleCI.'),
    q('What is Auto DevOps in GitLab?', 'Pre-configured CI/CD pipeline that automatically detects your application type and sets up builds tests and deploys.'),
    q('What is a self-hosted runner?', 'A CI/CD runner you host on your own infrastructure rather than using the cloud-hosted service.'),
    q('What is matrix build?', 'Running the same CI job across multiple OS/version combinations (e.g. Node 16 18 20 on Ubuntu Windows macOS).'),
    q('What is a CI/CD orb?', 'A reusable package of CircleCI configuration that encapsulates jobs commands and executors.'),
    q('What is the advantage of cloud CI over self-hosted?', 'No maintenance faster setup automatic scaling and updates. Self-hosted gives more control.'),
    q('What is the main disadvantage of Jenkins?', 'Maintenance overhead: need to manage plugins server updates and security patches.')
  ],
  R(10,35,100,20,"#0070f3","","GitHub Actions","GitHub integrated") +
  R(120,35,100,20,"#28a745","","GitLab CI/CD","Built-in") +
  R(230,35,100,20,"#ffc107","","Jenkins","Self-hosted") +
  R(340,35,100,20,"#dc3545","","CircleCI","Cloud fast") +
  R(10,65,125,20,"#e83e8c","","GitHub Actions","Marketplace YAML") +
  R(145,65,125,20,"#6610f2","","GitLab CI/CD","Auto DevOps") +
  R(280,65,125,20,"#17a2b8","","Jenkins","Plugins customizable") +
  R(415,65,75,20,"#0070f3","","CircleCI","Orbs speed") +
  R(10,100,470,70,"#17a2b8","","CI/CD Tools","GitHub Actions GitLab CI Jenkins CircleCI. Choose based on Git platform and team needs.") +
  T(240,220,"CI/CD Tools: GitHub Actions GitLab CI Jenkins CircleCI. Pick the right tool for your platform and scale.",9,"#666","middle"),
  [
    e('GitHub Actions Workflow', 'Example CI workflow.', codeBlock([
      "name: Node.js CI",
      "on:",
      "  push:",
      "    branches: [main]",
      "  pull_request:",
      "    branches: [main]",
      "",
      "jobs:",
      "  build:",
      "    runs-on: ubuntu-latest",
      "    strategy:",
      "      matrix:",
      "        node-version: [18.x 20.x]",
      "",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "      - name: Use Node.js \${{ matrix.node-version }}",
      "        uses: actions/setup-node@v3",
      "        with:",
      "          node-version: \${{ matrix.node-version }}",
      "      - run: npm ci",
      "      - run: npm run build --if-present",
      "      - run: npm test"
    ]), 'Standard GitHub Actions workflow for Node.js CI with matrix build.'),
    e('GitLab CI/CD Pipeline', 'Example .gitlab-ci.yml.', codeBlock([
      "stages:",
      "  - test",
      "  - build",
      "  - deploy",
      "",
      "cache:",
      "  paths:",
      "    - node_modules/",
      "",
      "unit-test:",
      "  stage: test",
      "  image: node:20-alpine",
      "  script:",
      "    - npm ci",
      "    - npm test",
      "  artifacts:",
      "    reports:",
      "      junit: junit.xml",
      "",
      "build:",
      "  stage: build",
      "  image: docker:latest",
      "  services:",
      "    - docker:dind",
      "  script:",
      "    - docker build -t \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA .",
      "    - docker push \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA"
    ]), 'GitLab CI/CD pipeline with test build and stages.'),
    e('Jenkins Pipeline (Jenkinsfile)', 'Declarative Jenkins pipeline.', codeBlock([
      "pipeline {",
      "    agent any",
      "    ",
      "    stages {",
      "        stage('Checkout') {",
      "            steps {",
      "                checkout scm",
      "            }",
      "        }",
      "        stage('Install') {",
      "            steps {",
      "                sh 'npm ci'",
      "            }",
      "        }",
      "        stage('Test') {",
      "            steps {",
      "                sh 'npm test'",
      "            }",
      "            post {",
      "                always {",
      "                    junit 'junit.xml'",
      "                }",
      "            }",
      "        }",
      "        stage('Build') {",
      "            steps {",
      "                sh 'npm run build'",
      "            }",
      "        }",
      "        stage('Deploy') {",
      "            steps {",
      "                sh './deploy.sh'",
      "            }",
      "        }",
      "    }",
      "    post {",
      "        failure {",
      "            mail to: 'team@example.com' subject: 'Pipeline failed'",
      "        }",
      "    }",
      "}"
    ]), 'Declarative Jenkins pipeline with stages and post-build actions.'),
    e('CircleCI Config', 'Example .circleci/config.yml.', codeBlock([
      "version: 2.1",
      "orbs:",
      "  node: circleci/node@5.0",
      "",
      "jobs:",
      "  build-and-test:",
      "    docker:",
      "      - image: cimg/node:20.0",
      "    steps:",
      "      - checkout",
      "      - node/install-packages:",
      "          pkg-manager: npm",
      "      - run:",
      "          name: Run tests",
      "          command: npm test",
      "      - run:",
      "          name: Build",
      "          command: npm run build",
      "",
      "workflows:",
      "  build-and-test:",
      "    jobs:",
      "      - build-and-test",
      "      - deploy:",
      "          requires:",
      "            - build-and-test",
      "          filters:",
      "            branches:",
      "              only: main"
    ]), 'CircleCI configuration with orbs for reusable config and workflow orchestration.'),
    e('Multi-Cloud CI Matrix', 'Test across environments.', codeBlock([
      "name: Multi-Platform CI",
      "on: [push pull_request]",
      "",
      "jobs:",
      "  test:",
      "    runs-on: \${{ matrix.os }}",
      "    strategy:",
      "      matrix:",
      "        os: [ubuntu-latest windows-latest macos-latest]",
      "        node: [16 18 20]",
      "        exclude:",
      "          - os: windows-latest",
      "            node: 16",
      "",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - uses: actions/setup-node@v3",
      "        with:",
      "          node-version: \${{ matrix.node }}",
      "      - run: npm ci",
      "      - run: npm test",
      "",
      "# Matrix runs 3 OS x 3 Node = 9 jobs",
      "# Exclude reduces to 8 (no node 16 on Windows)"
    ]), 'Matrix CI testing across operating systems and Node.js versions.')
  ],
  [
    m('Which CI/CD tool is most popular for GitHub?', ['Jenkins', 'GitHub Actions', 'CircleCI', 'GitLab CI'], 1, 'GitHub Actions is the most popular choice for GitHub-hosted repositories.'),
    m('What is Jenkins?', ['Cloud CI service', 'Self-hosted CI/CD server', 'Git hosting', 'Package manager'], 1, 'Jenkins is a self-hosted extensible CI/CD server with a large plugin ecosystem.'),
    m('What are GitHub Actions?', ['Git commands', 'YAML CI/CD workflows', 'Browser extensions', 'Code formatters'], 1, 'GitHub Actions are YAML-based CI/CD workflows with a marketplace of reusable actions.'),
    m('What is the main advantage of cloud CI?', ['More control', 'No maintenance automatic scaling', 'Cheaper', 'More secure'], 1, 'Cloud CI requires no infrastructure maintenance and scales automatically.'),
    m('What does matrix build test?', ['Database schemas', 'Multiple OS/version combinations', 'UI layouts', 'Network latency'], 1, 'Matrix builds test across combinations of operating systems and runtime versions.'),
    m('What is Jenkins Pipeline as Code?', ['Jenkinsfile in repo', 'Visual pipeline editor', 'CLI configuration', 'XML config files'], 0, 'Jenkins Pipeline as Code uses a Jenkinsfile stored in the repository.')
  ]
);

/* =================== TOPIC 17: Build Automation =================== */
addTopic('git-build-automation', 'Build Automation', 'intermediate', 20,
  ['Build automation is the process of automating the compilation packaging and preparation of source code into deployable artifacts.',
   'Key tools: npm/yarn (JS) Maven/Gradle (Java) pip (Python) make (C/C++) Webpack/Vite (frontend bundling) Docker (containerization).',
   'Build outputs: compiled binaries bundled JavaScript Docker images deployment packages and versioned artifacts.',
   'Best practices: deterministic builds (same input = same output) fast incremental builds artifact versioning and reproducible builds.'
  ],
  'Build automation is like a recipe that turns ingredients into a cake automatically. You put flour eggs sugar (source code) into a machine. It mixes (compiles) bakes (bundles) and packages the cake (artifact) ready for delivery. The same recipe always produces the same cake. No manual steps no forgetting ingredients.',
  [
    d('Build Determinism and Reproducibility', 'Deterministic build: same source always produces identical output. Key for trust and debugging. Achieved by: lock files (package-lock.json) fixed tool versions (Docker) no network-dependent steps timestamp control (SOURCE_DATE_EPOCH). Reproducible builds verify integrity across different build environments.'),
    d('Build Tools by Ecosystem', 'JavaScript/TypeScript: npm scripts Webpack Vite esbuild tsc Babel. Java: Maven (XML) Gradle (Groovy/Kotlin). Python: pip setuptools Poetry. Go: go build. Rust: cargo build. C/C++: make CMake. Multi-language: Bazel Nix. Docker: multi-stage builds for optimized images.'),
    d('Incremental and Cache-Based Builds', 'Incremental: only rebuild changed files (fast). Tools: webpack --watch Vite (HMR) tsc --incremental. Caching: store build outputs between CI runs (npm cache Docker layer caching). Cache keys: lock file hash source file hash tool version. Trade-off: cache invalidation complexity vs build speed.'),
    d('Build Artifact Management', 'Versioning: semantic version + commit SHA (myapp-1.2.3-a1b2c3d). Storage: artifact registry (Docker Hub GHCR npm registry S3). Retention: keep N latest versions tag important versions. Cleanup: automated deletion of old artifacts. SBOM: generate software bill of materials with each build.'),
    d('Build Security', 'Supply chain: verify dependency integrity (lock files checksums). No secrets in build: build args should not expose secrets. Minimal base images: Alpine distroless. SBOM generation: CycloneDX SPDX. Image scanning: Trivy Grype Snyk. Signing: cosign for container images. Provenance: SLSA attestations.')
  ],
  'Build automation is the foundation of CI/CD. Ensure builds are deterministic and fast. Use caching for speed. Version artifacts consistently (semver + commit SHA). Secure the build pipeline: verify dependencies scan images and sign artifacts. A reliable build pipeline enables confident deployments.',
  [
    q('What is build automation?', 'Automating the compilation packaging and preparation of source code into deployable artifacts.'),
    q('What is a deterministic build?', 'A build that produces identical output from the same source code regardless of when or where it is built.'),
    q('What are common build tools for JavaScript?', 'npm scripts Webpack Vite esbuild tsc. For bundling: Webpack Vite. For compilation: Babel tsc esbuild.'),
    q('What is incremental build?', 'Only rebuilding files that changed since the last build. Much faster than full rebuilds.'),
    q('What is a build artifact?', 'The output of a build: compiled binary bundled JS Docker image or deployment package.'),
    q('How do you version build artifacts?', 'Use semantic versioning combined with commit SHA: myapp-1.2.3-a1b2c3d.'),
    q('What is Docker layer caching?', 'Docker caches each layer of a Dockerfile. Only layers that change are rebuilt. Speeds up builds significantly.'),
    q('What is an SBOM?', 'Software Bill of Materials a list of all components and dependencies in a build. Used for vulnerability tracking.'),
    q('What is supply chain security?', 'Ensuring the integrity of dependencies and build tools. Lock files checksums signed commits.'),
    q('What is a multi-stage Docker build?', 'A Dockerfile with multiple FROM statements. Early stages have build tools later stages are minimal production images.')
  ],
  R(10,35,100,20,"#0070f3","","Source","Code") +
  R(120,35,100,20,"#28a745","","Install","Dependencies") +
  R(230,35,100,20,"#ffc107","","Compile","Transpile bundle") +
  R(340,35,100,20,"#dc3545","","Package","Docker image") +
  R(10,65,100,20,"#e83e8c","","Version","Semver + SHA") +
  R(120,65,100,20,"#6610f2","","Cache","Incremental build") +
  R(230,65,100,20,"#17a2b8","","Security","Scan + sign") +
  R(340,65,100,20,"#0070f3","","Publish","Registry") +
  R(10,95,430,80,"#17a2b8","","Build Automation","Deterministic build to artifact versioning to caching to security scanning. Reliable reproducible secure.") +
  T(240,220,"Build Automation: Automate compile bundle package. Deterministic incremental cached. Secure supply chain.",9,"#666","middle"),
  [
    e('Node.js Build Script (package.json)', 'Standard build scripts.', codeBlock([
      "{",
      '  "scripts": {',
      '    "build": "npm run build:ts && npm run build:vite",',
      '    "build:ts": "tsc --incremental",',
      '    "build:vite": "vite build",',
      '    "build:prod": "NODE_ENV=production npm run build",',
      '    "clean": "rm -rf dist .tsbuildinfo",',
      '    "prebuild": "npm run clean && npm ci",',
      '    "postbuild": "npm run test && npm run sbom"',
      "  }",
      "}"
    ]), 'Standard Node.js build scripts with incremental TS compilation and production optimizations.'),
    e('Docker Multi-Stage Build', 'Optimized Dockerfile.', codeBlock([
      "# Stage 1: Build",
      "FROM node:20-alpine AS builder",
      "WORKDIR /build",
      "COPY package*.json .",
      "RUN npm ci",
      "COPY . .",
      "RUN npm run build",
      "",
      "# Stage 2: Production",
      "FROM node:20-alpine",
      "WORKDIR /app",
      "COPY --from=builder /build/dist ./dist",
      "COPY --from=builder /build/node_modules ./node_modules",
      "COPY package.json .",
      "USER node",
      "EXPOSE 3000",
      'CMD ["node" "dist/server.js"]'
    ]), 'Multi-stage Docker build separates build tools from production runtime for smaller images.'),
    e('Build Caching in CI', 'Cache strategies for faster builds.', codeBlock([
      "name: Fast Build",
      "on: push",
      "jobs:",
      "  build:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "",
      "      # Cache npm dependencies",
      "      - uses: actions/cache@v3",
      "        with:",
      "          path: ~/.npm",
      "          key: npm-\${{ hashFiles('package-lock.json') }}",
      "          restore-keys: npm-",
      "",
      "      # Cache TypeScript incremental build",
      "      - uses: actions/cache@v3",
      "        with:",
      "          path: .tsbuildinfo",
      "          key: tsbuild-\${{ hashFiles('src/**/*.ts') }}",
      "",
      "      # Cache Docker layers",
      "      - uses: docker/setup-buildx-action@v2",
      "      - uses: docker/build-push-action@v4",
      "        with:",
      "          cache-from: type=gha",
      "          cache-to: type=gha,mode=max",
      "",
      "      - run: npm ci && npm run build"
    ]), 'Multi-level caching: npm packages TS build info and Docker layers for fastest CI builds.'),
    e('Artifact Versioning Strategy', 'Version your build outputs.', codeBlock([
      "# Generate version from git tag + commit",
      "VERSION=\$(git describe --tags --always --dirty)",
      "COMMIT=\$(git rev-parse --short HEAD)",
      "BUILD_TIME=\$(date -u +'%Y-%m-%dT%H:%M:%SZ')",
      "",
      "# In Node.js: inject version at build time",
      "echo \"{",
      '  \\\"version\\\": \\\"\$VERSION\\\",',
      '  \\\"commit\\\": \\\"\$COMMIT\\\",',
      '  \\\"buildTime\\\": \\\"\$BUILD_TIME\\\"',
      "}\" > public/build-info.json",
      "",
      "# Tag Docker image with version",
      "docker build -t myapp:\$VERSION .",
      "docker tag myapp:\$VERSION myapp:latest",
      "docker push myapp:\$VERSION",
      "docker push myapp:latest",
      "",
      "# Also tag with major version",
      "MAJOR=\$(echo \$VERSION | cut -d. -f1)",
      "docker tag myapp:\$VERSION myapp:\$MAJOR.x",
      "docker push myapp:\$MAJOR.x"
    ]), 'Version artifacts with git tag commit SHA and timestamp for traceability.'),
    e('SBOM Generation (CycloneDX)', 'Generate software bill of materials.', codeBlock([
      "# Install CycloneDX tool",
      "# npm install -g @cyclonedx/bom",
      "",
      "# Generate SBOM",
      "cyclonedx-bom -o sbom.xml",
      "",
      "# Or as part of CI:",
      "name: SBOM",
      "on: push",
      "jobs:",
      "  sbom:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - run: npm ci",
      "      - name: Generate SBOM",
      "        uses: CycloneDX/gh-node-module-generatebom@v1",
      "        with:",
      "          path: .",
      "          output: ./sbom.xml",
      "      - name: Upload SBOM",
      "        uses: actions/upload-artifact@v3",
      "        with:",
      "          name: sbom",
      "          path: ./sbom.xml"
    ]), 'SBOM generation creates a machine-readable inventory of all dependencies for vulnerability tracking.')
  ],
  [
    m('What is build automation?', ['Manual compilation', 'Automated compile package and prepare artifacts', 'Code formatting', 'Database migration'], 1, 'Build automation compiles packages and prepares source code into deployable artifacts.'),
    m('What is a deterministic build?', ['Random output', 'Identical output from same source', 'Faster build', 'Smaller output'], 1, 'Deterministic builds produce identical output from the same source every time.'),
    m('What does incremental build mean?', ['Build everything', 'Only rebuild changed files', 'Build on server', 'Build with warnings'], 1, 'Incremental builds only recompile files that changed since the last build.'),
    m('What is the benefit of multi-stage Docker builds?', ['More layers', 'Smaller production images', 'Faster networking', 'More memory'], 1, 'Multi-stage builds separate build tools from runtime producing smaller secure images.'),
    m('How should artifacts be versioned?', ['Just date', 'Semver + commit SHA', 'Random string', 'No versioning needed'], 1, 'Artifacts should use semantic version combined with commit SHA for traceability.'),
    m('What is an SBOM?', ['Build script', 'Software Bill of Materials', 'Build optimizer', 'Source code backup'], 1, 'An SBOM is a machine-readable inventory of all components and dependencies.')
  ]
);

/* =================== TOPIC 18: Test Automation =================== */
addTopic('git-test-automation', 'Test Automation', 'intermediate', 20,
  ['Test automation is the practice of using software tools to execute pre-scripted tests on a codebase automatically rather than manually.',
   'Automated tests run on every push in CI/CD pipelines catching regressions early. Key types: unit tests (isolated functions) integration tests (component interaction) end-to-end tests (full user workflows).',
   'Key frameworks: Jest Mocha (JS) JUnit (Java) PyTest (Python) Selenium Cypress Playwright (browser). Tests should be fast deterministic and isolated from external services.',
   'Best practices: test pyramid (many unit few e2e) arrange-act-act pattern avoid test interdependence mock external services and aim for >80% coverage on critical paths.'
  ],
  'Test automation is like a robot quality inspector on an assembly line. Instead of a human checking every tenth widget the robot checks EVERY widget instantly. It never gets tired never misses a defect and works 24/7. The initial setup takes effort but once running it catches problems that would otherwise reach the customer.',
  [
    d('Test Pyramid', 'Unit tests (70%): test individual functions/classes. Fast (ms) run on every save. Integration tests (20%): test component interaction database file system. Slower but catch API contract issues. End-to-end tests (10%): test full user flows in browser. Slow (seconds) but catch real user-facing bugs.'),
    d('Unit Testing Best Practices', 'Test one thing per test. Use descriptive names: test("should return user when valid id"). Arrange-Act-Assert pattern. Mock external dependencies (HTTP DB). Test edge cases: empty input null undefined boundaries. Avoid testing implementation details test behavior. Use code coverage to find untested paths.'),
    d('Integration Testing', 'Test real interactions between components: API endpoints database queries file I/O. Use test containers for databases. Run against a test environment not production. Integration tests catch: schema mismatches incorrect API contracts broken serialization. Slower than unit tests but higher confidence.'),
    d('End-to-End Testing', 'Browser tests that simulate real user interactions. Tools: Cypress Playwright Selenium. Test critical user journeys: login signup checkout search. Run against staging environment. Flaky tests are the biggest challenge. Use retry mechanisms and independent test data.'),
    d('CI/CD Test Integration', 'Unit tests: run on every push (fast). Integration tests: run on PR to main (medium). E2E tests: run on merge to main (slow). Parallel test execution across multiple CI runners. Test splitting: distribute tests by file/execution time. Fail fast: cancel CI if a critical test fails.')
  ],
  'Test automation is non-negotiable for CI/CD. Start with unit tests they give the best speed-value ratio. Add integration tests for critical paths. Add a few E2E tests for key user journeys. Keep tests fast and reliable. A flaky test is worse than no test because it erodes trust in the pipeline.',
  [
    q('What is test automation?', 'Using software tools to execute pre-scripted tests automatically on each code change.'),
    q('What are the three main test types?', 'Unit (isolated functions) Integration (component interaction) E2E (full user workflows).'),
    q('What is the test pyramid?', 'Many unit tests (70%) some integration tests (20%) few E2E tests (10%).'),
    q('What is the Arrange-Act-Assert pattern?', 'AAA: set up test data (Arrange) execute the code (Act) verify the result (Assert).'),
    q('Why mock external dependencies in tests?', 'To make tests fast deterministic and isolated from network/database failures.'),
    q('What is a flaky test?', 'A test that sometimes passes and sometimes fails without code changes. Undermines CI reliability.'),
    q('What is code coverage?', 'A metric measuring what percentage of code is executed during tests. Not a quality guarantee.'),
    q('What is parallel test execution?', 'Running multiple test files simultaneously across CI runners to reduce total test time.'),
    q('What is the difference between Cypress and Playwright?', 'Both are E2E frameworks. Cypress is JS-only with better debugging. Playwright supports multiple languages and browsers.'),
    q('What is a test fixture?', 'A fixed state of data used as a baseline for running tests ensuring test reproducibility.')
  ],
  R(10,35,100,25,"#0070f3","","Unit (70%)","Fast ms") +
  A(110,48,130,48) +
  R(140,35,100,25,"#28a745","","Integration (20%)","Medium s") +
  A(240,48,260,48) +
  R(10,70,100,25,"#dc3545","","E2E (10%)","Slow seconds") +
  R(140,70,100,25,"#ffc107","","CI Pipeline","Automated per push") +
  R(140,100,100,25,"#e83e8c","","Parallel","Multiple runners") +
  R(10,100,100,25,"#6610f2","","Coverage",">80% critical paths") +
  R(260,35,220,150,"#17a2b8","","Test Automation","Automated testing in CI/CD: unit integration E2E. Fast reliable deterministic. Pyramid principle.") +
  T(100,210,"Test Automation: Automated tests in CI/CD. Unit Integration E2E pyramid. Fast deterministic isolated.",9,"#666","middle"),
  [
    e('Unit Test Example (Jest)', 'Test a function in isolation.', codeBlock([
      "// math.js",
      "function divide(a, b) {",
      "  if (b === 0) throw new Error('Cannot divide by zero');",
      "  return a / b;",
      "}",
      "",
      "// math.test.js",
      "describe('divide', () => {",
      "  test('divides positive numbers', () => {",
      "    expect(divide(10, 2)).toBe(5);",
      "  });",
      "",
      "  test('throws on zero divisor', () => {",
      "    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');",
      "  });",
      "",
      "  test('handles negative numbers', () => {",
      "    expect(divide(-10, 2)).toBe(-5);",
      "  });",
      "",
      "  test('handles decimal results', () => {",
      "    expect(divide(7, 3)).toBeCloseTo(2.333, 3);",
      "  });",
      "});"
    ]), 'Unit test example with Jest covering normal edge case and error paths.'),
    e('Integration Test (Supertest)', 'Test an API endpoint.', codeBlock([
      "const request = require('supertest');",
      "const app = require('./app');",
      "",
      "describe('POST /api/users', () => {",
      "  test('creates a new user', async () => {",
      "    const res = await request(app)",
      "      .post('/api/users')",
      "      .send({ name: 'Alice', email: 'alice@test.com' });",
      "",
      "    expect(res.status).toBe(201);",
      "    expect(res.body).toHaveProperty('id');",
      "    expect(res.body.name).toBe('Alice');",
      "  });",
      "",
      "  test('rejects duplicate email', async () => {",
      "    const res = await request(app)",
      "      .post('/api/users')",
      "      .send({ name: 'Bob', email: 'alice@test.com' });",
      "",
      "    expect(res.status).toBe(409);",
      "    expect(res.body.error).toContain('exists');",
      "  });",
      "",
      "  test('validates required fields', async () => {",
      "    const res = await request(app)",
      "      .post('/api/users')",
      "      .send({});",
      "",
      "    expect(res.status).toBe(400);",
      "  });",
      "});"
    ]), 'Integration test for a REST API endpoint covering success error and validation cases.'),
    e('CI Test Configuration (GitHub Actions)', 'Run tests in CI pipeline.', codeBlock([
      "name: Test Suite",
      "on: [push, pull_request]",
      "",
      "jobs:",
      "  test:",
      "    runs-on: ubuntu-latest",
      "    strategy:",
      "      matrix:",
      "        node: [18, 20]",
      "",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "      - uses: actions/setup-node@v4",
      "        with:",
      "          node-version: \${{ matrix.node }}",
      "      - run: npm ci",
      "      - run: npm run lint",
      "      - run: npm test -- --coverage",
      "      - uses: codecov/codecov-action@v3",
      "      - run: npm run test:integration",
      "        if: github.ref == 'refs/heads/main'"
    ]), 'CI pipeline running lint unit tests with coverage and integration tests on main.'),
    e('Mocking External Dependencies', 'Isolate tests from external services.', codeBlock([
      "// user-service.test.js",
      "jest.mock('./email-service');",
      "const { sendWelcomeEmail } = require('./email-service');",
      "const { createUser } = require('./user-service');",
      "",
      "test('sends welcome email on user creation', async () => {",
      "  sendWelcomeEmail.mockResolvedValue(true);",
      "",
      "  const user = await createUser({ name: 'Alice', email: 'a@b.com' });",
      "",
      "  expect(sendWelcomeEmail).toHaveBeenCalledWith(user.email);",
      "  expect(sendWelcomeEmail).toHaveBeenCalledTimes(1);",
      "});",
      "",
      "test('handles email failure gracefully', async () => {",
      "  sendWelcomeEmail.mockRejectedValue(new Error('SMTP down'));",
      "",
      "  const user = await createUser({ name: 'Bob', email: 'b@c.com' });",
      "",
      "  expect(user).toBeDefined();",
      "  expect(console.error).toHaveBeenCalled();",
      "});"
    ]), 'Mock external services to make tests deterministic and fast.'),
    e('Parallel Test Execution (Jest)', 'Run tests faster in parallel.', codeBlock([
      "// jest.config.js",
      "module.exports = {",
      "  maxWorkers: '50%',  // Use 50% of CPU cores",
      "  testMatch: ['**/*.test.js'],",
      "  testTimeout: 10000,",
      "  bail: 1,  // Stop after first failure in CI",
      "  verbose: true,",
      "",
      "  // Shard tests across CI runners",
      "  // --shard=1/4 on first of 4 runners",
      "};",
      "",
      "# Run in CI with sharding:",
      "# npx jest --shard=\${{ matrix.shard }}/4",
      "#",
      "# Split by file:",
      "# npx jest --listTests | split -l 10",
      "#",
      "# Use jest --onlyChanged for local dev",
      "# jest --changedSince=main"
    ]), 'Parallel test execution with Jest sharding distributes tests across CI runners for speed.')
  ],
  [
    m('What is the test pyramid?', ['All tests are equal', 'Many unit some integration few E2E', 'Only E2E tests', 'Only unit tests'], 1, 'Test pyramid: many unit tests (fast) some integration medium E2E (few slow).'),
    m('What is the Arrange-Act-Assert pattern?', ['Setup execute verify', 'Act arrange assert', 'Assert act arrange', 'Random order'], 0, 'AAA: Arrange (setup) Act (execute) Assert (verify).'),
    m('Why mock external services?', ['Make tests faster', 'Tests become deterministic and fast', 'Less code to write', 'Better coverage'], 1, 'Mocking makes tests deterministic by removing external dependencies and network calls.'),
    m('What is a flaky test?', ['A consistently passing test', 'A test that intermittently fails', 'A very slow test', 'A new test'], 1, 'Flaky tests pass/fail unpredictably undermining CI reliability and developer trust.'),
    m('What is code coverage?', ['Percentage of code executed by tests', 'Number of test files', 'Test execution time', 'Number of assertions'], 0, 'Code coverage measures how much of the codebase is executed during tests.'),
    m('What is the benefit of parallel test execution?', ['Fewer tests needed', 'Reduced total CI test time', 'Better coverage', 'Simpler tests'], 1, 'Parallel execution dramatically reduces total CI pipeline time by running tests across multiple runners.')
  ]
);

/* =================== TOPIC 19: Deployment Automation =================== */
addTopic('git-deployment-automation', 'Deployment Automation', 'advanced', 20,
  ['Deployment automation is the practice of automatically releasing software changes to production environments without manual intervention.',
   'Key components: CI/CD pipeline build artifacts artifact registry deployment strategies (blue-green canary rolling) and health checks with auto-rollback.',
   'Tools: GitHub Actions GitLab CI Jenkins ArgoCD (GitOps) Terraform (infrastructure) Docker Kubernetes. Modern deployments target containers/orchestrators.',
   'Best practices: immutable infrastructure (never modify a running server replace it) infrastructure as code zero-downtime deployments and feature flags for gradual rollouts.'
  ],
  'Deployment automation is like an autopilot system for an airplane. You set the destination (production) and the autopilot handles takeoff (build) navigation (pipeline gates) landing (deploy) and even go-arounds (rollback) if conditions are unsafe. The pilot monitors but does not manually fly. Manual deployment is like flying by hand every time exhausting and error-prone.',
  [
    d('Deployment Strategies', 'Blue-Green: two identical environments switch traffic. Zero downtime. Canary: gradual traffic shift 1% 5% 10% 100%. Risk mitigation. Rolling: replace instances one by one. Good for clusters. Recreate: stop old start new. Simple but downtime. Choose based on risk tolerance and infrastructure.'),
    d('Immutable Infrastructure', 'Never patch a running server. Instead build a new image and replace. Benefits: consistent environments no configuration drift easy rollback (deploy previous image). Implemented via: Docker images AMIs VM snapshots. Coupled with IaC (Terraform Pulumi CloudFormation) for full reproducibility.'),
    d('Infrastructure as Code (IaC)', 'Define infrastructure in version-controlled config files. Tools: Terraform (multi-cloud) Pulumi (programmable) AWS CDK (TypeScript) Ansible (config management). Benefits: reviewable auditable repeatable. IaC + immutable infrastructure = full environment reproducibility.'),
    d('Rollback Strategies', 'Automatic rollback on health check failure. Strategies: revert to previous deployment (blue-green) scale up previous canary group (canary) re-run previous CI build (rolling). Database rollbacks: backward-compatible migrations or feature flags. Always test rollback procedure.'),
    d('GitOps Pattern', 'Git is the single source of truth for deployment state. Tools: ArgoCD Flux (Kubernetes). Agent in cluster syncs to desired state in Git. Changes via PR to Git repo. Benefits: audit trail review process automatic drift correction. Declarative: desired state vs actual state.')
  ],
  'Deployment automation is the final frontier of CI/CD maturity. Start with simple scripts then adopt blue-green or canary deployments. Use immutable infrastructure and IaC for reproducibility. Implement health checks and auto-rollback. GitOps provides the highest level of auditability and control for Kubernetes environments.',
  [
    q('What is deployment automation?', 'Automatically releasing software changes to production without manual intervention.'),
    q('What is blue-green deployment?', 'Two identical environments. Switch traffic from blue (old) to green (new). Instant rollback.'),
    q('What is canary deployment?', 'Gradually shift traffic to new version: 1% 5% 10% 100%. Monitor each step.'),
    q('What is immutable infrastructure?', 'Never modify running servers. Build new images and replace. Configuration drift eliminated.'),
    q('What is Infrastructure as Code?', 'Defining infrastructure (servers networks) in version-controlled config files.'),
    q('What is GitOps?', 'Git as single source of truth for deployment state. Agent syncs cluster to desired state in Git.'),
    q('What is automatic rollback?', 'Deploy health checks abort deployment and revert if checks fail.'),
    q('What is zero-downtime deployment?', 'Deploying without interrupting service. Achieved via blue-green rolling or canary strategies.'),
    q('What is a deployment artifact?', 'The versioned deployable unit: Docker image compiled binary or deployment package.'),
    q('What is a health check endpoint?', 'A URL (e.g. /health) that returns the application status. Used by load balancers and deploy pipelines.')
  ],
  R(10,35,100,25,"#0070f3","","Build","Compile + test") +
  A(110,48,130,48) +
  R(140,35,100,25,"#28a745","","Package","Docker image") +
  A(240,48,260,48) +
  R(10,70,100,25,"#dc3545","","Blue-Green","Switch traffic") +
  R(140,70,100,25,"#ffc107","","Canary","Gradual rollout") +
  R(10,105,100,25,"#e83e8c","","Health Check","Verify deployment") +
  R(140,105,100,25,"#6610f2","","Rollback","Auto-revert") +
  R(260,35,220,150,"#17a2b8","","Deployment Automation","Automated release pipeline: build to package to deploy. Blue-green canary rolling. Health checks rollback.") +
  T(100,210,"Deployment Automation: Blue-green canary rolling deployments. Health checks auto-rollback immutable infrastructure.",9,"#666","middle"),
  [
    e('Blue-Green Deployment Script', 'Switch traffic between environments.', codeBlock([
      "#!/bin/bash",
      "# Blue-Green deployment",
      "",
      "# Variables",
      'BLUE_URL="https://blue.app.com/health"',
      'GREEN_URL="https://green.app.com/health"',
      "ACTIVE_COLOR=$(cat /deploy/active-color.txt)",
      "",
      "# Deploy to inactive environment",
      'if [ "$ACTIVE_COLOR" = "blue" ]; then',
      '  NEW_COLOR="green"',
      "else",
      '  NEW_COLOR="blue"',
      "fi",
      "",
      'echo "Deploying to $NEW_COLOR..."',
      "./deploy-to.sh $NEW_COLOR",
      "",
      "# Health check the new environment",
      "sleep 10",
      'STATUS=$(curl -s -o /dev/null -w "%{http_code}"',
      '  "${NEW_COLOR^^}_URL")',
      "",
      'if [ "$STATUS" != "200" ]; then',
      '  echo "Health check failed rolling back"',
      "  exit 1",
      "fi",
      "",
      "# Switch traffic",
      'echo "Switching traffic to $NEW_COLOR"',
      'echo "$NEW_COLOR" > /deploy/active-color.txt',
      "./update-load-balancer.sh $NEW_COLOR",
      "",
      'echo "Deployment to $NEW_COLOR complete"'
    ]), 'Blue-green deployment script deploys to inactive environment health checks then switches traffic.'),
    e('Canary Deployment with Kubernetes', 'Gradual rollout in K8s.', codeBlock([
      "# Kubernetes canary deployment",
      "apiVersion: apps/v1",
      "kind: Deployment",
      "metadata:",
      "  name: myapp-canary",
      "spec:",
      "  replicas: 1  # 10% of main 10 replicas",
      "  selector:",
      "    matchLabels:",
      "      app: myapp",
      "      track: canary",
      "  template:",
      "    metadata:",
      "      labels:",
      "        app: myapp",
      "        track: canary",
      "    spec:",
      "      containers:",
      "      - name: myapp",
      "        image: myapp:1.2.3-canary",
      "        readinessProbe:",
      "          httpGet:",
      "            path: /health",
      "            port: 8080",
      "",
      "# Service splits traffic via label selector",
      "# Canary gets 1 replica = ~10% traffic",
      "# Monitor errors for 10 minutes",
      "# If OK scale canary to 10 then scale down main"
    ]), 'Kubernetes canary deployment using replicas for traffic splitting between versions.'),
    e('Terraform IaC Example', 'Define infrastructure as code.', codeBlock([
      "# main.tf - AWS infrastructure",
      'provider "aws" {',
      '  region = "us-east-1"',
      "}",
      "",
      'resource "aws_ecs_cluster" "main" {',
      '  name = "myapp-cluster"',
      "}",
      "",
      'resource "aws_ecs_service" "app" {',
      '  name            = "myapp"',
      '  cluster         = aws_ecs_cluster.main.id',
      '  task_definition = aws_ecs_task_definition.app.arn',
      '  desired_count   = 3',
      '  launch_type     = "FARGATE"',
      "",
      "  network_configuration {",
      "    subnets         = aws_subnet.private[*].id",
      "    security_groups = [aws_security_group.app.id]",
      "  }",
      "",
      "  deployment_controller {",
      '    type = "CODE_DEPLOY"  # Blue-green',
      "  }",
      "}"
    ]), 'Terraform defines AWS ECS infrastructure as code for repeatable deployments.'),
    e('ArgoCD GitOps Application', 'GitOps deployment with ArgoCD.', codeBlock([
      "# argocd-application.yaml",
      "apiVersion: argoproj.io/v1alpha1",
      "kind: Application",
      "metadata:",
      "  name: myapp",
      "  namespace: argocd",
      "spec:",
      "  project: default",
      "  source:",
      "    repoURL: https://github.com/company/myapp-config.git",
      "    targetRevision: HEAD",
      "    path: k8s/production",
      "  destination:",
      "    server: https://kubernetes.default.svc",
      "    namespace: production",
      "  syncPolicy:",
      "    automated:",
      "      prune: true  # Remove resources not in Git",
      "      selfHeal: true  # Revert manual changes",
      "    syncOptions:",
      "      - CreateNamespace=true",
      "",
      "# GitOps flow:",
      "# 1. Update k8s/production/deployment.yaml in Git",
      "# 2. PR review and merge to main",
      "# 3. ArgoCD detects drift and syncs cluster",
      "# 4. Cluster matches desired state in Git"
    ]), 'ArgoCD Application resource defines GitOps deployment with auto-sync and self-healing.'),
    e('CI/CD Deployment Pipeline', 'Full deploy pipeline with rollback.', codeBlock([
      "name: Deploy to Production",
      "on:",
      "  push:",
      "    branches: [main]",
      "",
      "jobs:",
      "  deploy:",
      "    runs-on: ubuntu-latest",
      "    environment: production",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "",
      "      - name: Build and push Docker image",
      "        run: |",
      "          docker build -t myapp:\${{ github.sha }} .",
      "          docker push myapp:\${{ github.sha }}",
      "",
      "      - name: Deploy to staging",
      "        run: ./deploy.sh staging \${{ github.sha }}",
      "",
      "      - name: Staging health check",
      "        run: |",
      '          for i in {1..12}; do',
      '            STATUS=\$(curl -s -o /dev/null -w "%{http_code}" https://staging.myapp.com/health)',
      '            if [ "\$STATUS" = "200" ]; then exit 0; fi',
      "            sleep 5",
      "          done",
      "          exit 1",
      "",
      "      - name: Promote to production",
      "        run: ./deploy.sh production \${{ github.sha }}",
      "",
      "      - name: Post-deploy health check",
      "        run: |",
      "          if ! curl -f https://myapp.com/health; then",
      "            ./rollback.sh production",
      "            exit 1",
      "          fi"
    ]), 'Full deployment pipeline with staging verification and production rollout with health check.')
  ],
  [
    m('What is blue-green deployment?', ['Gradual traffic shift', 'Two environments switch traffic', 'Replace instances one by one', 'Stop and start'], 1, 'Blue-green uses two identical environments and switches traffic between them for zero-downtime.'),
    m('What is canary deployment?', ['Deploy all at once', 'Gradual traffic shift to new version', 'Two environments', 'Manual deployment'], 1, 'Canary gradually shifts traffic from old to new version monitoring each step.'),
    m('What is immutable infrastructure?', ['Patch running servers', 'Replace servers never modify', 'Manual configuration', 'Shared hosting'], 1, 'Immutable infrastructure builds new images and replaces servers instead of patching running ones.'),
    m('What is Infrastructure as Code?', ['Manual server setup', 'Infrastructure defined in version-controlled files', 'Graphical UI tools', 'Shell scripts only'], 1, 'IaC defines infrastructure in code enabling review repeatability and audit trails.'),
    m('What is GitOps?', ['Git as deployment source of truth', 'Git as backup tool', 'Git for code only', 'Git for documentation'], 0, 'GitOps uses Git as the single source of truth for deployment state with automatic cluster sync.'),
    m('What triggers automatic rollback?', ['Deployment complete', 'Health check failure', 'New PR opened', 'Code review approved'], 1, 'Automatic rollback triggers when health checks fail after deployment.')
  ]
);

/* =================== TOPIC 20: Release Management =================== */
addTopic('git-release-mgmt', 'Release Management', 'intermediate', 15,
  ['Release management is the process of planning scheduling and controlling software builds through different stages to production.',
   'Key elements: semantic versioning (MAJOR.MINOR.PATCH) release branches release notes changelogs and version bumping in CI/CD.',
   'Release lifecycle: feature development to release branch to QA/stabilization to production release to hotfix if needed. Each release is tagged and immutable.',
   'Tools: GitHub Releases GitLab Releases semantic-release (automated) release-drafter (auto-changelog). Releases should be automated version-bump merge to main and tag.'
  ],
  'Release management is like a train schedule. Features are passengers waiting at the station (develop branch). Every two weeks a train (release branch) departs. Tickets are checked (QA testing). Passengers who miss the train wait for the next one. Sometimes an emergency express train (hotfix) runs on a special schedule. Each train has a unique number (version tag).',
  [
    d('Semantic Versioning (SemVer)', 'MAJOR: breaking changes (v2.0.0). MINOR: new features backward compatible (v1.1.0). PATCH: bug fixes backward compatible (v1.0.1). Pre-release: v1.0.0-beta.1 v1.0.0-rc.1. Build metadata: v1.0.0+build.456. Version defined in package.json or equivalent.'),
    d('Release Branch Strategy', 'Git Flow: release/v1.2 branched from develop. Only bug fixes and release tasks (no new features). Merged to main (tagged) and develop. GitHub Flow: no release branches. Tag on main after merge. Trunk-Based: release branches from main for stabilization.'),
    d('Changelog Generation', 'Conventional commits enable automated changelog. feat: adds to Features section. fix: adds to Bug Fixes. breaking changes: highlighted. Tools: conventional-changelog release-drafter semantic-release. Format: Keep a Changelog. Each release links to diff and release notes.'),
    d('Release Automation (semantic-release)', 'Fully automated release process. Analyzes commits since last release. Determines next version (major/minor/patch). Generates changelog. Creates Git tag. Publishes to npm/registry. Creates GitHub Release. Requires conventional commit format.'),
    d('Hotfix Management', 'Hotfix branch from main (or production tag). Fix the critical bug. Merge back to main (tag new patch version). Merge back to develop (if using Git Flow). Hotfixes skip the normal release cycle. Version bump: patch version (v1.0.1). Hotfixes should be rare; they indicate release process improvement needed.')
  ],
  'Release management brings predictability to shipping software. Use semantic versioning. Automate version bumps and changelogs with conventional commits and semantic-release. Use release branches for stabilization. Hotfixes should be rare. A good release process reduces stress and increases confidence in deployments.',
  [
    q('What is release management?', 'Planning scheduling and controlling software builds through stages to production.'),
    q('What is semantic versioning?', 'MAJOR.MINOR.PATCH: breaking changes new features backward compatible bug fixes backward compatible.'),
    q('What is a release branch?', 'A branch for stabilizing a release. Only bug fixes and release tasks. Merged to main and develop.'),
    q('What are release notes?', 'Documentation accompanying a release listing features fixes and breaking changes.'),
    q('What is semantic-release?', 'An automated release tool that determines version generates changelog creates tag and publishes.'),
    q('What is a changelog?', 'A curated list of notable changes for each version of a project.'),
    q('What is a hotfix?', 'An urgent fix for a production issue. Branched from main merged back and tagged as patch version.'),
    q('What triggers a MAJOR version bump?', 'Breaking changes that are not backward compatible.'),
    q('What triggers a MINOR version bump?', 'New features that are backward compatible.'),
    q('What triggers a PATCH version bump?', 'Bug fixes that are backward compatible.')
  ],
  R(10,35,100,25,"#0070f3","","Feature Dev","Develop branch") +
  A(110,48,130,48) +
  R(140,35,100,25,"#28a745","","Release Branch","Stabilize QA") +
  A(240,48,260,48) +
  R(10,70,100,25,"#dc3545","","Tag v1.0.0","Immutable marker") +
  R(140,70,100,25,"#ffc107","","Deploy Prod","Release to users") +
  R(10,105,100,25,"#e83e8c","","Changelog","Document changes") +
  R(140,105,100,25,"#6610f2","","Hotfix","Patch production") +
  R(260,35,220,150,"#17a2b8","","Release Management","Semantic versioning release branches changelogs hotfixes. Automated with semantic-release and conventional commits.") +
  T(100,210,"Release Management: Plan schedule control releases. Semantic versioning release branches changelogs hotfix automation.",9,"#666","middle"),
  [
    e('Semantic Release Configuration', 'Automated release setup.', codeBlock([
      "// release.config.js",
      "module.exports = {",
      "  branches: ['main', { name: 'next', prerelease: true }],",
      "  plugins: [",
      "    '@semantic-release/commit-analyzer',",
      "    '@semantic-release/release-notes-generator',",
      "    '@semantic-release/changelog',",
      '    ["@semantic-release/npm", { npmPublish: true }],',
      '    "@semantic-release/github",',
      '    ["@semantic-release/git", {',
      "      assets: ['package.json', 'CHANGELOG.md'],",
      '      message: "chore(release): \${nextRelease.version} [skip ci]"',
      "    }]",
      "  ]",
      "};",
      "",
      "# CI step:",
      "# npx semantic-release"
    ]), 'semantic-release config: analyzes commits bumps version generates changelog creates tag and GitHub release.'),
    e('Changelog Generation (conventional-changelog)', 'Auto-generate changelog.', codeBlock([
      "# Install conventional-changelog-cli",
      "# npm install -g conventional-changelog-cli",
      "",
      "# Generate changelog from conventional commits",
      "conventional-changelog -p angular -i CHANGELOG.md -s",
      "",
      "# Output format:",
      "# # Changelog",
      "# ",
      "# ## [1.2.0] - 2024-03-15",
      "# ",
      "# ### Features",
      "# * add payment gateway ([a1b2c3d])",
      "# * add search functionality ([b2c3d4e])",
      "# ",
      "# ### Bug Fixes",
      "# * fix login timeout ([c3d4e5f])",
      "# * fix memory leak ([d4e5f6g])",
      "# ",
      "# ### Breaking Changes",
      "# * upgrade to API v2 ([e5f6g7h])",
      "",
      "# Use release-drafter for GitHub:",
      "# .github/release-drafter.yml"
    ]), 'conventional-changelog generates release notes automatically from conventional commit messages.'),
    e('GitHub Release Workflow', 'Automated release on tag push.', codeBlock([
      "name: Create Release",
      "on:",
      "  push:",
      "    tags:",
      '      - "v*"',
      "",
      "jobs:",
      "  release:",
      "    runs-on: ubuntu-latest",
      "    permissions:",
      "      contents: write",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "",
      "      - name: Generate release notes",
      "        id: notes",
      "        run: |",
      "          PREV_TAG=\$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo '')",
      '          NOTES=$(conventional-changelog -p angular)',
      '          echo "notes<<EOF" >> \$GITHUB_OUTPUT',
      '          echo "\$NOTES" >> \$GITHUB_OUTPUT',
      '          echo "EOF" >> \$GITHUB_OUTPUT',
      "",
      "      - name: Create GitHub Release",
      "        uses: softprops/action-gh-release@v1",
      "        with:",
      "          body: \${{ steps.notes.outputs.notes }}",
      "          draft: false",
      "          prerelease: \${{ contains(github.ref, '-') }}"
    ]), 'GitHub Actions workflow that creates a release with auto-generated notes when a version tag is pushed.'),
    e('Release Branch Workflow (Git Flow)', 'Manage release branches.', codeBlock([
      "# Start a release",
      "git checkout develop",
      "git checkout -b release/v1.2.0",
      "",
      "# Stabilize (only bug fixes)",
      'git commit -m "fix: correct payment calculation"',
      'git commit -m "fix: update API rate limit"',
      "",
      "# Version bump in release branch",
      'echo "v1.2.0" > VERSION',
      "git add VERSION",
      'git commit -m "chore: bump version to 1.2.0"',
      "",
      "# Merge to main and tag",
      "git checkout main",
      "git merge --no-ff release/v1.2.0",
      'git tag -a v1.2.0 -m "Release v1.2.0"',
      "git push origin main --tags",
      "",
      "# Merge back to develop",
      "git checkout develop",
      "git merge --no-ff release/v1.2.0",
      "",
      "# Delete release branch",
      "git branch -d release/v1.2.0"
    ]), 'Git Flow release branch workflow: branch stabilize merge to main tag and merge back to develop.'),
    e('Hotfix Workflow', 'Emergency production fix.', codeBlock([
      "# From main (or production tag)",
      "git checkout main",
      "git checkout -b hotfix/critical-security",
      "",
      "# Fix the critical bug",
      'git commit -m "fix: patch SQL injection vulnerability"',
      "",
      "# Merge to main and tag patch",
      "git checkout main",
      "git merge --no-ff hotfix/critical-security",
      'git tag -a v1.0.1 -m "Hotfix v1.0.1"',
      "git push origin main --tags",
      "",
      "# If using Git Flow merge to develop too",
      "git checkout develop",
      "git merge --no-ff hotfix/critical-security",
      "",
      "# The hotfix version bump is a PATCH",
      "# v1.0.0 -> v1.0.1 (not v1.1.0)"
    ]), 'Hotfix workflow: branch from main fix merge to main tag patch version and merge back to develop.')
  ],
  [
    m('What is semantic versioning?', ['Random version numbers', 'MAJOR.MINOR.PATCH with meaning', 'Date-based versions', 'Build numbers only'], 1, 'SemVer defines version meaning: MAJOR (breaking) MINOR (feature) PATCH (fix).'),
    m('What is a release branch?', ['Branch for daily work', 'Stabilization branch before release', 'Branch for experiments', 'Branch for documentation'], 1, 'Release branch stabilizes a release with only bug fixes before merging to main.'),
    m('What does semantic-release do?', ['Manual release process', 'Automated version bump changelog tag release', 'Code formatting', 'Test runner'], 1, 'semantic-release fully automates the release process from commit analysis to publishing.'),
    m('What triggers a MAJOR version?', ['Bug fixes', 'Breaking changes', 'New features', 'Documentation updates'], 1, 'MAJOR version increments when backward-incompatible changes are introduced.'),
    m('What is a hotfix?', ['A new feature', 'An urgent production bug fix', 'A code refactor', 'A version upgrade'], 1, 'Hotfix is an urgent fix for a production issue branched from main and tagged as patch.'),
    m('What should release notes include?', ['Only version number', 'Features fixes and breaking changes', 'Full commit log', 'Random updates'], 1, 'Release notes should summarize features bug fixes and breaking changes for the release.')
  ]
);

// ---- GENERATE ----
var dataDir = __dirname;

var padTopics = require('../pad-topics');
padTopics(topics);

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["git"] = TOPICS_DATA["git"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["git"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated Git topics: ' + Object.keys(topics).length);


