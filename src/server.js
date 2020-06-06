const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express:server,
    noCache: true
} )

//configurar para leitura da pasta public
server.use(express.static("public"))

//habilitar o uso do request.body da nossa aplicação
server.use(express.urlencoded({ extended: true }))

server.get("/", (request, response) =>{
   return response.render("index.html")
})
server.get("/cadastrar-ponto-de-coleta", (request, response) =>{ 
    //request.query: Query Strings da nossa URL, normalmente são os campos enviados por algum input/formulário
    //console.log(req.query)
    return response.render("create-point.html")
})
server.post("/cadastrar-ponto-de-coleta", (request, response) =>{ 
    //request.body: retorna o "corpo do formulário" ou seja, os dados enviados pelo input

    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        cep,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        request.body.image,
        request.body.name,
        request.body.address,
        request.body.cep,
        request.body.state,
        request.body.city,
        request.body.items
    ]

    function afterInsertData(err){
        if (err){
           console.error(err)
           return response.send("erro no cadastro")
        }
        console.log("Cadastro com sucesso")
        console.log(this)//referencia a resposta do run nesta função
        return response.render("/cadastrar-ponto-de-coleta", {saved: true})
    }
    db.run(query, values, afterInsertData)


})


server.get("/resultado-pontos-de-coleta", (request, response) =>{
    
    const search = request.query.search

    if(search == ""){
    
    return response.render("search-results.html", {total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
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