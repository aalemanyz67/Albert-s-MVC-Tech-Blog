//modules need for application
const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");


//Setting up the routes for the application
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comments", commentRoutes);


//moduel to  export the router
module.exports = router; 