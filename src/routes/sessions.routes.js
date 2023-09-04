const { Router } = require("express")

const sessionsRouter = Router();

const SessionsController = require("../controllers/SessionControllers")


const sessionsControllers = new SessionsController();

sessionsRouter.post("/", sessionsControllers.create)


module.exports = sessionsRouter;