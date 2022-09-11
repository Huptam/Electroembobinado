'use strict'
var express = require('express'),
     morgan = require('morgan'),
     path = require('path'),
     flash= require('connect-flash'),
     exphbs = require('express-handlebars'),
     port = (process.env.PORT || 4000),
     publicDir = express.static(path.join(__dirname,'public')),
     app = express(),
    MySQLStore= require('express-mysql-session'),
    session = require('express-session'),
    
     {database} = require('./keys'),
    passport = require('passport')
    require('./lib/passport')
//configuraciones
app.set('port',port)
   .set('views',path.join(__dirname,'views'))
   .set('view engine','.hbs')
    app.engine('.hbs',exphbs({
    defaultLayouts:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
   }))
//middlewares
app.use(session({
   secret:'fastmysqlSession',
   resave:false,
   saveUninitialized:false,
   store: new MySQLStore(database)

}))
 app.use(flash())
app.use(passport.initialize())
   .use(passport.session())

app.use(morgan('dev'))
   .use(express.urlencoded({extended:false}))
   .use(express.json())
//variables globales
app.use((req,res,next)=>{
     app.locals.success = req.flash('success');
     app.locals.message = req.flash('message');
    next();
   })
//rutas
   .use(require('./routes'))
   .use(require('./routes/autenticacion'))
   .use('/usuarios',require('./routes/usuarios'))
   .use('/empleados',require('./routes/empleados'))
   .use('/tipodemotor',require('./routes/tipodemotor'))
   .use('/motores',require('./routes/motor'))
   .use('/reparaciones',require('./routes/reparacion'))
   .use('/clientes',require('./routes/cliente'))
   .use('/bienvenido',require('./routes/home'))
   .use('/inventario',require('./routes/inventario'))

//public
   .use(publicDir)

//iniciando servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor ejecutandose en el puerto',app.get('port'));
 
    
})

module.exports = app