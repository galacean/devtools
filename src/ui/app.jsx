import React from 'react';
import { Tree, Switch } from 'antd';
import { useContext, ContextProvider } from './context';
import { EntityData } from './components/entity-data';

const AppImpl = () => {
  const {
    treeData,
    expandedKeys,
    handleExpand,
    getTreeData,
    selectedKeys,
    handleSelectedKeysChange,
  } = useContext();
  return (
    <div className="container">
      <div className="treeContainer">
        <button onClick={getTreeData}>refresh</button>
        <Tree
          showLine
          expandedKeys={expandedKeys}
          onExpand={handleExpand}
          treeData={treeData}
          selectedKeys={selectedKeys}
          onSelect={handleSelectedKeysChange}
        />
      </div>
      <EntityData />
    </div>
  );
};

export const App = () => (
  <ContextProvider>
    <AppImpl />
  </ContextProvider>
);
