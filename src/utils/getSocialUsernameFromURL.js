export default (urlWithUsername) => {
  const { pathname } = new URL(urlWithUsername);
  const parts = pathname.split("/").filter((i) => i.length && i !== "/");

  return parts.at(-1);
};
