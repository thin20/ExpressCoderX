const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class UserController {

    users(req, res, next) {
        User.find()
            .then(users => {
                res.render('users/index', {
                    users: multipleMongooseToObject(users)
                });
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('users/create');
    }

    addUser(req, res, next) {
        const user = new User(req.body);
        const errors = [];
        if (!req.body.name) {
            errors.push("Name is required.");
        }
        if (!req.body.age) {
            errors.push("Phone is required");
        }
        if (errors.length) {
            res.render('users/create', {
                errors: errors,
                values: req.body
            });
            return;
        }
        user.save()
            .then(() => {
                res.redirect('/users');
            })
            .catch(error => {

            });
    }

    search(req, res, next) {
        var q = req.query.name;
        console.log(q);
        User.find()
            .then(users => {
                var matchedUsers = multipleMongooseToObject(users).filter(function (user) {
                    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
                })

                res.render('users/index',
                    { users: matchedUsers }
                );
            })
            .catch(next);

    }

    viewUser(req, res, next) {
        var id = req.params.id;
        User.findById(id)
            .then(user => {
                res.render('users/view', { user });
            })
            .catch(next);
    }
}

module.exports = new UserController();