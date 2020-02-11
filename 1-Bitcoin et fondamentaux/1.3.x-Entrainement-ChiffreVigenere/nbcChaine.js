/******************* Bitcoin et fondamentaux ********************
 Exercice 1.3.2 : Trouver la fréquence d'une lettre dans un texte
*****************************************************************/

// COMPTAGE ELEMENTAIRE d'un caractere dans une chaine

const count = function(c, e) {
	let nb = 0
	for (const car of e) {
		if (car === c) {
			nb++
		}
	}
	return nb
}

// COMPTAGE GLOBAL de toutes les lettres presentes dans la chaine

const frequences = function(entree) {
	var eClean = entree.replace(/[ ]/g, "")
	//selon l'enoncé de l'exercice:
	//tous sera compté distinctement (chaque caractère est unique)
	//mais juste pour la forme et pour ne pas compter les ' '

	var tabRes = []
	for (const c of eClean) {
		if (!tabRes.includes(count(c, eClean).toString() + c)) {
			tabRes.push(count(c, eClean).toString() + c)
		}
	}
	return tabRes
		.sort()
		.reverse()
		.join(" ")
}

// TESTS:
console.log(count("a", "acaaaaabbbca"))
console.log(frequences("Etre contesté, c’est être constaté"))
