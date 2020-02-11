// FONCTION ******(DEC -> HEX BIG ENDIAN)******
var ConvertDecToHexB = function(nb) {
	return "0x" + nb.toString(16)
	/*var result = ""
	var tabRef = "0123456789abcdef"
	while (nb > 0) {
		result = tabRef[nb % 16] + result
		nb = parseInt(nb / 16, 10)
	}
	return "0x" + result*/
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

// FONCTION ******(DEC -> HEX LITTLE ENDIAN VAR INT)******
var ConvertDecToHexVarInt = function(nb) {
	if (nb < Math.pow(2, 8) - 1 - 2) {
		// 253 = (255-2) = ((2^8 - 1)-2)
		// < 253 pour eviter les confusions avec les valeurs
		// 253, 254, 255 qui eux donneront sur 1 octet 0xfd, 0xfe et 0xff
		// (qui sont resrvés au codage de la taille)
		return ConvertDecToHexL(nb)
	} else if (nb >= Math.pow(2, 8) - 1 - 2 && nb < Math.pow(2, 16)) {
		return "0xfd" + ConvertDecToHexL(nb).slice(2, ConvertDecToHexL(nb).length)
	} else if (nb >= Math.pow(2, 16) && nb < Math.pow(2, 32)) {
		return "0xfe" + ConvertDecToHexL(nb).slice(2, ConvertDecToHexL(nb).length)
	} else if (nb >= Math.pow(2, 32) && nb < Math.pow(2, 64)) {
		// ou 58???...
		return "Oxff" + ConvertDecToHexL(nb).slice(2, ConvertDecToHexL(nb).length)
	} else {
		return "INVALID INTEGER VALUE"
	}
}

// FONCTION DIFFICULTE EMPAQUETEE en "Bits" -> Cible (0x000000XX...) 256bits
const Bits2Target = function(bits) {
	// bits = nombre en Hex little Endian sur 32bits/4o
	// donc l'octet "exposant" sur 1o se retrouve a gauche d'une mantisse de 3octets en little indian
	// pour créer justement le principe de proportionalité inversée entre cible et diificulté
	var nb = bits.toString(16)
	let oct1 = nb.slice(0, 2) // octet le - significatif (le plus à gauche) qui sera en exposant
	let oct3 = nb.substr(2, nb.length - 2) // 3 autres octets les + significatifs (mantisse)
	var result = (parseInt(oct3, 16) * 2 ** (8 * (parseInt(oct1, 16) - 3))).toString(16)
	while (result.length < 64) {
		result = "0" + result
	}
	return "0x" + result
}

// FONCTION Cible (0x000000XX...) 256bits -> DIFFICULTE
const Target2Diff = function(target) {
	var bdiff1 = 0x1d00ffff
	// la plus basse unité de difficulté = difficulté du bloc genesis miné par satoshi
	// correspondant donc à la cible la plus grande en minage individuel (0x00000000ffff0000000000000000000000000000000000000000000000000000)
	// (en dessous de laquelle tous les hash de bloc seraient valides lors d'un minage, donc trop facile)
	var target1 = Bits2Target(bdiff1)
	var result = target1 / target
	return result
}

const calculerDifficulte = cible => {
	var bits = ConvertDecToHexVarInt(cible)
	return Target2Diff(Bits2Target(bits))
}

test = 1147152896345386682952518188670047452875537662186691235300769792000
console.log((test / 16 ** 50) % 16)

//console.log(calculerDifficulte(test))
//console.log(test.toString(16))
console.log(ConvertDecToHexB(test))
console.log(ConvertDecToHexL(test))
console.log(ConvertDecToHexVarInt(test))
console.log(Bits2Target(0x93e4a))
console.log(Target2Diff(Bits2Target(ConvertDecToHexL(test))))
