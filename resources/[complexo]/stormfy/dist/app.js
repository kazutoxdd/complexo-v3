const In = function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i);
  new MutationObserver(i => {
      for (const s of i)
          if (s.type === "childList")
              for (const l of s.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && n(l)
  }).observe(document, {
      childList: !0,
      subtree: !0
  });

  function r(i) {
      const s = {};
      return i.integrity && (s.integrity = i.integrity), i.referrerpolicy && (s.referrerPolicy = i.referrerpolicy), i.crossorigin === "use-credentials" ? s.credentials = "include" : i.crossorigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
  }

  function n(i) {
      if (i.ep) return;
      i.ep = !0;
      const s = r(i);
      fetch(i.href, s)
  }
};
In();

function F() {}
const It = t => t;

function ft(t, e) {
  for (const r in e) t[r] = e[r];
  return t
}

function Fn(t) {
  return t && typeof t == "object" && typeof t.then == "function"
}

function Xr(t) {
  return t()
}

function rr() {
  return Object.create(null)
}

function re(t) {
  t.forEach(Xr)
}

function Ee(t) {
  return typeof t == "function"
}

function ne(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function"
}
let rt;

function Y(t, e) {
  return rt || (rt = document.createElement("a")), rt.href = e, t === rt.href
}

function qn(t) {
  return Object.keys(t).length === 0
}

function Ft(t, ...e) {
  if (t == null) return F;
  const r = t.subscribe(...e);
  return r.unsubscribe ? () => r.unsubscribe() : r
}

function we(t) {
  let e;
  return Ft(t, r => e = r)(), e
}

function H(t, e, r) {
  t.$$.on_destroy.push(Ft(e, r))
}

function nr(t) {
  const e = {};
  for (const r in t) r[0] !== "$" && (e[r] = t[r]);
  return e
}

function $e(t, e, r) {
  return t.set(r), e
}
const Gr = typeof window != "undefined";
let Qr = Gr ? () => window.performance.now() : () => Date.now(),
  qt = Gr ? t => requestAnimationFrame(t) : F;
const Ne = new Set;

function Zr(t) {
  Ne.forEach(e => {
      e.c(t) || (Ne.delete(e), e.f())
  }), Ne.size !== 0 && qt(Zr)
}

function en(t) {
  let e;
  return Ne.size === 0 && qt(Zr), {
      promise: new Promise(r => {
          Ne.add(e = {
              c: t,
              f: r
          })
      }),
      abort() {
          Ne.delete(e)
      }
  }
}

function f(t, e) {
  t.appendChild(e)
}

function tn(t) {
  if (!t) return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument
}

function Hn(t) {
  const e = w("style");
  return Vn(tn(t), e), e.sheet
}

function Vn(t, e) {
  f(t.head || t, e)
}

function M(t, e, r) {
  t.insertBefore(e, r || null)
}

function j(t) {
  t.parentNode.removeChild(t)
}

function ht(t, e) {
  for (let r = 0; r < t.length; r += 1) t[r] && t[r].d(e)
}

function w(t) {
  return document.createElement(t)
}

function V(t) {
  return document.createTextNode(t)
}

function R() {
  return V(" ")
}

function be() {
  return V("")
}

function q(t, e, r, n) {
  return t.addEventListener(e, r, n), () => t.removeEventListener(e, r, n)
}

function h(t, e, r) {
  r == null ? t.removeAttribute(e) : t.getAttribute(e) !== r && t.setAttribute(e, r)
}

function Jn(t) {
  return t === "" ? null : +t
}

function Wn(t) {
  return Array.from(t.childNodes)
}

function te(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e)
}

function Me(t, e) {
  t.value = e == null ? "" : e
}

function Kn(t, e, r, n) {
  r === null ? t.style.removeProperty(e) : t.style.setProperty(e, r, n ? "important" : "")
}

function rn(t, e, {
  bubbles: r = !1,
  cancelable: n = !1
} = {}) {
  const i = document.createEvent("CustomEvent");
  return i.initCustomEvent(t, r, n, e), i
}
const dt = new Map;
let pt = 0;

function Yn(t) {
  let e = 5381,
      r = t.length;
  for (; r--;) e = (e << 5) - e ^ t.charCodeAt(r);
  return e >>> 0
}

function Xn(t, e) {
  const r = {
      stylesheet: Hn(e),
      rules: {}
  };
  return dt.set(t, r), r
}

function Tt(t, e, r, n, i, s, l, o = 0) {
  const a = 16.666 / n;
  let u = `{
`;
  for (let g = 0; g <= 1; g += a) {
      const k = e + (r - e) * s(g);
      u += g * 100 + `%{${l(k,1-k)}}
`
  }
  const c = u + `100% {${l(r,1-r)}}
}`,
      d = `__svelte_${Yn(c)}_${o}`,
      p = tn(t),
      {
          stylesheet: _,
          rules: m
      } = dt.get(p) || Xn(p, t);
  m[d] || (m[d] = !0, _.insertRule(`@keyframes ${d} ${c}`, _.cssRules.length));
  const b = t.style.animation || "";
  return t.style.animation = `${b?`${b}, `:""}${d} ${n}ms linear ${i}ms 1 both`, pt += 1, d
}

function Lt(t, e) {
  const r = (t.style.animation || "").split(", "),
      n = r.filter(e ? s => s.indexOf(e) < 0 : s => s.indexOf("__svelte") === -1),
      i = r.length - n.length;
  i && (t.style.animation = n.join(", "), pt -= i, pt || Gn())
}

function Gn() {
  qt(() => {
      pt || (dt.forEach(t => {
          const {
              stylesheet: e
          } = t;
          let r = e.cssRules.length;
          for (; r--;) e.deleteRule(r);
          t.rules = {}
      }), dt.clear())
  })
}
let Ke;

function ke(t) {
  Ke = t
}

function Ze() {
  if (!Ke) throw new Error("Function called outside component initialization");
  return Ke
}

function nn(t) {
  Ze().$$.on_mount.push(t)
}

function Qn(t) {
  Ze().$$.after_update.push(t)
}

function Ht(t) {
  Ze().$$.on_destroy.push(t)
}

function Zn() {
  const t = Ze();
  return (e, r, {
      cancelable: n = !1
  } = {}) => {
      const i = t.$$.callbacks[e];
      if (i) {
          const s = rn(e, r, {
              cancelable: n
          });
          return i.slice().forEach(l => {
              l.call(t, s)
          }), !s.defaultPrevented
      }
      return !0
  }
}

function $t(t, e) {
  const r = t.$$.callbacks[e.type];
  r && r.slice().forEach(n => n.call(this, e))
}
const Ve = [],
  Nt = [],
  st = [],
  ir = [],
  sn = Promise.resolve();
let jt = !1;

function ln() {
  jt || (jt = !0, sn.then(Vt))
}

function an() {
  return ln(), sn
}

function oe(t) {
  st.push(t)
}
const Et = new Set;
let nt = 0;

function Vt() {
  const t = Ke;
  do {
      for (; nt < Ve.length;) {
          const e = Ve[nt];
          nt++, ke(e), ei(e.$$)
      }
      for (ke(null), Ve.length = 0, nt = 0; Nt.length;) Nt.pop()();
      for (let e = 0; e < st.length; e += 1) {
          const r = st[e];
          Et.has(r) || (Et.add(r), r())
      }
      st.length = 0
  } while (Ve.length);
  for (; ir.length;) ir.pop()();
  jt = !1, Et.clear(), ke(t)
}

function ei(t) {
  if (t.fragment !== null) {
      t.update(), re(t.before_update);
      const e = t.dirty;
      t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(oe)
  }
}
let qe;

function on() {
  return qe || (qe = Promise.resolve(), qe.then(() => {
      qe = null
  })), qe
}

function We(t, e, r) {
  t.dispatchEvent(rn(`${e?"intro":"outro"}${r}`))
}
const lt = new Set;
let xe;

function G() {
  xe = {
      r: 0,
      c: [],
      p: xe
  }
}

function Q() {
  xe.r || re(xe.c), xe = xe.p
}

function N(t, e) {
  t && t.i && (lt.delete(t), t.i(e))
}

function U(t, e, r, n) {
  if (t && t.o) {
      if (lt.has(t)) return;
      lt.add(t), xe.c.push(() => {
          lt.delete(t), n && (r && t.d(1), n())
      }), t.o(e)
  } else n && n()
}
const cn = {
  duration: 0
};

function ti(t, e, r) {
  let n = e(t, r),
      i = !1,
      s, l, o = 0;

  function a() {
      s && Lt(t, s)
  }

  function u() {
      const {
          delay: d = 0,
          duration: p = 300,
          easing: _ = It,
          tick: m = F,
          css: b
      } = n || cn;
      b && (s = Tt(t, 0, 1, p, d, _, b, o++)), m(0, 1);
      const g = Qr() + d,
          k = g + p;
      l && l.abort(), i = !0, oe(() => We(t, !0, "start")), l = en(y => {
          if (i) {
              if (y >= k) return m(1, 0), We(t, !0, "end"), a(), i = !1;
              if (y >= g) {
                  const A = _((y - g) / p);
                  m(A, 1 - A)
              }
          }
          return i
      })
  }
  let c = !1;
  return {
      start() {
          c || (c = !0, Lt(t), Ee(n) ? (n = n(), on().then(u)) : u())
      },
      invalidate() {
          c = !1
      },
      end() {
          i && (a(), i = !1)
      }
  }
}

function ee(t, e, r, n) {
  let i = e(t, r),
      s = n ? 0 : 1,
      l = null,
      o = null,
      a = null;

  function u() {
      a && Lt(t, a)
  }

  function c(p, _) {
      const m = p.b - s;
      return _ *= Math.abs(m), {
          a: s,
          b: p.b,
          d: m,
          duration: _,
          start: p.start,
          end: p.start + _,
          group: p.group
      }
  }

  function d(p) {
      const {
          delay: _ = 0,
          duration: m = 300,
          easing: b = It,
          tick: g = F,
          css: k
      } = i || cn, y = {
          start: Qr() + _,
          b: p
      };
      p || (y.group = xe, xe.r += 1), l || o ? o = y : (k && (u(), a = Tt(t, s, p, m, _, b, k)), p && g(0, 1), l = c(y, m), oe(() => We(t, p, "start")), en(A => {
          if (o && A > o.start && (l = c(o, m), o = null, We(t, l.b, "start"), k && (u(), a = Tt(t, s, l.b, l.duration, 0, b, i.css))), l) {
              if (A >= l.end) g(s = l.b, 1 - s), We(t, l.b, "end"), o || (l.b ? u() : --l.group.r || re(l.group.c)), l = null;
              else if (A >= l.start) {
                  const v = A - l.start;
                  s = l.a + l.d * b(v / l.duration), g(s, 1 - s)
              }
          }
          return !!(l || o)
      }))
  }
  return {
      run(p) {
          Ee(i) ? on().then(() => {
              i = i(), d(p)
          }) : d(p)
      },
      end() {
          u(), l = o = null
      }
  }
}

function sr(t, e) {
  const r = e.token = {};

  function n(i, s, l, o) {
      if (e.token !== r) return;
      e.resolved = o;
      let a = e.ctx;
      l !== void 0 && (a = a.slice(), a[l] = o);
      const u = i && (e.current = i)(a);
      let c = !1;
      e.block && (e.blocks ? e.blocks.forEach((d, p) => {
          p !== s && d && (G(), U(d, 1, 1, () => {
              e.blocks[p] === d && (e.blocks[p] = null)
          }), Q())
      }) : e.block.d(1), u.c(), N(u, 1), u.m(e.mount(), e.anchor), c = !0), e.block = u, e.blocks && (e.blocks[s] = u), c && Vt()
  }
  if (Fn(t)) {
      const i = Ze();
      if (t.then(s => {
              ke(i), n(e.then, 1, e.value, s), ke(null)
          }, s => {
              if (ke(i), n(e.catch, 2, e.error, s), ke(null), !e.hasCatch) throw s
          }), e.current !== e.pending) return n(e.pending, 0), !0
  } else {
      if (e.current !== e.then) return n(e.then, 1, e.value, t), !0;
      e.resolved = t
  }
}

function ri(t, e, r) {
  const n = e.slice(),
      {
          resolved: i
      } = t;
  t.current === t.then && (n[t.value] = i), t.current === t.catch && (n[t.error] = i), t.block.p(n, r)
}
const ni = typeof window != "undefined" ? window : typeof globalThis != "undefined" ? globalThis : global;

function un(t, e) {
  U(t, 1, 1, () => {
      e.delete(t.key)
  })
}

function fn(t, e, r, n, i, s, l, o, a, u, c, d) {
  let p = t.length,
      _ = s.length,
      m = p;
  const b = {};
  for (; m--;) b[t[m].key] = m;
  const g = [],
      k = new Map,
      y = new Map;
  for (m = _; m--;) {
      const x = d(i, s, m),
          L = r(x);
      let E = l.get(L);
      E ? n && E.p(x, e) : (E = u(L, x), E.c()), k.set(L, g[m] = E), L in b && y.set(L, Math.abs(m - b[L]))
  }
  const A = new Set,
      v = new Set;

  function S(x) {
      N(x, 1), x.m(o, c), l.set(x.key, x), c = x.first, _--
  }
  for (; p && _;) {
      const x = g[_ - 1],
          L = t[p - 1],
          E = x.key,
          D = L.key;
      x === L ? (c = x.first, p--, _--) : k.has(D) ? !l.has(E) || A.has(E) ? S(x) : v.has(D) ? p-- : y.get(E) > y.get(D) ? (v.add(E), S(x)) : (A.add(D), p--) : (a(L, l), p--)
  }
  for (; p--;) {
      const x = t[p];
      k.has(x.key) || a(x, l)
  }
  for (; _;) S(g[_ - 1]);
  return g
}

function dn(t, e) {
  const r = {},
      n = {},
      i = {
          $$scope: 1
      };
  let s = t.length;
  for (; s--;) {
      const l = t[s],
          o = e[s];
      if (o) {
          for (const a in l) a in o || (n[a] = 1);
          for (const a in o) i[a] || (r[a] = o[a], i[a] = 1);
          t[s] = o
      } else
          for (const a in l) i[a] = 1
  }
  for (const l in n) l in r || (r[l] = void 0);
  return r
}

function pn(t) {
  return typeof t == "object" && t !== null ? t : {}
}

function ae(t) {
  t && t.c()
}

function se(t, e, r, n) {
  const {
      fragment: i,
      on_mount: s,
      on_destroy: l,
      after_update: o
  } = t.$$;
  i && i.m(e, r), n || oe(() => {
      const a = s.map(Xr).filter(Ee);
      l ? l.push(...a) : re(a), t.$$.on_mount = []
  }), o.forEach(oe)
}

function le(t, e) {
  const r = t.$$;
  r.fragment !== null && (re(r.on_destroy), r.fragment && r.fragment.d(e), r.on_destroy = r.fragment = null, r.ctx = [])
}

