angular.module('fService', [])

	.factory('cifrarAES', [function(){
		return {
			repetirCadena : function (cadena, longitud) {
				var out = cadena.toString();
				while (out.length < longitud)
					out += cadena;
				return out.substring(0, longitud);
			},
			keyBase64: function(cadena){
				var wordArray = CryptoJS.enc.Utf8.parse(this.repetirCadena(cadena, 16));
				return CryptoJS.enc.Base64.stringify(wordArray);
			},
			convertir : function(cadena, keyUser){
				var keyUsuario = keyUser;
				var keyValue = null;
				var key = null;
				var iv = null;

				keyValue = this.keyBase64(keyUsuario.toString());
				key = CryptoJS.enc.Base64.parse(keyValue);
				iv = CryptoJS.enc.Base64.parse(keyValue);

				cadena = cadena.replace(/Ñ/g, "ñ");
				cadena = cadena.replace(/Ñ/g, "<N>");
				cadena = cadena.replace(/Á/g, "á");
				cadena = cadena.replace(/É/g, "é");
				cadena = cadena.replace(/Í/g, "í");
				cadena = cadena.replace(/Ó/g, "ó");
				cadena = cadena.replace(/Ú/g, "ú");

				var textencryipted = CryptoJS.AES.encrypt(cadena.toString(), key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv, });
				var encrypt2Value = CryptoJS.AES.encrypt(cadena.toString() + '<>' + textencryipted.toString(), key, {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv, });

				return encrypt2Value.toString();
			}
		}
	}])