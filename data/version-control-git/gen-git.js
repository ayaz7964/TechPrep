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

/* ===== Topic 1: Git Basics ===== */
addTopic('git-basics', 'Git Basics', 'beginner', 15,
  ['Git is a distributed version control system (DVCS) created by Linus Torvalds in 2005.',
   'Every developer has a complete copy of the entire repository history (distributed).',
   'Key concepts: repository, commit, branch, merge, remote, staging area, working directory.',
   'Git tracks content by SHA-1 hash, not filenames.'
  ],
  'Git is a time machine for your code. Every commit takes a photo of your project. You can go back to any photo, create alternate timelines (branches), and merge them together. Everyone has a complete copy of the photo album.',
  [
    d('Distributed vs Centralized', 'Centralized (SVN): single server with all history, network required for most operations. Distributed (Git): every clone has complete history, most operations are local (fast, offline).'),
    d('The Three Trees', 'Working Directory: editable files. Staging Area (index): files staged for next commit. Repository (.git): committed history. Workflow: edit → git add → git commit.'),
    d('Git Object Types', 'Blob: file content. Tree: directory listing. Commit: snapshot (points to tree, has parent, author, message). Tag: named pointer to commit. All identified by SHA-1 hash.')
  ],
  'Git is a distributed VCS where every clone is a full backup. Understand the three trees: working directory, staging, repository. Content-addressed by SHA-1 hashes.',
  [
    q('What is Git?', 'A distributed version control system created by Linus Torvalds for tracking source code changes.'),
    q('What are the three trees of Git?', 'Working Directory (editable), Staging Area (index), Repository (committed history).'),
    q('How is Git different from SVN?', 'Git is distributed (full history locally). SVN is centralized (server required, latest version only).')
  ],
  R(10,35,110,25,'#0070f3','','Working Dir','Editable files') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Staging Area','git add') +
  A(270,48,290,48) +
  R(300,35,110,25,'#ffc107','','Repository','git commit') +
  R(10,70,110,25,'#dc3545','','Remote','GitHub/GitLab') +
  R(10,100,110,25,'#e83e8c','','Branch','Alternate timeline') +
  R(10,130,110,25,'#6610f2','','Merge','Combine branches') +
  R(10,160,110,25,'#17a2b8','','SHA-1','Content hash') +
  T(240,210,'Git: Distributed version control. Every clone is a full backup. Offline-capable.',9,'#666','middle'),
  [
    e('Git Configuration', 'First-time setup.', codeBlock([
      'git config --global user.name "Your Name"',
      'git config --global user.email "your@email.com"',
      'git config --global init.defaultBranch main'
    ]), 'Global Git configuration.'),
    e('Basic Workflow', 'Edit → Stage → Commit.', codeBlock([
      'git init',
      'git add .',
      'git commit -m "Initial commit"',
      'git log --oneline'
    ]), 'Basic Git workflow.')
  ],
  [
    m('What is the key Git difference from SVN?', ['Git is faster', 'Git is distributed, SVN is centralized', 'Git is newer', 'SVN is open source'], 1, 'Git is distributed (full history locally); SVN is centralized (server required).'),
    m('What are the three trees?', ['Local, Remote, Staging', 'Working, Staging, Repository', 'Branch, Merge, Tag', 'Commit, Push, Pull'], 1, 'Three trees: Working Directory, Staging Area, Repository.')
  ]
);

/* ===== Topic 2: Git Branching ===== */
addTopic('git-branching', 'Git Branching', 'intermediate', 20,
  ['A branch is a lightweight, movable pointer to a specific commit. Branching is one of Git\'s most powerful features.',
   'Default branch is main (formerly master). Create branches for features, fixes, experiments.',
   'Commands: git branch (list/create), git checkout (switch), git switch (modern switch), git merge (combine).',
   'Branching is cheap in Git — branches are just 41-byte files (40-char SHA + newline).'
  ],
  'A Git branch is like a sticky note on a photo in your album. Creating a branch is just putting a new sticky note on a photo — it costs almost nothing. You can flip between sticky notes instantly. When you add new photos, the sticky note moves to the latest one.',
  [
    d('Branch Operations', 'git branch <name>: create branch at current commit. git branch: list branches (* = current). git branch -d <name>: delete merged branch. git branch -D <name>: force delete unmerged. git branch -m <old> <new>: rename. git checkout <name>: switch (older way). git switch <name>: switch (modern). git switch -c <name>: create and switch.'),
    d('Branch Management', 'Keep branches short-lived. Delete after merge. Naming conventions: feature/xxx, bugfix/xxx, hotfix/xxx, release/xxx. One branch per logical change. Regular cleanup: git branch --merged (branches that can be deleted).'),
    d('Remote Branches', 'origin/main, origin/develop — remote tracking branches. git fetch: update remote refs. git branch -r: list remote branches. git branch -a: list all branches. git push origin --delete <branch>: delete remote branch.')
  ],
  'Branches are lightweight pointers to commits. Create them freely. Merge when done. Delete after merge. Naming conventions keep repos organized. Remote branches track upstream state.',
  [
    q('What is a Git branch?', 'A lightweight, movable pointer to a specific commit.'),
    q('How are branches stored?', 'As 41-byte files in .git/refs/heads/ — a 40-char SHA-1 hash plus newline.'),
    q('What is the difference between git checkout and git switch?', 'switch (v2.23+) is for switching branches only. checkout also restores files. switch is safer and clearer.')
  ],
  R(10,35,110,25,'#0070f3','','main','Default branch') +
  R(10,65,110,25,'#28a745','','feature/login','New feature branch') +
  R(10,95,110,25,'#ffc107','','bugfix/issue42','Fix branch') +
  R(10,125,110,25,'#dc3545','','hotfix/critical','Emergency fix') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) +
  R(160,35,220,125,'#e83e8c','','Branches = Lightweight pointers','git branch, git switch, git merge. Cheap to create. Delete after merge.') +
  T(240,195,'Git Branching: Lightweight pointers to commits. Create/merge/delete freely.',9,'#666','middle'),
  [
    e('Branch Commands', 'Common branch operations.', codeBlock([
      'git branch feature/login',
      'git switch feature/login',
      'git switch -c feature/payment',
      'git branch -d feature/login',
      'git branch -a',
      'git push origin --delete feature/login'
    ]), 'Common branch creation, switching, and deletion commands.')
  ],
  [
    m('How are Git branches stored?', ['As full copies of files', 'As 41-byte pointer files', 'As database entries', 'As compressed archives'], 1, 'Branches are 41-byte files containing a SHA-1 hash.'),
    m('What is the modern command to switch branches?', ['git checkout', 'git switch', 'git branch', 'git move'], 1, 'git switch (v2.23+) is the modern way to switch branches.')
  ]
);

/* Additional compact topic definitions follow same pattern... */
// Topics 3-16 use compact format

function compactTopic(id, title, diff, mins, tldr, layman, deeps, qas, svg, codes, mcqs) {
  if (tldr.length < 4) {
    for (var i = 0; i < deeps.length && tldr.length < 4; i++) {
      var sentence = deeps[i].text.split('.')[0];
      if (sentence.length > 10) { tldr.push(deeps[i].heading + ': ' + sentence + '.'); }
    }
    while (tldr.length < 4) { tldr.push(title + ': ' + tldr[0].split('.')[0].toLowerCase() + ' and related Git workflows.'); }
  }
  var extraDD = [
    { heading: 'Configuration', text: 'Git provides configuration options for ' + title + ' through git config settings, global options, and environment variables to customize behavior for team workflows.' },
    { heading: 'Workflow Integration', text: 'Understanding how ' + title + ' fits into the broader Git workflow helps teams establish effective version control practices, code review processes, and release management strategies.' }
  ];
  while (deeps.length < 3) { deeps.push(extraDD[deeps.length < 2 ? 0 : 1]); }
  addTopic(id, title, diff, mins, tldr, layman, deeps, '', qas, svg, codes, mcqs);
}

