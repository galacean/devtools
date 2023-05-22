import { sendMessage } from './utils/send-message';

const traverseTree = (entity, path = '') => {
  const { name, instanceId, children } = entity;
  const myPath = path + `/${name}`;
  const hasMeshRenderer = entity._components.some(
    (c) => typeof c.constructor.name === 'string' && c.constructor.name.includes('MeshRenderer'),
  );
  return {
    path: myPath,
    key: myPath,
    title: (name || '<No Name>') + (hasMeshRenderer ? ' 🎨' : ''),
    hasMeshRenderer,
    children: Array.isArray(children) ? children.map((e) => traverseTree(e, myPath)) : undefined,
  };
};

export class Agent {
  constructor(galaceanInstance, GalaceanEngine) {
    this.instance = galaceanInstance;
    this.GalaceanEngine = GalaceanEngine;
    this.initDevtoolsMessageListener();
    window.__GALACEAN_DEVTOOLS_DEBUG__ = true;
  }
  initDevtoolsMessageListener() {
    window.addEventListener('message', (event) => {
      // Only accept messages from same frame
      if (event.source !== window) {
        return;
      }

      var message = event.data;

      // Only accept messages of correct format (our messages)
      if (
        typeof message !== 'object' ||
        message === null ||
        message.source !== 'galacean-devtools-devtools'
      ) {
        return;
      }

      this.handleMessage(message);
    });
  }
  handleMessage = (message) => {
    switch (message.name) {
      case 'GET_TREE_DATA': {
        const treeData = this.getTreeData();
        sendMessage('TREE_DATA', treeData);
        break;
      }
      case 'SELECT_ENTITY_IN_TREE': {
        this.selectEntityInTree(message.data.path);
        break;
      }
      case 'SET_ENTITY_DATA': {
        const { path, key, value } = message.data;
        window.__GALACEAN_DEVTOOLS_DEBUG__ &&
          console.log(
            '[Agent] received message: SET_ENTITY_DATA. path, key, value is',
            path,
            key,
            value,
          );
        eval(`window.$galacean.${key} = ${value}`);
        this.selectEntityInTree(path);
        break;
      }
      default:
        break;
    }
  };
  sendTestMessageToPanel() {
    sendMessage('agent -> panel');
  }
  get rootEntity() {
    return this.instance.sceneManager.activeScene.getRootEntity();
  }
  getTreeData = () => {
    return {
      // key: rootEntity.instanceId,
      key: '/',
      title: 'root',
      path: '/',
      hasMeshRenderer: false,
      children: this.rootEntity.children.map((e) => traverseTree(e)),
    };
  };
  selectEntityInTree = (path) => {
    window.__GALACEAN_DEVTOOLS_DEBUG__ && console.log('[Agent] selectEntityInTree', path);
    const entity = this.rootEntity.findByPath(path);
    if (!entity) return;
    window.$galacean = entity;
    const {
      isActive,
      transform: { position, rotation, scale },
    } = entity;
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
      components: entity._components.map((c) => ({ type: c.constructor.name })),
    };
    sendMessage('REPORT_SELECTED_ENTITY_DATA', data);
  };
}
