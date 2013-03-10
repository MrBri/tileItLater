var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new(static.Server)('./app');
var port = process.env.PORT || 5000;
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
	file.serve(request, response, function(err, result){
		if(err && (err.status === 404)){
		        file.serveFile('/index.html', 200, {}, request, response);
		}
	});
    });
}).listen(port);