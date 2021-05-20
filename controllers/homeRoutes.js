const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
      // Query configuration
      attributes: [
          'id',
          'content',
          'title',
          'created_at',
        ],
      // Order the posts from most recent to least
      order: [[ 'created_at', 'DESC']],
      // From the User table, include the post creator's user name
      // From the Comment table, include all comments
      include: [
          {
              model: User,
              attributes: ['username']
          },
          {
              model: Comment,
              attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          }
      ]
  })
  // render the posts
  .then(dbPostData => {
    // serialization
    const posts = dbPostData.map(post => post.get({ plain: true }));
    // pass the posts into the homepage template
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// Render the single post page
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
          model: Comment,
          attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
          include: {
              model: User,
              attributes: ['username']
          }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // serialize the post data
      const post = dbPostData.get({ plain: true });
      // pass the post and a session variable into the single post template
      res.render('single-post', {
          post,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      // if a server error occured, return an error
      console.log(err);
      res.status(500).json(err);
    });
});

// Render the login page.  If the user is logged in, redirect to the home page.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('dashboard');
    return;
  }

  res.render('login');
});

// Render the sign up page.
router.get('/signup', (req, res) => {
if (req.session.loggedIn) {
  res.redirect('dashboard');
  return;
}

res.render('signup');
});


module.exports = router;