<template>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Word',
  props: {
    word_params: {
      word: String,
      definition: String,
      partOfSpeech: String,
      isFavorite: Boolean
  },
    hasDraggable: Boolean
  },
  methods: mapMutations(['toggleFavoriteWords'])
}
</script>
