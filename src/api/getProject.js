import axios from "axios";

const url = "localhost:8080"

export const getProject = (id) => {
    return axios.get(`http://${url}/api/projects/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    })
};
