<template lang="pug">
  v-container(fluid)
    v-row
      v-col
        v-card(raised)
          v-card-title
            span(class="title font-weight-light") Parámetros
          v-card-text
            v-form(
              ref="form"
              v-model="valid"
              lazy-validation
            )
              v-row
                v-col(cols="12" sm="6")
                  v-text-field(
                    prepend-icon="mdi-waves"
                    label="Caudal inicial"
                    v-model="flow"
                    :rules="rules"
                    validate-on-blur
                    filled
                    rounded
                    dense
                    suffix="m3/s"
                  )
                v-col(cols="12" sm="6")
                  v-text-field(
                    prepend-icon="mdi-water-off"
                    label="Escurrido por compuerta"
                    v-model="drainedPerGate"
                    :rules="rules"
                    validate-on-blur
                    filled
                    rounded
                    dense
                    suffix="m3/s"
                  )
                v-col(cols="12" sm="6")
                  v-combobox(
                    prepend-icon="mdi-gate-open"
                    label="Limites para abrir cada compuerta"
                    color="green"
                    hint="ingrese los limites en orden ascendente."
                    v-model="limitsPerGate"
                    :rules="rulesArray"
                    validate-on-blur
                    multiple
                    chips
                    filled
                    rounded
                    dense
                    suffix="m3/s"
                  )
                    template(v-slot:selection="{index, item}")
                      v-chip
                        v-avatar(
                          class="accent white--text"
                          left
                          color="success"
                          v-text="`C${index+1}`"
                        )
                        | {{ item }}
                v-col(cols="12" sm="6")
                  v-text-field(
                    prepend-icon="mdi-flash"
                    color="yellow"
                    label="Capacidad de generar energia por turbina"
                    v-model="capacityPerTurbine"
                    :rules="rules"
                    validate-on-blur
                    filled
                    rounded
                    dense
                    suffix="MV"
                  )
                v-col(cols="12" sm="6")
                  v-text-field(
                    prepend-icon="mdi-shield-alert"
                    label="Limite para alerta roja"
                    color="red"
                    v-model="limitAlert"
                    :rules="rules"
                    validate-on-blur
                    filled
                    rounded
                    dense
                    suffix="m3/s"
                  )
                v-col(cols="12" sm="6")
                  v-text-field(
                    prepend-icon="mdi-wave"
                    label="Flujo de la turbina"
                    v-model="flowTurbine"
                    :rules="rules"
                    validate-on-blur
                    filled
                    rounded
                    dense
                    suffix="m3/s"
                  )
          v-card-actions
            v-spacer
            vs-button(@click="validate" size="large" circle) Simular represa
    v-row
      v-col(cols="12" sm="1" md="2")
        v-skeleton-loader(
          :loading="loading"
          transition="fade-transition"
          type="article"
          class="mb-6"
        )
          v-card(raised width="auto")
            v-card-title
              v-icon(large left color="blue") mdi-waves
              span(class="title font-weight-light") Caudal
            v-card-text(class="headline font-weight-bold") {{ resume.flow | valuesK}} 
              span(class="headline font-weight-light") m
                  sup 3
                  | /s
      v-col(cols="12" sm="1" md="2")
        v-skeleton-loader(
          :loading="loading"
          transition="fade-transition"
          type="article"
          class="mb-6"
        )
          v-card(raised)
            v-card-title
              v-icon(large left color="blue") mdi-water-off
              span(class="title font-weight-light") Escurrido
            v-card-text(class="headline font-weight-bold") {{ resume.drained | valuesK}} 
              span(class="headline font-weight-light") m
                sup 3
                | /s
      v-col(cols="12" sm="1" md="2")
        v-skeleton-loader(
          :loading="loading"
          transition="fade-transition"
          type="article"
          class="mb-6"
        )
          v-card(raised)
            v-card-title
              v-icon(large left color="yellow") mdi-flash-off
              span(class="title font-weight-light") Energia perdida
            v-card-text(class="headline font-weight-bold") {{ resume.lostEnergy | valuesK}} 
              span(class="headline font-weight-light") MWh
      v-col(cols="12" sm="1" md="4")
        v-skeleton-loader(
          :loading="loading"
          transition="fade-transition"
          type="article"
          class="mb-6"
        )
          v-card(raised)
            v-card-title
              v-icon(large left color="green") mdi-gate-open
              span(class="title font-weight-light") Compuertas abiertas
            v-card-text(class="headline font-weight-bold")
              v-chip(v-for="(gate, i) in resume.gates" :key="i" color="success" outlined).ma-2
                | {{ i+1 }}: {{ gate }}
      v-col(cols="12" sm="1" md="2")
        v-skeleton-loader(
          :loading="loading"
          transition="fade-transition"
          type="article"
          class="mb-6"
        )
          v-card(raised class="rounded-lg")
            v-card-title
              v-icon(large left color="red") mdi-shield-alert
              span(class="title font-weight-light") Alertas rojas
            v-card-text(class="headline font-weight-bold") {{ resume.alert }}
    v-row
      v-col
        v-skeleton-loader(
          :loading="loading"
          transition="fade-transition"
          type="table"
        )
          v-card(raised)
            v-card-text()
              v-data-table(
                :headers="headers"
                :items="simulation"
              )
                template(v-slot:item.flow="{ item }") {{ item.flow | values }}
                template(v-for="(gate, i) in gates" v-slot:[gate.value]="{item}")
                  v-chip(:key="i" :color="item.gates[i] ? 'green':'red'" dark)
                    v-icon {{ item.gates[i] ? "mdi-gate-open":"mdi-gate" }}
                template(v-slot:item.alert="{ item }")
                  v-chip(:color="item.alert ? 'red':'gray'" dark)
                    v-icon mdi-shield-alert
