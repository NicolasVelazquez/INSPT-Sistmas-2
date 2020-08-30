const http = require('http'); //modulo http de node.js para crear un servidor a traves de createserver
const path = require('path');

const express = require('express'); // en esta constante tengo todo lo funcional de express
const socketio = require('socket.io'); // con esto mantengo una conexion constante entre cliente servidor, conexion a tiempo real

const app = express(); // devuelve un objeto con metodos para crear un servidor
const server = http.createServer(app);// creo el servidor, con esto le puedo puedo pasar 'server' a socket io, ya que createserver crea un servidor como ya lo hice con express solo lo añado para que despues se puede usar el server con socketio
const io = socketio.listen(server)  // se dirija por el servidor creado en el puerto 3000,devuelve conexion websocket,con esto envio mensajes desde cliente al servidor

const users = []

app.set('view-engine', 'ejs')
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.post('/login', (req, res) => {
	users.push({
		id: Date.now().toString(),
		name: req.body.name
	})
	res.redirect('/chat/' + req.body.name)
    console.log(users)
})

app.get('/chat/:name', (req, res) => {
	res.render('chat.ejs', { name: req.params.name})
})

require('./sockets')(io, users);

/*envia archivos cuando inicia*/
app.use(express.static(path.join(__dirname,'public'))); // envia la carpeta 'public' a los navegadores cuando se conecten al servidor

/* Inicia el servidor*/
server.listen(app.get('port'), () => {  //ejeucta un servidor que escucha en el puerto 3000 de la pc, escucha nuevos usuarios
    console.log("Servidor iniciado en el puerto",app.get('port'));
});