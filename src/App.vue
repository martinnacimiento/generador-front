<template lang="pug">
  v-app(id="inspire")
    v-navigation-drawer(v-model="drawer" app)
      v-list(dense)
        v-list-item(to="/" link color="#536473")
          v-list-item-action
            v-icon mdi-home-circle-outline
          v-list-item-content
            v-list-item-title Home
        v-list-item(to="/generador" link color="#536473")
          v-list-item-action
            v-icon mdi-cog-counterclockwise
          v-list-item-content
            v-list-item-title Generador

    v-app-bar(app color="#010B40" dark)
      v-app-bar-nav-icon(v-if @click.stop="drawer = !drawer")
      v-toolbar-title Generador
      v-spacer
      v-btn( @click="setDark()" text fab ).mr-2
        v-icon mdi-theme-light-dark
      v-btn( @click="toAbout" outlined ) Sobre

    v-content
      v-container(class="fill-height" fluid)
        v-row(align="center" justify="center")
          v-col(class="text-center")
            v-fab-transition
              router-view

    v-footer(color="#010B40" app)
      span(class="white--text") Nacimiento & Senghaas &copy; 2020
</template>

<script>
export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    dark: false,
  }),

  methods: {
    toAbout() {
      this.$router.push("/about");
    },
    setDark() {
      this.dark = !this.dark;
      this.$vuetify.theme.dark = this.dark;
    }
  },
};
</script>
