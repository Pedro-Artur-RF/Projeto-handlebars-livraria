const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000
const handlebars = require('express-handlebars')
const mysql2 = require('mysql2')

app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())

app.use(express.json())

const db = mysql.createPool({
    host: "localhost",
    user: "aluno_medio",
    password: "@lunoSenai23.",
    database: "system_products" 
})


app.post("/cadastrar", (req, res) => {
    const { name, description, price } = req.body

    const inserirMysql = `INSERT INTO products (name, description, price) VALUES ('${name}, '${description}', '${price}')` 

    db.query(inserirMysql, (error) => {
        if(error){
            console.error(erro)
            return res.status(500).json({error: "Erro ao inserir dados"})
        }
    })
})


app.delete("/produtos/:id", (request, response) => {
    const { id } = request.params

    const produto = produtos.findIndex((produto) => produto.id === id);

    produtos.splice(produto, 1);

    return response.json({"message": "Produto deletado com sucesso"});
});

app.put("/produtos/:id", (request, response) => {
    const { id } = request.params;
    const { nome, preco, descricao } = request.body;

    const produtoIndex = produtos.findIndex((produto) => produto.id === id);

    if (produtoIndex === -1) {
        return response.status(404).json({ message: "Produto não encontrado" });
    }

    const produtoAtualizado = {
        id,
        nome,
        preco,
        descricao
    };

    produtos[produtoIndex] = produtoAtualizado;

    return response.json(produtoAtualizado);
});

app.get("/", (req, res) => {
    res.render('formulario')
})

app.listen(port, (error) => {
    if(error){
        console.log("deu erro")
        return
    }
    console.log(`Servidor rodando na porta${port} 😍`)
})