function ii(t, e) {
  t.$$.dirty[0] === -1 && (Ve.push(t), ln(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31
}

function fe(t, e, r, n, i, s, l, o = [-1]) {
  const a = Ke;
  ke(t);
  const u = t.$$ = {
      fragment: null,
      ctx: null,
      props: s,
      update: F,
      not_equal: i,
      bound: rr(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(e.context || (a ? a.$$.context : [])),
      callbacks: rr(),
      dirty: o,
      skip_bound: !1,
      root: e.target || a.$$.root
  };
  l && l(u.root);
  let c = !1;
  if (u.ctx = r ? r(t, e.props || {}, (d, p, ..._) => {
          const m = _.length ? _[0] : p;
          return u.ctx && i(u.ctx[d], u.ctx[d] = m) && (!u.skip_bound && u.bound[d] && u.bound[d](m), c && ii(t, d)), p
      }) : [], u.update(), c = !0, re(u.before_update), u.fragment = n ? n(u.ctx) : !1, e.target) {
      if (e.hydrate) {
          const d = Wn(e.target);
          u.fragment && u.fragment.l(d), d.forEach(j)
      } else u.fragment && u.fragment.c();
      e.intro && N(t.$$.fragment), se(t, e.target, e.anchor, e.customElement), Vt()
  }
  ke(a)
}
class de {
  $destroy() {
      le(this, 1), this.$destroy = F
  }
  $on(e, r) {
      const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
      return n.push(r), () => {
          const i = n.indexOf(r);
          i !== -1 && n.splice(i, 1)
      }
  }
  $set(e) {
      this.$$set && !qn(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1)
  }
}
const Pe = [];

function mn(t, e) {
  return {
      subscribe: ye(t, e).subscribe
  }
}

function ye(t, e = F) {
  let r;
  const n = new Set;

  function i(o) {
      if (ne(t, o) && (t = o, r)) {
          const a = !Pe.length;
          for (const u of n) u[1](), Pe.push(u, t);
          if (a) {
              for (let u = 0; u < Pe.length; u += 2) Pe[u][0](Pe[u + 1]);
              Pe.length = 0
          }
      }
  }

  function s(o) {
      i(o(t))
  }

  function l(o, a = F) {
      const u = [o, a];
      return n.add(u), n.size === 1 && (r = e(i) || F), o(t), () => {
          n.delete(u), n.size === 0 && (r(), r = null)
      }
  }
  return {
      set: i,
      update: s,
      subscribe: l
  }
}

function hn(t, e, r) {
  const n = !Array.isArray(t),
      i = n ? [t] : t,
      s = e.length < 2;
  return mn(r, l => {
      let o = !1;
      const a = [];
      let u = 0,
          c = F;
      const d = () => {
              if (u) return;
              c();
              const _ = e(n ? a[0] : a, l);
              s ? l(_) : c = Ee(_) ? _ : F
          },
          p = i.map((_, m) => Ft(_, b => {
              a[m] = b, u &= ~(1 << m), o && d()
          }, () => {
              u |= 1 << m
          }));
      return o = !0, d(),
          function() {
              re(p), c()
          }
  })
}

function si(t, e) {
  if (t instanceof RegExp) return {
      keys: !1,
      pattern: t
  };
  var r, n, i, s, l = [],
      o = "",
      a = t.split("/");
  for (a[0] || a.shift(); i = a.shift();) r = i[0], r === "*" ? (l.push("wild"), o += "/(.*)") : r === ":" ? (n = i.indexOf("?", 1), s = i.indexOf(".", 1), l.push(i.substring(1, ~n ? n : ~s ? s : i.length)), o += !!~n && !~s ? "(?:/([^/]+?))?" : "/([^/]+?)", ~s && (o += (~n ? "?" : "") + "\\" + i.substring(s))) : o += "/" + i;
  return {
      keys: l,
      pattern: new RegExp("^" + o + (e ? "(?=$|/)" : "/?$"), "i")
  }
}

function li(t) {
  let e, r, n;
  const i = [t[2]];
  var s = t[0];

  function l(o) {
      let a = {};
      for (let u = 0; u < i.length; u += 1) a = ft(a, i[u]);
      return {
          props: a
      }
  }
  return s && (e = new s(l()), e.$on("routeEvent", t[7])), {
      c() {
          e && ae(e.$$.fragment), r = be()
      },
      m(o, a) {
          e && se(e, o, a), M(o, r, a), n = !0
      },
      p(o, a) {
          const u = a & 4 ? dn(i, [pn(o[2])]) : {};
          if (s !== (s = o[0])) {
              if (e) {
                  G();
                  const c = e;
                  U(c.$$.fragment, 1, 0, () => {
                      le(c, 1)
                  }), Q()
              }
              s ? (e = new s(l()), e.$on("routeEvent", o[7]), ae(e.$$.fragment), N(e.$$.fragment, 1), se(e, r.parentNode, r)) : e = null
          } else s && e.$set(u)
      },
      i(o) {
          n || (e && N(e.$$.fragment, o), n = !0)
      },
      o(o) {
          e && U(e.$$.fragment, o), n = !1
      },
      d(o) {
          o && j(r), e && le(e, o)
      }
  }
}

function ai(t) {
  let e, r, n;
  const i = [{
      params: t[1]
  }, t[2]];
  var s = t[0];

  function l(o) {
      let a = {};
      for (let u = 0; u < i.length; u += 1) a = ft(a, i[u]);
      return {
          props: a
      }
  }
  return s && (e = new s(l()), e.$on("routeEvent", t[6])), {
      c() {
          e && ae(e.$$.fragment), r = be()
      },
      m(o, a) {
          e && se(e, o, a), M(o, r, a), n = !0
      },
      p(o, a) {
          const u = a & 6 ? dn(i, [a & 2 && {
              params: o[1]
          }, a & 4 && pn(o[2])]) : {};
          if (s !== (s = o[0])) {
              if (e) {
                  G();
                  const c = e;
                  U(c.$$.fragment, 1, 0, () => {
                      le(c, 1)
                  }), Q()
              }
              s ? (e = new s(l()), e.$on("routeEvent", o[6]), ae(e.$$.fragment), N(e.$$.fragment, 1), se(e, r.parentNode, r)) : e = null
          } else s && e.$set(u)
      },
      i(o) {
          n || (e && N(e.$$.fragment, o), n = !0)
      },
      o(o) {
          e && U(e.$$.fragment, o), n = !1
      },
      d(o) {
          o && j(r), e && le(e, o)
      }
  }
}

function oi(t) {
  let e, r, n, i;
  const s = [ai, li],
      l = [];

  function o(a, u) {
      return a[1] ? 0 : 1
  }
  return e = o(t), r = l[e] = s[e](t), {
      c() {
          r.c(), n = be()
      },
      m(a, u) {
          l[e].m(a, u), M(a, n, u), i = !0
      },
      p(a, [u]) {
          let c = e;
          e = o(a), e === c ? l[e].p(a, u) : (G(), U(l[c], 1, 1, () => {
              l[c] = null
          }), Q(), r = l[e], r ? r.p(a, u) : (r = l[e] = s[e](a), r.c()), N(r, 1), r.m(n.parentNode, n))
      },
      i(a) {
          i || (N(r), i = !0)
      },
      o(a) {
          U(r), i = !1
      },
      d(a) {
          l[e].d(a), a && j(n)
      }
  }
}

function lr() {
  const t = window.location.href.indexOf("#/");
  let e = t > -1 ? window.location.href.substr(t + 1) : "/";
  const r = e.indexOf("?");
  let n = "";
  return r > -1 && (n = e.substr(r + 1), e = e.substr(0, r)), {
      location: e,
      querystring: n
  }
}
const Jt = mn(null, function(e) {
      e(lr());
      const r = () => {
          e(lr())
      };
      return window.addEventListener("hashchange", r, !1),
          function() {
              window.removeEventListener("hashchange", r, !1)
          }
  }),
  ci = hn(Jt, t => t.location),
  ui = hn(Jt, t => t.querystring),
  ar = ye(void 0);
async function Ye(t) {
  if (!t || t.length < 1 || t.charAt(0) != "/" && t.indexOf("#/") !== 0) throw Error("Invalid parameter location");
  await an(), history.replaceState({ ...history.state,
      __svelte_spa_router_scrollX: window.scrollX,
      __svelte_spa_router_scrollY: window.scrollY
  }, void 0, void 0), window.location.hash = (t.charAt(0) == "#" ? "" : "#") + t
}

function fi(t, e, r) {
  let {
      routes: n = {}
  } = e, {
      prefix: i = ""
  } = e, {
      restoreScrollState: s = !1
  } = e;
  class l {
      constructor(S, x) {
          if (!x || typeof x != "function" && (typeof x != "object" || x._sveltesparouter !== !0)) throw Error("Invalid component object");
          if (!S || typeof S == "string" && (S.length < 1 || S.charAt(0) != "/" && S.charAt(0) != "*") || typeof S == "object" && !(S instanceof RegExp)) throw Error('Invalid value for "path" argument - strings must start with / or *');
          const {
              pattern: L,
              keys: E
          } = si(S);
          this.path = S, typeof x == "object" && x._sveltesparouter === !0 ? (this.component = x.component, this.conditions = x.conditions || [], this.userData = x.userData, this.props = x.props || {}) : (this.component = () => Promise.resolve(x), this.conditions = [], this.props = {}), this._pattern = L, this._keys = E
      }
      match(S) {
          if (i) {
              if (typeof i == "string")
                  if (S.startsWith(i)) S = S.substr(i.length) || "/";
                  else return null;
              else if (i instanceof RegExp) {
                  const D = S.match(i);
                  if (D && D[0]) S = S.substr(D[0].length) || "/";
                  else return null
              }
          }
          const x = this._pattern.exec(S);
          if (x === null) return null;
          if (this._keys === !1) return x;
          const L = {};
          let E = 0;
          for (; E < this._keys.length;) {
              try {
                  L[this._keys[E]] = decodeURIComponent(x[E + 1] || "") || null
              } catch {
                  L[this._keys[E]] = null
              }
              E++
          }
          return L
      }
      async checkConditions(S) {
          for (let x = 0; x < this.conditions.length; x++)
              if (!await this.conditions[x](S)) return !1;
          return !0
      }
  }
  const o = [];
  n instanceof Map ? n.forEach((v, S) => {
      o.push(new l(S, v))
  }) : Object.keys(n).forEach(v => {
      o.push(new l(v, n[v]))
  });
  let a = null,
      u = null,
      c = {};
  const d = Zn();
  async function p(v, S) {
      await an(), d(v, S)
  }
  let _ = null,
      m = null;
  s && (m = v => {
      v.state && v.state.__svelte_spa_router_scrollY ? _ = v.state : _ = null
  }, window.addEventListener("popstate", m), Qn(() => {
      _ ? window.scrollTo(_.__svelte_spa_router_scrollX, _.__svelte_spa_router_scrollY) : window.scrollTo(0, 0)
  }));
  let b = null,
      g = null;
  const k = Jt.subscribe(async v => {
      b = v;
      let S = 0;
      for (; S < o.length;) {
          const x = o[S].match(v.location);
          if (!x) {
              S++;
              continue
          }
          const L = {
              route: o[S].path,
              location: v.location,
              querystring: v.querystring,
              userData: o[S].userData,
              params: x && typeof x == "object" && Object.keys(x).length ? x : null
          };
          if (!await o[S].checkConditions(L)) {
              r(0, a = null), g = null, p("conditionsFailed", L);
              return
          }
          p("routeLoading", Object.assign({}, L));
          const E = o[S].component;
          if (g != E) {
              E.loading ? (r(0, a = E.loading), g = E, r(1, u = E.loadingParams), r(2, c = {}), p("routeLoaded", Object.assign({}, L, {
                  component: a,
                  name: a.name,
                  params: u
              }))) : (r(0, a = null), g = null);
              const D = await E();
              if (v != b) return;
              r(0, a = D && D.default || D), g = E
          }
          x && typeof x == "object" && Object.keys(x).length ? r(1, u = x) : r(1, u = null), r(2, c = o[S].props), p("routeLoaded", Object.assign({}, L, {
              component: a,
              name: a.name,
              params: u
          })).then(() => {
              ar.set(u)
          });
          return
      }
      r(0, a = null), g = null, ar.set(void 0)
  });
  Ht(() => {
      k(), m && window.removeEventListener("popstate", m)
  });

  function y(v) {
      $t.call(this, t, v)
  }

  function A(v) {
      $t.call(this, t, v)
  }
  return t.$$set = v => {
      "routes" in v && r(3, n = v.routes), "prefix" in v && r(4, i = v.prefix), "restoreScrollState" in v && r(5, s = v.restoreScrollState)
  }, t.$$.update = () => {
      t.$$.dirty & 32 && (history.scrollRestoration = s ? "manual" : "auto")
  }, [a, u, c, n, i, s, y, A]
}
class di extends de {
  constructor(e) {
      super(), fe(this, e, fi, oi, ne, {
          routes: 3,
          prefix: 4,
          restoreScrollState: 5
      })
  }
}

function gn(t) {
  const e = t - 1;
  return e * e * e + 1
}

function Xe(t, {
  delay: e = 0,
  duration: r = 400,
  easing: n = It
} = {}) {
  const i = +getComputedStyle(t).opacity;
  return {
      delay: e,
      duration: r,
      easing: n,
      css: s => `opacity: ${s*i}`
  }
}

function he(t, {
  delay: e = 0,
  duration: r = 400,
  easing: n = gn,
  x: i = 0,
  y: s = 0,
  opacity: l = 0
} = {}) {
  const o = getComputedStyle(t),
      a = +o.opacity,
      u = o.transform === "none" ? "" : o.transform,
      c = a * (1 - l);
  return {
      delay: e,
      duration: r,
      easing: n,
      css: (d, p) => `
    transform: ${u} translate(${(1-d)*i}px, ${(1-d)*s}px);
    opacity: ${a-c*p}`
  }
}

function or(t, {
  delay: e = 0,
  duration: r = 400,
  easing: n = gn,
  start: i = 0,
  opacity: s = 0
} = {}) {
  const l = getComputedStyle(t),
      o = +l.opacity,
      a = l.transform === "none" ? "" : l.transform,
      u = 1 - i,
      c = o * (1 - s);
  return {
      delay: e,
      duration: r,
      easing: n,
      css: (d, p) => `
    transform: ${a} scale(${1-u*p});
    opacity: ${o-c*p}
  `
  }
}
var Wt = {
      exports: {}
  },
  bn = function(e, r) {
      return function() {
          for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
          return e.apply(r, i)
      }
  },
  pi = bn,
  Kt = Object.prototype.toString,
  Yt = function(t) {
      return function(e) {
          var r = Kt.call(e);
          return t[r] || (t[r] = r.slice(8, -1).toLowerCase())
      }
  }(Object.create(null));

function Ae(t) {
  return t = t.toLowerCase(),
      function(r) {
          return Yt(r) === t
      }
}

function Xt(t) {
  return Array.isArray(t)
}

function mt(t) {
  return typeof t == "undefined"
}

function mi(t) {
  return t !== null && !mt(t) && t.constructor !== null && !mt(t.constructor) && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t)
}
var _n = Ae("ArrayBuffer");

function hi(t) {
  var e;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && _n(t.buffer), e
}

function gi(t) {
  return typeof t == "string"
}

function bi(t) {
  return typeof t == "number"
}

function wn(t) {
  return t !== null && typeof t == "object"
}

function at(t) {
  if (Yt(t) !== "object") return !1;
  var e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype
}
var _i = Ae("Date"),
  wi = Ae("File"),
  yi = Ae("Blob"),
  vi = Ae("FileList");

function Gt(t) {
  return Kt.call(t) === "[object Function]"
}

function ki(t) {
  return wn(t) && Gt(t.pipe)
}

function xi(t) {
  var e = "[object FormData]";
  return t && (typeof FormData == "function" && t instanceof FormData || Kt.call(t) === e || Gt(t.toString) && t.toString() === e)
}
var Ei = Ae("URLSearchParams");

function Si(t) {
  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
}

function Ci() {
  return typeof navigator != "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS") ? !1 : typeof window != "undefined" && typeof document != "undefined"
}

function Qt(t, e) {
  if (!(t === null || typeof t == "undefined"))
      if (typeof t != "object" && (t = [t]), Xt(t))
          for (var r = 0, n = t.length; r < n; r++) e.call(null, t[r], r, t);
      else
          for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.call(null, t[i], i, t)
}

function Mt() {
  var t = {};

  function e(i, s) {
      at(t[s]) && at(i) ? t[s] = Mt(t[s], i) : at(i) ? t[s] = Mt({}, i) : Xt(i) ? t[s] = i.slice() : t[s] = i
  }
  for (var r = 0, n = arguments.length; r < n; r++) Qt(arguments[r], e);
  return t
}

function Oi(t, e, r) {
  return Qt(e, function(i, s) {
      r && typeof i == "function" ? t[s] = pi(i, r) : t[s] = i
  }), t
}

function Ri(t) {
  return t.charCodeAt(0) === 65279 && (t = t.slice(1)), t
}

function Ai(t, e, r, n) {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, r && Object.assign(t.prototype, r)
}

function Pi(t, e, r) {
  var n, i, s, l = {};
  e = e || {};
  do {
      for (n = Object.getOwnPropertyNames(t), i = n.length; i-- > 0;) s = n[i], l[s] || (e[s] = t[s], l[s] = !0);
      t = Object.getPrototypeOf(t)
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e
}

function Ti(t, e, r) {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  var n = t.indexOf(e, r);
  return n !== -1 && n === r
}

function Li(t) {
  if (!t) return null;
  var e = t.length;
  if (mt(e)) return null;
  for (var r = new Array(e); e-- > 0;) r[e] = t[e];
  return r
}
var $i = function(t) {
      return function(e) {
          return t && e instanceof t
      }
  }(typeof Uint8Array != "undefined" && Object.getPrototypeOf(Uint8Array)),
  ie = {
      isArray: Xt,
      isArrayBuffer: _n,
      isBuffer: mi,
      isFormData: xi,
      isArrayBufferView: hi,
      isString: gi,
      isNumber: bi,
      isObject: wn,
      isPlainObject: at,
      isUndefined: mt,
      isDate: _i,
      isFile: wi,
      isBlob: yi,
      isFunction: Gt,
      isStream: ki,
      isURLSearchParams: Ei,
      isStandardBrowserEnv: Ci,
      forEach: Qt,
      merge: Mt,
      extend: Oi,
      trim: Si,
      stripBOM: Ri,
      inherits: Ai,
      toFlatObject: Pi,
      kindOf: Yt,
      kindOfTest: Ae,
      endsWith: Ti,
      toArray: Li,
      isTypedArray: $i,
      isFileList: vi
  },
  Te = ie;

function cr(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}
var yn = function(e, r, n) {
      if (!r) return e;
      var i;
      if (n) i = n(r);
      else if (Te.isURLSearchParams(r)) i = r.toString();
      else {
          var s = [];
          Te.forEach(r, function(a, u) {
              a === null || typeof a == "undefined" || (Te.isArray(a) ? u = u + "[]" : a = [a], Te.forEach(a, function(d) {
                  Te.isDate(d) ? d = d.toISOString() : Te.isObject(d) && (d = JSON.stringify(d)), s.push(cr(u) + "=" + cr(d))
              }))
          }), i = s.join("&")
      }
      if (i) {
          var l = e.indexOf("#");
          l !== -1 && (e = e.slice(0, l)), e += (e.indexOf("?") === -1 ? "?" : "&") + i
      }
      return e
  },
  Ni = ie;

function gt() {
  this.handlers = []
}
gt.prototype.use = function(e, r, n) {
  return this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
  }), this.handlers.length - 1
};
gt.prototype.eject = function(e) {
  this.handlers[e] && (this.handlers[e] = null)
};
gt.prototype.forEach = function(e) {
  Ni.forEach(this.handlers, function(n) {
      n !== null && e(n)
  })
};
var ji = gt,
  Mi = ie,
  Di = function(e, r) {
      Mi.forEach(e, function(i, s) {
          s !== r && s.toUpperCase() === r.toUpperCase() && (e[r] = i, delete e[s])
      })
  },
  vn = ie;

