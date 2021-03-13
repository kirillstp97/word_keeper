module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/sass/_variables.scss";
          @import "@/assets/sass/_mixins.sass";
          @import "@/assets/sass/styles.scss";
        `
      },
    }
  }
}
