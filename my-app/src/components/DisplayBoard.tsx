import React, { useCallback } from 'react'
import { useAxios } from '../utils/hooks';

interface DisplayBoardProps {
    numberOfUsers: number;
    setAllUsers: any;
    setNumberOfUsers: any;
}

export const DisplayBoard = (props: DisplayBoardProps) => {

    const axiosInstance = useAxios('http://localhost:4200');
    const getAllUsers = useCallback(async () => {
        const response = await axiosInstance.get('/api/patients');
        props.setAllUsers(response.data);
        props.setNumberOfUsers(response.data.length);
      }, [axiosInstance])
      

    return(
        <div className="display-board">
            <h4>Patients Created</h4>
            <div className="number">
            {props.numberOfUsers}
            </div>
            <div className="btn">
                <button type="button" onClick={getAllUsers} className="btn btn-warning">Get all Patients</button>
            </div>
        </div>
    )
}