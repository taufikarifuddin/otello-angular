angular
.module('OtelloApp',[])
.controller('OtelloTableController',function($scope){
	var INDEX_VALUE_DEFAULT = -1;
	var INDEX_VALUE_BLACK = 0;
	var INDEX_VALUE_WHITE = 1;

	var DIRECTION_RIGHT = 0;
	var DIRECTION_RIGHTBOTTOM = 1;
	var DIRECTION_BOTTOM = 2;
	var DIRECTION_BOTTOMLEFT = 3;
	var DIRECTION_LEFT = 4;
	var DIRECTION_LEFTTOP = 5;
	var DIRECTION_TOP = 6;
	var DIRECTION_TOPRIGHT = 7;

	var v = [];

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
	
	$scope.click = function(childIndex , parentIndex){
		if( $scope.column[parentIndex][childIndex] != INDEX_VALUE_DEFAULT){
			alert('Kotak Sudah di tandai');
		}else{
			$scope.column[parentIndex][childIndex] = $scope.state;
			
			
		}
		console.log("sekarang di state " + $scope.state);
		$scope.update(parentIndex, childIndex);
		$scope.state = $scope.state ? INDEX_VALUE_BLACK:INDEX_VALUE_WHITE;

	}

	var bfs = function(parentIndex , childIndex ,direction){
		if( parentIndex < 0 
			|| childIndex < 0 
			|| parentIndex == $scope.data 
			|| childIndex == $scope.data 
			|| $scope.column[parentIndex][childIndex] == INDEX_VALUE_DEFAULT ){
			
		}
		else if($scope.column[parentIndex][childIndex] == $scope.state){
			v.push([parentIndex , childIndex]);

		}else{
			console.log("arah ke " + direction);
			if(direction==0) bfs(parentIndex,childIndex+1,$scope.state,0);
			else if(direction==1) bfs(parentIndex+1,childIndex+1,$scope.state,1);
			else if(direction==2) bfs(parentIndex+1,childIndex,$scope.state,2);
			else if(direction==3) bfs(parentIndex+1,childIndex-1,$scope.state,3);
			else if(direction==4){
				bfs(parentIndex,childIndex-1,$scope.state,4);
				console.log("jalan kiri");
			}
			else if(direction==5) bfs(parentIndex-1,childIndex-1,$scope.state,5);
			else if(direction==6) bfs(parentIndex-1,childIndex,$scope.state,6);
			else if(direction==7) bfs(parentIndex-1,childIndex+1,$scope.state,7);
		}
	}

	$scope.update = function(parentIndex, childIndex){
		var x = parentIndex;
		var y = childIndex;
		bfs(parentIndex,childIndex+1,0);
		bfs(parentIndex+1,childIndex+1,1);
		bfs(parentIndex+1,childIndex,2);
		bfs(parentIndex+1,childIndex-1,3);
		bfs(parentIndex,childIndex-1,4);
		bfs(parentIndex-1,childIndex-1,5);
		bfs(parentIndex-1,childIndex,6);
		bfs(parentIndex-1,childIndex+1,7);

		for(var i=0;i<v.length;i++){
			console.log(v[i][0] + " " + v[i][1]);
		}		

		for(var i=0;i<v.length;i++){
			if(x<v[i][0] && y<v[i][1]){
	            for(var j=x,k=y;j<=v[i][0],k<=v[i][1];j++,k++){

	                    $scope.column[j][k] = $scope.state;

	            }
	        }
	        else if(x==v[i][0] && y<v[i][1]){
	        	for(var k=y;k<=v[i][1];k++){

	                    $scope.column[x][k] = $scope.state;

	            }	
	        }
	        else if(x>v[i][0] && y<v[i][1]){
    			for(var j=x,k=y;j>=v[i][0],k<=v[i][1];j--,k++){

	                    $scope.column[x][k] = $scope.state;

	            }	
	        }
	        
	        else if(x<v[i][0] && y==v[i][1]){
    			for(var j=x;j<=v[i][0];j++){

	                    $scope.column[x][k] = $scope.state;

	            }	
	        }
	        else if(x>v[i][0] && y==v[i][1]){
    			for(var j=x;j>=v[i][0];j--){

	                    $scope.column[x][k] = $scope.state;

	            }	
	        }

	        else if(x<v[i][0] && y>v[i][1]){
	            for(var j=x,k=y;j<=v[i][0],k>=v[i][1];j++,k--){

	                    $scope.column[j][k] = $scope.state;

	            }
	        }
	        else if(x==v[i][0] && y>v[i][1]){
	        	for(var k=y;k>=v[i][1];k--){

	                    $scope.column[x][k] = $scope.state;

	            }	
	        }
	        else if(x>v[i][0] && y>v[i][1]){
    			for(var j=x,k=y;j>=v[i][0],k>=v[i][1];j--,k--){

	                    $scope.column[x][k] = $scope.state;

	            }	
	        }
		}
		v = [];
	}

});	