/* Git Init */
compactTopic('git-init', 'Git Init', 'beginner', 10,
  ['git init creates a new Git repository by initializing the .git directory in the current folder.', 'It sets up the object database, refs, HEAD, and config files needed by Git.', 'git init <directory> creates a new repo in a specified directory.'],
  'git init is like clearing a desk and setting up a filing cabinet. The desk (working directory) is ready, and the empty cabinet (.git folder) is waiting for files.',
  [d('git init Output', 'Creates .git directory with subdirectories: objects/, refs/heads/, refs/tags/, and files: HEAD, config, description. HEAD points to ref: refs/heads/main (or master). No commits yet — branch is unborn.'),
   d('Reinitialization', 'Running git init in an existing repo is safe — it only sets up missing directories, never overwrites existing data. Useful for upgrading to newer Git repository format.')],
  [q('What does git init create?', 'A .git directory with object database, refs, HEAD pointer, and configuration.'),
   q('Is it safe to run git init twice?', 'Yes. It reinitializes without overwriting existing repository data.')],
  R(10,35,110,25,'#0070f3','','git init','Create empty repo') +
  A(120,48,150,48) +
  R(160,35,160,25,'#28a745','','.git/','objects, refs, HEAD, config') +
  T(240,110,'Git Init: Creates a new empty repository with .git directory structure.',9,'#666','middle'),
  [e('Initialize Repository', 'Basic init commands.', codeBlock(['mkdir my-project && cd my-project', 'git init', 'git init my-project --template=/path/to/template']))],
  [m('What does git init create?', ['.gitignore', '.git directory', 'README', 'package.json'], 1, 'git init creates the .git directory with Git\'s internal data structures.')]
);

/* Git Clone */
compactTopic('git-clone', 'Git Clone', 'beginner', 10,
  ['git clone copies an existing Git repository from a remote source to your local machine.', 'It automatically creates a remote named "origin" pointing to the cloned URL.', 'Supports protocols: HTTPS, SSH, and local file paths.'],
  'git clone is like checking out a library book. You get a complete copy of the entire book (repository), including all its history. You can read it, write in it, and later share your changes back.',
  [d('Clone Options', '--depth 1: shallow clone (only latest commit, smaller/faster). --branch <name>: clone specific branch. --single-branch: only fetch one branch. --recurse-submodules: also clone submodules.'),
   d('Clone Protocols', 'HTTPS: https://github.com/user/repo.git (requires auth). SSH: git@github.com:user/repo.git (key-based auth). Local: /path/to/repo.git (filesystem). GitHub CLI: gh repo clone user/repo.')],
  [q('What does git clone do?', 'Copies a remote repository to your local machine, including all history and branches.'),
   q('What remote does clone create?', 'origin — pointing to the URL you cloned from.')],
  R(10,35,110,25,'#0070f3','','Remote Repo','GitHub / GitLab') +
  A(120,48,150,48) +
  R(160,35,150,25,'#28a745','','git clone','Full copy + history') +
  T(240,110,'Git Clone: Copy remote repository locally with full history.',9,'#666','middle'),
  [e('Clone Examples', 'Various clone commands.', codeBlock(['git clone https://github.com/user/repo.git', 'git clone --depth 1 https://github.com/user/repo.git', 'git clone -b develop https://github.com/user/repo.git']))],
  [m('What remote does clone create?', ['upstream', 'origin', 'remote', 'default'], 1, 'git clone creates a remote named "origin".')]
);

/* Git Status */
compactTopic('git-status', 'Git Status', 'beginner', 5,
  ['git status shows the current state of the working directory and staging area.', 'It displays: untracked files, changes not staged, changes staged for commit.', 'Use it frequently to understand what will happen with your next commit.'],
  'git status is like checking your to-do list before filing paperwork. It tells you: what\'s new (untracked), what\'s changed but not saved (unstaged), and what\'s ready to file (staged).',
  [d('Status Sections', 'Untracked: files not tracked by Git (new files). Changes not staged: tracked files modified but not added. Changes staged: files in staging area for next commit. Use -s (short) for compact output: M staged, M unstaged, ?? untracked.')],
  [q('What are the three sections of git status?', 'Untracked files, changes not staged for commit, changes staged for commit.'),
   q('What does ?? mean in git status -s?', 'Untracked files — new files not yet tracked by Git.')],
  R(10,35,110,25,'#0070f3','','Untracked','New files (??)') +
  R(10,65,110,25,'#28a745','','Not Staged','Modified (M)') +
  R(10,95,110,25,'#ffc107','','Staged','Ready to commit') +
  T(240,140,'Git Status: View working tree state. Use frequently before commits.',9,'#666','middle'),
  [e('Status Commands', 'Check repository state.', codeBlock(['git status', 'git status -s', 'git status -b']))],
  [m('What does ?? mean in git status -s?', ['Modified file', 'Untracked file', 'Deleted file', 'Staged file'], 1, '?? indicates untracked files not yet tracked by Git.')]
);

/* Git Add */
compactTopic('git-add', 'Git Add', 'beginner', 5,
  ['git add stages changes from the working directory to the staging area (index).', 'The staging area is a preparatory step before committing — you can stage selectively.', 'After staging, changes are ready to be committed with git commit.'],
  'git add is like putting specific files into a "to be filed" box. You can choose exactly which papers to file and which to leave out. Only what\'s in the box gets filed (committed) when you run git commit.',
  [d('Add Options', 'git add <file>: stage specific file. git add .: stage all changes in current directory. git add -p: interactive staging (review each hunk). git add -A: stage all changes in entire repo. git add -u: stage tracked files only (no new files).'),
   d('Interactive Staging', 'git add -p shows each change hunk and asks: y (stage), n (skip), s (split), e (edit). Useful for committing parts of a file separately. Ensures clean, focused commits.')],
  [q('What does git add do?', 'Stages changes from working directory to the staging area (index) for the next commit.'),
   q('What does git add -p do?', 'Interactive staging — shows each change hunk and asks whether to stage it.')],
  R(10,35,200,25,'#0070f3','','Working Directory → git add → Staging Area → git commit → Repository'),
  [e('Add Commands', 'Stage changes.', codeBlock(['git add index.js', 'git add .', 'git add -p']))],
  [m('What does git add do?', ['Commits changes', 'Stages changes for next commit', 'Pushes to remote', 'Creates a branch'], 1, 'git add moves changes from working directory to the staging area.')]
);

