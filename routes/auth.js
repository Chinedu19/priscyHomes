var express = require('express');
var connection = require('../lib/db');
var router = express.Router();
const mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port: '3306',
    database:'priscyhomes'
  });
//display login page
router.get('/login', function (req, res, next) {
  res.render('auth/login', {
    title: 'Login',
    email: '',
    password: ''
  })
})
//authenticate user
router.post('/authentication', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  connection.connect();
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (err, rows, fields) {
    if (err) throw err
    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'Please correctly enter email and Password!')
      res.redirect('/login')
    }
    else { // if user found
      // render to views/user/edit.ejs template file
      req.session.loggedin = true;
      req.session.email = email;
      res.redirect('/account');
    }
  })

})
//display login page

router.get('/register', function (req, res, next) {
  res.render('auth/register', {
    title: 'Registration Page',
    name: '',
    email: '',
    password: ''
  })
})

// user registration
router.post('/post-register', function (req, res, next) {
  var user = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
  }
  // const password = req.body.password;
  // const confirm_password = req.body.confirm_password;
  connection.query('INSERT INTO users SET ?', user, function (err, result) {
    if (err) {
      req.flash('error', "Please fill in the correct details!")
      res.render('register')
      // if (confirm_password!= password){
      //   req.flash('error', 'Passwords do not match!')
      // res.render('register')
      // }
    }
    else {
      req.flash('success', 'You have successfully signup!');
      res.redirect('/account');
    }
  })

})

//add-property
router.post('/add-property', function (req, res, next) {
  var input_data = {
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    price: req.body.price,
    exert: req.body.exert,
    bedrooms: req.body.bedrooms,
    bathroom: req.body.bathroom,
    size: req.body.size,
    status: req.body.status,
    type: req.body.type,
    amenities: req.body.amenities,
    date_time: Date,
    images: req.body.images
  }
  connection.query('INSERT INTO properties SET ?', input_data, function (err, result) {
    if (err) throw err
    console.log(err);
    console.log('Successfully added a property!')
    res.render('account', { msg2: 'Property added successfully!' });
  })
})
module.exports = router;