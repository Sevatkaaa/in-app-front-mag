import axios from "axios";

const url = "localhost:8080"

export const invest = (id) => {
    return axios.post(`http://${url}/api/investor/interests/${id}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    });
};

export const investMoney = (id, money) => {
    return axios.post(`http://${url}/api/investor/projects/${id}`, {money: money}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    });
};