function De(t, e, r, n, i) {
  Error.call(this), this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), i && (this.response = i)
}
vn.inherits(De, Error, {
  toJSON: function() {
      return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
      }
  }
});
var kn = De.prototype,
  xn = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach(function(t) {
  xn[t] = {
      value: t
  }
});
Object.defineProperties(De, xn);
Object.defineProperty(kn, "isAxiosError", {
  value: !0
});
De.from = function(t, e, r, n, i, s) {
  var l = Object.create(kn);
  return vn.toFlatObject(t, l, function(a) {
      return a !== Error.prototype
  }), De.call(l, t.message, e, r, n, i), l.name = t.name, s && Object.assign(l, s), l
};
var Fe = De,
  En = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1
  },
  ge = ie;

function zi(t, e) {
  e = e || new FormData;
  var r = [];

  function n(s) {
      return s === null ? "" : ge.isDate(s) ? s.toISOString() : ge.isArrayBuffer(s) || ge.isTypedArray(s) ? typeof Blob == "function" ? new Blob([s]) : Buffer.from(s) : s
  }

  function i(s, l) {
      if (ge.isPlainObject(s) || ge.isArray(s)) {
          if (r.indexOf(s) !== -1) throw Error("Circular reference detected in " + l);
          r.push(s), ge.forEach(s, function(a, u) {
              if (!ge.isUndefined(a)) {
                  var c = l ? l + "." + u : u,
                      d;
                  if (a && !l && typeof a == "object") {
                      if (ge.endsWith(u, "{}")) a = JSON.stringify(a);
                      else if (ge.endsWith(u, "[]") && (d = ge.toArray(a))) {
                          d.forEach(function(p) {
                              !ge.isUndefined(p) && e.append(c, n(p))
                          });
                          return
                      }
                  }
                  i(a, c)
              }
          }), r.pop()
      } else e.append(l, n(s))
  }
  return i(t), e
}
var Sn = zi,
  St = Fe,
  Bi = function(e, r, n) {
      var i = n.config.validateStatus;
      !n.status || !i || i(n.status) ? e(n) : r(new St("Request failed with status code " + n.status, [St.ERR_BAD_REQUEST, St.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
  },
  it = ie,
  Ui = it.isStandardBrowserEnv() ? function() {
      return {
          write: function(r, n, i, s, l, o) {
              var a = [];
              a.push(r + "=" + encodeURIComponent(n)), it.isNumber(i) && a.push("expires=" + new Date(i).toGMTString()), it.isString(s) && a.push("path=" + s), it.isString(l) && a.push("domain=" + l), o === !0 && a.push("secure"), document.cookie = a.join("; ")
          },
          read: function(r) {
              var n = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
              return n ? decodeURIComponent(n[3]) : null
          },
          remove: function(r) {
              this.write(r, "", Date.now() - 864e5)
          }
      }
  }() : function() {
      return {
          write: function() {},
          read: function() {
              return null
          },
          remove: function() {}
      }
  }(),
  Ii = function(e) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
  },
  Fi = function(e, r) {
      return r ? e.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : e
  },
  qi = Ii,
  Hi = Fi,
  Cn = function(e, r) {
      return e && !qi(r) ? Hi(e, r) : r
  },
  Ct = ie,
  Vi = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],
  Ji = function(e) {
      var r = {},
          n, i, s;
      return e && Ct.forEach(e.split(`
`), function(o) {
          if (s = o.indexOf(":"), n = Ct.trim(o.substr(0, s)).toLowerCase(), i = Ct.trim(o.substr(s + 1)), n) {
              if (r[n] && Vi.indexOf(n) >= 0) return;
              n === "set-cookie" ? r[n] = (r[n] ? r[n] : []).concat([i]) : r[n] = r[n] ? r[n] + ", " + i : i
          }
      }), r
  },
  ur = ie,
  Wi = ur.isStandardBrowserEnv() ? function() {
      var e = /(msie|trident)/i.test(navigator.userAgent),
          r = document.createElement("a"),
          n;

      function i(s) {
          var l = s;
          return e && (r.setAttribute("href", l), l = r.href), r.setAttribute("href", l), {
              href: r.href,
              protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
              host: r.host,
              search: r.search ? r.search.replace(/^\?/, "") : "",
              hash: r.hash ? r.hash.replace(/^#/, "") : "",
              hostname: r.hostname,
              port: r.port,
              pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
          }
      }
      return n = i(window.location.href),
          function(l) {
              var o = ur.isString(l) ? i(l) : l;
              return o.protocol === n.protocol && o.host === n.host
          }
  }() : function() {
      return function() {
          return !0
      }
  }(),
  Dt = Fe,
  Ki = ie;

function On(t) {
  Dt.call(this, t == null ? "canceled" : t, Dt.ERR_CANCELED), this.name = "CanceledError"
}
Ki.inherits(On, Dt, {
  __CANCEL__: !0
});
var bt = On,
  Yi = function(e) {
      var r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
      return r && r[1] || ""
  },
  He = ie,
  Xi = Bi,
  Gi = Ui,
  Qi = yn,
  Zi = Cn,
  es = Ji,
  ts = Wi,
  rs = En,
  ve = Fe,
  ns = bt,
  is = Yi,
  fr = function(e) {
      return new Promise(function(n, i) {
          var s = e.data,
              l = e.headers,
              o = e.responseType,
              a;

          function u() {
              e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a)
          }
          He.isFormData(s) && He.isStandardBrowserEnv() && delete l["Content-Type"];
          var c = new XMLHttpRequest;
          if (e.auth) {
              var d = e.auth.username || "",
                  p = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
              l.Authorization = "Basic " + btoa(d + ":" + p)
          }
          var _ = Zi(e.baseURL, e.url);
          c.open(e.method.toUpperCase(), Qi(_, e.params, e.paramsSerializer), !0), c.timeout = e.timeout;

          function m() {
              if (!!c) {
                  var k = "getAllResponseHeaders" in c ? es(c.getAllResponseHeaders()) : null,
                      y = !o || o === "text" || o === "json" ? c.responseText : c.response,
                      A = {
                          data: y,
                          status: c.status,
                          statusText: c.statusText,
                          headers: k,
                          config: e,
                          request: c
                      };
                  Xi(function(S) {
                      n(S), u()
                  }, function(S) {
                      i(S), u()
                  }, A), c = null
              }
          }
          if ("onloadend" in c ? c.onloadend = m : c.onreadystatechange = function() {
                  !c || c.readyState !== 4 || c.status === 0 && !(c.responseURL && c.responseURL.indexOf("file:") === 0) || setTimeout(m)
              }, c.onabort = function() {
                  !c || (i(new ve("Request aborted", ve.ECONNABORTED, e, c)), c = null)
              }, c.onerror = function() {
                  i(new ve("Network Error", ve.ERR_NETWORK, e, c, c)), c = null
              }, c.ontimeout = function() {
                  var y = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded",
                      A = e.transitional || rs;
                  e.timeoutErrorMessage && (y = e.timeoutErrorMessage), i(new ve(y, A.clarifyTimeoutError ? ve.ETIMEDOUT : ve.ECONNABORTED, e, c)), c = null
              }, He.isStandardBrowserEnv()) {
              var b = (e.withCredentials || ts(_)) && e.xsrfCookieName ? Gi.read(e.xsrfCookieName) : void 0;
              b && (l[e.xsrfHeaderName] = b)
          }
          "setRequestHeader" in c && He.forEach(l, function(y, A) {
              typeof s == "undefined" && A.toLowerCase() === "content-type" ? delete l[A] : c.setRequestHeader(A, y)
          }), He.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials), o && o !== "json" && (c.responseType = e.responseType), typeof e.onDownloadProgress == "function" && c.addEventListener("progress", e.onDownloadProgress), typeof e.onUploadProgress == "function" && c.upload && c.upload.addEventListener("progress", e.onUploadProgress), (e.cancelToken || e.signal) && (a = function(k) {
              !c || (i(!k || k && k.type ? new ns : k), c.abort(), c = null)
          }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a))), s || (s = null);
          var g = is(_);
          if (g && ["http", "https", "file"].indexOf(g) === -1) {
              i(new ve("Unsupported protocol " + g + ":", ve.ERR_BAD_REQUEST, e));
              return
          }
          c.send(s)
      })
  },
  ss = null,
  Z = ie,
  dr = Di,
  pr = Fe,
  ls = En,
  as = Sn,
  os = {
      "Content-Type": "application/x-www-form-urlencoded"
  };

function mr(t, e) {
  !Z.isUndefined(t) && Z.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e)
}

function cs() {
  var t;
  return (typeof XMLHttpRequest != "undefined" || typeof process != "undefined" && Object.prototype.toString.call(process) === "[object process]") && (t = fr), t
}

function us(t, e, r) {
  if (Z.isString(t)) try {
      return (e || JSON.parse)(t), Z.trim(t)
  } catch (n) {
      if (n.name !== "SyntaxError") throw n
  }
  return (r || JSON.stringify)(t)
}
var _t = {
  transitional: ls,
  adapter: cs(),
  transformRequest: [function(e, r) {
      if (dr(r, "Accept"), dr(r, "Content-Type"), Z.isFormData(e) || Z.isArrayBuffer(e) || Z.isBuffer(e) || Z.isStream(e) || Z.isFile(e) || Z.isBlob(e)) return e;
      if (Z.isArrayBufferView(e)) return e.buffer;
      if (Z.isURLSearchParams(e)) return mr(r, "application/x-www-form-urlencoded;charset=utf-8"), e.toString();
      var n = Z.isObject(e),
          i = r && r["Content-Type"],
          s;
      if ((s = Z.isFileList(e)) || n && i === "multipart/form-data") {
          var l = this.env && this.env.FormData;
          return as(s ? {
              "files[]": e
          } : e, l && new l)
      } else if (n || i === "application/json") return mr(r, "application/json"), us(e);
      return e
  }],
  transformResponse: [function(e) {
      var r = this.transitional || _t.transitional,
          n = r && r.silentJSONParsing,
          i = r && r.forcedJSONParsing,
          s = !n && this.responseType === "json";
      if (s || i && Z.isString(e) && e.length) try {
          return JSON.parse(e)
      } catch (l) {
          if (s) throw l.name === "SyntaxError" ? pr.from(l, pr.ERR_BAD_RESPONSE, this, null, this.response) : l
      }
      return e
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
      FormData: ss
  },
  validateStatus: function(e) {
      return e >= 200 && e < 300
  },
  headers: {
      common: {
          Accept: "application/json, text/plain, */*"
      }
  }
};
Z.forEach(["delete", "get", "head"], function(e) {
  _t.headers[e] = {}
});
Z.forEach(["post", "put", "patch"], function(e) {
  _t.headers[e] = Z.merge(os)
});
var Zt = _t,
  fs = ie,
  ds = Zt,
  ps = function(e, r, n) {
      var i = this || ds;
      return fs.forEach(n, function(l) {
          e = l.call(i, e, r)
      }), e
  },
  Rn = function(e) {
      return !!(e && e.__CANCEL__)
  },
  hr = ie,
  Ot = ps,
  ms = Rn,
  hs = Zt,
  gs = bt;

function Rt(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted) throw new gs
}
var bs = function(e) {
      Rt(e), e.headers = e.headers || {}, e.data = Ot.call(e, e.data, e.headers, e.transformRequest), e.headers = hr.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), hr.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(i) {
          delete e.headers[i]
      });
      var r = e.adapter || hs.adapter;
      return r(e).then(function(i) {
          return Rt(e), i.data = Ot.call(e, i.data, i.headers, e.transformResponse), i
      }, function(i) {
          return ms(i) || (Rt(e), i && i.response && (i.response.data = Ot.call(e, i.response.data, i.response.headers, e.transformResponse))), Promise.reject(i)
      })
  },
  ue = ie,
  An = function(e, r) {
      r = r || {};
      var n = {};

      function i(c, d) {
          return ue.isPlainObject(c) && ue.isPlainObject(d) ? ue.merge(c, d) : ue.isPlainObject(d) ? ue.merge({}, d) : ue.isArray(d) ? d.slice() : d
      }

      function s(c) {
          if (ue.isUndefined(r[c])) {
              if (!ue.isUndefined(e[c])) return i(void 0, e[c])
          } else return i(e[c], r[c])
      }

      function l(c) {
          if (!ue.isUndefined(r[c])) return i(void 0, r[c])
      }

      function o(c) {
          if (ue.isUndefined(r[c])) {
              if (!ue.isUndefined(e[c])) return i(void 0, e[c])
          } else return i(void 0, r[c])
      }

      function a(c) {
          if (c in r) return i(e[c], r[c]);
          if (c in e) return i(void 0, e[c])
      }
      var u = {
          url: l,
          method: l,
          data: l,
          baseURL: o,
          transformRequest: o,
          transformResponse: o,
          paramsSerializer: o,
          timeout: o,
          timeoutMessage: o,
          withCredentials: o,
          adapter: o,
          responseType: o,
          xsrfCookieName: o,
          xsrfHeaderName: o,
          onUploadProgress: o,
          onDownloadProgress: o,
          decompress: o,
          maxContentLength: o,
          maxBodyLength: o,
          beforeRedirect: o,
          transport: o,
          httpAgent: o,
          httpsAgent: o,
          cancelToken: o,
          socketPath: o,
          responseEncoding: o,
          validateStatus: a
      };
      return ue.forEach(Object.keys(e).concat(Object.keys(r)), function(d) {
          var p = u[d] || s,
              _ = p(d);
          ue.isUndefined(_) && p !== a || (n[d] = _)
      }), n
  },
  Pn = {
      version: "0.27.2"
  },
  _s = Pn.version,
  Se = Fe,
  er = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(t, e) {
  er[t] = function(n) {
      return typeof n === t || "a" + (e < 1 ? "n " : " ") + t
  }
});
var gr = {};
er.transitional = function(e, r, n) {
  function i(s, l) {
      return "[Axios v" + _s + "] Transitional option '" + s + "'" + l + (n ? ". " + n : "")
  }
  return function(s, l, o) {
      if (e === !1) throw new Se(i(l, " has been removed" + (r ? " in " + r : "")), Se.ERR_DEPRECATED);
      return r && !gr[l] && (gr[l] = !0, console.warn(i(l, " has been deprecated since v" + r + " and will be removed in the near future"))), e ? e(s, l, o) : !0
  }
};

function ws(t, e, r) {
  if (typeof t != "object") throw new Se("options must be an object", Se.ERR_BAD_OPTION_VALUE);
  for (var n = Object.keys(t), i = n.length; i-- > 0;) {
      var s = n[i],
          l = e[s];
      if (l) {
          var o = t[s],
              a = o === void 0 || l(o, s, t);
          if (a !== !0) throw new Se("option " + s + " must be " + a, Se.ERR_BAD_OPTION_VALUE);
          continue
      }
      if (r !== !0) throw new Se("Unknown option " + s, Se.ERR_BAD_OPTION)
  }
}
var ys = {
      assertOptions: ws,
      validators: er
  },
  Tn = ie,
  vs = yn,
  br = ji,
  _r = bs,
  wt = An,
  ks = Cn,
  Ln = ys,
  Le = Ln.validators;

function ze(t) {
  this.defaults = t, this.interceptors = {
      request: new br,
      response: new br
  }
}
ze.prototype.request = function(e, r) {
  typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = wt(this.defaults, r), r.method ? r.method = r.method.toLowerCase() : this.defaults.method ? r.method = this.defaults.method.toLowerCase() : r.method = "get";
  var n = r.transitional;
  n !== void 0 && Ln.assertOptions(n, {
      silentJSONParsing: Le.transitional(Le.boolean),
      forcedJSONParsing: Le.transitional(Le.boolean),
      clarifyTimeoutError: Le.transitional(Le.boolean)
  }, !1);
  var i = [],
      s = !0;
  this.interceptors.request.forEach(function(_) {
      typeof _.runWhen == "function" && _.runWhen(r) === !1 || (s = s && _.synchronous, i.unshift(_.fulfilled, _.rejected))
  });
  var l = [];
  this.interceptors.response.forEach(function(_) {
      l.push(_.fulfilled, _.rejected)
  });
  var o;
  if (!s) {
      var a = [_r, void 0];
      for (Array.prototype.unshift.apply(a, i), a = a.concat(l), o = Promise.resolve(r); a.length;) o = o.then(a.shift(), a.shift());
      return o
  }
  for (var u = r; i.length;) {
      var c = i.shift(),
          d = i.shift();
      try {
          u = c(u)
      } catch (p) {
          d(p);
          break
      }
  }
  try {
      o = _r(u)
  } catch (p) {
      return Promise.reject(p)
  }
  for (; l.length;) o = o.then(l.shift(), l.shift());
  return o
};
ze.prototype.getUri = function(e) {
  e = wt(this.defaults, e);
  var r = ks(e.baseURL, e.url);
  return vs(r, e.params, e.paramsSerializer)
};
Tn.forEach(["delete", "get", "head", "options"], function(e) {
  ze.prototype[e] = function(r, n) {
      return this.request(wt(n || {}, {
          method: e,
          url: r,
          data: (n || {}).data
      }))
  }
});
Tn.forEach(["post", "put", "patch"], function(e) {
  function r(n) {
      return function(s, l, o) {
          return this.request(wt(o || {}, {
              method: e,
              headers: n ? {
                  "Content-Type": "multipart/form-data"
              } : {},
              url: s,
              data: l
          }))
      }
  }
  ze.prototype[e] = r(), ze.prototype[e + "Form"] = r(!0)
});
var xs = ze,
  Es = bt;

