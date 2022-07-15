const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var router = express.Router();
const paystack = require('./controller/paystack')
var mysql = require('mysql');
var connection  = require('./lib/db');
 
const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
var app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var authRouter = require('./routes/auth');
const Property = require('./model/Property');

// built-in middleware to handle urlencoded data.
// in other words,form data:
//'content-type:application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// Cross Origin Resource Sharing (CORS)
// app.use(cors())

// serve static files.

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


app.get('^/$|/index?', (req, res) => {
    res.render('index', { title: 'Home' });
});
app.get('^/about?', (req, res) => {
    res.render('about', { title: 'About' });
});
app.get('^/property/:slug?', (req, res) => {
    const product_title = req.params.slug
    const property = Property.getProperty({ title: product_title.replace(/-/g, ' ') })
    property.then(data => {
        res.render('product-details', { property: data });
    })
});
app.post('^/paystack/pay?', (req, res) => {
    const form = {
        full_name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        amount: parseInt(req.body.amount),
    }
    console.log(form)
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;
    const {initializePayment}= paystack()

    const payment = initializePayment(form).then((data)=>{
        var response = data;
        res.redirect(response.data.data.authorization_url)
    }
    ).catch(
        (err)=>{
            res.redirect('/404')
        }
    )
    
    
});

app.get('^/contact?',(req,res)=>{
    res.render('contact', {title: 'Contact'});
});
app.get('^/error?',(req,res)=>{
    res.render('error');
});

app.get('^/contact?', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

//contact form-send mail
app.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>service: ${req.body.service}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ekotkedei@gmail.com', // generated ethereal user
            pass: 'rgzgiegzqnstvglh'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <ekotkedei@email.com>', // sender address
        to: 'ekotkedei@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', { msg: 'Email has been sent successfully!' });
    });
});
//end of contact form-send mail

app.get('^/properties?', (req, res) => {
    const allProperty = Property.getAllProperties()
    // if (!allProperty) {
    //     throw new Error('Error! No users found!')
    // }
    // Access the provided 'page' and 'limt' query parameters
    let searchQuery = req.query.search;
    if (typeof searchQuery === 'string' && searchQuery.length > 1) {
        const propertySearch = Property.searchProperty({
            title: {
                search: searchQuery
            }
        })

        propertySearch.then((data) => {
            res.render('shop', { title: 'Properties', properties: data });
        })
    }
    else {
        allProperty.then(data => {

            console.log(data)
            res.render('shop', { title: 'Properties', properties: data });
        })
    }
});
app.get('^/login?', (req, res) => {
    res.render('login');
});

app.get('^/cart?', (req, res) => {
    res.render('cart', { title: 'Cart' });
});
app.get('^/account?', (req, res) => {
    res.render('account', { title: 'Account' });
});
app.get('^/register?', (req, res) => {
    res.render('register', { title: 'Register' });
});
app.get('^/login?', (req, res) => {
    res.render('login', { title: 'Sign-in' });
});
app.post('^/login?', (req, res) => {
    UserLogin(req, res)
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});
//res.sendFile('./views/index.html',{ root: dirname });

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT} access it on http://localhost:3500/`)
})