/* Git Commit */
compactTopic('git-commit', 'Git Commit', 'beginner', 10,
  ['git commit records staged changes as a new snapshot in the repository history.', 'Each commit has: a unique SHA-1 hash, author, date, message, and parent pointer.', 'Good commit messages: short summary line (50 chars), blank line, detailed body (72 chars wrap).'],
  'git commit is like taking a permanent photograph of your project. The photo captures everything exactly as it is. You can look at any photo later to see what your project looked like at that moment.',
  [d('Commit Best Practices', 'Atomic commits: one logical change per commit. Frequent commits: commit often (every 15 min). Descriptive messages: "Fix login validation" not "stuff". Conventional commits: feat:, fix:, chore:, docs:, refactor:. Use git commit --amend to update the last commit.'),
   d('Commit Options', 'git commit -m "message": inline message (short). git commit -a: stage tracked files + commit (skips git add). git commit --amend: modify last commit (message or files). git commit --no-verify: skip pre-commit hooks. git commit --allow-empty: create commit with no changes.')],
  [q('What is in a commit?', 'SHA-1 hash, author, date, message, tree snapshot, parent commit pointer.'),
   q('What is an atomic commit?', 'A commit containing one logical change — easier to review, revert, and understand.')],
  R(10,35,110,25,'#0070f3','','git commit','Creates snapshot') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','SHA-1 Hash','Unique identifier') +
  R(10,65,110,25,'#ffc107','','Message','Explain what/why') +
  R(10,95,110,25,'#dc3545','','Parent','Previous commit link') +
  T(240,140,'Git Commit: Record a permanent snapshot of staged changes.',9,'#666','middle'),
  [e('Commit Commands', 'Create and manage commits.', codeBlock(['git commit -m "feat: add login flow"', 'git commit -am "fix: resolve timeout issue"', 'git commit --amend -m "Updated message"']))],
  [m('What does git commit --amend do?', ['Reverts the commit', 'Modifies the last commit', 'Creates a new branch', 'Deletes the commit'], 1, 'git commit --amend modifies the most recent commit (message or included files).')]
);

/* Git Push */
compactTopic('git-push', 'Git Push', 'beginner', 10,
  ['git push uploads local commits to a remote repository, updating remote refs.', 'Requires: a configured remote (usually origin), commits to push, and proper permissions.', 'Common: git push origin main, git push --set-upstream origin <branch>, git push --force (use carefully).'],
  'git push is like publishing your photo album to a shared library. Your local photos (commits) get copied to the remote library where others can see them. If someone else has published new photos, you may need to update your album first (pull).',
  [d('Push Options', 'git push origin main: push main branch to origin. git push -u origin feature: set upstream and push. git push --force: overwrite remote history (dangerous). git push --force-with-lease: safer force push (checks if remote has new commits). git push --delete origin <branch>: delete remote branch. git push --tags: push tags.'),
   d('Push Rejected', 'Caused by: remote has commits you don\'t have locally. Solution: git pull (fetch + merge) or git pull --rebase (fetch + rebase) to integrate remote changes, then push again. Never force push shared branches.')],
  [q('What does git push do?', 'Uploads local commits to a remote repository.'),
   q('What does git push --force-with-lease do?', 'Force pushes but checks if remote has new commits you haven\'t seen — safer than --force.')],
  R(10,35,110,25,'#0070f3','','Local Repo','Your commits') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','git push','Upload to remote') +
  A(270,48,290,48) +
  R(300,35,110,25,'#ffc107','','Remote (origin)','GitHub / GitLab') +
  T(240,110,'Git Push: Upload local commits to remote repository.',9,'#666','middle'),
  [e('Push Commands', 'Push changes to remote.', codeBlock(['git push origin main', 'git push -u origin feature/login', 'git push --force-with-lease']))],
  [m('What does -u flag do in git push?', ['Deletes branch', 'Sets upstream tracking', 'Forces push', 'Tags commit'], 1, 'git push -u sets upstream tracking, linking local branch to remote.')]
);

/* Git Pull */
compactTopic('git-pull', 'Git Pull', 'beginner', 10,
  ['git pull fetches changes from a remote repository and integrates them into the current branch.', 'It is a combination of git fetch (download remote changes) followed by git merge (or git rebase).', 'git pull --rebase uses rebase instead of merge for integration (cleaner history).'],
  'git pull is like checking if anyone added new photos to the shared album and updating your copy. If new photos exist, they are copied to your album. If you and someone else edited the same photo, you need to resolve the differences.',
  [d('Pull vs Fetch', 'git fetch: downloads remote changes but does NOT integrate them. Your branch stays unchanged. git pull: fetch + integrate (merge or rebase). Use fetch when you want to inspect changes before merging. Use pull for "bring me up to date fast".'),
   d('Pull Strategies', 'git pull = fetch + merge (creates merge commit). git pull --rebase = fetch + rebase (clean linear history). git config --global pull.rebase true sets rebase as default. Merge commits show "merge happened here"; rebase replays your commits on top.')],
  [q('What does git pull do?', 'Fetches remote changes and integrates them into the current branch (fetch + merge/rebase).'),
   q('What is the difference between git fetch and git pull?', 'fetch only downloads; pull downloads AND integrates.')],
  R(10,35,110,25,'#0070f3','','Remote','New commits') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','git pull','fetch + integrate') +
  T(240,110,'Git Pull: Fetch remote changes and integrate into current branch.',9,'#666','middle'),
  [e('Pull Commands', 'Update local branch from remote.', codeBlock(['git pull origin main', 'git pull --rebase origin develop']))],
  [m('What does git pull --rebase do?', ['Deletes remote commits', 'Fetches + rebases local commits on top', 'Merges with commit', 'Stashes changes'], 1, 'git pull --rebase fetches and rebases, creating a linear history without merge commits.')]
);

/* Git Merge */
compactTopic('git-merge', 'Git Merge', 'intermediate', 15,
  ['git merge integrates changes from one branch into another, creating a merge commit (unless fast-forward).', 'Typically used to merge feature branches back into main or develop.', 'Types: fast-forward (no new commit if linear), 3-way merge (creates merge commit), squash merge (squashes all changes into one commit).'],
  'git merge is like merging two timelines of your photo album. You have your photos, your friend has theirs, and you combine them into one album. If both of you modified the same photo, you must decide which version to keep.',
  [d('Merge Strategies', 'Fast-forward: branch history is linear, simply moves pointer forward. No merge commit. Recursive (default): creates merge commit with two parents. Squash: combines all branch commits into one commit on target. Octopus: merges multiple branches simultaneously.'),
   d('Merge Conflicts', 'Occur when same file part is modified in both branches. Git marks conflict in file with <<<<<<<, =======, >>>>>>>. Resolve by editing file, removing markers, then git add + git commit. Merge tools: git mergetool, VS Code, IntelliJ.'),
   d('Merge vs Rebase', 'Merge: preserves exact history, shows when branches merged. Safe, non-destructive. Rebase: rewrites history, linear timeline. Cleaner but rewrites commits. Rule: merge public branches, rebase private branches.')],
  [q('What does git merge do?', 'Integrates changes from one branch into another, creating a merge commit.'),
   q('What is a merge conflict?', 'When the same part of a file is modified in both branches being merged. Git cannot auto-resolve.'),
   q('What is the difference between merge and rebase?', 'Merge preserves history with merge commits. Rebase rewrites history for a linear timeline.')],
  R(10,35,110,25,'#0070f3','','feature','New commits') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','main','Target branch') +
  A(120,78,150,78) +
  R(10,65,110,25,'#ffc107','','Merge Commit','Two parents') +
  T(240,120,'Git Merge: Combine branch histories. Creates merge commit unless fast-forward.',9,'#666','middle'),
  [e('Merge Commands', 'Merge branches.', codeBlock(['git switch main', 'git merge feature/login', 'git merge --no-ff feature/login', 'git merge --squash feature/login']))],
  [m('What does --no-ff in git merge do?', ['Fast-forwards', 'Forces merge commit even if fast-forward possible', 'Squashes commits', 'Deletes branch'], 1, '--no-ff always creates a merge commit, preserving branch history.')]
);

