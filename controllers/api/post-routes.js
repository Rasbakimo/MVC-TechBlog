const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll(req.params.id, {

      include: [
        { model: User, attributes: ["username"] },
        { model: Comment }
      ]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find one Post by its `id` value
// be sure to include its associated Users
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment }
      ]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new Post
router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const postData = await Post.create(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a Post by its `id` value
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body,{
   
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a Post by its `id` value
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

