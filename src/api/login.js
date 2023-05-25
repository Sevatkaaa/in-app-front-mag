import axios from "axios";

const url = "localhost:8080"

export const login = (name, password) => {
    let request = {
        username: name,
        password: password,
    };
    return axios.post(`http://${url}/api/auth/login`, request, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
