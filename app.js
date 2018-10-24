const express = require('express');
const path = require('path');
//const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connection = require('./config/database');


const app = express();
app.set('views',path.join(__dirname,'views'));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,'public')));

//app.use(express.static(__dirname+ '/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




// let connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'ecom_db'
//   });
  connection.connect();



  //setting routes

  let pages = require('./routes/pages');
  let about = require('./routes/about');
  let contact = require('./routes/contact');
  let product = require('./routes/product');
  let shoping = require('./routes/shoping-cart');
  let signin = require('./routes/signin');
  let register = require('./routes/register');
  
  app.use('/signin',signin);
  app.use('/register',register);
  app.use('/contact',contact);
  app.use('/about',about);
  app.use('/shoping-cart',shoping);
  app.use('/product',product);
  app.use('/',pages);





  app.get('/users',(req,res)=> {
    
    //let q = ''

    connection.query('SELECT * FROM users',(err,results) => {
        if(err) throw err;

     
        res.send(results);
        
    });


});


app.post('/signin',(req,res)=> {

  let person = {
    email: req.body.email,
    password:  req.body.password
    }
  //const password = req.body.password;
  //const username = req.body.username;
 
    

  let q = `SELECT * FROM customers WHERE email = '${person.email}'`;
  
  connection.query(q,(err,results)=> {
      if(err) throw err;
    console.log(results);
    res.send(results);

   
      if(bcrypt.compareSync(person.password,results[0].password))//debuging required in terms of matching password -> IT'S DONE
          console.log("You have Successfuly Debuged ");
      else
        console.log("Enter correct password");
    
      
         //console.log(`your are IN`);
          //debug this use bcrypt instead.
  });
     

});

//User registration 
app.post('/register',(req,res)=> {


  let person = {
      email: req.body.email,
      password:  bcrypt.hashSync(req.body.password,10),
      address: req.body.address,
      mobile: req.body.mobile,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
      }

  
 let q = 'INSERT INTO customers SET ?';


 connection.query(q,person,(err,results) => {
  if(err) throw err;

 res.send(` ${person.username} You are successfully registered`); 
 console.log(results);
});
});

  
const port = process.env.PORT || 3001;
app.listen(port,()=> console.log(`Listening on Port ${port}`));

/*
/-->res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/product/:productId --> GET = product
/search --> GET  =  product
/cart/userId -->    PUT = product
/order/:uerId --> POST =  product/user
/review  --> GET = Reviews


--> npm run dev
--> mysql -u root -p
*/