const { Router } = require("express");

const usersRoutes = require('./users.routes')
const notesRoutes = require('./notes.routes')
const sessionsRoutes = require('./sessions.routes')
const tagsroutes = require("./Tags.routes")

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsroutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;

