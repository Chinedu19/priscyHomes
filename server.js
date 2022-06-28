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


app.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views', 'index.html'));
});
//res.sendFile('./views/index.html',{ root: dirname });

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT} access it on http://localhost:3500/` )
})