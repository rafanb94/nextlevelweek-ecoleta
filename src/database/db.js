// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banc de dados 
const db = new sqlite3.Database("./src/database/database.db")

//exportando o objeto db para o server.js
module.exports = db
//utilizar o objeto de banco de dados, para nossas operações
/*db.serialize(() => {
    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            cep TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //inserir dados na tabela
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
        "http://localhost:3000/assets/eletronicos.svg",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if (err){
            return console.error(err)
        }
        console.log("Cadastro com sucesso")
        console.log(this)//referencia a resposta do run nesta função
    }

    db.all(`SELECT * FROM places`, function(err, rows){
        if (err){
            return console.error(err)
        }
        console.log("Aqui estão seus registros")
        console.log(this)
    })

    //db.run (query,values, afterInsertData)// a função afterInsertData esta sendo chamada por referencia.
    //consultar os dados

    //deletar
    db.run(`DELETE FROM places WHHERE id = ?`,[1], function (err){
        if (err){
            return console.error(err)
        }
        console.log("Registro deletado com sucesso")
        console.log(this)
    })

})*/