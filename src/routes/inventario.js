'use strict'
var express = require('express'),
    router = express.Router(),
    db = require('../database');
    const{isLoggedIn, isNotLoggedin}= require('../lib/auth');
    router.get('/',isLoggedIn,async(req,res)=>{
        const pieza = await db.query('SELECT * FROM piezas')
        res.render('inventario/listar',{pieza});
    })
    
    router.get('/agregar-pieza',isLoggedIn,(req,res)=>{
        res.render('inventario/agregar')
    })
    
    router.post('/agregar-pieza',async(req,res)=>{
        const{Nombre,Cantidad,Categoria,Stock,Valor_unitario,Valor_costo}=req.body;
         var vpc=Cantidad*Valor_costo;
         var vpu =Cantidad*Valor_unitario;
         var utilidad = vpu - vpc;
        const pieza ={
            Nombre,
            Cantidad,
            Categoria,
            Stock,
            Valor_unitario,
            Valor_costo,
            valor_parcial_costo:vpc,
            Valor_parcial_unitario:vpu,
            Utilidad:utilidad
        }
   
        await db.query('INSERT INTO piezas set ?',[pieza])
        res.redirect('/inventario')

    })

    router.get('/editar/:Codigo',isLoggedIn,async(req,res)=>{
        const{ Codigo} = req.params;
        const piezas = await db.query('SELECT * FROM piezas WHERE Codigo = ?',[Codigo])
        res.render('inventario/editar',{piezas:piezas[0]});
        
    });
    router.post('/editar/:Codigo',async(req,res)=>{
     const{ Codigo} = req.params;
      const{ Nombre,Cantidad,Categoria,Stock,Valor_unitario,Valor_costo}=req.body;
        var vpc=Cantidad*Valor_costo;
        var vpu =Cantidad*Valor_unitario;
        var utilidad = vpu - vpc;
       const pieza ={
           Nombre,
           Cantidad,
           Categoria,
           Stock,
           Valor_unitario,
           Valor_costo,
           valor_parcial_costo:vpc,
           Valor_parcial_unitario:vpu,
           Utilidad:utilidad
       }
       console.log(pieza);
       
        await db.query('UPDATE piezas set ? WHERE Codigo = ?',[pieza, Codigo]);
       res.redirect('/inventario');
    })

    router.get('/eliminar/:Codigo',async(req,res)=>{
         const {Codigo} = req.params;
         await db.query('DELETE FROM piezas WHERE Codigo = ?',[Codigo]);
         res.redirect('/inventario');
    })


    module.exports = router;
    