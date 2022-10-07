
/*
function fazPost(url, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function(){
        console.log(this.responseText)
    }
    return request.responseText
}

function cadastraUsuario() {
    preventDefault()
    let url = "http://localhost:8080/cadastro"
    let nome = document.getElementById("nome").value
    let usuario = document.getElementById("usuario").value
    let email = document.getElementById("email").value
    let cpf = document.getElementById("cpf").value
    let tel = document.getElementById("tel").value
    let dtnasc = document.getElementById("dtnasc").value
    let senha = document.getElementById("senha").value

    body = {
        "cpf":cpf,
        "nome": nome,
        "email":email,
        "telefone":tel,
        "usuario":usuario,
        "data_nasc":dtnasc,
        "senha":senha
    }
    fazPost(url, body)
}*/