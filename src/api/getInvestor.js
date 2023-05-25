import axios from "axios";

const url = "localhost:8080"

export const getInvestor = (id, name) => {
    let params = id != null ? `id=${id}` : `username=${name}`
    return axios.get(`http://${url}/api/investor?${params}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    })
};
