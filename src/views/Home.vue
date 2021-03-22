<template>
  <div class="container">
    <SearchPanel @search-action="searchByPattern"/>
    <div class="wordlist">
      <Spinner/>
      <Word
        v-for="word_params in searchedList"
        :key="word_params.word"
        :wordParams="word_params"
      />
      <div
        class="wordlist__message"
        v-if="!searchedList.length"
      >No results, please use a search field</div>
    </div>
  </div>
</template>

<script>
import Word from '@/components/Word'
import SearchPanel from '@/components/SearchPanel'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Word,
    SearchPanel
  },
  computed: mapGetters({ searchedList: 'getSearchedList' }),
  methods: mapActions(['searchByPattern'])
}
</script>
