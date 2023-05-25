import axios from "axios";

const url = "localhost:8080"

export const createUser = (name, password, email, role) => {
    let createUserRequest = {
        username: name,
        password: password,
        email: email,
        role: role
    };
    return axios.post(`http://${url}/api/auth/register`, createUserRequest, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
