const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    quality: { type: Number, required: true },
    difficulty: { type: Number, required: true },
    review: String
});

const classSchema = new Schema({
    name: String,
    quality: { type: Number, required: true },
    difficulty: { type: Number, required: true },
    offered: String,
    url: String,
    reviews: [reviewSchema]
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
