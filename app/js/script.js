var socket = io.connect("http://localhost:3000");

$(window).load(function(){
  $('#myModal').modal('show');
});

// spinner.js to be used as jQuery
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

$('.spin').spin({color: 'white'});

var urlCtrl = function($scope) {
	$scope.master = [];

	$scope.setRmd = function(milli){
		$scope.tile.cl = $scope.tile.url.slice(0, 4);

		$scope.tile.remind = Date.now() + milli;

		socket.emit('capture', $scope.tile.url);

		$scope.master.push(angular.copy($scope.tile));
		setTimeout($scope.emphasize, milli, $scope.tile.cl);
	};

	$scope.emphasize = function(elm){
		$('.' + elm).effect({effect: 'bounce', duration: 1000, complete: function(){
			$this = $(this);
			setTimeout(function(){
				$this.addClass('scale');
			}, 2000);
		}});
		$scope.predicate = 'remind';
	};

	$scope.reset = function(elm) {
		$('.' + elm).removeClass('scale');
	};

	socket.on('resized', function (pageObj) {
		$('.tile').popover({trigger: 'hover', placement: 'top', title: pageObj.url}); //bootstrap

		var tileClass = '.' + pageObj.imgOut.slice(6, 10);
		var imgLocal = '../.' + pageObj.imgOut;

		$(tileClass + '>img').css('display', 'inline').attr('src', imgLocal);
		$('.spin').hide();
		console.log('bg img:', imgLocal);
	});
};

