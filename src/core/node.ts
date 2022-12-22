
/**
 * @public
 * An object that could be destroyed (instance.destroy()).
 */
export type Destroyable = {
  destroy: () => boolean
}

/**
 * @public
 * An callback on a node.
 */
export type NodeCallback = (node: Node) => void

type PrivateProps = {
  children: null | Node[]
  listeners: Map<string, NodeCallback[]>
}

const getPrivateProp = <K extends keyof PrivateProps>(instance: Node, key: K) => {
  const props = instances.get(instance)
  if (!props) {
    throw new Error('This instance has been destroyed. You cannot use it anymore.')
  }
  return props[key]
}

const instances = new Map<Node, PrivateProps>()

const isAlive = (node: Node) => instances.has(node)

/**
 * Node is a light structure that holds the minimal code to handle lifecycle 
 * events (eg: update, destroy).
 * @public
 */
export class Node implements Destroyable {
  constructor() {
    instances.set(this, {
      children: null,
      listeners: new Map<string, NodeCallback[]>()
    })
  }
  on(event: 'destroy' | string, callback: NodeCallback): Destroyable {
    const listeners = getPrivateProp(this, 'listeners')
    if (listeners.has(event)) {
      listeners.get(event)!.push(callback)
    } else {
      listeners.set(event, [callback])
    }
    const destroy = () => {
      const props = instances.get(this)
      const array = props?.listeners.get(event)
      if (array) {
        const index = array.indexOf(callback)
        if (index !== -1) {
          array.splice(index, 1)
          return true
        }
      }
      return false
    }
    return { destroy }
  }
  *children() {
    const { children } = instances.get(this)!
    if (children) {
      yield* children
    }
  }
  get destroyed() {
    return isAlive(this) === false
  }
  destroy = () => {
    if (isAlive(this)) {
      const { children, listeners } = instances.get(this)!
      if (children) {
        for (const child of children) {
          child.destroy()
        }
        children.length = 0
      }
      const destroyListeners = listeners.get('destroy')
      instances.delete(this)
      if (destroyListeners) {
        for (const listener of destroyListeners) {
          listener(this)
        }
      }
      return true
    }
    return false
  }
  onDestroy(callback: NodeCallback) {
    return this.on('destroy', callback)
  }
  onUpdate(callback: NodeCallback) {
    return this.on('update', callback)
  }
  add(node: Node) {
    const props = instances.get(this)!
    if (props.children) {
      props.children.push(node)
    } else {
      props.children = [node]
    }
    return this
  }
  call(event: Exclude<string, 'destroy'>, recursive = true) {
    if (event === 'destroy') {
      throw new Error(`Cannot not call "destroy". It is a reserved event.`)
    }
    const queue: Node[] = [this]
    while(queue.length > 0) {
      const node = queue.shift()!
      const props = instances.get(node)
      if (props) {
        const listeners = props.listeners.get(event)
        if (listeners) {
          for (const listener of listeners) {
            listener(node)
          }
        }
        if (recursive) {
          if (props.children) {
            queue.push(...props.children)
          }
        }
      }
    }
    return this
  }
}
