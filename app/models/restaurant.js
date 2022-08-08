const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema(
{
	name: {
		type: String,
		required: true,
	},
	image: [{
		
		type: String,
		required: true,
	}],
	description: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		default: 5,
	},
	visitors: {
		type: Number,
		default: 0,
	},
	cuisine: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		requried: true,
	},
	number: {
		type: Number,
	},
	email: {
		type: String,
	},
	hours: {
		type: String
	},
	review: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Review',
		// required: true,
	},
},
{
	timestamps: true,
}
)

module.exports = mongoose.model('Restaurant', restaurantSchema)
