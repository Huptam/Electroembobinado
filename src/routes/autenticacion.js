'use strict'
var express = require('express')
const {check,validationResult} = require('express-validator')
var router = express.Router(),
db = require('../database');
 var passport = require('passport');
 const{isLoggedIn, isNotLoggedin}= require('../lib/auth');
 
router.get('/usuarios',async(req,res)=>{
    const usuarios = await db.query('SELECT * FROM usuarios');
    req.flash('success','bienvenido')
    res.render('auth/listar',{usuarios})
})

router.get('/agregar', async(req,res)=>{
   const empleados = await db.query('SELECT * FROM empleado');
   const roles = await db.query('SELECT * FROM roles')

    res.render('auth/registrar',{empleados,roles})
})

router.post('/registrar',passport.authenticate('registrar',{
        successRedirect:'/usuarios',
        failureRediect:'/agregar',
        failureFlash:true
    }))
    router.get('/',isNotLoggedin,(req,res)=>{
        res.render('auth/login',{layout:'login'})
    })
router.post('/login',[check('usuario','Ingrese un usuario').notEmpty(),check('password','Ingrese una contraseña').notEmpty()],(req,res,next)=>{
    const errors = validationResult(req);
    console.log(errors);
    
    if(errors){    
            req.flash('message','por favor digite todos los campos')
    }
    passport.authenticate('local',{
        successRedirect:'/motores',
        failureRedirect:'/',
        failureFlash:true
    })(req,res,next);
   
});
router.get('/cerrar-sesion',(req,res)=>{
    req.logOut();
    res.redirect('/')
})

module.exports = router;