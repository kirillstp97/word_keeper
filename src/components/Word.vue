<template>
  <div class="wordlist-item">
    <i v-if="hasDraggable" class="wordlist-item__draghandle fas fa-grip-lines"></i>
    <router-link
      class="wordlist-item__word"
      :to="`/parsing/${wordParams.word}`"
    >
      {{ wordParams.word }}
    </router-link>
    <span class="wordlist-item__part-speech">{{ wordParams.partOfSpeech }}</span>
    <span class="wordlist-item__desc">{{ wordParams.definition }}</span>
    <i
      @click="toggleFavoriteWords(wordParams)"
      class="wordlist-item__favorite fa-star"
      :class="wordParams.isFavorite ? 'fas' : 'far'"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Word',
  props: {
    wordParams: Object,
    hasDraggable: Boolean
  },
  methods: mapActions(['toggleFavoriteWords'])
}
</script>

<style lang="scss" scoped>
  .wordlist-item {
    display: flex;
    cursor: default;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    padding: 8px 10px;
    margin-bottom: 10px;

    & > * {
      margin: 0 10px;
      white-space: nowrap;
    }
    &__word {
      font-weight: 600;
    }
    &__part-speech {
      font-style: italic;
    }
    &__desc {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__favorite {
      color: $theme-color;
      margin-left: auto;
      cursor: pointer;
    }
    &__draghandle {
      cursor: alias;
    }
  }
</style>
