/* =================== STATE =================== */
const state = {
  categories: [],
  currentCategory: null,
  currentTopic: null,
  topicData: null,
  completed: JSON.parse(localStorage.getItem('tp_completed') || '{}')
};

/* =================== HELPERS =================== */
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function saveCompleted() {
  localStorage.setItem('tp_completed', JSON.stringify(state.completed));
}

function isCompleted(catId, topicId) {
  return !!(state.completed[catId] && state.completed[catId][topicId]);
}

function toggleCompleted(catId, topicId) {
  if (!state.completed[catId]) state.completed[catId] = {};
  if (state.completed[catId][topicId]) {
    delete state.completed[catId][topicId];
  } else {
    state.completed[catId][topicId] = true;
  }
  saveCompleted();
  renderSidebar();
  updateProgressRing();
}

function getCategoryProgress(catId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat || !cat._topics) return { done: 0, total: 0 };
  const total = cat._topics.length;
  const done = cat._topics.filter(t => isCompleted(catId, t.id)).length;
  return { done, total };
}

function getOverallProgress() {
  let total = 0, done = 0;
  for (const cat of state.categories) {
    if (cat._topics) {
      total += cat._topics.length;
      done += cat._topics.filter(t => isCompleted(cat.id, t.id)).length;
    }
  }
  return { done, total };
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function highlightCode(code) {
  return code
    .replace(/\b(const|let|var|function|return|if|else|for|while|class|new|this|async|await|import|export|default|from|try|catch|throw|typeof|instanceof|in|of|yield|switch|case|break|continue|do)\b/g, '<span class="hl-keyword">$1</span>')
    .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, '<span class="hl-builtin">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>')
    .replace(/\/\/.*$/gm, '<span class="hl-comment">$&</span>')
    .replace(/\/\*[\s\S]*?\*\//g, '<span class="hl-comment">$&</span>')
    .replace(/'[^']*'/g, '<span class="hl-string">$&</span>')
    .replace(/"[^"]*"/g, '<span class="hl-string">$&</span>')
    .replace(/`[^`]*`/g, '<span class="hl-string">$&</span>');
}

/* =================== EMBEDDED DATA (works with file://) =================== */
var EMBEDDED = {
  categories: [
    { id: "javascript",  name: "JavaScript",       icon: "\u26A1", color: "#f7df1e", description: "Core JavaScript concepts, ES6+, and advanced patterns" },
    { id: "react",       name: "React.js",          icon: "\u269B\uFE0F", color: "#61dafb", description: "React fundamentals, hooks, state management, and ecosystem" },
    { id: "nodejs",      name: "Node.js & Express",  icon: "\uD83D\uDFE2", color: "#339933", description: "Server-side JS, Express APIs, middleware, and backend patterns" },
    { id: "mern",        name: "MERN Stack",         icon: "\uD83E\uDDE9", color: "#4caf50", description: "Full-stack development with MongoDB, Express, React, Node.js" },
    { id: "nextjs",      name: "Next.js",            icon: "\u25B2", color: "#000000", description: "SSR, SSG, App Router, server components, and Next.js patterns" },
    { id: "mongodb",     name: "MongoDB",            icon: "\uD83C\uDF43", color: "#47A248", description: "NoSQL databases, aggregation, indexing, and data modeling" },
    { id: "sql",         name: "SQL",                icon: "\uD83D\uDCC4\uFE0F", color: "#336791", description: "Relational databases, queries, normalization, and optimization" },
    { id: "auth",        name: "Authentication & Security", icon: "\uD83D\uDD12", color: "#ff4444", description: "JWT, OAuth, sessions, encryption, and web security" },
    { id: "system-design", name: "System Design",    icon: "\uD83C\uDFD7\uFE0F", color: "#6c5ce7", description: "Architecture patterns, scalability, microservices, and design" },
    { id: "devops",      name: "DevOps & Cloud",     icon: "\u2601\uFE0F", color: "#0078D4", description: "Docker, AWS, CI/CD pipelines, deployment, and monitoring" },
    { id: "git",         name: "Git & CI/CD",        icon: "\uD83D\uDD00", color: "#f05032", description: "Version control, branching strategies, and automation" },
    { id: "dsa",         name: "DSA",                icon: "\uD83D\uDCCA", color: "#ff6b35", description: "Data structures, algorithms, problem-solving patterns" },
    { id: "oop",         name: "OOP & CS Fundamentals", icon: "\uD83D\uDCBB", color: "#9b59b6", description: "OOP principles, design patterns, and CS core concepts" }
  ],
  topics: {
    javascript: [
      { id: "execution-context",  title: "Execution Context",         difficulty: "beginner",    estimatedMinutes: 20, file: "execution-context.json" },
      { id: "call-stack",         title: "Call Stack",                difficulty: "beginner",    estimatedMinutes: 15, file: "call-stack.json" },
      { id: "memory-heap",        title: "Memory Heap",               difficulty: "beginner",    estimatedMinutes: 15, file: "memory-heap.json" },
      { id: "event-loop",         title: "Event Loop",                difficulty: "advanced",    estimatedMinutes: 35, file: "event-loop.json" },
      { id: "micro-task-queue",   title: "Micro Task Queue",          difficulty: "intermediate",estimatedMinutes: 20, file: "micro-task-queue.json" },
      { id: "macro-task-queue",   title: "Macro Task Queue",          difficulty: "intermediate",estimatedMinutes: 20, file: "macro-task-queue.json" },
      { id: "hoisting",           title: "Hoisting & Scope",          difficulty: "beginner",    estimatedMinutes: 20, file: "hoisting.json" },
      { id: "temporal-dead-zone", title: "Temporal Dead Zone",        difficulty: "intermediate",estimatedMinutes: 15, file: "temporal-dead-zone.json" },
      { id: "scope",              title: "Scope",                     difficulty: "beginner",    estimatedMinutes: 15, file: "scope.json" },
      { id: "lexical-scope",      title: "Lexical Scope",             difficulty: "intermediate",estimatedMinutes: 15, file: "lexical-scope.json" },
      { id: "closures",           title: "Closures",                  difficulty: "intermediate",estimatedMinutes: 25, file: "closures.json" },
      { id: "prototype",          title: "Prototype",                 difficulty: "advanced",    estimatedMinutes: 25, file: "prototype.json" },
      { id: "prototype-chain",    title: "Prototype Chain",           difficulty: "advanced",    estimatedMinutes: 25, file: "prototype-chain.json" },
      { id: "this-keyword",       title: "'this' Keyword",            difficulty: "intermediate",estimatedMinutes: 25, file: "this-keyword.json" },
      { id: "bind",               title: "bind()",                    difficulty: "intermediate",estimatedMinutes: 20, file: "bind.json" },
      { id: "call",               title: "call()",                    difficulty: "intermediate",estimatedMinutes: 15, file: "call.json" },
      { id: "apply",              title: "apply()",                   difficulty: "intermediate",estimatedMinutes: 15, file: "apply.json" },
      { id: "currying",           title: "Currying",                  difficulty: "advanced",    estimatedMinutes: 25, file: "currying.json" },
      { id: "debouncing",         title: "Debouncing & Throttling",   difficulty: "intermediate",estimatedMinutes: 20, file: "debouncing.json" }
    ]
  }
};

// Pre-populate completed topics
(function preloadCompleted() {
  var preset = {
    "javascript": {
      "execution-context": true, "call-stack": true, "memory-heap": true,
      "event-loop": true, "micro-task-queue": true, "macro-task-queue": true,
      "hoisting": true, "scope": true, "lexical-scope": true,
      "closures": true, "prototype": true, "prototype-chain": true,
      "this-keyword": true
    }
  };
  var existing = JSON.parse(localStorage.getItem('tp_completed') || '{}');
  var changed = false;
  for (var cat in preset) {
    if (!existing[cat]) { existing[cat] = {}; changed = true; }
    for (var topic in preset[cat]) {
      if (!existing[cat][topic]) { existing[cat][topic] = true; changed = true; }
    }
  }
  if (changed) localStorage.setItem('tp_completed', JSON.stringify(existing));
  state.completed = existing;
})();

/* =================== DATA LOADING =================== */
function loadJSON(path) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.overrideMimeType('application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 0 || xhr.status === 200 || xhr.status === 304) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error('Failed to load ' + path + ' (status: ' + xhr.status + ')'));
        }
      }
    };
    xhr.onerror = function() { reject(new Error('Network error loading ' + path)); };
    try { xhr.send(null); } catch(e) { reject(e); }
  });
}

function init() {
  // Use embedded data for categories and topic lists (always works)
  state.categories = EMBEDDED.categories.map(function(c) {
    return { id: c.id, name: c.name, icon: c.icon, color: c.color, description: c.description, _topics: null };
  });

  renderSidebar();
  updateProgressRing();
  updateStats();

  // Load topic lists from embedded data
  for (var i = 0; i < state.categories.length; i++) {
    var cat = state.categories[i];
    cat._topics = (EMBEDDED.topics[cat.id] || []).map(function(t) { return { id: t.id, title: t.title, difficulty: t.difficulty, estimatedMinutes: t.estimatedMinutes, file: t.file }; });
  }
  renderSidebar();
  updateStats();
  updateProgressRing();

  // Open first category and auto-select first topic
  if (state.categories.length > 0) {
    var firstCat = state.categories[0];
    var catEl = document.querySelector('[data-cat-id="' + firstCat.id + '"]');
    if (catEl) {
      catEl.classList.add('open');
      var topicsEl = catEl.nextElementSibling;
      if (topicsEl) topicsEl.classList.add('open');
    }
    if (firstCat._topics && firstCat._topics.length > 0) {
      loadTopic(firstCat.id, firstCat._topics[0].id);
    }
  }
}

function loadCategoryTopics(catId) {
  // Already loaded from embedded data
  var cat = state.categories.find(function(c) { return c.id === catId; });
  if (!cat) return;
  var catEl = document.querySelector('[data-cat-id="' + cat.id + '"]');
  if (catEl) {
    catEl.classList.add('open');
    var topicsEl = catEl.nextElementSibling;
    if (topicsEl) topicsEl.classList.add('open');
  }
}

function loadTopic(catId, topicId) {
  var cat = state.categories.find(function(c) { return c.id === catId; });
  if (!cat || !cat._topics) return;
  var topicMeta = cat._topics.find(function(t) { return t.id === topicId; });
  if (!topicMeta) return;

  state.currentCategory = catId;
  state.currentTopic = topicId;

  loadJSON('data/' + catId + '/' + topicMeta.file).then(function(data) {
    state.topicData = data;
    renderTopic();
    updateActiveTopicInSidebar();
  }).catch(function() {
    // Fallback: show placeholder for topics without content yet
    state.topicData = createPlaceholderTopic(topicMeta);
    renderTopic();
    updateActiveTopicInSidebar();
  });
}

function createPlaceholderTopic(meta) {
  var title = meta.title;
  return {
    title: title,
    difficulty: meta.difficulty || 'intermediate',
    estimatedMinutes: meta.estimatedMinutes || 20,
    tldr: ['Content for <strong>' + title + '</strong> is being prepared.'],
    laymanDefinition: 'Detailed content for this topic is coming soon.',
    deepDive: [{ heading: 'Coming Soon', text: 'This topic is being developed. Check back for a comprehensive deep dive, interview questions, code examples, and assessment.' }],
    interviewAnswer: 'Content in progress.',
    interviewQuestions: [{ question: 'When will this content be available?', answer: 'This topic is being developed as part of the curriculum. Please check back soon.' }],
    diagramSvg: '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="380" height="180" rx="10" fill="var(--bg-card)" stroke="var(--border)" stroke-width="1"/><text x="200" y="100" text-anchor="middle" fill="#9aa0b0" font-size="14">Diagram coming soon for ' + title + '</text></svg>',
    codeExamples: [{ title: 'Coming Soon', useCase: 'In Progress', code: '// Code examples for ' + title + ' are being prepared', description: 'Check back for real-world code examples.' }],
    mcqQuestions: [{ question: 'Sample question for ' + title + '?', options: ['Option A', 'Option B', 'Option C', 'Option D'], answer: 0, explanation: 'Content being developed.' }]
  };
}

/* =================== SIDEBAR =================== */
function renderSidebar() {
  const nav = $('#category-nav');
  nav.innerHTML = state.categories.map(cat => {
    const progress = getCategoryProgress(cat.id);
    const hasTopics = cat._topics && cat._topics.length > 0;
    const topicsHtml = hasTopics
      ? cat._topics.map(t => {
          const done = isCompleted(cat.id, t.id);
          const active = (state.currentCategory === cat.id && state.currentTopic === t.id);
          return `
            <div class="topic-link${active ? ' active' : ''}" data-cat="${cat.id}" data-topic="${t.id}">
              <span class="check${done ? ' done' : ''}">${done ? '✓' : '○'}</span>
              <span>${escapeHtml(t.title)}</span>
            </div>
          `;
        }).join('')
      : '<div style="padding:6px 56px;font-size:0.78rem;color:var(--text-muted)">No topics yet</div>';

    return `
      <div class="cat-item">
        <div class="cat-header" data-cat-id="${cat.id}" style="border-left: 3px solid ${cat.color};">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-name">${escapeHtml(cat.name)}</span>
          <span class="cat-progress">${progress.done}/${progress.total}</span>
          <span class="cat-arrow">▶</span>
        </div>
        <div class="cat-topics${state.currentCategory === cat.id ? ' open' : ''}">
          ${topicsHtml}
        </div>
      </div>
    `;
  }).join('');

  // Attach events
  $$('.cat-header').forEach(el => {
    el.addEventListener('click', async () => {
      const catId = el.dataset.catId;
      const cat = state.categories.find(c => c.id === catId);
      if (!cat._topics) {
        await loadCategoryTopics(catId);
      }
      const isOpen = el.classList.toggle('open');
      const topicsEl = el.nextElementSibling;
      if (isOpen) {
        topicsEl.classList.add('open');
      } else {
        topicsEl.classList.remove('open');
      }
    });
  });

  $$('.topic-link').forEach(el => {
    el.addEventListener('click', () => {
      const catId = el.dataset.cat;
      const topicId = el.dataset.topic;
      loadTopic(catId, topicId);
    });
  });
}

function updateActiveTopicInSidebar() {
  $$('.topic-link').forEach(el => {
    el.classList.toggle('active',
      el.dataset.cat === state.currentCategory && el.dataset.topic === state.currentTopic
    );
  });
}

function updateProgressRing() {
  const { done, total } = getOverallProgress();
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const fill = $('#progress-ring-fill');
  if (fill) {
    fill.style.strokeDashoffset = 100 - pct;
  }
  const text = $('#progress-percent');
  if (text) text.textContent = `${pct}%`;
}

function updateStats() {
  let totalTopics = 0;
  let totalCompleted = 0;
  for (const cat of state.categories) {
    if (cat._topics) {
      totalTopics += cat._topics.length;
      totalCompleted += cat._topics.filter(t => isCompleted(cat.id, t.id)).length;
    }
  }
  const totalEl = $('#total-topics');
  const completedEl = $('#completed-count');
  const catCountEl = $('#categories-count');
  if (totalEl) totalEl.textContent = totalTopics;
  if (completedEl) completedEl.textContent = totalCompleted;
  if (catCountEl) catCountEl.textContent = state.categories.length;
}

/* =================== RENDER TOPIC =================== */
function renderTopic() {
  const d = state.topicData;
  if (!d) return;

  $('#welcome-screen').style.display = 'none';
  $('#topic-view').style.display = 'block';

  const cat = state.categories.find(c => c.id === state.currentCategory);

  // Header
  $('#topic-breadcrumb').textContent = `${cat ? cat.name : ''} / ${d.title}`;
  $('#topic-title').textContent = d.title;

  const diffEl = $('#topic-difficulty');
  diffEl.textContent = d.difficulty || 'intermediate';
  diffEl.className = `difficulty-badge ${d.difficulty || 'intermediate'}`;

  $('#topic-time').textContent = `⏱ ${d.estimatedMinutes || 20} min`;

  const checkEl = $('#mark-completed');
  checkEl.checked = isCompleted(state.currentCategory, state.currentTopic);
  checkEl.onchange = () => {
    toggleCompleted(state.currentCategory, state.currentTopic);
    const { done, total } = getCategoryProgress(state.currentCategory);
    const sidebarProgress = $(`.cat-header[data-cat-id="${state.currentCategory}"] .cat-progress`);
    if (sidebarProgress) sidebarProgress.textContent = `${done}/${total}`;
    updateStats();
    updateProgressRing();
    // re-render sidebar topic list for check marks
    renderSidebar();
    // re-check checkbox after re-render
    const newCheck = $('#mark-completed');
    if (newCheck) newCheck.checked = isCompleted(state.currentCategory, state.currentTopic);
  };

  // TLDR
  renderTLDR(d);

  // Layman
  $('#layman-content').textContent = d.laymanDefinition || '';

  // Deep Dive
  renderDeepDive(d);

  // Interview Q&A
  renderInterviews(d);

  // Diagram
  renderDiagram(d);

  // Code
  renderCode(d);

  // MCQ
  renderMCQ(d);

  // Activate first tab
  $$('.tab').forEach(t => t.classList.remove('active'));
  $$('.tab-content').forEach(t => t.classList.remove('active'));
  const firstTab = $('.tab');
  const firstContent = $('#sec-tldr');
  if (firstTab) firstTab.classList.add('active');
  if (firstContent) firstContent.classList.add('active');
}

/* =================== TLDR =================== */
function renderTLDR(d) {
  const container = $('#tldr-content');
  if (d.tldr) {
    if (Array.isArray(d.tldr)) {
      container.innerHTML = `<ul>${d.tldr.map(item => `<li>${item}</li>`).join('')}</ul>`;
    } else {
      container.innerHTML = `<p>${d.tldr}</p>`;
    }
  } else {
    container.innerHTML = '<p>No TL;DR available.</p>';
  }
}

/* =================== DEEP DIVE =================== */
function renderDeepDive(d) {
  const container = $('#deepdive-content');
  let html = '';

  if (d.deepDive && Array.isArray(d.deepDive)) {
    for (const section of d.deepDive) {
      if (section.heading) {
        html += `<h3>${section.heading}</h3>`;
      }
      if (section.text) {
        html += section.text.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
      }
      if (section.list && Array.isArray(section.list)) {
        html += '<ul>' + section.list.map(li => `<li>${li}</li>`).join('') + '</ul>';
      }
    }
  } else if (d.deepDive && typeof d.deepDive === 'string') {
    html = d.deepDive.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
  }

  // Interview answer
  if (d.interviewAnswer) {
    html += `
      <div class="interview-definition">
        <strong>📌 Interview Ready Definition:</strong><br/><br/>
        ${d.interviewAnswer}
      </div>
    `;
  }

  container.innerHTML = html || '<p>No deep dive content available.</p>';
}

/* =================== INTERVIEW Q&A =================== */
function renderInterviews(d) {
  const container = $('#interview-list');
  if (!d.interviewQuestions || !d.interviewQuestions.length) {
    container.innerHTML = '<div class="section-card"><p>No interview questions available.</p></div>';
    return;
  }

  container.innerHTML = d.interviewQuestions.map((qa, i) => `
    <div class="interview-item" data-index="${i}">
      <div class="interview-q">
        <span><span class="q-number">Q${i + 1}.</span> ${escapeHtml(qa.question)}</span>
        <span class="q-toggle">▼</span>
      </div>
      <div class="interview-a">
        <p>${qa.answer}</p>
      </div>
    </div>
  `).join('');

  // Accordion
  $$('.interview-q').forEach(el => {
    el.addEventListener('click', () => {
      el.parentElement.classList.toggle('open');
    });
  });
}

/* =================== DIAGRAM =================== */
function renderDiagram(d) {
  const container = $('#diagram-content');
  if (d.diagramSvg) {
    container.innerHTML = d.diagramSvg;
  } else if (d.diagramDescription) {
    container.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:40px 0;">${d.diagramDescription}</p>`;
  } else {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px 0;">Diagram coming soon.</p>';
  }
}

