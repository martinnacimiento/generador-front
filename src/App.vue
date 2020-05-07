<template lang="pug">
  v-app(id="inspire")
    v-navigation-drawer(v-model="drawer" app)
      v-list(dense)
        v-list-item(to="/" link)
          v-list-item-action
            v-icon mdi-home
          v-list-item-content
            v-list-item-title Home
        v-list-item(to="/fibonacci" link)
          v-list-item-action
            v-icon mdi-home
          v-list-item-content
            v-list-item-title Fibonacci
        v-list-item(to="/congruencial-multiplicativo" link)
          v-list-item-action
            v-icon mdi-home
          v-list-item-content
            v-list-item-title Congruencial Multiplicativo

    v-app-bar(app color="indigo" dark)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title Generador
      v-spacer
      v-btn( @click="toAbout" outlined ) Sobre

    v-content
      v-container(class="fill-height" fluid)
        v-row(align="center" justify="center")
          v-col(class="text-center")
            v-fab-transition
              router-view

    v-footer(color="indigo" app)
      span(class="white--text") Nacimiento & Senghaas &copy; 2020
</template>

<script>
export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
  }),

  methods: {
    toAbout() {
      this.$router.push("/about");
    },
  },
};
</script>
