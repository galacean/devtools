import { Agent } from './agent'
import { sendMessage } from './utils/send-message'

window.__galacean_devtools_agent_injected__ = true

const galaceanInstance = window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__.instance

if (galaceanInstance) {
  sendMessage('INSTANCE_FOUND')
  const GalaceanEngine = window.Galacean || window.Venus || window.Oasis
  window.__GALACEAN_DEVTOOLS_GLOBAL_HOOK__.agent = new Agent(galaceanInstance, GalaceanEngine)
}
