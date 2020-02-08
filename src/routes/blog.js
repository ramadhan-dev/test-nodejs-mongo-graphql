const express = require('express');
const jwt = require('jsonwebtoken');
const blogController = require('./../controllers/blogController');
const InvalidToken = require('./../Helpers/Errors/InvalidToken')
const router = express.Router();

const token = (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1];
        const options = {
            expiresIn: '1h'
        };
        try {
            result = jwt.verify(token, process.env.JWT_KEY, options);
            req.decoded = result;
            next();
        } catch (err) {
            const error = new InvalidToken(err);
            res.json({
                error: error
            });
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        };
        res.status(401).send(result);
    }
}


router.get('/', [token], blogController.getBlog);

module.exports = router;