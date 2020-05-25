const Confidence = require("confidence");
const Dotenv = require("dotenv");

Dotenv.config();

const internals = {};

const criteria = {
  env: process.env.NODE_ENV,
};

const config = {
  $meta: "Environment based config",
  plugins: {
    $filter: "env",
    development: [
      "./devServer",
      "./eventBus",
      "@hapi/inert",
      "./appServer",
      "./staticServer",
      "./renderer",
    ],
    $default: ["@hapi/inert", "./appServer", "./staticServer", "./renderer"],
  },
};

internals.store = new Confidence.Store(config);

exports.get = (key) => internals.store.get(key, criteria);
