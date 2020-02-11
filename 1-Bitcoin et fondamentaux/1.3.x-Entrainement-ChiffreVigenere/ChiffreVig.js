/*********** Bitcoin et fondamentaux **********************
Entrainement : Chiffre et déchiffrer un message de Vigenere
***********************************************************/

/****************** ENTRAINEMENT A ******************
 *************** CHIFFREMENT VIGENERE ***************/

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" //au vue de la suite des exos il vaut mieux en MAJ!

const ChiffreVig = function(entree, cle) {
	const charX = "àâäéèêëîïìôöòûüùç"
	const charOK = "aaaeeeeiiiooouuuc"
	var entreeClean = [...entree.toLowerCase()]
		.map(x => (charX.includes(x) ? charOK[charX.indexOf(x)] : x))
		.join("")
		.replace(/[^a-z]/g, "")
		.toUpperCase()

	const Vig = function(l, k) {
		return alphabet[
			(1 + alphabet.indexOf(k.toUpperCase()) + alphabet.indexOf(l.toUpperCase()) + 26) % 26
		]
	}
	var entreeChiffree = ""
	for (let i = 0; i < entreeClean.length; i++) {
		entreeChiffree += Vig(entreeClean[i], cle[i % cle.length].toUpperCase())
	}
	return entreeChiffree
}

//TESTS CHIFFREMENT VIGENERE:
console.log("********** MESSAGES CHIFFRES (ENTRAINEMENT A) **********")
console.log(ChiffreVig("je code donc je suis", "pitbull"))
console.log(ChiffreVig("abc", "bcd"))
console.log(ChiffreVig("_abc", "meelkdev"))
console.log(ChiffreVig("abc", "stop"))
console.log(ChiffreVig("je suis fatigué je vais me coucher", "YOUCANDOTHIS"))
console.log(ChiffreVig("BoN WeeKenD @-ALYRA-", "CODINGISFUN"))

/****************** ENTRAINEMENT B ******************
 ******** DECHIFFRACHE (EN CONNAISSANT LA CLE) ******/

const DechiffreVig = function(entreeChiff, cleD) {
	const DeVig = function(l, k) {
		return alphabet[
			(alphabet.indexOf(l.toUpperCase()) - alphabet.indexOf(k.toUpperCase()) - 1 + 26) % 26
		]
	}

	var entreeClean = ""
	for (let i = 0; i < entreeChiff.length; i++) {
		entreeClean += DeVig(entreeChiff[i], cleD[i % cleD.length])
	}
	return entreeClean
}

// TESTS DECHIFFREMENTS VIGENERE:
console.log("********** MESSAGES DECHIFFRES (ENTRAINEMENT B) **********")
console.log(DechiffreVig("ZNWQYQPEWWLZEGYB", "pitbull"))
console.log(DechiffreVig("CEG", "bcd"))
console.log(DechiffreVig("NGH", "meelkdev"))
console.log(DechiffreVig("TVR", "stop"))
console.log(DechiffreVig("ITNXJGJPNQPNDYZYBWWBYKXNBWZU", "YOUCANDOTHIS"))
console.log(DechiffreVig("EDRFSLTXTYOONVJ", "CODINGISFUN"))

/****************** ENTRAINEMENT C ******************
 ************** REGROUPEMENT DES LETTRES ************/

const regroupement = function(entree, n) {
	var liste = [...entree.replace(/[ ]/g, "").toUpperCase()]

	let result = []

	while (liste.length > 0) {
		result.push(liste.filter((el, k) => k % n === 0).join("")) // petite rectif: (? : ) inutile
		liste.splice(0, 1)
	} // en la revoyant je suis quand même content de moi sur cette ptite trouvaille en while...
	//après je ne sais pas si c'est vraiment la bonne technique pour le suite...à suivre!

	return result
}

//TESTS REGROUPEMENT/DECOUPE:
console.log("********** REGROUPEMENT (ENTRAINEMENT C) **********")
console.log(regroupement("Mes vieilles tantes", 3))

/****************** ENTRAINEMENT D ******************
 ****** DECRYPTAGE (SANS CONNAISSANCE DE LA CLE) *****/

// Occurences des lettres présentes dans le texte (Importée de l'exercice 1.3.1)
const frequences = function(entree) {
	var eClean = entree.replace(/[ ]/g, "")
	// je vois maintenant l'intérêt de garder les ' ',
	// car s'il y en a dans le texte chiffré autant les garder car
	// cela peut erroner les stats à cause des décalages produits
	// et donc on aura pas les bonnes occurences des lettres
	// de plus ça peut être une indication de décryptage s'il y en a (nb d'espace = nb de mots par ex)
	// ERRATUM, JE RETIRE: JE SUPPRIME FINALEMENT LES ' ' car ça foire mon split qui se retrouve avec des NaN
	// bloquants pour le calcul de l'indice de friedman. Pour cela il fallait une approche ASCII pour les prendre en compte

	const count = function(c, e) {
		let nb = 0
		for (const car of e) {
			if (car === c) {
				nb++
			}
		}
		return nb
	}

	var tabRes = []
	for (const c of eClean) {
		if (!tabRes.includes(count(c, eClean).toString() + c)) {
			tabRes.push(count(c, eClean).toString() + c)
		}
	}

	return tabRes
		.sort((a, b) => parseInt(b) - parseInt(a)) //amélioration car source de bugs
		.join(" ") // car dans l'enoncé de cet exercice le résultat apparait comme chaine donc...je suis!
}

// DECRYPTAGE VIGENERE

