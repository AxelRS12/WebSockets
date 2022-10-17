const express = require('express');
var cors = require('cors');
const { socketController } = require('../sockets/controller');



class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths= {};
        
        //Middlewares son fx que añaden funcionalidades a mi web server se ejecuta con el server
        this.middleware();
        
        //rutas de app
        this.routes();

        //Sockets
        this.sockets();
    }

    middleware(){

        //directorio publico
        this.app.use(express.static('public'));

        //CORS
        this.app.use(cors());
    }


    routes(){
    
    }
    sockets(){
        this.io.on('connection', socketController);

        
    }

    listen(){
        this.server.listen(this.port, ()=>{
            console.log('servidor corriendo en', this.port);
        });
    }
}
module.exports = Server;