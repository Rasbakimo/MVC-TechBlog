const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/',withAuth, async (req, res) => {
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
      const posts = postData.get({ plain: true });

      res.render("dashboard", {posts,loggedIn: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/edit/:id',withAuth, async (req, res) => {
    
      
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
      attributes: ['id', 'body', 'post_id', 'user_id', ],
    }]
  });
  const posts = postData.map((project) => project.get({ plain: true }));

  res.render('edit-post', {posts, loggedIn: true
  });
} catch (err) {
  res.status(500).json(err);
}
});





module.exports = router;