function Be(t) {
  if (typeof t != "function") throw new TypeError("executor must be a function.");
  var e;
  this.promise = new Promise(function(i) {
      e = i
  });
  var r = this;
  this.promise.then(function(n) {
      if (!!r._listeners) {
          var i, s = r._listeners.length;
          for (i = 0; i < s; i++) r._listeners[i](n);
          r._listeners = null
      }
  }), this.promise.then = function(n) {
      var i, s = new Promise(function(l) {
          r.subscribe(l), i = l
      }).then(n);
      return s.cancel = function() {
          r.unsubscribe(i)
      }, s
  }, t(function(i) {
      r.reason || (r.reason = new Es(i), e(r.reason))
  })
}
Be.prototype.throwIfRequested = function() {
  if (this.reason) throw this.reason
};
Be.prototype.subscribe = function(e) {
  if (this.reason) {
      e(this.reason);
      return
  }
  this._listeners ? this._listeners.push(e) : this._listeners = [e]
};
Be.prototype.unsubscribe = function(e) {
  if (!!this._listeners) {
      var r = this._listeners.indexOf(e);
      r !== -1 && this._listeners.splice(r, 1)
  }
};
Be.source = function() {
  var e, r = new Be(function(i) {
      e = i
  });
  return {
      token: r,
      cancel: e
  }
};
var Ss = Be,
  Cs = function(e) {
      return function(n) {
          return e.apply(null, n)
      }
  },
  Os = ie,
  Rs = function(e) {
      return Os.isObject(e) && e.isAxiosError === !0
  },
  wr = ie,
  As = bn,
  ot = xs,
  Ps = An,
  Ts = Zt;

function $n(t) {
  var e = new ot(t),
      r = As(ot.prototype.request, e);
  return wr.extend(r, ot.prototype, e), wr.extend(r, e), r.create = function(i) {
      return $n(Ps(t, i))
  }, r
}
var ce = $n(Ts);
ce.Axios = ot;
ce.CanceledError = bt;
ce.CancelToken = Ss;
ce.isCancel = Rn;
ce.VERSION = Pn.version;
ce.toFormData = Sn;
ce.AxiosError = Fe;
ce.Cancel = ce.CanceledError;
ce.all = function(e) {
  return Promise.all(e)
};
ce.spread = Cs;
ce.isAxiosError = Rs;
Wt.exports = ce;
Wt.exports.default = ce;
var Ls = Wt.exports;

function $s(t) {
  let e = t.length,
      r;
  for (; e != 0;) r = Math.floor(Math.random() * e), e--, [t[e], t[r]] = [t[r], t[e]];
  return t
}

function yt(t) {
  return new Promise(e => setTimeout(e, t))
}

function Ns(t, e, r) {
  return r.indexOf(t) == e
}
let At = !1;
async function yr(t) {
  for (; At;) await yt(50);
  try {
      At = !0, await t()
  } finally {
      At = !1
  }
}
const zt = ye(),
  J = ye(),
  Je = ye(),
  Re = ye(),
  Oe = ye(),
  ct = ye(!1);

function et(t, e = "[]", r = !0) {
  var i;
  const n = ye(JSON.parse((i = localStorage.getItem(t)) != null ? i : e));
  return r && n.subscribe(s => localStorage.setItem(t, JSON.stringify(s))), n.save = function(s) {
      localStorage.setItem(t, JSON.stringify(s != null ? s : we(this)))
  }, n
}
async function je(t) {
  for (; we(ct);) await yt(50);
  ct.set(!0);
  try {
      t instanceof Promise ? await t : await t()
  } finally {
      ct.set(!1)
  }
}
const Ge = et("isMuted", !1),
  Bt = et("volume", 50),
  Ce = et("lastPlayed", '"migrated"', !1),
  pe = et("likes", '"migrated"', !1),
  _e = et("playlists", '"migrated"', !1),
  X = Ls.create({
      baseURL: "http://131.196.197.2:3000/client",
      headers: {}
  });
async function js([t, e]) {
  X.defaults.headers.authorization = t, X.defaults.headers["x-player-id"] = e
}

function Ms(t) {
  return me(() => X.post("playlists", t))
}

function Ds(t) {
  return me(() => X.delete(`playlists/${t}`))
}

function zs(t) {
  return we(pe).includes(t)
}

function Nn(t) {
  return tr(t, !zs(t))
}

function tr(t, e = !0) {
  var n;
  const r = `likes/${t}`;
  return e ? (pe.update(i => [t, ...i].filter(Ns)), X.post(r)) : (!e && ((n = we(Re)) == null ? void 0 : n.type) === "LIKES" && Re.update(i => (i.songs = i.songs.filter(s => s != t), i)), pe.update(i => i.filter(s => s != t)), X.delete(r))
}

function vt(t, e) {
  return me(() => X.post("history", {
      type: t,
      id: e
  })).then(r => (Ce.set(r.data.last_played), r))
}

function Bs(t, e) {
  Ce.update(r => {
      const n = r.filter(i => i.type != t || i.id != e);
      return Us(n), n
  })
}

function Us(t) {
  return Ce.set(t), me(() => X.put("history", {
      last_played: t
  }))
}

function Is(t) {
  return X.get("search", {
      params: {
          title: t
      }
  })
}
const Pt = {};
async function jn(t) {
  if (t.length) {
      if (t.every(e => e in Pt)) {
          const e = t.map(r => Pt[r]);
          return {
              status: 200,
              data: e
          }
      }
  } else return {
      status: 200,
      data: []
  };
  return X.get("playlist", {
      params: {
          songs: t.join(",")
      }
  }).then(e => (e.data.forEach(r => Pt[r._id] = r), e))
}

function vr(t, e = 0) {
  const r = t.songs.slice(e, e + 30);
  return jn(r).then(n => {
      const i = n.data.map(l => l._id),
          s = r.filter(l => !i.includes(l));
      return s.length > 0 && (t.songs = t.songs.filter(l => !s.includes(l)), s.forEach(l => tr(l, !1))), n
  })
}

function Fs(t) {
  return X.post("download", {
      songs: t
  })
}

function qs(t) {
  return typeof t == "object" && (t = t._id), X.post(t + "/download")
}
async function me(t, e = 3) {
  for (let r = 0; r < e; r += 1) try {
      return await t()
  } catch {
      await yt(3e3)
  }
  throw new Error(`Attempt to request ${e} times, but none succeeded`)
}
const Ue = {},
  kt = ye({
      x: 0,
      y: 0,
      z: 0,
      interior: 0
  });
let Mn = .5;
const Dn = [0, 0];
K("getBaseVolume").then(t => {
  Mn = t
});
let ut;

function zn(t) {
  ut = t
}
let Ut = 0;
async function tt(t = [], e = !1) {
  if (t.length === 0) return Oe.set("N\xE3o \xE9 poss\xEDvel tocar uma playlist vazia.");
  const r = {};
  await Fs(t.slice(0, 2)).then(o => {
      Object.assign(r, Object.fromEntries(o.data.map(a => [a._id, a])))
  }), Ge.set(!1);
  let n = t.shift();
  e && t.push(n);
  const i = we(J);
  let s = !1;
  const l = r[n];
  if (i != null && await K("server", "next", l.url)) s = i.bluetooth;
  else {
      const o = await K("getVehicle"),
          {
              mode: a,
              error: u
          } = await K("server", "play", o, l.url, we(Bt) / 100);
      if (u) return Oe.set(u);
      s = a === "bluetooth"
  }
  J.set({ ...l,
      bluetooth: s,
      played_at: Ie(),
      paused_at: void 0
  }), zt.set(), zn(o => {
      if (o === Ut) {
          if (n = t.shift(), e) t.push(n);
          else if (!n) {
              Ut = 0, J.set();
              return
          }
          const a = r[n];
          t[0] && me(() => qs(t[0])).then(({
              data: c
          }) => {
              r[c._id] = c
          });
          const u = we(J);
          K("server", "next", a.url).then(c => {
              !c || J.set({ ...a,
                  bluetooth: u.bluetooth,
                  played_at: Ie()
              })
          })
      }
  })
}

function Bn(t) {
  const e = we(kt),
      r = Math.sqrt((e.x - t.x) ** 2 + (e.y - t.y) ** 2 + (e.z - t.z) ** 2);
  let n = t.inWater ? t.range / 4 : t.range;
  if (t.interior != e.interior && (n /= 3), r >= n || e.interior === "blocked" || t.paused_at || we(Ge)) return t.audio.pause();
  t.audio.paused && (t.audio.play(), t.audio.currentTime = (Ie() - t.created_at) / 1e3);
  let i = Math.min(1, Math.max(0, (1 - r / n) * 1.25));
  t.inWater && (i /= 8), t.interior != e.interior && (i /= 8), t.audio.volume = i * Mn * Math.min(1, t.volume)
}

function Hs() {
  Object.values(Ue).forEach(Bn)
}

function Vs(t) {
  const e = Ue[t.id];
  if (e) return Object.assign(e, t);
  t.isCurrent && (Ut = t.id), t.audio = new Audio(t.url), t.audio.addEventListener("ended", () => ut == null ? void 0 : ut(t.id), {
      once: !0
  }), Bn(t), Ue[t.id] = t
}

function Js(t) {
  Ge.set(t)
}

function Ws() {
  J.set()
}

function Ks(t) {
  const e = Ue[t];
  e && (e.audio.pause(), delete Ue[t])
}

function Ys(t, e) {
  const r = Ue[t];
  r && Object.assign(r, e)
}

function Xs(t, e, r, n) {
  kt.update(i => Object.assign(i, {
      x: t,
      y: e,
      z: r,
      interior: n
  }))
}
K("server", "getTimer").then(t => {
  Object.assign(Dn, [t, Date.now()])
});

function Ie() {
  const [t, e] = Dn;
  return t + (Date.now() - e)
}

function Gs() {
  Oe.set("Emparelhamento encerrado: dispositivo fora de alcance."), J.set()
}

function Qs() {
  we(J) && (K("server", "stop"), J.set())
}
var Zs = Object.freeze(Object.defineProperty({
  __proto__: null,
  player: kt,
  onSongEnd: zn,
  startQueue: tt,
  refresh: Hs,
  setSound: Vs,
  toggleMute: Js,
  clearCurrent: Ws,
  removeSound: Ks,
  updateSound: Ys,
  setPosition: Xs,
  getGameTimer: Ie,
  onMaxDistance: Gs,
  onPlayerDie: Qs
}, Symbol.toStringTag, {
  value: "Module"
}));

function K(t, ...e) {
  var n;
  const r = (n = window.GetParentResourceName) == null ? void 0 : n.call(window);
  return fetch(`http://${r}/${t}`, {
      method: "POST",
      body: JSON.stringify(e)
  }).then(i => i.json())
}
const Qe = {};
Object.assign(Qe, Zs);
window.onmessage = ({
  data: t
}) => {
  if (!Array.isArray(t)) return;
  const e = t.shift();
  e in Qe && Qe[e](...t)
};

function el(t) {
  let e, r, n;
  return {
      c() {
          e = w("div"), r = w("i"), h(r, "class", "fas fa-heart"), h(e, "class", n = "w-12 h-12 bg-gradient-to-br " + t[0].class + " from-[#ff00bf] to-[#a5027c] grid-center")
      },
      m(i, s) {
          M(i, e, s), f(e, r)
      },
      p(i, [s]) {
          s & 1 && n !== (n = "w-12 h-12 bg-gradient-to-br " + i[0].class + " from-[#ff00bf] to-[#a5027c] grid-center") && h(e, "class", n)
      },
      i: F,
      o: F,
      d(i) {
          i && j(e)
      }
  }
}

function tl(t, e, r) {
  return t.$$set = n => {
      r(0, e = ft(ft({}, e), nr(n)))
  }, e = nr(e), [e]
}
class xt extends de {
  constructor(e) {
      super(), fe(this, e, tl, el, ne, {})
  }
}

function rl(t) {
  let e, r, n;
  return {
      c() {
          e = w("div"), e.innerHTML = '<i class="fal fa-spinner-third text-5xl animate-spin"></i>', h(e, "class", "absolute inset-0 grid place-items-center bg-black/50 z-10")
      },
      m(i, s) {
          M(i, e, s), n = !0
      },
      p: F,
      i(i) {
          n || (oe(() => {
              r || (r = ee(e, Xe, {}, !0)), r.run(1)
          }), n = !0)
      },
      o(i) {
          r || (r = ee(e, Xe, {}, !1)), r.run(0), n = !1
      },
      d(i) {
          i && j(e), i && r && r.end()
      }
  }
}
class nl extends de {
  constructor(e) {
      super(), fe(this, e, null, rl, ne, {})
  }
}

function kr(t, e, r) {
  const n = t.slice();
  return n[13] = e[r], n
}

function xr(t, e, r) {
  const n = t.slice();
  return n[16] = e[r], n
}

function Er(t) {
  let e;
  return {
      c() {
          e = w("p"), e.textContent = "Na \xE1rea em que voc\xEA se encontra, n\xE3o \xE9 poss\xEDvel tocar ou escutar m\xFAsicas.", h(e, "class", "bg-red-600/50 text-red-300 p-4 rounded-xl mb-5")
      },
      m(r, n) {
          M(r, e, n)
      },
      d(r) {
          r && j(e)
      }
  }
}

function Sr(t) {
  let e, r, n, i, s, l, o = t[16].name + "",
      a, u, c;
  return {
      c() {
          var d;
          e = w("a"), r = w("li"), n = w("img"), s = R(), l = w("h1"), a = V(o), u = R(), Y(n.src, i = (d = t[16].image_url) != null ? d : "https://picsum.photos/200?v=" + t[16]._id) || h(n, "src", i), h(n, "alt", ""), h(n, "class", "w-12 h-12 rounded flex-shrink-0"), h(l, "class", "overflow-ellipsis overflow-hidden"), h(r, "class", "flex items-center space-x-3"), h(e, "href", c = "#/playlists/" + t[16]._id)
      },
      m(d, p) {
          M(d, e, p), f(e, r), f(r, n), f(r, s), f(r, l), f(l, a), f(e, u)
      },
      p(d, p) {
          var _;
          p & 2 && !Y(n.src, i = (_ = d[16].image_url) != null ? _ : "https://picsum.photos/200?v=" + d[16]._id) && h(n, "src", i), p & 2 && o !== (o = d[16].name + "") && te(a, o), p & 2 && c !== (c = "#/playlists/" + d[16]._id) && h(e, "href", c)
      },
      d(d) {
          d && j(e)
      }
  }
}

function il(t) {
  return {
      c: F,
      m: F,
      p: F,
      i: F,
      o: F,
      d: F
  }
}

function sl(t) {
  let e, r, n, i;
  const s = [al, ll],
      l = [];

  function o(a, u) {
      return a[6].length ? 0 : 1
  }
  return e = o(t), r = l[e] = s[e](t), {
      c() {
          r.c(), n = be()
      },
      m(a, u) {
          l[e].m(a, u), M(a, n, u), i = !0
      },
      p(a, u) {
          let c = e;
          e = o(a), e === c ? l[e].p(a, u) : (G(), U(l[c], 1, 1, () => {
              l[c] = null
          }), Q(), r = l[e], r ? r.p(a, u) : (r = l[e] = s[e](a), r.c()), N(r, 1), r.m(n.parentNode, n))
      },
      i(a) {
          i || (N(r), i = !0)
      },
      o(a) {
          U(r), i = !1
      },
      d(a) {
          l[e].d(a), a && j(n)
      }
  }
}

function ll(t) {
  let e;
  return {
      c() {
          e = w("div"), e.innerHTML = '<i class="fal fa-history text-8xl opacity-25"></i>', h(e, "class", "text-center")
      },
      m(r, n) {
          M(r, e, n)
      },
      p: F,
      i: F,
      o: F,
      d(r) {
          r && j(e)
      }
  }
}

