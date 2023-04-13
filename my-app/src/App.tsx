import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Users } from './components/Users'
import { DisplayBoard } from './components/DisplayBoard'
import CreateUser from './components/CreateUser'


const App = () => {

  const [user, setUser] = useState({firstname: "",
                                    lastname: "",
                                    email: ""});
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  return (
    <div className="App">
      <Header></Header>
      <div className="container mrgnbtm">
        <div className="row">
          <div className="col-md-8">
              <CreateUser 
                setUser={setUser}
                patient={user}
                setNumberOfUsers={setNumberOfUsers}
                setAllUsers={setUsers}
              />
          </div>
          <div className="col-md-4">
              <DisplayBoard
                numberOfUsers={numberOfUsers}
                setAllUsers={setUsers}
                setNumberOfUsers={setNumberOfUsers}
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
