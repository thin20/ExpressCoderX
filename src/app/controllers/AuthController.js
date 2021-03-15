const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class AuthController {

    // GET[Login]
    login(req, res, next) {
        res.render('auth/login');
    }

    // POST[Login]
    postLogin(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({ email: email })
            .then(function (user) {
                const u = mongooseToObject(user);
                if (!user) {
                    res.render('auth/login', {
                        errors: [
                            'User does not exits.'
                        ],
                        values: res.body
                    });
                    return;
                }

                if (u.password !== password) {
                    res.render('auth/login', {
                        errors: [
                            "Wrong password."
                        ],
                        values: res.body
                    });
                }

                res.cookie('userId', u._id);
                res.redirect('/users');
            })
            .catch(err => { });
    }
}

module.exports = new AuthController();