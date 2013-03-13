var socket = io.connect("http://localhost:3000");

var urlCtrl = function($scope) {
	$scope.master = [];

	$scope.setRmd = function(milli){
		$scope.tile.remind = Date.now() + milli;
		$scope.tile.cl = $scope.tile.url.slice(0, 4);

		socket.emit('capture', $scope.tile.url);

		$scope.master.push(angular.copy($scope.tile));
		};

	socket.on('resized', function (url) {
		$('.tile').popover({trigger: 'hover', placement: 'top', title: $scope.tile.url}); //bootstrap

		var tileClass = '.' + url.slice(6, 10);
		var imgLocal = 'url(../.' + url + ')';

		$(tileClass).css('background-image', imgLocal);
		console.log('bg img:', imgLocal); 
	});
};

