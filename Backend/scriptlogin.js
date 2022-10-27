'use strict'

const url = 'http://localhost:8080';






//LOGIN
const formu = document.querySelector('.formula');

const loginUser = async user => {
  try {
    const response = await axios.post(`${url}/login`, user);
    const newUserItem = response.data;

    console.log(`Usuario Logado`, newUserItem);

    return newUserItem;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };
}


formu.addEventListener('submit', async event => {
  try {
    event.preventDefault();

    
    const usuario = document.querySelector('#user').value;
    const senha = document.querySelector('#senha').value;

    console.log(usuario)
    console.log(senha)

    const user = {
      usuario: usuario,
      senha: senha
    };

    loginUser(user);

  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

});

