const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, maxLength: 255, require: true },
    age: { type: String, require: true },
    avatar: { type: String },
}, {
    timestamps: true,
});

// Add plugin
mongoose.plugin(slug);
User.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('User', User);