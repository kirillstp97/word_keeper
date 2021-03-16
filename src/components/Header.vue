<template>
  <header>
    <nav>
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
  nav {
    display: flex;
    justify-content: space-between;
    background: $theme-color;
    padding: 20px 30px;
    border-radius: 6px;

    a {
      font-weight: bold;
      color: #eeeefa;
      &.router-link-exact-active {
        color: #fff;
        text-shadow: 0 0 2px #727272;
      }
    }
  }
</style>
