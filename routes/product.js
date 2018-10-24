const express = require('express');
const router = express.Router();
const connection = require('../config/database');


router.get('/',(req,res)=> {

    
    connection.query('SELECT * FROM product',(err,results) => {
        if(err) throw err;

     
        console.log(results);

        res.render('product',{results});
    });

   
    
});


module.exports = router;