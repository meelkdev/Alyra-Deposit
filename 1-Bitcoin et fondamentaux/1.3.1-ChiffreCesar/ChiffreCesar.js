/***********Bitcoin et fondamentaux**************
Exercice 1.3.1 : Réaliser un chiffrement de César
*************************************************/

const alphabet = "abcdefghijklmnopqrstuvwxyz"

var ChiffreCesar = function(entree, dec) {
	/*var entreeClean = entree
		.toLower()
		.replace(/[àâä]/g, "a")
		.replace(/[éèêë]/g, "e")
		.replace(/[îïì]/g, "i")
		.replace(/ôöò/g, "o")
		.replace(/[ûüù]/g, "u")
		.replace(/[ç]/g, "c")
		.replace(/[^a-z]/g, "")*/

	//Sinon...
	const charX = "àâäéèêëîïìôöòûüùç"
	const charOK = "aaaeeeeiiiooouuuc"
	var entreeClean = [...entree.toLowerCase()]
		.map(x => (charX.includes(x) ? charOK[charX.indexOf(x)] : x))
		.join("")
		.replace(/[^a-z]/g, "")

	const Cesar = function(l, dec) {
		return alphabet[(+dec + alphabet.indexOf(l) + 26) % 26]
	}
	var entreeChiffree = ""
	for (let i = 0; i < entreeClean.length; i++) {
		entreeChiffree += Cesar(entreeClean[i], dec)
	}
	return entreeChiffree
}

console.log(ChiffreCesar("@abc", 1))
console.log(ChiffreCesar("abc", -3))
console.log(ChiffreCesar("_abc", 26))
console.log(ChiffreCesar("abc", -26))
console.log(ChiffreCesar("Je suis fatigué, je vais me coucher", 3))
console.log(ChiffreCesar("BoN WeeKenD @-ALYRA-", 3))
