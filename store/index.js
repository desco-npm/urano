import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default modules => {
  return () => {
    const Store = new Vuex.Store({
      modules,
      strict: process.env.DEBUGGING,
    })
  
    return Store
  }
}