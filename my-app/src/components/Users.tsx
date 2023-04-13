import React from 'react'

interface User {
    firstname: string;
    lastname: string;
    email: string;
}

interface UserProps {
    users: User[];
}

export const Users = (props: UserProps) => {

    if (props.users.length === 0) return null

    const UserRow = (user: {firstname: string, lastname: string, email: string}, index: number) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
              </tr>
          )
    }

    const userTable = props.users.map((user,index) => UserRow(user,index))

    return(
        <div className="container">
            <h2>Patients</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Patient Id</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                    {userTable}
                </tbody>
            </table>
        </div>
    )
}