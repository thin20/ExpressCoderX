const Product = require('../models/Product');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductController {

    index(req, res, next) {
        Product.find()
            .then(products => {

                const arrProduct = multipleMongooseToObject(products);
                const perPage = 8;
                const page = parseInt(req.query.page) || 1;
                const start = (page - 1) * perPage;
                const end = perPage * page;
                const length = Math.ceil(arrProduct.length / 8);

                res.render('products/index', {
                    products: arrProduct.slice(start, end),
                    prev: page > 1 ? (page - 1) : length,
                    next: page < length ? (page + 1) : 1,
                    length: length,
                    n: 1
                });
            }).catch(errors => { })
    }
}

module.exports = new ProductController();