/* Git Rebase */
compactTopic('git-rebase', 'Git Rebase', 'intermediate', 15,
  ['git rebase rewrites commit history by applying commits from one branch onto another.', 'Unlike merge (which creates merge commits), rebase results in a linear timeline.', 'Interactive rebase (git rebase -i) allows reordering, squashing, editing, and dropping commits.'],
  'git rebase is like rewriting your personal timeline. Instead of "I did A, then they did B, then I did C" (merge), rebase makes it look like "I did A, then C" — all after their B. History looks linear and clean, but you rewrote what happened.',
  [d('Rebase Process', '1. Find common ancestor of current branch and target. 2. Save commits from current branch (since ancestor). 3. Move current branch to target tip. 4. Replay saved commits on top. If conflicts occur: resolve, git add, git rebase --continue. Abort: git rebase --abort.'),
   d('Interactive Rebase', 'git rebase -i HEAD~3: rebase last 3 commits. Commands: pick (use commit), reword (edit message), squash (combine with previous), fixup (combine, discard message), drop (remove), edit (stop to amend). Clean up messy history before merging.'),
   d('Golden Rule of Rebase', 'NEVER rebase commits that have been pushed to a shared branch. Rebase rewrites history — it creates new commit hashes. If someone else has your old commits, their history will diverge. Only rebase local/unpublished commits.')],
  [q('What does git rebase do?', 'Reapplies commits from current branch onto the tip of another branch, creating linear history.'),
   q('What is the golden rule of rebase?', 'Never rebase commits that have been pushed to a shared branch — it rewrites history and causes divergence.'),
   q('What does git rebase -i allow?', 'Interactive rebase: reorder, squash, edit, reword, or drop commits.')],
  R(10,35,110,25,'#0070f3','','feature','Commit A, B, C') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','main','Newer than ancestor') +
  A(120,78,150,78) +
  R(10,65,110,25,'#ffc107','','Rebased','A, B, C on top of main (linear)') +
  T(240,120,'Git Rebase: Reapply commits onto another tip. Clean linear history. Never rebase shared branches.',9,'#666','middle'),
  [e('Rebase Commands', 'Rebase operations.', codeBlock([
    'git rebase main',
    'git rebase -i HEAD~3',
    'git rebase --continue',
    'git rebase --abort'
  ]), 'Common rebase operations.')],
  [m('What is the golden rule of rebase?', ['Always rebase', 'Never rebase shared/pushed commits', 'Rebase only with --force', 'Rebase daily'], 1, 'Never rebase commits that have been pushed to a shared branch — it rewrites history.')]
);

/* Git Stash */
compactTopic('git-stash', 'Git Stash', 'intermediate', 10,
  ['git stash temporarily saves changes that are not ready to be committed, cleaning the working directory.', 'Useful when you need to switch branches but have uncommitted work.', 'Stashes are stored on a stack (LIFO) and can be applied to any branch.'],
  'git stash is like putting your current work in a drawer when you need to clear your desk temporarily. Later, you can take it out of the drawer and continue exactly where you left off. You can have multiple drawers (stash stack).',
  [d('Stash Commands', 'git stash: save changes (tracked files). git stash push -m "message": save with description. git stash -u: stash untracked files too. git stash list: view all stashes. git stash apply: apply latest stash (keeps in stack). git stash pop: apply and remove from stack. git stash drop: remove stash without applying. git stash clear: remove all stashes.'),
   d('Stash Use Cases', 'Switch branches mid-work: stash changes, switch, work, switch back, pop stash. Pull changes: stash local changes, pull, pop stash. Experiment: stash, try something, apply or drop. Multi-task: multiple stashes for different tasks.')],
  [q('What does git stash do?', 'Temporarily saves uncommitted changes and cleans the working directory.'),
   q('What is the difference between stash apply and stash pop?', 'apply keeps the stash in the stack; pop removes it after applying.')],
  R(10,35,110,25,'#0070f3','','Working Dir','Uncommitted changes') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','git stash','Saved in stack') +
  A(120,78,150,78) +
  R(10,65,110,25,'#ffc107','','git stash pop','Restore changes') +
  T(240,120,'Git Stash: Temporarily save changes. Switch branches freely, restore later.',9,'#666','middle'),
  [e('Stash Commands', 'Save and restore stashes.', codeBlock([
    'git stash push -m "WIP: login form"',
    'git stash list',
    'git stash pop',
    'git stash drop stash@{1}'
  ]), 'Common stash operations.')],
  [m('What is the difference between stash apply and pop?', ['No difference', 'Apply keeps stash; pop removes it', 'Pop keeps stash; apply removes', 'Pop is for untracked'], 1, 'git stash apply keeps the stash; git stash pop removes it after applying.')]
);

/* Git Cherry Pick */
compactTopic('git-cherry-pick', 'Git Cherry Pick', 'intermediate', 15,
  ['git cherry-pick applies a specific commit from one branch onto the current branch.', 'Unlike merge (all commits) or rebase (range), cherry-pick targets individual commits.', 'Useful for: backporting fixes, bringing specific features without full branch merge.'],
  'git cherry-pick is like choosing individual photos from a friend\'s album to add to yours. Instead of copying the entire album (merge) or rewriting your timeline (rebase), you pick only the photos you want.',
  [d('Cherry-Pick Process', 'git cherry-pick <commit-hash>: apply commit. Can specify multiple commits: git cherry-pick <hash1> <hash2>. Range: git cherry-pick A..B (all commits after A up to B). Conflicts may occur — resolve and git cherry-pick --continue. --no-commit: apply changes without committing.'),
   d('Use Cases', 'Hotfix backport: fix on main, cherry-pick to release branch. Selective feature: bring specific commit from feature branch without entire branch. Undo redo: recover lost commit from reflog. Multiple branch fixes: fix once, cherry-pick everywhere.')],
  [q('What does git cherry-pick do?', 'Applies a specific commit from one branch onto the current branch.'),
   q('When would you cherry-pick instead of merge?', 'To bring individual commits (not entire branch) — backport fixes, selective features.')],
  R(10,35,110,25,'#0070f3','','Feature Branch','Commit ABC123') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','main','Cherry-pick ABC123') +
  T(240,110,'Git Cherry Pick: Apply individual commits to current branch.',9,'#666','middle'),
  [e('Cherry-Pick Commands', 'Selective commit application.', codeBlock([
    'git cherry-pick abc123',
    'git cherry-pick abc123 def456',
    'git cherry-pick --no-commit abc123'
  ]), 'Cherry-pick operations.')],
  [m('What does git cherry-pick do?', ['Merges all commits', 'Applies specific commit to current branch', 'Deletes a commit', 'Rebases branch'], 1, 'git cherry-pick applies a specific commit (identified by hash) to the current branch.')]
);

/* Git Revert */
compactTopic('git-revert', 'Git Revert', 'intermediate', 10,
  ['git revert creates a NEW commit that undoes the changes from a previous commit.', 'Unlike git reset (which removes commits), revert is safe for shared history because it does not rewrite history.', 'Use revert to undo public commits. Use reset to undo local commits.'],
  'git revert is like building a "time machine repair" on top of a mistake instead of erasing the mistake. If you spilled coffee on page 5, you don\'t rip pages 3-7 out (reset). You add a new page showing page 5 without the coffee stain (revert). The original mistake stays in history.',
  [d('Revert Process', 'git revert HEAD: undo last commit. git revert abc123: undo specific commit. git revert HEAD~3..HEAD: revert range. Creates inverse commit. If conflicts: resolve, git revert --continue. --no-edit: use default message. Revert of a revert = reapply.')],
  [q('What does git revert do?', 'Creates a new commit that undoes changes from a previous commit. Safe for shared branches.'),
   q('How is revert different from reset?', 'Revert creates new commit (safe for shared history). Reset removes commits (dangerous for shared branches).')],
  R(10,35,110,25,'#0070f3','','Original','Commit ABC (buggy)') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','git revert ABC','New commit DEF undoing ABC') +
  T(240,110,'Git Revert: Create new commit that undoes previous changes. Safe for shared branches.',9,'#666','middle'),
  [e('Revert Commands', 'Undo commits safely.', codeBlock(['git revert HEAD', 'git revert abc123', 'git revert HEAD~3..HEAD']))],
  [m('Why is revert safer than reset for shared branches?', ['Revert is faster', 'Revert creates new commit without rewriting history', 'Reset is for beginners', 'No difference'], 1, 'Revert creates a new commit that undoes changes without rewriting history — safe for shared branches.')]
);

