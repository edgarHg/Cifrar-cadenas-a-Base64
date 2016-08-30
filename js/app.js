angular.module('App', ['fService'])
	.controller('ctrlCifrar', ['$scope', 'cifrarAES', function($scope, cifrarAES){
		
		$scope.cadena = "Hola Mundo";
		$scope.cadenaCifrada = cifrarAES.convertir($scope.cadena, 30082016);

	}])