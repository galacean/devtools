import process from 'node:process'
import io from 'socket.io-client/dist/socket.io.js'

// import { createConnectionApp, initDevTools } from '../../client/src'
// import { Bridge } from '../../core/src/bridge'

const port = process.env.PORT || 8098

export function init() {
  const localhost = `http://localhost:${port}`
  const socket = io(localhost)
  let reload: Function | null = null

  socket.on('vue-devtools:init', () => {
    // app.unmount()

    // If new page is opened reload devtools
    if (reload)
      return reload()

    initDevTools({
      connect(cb) {
        const bridge = new Bridge({
          tracker(fn) {
            socket.on('vue-devtools:message', (data) => {
              fn(data)
            })
          },
          trigger(data) {
            socket.emit('vue-devtools:message', data)
          },
        })

        cb(bridge)
      },
      reload(fn) {
        reload = fn
      },
    })
  })

  socket.on('vue-devtools:disconnect', () => {
    app.unmount()
    reload = null
    socket.close()
    init()
  })
}
