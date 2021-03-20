<template>
  <div class="search-panel">
    <div class="search-block">
      <input
        type="text"
        placeholder="Search field"
        v-model="search_word"
        @change="$emit('search-action', search_word)"
        class="search-block__input"
      />
      <i class="fas fa-search search-block__icon" />
    </div>

    <div v-if="needFilters">
      <label
        class="part-speech-block"
        v-for="(item, index) in filtersList"
        :key="index"
      >
        <input
          type="checkbox"
          :value="item"
          class="part-speech-block__checkbox"
          v-model="filter_part_speech"
          @change="$emit('part-speech-action', filter_part_speech)"
        />
        {{ item }}
        <span class="part-speech-block__mark"></span>
      </label>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SearchPanel',
  data: () => ({
    search_word: '',
    filter_part_speech: []
  }),
  props: {
    needFilters: Array
  },
  emits: ['search-action', 'part-speech-action'],
  computed: {
    filtersList () {
      return new Set(this.needFilters.map(({ partOfSpeech }) => partOfSpeech))
    }
  }
}
</script>

<style lang="scss">
  .search-panel {
    padding: 10px;
    flex-basis: 18%;
    min-width: 170px;
    margin-right: 10px;
    border-radius: 4px;
    background: #f3f3f3;
  }

  .search-block {
    position: relative;
    height: 36px;
    &__input {
      border: 0;
      width: 100%;
      height: 100%;
      font-size: 16px;
      padding: 0 26px 0 14px;
      box-shadow: 0 0 4px #dfdfdf;
    }
    &__icon {
      top: 50%;
      right: 8px;
      cursor: pointer;
      color: #efeded;
      position: absolute;
      transform: translateY(-50%);
    }
  }

  .part-speech-block {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: flex-end;
    user-select: none;
    cursor: pointer;
    margin: 12px 0;
    &__checkbox {
      display: none;
      &:checked ~ .part-speech-block__mark {
        background-color: $theme_color;
      }
    }
    &__mark {
      height: 1.1rem;
      width: 1.1rem;
      border-radius: 2px;
      margin-right: 0.6rem;
      background: #fff;
    }
  }
</style>
