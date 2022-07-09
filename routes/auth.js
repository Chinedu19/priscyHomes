
var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');
var app = express();
//display login page
// //authenticate user
// app.get('/auth', function(req, res, next) {
// var email = req.body.email;
// var password = req.body.password;

// connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
// if(err) throw err
// // if user not found
// if (rows.length <= 0) {
// req.flash('error', 'Please correctly enter email and Password!')
// res.redirect('/index')
// }
// else { // if user found
// // render to views/user/edit.ejs template file
// req.session.loggedin = true;
// req.session.name = name;
// res.redirect('/login');
// }            
// })
// })

// // http://localhost:3000/auth
// app.post('/account', function(request, response) {
// 	// Capture the input fields
// 	let email = request.body.email;
// 	let password = request.body.password;
// 	// Ensure the input fields exists and are not empty
// 	if (email && password) {
// 		// Execute SQL query that'll select the account from the database based on the specified username and password
// 		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
// 			// If there is an issue with the query, output the error
// 			if (error) throw error;
// 			// If the account exists
// 			if (results.length > 0) {
// 				// Authenticate the user
// 				request.session.loggedin = true;
// 				request.session.email = email;
// 				// Redirect to home page
// 				response.redirect('/index');
// 			} else {
// 				response.send('Incorrect email and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter email and Password!');
// 		response.end();
// 	}
// });



const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
app.post('/login', function(request, response) {
async function login(data) {
	const { email, password } = data;
	const user = await prisma.users.findUnique({
		where: {
			email
		}
		
	});
	if (!user) {
		throw createError.NotFound('User not registered')
	}
	const checkPassword = bcrypt.compareSync(password, users.password)
	if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
	delete users.password
	const accessToken = await jwt.signAccessToken(user)
	return { ...user, accessToken }
	request.session.loggedin = true;
				request.session.email = email;
				// Redirect to home page
				res.redirect('/index');
}
})
module.exports = router;