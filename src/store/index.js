import { createStore } from 'vuex'
import { findWords, getWordParams } from '@/api'

export default createStore({
  state: {
    searched_words: [],
    favorite_words: {},
    not_saved_word: {}
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
    getLocalSavedData (state) {
      const getLocalData = keyName => JSON.parse(localStorage.getItem(keyName))
      state.searched_words = getLocalData('saved_searched_list') || {}
      state.favorite_words = getLocalData('saved_favorite_list') || {}
      state.not_saved_word = getLocalData('not_saved_word') || {}
    },
    saveSearchedList (state, data) {
      state.searched_words = data
      localStorage.setItem('saved_searched_list', JSON.stringify(data))
    },
    saveFavoritesList (state, data) {
      state.favorite_words = data
      localStorage.setItem('saved_favorite_list', JSON.stringify(data))
    },
    update_not_saved_word (state, data) {
      state.not_saved_word = data
      localStorage.setItem('not_saved_word', JSON.stringify(data))
    }
    },
  getters: {
    formingCardList: () => words_list => {
      if (!Array.isArray(words_list) || !words_list.length) return []

      return words_list.map(({ word, results, isFavorite, order }, index) => {
        const { definition, partOfSpeech } = results[0]
        return {
          word,
          definition,
          partOfSpeech,
          isFavorite,
          order: order || ~index
        }
      })
    },
    }
  }
})
