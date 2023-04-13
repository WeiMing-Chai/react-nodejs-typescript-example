import React, { useCallback } from 'react'
import { useAxios } from '../utils/hooks';

interface CreateUserProps {
    setUser: any;
    patient: {firstname: string, lastname: string, email: string};
    setNumberOfUsers: any;
    setAllUsers: any;
}

const CreateUser = (props: CreateUserProps) => {

    const onChangeForm = (e: { target: { name: string; value: string; }; }) => {
        var newUser = props.patient;
    
        if (e.target.name === 'firstname') {
            newUser.firstname = e.target.value;
        } else if (e.target.name === 'lastname') {
            newUser.lastname = e.target.value;
        } else if (e.target.name === 'email') {
            newUser.email = e.target.value;
        }
        props.setUser({
          ...props.patient,
          ...newUser
        });
      }

    const axiosInstance = useAxios('http://localhost:4200');
    const createUser = useCallback(async () => {
        // post request to server
        await axiosInstance.post('/api/patient', {patient: props.patient});

        // update ui
        const response = await axiosInstance.get('/api/patients');
        props.setAllUsers(response.data);
        props.setNumberOfUsers(response.data.length);
      }, [axiosInstance, props])

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Create Patient</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">First Name</label>
                            <input type="text" onChange={(e) => onChangeForm(e)}  className="form-control" name="firstname" id="firstname" aria-describedby="emailHelp" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputPassword1">Last Name</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="lastname" id="lastname" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                    </div>
                    <button type="button" onClick= {(e) => createUser()} className="btn btn-danger">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser