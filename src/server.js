const express = require("express")
const server = express()

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express:server,
    noCache: true
} )
server.use(express.static("public"))

server.get("/", (request, response) =>{
   return response.render("index.html")
})
server.get("/cadastrar-ponto-de-coleta", (request, response) =>{
    return response.render("create-point.html")
})
server.get("/resultado-pontos-de-coleta", (request, response) =>{
    return response.render("search-results.html")
})


server.listen(3000)