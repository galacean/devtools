export const sendMessage = function (name, data) {
  window.postMessage(
    {
      source: 'galacean-devtools-agent',
      name: name,
      data: data || {},
    },
    '*',
  );
};
