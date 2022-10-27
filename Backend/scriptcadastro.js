'use strict'

const url = 'http://localhost:8080';



const form = document.querySelector('#formu');
const addUserItem = async user => {
  try {
    const response = await axios.post(`${url}/cadastro`, user);
    const newUserItem = response.data;

    console.log(`Added a new User!`, newUserItem);

    return newUserItem
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };
}


form.addEventListener('submit', async event => {
  try {
    event.preventDefault();

    const nome = document.querySelector('#nome').value;
    const usuario = document.querySelector('#usuario').value;
    const email = document.querySelector('#email').value;
    const cpf = document.querySelector('#cpf').value;
    const telefone = document.querySelector('#tel').value;
    const datanasc = document.querySelector('#dtnasc').value;
    const senha = document.querySelector('#senha').value;

    console.log(nome)

    const user = {
      cpf: cpf,
      nome: nome,
      email: email,
      tel: telefone,
      usuario: usuario,
      dtnasc: datanasc,
      senha: senha
    };

    addUserItem(user);

  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

});
