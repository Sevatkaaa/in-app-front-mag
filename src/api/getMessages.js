import axios from "axios";

const url = "localhost:8080"

export const getMessages = (chatId) => {
    return axios.get(`http://${url}/api/messages?chatId=${chatId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    })
};
