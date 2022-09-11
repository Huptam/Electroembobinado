var mysql = require('mysql'),
    {database} = require('./keys'),
    {promisify} = require('util'),
    pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('la conexion con la base de datos fue cerrada');
            
        }
        if(err.code ==='ER_CON_COUNT_ERROR'){
            console.log('la base de datos tiene muchas conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('la conexion fue rechazada');
            
        }
        console.error(err.stack);
        
    }
    if(connection) connection.release();
    console.log('BASE DE DATOS CONECTADA');
    return
    
})
//promisify pool 
pool.query = promisify(pool.query);
module.exports = pool;