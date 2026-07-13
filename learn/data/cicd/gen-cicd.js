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

/* CI/CD Fundamentals */
compactTopic('cicd-fundamentals', 'CI/CD Fundamentals', 'beginner', 20,
  ['CI/CD is a method of frequently delivering applications to customers by introducing automation into the stages of app development.', 'CI (Continuous Integration): developers merge changes to main branch frequently, each merge triggers automated build and test.', 'CD (Continuous Delivery/Deployment): code changes are automatically built, tested, and prepared for release to production.'],
  'CI/CD is like an automated factory assembly line for your software. When a developer submits code, the factory automatically tests it (CI), packages it, and gets it ready to ship (CD). In continuous deployment, it even ships it automatically. This catches bugs early and delivers features fast.',
  [d('Continuous Integration', 'Developers merge code to main branch multiple times daily. Each commit triggers automated build and test. Immediate feedback if build breaks or tests fail. Practice: feature flags, short-lived branches, trunk-based development.'),
   d('Continuous Delivery vs Deployment', 'Continuous Delivery: every change is ready for release to production, but deployment is manual on demand. Continuous Deployment: every change that passes tests is automatically deployed to production. Delivery gives human approval gate; Deployment is fully automated.'),
   d('Benefits', 'Faster time to market, reduced manual errors, consistent release process, frequent feedback loops, smaller changes easier to debug, increased developer productivity, faster recovery from failures.')],
  [q('What is Continuous Integration?', 'Frequently merging code changes to main branch with automated builds and tests on each merge.'),
   q('What is the difference between Continuous Delivery and Continuous Deployment?', 'Delivery: automated tests but manual deploy. Deployment: fully automated deploy after tests pass.'),
   q('What is trunk-based development?', 'Developers work on short-lived branches merged to main multiple times daily, avoiding long-lived feature branches.')],
  R(10,35,110,25,'#0070f3','','Code Commit','Developer pushes') +
  A(120,48,140,48) +
  R(150,35,110,25,'#28a745','','CI Build','Auto test + build') +
  A(260,48,280,48) +
  R(290,35,110,25,'#ffc107','','CD Delivery','Auto deploy ready') +
  R(10,65,110,25,'#dc3545','','Production','Ship to users') +
  T(240,130,'CI/CD: Frequent integration (CI), automated delivery (CD). Faster releases, fewer errors.',9,'#666','middle'),
  [e('Simple CI/CD Flow', 'Pipeline stages.', codeBlock(['commit -> build -> test -> deploy', '# Each stage automated and triggered by previous success']))],
  [m('What is the main benefit of CI?', ['Slower releases', 'Faster feedback on integration issues', 'More documentation', 'Manual testing'], 1, 'CI gives immediate feedback when code breaks the build or tests, catching issues early.')]
);

