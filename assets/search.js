(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
    new MutationObserver(o => {
        for (const i of o)
            if (i.type === "childList")
                for (const l of i.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(o) {
        const i = {};
        return o.integrity && (i.integrity = o.integrity), o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? i.credentials = "include" : o.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function r(o) {
        if (o.ep) return;
        o.ep = !0;
        const i = n(o);
        fetch(o.href, i)
    }
})();
const wt = {
        context: void 0,
        registry: void 0
    },
    yt = (e, t) => e === t,
    $e = Symbol("solid-proxy"),
    mt = Symbol("solid-track"),
    ve = {
        equals: yt
    };
let tt = it;
const H = 1,
    Ce = 2,
    nt = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var v = null;
let je = null,
    vt = null,
    m = null,
    M = null,
    U = null,
    ke = 0;

function ae(e, t) {
    const n = m,
        r = v,
        o = e.length === 0,
        i = t === void 0 ? r : t,
        l = o ? nt : {
            owned: null,
            cleanups: null,
            context: i ? i.context : null,
            owner: i
        },
        s = o ? e : () => e(() => R(() => Te(l)));
    v = l, m = null;
    try {
        return ee(s, !0)
    } finally {
        m = n, v = r
    }
}

function B(e, t) {
    t = t ? Object.assign({}, ve, t) : ve;
    const n = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: t.equals || void 0
        },
        r = o => (typeof o == "function" && (o = o(n.value)), st(n, o));
    return [ot.bind(n), r]
}

function K(e, t, n) {
    const r = Ne(e, t, !1, H);
    ue(r)
}

function rt(e, t, n) {
    tt = Et;
    const r = Ne(e, t, !1, H);
    (!n || !n.render) && (r.user = !0), U ? U.push(r) : ue(r)
}

function $(e, t, n) {
    n = n ? Object.assign({}, ve, n) : ve;
    const r = Ne(e, t, !0, 0);
    return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, ue(r), ot.bind(r)
}

function R(e) {
    if (m === null) return e();
    const t = m;
    m = null;
    try {
        return e()
    } finally {
        m = t
    }
}

function Q(e) {
    rt(() => R(e))
}

function X(e) {
    return v === null || (v.cleanups === null ? v.cleanups = [e] : v.cleanups.push(e)), e
}

function Ct() {
    return v
}

function Lt(e, t) {
    const n = v,
        r = m;
    v = e, m = null;
    try {
        return ee(t, !0)
    } catch (o) {
        Re(o)
    } finally {
        v = n, m = r
    }
}

function xt(e) {
    const t = $(e),
        n = $(() => Ke(t()));
    return n.toArray = () => {
        const r = n();
        return Array.isArray(r) ? r : r != null ? [r] : []
    }, n
}

function ot() {
    if (this.sources && this.state)
        if (this.state === H) ue(this);
        else {
            const e = M;
            M = null, ee(() => xe(this), !1), M = e
        } if (m) {
        const e = this.observers ? this.observers.length : 0;
        m.sources ? (m.sources.push(this), m.sourceSlots.push(e)) : (m.sources = [this], m.sourceSlots = [e]), this.observers ? (this.observers.push(m), this.observerSlots.push(m.sources.length - 1)) : (this.observers = [m], this.observerSlots = [m.sources.length - 1])
    }
    return this.value
}

function st(e, t, n) {
    let r = e.value;
    return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && ee(() => {
        for (let o = 0; o < e.observers.length; o += 1) {
            const i = e.observers[o],
                l = je && je.running;
            l && je.disposed.has(i), (l ? !i.tState : !i.state) && (i.pure ? M.push(i) : U.push(i), i.observers && lt(i)), l || (i.state = H)
        }
        if (M.length > 1e6) throw M = [], new Error
    }, !1)), t
}

function ue(e) {
    if (!e.fn) return;
    Te(e);
    const t = ke;
    St(e, e.value, t)
}

function St(e, t, n) {
    let r;
    const o = v,
        i = m;
    m = v = e;
    try {
        r = e.fn(t)
    } catch (l) {
        return e.pure && (e.state = H, e.owned && e.owned.forEach(Te), e.owned = null), e.updatedAt = n + 1, Re(l)
    } finally {
        m = i, v = o
    }(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? st(e, r) : e.value = r, e.updatedAt = n)
}

function Ne(e, t, n, r = H, o) {
    const i = {
        fn: e,
        state: r,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: v,
        context: v ? v.context : null,
        pure: n
    };
    return v === null || v !== nt && (v.owned ? v.owned.push(i) : v.owned = [i]), i
}

function Le(e) {
    if (e.state === 0) return;
    if (e.state === Ce) return xe(e);
    if (e.suspense && R(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const t = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < ke);) e.state && t.push(e);
    for (let n = t.length - 1; n >= 0; n--)
        if (e = t[n], e.state === H) ue(e);
        else if (e.state === Ce) {
        const r = M;
        M = null, ee(() => xe(e, t[0]), !1), M = r
    }
}

function ee(e, t) {
    if (M) return e();
    let n = !1;
    t || (M = []), U ? n = !0 : U = [], ke++;
    try {
        const r = e();
        return At(n), r
    } catch (r) {
        n || (U = null), M = null, Re(r)
    }
}

function At(e) {
    if (M && (it(M), M = null), e) return;
    const t = U;
    U = null, t.length && ee(() => tt(t), !1)
}

function it(e) {
    for (let t = 0; t < e.length; t++) Le(e[t])
}

function Et(e) {
    let t, n = 0;
    for (t = 0; t < e.length; t++) {
        const r = e[t];
        r.user ? e[n++] = r : Le(r)
    }
    for (t = 0; t < n; t++) Le(e[t])
}

function xe(e, t) {
    e.state = 0;
    for (let n = 0; n < e.sources.length; n += 1) {
        const r = e.sources[n];
        if (r.sources) {
            const o = r.state;
            o === H ? r !== t && (!r.updatedAt || r.updatedAt < ke) && Le(r) : o === Ce && xe(r, t)
        }
    }
}

function lt(e) {
    for (let t = 0; t < e.observers.length; t += 1) {
        const n = e.observers[t];
        n.state || (n.state = Ce, n.pure ? M.push(n) : U.push(n), n.observers && lt(n))
    }
}

function Te(e) {
    let t;
    if (e.sources)
        for (; e.sources.length;) {
            const n = e.sources.pop(),
                r = e.sourceSlots.pop(),
                o = n.observers;
            if (o && o.length) {
                const i = o.pop(),
                    l = n.observerSlots.pop();
                r < o.length && (i.sourceSlots[l] = r, o[r] = i, n.observerSlots[r] = l)
            }
        }
    if (e.owned) {
        for (t = e.owned.length - 1; t >= 0; t--) Te(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
        e.cleanups = null
    }
    e.state = 0
}

function kt(e) {
    return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
        cause: e
    })
}

function Re(e, t = v) {
    throw kt(e)
}

function Ke(e) {
    if (typeof e == "function" && !e.length) return Ke(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const r = Ke(e[n]);
            Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
        }
        return t
    }
    return e
}
const Tt = Symbol("fallback");

function Xe(e) {
    for (let t = 0; t < e.length; t++) e[t]()
}

function zt(e, t, n = {}) {
    let r = [],
        o = [],
        i = [],
        l = 0,
        s = t.length > 1 ? [] : null;
    return X(() => Xe(i)), () => {
        let c = e() || [],
            u, a;
        return c[mt], R(() => {
            let d = c.length,
                h, p, L, k, T, E, A, j, D;
            if (d === 0) l !== 0 && (Xe(i), i = [], r = [], o = [], l = 0, s && (s = [])), n.fallback && (r = [Tt], o[0] = ae(Me => (i[0] = Me, n.fallback())), l = 1);
            else if (l === 0) {
                for (o = new Array(d), a = 0; a < d; a++) r[a] = c[a], o[a] = ae(f);
                l = d
            } else {
                for (L = new Array(d), k = new Array(d), s && (T = new Array(d)), E = 0, A = Math.min(l, d); E < A && r[E] === c[E]; E++);
                for (A = l - 1, j = d - 1; A >= E && j >= E && r[A] === c[j]; A--, j--) L[j] = o[A], k[j] = i[A], s && (T[j] = s[A]);
                for (h = new Map, p = new Array(j + 1), a = j; a >= E; a--) D = c[a], u = h.get(D), p[a] = u === void 0 ? -1 : u, h.set(D, a);
                for (u = E; u <= A; u++) D = r[u], a = h.get(D), a !== void 0 && a !== -1 ? (L[a] = o[u], k[a] = i[u], s && (T[a] = s[u]), a = p[a], h.set(D, a)) : i[u]();
                for (a = E; a < d; a++) a in L ? (o[a] = L[a], i[a] = k[a], s && (s[a] = T[a], s[a](a))) : o[a] = ae(f);
                o = o.slice(0, l = d), r = c.slice(0)
            }
            return o
        });

        function f(d) {
            if (i[a] = d, s) {
                const [h, p] = B(a);
                return s[a] = p, t(c[a], h)
            }
            return t(c[a])
        }
    }
}

function g(e, t) {
    return R(() => e(t || {}))
}

