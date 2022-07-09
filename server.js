const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors')
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
 
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
 
var mysql = require('mysql');
var connection  = require('./lib/db');
 
var authRouter = require('./routes/auth');
 
var app = express();

// built-in middleware to handle urlencoded data.
// in other words,form data:
//'content-type:application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// Cross Origin Resource Sharing (CORS)
// app.use(cors())

// serve static files.
app.use(express.static(path.join(__dirname, '/public')));

// set the view engine to ejs
app.set('view engine', 'ejs');
// view engine setup
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());
// app.use(expressValidator());
 
app.use('/auth', authRouter);
 
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


app.get('^/$|/index?',(req,res)=>{
    res.render('index',{title: 'Home'});
});
app.get('^/about?',(req,res)=>{
    res.render('about', {title: 'About'});
});
app.get('^/product-details?',(req,res)=>{
    res.render('product-details');
});
app.get('^/contact?',(req,res)=>{
    res.render('contact', {title: 'Contact'});
});
app.get('^/properties?',(req,res)=>{
    res.render('shop', {title: 'Properties'});
});
app.get('^/login?',(req,res)=>{
    res.render('login');
});
app.post('/login-form', function (req, res) {
    res.sendFile(__dirname + '/auth');
	var email = req.body.email;
var password = req.body.password;
});
app.get('^/cart?',(req,res)=>{
    res.render('cart', {title: 'Cart'});
});
app.get('^/account?',(req,res)=>{
    res.render('account', {title: 'Account'});
});
app.get('^/register?',(req,res)=>{
    res.render('register', {title: 'Register'});
});
app.get('^/login?',(req,res)=>{
    res.render('login', {title: 'Sign-in'});
});
app.post('^/login?',(req,res)=>{
    UserLogin(req,res)
});

app.get('*', (req, res)=> {
    res.status(404).render('404');
  });
//res.sendFile('./views/index.html',{ root: dirname });

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT} access it on http://localhost:3500/` )
})