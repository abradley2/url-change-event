(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.urlChangeEvent = f() } })(function () {
  var define, module, exports; return (function () { function r (e, n, t) { function o (i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {
      module.exports = function init (generateStateFromLink) {
        const onLocationChanged = () => {
          const ev = new CustomEvent('urlchange', {
            detail: document.location
          })

          window.dispatchEvent(ev)
        }

        const onPopState = () => {
          onLocationChanged()
        }

        const onClick = (e) => {
          let el = e.target
          while (el !== document.body) {
            if (el.nodeName.toUpperCase() === 'A') {
              const method = el.getAttribute('data-link')

              if (method !== 'replaceState' && method !== 'pushState') break

              e.preventDefault()

              window.history[method](
                generateStateFromLink ? generateStateFromLink(el) : window.history.state,
                el.getAttribute('data-title') || document.title,
                el.href
              )

              onLocationChanged()
              break
            }
            el = el.parentNode
          }

        }

        window.addEventListener('popstate', onPopState)

        document.body.addEventListener('click', onClick)

        return function unsub () {
          window.removeEventListener('popstate', onPopState)
          document.body.removeEventListener('click', onClick)
        }
      }
    }, {}]
  }, {}, [1])(1)
});
