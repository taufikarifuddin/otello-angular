angular
.module('OtelloApp',[])
.controller('OtelloTableController',function($scope){
	var INDEX_VALUE_DEFAULT = -1;
	var INDEX_VALUE_BLACK = 0;
	var INDEX_VALUE_WHITE = 1;

	$scope.column = [];
	$scope.state = INDEX_VALUE_BLACK;
	
	$scope.change = function(data){
		$scope.column = new Array(data);
		for( var i =0; i < data; i++){
			$scope.column[i] = new Array(data);
			for( var j =0; j < data; j++){
				
				$scope.column[i][j] = INDEX_VALUE_DEFAULT;
			}				
		}
		console.log($scope.column);
	}
	
	$scope.click = function($childIndex,$parentIndex){
		if( $scope.column[$parentIndex][$childIndex] != INDEX_VALUE_DEFAULT){
			alert('Kotak Sudah di tandai');
		}else{
			$scope.column[$parentIndex][$childIndex] = $scope.state;
			$scope.state = $scope.state ? INDEX_VALUE_BLACK:INDEX_VALUE_WHITE;
		}
	}
});	