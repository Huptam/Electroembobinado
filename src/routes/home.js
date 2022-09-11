'use strict'
var express = require('express'),
    router = express.Router();

    router.get('/',(req,res)=>{
        res.render('bienvenido')
    })

    module.exports = router