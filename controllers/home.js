const HomeController = {
  Index: (req, res) => {
    res.redirect("posts");
  },
  SuperSecret(req, res) {
    res.render('super_secret');
  }
};

module.exports = HomeController;
