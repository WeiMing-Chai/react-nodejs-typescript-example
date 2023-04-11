import React from 'react'

interface DisplayBoardProps {
    numberOfUsers: number;
    getAllUsers: any;
}

export const DisplayBoard = (props: DisplayBoardProps) => {
    
    return(
        <div className="display-board">
            <h4>Patients Created</h4>
            <div className="number">
            {props.numberOfUsers}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => props.getAllUsers()} className="btn btn-warning">Get all Patients</button>
            </div>
        </div>
    )
}