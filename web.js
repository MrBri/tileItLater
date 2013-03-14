var fs = require('fs'),
		// $ = require('jquery'),
		phantom = require('node-phantom'),
		// webshot = require('webshot'),
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

io.sockets.on('connection', function(client){
	console.log('Client connected...');

	client.on('capture', function (url) {
		console.log("On web.js", url);

		var pageObj = {};
		var imgPath = './img/' + url + '.png';

		phantom.create(function(err, ph){
			 ph.createPage(function(err, page) {
					page.set('viewportSize', {width:60, height:60}, function(err){

						page.open('http://' + url, function(err, status) {
							console.log("opened site?", status);

								page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", function(err) {
									console.log('jQuery included..');
									if ( err ) throw err;
									page.render(imgPath, function(err) {
										if ( err ) throw err;
										console.log('Taking webshot..');

										var imgOut = './img/' + url + '-resized.png';
										pageObj.imgOut = imgOut;

										gm(fs.createReadStream(imgPath), url + '.png').scale(155, 155).write(imgOut, function (err) {
											if (err) throw err;
											console.log('Resized from buffer.', pageObj);

											client.emit('resized', pageObj);
										});
									});

									// Eval not working
									
									// setTimeout(function(){
									// 	console.log('setTimeout started');
									// 	return page.evaluate(function(){
									// 		console.log('Start of eval');
									// 		pageObj.desc = $('meta[name="description"]').attr('content');
									// 		console.log('Grab description: ', pageObj);
									// 	});
									// }, 600);
								});
							ph.exit();
							});
						});
					});
			});
		});
		// webshot(url, imgPath, webshotOptions, function(err) {
		// });
});
