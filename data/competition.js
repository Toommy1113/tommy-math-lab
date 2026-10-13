/* Competition content remains independent of the calculus catalogue. */
(function (app) {
  'use strict';
  app.competition = {
  "module": {
    "id": "competition",
    "title": "数学竞赛",
    "organization": "topics",
    "entryUrl": "competition.html"
  },
  "ideas": [
    {
      "id": "auxiliary-function",
      "title": "辅助函数构造"
    }
  ],
  "knowledge": [
    {
      "id": "competition-continuity",
      "title": "连续性",
      "status": "planned"
    },
    {
      "id": "competition-derivative",
      "title": "导数与基本求导",
      "status": "planned"
    },
    {
      "id": "competition-rolle",
      "title": "罗尔定理",
      "status": "ready"
    },
    {
      "id": "competition-lagrange",
      "title": "拉格朗日中值定理",
      "status": "planned"
    },
    {
      "id": "competition-cauchy",
      "title": "柯西中值定理",
      "status": "planned"
    },
    {
      "id": "competition-zero",
      "title": "零点定理与两零点构造",
      "status": "ready"
    },
    {
      "id": "competition-integral-sign",
      "title": "定积分的符号与严格正性",
      "status": "ready"
    },
    {
      "id": "competition-ftc",
      "title": "变上限积分求导",
      "status": "ready"
    },
    {
      "id": "competition-factor",
      "title": "从乘积求导构造辅助函数",
      "status": "ready"
    }
  ],
  "topics": [
    {
      "id": "competition-differential-mvt",
      "title": "微分中值定理",
      "status": "in-progress",
      "summary": "通过三道竞赛真题，练习从条件与目标选择中值定理，并检查证明成立的边界。",
      "prerequisiteIds": [
        "competition-continuity",
        "competition-derivative"
      ],
      "knowledgeCardIds": [
        "competition-rolle",
        "competition-zero",
        "competition-integral-sign",
        "competition-ftc",
        "competition-factor",
        "competition-lagrange",
        "competition-cauchy"
      ],
      "ideaIds": [
        "auxiliary-function"
      ],
      "questionIds": [
        "competition-mvt-001",
        "competition-mvt-002",
        "competition-mvt-003"
      ],
      "goals": [
        "能解释关键一步为什么这样想。",
        "能核对定理条件，并尝试迁移到相近问题。"
      ],
      "theorems": [
        {
          "title": "罗尔定理",
          "clue": "端点值相等，希望找到导数为零的点。",
          "focus": "先检查闭区间连续、开区间可导与端点值相等。"
        },
        {
          "title": "拉格朗日中值定理",
          "clue": "出现函数差或差商，希望用导数估计函数变化。",
          "focus": "先确定应用区间，再检查闭区间连续、开区间可导。"
        },
        {
          "title": "柯西中值定理",
          "clue": "需要联系两个函数在同一区间上的增量。",
          "focus": "两个函数都须满足连续、可导条件；比值形式还需检查分母非零。"
        }
      ],
      "strategy": [
        {
          "title": "先看条件提供了什么",
          "text": "观察端点关系与连续、可导条件，判断能否直接应用定理。"
        },
        {
          "title": "再看结论需要什么",
          "text": "辨认目标中的导数与函数组合，思考它能否来自某个函数的导数。"
        },
        {
          "title": "说明构造解决了什么",
          "text": "若需要辅助函数，解释构造动机，并重新检查定理的适用条件。"
        }
      ],
      "pitfalls": [
        "积分为零不等于函数恒为零，也不能单凭这一条件断言有两个零点。",
        "对原函数使用罗尔定理只能得到某处 f′=0，未必符合目标式。",
        "辅助函数不仅要产生目标导数，还要满足连续、可导与端点等值。",
        "两次使用中值定理，不能默认得到同一个点，也不能默认得到不同的点。"
      ],
      "summaryOutline": "做完一道题，试着遮住解析，重新说清三件事：已知条件提供了什么，目标还缺什么，关键一步怎样把两者连接起来。再改变一个条件，检查原来的方法是否仍成立。"
    }
  ],
  "questions": [
    {
      "kind": "证明",
      "ideaIds": [
        "auxiliary-function"
      ],
      "id": "competition-mvt-001",
      "displayNumber": "01",
      "title": "两个零点与导数关系的存在性证明",
      "status": "ready",
      "detailRef": "competition-mvt-001.html#question",
      "studyFlag": "核心",
      "knowledgeIds": [
        "competition-zero",
        "competition-integral-sign",
        "competition-rolle",
        "competition-ftc",
        "competition-factor"
      ],
      "focus": "先找两个零点，再解释怎样构造出 f′+3f³，让罗尔定理真正接上目标。",
      "source": "第十五届全国大学生数学竞赛初赛 · 非数学B类 · 第五题（14分）",
      "sourceFile": "第十五届全国大学生数学竞赛初赛试题及参考答案（非数学B类）.pdf",
      "sourcePages": [
        6
      ],
      "statementHtml": "<p>设 f(x) 在 [0,1] 上可导且 f(0)&gt;0，f(1)&gt;0，</p><div class=\"formula-scroll\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\"><msubsup><mo>∫</mo><mrow><mtext>0</mtext></mrow><mrow><mtext>1</mtext></mrow></msubsup><mtext>f(x) dx</mtext><mtext> = 0。</mtext></math></div><p>证明：</p><p>（1）f(x) 在 [0,1] 上至少有两个零点；</p><p>（2）在 (0,1) 内至少存在一点 ξ，使得</p><div class=\"formula-scroll\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\"><mtext>f′(ξ) + 3f³(ξ) = 0。</mtext></math></div>",
      "methodTitle": "从目标式倒推辅助函数"
    },
    {
      "kind": "证明",
      "ideaIds": [
        "auxiliary-function"
      ],
      "id": "competition-mvt-002",
      "displayNumber": "02",
      "title": "三个互异点的导数乘积不等式",
      "status": "planned",
      "detailRef": null,
      "studyFlag": "核心",
      "knowledgeIds": [
        "competition-zero",
        "competition-lagrange"
      ],
      "focus": "练习怎样选择分点、安排应用区间，并保证三个中值点两两互异。",
      "source": "第十四届全国大学生数学竞赛初赛第二次补赛 · 非数学类 · 第四题（14分）",
      "sourceFile": "第14届全国初赛第二次补赛竞答案.pdf",
      "sourcePages": [
        3,
        4
      ],
      "statementHtml": "<p>设函数 f(x) 在区间 [0,1] 上连续，在 (0,1) 内可导，且 f(0)=0，f(1)=2。证明：存在两两互异的点 ξ₁，ξ₂，ξ₃∈(0,1)，使得</p><div class=\"formula-scroll\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\"><mtext>f′(ξ₁) f′(ξ₂)</mtext><msqrt><mtext>1 − ξ₃</mtext></msqrt><mtext> ≥ 2。</mtext></math></div>",
      "methodTitle": "需要多个不同的点，先安排区间"
    },
    {
      "kind": "证明",
      "ideaIds": [
        "auxiliary-function"
      ],
      "id": "competition-mvt-003",
      "displayNumber": "03",
      "title": "给定函数约束下的端点导数估计",
      "status": "planned",
      "detailRef": null,
      "difficulty": "提高",
      "studyFlag": "选学",
      "knowledgeIds": [
        "competition-lagrange"
      ],
      "focus": "练习把函数值条件转为中间点的导数估计，再借助辅助函数比较目标点。",
      "source": "第十四届全国大学生数学竞赛初赛 · 非数学类 · 第三题（14分）",
      "sourceFile": "第十四届非数初赛.pdf",
      "sourcePages": [
        3
      ],
      "statementHtml": "<p>设函数 f(x) 在 (−1,1) 上二阶可导，f(0)=1，且当 x≥0 时，f(x)≥0，f′(x)≤0，f″(x)≤f(x)。证明：</p><div class=\"formula-scroll\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\"><mtext>f′(0) ≥ −</mtext><msqrt><mn>2</mn></msqrt><mtext>。</mtext></math></div>",
      "methodTitle": "把中间点的导数估计传回目标点"
    }
  ]
};
})(window.MathLab = window.MathLab || {});
