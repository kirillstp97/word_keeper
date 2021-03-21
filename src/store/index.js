import { createStore } from 'vuex'
import { findWords, wordParams } from '@/api'

export default createStore({
  state: {
    searched_words: [],
    favorite_words: {},
    reserved_word: {}
  },
  actions: {
    async searchByPattern ({ commit, dispatch }, word) {
      const word_list = await findWords(word)
      if (!Array.isArray(word_list) || !word_list.length) return []

      const word_list_with_params = await dispatch('searchFullWordParams', word_list)
      commit('saveSearchedList', word_list_with_params)
    },
    async searchFullWordParams ({ state }, wordlist) {
      return (await Promise.all(
        wordlist.map(word => wordParams(word))
      ))
        .filter(({ results }) => results && results.length)
        .map(data => {
          data.isFavorite = data.word in state.favorite_words
          return data
        })
    },
    async findLocalOrSearchFullWordParams ({ commit, state, dispatch }, find_word) {
      const { favorite_words, searched_words, reserved_word } = state
      const found_word = (reserved_word.word === find_word && reserved_word) ||
        favorite_words[find_word] ||
        searched_words.find(({ word }) => word === find_word)
      if (found_word) return found_word

      const [word_params] = await dispatch('searchFullWordParams', find_word.split())
      commit('saveReservedWord', word_params)
      return word_params || false
    },
    toggleFavoriteWords ({ commit, state }, { word }) {
      const { favorite_words, searched_words, reserved_word } = state
      const hasInFavorites = word in favorite_words
      let unsaved_params = reserved_word.word === word
      let word_params = searched_words.find(e => e.word === word)

      if (word_params) {
        unsaved_params = false
      } else if (unsaved_params) {
        word_params = reserved_word
      }
      hasInFavorites && delete favorite_words[word]
      word_params && (word_params.isFavorite = !hasInFavorites)

      if (!hasInFavorites && word_params) {
        favorite_words[word_params.word] = word_params
      }
      commit('saveFavoritesList', favorite_words)

      if (!word_params) return false
      return unsaved_params
        ? commit('saveReservedWord', word_params)
        : commit('saveSearchedList', searched_words)
    },
    resortFavoritesAndSaveList ({ commit, state }, newSort) {
      const favlist = state.favorite_words
      newSort.forEach(({ word }, index) => { favlist[word].order = index })
      commit('saveFavoritesList', favlist)
    }
  },
  mutations: {
    getLocalSavedData (state) {
      const getLocalData = keyName => JSON.parse(localStorage.getItem(keyName))
      state.searched_words = getLocalData('saved_searched_list') || {}
      state.favorite_words = getLocalData('saved_favorite_list') || {}
      state.reserved_word = getLocalData('reserved_word') || {}
    },
    saveSearchedList (state, data) {
      state.searched_words = data
      data && localStorage.setItem('saved_searched_list', JSON.stringify(data))
    },
    saveFavoritesList (state, data) {
      state.favorite_words = data
      data && localStorage.setItem('saved_favorite_list', JSON.stringify(data))
    },
    saveReservedWord (state, data) {
      state.reserved_word = data
      data && localStorage.setItem('reserved_word', JSON.stringify(data))
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
    getSearchedList: ({ searched_words }, { formingCardList }) =>
      formingCardList(searched_words),

    getFavoritesList: ({ favorite_words }, { formingCardList }) => {
      const list = formingCardList(Object.values(favorite_words))
      return list.sort(({ order }, next) => order - next.order)
    },
    getSearchInFavorites: ({ favorite_words }, { formingCardList }) => pattern => {
      if (!/^[0-9a-zA-Z-\s]+$/.test(pattern)) return []

      const regexFilter = Object.values(favorite_words).filter(({ word }) =>
        new RegExp('^' + pattern).test(word)
      )
      return formingCardList(regexFilter)
    }
  }
})
