angular.module('App', ['fService'])
	.controller('ctrlCifrar', ['$scope', 'cifrarAES', function($scope, cifrarAES){
		
		$scope.mdlCadena = "";
		$scope.cadenaCifrada;
		$scope.keyUsuario = 30082016;
		$scope.CifrarCadena = function(){
			$scope.cadenaCifrada = cifrarAES.convertir($scope.mdlCadena, $scope.keyUsuario);
		};
	}])