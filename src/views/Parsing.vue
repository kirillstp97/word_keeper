<template>
  <fieldset v-if="word_params" class="parsing">
    <i
      @click="updateFavoriteWord"
      :title="word_params.isFavorite ? 'Added to favorites' : 'Add to favorites'"
      class="fa-star fas parsing__favorite"
      :class="word_params.isFavorite && 'parsing__favorite_active'"
    />
    <legend>{{ word_params.word }}</legend>
    <div class="parsing__word-header">
      <span v-if="word_params.pronunciation">
        {{ word_params.pronunciation }}
      </span>
      <span v-if="word_params.syllables">
        [ {{ word_params.syllables.join('-') }} ]
      </span>
    </div>
    <div class="parsing__word-form">
      <div class="word-form"
        :key="index"
        v-for="(word_form, index) in word_params.results"
      >
        <span class="word-form__number">{{ index + 1 }}</span>
        <div class="word-form__details">
          <div class="details">
            <div class="details__definition">{{ word_form.definition }}</div>
            <template
              :key="index"
              v-for="(value, index) in word_form"
            >
              <div v-if="!['definition', 'partOfSpeech'].includes(index)">
                <span class="details__title">{{ index }}</span>
                <span>{{ Array.isArray(value) && value.join(', ') || value }}</span>
              </div>
            </template>
          </div>
          <span class="word-form__part-speech">
            {{ word_form.partOfSpeech }}
          </span>
        </div>
      </div>
    </div>
  </fieldset>
  <p v-else class="err-message">This word was not found</p>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Parsing',
  data: () => ({ word_params: false }),
  created () {
    this.getWordParams()
  },
  methods: {
    ...mapActions(['toggleFavoriteWords', 'findLocalOrSearchFullWordParams']),
    async updateFavoriteWord () {
      await this.toggleFavoriteWords(this.word_params)
      this.getWordParams()
    },
    async getWordParams () {
      this.word_params = await this.findLocalOrSearchFullWordParams(this.$route.params.word)
    }
  }
}
</script>

<style lang="scss" scoped>
  .parsing {
    padding: 10px;
    margin-top: 20px;
    border-radius: 6px;
    border: 1px outset #cecece;
    background: linear-gradient(#dcdcdc, #fff) no-repeat fixed;
    box-shadow: 1px 2px 2px #bbb;
    position: relative;
    &__word-header {
      display: flex;
      flex-wrap: wrap;
      font: 300 20px 'Roboto';
      color: #505050;
      padding: 0 6px;
      margin-right: 20px;
      & > span {
          margin-right: 10px;
      }
    }
    &__word-form {
      margin-top: 40px;
    }
    &__favorite {
      position: absolute;
      font-size: 30px;
      cursor: pointer;
      top: -8px;
      right: 2px;
      transition: text-shadow 0.3s;
      color: rgba(169, 162, 162, 0.57);
      text-shadow: 1px 1px #737373;
      &:hover {
        text-shadow: 0 0 2px;
      }
      &_active {
        color: rgba(255, 253, 161, 0.57);
        text-shadow: 0px 2px #dac71a;
      }
    }
    legend {
      padding: 0 8px;
      letter-spacing: 3px;
      font: 600 20px 'Roboto';
    }
  }

  .word-form {
    display: flex;
    margin: 16px 0;
    &__number {
      margin-right: 10px;
      font-size: 14px;
      color: #808080;
      cursor: default;
    }
    &__part-speech {
      font-weight: 600;
      align-self: flex-start;
      border-bottom: 4px solid $theme-color;
    }
    &__details {
      display: flex;
      flex: 1;
      cursor: default;
    }
  }

  .details {
    display: flex;
    flex: 1;
    padding-right: 20px;
    flex-direction: column;
    & > div {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    &__definition {
      color: #fff;
      padding: 2px 6px;
      border-radius: 2px;
      text-shadow: 0 0 3px #222;
      align-self: flex-start;
      background: $theme-color;
    }
    &__title {
      font-weight: 600;
      margin: 0 6px 6px 0;
      box-shadow: -6px 5px 2px $theme-color;
      & + span {
        font-size: 18px;
      }
    }
  }

  .err-message {
    text-align: center;
    font: 300 30px 'Roboto';
    margin-top: 20px;
  }
</style>
