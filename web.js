var fs = require('fs'),
		webshot = require('webshot'),
		gm = require('gm'),
		connect = require('connect'),
    socketio = require('socket.io');

var port = process.env.PORT || 3000;
var server = connect(
  connect.static(__dirname + '/app')
).listen(port);

var webshotOptions = {
  screenSize: {
    width: 320,
		height: 480
  },
  shotSize: {
    width: 320,
		height: '320'
  },
  userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
};

var io = socketio.listen(server);
io.sockets.on('connection', function(client){
	console.log('Client connected...');

	client.emit('message', {hello: 'World'});

	client.on('capture', function (url) {
		console.log("On web.js", url);

		var imgPath = './img/' + url + '.png';

		webshot(url, imgPath, webshotOptions, function(err) {
			if ( err ) throw err;
			console.log('Taking webshot..');

			var imgOut = './img/' + url + '-resized.png';

			gm(fs.createReadStream(imgPath), url + '.png').resize(155, 155).write(imgOut, function (err) {
				if (err) throw err;
				console.log('Resized from buffer.');

				client.emit('resized', imgOut);
			});
		});
	});
});
