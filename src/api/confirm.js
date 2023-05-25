import axios from "axios";

const url = "localhost:8080"

export const confirm = (id) => {
    return axios.post(`http://${url}/api/interests/${id}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    });
};
