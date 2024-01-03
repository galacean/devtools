import type { Emitter, EventType, Handler } from 'mitt'
import mitt from 'mitt'

export type BridgeInstanceType = InstanceType<typeof Bridge>

export interface BridgeAdapterOptions {
  tracker: (fn: Function) => void
  trigger: (data: Record<string, any>) => void
}

export class Bridge<Events extends Record<EventType, any>, Key extends keyof Events> {
  private emitter: Emitter<Events>
  private adapter: BridgeAdapterOptions

  constructor(adapter: BridgeAdapterOptions) {
    this.emitter = mitt<Events>()
  }

  private _emit(eventName: Key, data?: any): void {
    this.emitter.emit(eventName, data)
  }

  public emit(eventName: Key, data?: any): void {
    this.adapter.trigger({
      event: eventName,
      data,
    })
    this._emit(eventName, data)
  }
}
