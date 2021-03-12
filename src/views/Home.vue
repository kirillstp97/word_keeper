<template>
  <SearchPanel/>
  <WordList/>
</template>

<script>
import SearchPanel from '@/components/SearchPanel'
import WordList from '@/components/WordList'

export default {
  name: 'Home',
  components: {
    SearchPanel,
    WordList
  }
}
</script>
