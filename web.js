var fs = require('fs'),
    phantomProxy = require('phantom-proxy'),
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
      screenSize: { width: 620, height: 620 },
      shotSize: { width: 620, height: '620' }
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

    // Attempt at grabbing page description

    // phantomProxy.create({'loadImages': 'no'}, function (proxy) {
    //   var page = proxy.page;
    //   page.open('http://' + url, function(result) {
    //     console.log("phantomProxy: ", result);
    //     page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", function(){
    //       page.evaluate(function(){
    //         var href = $('#fork-me').attr('href');
    //         console.log('test eval', href);
    //       });
    //         proxy.end(function () {
    //           console.log('phantomProxy done.');
    //         });
    //     });
    //       // page.evaluate(function () {
    //       //   var metas = document.getElementsByTagName('meta');
    //       //   console.log('metas', metas);
    //       //   return metas;
    //       // }, function (result) {
    //       //   console.log('evaluate: ', result);
    //       // });
    //     // page.waitForSelector('body', function (result) {
    //     //   console.log('body tag present', result);
    //     //   // for (var i = 0; i < metas.length; i++) {
    //     //   //   var name = metas[i].getAttribute('name');
    //     //   //   if ( name === 'desciption' ) {
    //     //   //     console.log('Name desc: ', meta[i]);
    //     //   //   } else {
    //     //   //     console.log('No desc');
    //     //   //   }
    //     //   // }
    //     // });
    //   });
    // });

  });
});