/* =================== CODE EXAMPLES =================== */
function renderCode(d) {
  const container = $('#code-examples');
  if (!d.codeExamples || !d.codeExamples.length) {
    container.innerHTML = '<div class="section-card"><p>No code examples available.</p></div>';
    return;
  }

  container.innerHTML = d.codeExamples.map((ex, i) => `
    <div class="code-example">
      <div class="code-example-header">
        <span class="code-title">${escapeHtml(ex.title || `Example ${i + 1}`)}</span>
        <span class="code-use">${escapeHtml(ex.useCase || '')}</span>
      </div>
      <pre><code>${highlightCode(ex.code)}</code></pre>
      <div class="code-desc">${ex.description || ''}</div>
    </div>
  `).join('');
}

/* =================== MCQ =================== */
function renderMCQ(d) {
  const container = $('#mcq-questions');
  if (!d.mcqQuestions || !d.mcqQuestions.length) {
    container.innerHTML = '<div class="section-card"><p>No assessment questions available.</p></div>';
    $('#mcq-submit').style.display = 'none';
    return;
  }

  container.innerHTML = d.mcqQuestions.map((q, i) => `
    <div class="mcq-question" data-q="${i}">
      <div class="mcq-q-text">
        <span class="mcq-q-num">${i + 1}.</span> ${escapeHtml(q.question)}
      </div>
      <div class="mcq-options">
        ${q.options.map((opt, oi) => `
          <label class="mcq-option" data-opt="${oi}">
            <input type="radio" name="mcq-${i}" value="${oi}" />
            <span>${escapeHtml(opt)}</span>
          </label>
        `).join('')}
      </div>
      <div class="mcq-explanation" id="mcq-explain-${i}"></div>
    </div>
  `).join('');

  $('#mcq-submit').style.display = 'block';
  $('#mcq-result').className = '';
  $('#mcq-result').style.display = 'none';

  // Submit handler
  $('#mcq-submit').onclick = () => evaluateMCQ(d.mcqQuestions);
}

