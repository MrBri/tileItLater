
var urlCtrl = function($scope) {
	$scope.master = [];
	$scope.setRmd = function(milli){
		$scope.tile.remind = Date.now() + milli;
	};
};