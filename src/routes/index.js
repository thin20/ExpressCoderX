const userRouter = require('./users');
const authRouter = require('./auth.route');
const authMiddleware = require('../app/middlewares/auth.middleware');

function route(app) {
    app.use('/users', authMiddleware.requireAuth, userRouter);
    app.use('/auth', authRouter);
    app.get('/', (req, res) => {
        res.render('index');
    })
}

module.exports = route;