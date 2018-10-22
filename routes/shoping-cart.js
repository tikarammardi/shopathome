const express = require('express');
const router = express.Router();


router.get('/',(req,res)=> {
    res.render('shoping-cart');
    //res.send("Hello there")
});


module.exports = router;