const mysql=require('mysql2');

//configurar la conexion a la base de datos
const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ventas_db',
});

//conectar a la base de datos
conection.connect((error)=>{
    if(error){
        console.log('Error al conectarse a la base de datos');
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = conection;