const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema ({
   owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        // required: true,
    }, 
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5,
    },
    review: {
        type: String,
        required: true,
    },
}, {
    timpestamps: true,

})

module.exports = mongoose.model('Review', reviewSchema)