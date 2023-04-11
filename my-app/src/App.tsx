import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Users } from './components/Users'
import { DisplayBoard } from './components/DisplayBoard'
import CreateUser from './components/CreateUser'
import { getAllUsers, createUser } from './services/UserService'


const App = () => {

  const [user, setUser] = useState({firstname: "",
                                    lastname: "",
                                    email: ""});
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  const createUserFunc = () => {
      createUser(user)
        .then(response => {
          console.log(response);
          setNumberOfUsers(numberOfUsers + 1);
      });
  }

  const getAllUsersFunc = () => {
    getAllUsers()
      .then(users => {
        console.log(users);
        setUsers(users);
        setNumberOfUsers(users.length);
      });
  }

  const onChangeForm = (e: { target: { name: string; value: string; }; }) => {
    var newUser = user;

    if (e.target.name === 'firstname') {
        newUser.firstname = e.target.value;
    } else if (e.target.name === 'lastname') {
        newUser.lastname = e.target.value;
    } else if (e.target.name === 'email') {
        newUser.email = e.target.value;
    }
    setUser({
      ...user,
      ...newUser
    });
  }

    
  return (
    <div className="App">
      <Header></Header>
      <div className="container mrgnbtm">
        <div className="row">
          <div className="col-md-8">
              <CreateUser 
                onChangeForm={onChangeForm}
                createUser={createUserFunc}
              />
          </div>
          <div className="col-md-4">
              <DisplayBoard
                numberOfUsers={numberOfUsers}
                getAllUsers={getAllUsersFunc}
              />
          </div>
        </div>
      </div>
      <div className="row mrgnbtm">
        <Users 
          users={users} 
        />
      </div>
    </div>
  );
}

export default App;