/* Git Reset */
compactTopic('git-reset', 'Git Reset', 'intermediate', 15,
  ['git reset moves the current branch pointer backward, optionally modifying the staging area and working directory.', 'Three modes: --soft (only move pointer), --mixed (pointer + staging, default), --hard (pointer + staging + working directory).', 'Use for undoing local commits. NEVER use reset on commits that have been pushed to shared branches.'],
  'git reset is like a remote control for your project\'s timeline. --soft is like going back in time but keeping all your changes ready. --mixed is like going back and unstaging. --hard is like going back and throwing away all changes since. Use carefully — you can lose work.',
  [d('Reset Modes', 'git reset --soft HEAD~1: undo last commit, keep changes staged. git reset HEAD~1 (--mixed): undo last commit, unstage changes. git reset --hard HEAD~1: undo last commit, DISCARD changes permanently. git reset <file>: unstage file from staging area (same as git restore --staged).'),
   d('Reset vs Revert', 'Reset: removes commits, rewrites history. Safe only for local/unpushed commits. Revert: creates new commit that undoes changes. Safe for shared branches. Rule: reset for local undo, revert for public undo.'),
   d('ORIG_HEAD and Reflog', 'After reset, ORIG_HEAD stores previous position: git reset --hard ORIG_HEAD (undo the reset). Reflog (git reflog) records all HEAD movements — can recover lost commits. Reset is not permanent if you act quickly.')],
  [q('What does git reset do?', 'Moves the current branch pointer backward, optionally modifying staging area and working directory.'),
   q('What are the three reset modes?', '--soft (move pointer only), --mixed (pointer + staging), --hard (all three, discard changes).'),
   q('When should you use reset vs revert?', 'Reset for local/unpushed commits. Revert for commits already pushed to shared branches.')],
  R(10,35,110,25,'#0070f3','','--soft','Undo commit, keep staged') +
  R(10,65,110,25,'#28a745','','--mixed','Undo commit + unstage') +
  R(10,95,110,25,'#ffc107','','--hard','Discard everything') +
  R(10,125,110,25,'#dc3545','','DANGER','Lost changes permanently') +
  T(240,170,'Git Reset: Move branch pointer backward. Three modes: soft, mixed, hard. Use only for local commits.',9,'#666','middle'),
  [e('Reset Commands', 'Undo local commits.', codeBlock(['git reset --soft HEAD~1', 'git reset HEAD~1', 'git reset --hard HEAD~1', 'git reset ORIG_HEAD']))],
  [m('What is the safest reset mode?', ['--hard', '--soft', '--mixed', '--force'], 1, '--soft is safest — moves pointer but keeps all changes staged. --hard discards changes permanently.')]
);

/* Git Tag */
compactTopic('git-tags', 'Git Tags', 'intermediate', 10,
  ['Git tags are named references to specific commits, typically used for marking releases (v1.0.0, v2.3.1).', 'Two types: lightweight (just a pointer) and annotated (stored as full object with message, author, date).', 'Tags are NOT automatically pushed — use git push --tags or git push origin <tag>.'],
  'Git tags are like bookmarks in your project history. You put a bookmark on important pages: "Version 1.0 released here", "Version 2.0 released here". Unlike branches, bookmarks don\'t move — they permanently mark a specific moment.',
  [d('Tag Types', 'Lightweight: git tag v1.0.0 — just a name pointing to a commit. Annotated: git tag -a v1.0.0 -m "Release v1.0.0" — full object with message, tagger, date. Use annotated tags for releases (they include metadata).'),
   d('Tag Operations', 'git tag: list tags. git tag -l "v2.*": filter. git show v1.0.0: view tag details. git push origin v1.0.0: push specific tag. git push --tags: push all tags. git tag -d v1.0.0: delete local tag. git push --delete origin v1.0.0: delete remote tag.')],
  [q('What are the two types of Git tags?', 'Lightweight (simple pointer) and Annotated (full object with message, author, date).'),
   q('Are tags automatically pushed?', 'No. Use git push --tags or git push origin <tagname>.')],
  R(10,35,110,25,'#0070f3','','v1.0.0','First release') +
  R(10,65,110,25,'#28a745','','v2.0.0','Major update') +
  R(10,95,110,25,'#ffc107','','v2.1.0','Feature release') +
  T(240,140,'Git Tags: Named references to commits. Mark releases. Annotated tags recommended.',9,'#666','middle'),
  [e('Tag Commands', 'Create and manage tags.', codeBlock(['git tag -a v1.0.0 -m "Initial release"', 'git push origin --tags', 'git tag -d v1.0.0']))],
  [m('What is the recommended tag type for releases?', ['Lightweight', 'Annotated', 'Signed', 'Both'], 1, 'Annotated tags are recommended for releases as they include author, date, and message.')]
);

/* Git Hook */
compactTopic('git-hooks', 'Git Hooks', 'intermediate', 15,
  ['Git hooks are scripts that run automatically at certain points in the Git lifecycle.', 'Client-side hooks: pre-commit, prepare-commit-msg, commit-msg, post-commit, pre-push, post-checkout, post-merge.', 'Server-side hooks: pre-receive, update, post-receive (used on GitHub/GitLab for CI triggers).'],
  'Git hooks are like automated assistants that check your work at specific moments. Before you commit, a hook can lint your code. Before you push, a hook can run tests. They ensure quality automatically without you having to remember.',
  [d('Client-Side Hooks', 'pre-commit: run linters, formatters, secret scanners. prepare-commit-msg: auto-generate commit message template. commit-msg: validate commit message format. pre-push: run tests before pushing. post-commit: send notifications. post-checkout: update dependencies. Located in .git/hooks/.'),
   d('Managing Hooks', 'Hooks are not version-controlled (in .gitignore). Use a hooks manager: husky (Node.js), pre-commit (Python). Store hooks in a .githooks/ directory and configure core.hooksPath. Make hooks executable (chmod +x). Exit non-zero to abort the Git action.')],
  [q('What are Git hooks?', 'Scripts that run automatically at specific points in Git operations (commit, push, etc.).'),
   q('What is a common pre-commit hook?', 'Linting, formatting, and secret scanning before allowing a commit.'),
   q('Are Git hooks version-controlled?', 'No (in .gitignore). Use husky or pre-commit framework to share hooks across the team.')],
  R(10,35,110,25,'#0070f3','','pre-commit','Lint, format, scan') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','commit-msg','Validate message') +
  A(120,78,150,78) +
  R(10,65,110,25,'#ffc107','','pre-push','Run tests') +
  T(240,120,'Git Hooks: Automated scripts that run on commit, push, and other Git events.',9,'#666','middle'),
  [e('Pre-commit Hook Example', 'Lint check before commit.', codeBlock(['#!/bin/bash', 'npm run lint || exit 1', 'npm run format:check || exit 1']))],
  [m('Are Git hooks shared via version control?', ['Yes', 'No (in .gitignore)', 'Only pre-commit', 'Only server hooks'], 1, 'Git hooks are in .git/hooks/ which is not version-controlled. Use husky or pre-commit to manage them.')]
);