function _e() {
    return !0
}
const Mt = {
    get(e, t, n) {
        return t === $e ? n : e.get(t)
    },
    has(e, t) {
        return t === $e ? !0 : e.has(t)
    },
    set: _e,
    deleteProperty: _e,
    getOwnPropertyDescriptor(e, t) {
        return {
            configurable: !0,
            enumerable: !0,
            get() {
                return e.get(t)
            },
            set: _e,
            deleteProperty: _e
        }
    },
    ownKeys(e) {
        return e.keys()
    }
};

function Oe(e) {
    return (e = typeof e == "function" ? e() : e) ? e : {}
}

function jt() {
    for (let e = 0, t = this.length; e < t; ++e) {
        const n = this[e]();
        if (n !== void 0) return n
    }
}

function Ot(...e) {
    let t = !1;
    for (let l = 0; l < e.length; l++) {
        const s = e[l];
        t = t || !!s && $e in s, e[l] = typeof s == "function" ? (t = !0, $(s)) : s
    }
    if (t) return new Proxy({
        get(l) {
            for (let s = e.length - 1; s >= 0; s--) {
                const c = Oe(e[s])[l];
                if (c !== void 0) return c
            }
        },
        has(l) {
            for (let s = e.length - 1; s >= 0; s--)
                if (l in Oe(e[s])) return !0;
            return !1
        },
        keys() {
            const l = [];
            for (let s = 0; s < e.length; s++) l.push(...Object.keys(Oe(e[s])));
            return [...new Set(l)]
        }
    }, Mt);
    const n = {},
        r = Object.create(null);
    for (let l = e.length - 1; l >= 0; l--) {
        const s = e[l];
        if (!s) continue;
        const c = Object.getOwnPropertyNames(s);
        for (let u = c.length - 1; u >= 0; u--) {
            const a = c[u];
            if (a === "__proto__" || a === "constructor") continue;
            const f = Object.getOwnPropertyDescriptor(s, a);
            if (!r[a]) r[a] = f.get ? {
                enumerable: !0,
                configurable: !0,
                get: jt.bind(n[a] = [f.get.bind(s)])
            } : f.value !== void 0 ? f : void 0;
            else {
                const d = n[a];
                d && (f.get ? d.push(f.get.bind(s)) : f.value !== void 0 && d.push(() => f.value))
            }
        }
    }
    const o = {},
        i = Object.keys(r);
    for (let l = i.length - 1; l >= 0; l--) {
        const s = i[l],
            c = r[s];
        c && c.get ? Object.defineProperty(o, s, c) : o[s] = c ? c.value : void 0
    }
    return o
}
const at = e => `Stale read from <${e}>.`;

function be(e) {
    const t = "fallback" in e && {
        fallback: () => e.fallback
    };
    return $(zt(() => e.each, e.children, t || void 0))
}

function De(e) {
    const t = e.keyed,
        n = $(() => e.when, void 0, {
            equals: (r, o) => t ? r === o : !r == !o
        });
    return $(() => {
        const r = n();
        if (r) {
            const o = e.children;
            return typeof o == "function" && o.length > 0 ? R(() => o(t ? r : () => {
                if (!R(n)) throw at("Show");
                return e.when
            })) : o
        }
        return e.fallback
    }, void 0, void 0)
}

function $t(e) {
    let t = !1;
    const n = (i, l) => (t ? i[1] === l[1] : !i[1] == !l[1]) && i[2] === l[2],
        r = xt(() => e.children),
        o = $(() => {
            let i = r();
            Array.isArray(i) || (i = [i]);
            for (let l = 0; l < i.length; l++) {
                const s = i[l].when;
                if (s) return t = !!i[l].keyed, [l, s, i[l]]
            }
            return [-1]
        }, void 0, {
            equals: n
        });
    return $(() => {
        const [i, l, s] = o();
        if (i < 0) return e.fallback;
        const c = s.children;
        return typeof c == "function" && c.length > 0 ? R(() => c(t ? l : () => {
            if (R(o)[0] !== i) throw at("Match");
            return s.when
        })) : c
    }, void 0, void 0)
}

function ge(e) {
    return e
}

function Kt(e, t, n) {
    let r = n.length,
        o = t.length,
        i = r,
        l = 0,
        s = 0,
        c = t[o - 1].nextSibling,
        u = null;
    for (; l < o || s < i;) {
        if (t[l] === n[s]) {
            l++, s++;
            continue
        }
        for (; t[o - 1] === n[i - 1];) o--, i--;
        if (o === l) {
            const a = i < r ? s ? n[s - 1].nextSibling : n[i - s] : c;
            for (; s < i;) e.insertBefore(n[s++], a)
        } else if (i === s)
            for (; l < o;)(!u || !u.has(t[l])) && t[l].remove(), l++;
        else if (t[l] === n[i - 1] && n[s] === t[o - 1]) {
            const a = t[--o].nextSibling;
            e.insertBefore(n[s++], t[l++].nextSibling), e.insertBefore(n[--i], a), t[o] = n[i]
        } else {
            if (!u) {
                u = new Map;
                let f = s;
                for (; f < i;) u.set(n[f], f++)
            }
            const a = u.get(t[l]);
            if (a != null)
                if (s < a && a < i) {
                    let f = l,
                        d = 1,
                        h;
                    for (; ++f < o && f < i && !((h = u.get(t[f])) == null || h !== a + d);) d++;
                    if (d > a - s) {
                        const p = t[l];
                        for (; s < a;) e.insertBefore(n[s++], p)
                    } else e.replaceChild(n[s++], t[l++])
                } else l++;
            else t[l++].remove()
        }
    }
}
const Je = "_$DX_DELEGATE";

function Pt(e, t, n, r = {}) {
    let o;
    return ae(i => {
        o = i, t === document ? e() : _(t, e(), t.firstChild ? null : void 0, n)
    }, r.owner), () => {
        o(), t.textContent = ""
    }
}

function y(e, t, n) {
    let r;
    const o = () => {
            const l = document.createElement("template");
            return l.innerHTML = e, l.content.firstChild
        },
        i = () => (r || (r = o())).cloneNode(!0);
    return i.cloneNode = i, i
}

function Fe(e, t = window.document) {
    const n = t[Je] || (t[Je] = new Set);
    for (let r = 0, o = e.length; r < o; r++) {
        const i = e[r];
        n.has(i) || (n.add(i), t.addEventListener(i, Bt))
    }
}

function x(e, t, n) {
    n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
}

function le(e, t, n, r) {
    if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
    else if (Array.isArray(n)) {
        const o = n[0];
        e.addEventListener(t, n[0] = i => o.call(e, n[1], i))
    } else e.addEventListener(t, n)
}

function we(e, t, n) {
    return R(() => e(t, n))
}

function _(e, t, n, r) {
    if (n !== void 0 && !r && (r = []), typeof t != "function") return Se(e, t, r, n);
    K(o => Se(e, t(), o, n), r)
}

function Bt(e) {
    const t = `$$${e.type}`;
    let n = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== n && Object.defineProperty(e, "target", {
            configurable: !0,
            value: n
        }), Object.defineProperty(e, "currentTarget", {
            configurable: !0,
            get() {
                return n || document
            }
        }); n;) {
        const r = n[t];
        if (r && !n.disabled) {
            const o = n[`${t}Data`];
            if (o !== void 0 ? r.call(n, o, e) : r.call(n, e), e.cancelBubble) return
        }
        n = n._$host || n.parentNode || n.host
    }
}

function Se(e, t, n, r, o) {
    for (; typeof n == "function";) n = n();
    if (t === n) return n;
    const i = typeof t,
        l = r !== void 0;
    if (e = l && n[0] && n[0].parentNode || e, i === "string" || i === "number")
        if (i === "number" && (t = t.toString()), l) {
            let s = n[0];
            s && s.nodeType === 3 ? s.data !== t && (s.data = t) : s = document.createTextNode(t), n = Y(e, n, r, s)
        } else n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
    else if (t == null || i === "boolean") n = Y(e, n, r);
    else {
        if (i === "function") return K(() => {
            let s = t();
            for (; typeof s == "function";) s = s();
            n = Se(e, s, n, r)
        }), () => n;
        if (Array.isArray(t)) {
            const s = [],
                c = n && Array.isArray(n);
            if (Pe(s, t, n, o)) return K(() => n = Se(e, s, n, r, !0)), () => n;
            if (s.length === 0) {
                if (n = Y(e, n, r), l) return n
            } else c ? n.length === 0 ? Ye(e, s, r) : Kt(e, n, s) : (n && Y(e), Ye(e, s));
            n = s
        } else if (t.nodeType) {
            if (Array.isArray(n)) {
                if (l) return n = Y(e, n, r, t);
                Y(e, n, null, t)
            } else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
            n = t
        }
    }
    return n
}

