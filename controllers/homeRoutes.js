const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

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

    res.render('homepage',{
      posts,
      loggedIn: req.session.loggedIn,
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
    }]
  });
  const posts = postData.map((post) => post.get({ plain: true }));

  res.render('single-post',{ 
    posts,
    loggedIn: req.session.loggedIn,
  });
} catch (err) {
  res.status(500).json(err);
}
});

// Render the login page.  If the user is logged in, redirect to the home page.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});



module.exports = router;