import { ipcMain } from 'electron'
import ip from 'ip'
import { CHANNEL } from '../../ipc/constants'

const handleMap: Record<typeof CHANNEL[keyof (typeof CHANNEL)], (...args: any) => Promise<any> | any> = {
  [CHANNEL.IP_ADDRESS]: () => {
    return ip.address()
  },
}

export function registerHandle() {
  Object.entries(handleMap).forEach(([channel, cb]) => {
    ipcMain.handle(channel, (_event, ...args) => {
      return cb(...args)
    })
  })
}
