const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const port = 8080;

let app = express();
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Projeto rodando na porta 8080");
})



function validandoCadastro(){
    let inputNome = document.getElementById('nome');
    var nome = inputNome.value;

    var inputUsuario = document.getElementById('Usuario');
    var usuario = inputUsuario.value;

    var inputEmail = document.getElementById('email');
    var email = inputEmail.value;

    var inputCpf = document.getElementById('cpf');
    var cpf = inputCpf.value;

    var inputTel = document.getElementById('tel');
    var telefone = inputTel.value;

    var inputDtnasc = document.getElementById('dtnasc');
    var data_nasc = inputDtnasc.value;

    var inputSENHA = document.getElementById('SENHA');
    var senha = inputSENHA.value;

    let dados = {nome: nome, usuario: usuario, email: email, cpf: cpf, telefone: telefone, data_nasc: data_nasc, senha: senha};

    alert("Nome: " + dados.nome + "\nUsuário: " + dados.usuario + "\nE-mail: " + dados.email + "\nCPF: " +  dados.cpf + "\nData de Nascimento" + dados.data_nasc + "\nSenha" + dados.senha)

  }

function validandoLogin(){
    let inputNomeLogin = document.getElementById('nomeUserLogin');
    let userLogin = inputNomeLogin.value;

    let inputSenhaLogin = document.getElementById('senhaLogin');
    let senhaLogin = inputSenhaLogin.value;

    alert("O Login é: " + userLogin + "\nA senha é: " + senhaLogin)

}



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










  