/* Rendering and reading history for the knowledge handbook. */
(function (app) {
  'use strict';

  function init() {
    const topics = app.data.topics;
    const content = document.getElementById('knowledge-content');
    const back = document.getElementById('knowledge-back');
    const rail = document.querySelector('.knowledge-rail');
    let topicId = document.querySelector('.knowledge-chip[data-topic]')?.dataset.topic || 'zero';
    const history = [];

    function snapshot() {
      return {
        id: topicId,
        open: [...content.querySelectorAll('details')].map(detail => detail.open),
        scroll: rail.scrollTop
      };
    }

    function render(state) {
      const topic = topics[topicId];
      content.innerHTML = `<div class="knowledge-kind">${topic.kind}</div><h3 class="knowledge-title" tabindex="-1">${topic.title}</h3><p class="knowledge-description">${topic.description}</p><details class="knowledge-relations"><summary>关联知识（${topic.relations.length}）<span class="chevron">⌄</span></summary><div class="related-group">${topic.relations.map(([id,type,title,reason])=>`<button class="related-item" data-topic="${id}"><span class="relation-type">${type}</span><span class="relation-copy"><span>${title}</span><small>${reason}</small></span><span class="arrow">↗</span></button>`).join('')}</div></details><div class="knowledge-sections">${topic.sections.map((section,i)=>`<details class="knowledge-section" ${section.open?'open':''}><summary><span><small>${String(i+1).padStart(2,'0')}</small>${section.title}</span><span class="chevron">⌄</span></summary><div class="knowledge-section-body">${section.html}</div></details>`).join('')}</div>`;
      if (state) {
        content.querySelectorAll('details').forEach((detail, i) => {
          detail.open = state.open[i];
        });
      }
      back.disabled = history.length === 0;
      rail.scrollTop = state ? state.scroll : 0;
    }

    function open(id, section) {
      if (!topics[id]) return;
      if (id !== topicId) {
        history.push(snapshot());
        topicId = id;
        render();
      }
      if (section) {
        const index = topics[id].sections.findIndex(item => item.title === section);
        const detail = content.querySelectorAll('.knowledge-section')[index];
        if (detail) {
          detail.open = true;
          rail.scrollTop += detail.getBoundingClientRect().top - rail.getBoundingClientRect().top;
        }
      }
      content.querySelector('.knowledge-title').focus({ preventScroll: true });
      if (window.matchMedia('(max-width:720px)').matches) {
        document.getElementById('knowledge').scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth',
          block: 'start'
        });
      }
    }

    document.addEventListener('click', event => {
      const button = event.target.closest('[data-topic]');
      if (button) open(button.dataset.topic, button.dataset.section);
    });
    back.addEventListener('click', () => {
      if (!history.length) return;
      const state = history.pop();
      topicId = state.id;
      render(state);
      content.querySelector('.knowledge-title').focus({ preventScroll: true });
    });
    document.getElementById('expand-knowledge').addEventListener('click', () => {
      content.querySelectorAll('details').forEach(detail => { detail.open = true; });
    });
    document.getElementById('collapse-knowledge').addEventListener('click', () => {
      content.querySelectorAll('details').forEach(detail => { detail.open = false; });
    });
    render();
  }

  app.knowledgePanel = { init };
})(window.MathLab);
