/* Shared MathML helpers. Classic script: also works when opened locally. */
(function (app) {
  'use strict';
const math=body=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">${body}</math>`;
const frac=(a,b)=>`<mfrac><mrow>${a}</mrow><mrow>${b}</mrow></mfrac>`;
const mi=s=>`<mi>${s}</mi>`,mn=s=>`<mn>${s}</mn>`,mo=s=>`<mo>${s}</mo>`;
const mr=s=>`<mrow>${s}</mrow>`,pow=(a,b)=>`<msup>${mr(a)}${mr(b)}</msup>`;
const par=s=>mo('(')+s+mo(')'),root=s=>`<msqrt>${s}</msqrt>`;
const fn=(s,x)=>`<mi mathvariant="normal">${s}</mi><mspace width=".12em"/>`+x;
const u=mi('u'),x=mi('x'),a=mi('α'),b=mi('β');
const formula=body=>`<div class="knowledge-formula">${math(body)}</div>`;
const para=s=>`<p>${s}</p>`,list=items=>`<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
const eqRow=(left,right,note='')=>`<div class="equivalence-row">${math(left+mo('∼')+right)}${note?`<small>${note}</small>`:''}</div>`;
const sub=(v,n)=>`<msub>${mi(v)}${mn(n)}</msub>`;
const lim=(v,to)=>`<munder><mo>lim</mo><mrow>${mi(v)}${mo('→')}${to}</mrow></munder>`;

  app.math = { math, frac, mi, mn, mo, mr, pow, par, root, fn, u, x, a, b, formula, para, list, eqRow, sub, lim };
})(window.MathLab = window.MathLab || {});
