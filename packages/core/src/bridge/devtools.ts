import type { ViteHotContext } from 'vite-hot-client'
import { setupViteRPCClient } from '../vite-rpc'

const devtoolsBridge: {
  // value: BridgeInstanceType
  viteRpc: {
    enabled: boolean
    api: ReturnType<typeof setupViteRPCClient>
  }
  // rpc: InstanceType<typeof BridgeRpcCore>
} = {
  // value: null!,
  viteRpc: {
    enabled: false,
    api: null!,
  },
  // rpc: null!,
}

export interface BridgeRpcOptions {
  viteRPCContext?: ViteHotContext | undefined
}

export function registerBridgeRpc(options: BridgeRpcOptions) {
  const rpc = setupViteRPCClient(options.viteRPCContext)
  // devtoolsBridge.value = options.bridge
  // devtoolsBridge.rpc = new BridgeRpcCore(options.bridge)
  if (rpc) {
    devtoolsBridge.viteRpc = {
      enabled: true,
      api: rpc,
    }
  }
}
