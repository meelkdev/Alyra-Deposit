/****************** Bitcoin et fondamentaux ****************
 Exercice 1.4.1 : Convertir un nombre décimal en hexadécimal
 ***********************************************************/

// FONCTION ******(DEC -> HEX BIG ENDIAN)******
const ConvertDecToHexB = function(nb) {
	/*var result = ""
	var tabRef = "0123456789abcdef"
	while (nb > 0) {
		result = tabRef[nb % 16] + result
		n*/
	return "0x" + nb.toString(16)
}

// FONCTION BASCULE BIG ENDIAN <-> LITTLE ENDIAN
const Switch = function(valeurHex) {
	var result = ""
	valeurHex = valeurHex.slice(2, valeurHex.length) // pour supprimer le 0x sur la valeur d'entrée
	while (valeurHex.length > 0) {
		let decoupe = valeurHex.length - 2
		result += valeurHex.substr(decoupe, 2)
		valeurHex = valeurHex.slice(0, decoupe)
	}
	return "0x" + result
}

// FONCTION ******(DEC -> HEX LITTLE ENDIAN)******
const ConvertDecToHexL = function(nb) {
	var nbc = ConvertDecToHexB(nb)
	return Switch(nbc)
}

//EXPORTS DES FONCTIONS
module.exports.CDHB = ConvertDecToHexB
module.exports.CDHL = ConvertDecToHexL
module.exports.SW = Switch
