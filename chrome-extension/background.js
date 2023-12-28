const connections = {}

/*
 * agent -> content-script.js -> **background.js** -> dev tools
 */
chrome.runtime.onMessage.addListener((request, sender) => {
  if (sender.tab) {
    const tabId = sender.tab.id
    if (tabId in connections)
      connections[tabId].postMessage(request)
    else
      console.log('Tab not found in connection list.')
  }
  else {
    console.log('sender.tab not defined.')
  }
  return true
})

/*
 * agent <- content-script.js <- **background.js** <- dev tools
 */
chrome.runtime.onConnect.addListener((port) => {
  // Listen to messages sent from the DevTools page
  port.onMessage.addListener((request) => {
    console.log('incoming message from dev tools page', request)

    // Register initial connection
    if (request.name === 'init') {
      connections[request.tabId] = port

      port.onDisconnect.addListener(() => {
        delete connections[request.tabId]
      })

      return
    }

    // Otherwise, broadcast to agent
    chrome.tabs.sendMessage(request.tabId, {
      name: request.name,
      data: request.data,
    })
  })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId in connections && changeInfo.status === 'complete') {
    // TODO: reload connection to page somehow...?
    connections[tabId].postMessage({
      name: 'reloaded',
    })
  }
})
