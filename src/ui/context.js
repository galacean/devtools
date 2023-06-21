import { useState, useEffect, useCallback } from 'react';
import constate from 'constate';
import { backgroundPageConnection } from './port';
import { sendMessage } from './utils/send-message';

// 默认展开 2 级
const getDefaultExpandedKeys = (treeData) => {
  const expandLevelCount = 2;
  const result = [];
  let parent = [treeData[0]];
  for (let i = 0; i < expandLevelCount; i++) {
    let nextParent = [];
    for (let j = 0; j < parent.length; j++) {
      const item = parent[j];
      result.push(item.key);
      if (item.children) {
        nextParent.push(...item.children);
      }
    }
    parent = nextParent;
    nextParent = [];
  }
  return result;
};

export const [ContextProvider, useContext] = constate(() => {
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState({});
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    const agentMessageHandler = (msg) => {
      switch (msg.name) {
        case 'TREE_DATA': {
          setTreeData([msg.data]);
          setExpandedKeys(getDefaultExpandedKeys([msg.data]));
          break;
        }
        case 'REPORT_SELECTED_ENTITY_DATA':
        case 'ENTITY': {
          setSelectedEntity(msg.data);
          break;
        }
        default:
          break;
      }
    };
    backgroundPageConnection.onMessage.addListener(agentMessageHandler);
    return () => {
      backgroundPageConnection.onMessage.removeListener(agentMessageHandler);
    };
  }, []);

  const getTreeData = useCallback(() => {
    sendMessage('GET_TREE_DATA');
  }, []);

  useEffect(() => {
    getTreeData();
  }, [getTreeData]);

  const handleSelectedKeysChange = (keys) => {
    setSelectedKeys(keys);
    sendMessage('SELECT_ENTITY_IN_TREE', { path: keys[0] });
  };

  const handleEntityVisibleChange = (visible) => {
    sendMessage('SET_ENTITY_VISIBLE', { path: selectedKeys[0], visible });
  };

  const handleEntityDataChange = (key, value) => {
    sendMessage('SET_ENTITY_DATA', { path: selectedKeys[0], key, value });
  };

  const handleExpand = (keys) => {
    setExpandedKeys(keys);
  };

  return {
    treeData,
    expandedKeys,
    handleExpand,
    getTreeData,
    selectedKeys,
    handleSelectedKeysChange,
    selectedEntity,
    handleEntityVisibleChange,
    handleEntityDataChange,
  };
});
