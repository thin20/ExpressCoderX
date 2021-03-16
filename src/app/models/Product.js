const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, maxLength: 255, require: true },
    image: { type: String, maxLength: 255, require: true },
    description: { type: String, maxLength: 255, require: true },
    price: { type: Number, require: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', Product);
