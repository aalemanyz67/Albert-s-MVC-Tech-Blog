//imports needed for moduels and routes
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

//this will set up routes
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;