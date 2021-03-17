import { createStore } from 'vuex'
import { findWords, getWordParams } from '@/api'

export default createStore({
  state: {
    searched_words: []
  },
  actions: {
    async searchByPattern ({ commit }, word) {
      const wordList = await findWords(word)
      if (!wordList || !wordList.length) return []

      const wordListParams = await Promise.all(
        wordList.map(word => getWordParams(word))
      )

      commit('updateSearchedList', wordListParams)
      localStorage.setItem('saved_searched_list', JSON.stringify(wordListParams))
    },
    }
  },
  mutations: {
    updateSearchedList (state, data) {
      state.searched_words = data
    }
  }
})