function al(t) {
  let e, r, n = t[6],
      i = [];
  for (let l = 0; l < n.length; l += 1) i[l] = Cr(kr(t, n, l));
  const s = l => U(i[l], 1, 1, () => {
      i[l] = null
  });
  return {
      c() {
          e = w("ul");
          for (let l = 0; l < i.length; l += 1) i[l].c();
          h(e, "class", "grid gap-3 grid-cols-2 text-sm")
      },
      m(l, o) {
          M(l, e, o);
          for (let a = 0; a < i.length; a += 1) i[a].m(e, null);
          r = !0
      },
      p(l, o) {
          if (o & 240) {
              n = l[6];
              let a;
              for (a = 0; a < n.length; a += 1) {
                  const u = kr(l, n, a);
                  i[a] ? (i[a].p(u, o), N(i[a], 1)) : (i[a] = Cr(u), i[a].c(), N(i[a], 1), i[a].m(e, null))
              }
              for (G(), a = n.length; a < i.length; a += 1) s(a);
              Q()
          }
      },
      i(l) {
          if (!r) {
              for (let o = 0; o < n.length; o += 1) N(i[o]);
              r = !0
          }
      },
      o(l) {
          i = i.filter(Boolean);
          for (let o = 0; o < i.length; o += 1) U(i[o]);
          r = !1
      },
      d(l) {
          l && j(e), ht(i, l)
      }
  }
}

function ol(t) {
  let e, r;
  return {
      c() {
          e = w("img"), Y(e.src, r = t[13].embed.image_url) || h(e, "src", r), h(e, "alt", ""), h(e, "class", "w-12 h-12 rounded flex-shrink-0")
      },
      m(n, i) {
          M(n, e, i)
      },
      p(n, i) {
          i & 64 && !Y(e.src, r = n[13].embed.image_url) && h(e, "src", r)
      },
      i: F,
      o: F,
      d(n) {
          n && j(e)
      }
  }
}

function cl(t) {
  let e, r;
  return e = new xt({
      props: {
          class: "rounded flex-shrink-0"
      }
  }), {
      c() {
          ae(e.$$.fragment)
      },
      m(n, i) {
          se(e, n, i), r = !0
      },
      p: F,
      i(n) {
          r || (N(e.$$.fragment, n), r = !0)
      },
      o(n) {
          U(e.$$.fragment, n), r = !1
      },
      d(n) {
          le(e, n)
      }
  }
}

function Cr(t) {
  let e, r, n, i, s, l = t[13].embed.name + "",
      o, a, u, c, d, p;
  const _ = [cl, ol],
      m = [];

  function b(g, k) {
      return g[13].embed._id === "liked" ? 0 : 1
  }
  return r = b(t), n = m[r] = _[r](t), {
      c() {
          var g, k;
          e = w("li"), n.c(), i = R(), s = w("h1"), o = V(l), u = R(), h(s, "class", a = "overflow-ellipsis overflow-hidden " + ((((g = t[4]) == null ? void 0 : g._id) == t[13].id || ((k = t[5]) == null ? void 0 : k._id) == t[13].id) && "text-spotify")), h(e, "class", "flex items-center space-x-3")
      },
      m(g, k) {
          M(g, e, k), m[r].m(e, null), f(e, i), f(e, s), f(s, o), f(e, u), c = !0, d || (p = q(e, "click", function() {
              Ee(t[7].bind(t[13])) && t[7].bind(t[13]).apply(this, arguments)
          }), d = !0)
      },
      p(g, k) {
          var A, v;
          t = g;
          let y = r;
          r = b(t), r === y ? m[r].p(t, k) : (G(), U(m[y], 1, 1, () => {
              m[y] = null
          }), Q(), n = m[r], n ? n.p(t, k) : (n = m[r] = _[r](t), n.c()), N(n, 1), n.m(e, i)), (!c || k & 64) && l !== (l = t[13].embed.name + "") && te(o, l), (!c || k & 112 && a !== (a = "overflow-ellipsis overflow-hidden " + ((((A = t[4]) == null ? void 0 : A._id) == t[13].id || ((v = t[5]) == null ? void 0 : v._id) == t[13].id) && "text-spotify"))) && h(s, "class", a)
      },
      i(g) {
          c || (N(n), c = !0)
      },
      o(g) {
          U(n), c = !1
      },
      d(g) {
          g && j(e), m[r].d(), d = !1, p()
      }
  }
}

function ul(t) {
  let e;
  return {
      c() {
          e = w("div"), e.innerHTML = '<i class="fas fa-spinner-third animate-spin text-4xl"></i>', h(e, "class", "grid-center h-32")
      },
      m(r, n) {
          M(r, e, n)
      },
      p: F,
      i: F,
      o: F,
      d(r) {
          r && j(e)
      }
  }
}

function fl(t) {
  let e, r, n, i, s, l, o, a, u, c, d, p, _, m, b, g, k, y, A, v, S, x, L, E, D, I, O = t[2].interior === "blocked" && Er();
  b = new xt({
      props: {
          class: "rounded"
      }
  });
  let T = t[1].slice(0, 5),
      z = [];
  for (let $ = 0; $ < T.length; $ += 1) z[$] = Sr(xr(t, T, $));
  let C = {
      ctx: t,
      current: null,
      token: null,
      hasCatch: !1,
      pending: ul,
      then: sl,
      catch: il,
      value: 6,
      blocks: [, , , ]
  };
  return sr(L = t[6], C), {
      c() {
          e = w("div"), O && O.c(), r = R(), n = w("div"), i = w("h1"), s = V(t[0]), l = R(), o = w("button"), a = w("i"), c = R(), d = w("div"), p = w("ul"), _ = w("a"), m = w("li"), ae(b.$$.fragment), g = R(), k = w("h1"), k.textContent = "M\xFAsicas Curtidas", y = R();
          for (let $ = 0; $ < z.length; $ += 1) z[$].c();
          A = R(), v = w("div"), S = w("h1"), S.textContent = "Tocadas recentemente", x = R(), C.block.c(), h(i, "class", "text-2xl font-bold"), h(a, "class", u = "fal w-6 " + (t[3] ? "fa-volume-slash" : "fa-volume")), h(n, "class", "flex justify-between"), h(m, "class", "flex items-center space-x-3"), h(_, "href", "#/playlists/liked"), h(p, "class", "grid gap-3 grid-cols-2 text-sm"), h(d, "class", "mt-5"), h(S, "class", "text-2xl font-bold mb-5"), h(v, "class", "mt-5"), h(e, "class", "p-5 pt-6 h-full overflow-y-auto pb-24"), Kn(e, "background-image", "linear-gradient(170deg, rgba(255, 0, 191, 9.9), #0f0f0f 20%)")
      },
      m($, B) {
          M($, e, B), O && O.m(e, null), f(e, r), f(e, n), f(n, i), f(i, s), f(n, l), f(n, o), f(o, a), f(e, c), f(e, d), f(d, p), f(p, _), f(_, m), se(b, m, null), f(m, g), f(m, k), f(p, y);
          for (let P = 0; P < z.length; P += 1) z[P].m(p, null);
          f(e, A), f(e, v), f(v, S), f(v, x), C.block.m(v, C.anchor = null), C.mount = () => v, C.anchor = null, E = !0, D || (I = q(o, "click", t[9]), D = !0)
      },
      p($, [B]) {
          if (t = $, t[2].interior === "blocked" ? O || (O = Er(), O.c(), O.m(e, r)) : O && (O.d(1), O = null), (!E || B & 1) && te(s, t[0]), (!E || B & 8 && u !== (u = "fal w-6 " + (t[3] ? "fa-volume-slash" : "fa-volume"))) && h(a, "class", u), B & 2) {
              T = t[1].slice(0, 5);
              let P;
              for (P = 0; P < T.length; P += 1) {
                  const W = xr(t, T, P);
                  z[P] ? z[P].p(W, B) : (z[P] = Sr(W), z[P].c(), z[P].m(p, null))
              }
              for (; P < z.length; P += 1) z[P].d(1);
              z.length = T.length
          }
          C.ctx = t, B & 64 && L !== (L = t[6]) && sr(L, C) || ri(C, t, B)
      },
      i($) {
          E || (N(b.$$.fragment, $), N(C.block), E = !0)
      },
      o($) {
          U(b.$$.fragment, $);
          for (let B = 0; B < 3; B += 1) {
              const P = C.blocks[B];
              U(P)
          }
          E = !1
      },
      d($) {
          $ && j(e), O && O.d(), le(b), ht(z, $), C.block.d(), C.token = null, C = null, D = !1, I()
      }
  }
}

function dl(t, e, r) {
    let n, i, s, l, o, a, u, c;
    H(t, Ce, g => r(8, i = g)), H(t, pe, g => r(10, s = g)), H(t, _e, g => r(1, l = g)), H(t, kt, g => r(2, o = g)), H(t, Ge, g => r(3, a = g)), H(t, J, g => r(4, u = g)), H(t, zt, g => r(5, c = g));
    const d = new Date;
    let p = "GABY SOM";
    d.getHours() >= 12 && d.getHours() <= 18 ? p = "GABY SOM" : (d.getHours() < 5 || d.getHours() > 18) && (p = "GABY SOM");
    async function _(g) {
        const k = await jn(g.filter(y => y.type === "SONG").map(y => y.id));
        return g.map(y => {
            var A;
            return y.type === "PLAYLIST" ? y.embed = (A = l.find(v => v._id == y.id)) != null ? A : {
                _id: "liked",
                name: "M\xFAsicas Curtidas",
                songs: s
            } : (y.embed = k.data.find(v => v._id == y.id), y.embed && (y.embed.name = y.embed.name.replace(/\(.+\)/, "").trim())), y
        }).filter(y => y.embed)
    }
  
    function m() {
        const g = this.type === "PLAYLIST" ? this.embed.songs.slice() : [this.id];
        je(async () => {
            await vt(this.type, this.id), await tt(g), zt.set(this.type === "PLAYLIST" ? this.embed : null)
        })
    }
    const b = () => Ge.set(!a);
    return t.$$.update = () => {
        t.$$.dirty & 256 && r(6, n = _(JSON.parse(JSON.stringify(i))))
    }, [p, l, o, a, u, c, n, m, i, b]
  }
  class pl extends de {
    constructor(e) {
        super(), fe(this, e, dl, fl, ne, {})
    }
  }

function Or(t) {
  let e;
  return {
      c() {
          e = w("span"), e.textContent = "E", h(e, "class", "bg-white/50 rounded px-1 text-xs text-white/75")
      },
      m(r, n) {
          M(r, e, n)
      },
      d(r) {
          r && j(e)
      }
  }
}

function ml(t) {
  let e, r, n, i, s, l, o = t[0].name + "",
      a, u, c, d, p, _, m = t[0].author + "",
      b, g, k, y, A, v = t[0].is_explicit && Or();
  return {
      c() {
          e = w("li"), r = w("img"), i = R(), s = w("div"), l = w("h1"), u = R(), c = w("div"), v && v.c(), d = R(), p = w("h3"), _ = V("M\xFAsica \u2022 "), b = V(m), g = R(), k = w("button"), k.innerHTML = '<i class="fal fa-ellipsis-v"></i>', Y(r.src, n = t[0].image_url) || h(r, "src", n), h(r, "class", "w-12"), h(r, "alt", ""), h(l, "class", a = "text-base whitespace-nowrap " + (t[1] && "text-spotify")), h(p, "class", "text-white/50"), h(c, "class", "flex space-x-2 items-center"), h(s, "class", "flex flex-col flex-1 overflow-hidden ml-4"), h(k, "class", "ml-2 p-1 opacity-50"), h(e, "class", "flex items-start")
      },
      m(S, x) {
          M(S, e, x), f(e, r), f(e, i), f(e, s), f(s, l), l.innerHTML = o, f(s, u), f(s, c), v && v.m(c, null), f(c, d), f(c, p), f(p, _), f(p, b), f(e, g), f(e, k), y || (A = [q(k, "click", t[4]), q(e, "click", t[3])], y = !0)
      },
      p(S, [x]) {
          x & 1 && !Y(r.src, n = S[0].image_url) && h(r, "src", n), x & 1 && o !== (o = S[0].name + "") && (l.innerHTML = o), x & 2 && a !== (a = "text-base whitespace-nowrap " + (S[1] && "text-spotify")) && h(l, "class", a), S[0].is_explicit ? v || (v = Or(), v.c(), v.m(c, d)) : v && (v.d(1), v = null), x & 1 && m !== (m = S[0].author + "") && te(b, m)
      },
      i: F,
      o: F,
      d(S) {
          S && j(e), v && v.d(), y = !1, re(A)
      }
  }
}

function hl(t, e, r) {
  let n, i;
  H(t, J, a => r(2, i = a));
  let {
      song: s
  } = e;

  function l(a) {
      $t.call(this, t, a)
  }
  const o = a => {
      a.stopPropagation(), Je.set(s)
  };
  return t.$$set = a => {
      "song" in a && r(0, s = a.song)
  }, t.$$.update = () => {
      t.$$.dirty & 5 && r(1, n = (i == null ? void 0 : i._id) == s._id)
  }, [s, n, i, l, o]
}
class Un extends de {
  constructor(e) {
      super(), fe(this, e, hl, ml, ne, {
          song: 0
      })
  }
}

function Rr(t, e, r) {
  const n = t.slice();
  return n[6] = e[r], n
}

function Ar(t) {
  let e, r = [],
      n = new Map,
      i, s = t[1];
  const l = o => o[6]._id;
  for (let o = 0; o < s.length; o += 1) {
      let a = Rr(t, s, o),
          u = l(a);
      n.set(u, r[o] = Pr(u, a))
  }
  return {
      c() {
          e = w("ul");
          for (let o = 0; o < r.length; o += 1) r[o].c();
          h(e, "class", "space-y-5 p-5 flex-1 overflow-y-auto pb-40")
      },
      m(o, a) {
          M(o, e, a);
          for (let u = 0; u < r.length; u += 1) r[u].m(e, null);
          i = !0
      },
      p(o, a) {
          a & 10 && (s = o[1], G(), r = fn(r, a, l, 1, o, s, n, e, un, Pr, null, Rr), Q())
      },
      i(o) {
          if (!i) {
              for (let a = 0; a < s.length; a += 1) N(r[a]);
              i = !0
          }
      },
      o(o) {
          for (let a = 0; a < r.length; a += 1) U(r[a]);
          i = !1
      },
      d(o) {
          o && j(e);
          for (let a = 0; a < r.length; a += 1) r[a].d()
      }
  }
}

function Pr(t, e) {
  let r, n, i;
  return n = new Un({
      props: {
          song: e[6]
      }
  }), n.$on("click", function() {
      Ee(e[3].bind(e[6]._id)) && e[3].bind(e[6]._id).apply(this, arguments)
  }), {
      key: t,
      first: null,
      c() {
          r = be(), ae(n.$$.fragment), this.first = r
      },
      m(s, l) {
          M(s, r, l), se(n, s, l), i = !0
      },
      p(s, l) {
          e = s;
          const o = {};
          l & 2 && (o.song = e[6]), n.$set(o)
      },
      i(s) {
          i || (N(n.$$.fragment, s), i = !0)
      },
      o(s) {
          U(n.$$.fragment, s), i = !1
      },
      d(s) {
          s && j(r), le(n, s)
      }
  }
}

function gl(t) {
  let e, r, n, i, s, l, o, a, u, c, d, p, _ = t[1] && Ar(t);
  return {
      c() {
          e = w("div"), r = w("h1"), r.textContent = "Buscar", n = R(), i = w("div"), s = w("i"), l = R(), o = w("input"), a = R(), _ && _.c(), u = be(), h(r, "class", "text-4xl mb-5"), h(s, "class", "fal fa-search absolute left-3 top-3"), h(o, "class", "w-full bg-neutral-800 text-base p-2 pl-10 rounded placeholder:text-white/50"), h(o, "placeholder", "Artistas, m\xFAsicas, ou podcasts"), h(i, "class", "relative"), h(e, "class", "p-5 pt-12")
      },
      m(m, b) {
          M(m, e, b), f(e, r), f(e, n), f(e, i), f(i, s), f(i, l), f(i, o), Me(o, t[0]), M(m, a, b), _ && _.m(m, b), M(m, u, b), c = !0, d || (p = [q(o, "input", t[4]), q(o, "keydown", t[2])], d = !0)
      },
      p(m, [b]) {
          b & 1 && o.value !== m[0] && Me(o, m[0]), m[1] ? _ ? (_.p(m, b), b & 2 && N(_, 1)) : (_ = Ar(m), _.c(), N(_, 1), _.m(u.parentNode, u)) : _ && (G(), U(_, 1, 1, () => {
              _ = null
          }), Q())
      },
      i(m) {
          c || (N(_), c = !0)
      },
      o(m) {
          U(_), c = !1
      },
      d(m) {
          m && j(e), m && j(a), _ && _.d(m), m && j(u), d = !1, re(p)
      }
  }
}

function bl(t, e, r) {
  let n = "",
      i, s = [];

  function l({
      key: u
  }) {
      if (!(u !== "Enter" && u !== "[auto]")) {
          if (clearTimeout(i), u === "[auto]") return i = setTimeout(() => {
              l({
                  key: "Enter"
              })
          }, 2500);
          if (!n.trim()) return r(1, s = []);
          je(Is(n).then(c => {
              r(1, s = c.data)
          }))
      }
  }
  Ht(() => clearTimeout(i));

  function o() {
      je(async () => {
          await vt("SONG", this);
          const u = s.map(c => c._id);
          for (; u[0] != this;) u.push(u.shift());
          await tt(u)
      })
  }

  function a() {
      n = this.value, r(0, n)
  }
  return t.$$.update = () => {
      t.$$.dirty & 1 && n && l({
          key: "[auto]"
      })
  }, [n, s, l, o, a]
}
class _l extends de {
  constructor(e) {
      super(), fe(this, e, bl, gl, ne, {})
  }
}

