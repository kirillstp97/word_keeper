<template>
  <Header/>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  methods: mapActions(['getLocalSavedData']),
  created () {
    this.getLocalSavedData()
  }
}
</script>
