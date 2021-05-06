const { User } = require('../models');

const userData = [{
        name: 'Joseph',
        email: 'OMG@OMG.com',
        username: 'Joseph',
        password: 'shocked'

    },
    {
        name: 'Mary',
        email: 'bustit@challenge.com',
        username: 'Mary',
        password: 'notVirgin'
    },
    {       
         name: 'Jesus',
         email: 'lil@god.com',
        username: 'GodSon',
        password: 'inTheTrenches'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;