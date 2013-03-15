var fs = require('fs'),
		// $ = require('jquery'),
		// phantom = require('node-phantom'),
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

io.sockets.on('connection', function(client){
	console.log('Client connected...');

	client.on('capture', function (url) {
		console.log("On capture ", url);

		var webshotOptions = {
		  screenSize: {
		    width: 620,
		    height: 620
		  },
		  shotSize: {
		    width: 620,
		    height: '620'
		  }
		  // userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
		};

		var pageObj = {};
		var imgPath = './img/' + url + '.png';

		webshot(url, imgPath, webshotOptions, function(err) {
      if ( err ) throw err;
      console.log('Taking webshot..');

      pageObj.url = url;
      pageObj.imgOut = './img/' + url + '-resized.png';

      gm(fs.createReadStream(imgPath), url + '.png').resize(155, 155).write(pageObj.imgOut, function (err) {
        if (err) throw err;
        console.log('Resized from buffer.', pageObj);

        client.emit('resized', pageObj);
       });
    });

		// phantom.create(function(err, ph){
		// 	 ph.createPage(function(err, page) {
		// 			page.get('viewportSize', function(err, value) {
		// 				console.log('viewportSize: ', value);
		// 				page.set('viewportSize', {width:310,height:310}, function(err) {
		// 					console.log(value);

		// 					page.open('http://' + url, function(err, status) {
		// 						console.log("opened site?", status);

		// 							page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", function(err) {
		// 								console.log('jQuery included..');
		// 								if ( err ) throw err;
		// 								page.render(imgPath, function(err) {
		// 									if ( err ) throw err;
		// 									console.log('Taking webshot..');

		// 									var imgOut = './img/' + url + '-resized.png';
		// 									pageObj.imgOut = imgOut;

		// 									gm(fs.createReadStream(imgPath), url + '.png').scale(155, 155).write(imgOut, function (err) {
		// 										if (err) throw err;
		// 										console.log('Resized from buffer.', pageObj);

		// 										client.emit('resized', pageObj);
		// 									});
		// 								});
		// 								// Eval not working
		// 								// setTimeout(function(){
		// 								// 	console.log('setTimeout started');
		// 								// 	return page.evaluate(function(){
		// 								// 		console.log('Start of eval');
		// 								// 		pageObj.desc = $('meta[name="description"]').attr('content');
		// 								// 		console.log('Grab description: ', pageObj);
		// 								// 	});
		// 								// }, 600);
		// 						});
		// 						ph.exit();
		// 					});
		// 				});
		// 			});
		// 		});
		// 	});
	});
});
