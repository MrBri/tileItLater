
var urlCtrl = function($scope) {
	$scope.master = [];
	$scope.setRmd = function(milli){
		$scope.tile.remind = Date.now() + milli;
		$scope.master.push(angular.copy($scope.tile));
		$('.tiles').isotope( 'insert', $scope.master.slice(-1) );
	};
};

// $('.tiles').isotope({
// 	itemSelector: '.tile'
// });