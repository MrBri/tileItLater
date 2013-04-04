**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*


Tile It Later
=============
- [Local install to see app run](#local-install-to-see-app-run)
- [Walkthrough](#walkthrough)
- [Technology used](#technology-used)

A full stack bookmarking web application.  

Local install to see app run
-----------------------------
Requirements are [git](http://git-scm.com/), [NodeJS](http:/nodejs.org), [PhantomJS](http://phantomjs.org) and [GraphicsMagick](http://www.graphicsmagick). Suggested Mac install via [Homebrew](http://mxcl.github.com/homebrew/) and [NPM](https://npmjs.org/):  

In the terminal install Homebrew:

    ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

Install packages via Homebrew:

    brew install git node phantomjs graphicsmagick

Clone this repository with git:  

    git clone https://github.com/MrBri/tileItLater.git

Install the dependencies with NodeJS:  

    cd tileItLater 
    npm install

Launch the server:  

    node web.js

In your [browser](http://www.google.com/chrome/) go to:  

    localhost:3000
**[Give it a go!](localhost:3000)**


Walkthrough
-----------
* Paste or type in a url. (currently only works without http://)
* Submit a remind time. (currently set to 5, 10 and 30 seconds for demo purposes)
* App goes out and takes a screen shot. (thanks [PhantomJS](http://phantomjs.org))
* The image is resized asynchronously. (thanks [GraphicsMagick](http://www.graphicsmagick))
* screen capture shows a linked tile.
* Bounces, changes order and resizes based on remind period.

Technology used
---------------
**Back end with Node.js**
* [Express](http://expressjs.com) to serve the files.
* [Socket.IO](http://socket.io/) to communicate between server and client.
* [File System](http://nodejs.org/api/fs.html#fs_file_system) to grab files.
* [node-webshot](https://github.com/brenden/node-webshot) to capture a screenshot of a given site.
* [GraphicsMagick for node.js](http://aheckmann.github.com/gm/) to resize image.

**Front end**
* [AngularJS](http://angularjs.org/) for two-way data-binding.
* [Bootstrap](http://twitter.github.com/bootstrap/) styling and javascript behavior.
* [jQuery UI](http://jqueryui.com/) for animation.
* [Font Awesome](http://fortawesome.github.com/Font-Awesome/) for those lovely icons.
* [spin.js](http://fgnass.github.com/spin.js/) gotta have a loading spinner.

----

**TODOs**
* Host! I need a server with witch PhantomJS and GraphicsMagick utilities can be installed. Checking out Amazon's [Elastic Beanstalk](http://aws.amazon.com/elasticbeanstalk/) and ssh into the [EC2](http://aws.amazon.com/ec2/) instance. Some other VPS?
* Smart url parsing.
* Refactor to a more Angular way.
* Grab a description or other details of a site.
* Make data persistent. MongoDB? SQL? Amazon's [DynamoDB](http://aws.amazon.com/dynamodb/)? Redis? Parse?
* [Isotope](http://isotope.metafizzy.co/) for cooler tiles!
* Login system. OAuth?
* Social features.
* Grouping or Tags.
* Marketing, SEO and [crawlable](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started).
* Package as node module for utility purposes.

----

Hire me? tyler@mrbri.com  
[mrbri.com](http://mrbri.com)