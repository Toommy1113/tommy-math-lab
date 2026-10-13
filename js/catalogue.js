'use strict';
(() => {
  const { questions, groups } = window.MathLab.data;
  const learning = window.MathLab.learning;
  const params = new URLSearchParams(location.search);
  const group = groups.find(item => item.id === params.get('group'));
  const list = document.getElementById('question-list');

  document.getElementById('chapter-groups').innerHTML = groups.map((item, index) => `
    <a href="${learning.routes.section('calculus-upper', item.id)}"${item === group ? ' class="current" aria-current="page"' : ''}>
      <span class="nav-index">${String(index + 1).padStart(2, '0')}</span>
      <span>${item.title}</span><small>${questions.filter(q => q.group === item.id).length}</small>
    </a>`).join('');

  if (!group) {
    document.getElementById('list-title').textContent = '请选择题型分组';
    document.getElementById('list-count').hidden = true;
    document.getElementById('list-instruction').hidden = true;
    document.querySelector('.list-guide').hidden = true;
    list.innerHTML = '<div class="empty-state"><a href="chapter.html">← 返回第一章，选择题型分组</a></div>';
    return;
  }

  const selected = questions.filter(question => question.group === group.id);
  document.title = `${group.title} · Tommy Math Lab`;
  document.getElementById('list-title').textContent = group.title;
  document.getElementById('current-group').textContent = group.title;
  document.getElementById('list-count').textContent = `${selected.length} 道题`;

  // The new key records stable IDs. Read the old key once for existing sessions.
  const stateKey = `math-list-v3:calculus-upper:${learning.chapterId}:${group.id}`;
  const legacyKey = `math-chapter-one-list-v2:${group.id}`;
  const selectedIds = new Set(selected.map(question => learning.fromLegacyId(question.id)));
  let state = { open: [], scroll: 0 };
  try {
    const stored = JSON.parse(sessionStorage.getItem(stateKey) || sessionStorage.getItem(legacyKey) || 'null');
    if (stored && typeof stored === 'object') state = { ...state, ...stored };
  } catch { /* Browsing remains available when session storage is unavailable. */ }
  const openIds = new Set((Array.isArray(state.open) ? state.open : [])
    .map(id => learning.fromLegacyId(id) || id).filter(id => selectedIds.has(id)));
  const savedScroll = Number.isFinite(state.scroll) && state.scroll >= 0 ? state.scroll : 0;
  let navigationSaved = false;
  const save = () => {
    try {
      sessionStorage.setItem(stateKey, JSON.stringify({ open: [...openIds], scroll: window.scrollY }));
    } catch { /* Do not block navigation or answers on a storage error. */ }
  };

  list.innerHTML = `<section class="question-group" aria-label="${group.title}"><div class="question-rows">${selected.map(question => {
    const entryData = learning.getQuestion(learning.fromLegacyId(question.id));
    const opened = openIds.has(entryData.id);
    const href = learning.routes.question(entryData.id);
    const [levelLabel, ...tags] = entryData.labels;
    const levelBadge = levelLabel ? `<span class="question-level" data-kind="${levelLabel.kind}">${levelLabel.kind} · ${levelLabel.title}</span>` : '';
    const content = `<div class="question-copy">
      <div class="question-meta"><span class="question-number">${question.id}</span><h3>${question.title}</h3>${levelBadge}</div>
      <div class="question-statement">${question.prompt}</div>
      <div class="question-tags">${tags.map(tag => `<span data-kind="${tag.kind}">${tag.kind} · ${tag.title}</span>`).join('')}</div>
    </div>`;
    const entry = href
      ? `<a class="question-entry" href="${href}" aria-label="第 ${question.id} 题 ${question.title}，查看解析">${content}<span class="detail-entry"><span>查看解析</span><span aria-hidden="true">↗</span></span></a>`
      : `<div class="question-entry question-pending">${content}<span class="detail-pending">详解待补充</span></div>`;
    return `<article class="question-row" id="card-${question.id}">
      ${entry}
      <div class="answer-cell">
        <div class="answer-cell-top"><span>参考答案</span><button type="button" class="answer-toggle" data-answer="${question.id}" aria-expanded="${opened}" aria-controls="answer-${question.id}" aria-label="${opened ? '收起' : '显示'}第 ${question.id} 题答案">${opened ? '收起答案' : '显示答案'}<span aria-hidden="true">${opened ? '−' : '+'}</span></button></div>
        <div class="answer-placeholder"${opened ? ' hidden' : ''}>答案已隐藏</div>
        <div class="row-answer" id="answer-${question.id}"${opened ? '' : ' hidden'}>${question.answer}</div>
      </div>
    </article>`;
  }).join('')}</div></section>`;

  list.addEventListener('click', event => {
    const toggle = event.target.closest('[data-answer]');
    if (toggle) {
      const id = toggle.dataset.answer;
      const opened = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opened));
      toggle.setAttribute('aria-label', `${opened ? '收起' : '显示'}第 ${id} 题答案`);
      toggle.innerHTML = `${opened ? '收起答案' : '显示答案'}<span aria-hidden="true">${opened ? '−' : '+'}</span>`;
      document.getElementById(`answer-${id}`).hidden = !opened;
      toggle.closest('.answer-cell').querySelector('.answer-placeholder').hidden = opened;
      const globalId = learning.fromLegacyId(id);
      if (opened) openIds.add(globalId);
      else openIds.delete(globalId);
      save();
      return;
    }
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.getAttribute('href').startsWith('#')) return;
    save();
    navigationSaved = event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
  });
  window.addEventListener('pagehide', () => {
    if (!navigationSaved) save();
  });
  window.addEventListener('pageshow', () => { navigationSaved = false; });

  // Explicit return links restore the same group's reading position.
  // Native Back/Forward keeps the browser's own scroll restoration.
  if (params.has('resume')) {
    // A fresh return URL otherwise allows native restoration to overwrite ours.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.addEventListener('pageshow', event => {
      if (!event.persisted) requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: 'instant' }));
    }, { once: true });
  }
})();
