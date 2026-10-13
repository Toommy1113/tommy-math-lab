(function () {
  'use strict';
  const data = window.MathLab.competition;
  const learning = window.MathLab.learning;
  const page = document.body.dataset.competitionPage;
  const main = document.getElementById('competition-content');
  const title = document.getElementById('page-title');
  const count = document.getElementById('page-count');
  const description = document.getElementById('page-description');
  const topicUrl = topic => learning.routes.topic(topic.id);
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  function link(text, href) {
    const node = element('a', text);
    node.href = href;
    return node;
  }
  function card(label, heading, text, href, action) {
    const node = link('', href);
    node.className = 'navigation-card';
    const copy = element('div', undefined, 'navigation-copy');
    copy.append(element('span', label, 'navigation-label'), element('h2', heading), element('p', text));
    node.append(copy, element('span', action + ' ↗', 'navigation-action'));
    return node;
  }
  function section(id, heading, note, folded = false) {
    const node = element('section', undefined, 'summary-insight topic-section');
    node.id = id;
    const h = element('h2', heading);
    h.id = id + '-heading';
    node.setAttribute('aria-labelledby', h.id);
    const body = folded ? element('details', undefined, 'topic-fold') : node;
    if (folded) {
      const summary = element('summary');
      summary.append(h, element('span', '展开阅读', 'topic-note'));
      body.append(summary);
      node.append(body);
    } else node.append(h);
    if (note) body.append(element('p', note));
    main.append(node);
    return body;
  }
  function list(items) {
    const node = element('ul');
    items.forEach(text => node.append(element('li', text)));
    return node;
  }
  function item(heading, text, status) {
    const node = element('div', undefined, 'topic-outline-item');
    node.append(element('h3', heading));
    if (status) node.append(element('span', status, 'topic-status'));
    if (text) node.append(element('p', text));
    return node;
  }
  function topicCard(topic) {
    const questions = data.questions.filter(q => topic.questionIds.includes(q.id));
    const ready = questions.filter(q => learning.routes.question(q.id)).length;
    const prerequisites = data.knowledge.filter(k => topic.prerequisiteIds.includes(k.id)).map(k => k.title).join('、');
    return card(questions.length + ' 道代表题 · ' + ready + ' 道完整解析 · ' + (questions.length - ready) + ' 道解析待补充', topic.title,
      topic.summary + ' 前置知识：' + prerequisites + '。', topicUrl(topic), '查看专题');
  }
  if (page === 'home') {
    count.textContent = data.topics.length + ' 个知识点';
    const cards = element('div', undefined, 'navigation-cards');
    data.topics.forEach(topic => cards.append(topicCard(topic)));
    main.append(cards);
    return;
  }
  if (page !== 'topic') return;
  const id = new URLSearchParams(window.location.search).get('topic');
  const topic = data.topics.find(entry => entry.id === id);
  if (!topic) {
    title.textContent = '未找到专题';
    document.title = '未找到专题 · Tommy Math Lab';
    count.hidden = true;
    description.textContent = '请从知识点列表选择一个已开放的专题。';
    main.append(link('← 返回知识点列表', 'competition.html'));
    return;
  }
  title.textContent = topic.title;
  document.title = topic.title + ' · 数学竞赛 · Tommy Math Lab';
  document.getElementById('topic-breadcrumb').textContent = topic.title;
  count.textContent = topic.questionIds.length + ' 道代表题 · ' + topic.questionIds.filter(id => learning.routes.question(id)).length + ' 道完整解析';
  description.textContent = topic.summary;
  const nav = element('nav', undefined, 'topic-links');
  nav.setAttribute('aria-label', '专题内容导航');
  const sections = [['overview', '专题导学'], ['theorems', '定理关系'], ['strategy', '方法选择'], ['examples', '代表题'], ['pitfalls', '常见错误'], ['experience', '经验总结'], ['related', '关联知识']];
  sections.forEach(([key, label]) => nav.append(link(label, '#' + key)));
  main.append(nav);
  const intro = section('overview', '专题导学', '先独立尝试代表题，再看思路与完整证明。例题01已开放解析；例题02、03暂供读题与尝试。');
  intro.append(element('h3', '学习目标'), list(topic.goals));
  intro.append(element('p', '前置知识：' + data.knowledge.filter(k => topic.prerequisiteIds.includes(k.id)).map(k => k.title).join('、') + '。', 'topic-note'));
  const theorems = section('theorems', '三个定理怎样联系', '需要时再查条件。例题01知识手册已包含罗尔定理；拉格朗日、柯西完整知识卡待补充。', true);
  topic.theorems.forEach(t => theorems.append(item(t.title, t.clue + ' ' + t.focus)));
  const strategy = section('strategy', '方法选择与辅助函数构造', '卡住时，再从条件、目标与成立依据三个方向检查。', true);
  topic.strategy.forEach(s => strategy.append(item(s.title, s.text)));
  const examples = section('examples', '代表题', '两道核心例题与一道提高例题。先独立读题，再进入例题01的拆解思路；后两题暂不提供详细解析。');
  topic.questionIds.forEach(questionId => {
    const q = data.questions.find(entry => entry.id === questionId);
    if (!q) return;
    const record = learning.getQuestion(q.id);
    const detailUrl = learning.routes.question(record.id);
    const row = item('例题' + q.displayNumber + ' · ' + q.title, null, detailUrl ? '解析已开放' : '解析待补充');
    row.id = q.id;
    row.append(element('p', q.source, 'topic-note'));
    const statement = element('div', undefined, 'competition-statement');
    // Authored repository content only; never populate this field with user input.
    statement.innerHTML = q.statementHtml;
    row.append(statement);
    row.append(element('p', record.labels.map(label => label.kind + ' · ' + label.title).join(' / '), 'topic-note'));
    const focus = element('details', undefined, 'topic-focus');
    focus.append(element('summary', '学习重点（含方法提示）'), element('p', q.focus));
    row.append(focus);
    if (detailUrl) row.append(link('查看解析 ↗', detailUrl));
    examples.append(row);
  });
  section('pitfalls', '常见错误', '例题01中可以看到这些条件分别在哪一步发挥作用。').append(list(topic.pitfalls));
  section('experience', '我的解题经验总结', topic.summaryOutline);
  const related = section('related', '关联知识', '例题01的知识手册已补充定理条件、构造依据与反例，可在解析页点击对应知识点阅读。');
  related.append(list(data.knowledge.filter(k => topic.knowledgeCardIds.includes(k.id)).map(k => k.title + (k.status === 'ready' ? ' · 已收录' : ' · 知识卡待补充'))));
  related.append(link('查看例题01知识手册 ↗', learning.routes.question('competition-mvt-001').replace('#question', '#knowledge')));
  const ideas = data.ideas.filter(idea => topic.ideaIds.includes(idea.id));
  if (ideas.length) related.append(element('p', '涉及思想：' + ideas.map(idea => idea.title).join('、') + '。', 'topic-note'));
}());
