const express = require('express');
const router = express.Router();
const passport = require('passport');

const checkAuthenticated = passport.authenticate('jwt', { session: false });

router.get('/me', checkAuthenticated, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
