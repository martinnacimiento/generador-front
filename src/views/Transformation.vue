<template lang="pug">
    v-container(fluid)
        v-snackbar(
          v-model="snackbar"
          :timeout="timeout"
          bottom
          right
          color="success" 
        ) La serie ha sido transformada!
        v-row
            v-col
                v-card(raised)
                    v-card-title.word-break
                      span(class="title font-weight-light") Transformar serie dentro de un intervalo
                    v-card-text
                        v-form(
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        )
                            v-row
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Minimo"
                                        v-model="min"
                                        validate-on-blur
                                        placeholder="0"
                                        :disabled="$store.state.transformated"
                                        color="light-blue darken-4"
                                    )
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Maximo"
                                        v-model="max"
                                        validate-on-blur
                                        placeholder="99"
                                        :disabled="$store.state.transformated"
                                        color="light-blue darken-4"
                                    )
                    v-card-actions
                        v-spacer
                        v-btn( @click="validate" outlined color="light-blue darken-4") Transformar
            v-col
                v-card(raised)
                    v-data-table(
                        :headers="headers"
                        :items="$store.getters.serie"
                        :items-per-page="5"
                        :loading="loading"
                    )
                      template(v-slot:top="{ items }")
                        v-toolbar(flat)
                          v-toolbar-title Serie de números aleatorios
                          v-divider.mx-4(inset vertical)
                          div.flex-grow-1
                          v-tooltip(left)
                            template(v-slot:activator="{ on }")
                              v-btn(icon v-on="on")
                                v-icon(@click="copy") mdi-content-copy
                            span Copiar serie
</template>
<script>
import mixin from "@/mixins/mixins.js";
export default {
  name: "Transformation",
  mixins: [mixin],
  data: () => ({
    min: null,
    max: null,
    headers: [
      { text: "Indice", value: "index" },
      { text: "Numero", value: "number" },
    ],
    valid: true,
    loading: false,
    snackbar: false,
    timeout: 5000,
  }),
  methods: {
    copy() {
      let aux = document.createElement("input");
      aux.setAttribute("value", JSON.stringify(this.$store.state.serie));
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.snackbar = true;
    },
    validate() {
      if (this.$refs.form.validate()) {
        let serie = this.$store.state.serie.map((na) =>
          this.transformate(na, parseInt(this.min), parseInt(this.max))
        );
        this.$store.commit("setSerie", serie);
        this.$store.commit("setInterval", {
          min: parseInt(this.min),
          max: parseInt(this.max),
        });
        this.$store.commit("setTransformated", true);
        this.snackbar = true;
      }
    },
  },
};
</script>
<style scoped>
.word-break {
  word-break: normal;
}
</style>