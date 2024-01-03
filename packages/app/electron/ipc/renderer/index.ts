import { ipcRenderer } from 'electron'
import { CHANNEL } from '../constants'

export async function getIpAddress() {
  return ipcRenderer.invoke(CHANNEL.IP_ADDRESS)
}
