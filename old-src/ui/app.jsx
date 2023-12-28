import React from 'react'
import { Tree } from 'antd'
import { ContextProvider, useContext } from './context'
import { EntityData } from './components/entity-data'

function AppImpl() {
  const {
    treeData,
    expandedKeys,
    handleExpand,
    getTreeData,
    selectedKeys,
    handleSelectedKeysChange,
  } = useContext()
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
  )
}

export function App() {
  return (
    <ContextProvider>
      <AppImpl />
    </ContextProvider>
  )
}
