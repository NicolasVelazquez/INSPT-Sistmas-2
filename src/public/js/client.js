/**Socket Cliente */
$(function (){
    const socket=io(); //almacena codigo de la conexion del socket a una variable,socket que mantiene la conexion en tiempor real con el servidor

    /* Obteniendo elementos desde la interfaz*/
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');
    const $name = $('#name').get(0).innerHTML;

    /*Eventos*/
    $messageForm.submit( e => { // captura cuando envia el mensaje
        e.preventDefault();// no actualiza la pagina
        socket.emit('enviando mensaje', $name +': '+ $messageBox.val()); // captura el mensaje lo envia al servidor
        $messageBox.val('');
    });

    socket.on('nuevo mensaje',function(data) {  // escucha el mensaje que viene del servidor
        $chat.append(data + '<br/>') // lo recibido lo concatena al la seccion del chat del html
    });
})