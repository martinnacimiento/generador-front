import axios from "axios";

const baseDomain = "https://martin9898.pythonanywhere.com/";
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
