import process from 'node:process'
import io from 'socket.io-client/dist/socket.io.js'
import type { App } from 'vue'
import consola from 'consola'
import { devtoolsState } from '../../../core/src/vue-plugin'
import { treeData } from '../stores'

// import { createConnectionApp, initDevTools } from '../../client/src'
// import { Bridge } from '../../core/src/bridge'

const port = process.env.PORT || 8848
const localhost = `http://localhost:${port}`

export const socket = io(localhost)

export function initDevTools(app: App) {
  consola.info('initDevTools', app)
}

export function init(app: App) {
  let reload: Function | null = null

  socket.on('galacean-devtools:init', () => {
    // console.log('galacean-devtools:init')
    // app.unmount()

    // If new page is opened reload devtools
    if (reload)
      return reload()

    initDevTools(app)

    devtoolsState.connected.value = true
    // initDevTools({
    //   connect(cb) {
    //     const bridge = new Bridge({
    //       tracker(fn) {
    //         socket.on('vue-devtools:message', (data) => {
    //           fn(data)
    //         })
    //       },
    //       trigger(data) {
    //         socket.emit('vue-devtools:message', data)
    //       },
    //     })

    //     cb(bridge)
    //   },
    //   reload(fn) {
    //     reload = fn
    //   },
    // })
  })

  socket.on('galacean-devtools:refresh', (data) => {
    // console.log('galacean-devtools:refresh')
    treeData.value = data
  })

  socket.on('galacean-devtools:disconnect', () => {
    app.unmount()
    reload = null
    socket.close()
    init(app)
  })
}