function Tr(t, e, r) {
  const n = t.slice();
  return n[3] = e[r], n
}

function wl(t) {
  let e, r, n, i, s, l, o, a = t[0].name + "",
      u, c, d, p, _, m, b, g, k, y, A, v, S, x, L, E, D, I, O, T, z;
  return {
      c() {
          e = w("div"), r = w("div"), n = w("button"), n.innerHTML = '<i class="fas fa-arrow-left"></i>', i = R(), s = w("h1"), s.textContent = "Playlist", l = R(), o = w("h1"), u = V(a), c = R(), d = w("img"), _ = R(), m = w("ul"), b = w("li"), b.innerHTML = `<i class="far fa-play mr-4 opacity-50"></i>
      Tocar esta Playlist`, g = R(), k = w("a"), y = w("li"), y.innerHTML = `<i class="fal fa-music mr-4 opacity-50"></i>
        Ver esta Playlist`, v = R(), S = w("a"), x = w("li"), x.innerHTML = `<i class="fal fa-pen-alt mr-4 opacity-50"></i>
        Editar esta Playlist`, E = R(), D = w("li"), D.innerHTML = `<i class="far fa-minus-circle mr-4 opacity-50"></i>
      Excluir esta Playlist`, h(n, "class", "opacity-50"), h(s, "class", "absolute inset-x-20 font-bold text-center"), h(r, "class", "absolute top-5 inset-x-5 flex"), h(d, "class", "w-32 h-32 mt-4 rounded"), Y(d.src, p = t[0].image_url) || h(d, "src", p), h(d, "alt", ""), h(k, "href", A = "#/playlists/" + t[0]._id), h(S, "href", L = "#/playlists/" + t[0]._id + "?action=edit"), h(m, "class", "flex flex-col w-full space-y-3 mt-5 px-10 overflow-y-auto"), h(e, "class", "absolute inset-0 bg-black z-20 pt-12 flex flex-col items-center")
      },
      m(C, $) {
          M(C, e, $), f(e, r), f(r, n), f(r, i), f(r, s), f(e, l), f(e, o), f(o, u), f(e, c), f(e, d), f(e, _), f(e, m), f(m, b), f(m, g), f(m, k), f(k, y), f(m, v), f(m, S), f(S, x), f(m, E), f(m, D), O = !0, T || (z = [q(n, "click", t[9]), q(b, "click", t[5]), q(D, "click", t[6])], T = !0)
      },
      p(C, $) {
          (!O || $ & 1) && a !== (a = C[0].name + "") && te(u, a), (!O || $ & 1 && !Y(d.src, p = C[0].image_url)) && h(d, "src", p), (!O || $ & 1 && A !== (A = "#/playlists/" + C[0]._id)) && h(k, "href", A), (!O || $ & 1 && L !== (L = "#/playlists/" + C[0]._id + "?action=edit")) && h(S, "href", L)
      },
      i(C) {
          O || (C && oe(() => {
              I || (I = ee(e, he, {
                  y: 300,
                  duration: 500
              }, !0)), I.run(1)
          }), O = !0)
      },
      o(C) {
          C && (I || (I = ee(e, he, {
              y: 300,
              duration: 500
          }, !1)), I.run(0)), O = !1
      },
      d(C) {
          C && j(e), C && I && I.end(), T = !1, re(z)
      }
  }
}

function yl(t) {
  let e, r, n, i, s, l, o, a, u, c, d, p, _, m;
  return {
      c() {
          e = w("div"), r = w("h1"), r.textContent = "D\xEA um nome para sua playlist.", n = R(), i = w("div"), s = w("input"), l = R(), o = w("div"), a = w("button"), a.textContent = "CANCELAR", u = R(), c = w("button"), c.textContent = "CRIAR", h(r, "class", "font-bold"), h(s, "class", "border-b-[0.5px] border-black w-full py-1 underline text-2xl bg-transparent text-center"), h(i, "class", "w-64 mt-4"), h(a, "class", "text-neutral-400"), h(c, "class", "text-spotify"), h(o, "class", "flex justify-around w-48 text-xs mt-8"), h(e, "class", "absolute inset-0 bg-gradient-to-b from-neutral-500 to-black z-10 pt-32 flex flex-col items-center")
      },
      m(b, g) {
          M(b, e, g), f(e, r), f(e, n), f(e, i), f(i, s), Me(s, t[3].name), f(e, l), f(e, o), f(o, a), f(o, u), f(o, c), p = !0, _ || (m = [q(s, "input", t[7]), q(a, "click", t[8]), q(c, "click", t[4])], _ = !0)
      },
      p(b, g) {
          g & 8 && s.value !== b[3].name && Me(s, b[3].name)
      },
      i(b) {
          p || (oe(() => {
              d || (d = ee(e, he, {
                  x: 300,
                  duration: 500
              }, !0)), d.run(1)
          }), p = !0)
      },
      o(b) {
          d || (d = ee(e, he, {
              x: 300,
              duration: 500
          }, !1)), d.run(0), p = !1
      },
      d(b) {
          b && j(e), b && d && d.end(), _ = !1, re(m)
      }
  }
}

function Lr(t) {
  let e, r, n, i, s, l, o = t[3].name + "",
      a, u, c, d, p = t[3].songs.length + "",
      _, m, b, g, k, y, A;

  function v(...S) {
      return t[11](t[3], ...S)
  }
  return {
      c() {
          var S;
          e = w("li"), r = w("img"), i = R(), s = w("div"), l = w("h1"), a = V(o), u = R(), c = w("p"), d = V("Playlist \u2022 "), _ = V(p), m = V(" m\xFAsicas"), b = R(), g = w("button"), g.innerHTML = '<i class="fal opacity-50 fa-ellipsis-v"></i>', k = R(), Y(r.src, n = (S = t[3].image_url) != null ? S : "https://picsum.photos/200") || h(r, "src", n), h(r, "alt", ""), h(r, "class", "w-12 h-12"), h(l, "class", "text-base"), h(c, "class", "text-xs opacity-50"), h(s, "class", "ml-4"), h(g, "class", "ml-auto p-2"), h(e, "class", "flex items-center")
      },
      m(S, x) {
          M(S, e, x), f(e, r), f(e, i), f(e, s), f(s, l), f(l, a), f(s, u), f(s, c), f(c, d), f(c, _), f(c, m), f(e, b), f(e, g), f(e, k), y || (A = [q(g, "click", v), q(e, "click", function() {
              Ee(Ye.bind(null, "#/playlists/" + t[3]._id)) && Ye.bind(null, "#/playlists/" + t[3]._id).apply(this, arguments)
          })], y = !0)
      },
      p(S, x) {
          var L;
          t = S, x & 4 && !Y(r.src, n = (L = t[3].image_url) != null ? L : "https://picsum.photos/200") && h(r, "src", n), x & 4 && o !== (o = t[3].name + "") && te(a, o), x & 4 && p !== (p = t[3].songs.length + "") && te(_, p)
      },
      d(S) {
          S && j(e), y = !1, re(A)
      }
  }
}

function vl(t) {
  let e, r, n, i, s, l, o, a, u, c, d, p, _, m, b, g, k, y = t[1].length + "",
      A, v, S, x, L, E;
  const D = [yl, wl],
      I = [];

  function O(C, $) {
      return C[3] ? 0 : C[0] ? 1 : -1
  }~(e = O(t)) && (r = I[e] = D[e](t)), d = new xt({});
  let T = t[2],
      z = [];
  for (let C = 0; C < T.length; C += 1) z[C] = Lr(Tr(t, T, C));
  return {
      c() {
          r && r.c(), n = R(), i = w("div"), s = w("h1"), s.textContent = "Sua biblioteca", l = R(), o = w("button"), o.innerHTML = '<i class="far fa-plus"></i>', a = R(), u = w("ul"), c = w("li"), ae(d.$$.fragment), p = R(), _ = w("div"), m = w("h1"), m.textContent = "M\xFAsicas Curtidas", b = R(), g = w("p"), k = V("Playlist \u2022 "), A = V(y), v = V(" m\xFAsicas"), S = R();
          for (let C = 0; C < z.length; C += 1) z[C].c();
          h(i, "class", "flex items-center justify-between text-2xl p-5 pt-12"), h(m, "class", "text-base"), h(g, "class", "text-xs opacity-50"), h(c, "class", "flex items-center space-x-4"), h(u, "class", "p-5 pt-0 pb-24 h-full overflow-y-auto space-y-2 rounded-3xl")
      },
      m(C, $) {
          ~e && I[e].m(C, $), M(C, n, $), M(C, i, $), f(i, s), f(i, l), f(i, o), M(C, a, $), M(C, u, $), f(u, c), se(d, c, null), f(c, p), f(c, _), f(_, m), f(_, b), f(_, g), f(g, k), f(g, A), f(g, v), f(u, S);
          for (let B = 0; B < z.length; B += 1) z[B].m(u, null);
          x = !0, L || (E = [q(o, "click", t[10]), q(c, "click", Ye.bind(null, "#/playlists/liked"))], L = !0)
      },
      p(C, [$]) {
          let B = e;
          if (e = O(C), e === B ? ~e && I[e].p(C, $) : (r && (G(), U(I[B], 1, 1, () => {
                  I[B] = null
              }), Q()), ~e ? (r = I[e], r ? r.p(C, $) : (r = I[e] = D[e](C), r.c()), N(r, 1), r.m(n.parentNode, n)) : r = null), (!x || $ & 2) && y !== (y = C[1].length + "") && te(A, y), $ & 5) {
              T = C[2];
              let P;
              for (P = 0; P < T.length; P += 1) {
                  const W = Tr(C, T, P);
                  z[P] ? z[P].p(W, $) : (z[P] = Lr(W), z[P].c(), z[P].m(u, null))
              }
              for (; P < z.length; P += 1) z[P].d(1);
              z.length = T.length
          }
      },
      i(C) {
          x || (N(r), N(d.$$.fragment, C), x = !0)
      },
      o(C) {
          U(r), U(d.$$.fragment, C), x = !1
      },
      d(C) {
          ~e && I[e].d(C), C && j(n), C && j(i), C && j(a), C && j(u), le(d), ht(z, C), L = !1, re(E)
      }
  }
}

function kl(t, e, r) {
  let n, i;
  H(t, pe, b => r(1, n = b)), H(t, _e, b => r(2, i = b));
  let s, l;
  async function o() {
      const b = await Ms({
          name: s.name,
          image_url: `https://picsum.photos/seed/${Date.now()}/300`
      });
      _e.update(g => g.concat(b.data)), r(3, s = null)
  }
  async function a() {
      await vt("PLAYLIST", l._id), await tt(l.songs.slice()), r(0, l = null)
  }
  async function u() {
      _e.update(b => b.filter(g => g._id != (l == null ? void 0 : l._id))), await Ds(l._id), Bs("PLAYLIST", l == null ? void 0 : l._id), r(0, l = null)
  }

  function c() {
      s.name = this.value, r(3, s)
  }
  return [l, n, i, s, o, a, u, c, () => r(3, s = null), () => r(0, l = null), () => r(3, s = {}), (b, g) => {
      g.stopPropagation(), r(0, l = b)
  }]
}
class xl extends de {
  constructor(e) {
      super(), fe(this, e, kl, vl, ne, {})
  }
}

function $r(t, e, r) {
  const n = t.slice();
  return n[21] = e[r], n
}

function Nr(t) {
  let e, r, n, i, s, l, o, a, u, c, d, p, _, m, b, g, k, y, A, v, S;
  return {
      c() {
          e = w("div"), r = w("h1"), r.textContent = "Editar playlist", n = R(), i = w("img"), l = R(), o = w("form"), a = w("input"), c = R(), d = w("input"), _ = R(), m = w("div"), b = w("button"), b.textContent = "CANCELAR", g = R(), k = w("button"), k.textContent = "SALVAR", h(r, "class", "font-bold"), h(i, "class", "w-32 h-32 mt-4 rounded"), Y(i.src, s = t[1].image_url) || h(i, "src", s), h(i, "alt", ""), h(a, "name", "image_url"), a.value = u = t[1].image_url, h(a, "placeholder", "URL da Imagem"), h(a, "class", "border-b-[0.5px] border-black placeholder:text-white/20 w-full py-1 text-2xl bg-transparent text-center"), h(d, "name", "name"), d.value = p = t[1].name, h(d, "class", "border-b-[0.5px] mt-4 border-black w-full py-1 underline text-2xl bg-transparent text-center"), h(b, "class", "text-neutral-400"), h(k, "class", "text-spotify"), h(m, "class", "flex justify-around w-48 text-xs mt-8"), h(o, "class", "w-64 mt-4 flex flex-col items-center"), h(e, "class", "absolute inset-0 bg-gradient-to-b from-neutral-500 to-black z-10 pt-32 flex flex-col items-center")
      },
      m(x, L) {
          M(x, e, L), f(e, r), f(e, n), f(e, i), f(e, l), f(e, o), f(o, a), f(o, c), f(o, d), f(o, _), f(o, m), f(m, b), f(m, g), f(m, k), A = !0, v || (S = [q(b, "click", t[12]), q(o, "submit", t[8])], v = !0)
      },
      p(x, L) {
          (!A || L & 2 && !Y(i.src, s = x[1].image_url)) && h(i, "src", s), (!A || L & 2 && u !== (u = x[1].image_url) && a.value !== u) && (a.value = u), (!A || L & 2 && p !== (p = x[1].name) && d.value !== p) && (d.value = p)
      },
      i(x) {
          A || (oe(() => {
              y || (y = ee(e, he, {
                  x: 300,
                  duration: 500
              }, !0)), y.run(1)
          }), A = !0)
      },
      o(x) {
          y || (y = ee(e, he, {
              x: 300,
              duration: 500
          }, !1)), y.run(0), A = !1
      },
      d(x) {
          x && j(e), x && y && y.end(), v = !1, re(S)
      }
  }
}

function El(t) {
  let e, r, n, i;
  return {
      c() {
          e = w("img"), Y(e.src, r = t[1].image_url) || h(e, "src", r), h(e, "class", "w-32 h-32 mx-auto mb-5"), h(e, "alt", "")
      },
      m(s, l) {
          M(s, e, l), n || (i = q(e, "click", t[13]), n = !0)
      },
      p(s, l) {
          l & 2 && !Y(e.src, r = s[1].image_url) && h(e, "src", r)
      },
      i: F,
      o: F,
      d(s) {
          s && j(e), n = !1, i()
      }
  }
}

function Sl(t) {
  let e, r;
  return e = new xt({
      props: {
          class: "h-32 w-32 text-5xl mx-auto mb-5"
      }
  }), {
      c() {
          ae(e.$$.fragment)
      },
      m(n, i) {
          se(e, n, i), r = !0
      },
      p: F,
      i(n) {
          r || (N(e.$$.fragment, n), r = !0)
      },
      o(n) {
          U(e.$$.fragment, n), r = !1
      },
      d(n) {
          le(e, n)
      }
  }
}

function Cl(t) {
  let e;
  return {
      c() {
          e = w("div"), e.innerHTML = `<h1 class="opacity-50 mb-4">Voc\xEA n\xE3o curtiu nenhuma m\xFAsica ainda</h1> 

    <a href="#/search" class="bg-black/50 rounded-full p-2 px-4">Buscar m\xFAsicas</a>`, h(e, "class", "mt-8 text-center")
      },
      m(r, n) {
          M(r, e, n)
      },
      p: F,
      d(r) {
          r && j(e)
      }
  }
}

function Ol(t) {
  let e;
  return {
      c() {
          e = w("div"), e.innerHTML = `<h1 class="opacity-50 mb-4">Voc\xEA n\xE3o adicionou nenhuma m\xFAsica ainda</h1> 

    <a href="#/search" class="bg-black/50 rounded-full p-2 px-4">Adicionar m\xFAsicas</a>`, h(e, "class", "mt-8 text-center")
      },
      m(r, n) {
          M(r, e, n)
      },
      p: F,
      d(r) {
          r && j(e)
      }
  }
}

function Rl(t) {
  let e, r, n, i, s, l, o, a, u, c, d, p;
  return {
      c() {
          e = w("div"), r = w("button"), n = w("i"), s = R(), l = w("button"), o = w("i"), u = R(), c = w("button"), c.innerHTML = '<i class="fas fa-play"></i>', h(n, "class", i = "fal " + (t[3] ? "text-spotify animate-[like_500ms]" : "opacity-50") + " text-2xl fa-repeat-alt"), h(o, "class", a = "fal " + (t[2] ? "text-spotify animate-[like_500ms]" : "opacity-50") + " text-2xl fa-shuffle"), h(c, "class", "bg-spotify-dark w-10 h-10 rounded-full"), h(e, "class", "my-5 flex justify-end space-x-5")
      },
      m(_, m) {
          M(_, e, m), f(e, r), f(r, n), f(e, s), f(e, l), f(l, o), f(e, u), f(e, c), d || (p = [q(r, "click", t[14]), q(l, "click", t[15]), q(c, "click", t[7])], d = !0)
      },
      p(_, m) {
          m & 8 && i !== (i = "fal " + (_[3] ? "text-spotify animate-[like_500ms]" : "opacity-50") + " text-2xl fa-repeat-alt") && h(n, "class", i), m & 4 && a !== (a = "fal " + (_[2] ? "text-spotify animate-[like_500ms]" : "opacity-50") + " text-2xl fa-shuffle") && h(o, "class", a)
      },
      d(_) {
          _ && j(e), d = !1, re(p)
      }
  }
}

