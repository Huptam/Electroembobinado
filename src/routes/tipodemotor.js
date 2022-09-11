'use strict';
var express = require('express'),
    router = express.Router(),
    db = require('../database');
    const{isLoggedIn, isNotLoggedin}= require('../lib/auth');
    router.get('/', isLoggedIn, async(req,res)=>{
        const tipos = await db.query('SELECT * FROM tipodemotor');
        res.render('tiposdemotor/listar',{tipos});
    })
    router.get('/agregar',isLoggedIn,(req,res)=>{
        res.render('tiposdemotor/agregar');
   
    })

    router.post('/agregar',async(req,res)=>{
       const {Nombre,Descripcion} = req.body;
       const tipo = {
           Nombre,
           Descripcion,
           activo:1
       } 
       await db.query('INSERT INTO tipodemotor set ?',tipo);
        res.redirect('/tipodemotor');
    })

    router.get('/eliminar/:id_tipo',async(req,res)=>{
        const { id_tipo } = req.params;
        await db.query('DELETE FROM tipodemotor WHERE id_tipo = ?',[id_tipo]);
        res.redirect('/tipodemotor');
    })



module.exports = router;





