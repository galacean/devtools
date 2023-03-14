import { backgroundPageConnection } from '../port';

export function sendMessage(name, data) {
  backgroundPageConnection.postMessage({
    name: name,
    tabId: chrome.devtools.inspectedWindow.tabId,
    data: data || {},
  });
}