function evaluateMCQ(questions) {
  let correct = 0;
  const total = questions.length;

  // Remove previous feedback
  $$('.mcq-option').forEach(el => {
    el.classList.remove('correct', 'wrong', 'reveal-correct');
  });
  $$('.mcq-explanation').forEach(el => {
    el.classList.remove('show');
  });

  questions.forEach((q, i) => {
    const selected = $(`input[name="mcq-${i}"]:checked`);
    const userAnswer = selected ? parseInt(selected.value) : -1;
    const correctAnswer = q.answer;
    const allOptions = $$(`.mcq-question[data-q="${i}"] .mcq-option`);

    // Highlight correct answer
    allOptions.forEach((opt, oi) => {
      if (oi === correctAnswer) {
        opt.classList.add('correct');
      }
    });

    if (userAnswer === correctAnswer) {
      correct++;
    } else if (userAnswer >= 0) {
      // Wrong answer - highlight it
      allOptions[userAnswer].classList.add('wrong');
    }

    // Show explanation
    if (q.explanation) {
      const expEl = $(`#mcq-explain-${i}`);
      if (expEl) {
        expEl.textContent = q.explanation;
        expEl.classList.add('show');
      }
    }
  });

  const pct = Math.round((correct / total) * 100);
  const resultEl = $('#mcq-result');
  resultEl.style.display = 'block';
  resultEl.className = 'show ' + (pct >= 70 ? 'pass' : 'fail');
  resultEl.innerHTML = `
    <strong>${correct}/${total} correct (${pct}%)</strong><br/>
    ${pct >= 70 ? '✅ Great job! You have a solid understanding of this topic.' : '📖 Review the material above and try again.'}
  `;
}

/* =================== TAB SWITCHING =================== */
$$('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach(t => t.classList.remove('active'));
    $$('.tab-content').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const section = $(`#sec-${tab.dataset.section}`);
    if (section) section.classList.add('active');
  });
});

/* =================== INIT =================== */
document.addEventListener('DOMContentLoaded', init);
