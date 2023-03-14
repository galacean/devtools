import React from 'react';
import ReactDOM from 'react-dom/client';
import { injectDebugger } from './inject-debugger';
import { App } from './app';

injectDebugger();

window.addEventListener('load', function () {
  ReactDOM.createRoot(document.getElementById('container')).render(<App />);
});
