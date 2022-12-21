
const load = (key: string) => {
  const str = window.localStorage.getItem(key)
  if (str) {
    try {
      const value = JSON.parse(str)
      if (!value || (typeof value === 'object') === false) {
        console.log('Invalid stored value.')
        return {}
      }
      return value
    } catch(error) {
      console.log('Invalid JSON.')
    }
  }
  return {}
}

const save = (key: string, store: any) => {
  window.localStorage.setItem(key, JSON.stringify(store))
}

export type Store = {
  get: (key: string) => any
  set: (key: string, value: any) => void
}

export const createStore = (storeKey: string): Store => {
  const store = load(storeKey)

  const get = (key: string, defaultValue?: any) => {
    return store[key] ?? defaultValue
  }

  const set = (key: string, value: any) => {
    store[key] = value
    save(storeKey, store)
  }

  return {
    get,
    set,
  }
}
