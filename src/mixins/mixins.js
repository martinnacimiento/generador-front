export default {
  methods: {
    transformate(na, a, b) {
      na = parseInt(na) / parseInt(this.$store.state.divider);
      return (na * (b - a) + a).toString();
    },
    copy() {
      let aux = document.createElement("input");
      aux.setAttribute("value", JSON.stringify(this.$store.state.serie));
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.snackbar = true;
    },
  },
};
