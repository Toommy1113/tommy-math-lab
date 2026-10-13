'use strict';
(() => {
  const { groups, questions } = window.MathLab.data;
  const { routes } = window.MathLab.learning;
  const summary = document.getElementById('chapter-summary');
  if (summary) summary.textContent = `${groups.length} 个题型分组 · ${questions.length} 道题`;

  const container = document.getElementById('type-groups');
  if (!container) return;
  document.getElementById('chapter-count').textContent = `${questions.length} 道题`;
  container.innerHTML = groups.map((group, index) => {
    const count = questions.filter(question => question.group === group.id).length;
    return `<a class="navigation-card" href="${routes.section('calculus-upper', group.id)}">
      <span class="navigation-number">${String(index + 1).padStart(2, '0')}</span>
      <div class="navigation-copy"><h2>${group.title}</h2><p>${count} 道题</p></div>
      <span class="navigation-action">查看题目 <span aria-hidden="true">↗</span></span>
    </a>`;
  }).join('');
})();
