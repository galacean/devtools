export const sendMessage = function (name, data) {
  window.postMessage(
    {
      source: 'galacean-devtools-agent',
      name,
      data: data || {},
    },
    '*',
  )
}
