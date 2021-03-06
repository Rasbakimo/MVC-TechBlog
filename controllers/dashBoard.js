const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// dashboard for logged in user
router.get('/', withAuth, (req, res) => {
  // All of the users posts are obtained from the database
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data 
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// A route to edit a post
router.get('/edit/:id', withAuth, (req, res) => {
// All of the users posts are obtained from the database
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
      model: Comment,
      attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    },
    {
      model: User,
      attributes: ['username']
    }
  ]
})
  .then(dbPostData => {
    // if no post by that id exists, return an error
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    // serialize data before passing to template
    const post = dbPostData.get({ plain: true });
    res.render('edit-post', { post, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// A route to edit the logged in user
router.get('/edituser', withAuth, (req, res) => {
// Acess the User model and run the findOne() 
User.findOne({
  attributes: { exclude: ['password'] },
  where: {
    id: req.session.user_id
  }
})
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    // otherwise, return the data for the requested user
    const user = dbUserData.get({ plain: true });
    res.render('edit-user', {user, loggedIn: true});
  })
  .catch(err => {
    // if there is a server error, return that error
    console.log(err);
    res.status(500).json(err);
  })
});




module.exports = router;