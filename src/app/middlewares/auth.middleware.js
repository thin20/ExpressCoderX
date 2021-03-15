const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

module.exports.requireAuth = function (req, res, next) {
    if (!req.cookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    User.findById(req.cookies.userId)
        .then(user => {
            const u = mongooseToObject(user);
            if (!u) {
                res.redirect('/auth/login');
                return;
            }

            next();
        }).catch(err => { })
}