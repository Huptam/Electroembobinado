'use strict'
const passport = require('passport');
const db = require('../database');
const LocalStrategy = require('passport-local').Strategy;
var helpers = require('./helpers');
passport.use('local',new LocalStrategy({
    usernameField:'usuario',
    passwordField:'password',
    passReqToCallback:true
},async(req,usuario,password,done)=>{
 const rows =  await db.query('SELECT * FROM usuarios WHERE usuario = ?',[usuario])
    if(rows.length>0){
        const user = rows[0];
        console.log(user);
      const validpassword = await  helpers.matchPassword(password,user.password);
      console.log(validpassword);       
      if(validpassword){
            done(null,user,req.flash('success','Bienvenido'));
        }else if(password == ''){
            done(null, false, req.flash('message','ingrese una contraseña'));
        }
        else{
            done(null, false, req.flash('message','Contraseña incorrecta'));
        }
    }else{
        return done(null,false,req.flash('message','el usuario no existe'));
    }
}));

passport.use('registrar',new LocalStrategy({
    usernameField: 'usuario',
    passwordField:'password',
    passReqToCallback: true
}, async(req,usuario,password,done)=>{
    const {rol} = req.body;
    const newUser = {
      password,
      fecha_registro:new Date(),
      usuario,
  }
  newUser.password = await helpers.encryptPassword(password)
  console.log(rol);
  
 const result = await db.query('INSERT INTO usuarios SET?',newUser) 

 newUser.id = result.insertId;
 const roles = {
     id_rol:rol,
     id_usuario:newUser.id
 }
 await db.query('INSERT INTO roles_usuario SET?',roles)
 return done(null,newUser);
 
}))

 passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async(id, done)=>{
    const rows = await db.query('SELECT * FROM usuarios WHERE id = ?',[id]);
    done(null,rows[0]);
    })