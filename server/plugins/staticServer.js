const Path = require("path");

module.exports = {
  name: "StaticServer",

  register: (server, options) => {
    server.dependency("@hapi/inert", registerRoutes);
  }
};

function registerRoutes(server) {
  server.route({
    method: "GET",
    path: "/public/{param*}",
    handler: {
      directory: {
        path: Path.resolve(__dirname, "../../public"),
        redirectToSlash: true,
        index: true
      }
    }
  });
}