function jr(t, e) {
  let r, n, i;
  return n = new Un({
      props: {
          song: e[21]
      }
  }), n.$on("click", function() {
      Ee(e[6].bind(e[21]._id, e[1].songs)) && e[6].bind(e[21]._id, e[1].songs).apply(this, arguments)
  }), {
      key: t,
      first: null,
      c() {
          r = be(), ae(n.$$.fragment), this.first = r
      },
      m(s, l) {
          M(s, r, l), se(n, s, l), i = !0
      },
      p(s, l) {
          e = s;
          const o = {};
          l & 1 && (o.song = e[21]), n.$set(o)
      },
      i(s) {
          i || (N(n.$$.fragment, s), i = !0)
      },
      o(s) {
          U(n.$$.fragment, s), i = !1
      },
      d(s) {
          s && j(r), le(n, s)
      }
  }
}

function Al(t) {
  let e, r, n, i, s, l, o = t[1].name + "",
      a, u, c, d, p = [],
      _ = new Map,
      m, b, g, k, y = t[4] && Nr(t);
  const A = [Sl, El],
      v = [];

  function S(O, T) {
      return O[1].type === "LIKES" ? 0 : 1
  }
  n = S(t), i = v[n] = A[n](t);

  function x(O, T) {
      return O[1].songs.length > 0 ? Rl : O[1].type !== "LIKES" ? Ol : Cl
  }
  let L = x(t),
      E = L(t),
      D = t[0];
  const I = O => O[21]._id;
  for (let O = 0; O < D.length; O += 1) {
      let T = $r(t, D, O),
          z = I(T);
      _.set(z, p[O] = jr(z, T))
  }
  return {
      c() {
          y && y.c(), e = R(), r = w("div"), i.c(), s = R(), l = w("h1"), a = V(o), u = R(), E.c(), c = R(), d = w("ul");
          for (let O = 0; O < p.length; O += 1) p[O].c();
          h(l, "class", "font-bold text-center text-xl"), h(d, "class", m = "space-y-2 overflow-y-auto h-96 " + (t[5] ? "pb-36" : "pb-16") + " rounded"), h(r, "class", "p-5 pt-12")
      },
      m(O, T) {
          y && y.m(O, T), M(O, e, T), M(O, r, T), v[n].m(r, null), f(r, s), f(r, l), f(l, a), f(r, u), E.m(r, null), f(r, c), f(r, d);
          for (let z = 0; z < p.length; z += 1) p[z].m(d, null);
          b = !0, g || (k = q(d, "scroll", t[9]), g = !0)
      },
      p(O, [T]) {
          O[4] ? y ? (y.p(O, T), T & 16 && N(y, 1)) : (y = Nr(O), y.c(), N(y, 1), y.m(e.parentNode, e)) : y && (G(), U(y, 1, 1, () => {
              y = null
          }), Q());
          let z = n;
          n = S(O), n === z ? v[n].p(O, T) : (G(), U(v[z], 1, 1, () => {
              v[z] = null
          }), Q(), i = v[n], i ? i.p(O, T) : (i = v[n] = A[n](O), i.c()), N(i, 1), i.m(r, s)), (!b || T & 2) && o !== (o = O[1].name + "") && te(a, o), L === (L = x(O)) && E ? E.p(O, T) : (E.d(1), E = L(O), E && (E.c(), E.m(r, c))), T & 67 && (D = O[0], G(), p = fn(p, T, I, 1, O, D, _, d, un, jr, null, $r), Q()), (!b || T & 32 && m !== (m = "space-y-2 overflow-y-auto h-96 " + (O[5] ? "pb-36" : "pb-16") + " rounded")) && h(d, "class", m)
      },
      i(O) {
          if (!b) {
              N(y), N(i);
              for (let T = 0; T < D.length; T += 1) N(p[T]);
              b = !0
          }
      },
      o(O) {
          U(y), U(i);
          for (let T = 0; T < p.length; T += 1) U(p[T]);
          b = !1
      },
      d(O) {
          y && y.d(O), O && j(e), O && j(r), v[n].d(), E.d();
          for (let T = 0; T < p.length; T += 1) p[T].d();
          g = !1, k()
      }
  }
}

function Pl(t, e, r) {
  let n, i, s, l, o;
  H(t, Re, E => r(11, n = E)), H(t, _e, E => r(16, i = E)), H(t, pe, E => r(17, s = E)), H(t, ui, E => r(18, l = E)), H(t, J, E => r(5, o = E));
  let {
      params: a
  } = e;
  const u = new URLSearchParams(l);

  function c(E) {
      return E === "liked" ? {
          _id: "liked",
          name: "M\xFAsicas Curtidas",
          type: "LIKES",
          songs: s
      } : i.find(D => D._id === E)
  }
  const d = c(a.playlist);
  Re.set(d);
  let p = [],
      _ = !1,
      m = !1,
      b = u.get("action") === "edit";
  nn(() => {
      je(vr(n).then(E => {
          r(0, p = E.data)
      }))
  }), Ht(() => Re.set());

  function g([...E]) {
      !E.length || !E.includes(this) || je(async () => {
          const D = [this];
          for (;;) {
              const I = E.shift();
              if (I === this) break;
              (m || _) && E.push(I)
          }
          _ && $s(E), D.push(...E), await vt("PLAYLIST", d._id), await tt(D, m)
      })
  }

  function k() {
      const E = n.songs;
      if (_) {
          const D = E[Math.floor(Math.random() * E.length)];
          g.call(D, E)
      } else g.call(E[0], E)
  }
  async function y(E) {
      E.preventDefault();
      const D = new FormData(this),
          I = D.get("image_url").trim(),
          O = D.get("name").trim();
      if (I) {
          const T = await fetch(I);
          if (T.status < 200 || T.status >= 300) return;
          if (!T.headers.get("content-type").includes("image/")) return;
          r(1, d.image_url = I, d)
      }
      O && r(1, d.name = O, d), await me(() => X.put("playlists/" + d._id, {
          name: O,
          image_url: I
      })), r(4, b = !1)
  }

  function A() {
      this.scrollTop >= this.scrollHeight - this.clientHeight && je(vr(n, p.length).then(E => {
          r(0, p = p.concat(E.data))
      }))
  }
  const v = () => r(4, b = null),
      S = () => r(4, b = !0),
      x = () => r(3, m = !m),
      L = () => r(2, _ = !_);
  return t.$$set = E => {
      "params" in E && r(10, a = E.params)
  }, t.$$.update = () => {
      if (t.$$.dirty & 2049) {
          const E = n.songs;
          r(0, p = p.filter(D => E.includes(D._id)))
      }
  }, [p, d, _, m, b, o, g, k, y, A, a, n, v, S, x, L]
}
class Tl extends de {
  constructor(e) {
      super(), fe(this, e, Pl, Al, ne, {
          params: 10
      })
  }
}

function Mr(t, e, r) {
  const n = t.slice();
  return n[12] = e[r], n
}

function Dr(t) {
  let e, r, n, i, s, l, o = t[0].name + "",
      a, u, c, d = t[0].author + "",
      p, _, m, b, g, k, y = t[2],
      A, v = t[2] ? "Curtida" : "Curtir",
      S, x, L, E, D = t[3] && t[3].songs.includes(t[0]._id),
      I, O, T, z, C = t[1] && zr(t),
      $ = Ur(t),
      B = D && Ir(t);
  return {
      c() {
          C && C.c(), e = R(), r = w("div"), n = w("img"), s = R(), l = w("h1"), a = V(o), u = R(), c = w("h3"), p = V(d), _ = R(), m = w("button"), m.innerHTML = '<i class="fas fa-times"></i>', b = R(), g = w("ul"), k = w("li"), $.c(), A = R(), S = V(v), x = R(), L = w("li"), L.innerHTML = `<i class="far fa-music mr-4 opacity-50"></i>
      Adicionar \xE0 Playlist`, E = R(), B && B.c(), h(n, "class", "w-24 h-24 mb-2"), Y(n.src, i = t[0].image_url) || h(n, "src", i), h(n, "alt", ""), h(l, "class", "text-xl text-center font-medium"), h(c, "class", "text-xs opacity-50"), h(m, "class", "absolute top-5 right-5 opacity-50"), h(g, "class", "flex flex-col w-full space-y-3 mt-5 px-10"), h(r, "class", "absolute inset-0 bg-black z-10 pt-32 flex flex-col items-center")
      },
      m(P, W) {
          C && C.m(P, W), M(P, e, W), M(P, r, W), f(r, n), f(r, s), f(r, l), f(l, a), f(r, u), f(r, c), f(c, p), f(r, _), f(r, m), f(r, b), f(r, g), f(g, k), $.m(k, null), f(k, A), f(k, S), f(g, x), f(g, L), f(g, E), B && B.m(g, null), O = !0, T || (z = [q(m, "click", t[9]), q(k, "click", t[10]), q(L, "click", t[11])], T = !0)
      },
      p(P, W) {
          P[1] ? C ? (C.p(P, W), W & 2 && N(C, 1)) : (C = zr(P), C.c(), N(C, 1), C.m(e.parentNode, e)) : C && (G(), U(C, 1, 1, () => {
              C = null
          }), Q()), (!O || W & 1 && !Y(n.src, i = P[0].image_url)) && h(n, "src", i), (!O || W & 1) && o !== (o = P[0].name + "") && te(a, o), (!O || W & 1) && d !== (d = P[0].author + "") && te(p, d), W & 4 && ne(y, y = P[2]) ? ($.d(1), $ = Ur(P), $.c(), $.m(k, A)) : $.p(P, W), (!O || W & 4) && v !== (v = P[2] ? "Curtida" : "Curtir") && te(S, v), W & 9 && (D = P[3] && P[3].songs.includes(P[0]._id)), D ? B ? B.p(P, W) : (B = Ir(P), B.c(), B.m(g, null)) : B && (B.d(1), B = null)
      },
      i(P) {
          O || (N(C), oe(() => {
              I || (I = ee(r, he, {
                  y: 300,
                  duration: 500
              }, !0)), I.run(1)
          }), O = !0)
      },
      o(P) {
          U(C), I || (I = ee(r, he, {
              y: 300,
              duration: 500
          }, !1)), I.run(0), O = !1
      },
      d(P) {
          C && C.d(P), P && j(e), P && j(r), $.d(P), B && B.d(), P && I && I.end(), T = !1, re(z)
      }
  }
}

function zr(t) {
  let e, r, n, i, s, l, o, a, u, c, d, p = t[4],
      _ = [];
  for (let m = 0; m < p.length; m += 1) _[m] = Br(Mr(t, p, m));
  return {
      c() {
          e = w("div"), r = w("div"), n = w("button"), n.innerHTML = '<i class="fas fa-arrow-left"></i>', i = R(), s = w("h1"), s.textContent = "Adicionar \xE0 Playlist", l = R(), o = w("ul");
          for (let m = 0; m < _.length; m += 1) _[m].c();
          h(n, "class", "opacity-50"), h(s, "class", "absolute inset-x-20 font-bold text-center"), h(r, "class", "absolute top-5 inset-x-5 flex"), h(o, "class", "flex flex-col w-full space-y-3 mt-5 px-10 overflow-y-auto"), h(e, "class", "absolute inset-0 bg-black z-20 pt-12 flex flex-col items-center")
      },
      m(m, b) {
          M(m, e, b), f(e, r), f(r, n), f(r, i), f(r, s), f(e, l), f(e, o);
          for (let g = 0; g < _.length; g += 1) _[g].m(o, null);
          u = !0, c || (d = q(n, "click", t[8]), c = !0)
      },
      p(m, b) {
          if (b & 48) {
              p = m[4];
              let g;
              for (g = 0; g < p.length; g += 1) {
                  const k = Mr(m, p, g);
                  _[g] ? _[g].p(k, b) : (_[g] = Br(k), _[g].c(), _[g].m(o, null))
              }
              for (; g < _.length; g += 1) _[g].d(1);
              _.length = p.length
          }
      },
      i(m) {
          u || (oe(() => {
              a || (a = ee(e, he, {
                  y: 300,
                  duration: 500
              }, !0)), a.run(1)
          }), u = !0)
      },
      o(m) {
          a || (a = ee(e, he, {
              y: 300,
              duration: 500
          }, !1)), a.run(0), u = !1
      },
      d(m) {
          m && j(e), ht(_, m), m && a && a.end(), c = !1, d()
      }
  }
}

function Br(t) {
  let e, r, n, i, s, l, o = t[12].name + "",
      a, u, c, d, p = t[12].songs.length + "",
      _, m, b, g, k;
  return {
      c() {
          var y;
          e = w("li"), r = w("img"), i = R(), s = w("div"), l = w("h1"), a = V(o), u = R(), c = w("h3"), d = V("Playlist \u2022 "), _ = V(p), m = V(" m\xFAsicas"), b = R(), h(r, "class", "w-12"), Y(r.src, n = (y = t[12].image_url) != null ? y : "https://picsum.photos/200") || h(r, "src", n), h(r, "alt", ""), h(c, "class", "opacity-50 text-xs"), h(e, "class", "flex items-center space-x-3")
      },
      m(y, A) {
          M(y, e, A), f(e, r), f(e, i), f(e, s), f(s, l), f(l, a), f(s, u), f(s, c), f(c, d), f(c, _), f(c, m), f(e, b), g || (k = q(e, "click", function() {
              Ee(t[5].bind(t[12])) && t[5].bind(t[12]).apply(this, arguments)
          }), g = !0)
      },
      p(y, A) {
          var v;
          t = y, A & 16 && !Y(r.src, n = (v = t[12].image_url) != null ? v : "https://picsum.photos/200") && h(r, "src", n), A & 16 && o !== (o = t[12].name + "") && te(a, o), A & 16 && p !== (p = t[12].songs.length + "") && te(_, p)
      },
      d(y) {
          y && j(e), g = !1, k()
      }
  }
}

function Ur(t) {
  let e, r;
  return {
      c() {
          e = w("i"), h(e, "class", r = (t[2] ? "fas text-spotify" : "far opacity-50") + " fa-heart animate-[like_500ms] mr-4")
      },
      m(n, i) {
          M(n, e, i)
      },
      p(n, i) {
          i & 4 && r !== (r = (n[2] ? "fas text-spotify" : "far opacity-50") + " fa-heart animate-[like_500ms] mr-4") && h(e, "class", r)
      },
      d(n) {
          n && j(e)
      }
  }
}

function Ir(t) {
  let e, r, n;
  return {
      c() {
          e = w("li"), e.innerHTML = `<i class="far fa-minus-circle mr-4 opacity-50"></i>
        Remover desta Playlist`
      },
      m(i, s) {
          M(i, e, s), r || (n = q(e, "click", t[6]), r = !0)
      },
      p: F,
      d(i) {
          i && j(e), r = !1, n()
      }
  }
}

function Ll(t) {
  let e, r, n = t[0] && Dr(t);
  return {
      c() {
          n && n.c(), e = be()
      },
      m(i, s) {
          n && n.m(i, s), M(i, e, s), r = !0
      },
      p(i, [s]) {
          i[0] ? n ? (n.p(i, s), s & 1 && N(n, 1)) : (n = Dr(i), n.c(), N(n, 1), n.m(e.parentNode, e)) : n && (G(), U(n, 1, 1, () => {
              n = null
          }), Q())
      },
      i(i) {
          r || (N(n), r = !0)
      },
      o(i) {
          U(n), r = !1
      },
      d(i) {
          n && n.d(i), i && j(e)
      }
  }
}

function $l(t, e, r) {
  let n, i, s, l, o;
  H(t, Je, b => r(0, i = b)), H(t, Re, b => r(3, s = b)), H(t, pe, b => r(7, l = b)), H(t, _e, b => r(4, o = b));
  async function a() {
      this.songs.includes(i._id) || (await me(() => X.post(`playlists/${this._id}/${i._id}`)), this.songs.push(i._id), Je.set())
  }
  async function u() {
      s.type === "LIKES" && tr(i._id, !1), await me(() => X.delete(`playlists/${s._id}/${i._id}`)), $e(Re, s.songs = s.songs.filter(b => b != i._id), s), Je.set()
  }
  let c = !1;
  const d = () => r(1, c = !1),
      p = () => Je.set(),
      _ = () => Nn(i._id),
      m = () => r(1, c = !0);
  return t.$$.update = () => {
      t.$$.dirty & 129 && r(2, n = l.includes(i == null ? void 0 : i._id))
  }, [i, c, n, s, o, a, u, l, d, p, _, m]
}
class Nl extends de {
  constructor(e) {
      super(), fe(this, e, $l, Ll, ne, {})
  }
}

