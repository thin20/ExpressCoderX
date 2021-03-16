const User = require('../models/User');
const md5 = require('md5');
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

                var hashedPassword = md5(password);

                if (u.password !== hashedPassword) {
                    res.render('auth/login', {
                        errors: [
                            "Wrong password."
                        ],
                        values: res.body
                    });
                }

                res.cookie('userId', u._id, {
                    signed: true
                });
                res.redirect('/users');
            })
            .catch(err => { });
    }
}

module.exports = new AuthController();