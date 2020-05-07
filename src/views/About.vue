<template lang="pug">
  v-container( fluid )
    h1 Desarrolladores
    v-row
      v-col(align="center")
        v-card( raised width="350px" )
          v-img( :src="martin" :lazy-src="martin"  height="350px" width="350px"   aspect-ratio="1.7778" )
          v-card-title Nacimiento, Francisco Martin
          v-card-actions
            v-spacer
            v-btn( @click="url('https://www.linkedin.com/in/nacimientomartin/')" text fab small ).ma-2
              i(class="fab fa-linkedin-in")
            v-btn( @click="url('https://github.com/martinnacimiento')" text fab small ).ma-2
              i(class="fab fa-github")
            v-spacer
      v-col(align="center")
        v-card( raised width="350px" )
          v-img( :src="evelin" :lazy-src="evelin"  height="350px" width="350px"   aspect-ratio="1.7778" )
          v-card-title Senghaas, Yaneth Evelin
          v-card-actions
              v-spacer
              v-btn( @click="url('https://github.com/EvelinSenghaas')" text fab small ).ma-2
                i(class="fab fa-github")
              v-spacer
</template>

<script>
import martin from "@/assets/martin.jpg";
import evelin from "@/assets/evelin.jpeg";
export default {
  data: () => ({
    martin: martin,
    evelin: evelin,
  }),
  methods: {
    url(url) {
      window.open(url, "_blank");
    },
  },
};
</script>
