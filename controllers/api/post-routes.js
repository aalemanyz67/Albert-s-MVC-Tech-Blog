const router = require("express").Router();
const {Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//route to get all post with username
router.get("/", async (req, res)=> {
    try {
        const postData = await Post.findAll({
            include:[{model: User, attributes: ["username"]}],
        });
        res.status(200).json(postData);
    }catch (err) {
        res.status(500).json(err);

    }
});

//route to get one post by ID with the username and comments
router.get("/:id", async (req, res)=> {
    try {
        const postData = await Post.findByPk(req.params.id,{
            include: [
                {model: User, attributes: ["username"] },
                {
                    model: Comment,
                    include: [{model: User, attributes: ["username"]}],
                },
            ],
        
        });
        if (!postData) {
            res.status(404).json({message: "Post not found with that ID!"});
            return;

        }
        res.status(200).json(200).json(postData);
    }catch (err) {
        res.status(500).json(err);
    }
});
//allows the creation of a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    }catch (err) {
        res.status(400).json(err);
    }

});

//allows the update of an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: { id: req.params.id},
        });

        if (!updatedPost) {
            res.status(404).json({ message: "Post not found with that ID!"});
            return;
        }
    }catch (err) {
        res.status(500).json(err);
    }
});
//Route to delete a user
router.delete("/:id", withAuth, async (req, res) =>{
    try {
        //allows the deletion of all comments associated with post
        await Comment.destroy({
            where: {post_id: req.params.id},
        });

        const deletedPost =  await Post.destroy({
            where: {id: req.params.id},

        });

        if (!deletedPost) {
            res.status(404).json({ message: "Post not found with that ID!"});
            return;
        }
        res.status(200).json(deletedPost);

    }catch (err) {
        res.status(500).json(err);
    }
});

//module to export router
module.exports = router;