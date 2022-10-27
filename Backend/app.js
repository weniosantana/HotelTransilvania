const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors')

let app = express();
const port = 8080;


app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log("Projeto rodando na porta " + port);
})




app.post('/login', async (req, res) => {
    let dados = req.body;
    let select_usuario = "Select senha from tb_hospede where usuario = ? ";
    let usuario = dados.usuario;
    let senha = dados.senha;
    db.query(select_usuario, usuario, (err, row) => {
        if (senha === row[0].senha) {
            res.status(201).json({ message: "Login feito com Sucesso!" });
            return;
        } else {
            res.status(400).send({ message: err });
            console.log("login nao feito")
        }
    });
});


/* The above code is a simple CRUD API. */
app.get('/cadastro', (req, res) => {
    let cmd_selectAll = "SELECT * FROM TB_HOSPEDE";
    db.query(cmd_selectAll, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.post('/cadastro', async (req, res) => {
    let dados = req.body;
    let cmd_insert = "INSERT INTO TB_HOSPEDE (CPF, NOME, EMAIL, TELEFONE, USUARIO, DATA_NASC, SENHA) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let dados_body = [dados.cpf, dados.nome, dados.email, dados.tel, dados.usuario, dados.dtnasc, dados.senha];
    console.log(dados_body);
    db.query(cmd_insert, dados_body, (error) => {
        if (error) {
            res.status(400).send({ message: error });
            console.log("cadastro nao feito")
        } else {
            return res.status(201).json({ message: "Cadastro feito com Sucesso!" });
        };
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










  