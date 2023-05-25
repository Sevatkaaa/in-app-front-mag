import axios from "axios";

const url = "localhost:8080"

export const getProjectsForCompany = () => {
    return axios.get(`http://${url}/api/companies/${sessionStorage.getItem("username")}/projects`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    })
};
