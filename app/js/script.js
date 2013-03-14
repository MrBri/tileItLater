var socket = io.connect("http://localhost:3000");

// Loading spinner
$.fn.spin = function(opts) {
  this.each(function() {
    var $this = $(this),
        data = $this.data();

    if (data.spinner) {
      data.spinner.stop();
      delete data.spinner;
    }
    if (opts !== false) {
      data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
    }
  });
  return this;
};

$('.spin').spin();

var urlCtrl = function($scope) {
	$scope.master = [];

	$scope.setRmd = function(milli){
		$scope.tile.cl = $scope.tile.url.slice(0, 4);
		console.log($('.' + $scope.tile.cl).fadeIn('slow'));
		$scope.tile.remind = Date.now() + milli;

		socket.emit('capture', $scope.tile.url);

		$scope.master.push(angular.copy($scope.tile));
		};

	socket.on('resized', function (pageObj) {
		$('.tile').popover({trigger: 'hover', placement: 'top', title: $scope.tile.url}); //bootstrap

		var tileClass = '.' + pageObj.imgOut.slice(6, 10);
		var imgLocal = '../.' + pageObj.imgOut;

		$(tileClass + '>img').css('display', 'inline').attr('src', imgLocal);
		$('.spin').hide();
		console.log('bg img:', imgLocal); 
	});
};

