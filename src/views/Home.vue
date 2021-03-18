<template>
  <SearchPanel/>
  <WordList/>
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
  computed: {
    ...mapGetters({
      searchedList: 'getSearchedList'
    })
  },
  methods: mapActions(['searchByPattern'])
}
</script>
