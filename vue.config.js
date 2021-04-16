module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/lms/' : '/',
  devServer: {
    proxy: "http://localhost:8000",
  },
};
