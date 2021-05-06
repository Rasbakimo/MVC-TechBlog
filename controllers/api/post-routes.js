const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/categories` endpoint
 // find all categories
  // be sure to include its associated Users
router.get('/', async (req, res) => {
 try {
    const postData = await Post.findAll(req.params.id, {
      include: [{ model:User}, {model: Comment}]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find one Post by its `id` value
  // be sure to include its associated Users
router.get('/:id',async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model:User}, {model: Comment}]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new Post
router.post('/',withAuth,async (req, res) => {
  try {
    const postData = await Post.create(
      {
      Post_name: req.body.Post_name 
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// update a Post by its `id` value
router.put('/:id',withAuth,async (req, res) => {
  try {
    const postData = await Post.update({
      id: req.body.id,
      Post_name:req.body.Post_name
    },
    {
      where: {
        id:req.params.id,
      }
      },
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // delete a Post by its `id` value
router.delete('/:id',withAuth,async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
       id:req.params.id
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

