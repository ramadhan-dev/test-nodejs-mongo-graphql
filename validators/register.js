// const User = require("./../controllers/registerController");

// exports.createUser = (req, res, next) => {
// 	req.check('username')
// 		.notEmpty().withMessage('username name required')
// 		// .custom(username => {
// 		// 	const a = User.getUsername(username)
// 		// 	console.log(a);
// 		// 	User.getUsername(function (data) {
// 		// 		name = data;
// 		// 		console.log(name);

// 		// 		// res.render('index', {
// 		// 		// 	title: name,
// 		// 		// 	year: date.getFullYear()
// 		// 		// });
// 		// 	});
// 		// 	// const user = User.getUsername(username).then(obj => {
// 		// 	// 	console.log(obj);
// 		// 	// 	if (obj) {
// 		// 	// 		return false
// 		// 	// 	}
// 		// 	// 	return true
// 		// 	// });
// 		// 	// console.log(user);

// 		// 	// tambahin async di function
// 		// 	//
// 		// 	// const user = await User.getUsername(username);
// 		// 	// if (user) {
// 		// 	// 	console.log('FALSE');
// 		// 	// 	return false
// 		// 	// }
// 		// 	// return true

// 		// }).withMessage('Username already exists')
// 		.isLength({
// 			min: 20,
// 			max: 50
// 		}).withMessage("username must between 6 to 15 charackter")

// 	// req.check("password", "Write a Password").notEmpty()

// 	const errors = req.validationErrors()
// 	if (errors) {
// 		const error = errors.map(error => {
// 			return {
// 				[error.param]: error.msg
// 			}
// 		})
// 		return res.status(400).json({
// 			error: error
// 		})
// 	}

// 	next()
// }