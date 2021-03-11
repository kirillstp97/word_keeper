<template>
  <header>
    <nav id="nav">
      <router-link to="/">Word Keeper</router-link>
      <router-link to="/favorites">
        <i class="fas fa-star"></i>
        Starred Words
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'

}
</script>

<style lang="scss" scoped>
  #nav {
    a {
      font-weight: bold;

      &.router-link-exact-active {
        color: #689e9a;
      }
    }
  }
</style>
