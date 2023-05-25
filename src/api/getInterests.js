import axios from "axios";

const url = "localhost:8080"

export const getInterests = (username) => {
    return axios.get(`http://${url}/api/interests/investor?username=${username}&full=true`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    })
};
