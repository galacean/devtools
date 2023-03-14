import { Agent } from './agent';
import { sendMessage } from './utils/send-message';

window.__venus_devtools_agent_injected__ = true;

const venusInstance = window.__VENUS_DEVTOOLS_GLOBAL_HOOK__.instance;

if (venusInstance) {
  sendMessage('INSTANCE_FOUND');
  const VenusEngine = window.Venus || window.oasisEngine || window.Oasis;
  window.__VENUS_DEVTOOLS_GLOBAL_HOOK__.agent = new Agent(venusInstance, VenusEngine);
}
