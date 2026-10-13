/* Loaded only by the competition detail page; reuses the existing handbook contract. */
(function (app) {
  'use strict';
  app.data = {
  "topics": {
    "competition-rolle": {
      "kind": "微分中值定理",
      "title": "罗尔定理",
      "description": "两个等值端点之间，至少有一个内部点的导数为零。关键是对正确的函数、在正确的区间使用它。",
      "sections": [
        {
          "title": "定理与成立条件",
          "html": "<p>若 F 在 [a,b] 上连续，在 (a,b) 内可导，a&lt;b，且 F(a)=F(b)，则存在 ξ∈(a,b)，使 F′(ξ)=0。三项条件必须同时满足；不要求 F′ 连续。</p>",
          "open": true
        },
        {
          "title": "为什么成立",
          "html": "<p>连续函数在闭区间取到最大值和最小值。若 F 为常数，内部每点导数都为零；否则，由两端等值，至少一个最值在内部取得，再由费马定理得到该点导数为零。</p>",
          "open": false
        },
        {
          "title": "本题怎样使用",
          "html": "<p>本题对辅助函数使用定理。检查顺序是：应用区间是否明确、闭区间是否连续、开区间是否可导、两端是否等值。得到 F′(ξ)=0 后，还须检查它怎样推出题目要求的关系。</p>",
          "open": false
        },
        {
          "title": "适用边界与反例",
          "html": "<p>只有端点相等不够：F(x)=|x| 在 [−1,1] 两端等值，但在 0 不可导，其余点导数为 ±1，没有导数为零的点。反过来，定理给出的驻点也不必是原函数的零点。</p>",
          "open": false
        }
      ],
      "relations": [
        [
          "competition-zero",
          "区分",
          "函数零点与导数零点",
          "零点定理与罗尔定理分别保证哪一种“零”？"
        ],
        [
          "competition-factor",
          "迁移",
          "从 f′+pf 构造乘积",
          "何时能把导数关系转为罗尔定理？"
        ]
      ]
    },
    "competition-zero": {
      "kind": "连续函数性质",
      "title": "零点定理与两零点构造",
      "description": "端点异号与闭区间连续保证内部有零点；要得到两个不同零点，应分别安排两个区间。",
      "sections": [
        {
          "title": "定理与条件",
          "html": "<p>若 f 在 [a,b] 上连续且 f(a)f(b)&lt;0，则存在 c∈(a,b)，使 f(c)=0。结论是存在，不保证唯一。</p>",
          "open": true
        },
        {
          "title": "本题的区间怎么选",
          "html": "<p>先找到 f(x₀)&lt;0，再利用 f(0)&gt;0、f(1)&gt;0，在 [0,x₀] 与 [x₀,1] 分别使用定理。所得 α&lt;x₀&lt;β，两个零点自动不同。</p>",
          "open": false
        },
        {
          "title": "不要混淆两种定理",
          "html": "<p>零点定理依靠连续性找到函数值为零的点；罗尔定理还要求可导和端点等值，找到导数为零的点。两种“零”不是一回事。</p>",
          "open": false
        },
        {
          "title": "边界与反例",
          "html": "<p>异号但不连续不保证零点，例如在 0 左侧恒为 −1、右侧及 0 处恒为 1 的函数。端点同号也不表示没有零点，本题正是借内部负值重新选区间。</p>",
          "open": false
        }
      ],
      "relations": [
        [
          "competition-integral-sign",
          "依据",
          "积分的严格正性",
          "积分条件怎样迫使函数在内部取负值？"
        ],
        [
          "competition-rolle",
          "区分",
          "零点与驻点",
          "两个零点之间的驻点不必还是零点。"
        ]
      ]
    },
    "competition-integral-sign": {
      "kind": "定积分性质",
      "title": "定积分的符号与严格正性",
      "description": "连续非负函数若在某点严格为正，就会在附近一段区间保持正值，从而积分严格为正。",
      "sections": [
        {
          "title": "保号性与严格正性",
          "html": "<p>设 f 在 [a,b] 上连续，a&lt;b。若 f≥0，则 ∫ₐᵇf≥0；若另外存在 c∈[a,b] 使 f(c)&gt;0，则 ∫ₐᵇf&gt;0。因此，连续且非负的函数积分为零，当且仅当它恒为零。</p>",
          "open": true
        },
        {
          "title": "严格大于零的依据",
          "html": "<p>由连续性，可在 c 附近选一段正长度子区间，使 f≥f(c)/2&gt;0。该子区间的积分有严格正下界，其余部分非负；端点 c=a 或 b 时取单侧小区间即可。</p>",
          "open": false
        },
        {
          "title": "本题中的反证",
          "html": "<p>若 f 处处非负，由 f(0)&gt;0 可得积分严格为正，矛盾。因此内部必有负值。两端为正再配合零点定理，才能得到两个不同零点。</p>",
          "open": false
        },
        {
          "title": "易错点与反例",
          "html": "<p>不加“非负”条件，积分为零不能推出函数恒零：f(x)=x−1/2 在 [0,1] 上积分为零。单凭积分为零也不能推出两个零点。</p>",
          "open": false
        }
      ],
      "relations": [
        [
          "competition-zero",
          "应用",
          "零点定理",
          "从内部负值与两端正值建立两个异号区间。"
        ]
      ]
    },
    "competition-ftc": {
      "kind": "积分与导数",
      "title": "变上限积分求导",
      "description": "连续的被积函数可以通过变上限积分构造一个原函数，供辅助函数求导使用。",
      "sections": [
        {
          "title": "公式与条件",
          "html": "<p>设 g 在 [a,b] 上连续，A(x)=∫ₐˣg(s)ds，则 A 在 [a,b] 连续，在 (a,b) 内可导，且 A′(x)=g(x)。积分变量 s 是哑变量，与上限 x 区分。</p>",
          "open": true
        },
        {
          "title": "为什么导数等于被积函数",
          "html": "<p>差商 [A(x+h)−A(x)]/h 是 g 在 x 附近小区间的平均值。由 g 在 x 连续，该平均值随 h→0 趋于 g(x)。</p>",
          "open": false
        },
        {
          "title": "本题怎样配出指数",
          "html": "<p>f 连续，故 g=3f² 连续。选择 A(x)=∫₀ˣ3f²(s)ds 后，A′=3f²；再由复合函数求导得到 (eᴬ)′=3f²eᴬ。</p>",
          "open": false
        },
        {
          "title": "易错点",
          "html": "<p>∫₀ˣ3f²(s)ds 的导数是 3f²(x)，不是 6f(x)f′(x)。后者是对被积函数本身求导，混淆了两个步骤。若上限为 u(x)，还要乘 u′(x)。</p>",
          "open": false
        }
      ],
      "relations": [
        [
          "competition-factor",
          "应用",
          "乘积辅助函数",
          "让指数的导数产生目标系数。"
        ]
      ]
    },
    "competition-factor": {
      "kind": "构造方法",
      "title": "从乘积求导构造辅助函数",
      "description": "当目标含 f′+pf 时，让一个处处为正的因子 w 满足 w′=pw，便能把整个目标式放进乘积的导数。",
      "sections": [
        {
          "title": "从目标反推",
          "html": "<p>乘积求导给出 (wf)′=wf′+w′f。为了配成 w(f′+pf)，需要 w′=pw。若 p 连续，可取 A(x)=∫ₐˣp(s)ds、w=eᴬ；此时 w′=p·w 且 w&gt;0。</p><p>配出导数后仍须检查端点等值。两个零点可被乘积保留，两个相等的非零端点一般不能。</p>",
          "open": true
        },
        {
          "title": "为什么会想到指数函数",
          "open": false,
          "html": "<p>我们希望 w 求导后还保留自身，只多乘一个系数 p(x)。由复合函数求导，(eᴬ)′=eᴬ·A′，恰好有这种结构。于是先选指数形式，再令 A′=p；当 p 连续时，变上限积分就能构造这样的 A。这不要求先求出 f，也不需要除以可能为零的 f。</p>"
        },
        {
          "title": "本题的系数为何是 3f²",
          "html": "<p>把 3f³ 写成 (3f²)f，于是 p(x)=3f²(x)。虽然 p 依赖未知函数 f，但 f 连续就足以保证 p 连续和积分存在，不需要求出 f 的具体表达式。</p>",
          "open": false
        },
        {
          "title": "构造后仍须检查端点",
          "html": "<p>若 f(α)=f(β)=0，乘任何在两点有定义的因子都保留零点，因此可以继续核对罗尔定理。若只是 f(α)=f(β)≠0，乘变动因子后通常不再等值，不能直接照搬。</p>",
          "open": false
        },
        {
          "title": "易错点与边界",
          "html": "<p>乘 e³ˣ 只能配出 f′+3f，不能配出 f′+3f³。也不必先除以 f 求 f′/f：f 可能为零，这样做反而会破坏本题需要的区间。</p>",
          "open": false
        }
      ],
      "relations": [
        [
          "competition-ftc",
          "依据",
          "变上限积分求导",
          "为什么积分能构造出导数为 p 的函数？"
        ],
        [
          "competition-rolle",
          "条件",
          "罗尔定理",
          "凑出目标导数后，还要满足哪些条件？"
        ],
        [
          "competition-zero",
          "边界",
          "零点与等值端点",
          "零点能保留，相等的非零端点却未必能保留。"
        ]
      ]
    }
  },
  "methods": {
    "copy": {
      "factor": [
        "优先方法：保留零点，构造目标导数",
        "这道题已经有两个零点，乘积构造能保留它们；目标又能写成 f′+pf，适合把它配成乘积的导数。若只知道两端函数值相等但不为零，乘上变动因子后未必仍相等，需要重新检查。<button class=\"text-link\" data-topic=\"competition-factor\">方法边界与关联知识 ↗</button>"
      ]
    },
    "details": {}
  }
};
})(window.MathLab = window.MathLab || {});