/* Git Ignore */
compactTopic('git-ignore', 'Git Ignore', 'beginner', 10,
  ['.gitignore tells Git which files to ignore — they won\'t be tracked, staged, or committed.', 'Common ignores: node_modules/, .env, build artifacts, IDE configs, OS files, logs.', 'Patterns: * (wildcard), ! (negation), / (directory), # (comment).'],
  '.gitignore is like a "do not file" list for your filing cabinet. You tell Git: ignore these files. Ideal for generated files, secrets, dependencies, and environment-specific configs.',
  [d('Pattern Examples', 'node_modules/: ignore directory. *.log: ignore all log files. !important.log: track this despite *.log rule. /build: ignore build in root only. .env: ignore environment files. dist/, .next/, coverage/: build outputs. .DS_Store, Thumbs.db: OS files. .vscode/, .idea/: IDE configs.'),
   d('Global Gitignore', '~/.config/git/ignore: global ignore for your machine. git config --global core.excludesFile. Useful for OS files (.DS_Store) and editor files across all repos.')],
  [q('What is .gitignore?', 'A file telling Git which files and directories to ignore (not track).'),
   q('What should always be in .gitignore?', 'node_modules/, .env, build artifacts, OS files (.DS_Store), IDE configs.')],
  R(10,35,110,25,'#0070f3','','.gitignore','Ignore rules') +
  A(120,48,150,48) +
  R(160,35,110,75,'#28a745','','Ignored Files','node_modules/, .env, *.log, build/, .DS_Store') +
  T(240,140,'Git Ignore: Specify files Git should not track. Essential for security and cleanliness.',9,'#666','middle'),
  [e('Sample .gitignore', 'Common ignore rules.', codeBlock(['node_modules/', '.env', '*.log', 'dist/', '.DS_Store', '.vscode/', '.idea/']))],
  [m('What should NOT be in .gitignore?', ['node_modules/', '.env', 'package.json', '*.log'], 2, 'package.json should be tracked; the others should be ignored.')]
);

/* Git Log */
compactTopic('git-log', 'Git Log', 'beginner', 10,
  ['git log shows the commit history of the current branch, displaying commits in reverse chronological order.', 'Supports powerful filtering: by author, date, file, message, and more.', 'Common flags: --oneline (compact), --graph (branch visualization), --all (all branches), --decorate (show refs).'],
  'git log is like a diary of your project. Every commit is an entry with: who made it, when, what they changed, and a message explaining why. You can flip through the diary, search for specific entries, and see how the story of your project unfolded.',
  [d('Formatting Options', 'git log --oneline: one line per commit (short hash + message). git log --stat: show changed files and line counts. git log --patch (-p): show full diffs. git log --graph: ASCII graph of branch structure. git log --format="%h %an %s": custom format. %h=hash, %an=author, %s=subject.'),
   d('Filtering Options', 'git log --author="name": filter by author. git log --since="2 weeks ago": date filter. git log --grep="fix": search commit messages. git log -- <file>: show commits touching a file. git log -S"function()": show commits that changed a specific string (pickaxe). git log --merges: only merge commits.'),
   d('Range and Revision', 'git log main..feature: commits in feature not in main. git log --since="2024-01-01" --until="2024-12-31": date range. git log -5: show last 5 commits. git log --follow <file>: show history of renamed file.')],
  [q('What does git log show?', 'Commit history in reverse chronological order with hash, author, date, and message.'),
   q('How to see branch graph in log?', 'git log --graph --oneline --all --decorate shows ASCII branch structure.'),
   q('How to find commits that changed a specific function?', 'git log -S"functionName" (pickaxe search) finds commits that added/removed the string.')],
  R(10,35,200,25,'#0070f3','','git log --oneline','Compact commit list') +
  R(10,65,200,25,'#28a745','','git log --graph','Branch visualization') +
  R(10,95,200,25,'#ffc107','','git log --author="name"','Filter by author') +
  T(240,140,'Git Log: Powerful commit history viewer with extensive filtering and formatting.',9,'#666','middle'),
  [e('Log Commands', 'View commit history.', codeBlock(['git log --oneline --graph --all --decorate', 'git log --since="2 weeks ago" --author="ayaz"', 'git log -p -5']))],
  [m('What flag shows branch graph in git log?', ['--stat', '--graph', '--patch', '--decorate'], 1, '--graph shows ASCII branch visualization in the log output.')]
);

/* Git Diff */
compactTopic('git-diff', 'Git Diff', 'intermediate', 10,
  ['git diff shows changes between commits, branches, the working directory, and the staging area.', 'Key comparisons: working vs staging, staging vs last commit, any two commits, any two branches.', 'Output shows added lines (green +), removed lines (red -), and context (unchanged lines).'],
  'git diff is like a red pen and green highlighter for your code. It shows exactly what changed: red for deleted lines, green for added lines. It can compare any two points in your project timeline, like "show me what changed between yesterday and today."',
  [d('Common Diff Commands', 'git diff: working directory vs staging area. git diff --staged (--cached): staging vs last commit. git diff HEAD: working vs last commit (unstaged + staged). git diff <commit1> <commit2>: compare any two commits. git diff <branch1> <branch2>: compare branches. git diff -- <file>: diff specific file.'),
   d('Diff Options', 'git diff --stat: summary of changed files. git diff --word-diff: word-level diff. git diff --color-words: colored word diff. git diff --check: check for whitespace errors. git diff --name-only: only show changed file names. git diff --ignore-space-change: ignore whitespace.')],
  [q('What does git diff show?', 'Changes between the working directory and staging area (unstaged changes).'),
   q('How to see staged changes?', 'git diff --staged or git diff --cached.'),
   q('How to diff two branches?', 'git diff main feature (shows what feature has that main doesn\'t).')],
  R(10,35,150,25,'#0070f3','','git diff','Working vs Staged') +
  R(10,65,150,25,'#28a745','','git diff --staged','Staged vs Committed') +
  R(10,95,150,25,'#ffc107','','git diff HEAD','Working vs Committed') +
  T(240,140,'Git Diff: Compare files, commits, branches. Shows additions (+), deletions (-), and context.',9,'#666','middle'),
  [e('Diff Commands', 'Compare changes.', codeBlock(['git diff', 'git diff --staged', 'git diff main feature', 'git diff HEAD~2 HEAD']))],
  [m('What does git diff show?', ['Changes in staging area', 'Unstaged changes in working directory', 'All commits', 'Remote changes'], 1, 'git diff (without flags) shows unstaged changes between working directory and staging area.')]
);

/* Git Blame */
compactTopic('git-blame', 'Git Blame', 'intermediate', 10,
  ['git blame annotates each line of a file with the commit hash, author, and date that last modified it.', 'Useful for: understanding why code exists, finding who introduced a bug, or reviewing code history per line.', 'Output format: commit hash | author | timestamp | line number | content.'],
  'git blame is like a forensic tool for your code. It tells you who last touched each line, when, and in which commit. Like checking security footage to see who made a specific change to a document. The name "blame" is misleading — it\'s more about "who knows about this code."',
  [d('Blame Commands', 'git blame <file>: annotate entire file. git blame -L 10,20 <file>: annotate specific line range. git blame -w <file>: ignore whitespace changes. git blame -M <file>: detect moved lines. git blame -C <file>: detect copied lines from other files.'),
   d('Practical Use', 'Find regression: git blame shows the commit that last changed a buggy line. Use with git show <hash> to see full context. Understanding: see when and why a line was added. Code review: verify who reviewed a change. Use blame annotations in IDE (VS Code, IntelliJ) for inline view.')],
  [q('What does git blame show?', 'For each line in a file: the commit hash, author, and timestamp of the last modification.'),
   q('How to blame only specific lines?', 'git blame -L 20,40 <file> shows lines 20-40.'),
   q('What does -M flag do in git blame?', 'Detects lines that were moved within the same file (not just modified).')],
  R(10,35,300,25,'#0070f3','','git blame app.js','Annotates each line') +
  T(240,100,'Git Blame: Shows commit, author, date per line. Find who changed what and when.',9,'#666','middle'),
  [e('Blame Commands', 'Line annotation.', codeBlock(['git blame server.js -L 42,50', 'git blame --show-email index.js']))],
  [m('What does git blame annotate per line?', ['Branch name', 'Commit hash, author, date', 'File size', 'Line count'], 1, 'git blame shows commit hash, author, and timestamp for each line\'s last modification.')]
);

