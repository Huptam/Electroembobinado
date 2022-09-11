'use strict'
var express = require('express'),
    router = express.Router(),
    db = require('../database')

router.get('/',(req, res)=>{
    res.send('usuarios')
})
module.exports = router;