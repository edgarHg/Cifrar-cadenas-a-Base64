angular.module('fService', [])

	.factory('CryptoJSAES', [function(){
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
			cifrar : function(cadena, keyUser){
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
			},
			descifrar : function(cadena, keyUser){
				var data = cadena;
				var userSesion  = keyUser;
				var keyValue    = null;
				var key2         = null;

				keyValue = this.keyBase64(userSesion.toString());
				key2 = CryptoJS.enc.Base64.parse(keyValue);

				console.log(data);
				var rawData = atob(data);
				console.log(rawData);

				var iv = btoa(rawData.substring(0, 16));

				var crypttext =  CryptoJS.enc.Base64.parse(data);

				var plaintextArray = CryptoJS.AES.decrypt(
						{
							ciphertext: CryptoJS.enc.Base64.parse(data),
							salt: ""
						},
				CryptoJS.enc.Hex.parse(key2.toString()),
						{iv: CryptoJS.enc.Base64.parse(iv)}
				);

				function hex2a(hex) {
					var str = '';
					for (var i = 0; i < hex.length; i += 2)
						str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
					return str;
				}

				return hex2a(plaintextArray.toString());
			}
		}
	}])