function Pe(e, t, n, r) {
    let o = !1;
    for (let i = 0, l = t.length; i < l; i++) {
        let s = t[i],
            c = n && n[e.length],
            u;
        if (!(s == null || s === !0 || s === !1))
            if ((u = typeof s) == "object" && s.nodeType) e.push(s);
            else if (Array.isArray(s)) o = Pe(e, s, c) || o;
        else if (u === "function")
            if (r) {
                for (; typeof s == "function";) s = s();
                o = Pe(e, Array.isArray(s) ? s : [s], Array.isArray(c) ? c : [c]) || o
            } else e.push(s), o = !0;
        else {
            const a = String(s);
            c && c.nodeType === 3 && c.data === a ? e.push(c) : e.push(document.createTextNode(a))
        }
    }
    return o
}

function Ye(e, t, n = null) {
    for (let r = 0, o = t.length; r < o; r++) e.insertBefore(t[r], n)
}

function Y(e, t, n, r) {
    if (n === void 0) return e.textContent = "";
    const o = r || document.createTextNode("");
    if (t.length) {
        let i = !1;
        for (let l = t.length - 1; l >= 0; l--) {
            const s = t[l];
            if (o !== s) {
                const c = s.parentNode === e;
                !i && !l ? c ? e.replaceChild(o, s) : e.insertBefore(o, n) : c && s.remove()
            } else i = !0
        }
    } else e.insertBefore(o, n);
    return [o]
}
const Nt = "http://www.w3.org/2000/svg";

function Rt(e, t = !1) {
    return t ? document.createElementNS(Nt, e) : document.createElement(e)
}

function Dt(e) {
    const {
        useShadow: t
    } = e, n = document.createTextNode(""), r = () => e.mount || document.body, o = Ct();
    let i, l = !!wt.context;
    return rt(() => {
        i || (i = Lt(o, () => $(() => e.children)));
        const s = r();
        if (s instanceof HTMLHeadElement) {
            const [c, u] = B(!1), a = () => u(!0);
            ae(f => _(s, () => c() ? f() : i(), null)), X(a)
        } else {
            const c = Rt(e.isSVG ? "g" : "div", e.isSVG),
                u = t && c.attachShadow ? c.attachShadow({
                    mode: "open"
                }) : c;
            Object.defineProperty(c, "_$host", {
                get() {
                    return n.parentNode
                },
                configurable: !0
            }), _(u, i), s.appendChild(c), e.ref && e.ref(c), X(() => s.removeChild(c))
        }
    }, void 0, {
        render: !l
    }), n
}
const Ft = "/pizza.wasm",
    qt = async (e = {}, t) => {
        let n;
        if (t.startsWith("data:")) {
            const r = t.replace(/^data:.*?base64,/, "");
            let o;
            if (typeof Buffer == "function" && typeof Buffer.from == "function") o = Buffer.from(r, "base64");
            else if (typeof atob == "function") {
                const i = atob(r);
                o = new Uint8Array(i.length);
                for (let l = 0; l < i.length; l++) o[l] = i.charCodeAt(l)
            } else throw new Error("Cannot decode base64-encoded data URL");
            n = await WebAssembly.instantiate(o, e)
        } else {
            const r = await fetch(t),
                o = r.headers.get("Content-Type") || "";
            if ("instantiateStreaming" in WebAssembly && o.startsWith("application/wasm")) n = await WebAssembly.instantiateStreaming(r, e);
            else {
                const i = await r.arrayBuffer();
                n = await WebAssembly.instantiate(i, e)
            }
        }
        return n.instance.exports
    };
let S;

function Zt(e) {
    S = e
}
const Ut = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
let ct = new Ut("utf-8", {
    ignoreBOM: !0,
    fatal: !0
});
ct.decode();
let pe = null;

function ye() {
    return (pe === null || pe.byteLength === 0) && (pe = new Uint8Array(S.memory.buffer)), pe
}

function ze(e, t) {
    return e = e >>> 0, ct.decode(ye().subarray(e, e + t))
}
const Z = new Array(128).fill(void 0);
Z.push(void 0, null, !0, !1);
let ce = Z.length;

function C(e) {
    ce === Z.length && Z.push(Z.length + 1);
    const t = ce;
    return ce = Z[t], Z[t] = e, t
}

function b(e) {
    return Z[e]
}

function It(e) {
    e < 132 || (Z[e] = ce, ce = e)
}

function Ae(e) {
    const t = b(e);
    return It(e), t
}
let G = 0;
const Vt = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
let me = new Vt("utf-8");
const Wt = typeof me.encodeInto == "function" ? function(e, t) {
    return me.encodeInto(e, t)
} : function(e, t) {
    const n = me.encode(e);
    return t.set(n), {
        read: e.length,
        written: n.length
    }
};

function ie(e, t, n) {
    if (n === void 0) {
        const s = me.encode(e),
            c = t(s.length, 1) >>> 0;
        return ye().subarray(c, c + s.length).set(s), G = s.length, c
    }
    let r = e.length,
        o = t(r, 1) >>> 0;
    const i = ye();
    let l = 0;
    for (; l < r; l++) {
        const s = e.charCodeAt(l);
        if (s > 127) break;
        i[o + l] = s
    }
    if (l !== r) {
        l !== 0 && (e = e.slice(l)), o = n(o, r, r = l + e.length * 3, 1) >>> 0;
        const s = ye().subarray(o + l, o + r),
            c = Wt(e, s);
        l += c.written, o = n(o, r, l, 1) >>> 0
    }
    return G = l, o
}

function I(e, t) {
    try {
        return e.apply(this, t)
    } catch (n) {
        S.__wbindgen_export_2(C(n))
    }
}
const et = typeof FinalizationRegistry > "u" ? {
    register: () => {},
    unregister: () => {}
} : new FinalizationRegistry(e => S.__wbg_pizza_free(e >>> 0, 1));
class Ee {
    static __wrap(t) {
        t = t >>> 0;
        const n = Object.create(Ee.prototype);
        return n.__wbg_ptr = t, et.register(n, n.__wbg_ptr, n), n
    }
    __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, et.unregister(this), t
    }
    free() {
        const t = this.__destroy_into_raw();
        S.__wbg_pizza_free(t, 0)
    }
    static new() {
        const t = S.pizza_new();
        return Ee.__wrap(t)
    }
    load_json_objects_array(t) {
        const n = ie(t, S.__wbindgen_export_0, S.__wbindgen_export_1),
            r = G;
        return S.pizza_load_json_objects_array(this.__wbg_ptr, n, r) !== 0
    }
    search_by_query_string(t) {
        const n = ie(t, S.__wbindgen_export_0, S.__wbindgen_export_1),
            r = G,
            o = S.pizza_search_by_query_string(this.__wbg_ptr, n, r);
        return Ae(o)
    }
    advanced_search_by_query_string(t, n, r, o, i, l) {
        const s = ie(t, S.__wbindgen_export_0, S.__wbindgen_export_1),
            c = G,
            u = ie(n, S.__wbindgen_export_0, S.__wbindgen_export_1),
            a = G,
            f = ie(r, S.__wbindgen_export_0, S.__wbindgen_export_1),
            d = G,
            h = S.pizza_advanced_search_by_query_string(this.__wbg_ptr, s, c, u, a, f, d, o, i, l);
        return Ae(h)
    }
}

function Ht(e, t) {
    const n = JSON.parse(ze(e, t));
    return C(n)
}

function Gt(e) {
    const t = b(e);
    return typeof t == "object" && t !== null
}

function Qt(e) {
    const t = b(e).crypto;
    return C(t)
}

function Xt(e) {
    const t = b(e).process;
    return C(t)
}

function Jt(e) {
    const t = b(e).versions;
    return C(t)
}

function Yt(e) {
    const t = b(e).node;
    return C(t)
}

function e1(e) {
    return typeof b(e) == "string"
}

function t1() {
    return I(function() {
        const e = module.require;
        return C(e)
    }, arguments)
}

function n1(e, t) {
    const n = ze(e, t);
    return C(n)
}

function r1(e) {
    const t = b(e).msCrypto;
    return C(t)
}

function o1() {
    return I(function(e, t) {
        b(e).randomFillSync(Ae(t))
    }, arguments)
}

function s1() {
    return I(function(e, t) {
        b(e).getRandomValues(b(t))
    }, arguments)
}

function i1(e) {
    Ae(e)
}

function l1(e) {
    return typeof b(e) == "function"
}

function a1() {
    return I(function() {
        const e = self.self;
        return C(e)
    }, arguments)
}

function c1() {
    return I(function() {
        const e = window.window;
        return C(e)
    }, arguments)
}

function u1() {
    return I(function() {
        const e = globalThis.globalThis;
        return C(e)
    }, arguments)
}

function d1() {
    return I(function() {
        const e = global.global;
        return C(e)
    }, arguments)
}

function f1(e) {
    return b(e) === void 0
}

function h1(e, t) {
    const n = new Function(ze(e, t));
    return C(n)
}

function _1(e) {
    const t = b(e);
    return C(t)
}

function g1() {
    return I(function(e, t) {
        const n = b(e).call(b(t));
        return C(n)
    }, arguments)
}

function p1() {
    return I(function(e, t, n) {
        const r = b(e).call(b(t), b(n));
        return C(r)
    }, arguments)
}

function b1(e) {
    const t = b(e).buffer;
    return C(t)
}

function w1(e, t, n) {
    const r = new Uint8Array(b(e), t >>> 0, n >>> 0);
    return C(r)
}

