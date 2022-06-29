import { defineStore } from 'pinia'

type store = {
  gl: carInfos,
  al: carInfos
}

export const useCarInfosStore = defineStore('carInfos', {
  state: () => {
    return {
      gl: {
        'D': [],
        'C': [],
        'B': [],
        'A': [],
        'S': [],
      } as carInfos,
      al: {
        'D': [],
        'C': [],
        'B': [],
        'A': [],
        'S': [],
      } as carInfos,
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setCarids(store: store) {
      this.gl = store.gl
      this.al = store.al
    },
  },
})