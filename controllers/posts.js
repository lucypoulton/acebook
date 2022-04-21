const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", {posts: posts});
    });
  }, New: (req, res) => {
    res.render("posts/new", {});
  }, Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  async Like(req, res) {
    if (req.session.user && req.body.post) {
      const user = req.session.user._id
      /**
       * - finds a post by id
       * - if the user's id is in the likes array, remove it
       * - otherwise, add it
       */
      await Post.findOneAndUpdate({_id: req.body.post}, [{
        $set: {
          likes: {
            $cond: [{$in: [user, "$likes"]}, {$setDifference: ["$likes", [user]]}, {$concatArrays: ["$likes", [user]]}]
          }
        }
      }]).exec()
    }

    res.redirect('/posts')
  }
};

module.exports = PostsController;
