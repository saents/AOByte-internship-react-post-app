const {body} = require('express-validator');

module.exports = (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !body('email').isEmail(email)) {
        return res.status(400).json({error: 'Invalid email'});
    }

    if (!password || !body('password').isLength({min: 3, max: 32})) {
        return res.status(400).json({error: 'Invalid password'});
    }

    next();
};