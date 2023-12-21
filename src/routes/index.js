const { Router } = require("express");

const usersRoutes = require("./users.routes");
const moviesRoutes = require("./movies.routes");
const tagsRoutes = require("./tags.routes");
const sessionRouter = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRouter);
routes.use("/movies", moviesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;
