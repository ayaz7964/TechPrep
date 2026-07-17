var fs = require('fs');
var src = fs.readFileSync(__dirname + '/gen-cicd.js', 'utf8');

var fourths = {
  'cicd-fundamentals': 'CI/CD is the backbone of modern DevOps, enabling rapid, reliable software delivery through automation.',
  'cicd-build-automation': 'Build automation eliminates the error-prone manual build process, ensuring consistent, reproducible artifacts every time.',
  'cicd-test-automation': 'Automated testing in CI/CD catches bugs minutes after they are introduced, not days later in QA.',
  'cicd-code-quality': 'Code quality gates in the pipeline prevent technical debt and security issues from reaching production.',
  'cicd-artifacts': 'Artifact management ensures every build produces a versioned, immutable package deployable to any environment.',
  'cicd-docker': 'Docker containers provide consistent environments across the entire pipeline, eliminating environment-specific bugs.',
  'cicd-environments': 'Environment parity across dev, staging, and prod reduces surprises and catches issues early.',
  'cicd-secrets': 'Secrets management in CI/CD ensures sensitive credentials are never exposed in code, configs, or logs.',
  'cicd-triggers': 'Smart pipeline triggers run the right workflows at the right time, saving resources and accelerating feedback.',
  'cicd-parallel': 'Parallel execution dramatically shrinks pipeline duration, enabling faster feedback loops for developers.',
  'cicd-caching': 'Intelligent dependency caching cuts build times significantly by avoiding redundant downloads.',
  'cicd-blue-green': 'Blue-green deployment enables zero-downtime releases with instant rollback to a known-good environment.',
  'cicd-canary': 'Canary deployment minimizes risk by gradually exposing a new version to a small traffic subset.',
  'cicd-rollback': 'Automated rollback strategies ensure failed deployments are handled gracefully with minimal user disruption.',
  'cicd-deploy-envs': 'Progressive deployment promotion with validation gates ensures only thoroughly verified artifacts reach production.',
  'cicd-iac': 'Infrastructure as Code in CI/CD enables automated, reproducible, and auditable infrastructure provisioning.',
  'cicd-monitoring': 'Observability integration in CI/CD pipelines enables proactive detection of issues during and after deployment.',
  'cicd-security': 'CI/CD security protects the entire software supply chain from repository to production runtime.',
  'cicd-notifications': 'Effective pipeline notifications keep teams informed with actionable alerts without creating noise.',
  'cicd-jenkins': 'Jenkins plugin ecosystem and Pipeline DSL make it the most extensible CI/CD automation server.',
  'cicd-gitlab': 'GitLab CI/CD integrated platform provides a seamless DevOps experience from code to deployment.',
  'cicd-circleci': 'CircleCI cloud-native architecture and automatic parallelism make it one of the fastest CI/CD services.',
  'cicd-best-practices': 'Following CI/CD best practices ensures pipelines are fast, reliable, secure, and maintainable.'
};

var lines = src.split('\n');
var result = [];
var fixed = 0;
var inCt = false;
var ctId = null;
var ctStart = 0;

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var ct = line.match(/compactTopic\('([^']+)'/);
  
  if (ct) {
    inCt = true;
    ctId = ct[1];
    ctStart = i;
    result.push(line);
    continue;
  }
  
  if (inCt) {
    // Look for the TLDR line: starts with two spaces and a bracket
    var trimmed = line.trim();
    if (trimmed[0] === '[') {
      // Count strings in this TLDR array
      var quoteCount = (line.match(/'/g) || []).length;
      // Each string has 2 quotes. Also account for escape quotes
      // Simple approximation: number of ' divided by 2
      var itemCount = Math.round(quoteCount / 2);
      
      // If 3 items and we have a 4th, insert it
      if (itemCount === 3 && fourths[ctId]) {
        // Replace ], at end with new stuff
        var esc4th = fourths[ctId].replace(/'/g, "\\'");
        var modified = line.replace(/],\s*$/, ",\n    '" + esc4th + "'\n  ],");
        if (modified !== line) {
          result.push(modified);
          fixed++;
          console.log('Fixed: ' + ctId);
          inCt = false;
          continue;
        }
      }
    }
    
    // Check if this is the closing paren of the compactTopic
    var openParens = (line.match(/\(/g) || []).length;
    var closeParens = (line.match(/\)/g) || []).length;
    if (closeParens > openParens) {
      inCt = false;
    }
  }
  
  result.push(line);
}

fs.writeFileSync(__dirname + '/gen-cicd.js', result.join('\n'), 'utf8');
console.log('Fixed ' + fixed + ' topics');
