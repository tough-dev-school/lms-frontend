export default (text) => {
  try {
    const richtypo = require("richtypo");
    const rules = require("richtypo-rules-ru");

    return richtypo(rules, text);
  } catch {
    // workaround for https://github.com/sapegin/richtypo.js/issues/34, when richtypo fails on safari
    return text;
  }
};
