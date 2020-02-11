/********
Bitcoin et fondamentaux
Exercice 1.2.5 : Explorer un arbre binaire de recherche
*********/

// NB: je suis reparti de l'énoncé de l'exercice en remplacant les "undefined" par des "null" pour un meilleur
// éclaircissement niveau debugging suite à beaucoup de confusion

class Noeud {
	constructor(valeur, gauche = null, droite = null, parent = null) {
		this.valeur = valeur
		this.gauche = gauche
		this.droite = droite
		this.parent = parent
	}

	afficher() {
		var out = "Noeud " + this.valeur + ":  L"

		this.gauche === null ? (out += "-") : (out += this.gauche.valeur)
		out += " R"

		this.droite === null ? (out += "-") : (out += this.droite.valeur)
		out += " P"

		this.parent === null ? (out += "-") : (out += this.parent.valeur)
		console.log(out)
	}
}

class Arbre {
	constructor() {
		this.racine = null
	}

	trouverN(valeur) {
		let noeudTemp = this.racine
		if (noeudTemp === null) {
			console.log("L'arbre est vide!!! Auncune recherche possible")
			return null
		}
		while (noeudTemp.valeur !== valeur) {
			if (valeur < noeudTemp.valeur) {
				noeudTemp = noeudTemp.gauche
			} else {
				noeudTemp = noeudTemp.droite
			}
			// Si la valeur n'est pas trouvée dans l'arbre on finit par arriver sur un noeud vide
			// Donc:
			if (noeudTemp === null) {
				console.log("Valeur non présente dans l'arbre")
				return null
			}
		}
		console.log("le noeud a été trouvé ici :")
		noeudTemp.afficher()
		return noeudTemp
	}

	ajouterN(valeur) {
		if (this.racine === null) {
			this.racine = new Noeud(valeur)
			console.log("La racine a bien été ajoutée:") + this.racine.afficher()
			return
		} else {
			const noeud = this.racine
			const search = function(noeud) {
				// fonction recursive pour parcourir l'arbre à la recherche d'un noeud vide
				if (valeur < noeud.valeur) {
					if (noeud.gauche === null) {
						noeud.gauche = new Noeud(valeur, null, null, noeud)
						console.log("Le noeud a bien été ajouté:") + noeud.gauche.afficher()
						return
					} else if (noeud.gauche !== null) {
						return search(noeud.gauche)
					}
				} else if (valeur > noeud.valeur) {
					if (noeud.droite === null) {
						noeud.droite = new Noeud(valeur, null, null, noeud)
						console.log("Le noeud a bien été ajouté:") + noeud.droite.afficher()
						return
					} else if (noeud.droite !== null) {
						return search(noeud.droite)
					}
				} else {
					return (
						console.log("***** Ce noeud est déjà présent dans l'arbre ******"),
						noeud.afficher()
					)
				}
			}
			return search(noeud)
		}
	}

	infixe() {
		// Recuperation uniquement des valeurs des noeuds
		// qui seront au final rangées dans un tableau croissant
		if (this.racine == null) {
			return null
		} else {
			var tabResult = new Array()
			const parcourir = function(noeud) {
				noeud.gauche && parcourir(noeud.gauche)
				tabResult.push(noeud.valeur)
				noeud.droite && parcourir(noeud.droite)
			}
			parcourir(this.racine)
			return tabResult
		}
	}

	suppN(valeur) {
		const suppNoeud = function(noeud, valeur) {
			// fonction récursive qui va récuperer, selon les cas,
			// la valeur avec laquelle on va écraser le noeud à supprimer
			if (noeud == null) {
				return null
			}
			if (valeur == noeud.valeur) {
				// n'a aucun noeud enfant
				if (noeud.gauche == null && noeud.droite == null) {
					return null
				}
				// n'a pas de noeud enfant gauche
				if (noeud.gauche == null) {
					return noeud.droite
				}
				// n'a pas de noeud enfant droit
				if (noeud.droite == null) {
					return noeud.gauche
				}
				// noeud avec deux noeuds enfant
				var noeudTemp = noeud.droite
				while (noeudTemp.gauche !== null) {
					noeudTemp = noeudTemp.gauche
				}
				noeud.valeur = noeudTemp.valeur
				noeud.droite = suppNoeud(noeud.droite, noeudTemp.valeur)
				return noeud
			} else if (valeur < noeud.valeur) {
				noeud.gauche = suppNoeud(noeud.gauche, valeur)
				return noeud
			} else {
				noeud.droite = suppNoeud(noeud.droite, valeur)
				return noeud
			}
		}
		this.racine = suppNoeud(this.racine, valeur)
	}
}

//TESTS
let a = new Arbre()
a.ajouterN(30)
a.ajouterN(18)
a.ajouterN(24)
a.ajouterN(11)
a.ajouterN(33)
a.ajouterN(13)
a.ajouterN(40)
a.ajouterN(46)
a.ajouterN(14)
a.ajouterN(21)
a.ajouterN(12)
a.ajouterN(10)
a.ajouterN(31)
a.ajouterN(35)
a.ajouterN(32)

a.trouverN(12)
console.log(a.infixe())
console.log(a)
a.suppN(11)
console.log(a.infixe())
console.log(a.racine.gauche)
