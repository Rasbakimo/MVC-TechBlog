const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll(req.params.id);

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new Comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(
      {
        body: req.body, body,
      });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete a Comment by its `id` value
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;