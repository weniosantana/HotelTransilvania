import 'regenerator-runtime/runtime';
import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

/*const getUserItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user?_limit=5`);

    const UserItems = response.data;

    console.log(`GET: Here's the list of User`, UserItems);

    return UserItems;
  } catch (errors) {
    console.error(errors);
  }
};*/


/*const createUserElement = item => {
  const UserElement = document.createElement('li');

  UserElement.appendChild(document.createTextNode(item.title));

  return UserElement;
};

const updateUserList = UserItems => {
  const UserList = document.querySelector('ul');

  if (Array.isArray(UserItems) && UserItems.length > 0) {
    UserItems.map(UserItem => {
      UserList.appendChild(createUserElement(UserItem));
    });
  } else if (UserItems) {
    UserList.appendChild(createUserElement(UserItems));
  }
};

const main = async () => {
  updateUserList(await getUserItems());
};

main();
*/

//post

const form = document.querySelector('#formu');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const usuario = document.querySelector('#usuario').value;
  const senha = document.querySelector('#senha').value;

  const user = {
    usuario: usuario,
    senha: senha,
  };
  
  const submitUserItem = await addUserItem(user);
  updateUserList(submitUserItem);
});



// ...

export const addUserItem = async user => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, user);
    const newUserItem = response.data;

    console.log(`Logged`, newUserItem);

    return newUserItem;
  } catch (errors) {
    console.error(errors);
  }
};











