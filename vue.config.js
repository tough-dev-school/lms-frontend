module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/lms/" : "/",
  outputDir: "dist/lms",
  devServer: {
    port: 3000,
    proxy: "http://localhost:8000",
  },
};
