from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

var socket = io.connect('http://' + document.domain + ':' + location.port);

@app.route('/')
def sessions():
    return render_template('session.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


@socketio.on('connect', function(){
	socket.emit( 'my event', {
		data: 'User connected'
		})
	var form = $( 'form' ).on( 'submit', function( e ){
		e.preventDefault()
		let username = $( 'input.username' ).val()
		let message = $( 'input.message' ).val()
		let chatroom = { chatroom }
		if (message != ''){
			socket.emit( 'my event', {
				username : username,
				message : message,
				chatroom : chatroom
				}
				)
		}
		$('input.message' ).val( '' ).focus()
		})
	})


@socketio.on('my response', function ( msg )){
	console.log(msg)
	if ( typeof msg.username !== 'undefined' ) {
		$( 'h3' ).remove()
		$( 'div.message_holder' ).append( '<div>' + username + message + '</div>')
	}
}
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)


@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)

if __name__ == '__main__':
    socketio.run(app, debug=True)