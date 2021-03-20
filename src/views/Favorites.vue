<template>
  <h1 class="content-title">Starred Words</h1>
  <div class="container">
    <SearchPanel
      :needFilters="getFavoritesList"
      @search-action="searchedFavorites"
      @part-speech-action="filterByPartSpeech"
    />
    <div class="wordlist">
      <draggable
        v-model="favoritedWords"
        handle=".wordlist-item__draghandle"
        itemKey="word"
      >
        <template #item="{ element }">
          <Word
            hasDraggable
            :wordParams="element"
          />
        </template>
      </draggable>
      <div
        class="wordlist__message"
        v-if="!favoritedWords.length && searchedQuery"
      >Nothing found in favorites</div>
      <div
        class="wordlist__message"
        v-else-if="!favoritedWords.length"
      >Nothing has been marked as favorite</div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import SearchPanel from '@/components/SearchPanel'
import Word from '@/components/Word'
import { mapGetters } from 'vuex'

export default {
  name: 'Favorites',
  components: {
    Word,
    SearchPanel,
    draggable
  },
  data: () => ({
    searchedQuery: '',
    filteredByPartSpeech: []
  }),
  computed: {
    ...mapGetters([
      'getFavoritesList',
      'getSearchInFavorites'
    ]),
    favoritedWords: {
      get () {
        if (!this.getFavoritesList.length) return []
        const bySearch = this.searchedQuery.length && this.searchedQuery
        const selectedPartSpeechList = this.filteredByPartSpeech.length && this.filteredByPartSpeech
        const filteringFavorites = (bySearch && this.getSearchInFavorites(bySearch)) || this.getFavoritesList

        if (filteringFavorites && selectedPartSpeechList) {
          return filteringFavorites.filter(({ partOfSpeech }) =>
            selectedPartSpeechList.includes(partOfSpeech)
          )
        }
        return filteringFavorites || []
      },
      set (newSort) {
        this.$store.dispatch('resortFavoritesAndSaveList', newSort)
      }
    }
  },
  methods: {
    filterByPartSpeech (filters) {
      this.filteredByPartSpeech = (filters.length && filters) || []
    },
    searchedFavorites (pattern) {
      this.searchedQuery = pattern
    }
  }
}
</script>
