import socketIO from 'socket.io-client/dist/socket.io.js'
import type { io } from 'socket.io-client'

import type { WebGLEngine } from '@galacean/engine'
import { buildEntitiesTree } from '../../../core/src/galacean'

// @TODO: de-duplicate
// devtools.init()

// const bridge = new Bridge({
//   tracker(fn) {
//     socket.on('vue-devtools:message', (data) => {
//       fn(data)
//     })
//   },
//   trigger(data) {
//     socket.emit('vue-devtools:message', data)
//   },
// })

// import { target } from '../../../shared/src/env'
// import { Bridge } from '../../../core/src/bridge'
// import { prepareInjection } from '../../../core/src/injection'
// import { devtools } from '../../../devtools-kit/src'

const createSocket = socketIO as typeof io
// const host = target.__GALACEAN_DEVTOOLS_HOST__ || 'http://localhost'
const host = 'http://localhost'
// const port = target.__GALACEAN_DEVTOOLS_PORT__ !== undefined ? target.__GALACEAN_DEVTOOLS_PORT__ : 8848
const port = 8848

const fullHost = port ? `${host}:${port}` : host
const socket = createSocket(fullHost)

let engine: WebGLEngine

socket.on('connect', () => {
  // prepareInjection(bridge)
  socket.emit('galacean-devtools:init')

  const timer = setInterval(() => {
    engine = (window as any).__GALACEAN_ENGINE__
    if (engine) {
      timer && clearInterval(timer)

      const rootEntities = engine.sceneManager.activeScene.rootEntities
      const data = rootEntities.map(entity => buildEntitiesTree(entity))

      socket.emit('galacean-devtools:refresh', data)
    }
  }, 1000)
})

// Global disconnect handler. Fires in two cases:
// - after calling above socket.disconnect()
// - once devtools is closed (that's why we need socket.disconnect() here too, to prevent further polling)
socket.on('disconnect', () => {
  socket.disconnect()
})

// Disconnect socket once other client is connected
socket.on('vue-devtools:disconnect-user-app', () => {
  socket.disconnect()
})

window.addEventListener('beforeunload', () => {
  socket.emit('vue-devtools:disconnect')
})
