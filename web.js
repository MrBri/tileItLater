// var static = require('node-static');
var webshot = require('webshot'),
		connect = require('connect'),
    socketio = require('socket.io');

var port = process.env.PORT || 3000;
var server = connect(
  connect.static(__dirname + '/app')
).listen(port);

var io = socketio.listen(server);
io.sockets.on('connection', function(client){
	console.log('Client connected...');

	client.emit('message', {hello: 'World'});
});

var options = {
  screenSize: {
    width: 320,
		height: 480
  },
  shotSize: {
    width: 320,
		height: 'all'
  },
  userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
    + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
};

webshot('google.com', 'google.png', options, function(err){
	if ( err ) {
		throw err;
	}
	console.log('Taking webshot..');
});


//
// Create a node-static server instance to serve the './public' folder
//
// var file = new(static.Server)('./app');
// var port = process.env.PORT || 3000;
// require('http').createServer(function (request, response) {
//     request.addListener('end', function () {
//         //
//         // Serve files!
//         //
// 	file.serve(request, response, function(err, result){
// 		if(err && (err.status === 404)){
// 		        file.serveFile('/index.html', 200, {}, request, response);
// 		}
// 	});
//     });
// }).listen(port);