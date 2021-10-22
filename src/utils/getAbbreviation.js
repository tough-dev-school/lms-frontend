export default (str) => {
  if (typeof str !== "string") throw `wrong argument type: expecting string, found ${typeof str}`;
  if (!str.length) return "";

  return str
    .trim()
    .split(/\s+/)
    .reduce((acc, word) => (acc += word[0]), "");
};
