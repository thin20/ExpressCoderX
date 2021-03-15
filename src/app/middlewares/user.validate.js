module.exports.postCreateUser = function (req, res, next) {
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

    next();
}