function y1(e) {
    const t = new Uint8Array(b(e));
    return C(t)
}

function m1(e) {
    const t = new Uint8Array(e >>> 0);
    return C(t)
}

function v1(e, t, n) {
    const r = b(e).subarray(t >>> 0, n >>> 0);
    return C(r)
}

function C1(e, t, n) {
    b(e).set(b(t), n >>> 0)
}

function L1(e, t) {
    throw new Error(ze(e, t))
}

function x1() {
    const e = S.memory;
    return C(e)
}
URL = globalThis.URL;
const V = await qt({
        "./pizza_wasm_bg.js": {
            __wbindgen_json_parse: Ht,
            __wbindgen_is_object: Gt,
            __wbg_crypto_1d1f22824a6a080c: Qt,
            __wbg_process_4a72847cc503995b: Xt,
            __wbg_versions_f686565e586dd935: Jt,
            __wbg_node_104a2ff8d6ea03a2: Yt,
            __wbindgen_is_string: e1,
            __wbg_require_cca90b1a94a0255b: t1,
            __wbindgen_string_new: n1,
            __wbg_msCrypto_eb05e62b530a1508: r1,
            __wbg_randomFillSync_5c9c955aa56b6049: o1,
            __wbg_getRandomValues_3aa56aa6edec874c: s1,
            __wbindgen_object_drop_ref: i1,
            __wbindgen_is_function: l1,
            __wbg_self_3093d5d1f7bcb682: a1,
            __wbg_window_3bcfc4d31bc012f8: c1,
            __wbg_globalThis_86b222e13bdf32ed: u1,
            __wbg_global_e5a3fe56f8be9485: d1,
            __wbindgen_is_undefined: f1,
            __wbg_newnoargs_76313bd6ff35d0f2: h1,
            __wbindgen_object_clone_ref: _1,
            __wbg_call_1084a111329e68ce: g1,
            __wbg_call_89af060b4e1523f2: p1,
            __wbg_buffer_b7b08af79b0b0974: b1,
            __wbg_newwithbyteoffsetandlength_8a2cb9ca96b27ec9: w1,
            __wbg_new_ea1883e1e5e86686: y1,
            __wbg_newwithlength_ec548f448387c968: m1,
            __wbg_subarray_7c2e3576afe181d1: v1,
            __wbg_set_d1e79e2388520f18: C1,
            __wbindgen_throw: L1,
            __wbindgen_memory: x1
        }
    }, Ft),
    S1 = V.memory,
    A1 = V.__wbg_pizza_free,
    E1 = V.pizza_new,
    k1 = V.pizza_load_json_objects_array,
    T1 = V.pizza_search_by_query_string,
    z1 = V.pizza_advanced_search_by_query_string,
    M1 = V.__wbindgen_export_0,
    j1 = V.__wbindgen_export_1,
    O1 = V.__wbindgen_export_2,
    $1 = Object.freeze(Object.defineProperty({
        __proto__: null,
        __wbg_pizza_free: A1,
        __wbindgen_export_0: M1,
        __wbindgen_export_1: j1,
        __wbindgen_export_2: O1,
        memory: S1,
        pizza_advanced_search_by_query_string: z1,
        pizza_load_json_objects_array: k1,
        pizza_new: E1,
        pizza_search_by_query_string: T1
    }, Symbol.toStringTag, {
        value: "Module"
    }));
Zt($1);
var K1 = y('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"><path fill=currentColor d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z">'),
    ut = e => (() => {
        var t = K1();
        return K(() => x(t, "class", e.class)), t
    })();

function P1(e, t = 300) {
    let n;
    return (...r) => {
        clearTimeout(n), n = setTimeout(() => e(...r), t)
    }
}

function dt(e) {
    return /(ctrl|control|command|cmd|commandorcontrl|cmdorctrl)/i.test(e)
}

function ft(e) {
    return /(alt|option)/i.test(e)
}

function B1(e) {
    return /(meta|super)/i.test(e)
}

function Be() {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
}
var N1 = y("<button type=button class=docsearch-btn><span class=docsearch-btn-icon-container></span><span class=docsearch-btn-placeholder> <!> "),
    R1 = y("<span class=docsearch-btn-keys>"),
    D1 = y("<kbd class=docsearch-btn-key>"),
    F1 = "Ctrl",
    q1 = "⌘",
    Z1 = "Alt",
    U1 = "Option",
    I1 = ({
        onClick: e,
        hotKeys: t,
        translations: n = {}
    }) => {
        let {
            buttonText: r = "Search",
            buttonAriaLabel: o = "Search"
        } = n, [i, l] = B(null), [s, c] = B(null);
        return Q(() => {
            typeof navigator < "u" && (Be() ? (l(q1), c(U1)) : (l(F1), c(Z1)))
        }), (() => {
            var u = N1(),
                a = u.firstChild,
                f = a.nextSibling,
                d = f.firstChild,
                h = d.nextSibling;
            return h.nextSibling, le(u, "click", e, !0), x(u, "aria-label", o), _(a, g(ut, {
                class: "docsearch-modal-btn-icon"
            })), _(f, r, h), _(u, (() => {
                var p = $(() => !!(t && t.length > 0));
                return () => p() && (() => {
                    var L = R1();
                    return _(L, g(be, {
                        get each() {
                            return t[0].split("+")
                        },
                        children: k => (() => {
                            var T = D1();
                            return _(T, (() => {
                                var E = $(() => !!dt(k));
                                return () => E() ? i() : (() => {
                                    var A = $(() => !!ft(k));
                                    return () => A() ? s() : k[0].toUpperCase() + k.slice(1)
                                })()
                            })()), T
                        })()
                    })), L
                })()
            })(), null), u
        })()
    };
Fe(["click"]);

