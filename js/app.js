angular.module('App', ['fService'])
	.controller('ctrlCifrar', ['$scope', 'CryptoJSAES', function($scope, CryptoJSAES){

		$scope.mdlCadena = "";
		$scope.cadenaCifrada = "";
		$scope.cadenaDescifrada = "";
		$scope.keyUsuario = 30082016;
		$scope.CifrarCadena = function(){
			$scope.cadenaCifrada = CryptoJSAES.cifrar($scope.mdlCadena, $scope.keyUsuario);
		};

		$scope.DescifrarBase64 = function(){
			$scope.cadenaDescifrada = CryptoJSAES.descifrar($scope.cadenaCifrada, $scope.keyUsuario);
		};
	}])
