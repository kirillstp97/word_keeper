<template>
</template>

<script>
import { mapActions } from 'vuex'

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
  methods: mapActions(['toggleFavoriteWords'])
}
</script>
