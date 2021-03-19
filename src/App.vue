<template>
  <Header/>
  <router-view/>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  created () {
    this.$store.commit('getLocalSavedData')
  }
}
</script>
