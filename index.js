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