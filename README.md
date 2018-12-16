# Url Change Event

```
const initialize = require('@abradley2/url-change-event')
```

Convenience module for intercepting all link clicks on the body of the document that
have either `data-link="replaceState"` or `data-link="pushState"` attributes, calling
the corresponding `history` method, and then firing a `urlchange` event on the window
when the location of the document has changed in this way.

This makes it very simple to support routing in single page applications.

### Usage

```
const initialize = require('@abradley2/url-change-event')

// initialize the listeners and interceptors. Returns a function 
// that will unsubscribe these listeners.
const stopListening = initialize()

// you can now listen to the "urlchange" event on the window
window.addEventListener('urlchange', (location) => {
  // you can handle this however. The location on the document is passed for convenience

  return document.location === location // true
})
```

A link that triggers replaceState should look similar to this:
```
<a href="/path/in/application#someAnchor" data-link="replaceState"> Go somewhere! </a>
```

A link that triggers pushState should look similar to this:
```
<a href="/push/some/state?query=true" data-link="pushState"> Go somewhere! </a>
```

The `data-link` attribute is important. If the value is either `pushState` or `replaceState`,
then `preventDefault` will be called and the event triggered. If not, then nothing happens.

### Popstate events

In addition to navigation via page links, the `urlchange` event is also fired for the `popstate`
event, so there's no need to manually subscribe to that as well.

### State

The initialization function for this helper method takes on optional argument:
a function which recieves the element of the link clicked as it's first argument,
and then returns whatever data is desired to be passed as the `state` argument in the
subsequent history change.

```
const initialize = require('@abradley2/url-change-event')

initialize(function getStateFromElement(el) {
  // this can be anything really. It is passed as the `stateObj` to the history method
  // (the first argument to either history.replaceState or history.pushState)
  return {
    data: el.getAttribute('data-link-state')
  }
})
```

### Title

To have the title of the document change in response to a link being clicked, via the
second argument to the invoked history method, just set the `data-title` attribute to the
desired document title on any associated `data-link` element.

### License

MIT