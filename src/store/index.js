import { createStore } from 'vuex'
import { findWords, getWordParams } from '@/api'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    async searchByPattern ({ commit }, param) {
      const wordList = await findWords(param)
      if (!wordList.length) return []

      const wordListParams = await Promise.all(
        wordList.map(word => getWordParams(word))
      )

      commit('updateSearchedList', wordListParams)
      localStorage.setItem('searched_list', JSON.stringify(wordListParams))
    }
  },
  modules: {
  }
})
