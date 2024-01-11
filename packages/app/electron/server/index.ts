import { createServer } from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { Server } from 'socket.io'
import consola from 'consola'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const port = process.env.PORT || 8848
export function init() {
  const app = createApp()
  app.use(
    '/',
    eventHandler(() => {
      const userAppFile = path.join(__dirname, '../../dist/user-app.js')
      const userAppContent = fs.readFileSync(userAppFile, 'utf-8')
      const processSyntaxPolyfill = `if(!window.process){window.process={env:{}}};`
      return processSyntaxPolyfill + userAppContent
    }),
  )

  const httpServer = createServer(toNodeListener(app))
  const io = new Server(httpServer, {
    cors: {
      origin: true,
    },
  })

  io.on('connection', (socket) => {
    // Disconnect any previously connected apps
    socket.broadcast.emit('galacean-devtools:disconnect-user-app')

    socket.on('galacean-devtools:init', () => {
      consola.success('galacean-devtools:init')
      socket.broadcast.emit('galacean-devtools:init')
    })

    socket.on('galacean-devtools:refresh', (data) => {
      socket.broadcast.emit('galacean-devtools:refresh', data)
    })

    socket.on('galacean-devtools:show', (name) => {
      socket.broadcast.emit('galacean-devtools:show', name)
    })
    socket.on('galacean-devtools:hide', (name) => {
      socket.broadcast.emit('galacean-devtools:hide', name)
    })

    socket.on('galacean-devtools:disconnect', () => {
      socket.broadcast.emit('galacean-devtools:disconnect')
    })

    socket.on('disconnect', (reason) => {
      if (reason.indexOf('client'))
        socket.broadcast.emit('galacean-devtools-disconnect-devtools')
    })

    socket.on('galacean-devtools:message', (data) => {
      socket.broadcast.emit('galacean-devtools:message', data)
    })
  })

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on 0.0.0.0:${port}`)
  })
}
