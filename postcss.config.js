module.exports = {
  plugins: [
    require("postcss-nested"),
    require("postcss-custom-media")({
      importFrom: [
        {
          customMedia: { "--desktop": "(min-width: 800px)" },
        },
      ],
    }),
  ],
};
