export const sendMessage = function (name, data) {
  window.postMessage(
    {
      source: 'venus-devtools-agent',
      name: name,
      data: data || {},
    },
    '*',
  );
};
