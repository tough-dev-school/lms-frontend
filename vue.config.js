module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/lms/' : '/',
  outputDir: 'dist/lms',
  devServer: {
    proxy: "http://localhost:8000",
  },
};
