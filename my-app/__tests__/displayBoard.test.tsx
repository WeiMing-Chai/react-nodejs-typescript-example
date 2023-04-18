import { render, screen } from "@testing-library/react";
import React from "react";
import {DisplayBoard} from "../src/components/DisplayBoard";
import * as axios from "../src/utils/hooks";
import userEvent from "@testing-library/user-event";

interface User {
    firstname: string;
    lastname: string;
    email: string;
}

let usersMockValue: User[];

let numberOfUsersMockValue: number;

const mockSetAllUsers = jest.fn((users) => {
    usersMockValue = users;
});

const mockSetNumberOfUsers = jest.fn((numberOfUsers) => {
    numberOfUsersMockValue = numberOfUsers;
});

const userListResponse = [{
    firstname: "testFirstName",
    lastname: "testLastName",
    email: "testEmail",
}];

const mockAxios = jest.fn(() => {
    return {
        get(ignored: string) {
            return {
                ok: true,
                status: 200,
                data: userListResponse,
            };
        }
    }
})
jest.spyOn(axios, "useAxios").mockImplementation(mockAxios);

const delay = async (timeout: number) => setTimeout(() => {}, timeout)

test("renders the DisplayBoard", async () => {
    render(<DisplayBoard numberOfUsers={0} setAllUsers={mockSetAllUsers} setNumberOfUsers={mockSetNumberOfUsers} />);

    expect(screen.getByTestId('h4-title')).toHaveTextContent(/^Patients Created$/);

    const getPatientsBtn = screen.getByRole("button");
    expect(getPatientsBtn).toHaveClass("btn btn-warning");

    userEvent.click(getPatientsBtn);
    await delay(3000);
    expect(usersMockValue).toEqual([{
        firstname: "testFirstName",
        lastname: "testLastName",
        email: "testEmail",
    }])
    expect(numberOfUsersMockValue).toEqual(1);
  });


// // useEffect will make Jest fall into infinity loop. Mock useEffect to prevent the test from running infinitely. 
// const mockUseEffect = jest.fn()
// jest.spyOn(React, 'useEffect').mockImplementation(mockUseEffect)