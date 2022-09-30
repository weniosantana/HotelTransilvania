const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const port = 8080;

let app = express();
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Projeto rodando na porta 8080");
})

app.get('/cadastro', (req, res) => {
    let cmd_selectAll = "SELECT * FROM TB_HOSPEDE;";
    db.query(cmd_selectAll, (err, rows) => {
        res.status(200).json(rows);
    });
});


app.post('/cadastro', (req, res) => {
    let dados = req.body;
    let cmd_insert = "INSERT INTO TB_HOSPEDE (CPF, NOME, EMAIL, TELEFONE, USUARIO, DATA_NASC, SENHA) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let dados_body = [dados.cpf, dados.nome, dados.email, dados.telefone, dados.usuario, dados.data_nasc, dados.senha];


    db.query(cmd_insert, dados_body, (error, result) => {
        if (error) {
            res.status(400).send({ message: error });
        } else {
            res.status(201).json({ message: "Cadastro feito com Sucesso!" });
        }
    }); 

});

app.get('/cadastro/:id', (req, res) => {
    let id = req.params.id;
    let cmd_selectId = "SELECT * FROM TB_HOSPEDE WHERE ID = ?";
    db.query(cmd_selectId, id, (err, row) => {
        res.status(200).json(row);
    });
});

app.delete('/cadastro/:id', (req, res) => {
    let id = req.params.id;
    let cmd_delete = "DELETE FROM TB_HOSPEDE WHERE ID = ?";

    db.query(cmd_delete, id, (error, result) => {
        if (error) {
            res.status(400).send({ message: error });
        } else {
            res.status(201).json({ message: "Cadastro excluido com sucesso" });
        }
    });
});

app.put('/cadastro/:id', (req, res) => {
    let dados = req.body;
    let id = req.params.id;
    let cmd_update = "UPDATE TB_HOSPEDE SET CPF = ?, NOME = ?, EMAIL = ?, TELEFONE = ?, USUARIO = ?, DATA_NASC = ?, SENHA = ? WHERE ID = ?";
    let dados_body = [dados.cpf, dados.nome, dados.email, dados.telefone, dados.usuario, dados.data_nasc, dados.senha, id];

    db.query(cmd_update, dados_body, (error, result) => {
        if (error) {
            res.status(400).send({ message: error });
        } else {
            res.status(201).json({ message: "Cadastro alterado com sucesso!" });
        }
    });
});