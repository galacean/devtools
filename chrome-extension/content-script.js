function nullthrows(v) {
  if (v == null)
    throw new Error('it\'s a null')
  return v
}

function injectCode(src) {
  const script = document.createElement('script')
  // This is why it works!
  script.src = src
  script.onload = function () {
    console.log('[Galacean-DEVTOOLS] script injected')
    this.remove()
  }

  // This script runs before the <head> element is created,
  // so we add the script to <html> instead.
  nullthrows(document.head || document.documentElement).appendChild(script)
}

injectCode(chrome.runtime.getURL('/global-hook.js'))

/*
 * agent -> **content-script.js** -> background.js -> dev tools
 */
window.addEventListener('message', (event) => {
  // Only accept messages from same frame
  if (event.source !== window)
    return

  const message = event.data

  // Only accept messages of correct format (our messages)
  if (
    typeof message !== 'object'
      || message === null
      || message.source !== 'galacean-devtools-agent'
  )
    return

  chrome.runtime.sendMessage(message)
})

/*
 * agent <- **content-script.js** <- background.js <- dev tools
 */
chrome.runtime.onMessage.addListener((request) => {
  request.source = 'galacean-devtools-devtools'
  window.postMessage(request, '*')
})
