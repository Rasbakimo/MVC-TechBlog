const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// dashboard for logged in user
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User, attributes: ['username'],
      },
      {
        model: Comment,
      }]
    });
    const posts = postData.map(post => post.get({ plain: true }));

    res.render("dashboard", {
      posts, loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// edit post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: User, attributes: ['username'],
        order: [['created_at', 'DESC']],
      },
      {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'user_id',],
      }]
    });
    const posts = postData.map(post => post.get({ plain: true }));

    res.render('edit-post', {
      posts, loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edituser', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        // use id as the parameter for the request
        id: req.session.user_id
      }
    });
    const users = userData.map(user => user.get({ plain: true }));
    res.render('edit-user',{
        users, loggedIn: true
      });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;