const mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   port: '3306',
   database:'priscyhomes'
 });
 connection.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });  
 connection.query(
    "SELECT * FROM users where user_type='admin'",
    function(err, results, fields) {
        console.log(err);
        console.log(results);
        connection.end();
    }
);
module.exports = connection; 
