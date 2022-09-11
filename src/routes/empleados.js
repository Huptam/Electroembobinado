'use strict'
var express = require('express'),
     router = express.Router(),
     db = require('../database');
     const{isLoggedIn, isNotLoggedin}= require('../lib/auth');
 router.get('/',isLoggedIn, async(req,res)=>{
        const empleados = await db.query('SELECT * FROM empleado INNER JOIN direccion ON empleado.id_direccion=direccion.Codigo');
        res.render('empleados/listar',{empleados})    
    })

 router.get('/agregar-empleado',isLoggedIn,(req,res)=>{
     res.render('empleados/agregar');

 })
 router.post('/agregar-empleado', async(req,res)=>{   
       const {Cedula,Nombre,Nombre2,Apellido_1,Apellido_2,Telefono,Fecha_nacimiento,Estado_civil,id_direccion,Municipio,Barrio,Calle,Carrera} = req.body
       const direccion = {
        Municipio,
        Barrio,
        Calle,
        Carrera
    } 
   db.query('insert into direccion set?',[direccion],async(err,res)=>{
    if(err) throw err;
    const empleado = {
        Cedula,
        Nombre,
        Nombre2,
        Apellido_1,
        Apellido_2,
        Telefono,
        Fecha_nacimiento,
        Estado_civil,
        id_direccion:res.insertId}
      await db.query('insert into empleado set?',[empleado])
     
    })
    res.redirect('/empleados');
    
})
router.get('/eliminar/:Cedula/:Codigo' ,async(req,res)=>{
    const { Cedula,Codigo}=req.params;
    await db.query('DELETE FROM empleado WHERE Cedula = ?',[Cedula]);
    await db.query('DELETE FROM direccion WHERE Codigo = ?',[Codigo]);
   res.redirect('/empleados');
})

router.get('/editar/:Cedula/:Codigo',isLoggedIn,async(req,res)=>{
    const{Cedula,Codigo}= req.params;
    const empleados = await db.query('SELECT * FROM empleado WHERE Cedula = ?',[Cedula])
    const direcciones = await db.query('SELECT * FROM direccion WHERE Codigo = ?',[Codigo])
        res.render('empleados/editar',{empleado:empleados[0],direccion:direcciones[0]});
})
router.post('/editar/:Cedula/:Codigo',async(req,res)=>{
    const {Codigo}= req.params;
    const {Cedula,Nombre,Nombre2,Apellido_1,Apellido_2,Telefono,Fecha_nacimiento,Estado_civil,id_direccion,Municipio,Barrio,Calle,Carrera} = req.body
    const direccion = {
     Municipio,
     Barrio,
     Calle,
     Carrera
 } 
 const empleado = {
    Cedula,
    Nombre,
    Nombre2,
    Apellido_1,
    Apellido_2,
    Telefono,
    Fecha_nacimiento,
    Estado_civil,
    id_direccion:Codigo}
    await db.query('UPDATE empleado set ? WHERE Cedula = ?',[empleado, Cedula]);
    await db.query('UPDATE direccion set ? WHERE Codigo = ?',[direccion, Codigo]);
    res.redirect('/empleados')
})
module.exports = router;


