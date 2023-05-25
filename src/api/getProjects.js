import axios from "axios";

const url = "localhost:8080"

export const getProjects = () => {
    return axios.get(`http://${url}/api/projects`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    })
};