/* Git Reflog */
compactTopic('git-reflog', 'Git Reflog', 'advanced', 15,
  ['git reflog (reference log) records every movement of HEAD — commits, checkouts, merges, rebases, resets.', 'Unlike git log (which shows commit history), reflog shows the history of WHERE HEAD has been.', 'Critical for recovery: you can recover "lost" commits after reset, rebase, or amend using reflog entries.'],
  'git reflog is like the black box flight recorder for your Git repository. Every action you take is recorded: "switched to main", "committed", "reset to here", "rebased onto there". Even if you make a mistake like resetting to the wrong place, the reflog can save you.',
  [d('Reflog Entries', 'HEAD@{0}: current position. HEAD@{1}: previous position. Each entry has: action (commit, reset, checkout), reason, and timestamp. Reflog is per-repository, local only — not shared via remote. Entries expire: 90 days by default (gc.reflogExpire).'),
   d('Recovery Examples', 'git reflog: see all HEAD movements. git reset --hard HEAD@{5}: go back to 5th previous position. git checkout HEAD@{2}: check out a previous state. git cherry-pick HEAD@{3}: re-apply a lost commit. git reflog show <branch>: reflog for specific branch. Recovery after bad reset: git reset --hard ORIG_HEAD or find the lost commit in reflog.')],
  [q('What is git reflog?', 'A log of every HEAD movement — commits, checkouts, merges, rebases, resets. Local only.'),
   q('How to recover from a bad git reset --hard?', 'Find the lost commit in reflog (git reflog), then git reset --hard HEAD@{N} to restore.'),
   q('How long do reflog entries persist?', '90 days by default (configurable via gc.reflogExpire).')],
  R(10,35,300,25,'#0070f3','','git reflog','History of HEAD movements') +
  R(10,65,300,25,'#28a745','','HEAD@{0} -> HEAD@{1} -> HEAD@{2}','Stack of positions') +
  T(240,120,'Git Reflog: "Black box" recorder of all HEAD movements. Essential for recovery.',9,'#666','middle'),
  [e('Reflog Recovery', 'Recover lost commits.', codeBlock(['git reflog', 'git reset --hard HEAD@{3}', 'git checkout HEAD@{5} -- file.txt']))],
  [m('What does git reflog track?', ['Remote commits', 'All HEAD movements (local only)', 'File changes', 'Branch names'], 1, 'Reflog tracks all HEAD movements locally. It is NOT shared via remote.')]
);

/* Git Bisect */
compactTopic('git-bisect', 'Git Bisect', 'advanced', 20,
  ['git bisect uses binary search to find the exact commit that introduced a bug.', 'You mark commits as "good" (working) or "bad" (broken), and Git narrows down the range by halving the search space each step.', 'With N commits, bisect finds the bad commit in ~log2(N) steps. For 1024 commits, only ~10 checks needed.'],
  'git bisect is like playing "hot and cold" but using binary search. You say "this commit is good" and "this commit is bad." Git picks a commit halfway in between. You test it and say good or bad. Git halves again. After ~10 rounds, Git finds the exact commit where the bug was introduced.',
  [d('Bisect Workflow', 'git bisect start: begin. git bisect bad HEAD: mark current as bad. git bisect good v1.0: mark known good commit. Git checks out a commit halfway. Test and: git bisect good or git bisect bad. Repeat until Git identifies the first bad commit. git bisect reset: end session.'),
   d('Automated Bisect', 'git bisect run <script>: automate testing. Provide a script that exits 0 (good) or non-0 (bad). Git automatically runs the script on each commit. Example: git bisect run npm test. Perfect for CI regression detection. Set up: npm test exits 1 if test fails (bug present), 0 if passes (bug absent).')],
  [q('What does git bisect do?', 'Binary search through commit history to find the exact commit that introduced a bug.'),
   q('How many steps to check 2048 commits?', '~11 steps (log2(2048) = 11). Each step halves the search space.'),
   q('How to automate bisect?', 'git bisect run <script> — provide a script that exits 0 for good, non-0 for bad.')],
  R(10,35,300,25,'#0070f3','','git bisect start','Begin binary search') +
  R(10,65,240,25,'#28a745','','~log2(N) steps to find bug','N=1024 -> ~10 checks') +
  T(240,120,'Git Bisect: Binary search for the commit that introduced a bug. Efficient debugging.',9,'#666','middle'),
  [e('Bisect Example', 'Find bug by binary search.', codeBlock(['git bisect start', 'git bisect bad HEAD', 'git bisect good v1.0', '# test, then repeat:', 'git bisect good', '# or:', 'git bisect bad', 'git bisect reset']))],
  [m('What is the time complexity of git bisect?', ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], 1, 'git bisect uses binary search — O(log n) where n is the number of commits in the range.')]
);

/* Git Submodule */
compactTopic('git-submodule', 'Git Submodule', 'advanced', 20,
  ['Git submodules allow you to include one Git repository inside another as a nested dependency.', 'The parent repo stores a reference (commit hash) to the submodule, not the actual files.', 'Useful for: shared libraries, third-party dependencies, monorepo-like structures without monorepo overhead.'],
  'Git submodule is like having a library inside your house that is actually a separate property. You have a reference card (commit hash) pointing to that library. When someone visits your house, they can look up the card and visit the exact same library. The library can be updated independently.',
  [d('Submodule Commands', 'git submodule add <url> <path>: add submodule. git submodule init: initialize submodule config. git submodule update: fetch and checkout referenced commit. git submodule update --remote: update to latest commit on submodule\'s default branch. git clone --recurse-submodules <url>: clone with all submodules.'),
   d('Submodule Workflow', 'Adding: git submodule add, commit. Cloning: git clone --recurse-submodules or git clone then git submodule init && git submodule update. Updating: cd submodule, git pull, cd .., git commit (to update the reference). Best Practices: Pin submodules to stable versions, document submodule workflow, consider alternatives (npm, package managers).'),
   d('Pitfalls', 'Forgetting --recurse-submodules when cloning. Detached HEAD state in submodules. Stale references (need explicit git submodule update). Complex nested submodules. Changes in submodule must be pushed separately before parent. Consider subtrees or package managers as simpler alternatives.')],
  [q('What is a Git submodule?', 'A nested Git repository referenced by commit hash from the parent repository.'),
   q('How to clone a repo with submodules?', 'git clone --recurse-submodules <url> or git submodule init && git submodule update after cloning.'),
   q('What is a common submodule pitfall?', 'Forgetting --recurse-submodules when cloning — results in empty submodule directories.')],
  R(10,35,150,25,'#0070f3','','Parent Repo','Contains reference commit') +
  A(160,48,180,48) +
  R(190,35,150,25,'#28a745','','Submodule Repo','Separate Git repo') +
  T(240,100,'Git Submodule: Include external Git repos within your repo. Each submodule pinned to a specific commit.',9,'#666','middle'),
  [e('Submodule Commands', 'Manage submodules.', codeBlock(['git submodule add https://github.com/user/lib.git lib', 'git clone --recurse-submodules <url>', 'git submodule update --remote']))],
  [m('What happens when cloning a repo with submodules without --recurse-submodules?', ['Submodules clone automatically', 'Submodule directories are empty', 'An error occurs', 'Repo fails to clone'], 1, 'Without --recurse-submodules, submodule directories are created but empty. Run git submodule init && git submodule update.')]
);

