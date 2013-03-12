var fs = require('fs'),
		webshot = require('webshot'),
		connect = require('connect'),
    socketio = require('socket.io');

var port = process.env.PORT || 3000;
var server = connect(
  connect.static(__dirname + '/app')
).listen(port);

// var webshotOptions = {
//   screenSize: {
//     width: 320,
// 		height: 480
//   },
//   shotSize: {
//     width: 320,
// 		height: '320'
//   },
//   userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
// };

var io = socketio.listen(server);
io.sockets.on('connection', function(client){
	console.log('Client connected...');

	client.emit('message', {hello: 'World'});

	client.on('capture', function (url) {
		console.log("On web.js", url);
		webshot(url, function(err, renderStream) {
			if (err) throw err;

			var file = fs.createWriteStream('./img/' + url + '.png', {encoding: 'binary'});

			renderStream.on('data', function(data) {
				file.write(data.toString('binary'), 'binary');
			});
		});
	});
});
