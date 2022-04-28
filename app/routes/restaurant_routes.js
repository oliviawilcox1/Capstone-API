// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for restaurants
const Restaurant = require('../models/restaurant')
const Review = require('../models/review')
// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
const restaurant = require('../models/restaurant')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /restaurants
router.get('/restaurants', (req, res, next) => {
	Restaurant.find()
		.then((restaurants) => {
			// `restaurants` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return restaurants.map((restaurant) => restaurant.toObject())
		})
		// respond with status 200 and JSON of the restaurants
		.then((restaurants) => res.status(200).json({ restaurants: restaurants }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /restaurants/5a7db6c74d55bc51bdf39793
router.get('/restaurants/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Restaurant.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "restaurant" JSON
		.then((restaurant) => res.status(200).json({ restaurant: restaurant.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /restaurants
router.post('/restaurants',  (req, res, next) => {
	// set owner of new restaurant to be current user
	//req.body.restaurant.owner = req.user.id

	Restaurant.create(req.body.restaurant)
		// respond to succesful `create` with status 201 and JSON of new "restaurant"
		.then((restaurant) => {
			res.status(201).json({ restaurant: restaurant.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})



// *******************************************
//  Review Routes
// *******************************************


// Index
router.get('/reviews', (req, res, next) => {
	Review.find({})
		.populate('restaurant')
		.populate('owner')
		.then((reviews) => {
			// `favorites` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return reviews.map((review) => review.toObject())
		})
		// respond with status 200 and JSON of the examples
		.then((reviews) => res.status(200).json({ reviews: reviews }))
		// if an error occurs, pass it to the handler
		.catch(next)
})
// CREATE route
router.post('/reviews', requireToken, (req, res, next) => {
	// set owner of new favorite to be current user
	req.body.review.owner = req.user.id
	req.body.review.restaurant = req.params.id
	Review.create(req.body.review)
		//console.log('rev', req.body.review)
		// respond to succesful `create` with status 201 and JSON of new "favorite"
		// ENTER INCREMENT HERE for a .then 
		// .populate('restaurant')
		// .then((review)=> {
		// 	Restaurant.findById(req.params.id)
		// 		.then(restaurant => {
		// 			restaurant.review.push(review)
		// 			restaurant.save()
		// 			return review
		// 		})
		// .catch(next)
			
		// })
		// Restaurant.findById()
		// .then(restaurant => {
		// 	restaurant = restaurant.visitors++
		// restaurant = (restaurant.visitors * restaurant.reviews ) + req.body.review.rating /restaurant.visitors
		// return restaurant.save()

		// })
		.then((review) => {
			res.status(201).json({ review: review.toObject() })
		})
		.catch(next)
})



router.patch('/reviews/:id', requireToken, removeBlanks, (req,res,next) => {
	// delete req.body.product.owner
	const reviewId = req.params.id

	Review.findById(reviewId) 
		.then(handle404)
		.then((review) => {
			requireOwnership(req, review)
			return review.updateOne(req.body.review)
		})
		.then(()=> res.sendStatus(204))
		.catch(next)
})

router.delete('/reviews/:id', requireToken, (req, res, next) => {
	Review.findById(req.params.id)
		.then(handle404)
		.then((review) => {
			// throw an error if current user doesn't own `favorites`
			requireOwnership(req, review)
			// delete the favorites ONLY IF the above didn't throw
			review.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


module.exports = router