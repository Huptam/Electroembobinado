var express = require('express');
var router = express.Router();

router.get('/',async(req,res)=>{
    res.render('reparacion/listar')
})

router.get('/agregar-reparacion',async(req,res)=>{
    
})

router.post('/agregar-reparacion',async(req,res)=>{

})
module.exports = router;