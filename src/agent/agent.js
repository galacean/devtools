import { sendMessage } from './utils/send-message'

function traverseTree(entity, path = '') {
  const { name, instanceId, children } = entity
  const myPath = `${path}/${name}`
  const hasMeshRenderer = entity._components.some(
    c => typeof c.constructor.name === 'string' && c.constructor.name.includes('MeshRenderer'),
  )
  return {
    path: myPath,
    key: myPath,
    title: (name || '<No Name>') + (hasMeshRenderer ? ' 🎨' : ''),
    hasMeshRenderer,
    children: Array.isArray(children) ? children.map(e => traverseTree(e, myPath)) : undefined,
  }
}

export class Agent {
  constructor(galaceanInstance, GalaceanEngine) {
    this.instance = galaceanInstance
    this.GalaceanEngine = GalaceanEngine
    this.initDevtoolsMessageListener()
    window.__GALACEAN_DEVTOOLS_DEBUG__ = true
  }

  initDevtoolsMessageListener() {
    window.addEventListener('message', (event) => {
      // Only accept messages from same frame
      if (event.source !== window)
        return

      const message = event.data

      // Only accept messages of correct format (our messages)
      if (
        typeof message !== 'object'
          || message === null
          || message.source !== 'galacean-devtools-devtools'
      )
        return

      this.handleMessage(message)
    })
  }

  handleMessage = (message) => {
    switch (message.name) {
      case 'GET_TREE_DATA': {
        const treeData = this.getTreeData()
        sendMessage('TREE_DATA', treeData)
        break
      }
      case 'SELECT_ENTITY_IN_TREE': {
        this.selectEntityInTree(message.data.path)
        break
      }
      case 'SET_ENTITY_DATA': {
        const { path, key, value } = message.data
        window.__GALACEAN_DEVTOOLS_DEBUG__
        && console.log(
          '[Agent] received message: SET_ENTITY_DATA. path, key, value is',
          path,
          key,
          value,
        )
        eval(`window.$galacean.${key} = ${value}`)
        this.selectEntityInTree(path)
        break
      }
      default:
        break
    }
  }

  sendTestMessageToPanel() {
    sendMessage('agent -> panel')
  }

  get rootEntities() {
    return this.instance.sceneManager.activeScene._rootEntities
  }

  getTreeData = () => {
    // 遍历所有 rootEntity 然后递归获获取树形结构
    return {
      key: '/',
      title: 'ActiveScene',
      path: '/',
      hasMeshRenderer: false,
      children: this.rootEntities.map((rootEntity, index) => {
        const path = `/${index}/`
        return {
          // key: rootEntity.instanceId,
          key: path,
          title: `RootEntity[${index}]`,
          path,
          hasMeshRenderer: false,
          children: this.rootEntities[index].children.map(e => traverseTree(e, path)),
        }
      }),
    }
  }

  selectEntityInTree = (path) => {
    window.__GALACEAN_DEVTOOLS_DEBUG__ && console.log('[Agent] selectEntityInTree', path)
    // 选中树形目录根节点时清空属性面板
    if (path === '/') {
      sendMessage('REPORT_SELECTED_ENTITY_DATA', {})
      return
    }
    // 未处理的 path 带有 `/0` 前缀，数字代表 rootEntity 的 index
    const parts = path.split('/')
    const rootEntityIndex = Number.parseInt(parts[1])
    parts.splice(0, 2) // 删除前两个部分
    const realPath = parts.join('/')
    const entity = this.rootEntities[rootEntityIndex].findByPath(realPath)
    if (!entity)
      return
    window.$galacean = entity
    const {
      isActive,
      transform: { position, rotation, scale },
    } = entity
    const data = {
      isActive,
      'transform.position.x': position.x,
      'transform.position.y': position.y,
      'transform.position.z': position.z,
      'transform.rotation.x': rotation.x,
      'transform.rotation.y': rotation.y,
      'transform.rotation.z': rotation.z,
      'transform.scale.x': scale.x,
      'transform.scale.y': scale.y,
      'transform.scale.z': scale.z,
      'components': entity._components.map(c => ({ type: c.constructor.name })),
    }
    sendMessage('REPORT_SELECTED_ENTITY_DATA', data)
  }
}
