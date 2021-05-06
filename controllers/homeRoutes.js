const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Render the home page
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User, attributes: ['username'],
        order: [['created_at', 'DESC']],
      },
      {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'user_id' ],
      }]
    });
    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the single post page
router.get('/post/:id',async (req, res) => {
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
      attributes: ['id', 'body', 'post_id', 'user_id' ],
    }]
  });
  const posts = postData.map((project) => project.get({ plain: true }));

  res.render('homepage', {
    users,
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res.status(500).json(err);
}
});

// Render the login page.  If the user is logged in, redirect to the home page.
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
  res.render('signup');
});



module.exports = router;