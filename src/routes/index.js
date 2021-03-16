const userRouter = require('./users');
const authRouter = require('./auth.route');
const productRouter = require('./products.route');
const authMiddleware = require('../app/middlewares/auth.middleware');

function route(app) {
    app.use('/users', authMiddleware.requireAuth, userRouter);
    app.use('/auth', authRouter);
    app.use('/products', authMiddleware.requireAuth, productRouter);
    app.get('/', (req, res) => {
        res.render('index');
    })
}

module.exports = route;