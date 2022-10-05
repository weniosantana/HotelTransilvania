const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const db = require('./db');

let app = express();
const port = 8080;

app.use(session({secret:'udhdaoiwud12387ajk47n'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.listen(port, () => {
    console.log("Projeto rodando na porta " +port);
})

/*var login = "VITOR";
var password = "123";
app.post('/login', (req, res)=>{
    if(req.body.password == password && req.body.login == login){
        req.session.login = login;
        console.log("LOGADO");
    }else{
        console.log("NAO LOGADO")
    }
})*/

/*app.post('/login', async (req, res)=>{

    const user = await User.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email: req.body.email
        }
    });
    if (user ===null){
        return res.status(400).json({
            erro:true,
            mensagem: "Erro: Usuário ou senha incorreto"
        });
    }
    if(!(await bcrypt.compare(req.body.senha, user.senha))){
        return res.status(400).json({
            erro:true,
            mensagem: "Erro: Usuário ou senha incorreto"
        });
    }

    var token = jwt.sign({id: user.id}, "DOAWJDOAW123JDJA319230Z",{
        expiresIn: '7d'
    })
    return res.json({
        erro:false,
        mensagem:"Login realizado com sucesso",
        token
    });
    
})*/

app.post('/login', (req,res)=>{
    let dados = req.body;
    let select_usuario = "Select senha from tb_hospede where usuario = ? ";
    let usuario = dados.usuario;
    let senha = dados.senha;
    db.query(select_usuario, usuario, (err, row )=>{
        res.status(200);
        if (senha === row[0].senha){
            console.log("logado")
            res.send("LOGADO")
        }else{
            console.log("nao logado")
        }
    });
    
})







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
    let dados_body = [dados.cpf, dados.nome, dados.email, dados.telefone, dados.usuario, dados.data_nasc, dados.senha];
    console.log(dados_body);
    db.query(cmd_insert, dados_body, (error, result) => {
        if (error) {
            res.status(400).send({ message: error });
        } else {
            res.status(201).json({ message: "Cadastro feito com Sucesso!" });
        }
    }); 

});


/*app.post("/cadastro", async(req,res)=>{
    await User.create(req.body)
    .then(()=>{
        return res.json({
            erro:false,
            mensagem:"Usuário cadastrado com sucesso!"
        })
    }).catch(()=>{
        return res.status(400).json({
            erro:true,
            mensagem: "Erro: Usuário não cadastrado"
        })
    });
})*/

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