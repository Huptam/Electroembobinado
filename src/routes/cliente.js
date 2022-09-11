var express = require('express'),
    router = express.Router(),
    db = require('../database');
    const{isLoggedIn, isNotLoggedin}= require('../lib/auth');
    
router.get('/',isLoggedIn, async(req,res)=>{
    const cliente = await db.query('SELECT * FROM cliente INNER JOIN direccion ON cliente.direccion=direccion.Codigo');
    res.render('cliente/listar',{cliente})
})

router.get('/agregar-cliente',isLoggedIn,(req,res)=>{
    res.render('cliente/agregar')
})
router.post('/agregar-cliente',async(req,res)=>{
    const{identificacion,Nombre,Apellidos,Telefono,direccion,Municipio,Barrio,Calle,Carrera} = req.body;
    const direccionc = {
        Municipio,
        Barrio,
        Calle,
        Carrera
    } 
 db.query('insert into direccion set?',[direccionc],async(err,res)=>{
        if(err) throw err;
        const cliente ={
            identificacion,
            Nombre,
            Apellidos,
            Telefono,
            direccion:res.insertId
        }
         await db.query('insert into cliente set?',[cliente])
    
        }) 
        res.redirect('/clientes');
})
router.get('/eliminar/:identificacion/:direccion' ,async(req,res)=>{
    const { identificacion,direccion}=req.params;
    await db.query('DELETE FROM cliente WHERE identificacion = ?',[identificacion]);
    await db.query('DELETE FROM direccion WHERE Codigo = ?',[direccion]);
   res.redirect('/clientes');
})

router.get('/editar/:identificacion/:direccion',isLoggedIn,async(req,res)=>{
    const { identificacion,direccion}=req.params;
    const clientes = await db.query('SELECT * FROM cliente WHERE identificacion = ?',[identificacion])
    const direcciones = await db.query('SELECT * FROM direccion WHERE Codigo = ?',[direccion])
        res.render('cliente/editar',{cliente:clientes[0],direccion:direcciones[0]});
})

router.post('/editar/:identificacion/:Codigo',async(req,res)=>{
    const {Codigo}= req.params;
    const{identificacion,Nombre,Apellidos,Telefono,direccion,Municipio,Barrio,Calle,Carrera} = req.body;
    const cliente ={
        identificacion,
        Nombre,
        Apellidos,
        Telefono,
        direccion:Codigo
    }
    const direccionc = {
        Municipio,
        Barrio,
        Calle,
        Carrera
    } 

    await db.query('UPDATE cliente set ? WHERE identificacion = ?',[cliente, identificacion]);
    await db.query('UPDATE direccion set ? WHERE Codigo = ?',[direccionc, direccion]);
    res.redirect('/clientes')

})
module.exports = router;
