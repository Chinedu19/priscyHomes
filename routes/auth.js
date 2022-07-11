var express = require('express');
const { connect } = require('../lib/db');
var router = express.Router();
var connection = require('../lib/db');
const mysql=require('mysql');
var connection=mysql.createConnection({
    host:'::1',
    user:'root',
    password:'pwd',
    port: '3306',
    database:'priscyhomes'
  });
//display login page
//display login page
router.get('/login', function (req, res, next) {
    res.render('auth/login', {
        title: 'Login',
        email: '',
        password: ''
    })
})
//authenticate user
router.post('/authentication', function(req, res, next) {
var email = req.body.email;
var password = req.body.password;
connection.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  }); 
connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
if(err) throw err

// if user not found
if (rows.length <= 0) {
req.flash('error', 'Please correct enter email and Password!')
res.redirect('/login')
}
else { // if user found
// render to views/user/edit.ejs template file
req.session.loggedin = true;
req.session.email = email;
res.redirect('/account');
}
connection.end();            
})
})
//display login page

module.exports = router;