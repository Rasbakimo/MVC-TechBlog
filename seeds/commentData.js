const {Comment} = require('../models')

const commentData = [
    {
    "body": "The ships hung in the sky in much the same way that bricks don't.",
   
   
   
},
{
    "body": "You showed me how insufficient were all my pretensions to please a woman worthy of being pleased.",
    
},   
{
    
    "body": "We all go a little mad sometimes",
  
},
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;