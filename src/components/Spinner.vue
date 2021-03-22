<template>
  <transition name="fade">
    <div class="spinner" v-show="$store.state.spinner">
      <i class="fas fa-spinner fa-pulse fa-5x"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    color: $theme-color;
    z-index: 999;
    box-shadow: 0 0 6px #75b9ff;
    background: rgb(0, 0, 0, 60%);
    text-shadow: 0px 0px 6px $theme-color;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>
