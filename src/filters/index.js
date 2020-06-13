import numeral from "numeral";

const valuesK = function(value) {
  if (!value) {
    return "0";
  }
  return numeral(value).format("0a");
};

const values = function(value) {
  if (!value) {
    return "0";
  }
  return numeral(value).format("0,0");
};

export { valuesK, values };