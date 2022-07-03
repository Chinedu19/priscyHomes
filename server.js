const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors')

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

app.get('^/$|/index?',(req,res)=>{
    res.render('index');
});
app.get('^/about?',(req,res)=>{
    res.render('about');
});
app.get('^/contact?',(req,res)=>{
    res.render('contact');
});
app.get('^/cart?',(req,res)=>{
    res.render('cart');
});
app.get('^/account?',(req,res)=>{
    res.render('account');
});
app.get('^/register?',(req,res)=>{
    res.render('register');
});

app.get('*', (req, res)=> {
    res.status(404).render('404');
  });
//res.sendFile('./views/index.html',{ root: dirname });

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT} access it on http://localhost:3500/` )
})