import axios from "axios";

const url = "localhost:8080"

export const like = (projectId, positive) => {
    let likeRequest = {
        projectId: projectId,
        positive: positive
    };
    return axios.post(`http://${url}/api/likes/like`, likeRequest, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    });
};

export const unlike = (projectId, positive) => {
    let likeRequest = {
        projectId: projectId,
        positive: positive
    };
    return axios.post(`http://${url}/api/likes/unlike`, likeRequest, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer_${sessionStorage.getItem("token")}`
        }
    });
};
