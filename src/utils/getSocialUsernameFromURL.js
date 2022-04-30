const url = require("url");
export default (urlWithUsername) => {
  const path = url.parse(urlWithUsername).pathname;
  const parts = path.split("/").filter((i) => i.length && i !== "/");

  return parts.at(-1);
};