function V1({
    isOpen: e,
    onOpen: t,
    onClose: n,
    onInput: r,
    hotKeys: o
}) {
    function i(c) {
        let u = c.target,
            a = u.tagName;
        return u.isContentEditable || a === "INPUT" || a === "SELECT" || a === "TEXTAREA"
    }

    function l(c) {
        let u = o && o.map(a => a.toLowerCase().split("+"));
        return u ? u.some(a => {
            if (a.length === 1 && c.key.toLowerCase() === a[0] && !c.ctrlKey && !c.altKey && !c.shiftKey && !i(c) && !e()) return !0;
            if (a.length > 1) {
                let f = a[a.length - 1];
                if (c.key.toLowerCase() !== f) return !1;
                let d = (Be() ? c.metaKey : c.ctrlKey) == a.some(dt),
                    h = c.shiftKey == a.includes("shift"),
                    p = c.altKey == a.some(ft),
                    L = !Be() && c.metaKey == a.some(B1);
                return d && h && p && L
            }
            return !1
        }) : !1
    }

    function s(c) {
        if (c.key === "Escape" && e() || l(c)) {
            if (c.preventDefault(), e()) n();
            else if (!document.body.classList.contains("docsearch--active")) {
                let u = window.getSelection();
                u && r(u.toString()), t()
            }
        }
    }
    Q(() => window.addEventListener("keydown", s)), X(() => window.removeEventListener("keydown", s))
}
var W1 = y('<svg xmlns=http://www.w3.org/2000/svg width=15 height=15 viewBox="0 0 24 24"><path fill=currentColor d="M12 4a1 1 0 0 1 1 1v11.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L11 16.586V5a1 1 0 0 1 1-1z">'),
    H1 = e => (() => {
        var t = W1();
        return K(n => {
            var r = e.class,
                o = e["aria-label"];
            return r !== n.e && x(t, "class", n.e = r), o !== n.t && x(t, "aria-label", n.t = o), n
        }, {
            e: void 0,
            t: void 0
        }), t
    })(),
    G1 = y('<svg xmlns=http://www.w3.org/2000/svg width=15 height=15 viewBox="0 0 24 24"><g fill=currentColor fill-rule=evenodd clip-rule=evenodd><path d="M3 14a1 1 0 0 1 1-1h12a3 3 0 0 0 3-3V6a1 1 0 1 1 2 0v4a5 5 0 0 1-5 5H4a1 1 0 0 1-1-1z"></path><path d="M3.293 14.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 14l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4z">'),
    ht = e => (() => {
        var t = G1();
        return K(n => {
            var r = e.class,
                o = e["aria-label"];
            return r !== n.e && x(t, "class", n.e = r), o !== n.t && x(t, "aria-label", n.t = o), n
        }, {
            e: void 0,
            t: void 0
        }), t
    })(),
    Q1 = y('<svg width=15 height=15 viewBox="0 0 15 15"role=img><g fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.2><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956">'),
    X1 = e => (() => {
        var t = Q1();
        return K(n => {
            var r = e.class,
                o = e["aria-label"];
            return r !== n.e && x(t, "class", n.e = r), o !== n.t && x(t, "aria-label", n.t = o), n
        }, {
            e: void 0,
            t: void 0
        }), t
    })(),
    J1 = y('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 216 60"height=26><g data-name=layer><g><path fill=#2d2d2d d=M52.43,17.22h3.75v21.62h-3.75V17.22Z></path><path fill=#2d2d2d d=M59.26,38.84l-.03-21.66,14.11,13.25v-13.25h3.69v21.65l-14.12-13.26v13.28h-3.64Z></path><path fill=#2d2d2d d=M98.03,17.22h3.75v21.62h-3.75V17.22Z></path><path fill=#2d2d2d d=M80.22,17.16h14.61v3.41h-10.86v5.76h9.32v3.43h-9.32v9.08h-3.75V17.16Z></path><path fill=#2d2d2d d=M105.19,38.84l-.03-21.66,14.11,13.25v-13.25h3.69v21.65l-14.12-13.26v13.28h-3.64Z></path><path fill=#2d2d2d d=M126.08,17.22h3.75v21.62h-3.75V17.22Z></path><path fill=#2d2d2d d=M150.37,29.59h-8.02v9.25h-3.47V17.16h11.53s.06,0,.06,0c1.71-.02,3.18,.58,4.4,1.81,1.22,1.22,1.83,2.69,1.83,4.41s-.61,3.19-1.83,4.4c-1.21,1.22-2.67,1.83-4.4,1.83h-.09Zm-8.02-8.97v5.48h8.11c.76,.01,1.41-.25,1.95-.79,.61-.61,.87-1.36,.79-2.27-.05-.5-.25-.99-.57-1.38-.58-.7-1.3-1.05-2.16-1.05h-8.11Z></path><path fill=#2d2d2d d=M158.59,17.16h3.78v3.79h-3.78v-3.79Zm3.78,6.18v15.5h-3.78v-15.5h3.78Z></path><path fill=#2d2d2d d=M164.69,23.39h12.6l-.21,.41-6.07,11.38h6.09v3.67h-12.58l.21-.41,6.13-11.38h-6.16v-3.67Z></path><path fill=#2d2d2d d=M179.48,23.39h12.6l-.21,.41-6.07,11.38h6.09v3.67h-12.58l.21-.41,6.13-11.38h-6.16v-3.67Z></path><path fill=#2d2d2d d=M204.03,23.7c.59,.19,1.16,.45,1.71,.79v-1.12h3.67v15.33h-3.67v-1.04c-.54,.33-1.11,.59-1.71,.79-.77,.24-1.55,.36-2.36,.36-1.05,0-2.05-.2-3.01-.6-.93-.39-1.75-.95-2.46-1.66-.72-.71-1.27-1.54-1.66-2.46-.4-.96-.6-1.96-.6-3.01s.2-2.05,.6-3.01c.39-.93,.95-1.75,1.66-2.46,.71-.71,1.54-1.27,2.46-1.66,.96-.4,1.96-.6,3.01-.6,.81,0,1.59,.12,2.36,.36Zm-2.31,3.31c-1.14-.01-2.11,.39-2.92,1.19-.79,.8-1.18,1.75-1.18,2.87s.39,2.08,1.18,2.87c.8,.79,1.75,1.18,2.87,1.18s2.07-.39,2.87-1.18c.8-.79,1.19-1.75,1.19-2.87s-.38-2.03-1.14-2.82-1.8-1.24-2.88-1.25Z></path><path fill=#6b0bea d=M45.04,27.9s.2-1.39,.43-3.05l-2.93,2.14h0S8.94,51.47,8.94,51.47l5.69-31.9,.7-3.9h0c.51,.18,1.02,.37,1.52,.57,.12,.05,.23,.09,.35,.14,.51,.21,1.02,.42,1.53,.64h0s-4.69,26.31-4.69,26.31l24.7-17.99,7.44-5.44-1.04-2.44c-1.19-1.27-2.43-2.5-3.72-3.66-5.36-4.85-11.75-8.84-18.46-11.54-1.98-.8-5.85-2.02-6.02-2.07l-.6-.19-2.91,1.96,3.32,.9c.33,.11,.78,.25,1.28,.42,.06,.02,.12,.04,.18,.06,1.25,.41,2.78,.94,3.77,1.34,6.42,2.59,12.55,6.42,17.69,11.06,1.15,1.04,2.28,2.14,3.35,3.27l-25.28,18.42,.91-5.09,11.35-8.27,7.41-5.4-1.24-1.07c-1.32-1.14-2.71-2.23-4.16-3.25-.58-.41-1.17-.81-1.76-1.19-.3-.19-.6-.38-.9-.57-2.41-1.51-4.93-2.83-7.5-3.94-.16-.07-.33-.14-.5-.21-1.82-.77-3.68-1.44-5.55-2-.51-.15-1.02-.3-1.54-.44-.19-.05-.37-.09-.56-.14-.33-.09-.66-.17-.99-.25,0,0-.02,0-.03,0h0c-1.19-.29-2.38-.53-3.58-.73h0s-.89,.6-.89,.6l-.33,1.83L0,51.53l2.38,1.49,.81-4.59h0S10.45,7.77,10.45,7.77c.04,0,.08,.01,.11,.02,.12,.03,.24,.05,.37,.08,.33,.07,.67,.15,1,.22,.15,.03,.3,.07,.44,.11,.32,.08,.64,.16,.96,.24,.13,.04,.27,.07,.4,.11,.44,.12,.89,.25,1.33,.38,1.94,.58,3.88,1.28,5.76,2.1,4.3,1.85,8.46,4.35,12.14,7.29,.08,.06,.16,.12,.24,.19l-3.13,2.28c-.07-.05-.14-.1-.21-.16-.16-.12-.32-.24-.48-.36-.23-.17-.46-.34-.69-.5-.16-.11-.32-.23-.48-.34-.24-.17-.48-.33-.72-.49-.16-.11-.32-.22-.48-.32-.24-.16-.49-.32-.74-.48-.16-.1-.32-.21-.49-.31-.25-.16-.51-.31-.76-.46-.16-.1-.32-.19-.48-.29-.26-.15-.53-.3-.8-.45-.15-.09-.31-.17-.46-.26-.29-.16-.59-.31-.88-.46-.13-.07-.26-.14-.39-.2-.13-.06-.25-.12-.38-.19h0s-.9-.44-.9-.44c0,0,0,0,0,0l-1.53-.72v.03c-1.47-.63-2.98-1.19-4.5-1.67l-1.41-.45L6.14,52.31h0s-.49,2.76-.49,2.76l1.49,.93,1.13-.83L44.25,28.97l.71-.52,.08-.54Zm-25.62,0l1.73-9.72c.32,.17,.64,.33,.96,.51,.03,.02,.06,.03,.09,.05,.36,.2,.71,.4,1.07,.6,.06,.04,.13,.07,.19,.11,.76,.45,1.52,.92,2.25,1.41,.06,.04,.11,.08,.17,.11,.34,.23,.69,.47,1.02,.71,.02,.02,.05,.03,.07,.05,.3,.21,.59,.43,.88,.65l-8.57,6.24,.13-.72Z>'),
    Y1 = e => (() => {
        var t = J1();
        return K(() => x(t, "class", e.class)), t
    })(),
    en = y('<svg height=26 viewBox="0 0 133 36"version=1.1 xmlns=http://www.w3.org/2000/svg><g stroke=none stroke-width=1 fill=none fill-rule=evenodd><g transform="translate(-1405, -631)"fill=#FFFFFF fill-rule=nonzero><g id=INFINI-Pizza-logo-color-RGB transform="translate(1405, 631)"><polygon points="33.2992216 11.07 35.680913 11.07 35.680913 24.9685714 33.2992216 24.9685714"></polygon><polygon points="37.6370756 24.9685714 37.6180221 11.0442857 46.579533 19.5621429 46.579533 11.0442857 48.9231173 11.0442857 48.9231173 24.9621429 39.9552552 16.4378571 39.9552552 24.975 37.6434268 24.975"></polygon><polygon points="62.2605893 11.07 64.6422807 11.07 64.6422807 24.9685714 62.2605893 24.9685714"></polygon><polygon points="50.9491428 11.0314286 60.2282126 11.0314286 60.2282126 13.2235714 53.3308342 13.2235714 53.3308342 16.9264286 59.2501313 16.9264286 59.2501313 19.1314286 53.3308342 19.1314286 53.3308342 24.9685714 50.9491428 24.9685714"></polygon><polygon points="66.8080321 24.9685714 66.7889786 11.0442857 75.7504895 19.5621429 75.7504895 11.0442857 78.0940738 11.0442857 78.0940738 24.9621429 69.1262117 16.4378571 69.1262117 24.975 66.8143833 24.975"></polygon><polygon points="80.0756411 11.07 82.4573325 11.07 82.4573325 24.9685714 80.0756411 24.9685714 80.0756411 11.07"></polygon><path d="M95.5026503,19.0221429 L90.4090063,19.0221429 L90.4090063,24.9685714 L88.2051478,24.9685714 L88.2051478,11.0314286 L95.528055,11.0314286 C95.528055,11.0314286 95.5661621,11.0314286 95.5661621,11.0314286 C96.6522134,11.0185714 97.5858364,11.4042857 98.36068,12.195 C99.1355236,12.9792857 99.5229454,13.9242857 99.5229454,15.03 C99.5229454,16.1357143 99.1355236,17.0807143 98.36068,17.8585714 C97.5921876,18.6428571 96.6649157,19.035 95.5661621,19.035 L95.5090015,19.035 L95.5026503,19.0221429 Z M90.4090063,13.2557143 L90.4090063,16.7785714 L95.5598109,16.7785714 C96.0425004,16.785 96.4553269,16.6178571 96.7982904,16.2707143 C97.1857122,15.8785714 97.3508428,15.3964286 97.3000334,14.8114286 C97.2682775,14.49 97.141254,14.175 96.9380163,13.9242857 C96.5696481,13.4742857 96.1123633,13.2492857 95.5661621,13.2492857 L90.4153574,13.2492857 L90.4090063,13.2557143 Z"id=形状></path><path d="M100.723318,11.0314286 L103.124063,11.0314286 L103.124063,13.4678571 L100.723318,13.4678571 L100.723318,11.0314286 Z M103.124063,15.0042857 L103.124063,24.9685714 L100.723318,24.9685714 L100.723318,15.0042857 L103.124063,15.0042857 L103.124063,15.0042857 Z"id=形状></path><polygon points="104.597536 15.0364286 112.600019 15.0364286 112.466644 15.3 108.61148 22.6157143 112.479347 22.6157143 112.479347 24.975 104.489566 24.975 104.622941 24.7114286 108.516212 17.3957143 104.603887 17.3957143 104.603887 15.0364286"></polygon><polygon points="113.990927 15.0364286 121.99341 15.0364286 121.860035 15.3 118.004871 22.6157143 121.872738 22.6157143 121.872738 24.975 113.882957 24.975 114.016332 24.7114286 117.909603 17.3957143 113.997278 17.3957143 113.997278 15.0364286"></polygon><path d="M129.583067,15.2357143 C129.957786,15.3578571 130.319803,15.525 130.669118,15.7435714 L130.669118,15.0235714 L133,15.0235714 L133,24.8785714 L130.669118,24.8785714 L130.669118,24.21 C130.326154,24.4221429 129.964137,24.5892857 129.583067,24.7178571 C129.094026,24.8721429 128.598634,24.9492857 128.084189,24.9492857 C127.417315,24.9492857 126.782198,24.8207143 126.172485,24.5635714 C125.581825,24.3128571 125.061029,23.9528571 124.610095,23.4964286 C124.15281,23.04 123.803496,22.5064286 123.5558,21.915 C123.301753,21.2978571 123.174729,20.655 123.174729,19.98 C123.174729,19.305 123.301753,18.6621429 123.5558,18.045 C123.803496,17.4471429 124.159161,16.92 124.610095,16.4635714 C125.061029,16.0071429 125.588176,15.6471429 126.172485,15.3964286 C126.782198,15.1392857 127.417315,15.0107143 128.084189,15.0107143 C128.598634,15.0107143 129.094026,15.0878571 129.583067,15.2421429 L129.583067,15.2357143 Z M128.115945,17.3635714 C127.391911,17.3571429 126.775846,17.6142857 126.261401,18.1285714 C125.759658,18.6428571 125.511962,19.2535714 125.511962,19.9735714 C125.511962,20.6935714 125.759658,21.3107143 126.261401,21.8185714 C126.769495,22.3264286 127.372857,22.5771429 128.084189,22.5771429 C128.795521,22.5771429 129.398883,22.3264286 129.906977,21.8185714 C130.415071,21.3107143 130.662767,20.6935714 130.662767,19.9735714 C130.662767,19.2535714 130.421422,18.6685714 129.938733,18.1607143 C129.456043,17.6528571 128.795521,17.3635714 128.109594,17.3571429 L128.115945,17.3635714 Z"id=形状></path><path d="M28.6057017,17.9357143 C28.6057017,17.9357143 28.7327253,17.0421429 28.8788023,15.975 L27.0179075,17.3507143 L27.0179075,17.3507143 C27.0179075,17.3507143 5.67795234,33.0878571 5.67795234,33.0878571 L9.29177212,12.5807143 L9.73635452,10.0735714 L9.73635452,10.0735714 C10.0602646,10.1892857 10.3841746,10.3114286 10.7017334,10.44 C10.7779476,10.4721429 10.8478105,10.4978571 10.9240246,10.53 C11.2479347,10.665 11.5718447,10.8 11.8957547,10.9414286 L11.8957547,10.9414286 C11.8957547,10.9414286 8.91705267,27.855 8.91705267,27.855 L24.6044601,16.29 L29.3297359,12.7928571 L28.6692135,11.2242857 C27.9134234,10.4078571 27.1258775,9.61714286 26.3065756,8.87142857 C22.9023447,5.75357143 18.8439425,3.18857143 14.5823027,1.45285714 C13.3247696,0.938571429 10.866864,0.154285714 10.758894,0.122142857 L10.3778234,0 L8.52963087,1.26 L10.6382217,1.83857143 C10.8478105,1.90928571 11.1336135,1.99928571 11.4511723,2.10857143 C11.4892794,2.12142857 11.5273865,2.13428571 11.5654935,2.14714286 C12.3593907,2.41071429 13.3311208,2.75142857 13.9598873,3.00857143 C18.037343,4.67357143 21.9306146,7.13571429 25.1951196,10.1185714 C25.925505,10.7871429 26.643188,11.4942857 27.322764,12.2207143 L11.2669882,24.0621429 L11.8449453,20.79 L19.0535313,15.4735714 L23.7597536,12.0021429 L22.9722076,11.3142857 C22.1338523,10.5814286 21.2510386,9.88071429 20.330118,9.225 C19.9617497,8.96142857 19.5870302,8.70428571 19.2123108,8.46 C19.0217755,8.33785714 18.8312402,8.21571429 18.6407048,8.09357143 C17.1100712,7.12285714 15.5095745,6.27428571 13.877322,5.56071429 C13.7757032,5.51571429 13.6677332,5.47071429 13.5597631,5.42571429 C12.4038489,4.93071429 11.22253,4.5 10.0348598,4.14 C9.71094981,4.04357143 9.38703978,3.94714286 9.05677857,3.85714286 C8.9361062,3.825 8.82178502,3.79928571 8.70111265,3.76714286 C8.4915238,3.70928571 8.28193496,3.65785714 8.07234612,3.60642857 C8.07234612,3.60642857 8.05964376,3.60642857 8.05329258,3.60642857 L8.05329258,3.60642857 C7.29750251,3.42 6.54171243,3.26571429 5.77957118,3.13714286 L5.77957118,3.13714286 C5.77957118,3.13714286 5.21431641,3.52285714 5.21431641,3.52285714 L5.00472757,4.69928571 L0,33.1264286 L1.51158015,34.0842857 L2.0260255,31.1335714 L2.0260255,31.1335714 C2.0260255,31.1335714 6.63698009,4.995 6.63698009,4.995 C6.6623848,4.995 6.6877895,5.00142857 6.70684304,5.00785714 C6.78305716,5.02714286 6.85927129,5.04 6.94183659,5.05928571 C7.15142543,5.10428571 7.36736546,5.15571429 7.5769543,5.20071429 C7.67222196,5.22 7.76748961,5.24571429 7.85640609,5.27142857 C8.05964376,5.32285714 8.26288143,5.37428571 8.4661191,5.42571429 C8.5486844,5.45142857 8.63760088,5.47071429 8.72016618,5.49642857 C8.99961797,5.57357143 9.28542094,5.65714286 9.56487274,5.74071429 C10.7970011,6.11357143 12.0291295,6.56357143 13.2231508,7.09071429 C15.9541569,8.28 18.5962466,9.88714286 20.9334798,11.7771429 C20.9842892,11.8157143 21.0350986,11.8542857 21.085908,11.8992857 L19.0979896,13.365 C19.0535313,13.3328571 19.0090731,13.3007143 18.9646149,13.2621429 C18.862996,13.185 18.7613772,13.1078571 18.6597584,13.0307143 C18.5136813,12.9214286 18.3676042,12.8121429 18.2215271,12.7092857 C18.1199083,12.6385714 18.0182895,12.5614286 17.9166706,12.4907143 C17.7642424,12.3814286 17.6118141,12.2785714 17.4593859,12.1757143 C17.3577671,12.105 17.2561482,12.0342857 17.1545294,11.97 C17.0021011,11.8671429 16.8433217,11.7642857 16.6845423,11.6614286 C16.5829235,11.5971429 16.4813046,11.5264286 16.3733346,11.4621429 C16.2145552,11.3592857 16.0494246,11.2628571 15.8906451,11.1664286 C15.7890263,11.1021429 15.6874075,11.0442857 15.5857886,10.98 C15.420658,10.8835714 15.2491763,10.7871429 15.0776945,10.6907143 C14.9824268,10.6328571 14.880808,10.5814286 14.7855403,10.5235714 C14.6013562,10.4207143 14.4108209,10.3242857 14.2266367,10.2278571 C14.1440714,10.1828571 14.0615061,10.1378571 13.9789408,10.0992857 C13.8963755,10.0607143 13.8201614,10.0221429 13.7375961,9.97714286 L13.7375961,9.97714286 C13.7375961,9.97714286 13.1659902,9.69428571 13.1659902,9.69428571 C13.1659902,9.69428571 13.1659902,9.69428571 13.1659902,9.69428571 L12.1942601,9.23142857 L12.1942601,9.25071429 C11.260637,8.84571429 10.3016093,8.48571429 9.33623036,8.17714286 L8.44071439,7.88785714 L3.89962275,33.6278571 L3.89962275,33.6278571 C3.89962275,33.6278571 3.58841507,35.4021429 3.58841507,35.4021429 L4.53474046,36 L5.25242348,35.4664286 L28.1039587,18.6235714 L28.5548923,18.2892857 L28.6057017,17.9421429 L28.6057017,17.9357143 Z M12.333986,17.9357143 L13.4327396,11.6871429 C13.6359773,11.7964286 13.8392149,11.8992857 14.0424526,12.015 C14.0615061,12.0278571 14.0805597,12.0342857 14.0996132,12.0471429 C14.3282556,12.1757143 14.5505468,12.3042857 14.7791892,12.4328571 C14.8172962,12.4585714 14.8617545,12.4778571 14.8998615,12.5035714 C15.382551,12.7928571 15.8652404,13.095 16.3288764,13.41 C16.3669834,13.4357143 16.3987393,13.4614286 16.4368464,13.4807143 C16.6527864,13.6285714 16.8750776,13.7828571 17.0846664,13.9371429 C17.0973688,13.95 17.1164223,13.9564286 17.1291247,13.9692857 C17.31966,14.1042857 17.5038441,14.2457143 17.6880283,14.3871429 L12.2450695,18.3985714 L12.3276348,17.9357143 L12.333986,17.9357143 Z"id=形状>'),
    tn = e => (() => {
        var t = en();
        return K(() => x(t, "class", e.class)), t
    })(),
    nn = y('<svg xmlns=http://www.w3.org/2000/svg width=15 height=15 viewBox="0 0 24 24"><path fill=currentColor d="M12 4a1 1 0 0 1 .707.293l6 6a1 1 0 0 1-1.414 1.414L13 7.414V19a1 1 0 1 1-2 0V7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l6-6A1 1 0 0 1 12 4z">'),
    rn = e => (() => {
        var t = nn();
        return K(n => {
            var r = e.class,
                o = e["aria-label"];
            return r !== n.e && x(t, "class", n.e = r), o !== n.t && x(t, "aria-label", n.t = o), n
        }, {
            e: void 0,
            t: void 0
        }), t
    })(),
    on = y("<span class=docsearch-modal-footer-commands><li><kbd class=docsearch-modal-footer-commands-key></kbd><span class=docsearch-modal-footer-commands-label></span></li><li><kbd class=docsearch-modal-footer-commands-key></kbd><kbd class=docsearch-modal-footer-commands-key></kbd><span class=docsearch-modal-footer-commands-label></span></li><li><kbd class=docsearch-modal-footer-commands-key></kbd><span class=docsearch-modal-footer-commands-label>"),
    sn = y("<span class=docsearch-modal-footer-logo><span class=docsearch-modal-footer-logo-label></span><a href=https://pizza.rs/>"),
    ln = ({
        translations: e = {}
    }) => {
        let {
            selectText: t = "to select",
            selectKeyAriaLabel: n = "Enter key",
            navigateText: r = "to navigate",
            navigateUpKeyAriaLabel: o = "Arrow up",
            navigateDownKeyAriaLabel: i = "Arrow down",
            closeText: l = "to close",
            closeKeyAriaLabel: s = "Escape key",
            poweredByText: c = "Powered by"
        } = e;
        return [(() => {
            var u = on(),
                a = u.firstChild,
                f = a.firstChild,
                d = f.nextSibling,
                h = a.nextSibling,
                p = h.firstChild,
                L = p.nextSibling,
                k = L.nextSibling,
                T = h.nextSibling,
                E = T.firstChild,
                A = E.nextSibling;
            return _(f, g(ht, {
                "aria-label": n
            })), _(d, t), _(p, g(H1, {
                "aria-label": i
            })), _(L, g(rn, {
                "aria-label": o
            })), _(k, r), _(E, g(X1, {
                "aria-label": s
            })), _(A, l), u
        })(), (() => {
            var u = sn(),
                a = u.firstChild,
                f = a.nextSibling;
            return _(a, c), _(f, g(tn, {
                class: "docsearch-modal-footer-logo-icon docsearch-modal-footer-logo-dark"
            }), null), _(f, g(Y1, {
                class: "docsearch-modal-footer-logo-icon docsearch-modal-footer-logo-light"
            }), null), u
        })()]
    },
    an = y('<svg width=20 height=20 xmlns=http://www.w3.org/2000/svg><path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"stroke=currentColor fill=none fill-rule=evenodd stroke-linecap=round stroke-linejoin=round>'),
    cn = e => (() => {
        var t = an();
        return K(() => x(t, "class", e.class)), t
    })(),
    un = y('<svg width=24 height=24 xmlns=http://www.w3.org/2000/svg><path fill=currentColor d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z">'),
    dn = e => (() => {
        var t = un();
        return K(() => x(t, "class", e.class)), t
    })(),
    fn = y("<form class=docsearch-modal-search-input-form><input type=search class=docsearch-modal-search-input><button type=reset class=docsearch-modal-search-input-reset>"),
    hn = y("<button type=reset class=docsearch-modal-search-cancel-btn>"),
    _n = ({
        loading: e,
        query: t,
        onInput: n,
        onKeyDown: r,
        onReset: o,
        onClose: i,
        translations: l = {}
    }) => {
        let {
            searchDocsPlaceHolder: s = "Search",
            resetButtonTitle: c = "Clear the query",
            resetButtonAriaLabel: u = "Clear the query",
            cancelButtonText: a = "Cancel",
            cancelButtonAriaLabel: f = "Cancel"
        } = l, d;
        return Q(() => d?.focus()), [(() => {
            var h = fn(),
                p = h.firstChild,
                L = p.nextSibling;
            le(h, "reset", o), h.addEventListener("submit", T => T.preventDefault()), _(h, g(De, {
                get when() {
                    return e()
                },
                get fallback() {
                    return g(ut, {
                        class: "docsearch-modal-search-input-icon"
                    })
                },
                get children() {
                    return g(dn, {
                        class: "docsearch-modal-search-input-icon docsearch-modal-search-input-loading-icon"
                    })
                }
            }), p), le(p, "keydown", r, !0), le(p, "input", n, !0);
            var k = d;
            return typeof k == "function" ? we(k, p) : d = p, x(p, "placeholder", s), x(L, "title", c), x(L, "aria-label", u), _(L, g(cn, {
                class: "docsearch-modal-search-input-reset-icon"
            })), K(() => L.hidden = !t()), K(() => p.value = t()), h
        })(), (() => {
            var h = hn();
            return le(h, "click", i, !0), x(h, "aria-label", f), _(h, a), h
        })()]
    };
