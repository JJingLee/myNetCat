var net = require('net');

// var cmd = {
	// command: process.argv[2],
	// args: []
// };

// for(var i = 3; i <process.argv.length; i++){
	// cmd.args.push(process.argv[i]);
// }

var socket = new net.Socket();
socket.connect(9999, '127.0.0.1', function() {
	// socket.write(JSON.stringify(cmd));
	// console.log('Ruby.')
	//Handle input.
	process.stdin.on('data', function(data){
		if(data.toString() == "exit\n"){
			socket.destroy();
		}else{
			socket.write(data);	
		}
	})
	
	socket.on('data', function(chunk){
		
		var message = chunk.toString();
		//print string
		console.log('Server: ' + message);

		//handle message 
		if(message == "exit\n"){
			//destroy the socket if server write "exit".
			socket.destroy();
		}
		// else{
			// //send back echo message to server.
			// socket.write("you are saying "+message);
		// }
		
	});
	
	socket.on('end', function(){
		socket.write("disconnected");
		//console.log(disconnected);
	});
	
	// socket.on('data', function(data) {
		// console.log('Received: ' + data.toString());
	// });

	// socket.on('end', function() {
		// console.log('Connection closed');
		// process.exit();
	// })
	// socket.on('error', function(err) {
	   // console.log(err)
	// });
});
