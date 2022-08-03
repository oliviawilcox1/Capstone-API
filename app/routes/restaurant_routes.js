// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// Mongoose models
const Restaurant = require('../models/restaurant')
const Review = require('../models/review')
const User = require('../models/user')

// Custom Errors and Error Types/Set status codes
const customErrors = require('../../lib/custom_errors')

// 404 Function called if non-existent document is requested 
const handle404 = customErrors.handle404

// 401 Function for a user attempting to modify a resource owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to `router.<verb>` requires a token for the route to work and will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// *********** GET/Index Route for Restaurants **************
router.get('/restaurants', (req, res, next) => {
	Restaurant.find()
	// find all restaurants
		.then((restaurants) => {
			// `restaurants` will be an array of Mongoose documents
			// we want to convert each one to a POJO(plain old javascript object), so we use `.map` to
			// apply `.toObject` to each one
			return restaurants.map((restaurant) => restaurant.toObject())
		})
		// respond with status 200 and JSON of the restaurants
		.then((restaurants) => res.status(200).json({ restaurants: restaurants }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// *********** GET Route for Total # of Restaurants ********
router.get('/restaurants/sum', (req, res, next) => {
	Restaurant.count({})
	// Count all restaurants in the DB
		.then((restaurants) => {
			// `restaurants` will be an array of Mongoose documents
			// we want to convert each one to a POJO(plain old javascript object), so we use `.map` to
			// apply `.toObject` to each one
			return  restaurants
		})
		// respond with status 200 and JSON of the restaurants
		.then((restaurants) => res.status(200).json({ restaurants: restaurants }))
		// if an error occurs, pass it to the handler
		.catch(next)
})



// *********** GET/Index Route for Restaurants Sorted in Descending Order **************
router.get('/restaurants/filter', (req, res, next) => {
	Restaurant.find({}).sort({"rating":-1})
	// find all restaurants and sort them by rating in descending order 
		.then((restaurants) => {
			// `restaurants` will be an array of Mongoose documents
			// we want to convert each one to a POJO(plain old javascript object), so we use `.map` to
			// apply `.toObject` to each one
			return restaurants.map((restaurant) => restaurant.toObject())
		})
		// respond with status 200 and JSON of the restaurants
		.then((restaurants) => res.status(200).json({ restaurants: restaurants }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// *********** GET/Show Route for One Restaurant **************
router.get('/restaurants/:id', (req, res, next) => {
	Restaurant.findById(req.params.id)
	// find restaurant by id set in the route
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "restaurant" JSON
		.then((restaurant) => res.status(200).json({ restaurant: restaurant.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// *********** POST/Create Route for Favorites **************
router.post('/profile/:id',  (req, res, next) => {
	// set owner of new restaurant to be current user
	//req.body.restaurant.owner = req.user.id

	// Restaurant.create(req.body.restaurant)
	// 	// respond to succesful `create` with status 201 and JSON of new "restaurant"
	// 	.then((restaurant) => {
	// 		res.status(201).json({ restaurant: restaurant.toObject() })
	// 	})
	// 	// if an error occurs, pass it off to our error handler
	// 	// the error handler needs the error message and the `res` object so that it
	// 	// can send an error message back to the client
	// 	.catch(next)

		// get our review from req.body
		const restaurant = req.body.favorite;
		// get our productId from req.params.id
		const userId = req.params.id;
		// find the product
		User.findById(userId)
		  // handle what happens if no products found
			.then(handle404)
		  // push the review to the reviews array
			.then((user) => {
				user.favorites.push(restaurant);
				// save the product
				return user.save();
		  	})
		  // then we send the product as json
		  	.then((user) => res.status(201).json({ user: user }))
		  // catch errors and send to the handler
		  	.catch(next);
	  });


	




// *******************************************
//  Review Routes
// *******************************************


// *********** GET/Index Route for Reviews **************
router.get('/reviews', (req, res, next) => {
	Review.find({})
	// Find all reviews
		.populate('restaurant')
		.populate('owner')
		.then((reviews) => {
			// `reviews` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return reviews.map((review) => review.toObject())
		})
		// respond with status 200 and JSON of the examples
		.then((reviews) => res.status(200).json({ reviews: reviews }))
		// if an error occurs, pass it to the handler
		.catch(next)
})




// *********** POST/Create Route for Reviews **************
router.post('/reviews/:id', requireToken, (req, res, next) => {
	// find restaurant by id set in the route
	// find user id by user currently logged in and set it to owner of the review
	req.body.review.owner = req.user.id
	req.body.review.restaurant = req.params.id
	Review.create(req.body.review)
	// Create review from req.body
			 .then(review => {
					requireOwnership(req, review)
					// require ownership for the review to assign owner
					Restaurant.findById(req.params.id)
					// then find the restaurant by the id
					.then(restaurant => {
						// then calculate the rating by recalculating the average with the new user rating and incrementing the vistors by one
						restaurant.rating = ((restaurant.visitors * restaurant.rating ) + review.rating) /(restaurant.visitors+1)
						restaurant.visitors++
						// increment the visitors to accurately add a visitor on the page
						return restaurant.save()
						// save the new restaurant data to permanently update the visitors and ratings
						})
					.catch(next)
					// catch any errors
				return review.save()
				// save teh new review
				})
			.then((review) => {
				// then we send the product as json after converting to an Object 
				res.status(201).json({ review: review.toObject() })
			})
			.catch(next)
		})
		
// *********** PATCH/Edit Route for Reviews **************
router.patch('/reviews/:id', requireToken, removeBlanks, (req,res,next) => {
	const reviewId = req.params.id
	Review.findById(reviewId) 
	// find the review by the id set in the route
		.then(handle404)
		// handle a possible error if review doesnt exist
		.then((review) => {
			// throw an error if current user doesn't own the review
			requireOwnership(req, review)
			return review.updateOne(req.body.review)
			// return an updated review with the new req.body if ownership did not throw an error
		})
		.then(()=> res.sendStatus(204))
		// Send a succesful status if complete
		.catch(next)
})

// *********** DELETE Route for a Review **************
router.delete('/reviews/:id', requireToken, (req, res, next) => {
	Review.findById(req.params.id)
		.then(handle404)
		// handle any errors if review doesnt exist
		.then((review) => {
			// throw an error if current user doesn't own review
			requireOwnership(req, review)
			// delete the review ONLY IF the above didn't throw an error
			review.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})






module.exports = router