Fe(["input", "keydown", "click"]);

function gn(e, t) {
    let {
        environment: n = window
    } = t();
    Q(() => {
        let r = e.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), input:not([disabled])"),
            o = r[0],
            i = r[r.length - 1];

        function l(s) {
            s.key === "Tab" && (s.shiftKey ? n.document.activeElement === o && (s.preventDefault(), i.focus()) : n.document.activeElement === i && (s.preventDefault(), o.focus()))
        }
        e.addEventListener("keydown", l), X(() => e.removeEventListener("keydown", l))
    })
}
var pn = y("<div class=docsearch-modal-empty-query>"),
    bn = y("<div class=docsearch-modal-error><p class=docsearch-modal-title>An error has occured. Please try again..."),
    wn = y("<div class=docsearch-modal-no-search-hits-suggestions-list><p class=docsearch-modal-no-search-hits-help-text>Try searching for:</p><ul>"),
    yn = y('<div class=docsearch-modal-no-search-hits><p class=docsearch-modal-title>No results for "<!>"'),
    mn = y("<div class=docsearch-modal-container role=button tabindex=0><div class=docsearch-modal><header class=docsearch-modal-search-container></header><main class=docsearch-modal-search-hits-container></main><footer class=docsearch-modal-footer>"),
    vn = y("<li><button class=docsearch-modal-no-search-hits-suggestion type=button>"),
    Cn = y("<section><div class=docsearch-modal-search-hits-category></div><ul role=listbox>"),
    Ln = y("<li role=option class=docsearch-modal-search-hits-item><a><span class=docsearch-modal-search-hits-item-text-container><p class=docsearch-modal-search-hits-item-title></p><p class=docsearch-modal-search-hits-item-text></p></span><span class=docsearch-modal-search-hits-item-trailing-icon-container aria-hidden>");