</template>
<script>
import axios from "@/api";
export default {
  name: "Dam",
  data: () => ({
    simulation: [],
    resume: {
      drained: 0,
      flow: 0,
      lostEnergy: 0,
      gates: [0, 0, 0, 0],
      alert: 0,
    },
    loading: false,
    valid: true,
    rules: [
      (v) => !!v || "El campo es requerido",
      (v) =>
        Number.isInteger(parseInt(v)) || "El campo debe ser un numero entero",
      (v) => v > 0 || "El campo debe ser mayor que 0",
    ],
    rulesArray: [
      (v) => v.length > 0 || "El campo es requerido",
      (v) =>
        v.filter((e) => !Number.isInteger(parseInt(e))).length == 0 ||
        "Solo numeros enteros",
    ],
    flow: 20000,
    drainedPerGate: 3000,
    capacityPerTurbine: 160,
    limitsPerGate: [15000, 25000, 32000, 40000],
    limitAlert: 45000,
    flowTurbine: 830,
    headers: [
      { text: "Dia", value: "day" },
      { text: "Caudal", value: "flow" },
      { text: "Compuerta 1", value: "gate1", sortable: false },
      { text: "Compuerta 2", value: "gate2", sortable: false },
      { text: "Compuerta 3", value: "gate3", sortable: false },
      { text: "Compuerta 4", value: "gate4", sortable: false },
      { text: "Alerta roja", value: "alert", sortable: false },
    ],
    gates: [],
  }),
  methods: {
    async simulate() {
      this.loading = true;
      let { data } = await axios.post("dam", {
        vars: this.$store.state.vars,
        flow: this.flow,
        drainAmount: this.drainedPerGate,
        limitsGate: this.limitsPerGate,
        flowTurbine: this.flowTurbine,
        capacityEnergy: this.capacityPerTurbine,
        limitAlert: this.limitAlert,
      });
      this.setHeaders(data.resume.gates.length);
      this.simulation = data.simulation;
      this.resume = data.resume;
      this.loading = false;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.simulate();
      }
    },
    setHeaders(length) {
      this.headers = [];
      this.gates = []
      this.headers.push({ text: "Dia", value: "day" });
      this.headers.push({ text: "Caudal", value: "flow" });
      for (let index = 0; index < length; index++) {
        this.headers.push({
          text: `Compuerta ${index + 1}`,
          value: `gate${index + 1}`,
          sortable: false 
        });
        this.gates.push({
          text: `Compuerta ${index + 1}`,
          value: `item.gate${index + 1}`,
        });
      }
      this.headers.push({ text: "Alerta roja", value: "alert", sortable: false });
    },
  },
};
</script>
