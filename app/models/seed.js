const mongoose = require('mongoose')
const Restaurant = require('./restaurant')

const db = require('../../config/db')

const data = [
    {
        name:  "PLANTA Queen NoMad",
		image: "https://www.vegetariantimes.com/wp-content/uploads/2021/05/Planta-Queen-Hero.png",
		description: "Sushi, Small Plates, Dumplings and Wok Noodles. Try their Udon Noodles for an amazing truffle experience!",
		rating: 4.5,
		visitors: 400,
		cuisine: "Sushi Bar/Tapas",
		address: "15 W 27th St",
    },
    {
        name:  "Jajaja",
		image: "https://i2.wp.com/greenpointers.com/app/uploads/2022/02/jajaja.jpg?fit=1200%2C649&ssl=1",
		description: "A upbeat Mexican Restaurant with a multitude of fantastic taco options, quesadillas, and nachos. Try one of their Mezcal Cocktails to complete your meal!",
		rating: 4.6,
		visitors: 760,
		cuisine: "Mexican Cuisine",
		address: "63 Carmine Street",
    },  {
        name:  "Blossom on Columbus",
		image: "https://images.squarespace-cdn.com/content/v1/545c4607e4b0f8d97a394c9a/1614185975325-EQNQ1EHZYUBOLILJ1CLQ/A.ETLING+photography+-+09.24.2019+-_DSC5977.jpg?format=2500w",
		description: "Extremely inventive and unique cuisine! Try their Seitan Piccata for a great entree!",
		rating: 4.4,
		visitors: 847,
		cuisine: "Vegan Cuisine",
		address: "507 Columbus Ave",
    },  {
        name:  "Avant Garden",
		image: "https://cdn.vox-cdn.com/thumbor/KqNR3Cm3yle2MHU3nOWgMrTDhVc=/0x0:6000x4000/1200x800/filters:focal(2520x1520:3480x2480)/cdn.vox-cdn.com/uploads/chorus_image/image/60075049/AGBK_interior3.0.jpg",
		description: "Refined and modern takes on culinary classics. Our favorite highlight is the Paella!",
		rating: 4.6,
		visitors: 453,
		cuisine: "High End Vegan Cuisine",
		address: "Carmine Street",
    },  {
        name:  "Ladybird",
		image: "https://images.squarespace-cdn.com/content/v1/5f26b13319c2212d9789d9e2/e5f22332-49cb-4a86-a812-a2ad0380a357/Ladybird+Interior+%284%29.JPG?format=2500w",
		description: "Offering yummy vegan tapas and excellent wines. We love the Buffalo Maitake Buns adn the Mac and Cheese!",
		rating: 4.6,
		visitors: 554,
		cuisine: "Small Plates/Cocktails",
		address: "111 E 7th St",
    },  {
        name:  "Champs Diner",
		image: "https://images.otstatic.com/prod1/42061189/2/large.jpg",
		description: "Classic Diner food veganized. Be sure to try their cookie dough milkshakes and their mozarella sticks!",
		rating: 4.5,
		visitors: 2789,
		cuisine: "American Cuisine",
		address: "197 Meserole St",
    },  {
        name:  "Modern Love",
		image: "https://vegansnews.com/wp-content/uploads/2020/05/Modern-Love-Brooklyn-vegan.jpg",
		description: "Comfort food served in an elegant way. Be sure to try the Molo Nachos and the Chickpea Parmesan Hero!  ",
		rating: 4.5,
		visitors: 1022,
		cuisine: "American Cuisine",
		address: "317 Union Ave",
    } ,  {
        name:  "Peacefood Cafe",
		image: "http://annikalundkvistphotography.com/wp-content/uploads/2015/10/ABC_5769_E.jpg",
		description: "Peacefood provides sandwiches, smoothies, burgers and fantastic desserts! Try out their chickpea fries and their japanese pumpkin sandwich! ",
		rating: 4.4,
		visitors: 1308,
		cuisine: "American Cuisine",
		address: "460 Amsterdam Ave",
    },  {
        name:  "Hangawi",
		image: "https://www.nycgo.com/images/venues/1446/new_york_hangawi_interior_seiichi_joanne__medium.jpg",
		description: "An upscale creative Korean restaurant where you take off your shoes at the door! Be sure to try their Tofu Kimchi Hot Pot and Vegetable Dumplings!",
		rating: 4.5,
		visitors: 1212,
		cuisine: "Korean Cuisine",
		address: "12 E 32nd Street",
    },  {
        name:  "Beyond Sushi",
		image: "https://kirschnerskorner.files.wordpress.com/2019/09/beyond-sushi-2.jpg",
		description: "Enjoy unique vegan sushi rolls that are bursting with flavor. Try their Spicy Jackfruit Roll or their Fried Chick'n Bao Bun!",
		rating: 4.6,
		visitors: 1755,
		cuisine: "Sushi",
		address: "134 W 37th Street",
    },  {
        name:  "abcV",
		image: "https://2.bp.blogspot.com/-0Mf4AoIVrQ0/WybKtA3kxfI/AAAAAAAAf34/xO5c8UAa4P0X50M9b_0Es1AaM7_zJA1tgCLcBGAs/s1600/fullsizeoutput_85c1.jpeg",
		description: "Sustainable and organic serving seasonal plates served by Chef Jean-Georges Vongerichten. Try the Mushroom Walnut Bolognese!",
		rating: 4.5,
		visitors: 1190,
		cuisine: "Artisanal Vegetarian Cuisine",
		address: "38 E 18th Street",
    },  {
        name:  "Urban Vegan Kitchen",
		image: "https://images.squarespace-cdn.com/content/v1/5835ae135016e15e71e0e18f/1510862461374-83JK4LACXTQ9P5D792OF/23698748_10210199396397765_1776069710_o.jpg",
		description: "If you are craving comfort food and soul food, Urban Vegan Kitchen is for you. Try their Super Mario Quesadilla or their Po'Boy!",
		rating: 4.5,
		visitors: 1331,
		cuisine: "Soul Food",
		address: "41 Carmine Street",
    },  {
        name:  "Willow",
		image: "https://willownewyork.com/wp-content/uploads/2021/01/Willow-Flatbread-2_rotated_640x480.jpg",
		description: "Willow offers homestyle dishes and tasty desserts. Try their Marinara flatbread or their Scallop Cacio e Pepe followed by the Vanilla Bean Cashew Cheesecake!",
		rating: 4.6,
		visitors: 279,
		cuisine: "American and Italian Cuisine",
		address: "199 8th Avenue",
    },  {
        name:  "Spicy Moon",
		image: "https://images.squarespace-cdn.com/content/v1/6179a921e2f0103b2a8c61d9/f162b50b-3b64-4161-b25a-18ac191ad608/spicy2.jpeg?format=2500w",
		description: "Szechuan food that will warm you up on a cold day. Try their Vegetable Wontons in Chili Oil or their Dan Dan Noodles!",
		rating: 4.7,
		visitors: 433,
		cuisine: "Chinese Cuisine",
		address: "328 E 6th Street",
    },  {
        name:  "Dirt Candy",
		image: "https://images.squarespace-cdn.com/content/v1/5c8d03277d0c91483c66d702/1553700806180-7LFGSAL05O19D3E1GIFC/Pumpkin+Pad+Thai.jpg?format=2500w",
		description: "If inventive dishes are what you are seeking, Dirt Candy is the five course restaurant for you. Try their onion tortellini and their Pumpkin Pad Thai!",
		rating: 4.6,
		visitors: 923,
		cuisine: "Vegetarian Cuisine",
		address: "86 Allen Street",
    },  {
        name:  "Delice & Sarrasin",
		image: "https://assets3.thrillist.com/v1/image/3044181/1200x630",
		description: "Delice & Sarrasin offers French classics veganized. Try one of their fantastic Crepes, Steak Tartare or their Coq Au Vin!",
		rating: 4.5,
		visitors: 693,
		cuisine: "French Cuisine",
		address: "20 Christopher Street",
    },  {
        name:  "Pure Ktchn",
		image: "https://images.squarespace-cdn.com/content/v1/587fd9153e00be6f0d1fd83e/1492523396164-M06LDGP846BPSPYT42HI/Pure+Ktcnh+four+bowls.JPG",
		description: "Pure Ktchn was inspired by healthy meals that don't compromise taste and support the environment. Try their Mexican Bowl or Cauli-Steak Sandwich!",
		rating: 4.6,
		visitors: 343,
		cuisine: "American Cuisine",
		address: "352 W 46th Street",
    },  {
        name:  "Cadence",
		image: "https://static01.nyt.com/images/2021/08/03/dining/03rest-cadence4/merlin_191497908_c8e5752b-757f-41c0-95b3-11231292e59e-mobileMasterAt3x.jpg",
		description: "A new vegan soul food restaurant with extremely tasty staples. Try their Southern Fried Lasagna or their Maple Buttermilk Cornbread!",
		rating: 4.4,
		visitors: 105,
		cuisine: "Soul Food",
		address: "122 E 7th Street",
    },  {
        name:  "Sestina",
		image: "https://media.cntraveler.com/photos/5ffe51991127e74ab1e176b9/16:9/w_2560,c_limit/SPAGHETTI.%20CARBONARA.jpg",
		description: "Matthew Kenney's pasta bar is inspired by Italy. Try their Truffle Tagliatelle or their Alfredo Pumpkin Ravioli!",
		rating: 4.6,
		visitors: 123,
		cuisine: "Italian Cuisine",
		address: "67 2nd Ave",
    },  {
        name:  "Bar Verde",
		image: "https://media.timeout.com/images/104699489/750/422/image.jpg",
		description: "Contemporary Mexican plates with delicious cocktails. Try their Nachos or their Maitake Tempura Tacos followed by Churros!",
		rating: 4.5,
		visitors: 450,
		cuisine: "Mexican Cuisine",
		address: "65 2nd Ave",
    },  {
        name:  "Double Zero",
		image: "https://cdn.vox-cdn.com/thumbor/aYtp0DYwfo_TmtFHtnMp74WwEL0=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22708248/ADRIAN_MUELLER_51.jpg",
		description: "Matthew Kenney's second vegan restuarant featuring wood fired pizzas with delicious flavors. Try their Squash Blossom Pizza or their Eggplant Parmesan!",
		rating: 4.5,
		visitors: 731,
		cuisine: "Pizzeria/Italian Cuisine",
		address: "65 2nd Ave",
    },  {
        name:  "Hartbreakers",
		image: "https://images.squarespace-cdn.com/content/v1/5ae75c2c5b409b339838d023/1553831038861-O56LG4XNR9POBA93N0FN/image-asset.jpeg",
		description: "Visit the 70's inspired restaurant that offers great sandwiches or fried chick'n. Try their 3 Piece Bucket of Fried Chick'n or their Thunderbird Sandwich!",
		rating: 4.7,
		visitors: 243,
		cuisine: "American Cuisine",
		address: "820 Hart Street",
    },  {
        name:  "Terms of Endearment",
		image: "https://images.squarespace-cdn.com/content/v1/5db3280c3a92327bb0e0cdd9/1619647645728-G3UH2ABLR3E98SB9YQNQ/Cornershop-59.jpg?format=2500w",
		description: "If you are craving delicious pastries or a breakfast sandwich, Terms of Endearment is your place. Try their B.A.L.T., The Lox, or any of their pastries!",
		rating: 4.3,
		visitors: 131,
		cuisine: "Cafe/Pastry Shop",
		address: "135 Metropolitan Street",
    },  {
        name:  "The VSPOT",
		image: "https://www.vspot.restaurant/wp-content/uploads/sb-instagram-feed-images/273598001_631748251271728_2433653080110588843_nfull.jpg",
		description: "A casual eatery that offers Empanadas, Quesadillas, and Burritos. Try their Philly Mushroom & Cheese Empanada or their Sweet Plantain Maduro Sumpreme!",
		rating: 4.4,
		visitors: 1057,
		cuisine: "Mexican Cuisine",
		address: "156th 5th Avenue",
    },  {
        name:  "Eterea",
		image: "https://img.particlenews.com/image.php?type=thumbnail_580x000&url=1OCAOz_0beqP2YG00",
		description: "This new and beautiful restaurant offers a great evening full of Cocktails and Food. Try their Tormenta Mezcal Cocktail, their Aciento Tacos or their Corn Ribs Elote!",
		rating: 4.8,
		visitors: 86,
		cuisine: "Cocktails/Small Plates",
		address: "511 E 5th Street",
    },  {
        name:  "Raiz",
		image: "https://vegoutmag.com/wp-content/uploads/2022/02/Raiz.jpg",
		description: "A new vegan Mexican Inspired Restaurant that focuses on health and environmental issues and a menu created to satisfy meat-eaters. Try their Baja Tacos, Westside Burritos or Asada Fries!",
		rating: 5.0,
		visitors: 44,
		cuisine: "Mexican Cuisine",
		address: "120 1st Avenue",
    },  {
        name:  "Coletta",
		image: "https://www.colettanyc.com/wp-content/uploads/BV0A5363.jpg",
		description: "A new Italian restaurant offering brick oven pizzas, pasta and entrees. Try their Fig Jam and Prosciutto Pizza, their Chick'n Piccata, or their Linguini Alfredo!",
		rating: 4.7,
		visitors: 93,
		cuisine: "Italian Cuisine",
		address: "365 3rd Avenue",
    },  {
        name:  "Black Flamingo",
		image: "https://images.happycow.net/venues/1024/76/33/hcmp76333_160807.jpeg",
		description: "If you want to eat your heart out, then dance the evening away at the same location, Black Flamingo is for you. Try their Guava Jam Quesadilla or their Tinga Tacos followed by Bombitas for dessert!",
		rating: 4.3,
		visitors: 701,
		cuisine: "Mexican Cuisine",
		address: "168 Borinquen Place",
    },  {
        name:  "Le Botaniste",
		image: "https://lebotaniste.us/wp-content/uploads/2020/04/Le-Botaniste-prescriptions-bowls-2-1-1-scaled.jpg",
		description: "A restaurant that provides organic tasty meals and wine in a carbon neutral restaurant. Try their Pasta Bolo or their Spicy Chili Sin Carne!",
		rating: 4.7,
		visitors: 665,
		cuisine: "American Cuisine",
		address: "833 Lexington Avenue",
    },  {
        name:  "Seasoned Vegan",
		image: "https://static.wixstatic.com/media/60dc09_6e2e7929a1af436193f71e113f6f4d94~mv2.png/v1/fill/w_280,h_438,al_c,q_85,usm_0.66_1.00_0.01/60dc09_6e2e7929a1af436193f71e113f6f4d94~mv2.webp",
		description: "Seasoned Vegan offers a haven for any soul food cravings. Try their BBQ Riblets, their Harlem Chopped Cheeseburger or their Crawfish Sandwich!",
		rating: 4.4,
		visitors: 1712,
		cuisine: "Soul Food",
		address: "55 St Nicholas Ave",
    } 
]







mongoose.connect(db, {
    useNewUrlParser: true,
})
    .then(() => {
        Restaurant.deleteMany({ owner: null })
            .then(deletedRestaurants => {
                console.log('these have been cleared', deletedRestaurants)
            })
            Restaurant.create(data)
                .then(newRestaurants => {
                    console.log('new restaurants created', newRestaurants)
                    mongoose.connection.close()
                })
                .catch(err => {
                    console.log(err)
                    mongoose.connection.close()
                })
            .catch(error => {
                mongoose.connection.close()
            })
    })
.catch(err => {
    console.log(err)
    mongoose.connection.close()
})