/* CI/CD Pipeline */
compactTopic('cicd-pipeline', 'CI/CD Pipeline', 'intermediate', 20,
  ['A CI/CD pipeline is an automated sequence of stages that code goes through from commit to deployment.', 'Typical stages: Source → Build → Test → Stage → Deploy. Each stage must succeed before the next starts.', 'Pipelines are defined as code (YAML/JSON) and version-controlled alongside the application.'],
  'A CI/CD pipeline is like an assembly line for your code. Each station does something: Source (get code), Build (compile/package), Test (run tests), Stage (deploy to test environment), Deploy (ship to production). The car moves to the next station only if the current station reports success.',
  [d('Pipeline Stages', 'Source: check out code from repository. Build: compile code, install dependencies, generate artifacts. Test: unit tests, integration tests, linting. Stage: deploy to staging/QA environment for further validation. Deploy: release to production (manual or automated). Post-deploy: smoke tests, monitoring alerts.'),
   d('Pipeline as Code', 'Pipeline definition stored in repository (version controlled). Benefits: reviewable, testable, reproducible, consistent across environments. Common formats: GitHub Actions YAML, GitLab CI YAML, Jenkinsfile (Groovy), CircleCI YAML.'),
   d('Pipeline Best Practices', 'Fail fast: run quickest tests first. Parallel stages where possible. Keep stages focused (one responsibility). Use cached dependencies. Version control pipeline config. Maintain pipeline as you maintain code.')],
  [q('What is a CI/CD pipeline?', 'An automated sequence of stages (source, build, test, deploy) that code passes through from commit to production.'),
   q('What does "fail fast" mean in pipelines?', 'Run quick checks (lint, unit tests) first to provide immediate feedback on common issues.'),
   q('Why define pipeline as code?', 'Version controlled, reviewable, reproducible, consistent across environments.')],
  R(10,35,80,25,'#0070f3','','Source','git checkout') +
  A(90,48,100,48) +
  R(110,35,80,25,'#28a745','','Build','npm install') +
  A(190,48,200,48) +
  R(210,35,80,25,'#ffc107','','Test','npm test') +
  A(290,48,300,48) +
  R(310,35,80,25,'#dc3545','','Stage','Deploy QA') +
  A(390,48,400,48) +
  R(410,35,80,25,'#e83e8c','','Deploy','Production') +
  T(240,100,'CI/CD Pipeline: Source → Build → Test → Stage → Deploy. Each stage gates the next.',9,'#666','middle'),
  [e('Pipeline YAML', 'GitHub Actions pipeline example.', codeBlock(['name: CI/CD Pipeline', 'on: [push]', 'jobs:', '  build:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '      - run: npm ci', '      - run: npm test']))],
  [m('What is the fail-fast principle in pipelines?', ['Run slowest tests first', 'Run quickest tests first for immediate feedback', 'Skip tests on failure', 'Deploy regardless'], 1, 'Fail fast: run quick checks like linting and unit tests first so developers get immediate feedback.')]
);

/* Build Automation */
compactTopic('cicd-build-automation', 'Build Automation', 'intermediate', 15,
  ['Build automation is the process of automating the creation of software builds and associated artifacts.', 'Includes: dependency resolution, compilation, asset bundling, code generation, packaging.', 'Tools: npm/pnpm/yarn (JS), Maven/Gradle (Java), pip (Python), make, Docker.'],
  'Build automation is like having a robot chef that follows a recipe to cook your software. It fetches ingredients (dependencies), mixes them (compiles), prepares the dish (bundles), and plates it (packages). The recipe is your build configuration — consistent every time.',
  [d('Build Process', 'Dependency installation: npm ci (clean install), pip install, mvn install. Compilation: TypeScript to JS, SASS to CSS, Babel transpilation. Bundling: Webpack, Vite, Rollup, Parcel. Code generation: GraphQL types, Prisma client, OpenAPI clients. Asset optimization: minification, image optimization, tree shaking.'),
   d('Build Tools by Language', 'JavaScript/TypeScript: npm, pnpm, yarn, webpack, vite, esbuild, rollup. Java: Maven, Gradle, Ant. Python: pip, poetry, setup.py. Go: go build, go mod. Rust: cargo build. C/C++: make, cmake, ninja. Docker: docker build.'),
   d('Reproducible Builds', 'Lock files: package-lock.json, yarn.lock, pnpm-lock.yaml. Version pinning: exact dependency versions. CI: use clean install (npm ci) for deterministic builds. Docker: multi-stage builds, pin base image versions.')],
  [q('What is build automation?', 'The automated process of compiling code, resolving dependencies, and packaging artifacts.'),
   q('What is the difference between npm install and npm ci?', 'npm ci: clean install from lockfile (faster, deterministic). npm install: may update lockfile.'),
   q('What is a lock file?', 'A file that records exact dependency versions (e.g., package-lock.json) ensuring reproducible builds.')],
  R(10,35,140,25,'#0070f3','','Dependencies','npm install / pip install') +
  R(10,65,140,25,'#28a745','','Compilation','tsc, babel, sass') +
  R(10,95,140,25,'#ffc107','','Bundling','webpack, vite') +
  R(10,125,140,25,'#dc3545','','Packaging','Docker, ZIP, JAR') +
  T(240,170,'Build Automation: Automated compilation, bundling, and packaging. Reproducible via lock files.',9,'#666','middle'),
  [e('Build Script', 'Node.js build example.', codeBlock(['npm ci', 'npm run build', 'npm run test', 'docker build -t app:latest .']))],
  [m('What ensures reproducible builds?', ['Manual installation', 'Lock files and clean install', 'Latest versions', 'Global dependencies'], 1, 'Lock files (like package-lock.json) and clean install commands ensure reproducible, deterministic builds.')]
);

/* Test Automation */
compactTopic('cicd-test-automation', 'Test Automation in CI/CD', 'intermediate', 20,
  ['Test automation in CI/CD means running tests automatically on every code change, providing fast feedback on code quality.', 'Test types: unit tests (fast, isolated), integration tests (service interaction), end-to-end tests (full workflow), visual regression tests.', 'Test results gate the pipeline: failure in tests blocks the pipeline from proceeding to deployment.'],
  'Test automation is like having a quality control inspector that checks every product coming off the assembly line. If the inspector finds a defect, the product is sent back, preventing bad products from reaching customers. The earlier a defect is caught, the cheaper it is to fix.',
  [d('Test Pyramid', 'Unit tests (base, many): test individual functions/classes. Fast, no external dependencies. Integration tests (middle, some): test module/API interactions. May use test databases. E2E tests (top, few): test complete user flows. Slow, brittle. Strategy: >70% unit, ~20% integration, <10% E2E.'),
   d('CI/CD Test Strategy', 'Run unit tests on every commit (fast feedback). Run integration tests on PR to main. Run E2E tests on PR or scheduled (not on every commit). Run linting and type checking in parallel. Use test splitting/parallelism for large suites.'),
   d('Test Reporting', 'JUnit XML: standard test report format. Coverage reports: Istanbul (JS), JaCoCo (Java), coverage.py. Publish reports as pipeline artifacts. Failure notifications: Slack, email, GitHub commit status. Test flakiness detection and retry.')],
  [q('What is the test pyramid?', 'A model showing the ideal proportion: many unit tests (base), some integration tests (middle), few E2E tests (top).'),
   q('What tests should run on every commit?', 'Unit tests (fast, focused). Integration and E2E tests run on PRs or schedules.'),
   q('What is test flakiness?', 'Tests that sometimes pass and sometimes fail without code changes. Should be quarantined and fixed.')],
  R(10,35,140,25,'#0070f3','','Unit Tests','Fast, many, isolated') +
  R(10,65,140,25,'#28a745','','Integration','API, DB interaction') +
  R(10,95,140,25,'#ffc107','','E2E Tests','Full workflows, few') +
  T(240,140,'Test Automation: Unit tests on every commit, integration on PRs, E2E on PRs/schedules. Gate pipeline progression.',9,'#666','middle'),
  [e('Test Commands', 'Run tests in CI.', codeBlock(['npm run test:unit', 'npm run test:integration', 'npm run test:e2e']))],
  [m('What is the recommended proportion of unit tests in the test pyramid?', ['10%', '50%', '70%+', '90%+'], 2, 'The test pyramid recommends >70% unit tests (base), ~20% integration (middle), <10% E2E (top).')]
);

/* Linting & Code Quality */
compactTopic('cicd-code-quality', 'Linting & Code Quality', 'intermediate', 15,
  ['Linting analyzes source code for programmatic and stylistic errors, enforcing consistent coding standards.', 'Code quality tools go beyond linting to measure complexity, duplication, security, and maintainability.', 'Integrate linting early in the pipeline — fail fast on style issues before running expensive tests.'],
  'Linting is like a spell-checker and style-guide enforcer for code. It catches: missing semicolons, unused variables, incorrect indentation, potential bugs. Code quality tools are like a report card—they give your code a score for maintainability, security, and complexity.',
  [d('Linting Tools', 'JavaScript: ESLint (configurable rules), Prettier (formatting). TypeScript: typescript-eslint. Python: flake8, pylint, black. CSS: stylelint. Docker: hadolint. YAML: yamllint. Markdown: markdownlint. Pre-commit hooks: lint before commit.'),
   d('Code Quality Tools', 'Complexity: cyclomatic complexity, cognitive complexity. Duplication: copy-paste detection (CPD). Security: SonarQube, CodeQL, Snyk. Coverage: minimum coverage thresholds. Maintainability index: numerical score. Technical debt: estimated effort to fix issues.'),
   d('CI/CD Integration', 'Run linting first (fastest checks). Fail pipeline on lint errors. Enforce formatting (Prettier as gate). Publish quality reports as artifacts. Use quality gates to block merges below threshold.'),
   d('SonarQube', 'Popular code quality platform. Quality Gates: pass/fail based on metrics (coverage, bugs, vulnerabilities, code smells, duplication). Supports 30+ languages. PR decoration: annotations in PR diff. CI integration: sonar-scanner command.')],
  [q('What is linting?', 'Automated analysis of source code to detect programming errors, bugs, and stylistic inconsistencies.'),
   q('What is Prettier?', 'An opinionated code formatter that enforces consistent style automatically.'),
   q('What is a SonarQube Quality Gate?', 'A set of threshold conditions (coverage, bugs, etc.) that code must meet to pass quality checks.')],
  R(10,35,140,25,'#0070f3','','ESLint','Code analysis') +
  R(10,65,140,25,'#28a745','','Prettier','Formatting') +
  R(10,95,140,25,'#ffc107','','SonarQube','Quality metrics') +
  R(10,125,140,25,'#dc3545','','Quality Gate','Pass/fail threshold') +
  T(240,170,'Linting & Code Quality: ESLint, Prettier, SonarQube. Automated code analysis gates the pipeline.',9,'#666','middle'),
  [e('Lint in CI', 'Run linting and formatting checks.', codeBlock(['npm run lint', 'npx prettier --check .', 'npx sonar-scanner']))],
  [m('Where should linting run in the pipeline?', ['At the end', 'In the first stage (fail fast)', 'After deployment', 'Never in CI'], 1, 'Linting should run early (first stage) as it provides fast feedback on common issues.')]
);

/* Artifact Management */
compactTopic('cicd-artifacts', 'Artifacts & Build Outputs', 'intermediate', 15,
  ['Artifacts are the outputs of the build process: compiled code, packages, Docker images, reports, and binaries.', 'Artifacts are stored, versioned, and passed between pipeline stages or consumed by downstream systems.', 'Common registries: Docker Hub, GitHub Packages, npm registry, JFrog Artifactory, S3.'],
  'Artifacts are like the finished products coming off the assembly line. They need to be stored in a warehouse (artifact registry) with labels and version numbers. Downstream stages (deployment) or other teams can fetch specific versions from the warehouse as needed.',
  [d('Artifact Types', 'Containers: Docker images pushed to registry (Docker Hub, ECR, GCR). Language packages: npm packages, JARs, Python wheels, NuGet packages. Binaries: compiled executables, installers. Reports: test reports, coverage reports, lint reports. Deployment packages: ZIP/TAR archives.'),
   d('Artifact Storage', 'Pipeline built-in: GitHub Actions artifacts, GitLab artifacts, Jenkins artifacts. Registry: Docker Registry (Harbor, Docker Hub), Package Registry (npm, PyPI). Cloud storage: S3, GCS, Azure Blob. Version policy: keep recent N versions, delete old ones.'),
   d('Best Practices', 'Version every artifact uniquely (commit SHA or semver). Immutable artifacts: never overwrite a published version. Clean up old artifacts. Use artifact promotion (dev → staging → prod). Sign artifacts for security. Scan artifacts for vulnerabilities.')],
  [q('What are pipeline artifacts?', 'Build outputs (binaries, containers, reports) stored and passed between pipeline stages.'),
   q('What is an artifact registry?', 'A storage service for versioned artifacts (Docker Hub, npm registry, GitHub Packages).'),
   q('What is artifact promotion?', 'Promoting an artifact through environments: dev → staging → production after validation.')],
  R(10,35,140,25,'#0070f3','','Build Code','Compile & package') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Artifact Registry','Store versioned') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Deploy','Consume artifacts') +
  T(240,100,'Artifact Management: Store versioned build outputs. Pass between stages. Registries: Docker Hub, npm, S3.',9,'#666','middle'),
  [e('Docker Artifact', 'Build and push image.', codeBlock(['docker build -t app:${GITHUB_SHA} .', 'docker push ghcr.io/user/app:${GITHUB_SHA}']))],
  [m('Should artifacts be overwritten?', ['Yes, keep latest only', 'No, artifacts should be immutable', 'Only for dev builds', 'Always'], 1, 'Artifacts should be immutable — never overwrite a published version. Use unique version identifiers.')]
);

/* Docker in CI/CD */
compactTopic('cicd-docker', 'Docker in CI/CD', 'intermediate', 20,
  ['Docker provides consistent, reproducible environments for building, testing, and deploying applications in CI/CD pipelines.', 'Containers ensure the same dependencies, OS, and configuration across development, testing, and production.', 'Key concepts: Dockerfile, docker build, docker push/pull, multi-stage builds, Docker Compose for testing.'],
  'Docker in CI/CD is like having a standardized shipping container for your software. Every container is built the same way, carries the same contents, and works identically on any system. This eliminates "it works on my machine" problems across the pipeline.',
  [d('Docker Build in CI', 'Dockerfile defines the environment. docker build creates the image. Use .dockerignore to exclude unnecessary files. Tag images with commit SHA and/or branch. Multi-stage builds: separate build and runtime dependencies (smaller images). BuildKit: faster, parallel layer builds.'),
   d('Docker for Testing', 'Docker Compose: spin up test dependencies (DB, Redis, queues). Ephemeral environments: create per-test containers, destroy after. Service containers: GitHub Actions supports services. Database migrations in containers. Parallel test execution using container isolation.'),
   d('Docker Deploy', 'Push image to registry after successful tests. Deploy by pulling and running new image (rolling update). Blue-green: switch traffic between old and new container group. Kubernetes: update Deployment image tag.'),
   d('Best Practices', 'Pin base image versions (not "latest"). Use distroless or Alpine base. Scan images for vulnerabilities. Small images = faster pulls. Cache layers effectively. Use docker build --cache-from for CI caching.')],
  [q('Why use Docker in CI/CD?', 'Consistent environments across build, test, and production. Eliminates environment-specific issues.'),
   q('What is a multi-stage build?', 'A Dockerfile with multiple FROM statements: build stage (large) and runtime stage (small, only runtime deps).'),
   q('What is Docker BuildKit?', 'An improved builder with parallel layer processing, better caching, and faster builds.')],
  R(10,35,140,25,'#0070f3','','Dockerfile','Define environment') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','docker build','Create image') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','docker push','Upload to registry') +
  R(10,65,140,25,'#dc3545','','docker pull','Download & deploy') +
  T(240,130,'Docker in CI/CD: Consistent environments, multi-stage builds, container testing, image registries.',9,'#666','middle'),
  [e('Docker CI Commands', 'Build, test, and push.', codeBlock(['docker build -t app:${SHA} .', 'docker compose up -d db', 'docker compose run tests', 'docker push ghcr.io/user/app'])),
   e('Multi-stage Dockerfile', 'Distroless runtime image.', codeBlock(['FROM node:20 AS build', 'WORKDIR /app', 'COPY . .', 'RUN npm ci && npm run build', 'FROM gcr.io/distroless/nodejs20-debian12', 'COPY --from=build /app/dist ./dist', 'CMD ["dist/index.js"]']))],
  [m('What is the benefit of multi-stage builds?', ['Faster internet', 'Smaller final images', 'More layers', 'Easier debugging'], 1, 'Multi-stage builds separate build dependencies (large) from runtime (small), resulting in much smaller final images.')]
);

/* Environment Management */
compactTopic('cicd-environments', 'Environment Management', 'intermediate', 15,
  ['Environment management involves setting up and maintaining separate stages (dev, staging, production) for the software delivery lifecycle.', 'Each environment should mirror production as closely as possible to catch issues early.', 'Tools: Docker Compose, Terraform, Kubernetes, CloudFormation, environment variables.'],
  'Environment management is like having different rooms in a house: the workshop (development), showroom (staging), and retail store (production). You build and test in the workshop, verify in the showroom, and only perfect products reach the retail store.',
  [d('Environment Types', 'Development: dev machine, local containers, dev server. Unlimited changes, unpolished. Staging: pre-production, mirrors prod, QA testing, integration tests. Production: live user traffic, high availability, monitoring, strict access. Optional: QA, UAT, canary, preview environments.'),
   d('Environment Parity', "Keep environments as similar as possible. Same OS, same dependencies, same config files. Use Docker containers for consistency. Infrastructure as Code for reproducible environments. Version-controlled config. Don't hardcode environment-specific values."),
   d('Configuration Management', 'Environment variables for config differences (DB URL, API keys). Config files per environment. Secret management: never in code. Feature flags for per-environment behaviors. Environment-specific CI/CD jobs/stages.')],
  [q('What are the three main environments?', 'Development (coding), Staging (testing), Production (live).'),
   q('What is environment parity?', 'Keeping environments as similar as possible to catch production issues in earlier stages.'),
   q('How should configuration differ between environments?', 'Via environment variables (not hardcoded values). Secrets stored in secret managers.')],
  R(10,35,100,25,'#0070f3','','Development','Coding & unit tests') +
  A(110,48,130,48) +
  R(140,35,100,25,'#28a745','','Staging','QA & integration') +
  A(240,48,260,48) +
  R(270,35,100,25,'#ffc107','','Production','Live users') +
  T(240,110,'Environment Management: Dev → Staging → Production. Parity is crucial. Configure via env vars, not hardcoding.',9,'#666','middle'),
  [e('Env Config', 'Using environment variables.', codeBlock(['export DATABASE_URL="postgres://..."', 'export API_KEY=${{ secrets.API_KEY }}']))],
  [m('What is the most important principle in environment management?', ['Use latest software', 'Environment parity (keep environments similar)', 'Manual configuration', 'Separate codebases'], 1, 'Environment parity — keeping dev, staging, and prod as similar as possible — prevents environment-specific bugs.')]
);

/* Secrets Management */
compactTopic('cicd-secrets', 'Secrets Management in CI/CD', 'intermediate', 20,
  ['Secrets management involves securely storing and using sensitive data (API keys, passwords, tokens) in CI/CD pipelines.', 'Secrets should never be hardcoded in code, committed to repos, or exposed in pipeline logs.', 'Solutions: built-in CI/CD secrets, HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, Doppler.'],
  'Secrets management is like a secure vault for your passwords. Instead of writing the vault combination on a sticky note (hardcoding in code), you store it in a secure vault and only authorized processes can retrieve it at runtime. The pipeline can use it without knowing what it is.',
  [d('Built-in Secrets', 'GitHub Actions: Settings → Secrets → Actions. Referenced as ${{ secrets.MY_SECRET }}. Encrypted at rest, masked in logs. Organization secrets for shared use. Environment secrets for environment-specific.'),
   d('External Secret Managers', 'HashiCorp Vault: dynamic secrets, leasing, revocation. AWS Secrets Manager: automatic rotation, IAM integration. Azure Key Vault: Azure AD authentication. Doppler: multi-cloud secret management. External secrets operator for Kubernetes.'),
   d('Best Practices', 'Never commit secrets to Git. Use .env in .gitignore for local dev. In CI: use built-in secrets or integrate Vault. Rotate secrets regularly. Least privilege: grant minimum access. Audit secret access. Mask secrets in logs. Scan for committed secrets (git secrets, truffleHog).'),
   d('Secret Scanning', 'Pre-commit hooks: detect secrets before commit (git-secrets, detect-secrets). CI scanning: truffleHog, Gitleaks in pipeline. GitHub secret scanning: automatic detection. Remediation: rotate leaked secrets immediately.')],
  [q('How are secrets stored in GitHub Actions?', 'In Settings → Secrets → Actions. Referenced as ${{ secrets.NAME }}.'),
   q('What is HashiCorp Vault?', 'A secret management tool for storing, accessing, and rotating secrets with dynamic secrets and leasing.'),
   q('What should you do if a secret is leaked?', 'Immediately rotate/revoke the secret and scan for unauthorized access.')],
  R(10,35,140,25,'#0070f3','','Code','NO hardcoded secrets') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Secret Manager','Encrypted storage') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Pipeline','${{ secrets.KEY }}') +
  T(240,110,'Secrets: Never in code. Use CI/CD built-in secrets or external managers (Vault, AWS Secrets Manager).',9,'#666','middle'),
  [e('GitHub Actions Secrets', 'Use secrets in workflows.', codeBlock(['steps:', '  - run: echo ${{ secrets.DEPLOY_KEY }} | docker login --username --password-stdin']))],
  [m('How are GitHub Actions secrets masked?', ['They are visible in logs', 'They are automatically masked in log output', 'They cannot be used', 'They expire after 1 hour'], 1, 'GitHub Actions automatically masks secrets in log output, replacing them with ***.')]
);

/* Pipeline Triggers */
compactTopic('cicd-triggers', 'Pipeline Triggers', 'beginner', 10,
  ['Pipeline triggers define when a CI/CD pipeline should run — events that kick off the automated workflow.', 'Common triggers: push to branch, pull request, schedule (cron), manual dispatch, tag creation, upstream pipeline completion.', 'Triggers can be filtered by branch, path, file changes, and activity type.'],
  'Pipeline triggers are like alarm clocks for your automation. You can set them to go off: every time someone pushes code, when a PR is opened, at 3 AM daily, or when someone manually presses a button. You can also say "only trigger if changes are in the src folder on the main branch."',
  [d('Code Triggers', 'Push: trigger on every commit to specified branches. Pull request: trigger on PR open, sync, or reopen. Tag: trigger when tags matching a pattern are pushed. Filtering: branches, paths (include/exclude), file types, activity types.'),
   d('Time Triggers', 'Schedule: cron syntax (e.g., nightly builds: "0 2 * * *"). Periodic: run every X hours/days. Manual (workflow_dispatch): button in GitHub UI. Can include input parameters for flexibility.'),
   d('Event Triggers', 'Upstream pipeline completion (workflow_run): chain pipelines. Issue events: dependency updates, label changes. Release events: trigger on new release. Webhooks: external system triggers via API. Repository dispatch: custom events from GitHub API.'),
   d('Filtering Best Practices', 'Run tests on all branches but deploy only from main. Run full suite on main PRs, quick checks on other branches. Path filters: skip docs-only changes if they don\'t affect code.')],
  [q('What are common pipeline triggers?', 'Push, Pull Request, Schedule (cron), Manual Dispatch, Tag creation.'),
   q('How to skip pipeline for docs-only changes?', 'Use path filters: paths: [src/**, tests/**] — only trigger when these paths change.'),
   q('What does workflow_dispatch enable?', 'Manual pipeline triggering from GitHub UI with optional input parameters.')],
  R(10,35,100,25,'#0070f3','','Push','Code commit') +
  R(10,65,100,25,'#28a745','','Pull Request','Open/update') +
  R(10,95,100,25,'#ffc107','','Schedule','Cron timer') +
  R(10,125,100,25,'#dc3545','','Manual','workflow_dispatch') +
  T(240,170,'Pipeline Triggers: Push, PR, schedule, manual, tags, upstream. Filter by branch, path, activity type.',9,'#666','middle'),
  [e('Trigger Filters', 'Branch and path filters.', codeBlock(['on:', '  push:', '    branches: [main]', '    paths: [src/**, tests/**]']))],
  [m('What cron trigger runs a pipeline daily at 2 AM?', ['*/2 * * *', '0 2 * * *', '2 0 * * *', '0 0 2 * *'], 1, '"0 2 * * *" means minute 0, hour 2 (2 AM), every day, every month, every day of week.')]
);

/* Parallel Execution */
compactTopic('cicd-parallel', 'Parallel Execution', 'intermediate', 15,
  ['Parallel execution runs independent pipeline jobs simultaneously to reduce total pipeline duration.', 'Strategies: matrix (multi-version), fan-out (split tests), parallel stages (independent tasks).', 'Parallelism trades compute resources for speed — runs faster but uses more concurrent runners.'],
  'Parallel execution is like having multiple checkout lines at a supermarket. Instead of one line moving slowly (sequential), multiple lines run at the same time (parallel). Each line handles different items, and everything finishes faster.',
  [d('Matrix Strategy', 'Test across OS × version combinations. Example: ubuntu × Node 16,18,20 + windows × Node 16,18,20 = 6 parallel jobs. Useful for compatibility testing. Exclude known incompatibilities. Include additional configurations.'),
   d('Parallel Stages', 'Independent stages run concurrently: lint + unit tests + security scan all at once. Dependent stages must wait: build → (lint + unit_test + security) parallel → deploy. Use dependency graphs to express relationships.'),
   d('Test Splitting', "Split large test suites across multiple jobs. By file: test_1.py runs in job A, test_2.py in job B. By timing: balance splits by historical test duration. Tools: jest --shard, pytest-xdist (distributed), playwright --shard.")],
  [q('What is a matrix build?', 'Running identical jobs across different OS/version combinations simultaneously.'),
   q('What is test splitting?', 'Dividing a large test suite across multiple parallel jobs for faster execution.'),
   q('What is a dependency graph in pipelines?', 'A DAG that defines which jobs depend on which, enabling parallel execution of independent jobs.')],
  R(10,35,140,25,'#0070f3','','Job A: Lint','Runs in parallel') +
  R(10,65,140,25,'#28a745','','Job B: Unit Tests','Runs in parallel') +
  R(10,95,140,25,'#ffc107','','Job C: Security','Runs in parallel') +
  R(10,125,200,25,'#dc3545','','Dependent: Deploy','Waits for A+B+C') +
  T(240,170,'Parallel Execution: Matrix builds, test splitting, parallel stages. Faster pipelines, more resource usage.',9,'#666','middle'),
  [e('Matrix Jobs', 'GitHub Actions matrix strategy.', codeBlock(['strategy:', '  matrix:', '    os: [ubuntu-latest, windows-latest]', '    node: [16, 18, 20]', 'runs-on: ${{ matrix.os }}']))],
  [m('What is the tradeoff of parallel execution?', ['Slower feedback', 'More resources for faster execution', 'Less test coverage', 'Simpler debugging'], 1, 'Parallel execution uses more concurrent resources (runners) but reduces total pipeline execution time.')]
);

/* Pipeline Caching */
compactTopic('cicd-caching', 'Pipeline Caching', 'intermediate', 15,
  ['Pipeline caching stores frequently accessed data between pipeline runs to speed up execution.', 'What to cache: package manager dependencies (node_modules, ~/.m2, vendor/bundle), Docker layers, build outputs.', 'Cache key strategy: use lockfile hash for dependency cache, OS + version for toolchain cache.'],
  'Pipeline caching is like keeping your frequently used tools on your workbench instead of putting them away in the closet after every project. If you caches npm packages between builds, each build doesn\'t have to re-download them — just check if the package.json changed.',
  [d('Cache Types', 'Dependency cache: npm cache, pip cache, Maven local repo, Bundler, Go module cache. Docker cache: Docker layers, BuildKit cache. Build cache: compiled outputs, webpack cache, Gradle cache. Tools cache: SDKs (Go, .NET, Java), Python versions.'),
   d('Cache Key Strategy', 'Primary key: hash of lockfile (e.g., package-lock.json). Restore keys: fallback to partial match (e.g., os-node- prefix). Invalidation: change key when dependencies change. Cache hit: restores dependencies (no download). Cache miss: downloads fresh, saves for next run.'),
   d('Best Practices', 'Cache immutable dependencies only (lockfile-based). Set appropriate cache size limits. Clean cache periodically. Use CI-native caching when available. Keep cache keys precise enough to avoid stale caches. Separate caches per OS (different binaries).')],
  [q('What is pipeline caching?', 'Storing dependencies and build outputs between pipeline runs to avoid re-downloading/re-building.'),
   q('What makes a good cache key?', 'A hash of the lockfile (e.g., hashFiles(\'**/package-lock.json\')). Changes when dependencies change, invalidating cache.'),
   q('What should NOT be cached?', 'Mutable outputs, environment-specific files, large rarely-used data.')],
  R(10,35,140,25,'#0070f3','','First Run','Cache miss, download') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Cache Saved','Store dependencies') +
  A(320,48,340,48) +
  R(350,35,140,25,'#ffc107','','Next Run','Cache hit, restore') +
  T(240,110,'Pipeline Caching: Store deps between runs. Use lockfile hash as cache key. Faster pipelines, less network use.',9,'#666','middle'),
  [e('Cache in Actions', 'Cache npm dependencies.', codeBlock(['- uses: actions/cache@v4', '  with:', '    path: ~/.npm', '    key: ${{ runner.os }}-node-${{ hashFiles(\'**/package-lock.json\') }}']))],
  [m('What causes a cache miss?', ['Running pipeline twice', 'Lockfile changed (different hash)', 'Time of day', 'Number of jobs'], 1, 'Cache misses when the cache key doesn\'t match — typically when the lockfile hash changes (dependencies added/updated).')]
);

/* Blue-Green Deployment */
compactTopic('cicd-blue-green', 'Blue-Green Deployment', 'intermediate', 20,
  ['Blue-green deployment runs two identical production environments (blue and green), switching traffic between them for zero-downtime releases.', 'One environment serves live traffic while the other is updated. After validation, traffic switches to the updated environment.', 'If issues arise, traffic instantly switches back to the previous environment (instant rollback).'],
  'Blue-green deployment is like having two identical restaurants side by side. One (blue) is serving customers while you renovate the other (green). When green is ready, you move all customers to green. If diners don\'t like something, you instantly move them back to blue.',
  [d('How It Works', 'Two identical environments, each independently deployable. Currently live (Blue) serves all traffic. Deploy new version to idle (Green). Run smoke tests on Green. Switch router/load balancer from Blue to Green. Blue becomes idle, ready for next deployment.'),
   d('Benefits', 'Zero-downtime deployments: no traffic interruption. Instant rollback: switch back if issues found. No version mixing: all instances serve same version. Full environment validation before traffic hits. Simple routing logic: active/inactive toggle.'),
   d('Implementation', 'DNS: change DNS record to target new env (slow propagation). Load balancer: switch target group (AWS ALB, Nginx upstream). Kubernetes: switch Service selector labels. Service mesh: traffic routing rules (Istio, Linkerd). Database: both envs share DB or use backward-compatible schema.'),
   d('Considerations', 'Database schema changes must be backward compatible. Cost: 2x infrastructure during deployment. State: handle sessions, caches, file systems. Test the rollback: verify switching back works. Automation: CI/CD pipeline automates the switch.')],
  [q('What is blue-green deployment?', 'Two identical environments with traffic switched between them for zero-downtime deployments.'),
   q('What is the main benefit?', 'Instant rollback: switch traffic back to the previous environment if issues occur.'),
   q('What is a key consideration for databases?', 'Schema changes must be backward compatible since both environments access the same database.')],
  R(10,35,140,25,'#0070f3','','Blue (Live)','Current traffic') +
  R(10,65,140,25,'#28a745','','Green (Idle)','Deploy new version') +
  A(150,48,170,48) +
  R(180,65,140,25,'#ffc107','','Switch Traffic','Load balancer') +
  R(10,95,140,25,'#dc3545','','Green (Live)','New version active') +
  T(240,140,'Blue-Green: Two identical environments. Switch traffic between them. Instant rollback, zero-downtime.',9,'#666','middle'),
  [e('K8s Blue-Green', 'Switch service selector.', codeBlock(['kubectl patch service myapp -p \'{"spec":{"selector":{"version":"green"}}}\'', '# Instantly switches traffic to green']))],
  [m('What is the key database challenge with blue-green?', ['Cost', 'Schema backward compatibility', 'Performance', 'Backup'], 1, 'Both blue and green environments share the database, so schema changes must be backward compatible to support both versions.')]
);

/* Canary Deployment */
compactTopic('cicd-canary', 'Canary Deployment', 'intermediate', 20,
  ['Canary deployment gradually routes a small percentage of traffic to a new version before full rollout.', 'Start with 1-5% traffic to canary, monitor metrics (errors, latency, etc.), gradually increase if healthy.', 'If issues detected, canary is automatically rolled back (traffic redirected to stable version).'],
  'Canary deployment is like testing a new recipe on a few customers before serving it to the whole restaurant. If the first customers like it (no errors, good performance), you serve it to more people, then everyone. If they complain, you stop serving it immediately.',
  [d('Canary Strategy', 'Initial: deploy new version to canary (1-5% of instances/traffic). Monitor: track error rates, latency, CPU, business metrics (conversion, signups). Gradual increase: 10%, 25%, 50%, 100% if health checks pass. Rollback: instant if metrics degrade. Full rollout: all traffic on new version.'),
   d('Implementation', 'Load balancer weighted routing: Nginx, AWS ALB, GCP HTTP LB. Service mesh: Istio VirtualService with weighted destinations. Kubernetes: multiple Deployments, split Service via selector or mesh. Feature flags: enable for specific user segments. Progressive delivery: Flagger, Argo Rollouts.'),
   d('Metrics for Canary', 'Error rate (5xx, exceptions). Latency (p50, p95, p99). Resource usage (CPU, memory). Business metrics (conversion rate, signups). Log analysis (error logs, warnings). Infrastructure metrics (connections, throughput). Auto-rollback on threshold breach.'),
   d('Canary vs Blue-Green', 'Blue-Green: binary switch (100% on one). Canary: gradual transition. Blue-Green: simpler, instant rollback. Canary: safer (catch issues at low traffic), slower rollout. Choose: blue-green for confident changes, canary for risky changes.')],
  [q('What is canary deployment?', 'Gradually routing increasing traffic to a new version while monitoring metrics.'),
   q('What percentage traffic typically starts a canary?', '1-5% of traffic routed to the new version initially.'),
   q('What is progressive delivery?', 'Automated canary management with metrics-based rollout and rollback (Flagger, Argo Rollouts).')],
  R(10,35,140,25,'#0070f3','','Canary 5%','New version, few users') +
  A(150,48,170,48) +
  R(180,35,100,25,'#28a745','','Monitor','Track metrics') +
  R(10,65,140,25,'#ffc107','','50%','Expand if healthy') +
  R(10,95,140,25,'#dc3545','','100%','Full rollout') +
  T(240,140,'Canary: Gradually increase traffic to new version. Monitor metrics. Auto-rollback on issues. Safer than blue-green for risky changes.',9,'#666','middle'),
  [e('Istio Canary', 'Weighted traffic routing.', codeBlock(['apiVersion: networking.istio.io/v1beta1', 'kind: VirtualService', 'spec:', '  http:', '  - route:', '    - destination:', '        host: myapp', '        subset: stable', '      weight: 95', '    - destination:', '        host: myapp', '        subset: canary', '      weight: 5']))],
  [m('What happens if canary metrics degrade?', ['Full rollout continues', 'Automatic rollback to stable', 'Pipeline blocks', 'Nothing'], 1, 'If canary metrics degrade (error rate, latency), the deployment automatically rolls back to the stable version.')]
);

/* Rollback Strategies */
compactTopic('cicd-rollback', 'Rollback Strategies', 'intermediate', 15,
  ['Rollback is the process of reverting a deployment to a previous known-good version when issues are detected.', 'Strategies: instant (blue-green), gradual (canary rollback), git revert + redeploy, database rollback.', 'Key: rollbacks should be automated, tested, and fast (ideally sub-minute).'],
  'Rollback is like an "undo" button for deployments. If a new version causes errors, you immediately switch back to the last working version. A good rollback strategy is essential — not "if" something will go wrong, but "when."',
  [d('Rollback Methods', 'Blue-green switch: flip traffic back to previous environment (instant). Container rollback: kubectl rollout undo deployment/myapp. Git revert: revert commit + redeploy. Database: schema rollback scripts or backup restore. Feature flag: turn off problematic feature (no deploy needed).'),
   d('Automated Rollback', 'Health check failures auto-trigger rollback. Metrics degradation (error rate > 1%). Timeout: if new version unhealthy after X minutes. Pipeline: automated revert + deploy. Break glass: manual emergency button. Rollback history: keep last N versions.'),
   d('Database Rollback', 'Backward-compatible migrations: add before remove. Versioned migrations: each DB change is reversible. Flyway, Liquibase: support undo (but dangerous). Blue-green with shared DB: both versions must work. Golden rule: never roll back a database schema change automatically — write a forward fix instead.'),
   d('Pitfalls', 'Schema changes make rollback hard. Data migrations can\'t be reverted (data loss). Cached data may reference new schema. External APIs may not support rollback. Rollback should be a regular deployment of previous version (not a special process).')],
  [q('What is the fastest rollback method?', 'Blue-green switch: instant traffic flip to previous environment.'),
   q('What is the golden rule of database rollbacks?', 'Don\'t automate schema rollbacks — write forward fixes instead. Backward-compatible changes only.'),
   q('What is kubectl rollout undo?', 'Kubernetes command to revert a Deployment to the previous revision.')],
  R(10,35,140,25,'#0070f3','','Deploy V2','New version goes live') +
  R(10,65,140,25,'#dc3545','','Issue Detected','Errors, latency spike') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Rollback V1','Revert to previous') +
  T(240,110,'Rollback: Revert to previous version on failure. Blue-green = instant. DB rollbacks need special care.',9,'#666','middle'),
  [e('K8s Rollback', 'Kubernetes rollout undo.', codeBlock(['kubectl rollout undo deployment/myapp', 'kubectl rollout status deployment/myapp']))],
  [m('What is the recommended approach for database rollbacks?', ['Automated schema rollback', 'Write forward fix instead of reverting schema', 'Restore from backup', 'Ignore the issue'], 1, 'Instead of rolling back schema changes (which can cause data loss), write forward-fix migrations to correct issues.')]
);

/* Deployment Environments */
compactTopic('cicd-deploy-envs', 'Deployment Environments & Promotion', 'intermediate', 15,
  ['Deployment promotion moves artifacts through environments: dev → staging → production, with validation gates between each step.', 'Promotion gates: automated tests, manual approval, security scan, performance benchmark, compliance check.', 'Each environment should be progressively more production-like, with stricter gates.'],
  'Deployment promotion is like a career ladder for your code. It starts as an intern (dev), gets promoted to senior (staging) after passing tests, and finally becomes manager (production) after final review. At each level, it must prove itself before moving up.',
  [d('Environment Pipeline', 'Dev: auto-deploy on each commit. Quick feedback. May be unstable. Staging: deploy from main after tests pass. Manual QA, integration tests. Performance tests on staging. Production: deploy after approval. Release branches for hotfixes.'),
   d('Promotion Gates', 'Automated: build success, unit tests, integration tests, E2E tests, linting, security scan, performance benchmark. Manual: QA approval, product owner sign-off, compliance review, security review. Environment-specific: smoke tests (can the app start?), health endpoints.'),
   d('Promotion Strategies', 'Git-tagged promotion: tag commit as "staging-approved" then "prod-approved". Artifact promotion: promote Docker image tag from dev to staging to prod. Pipeline parameter: specify target environment. Progressive: dev → staging → canary → prod.'),
   d('Immutable Environments', 'Never modify a running environment — build a new one. New artifact → new environment → switch traffic. Immutable = consistent, reproducible, auditable. Prevents configuration drift.')],
  [q('What is deployment promotion?', 'Moving an artifact through environments (dev → staging → prod) with validation at each step.'),
   q('What is a promotion gate?', 'A condition that must be met before promoting to the next environment (tests pass, approval given, security scan clear).'),
   q('What is an immutable environment?', 'An environment that is never modified — always replaced with a fresh deployment for consistency.')],
  R(10,35,100,25,'#0070f3','','Dev','Auto-deploy') +
  A(110,48,120,48) +
  R(130,35,100,25,'#28a745','','Staging','Tests + QA') +
  A(230,48,240,48) +
  R(250,35,100,25,'#ffc107','','Canary','% traffic test') +
  A(350,48,360,48) +
  R(370,35,100,25,'#dc3545','','Production','Full traffic') +
  T(240,100,'Deployment Promotion: Dev → Staging → Canary → Production. Gates at each stage. Immutable environments.',9,'#666','middle'),
  [e('Promotion Pipeline', 'Stage-gated deployment.', codeBlock(['# Dev: auto (every push)', '# Staging: on main after tests', '# Prod: manual approval trigger']))],
  [m('Why use immutable environments?', ['Saves money', 'Prevents configuration drift, ensures reproducibility', 'Faster deployments', 'Easier debugging'], 1, 'Immutable environments prevent configuration drift — every deployment is a fresh build, ensuring consistency.')]
);

/* IaC in CI/CD */
compactTopic('cicd-iac', 'Infrastructure as Code in CI/CD', 'advanced', 25,
  ['Infrastructure as Code (IaC) manages infrastructure (servers, networks, databases) through machine-readable definition files, not manual processes.', 'IaC in CI/CD: validate, plan, and apply infrastructure changes automatically as part of the pipeline.', 'Tools: Terraform, Pulumi, AWS CDK, CloudFormation, Ansible, Kubernetes manifests.'],
  'IaC is like having a blueprint for your house instead of telling the builder step by step. You define the whole infrastructure in files: "I want a server, a database, this firewall rule." The CI/CD pipeline reads the blueprint and builds it automatically. Changes to the blueprint trigger infrastructure updates.',
  [d('IaC Pipeline Stages', 'Validate: syntax check, format check (terraform fmt). Plan: show what will change (terraform plan). Security scan: check for misconfigurations (tfsec, checkov, terrascan). Apply: make changes (terraform apply). Destroy: teardown preview environments.'),
   d('State Management', 'Terraform state: records real-world infrastructure. Store state remotely (S3, Terraform Cloud, Consul). State locking: prevent concurrent changes. Sensitive data: state may contain secrets (encrypt it). State versioning: track changes over time.'),
   d('Preview Environments', "Temporary environments per PR/branch. Terraform workspace per feature branch. Destroy on PR merge/close. Great for review apps. Database: seed with test data. Cost: spin down when not in use."),
   d('GitOps', 'Git as single source of truth for infrastructure. Pull-based deployment (Argo CD, Flux). Sync: desired state in Git = actual state in cluster. Drift detection: auto-remediate configuration drift.')],
  [q('What is Infrastructure as Code?', 'Managing infrastructure through version-controlled definition files instead of manual processes.'),
   q('What are the three stages of IaC pipeline?', 'Validate (syntax), Plan (preview changes), Apply (make changes).'),
   q('What is GitOps?', 'Using Git as the single source of truth for infrastructure, with automated sync to the actual environment.')],
  R(10,35,100,25,'#0070f3','','IaC Files','Terraform, K8s YAML') +
  A(110,48,120,48) +
  R(130,35,100,25,'#28a745','','Plan','Validate + preview') +
  A(230,48,240,48) +
  R(250,35,100,25,'#ffc107','','Apply','Provision infra') +
  T(240,100,'IaC in CI/CD: Validate, plan, then apply infrastructure changes automatically. GitOps for pull-based sync.',9,'#666','middle'),
  [e('Terraform Pipeline', 'Plan and apply in CI.', codeBlock(['terraform fmt -check', 'terraform init', 'terraform plan -out=tfplan', 'terraform apply tfplan']))],
  [m('What is the purpose of terraform plan?', ['Apply changes immediately', 'Show what changes will be made without applying', 'Delete infrastructure', 'Format config files'], 1, 'terraform plan previews the changes Terraform will make without actually applying them.')]
);

/* Monitoring in CI/CD */
compactTopic('cicd-monitoring', 'Monitoring & Observability', 'advanced', 20,
  ['Monitoring and observability track application health, performance, and behavior in production and throughout the CI/CD pipeline.', 'Three pillars: logs (events), metrics (numbers), traces (request flows).', 'CI/CD integration: deploy-time checks, post-deploy monitoring, alerting on anomalies.'],
  'Monitoring is like having dashboard gauges and warning lights for your application. Logs tell you what happened (like a black box), metrics give you numbers (speed, error rate), and traces follow a single request through the system (like tracking a package).',
  [d('Observability Pillars', 'Logs: structured events (JSON). Centralized in ELK, Loki, CloudWatch. Metrics: numeric time-series data (Prometheus, Datadog). Traces: distributed tracing (Jaeger, Zipkin, OpenTelemetry). Dashboards: visualize data (Grafana).'),
   d('CI/CD Monitoring Integration', 'Deploy health checks: verify app starts and responds after deploy. Smoke tests: run in production after deploy. Metric comparison: compare error rates before/after deploy. Release markers: annotate dashboards with deploy events. Canary analysis: compare metrics between versions.'),
   d('Alerting', 'Critical: page on-call (PagerDuty, OpsGenie). Warning: Slack notification. Info: dashboard annotation. Threshold-based: error rate > 1%, latency > 500ms. Anomaly-based: ML-based detection of unusual patterns. SLO-based: alert when approaching SLO burn rate.'),
   d('Observability Tools', 'Metrics: Prometheus, Datadog, New Relic. Logs: ELK (Elasticsearch, Logstash, Kibana), Loki, Splunk. Tracing: Jaeger, Zipkin, OpenTelemetry. Dashboards: Grafana, Datadog. Uptime: Pingdom, StatusCake. APM: New Relic, Datadog APM, Dynatrace.')],
  [q('What are the three pillars of observability?', 'Logs (events), Metrics (numbers), Traces (request flows).'),
   q('What is a smoke test in deployment?', 'A quick test after deployment to verify the application starts and responds correctly in production.'),
   q('What is an SLO?', 'Service Level Objective — a target for reliability (e.g., 99.9% uptime, <500ms p99 latency).')],
  R(10,35,140,25,'#0070f3','','Logs','Events (ELK, Loki)') +
  R(10,65,140,25,'#28a745','','Metrics','Numbers (Prometheus)') +
  R(10,95,140,25,'#ffc107','','Traces','Request flows (Jaeger)') +
  R(10,125,140,25,'#dc3545','','Dashboards','Visualize (Grafana)') +
  T(240,170,'Monitoring & Observability: Logs, Metrics, Traces. Post-deploy smoke tests, metric comparison, and alerting.',9,'#666','middle'),
  [e('Health Check', 'Simple deploy verification.', codeBlock(['curl -f http://myapp.com/health && echo "Deploy OK"']))],
  [m('What is the first check after deployment?', ['Load test', 'Health check verification', 'Database migration', 'Cache warmup'], 1, 'A health check verifies the application starts and responds correctly immediately after deployment.')]
);

/* CI/CD Security */
compactTopic('cicd-security', 'CI/CD Security', 'advanced', 20,
  ['CI/CD security involves protecting the pipeline from attacks, securing secrets, and ensuring code integrity throughout the software supply chain.', 'Key areas: pipeline access control, dependency security, artifact integrity, secret management, compliance.', 'Supply chain attacks target CI/CD pipelines to inject malicious code.'],
  'CI/CD security is like securing the factory where your software is made. If someone breaks into the factory, they could tamper with the product. Security measures: locked doors (access control), ID checks (authentication), surveillance (audit logs), and tamper-evident packaging (artifact signing).',
  [d('Pipeline Security', 'Least privilege: pipelines should only access necessary resources. OIDC: use OpenID Connect instead of long-lived credentials. Environment protection: require approval for prod deployments. Audit logs: track all pipeline actions. Branch protection: prevent unauthorized changes.'),
   d('Dependency Security', 'Software Bill of Materials (SBOM): list all dependencies and versions. Dependency scanning: detect known vulnerabilities (npm audit, Snyk, Dependabot). Renovate/Dependabot: automated dependency updates. Lock files: pin exact dependency versions.'),
   d('Artifact Integrity', 'Sign artifacts: GPG signing, cosign (Sigstore). Verify signatures in pipeline. Checksums: verify artifact integrity. Provenance: attestation of build process (SLSA framework). Immutable tags: never overwrite published artifacts.'),
   d('Supply Chain Security', 'SLSA framework: security levels for supply chain (L1-L4). SBOM: CycloneDX, SPDX formats. Sigstore: free software signing service. cosign: container signing. in-toto: framework for supply chain integrity. GitHub Artifact Attestations: built-in provenance.')],
  [q('What is a software supply chain attack?', 'An attack that compromises the pipeline or dependencies to inject malicious code into software.'),
   q('What is SLSA?', 'Supply-chain Levels for Software Artifacts — a security framework with levels L1-L4 for supply chain integrity.'),
   q('What is Sigstore?', 'A free, open-source service for signing and verifying software artifacts (cosign).')],
  R(10,35,140,25,'#0070f3','','Access Control','Least privilege') +
  R(10,65,140,25,'#28a745','','Dependency Scan','Snyk, Dependabot') +
  R(10,95,140,25,'#ffc107','','Signing','Cosign, GPG') +
  R(10,125,140,25,'#dc3545','','SBOM','Dependency bill') +
  T(240,170,'CI/CD Security: Access control, dependency scanning, artifact signing, supply chain integrity (SLSA).',9,'#666','middle'),
  [e('Cosign Sign', 'Sign container image.', codeBlock(['cosign sign --key cosign.key ghcr.io/user/app:${SHA}', 'cosign verify --key cosign.pub ghcr.io/user/app:${SHA}']))],
  [m('What is SLSA Level 2?', ['No security', 'Tamper resistance + provenance', 'Full isolation', 'Manual review'], 1, 'SLSA Level 2 provides tamper resistance and provenance attestation for build artifacts.')]
);

/* Pipeline Notifications */
compactTopic('cicd-notifications', 'Pipeline Notifications', 'beginner', 10,
  ['Pipeline notifications alert teams about pipeline results: success, failure, or status changes.', 'Channels: Slack, email, Discord, Microsoft Teams, SMS/PagerDuty (critical failures).', 'Notifications should be actionable — not noise. Failed builds page on-call; success messages go to team channel.'],
  'Pipeline notifications are like automated status updates sent to your team. "Tests passed!" goes to the team chat. "Deploy failed!" pages the on-call engineer. The key is notifying the right people through the right channels with the right urgency.',
  [d('Notification Types', 'Success: post to team channel, deploy summary. Failure: @mention author, page on-call if production. Pending: optional, running status. Cancelled: log for audit. Warning: test flakiness, threshold warnings. Custom: deployment approval requests.'),
   d('Tools and Integration', 'Slack: incoming webhooks, Slack API (chat.postMessage). GitHub commit status: green/red/yellow checks. Email: SMTP or email API (SendGrid). PagerDuty, OpsGenie: critical alerts with escalation. Webhook: custom endpoints.'),
   d('Best Practices', 'Notify on: prod deployment failure, build failure on main. Don\'t notify on: every dev branch commit success. Use @mentions to direct attention. Include: commit message, author, link to pipeline, error summary. Rate limit: avoid notification storms.')],
  [q('What is the most critical notification?', 'Production deployment failure — should page on-call engineer.'),
   q('What should notifications include?', 'Human-readable summary: what failed, who, which commit, link to logs.'),
   q('How to avoid notification fatigue?', 'Notify only on actionable events. Don\'t spam on every branch success. Use appropriate channels for severity.')],
  R(10,35,140,25,'#0070f3','','Pipeline Run','Build completes') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','Success?','Slack team channel') +
  R(180,65,140,25,'#dc3545','','Failure?','Page on-call') +
  T(240,130,'Pipeline Notifications: Success → team chat. Failure → page on-call. Actionable, not noisy.',9,'#666','middle'),
  [e('Slack Notification', 'Post build status to Slack.', codeBlock(['- name: Notify Slack', '  uses: slackapi/slack-github-action@v1', '  with:', '    payload: \'{"text":"Build ${{ job.status }}"}\'', '  env:', '    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}']))],
  [m('What notification should page the on-call engineer?', ['Testing complete', 'Build success', 'Production deployment failure', 'Dependency update available'], 2, 'Production deployment failures are critical incidents that should page the on-call engineer immediately.')]
);

/* Jenkins */
compactTopic('cicd-jenkins', 'Jenkins', 'intermediate', 25,
  ['Jenkins is an open-source automation server for CI/CD with a vast plugin ecosystem (1800+ plugins).', 'Pipeline defined as code (Jenkinsfile) using Declarative or Scripted pipeline syntax.', 'Key concepts: Master/Agent architecture, Jobs, Stages, Steps, Plugins, Shared Libraries.'],
  'Jenkins is the veteran of CI/CD tools — it\'s been around the longest and has a plugin for almost everything. It\'s like a customizable Swiss Army knife: more complex to set up than modern cloud alternatives, but extremely flexible and battle-tested.',
  [d('Architecture', 'Master (Controller): manages jobs, schedules builds, serves UI. Agents (Nodes): execute build jobs. Can run on different machines/containers. Agents can be: permanent (always on) or ephemeral (per-build containers). Distributed builds across multiple agents.'),
   d('Jenkinsfile Pipeline', 'Declarative: structured syntax (pipeline { agent any; stages { stage { steps } } }). Scripted: full Groovy flexibility. Both checked into repo (Pipeline as Code). Stages: organize build phases. Steps: individual commands. Post: actions after pipeline (always, success, failure).'),
   d('Plugins', 'Source control: Git, GitHub, Bitbucket. Build: Maven, Gradle, npm, Docker. Test: JUnit, xUnit, TestNG. Notifications: Slack, Email, PagerDuty. Artifacts: Nexus, Artifactory. Infrastructure: Docker, Kubernetes, Terraform. Credentials: encrypted storage.'),
   d('Shared Libraries', 'Reusable pipeline code across repos. Loaded from Git repo. Global vars, steps, utilities. Version controlled. Reduces duplication. Example: pipelineLibrary { myLib } from github.com/org/jenkins-lib.git.')],
  [q('What is Jenkins?', 'An open-source CI/CD automation server with extensive plugin ecosystem.'),
   q('What is a Jenkinsfile?', 'A Groovy-based pipeline definition file stored in the repository (Pipeline as Code).'),
   q('What is the Jenkins master-agent architecture?', 'Master manages jobs; agents execute builds. Agents can be permanent or ephemeral (containers).')],
  R(10,35,140,25,'#0070f3','','Jenkins Master','Job management') +
  A(150,48,170,48) +
  R(180,35,100,25,'#28a745','','Agent 1','Ubuntu build') +
  R(180,65,100,25,'#ffc107','','Agent 2','Windows build') +
  T(240,120,'Jenkins: Open-source CI/CD automation. Master/Agent architecture, 1800+ plugins, Pipeline as Code with Groovy.',9,'#666','middle'),
  [e('Declarative Jenkinsfile', 'Basic pipeline example.', codeBlock(['pipeline {', '    agent any', '    stages {', '        stage(\'Build\') { steps { sh \'npm ci && npm run build\' } }', '        stage(\'Test\') { steps { sh \'npm test\' } }', '        stage(\'Deploy\') { steps { sh \'docker push app:latest\' } }', '    }', '    post { failure { mail to: \'team@co\', subject: "Build failed" } }', '}']))],
  [m('What is a Jenkins Shared Library?', ['A plugin store', 'Reusable pipeline code across repos', 'A Docker registry', 'A monitoring tool'], 1, 'Shared Libraries allow reusable pipeline code (steps, functions) to be shared across multiple repositories.')]
);

/* GitLab CI/CD */
compactTopic('cicd-gitlab', 'GitLab CI/CD', 'intermediate', 20,
  ['GitLab CI/CD is a built-in CI/CD system in GitLab, configured via .gitlab-ci.yml in the repository root.', 'Runners execute jobs: GitLab-hosted (SaaS) or self-managed. Jobs run in isolated environments (containers, VMs).', 'Key concepts: stages, jobs, artifacts, environments, variables, cache, multi-project pipelines.'],
  'GitLab CI/CD is like having your DevOps platform all in one place. Git, CI/CD, registry, and monitoring are integrated — no need to piece together different tools. The pipeline is defined in a .gitlab-ci.yml file in your repo, making it version-controlled like code.',
  [d('GitLab CI YAML', 'Stages: define order (build, test, deploy). Jobs: belong to stages, run in parallel within same stage. Script: shell commands to execute. Only/except: rules for when to run. Variables: CI/CD variables (key-value). Cache: shared between jobs. Artifacts: job outputs for later stages.'),
   d('Runners', 'GitLab-hosted: managed by GitLab (limited minutes on free tier). Self-managed: install gitlab-runner on your own infrastructure. Specific: assigned to specific projects. Shared: available to all projects in group. Group: assigned to groups. Tags: select runner by tag.'),
   d('Advanced Features', 'Multi-project pipelines: trigger downstream projects. Parent-child pipelines: dynamic pipeline generation. Review apps: per-branch preview environments. Auto DevOps: automatic CI/CD for common stacks. Dependencies: pass artifacts between jobs. Needs: DAG for parallel execution.'),
   d('GitLab vs Jenkins', 'GitLab: integrated (single vendor), simpler, SaaS option, containers-native. Jenkins: more flexible, more plugins, mature, complex. Choose GitLab for simplicity + integration, Jenkins for complex enterprise needs.')],
  [q('What file configures GitLab CI/CD?', '.gitlab-ci.yml in the repository root.'),
   q('What is a GitLab Runner?', 'An agent that executes CI/CD jobs. Can be GitLab-hosted (SaaS) or self-managed.'),
   q('What are GitLab Review Apps?', 'Per-branch preview environments that spin up automatically for each MR.')],
  R(10,35,140,25,'#0070f3','','.gitlab-ci.yml','Pipeline config') +
  A(150,48,170,48) +
  R(180,35,140,25,'#28a745','','GitLab Runners','Execute jobs') +
  R(180,65,140,25,'#ffc107','','Artifacts','Share between stages') +
  T(240,110,'GitLab CI/CD: Built-in CI/CD with .gitlab-ci.yml. Runners, artifacts, environments, multi-project pipelines.',9,'#666','middle'),
  [e('.gitlab-ci.yml', 'Basic pipeline example.', codeBlock(['stages: [build, test, deploy]', 'build:', '  stage: build', '  script: npm ci && npm run build', '  artifacts: paths: [dist/]']))],
  [m('Where does GitLab CI/CD configuration live?', ['Jenkinsfile', '.gitlab-ci.yml', 'Dockerfile', 'config.yml'], 1, 'GitLab CI/CD is configured via .gitlab-ci.yml stored in the repository root.')]
);

/* CircleCI */
compactTopic('cicd-circleci', 'CircleCI', 'intermediate', 15,
  ['CircleCI is a cloud-native CI/CD platform emphasizing speed, parallelism, and Docker-native execution.', 'Configuration via .circleci/config.yml. Jobs run in containers (Docker) or VMs.', 'Key features: orbs (reusable configs), parallelism, caching, workflows, SSH debug.'],
  'CircleCI is like a modern, cloud-first CI/CD service optimized for speed. It spins up fresh Docker containers for every build (no "works on my machine"), runs tests in parallel automatically, and uses orbs for reusable configuration. It\'s known for fast setup and execution.',
  [d('Configuration', '.circleci/config.yml: pipeline definition. Jobs: units of work. Steps: run commands. Workflows: orchestrate job order. Docker: specify image for job environment. Resource class: CPU/memory size (small, medium, large). Parallelism: auto-split tests across containers.'),
   d('Orbs', 'Reusable configuration packages (circleci.com/orbs). Official orbs: node, python, aws-cli, slack, browser-tools. Third-party orbs. Parameters for customization. Package your own orb for team use.'),
   d('Key Features', 'SSH debug: SSH into failing job for debugging (rerun with SSH). Cache: dependency caching (save_cache, restore_cache). Workspaces: pass files between jobs in workflow. Pipelines: trigger on push, PR, schedule, API. Contexts: shared environment variables across projects.'),
   d('CircleCI vs GitHub Actions', 'CircleCI: dedicated CI company, parallelism-focused, orbs ecosystem, SSD-native executors. GitHub Actions: integrated with GitHub, larger ecosystem (Marketplace), wider trigger events, no separate billing. Choose based on where your code lives and integration needs.')],
  [q('What is CircleCI?', 'A cloud-native CI/CD platform with Docker-native execution, parallelism, and orbs.'),
   q('What are CircleCI Orbs?', 'Reusable configuration packages that encapsulate jobs, commands, and executors.'),
   q('How does CircleCI handle parallelism?', 'Automatically splits test files across multiple containers using the parallelism setting.')],
  R(10,35,140,25,'#0070f3','','.circleci/config.yml','Pipeline config') +
  A(150,48,170,48) +
  R(180,35,100,25,'#28a745','','Docker Container','Build environment') +
  A(280,48,290,48) +
  R(300,35,100,25,'#ffc107','','Workflows','Job orchestration') +
  T(240,110,'CircleCI: Cloud-native CI/CD. Docker execution, parallelism, orbs, workflows. Fast and developer-friendly.',9,'#666','middle'),
  [e('CircleCI Config', 'Basic config.yml.', codeBlock(['version: 2.1', 'orbs:', '  node: circleci/node@5', 'jobs:', '  build:', '    docker:', '      - image: cimg/node:20.3', '    steps:', '      - checkout', '      - node/install-packages', '      - run: npm test']))],
  [m('What feature allows debugging CircleCI job failures?', ['Cache', 'SSH debug rerun', 'Orbs', 'Workspaces'], 1, 'CircleCI allows rerunning failed jobs with SSH access for interactive debugging.')]
);

/* CI/CD Best Practices */
compactTopic('cicd-best-practices', 'CI/CD Best Practices', 'intermediate', 20,
  ['CI/CD best practices ensure pipelines are fast, reliable, secure, and maintainable.', 'Key principles: fail fast, pipeline as code, idempotent stages, test in prod-like environments, immutable artifacts.', 'Continuously improve the pipeline — treat it like product code.'],
  'CI/CD best practices are like the rules of the road for your pipeline. They keep everything running smoothly: fail fast when something breaks, test in environments that mirror production, make builds reproducible, and treat your pipeline configuration with the same care as your application code.',
  [d('Pipeline Design', 'Fail fast: run quickest, most important checks first. Pipeline as code: version-controlled, reviewable, auditable. Idempotent: same commit always produces same result. Small, focused stages: one responsibility per stage. Parallelism: run independent tasks concurrently.'),
   d('Security', 'Never hardcode credentials — use secrets management. Least privilege: pipelines access only what they need. Scan dependencies for vulnerabilities. Sign artifacts. Audit pipeline changes. Branch protection on main.'),
   d('Reliability', 'Pin dependency versions (lock files). Use clean install commands (npm ci, pip install --require-hashes). Deterministic builds: same input = same output. Ephemeral agents: fresh environment per build. Cache strategically, but test without cache periodically.'),
   d('Speed', 'Optimize dependency caching. Run tests in parallel. Split large test suites. Use fast, focused test suites. Build only what changed (monorepo tools). Use appropriate runner sizes. Cancel redundant builds (e.g., only latest commit).'),
   d('Maintainability', 'Use shared pipeline libraries (reusable steps). Document pipeline structure. Add pipeline tests (test the tests). Review pipeline changes like code. Monitor pipeline performance (duration, flakiness). Regular cleanup of old artifacts.')],
  [q('What does "fail fast" mean in CI/CD?', 'Run the quickest, most important checks first to provide immediate feedback on failures.'),
   q('Why should pipelines be idempotent?', 'Same commit should always produce the same result, regardless of when or how many times it runs.'),
   q('What is the benefit of ephemeral build agents?', 'Fresh environment per build eliminates configuration drift and ensures consistency.')],
  R(10,35,110,25,'#0070f3','','Fail Fast','Quickest checks first') +
  R(10,65,110,25,'#28a745','','Idempotent','Same input = same output') +
  R(10,95,110,25,'#ffc107','','Secure','Secrets, least privilege') +
  R(10,125,110,25,'#dc3545','','Fast','Parallel, caching') +
  T(240,170,'CI/CD Best Practices: Fail fast, idempotent builds, security, speed, maintainability. Pipeline as code.',9,'#666','middle'),
  [e('Pipeline Checklist', 'Key CI/CD practices.', codeBlock(['# Fast feedback: lint first', '# Idempotent: lock files + clean install', '# Secure: secrets management', '# Maintainable: shared libraries']))],
  [m('What makes a pipeline idempotent?', ['Running once', 'Same commit always produces same result', 'Fast execution', 'Parallel stages'], 1, 'Idempotence means the same commit always produces the same build output, regardless of when or how many times it runs.')]
);

// ---- PAD TOPICS ----
var padTopics = require('../pad-topics');
padTopics(topics);

// ---- GENERATE ----
var dataDir = __dirname;
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["cicd"] = TOPICS_DATA["cicd"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["cicd"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));
fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));
console.log('Generated CI/CD topics: ' + Object.keys(topics).length);
