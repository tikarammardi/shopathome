const express = require('express');
const router = express.Router();


router.get('/',(req,res)=> {
    res.render('product');
    //res.send("Hello there")
});


module.exports = router;