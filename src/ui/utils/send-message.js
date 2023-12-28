import { backgroundPageConnection } from '../port'

export function sendMessage(name, data) {
  backgroundPageConnection.postMessage({
    name,
    tabId: chrome.devtools.inspectedWindow.tabId,
    data: data || {},
  })
}
