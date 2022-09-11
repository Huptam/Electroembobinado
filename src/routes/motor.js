var express = require('express'),
    router = express.Router(),
    db = require('../database');
    const{isLoggedIn}= require('../lib/auth');
router.get('/',isLoggedIn,async(req,res)=>{
    const motor = await db.query('SELECT * FROM motor INNER JOIN tipodemotor ON motor.Tipo_de_motor=tipodemotor.id_tipo');
    console.log(motor);
    
    res.render('motor/listar',{motor})
})
router.get('/agregar-motor',async(req,res)=>{
    const cliente = await db.query('SELECT * FROM cliente');
    const tiposdemotor = await db.query('SELECT * FROM tipodemotor');
    res.render('motor/agregar',{cliente,tiposdemotor})
})
router.post('/agregar-motor',async(req,res)=>{
   const{Num_campo,Num_subobina,Num_canto,Calibre_alambre,Ranura_por_medio,Peso_alambre,Num_vuelta,Tipo_campo,
    id_cliente,Tipo_de_motor,Marca,Modelo,Ph,Hp,Ranuras,Voltaje,Fecha_ingreso,Descripcion}= req.body;
   const embobinado = {
    Num_campo,
    Num_subobina,
    Num_canto,
    Calibre_alambre,
    Ranura_por_medio,
    Peso_alambre,
    Num_vuelta,
    Tipo_campo
   }
    db.query('INSERT INTO embobinado set?',[embobinado],async(err,res)=>{
    if(err) throw err;
    const {}= req.body;
    const motor ={
        id_bobina:res.insertId,
        id_cliente,
        Tipo_de_motor,
        Marca,Modelo,
        Ph,
        Hp,
        Ranuras,
        Voltaje,
        Fecha_ingreso: new Date(),
        Descripcion
    }
    await db.query('INSERT INTO motor set?',[motor])
   })
   console.log(req.body);
   
   res.redirect('/motores');
    
})
module.exports = router;
