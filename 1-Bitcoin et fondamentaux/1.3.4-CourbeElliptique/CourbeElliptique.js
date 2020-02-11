/**************** Bitcoin et fondamentaux ***************
	Exercice 1.3.4 : Représenter une courbe elliptique
*********************************************************/

class CourbeElliptique {
	constructor(a, b) {
		this.a = a
		this.b = b

		if (4 * a ** 3 + 27 * b ** 2 === 0) {
			throw `(${this.a}, ${this.b}) n'est pas une courbe valide`
		}
	}

	isEqual(courbe) {
		if (this.a === courbe.a && this.b === courbe.b) {
			return true
		} else {
			return false
		}
	}

	testPoint(x, y) {
		if (Math.pow(y, 2) === Math.pow(x, 3) + this.a * x + this.b) {
			return true
		} else {
			return false
		}
	}

	info() {
		return `Paramètres de la courbe: y^3 = x2 + ${this.a}x + ${this.b} `
	}
}

var courbe0 = new CourbeElliptique(0, 0)
var courbe1 = new CourbeElliptique(-1, 3)
var courbe2 = new CourbeElliptique(12, -6)
console.log(courbe1.info())
console.log(courbe1.testPoint(2, 3))
console.log(courbe1.isEqual(courbe2))
