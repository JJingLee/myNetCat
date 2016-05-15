/*
var http = require('http');
var server = http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type' : 'text/plain'});
	response.end('Hello World\n');
});
//listen port
server.listen(9999);
console.log('server running.'); 
*/


var net = require('net');

//create server
var server = net.createServer();

//listen port
server.listen(9999);

//when new connection is established.
server.on('connection', function(socket){
	console.log('new connection is on.');
	socket.write("Hello\n");
	
	//when typing event(stdin) is notified
	process.stdin.on('data', function(data){
		// if(data.toString() == "exit\n"){
		// 	//socket.destroy();
		// 	console.log("are you sure?");
		// }
		socket.write(data);

	})
	//when client has sended 'data'
	socket.on('data', function(chunk){
		
		//chunk.replace(/\r\n|\n|\r/g,"");
		var message = chunk.toString().trim();
		//print string
		console.log(message);

		//handle message 
		if(message == "exit"){
			//destroy the socket if client write "exit".
			//console.log('in exit');
			socket.destroy();
		}else{
			//send back echo message to client.
			socket.write("you are saying "+message);

		}
		
	});

	//when socket destroy
	socket.on('end', function(){
		socket.write("disconnected");
		//console.log(disconnected);
	});
	
	socket.on('error', function(err) {
	   console.log("[ERROR]: "+err)
	});
});

//var socket = new net.Socket();