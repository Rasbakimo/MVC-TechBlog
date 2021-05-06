const {Comment} = require('../models')

const commentData = [
    {
    body: "The ships hung in the sky in much the same way that bricks don't.",
   user_id: 1,
   post_id: 1
   
   
},
{
    body: "You showed me how insufficient were all my pretensions to please a woman worthy of being pleased.",
    user_id: 2,
    post_id: 2
},   
{
    
    body: "We all go a little mad sometimes",
    user_id: 3,
    post_id: 3
},
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;