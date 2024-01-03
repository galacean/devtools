import type { BridgeInstanceType } from './bridge/core'

export enum HandShakeEvents {
  SYN = 'syn',
  SYN_ACK = 'syn-ack',
  ACK = 'ack',
}

class HandShake {
  public socket: BridgeInstanceType

  constructor(bridge: BridgeInstanceType) {
    this.socket = bridge
  }
}

export class HandShakeClient extends HandShake {
  constructor(bridge: BridgeInstanceType) {
    super(bridge)
  }

  public onConnect() {
    return new Promise<void>((resolve) => {
      this.socket.emit(HandShakeEvents.SYN)
      const timer = setInterval(() => {
        this.socket.emit(HandShakeEvents.SYN)
      }, 300)
      this.socket.on(HandShakeEvents.SYN_ACK, () => {
        clearInterval(timer)
        this.socket.emit(HandShakeEvents.ACK)
        devtools.state.clientConnected = true
        resolve()
      })
    })
  }
}
