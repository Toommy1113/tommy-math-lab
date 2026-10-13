/* Shared question identity, labels and page routes. Keeps both source catalogues intact. */
(function (app) {
  'use strict';
  const modules = {
    'calculus-upper': { id: 'calculus-upper', title: '高等数学 · 上', organization: 'chapters', href: 'calculus-upper.html' },
    competition: { id: 'competition', title: '数学竞赛', organization: 'topics', href: 'competition.html' }
  };
  const questions = new Map();
  const legacyIds = new Map();
  const methodTags = new Set(['有理化', '最高次项', '三角恒等变形', '等价无穷小', '乘除替换', '整体代换', '取对数', '夹逼准则', '单调有界准则', '辅助函数', '函数变换', '反例']);
  const formTags = new Set(['0/0 型', '∞/∞ 型', '1^∞ 型']);
  const levelKinds = { 基础: '难度', 综合: '难度', 提高: '难度', 重点: '学习', 选学: '学习', 概念: '题型' };
  const chapterId = 'calculus-upper-ch01';

  // Paths are relative to pages/. Existing lesson URLs remain valid bookmarks.
  const routes = {
    module: id => modules[id]?.href ?? null,
    chapter: id => id === chapterId ? 'chapter.html' : null,
    section: (moduleId, sectionId) => moduleId === 'calculus-upper' && app.data?.groups?.some(g => g.id === sectionId)
      ? 'questions.html?group=' + encodeURIComponent(sectionId) : null,
    topic: topicId => app.competition?.topics?.some(t => t.id === topicId)
      ? 'competition-topic.html?topic=' + encodeURIComponent(topicId) : null,
    question: id => questions.get(id)?.detailRef ?? null
  };

  if (app.data?.questions && app.data?.groups) {
    for (const q of app.data.questions) {
      const id = chapterId + '-q' + q.id;
      const levelKind = levelKinds[q.level];
      const labels = [levelKind ? { kind: levelKind, title: q.level } : null,
        ...q.tags.map(title => ({ kind: formTags.has(title) ? '题型' : methodTags.has(title) ? '方法' : '知识', title }))].filter(Boolean);
      const detailRef = Number(q.id) <= 26 ? (q.id === '04' ? 'lesson.html#question' : 'lesson-' + q.id + '.html#question') : null;
      const entry = {
        id, displayNumber: q.id, moduleId: 'calculus-upper', chapterId,
        sectionId: q.group, kind: levelKind === '题型' ? q.level : null,
        difficulty: levelKind === '难度' ? q.level : null,
        studyFlag: levelKind === '学习' ? q.level : null,
        labels, detailRef
      };
      questions.set(id, entry);
      legacyIds.set(q.id, id);
    }
  }

  if (app.competition?.questions && app.competition?.topics) {
    for (const q of app.competition.questions) {
      const topicIds = app.competition.topics.filter(t => t.questionIds.includes(q.id)).map(t => t.id);
      questions.set(q.id, {
        id: q.id, displayNumber: q.displayNumber ?? null, moduleId: 'competition', topicIds,
        kind: q.kind ?? null, difficulty: q.difficulty ?? null, studyFlag: q.studyFlag ?? null,
        knowledgeIds: q.knowledgeIds, ideaIds: q.ideaIds,
        labels: [q.kind && { kind: '题型', title: q.kind }, q.difficulty && { kind: '难度', title: q.difficulty }, q.studyFlag && { kind: '学习', title: q.studyFlag }].filter(Boolean),
        detailRef: q.status === 'ready' && q.detailRef ? q.detailRef : null
      });
    }
  }

  app.learning = {
    modules, chapterId, questions, routes,
    fromLegacyId: id => legacyIds.get(id) ?? null,
    getQuestion: id => questions.get(id) ?? null
  };
})(window.MathLab = window.MathLab || {});
