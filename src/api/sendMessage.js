import axios from "axios";

const url = "localhost:8080"

export const sendMessage = (chatId, text) => {
    let request = {
        text: text,
        chatId: chatId
    };
    return axios.post(`http://${url}/api/messages`, request, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    });
};