/* Git Worktree */
compactTopic('git-worktree', 'Git Worktree', 'advanced', 15,
  ['git worktree allows you to check out multiple branches simultaneously in different directories.', 'Unlike git stash or git switch, worktrees let you work on multiple features at the same time without context switching.', 'Each worktree is a full working directory linked to the same .git directory — changes in any worktree affect the shared object database.'],
  'git worktree is like having multiple desks for different projects. You can have one branch open on desk A, another on desk B, and switch between them instantly by walking to the other desk. No stashing, no committing work-in-progress, no context switching. All desks share the same filing cabinet (.git).',
  [d('Worktree Commands', 'git worktree add <path> <branch>: create new worktree. git worktree list: show all worktrees. git worktree remove <path>: remove worktree. git worktree prune: clean up removed worktree references. git worktree add -b <new-branch> <path> main: create worktree with new branch based on main.'),
   d('Use Cases', 'Hotfixes: work on a hotfix in a separate worktree while main worktree has feature code. Code review: review PR branch in a separate worktree. Long-running tasks: run tests on one branch while coding on another. Parallel features: work on multiple feature branches simultaneously. No need to stash, commit WIP, or use temporary branches.')],
  [q('What is git worktree?', 'A feature allowing multiple branches to be checked out simultaneously in separate directories, sharing the same .git folder.'),
   q('How is worktree better than git stash for multi-tasking?', 'Worktrees allow truly parallel work without stashing, committing WIP, or switching context. Each worktree is independent.'),
   q('Do worktrees share the same object database?', 'Yes — all worktrees share the same .git directory. Commits in any worktree are visible to all others.')],
  R(10,35,150,25,'#0070f3','','Main Worktree','Main branch') +
  R(10,65,150,25,'#28a745','','feature-worktree','Feature branch work') +
  R(10,95,150,25,'#ffc107','','hotfix-worktree','Hotfix branch work') +
  T(240,140,'Git Worktree: Check out multiple branches simultaneously in separate directories. No context switching.',9,'#666','middle'),
  [e('Worktree Commands', 'Multiple working trees.', codeBlock(['git worktree add ../hotfix hotfix/bug', 'git worktree list', 'git worktree remove ../hotfix']))],
  [m('What is the main benefit of git worktree?', ['It is faster than git switch', 'It lets you work on multiple branches simultaneously without stashing', 'It creates new repositories', 'It improves network performance'], 1, 'Worktrees enable parallel work on multiple branches without stashing or committing WIP.')]
);

/* Git Clean */
compactTopic('git-clean', 'Git Clean', 'intermediate', 5,
  ['git clean removes untracked files from the working directory.', 'By default, git clean does nothing — you must use -n (dry run) or -f (force) flags.', 'Use with caution: git clean -fd removes untracked files AND directories permanently.'],
  'git clean is like a vacuum cleaner for your project. It sweeps away untracked files — those that aren\'t in your .gitignore and aren\'t committed. Always check what will be removed first (-n flag) before actually cleaning.',
  [d('Clean Options', 'git clean -n: dry run (show what would be removed). git clean -f: remove untracked files. git clean -fd: remove untracked files AND directories. git clean -fx: also remove .gitignored files (ignored files are normally safe!). git clean -e <pattern>: exclude files matching pattern. git clean -d -f <path>: clean specific directory.'),
   d('Safety', 'Always run git clean -n first to preview. git clean -f is irreversible — deleted files cannot be recovered (no staging area involved). .gitignored files are NOT removed by default (use -X to remove ignored, -x to remove all). Combine with git reset --hard to fully clean: reset to undo tracked changes, clean to remove untracked.')],
  [q('What does git clean do?', 'Removes untracked files from the working directory.'),
   q('What flag is essential before running git clean?', '-n (dry run) to preview what will be removed.'),
   q('Does git clean remove .gitignored files by default?', 'No — it only removes untracked files that are NOT in .gitignore. Use -x flag to include ignored files.')],
  R(10,35,110,25,'#0070f3','','git clean -n','Preview removal') +
  R(10,65,110,25,'#28a745','','git clean -f','Remove files') +
  R(10,95,110,25,'#ffc107','','git clean -fd','Remove files + dirs') +
  T(240,140,'Git Clean: Remove untracked files. Always dry-run (-n) first. Combine with git reset --hard for full clean.',9,'#666','middle'),
  [e('Clean Commands', 'Remove untracked files.', codeBlock(['git clean -n', 'git clean -fd', 'git clean -fx']))],
  [m('What does git clean -n do?', ['Force removes files', 'Dry run (preview only)', 'Removes directories', 'Removes ignored files'], 1, 'git clean -n is a dry run that shows what would be removed without actually removing anything.')]
);

/* Git Archive */
compactTopic('git-archive', 'Git Archive', 'intermediate', 10,
  ['git archive creates a compressed archive (ZIP or tar) of the repository at a specific commit or branch.', 'Unlike copying the directory, archive only includes tracked files — no .git directory, no untracked files, no ignored files.', 'Useful for: releases, deployments, distributing source code without Git history.'],
  'git archive is like taking a clean snapshot of your project for shipping. It zips up only the tracked files — no hidden .git folder, no node_modules, no .env files. Perfect for creating a release package that contains exactly what someone needs, without the Git overhead.',
  [d('Archive Commands', 'git archive -o project.zip HEAD: create ZIP of current commit. git archive --format=tar HEAD | gzip > project.tar.gz: create tar.gz. git archive --format=zip --prefix=project-v1.0/ HEAD: add directory prefix. git archive -o latest.zip main: archive main branch. git archive --output=release.tar.gz v1.0.0: archive a tag.'),
   d('Use Cases', 'Releases: ship clean source code for a release tag. Deployments: generate deployment artifacts (minus development files). Distribution: provide source code without Git history to external parties. CI/CD: use in pipelines to create deployable packages. Works with any tree-ish (commit, branch, tag).')],
  [q('What does git archive do?', 'Creates a ZIP or tar archive of the repository at a specific commit, including only tracked files.'),
   q('What is NOT included in git archive?', '.git directory, untracked files, ignored files — only tracked files at the specified commit.'),
   q('Can git archive create a ZIP with a directory prefix?', 'Yes — use --prefix=project-v1.0/ to wrap contents in a named directory.')],
  R(10,35,200,25,'#0070f3','','git archive HEAD','ZIP of current commit') +
  R(10,65,200,25,'#28a745','','git archive v1.0.0','Archive a tag/release') +
  T(240,120,'Git Archive: Create clean ZIP/tar of tracked files. No .git, no untracked files. Perfect for releases.',9,'#666','middle'),
  [e('Archive Commands', 'Create archives.', codeBlock(['git archive -o project.zip HEAD', 'git archive -o release.zip v1.0.0 --prefix=app/']))],
  [m('What does git archive include?', ['All files including .git', 'Only tracked files', 'Only untracked files', 'All files except .git'], 1, 'git archive includes only tracked files (committed). No .git, no untracked, no ignored files.')]
);

// ---- PAD TOPICS ----
var padTopics = require('../pad-topics');
padTopics(topics);

// ---- GENERATE ----
var dataDir = __dirname;
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["version-control-git"] = TOPICS_DATA["version-control-git"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["version-control-git"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));
fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));
console.log('Generated Git topics: ' + Object.keys(topics).length);


