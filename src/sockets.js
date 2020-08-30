/**Socket Servidor */
module.exports = function (io, users){
    io.on('connection',socket => { // escucha cuando hay una nueva conexion de socket
        console.log('Nuevo usuario conectado');
        
        socket.on('enviando mensaje',function (data) {   // cuando el cliente envie mensajes, tiene que recibir los datos
            io.sockets.emit('nuevo mensaje',data); // envia a todos los sockets el dato 'mensaje'
        });

		socket.on('disconnect', function() {
			console.log('Usuario desconectado');
		});
    });
}