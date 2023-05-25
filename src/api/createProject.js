import axios from "axios";

const url = "localhost:8080"

export const createProject = (name, funds, description, sphere) => {
    let createProject = {
        name: name,
        funds: funds,
        description: description,
        sphere: sphere
    };
    return axios.post(`http://${url}/api/project`, createProject, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    });
};