// L'indice de Friedman va nous donner un indice de correlation statistique:
// grace au nombre d'occurences de chaque lettre du message "regroupé", celles qui se répètent souvent
// vont se demarquer avec un nb d'occurences assez fort lorsque la "longueur de regroupement" sera la bonne
// cette correlation donne un indice de friedman assez grand, et sera donc le moyen d'idification de la longueur de clé
// (i.e le schéma corrèle étroitement avec le schéma de la langue -> c'est la bonne longueur de clé) ()

const ICfriedman = texte => {
	return (
		frequences(texte)
			.split(" ")
			.reduce((a, k) => a + parseInt(k) * (parseInt(k) - 1), 0) /
		(texte.length * (texte.length - 1))
	)
}

//Fonction de décryptage de la clé
const DecryptVig = function(entreeChiff, nMax) {
	// pour trouver la taille de la clé, on lance l'analyse friedman
	let indicesCle = []
	for (let i = 1; i <= nMax; i++) {
		// on essaye toutes les taille de clé
		let indice = ICfriedman(regroupement(entreeChiff, i)[0]) // les autres valeurs serviront plus tard
		indicesCle.push([i, indice])
	}
	indicesCle.sort((a, b) => b[1] - a[1])
	console.log("TABLEAU DES INDICE FRIEDMAN:") // tableau des indices friedman décroissants
	console.log(indicesCle)
	//les clés possibles pour chaque longueur de clé éventuelle
	var cleVraie = ""
	var cleSize = indicesCle[0][0] // on récupère la taille de la clé avec l'indice friedman le plus fort

	// à la recherche de la vraie clé
	for (let i = 0; i < cleSize; i++) {
		var attaq = frequences(regroupement(entreeChiff, cleSize)[i]).split(" ")
		attaq = attaq.sort((a, b) => parseInt(b) - parseInt(a))
		console.log("DECOUPE " + i + ":\n" + attaq)
		let lettreForte = attaq[0][attaq[0].length - 1]
		cleVraie += alphabet[(alphabet.indexOf(lettreForte) + 21) % 26]
		console.log("LETTRE FORTE: " + lettreForte + " / CLE EN CONSTRUCTION: " + cleVraie)
	}

	console.log("CLE DECRYPTEE : " + cleVraie)
	return "MESSAGE DECRYPTE :\n" + DechiffreVig(entreeChiff, cleVraie)
}

//TESTS:
console.log("********** DECRYPTAGE MESSAGE (ENTRAINEMENT D) **********")
var txt =
	"PVADGHFLSHPJNPLUVAGXVVRBRUKCGXEVQINPVBXLVZLRMKFLSXEZQXOGCCHXEICIXUKSCXKEDDKORRXHPHSXGGJRRHPESTJWVBTJWVJFNGJSCLQLBJGUVSATNRJXFKKCBTKJOJXEVJJBQLATNZHSXECUCIBGELTGVGCJOGERPMQLRBHOVLIKGMCAXTCCHXEICIXUKYRVGJQXUNVYIHWJATLVSGTGRFSGJWFGXEARSCITFZAXOVBJLGTPTMEVOJBHRGIITFZAXOVBPGUCCHXEICIVGJRFNKCNTNVVRGXFZTJEILCIKCYGGXXVJTHGUGEXHZLXMRRPSXEYGUYTVPAXPZEBXFLQEAKEVHBXFSHOQLJTSRVPRXTCCHLGTPTMUTCHMNRRPVJVBTECIYXLQECCNPJCCLEVQIECKYRAGUCATRYGAHUFNWBGRSRHPKPPBTVJTFAJRTKGVQIICIBTYKEGIBQEBJGCLRGXQIBGXSLCAXRIMQEGDCXEGJRXGCTATLUZZAXCCYGTKJMCWCEQAXUDWHMGICHWGCYCMKHSXMGJCJEUUCGTTVQXGKKGTLRRPKBGELTGVRJPVQDNGXJVLHBQEBJFAJRTKGVRAXEYPXLVZYCBUDCTLVSCPNEFSEINLQGTFZAPEGEADKGCCBRUKCGXGJRRXSLGTLVRZHHNLKTGVZLPVEVQHBDCCPECIYXLQERWHORQSTSLGCEGGJJLIIYCWVYCDEQXGTGFVRDNVVJPVJICIBGERTFGUGTOCCCTMNRPTYGICCVGVLRHTVYJCQLPSAWZBTMQLRTECKFTHNFEXXEYPTMKVLCXKEQXLVVQJKNVDPBVHSTECIYIBQEYABVVQPKTVRTTWJCJBNUSBRUKCGXNVKNLVVPTXUKQPVTVQXOQLQEKGWCGXBZJTLVKPPGUTCCWCERXEGJRSBXZLPEQIQFNGCCHXEICIXUKNGHHRLTEGJCRKGKCHMKDKPGGERPECTMCWKKGDGJLKPBPVGAXUKFJFCZLTMEVQIIQLPFNQZDXWGCCPLCMMRTVZMCECGPDUNVKPMKJYIBQEJPKGWJTQKFLEAKCMHHRYGFNGZLIXTIMVXNVQTVTVRXGVVPGHIVJWNORLXMGUSHXEICILKTCITKKSCFAJRTKGVJAXPVJXGVVPGHIVPPBVGYHEGDWHMGICCXUKNPLWECRTVVEDKKVNWBNFQDIJZOJX"
console.log("************* DECRYPTAGE **************")
console.log(DecryptVig(txt, 6))
