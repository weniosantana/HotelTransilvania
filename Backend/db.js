const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bancohotel'
});

/*
const Sequelize = require('sequelize')
const sequelize = new Sequelize("bancohotel", "root", "root",{
    define:{
        freezeTableName: true
    },
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão realizada");
}).catch(function(){
    console.log("Erro: Conexão não realizada");
});

module.exports = sequelize;*/

connection.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Conectado! :)");
    }
});

module.exports = connection;



