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

/* =================== FETCH DATA =================== */
async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

async function init() {
  try {
    state.categories = await loadJSON('data/categories.json');
    renderSidebar();
    updateProgressRing();
    updateStats();

    // Load first category by default
    if (state.categories.length > 0) {
      await loadCategoryTopics(state.categories[0].id);
    }
  } catch (err) {
    console.error('Init error:', err);
    $('#category-nav').innerHTML = `<div style="padding:20px;color:var(--danger)">Error loading data: ${err.message}</div>`;
  }
}

async function loadCategoryTopics(catId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat) return;
  if (cat._topics) return; // already loaded

  try {
    const topics = await loadJSON(`data/${cat.id}/topics.json`);
    cat._topics = topics;
    renderSidebar();
    updateStats();
    updateProgressRing();
    // open this category
    const catEl = $(`[data-cat-id="${cat.id}"]`);
    if (catEl) {
      catEl.classList.add('open');
      const topicsEl = catEl.nextElementSibling;
      if (topicsEl) topicsEl.classList.add('open');
    }
  } catch (err) {
    console.warn(`Could not load topics for ${catId}:`, err);
    cat._topics = [];
  }
}

async function loadTopic(catId, topicId) {
  const cat = state.categories.find(c => c.id === catId);
  if (!cat || !cat._topics) return;
  const topicMeta = cat._topics.find(t => t.id === topicId);
  if (!topicMeta) return;

  state.currentCategory = catId;
  state.currentTopic = topicId;

  try {
    state.topicData = await loadJSON(`data/${catId}/${topicMeta.file}`);
    renderTopic();
    updateActiveTopicInSidebar();
  } catch (err) {
    console.error('Failed to load topic:', err);
    $('#topic-view').style.display = 'none';
    $('#welcome-screen').style.display = 'block';
  }
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
