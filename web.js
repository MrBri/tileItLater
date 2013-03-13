var fs = require('fs'),
		webshot = require('webshot'),
		gm = require('gm'),
		express = require('express'),
		app = express(),
		server = require('http').createServer(app),
		io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + '/app'));

app.get('/img/:name', function(req, res){
	res.sendfile(__dirname + '/img/' + req.params.name);
});

var webshotOptions = {
  screenSize: { width: 320, height: 480 },
  shotSize: { width: 320, height: '320' },
  userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
};

io.sockets.on('connection', function(client){
	console.log('Client connected...');

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
