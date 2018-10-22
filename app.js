const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');



const app = express();
app.use(cors());

app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+ '/public'));



let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'ecom_db'
  });
  connection.connect();




  app.get('/users',(req,res)=> {
    
    //let q = ''

    connection.query('SELECT * FROM users',(err,results) => {
        if(err) throw err;

     
        res.send(results);

        

      
        
    });


});


app.post('/signin',(req,res)=> {

  let person = {
    username: req.body.username,
    email: req.body.email,
    password:  req.body.password
    }
  //const password = req.body.password;
  //const username = req.body.username;
 

  let q = `SELECT * FROM users WHERE username = '${person.username}'`;
  
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
      username: req.body.username,
      email: req.body.email,
      password:  bcrypt.hashSync(req.body.password,10)
      }
  
 let q = 'INSERT INTO users SET ?';


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