function xn(e) {
    if (!e || e.length === 0) return [
        [],
        []
    ];
    let t = [],
        n = new Set;
    return e.forEach((r, o) => {
        let i = r._source || {},
            l = {
                index: o,
                category: i.category || "General",
                subcategory: i.subcategory || "",
                title: i.title || null,
                content: i.content || null,
                url: i.url || null
            };
        t.push(l), l.category && n.add(l.category)
    }), [t, Array.from(n)]
}
var N = function(e) {
        return e[e.Results = 0] = "Results", e[e.NoResults = 1] = "NoResults", e[e.Error = 2] = "Error", e[e.EmptyQuery = 3] = "EmptyQuery", e
    }(N || {}),
    Sn = ({
        searchClient: e,
        environment: t = window,
        translations: n = {},
        onClose: r,
        initialQuery: o
    }) => {
        let {
            linkToTheResultAriaLabel: i = "Link to the result"
        } = n;
        Q(() => document.body.classList.add("docsearch--active")), X(() => document.body.classList.remove("docsearch--active"));
        let l, s;

        function c() {
            if (s) {
                let w = window.innerHeight * .01;
                s.style.setProperty("--docsearch-vh", `${w}px`)
            }
        }
        Q(() => {
            c(), window.addEventListener("resize", c)
        }), X(() => window.removeEventListener("resize", c));
        let [u, a] = B(!1), [f, d] = B(""), [h, p] = B(0), [L, k] = B([]), [T, E] = B([]), [A, j] = B(N.EmptyQuery), D = () => T().length;

        function Me(w) {
            if (w.key === "ArrowUp" || w.key === "ArrowDown") {
                w.preventDefault();
                let z = w.key === "ArrowDown";
                p(F => z && F === D() - 1 ? 0 : !z && F === 0 ? D() - 1 : F + (z ? 1 : -1)), document.getElementById(`docsearch-hit-item-${h()}`)?.scrollIntoView({
                    block: h() === 0 ? "center" : "nearest",
                    behavior: "smooth"
                })
            }
            w.key === "Enter" && (w.preventDefault(), w.ctrlKey || w.metaKey ? t.open(T()[h()].url ?? "", "_blank", "noopener")?.focus() : w.shiftKey ? t.open(T()[h()].url ?? "", "_blank", "noopener") : t.location.assign(T()[h()].url ?? ""), !w.shiftKey && !w.ctrlKey && !w.metaKey && r && r())
        }

        function te() {
            a(!1), j(N.EmptyQuery), E([]), k([]), p(0)
        }

        function qe(w) {
            a(!0), e && e().search(w, {
                attributesToHighlight: ["*"],
                attributesToCrop: ["content"],
                cropLength: 30
            }).catch(z => {
                te(), j(N.Error), console.error(z)
            }).then(z => {
                if (!z) {
                    te(), j(N.Error);
                    return
                }
                if (!z.hits || z.hits.length === 0) {
                    te(), j(N.NoResults);
                    return
                }
                let [F, J] = xn(z.hits);
                a(!1), j(F.length === 0 ? N.NoResults : N.Results), p(0), E(F), k(J)
            })
        }
        let _t = P1(qe, 100);
        o && Q(() => {
            d(o), qe(o)
        });

        function gt(w) {
            let z = w.currentTarget?.value;
            if (d(z), !z) {
                te();
                return
            }
            _t(z)
        }
        return (() => {
            var w = mn(),
                z = w.firstChild,
                F = z.firstChild,
                J = F.nextSibling,
                pt = J.nextSibling;
            w.$$mousedown = q => q.target === q.currentTarget && r && r();
            var Ze = s;
            typeof Ze == "function" ? we(Ze, w) : s = w, we(gn, z, () => ({
                environment: t
            })), _(F, g(_n, {
                loading: u,
                query: f,
                onInput: gt,
                onKeyDown: Me,
                onReset: te,
                onClose: r,
                translations: n
            }));
            var Ue = l;
            return typeof Ue == "function" ? we(Ue, J) : l = J, _(J, g($t, {
                get children() {
                    return [g(ge, {
                        get when() {
                            return A() === N.EmptyQuery
                        },
                        get children() {
                            return pn()
                        }
                    }), g(ge, {
                        get when() {
                            return A() === N.Error
                        },
                        get children() {
                            return bn()
                        }
                    }), g(ge, {
                        get when() {
                            return A() === N.NoResults
                        },
                        get children() {
                            var q = yn(),
                                ne = q.firstChild,
                                de = ne.firstChild,
                                fe = de.nextSibling;
                            return fe.nextSibling, _(ne, f, fe), _(q, g(De, {
                                get when() {
                                    return L().length > 0
                                },
                                get children() {
                                    var O = wn(),
                                        W = O.firstChild,
                                        re = W.nextSibling;
                                    return _(re, g(be, {
                                        get each() {
                                            return L()
                                        },
                                        children: oe => (() => {
                                            var se = vn(),
                                                he = se.firstChild;
                                            return he.$$click = () => d(oe), _(he, oe), se
                                        })()
                                    })), O
                                }
                            }), null), q
                        }
                    }), g(ge, {
                        get when() {
                            return A() === N.Results
                        },
                        get children() {
                            return g(be, {
                                get each() {
                                    return L()
                                },
                                children: q => (() => {
                                    var ne = Cn(),
                                        de = ne.firstChild,
                                        fe = de.nextSibling;
                                    return _(de, q), _(fe, g(be, {
                                        get each() {
                                            return T().filter(O => O.category === q)
                                        },
                                        children: O => (() => {
                                            var W = Ln(),
                                                re = W.firstChild,
                                                oe = re.firstChild,
                                                se = oe.firstChild,
                                                he = se.nextSibling,
                                                bt = oe.nextSibling;
                                            return W.addEventListener("mouseenter", () => p(O.index)), x(re, "aria-label", i), _(bt, g(ht, {
                                                class: "docsearch-modal-search-hits-item-trailing-icon"
                                            })), K(P => {
                                                var Ie = O.index === h(),
                                                    Ve = `docsearch-hit-item-${O.index}`,
                                                    We = O.index === h(),
                                                    He = O.url || "#",
                                                    Ge = (O.subcategory || "") + (O.subcategory && O.title && " | ") + (O.title || ""),
                                                    Qe = O.content || "";
                                                return Ie !== P.e && x(W, "aria-selected", P.e = Ie), Ve !== P.t && x(W, "id", P.t = Ve), We !== P.a && W.classList.toggle("docsearch-modal-search-hits-item--active", P.a = We), He !== P.o && x(re, "href", P.o = He), Ge !== P.i && (se.innerHTML = P.i = Ge), Qe !== P.n && (he.innerHTML = P.n = Qe), P
                                            }, {
                                                e: void 0,
                                                t: void 0,
                                                a: void 0,
                                                o: void 0,
                                                i: void 0,
                                                n: void 0
                                            }), W
                                        })()
                                    })), ne
                                })()
                            })
                        }
                    })]
                }
            })), _(pt, g(ln, {
                translations: n
            })), w
        })()
    };
