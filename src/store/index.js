import { createStore } from 'vuex'
import { findWords, getWordParams } from '@/api'

export default createStore({
  state: {
    searched_words: [],
    favorite_words: {}
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
    getLocalSavedData ({ commit }) {
      const getLocalSearchedWords = JSON.parse(localStorage.getItem('saved_searched_list'))
      const getLocalFavoriteWords = JSON.parse(localStorage.getItem('saved_favorite_list'))
      commit('updateSearchedList', getLocalSearchedWords || [])
      commit('updateFavoriteList', getLocalFavoriteWords || {})
    },
    }
  },
  mutations: {
    updateSearchedList (state, data) {
      state.searched_words = data
    },
    updateFavoriteList (state, data) {
      state.favorite_words = data
    },
    }
  }
})
