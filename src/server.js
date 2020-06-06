const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

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

    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            console.error(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)//rows são os dados que estão salvos no banco
        
        const total = rows.length
        //mostrar a página html com os dados do banco de dados
    return response.render("search-results.html", {places: rows, total:total} )
    })

})


server.listen(3000)