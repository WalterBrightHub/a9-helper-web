import { defineStore } from 'pinia'
import { CascaderOption } from 'naive-ui'

type store = {
  gl: carInfo[],
  al: carInfo[]
}

const getOptions = (carInfos: carInfo[]): CascaderOption[] => ["D", "C", "B", "A", "S"].map(carClass => ({
  label: carClass,
  value: carClass,
  children: carInfos.filter(car => car.carClass === carClass).map(car => ({
    value: car.car_id,
    label: car.nickName,

  })) as CascaderOption[]
}))

export const useCarInfosStore = defineStore('carInfos', {
  state: () => {
    return {
      gl: [] as carInfo[],
      al: [] as carInfo[],
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
  getters: {
    glOptions: (state): CascaderOption[] => getOptions(state.gl),
    alOptions: (state): CascaderOption[] => getOptions(state.al),
  },
})