import type { Entity } from '@galacean/engine'

export interface Tree {
  name: string
  visible?: boolean
  type?: string
  children: Tree[]
}

export function buildEntitiesTree(entity: Entity) {
  const tree: Tree = {
    // @ts-expect-error _isRoot
    name: entity._isRoot ? 'root' : entity.name,
    visible: entity.isActive,
    type: entity.name,
    children: entity.children.map(child => buildEntitiesTree(child)),
  }

  return tree
}
