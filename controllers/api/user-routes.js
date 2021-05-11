const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//  find all users
router.get('/', async (req, res) => {

    try {
        const userData = await User.findAll(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// find one user by id
router.get('/:id', async (req, res) => {

    try {
        const userData = await User.findOne(req.params.id, {
            include: [
                { model: User, attributes: [username] },
                { model: Comment }
            ]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login 
router.post('/login', async (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
//   delete user
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;


