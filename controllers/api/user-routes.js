//Modules need for userRoutes
const router = require("express").Router();
const { User } = require("../../models");

//route to get all users
router.get("/", (req, res) =>{
    User.findAll({
        attributes: { exclude: ["password"] },
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Route to sing up a new user

router.post("/signup", async (req, res) => {
    try {
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = req.body.password;

        const userData = await newUser.save();
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
        
    }catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});
//route to login a user

router.post("/login", async (req, res) => {
    try{
        const userData = await User.findOne({where: {username: req.body.username}});

        if (!userData) {
            res.status(400).json({message: "You typed in an incorrect username or password!"});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword){
            res.status(400).json({message: "You typed in an incorrect username or password!"});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: "You have been logged in! "});
        });
    }catch (err) {
        res.status(400).json(err);

    }
});

//route logs a user out
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
        res.status(404).end();
    }

});

//module to export the router
module.exports = router;