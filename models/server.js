const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express(); // Inicializa el servidor
        this.puerto = process.env.PORT;
        this.usuariosPath ='/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.route(); 
    }


    async conectarDB() {
        await dbConnection();
    }

    middlewares(){

        // CORS para definir las URLS desde las que permitimos acceder
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static( 'public' ) );
    }

    // Aqui definimos todas las rutas
    route(){
        // Creamos la ruta apuntando a user donde estan configuradas
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        
        this.app.listen( this.puerto, () =>{
            console.log( 'Servidor corriendo en el puerto:', this.puerto );
        })
    }
}

module.exports = Server;