import { sendMessage } from './utils/send-message';

function getIIFE(fn) {
  return `(${fn.toString()})()`
}

function isMainFrame() {
  return new Promise(resolve => {
    chrome.devtools.inspectedWindow.eval(`!!window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__ && !!window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__.instance`, (result) => {
      resolve(result);
    })
  })
}

function getValidFrameURL() {
  return new Promise(resolve => {
    function findValidFrameURL() {
      for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        if (frame.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__ && frame.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__.instance) {
          return frame.location.href;
        }
      }
    }
    chrome.devtools.inspectedWindow.eval(getIIFE(findValidFrameURL), (result) => {
      resolve(result);
    })
  })
}

export async function injectDebugger() {
  const isAgentInjected = 'window.__venus_devtools_agent_injected__';
  let frameURL;
  if (await isMainFrame()) {
    frameURL = await getValidFrameURL();
  }

  chrome.devtools.inspectedWindow.eval(isAgentInjected, { frameURL }, function (result) {
    if (!result) {
      // script hasn't been injected yet

      var xhr = new XMLHttpRequest();
      xhr.open('GET', chrome.runtime.getURL('bundle/agent.js'), false);
      xhr.send();
      var script = xhr.responseText;

      chrome.devtools.inspectedWindow.eval(script, { frameURL }, function (result, err) {
        if (err) {
          console.error(err.value);
        }

        sendMessage('connect');
      });
    } else {
      // we're already injected, so just connect
      sendMessage('connect');
    }
  });
}
