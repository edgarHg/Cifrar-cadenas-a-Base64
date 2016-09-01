angular.module('App', ['fService'])
	.controller('ctrlCifrar', ['$scope', 'CryptoJSAES', function($scope, CryptoJSAES){
		$scope.objIteracion = {
			mdlCadena: "",
			cadenaCifrada: "",
			cadenaDescifrada: "",
			keyUsuario: 30082016
		};

		$scope.CifrarCadena = function(){
			$scope.objIteracion.cadenaCifrada = CryptoJSAES.cifrar($scope.objIteracion.mdlCadena, $scope.objIteracion.keyUsuario);

		};

		$scope.DescifrarBase64 = function(){
			$scope.objIteracion.cadenaDescifrada = CryptoJSAES.descifrar($scope.objIteracion.cadenaCifrada, $scope.objIteracion.keyUsuario);
		};
	}])
