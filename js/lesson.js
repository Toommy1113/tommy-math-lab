/* Existing lesson interactions. This is the detail page's only entry script. */
(function (app) {
  'use strict';
  const { copy: methodCopy, details: methodDetails } = app.data.methods;

  function selectMethod(id) {
    if (!methodCopy[id]) return;
    document.querySelectorAll('[data-method]').forEach(button => {
      const active = button.dataset.method === id;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    const panel = document.getElementById('method-panel');
    panel.setAttribute('aria-labelledby', 'method-' + id);
    panel.innerHTML = `<strong>${methodCopy[id][0]}</strong><p>${methodCopy[id][1]}</p>${methodDetails[id]?`<details class="method-detail"><summary>完整推导<span class="chevron">⌄</span></summary><div class="method-detail-body">${methodDetails[id]}</div></details>`:''}`;
  }

  app.knowledgePanel.init();
  document.addEventListener('click', event => {
    const method = event.target.closest('[data-method]');
    if (method) selectMethod(method.dataset.method);
  });

  document.querySelector('.method-tabs').addEventListener('keydown', event => {
    const tabs = [...document.querySelectorAll('[data-method]')];
    let index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    if (event.key === 'ArrowRight') index = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') index = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = tabs.length - 1;
    else return;
    event.preventDefault();
    selectMethod(tabs[index].dataset.method);
    tabs[index].focus();
  });

  const solution = document.querySelector('.solution-details');
  solution.addEventListener('toggle', () => {
    document.querySelector('.expand-label').textContent = solution.open ? '收起步骤' : '展开步骤';
  });
  document.querySelectorAll('[data-open-solution]').forEach(link => {
    link.addEventListener('click', () => { solution.open = true; });
  });
  if (location.hash === '#solution') solution.open = true;
  document.getElementById('show-scores').addEventListener('change', event => {
    document.querySelector('.solution-content').classList.toggle('hide-scores', !event.target.checked);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          document.querySelectorAll('.lesson-nav a').forEach(link => {
            link.classList.toggle('current', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      }
    }, { rootMargin: '-90px 0px -60% 0px', threshold: 0 });
    ['question', 'thinking', 'solution', 'pitfalls'].forEach(id => {
      observer.observe(document.getElementById(id));
    });
  }
  selectMethod(document.querySelector('[data-method][aria-selected="true"]').dataset.method);
})(window.MathLab);
