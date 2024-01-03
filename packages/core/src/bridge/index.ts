import { Bridge } from './core'

// BridgeRpc as DevToolsRpc,
import { registerBridgeRpc as registerDevToolsSideBridgeRpc } from './devtools'

import type { BridgeRpcOptions } from './devtools'

// import { BridgeRpc as UserAppRpc, registerBridgeRpc as registerUserAppSideBridgeRpc } from './user-app'

// export type { BridgeInstanceType } from './core'
// export { BridgeEvents } from './types'
export {
  Bridge,
  // DevToolsRpc,
  // UserAppRpc,
}

export function registerBridgeRpc(target: 'devtools' | 'user-app', options: BridgeRpcOptions) {
  if (target === 'devtools')
    registerDevToolsSideBridgeRpc(options)

  // else
  //   registerUserAppSideBridgeRpc(options.bridge)
}
