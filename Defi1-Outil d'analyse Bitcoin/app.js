const http = require("http")
const fs = require("fs")

var server = http.createServer()

server.on("req", (req, res) => {
	fs.readFile("index.html", "utf8", (err, data) => {
		if (err) {
			res.writeHead(404, { "content-type": "text/html ; charset=utf-8" })
			res.end("Une Erreur inattendue est survenue!!")
		} else {
			res.writeHead(200, { "Content-Type": "text/html ; charset=utf-8" })
			res.end(data)
		}
	})
})
server.listen(8080)
