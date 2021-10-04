// DEPENDENCIES
require("dotenv").config();
const router = require("express").Router();
/* ----------------------- */
const controllers = require("../controllers/maincontrollers");
// const middleware = require("../middlewares/mainmiddlewares");

// USER
router.post("/subscription", controllers.subscription);
router.get("/checksubs", controllers.checksubs);
router.post("/stopsubs", controllers.stopsubs);
router.post("/changesubs", controllers.changesubs);
module.exports = router;