Fe(["mousedown", "click"]);
var An = class {
        pizzaEngine;
        props;
        constructor({}, e) {
            console.log("Init Pizza Engine."), this.pizzaEngine = Ee.new(), this.props = e
        }
        async load(e) {
            try {
                let t = await fetch(e);
                if (!t.ok) throw new Error(`Failed to fetch file from ${e}: ${t.statusText}`);
                let n = await t.text();
                this.pizzaEngine.load_json_objects_array(n) ? console.log(`Load ${e} and indexed successfully.`) : console.error(`Failed to load ${e}`)
            } catch (t) {
                console.error(`Error loading ${e}:`, t)
            }
        }
        async search(e, t = {}) {
            return this.pizzaEngine.advanced_search_by_query_string(this?.props?.default_field ?? "*", e, this?.props?.default_operator ?? "OR", 0, this?.props?.number_of_results ?? 10, !1)
        }
    },
    En = "0.1.0";

function kn({
    clientAgents: e = []
}, t) {
    let n = new An({
        clientAgents: e.concat(`infini docs-searchbar.js (v${En})`)
    }, t);

    // Get the current language from the URL
    const lang = document.documentElement.getAttribute('lang');    
    // Construct the correct path for the index.json file
    return n.load(`/${lang}/index.json`).then(() => {
        console.log("Index loaded and indexed successfully.")
    }).catch(r => {
        console.error("Failed to load index:", r)
    }), $(() => n)
}
var Tn = ["ctrl+k", "s", "/"],
    zn = e => {
        let {
            environment: t = window,
            hotKeys: n = Tn
        } = e, [r, o] = B(!1), [i, l] = B(), s = () => o(!0), c = () => o(!1), u = d => l(d), a = () => {
            let d = window.getSelection();
            d && l(d.toString()), o(!0)
        }, f = kn({
            clientAgents: []
        }, e);
        return V1({
            isOpen: r,
            onOpen: s,
            onClose: c,
            onInput: u,
            hotKeys: n
        }), [g(I1, {
            get translations() {
                return e?.translations?.button
            },
            hotKeys: n,
            onClick: a
        }), $(() => $(() => !!r())() && g(Dt, {
            get mount() {
                return t.document.body
            },
            get children() {
                return g(Sn, Ot(e, {
                    searchClient: f,
                    get initialQuery() {
                        return i()
                    },
                    onClose: c,
                    get translations() {
                        return e?.translations?.modal
                    }
                }))
            }
        }))]
    };

function Mn(e) {
    let [t, n] = B(!0);
    return Pt(() => g(De, {
        get when() {
            return t()
        },
        get children() {
            return g(zn, e)
        }
    }), typeof e.container == "string" ? (e.environment ?? window).document.querySelector(e.container) : e.container), () => n(!1)
}
Mn({
    container: "#docsearch",
    default_operator: "AND",
    number_of_results: 10,
    default_field: "*"
});
