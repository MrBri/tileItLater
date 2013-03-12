// angular.module('urlApp', [])
// 	.directive('isotope', function() {
// 		return function(scope,element,attrs){
// 			element.isotope({itemSelector:'.tile', resizesContainer:false});
// 			scope.$watch(attrs.ngModel, function() {
// 				element.isotope( 'reloadItems' );
// 			});
// 		};
// 	});

var urlCtrl = function($scope) {
	$scope.master = [];

	// $scope.capture = function(tile) {
	// 	socket.emit('capture', tile.url);
	// 	console.log('Url in capture: ', tile.url);
	// };

	$scope.setRmd = function(milli){
		$scope.tile.remind = Date.now() + milli;
		socket.emit('capture', $scope.tile.url);
		$scope.master.push(angular.copy($scope.tile));

		// $('.tiles').isotope( 'insert', $scope.master.slice(-1) );
	};

};

// $('.tiles').isotope({
// 	itemSelector: '.tile'
// });