module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /src\/components\/.*\/.*\.(html|mustache|hbs)$/i,
    use: "raw-loader",
  });
  // Return the altered config
  return config;
};
