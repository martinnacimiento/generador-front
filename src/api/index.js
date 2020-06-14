import axios from "axios";

const baseDomain = "https://generadorapp.herokuapp.com/";
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