function Fr(t) {
  let e, r, n, i, s, l, o, a = t[1].name + "",
      u, c, d, p = t[1].author + "",
      _, m, b, g, k, y, A, v, S = t[2],
      x, L, E, D, I, O, T, z, C, $ = qr(t);
  return {
      c() {
          e = w("div"), r = w("div"), n = w("img"), s = R(), l = w("div"), o = w("h1"), u = V(a), c = R(), d = w("h1"), _ = V(p), m = R(), b = w("div"), g = w("button"), k = w("i"), A = R(), v = w("button"), $.c(), x = R(), L = w("button"), E = w("i"), I = R(), O = w("div"), T = w("input"), h(n, "class", "h-12 rounded-lg"), Y(n.src, i = t[1].image_url) || h(n, "src", i), h(n, "alt", ""), h(o, "class", "whitespace-nowrap text-base song-name"), h(d, "class", "opacity-50"), h(l, "class", "flex flex-col flex-1 overflow-hidden text-xs"), h(k, "class", y = "far " + (t[1].bluetooth && "text-spotify") + " fa-bluetooth"), h(g, "class", "w-8"), h(v, "class", "w-8"), h(E, "class", D = "fas " + (t[1].paused_at ? "fa-play" : "fa-pause")), h(L, "class", "w-8"), h(b, "class", "ml-4 mr-2 mt-2 flex text-xl"), h(r, "class", "w-full flex items-start space-x-4"), h(T, "min", "1"), h(T, "max", "100"), h(T, "class", "w-full h-1 mt-4"), h(T, "type", "range"), h(e, "class", "bg-neutral-700 rounded-xl h-16 hover:h-24 overflow-hidden transition-[height] p-2 absolute inset-x-4 bottom-20")
      },
      m(B, P) {
          M(B, e, P), f(e, r), f(r, n), f(r, s), f(r, l), f(l, o), f(o, u), f(l, c), f(l, d), f(d, _), f(r, m), f(r, b), f(b, g), f(g, k), f(b, A), f(b, v), $.m(v, null), f(b, x), f(b, L), f(L, E), f(e, I), f(e, O), f(O, T), t[9](T), Me(T, t[3]), z || (C = [q(g, "click", t[5]), q(v, "click", t[8]), q(L, "click", t[4]), q(T, "input", t[6]), q(T, "change", t[10]), q(T, "input", t[10])], z = !0)
      },
      p(B, P) {
          P & 2 && !Y(n.src, i = B[1].image_url) && h(n, "src", i), P & 2 && a !== (a = B[1].name + "") && te(u, a), P & 2 && p !== (p = B[1].author + "") && te(_, p), P & 2 && y !== (y = "far " + (B[1].bluetooth && "text-spotify") + " fa-bluetooth") && h(k, "class", y), P & 4 && ne(S, S = B[2]) ? ($.d(1), $ = qr(B), $.c(), $.m(v, null)) : $.p(B, P), P & 2 && D !== (D = "fas " + (B[1].paused_at ? "fa-play" : "fa-pause")) && h(E, "class", D), P & 8 && Me(T, B[3])
      },
      d(B) {
          B && j(e), $.d(B), t[9](null), z = !1, re(C)
      }
  }
}

function qr(t) {
  let e, r;
  return {
      c() {
          e = w("i"), h(e, "class", r = (t[2] ? "fas text-spotify" : "far") + " fa-heart animate-[like_500ms]")
      },
      m(n, i) {
          M(n, e, i)
      },
      p(n, i) {
          i & 4 && r !== (r = (n[2] ? "fas text-spotify" : "far") + " fa-heart animate-[like_500ms]") && h(e, "class", r)
      },
      d(n) {
          n && j(e)
      }
  }
}

function jl(t) {
  let e, r = t[1] && Fr(t);
  return {
      c() {
          r && r.c(), e = be()
      },
      m(n, i) {
          r && r.m(n, i), M(n, e, i)
      },
      p(n, [i]) {
          n[1] ? r ? r.p(n, i) : (r = Fr(n), r.c(), r.m(e.parentNode, e)) : r && (r.d(1), r = null)
      },
      i: F,
      o: F,
      d(n) {
          r && r.d(n), n && j(e)
      }
  }
}

function Ml(t, e, r) {
  let n, i, s, l;
  H(t, J, b => r(1, i = b)), H(t, pe, b => r(7, s = b)), H(t, Bt, b => r(3, l = b));

  function o() {
      return yr(async () => {
          if (i.paused_at) {
              const b = Ie() - (i.paused_at - i.played_at);
              if ($e(J, i.paused_at = void 0, i), $e(J, i.played_at = b, i), !await K("server", "resume")) {
                  const g = await K("getVehicle"),
                      k = await K("server", "play", g, i.url, l / 100, b);
                  k.error ? (J.set(), Oe.set(k.error)) : $e(J, i.bluetooth = k.mode === "bluetooth", i)
              }
          } else {
              const b = await K("isInHand");
              $e(J, i.paused_at = Ie(), i), await K("server", b ? "stop" : "pause")
          }
      })
  }
  async function a() {
      const b = await K("getVehicle");
      return yr(() => K("server", "toggleMode", b).then(g => {
          g != null && g.error ? Oe.set(g.error) : g && $e(J, i.bluetooth = g === "bluetooth", i)
      }))
  }
  let u, c;

  function d() {
      const b = (this.valueAsNumber - parseInt(this.min)) / (parseInt(this.max) - parseInt(this.min));
      this.style = "background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" + b + ", #1ed760), color-stop(" + b + ", #303030));", clearTimeout(c), c = setTimeout(() => {
          K("server", "setVolume", this.value / 100)
      }, 200)
  }
  const p = () => Nn(i._id);

  function _(b) {
      Nt[b ? "unshift" : "push"](() => {
          u = b, r(0, u)
      })
  }

  function m() {
      l = Jn(this.value), Bt.set(l)
  }
  return t.$$.update = () => {
      t.$$.dirty & 130 && r(2, n = s.includes(i == null ? void 0 : i._id)), t.$$.dirty & 1 && u != null && d.call(u)
  }, [u, i, n, l, o, a, d, s, p, _, m]
}
class Dl extends de {
  constructor(e) {
      super(), fe(this, e, Ml, jl, ne, {})
  }
}

function Hr(t) {
    let e, r, n, i, s, l, o, a, u, c, d, p, _, m;
    return {
        c() {
            e = w("div"), r = w("div"), n = w("h1"), n.textContent = "GABY SOM", i = R(), s = w("h3"), l = V(t[0]), o = R(), a = w("div"), u = w("button"), u.textContent = "OK", h(n, "class", "mb-2"), h(s, "class", "opacity-60 text-sm"), h(u, "class", "text-blue-600 font-bold"), h(a, "class", "text-center mt-2"), h(r, "class", "bg-neutral-800 w-3/4 rounded p-2"), h(e, "class", "absolute grid-center inset-0 bg-black/50 z-50")
        },
        m(b, g) {
            M(b, e, g), f(e, r), f(r, n), f(r, i), f(r, s), f(s, l), f(r, o), f(r, a), f(a, u), p = !0, _ || (m = q(u, "click", t[1]), _ = !0)
        },
        p(b, g) {
            (!p || g & 1) && te(l, b[0])
        },
        i(b) {
            p || (oe(() => {
                c || (c = ee(r, or, {}, !0)), c.run(1)
            }), oe(() => {
                d || (d = ee(e, Xe, {}, !0)), d.run(1)
            }), p = !0)
        },
        o(b) {
            c || (c = ee(r, or, {}, !1)), c.run(0), d || (d = ee(e, Xe, {}, !1)), d.run(0), p = !1
        },
        d(b) {
            b && j(e), b && c && c.end(), b && d && d.end(), _ = !1, m()
        }
    }
  }

function zl(t) {
  let e, r, n = t[0] && Hr(t);
  return {
      c() {
          n && n.c(), e = be()
      },
      m(i, s) {
          n && n.m(i, s), M(i, e, s), r = !0
      },
      p(i, [s]) {
          i[0] ? n ? (n.p(i, s), s & 1 && N(n, 1)) : (n = Hr(i), n.c(), N(n, 1), n.m(e.parentNode, e)) : n && (G(), U(n, 1, 1, () => {
              n = null
          }), Q())
      },
      i(i) {
          r || (N(n), r = !0)
      },
      o(i) {
          U(n), r = !1
      },
      d(i) {
          n && n.d(i), i && j(e)
      }
  }
}

function Bl(t, e, r) {
  let n;
  return H(t, Oe, s => r(0, n = s)), [n, () => Oe.set()]
}
class Ul extends de {
  constructor(e) {
      super(), fe(this, e, Bl, zl, ne, {})
  }
}

function Vr(t) {
  let e, r, n;
  return {
      c() {
          e = w("h1"), r = V(t[0])
      },
      m(i, s) {
          M(i, e, s), f(e, r)
      },
      p(i, s) {
          s & 1 && te(r, i[0])
      },
      i(i) {
          n || oe(() => {
              n = ti(e, Xe, {}), n.start()
          })
      },
      o: F,
      d(i) {
          i && j(e)
      }
  }
}

function Il(t) {
  let e, r, n = t[0],
      i, s, l = Vr(t);
  return {
      c() {
          e = w("div"), r = w("div"), l.c(), i = R(), s = w("i"), h(s, "class", "fal fa-spinner-third animate-spin text-5xl"), h(r, "class", "text-center space-y-4"), h(e, "class", "absolute inset-0 grid-center")
      },
      m(o, a) {
          M(o, e, a), f(e, r), l.m(r, null), f(r, i), f(r, s)
      },
      p(o, [a]) {
          a & 1 && ne(n, n = o[0]) ? (G(), U(l, 1, 1, F), Q(), l = Vr(o), l.c(), N(l, 1), l.m(r, i)) : l.p(o, a)
      },
      i(o) {
          N(l)
      },
      o(o) {
          U(l)
      },
      d(o) {
          o && j(e), l.d(o)
      }
  }
}

function Fl(t, e, r) {
  let n, i, s;
  H(t, Ce, a => r(1, n = a)), H(t, _e, a => r(2, i = a)), H(t, pe, a => r(3, s = a));
  let l = "Carregando seus dados...";
  async function o(a) {
      return (await me(() => X.get(a))).data
  }
  return nn(async () => {
      const a = {
          likes: await o("likes"),
          playlists: await o("playlists"),
          history: await o("history")
      };
      if (a.likes.length || a.playlists.length || a.history.last_played.length) return pe.set(a.likes), _e.set(a.playlists), Ce.set(a.history.last_played), Ye("/home");
      if (s !== "migrated" && s.length ? (r(0, l = "Migrando suas m\xFAsicas curtidas..."), await me(() => X.put("likes", s)), pe.save("migrated")) : pe.set(a.likes), i !== "migrated" && i.length) {
          const u = {},
              c = Object.entries(i);
          for (const [d, p] of c) {
              r(0, l = `Migrando suas playlists (${d+1} / ${c.length})`);
              const {
                  data: _
              } = await me(() => X.post("playlists", p));
              u[p.id] = p._id = _._id
          }
          n.forEach(d => {
              d.id in u && (d.id = u[d.id])
          }), i.push(...a.playlists), _e.save("migrated")
      } else _e.set(a.playlists);
      n !== "migrated" && n.length ? (r(0, l = "Migrando seu hist\xF3rico..."), await me(() => X.put("history", {
          last_played: n
      })), Ce.save("migrated"), r(0, l = "Finalizando migra\xE7\xE3o..."), await yt(1500), Oe.set("Agora todas as suas playlists e curtidas ser\xE3o sincronizadas em todas as cidades que voc\xEA jogar.")) : Ce.set(a.history.last_played), Ye("/home")
  }), [l]
}
class ql extends de {
  constructor(e) {
      super(), fe(this, e, Fl, Il, ne, {})
  }
}
const {
  window: Jr
} = ni;

function Wr(t) {
  let e, r, n, i, s, l, o, a, u, c, d, p, _;
  n = new di({
      props: {
          routes: {
              "/": ql,
              "/home": pl,
              "/search": _l,
              "/library": xl,
              "/playlists/:playlist": Tl
          }
      }
  });
  let m = t[2] && Kr();
  l = new Nl({}), a = new Dl({}), c = new Ul({});
  let b = t[1] != "/" && Yr();
  return {
      c() {
          e = w("div"), r = w("div"), ae(n.$$.fragment), i = R(), m && m.c(), s = R(), ae(l.$$.fragment), o = R(), ae(a.$$.fragment), u = R(), ae(c.$$.fragment), d = R(), b && b.c(), h(r, "class", "w-full h-full flex flex-col bg-[#0f0f0f] relative"), h(e, "class", "fixed bottom-8 right-8 w-[25rem] h-[45rem] border-4 rounded-xl overflow-hidden border-black text-white")
      },
      m(g, k) {
          M(g, e, k), f(e, r), se(n, r, null), f(r, i), m && m.m(r, null), f(r, s), se(l, r, null), f(r, o), se(a, r, null), f(r, u), se(c, r, null), f(r, d), b && b.m(r, null), _ = !0
      },
      p(g, k) {
          g[2] ? m ? k & 4 && N(m, 1) : (m = Kr(), m.c(), N(m, 1), m.m(r, s)) : m && (G(), U(m, 1, 1, () => {
              m = null
          }), Q()), g[1] != "/" ? b || (b = Yr(), b.c(), b.m(r, null)) : b && (b.d(1), b = null)
      },
      i(g) {
          _ || (N(n.$$.fragment, g), N(m), N(l.$$.fragment, g), N(a.$$.fragment, g), N(c.$$.fragment, g), oe(() => {
              p || (p = ee(e, he, {
                  y: 400
              }, !0)), p.run(1)
          }), _ = !0)
      },
      o(g) {
          U(n.$$.fragment, g), U(m), U(l.$$.fragment, g), U(a.$$.fragment, g), U(c.$$.fragment, g), p || (p = ee(e, he, {
              y: 400
          }, !1)), p.run(0), _ = !1
      },
      d(g) {
          g && j(e), le(n), m && m.d(), le(l), le(a), le(c), b && b.d(), g && p && p.end()
      }
  }
}

function Kr(t) {
  let e, r;
  return e = new nl({}), {
      c() {
          ae(e.$$.fragment)
      },
      m(n, i) {
          se(e, n, i), r = !0
      },
      i(n) {
          r || (N(e.$$.fragment, n), r = !0)
      },
      o(n) {
          U(e.$$.fragment, n), r = !1
      },
      d(n) {
          le(e, n)
      }
  }
}

function Yr(t) {
  let e;
  return {
      c() {
          e = w("ul"), e.innerHTML = `<a href="#/home" class="flex flex-col items-center"><i class="fal fa-home text-3xl"></i>
      In\xEDcio</a> 

    <a href="#/search" class="flex flex-col items-center"><i class="fal fa-search text-3xl"></i>
      Buscar</a> 

    <a href="#/library" class="flex flex-col items-center"><i class="fal fa-rectangle-vertical-history text-3xl"></i>
      Biblioteca</a>`, h(e, "class", "absolute bottom-0 w-full grid grid-cols-3 pt-4 mt-auto bg-gradient-to-b from-transparent via-black/75 to-black text-sm h-20")
      },
      m(r, n) {
          M(r, e, n)
      },
      d(r) {
          r && j(e)
      }
  }
}

function Hl(t) {
  let e, r, n, i, s = t[0] && Wr(t);
  return {
      c() {
          s && s.c(), e = be()
      },
      m(l, o) {
          s && s.m(l, o), M(l, e, o), r = !0, n || (i = [q(Jr, "keydown", t[3]), q(Jr, "contextmenu", t[4])], n = !0)
      },
      p(l, [o]) {
          l[0] ? s ? (s.p(l, o), o & 1 && N(s, 1)) : (s = Wr(l), s.c(), N(s, 1), s.m(e.parentNode, e)) : s && (G(), U(s, 1, 1, () => {
              s = null
          }), Q())
      },
      i(l) {
          r || (N(s), r = !0)
      },
      o(l) {
          U(s), r = !1
      },
      d(l) {
          s && s.d(l), l && j(e), n = !1, re(i)
      }
  }
}

function Vl(t, e, r) {
  let n, i, s;
  H(t, ci, c => r(1, n = c)), H(t, J, c => r(6, i = c)), H(t, ct, c => r(2, s = c));
  let l = window.invokeNative == null;
  Qe.open = () => {
      K("server", "getToken").then(js).finally(() => {
          r(0, l = !0)
      })
  }, Qe.close = () => {
      r(0, l = !1), K("close")
  };

  function o() {
      K("server", "isPlaying").then(c => {
          !c && !(i != null && i.paused_at) && J.set()
      })
  }

  function a(c) {
      c.code === "Escape" && n != "/" && (r(0, l = !1), K("close"))
  }

  function u() {
      K("toggleKeepInput")
  }
  return t.$$.update = () => {
      t.$$.dirty & 1 && o()
  }, [l, n, s, a, u]
}
class Jl extends de {
  constructor(e) {
      super(), fe(this, e, Vl, Hl, ne, {})
  }
}
new Jl({
  target: document.getElementById("app")
});