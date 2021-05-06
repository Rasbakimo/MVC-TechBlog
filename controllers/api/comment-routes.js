const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
       const commentData = await Comment.findAll(req.params.id);
       const commentResponse = commentData.map(comment =>comment.get({plain: true}));

       res.status(200).json(commentResponse);
     } catch (err) {
       res.status(500).json(err);
     }
   });
   // find one Comment by its `id` value
   router.get('/comment/:id',async (req, res) => {
     try {
       const commentData = await Comment.findByPk(req.params.id);
       res.status(200).json(commentData);
     } catch (err) {
       res.status(500).json(err);
     }
   });
   // create a new Comment
   router.post('/',withAuth,async (req, res) => {
     try {
       const commentData = await Comment.create(
         {
         body: req.body.body,
       });
       res.status(200).json(commentData);
     } catch (err) {
       res.status(500).json(err);
     }
   });
     
   // update a Comment by its `id` value
   router.put('/:id',withAuth,async (req, res) => {
     try {
       const commentData = await Comment.update({
         id: req.body.id,
         body:req.body.body
       },
       {
         where: {
           id:req.params.id,
         }
         },
       );
       res.status(200).json(commentData);
     } catch (err) {
       res.status(500).json(err);
     }
   });
     // delete a Comment by its `id` value
   router.delete('/:id',withAuth,async (req, res) => {
     try {
       const commentData = await Comment.destroy({
         where: {
          id:req.params.id
         },
       });
       res.status(200).json(commentData);
     } catch (err) {
       res.status(500).json(err);
     }
   });
   
module.exports = router;