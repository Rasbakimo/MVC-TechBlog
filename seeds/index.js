const sequelize = require('../config/connection');
const seedPost = require('./postData');
const seedUser = require('./userData');
const seedComment = require('./commentData');

const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
 

 
  await seedQuote();
  console.log('\n----- QUOTE SEEDED -----\n');

  await seedUser();
  console.log('\n----- USER SEEDED -----\n');

  await seedTag();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedPrompt();
  console.log('\n----- PROMPT SEEDED -----\n');
  
  await seedComment();
  console.log('\n----- COMMENT SEEDED -----\n');

  process.exit(0);
};

seedAll();